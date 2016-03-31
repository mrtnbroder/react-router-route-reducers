
import React from 'react'
import { NAMESPACE } from './constants'
import { getNestedState } from './getNestedState'

export const createElement = (store) => (Component, props) => {
  const { routes, route } = props // eslint-disable-line react/prop-types
  const depth = routes.indexOf(route)
  const state = store.getState()[NAMESPACE]
  const { self: model } = getNestedState(state, depth)

  const componentProps = {
    ...props,
    dispatch: store.dispatch,
    model,
  }

  return (
    <Component {...componentProps}/>
  )
}
