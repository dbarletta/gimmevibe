using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using GimmeVibe.Domain.Aggregates;
using GimmeVibe.Domain.Infrastructure.EntityFramework;

namespace GimmeVibe.Domain.Repositories
{
    public interface IVibeRepository : IRepository<Vibe> { }

    public class VibeRepository : RepositoryBase<Vibe>, IVibeRepository
    {
        public VibeRepository(IContextFactory factory)
            : base(factory)
        {

        }
    }
}
