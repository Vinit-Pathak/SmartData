using App.Core.Interface;
using Domain;
using Microsoft.EntityFrameworkCore;

namespace Infrastructure
{
    public class AppDbContext : DbContext, IAppDbContext
    {
        // Constructor
        public AppDbContext(DbContextOptions<AppDbContext> options) // Dependency Injection
            : base(options) { }

        public DbSet<Employee> Employees { get; set; } // DbSet for Employee
        public DbSet<Department> Departments { get; set; } // DbSet for Department
    }
}
