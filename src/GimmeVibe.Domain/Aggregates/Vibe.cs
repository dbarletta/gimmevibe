using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Data.Entity.Spatial;
using GimmeVibe.Domain.Entities;

namespace GimmeVibe.Domain.Aggregates
{
    public partial class Vibe : IAggregate
    {
        public Vibe()
        {
            CreationDate = DateTime.Now;
        }

        public long Id { get; set; }

        public int DeviceId { get; set; }

        public int EmotionId { get; set; }

        public int PlaceId { get; set; }

        public int? AsteriskId { get; set; }

        [StringLength(200)]
        public string Comment { get; set; }

        public DateTime CreationDate { get; set; }

        public virtual Asterisk Asterisk { get; set; }

        public virtual Device Device { get; set; }

        public virtual Emotion Emotion { get; set; }

        public virtual Place Place { get; set; }


        public bool HasAsterisk()
        {
            return this.Comment.Contains("*");
        }

        public Asterisk BuildAsterisk()
        {
            if (HasAsterisk())
            {
                this.Asterisk = new Asterisk(this.Comment);
            }

            return this.Asterisk;
        }
    }
}
