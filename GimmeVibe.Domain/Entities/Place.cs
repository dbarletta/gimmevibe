namespace GimmeVibe.Domain.Infrastructure.EntityFramework
{
    using System;
    using System.Collections.Generic;
    using System.ComponentModel.DataAnnotations;
    using System.ComponentModel.DataAnnotations.Schema;
    using System.Data.Entity.Spatial;

    public partial class Place
    {
        public Place()
        {
            Asterisks = new HashSet<Asterisk>();
            Vibes = new HashSet<Vibe>();
        }

        [DatabaseGenerated(DatabaseGeneratedOption.None)]
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
