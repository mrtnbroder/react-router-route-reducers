# react-router-route-reducers

WIP! Use with caution.

Route based reducers for React-Router and Redux.

## Usage

```js
// No need to wrap your Router in <Provider store={store}/>
// It will be handled inside RoutesReducer
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

## API

WIP

## Contribute
