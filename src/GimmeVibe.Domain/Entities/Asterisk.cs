using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Data.Entity.Spatial;
using System.Text.RegularExpressions;
using GimmeVibe.Domain.Aggregates;

namespace GimmeVibe.Domain.Entities
{
    public partial class Asterisk : IEntity
    {

        public Asterisk()
        {
            this.CreationDate = DateTime.Now;
            Vibes = new HashSet<Vibe>();
        }

        public Asterisk(string vibeComment) : this()
        {
            if(_regex.IsMatch(vibeComment))
            {
                var matches = _regex.Matches(vibeComment);
                this.Code = matches[0].Value;
            }
        }

        public int Id { get; set; }

        [Required]
        [StringLength(50)]
        public string Code { get; set; }

        public DateTime CreationDate { get; set; }

        public int PlaceId { get; set; }

        public virtual Place Place { get; set; }

        public virtual ICollection<Vibe> Vibes { get; set; }


        private static Regex _regex = new Regex(@"(?<=\*)\w+");
    }
}
