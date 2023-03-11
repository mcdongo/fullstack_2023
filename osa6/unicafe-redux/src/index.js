import React from 'react'
import ReactDOM from 'react-dom/client'
import counterReducer from './reducer'

import { createStore } from 'redux'

/*const counterReducer = (state = 0, action) => {
  switch (action.type) {
    case 'INCREMENT':
      return state + 1
    case 'DECREMENT':
      return state - 1
    case 'ZERO':
      return 0
    default:
      return state
  }
}*/

const store = createStore(counterReducer)

const App = () => {
  return (
    <div>
      <div>
        {console.log(store.getState())}
      </div>
      <button 
        onClick={e => store.dispatch({ type: 'GOOD' })}
      >
        good
      </button>
      <button
        onClick={e => store.dispatch({ type: 'OK' })}
      >
        ok
      </button>
      <button 
        onClick={e => store.dispatch({ type: 'BAD' })}
      >
        bad
      </button>
      <button
        onClick={e => store.dispatch({ type: 'ZERO' })}
      >
        reset stats
      </button>
      <div>
        good {store.getState().good}
      </div>
      <div>
        ok {store.getState().ok}
      </div>
      <div>
        bad {store.getState().bad}
      </div>
    </div>
  )
}

const root = ReactDOM.createRoot(document.getElementById('root'))

const renderApp = () => {
  root.render(<App />)
}

renderApp()
store.subscribe(renderApp)