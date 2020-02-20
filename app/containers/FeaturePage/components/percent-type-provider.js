import * as React from "react";
import * as PropTypes from "prop-types";
import Input from "@material-ui/core/Input";
import { withStyles } from "@material-ui/core/styles";
import { DataTypeProvider } from "@devexpress/dx-react-grid";

const styles = {
  numericInput: {
    textAlign: "right",
    width: "100%",
  },
};

const getInputValue = value =>
  value === undefined ? "" : (value * 100).toFixed(1);

const Formatter = ({ value }) => `${getInputValue(value)}%`;

const EditorBase = ({ value, onValueChange, classes }) => {
  const handleChange = event => {
    const { value: targetValue } = event.target;
    if (targetValue === "") {
      onValueChange();
      return;
    }
    onValueChange(Math.min(Math.max(parseFloat(targetValue / 100), 0), 1));
  };
  return (
    <Input
      type="number"
      classes={{
        input: classes.numericInput,
      }}
      fullWidth
      value={getInputValue(value)}
      inputProps={{
        max: 100,
        min: 0,
        placeholder: "Filter...",
        step: 0.1,
      }}
      onChange={handleChange}
    />
  );
};

EditorBase.propTypes = {
  classes: PropTypes.object.isRequired,
  onValueChange: PropTypes.func.isRequired,
  value: PropTypes.number,
};

EditorBase.defaultProps = {
  value: undefined,
};

const Editor = withStyles(styles)(EditorBase);

const availableFilterOperations = [
  "equal",
  "notEqual",
  "greaterThan",
  "greaterThanOrEqual",
  "lessThan",
  "lessThanOrEqual",
];

export const PercentTypeProvider = props => (
  <DataTypeProvider
    formatterComponent={Formatter}
    editorComponent={Editor}
    availableFilterOperations={availableFilterOperations}
    {...props}
  />
);
