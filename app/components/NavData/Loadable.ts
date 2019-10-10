/**
 *
 * Asynchronously loads the component for NavData
 *
 */

import loadable from 'utils/loadable';

export default loadable(() => import('./index'));
