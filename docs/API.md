## API

### `<RoutesReducer>`

Primary component of react-router-route-reducers. It combines your routes-reducers into a single object based on your route structure.

#### Props

##### `store` (required)

The Redux store instance.

##### `reducers`

All other global reducers.

### `loadStateOnServer(props, callback)`

Creates the initalState for server-side rendering.

`callback` is being passed the initalState that you need to bind into your markup.
