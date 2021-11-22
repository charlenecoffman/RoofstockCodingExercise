import StoreContext from "../Contexts/StoreContext";
import PropertiesGrid from "./PropertiesGrid";
import Enzyme, { mount } from "enzyme";
import Adapter from "@wojtekmaj/enzyme-adapter-react-17";
import ServiceContext from "../Contexts/ServicesContext";
import { IClient, PropertyResponse } from "../Client/PropertyClient";
import { Any } from "../TestHelpers/Any";

Enzyme.configure({ adapter: new Adapter() });

test("CheckboxWithLabel changes the text after click", () => {
  const store = {
    insertPropertiesCollection: jest.fn(),
    updateProperty: jest.fn(),
    properties: [],
  };

  const service = {
    property: jest.fn(),
    propertyAll: jest.fn(),
  };

  const grid = mount(
    <ServiceContext.Provider value={service}>
      <StoreContext.Provider value={store}>
        <PropertiesGrid />
      </StoreContext.Provider>
    </ServiceContext.Provider>,
  );

  grid.find("Button").last().simulate("click");
  expect(store.updateProperty).toHaveBeenCalled();
});
