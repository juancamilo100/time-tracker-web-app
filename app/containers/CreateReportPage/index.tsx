import React, { useState } from 'react';
import MaterialTable, { Column } from 'material-table';
import { Task } from 'containers/HomePage/types';
import { connect } from 'react-redux';
import { Dispatch, compose } from 'redux';
import { createStructuredSelector } from 'reselect';
import { RootState } from './types';

interface Row {
  date: Date;
  task: string;
  hours: number;
}

interface TableState {
  columns: Array<Column<Row>>;
  data: Row[];
}

interface OwnProps {
    tasks: Task[];
}

interface StateProps {}
interface DispatchProps {}

type Props = StateProps & DispatchProps & OwnProps;

export function CreateReportTable(props: Props) { 
  const [state, setState] = useState<TableState>({
    columns: [
        { 
            title: 'Date', 
            field: 'date', 
            type: 'date',
            cellStyle: { width: 300 },
            headerStyle: { width: 200 } 
        },
        { 
            title: 'Task', 
            field: 'task',
            cellStyle: { width: 200, minWidth: 200 },
            headerStyle: { width: 200, minWidth: 200 } 
        },
        { 
            title: 'Hours', 
            field: 'hours', 
            type: 'numeric',
            cellStyle: { textAlign: 'center', paddingLeft: '43px' },
            headerStyle: { textAlign: 'center' } 
        }
    ],
    data: [
      { date: new Date(), task: 'Baran', hours: 34 },
    ],
  });

//   setState((prevState) => {
//     const data = [...prevState.data, ...props.tasks];
//     return { ...prevState, data };
//   });

  return (
    <MaterialTable
        localization={{
            header: {
                actions: ''
            },
        }}
        style={{padding: '50px'}}
        options={{
            search: false,
            paging: false
        }}
        title="Editable Example"
        columns={state.columns}
        data={state.data}
        editable={{
            onRowAdd: (newData) =>
            new Promise((resolve) => {
                setTimeout(() => {
                resolve();
                setState((prevState) => {
                    const data = [...prevState.data];
                    data.push(newData);
                    return { ...prevState, data };
                });
                }, 600);
            }),
            onRowUpdate: (newData, oldData) =>
            new Promise((resolve) => {
                setTimeout(() => {
                resolve();
                if (oldData) {
                    setState((prevState) => {
                    const data = [...prevState.data];
                    data[data.indexOf(oldData)] = newData;
                    return { ...prevState, data };
                    });
                }
                }, 600);
            }),
            onRowDelete: (oldData) =>
            new Promise((resolve) => {
                setTimeout(() => {
                resolve();
                setState((prevState) => {
                    const data = [...prevState.data];
                    data.splice(data.indexOf(oldData), 1);
                    return { ...prevState, data };
                });
                }, 600);
            }),
        }}
    />
  );
}

const mapStateToProps = createStructuredSelector<RootState, StateProps>({});

function mapDispatchToProps(
  dispatch: Dispatch,
  ownProps: OwnProps
): DispatchProps {
  return {
      
  };
}

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps
);

export default compose(withConnect)(CreateReportTable);
