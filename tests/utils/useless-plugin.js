var Plugin = require('broccoli-plugin');

var uselessCtr = 1;

UselessPlugin.prototype = Object.create(Plugin.prototype);
UselessPlugin.prototype.constructor = UselessPlugin;
function UselessPlugin(inputNode, options) {
  options = options || {};
  Plugin.call(this, [inputNode], {
    annotation: options.annotation
  });
  this.options = options;
  this.ctr = uselessCtr++;
}

UselessPlugin.prototype.build = function() {
  if (this.options.hook) {
    this.options.hook();
  }
}

module.exports = UselessPlugin;
