import { makeStyles } from '@material-ui/core/styles';

export const useStyles = makeStyles({
  center: {
    position: 'relative',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center'
  },
  card: {
    minWidth: 275,
    padding: '15px'
  },
  bullet: {
    display: 'inline-block',
    margin: '0 2px',
    transform: 'scale(0.8)'
  },
  title: {
    fontSize: 14
  },
  pos: {
    marginBottom: 12
  },
  modalBody: {
    width: 400,
    backgroundColor: 'lightgray',
    boxShadow: 'lightgray',
    padding: '20px',
    marginLeft: '240px',
    top: '50%',
    outline: 'none'
  },
  modalBodyWide: {
    width: 400,
    backgroundColor: 'lightgray',
    boxShadow: 'lightgray',
    padding: '20px',
    margin: 'auto',
    top: '50%',
    outline: 'none'
  },
  spinner: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center'
}
});
