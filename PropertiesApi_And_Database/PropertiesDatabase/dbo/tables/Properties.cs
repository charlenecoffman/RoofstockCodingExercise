using FluentMigrator;

namespace PropertiesAPI.dbo.tables
{

    public class Properties
    {
        private const string TableName = "Properties";

        [Migration(MigrationSequence.CreateTableProperties, "Create dbo.Properties table")]
        public class Create : Migration
        {
            public override void Up()
            {
                Create.Table(TableName)
                     .WithColumn("PropertyId").AsInt64().PrimaryKey()
                     .WithColumn("YearBuilt").AsInt32()
                     .WithColumn("ListPrice").AsDouble()
                     .WithColumn("MonthlyRent").AsDouble().Nullable()
                     .WithColumn("AddressId").AsInt32().ForeignKey("Address", "AddressId");

            }
            public override void Down()
            {
                Delete.Table(TableName);
            }
        }


    }
}

