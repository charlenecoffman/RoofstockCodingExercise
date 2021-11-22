using Microsoft.EntityFrameworkCore;

namespace PropertiesAPI
{
    public class PropertyDatabaseContext : DbContext
    {

        public PropertyDatabaseContext(DbContextOptions<PropertyDatabaseContext> options) : base(options) { }
        public virtual DbSet<Property> Properties { get; set; }
        public virtual DbSet<Address> Address { get; set; }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<Property>(entity =>
            {
                entity.Property(e => e.PropertyId);
                entity.Property(e => e.YearBuilt);
                entity.Property(e => e.MonthlyRent);
                entity.Property(e => e.ListPrice);
                entity.Property(e => e.AddressId);

                entity.HasOne(p => p.Address);
            });

            modelBuilder.Entity<Address>(entity =>
            {
                entity.Property(e => e.AddressId);
                entity.Property(e => e.Address1);
                entity.Property(e => e.Address2);
                entity.Property(e => e.City);
                entity.Property(e => e.Country);
                entity.Property(e => e.County);
                entity.Property(e => e.District);
                entity.Property(e => e.State);
                entity.Property(e => e.ZipCode);
                entity.Property(e => e.ZipPlus4);
            });
        }
    }
}
