
import { mkReducers } from './nestReducers'

export const loadStateOnServer = (props) => (cb) => {
  mkReducers(props)
  cb(props.store.getState())
}
