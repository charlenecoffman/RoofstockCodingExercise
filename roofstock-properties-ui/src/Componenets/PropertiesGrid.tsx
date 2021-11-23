import { TableContainer, Paper, Table, TableBody, Grid } from "@mui/material";
import React from "react";
import PropertiesGridHeader from "./PropertiesGridHeader";
import StoreContext from "../Contexts/StoreContext";
import { observer } from "mobx-react-lite";
import PropertyGridRow from "./PropertyGridRow";
import { PropertyResponse } from "../Client/PropertyClient";
import ServiceContext from "../Contexts/ServicesContext";

const PropertiesGrid: React.FC = observer(() => {
  const store = React.useContext(StoreContext);
  const service = React.useContext(ServiceContext);
  const handleClick = (property: PropertyResponse) => {
    service?.property(property);
    property.isSaved = true;
    store.updateProperty(property);
  };

  return (
    <Grid container justifyContent="center" alignItems="center">
      <Grid item xs={10}>
        <TableContainer component={Paper}>
          <Table aria-label="simple table">
            <PropertiesGridHeader />
            <TableBody>
              {store.properties.map((property) => (
                <PropertyGridRow key={property.propertyId} property={property} handleSaveClicked={handleClick} />
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Grid>
    </Grid>
  );
});

export default PropertiesGrid;
