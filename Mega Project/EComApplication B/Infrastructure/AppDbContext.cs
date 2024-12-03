using Core.Interface;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Data;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Infrastructure    
{
    public class AppDbContext : DbContext, IAppDbContext
    {
        public AppDbContext(DbContextOptions<AppDbContext> options) : base(options)
        {

        }

        public DbSet<Domain.User> Users { get; set; }
        public DbSet<Domain.Otp> Otp { get; set; }
        public DbSet<Domain.Product> Products { get; set; }


        public IDbConnection GetConnection()
        {
            return this.Database.GetDbConnection();
        }
    }
}
