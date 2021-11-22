using System.Collections.Generic;

namespace PropertiesAPI
{
    public interface IPropertyService
    {
        IEnumerable<Property> GetPropertiesFromApi();
        List<Property> GetProperties();
        void SaveProperty(Property property);
    }
}