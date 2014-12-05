using System;
using System.Data.Entity;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using GimmeVibe.Domain.Entities;
using GimmeVibe.Domain.Aggregates;

namespace GimmeVibe.Domain.Infrastructure.EntityFramework
{
    public partial class DbGimmeVibe : DbContext
    {
        public DbGimmeVibe()
            : base("name=DbGimmeVibe")
        {
        }

        public virtual DbSet<Asterisk> Asterisks { get; set; }
        public virtual DbSet<Device> Devices { get; set; }
        public virtual DbSet<Emotion> Emotions { get; set; }
        public virtual DbSet<Place> Places { get; set; }
        public virtual DbSet<Vibe> Vibes { get; set; }

        protected override void OnModelCreating(DbModelBuilder modelBuilder)
        {
            modelBuilder.Entity<Asterisk>()
                .Property(e => e.Code)
                .IsUnicode(false);

            modelBuilder.Entity<Device>()
                .Property(e => e.UUID)
                .IsUnicode(false);

            modelBuilder.Entity<Device>()
                .Property(e => e.Platform)
                .IsUnicode(false);

            modelBuilder.Entity<Device>()
                .Property(e => e.Version)
                .IsUnicode(false);

            modelBuilder.Entity<Device>()
                .Property(e => e.Model)
                .IsUnicode(false);

            modelBuilder.Entity<Device>()
                .HasMany(e => e.Vibes)
                .WithRequired(e => e.Device)
                .WillCascadeOnDelete(false);

            modelBuilder.Entity<Emotion>()
                .Property(e => e.Name)
                .IsUnicode(false);

            modelBuilder.Entity<Emotion>()
                .Property(e => e.ImageUri)
                .IsUnicode(false);

            modelBuilder.Entity<Emotion>()
                .Property(e => e.ColorRGB)
                .IsUnicode(false);

            modelBuilder.Entity<Emotion>()
                .Property(e => e.Description)
                .IsUnicode(false);

            modelBuilder.Entity<Emotion>()
                .HasMany(e => e.Vibes)
                .WithRequired(e => e.Emotion)
                .WillCascadeOnDelete(false);

            modelBuilder.Entity<Place>()
                .Property(e => e.Name)
                .IsUnicode(false);

            modelBuilder.Entity<Place>()
                .Property(e => e.PhotoUrl)
                .IsUnicode(false);

            modelBuilder.Entity<Place>()
                .Property(e => e.Rating)
                .IsUnicode(false);

            modelBuilder.Entity<Place>()
                .Property(e => e.GooglePlaceId)
                .IsUnicode(false);

            modelBuilder.Entity<Place>()
                .HasMany(e => e.Asterisks)
                .WithRequired(e => e.Place)
                .WillCascadeOnDelete(false);

            modelBuilder.Entity<Place>()
                .HasMany(e => e.Vibes)
                .WithRequired(e => e.Place)
                .WillCascadeOnDelete(false);

            modelBuilder.Entity<Vibe>()
                .Property(e => e.Comment)
                .IsFixedLength();
        }
    }
}
