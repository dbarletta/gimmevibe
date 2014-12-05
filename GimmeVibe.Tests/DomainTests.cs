using System;
using GimmeVibe.Domain.Aggregates;
using GimmeVibe.Domain.Entities;
using GimmeVibe.Domain.Infrastructure.EntityFramework;
using GimmeVibe.Domain.Repositories;
using Xunit;
using Xunit.Extensions;

namespace GimmeVibe.Tests
{
    public class DomainTests
    {
        [Fact]
        public void WhenSavingAggregateShouldSave()
        {
            //arrange
            var dev = new Device();
            dev.Id = 2;
            dev.UUID = Guid.NewGuid().ToString();
            dev.CreationDate = DateTime.Now;

            var emo = new Emotion();
            emo.Id = 2;
            emo.Name = "cool";
            emo.ImageUri = "./";
            emo.ColorRGB = "blue";

            var place = new Place();
            place.Id = 2;
            place.Name = "Castelar";
            place.GooglePlaceId = Guid.NewGuid().ToString();
            place.CreationDate = DateTime.Now;
            
            var vibe = new Vibe();
            vibe.Device = dev;
            vibe.Emotion = emo;
            vibe.Place = place;
            vibe.CreationDate = DateTime.Now;

            var repo = new VibeRepository(new EFContextFactory());
            
            //act
            Exception exc = null;
            try
            {
                repo.SaveAggregate(vibe);
            }
            catch(Exception ex)
            {
                exc = ex;
            }


            //assert
            Assert.Null(exc);
        }
    }
}
