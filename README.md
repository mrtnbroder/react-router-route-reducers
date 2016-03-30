
# react-router-route-reducers

![dependency badge](https://david-dm.org/mrtnbroder/react-router-route-reducers.svg)
[![devDependency Status](https://david-dm.org/mrtnbroder/react-router-route-reducers/dev-status.svg)](https://david-dm.org/mrtnbroder/react-router-route-reducers#info=devDependencies)

Add reducers to your routes and let them be combined into a single state object that updates and replaces itself on route transition.

## Table of Contents
* [Installation](#installation)
* [Usage](#usage)
* [API](#api)
* [Contribute](#contribute)
* [Credits](#credits)

## Installation

Install the lib with:

```sh
$ npm i --save react-router-route-reducers
```

and make sure to have the latest versions of `redux`, `react-router`, `react-redux` and `react` installed.

```sh
$ npm i --save react@ react-router redux react-redux
```

## Usage

Add a reducer to your route:

```js
<Route path='/' reducer={rootReducer}>
  <IndexRoute reducer={indexReducer}/>
  <Route path='dashboard' reducer={dashboardReducer}>
</Route>
```

or as plain routes (recommended):

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
import RoutesReducer from 'react-router-route-reducers'
...

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

Your reducers will then be combined into the following structure...:

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

..and your data is being passed as `{ model }` to your component:

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

The Redux store instance.

##### `reducers`

All other global reducers.

## Contribute

Please do! Feel free to submit any bugs and/or features you'd like to see in this lib.

## Credits

Credits go to the team behind [Ground-Control](https://github.com/raisemarketplace/ground-control), as it is heavily inspired by it. Also a big shout out to [Julien Goux](https://github.com/jgoux) for always helping me out when I have a brain fart 😄.
