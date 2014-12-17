using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using GimmeVibe.Domain.Entities;
using GimmeVibe.Domain.Infrastructure.EntityFramework;

namespace GimmeVibe.Domain.Repositories
{
    public interface IEmotionsRepository : IRepository<Emotion> { }

    public class EmotionsRepository : RepositoryBase<Emotion>, IEmotionsRepository
    {
        public EmotionsRepository(IContextFactory factory)
            : base(factory)
        {

        }
    }
}
