import { Theme, createStyles, makeStyles } from '@material-ui/core/styles';

export const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      width: '100%'
    },
    heading: {
      fontSize: theme.typography.pxToRem(15),
      fontWeight: theme.typography.fontWeightRegular
    },
    noReports: {
        display: 'flex',
        justifyContent: 'center',
        color: 'lightgray',
        fontWeight: 'bold'
    },
    spinner: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center'
    }
  })
);
