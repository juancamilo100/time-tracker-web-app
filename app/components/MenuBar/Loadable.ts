/**
 *
 * Asynchronously loads the component for MenuBar
 *
 */

import loadable from 'utils/loadable';

export default loadable(() => import('./index'));
