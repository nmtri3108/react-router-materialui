using System.ComponentModel.DataAnnotations;
using BackEnd.Models;

namespace BackEnd.Dtos.UserDtos;

public class RegisterRequest
{
    [Required]
    public string FirstName { get; set; }

    [Required]
    public string LastName { get; set; }

    [Required]
    public string Email { get; set; }

    [Required]
    public Role Role { get; set; }

    [Required]
    public string Password { get; set; }
}