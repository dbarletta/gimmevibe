using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using GimmeVibe.Domain.Aggregates;
using GimmeVibe.Domain.Infrastructure.EntityFramework;
using GimmeVibe.Domain.Repositories;

namespace GimmeVibe.Server.Controllers
{
    public class VotesController : ApiController
    {
        private IVibesRepository _vibeRepository;

        public VotesController()
        {
            var ctxFactory = new EFContextFactory();
            _vibeRepository = new VibesRepository(ctxFactory);
        }

        // GET: api/votes
        public IEnumerable<string> Get()
        {
            return new string[] { "value1", "value2" };
        }

        // GET: api/votes/5
        public string Get(int id)
        {
            return "value";
        }

        // POST: api/votes
        public void Post([FromBody]Vibe vibe)
        {
            _vibeRepository.SaveAggregate(vibe);
        }

        // DELETE: api/votes/5
        public void Delete(int id)
        {
        }
    }
}
