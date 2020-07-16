import React, { useState, useEffect } from 'react';
import MaterialTable from 'material-table';
import reducer from './reducer';
import { Report, Task, Customer } from 'containers/HomePage/types';
import { connect } from 'react-redux';
import { Dispatch, compose } from 'redux';
import { createStructuredSelector } from 'reselect';
import { RootState } from './types';
import AddBoxIcon from '@material-ui/icons/AddBox';
import { useStyles } from './styles';
import {
  createReportAction,
  createReportTaskAction,
  clearReportTaskCreationErrorAction,
  updateReportTaskAction,
  deleteReportTaskAction,
  submitReportAction,
  clearReportTaskUpdateErrorAction,
  clearReportTaskDeleteErrorAction,
  clearSubmitReportErrorAction
} from './actions';
import { useInjectSaga } from 'utils/injectSaga';
import saga from './saga';
import {
  makeSelectCreateReportFailed,
  makeSelectCreateReportTaskFailed,
  makeSelectUpdateReportTaskFailed,
  makeSelectDeleteReportTaskFailed,
  makeSelectSubmiteReportFailed
} from './selectors';
import DateFnsUtils from '@date-io/date-fns';
import { DatePicker, MuiPickersUtilsProvider } from '@material-ui/pickers';
import moment from 'moment';
import { Employee } from 'containers/App/types';
import { useAlert } from 'react-alert';
import { useInjectReducer } from 'utils/injectReducer';
import { Button } from '@material-ui/core';
import Icon from '@material-ui/core/Icon';
import { Theme, withStyles } from '@material-ui/core/styles';
import IconButton from '@material-ui/core/IconButton';

interface OwnProps {
  customer: Customer;
  employee: Employee;
  report?: Report;
}

interface StateProps {
  createReportFailed: Boolean;
  createReportTaskFailed: {
    state: boolean;
    rowId?: number;
  };
  updateReportTaskFailed: {
    state: boolean;
    oldData: object;
  };
  deleteReportTaskFailed: {
    state: boolean;
    oldData: object;
  };
  submitReportFailed: boolean;
}

