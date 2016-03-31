
# react-router-route-reducers

![dependency badge](https://david-dm.org/mrtnbroder/react-router-route-reducers.svg)
[![devDependency Status](https://david-dm.org/mrtnbroder/react-router-route-reducers/dev-status.svg)](https://david-dm.org/mrtnbroder/react-router-route-reducers#info=devDependencies)

Add reducer to your routes and let them be composed and combined into a single state object that follows your route-structure.

## Rationale

The idea is actually inspired by the Elm architecture, which basically describes your component to have these three things:
a model, a view function and an update function.

The question now is, how do I get the model into my view?

This is what react-router-route-reducers does for you. You define the component, add a reducer to it and have the model automagically fed into your view function.

## Table of Contents
* [Rationale](#rationale)
* [Installation](#installation)
* [Usage](#usage)
* [API](https://github.com/mrtnbroder/react-router-route-reducers/docs/API.md)
* [Contribute](#contribute)
* [Credits](#credits)

## Installation

Install the lib with:

```sh
$ npm i -S react-router-route-reducers
```

and make sure to have the latest versions of `redux`, `react-router`, `react-redux` and `react` installed.

```sh
$ npm i -S react@next react-router redux react-redux
```

## Usage

Add a reducer to your route:

```jsx
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

Pass the RoutesReducer to the render function of ReactRouter

```jsx
import React from 'react'
import reducers from '../other/global/reducers' // (optional)
import RoutesReducer from 'react-router-route-reducers'
import { render } from 'react-dom'
import { createStore } from 'redux'
import routes from '../routes'
import { Router, browserHistory } from 'react-router'
...

const onRender = (store) => (props) => (
  <RoutesReducer
    {...props}
    reducers={reducers} // all other global reducers
    store={store} // pass the redux store here
    />
)

const main = () => {
  const store = createStore(reducers/*, __INITIAL_STATE__ */)
  const rootEl = document.getElementById('app')

  // No need to wrap React-Router in <Provider/>, it will be handled inside <RoutesReducer/>
  render(
    <Router history={browserHistory} render={onRender(store)}>
      {routes}
    </Router>,
    rootEl
  )
}

main()
```

Your reducers will then be composed into the following structure:

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

..and your data will be passed as `model` to your view function:

```jsx
export const view = ({ model, dispatch, ...props }) => (
  <div {...props}>
    <h2>{model.data}</h2>
  </div>
)
```

## Contribute

Please do! Feel free to submit any bugs and/or features you'd like to see in this lib.

## Credits

Credits go to the team behind [Ground-Control](https://github.com/raisemarketplace/ground-control), as it is basically a fork from it. Also a big shout out to my friend [Julien Goux](https://github.com/jgoux) for always helping me out when I have a brain fart 😄.
