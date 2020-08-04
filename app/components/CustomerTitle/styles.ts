import { makeStyles } from '@material-ui/core/styles';

export const useStyles = makeStyles(theme => ({
    root: {
      display: 'flex',
      width: '70%',
    },
    customerName: {
        fontWeight: 'bold',
        flex: '33%'
    },
    customerNameIcon: {
        marginRight: '10px'
    },
    customerEmail: {
        flex: '33%'
    },
    customerEmailIcon: {
        marginRight: '10px'
    },
    badge: {
        flex: '33%'
    }
  }));
