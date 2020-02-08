/**
 *
 * MenuBar
 *
 */
import * as React from 'react';

// import styled from 'styles/styled-components';

import { FormattedMessage } from 'react-intl';
import messages from './messages';
import Button from '@material-ui/core/Button';
import { makeStyles } from '@material-ui/core/styles';
import img from './logoOnlyTransparent.png';
import { height } from '@material-ui/system';
const useStyles = makeStyles({
  navBarContainer:{
    // width: '1150px',
    paddingTop: '40px',
    alignItems: 'center',
    justifyContent: 'space-around',
    display: 'flex',
    margin: '0 auto',
    height: '70px'
  },
  navBar: {
    backgroundColor: '#fafafa',
    // overflow: 'hidden',
    // float: 'left',
    // color: '#f2f2f2',
    textAlign: 'center',
    height: '70px',
    width:'100%'
    // padding: '14px 16px',
    // textDecoration: 'none',
    // fontSize: '17px'
  },
  navBarImg: {
    float:'left',
  },
  logo:{
    height: '35px',
    width: 'auto',
  },
  navBarUl: {
    padding: '0px',
    margin: '0px',
    textAlign: 'center',
    display:'inline-block',
    verticalAlign:'top'
  },
  navBarli: {
    listStyleType: 'none',
    padding: '0px',
    height: '24px',
    marginTop: '4px',
    marginBottom: '4px',
    display: 'inline'
  },
  navBarA: {
    color: 'black',
    fontSize: '16px',
    fontFamily: '"Trebuchet MS", Arial, Helvetica, sans-serif',
    textDecoration: 'none',
    lineHeight: '70px',
    padding: '5px 15px',
    fontWeight: 'bold',
    // opacity: '',
  },
  navButton: {
    float:'right',
  },
  contactBtn: {
    // paddingBottom: '300px'
    // display: 'flex',
    // alignItems: 'left',
    // justifyContent: 'left',
  },
  btn: {
    border: '1px solid',
    borderRadius: '0',
    backgroundColor: '#fafafa',
    color: 'black',
    // padding: '5px 10px',
    fontSize: '16px',
    cursor: 'pointer',
  },
  orangeButton: {
    // background: '#ee8133',
    // color: 'white',

    '&:hover': {
      // background: '#e0e0e0',
      // borderColor: 'black',
      // color: 'white',
    },
  },
});
interface Props {}

function MenuBar(props: Props) {
  const classes = useStyles();
  return (
    <div className={classes.navBar}>
      <div className={classes.navBarContainer}>
        
        <div className={classes.navBarImg}>
          <img className={classes.logo} src={img}/>
        </div>
        
        <div>
          <ul className={classes.navBarUl}>
            <li className={classes.navBarli}><a className={classes.navBarA} href="#">ABOUT</a></li>
            <li className={classes.navBarli}><a className={classes.navBarA} href="#">JOIN</a></li>
            <li className={classes.navBarli}><a className={classes.navBarA} href="#">SIGN IN</a></li>
          </ul>
        </div>

        <div className={classes.navButton}>
        <Button
          className={[ classes.btn, classes.orangeButton].join(' ')}
          // component={Link}
          // to={routePath.mainPath}
        >
          CONTACT US
        </Button>
      </div>
      </div>
    </div>
  );
}

export default MenuBar;
