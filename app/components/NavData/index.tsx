/**
 *
 * NavData
 *
 */
import * as React from 'react';
import { FormattedMessage } from 'react-intl';
import messages from './messages';

function NavData() {
  return (
    <div>
      <FormattedMessage {...messages.header} />
    </div>
  );
}

export default NavData;
