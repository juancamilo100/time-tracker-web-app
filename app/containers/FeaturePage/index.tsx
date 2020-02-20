import React, { useState, useCallback } from 'react';
import {
  SortingState,
  EditingState,
  PagingState,
  SummaryState,
  IntegratedPaging,
  IntegratedSorting,
  IntegratedSummary,
} from '@devexpress/dx-react-grid';
import {
  Grid,
  Table,
  TableHeaderRow,
  TableEditRow,
  TableEditColumn,
  PagingPanel,
  DragDropProvider,
  TableColumnReordering,
  TableFixedColumns,
  TableSummaryRow,
} from '@devexpress/dx-react-grid-material-ui';
import Paper from '@material-ui/core/Paper';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import Input from '@material-ui/core/Input';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import TableCell from '@material-ui/core/TableCell';

import DeleteIcon from '@material-ui/icons/Delete';
import EditIcon from '@material-ui/icons/Edit';
import SaveIcon from '@material-ui/icons/Save';
import CancelIcon from '@material-ui/icons/Cancel';
import { withStyles, makeStyles } from '@material-ui/core/styles';
import { CurrencyTypeProvider } from './components/currency-type-provider';
import { PercentTypeProvider } from './components/percent-type-provider';
import { generateRows, globalSalesValues } from './demo-data/generator';
import DateFnsUtils from '@date-io/date-fns';
import {
  MuiPickersUtilsProvider,
  KeyboardDatePicker,
} from '@material-ui/pickers';

const styles = theme => ({
  lookupEditCell: {
    padding: theme.spacing(1),
  },
  dialog: {
    width: 'calc(100% - 16px)',
  },
  inputRoot: {
    width: '100%',
  },
});

const AddButton = ({ onExecute }) => (
  <div style={{ textAlign: 'center' }}>
    <Button color="primary" onClick={onExecute} title="Create new row">
      Add Task
    </Button>
  </div>
);

const EditButton = ({ onExecute }) => (
  <IconButton onClick={onExecute} title="Edit row">
    <EditIcon />
  </IconButton>
);

const DeleteButton = ({ onExecute }) => (
  <IconButton
    onClick={useCallback(() => {
      // eslint-disable-next-line
      if (window.confirm('Are you sure you want to delete this row?')) {
        onExecute();
      }
    }, [])}
    title="Delete row"
  >
    <DeleteIcon />
  </IconButton>
);

const CommitButton = ({ onExecute }) => (
  <IconButton onClick={onExecute} title="Save changes">
    <SaveIcon />
  </IconButton>
);

const CancelButton = ({ onExecute }) => (
  <IconButton color="secondary" onClick={onExecute} title="Cancel changes">
    <CancelIcon />
  </IconButton>
);

const commandComponents = {
  add: AddButton,
  edit: EditButton,
  delete: DeleteButton,
  commit: CommitButton,
  cancel: CancelButton,
};

const Command = ({ id, onExecute }) => {
  const CommandButton = commandComponents[id];
  return <CommandButton onExecute={onExecute} />;
};

const availableValues = {
  product: globalSalesValues.product,
  region: globalSalesValues.region,
  customer: globalSalesValues.customer,
};

const LookupEditCellBase = ({
  availableColumnValues,
  value,
  onValueChange,
  classes,
}) => (
  <TableCell className={classes.lookupEditCell}>
    <Select
      value={value}
      onChange={useCallback(event => onValueChange(event.target.value), [])}
      input={<Input classes={{ root: classes.inputRoot }} />}
    >
      {availableColumnValues.map(item => (
        <MenuItem key={item} value={item}>
          {item}
        </MenuItem>
      ))}
    </Select>
  </TableCell>
);
export const LookupEditCell = withStyles(styles, {
  name: 'ControlledModeDemo',
})(LookupEditCellBase);

const Cell = props => {
  const { column } = props;
  if (column.name === 'discount') {
  }
  if (column.name === 'amount') {
  }
  return <Table.Cell {...props} />;
};

const EditCell = props => {
  const { column } = props;
  const availableColumnValues = availableValues[column.name];
  if (availableColumnValues) {
    return (
      <LookupEditCell
        {...props}
        availableColumnValues={availableColumnValues}
      />
    );
  }
  return <TableEditRow.Cell {...props} />;
};

const getRowId = row => row.id;

const useStyles = makeStyles({
  centerButton: {
    margin: '5px',
  },
  center: {
    paddingTop: '5%',
    display: 'flex',
    justifyContent: 'center',
  },
});

