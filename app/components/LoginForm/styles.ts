import { makeStyles } from '@material-ui/core/styles';

export const useStyles = makeStyles({
    center: {
      display: 'flex',
      alignItems: 'left',
      justifyContent: 'left',
    },
    container: {
      display: 'flex',
    },
    rightItem: {
      position: 'absolute',
      right: '0px',
      paddingRight: '10%',
    },
    field: {
      width: 250,
    },
    left: {
      left: '0px',
      width: '60%',
      height: '60%',
    },
    orangeColor: {
      color: '#ee8133',
    },
    coloredText: {
      fontSize: 'small',
      color: '#ee8133',
    },
    text: {
      fontSize: 'small',
    },
    grid: {
      paddingTop: '15px',
      paddingBottom: '5px',
    },
    checkbox: {
      paddingTop: '5px',
      paddingBottom: '50px',
    },
    btn: {
      border: '1px solid',
      backgroundColor: 'white',
      color: 'black',
      padding: '10px 20px',
      fontSize: '13px',
      cursor: 'pointer',
    },
    orangeButton: {
      'background': '#ee8133',
      'color': 'white',

      '&:hover': {
        background: '#fafafa',
        borderColor: '#ee8133',
        color: '#ee8133',
      },
    },
    authError: {
        color: '#cc0000',
        paddingTop: '5px',
    },
  });
