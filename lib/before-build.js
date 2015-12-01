var RSVP = require('rsvp');
var QuickPlugin = require('broccoli-quick-plugin');

/**
 * Returns a new node that causes a callback to be called before every build of
 * the passed inputNode
 *
 * @example
 *
 * var node = find('zoo/animals/*.js');
 *
 * node = stew.beforeBuild(tree, function() {
 *   // Whatever debugging you'd like to do before the build is run, maybe set
 *   // timer?
 * });
 *
 *
 * @param  {String|Object} node    The desired input node
 * @param  {Function} callback     The function to call before every time the node is built
 */
module.exports = function beforeBuild(node, cb, options) {
  if (typeof cb !== 'function') {
    throw new Error('No callback passed to stew.beforeBuild');
  }

  if (!node._inputNodes) {
    throw new Error("Can't use beforeBuild on a string node");
  }

  // Wrap the last inputNode with a new node
  var lastNode = node._inputNodes.pop();

  node._inputNodes.push(QuickPlugin([lastNode], {
    build: function() {
      cb();
    },
    name: "beforeBuild",
    annotation: (options || {}).annotation
  }));

  return node;
};
