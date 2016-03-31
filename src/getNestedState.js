
export const getNestedState = (state, depth) => {
  if (depth && state.child)
    return getNestedState(state.child, depth - 1)
  return state || {}
}
