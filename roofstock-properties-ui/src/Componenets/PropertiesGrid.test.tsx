import { fireEvent, render, screen } from "@testing-library/react";
import PropertiesGrid from "./PropertiesGrid";
import { IPropertyStore } from "../Stores/PropertyStore";
import { IClient, PropertyResponse } from "../Client/PropertyClient";
import StoreContext from "../Contexts/StoreContext";
import ServiceContext from "../Contexts/ServiceContext";
import Any from "../TestHelpers/Any";

let service: IClient;
let store: IPropertyStore;
test("Shows button when not in DB", () => {
  store = getStore();
  service = getService();

  var property = Any.RandomPropertyResponse();
  property.isSaved = false;
  store.properties.push(property);

  callRender();

  const theButton = screen.getByRole("button");
  expect(theButton).toBeInTheDocument();
  fireEvent.click(theButton);
  expect(service.property).toHaveBeenCalled();
  expect(store.updateProperty).toHaveBeenCalled();
});

test("Shows no button when in DB", () => {
  store = getStore();
  service = getService();

  var property = Any.RandomPropertyResponse();
  property.isSaved = true;
  store.properties.push(property);

  callRender();

  const button = screen.queryByRole("button");
  expect(button).toBeFalsy();
});

test("Calls service and store on update", () => {
  store = getStore();
  service = getService();

  var property = Any.RandomPropertyResponse();
  property.isSaved = false;
  store.properties.push(property);

  callRender();

  const theButton = screen.getByRole("button");
  fireEvent.click(theButton);
  expect(service.property).toHaveBeenCalled();
  expect(store.updateProperty).toHaveBeenCalled();
});

function getStore() {
  return {
    properties: [] as PropertyResponse[],
    updateProperty: jest.fn(),
    insertPropertiesCollection: jest.fn(),
  };
}

function getService() {
  return {
    propertyAll: jest.fn(),
    property: jest.fn(),
  };
}

function callRender() {
  render(
    <ServiceContext.Provider value={service}>
      <StoreContext.Provider value={store}>
        <PropertiesGrid />
      </StoreContext.Provider>
    </ServiceContext.Provider>,
  );
}
