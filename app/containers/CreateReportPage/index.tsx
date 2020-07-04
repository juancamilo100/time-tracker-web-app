import React, { useState } from 'react';
import MaterialTable, { Column } from 'material-table';
import { Report, Task, Customer } from 'containers/HomePage/types';
import { connect } from 'react-redux';
import { Dispatch, compose } from 'redux';
import { createStructuredSelector } from 'reselect';
import { RootState } from './types';
import AddBoxIcon from '@material-ui/icons/AddBox';
import { useStyles } from './styles';
import { createReportAction, updateReportTaskAction } from './actions';
import { useInjectSaga } from 'utils/injectSaga';
import saga from './saga';
import { makeSelectCreateReportFailed, makeSelectReports } from './selectors';
import DateFnsUtils from '@date-io/date-fns';
import { DatePicker, MuiPickersUtilsProvider } from '@material-ui/pickers';
import moment from 'moment';
import { Employee } from 'containers/App/types';

interface Row {
  datePerformed: Date;
  taskDescription: string;
  hoursSpent: number;
}

interface TableState {
  columns: Array<Column<Row>>;
  data: Row[];
}

interface OwnProps {
  customer: Customer;
  employee: Employee;
}

interface StateProps {
  createReportFailed: Boolean;
  reports: Report[];
}
interface DispatchProps {
  onCreateReport(
    startDate: Date,
    endDate: Date,
    customerId: Number,
    employeeId: Number,
    tasks: Task[]
  ): void;
  onUpdateReportTask(): void
  dispatch: Dispatch;
}

type Props = StateProps & DispatchProps & OwnProps;

const createEmptyReport = (props: Props, datePickerState) => {
  // console.log("Creating empty report:");

  props.onCreateReport(
    datePickerState.startDate,
    datePickerState.endDate,
    props.customer.id,
    props.employee.id,
    []
  );
};

const createReportButton = (props, classes, datePickerState) => (
  <div className={classes.addReport}>
    <AddBoxIcon
      onClick={() => createEmptyReport(props, datePickerState)}
      className={classes.addReportIcon}
    />
    <h3>Create Report for Dates:</h3>
    <div className={classes.datePickers}>
      <MuiPickersUtilsProvider utils={DateFnsUtils}>
        <DatePicker
          label="Start Date"
          value={datePickerState.startDate}
          onChange={datePickerState.setStartDate}
        />
        <DatePicker
          label="End Date"
          value={datePickerState.endDate}
          onChange={datePickerState.setEndDate}
        />
      </MuiPickersUtilsProvider>
    </div>
  </div>
);

const reportTable = (props, tableState, setState) => (
  <MaterialTable
    localization={{
      header: {
        actions: ''
      }
    }}
    style={{ padding: '50px' }}
    options={{
      search: false,
      paging: false
    }}
    title="Report:"
    columns={tableState.columns}
    data={tableState.data}
    editable={{
      onRowAdd: newData =>
        new Promise(resolve => {
          setTimeout(() => {
            resolve();
            setState(prevState => {
              console.log('Creating data:');
              console.log(newData);
              const data = [...prevState.data];
              data.push(newData);
              return { ...prevState, data };
            });
          }, 0);
        }),
      onRowUpdate: (newData, oldData) =>
        new Promise(resolve => {
          setTimeout(() => {
            resolve();
            if (oldData) {
              setState(prevState => {
                console.log('Updating data:');
                console.log(newData);

                const data = [...prevState.data];
                data[data.indexOf(oldData)] = newData;
                return { ...prevState, data };
              });
            }
          }, 0);
        }),
      onRowDelete: oldData =>
        new Promise(resolve => {
          setTimeout(() => {
            resolve();
            setState(prevState => {
              console.log('Deleting data:');
              console.log(oldData);
              const data = [...prevState.data];
              data.splice(data.indexOf(oldData), 1);
              return { ...prevState, data };
            });
          }, 0);
        })
    }}
  />
);

const keyCreateReportPage = 'createReportPage';

export function CreateReportPage(props: Props) {
  useInjectSaga({ key: keyCreateReportPage, saga: saga });
  const classes = useStyles();

  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(moment().add(2, 'weeks'));

  const [tableState, setTableState] = useState<TableState>({
    columns: [
      {
        title: 'Date',
        field: 'datePerformed',
        type: 'date',
        cellStyle: { width: 300 },
        headerStyle: { width: 200, fontWeight: 'bold' }
      },
      {
        title: 'Task Description',
        field: 'taskDescription',
        cellStyle: { width: 200, minWidth: 200 },
        headerStyle: { width: 200, minWidth: 200, fontWeight: 'bold' }
      },
      {
        title: 'Hours',
        field: 'hoursSpent',
        type: 'numeric',
        cellStyle: { textAlign: 'left' },
        headerStyle: { textAlign: 'left', fontWeight: 'bold' }
      }
    ],
    data: [
      //   { datePerformed: new Date(), taskDescription: 'Baran asdfasdfkhalsdfhajsdlfhajsdklfhjahdlsfhjasd adsjklfhadskljfhadjksl ', hoursSpent: 34 },
    ]
  });

  return props.reports.find(report => report.submitted === false)
    ? reportTable(props, tableState, setTableState)
    : createReportButton(props, classes, {
        startDate,
        endDate,
        setStartDate,
        setEndDate
      });
}

const mapStateToProps = createStructuredSelector<RootState, StateProps>({
  createReportFailed: makeSelectCreateReportFailed(),
  reports: makeSelectReports()
});

function mapDispatchToProps(
  dispatch: Dispatch,
  ownProps: OwnProps
): DispatchProps {
  return {
    onCreateReport: (
      startDate: Date,
      endDate: Date,
      customerId: Number,
      employeeId: Number,
      tasks: Task[]
    ) =>
      dispatch(
        createReportAction(startDate, endDate, customerId, employeeId, tasks)
      ),
    onUpdateReportTask: () => dispatch(updateReportTaskAction()),
    dispatch: dispatch
  };
}

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps
);

export default compose(withConnect)(CreateReportPage);
