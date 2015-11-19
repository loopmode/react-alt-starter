/**
 * This is the alt instance that holds the state of the entire application.
 * All stores and actions are created on this instance.
 */

import Alt from 'alt';
var alt = new Alt();
export default alt;


// Debugging with chrome devtools
// @see https://github.com/goatslacker/alt-devtool
//--------------------------------------------------
// TODO: Do not use chromeDebug in production build!
require('alt/utils/chromeDebug')(alt);

