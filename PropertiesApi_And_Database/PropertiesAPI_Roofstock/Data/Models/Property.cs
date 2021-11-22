namespace PropertiesAPI
{
    public class Property
    {
        public long PropertyId { get; set; }
        public int AddressId { get; set; }
        public int YearBuilt { get; set; }
        public double ListPrice { get; set; }
        public double? MonthlyRent { get; set; } 
        public virtual Address Address { get; set; }

        internal PropertyResponse ToPropertyResponse(bool FromDatabase)
        {
            return new PropertyResponse
            {
                PropertyId = PropertyId,
                YearBuilt = YearBuilt,
                MonthlyRent = MonthlyRent,
                ListPrice = ListPrice,
                Address = Address,
                IsSaved = FromDatabase
            };
        }
    }

}
