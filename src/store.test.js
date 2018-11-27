const {
  useGlobalStore,
  useActiveStore,
  getProp,
  setActiveStoreKey,
  getActiveStoreKey
} = require('./store')

const store = require('store')

const GLOBAL_STORE_KEY = 'globalStore'
const SCOPE_STORE_KEY = 'scopeStore'

describe('setActiveStoreKey/getActiveStoreKey', () => {
  it('should set & get the correct store key', () => {
    setActiveStoreKey('testKeyOne')
    expect(getActiveStoreKey()).toEqual('testKeyOne')

    setActiveStoreKey('testKeyTwo')
    expect(getActiveStoreKey()).toEqual('testKeyTwo')

    setActiveStoreKey('testKeyThree')
    setActiveStoreKey('testKeyFour')
    expect(getActiveStoreKey()).toEqual('testKeyFour')

    setActiveStoreKey(null)
    expect(getActiveStoreKey()).toEqual('testKeyFour')

    setActiveStoreKey()
    expect(getActiveStoreKey()).toEqual('testKeyFour')

    setActiveStoreKey('')
    expect(getActiveStoreKey()).toEqual('testKeyFour')
  })
})

describe('useGlobalStore', () => {
  beforeEach(() => {
    setActiveStoreKey(GLOBAL_STORE_KEY)
    store.set(GLOBAL_STORE_KEY, {})
  })

  it('should activate the global store', () => {
    setActiveStoreKey('notGlobalStore')
    useGlobalStore()
    expect(getActiveStoreKey()).toEqual(GLOBAL_STORE_KEY)
  })

  it('should not alter the store when null/undefined is passed', () => {
    const initStore = { key: 'value' }
    store.set(GLOBAL_STORE_KEY, initStore)

    useGlobalStore(null)
    expect(store.get(GLOBAL_STORE_KEY)).toEqual(initStore)

    useGlobalStore()
    expect(store.get(GLOBAL_STORE_KEY)).toEqual(initStore)
  })

  it('should not alter the store when none objects are passed', () => {
    const initStore = { key: 'value' }
    store.set(GLOBAL_STORE_KEY, initStore)

    useGlobalStore([1, 2, 3])
    expect(store.get(GLOBAL_STORE_KEY)).toEqual(initStore)

    useGlobalStore(123)
    expect(store.get(GLOBAL_STORE_KEY)).toEqual(initStore)

    useGlobalStore('string')
    expect(store.get(GLOBAL_STORE_KEY)).toEqual(initStore)

    useGlobalStore(true)
    expect(store.get(GLOBAL_STORE_KEY)).toEqual(initStore)
  })

  it('should store the passed values on the global key', () => {
    const initStore = { keyOne: 'valueOne', keyTwo: 'valueTwo'}
    store.set(GLOBAL_STORE_KEY, initStore)

    useGlobalStore({ keyTwo: 'valueTwoOne', keyThree: 'valueThree' })
    expect(store.get(GLOBAL_STORE_KEY)).toEqual({
      keyOne: 'valueOne',
      keyTwo: 'valueTwoOne',
      keyThree: 'valueThree'
    })
  })

  it('should apply concecutive changes', () => {
    const initStore = { keyOne: 'valueOne' }
    store.set(GLOBAL_STORE_KEY, initStore)

    useGlobalStore({ keyOne: 'valueOneOne', keyTwo: 'valueTwo' })
    useGlobalStore({ keyThree: 'valueThree' })
    expect(store.get(GLOBAL_STORE_KEY)).toEqual({
      keyOne: 'valueOneOne',
      keyTwo: 'valueTwo',
      keyThree: 'valueThree'
    })
  })

  it('should reset the store correctly', () => {
    const initStore = { keyOne: 'valueOne' }
    store.set(GLOBAL_STORE_KEY, initStore)

    useGlobalStore({ keyTwo: 'valueTwo' }, true)
    expect(store.get(GLOBAL_STORE_KEY)).toEqual({ keyTwo: 'valueTwo' })
  })
})

