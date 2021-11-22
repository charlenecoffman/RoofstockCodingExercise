import { TableRow, TableCell, Button } from "@mui/material";
import CheckIcon from "@mui/icons-material/Check";
import React, { useState } from "react";
import MoneyField from "./MoneyField";
import PercentageField from "./PercentageField";
import { PropertyResponse } from "../Client/PropertyClient";
import AddressCell from "./AddressCell";

export interface IPropertiesGridRowProps {
  property: PropertyResponse;
  handleSaveClicked: (property: PropertyResponse) => void;
}

const PropertiesGridRow: React.FC<IPropertiesGridRowProps> = (props) => {
  const [isSaved, setIsSaved] = useState(props.property.isSaved ?? false);
  return (
    <TableRow key={props.property.propertyId}>
      {props.property.address && <AddressCell address={props.property.address} />}
      <TableCell align="right">{props.property.yearBuilt === 0 ? "" : props.property.yearBuilt}</TableCell>
      <TableCell align="right">
        <MoneyField dollarAmount={props.property.listPrice ?? 0} />
      </TableCell>
      <TableCell align="right">
        <MoneyField dollarAmount={props.property.monthlyRent ?? 0} />
      </TableCell>
      <TableCell align="right">
        <PercentageField somePercent={props.property.grossYield ?? 0} />
      </TableCell>
      <TableCell align="right">
        {isSaved && <CheckIcon />}
        {!isSaved && (
          <Button
            name="saveButton"
            variant="contained"
            onClick={() => {
              props.handleSaveClicked(props.property);
              setIsSaved(true);
            }}
          >
            Save
          </Button>
        )}
      </TableCell>
    </TableRow>
  );
};

export default PropertiesGridRow;
