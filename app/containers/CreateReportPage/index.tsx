import React, { useState } from 'react';
import MaterialTable, { Column } from 'material-table';
import { Report, Task, Customer } from 'containers/HomePage/types';
import { connect } from 'react-redux';
import { Dispatch, compose } from 'redux';
import { createStructuredSelector } from 'reselect';
import { RootState } from './types';
import AddBoxIcon from '@material-ui/icons/AddBox';
import { useStyles } from './styles';
import { createReportAction, createReportTaskAction } from './actions';
import { useInjectSaga } from 'utils/injectSaga';
import saga from './saga';
import {
  makeSelectCreateReportFailed,
  makeSelectCreateReportTaskFailed
} from './selectors';
import DateFnsUtils from '@date-io/date-fns';
import { DatePicker, MuiPickersUtilsProvider } from '@material-ui/pickers';
import moment from 'moment';
import { Employee } from 'containers/App/types';

interface OwnProps {
  customer: Customer;
  employee: Employee;
  report?: Report;
}

interface StateProps {
  createReportFailed: Boolean;
  createReportTaskFailed: Boolean;
}
interface DispatchProps {
  onCreateReport(
    startDate: Date,
    endDate: Date,
    customerId: Number,
    employeeId: Number,
    tasks: Task[]
  ): void;
  onCreateReportTask(
    report: Report,
    datePerformed: Date,
    hoursSpent: Number,
    taskDescription: String
  ): void;
  dispatch: Dispatch;
}

type Props = StateProps & DispatchProps & OwnProps;

const createEmptyReport = (props: Props, datePickerState) => {

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

const reportTable = (props: Props, columns, tableData, setTableData) => (
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
    title={`
        Report for 
        ${moment(props.report?.startDate).format('MMMM Do YYYY')} - 
        ${moment(props.report?.endDate).format('MMMM Do YYYY')}`
    }
    columns={columns}
    data={tableData}
    editable={{
      onRowAdd: newData =>
        new Promise(resolve => {
          setTimeout(() => {
            props.onCreateReportTask(
              props.report!,
              newData['datePerformed'],
              newData['hours'],
              newData['description']
            );
            setTableData([...(tableData ? tableData : []), newData]);
            resolve();
          }, 0);
        }),
      onRowUpdate: (newData, oldData) =>
        new Promise(resolve => {
          setTimeout(() => {
            if (oldData) {
                const dataUpdate = [...tableData];
                const index = oldData['tableData'].id;
                dataUpdate[index] = newData;
                setTableData([...dataUpdate]);
  
                resolve();
            }
          }, 0);
        }),
      onRowDelete: oldData =>
        new Promise(resolve => {
          setTimeout(() => {
            const dataDelete = [...tableData];
            const index = oldData['tableData'].id;
            dataDelete.splice(index, 1);
            setTableData([...dataDelete]);
            
            resolve()
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

  const [data, setData] = useState(props.report && props.report.tasks);
  const [columns, setColumns] = useState([
    {
      title: 'Date',
      field: 'datePerformed',
      type: 'date',
      cellStyle: { width: 300 },
      headerStyle: { width: 200, fontWeight: 'bold' }
    },
    {
      title: 'Task Description',
      field: 'description',
      cellStyle: { width: 200, minWidth: 200 },
      headerStyle: { width: 200, minWidth: 200, fontWeight: 'bold' }
    },
    {
      title: 'Hours',
      field: 'hours',
      type: 'numeric',
      cellStyle: { textAlign: 'left' },
      headerStyle: { textAlign: 'left', fontWeight: 'bold' }
    }
  ]);

  return props.report
    ? reportTable(props, columns, data, setData)
    : createReportButton(props, classes, {
        startDate,
        endDate,
        setStartDate,
        setEndDate
      });
}

const mapStateToProps = createStructuredSelector<RootState, StateProps>({
  createReportFailed: makeSelectCreateReportFailed(),
  createReportTaskFailed: makeSelectCreateReportTaskFailed()
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
    onCreateReportTask: (
      report: Report,
      datePerformed: Date,
      hours: Number,
      description: String
    ) =>
      dispatch(
        createReportTaskAction(
          report,
          datePerformed,
          hours,
          description
        )
      ),
    dispatch: dispatch
  };
}

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps
);

export default compose(withConnect)(CreateReportPage);
