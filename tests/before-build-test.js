var _beforeBuild = require('../lib/before-build');
var path = require('path');
var chai = require('chai');
var assert = chai.assert;
var sinon = require('sinon');
var expect = chai.expect;
var helpers = require('broccoli-test-helpers');
var makeTestHelper = helpers.makeTestHelper;
var cleanupBuilders = helpers.cleanupBuilders;

var UselessPlugin = require('./utils/useless-plugin');


describe('beforeBuild', function() {
  var emptyFixturePath = path.join(__dirname, 'fixtures', 'empty'),
      spyFunc;

  afterEach(function() {
    return cleanupBuilders();
  });

  var beforeBuild = makeTestHelper({
    subject: _beforeBuild,
    fixturePath: emptyFixturePath
  });

  beforeEach(function() {
    spyFunc = sinon.spy();
  });

  it('it cannot work with string nodes', function() {
    expect(spyFunc.callCount).to.equal(0);

    return beforeBuild(emptyFixturePath, spyFunc).then(function() {
      throw new Error('Promise was unexpectedly fulfilled.');
    }, function(err) {
      expect(err.message).to.equal("Can't use beforeBuild on a string node");
    })
  });

  it('it called before the inputNode builds', function() {
    expect(spyFunc.callCount).to.equal(0);

    return beforeBuild(new UselessPlugin(emptyFixturePath), spyFunc).then(function() {
      expect(spyFunc.callCount).to.equal(1);
    });
  });
});
