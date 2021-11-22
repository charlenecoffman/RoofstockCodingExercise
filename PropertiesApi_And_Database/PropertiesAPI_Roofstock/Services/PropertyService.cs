using Microsoft.EntityFrameworkCore;
using Newtonsoft.Json;
using System.Collections.Generic;
using System.Linq;

namespace PropertiesAPI
{
    public class PropertyService : IPropertyService
    {
        PropertyDatabaseContext _context;
        IHttpClientWrapper _client;
        public PropertyService(PropertyDatabaseContext context, IHttpClientWrapper client)
        {
            _context = context;
            _client = client;
        }

        public IEnumerable<Property> GetPropertiesFromApi()
        {
            var url = "https://samplerspubcontent.blob.core.windows.net/public/properties.json";
            var result = JsonConvert.DeserializeObject<JsonObject>(_client.CallClient(url, "GET"));
            return result.Properties.Select(p => p.ToDataProperty()).ToList();
        }

        public List<Property> GetProperties()
        {
            return _context.Properties.AsQueryable().Include(x => x.Address).ToList();
        }

        public void SaveProperty(Property property)
        {
            var existingProperty = _context.Find<Property>(property.PropertyId);
            if(existingProperty == null)
            {
                _context.Add(property);
                _context.SaveChanges();
            }
            else
            {
                existingProperty.ListPrice = property.ListPrice;
                existingProperty.MonthlyRent = property.MonthlyRent;
                existingProperty.YearBuilt = property.YearBuilt;
                if(existingProperty.Address == null)
                {
                    var newAddress = new Address();
                    _context.Add(newAddress);
                    existingProperty.Address = newAddress;
                }
                existingProperty.Address.Address1 = property.Address.Address1;
                existingProperty.Address.Address2 = property.Address.Address2;
                existingProperty.Address.City = property.Address.City;
                existingProperty.Address.Country = property.Address.Country;
                existingProperty.Address.County = property.Address.County;
                existingProperty.Address.District = property.Address.District;
                existingProperty.Address.State = property.Address.State;
                existingProperty.Address.ZipCode = property.Address.ZipCode;
                existingProperty.Address.ZipPlus4 = property.Address.ZipPlus4;
                _context.SaveChanges();
            }
        }
    }
    
    internal class JsonObject
    {
        public List<JsonModels.Property> Properties { get; set; }
    }
}
