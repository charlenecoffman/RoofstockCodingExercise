using Microsoft.AspNetCore.Cors;
using Microsoft.AspNetCore.Mvc;
using Newtonsoft.Json;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace PropertiesAPI
{
    [ApiController]
    [Route("[controller]")]
    public class PropertyController : ControllerBase
    {
        private IPropertyService _propertyService;

        public PropertyController(IPropertyService propertyService)
        {
            _propertyService = propertyService;
        }

        [HttpGet]
        public List<PropertyResponse> GetAllProperties()
        {
            var allPropertiesInDb = _propertyService.GetProperties().Select(p => p.ToPropertyResponse(true));
            var resultSet = _propertyService.GetPropertiesFromApi().Where(p => allPropertiesInDb.All(d => d.PropertyId != p.PropertyId));            
            return allPropertiesInDb.Concat(resultSet.Select(p => p.ToPropertyResponse(false))).ToList();
        }

        [HttpPost]
        public ActionResult SaveProperty(Property property)
        {
            _propertyService.SaveProperty(property);
            return new OkResult();
        }
    }
}
