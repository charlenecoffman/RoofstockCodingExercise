# RoofstockCodingExercise

To run this application locally, please follow these steps:

1. Clone the repository, and open the RoofstockCodingExercise.sln found at RoofstockCodingExercise/PropertiesApi_And_Database/RoofstockCodingExercise.sln
2. Run the Net Core 2.2 console application PropertiesDatabase (RoofstockPropertyDatabase.csproj). This will create the database in SQL Server.
    - The following assumptions have been made for this to work:
      - The machine running this console application has SQLSERVER installed, and the user running the application has full write permissions to the master database.
      - The local instance of SQLSERVER can be found at ".". If this is not true, please adjust the connection strings [found here](https://github.com/charlenecoffman/RoofstockCodingExercise/blob/main/PropertiesApi_And_Database/PropertiesDatabase/Program.cs#L10)
3. After waiting for step 2 to finish completely, run a local instance of the main PropertiesAPI .NET 5.0 web API. This should spin up in a local browser window with the url https://localhost:44335. If this is not true, adjust the port/url [here](https://github.com/charlenecoffman/RoofstockCodingExercise/blob/main/PropertiesUI/src/Contexts/ServicesContext.ts#L4) 
4. Once step 3 is completed, open the roofstock-properties-ui solution. This is the UI.
5. This can be run in a few ways, one is to run the cli command ```react-scripts start``` inside of a terminal within the context of the solution.
6. This is the last step!

