using FluentMigrator;

namespace PropertiesAPI.Scripts
{
	[Maintenance(MigrationStage.BeforeAll, TransactionBehavior.None)]
	public class ScriptsToAlwaysRunBeforeDeployment : Migration
	{
		public override void Up()
		{
			ObtainDeploymentLock();
			/**************************************************
			 Don't place any script or action above this line.
			 This enforces that only one deployment can be active
			 in a given database.
			***************************************************/

			Execute.Script(@".\Scripts\PreDeploy\A_AlwaysRunBeforeDeployment.sql");	
		}
		
		public override void Down()
		{
			/* This is not used for maintenance scripts */
			return;
		}

		private void ObtainDeploymentLock()
		{
			const string sql = @"
				declare @lockResult int;
				exec @lockResult = sp_getapplock 'RoofstockProperties_deployment_lock', 'Exclusive', 'Session';

				if(@lockResult < 0)
				begin
					raiserror('Unable to obtain an application lock for deployment.  This is usually caused by another deployment in process on this server.', 16, 1);
					return;
				end
			";

			Execute.Sql(sql);
		}
	}
}