/**
 *
 * NavData
 *
 */
import * as React from 'react';
import { FormattedMessage } from 'react-intl';
import messages from './messages';

interface Props {}

function NavData(props: Props) {
  return (
    <div>
      <FormattedMessage {...messages.header} />
    </div>
  );
}

export default NavData;
