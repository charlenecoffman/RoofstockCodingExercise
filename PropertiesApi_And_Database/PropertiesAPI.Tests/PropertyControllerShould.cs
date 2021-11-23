using Microsoft.VisualStudio.TestTools.UnitTesting;
using Moq;
using System.Collections.Generic;
using System.Linq;

namespace PropertiesAPI.Tests
{
    [TestClass]
    public class PropertyControllerShould
    {
        private PropertyController _controller;
        private Mock<IPropertyService> _mockService;
        private List<Property> _databaseCollection;
        private List<Property> _apiCollection;

        [TestInitialize]
        public void Initialize()
        {
            _mockService = new Mock<IPropertyService>();

            _databaseCollection = Any.Properties().ToList();
            _apiCollection = Any.Properties().ToList();

            _mockService.Setup(s => s.GetProperties()).Returns(_databaseCollection);
            _mockService.Setup(s => s.GetPropertiesFromApi()).Returns(_apiCollection);

            _controller = new PropertyController(_mockService.Object);
        }

        [TestMethod]
        public void GetAllProperties()
        {
            var properties = _controller.GetAllProperties();
            Assert.IsNotNull(properties);
        }

        [TestMethod]
        public void GetAllProperties_WithoutDuplicates()
        {
            var newProperty = Any.Property();
            newProperty.PropertyId = 1;
            _databaseCollection.Add(newProperty);
            _apiCollection.Add(newProperty);

            var properties = _controller.GetAllProperties();
            
            Assert.AreEqual(1, properties.Count(p => p.PropertyId == 1));
        }

         [TestMethod]
        public void GetAllProperties_TakeDatabasePropertyAndLeaveApiProperty()
        {
            var newProperty1 = Any.Property();
            newProperty1.PropertyId = 1;
            newProperty1.YearBuilt = 2000;

            _databaseCollection.Add(newProperty1);

            var newProperty2 = Any.Property();
            newProperty2.PropertyId = 1;
            newProperty2.YearBuilt = 3000;

            _apiCollection.Add(newProperty2);

            var properties = _controller.GetAllProperties();
            Assert.AreEqual(2000, properties.FirstOrDefault(p => p.PropertyId == 1).YearBuilt);
        }
    }
}
