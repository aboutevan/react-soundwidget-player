import React, {Component} from 'react'
import {render} from 'react-dom'

import Example from '../../src'

class Demo extends Component {
  render() {
    return <div>
      <h1>react-loading-button Demo</h1>
      <Example />

      <Example/>
      <Example/>
    </div>
  }
}

render(<Demo/>, document.querySelector('#demo'))
