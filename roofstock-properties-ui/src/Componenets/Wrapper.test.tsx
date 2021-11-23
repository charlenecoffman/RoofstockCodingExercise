import { fireEvent, render, screen } from "@testing-library/react";
import Wrapper from "./Wrapper";
import { IPropertyStore } from "../Stores/PropertyStore";
import { IClient, PropertyResponse } from "../Client/PropertyClient";
import StoreContext from "../Contexts/StoreContext";
import ServiceContext from "../Contexts/ServicesContext";
import Any from "../TestHelpers/Any";

let service: IClient;
let store: IPropertyStore;
test("Calls service and inserts into store when app first loads up", () => {
  store = getStore();
  service = getService();

  store.properties.push(Any.RandomPropertyResponse());
  callRender();
  expect(service.propertyAll).toHaveBeenCalled();
  expect(store.insertPropertiesCollection).toHaveBeenCalled();
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
        <Wrapper />
      </StoreContext.Provider>
    </ServiceContext.Provider>,
  );
}
