using System;
using System.Collections.Generic;
using System.Data.Entity;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using GimmeVibe.Domain.Aggregates;
using GimmeVibe.Domain.Infrastructure.EntityFramework;

namespace GimmeVibe.Domain.Repositories
{
    public interface IVibesRepository : IRepository<Vibe> { }

    public class VibesRepository : RepositoryBase<Vibe>, IVibesRepository
    {
        public VibesRepository(IContextFactory factory)
            : base(factory)
        {

        }

        public void Save(Vibe vibe)
        {
            using(var ctx = (DbGimmeVibe)_factory.Create())
            {
                //set vibe state
                ctx.Entry(vibe).State = vibe.Id == 0 ? EntityState.Added : EntityState.Modified;

                //set device state
                ctx.Entry(vibe.Device).State = vibe.Device.Id == 0 ? EntityState.Added : EntityState.Modified;

                //set place state
                ctx.Entry(vibe.Place).State = vibe.Place.Id == 0 ? EntityState.Added : EntityState.Modified;


                //save aggregate
                ctx.SaveChanges();
            }
        }
    }
}
