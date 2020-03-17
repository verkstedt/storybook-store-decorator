'use strict';

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

var store = require('store');

var GLOBAL_STORE_KEY = 'globalStore';
var SCOPE_STORE_KEY = 'scopeStore';

var activeStoreKey = GLOBAL_STORE_KEY;

/**
 * debug function
 */
var logStore = function logStore() {
  return console.log(activeStoreKey, getStore(activeStoreKey));
};

/**
 * debug function
 */
var setActiveStoreKey = function setActiveStoreKey(key) {
  if (key) {
    activeStoreKey = key;
  }
};
var getActiveStoreKey = function getActiveStoreKey() {
  return activeStoreKey;
};

/**
 * extends a base store and activates this store for the current scope
 * @param {Object} props properties which will be merged into the current scope store
 *                 and set as new scope store
 * @param {bool}  reset emptys the active store before use
 */
var useActiveStore = function useActiveStore() {
  var props = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : null;
  var reset = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;


  if (reset) {
    setStore(SCOPE_STORE_KEY, props);
  } else {
    var baseStoreProps = getStore(getActiveStoreKey());

    setStore(SCOPE_STORE_KEY, baseStoreProps);
    addProp(SCOPE_STORE_KEY, props);
  }

  setActiveStoreKey(SCOPE_STORE_KEY);
};
/**
 * extends the global store and activates this store for the current scope
 * @param {Object} props properties which will be merged into the global store
 *                 and set as new scope store
 * @param {bool}  reset emptys the global store before use
 */
var useGlobalStore = function useGlobalStore() {
  var props = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : null;
  var reset = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;

  var storeAction = reset ? setStore : addProp;
  storeAction(GLOBAL_STORE_KEY, props);
  setActiveStoreKey(GLOBAL_STORE_KEY);
};

/**
 * get all stored values for a store
 * @param {string} storeKey the key for the desired store
 */
var getStore = function getStore(storeKey) {
  try {
    return store.get(storeKey);
  } catch (err) {
    throw new Error(err);
  }
};

/**
 * set the value of a store
 * @param {string} storeKey the key for the desired store
 * @param {Object} props the values to set
 */
var setStore = function setStore(storeKey, props) {
  try {
    store.set(storeKey, props);
  } catch (err) {
    throw new Error(err);
  }
};

/**
 * merge the values in a store
 * @param {string} storeKey the key for the desired store
 * @param {*}      props the values to merge
 */
var addProp = function addProp(storeKey, props) {
  if (!props || (typeof props === 'undefined' ? 'undefined' : _typeof(props)) !== 'object' || Array.isArray(props)) {
    return;
  }

  var newProps = Object.assign({}, getStore(storeKey), props);
  setStore(storeKey, newProps);
};

/**
 * get the values for a given key out of the active store
 * @param {string} propName
 */
var getProp = function getProp(propName) {
  return getStore(getActiveStoreKey())[propName];
};

module.exports = {
  useGlobalStore: useGlobalStore,
  useActiveStore: useActiveStore,
  getProp: getProp,
  setActiveStoreKey: setActiveStoreKey,
  getActiveStoreKey: getActiveStoreKey
};