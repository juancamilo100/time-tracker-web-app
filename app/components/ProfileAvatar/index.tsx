/**
 *
 * Avatar
 *
 */
import * as React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Avatar from '@material-ui/core/Avatar';
import img from './avatarPic.jpg';

const useStyles = makeStyles({
  avatar: {
    margin: 10,
  },
  bigAvatar: {
    margin: '30px auto 20px auto',
    width: 120,
    height: 120,
    alignItems: 'center',
    justifyContent: 'center',
    display: 'flex',
  },
});

function ProfileAvatar() {
  const classes = useStyles();

  return (
    <div>
      <Avatar alt="Remy Sharp" src={img} className={classes.bigAvatar} />
    </div>
  );
}

export default ProfileAvatar;
