using System;
using FluentMigrator.Runner;
using Microsoft.Data.SqlClient;
using Microsoft.Extensions.DependencyInjection;

namespace PropertiesAPI
{
    static class Program
    {
        static string ConnectionString = $@"server=.;database=RoofstockProperty;integrated security=true";
        static string InitialConnectionString = @"server=.;database=master;integrated security=true";

        static void Main(string[] args)
        {
            //Run this script to create the intial database. This is usually done manually where I work.
            //Fluent Migrator doesn't have a great solution so I just wrote this quick script:
            var scriptString = "IF NOT EXISTS(SELECT * FROM sys.databases WHERE name='RoofstockProperty') " + 
                                "BEGIN " + 
                                "CREATE DATABASE [RoofstockProperty] " +
                                "END ";

            using (var connection = new SqlConnection(InitialConnectionString))
            {
                connection.Open();

                using (var command = new SqlCommand(scriptString, connection))
                {
                    command.ExecuteNonQuery();
                }
            }

            var service = CreateFluentMigratorService();

            //This will migrate the latest changes
            using (var scope = service.CreateScope())
                MigrateDatabaseUp(scope.ServiceProvider);
        }

        private static IServiceProvider CreateFluentMigratorService() =>
            new ServiceCollection()
                .AddFluentMigratorCore()
                .ConfigureRunner(r =>
                    r
                        .AddSqlServer()
                        .WithGlobalConnectionString(ConnectionString)
                        .ScanIn(typeof(Program).Assembly)
                        .For
                        .Migrations()
                )
                .AddLogging(log => log.AddFluentMigratorConsole())
                .BuildServiceProvider(false);

        private static void MigrateDatabaseUp(IServiceProvider serviceProvider) =>
            serviceProvider
                .GetRequiredService<IMigrationRunner>()
                .MigrateUp();

        //Call this from the Main program when testing changes and needing the entire database migrations walked back
        private static void MigrateDatabaseDown(IServiceProvider serviceProvider) =>
            serviceProvider
                .GetRequiredService<IMigrationRunner>()
                .MigrateDown(0);
    }
}
