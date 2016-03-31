
import React, { PropTypes as PT, Component } from 'react'
import { createElement as baseCreateElement } from './createElement'
import { RouterContext } from 'react-router/es6'
import { connect } from 'react-redux'
import { mkReducers, baseReducer } from './nestReducers'

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
    this.handleOnRouteChange(this.props, nextProps)
  }

  handleOnRouteChange = ({ location: prevLocation }, nextProps) => {
    const { location: nextLocation } = nextProps
    const pathChanged = prevLocation.pathname !== nextLocation.pathname
    const searchChanged = prevLocation.search !== nextLocation.search

    if (pathChanged || searchChanged) mkReducers(nextProps)
  }

  render() {
    const { store } = this.props
    const createElement = baseCreateElement(store)
    const contextProps = { ...this.props, createElement }

    return <RouterContext {...contextProps}/>
  }

}

export default connect(baseReducer)(RoutesReducer)
