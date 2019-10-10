/*
 * Drawer Messages
 *
 * This contains all the text for the Drawer component.
 */

import { defineMessages } from 'react-intl';

export const scope = 'app.components.Drawer';

export default defineMessages({
  header: {
    id: `${scope}.header`,
    defaultMessage: 'This is the Drawer component!',
  },
});