export default () => {
  const [columns] = useState([
    { name: 'saleDate', title: 'Date' },
    { name: 'task', title: 'Description' },
    { name: 'amount', title: 'Hours' },
  ]);
  const [rows, setRows] = useState(
    generateRows({
      columnValues: { id: ({ index }) => index, ...globalSalesValues },
      length: 2,
    }),
  );
  const [tableColumnExtensions] = useState([]);

  const [sorting] = useState([]);
  const [editingRowIds] = useState([]);
  const [addedRows, setAddedRows] = useState([]);
  const [rowChanges, setRowChanges] = useState({});
  const [currentPage, setCurrentPage] = useState(0);
  const [pageSize, setPageSize] = useState(0);
  const [pageSizes] = useState([5, 10, 0]);
  const [columnOrder, setColumnOrder] = useState([
    'saleDate',
    'task',
    'amount',
  ]);
  const [currencyColumns] = useState(['amount']);
  const [percentColumns] = useState(['discount']);
  const [leftFixedColumns] = useState([TableEditColumn.COLUMN_TYPE]);
  const [totalSummaryItems] = useState([{ columnName: 'amount', type: 'sum' }]);

  const changeAddedRows = value =>
    setAddedRows(
      value.map(row =>
        Object.keys(row).length
          ? row
          : {
              amount: 0,
              saleDate: new Date().toISOString().split('T')[0],
              task: '',
            },
      ),
    );

  const deleteRows = deletedIds => {
    const rowsForDelete = rows.slice();
    deletedIds.forEach(rowId => {
      const index = rowsForDelete.findIndex(row => row.id === rowId);
      if (index > -1) {
        rowsForDelete.splice(index, 1);
      }
    });
    return rowsForDelete;
  };

  const commitChanges = ({ added, changed, deleted }) => {
    let changedRows;
    if (added) {
      const startingAddedId =
        rows.length > 0 ? rows[rows.length - 1].id + 1 : 0;
      changedRows = [
        ...rows,
        ...added.map((row, index) => ({
          id: startingAddedId + index,
          ...row,
        })),
      ];
    }
    if (changed) {
      changedRows = rows.map(row =>
        changed[row.id] ? { ...row, ...changed[row.id] } : row,
      );
    }
    if (deleted) {
      changedRows = deleteRows(deleted);
    }
    setRows(changedRows);
  };

  const classes = useStyles();
  const [selectedDate, setSelectedDate] = React.useState<Date | null>(
    new Date('2014-08-18T21:11:54'),
  );

  const handleDateChange = (date: Date | null) => {
    setSelectedDate(date);
  };

  return (
    <div>
      <Paper>
        <Grid rows={rows} columns={columns} getRowId={getRowId}>
          <SortingState
            sorting={sorting}
          />
          <PagingState
            currentPage={currentPage}
            onCurrentPageChange={setCurrentPage}
            pageSize={pageSize}
            onPageSizeChange={setPageSize}
          />
          <EditingState
            editingRowIds={editingRowIds}
            rowChanges={rowChanges}
            onRowChangesChange={setRowChanges}
            addedRows={addedRows}
            onAddedRowsChange={changeAddedRows}
            onCommitChanges={commitChanges}
          />
          <SummaryState totalItems={totalSummaryItems} />

          <IntegratedSorting />
          <IntegratedPaging />
          <IntegratedSummary />

          <CurrencyTypeProvider for={currencyColumns} />
          <PercentTypeProvider for={percentColumns} />

          <DragDropProvider />

          <Table
            columnExtensions={tableColumnExtensions}
            cellComponent={Cell}
          />
          <TableColumnReordering
            order={columnOrder}
            onOrderChange={setColumnOrder}
          />
          <TableHeaderRow showSortingControls />
          <TableEditRow cellComponent={EditCell} />
          <TableEditColumn
            width={170}
            showAddCommand={!addedRows.length}
            showEditCommand
            showDeleteCommand
            commandComponent={Command}
          />
          <MuiPickersUtilsProvider utils={DateFnsUtils}>
      <KeyboardDatePicker
          disableToolbar
          format="MM/dd/yyyy"
          margin="normal"
          value={selectedDate}
          onChange={handleDateChange}
          KeyboardButtonProps={{
            'aria-label': 'change date',
          }}
        />
        </MuiPickersUtilsProvider>
          <TableSummaryRow />
          <TableFixedColumns leftColumns={leftFixedColumns} />
          <PagingPanel pageSizes={pageSizes} />
        </Grid>
      </Paper>

      <div className={classes.center}>
        <div className={classes.centerButton}>
          <Button variant="outlined" color="primary">
            Save
          </Button>
        </div>
        <div className={classes.centerButton}>
          <Button variant="outlined" color="secondary">
            Submit
          </Button>
        </div>
      </div>
    </div>
  );
};
