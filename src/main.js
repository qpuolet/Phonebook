import React from 'react'
import ReactDOM  from 'react-dom'
import { createStore } from 'redux'
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import { Provider } from 'react-redux'
import { loadState, saveState } from './redux-modules/loadState.js'
import throttle from 'lodash/throttle';


import Container from './redux-modules/Container.jsx'
import reducer from './redux-modules/reducers.js'

const persistedState = loadState();

const store = createStore(
    reducer,
    persistedState
)

store.subscribe(throttle(() => {
    saveState(store.getState())
}, 1000))

ReactDOM.render(
  <Provider store={store}>
    <MuiThemeProvider>
        <Container />
    </MuiThemeProvider>
  </Provider>,
  document.getElementById('mount-point')
)
