import { makeStyles } from '@material-ui/core/styles';

export const useStyles = makeStyles(theme => ({
    root: {
      display: 'flex',
      width: '70%',
      paddingTop: '15px',
      paddingBottom: '15px',
      marginLeft: '15px'
    },
    customerName: {
        fontWeight: 'bold',
        flex: '40%'
    },
    customerNameIcon: {
        marginRight: '10px'
    },
    customerEmail: {
        flex: '40%'
    },
    customerEmailIcon: {
        marginRight: '10px'
    },
    badge: {
        flex: '20%'
    }
  }));
