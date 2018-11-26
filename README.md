# Store Decorator for Storybook

## installation

npm `npm -i storybook-store-decorator`
yarn `yarn add storybook-store-decorator`

## usage

### populate the store

In the `config.js`
```
import withStoreDecorator from 'storybook-store-decorator'
...

addDecorator(withStoreDecorator({
  props: storeObject, // values for the store
  globalStore: true,  // sets the object as the global default one
  reset: true         // replace the store instead of merge the new values
}))
```

In an individual stories file:
```
import withStoreDecorator from 'storybook-store-decorator'
...

storysOf('myStory', module)
  .add('storyA', () => <storyA />)
  .addDecorator(withStoreDecorator({
    props: storeObject, // this values will be merged into the current store (the global store)
                        // this changes are just available for 'storyB' and 'storyC'
  }))
  .add('storyB', () => <storyB />)
  .addDecorator(withStoreDecorator({
    props: storeObject, // this values will be merged into the current store
                        // (global store + previouse changes)
                        // this changes are just available for 'storyC'
  }))
  .add('storyC', () => <storyC />)
```

In an individual story:
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


### retrive from the store

```
import { getProp } from 'storybook-store-decorator'
...

const prop = getProp('propName')
```
