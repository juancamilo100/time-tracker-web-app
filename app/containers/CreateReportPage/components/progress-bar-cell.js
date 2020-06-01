import * as React from "react";
import * as PropTypes from "prop-types";
import TableCell from "@material-ui/core/TableCell";
import { withStyles } from "@material-ui/core/styles";

const styles = theme => ({
  progressBar: {
    backgroundColor: theme.palette.primary.light,
    float: "left",
    height: theme.spacing(1),
  },
  progressBarCell: {
    paddingLeft: theme.spacing(1),
    paddingRight: theme.spacing(1),
  },
});

const ProgressBarCellBase = ({ value, classes, style }) => {
  const percent = value * 100;
  return (
    <TableCell className={classes.progressBarCell} style={style}>
      <div
        className={classes.progressBar}
        style={{ width: `${percent}%` }}
        title={`${percent.toFixed(1)}%`}
      />
    </TableCell>
  );
};

ProgressBarCellBase.defaultProps = {
  style: {},
};
ProgressBarCellBase.propTypes = {
  classes: PropTypes.object.isRequired,
  style: PropTypes.object,
  value: PropTypes.number.isRequired,
};

export const ProgressBarCell = withStyles(styles, { name: "ProgressBarCell" })(
  ProgressBarCellBase,
);
