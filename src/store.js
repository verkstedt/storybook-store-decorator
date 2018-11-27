const store = require('store')

const GLOBAL_STORE_KEY = 'globalStore'
const SCOPE_STORE_KEY = 'scopeStore'

let activeStoreKey = GLOBAL_STORE_KEY

/**
 * debug function
 */
const logStore = () => console.log(activeStoreKey, getStore(activeStoreKey))

/**
 * debug function
 */
const setActiveStoreKey = key => {
  if (key) {
    activeStoreKey = key
  }
}
const getActiveStoreKey = () => activeStoreKey

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
    const baseStoreProps = getStore(getActiveStoreKey())

    setStore(SCOPE_STORE_KEY, baseStoreProps)
    addProp(SCOPE_STORE_KEY, props)
  }

  setActiveStoreKey(SCOPE_STORE_KEY)
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
  setActiveStoreKey(GLOBAL_STORE_KEY)
}

/**
 * get all stored values for a store
 * @param {string} storeKey the key for the desired store
 */
const getStore = storeKey => {
  try {
    return store.get(storeKey)
  } catch (err) {
    throw new Error(err)
  }
}

/**
 * set the value of a store
 * @param {string} storeKey the key for the desired store
 * @param {Object} props the values to set
 */
const setStore = (storeKey, props) => {
  try {
    store.set(storeKey, props)
  } catch (err) {
    throw new Error(err)
  }
}

/**
 * merge the values in a store
 * @param {string} storeKey the key for the desired store
 * @param {*}      props the values to merge
 */
const addProp = (storeKey, props) => {
  if (!props || typeof props !== 'object' || Array.isArray(props)) {
    return
  }

  const newProps = Object.assign({}, getStore(storeKey), props)
  setStore(storeKey, newProps)
}

/**
 * get the values for a given key out of the active store
 * @param {string} propName
 */
const getProp = propName => getStore(getActiveStoreKey())[propName]

module.exports = {
  useGlobalStore,
  useActiveStore,
  getProp,
  setActiveStoreKey,
  getActiveStoreKey
}
