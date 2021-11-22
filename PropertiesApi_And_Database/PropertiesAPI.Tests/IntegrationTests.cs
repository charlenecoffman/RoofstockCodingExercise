using Microsoft.EntityFrameworkCore;
using Microsoft.VisualStudio.TestTools.UnitTesting;
using Moq;

namespace PropertiesAPI.Tests
{
    [TestClass]
    [TestCategory("IntegrationTests")]
    public class IntegrationTests
    {
        private PropertyDatabaseContext mockContext;
        private IHttpClientWrapper wrapper;
        private IPropertyService service;
        private PropertyController controller;

        public IntegrationTests()
        {

            var options = new DbContextOptionsBuilder<PropertyDatabaseContext>()
                .UseInMemoryDatabase(databaseName: "PropertyDatabase")
                .Options;

            mockContext = new PropertyDatabaseContext(options);
            wrapper = new HttpClientWrapper();
            service = new PropertyService(mockContext, wrapper);
            controller = new PropertyController(service);
        }

        [TestMethod]
        public void RunTheFullTest()
        {
            var properties = controller.GetAllProperties();
            Assert.IsNotNull(properties);
        }
    }
}
