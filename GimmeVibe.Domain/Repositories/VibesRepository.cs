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
    public interface IVibesRepository : IRepository<Vibe> 
    {
        void Save(Vibe vibe);
    }

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
                if(vibe.EmotionId == 0)
                    throw new InvalidOperationException("No emotion setted");
                if(vibe.Device == null)
                    throw new InvalidOperationException("No device setted");
                if(vibe.Place == null)
                    throw new InvalidOperationException("No place setted");
                
                //set vibe state
                ctx.Entry(vibe).State = vibe.Id == 0 ? EntityState.Added : EntityState.Modified;

                //set device state
                if(ctx.Devices.Any(x => x.UUID.Equals(vibe.Device.UUID, StringComparison.InvariantCultureIgnoreCase)))
                {
                    vibe.DeviceId = ctx.Devices.Single(x => x.UUID.Equals(vibe.Device.UUID, StringComparison.InvariantCultureIgnoreCase)).Id;
                    ctx.Entry(vibe.Device).State = EntityState.Unchanged;
                }
                else
                {
                    ctx.Entry(vibe.Device).State = EntityState.Added;
                }                                

                //set place state
                if (ctx.Places.Any(x => x.GooglePlaceId.Equals(vibe.Place.GooglePlaceId, StringComparison.InvariantCultureIgnoreCase)))
                {
                    vibe.PlaceId = ctx.Places.Single(x => x.GooglePlaceId.Equals(vibe.Place.GooglePlaceId, StringComparison.InvariantCultureIgnoreCase)).Id;
                    ctx.Entry(vibe.Place).State = EntityState.Unchanged;
                }
                else
                {
                    ctx.Entry(vibe.Place).State = EntityState.Added;
                }
                                
                //extract asterisk from comment if any
                vibe.BuildAsterisk();

                //set asterisk state
                if(vibe.Asterisk != null)
                {
                    var databaseAsterisk = ctx.Asterisks.SingleOrDefault(x => x.Code.Equals(vibe.Asterisk.Code, StringComparison.InvariantCultureIgnoreCase)
                                            && x.PlaceId == vibe.PlaceId);
                    if (databaseAsterisk != null)
                    {
                        vibe.AsteriskId = databaseAsterisk.Id;
                        vibe.Asterisk = databaseAsterisk;
                        ctx.Entry(vibe.Asterisk).State = EntityState.Unchanged;
                    }
                    else
                    {
                        vibe.Asterisk.PlaceId = vibe.Place.Id;
                        vibe.Asterisk.Place = vibe.Place;
                        ctx.Entry(vibe.Asterisk).State = EntityState.Added;
                    }
                }

                //save aggregate
                vibe.CreationDate = DateTime.Now;
                ctx.SaveChanges();
            }
        }
    }
}
