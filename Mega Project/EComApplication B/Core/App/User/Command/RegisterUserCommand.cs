using Azure.Storage.Blobs;
using Azure.Storage.Blobs.Models;
using Core.Interface;
using Core.Models;
using MediatR;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using System.Linq;
using System.Security.Cryptography;
using System.Text;

namespace Core.App.User.Command
{
    public class RegisterUserCommand : IRequest<bool>
    {
        public RegisterDto register { get; set; }
        public Stream FileStream { get; set; }
        public string FileName { get; set; }
    }

    public class RegisterUserCommandHandler : IRequestHandler<RegisterUserCommand, bool>
    {
        private readonly IAppDbContext _context;
        private readonly IEmailService _emailService;
        private readonly string _connectionString;
        private readonly string _containerName = "ecomapplication";
        private readonly string _folderName = "profile-images";

        public RegisterUserCommandHandler(IAppDbContext context, IEmailService emailService, IConfiguration configuration)
        { 
            _context = context;
            _emailService = emailService;
            _connectionString = configuration.GetConnectionString("AzureBlobStorage");
        }
        public async Task<bool> Handle(RegisterUserCommand request, CancellationToken cancellationToken)
        {
            if (request.register == null)
            {
                // Handle error, for example by returning false or throwing a specific exception
                return false;
            }

            var user = request.register;

            var userExist = await _context.Set<Domain.User>().Where(x => x.Email == user.Email).FirstOrDefaultAsync();

            if (userExist != null)
            {
                return false;
            }

            // Generate username
            string newDOB = user.DateOfBirth.ToString("ddMMyy");
            string username = $"EC_{user.LastName.ToUpper()}{user.FirstName[0].ToString().ToUpper()}{newDOB}";

            // Generate Random Password
            const string chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
            string password = new string(Enumerable.Repeat(chars, 8).Select(s => s[new Random().Next(s.Length)]).ToArray());

            if (userExist != null && userExist.UserName == username)
            {
                username = $"{username}_1";
            }

            var blobServiceClient = new BlobServiceClient(_connectionString);
            var blobContainerClient = blobServiceClient.GetBlobContainerClient(_containerName);
            var blobClient = blobContainerClient.GetBlobClient($"{_folderName}/{Guid.NewGuid()}");

            var blobHttpHeaders = new BlobHttpHeaders
            {
                ContentType = GetContentType(request.FileName) // Get MIME type dynamically
            };

            await blobClient.UploadAsync(request.FileStream, new BlobUploadOptions
            {
                HttpHeaders = blobHttpHeaders
            });

            var imageUrl = blobClient.Uri.ToString();


            var newUser = new Domain.User
            {
                FirstName = user.FirstName,
                LastName = user.LastName,
                Email = user.Email,
                UserName = username,
                Password = BCrypt.Net.BCrypt.HashPassword(password),
                Mobile = user.Mobile,
                DateOfBirth = user.DateOfBirth,
                ProfileImage = imageUrl,
                UserType = user.UserType,
                Address = user.Address,
                ZipCode = user.ZipCode,
                State = user.State,
                Country = user.Country,
                IsActive = true
            };

            await _context.Set<Domain.User>().AddAsync(newUser);
            await _context.SaveChangesAsync(cancellationToken);

            await _emailService.SendEmailAsync(user.Email, "Welcome to EComApplication",
                 $"Your username is {username} and your password is {password}");

            return true;
        }


        private string GetContentType(string fileName)
        {
            return fileName.EndsWith(".jpg") || fileName.EndsWith(".jpeg") ? "image/jpeg" :
                   fileName.EndsWith(".png") ? "image/png" :
                   "application/octet-stream"; // Default fallback
        }


    }
}
