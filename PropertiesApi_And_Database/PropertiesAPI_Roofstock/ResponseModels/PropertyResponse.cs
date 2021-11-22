using System;

namespace PropertiesAPI
{
    public class PropertyResponse
    {
        public long PropertyId { get; set; }
        public int YearBuilt { get; set; }
        public double ListPrice { get; set; }
        public double? MonthlyRent { get; set; }
        public double? GrossYield
        {
            get
            {
                var annualRent = (MonthlyRent ?? 0.0 * 12);
                var divedByLP = annualRent / ListPrice;
                return  Double.IsNaN(divedByLP) ? null : Math.Round((divedByLP * 100), 1);
            }
        }
        public bool IsSaved { get; set; }
        public Address Address { get; set; }
    }
}
