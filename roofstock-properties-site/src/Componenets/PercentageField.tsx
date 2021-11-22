import React from "react";

export interface IPercentageFieldProps {
  somePercent: number;
}

const PercentageField: React.FC<IPercentageFieldProps> = (props) => {
  return <React.Fragment>{props.somePercent.toFixed(1)}%</React.Fragment>;
};

export default PercentageField;
