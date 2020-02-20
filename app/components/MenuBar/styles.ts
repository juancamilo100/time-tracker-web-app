import { makeStyles } from '@material-ui/core/styles';

export const useStyles = makeStyles({
    navBarContainer: {
      paddingTop: '40px',
      alignItems: 'center',
      justifyContent: 'space-around',
      display: 'flex',
      margin: '0 auto',
      height: '70px',
    },
    navBar: {
      backgroundColor: '#fafafa',
      textAlign: 'center',
      height: '70px',
      width: '100%',
    },
    navBarImg: {
      float: 'left',
    },
    logo: {
      height: '35px',
      width: 'auto',
    },
    navBarUl: {
      padding: '0px',
      margin: '0px',
      textAlign: 'center',
      display: 'inline-block',
      verticalAlign: 'top',
    },
    navBarli: {
      listStyleType: 'none',
      padding: '0px',
      height: '24px',
      marginTop: '4px',
      marginBottom: '4px',
      display: 'inline',
    },
    navBarA: {
      color: 'black',
      fontSize: '16px',
      fontFamily: '"Trebuchet MS", Arial, Helvetica, sans-serif',
      textDecoration: 'none',
      lineHeight: '70px',
      padding: '5px 15px',
      fontWeight: 'bold',
    },
    navButton: {
      float: 'right',
    },
    contactBtn: {
    },
    btn: {
      border: '1px solid',
      borderRadius: '0',
      backgroundColor: '#fafafa',
      color: 'black',
      fontSize: '16px',
      cursor: 'pointer',
    },
  });
