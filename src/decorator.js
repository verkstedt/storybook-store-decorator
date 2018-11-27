import { useGlobalStore, useActiveStore } from './store'

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
export const useStoreWith = ({
  props = null,
  globalStore = false,
  reset = false
}) => {
  const useStore = globalStore ? useGlobalStore : useActiveStore
  useStore(props, reset)
}

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
export const withStoreDecorator = ({
  props = null,
  globalStore = false,
  reset = false
}) => story => {
  useStoreWith({
    props,
    globalStore,
    reset
  })
  return story()
}
