
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;

namespace GimmeVibe.Server.Controllers
{
    public class VotesController : ApiController
    {
        // GET: api/Votes
        public IEnumerable<string> Get()
        {
            return new string[] { "value1", "value2" };
        }

        // GET: api/Votes/5
        public string Get(int id)
        {
            return "value";
        }

        // POST: api/Votes
        public void Post([FromBody]string value)
        {
        }

        // PUT: api/Votes/5
        public void Put(int id, [FromBody]string value)
        {
        }

        // DELETE: api/Votes/5
        public void Delete(int id)
        {
        }
    }
}
