import * as React from 'react';
import Button from '@material-ui/core/Button';
import img from './logoOnlyTransparent.png';
import { useStyles } from './styles';

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
          className={classes.btn}
        >
          CONTACT US
        </Button>
      </div>
      </div>
    </div>
  );
}

export default MenuBar;
