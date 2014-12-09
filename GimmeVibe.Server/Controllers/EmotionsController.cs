using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using GimmeVibe.Domain.Entities;
using GimmeVibe.Domain.Infrastructure.EntityFramework;
using GimmeVibe.Domain.Repositories;

namespace GimmeVibe.Server.Controllers
{
    public class EmotionsController : ApiController
    {
        private IEmotionsRepository _repo;

        public EmotionsController()
        {
            var factory = new EFContextFactory();
            _repo = new EmotionsRepository(factory);
        }

        // GET: api/emotions
        public IEnumerable<Emotion> Get()
        {
            var emotions = _repo.GetAll();
            return emotions;
        }

        // GET: api/emotions/5
        public Emotion Get(int id)
        {
            return _repo.Single(x => x.Id == id);
        }
    }
}
