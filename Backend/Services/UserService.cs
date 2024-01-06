using System.Security.Cryptography;
using AutoMapper;
using BackEnd.Data;
using BackEnd.Dtos.UserDtos;
using BackEnd.Models;
using BackEnd.Services.IServices;
using Microsoft.EntityFrameworkCore;

namespace BackEnd.Services;

public class UserService : IUserService
{
    private readonly ApplicationDbContext _db;
    private readonly IJwtUtils _jwtUtils;
    private readonly IMapper _mapper;
    private readonly IEmailService _emailService;

    public UserService(ApplicationDbContext db, IJwtUtils jwtUtils, IMapper mapper, IEmailService emailService)
    {
        _db = db;
        _jwtUtils = jwtUtils;
        _mapper = mapper;
        _emailService = emailService;
    }

    public async Task<AuthenticateResponse> Authenticate(AuthenticateRequest model)
    {
        var user = await _db.Users.FirstOrDefaultAsync(x => x.Email == model.Email);

        // validate
        if (user == null || !user.IsVerified || !BCrypt.Net.BCrypt.Verify(model.Password, user.PasswordHash))
            throw new AppException("Username or password is incorrect");

        // authentication successful
        var response = _mapper.Map<AuthenticateResponse>(user);
        response.Token = _jwtUtils.GenerateToken(user);
        return response;
    }

    public async Task<IEnumerable<User>> GetAll()
    {
        return await _db.Users.ToListAsync();
    }

    public async Task<User> GetById(int id)
    {
        return await _db.Users.FirstOrDefaultAsync(u => u.Id == id);
    }

    public async Task Register(RegisterRequest model, string origin)
    {
        try
        {
            // validate
            var userList = await _db.Users.AnyAsync(x => x.Email == model.Email);
            if (userList)
            {
                await SendAlreadyRegisteredEmail(model.Email, origin);
                return;
            }
            
            // map model to new user object
            var user = _mapper.Map<User>(model);

            user.Role = Role.User;
            user.VerificationToken = GenerateVerificationToken();
            // hash password
            user.PasswordHash = BCrypt.Net.BCrypt.HashPassword(model.Password);

            // save user
            await _db.Users.AddAsync(user);
            await _db.SaveChangesAsync();

            await SendVerificationEmail(user, origin);
        }
        catch (Exception e)
        {
            Console.WriteLine(e.Message);
            throw;
        }
    }

    private async Task SendVerificationEmail(User user, string origin)
    {
        string message = System.IO.File.ReadAllTextAsync("HtmlEmails/VerifyEmail.html").GetAwaiter().GetResult();
        message = message.Replace("[[name]]", user.Email);
        if (!string.IsNullOrEmpty(origin))
        {
            // origin exists if request sent from browser single page app (e.g. Angular or React)
            // so send link to verify via single page app
            var verifyUrl = $"{origin}/verify-email?token={user.VerificationToken}";
            message = message.Replace("[[link]]", verifyUrl);
        }
        else
        {
            // origin missing if request sent directly to api (e.g. from Postman)
            // so send instructions to verify directly with api
            message =
                $@"<p>Please use the below token to verify your email address with the <code>/accounts/verify-email</code> api route:</p>
                            <p><code>{user.VerificationToken}</code></p>";
        }

        await _emailService.Send(
            to: user.Email,
            subject: "Sign-up Verification API - Verify Email",
            html: message
        );
    }

    private string GenerateVerificationToken()
    {
        // token is a cryptographically strong random sequence of values
        var token = Convert.ToHexString(RandomNumberGenerator.GetBytes(64));

        // ensure token is unique by checking against db
        var tokenIsUnique = !_db.Users.Any(x => x.VerificationToken == token);
        if (!tokenIsUnique)
            return GenerateVerificationToken();

        return token;
    }

    private async Task SendAlreadyRegisteredEmail(string email, string origin)
    {
        string message = System.IO.File.ReadAllTextAsync("HtmlEmails/AlreadyRegisteredEmail.html").GetAwaiter().GetResult();
        message = message.Replace("[[name]]", email);
        if (!string.IsNullOrEmpty(origin))
        {
            var returnUrl = $"{origin}/forgot-password";
            message = message.Replace("[[link]]", returnUrl);
        }                
        else
            message =
                "<p>If you don't know your password you can reset it via the <code>/accounts/forgot-password</code> api route.</p>";

        await _emailService.Send(
            to: email,
            subject: "Sign-up Verification API - Email Already Registered",
            html: message
        );
    }
    
