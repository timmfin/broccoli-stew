var QuickPlugin = require('broccoli-quick-plugin');

/**
 * Returns a new node that causes a callback to be called after every build of
 * the passed inputNode
 *
 * @example
 *
 * var node = find('zoo/animals/*.js');
 *
 * node = stew.afterBuild(node, function(outputDir) {
 *   // Whatever debugging you'd like to do. Maybe mess with outputDir or maybe
 *   // debug other state your Brocfile contains.
 * });
 *
 *
 * @param  {String|Object} node    The desired input node
 * @param  {Function} callback     The function to call after every time the node is built
 */
module.exports = function afterBuild(node, cb, options) {
  if (typeof cb !== 'function') {
    throw new Error('No callback passed to stew.afterBuild');
  }

  return QuickPlugin([node], {
    build: function() {
      cb();
    },
    name: "afterBuild",
    annotation: (options || {}).annotation
  });
};
