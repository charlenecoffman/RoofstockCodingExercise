using System;

namespace PropertiesAPI.JsonModels
{
    public class Property
    {
        public long Id { get; set; }
        public Address Address { get; set; }
        public Financial Financial { get; set; }
        public Physical Physical { get; set; }

        internal PropertiesAPI.Property ToDataProperty()
        {
            return new PropertiesAPI.Property
            {
                Address = new PropertiesAPI.Address
                {
                    Address1 = Address.Address1,
                    Address2 = Address.Address2,
                    City = Address.City,
                    State = Address.State,
                    District = Address.District,
                    County = Address.County,
                    Country = Address.Country,
                    ZipCode = Address.Zip,
                    ZipPlus4 = Address.ZipPlus4
                },
                PropertyId = Id,
                ListPrice = Financial?.ListPrice ?? 0,
                MonthlyRent = Financial?.MonthlyRent,
                YearBuilt = Physical?.YearBuilt ?? 0
            };
        }
    }

}
