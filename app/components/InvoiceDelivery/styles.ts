import { makeStyles } from '@material-ui/core/styles';

export const useStyles = makeStyles(theme => ({
  root: {
    display: 'flex',
    flexDirection: 'column',
    width: '100%'
  },
  datePickers: {
    display: 'flex',
    justifyContent: 'center',
    padding: '15px',
    marginTop: '15px',
    marginBottom: '25px',
    backgroundColor: '#f7f7f7',
    borderRadius: '10px'
  }
}));
