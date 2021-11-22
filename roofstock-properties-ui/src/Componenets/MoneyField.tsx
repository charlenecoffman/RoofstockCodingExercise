import React from "react";

export interface IMoneyFieldProps {
  dollarAmount: number;
}

const MoneyField: React.FC<IMoneyFieldProps> = (props) => {
  return <React.Fragment>${props.dollarAmount.toLocaleString(undefined, { minimumFractionDigits: 2 })}</React.Fragment>;
};

export default MoneyField;
