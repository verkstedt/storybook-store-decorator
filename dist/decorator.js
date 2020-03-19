"use strict";

var _require = require('./store'),
    useGlobalStore = _require.useGlobalStore,
    useActiveStore = _require.useActiveStore;
/**
 * store connectorfor use in individual stories
 * (used in decorator)
 * @param {Object} storeRequest containes information about the requested store
 * @param {Object} storeRequest.props  new vales which should be added to the current [global] store
 * @param {bool}   storeRequest.globalStore  by default, the currently active store will be
 *                 extended/provided. Setting this to true will extend the base store and set the
 *                 result as new active store
 * @param {bool}   storeRequest.reset Setting this to true will empty the used store before merging
 *                 new values. This values will be the new base of the current scope [global]
 */


var useStoreWith = function useStoreWith(_ref) {
  var _ref$props = _ref.props,
      props = _ref$props === void 0 ? null : _ref$props,
      _ref$globalStore = _ref.globalStore,
      globalStore = _ref$globalStore === void 0 ? false : _ref$globalStore,
      _ref$reset = _ref.reset,
      reset = _ref$reset === void 0 ? false : _ref$reset;
  var useStore = globalStore ? useGlobalStore : useActiveStore;
  useStore(props, reset);
};
/**
 * decorator for global or storiesOf use
 * (used in decorator)
 * @param {Object} storeRequest containes information about the requested store
 * @param {Object} storeRequest.props  new vales which should be added to the current [global] store
 * @param {bool}   storeRequest.globalStore  by default, the currently active store will be
 *                 extended/provided. Setting this to true will extend the base store and set the
 *                 result as new active store
 * @param {bool}   storeRequest.reset Setting this to true will empty the used store before merging
 *                 new values. This values will be the new base of the current scope [global]
 */


var withStoreDecorator = function withStoreDecorator(_ref2) {
  var _ref2$props = _ref2.props,
      props = _ref2$props === void 0 ? null : _ref2$props,
      _ref2$globalStore = _ref2.globalStore,
      globalStore = _ref2$globalStore === void 0 ? false : _ref2$globalStore,
      _ref2$reset = _ref2.reset,
      reset = _ref2$reset === void 0 ? false : _ref2$reset;
  return function (story) {
    useStoreWith({
      props: props,
      globalStore: globalStore,
      reset: reset
    });
    return story();
  };
};

module.exports = {
  withStoreDecorator: withStoreDecorator,
  useStoreWith: useStoreWith
};