describe('useActiveStore with globale base store ', () => {
  beforeEach(() => {
    setActiveStoreKey(GLOBAL_STORE_KEY)
    store.set(GLOBAL_STORE_KEY, {})
  })

  it('should activate the scope store', () => {
    setActiveStoreKey('notGlobalStore')
    useActiveStore()
    expect(getActiveStoreKey()).toEqual(SCOPE_STORE_KEY)
  })

  it('should not alter the store when null/undefined is passed', () => {
    const initStore = { key: 'value' }
    store.set(GLOBAL_STORE_KEY, initStore)

    useActiveStore(null)
    expect(store.get(SCOPE_STORE_KEY)).toEqual(initStore)

    useActiveStore()
    expect(store.get(SCOPE_STORE_KEY)).toEqual(initStore)

    expect(store.get(GLOBAL_STORE_KEY)).toEqual(initStore)
  })

  it('should not alter the store when none objects are passed', () => {
    const initStore = { key: 'value' }
    store.set(GLOBAL_STORE_KEY, initStore)

    useActiveStore([1, 2, 3])
    expect(store.get(SCOPE_STORE_KEY)).toEqual(initStore)

    useActiveStore(123)
    expect(store.get(SCOPE_STORE_KEY)).toEqual(initStore)

    useActiveStore('string')
    expect(store.get(SCOPE_STORE_KEY)).toEqual(initStore)

    useActiveStore(true)
    expect(store.get(SCOPE_STORE_KEY)).toEqual(initStore)

    expect(store.get(GLOBAL_STORE_KEY)).toEqual(initStore)
  })

  it('should store the passed values on the global key', () => {
    const initStore = { keyOne: 'valueOne', keyTwo: 'valueTwo'}
    store.set(GLOBAL_STORE_KEY, initStore)

    useActiveStore({ keyTwo: 'valueTwoOne', keyThree: 'valueThree' })
    expect(store.get(SCOPE_STORE_KEY)).toEqual({
      keyOne: 'valueOne',
      keyTwo: 'valueTwoOne',
      keyThree: 'valueThree'
    })
    expect(store.get(GLOBAL_STORE_KEY)).toEqual(initStore)
  })

  it('should apply concecutive changes', () => {
    const initStore = { keyOne: 'valueOne' }
    store.set(GLOBAL_STORE_KEY, initStore)

    useActiveStore({ keyOne: 'valueOneOne', keyTwo: 'valueTwo' })
    useActiveStore({ keyThree: 'valueThree' })
    expect(store.get(SCOPE_STORE_KEY)).toEqual({
      keyOne: 'valueOneOne',
      keyTwo: 'valueTwo',
      keyThree: 'valueThree'
    })
    expect(store.get(GLOBAL_STORE_KEY)).toEqual(initStore)
  })

  it('should reset the store correctly', () => {
    const initStore = { keyOne: 'valueOne' }
    store.set(GLOBAL_STORE_KEY, initStore)

    useActiveStore({ keyTwo: 'valueTwo' }, true)
    expect(store.get(SCOPE_STORE_KEY)).toEqual({ keyTwo: 'valueTwo' })
    expect(store.get(GLOBAL_STORE_KEY)).toEqual(initStore)
  })
})

