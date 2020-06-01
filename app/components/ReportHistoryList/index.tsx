/**
 *
 * ReportHistoryList
 *
 */
import React, { Fragment } from 'react';
import { Theme, createStyles, makeStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Divider from '@material-ui/core/Divider';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import IconButton from '@material-ui/core/IconButton';
import GetAppOutlinedIcon from '@material-ui/icons/GetAppOutlined';
import { Report } from 'containers/HomePage/types';
import { Customer } from '../../containers/HomePage/types.d';
import moment from 'moment';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      width: '100%',
      maxWidth: 360,
      backgroundColor: theme.palette.background.paper
    },
    noReports: {
        fontSize: '40px',
        color: '#cccccc',
        backgroundColor: '#fafafa',
        width: '120%'
    }
  })
);

interface OwnProps {
  reports: Report[];
  customer: Customer;
}

type Props = OwnProps;

function ReportsList(customerName: string, submittedReports: Report[]) {
    return (
        <List component="a" aria-label="main mailbox folders">
        {submittedReports.map((report, index) => (
          <Fragment key={index}>
            <ListItem>
              <ListItemText
                primary={`${customerName}  #${report.id}`}
                secondary={moment(report.startDate).format('MM-DD-YYYY')}
              />
              <ListItemSecondaryAction>
                <IconButton edge="end" aria-label="delete">
                  <GetAppOutlinedIcon />
                </IconButton>
              </ListItemSecondaryAction>
            </ListItem>
            <Divider />
          </Fragment>
        ))}
      </List>
    )
}

function NoReports(classes) {
    return (
        <div className={classes.noReports}>
            No reports to show
        </div>
    )
}

function ReportHistoryList(props: Props) {
  const classes = useStyles();
  const submittedReports = props.reports.filter((report) => report.submitted === true);

  return (
    <div className={classes.root}>
        {submittedReports.length ? ReportsList(props.customer.name, submittedReports) : NoReports(classes)}
    </div>
  );
}

export default ReportHistoryList;
