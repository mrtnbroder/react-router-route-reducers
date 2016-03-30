
import React, { PropTypes as PT, Component } from 'react'
import baseCreateElement from './createElement'
import { combineReducers } from 'redux'
import RouterContext from 'react-router/lib/RouterContext'
import { getNestedState } from './nestedState'
import { connect } from 'react-redux'
import { NAMESPACE } from './constants'

const getReducerOfRoute = (route) => route.reducer

const identityReducer = (state = {}) => state

const mkShape = (self, child) => ({ self, child })

const validShape = (shape) => (shape && shape.self && shape.child) ? shape : false

const nestReducers = (routes) => (state, action) => {
  const currentState = validShape(state) || mkShape()

  return routes.reduceRight((prev, routeReducer = identityReducer, depth) => {
    const { self: prevSelf } = getNestedState(currentState, depth)
    const reducer = combineReducers(mkShape(routeReducer, identityReducer))
    const next = reducer(mkShape(prevSelf, prev), action)

    return next
  }, null)
}

const mkReducers = ({ store, routes, reducers }) => {
  const routeReducers = routes.map(getReducerOfRoute)
  const nestedReducer = nestReducers(routeReducers)
  const rootReducer = combineReducers({ ...reducers, [NAMESPACE]: nestedReducer })

  store.replaceReducer(rootReducer)
}

const handleOnRouteChange = ({ location: prevLocation }, nextProps) => {
  const { location: nextLocation } = nextProps
  const pathChanged = prevLocation.pathname !== nextLocation.pathname
  const searchChanged = prevLocation.search !== nextLocation.search

  if (pathChanged || searchChanged) mkReducers(nextProps)
}

class RoutesReducer extends Component {

  static childContextTypes = {
    store: PT.object.isRequired
  }

  static propTypes = {
    // combineReducers: PT.func,
    location: PT.object.isRequired,
    params: PT.object.isRequired,
    reducers: PT.object.isRequired,
    router: PT.object.isRequired,
    routes: PT.array.isRequired,
    store: PT.object.isRequired,
  }

  static defaultProps = {
    reducers: {}
  }

  constructor(props, ...rest) {
    super(props, ...rest)

    mkReducers(props)
  }

  getChildContext() {
    return { store: this.props.store }
  }

  componentWillReceiveProps(nextProps) {
    handleOnRouteChange(this.props, nextProps)
  }

  render() {
    const { store } = this.props
    const createElement = baseCreateElement(store)
    const contextProps = { ...this.props, createElement }

    return <RouterContext {...contextProps}/>
  }

}

export default connect(identityReducer)(RoutesReducer)