describe('useActiveStore with scope base store ', () => {
  beforeEach(() => {
    setActiveStoreKey(SCOPE_STORE_KEY)
    store.set(SCOPE_STORE_KEY, {})
    store.set(GLOBAL_STORE_KEY, {})
  })

  it('should activate the scope store', () => {
    setActiveStoreKey('notGlobalStore')
    useActiveStore()
    expect(getActiveStoreKey()).toEqual(SCOPE_STORE_KEY)
  })

  it('should not alter the store when null/undefined is passed', () => {
    const initStore = { key: 'value' }
    store.set(SCOPE_STORE_KEY, initStore)

    useActiveStore(null)
    expect(store.get(SCOPE_STORE_KEY)).toEqual(initStore)

    useActiveStore()
    expect(store.get(SCOPE_STORE_KEY)).toEqual(initStore)

    expect(store.get(GLOBAL_STORE_KEY)).toEqual({})
  })

  it('should not alter the store when none objects are passed', () => {
    const initStore = { key: 'value' }
    store.set(SCOPE_STORE_KEY, initStore)

    useActiveStore([1, 2, 3])
    expect(store.get(SCOPE_STORE_KEY)).toEqual(initStore)

    useActiveStore(123)
    expect(store.get(SCOPE_STORE_KEY)).toEqual(initStore)

    useActiveStore('string')
    expect(store.get(SCOPE_STORE_KEY)).toEqual(initStore)

    useActiveStore(true)
    expect(store.get(SCOPE_STORE_KEY)).toEqual(initStore)

    expect(store.get(GLOBAL_STORE_KEY)).toEqual({})
  })

  it('should store the passed values on the global key', () => {
    const initStore = { keyOne: 'valueOne', keyTwo: 'valueTwo'}
    store.set(SCOPE_STORE_KEY, initStore)

    useActiveStore({ keyTwo: 'valueTwoOne', keyThree: 'valueThree' })
    expect(store.get(SCOPE_STORE_KEY)).toEqual({
      keyOne: 'valueOne',
      keyTwo: 'valueTwoOne',
      keyThree: 'valueThree'
    })

    expect(store.get(GLOBAL_STORE_KEY)).toEqual({})
  })

  it('should apply concecutive changes', () => {
    const initStore = { keyOne: 'valueOne' }
    store.set(SCOPE_STORE_KEY, initStore)

    useActiveStore({ keyOne: 'valueOneOne', keyTwo: 'valueTwo' })
    useActiveStore({ keyThree: 'valueThree' })
    expect(store.get(SCOPE_STORE_KEY)).toEqual({
      keyOne: 'valueOneOne',
      keyTwo: 'valueTwo',
      keyThree: 'valueThree'
    })

    expect(store.get(GLOBAL_STORE_KEY)).toEqual({})
  })

  it('should reset the store correctly', () => {
    const initStore = { keyOne: 'valueOne' }
    store.set(GLOBAL_STORE_KEY, initStore)

    useActiveStore({ keyTwo: 'valueTwo' }, true)
    expect(store.get(SCOPE_STORE_KEY)).toEqual({ keyTwo: 'valueTwo' })

    expect(store.get(GLOBAL_STORE_KEY)).toEqual(initStore)
  })
})

describe('getProp', () => {
  it('should get the correct prop (global)', () => {
    const storeProps = {
      keyOne: 'valueOne',
      keyTwo: 'valueTwo'
    }
    store.set(GLOBAL_STORE_KEY, storeProps)
    setActiveStoreKey(GLOBAL_STORE_KEY)
    expect(getProp('keyOne')).toEqual('valueOne')
  })

  it('should get the correct prop (scope)', () => {
    const storeProps = {
      keyOne: 'valueOne',
      keyTwo: 'valueTwo'
    }
    store.set(SCOPE_STORE_KEY, storeProps)
    setActiveStoreKey(SCOPE_STORE_KEY)
    expect(getProp('keyOne')).toEqual('valueOne')
  })

  it('should get undefined for unknown keys (global)', () => {
    const storeProps = {
      keyOne: 'valueOne',
      keyTwo: 'valueTwo'
    }
    store.set(GLOBAL_STORE_KEY, storeProps)
    setActiveStoreKey(GLOBAL_STORE_KEY)
    expect(getProp('keyThree')).toBeUndefined()
  })

  it('should get undefined for unknown keys (scope)', () => {
    const storeProps = {
      keyOne: 'valueOne',
      keyTwo: 'valueTwo'
    }
    store.set(GLOBAL_STORE_KEY, storeProps)
    setActiveStoreKey(GLOBAL_STORE_KEY)
    expect(getProp('keyThree')).toBeUndefined()
  })
})