    public async Task VerifyEmail(string token)
    {
        var account = await _db.Users.SingleOrDefaultAsync(x => x.VerificationToken == token);

        if (account == null)
            throw new AppException("Verification failed");

        account.Verified = DateTime.UtcNow;
        account.VerificationToken = null;
        
        await _db.SaveChangesAsync();
    }

    public async Task Update(int id, UpdateRequest model)
    {
        try
        {

            var user = await _db.Users.FirstOrDefaultAsync(u => u.Id == id);

            // validate
            var userList = await _db.Users.AnyAsync(x => x.Email == model.Email);
            if (userList)
                throw new AppException("Username '" + model.Email + "' is already taken");

            // hash password if it was entered
            if (!string.IsNullOrEmpty(model.Password))
                user.PasswordHash = BCrypt.Net.BCrypt.HashPassword(model.Password);

            // copy model to user and save
            _mapper.Map(model, user);

            await _db.SaveChangesAsync();

        }
        catch (Exception e)
        {
            Console.WriteLine(e.Message);
            throw;
        }
    }

    public async Task Delete(int id)
    {
        try
        {
            var user = await _db.Users.FirstOrDefaultAsync(u => u.Id == id);
            if (user == null) throw new KeyNotFoundException("User not found");
            _db.Users.Remove(user);
            _db.SaveChanges();

        }
        catch (Exception e)
        {
            Console.WriteLine(e.Message);
            throw;
        }
    }
    
    public async Task ForgotPassword(ForgotPasswordRequest model, string origin)
    {
        var account = _db.Users.SingleOrDefault(x => x.Email == model.Email);

        // always return ok response to prevent email enumeration
        if (account == null) return;

        // create reset token that expires after 1 day
        account.ResetToken = GenerateResetToken();
        account.ResetTokenExpires = DateTime.UtcNow.AddDays(1);
        
        await _db.SaveChangesAsync();

        // send email
        await SendPasswordResetEmail(account, origin);
    }

    private async Task SendPasswordResetEmail(User account, string origin)
    {
        string message = System.IO.File.ReadAllTextAsync("HtmlEmails/PasswordReset.html").GetAwaiter().GetResult();
        message = message.Replace("[[name]]", account.Email);
           
        if (!string.IsNullOrEmpty(origin))
        {
            var resetUrl = $"{origin}/reset-password?token={account.ResetToken}";
            message = message.Replace("[[link]]", resetUrl);
        }
        else
        {
            message =
                $@"<p>Please use the below token to reset your password with the <code>/accounts/reset-password</code> api route:</p>
                            <p><code>{account.ResetToken}</code></p>";
        }

        await _emailService.Send(
            to: account.Email,
            subject: "Sign-up Verification API - Reset Password",
            html:message
        );
    }

    private string? GenerateResetToken()
    {
        // token is a cryptographically strong random sequence of values
        var token = Convert.ToHexString(RandomNumberGenerator.GetBytes(64));

        // ensure token is unique by checking against db
        var tokenIsUnique = !_db.Users.Any(x => x.ResetToken == token);
        if (!tokenIsUnique)
            return GenerateResetToken();

        return token;
    }

    public async Task ValidateResetToken(ValidateResetTokenRequest model)
    {
        await GetAccountByResetToken(model.Token);
    }

    private async Task<User> GetAccountByResetToken(string token)
    {
        var account = await _db.Users.SingleOrDefaultAsync(x =>
            x.ResetToken == token && x.ResetTokenExpires > DateTime.UtcNow);
        if (account == null) throw new AppException("Invalid token");
        return account;
    }

    public async Task ResetPassword(ResetPasswordRequest model)
    {
        var account = await GetAccountByResetToken(model.Token);

        // update password and remove reset token
        account.PasswordHash = BCrypt.Net.BCrypt.HashPassword(model.Password);
        account.PasswordReset = DateTime.UtcNow;
        account.ResetToken = null;
        account.ResetTokenExpires = null;

        await _db.SaveChangesAsync();
    }
}