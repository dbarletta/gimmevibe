using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Data.Entity.Spatial;
using GimmeVibe.Domain.Aggregates;

namespace GimmeVibe.Domain.Entities
{
    public partial class Asterisk : IEntity
    {
        public Asterisk()
        {
            Vibes = new HashSet<Vibe>();
        }

        public int Id { get; set; }

        [Required]
        [StringLength(50)]
        public string Code { get; set; }

        public DateTime CreationDate { get; set; }

        public int PlaceId { get; set; }

        public virtual Place Place { get; set; }

        public virtual ICollection<Vibe> Vibes { get; set; }
    }
}
