# react-router-route-reducers

WIP! Use with caution.

Route based reducers for React-Router and Redux.

## Usage

Add reducers to your routes

```js
<Route path='/' reducer={rootReducer}>
  <IndexRoute reducer={indexReducer}/>
  <Route path='dashboard' reducer={dashboardReducer}>
</Route>
```

or as concise plain routes:

```js
{
  path: '/',
  reducer: rootReducer,
  indexRoute: {
    reducer: indexReducer
  },
  childRoutes: [
    {
      path: 'dashboard',
      reducer: dashboardReducer
    }
  ]
}
```

Now add RoutesReducer to the render function of ReactRouter

```js
const store = configureStore(reducers, __INITAL_STATE__)
// No need to wrap React-Router in <Provider/>, it will be handled inside <RoutesReducer/>
<Router render={onRender(store)}>
  {routes}
</Router>
}

const onRender = (store) => (props) => (
  <RoutesReducer
    reducers={reducers} // all other global reducers
    store={store} // pass the redux store here
    {...props}
    />
)
```

Your reducers will then be combined into the following structure:

```js
{
  'route-reducers': {
    self: rootReducer,
    child: {
      self: indexReducer,
      child: {
        self: dashboardReducer,
        child: null
      }
    }
  }
}
```

Add being passed as `{ model }` to your component:

```js
export const view = ({ model, dispatch, ...props }) => (
  <div {...props}>
    <h2>{model.data}</h2>
  </div>
)
```

## API

### `<RoutesReducer>`

Primary component of react-router-route-reducers. It combines your routes-reducers into a single object based on your route structure.

#### Props

##### `store` (required)

The redux store.

##### `reducers`

All other global reducers that you want.

## Contribute

Feel free to

## Credits

Credits go to the team behind [Ground-Control](https://github.com/raisemarketplace/ground-control), as it is heavily inspired by it. Also a big shout out to [Julien Goux](https://github.com/jgoux) for always helping me out when I have a brain fart 😄.
