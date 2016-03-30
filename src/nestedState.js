
import reduce from 'ramda/src/reduce'

export const getNestedState = (state, depth) => {
  return reduce((prev) => {
    return prev.child || {}
  }, state)(Array(depth))
}
