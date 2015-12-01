RSVP = require('rsvp')
beforeBuild = require('./before-build')
afterBuild = require('./after-build')

var QuickPlugin = require('broccoli-quick-plugin');

/**
 * Returns a new node that causes a callbacks to be called before and after
 *  every build of the passed inputNode
 *
 * @example
 *
 * var node = find('zoo/animals/*.js');
 *
 * node = stew.wrapBuild(
 *   node,
 *   function() {
 *     // Whatever debugging you'd like to do before the build is run, maybe set
 *     // timer?
 *   },
 *   function(outputDir) {
 *     // Whatever debugging you'd like to do. Maybe mess with outputDir or maybe
 *     // debug other state your Brocfile contains.
 *   }
 * );
 *
 *
 * @param  {String|Object} node    The desired input node
 * @param  {Function} callback     The function to call before every time the node is built
 * @param  {Function} callback     The function to call after every time the node is built
 */
module.exports = function wrapBuild(node, beforeCb, afterCb, options) {

  // Allow one of the callbacks to be undefined, but not both
  var hasBeforeCb = beforeCb && typeof beforeCb === 'function'
      hasAfterCb = afterCb && typeof afterCb === 'function';

  if (!hasBeforeCb || !hasAfterCb) {
    throw new Error('No callbacks passed to stew.wrapBuild');
  } else if (!hasBeforeCb) {
    beforeCb = function() {};
  } else if (!hasAfterCb) {
    afterCb = function() {};
  }

  return afterBuild(beforeBuild(node, beforeCb, options), afterCb, options);
};
