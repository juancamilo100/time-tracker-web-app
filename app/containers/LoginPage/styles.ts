import { makeStyles } from '@material-ui/core/styles';

export const useStyles = makeStyles({
    center: {
      alignItems: 'left',
      justifyContent: 'left',
    },
    container: {
      display: 'flex',
      width: '100%',
      height: '100vh',
      justifyContent: 'center',
      alignItems: 'center',
      marginLeft: '20px',
      marginRight: '80px',
    },
    leftItem: {
      paddingRight: '70px',
    },
    field: {
      padding: '2px',
      width: 200,
      fontSize: 12,
    },
    circleImage: {
      objectFit: 'cover',
      borderRadius: '50%',
      width: '450px',
      height: '450px',
    },
    orangeColoredCircle: {
      marginLeft: '50px',
      position: 'absolute',
      width: '70px',
      height: '70px',
      backgroundColor: '#ee8133',
      borderRadius: '50%',
      display: 'inline-block',
      boxShadow: '0px 0px 40px rgba(0,0,0,0.4)',
    },
    orangeDot: {
      marginTop: '35px',
      marginLeft: '3px',
      position: 'absolute',
      width: '13px',
      height: '13px',
      backgroundColor: '#ee8133',
      borderRadius: '50%',
    },
    greenColoredCircle: {
      marginLeft: '-90px',
      marginBottom: '-200px',
      position: 'relative',
      width: '95px',
      height: '95px',
      backgroundColor: '#93d50f',
      borderRadius: '50%',
      display: 'inline-block',
      boxShadow: '0px 0px 40px rgba(0,0,0,0.4)',
    },
    orangeColor: {
      fontWeight: 'bold',
      color: '#ee8133',
    },
    text: {
      paddingTop: '20px',
      paddingBottom: '30px',
    },
  });
