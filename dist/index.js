"use strict";

var _require = require('./decorator'),
    useStoreWith = _require.useStoreWith,
    withStoreDecorator = _require.withStoreDecorator;

var _require2 = require('./store'),
    getProp = _require2.getProp;

module.exports = {
  withStoreDecorator: withStoreDecorator,
  useStoreWith: useStoreWith,
  getProp: getProp
};