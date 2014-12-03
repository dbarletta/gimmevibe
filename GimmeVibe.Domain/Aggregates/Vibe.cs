namespace GimmeVibe.Domain.Infrastructure.EntityFramework
{
    using System;
    using System.Collections.Generic;
    using System.ComponentModel.DataAnnotations;
    using System.ComponentModel.DataAnnotations.Schema;
    using System.Data.Entity.Spatial;

    public partial class Vibe
    {
        public long Id { get; set; }

        public int DeviceId { get; set; }

        public int EmotionId { get; set; }

        public int PlaceId { get; set; }

        public int? AsteriskId { get; set; }

        [StringLength(10)]
        public string Comment { get; set; }

        public DateTime CreationDate { get; set; }

        public virtual Asterisk Asterisk { get; set; }

        public virtual Device Device { get; set; }

        public virtual Emotion Emotion { get; set; }

        public virtual Place Place { get; set; }
    }
}
