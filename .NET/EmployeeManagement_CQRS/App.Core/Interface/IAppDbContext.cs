using Microsoft.EntityFrameworkCore;
using System.Threading.Tasks;
using System.Threading;

namespace App.Core.Interface
{

    // Define the interface
    public interface IAppDbContext
    {
        DbSet<TEntity> Set<TEntity>()
            where TEntity : class;

        Task<int> SaveChangesAsync(CancellationToken cancellationToken = default);
    }
}
