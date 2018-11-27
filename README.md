# Store Decorator for Storybook

Scoped data provider for storybook stories.
Add store objects to a global/scoped store and access their props from you're stories components.

<!-- TOC -->

- [Store Decorator for Storybook](#store-decorator-for-storybook)
  - [installation](#installation)
  - [usage](#usage)
    - [populate the store](#populate-the-store)
      - [as a global decorator in `.storybook/config.js`](#as-a-global-decorator-in-storybookconfigjs)
      - [as a scoped decorator in a `[name].stories.js` file](#as-a-scoped-decorator-in-a-namestoriesjs-file)
      - [in an individual story:](#in-an-individual-story)
      - [modifing the global store](#modifing-the-global-store)
      - [resetting a store](#resetting-a-store)
    - [retrive a value from the store](#retrive-a-value-from-the-store)

<!-- /TOC -->

## installation

npm `npm -i storybook-store-decorator`

yarn `yarn add storybook-store-decorator`

## usage



### populate the store

`storeObject` must be on `object`

#### as a global decorator in `.storybook/config.js`
```
import withStoreDecorator from 'storybook-store-decorator'
...

addDecorator(withStoreDecorator({
  props: storeObject, // values for the store
  globalStore: true,  // sets the object as the global default one
  reset: true         // replace the store instead of merge the new values
}))
```
Using `globalStore: true` and `reset: true` will ensure, that oin every start of storybook, we start
with an empty store into which ouer `storeObject` will be inserted.

#### as a scoped decorator in a `[name].stories.js` file
```
import withStoreDecorator from 'storybook-store-decorator'
...

storysOf('myStory', module)
  .addDecorator(withStoreDecorator({
    props: storeObject, // this values will be merged into the current store (the global store)
                        // this changes are available for 'storyA', 'storyB' and 'storyC'
  }))
  .add('storyA', () => <storyA />)
  .addDecorator(withStoreDecorator({
    props: storeObject, // this values will be merged into the current store
                        // (global store + previouse changes)
                        // this changes are just available for 'storyB' and 'storyC'
  }))
  .add('storyB', () => <storyB />)
  .add('storyC', () => <storyC />)
```

#### in an individual story:
```
import { useStoreWith } from 'storybook-store-decorator'
...

storysOf('myStory', module)
  .add('storyA', () => {
    useStoreWith({
      props:  storeObject, // this values will be merged into the current store
                           // this changes are just available for 'storyA'
    })
    return <storyA />
  })
  .add('storyB', () => <storyB />)
```

#### modifing the global store

As described before, scoped changes will just last the current story or `storysOf()` chain.
Should you ever want to modify the global store set `globalStore: true` now you're props will be
merged into the global store.
Be aware, that this changes will be applyed when the decorator is actually called.

#### resetting a store

Setting `reset: true` will clear all entries from the store before merging the new props.
The combination `globalStore: true` and `reset: true` which is used in the global decorator example
ensures, that storybook starts with a clean new shop.

### retrive a value from the store

Retrieves a `prop` from the `storeObject`

```
import { getProp } from 'storybook-store-decorator'
...

const prop = getProp('propName')
```
