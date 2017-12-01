import React from 'react'
import ReactDOM  from 'react-dom'
import { createStore } from 'redux'
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import { Provider } from 'react-redux'

import Container from './redux-modules/Container.jsx'
import reducer from './redux-modules/reducers.js'

const store = createStore(
    reducer,
    window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
)

ReactDOM.render(
  <Provider store={store}>
    <MuiThemeProvider>
        <Container />
    </MuiThemeProvider>
  </Provider>,
  document.getElementById('mount-point')
)
