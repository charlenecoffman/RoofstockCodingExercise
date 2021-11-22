using FluentMigrator;

namespace PropertiesAPI.Scripts
{
	[Maintenance(MigrationStage.AfterAll, TransactionBehavior.None)]
	public class ScriptsToAlwaysRunAfterDeployment : Migration
	{
		public override void Up()
		{
			Execute.Script(@".\Scripts\PostDeploy\A_AlwaysRunAfterDeployment.sql");	

			/**************************************************
			 Don't place any script or action below this line.
			 This enforces that only one deployment can be active
			 in a given database.
			***************************************************/
			ReleaseDeploymentLock();
		}
		
		public override void Down()
		{
			/* This is not used for maintenance scripts */
			return;
		}

		private void ReleaseDeploymentLock() =>
			Execute.Sql(@"exec sp_releaseapplock 'RoofstockProperties_deployment_lock', 'Session';");
	}
}