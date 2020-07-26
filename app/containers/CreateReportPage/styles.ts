import { makeStyles } from '@material-ui/core/styles';

export const useStyles = makeStyles({
  addReport: {
    display: 'flex',
    flexDirection: 'column',
    width: '100%',
    height: '100%',
    color: 'darkGrey',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: '70px'
  },
  addReportIcon: {
    height: '300%',
    width: '300%'
  },
  datePickers: {
    display: 'flex',
    flexDirection: 'row',
    paddingTop: '20px'
  }
});
