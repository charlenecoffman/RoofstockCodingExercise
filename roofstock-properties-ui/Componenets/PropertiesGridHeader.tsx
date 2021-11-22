import { TableHead, TableRow, TableCell } from "@mui/material";
import React from "react";
import { useStyles } from "../Styles/PropertiesGridStyles";

const PropertiesGridHeader: React.FC = () => {
  const classes = useStyles();
  return (
    <TableHead className={classes.header}>
      <TableRow>
        <TableCell>Address</TableCell>
        <TableCell align="right">Year Built</TableCell>
        <TableCell align="right">List Price</TableCell>
        <TableCell align="right">Monthly Rent</TableCell>
        <TableCell align="right">Gross Yield</TableCell>
        <TableCell></TableCell>
      </TableRow>
    </TableHead>
  );
};

export default PropertiesGridHeader;