interface DispatchProps {
  onCreateReport(
    startDate: Date,
    endDate: Date,
    customerId: number,
    employeeId: number,
    tasks: Task[]
  ): void;
  onCreateReportTask(
    report: Report,
    datePerformed: Date,
    hours: number,
    description: String,
    rowId: number
  ): void;
  onUpdateReportTask(
    taskId: number,
    reportId: number,
    datePerformed: Date,
    hours: number,
    description: String,
    oldData: object
  ): void;
  onDeleteReportTask(taskId: number, reportId: number, oldData: object): void;
  onSubmitReport(reportId: number): void;
  clearReportTaskCreationError(): void;
  clearReportTaskUpdateError(): void;
  clearReportTaskDeleteError(): void;
  clearReportSubmitError(): void;
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
    <h3 style={{ fontSize: '30px' }}>Create Report</h3>
    <IconButton
      aria-label="delete"
      onClick={() => createEmptyReport(props, datePickerState)}
      style={{
        width: '150px',
        height: '150px'
      }}
    >
      <AddBoxIcon style={{ fontSize: '90px' }} />
    </IconButton>

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

const taskDataIsValid = (props, data, alert) => {
  if (!data['datePerformed'] || !data['hours'] || !data['description']) {
    alert.show('All fields are required', {
      timeout: 4000,
      type: 'error',
      transition: 'scale'
    });
    return false;
  }

  if (
    !moment(data['datePerformed']).isBetween(
      props.report!.startDate,
      props.report!.endDate,
      undefined,
      '[]'
    )
  ) {
    alert.show('Task date should be within report dates', {
      timeout: 4000,
      type: 'error',
      transition: 'scale'
    });
    return false;
  }
  return true;
};

const SubmitButton = withStyles((theme: Theme) => ({
  root: {
    color: 'white',
    margin: 'auto 0',
    backgroundColor: '#ef8133',
    '&:hover': {
      backgroundColor: '#eeb388'
    }
  }
}))(Button);

const reportTable = (props: Props, columns, tableData, setTableData, alert) => (
  <>
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
        Report for ${moment(props.report!.startDate).format(
          'MMMM Do'
        )} - ${moment(props.report!.endDate).format('MMMM Do')}`}
      columns={columns}
      data={tableData}
      editable={{
        onRowAdd: newData =>
          new Promise((resolve, reject) => {
            // setTimeout(() => {
              if (!taskDataIsValid(props, newData, alert)) {
                return reject();
              }

              props.onCreateReportTask(
                props.report!,
                newData['datePerformed'],
                newData['hours'],
                newData['description'],
                tableData ? tableData.length : 0
              );

              setTableData([...(tableData ? tableData : []), newData]);
              resolve();
            // }, 0);
          }),
        onRowUpdate: (newData, oldData) =>
          new Promise((resolve, reject) => {
            // setTimeout(() => {
              if (!taskDataIsValid(props, newData, alert)) {
                return reject();
              }

              if (oldData) {
                props.onUpdateReportTask(
                  newData['id'],
                  newData['reportId'],
                  newData['datePerformed'],
                  newData['hours'],
                  newData['description'],
                  oldData
                );

                const dataUpdate = [...tableData];
                const index = oldData['tableData'].id;
                dataUpdate[index] = newData;
                setTableData([...dataUpdate]);

                resolve();
              }
            // }, 0);
          }),
        onRowDelete: oldData =>
          new Promise(resolve => {
            // setTimeout(() => {
              props.onDeleteReportTask(
                oldData['id'],
                oldData['reportId'],
                oldData
              );
              const dataDelete = [...tableData];
              const index = oldData['tableData'].id;
              dataDelete.splice(index, 1);
              setTableData([...dataDelete]);

              resolve();
            // }, 0);
          })
      }}
    />
    <div
      style={{ display: 'flex', justifyContent: 'center', marginTop: '20px' }}
    >
      <SubmitButton
        onClick={() => props.onSubmitReport(props.report!.id)}
        size="large"
        endIcon={<Icon>send</Icon>}
      >
        Submit
      </SubmitButton>
    </div>
  </>
);

const keyCreateReportPage = 'createReportPage';

export function CreateReportPage(props: Props) {
  useInjectSaga({ key: keyCreateReportPage, saga: saga });
  useInjectReducer({ key: keyCreateReportPage, reducer: reducer });
  const alert = useAlert();
  const classes = useStyles();

  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(moment().add(2, 'weeks'));

  console.log("Setting default value to: ");
  console.log(props.report && props.report.tasks);

  const [data, setData] = useState(props.report && props.report.tasks);

  useEffect(() => {
      console.log("Setting report tasks to: ");
      console.log(props.report && props.report.tasks);
      
      
    setData(props.report && props.report.tasks);
  });

  if (props.createReportTaskFailed.state) {
    revertReportTaskCreation(alert, data, props, setData);
    props.clearReportTaskCreationError();
  }

  if (props.updateReportTaskFailed.state) {
    revertReportTaskUpdate(alert, data, props, setData);
    props.clearReportTaskUpdateError();
  }

  if (props.deleteReportTaskFailed.state) {
    revertReportTaskDeletion(alert, data, props, setData);
    props.clearReportTaskDeleteError();
  }

  if (props.submitReportFailed) {
    alert.show('There was a problem submitting the report', {
      timeout: 4000,
      type: 'error',
      transition: 'scale'
    });
    props.clearReportSubmitError();
  }

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
    ? reportTable(props, columns, data, setData, alert)
    : createReportButton(props, classes, {
        startDate,
        endDate,
        setStartDate,
        setEndDate
      });
}

const mapStateToProps = createStructuredSelector<RootState, StateProps>({
  createReportFailed: makeSelectCreateReportFailed(),
  createReportTaskFailed: makeSelectCreateReportTaskFailed(),
  updateReportTaskFailed: makeSelectUpdateReportTaskFailed(),
  deleteReportTaskFailed: makeSelectDeleteReportTaskFailed(),
  submitReportFailed: makeSelectSubmiteReportFailed()
});

function revertReportTaskDeletion(
  alert: any,
  data: Task[] | undefined,
  props: Props,
  setData: React.Dispatch<React.SetStateAction<Task[] | undefined>>
) {
  alert.show('There was a problem deleting the task', {
    timeout: 4000,
    type: 'error',
    transition: 'scale'
  });
  setTimeout(() => {
    const newData = [...data!];
    newData.splice(
      props.deleteReportTaskFailed.oldData['tableData'].id,
      0,
      props.deleteReportTaskFailed.oldData
    );
    setData(newData);
  }, 0);
}

function revertReportTaskUpdate(
  alert: any,
  data: Task[] | undefined,
  props: Props,
  setData: React.Dispatch<React.SetStateAction<Task[] | undefined>>
) {
  alert.show('There was a problem updating the task', {
    timeout: 4000,
    type: 'error',
    transition: 'scale'
  });
  setTimeout(() => {
    const newData = [...data!];
    newData[props.updateReportTaskFailed.oldData['tableData'].id] =
      props.updateReportTaskFailed.oldData;
    setData(newData);
  }, 0);
}

function revertReportTaskCreation(
  alert: any,
  data: Task[] | undefined,
  props: Props,
  setData: React.Dispatch<React.SetStateAction<Task[] | undefined>>
) {
  alert.show('There was a problem saving the task', {
    timeout: 4000,
    type: 'error',
    transition: 'scale'
  });
  setTimeout(() => {
    const newData = [...data!];
    newData.splice(props.createReportTaskFailed.rowId!, 1);
    setData(newData);
  }, 0);
}

function mapDispatchToProps(
  dispatch: Dispatch,
  ownProps: OwnProps
): DispatchProps {
  return {
    onCreateReport: (
      startDate: Date,
      endDate: Date,
      customerId: number,
      employeeId: number,
      tasks: Task[]
    ) =>
      dispatch(
        createReportAction(startDate, endDate, customerId, employeeId, tasks)
      ),
    onCreateReportTask: (
      report: Report,
      datePerformed: Date,
      hours: number,
      description: String,
      rowId: number
    ) =>
      dispatch(
        createReportTaskAction(report, datePerformed, hours, description, rowId)
      ),
    onUpdateReportTask: (
      taskId: number,
      reportId: number,
      datePerformed: Date,
      hours: number,
      description: String,
      oldData: object
    ) =>
      dispatch(
        updateReportTaskAction(
          taskId,
          reportId,
          datePerformed,
          hours,
          description,
          oldData
        )
      ),
    onDeleteReportTask: (taskId: number, reportId: number, oldData: object) =>
      dispatch(deleteReportTaskAction(taskId, reportId, oldData)),
    clearReportTaskCreationError: () =>
      dispatch(clearReportTaskCreationErrorAction()),
    clearReportTaskUpdateError: () =>
      dispatch(clearReportTaskUpdateErrorAction()),
    clearReportTaskDeleteError: () =>
      dispatch(clearReportTaskDeleteErrorAction()),
    clearReportSubmitError: () => dispatch(clearSubmitReportErrorAction()),
    onSubmitReport: (reportId: number) =>
      dispatch(submitReportAction(reportId)),
    dispatch: dispatch
  };
}

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps
);

export default compose(withConnect)(CreateReportPage);
