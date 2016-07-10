import React, { Component } from 'react'
import ReactDOM from 'react-dom'

import CSSAnimation from '../../src/CSSAnimation'

class Demo extends Component {
  render() {
    return (
      <CSSAnimation
        name="bounce"
        duration={1000}
        iterationCount={3}
        onStart={() => console.log('On start.')}
        onIteration={() => console.log('On iteration.')}
        onEnd={() => console.log('on end.')}
      >
        <p>Foo Bar</p>
      </CSSAnimation>
    )
  }
}

ReactDOM.render(<Demo/>, document.getElementById('root'))
