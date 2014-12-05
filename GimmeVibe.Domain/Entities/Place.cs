using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Data.Entity.Spatial;
using GimmeVibe.Domain.Aggregates;

namespace GimmeVibe.Domain.Entities
{
    public partial class Place : IEntity
    {
        public Place()
        {
            Asterisks = new HashSet<Asterisk>();
            Vibes = new HashSet<Vibe>();
        }

        public int Id { get; set; }

        [Required]
        [StringLength(100)]
        public string Name { get; set; }

        [StringLength(200)]
        public string PhotoUrl { get; set; }

        [StringLength(10)]
        public string Rating { get; set; }

        [Required]
        [StringLength(100)]
        public string GooglePlaceId { get; set; }

        public DateTime CreationDate { get; set; }

        public virtual ICollection<Asterisk> Asterisks { get; set; }

        public virtual ICollection<Vibe> Vibes { get; set; }
    }
}
