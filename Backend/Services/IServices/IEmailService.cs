namespace BackEnd.Services.IServices;

public interface IEmailService
{
    Task Send(string to, string subject, string html);
}