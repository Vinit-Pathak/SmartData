using App.Core.App.Student.Command;
using Microsoft.Extensions.DependencyInjection;

namespace App.Core
{
    public static class DependencyInjection
    {
        // AddApplication method
        public static IServiceCollection AddApplication(this IServiceCollection services)
        {

            services.AddMediatR(cfg =>
            {
                cfg.RegisterServicesFromAssemblyContaining<CreateEmployeeCommand>(); // Register the services
            });

            return services;  // Return the services
        }

    }
}
