const store = require('store')

const GLOBAL_STORE_KEY = 'globalStore'
const SCOPE_STORE_KEY = 'scopeStore'

let activeStoreKey = GLOBAL_STORE_KEY

/**
 * debug function
 */
const logStore = () => console.log(activeStoreKey, getStore(activeStoreKey))

/**
 * extends a base store and activates this store for the current scope
 * @param {Object} props properties which will be merged into the current scope store
 *                 and set as new scope store
 * @param {bool}  reset emptys the active store before use
 */
const useActiveStore = (props = null, reset = false) => {

  if (reset) {
    setStore(SCOPE_STORE_KEY, props)
  } else {
    const baseStoreProps = getStore(activeStoreKey)

    setStore(SCOPE_STORE_KEY, baseStoreProps)
    addProp(SCOPE_STORE_KEY, props)
  }

  activeStoreKey = SCOPE_STORE_KEY
}
/**
 * extends the global store and activates this store for the current scope
 * @param {Object} props properties which will be merged into the global store
 *                 and set as new scope store
 * @param {bool}  reset emptys the global store before use
 */
const useGlobalStore = (props = null, reset = false) => {
  const storeAction = reset ? setStore : addProp
  storeAction(GLOBAL_STORE_KEY, props)
  activeStoreKey = GLOBAL_STORE_KEY
}

/**
 * get all stored values for a store
 * @param {string} storeKey the key for the desired store
 */
const getStore = storeKey => store.get(storeKey)

/**
 * set the value of a store
 * @param {string} storeKey the key for the desired store
 * @param {Object} props the values to set
 */
const setStore = (storeKey, props) => {
  store.set(storeKey, props)
}

/**
 * merge the values in a store
 * @param {string} storeKey the key for the desired store
 * @param {*}      props the values to merge
 */
const addProp = (storeKey, props) => {
  if (!props) {
    return
  }
  const newProps = Object.assign({}, getStore(storeKey), props)
  store.set(storeKey, newProps)
}

/**
 * get the values for a given key out of the active store
 * @param {string} propName
 */
const getProp = propName => getStore(activeStoreKey)[propName]

module.exports = {
  useGlobalStore,
  useActiveStore,
  getProp
}
