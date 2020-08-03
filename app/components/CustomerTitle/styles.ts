import { makeStyles } from '@material-ui/core/styles';

export const useStyles = makeStyles(theme => ({
    root: {
      display: 'flex',
      width: '70%',
    },
    customerName: {
        fontWeight: 'bold',
        flex: '50%'
    },
    customerNameIcon: {
        marginRight: '10px'
    },
    customerEmail: {
        flex: '50%'
    },
    customerEmailIcon: {
        marginRight: '10px'
    }
  }));
