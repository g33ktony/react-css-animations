import React, { Component, PropTypes } from 'react'
import prefixAll from 'inline-style-prefixer/static'

const noop = () => {}
const prefixes = ['webkit', 'mox', 'MS', 'o', '']
const animationEvents = {
  'AnimationStart': 'onStart',
  'AnimationIteration': 'onIteration',
  'AnimationEnd': 'onEnd',
}

export default class CSSAnimation extends Component {
  _configureListeners(remove = false) {
    const { container } = this.refs
    const elmMethod = remove
      ? 'removeEventListener'
      : 'addEventListener'

    Object.keys(animationEvents).forEach(eventSufix => {
      const listener = this.props[animationEvents[eventSufix]]
      if (listener !== noop) {
        prefixes.forEach(prefix => {
          const sufix = prefix === '' || prefix === 'o'
            ? eventSufix.toLowerCase()
            : eventSufix
          const eventName = `${prefix}${sufix}`
          container[elmMethod](eventName, listener, false)
        })
      }
    })
  }

  componentDidMount() {
    this._configureListeners()
  }

  componentWillReceiveProps(nextProps) {
    const { onStart, onIteration, onEnd } = this.props
    if (nextProps.onStart !== onStart
        || nextProps.onIteration !== onIteration
        || nextProps.onEnd !== onEnd) {
      this._configureListeners(true)
      this._configureListeners()
    }
  }

  componentWillUnmount() {
    this._configureListeners(true)
  }

  render() {
    const { style, ...rest } = this.props
    return (
      <div
        style={getStyle(this.props, style)}
        ref='container'
        {...getContainerProps(rest)}
      >
        {this.props.children}
      </div>
    )
  }
}

CSSAnimation.propTypes = {
  onStart: PropTypes.func.isRequired,
  onIteration: PropTypes.func.isRequired,
  onEnd: PropTypes.func.isRequired,
  name: PropTypes.string.isRequired,
  timingFunction: PropTypes.string.isRequired,
  direction: PropTypes.string.isRequired,
  fillMode: PropTypes.string.isRequired,
  playState: PropTypes.string.isRequired,
  delay: PropTypes.number.isRequired,
  duration: PropTypes.number.isRequired,
  infinite: PropTypes.bool.isRequired,
  iterationCount: PropTypes.oneOfType([
    PropTypes.number,
    PropTypes.string
  ]).isRequired,
}

CSSAnimation.defaultProps = {
  onStart: noop,
  onIteration: noop,
  onEnd: noop,
  name: '',
  timingFunction: 'linear',
  direction: 'normal',
  fillMode: 'none',
  playState: 'running',
  delay: 0,
  duration: 0,
  infinite: false,
  iterationCount: 1,
}

const blackListProps = Object.keys(CSSAnimation.defaultProps)

function getStyle(props, style = {}) {
  return prefixAll(Object.assign({
    animationName: props.name,
    animationTimingFunction: props.timingFunction,
    animationDirection: props.direction,
    animationFillMode: props.fillMode,
    animationPlayState: props.playState,
    animationDelay: `${props.delay}ms`,
    animationDuration: `${props.duration}ms`,
    animationIterationCount: props.infinite
      ? 'infinite'
      : props.iterationCount
  }, style))
}

function getContainerProps(props) {
  const ret = {}
  Object.keys(props).forEach(prop => {
    if (!~blackListProps.indexOf(prop)) {
      ret[prop] = props[prop]
    }
  })
  return ret
}
