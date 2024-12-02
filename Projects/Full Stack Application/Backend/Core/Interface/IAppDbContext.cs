using System.Collections.Generic;
using System.Threading.Tasks;
using System.Threading;
using Microsoft.EntityFrameworkCore;

namespace Core.Interface
{
    public interface IAppDbContext
    {
        DbSet<TEntity> Set<TEntity>()
           where TEntity : class;

        Task<int> SaveChangesAsync(CancellationToken cancellationToken = default);
    }
}
