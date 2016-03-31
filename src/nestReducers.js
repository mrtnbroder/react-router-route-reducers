
import { combineReducers } from 'redux'
import { mkShape, validateShape } from './routeShape'
import { NAMESPACE } from './constants'
import { getNestedState } from './getNestedState'

const getReducerOfRoute = (route) => route.reducer

const nestReducers = (routes) => (state, action) => {
  const currentState = validateShape(state) || mkShape()

  return routes.reduceRight((prev, routeReducer = baseReducer, depth) => {
    const { self: prevSelf } = getNestedState(currentState, depth)
    const reducer = combineReducers(mkShape(routeReducer, baseReducer))
    const next = reducer(mkShape(prevSelf, prev), action)

    return next
  }, null)
}

export const baseReducer = (state = {}) => state

export const mkReducers = ({ store, routes, reducers }) => {
  const routeReducers = routes.map(getReducerOfRoute)
  const nestedReducer = nestReducers(routeReducers)
  const rootReducer = combineReducers({ ...reducers, [NAMESPACE]: nestedReducer })

  store.replaceReducer(rootReducer)
}
