using App.Core;
using App.Core.Interface;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;

namespace Infrastructure
{
    public static class DependencyInjection
    {
        // AddInfrastructure
        public static IServiceCollection AddInfrastructure(this IServiceCollection services, IConfigurationManager configuration)
        {
            services.AddScoped<IAppDbContext, AppDbContext>(); 

            // AddDbContext
            services.AddDbContext<AppDbContext>((provider, options) =>
            {
                options.UseSqlServer(configuration.GetConnectionString("EmployeeConnection"), // Get the connection string
                    b => b.MigrationsAssembly(typeof(AppDbContext).Assembly.FullName));
            });

            return services; // Return the services
        }
    }
}
