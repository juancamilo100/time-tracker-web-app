import { makeStyles } from '@material-ui/core/styles';

export const useStyles = makeStyles(theme => ({
  root: {
    display: 'flex',
    paddingBottom: '15px'
  },
  column: {
    flex: '30%',
    paddingRight: '15%',
    flexDirection: 'row'
  },
  checkbox: {
    paddingRight: '10px'
  },
  icon: {
    marginBottom: '4px'
  }
}));
