/**
 *
 * CustomerTitle
 *
 */
import React, { memo } from 'react';

import { Customer } from 'containers/HomePage/types';
import { useStyles } from './styles';
import BusinessIcon from '@material-ui/icons/Business';
import EmailIcon from '@material-ui/icons/Email';
import Badge from '@material-ui/core/Badge';
import FolderIcon from '@material-ui/icons/Folder';

interface Props {
  customer: Customer;
  reportsNumber: number;
}

function CustomerTitle(props: Props) {
  const classes = useStyles();
  return (
    <div className={classes.root}>
      <div className={classes.customerName}>
        <BusinessIcon
          className={classes.customerNameIcon}
          style={{ color: 'lightgray' }}
        />
        <span>{props.customer.name}</span>
      </div>
      <div className={classes.customerEmail}>
        <EmailIcon
          className={classes.customerEmailIcon}
          style={{ color: 'lightgray' }}
        />
        <span>{props.customer.email}</span>
      </div>
      <div>
        <Badge badgeContent={props.reportsNumber} color="primary">
          <FolderIcon style={{ color: 'lightgray' }}/>
        </Badge>
      </div>
    </div>
  );
}

export default memo(CustomerTitle);
