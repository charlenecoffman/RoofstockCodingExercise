using FluentMigrator;

namespace PropertiesAPI.dbo.tables
{

    public class Address
    {
        private const string TableName = "Address";

        [Migration(MigrationSequence.CreateTableAddress, "Create dbo.Address table")]
        public class Create : Migration
        {
            public override void Up()
            {
                Create.Table(TableName)
                       .WithColumn("AddressId").AsInt32().PrimaryKey().Identity()
                       .WithColumn("Address1").AsString(100).Nullable()
                       .WithColumn("Address2").AsString(100).Nullable()
                       .WithColumn("City").AsString(100).Nullable()
                       .WithColumn("Country").AsString(100).Nullable()
                       .WithColumn("County").AsString(100).Nullable()
                       .WithColumn("District").AsString(100).Nullable()
                       .WithColumn("State").AsString(100).Nullable()
                       .WithColumn("ZipCode").AsString(5).Nullable()
                       .WithColumn("ZipPlus4").AsString(4).Nullable();
            }
            public override void Down()
            {
                Delete.Table(TableName);
            }
        }


    }
}
