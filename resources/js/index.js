import $ from 'jquery' 
window.$ = $

import React from'react'
import ReactDOM from 'react-dom'

import JitsiView from './JitsiViewContainer'
import 'bootstrap/dist/css/bootstrap.min.css';

ReactDOM.render(<JitsiView />, document.getElementById('root'))