import { fireEvent, render, screen } from "@testing-library/react";
import PropertiesGrid from "./PropertiesGrid";
import { IPropertyStore } from "../Stores/PropertyStore";
import { Address, IClient, PropertyResponse } from "../Client/PropertyClient";
import StoreContext from "../Contexts/StoreContext";
import ServiceContext from "../Contexts/ServicesContext";
import Any from "../TestHelpers/Any";
import { TableRow } from "@mui/material";

let service: IClient;
let store: IPropertyStore;
test("Shows button when not in DB", () => {
  store = {
    properties: [] as PropertyResponse[],
    updateProperty: jest.fn(),
    insertPropertiesCollection: jest.fn(),
  };
  service = {
    propertyAll: jest.fn(),
    property: jest.fn(),
  };
  var property = Any.RandomPropertyResponse();
  property.isSaved = false;
  store.properties.push(property);

  const result = render(
    <ServiceContext.Provider value={service}>
      <StoreContext.Provider value={store}>
        <PropertiesGrid />
      </StoreContext.Provider>
    </ServiceContext.Provider>,
  );

  const table = result.container.querySelector("TableBody");
  console.log(table);
  const tableRow = table?.querySelector("TableRow");
  console.log(tableRow);
  const theButton = tableRow?.querySelector("button")!;
  console.log(theButton);
  fireEvent.click(theButton);
  expect(service.property).toHaveBeenCalled();
});
