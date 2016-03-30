
import React from 'react'
import { NAMESPACE } from './constants'
import { getNestedState } from './nestedState'

const createElement = (store) => (Component, props) => {
  const { routes, route } = props
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


export default createElement
