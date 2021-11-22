import { TableCell } from "@mui/material";
import React from "react";
import { Address } from "../Client/PropertyClient";

export interface IAddressCellProps {
  address: Address;
}

const AddressCell: React.FC<IAddressCellProps> = (props) => {
  return (
    <TableCell component="th" scope="row">
      <p>{props.address.address1}</p>
      <p>{props.address.address2}</p>
      <p>
        {props.address.city}, {props.address.state} {props.address.zipCode}
      </p>
      <p>
        {props.address.county} {props.address.district} {props.address.country}
      </p>
    </TableCell>
  );
};

export default AddressCell;
