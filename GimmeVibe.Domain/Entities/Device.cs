using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Data.Entity.Spatial;
using GimmeVibe.Domain.Aggregates;

namespace GimmeVibe.Domain.Entities
{
    public partial class Device : IEntity
    {
        public Device()
        {
            CreationDate = DateTime.Now;

            Vibes = new HashSet<Vibe>();
        }

        public int Id { get; set; }

        [Required]
        public string UUID { get; set; }

        [StringLength(50)]
        public string Platform { get; set; }

        [StringLength(50)]
        public string Version { get; set; }

        [StringLength(50)]
        public string Model { get; set; }

        public DateTime CreationDate { get; set; }

        public virtual ICollection<Vibe> Vibes { get; set; }
    }
}
