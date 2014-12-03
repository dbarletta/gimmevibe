namespace GimmeVibe.Domain.Infrastructure.EntityFramework
{
    using System;
    using System.Collections.Generic;
    using System.ComponentModel.DataAnnotations;
    using System.ComponentModel.DataAnnotations.Schema;
    using System.Data.Entity.Spatial;

    public partial class Device
    {
        public Device()
        {
            Vibes = new HashSet<Vibe>();
        }

        [DatabaseGenerated(DatabaseGeneratedOption.None)]
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
