/* eslint-disable react-hooks/exhaustive-deps */
import React, { useContext } from "react";
import App from "../App";
import { PropertyResponse } from "../Client/PropertyClient";
import ServiceContext from "../Contexts/ServiceContext";
import StoreContext from "../Contexts/StoreContext";

const Wrapper: React.FC = () => {
  const service = useContext(ServiceContext);
  const store = useContext(StoreContext);

  const getProperties = async () => {
    const properties = await service?.propertyAll();
    store?.insertPropertiesCollection(properties ?? ([] as PropertyResponse[]));
  };

  React.useEffect(() => {
    Promise.all([getProperties()]);
  }, []);

  return (
    <ServiceContext.Provider value={service}>
      <StoreContext.Provider value={store}>
        <App />
      </StoreContext.Provider>
    </ServiceContext.Provider>
  );
};

export default Wrapper;
