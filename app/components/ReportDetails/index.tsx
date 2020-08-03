/**
 *
 * ReportDetails
 *
 */
import React, { memo } from 'react';
import { useStyles } from './styles';
import { Report } from 'containers/HomePage/types';
import Checkbox from '@material-ui/core/Checkbox';
import { Employee } from 'containers/App/types';
import moment from 'moment';
import PersonIcon from '@material-ui/icons/Person';
import ScheduleIcon from '@material-ui/icons/Schedule';
import DateRangeIcon from '@material-ui/icons/DateRange';
import { CheckboxProps } from '@material-ui/core/Checkbox';
import { withStyles } from '@material-ui/core/styles';

interface Props {
  report: Report;
  employee: Employee;
  index: number;
  onToggled: (state) => void;
}

const lulosoftOrange = '#ef8133';

const OrangeCheckbox = withStyles({
  root: {
    color: 'lightgray',
    '&$checked': {
      color: lulosoftOrange
    }
  },
  checked: {}
})((props: CheckboxProps) => <Checkbox color="default" {...props} />);

function ReportDetails(props: Props) {
  const classes = useStyles();
  return (
    <div className={classes.root}>
      <div className={classes.checkbox}>
        <OrangeCheckbox
          onChange={(event, checked) => {
            props.onToggled(checked);
          }}
          inputProps={{ 'aria-label': 'primary checkbox' }}
        />
      </div>
      <div className={classes.column}>
        <div className={classes.icon}>
          <PersonIcon style={{ color: lulosoftOrange }} />
        </div>
        <div>{`${props.employee.firstName} ${props.employee.lastName}`}</div>
      </div>
      <div className={classes.column}>
        <div className={classes.icon}>
          <ScheduleIcon style={{ color: lulosoftOrange }} />
        </div>
        <div>
          {props.report.tasks
            .map(task => task.hours)
            .reduce(
              (accumulator, currentValue) => accumulator + currentValue
            )}{' '}
          hrs
        </div>
      </div>
      <div className={classes.column}>
        <div className={classes.icon}>
          <DateRangeIcon style={{ color: lulosoftOrange }} />
        </div>
        <div>
          {moment(props.report.startDate).format('MMM, Do')} - {' '}
          {moment(props.report.endDate).format('MMM, Do')} (
          {moment(props.report.endDate).format('YYYY')})
        </div>
      </div>
    </div>
  );
}

export default memo(ReportDetails);
