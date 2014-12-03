namespace GimmeVibe.Domain.Infrastructure.EntityFramework
{
    using System;
    using System.Collections.Generic;
    using System.ComponentModel.DataAnnotations;
    using System.ComponentModel.DataAnnotations.Schema;
    using System.Data.Entity.Spatial;

    public partial class Emotion
    {
        public Emotion()
        {
            Vibes = new HashSet<Vibe>();
        }

        [DatabaseGenerated(DatabaseGeneratedOption.None)]
        public int Id { get; set; }

        [Required]
        [StringLength(20)]
        public string Name { get; set; }

        [Required]
        [StringLength(100)]
        public string ImageUri { get; set; }

        [Required]
        [StringLength(21)]
        public string ColorRGB { get; set; }

        public string Description { get; set; }

        public virtual ICollection<Vibe> Vibes { get; set; }
    }
}
