using Microsoft.EntityFrameworkCore;
using Microsoft.VisualStudio.TestTools.UnitTesting;
using Moq;
using System;
using System.Linq;

namespace PropertiesAPI.Tests
{
    [TestClass]
    public class PropertyServiceShould
    {
        private PropertyService _service;
        private Mock<IHttpClientWrapper> _mockWrapper;
        private PropertyDatabaseContext _mockDb;
        private readonly string _apiData = System.IO.File.ReadAllText(@".\MockApiData.json");


        [TestInitialize]
        public void Initialize()
        {
            var options = new DbContextOptionsBuilder<PropertyDatabaseContext>()
            .UseInMemoryDatabase(databaseName: "PropertyDatabase")
            .Options;

            _mockDb = new PropertyDatabaseContext(options);

            _mockDb.Properties.Add(Any.Property());
            _mockDb.SaveChanges();

            _mockWrapper = new Mock<IHttpClientWrapper>();

            _mockWrapper.Setup(w => w.CallClient(It.IsAny<string>(), It.IsAny<string>())).Returns(_apiData);

            _service = new PropertyService(_mockDb, _mockWrapper.Object);
        }

        public void Dispose()
        {
            _mockDb.Dispose();
        }

        [TestMethod]
        public void ReturnPropertiesFromApi()
        {
            var properties = _service.GetPropertiesFromApi();
            Assert.IsNotNull(properties);
        }

        [TestMethod]
        public void ReturnPropertiesFromDatabase()
        {
            var properties = _service.GetProperties();
            Assert.IsNotNull(properties);
        }

        [TestMethod]
        public void SaveNewProperty()
        {
            var someNewProperty = Any.Property();
            _service.SaveProperty(someNewProperty);
            Assert.AreEqual(someNewProperty.PropertyId, _mockDb.Properties.Find(someNewProperty.PropertyId).PropertyId);
        }

        [TestMethod]
        public void UpdateExistingProperty()
        {
            var property = _mockDb.Properties.First();
            property.MonthlyRent = 999.99;
            _service.SaveProperty(property);

            Assert.AreEqual(1, _mockDb.Properties.Count(p => p.PropertyId == property.PropertyId));
        }
    }
}
