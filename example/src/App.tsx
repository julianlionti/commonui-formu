import React from 'react'
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom'
import Example from './screens/Example'
import './App.css'
import { CommonUiProvider } from 'commonui-formu'

const App = () => {
  return (
    <Router>
      <div>
        <ul>
          <li>
            <Link to="/">About</Link>
          </li>
          <li>
            <Link to="/example">Example</Link>
          </li>
        </ul>

        <hr />

        <Switch>
          <Route exact path="/">
            <p>
              Julián Lionti - <a href="https://github.com/julianlionti">Github</a>
            </p>
          </Route>
          <Route path="/example">
            <CommonUiProvider>
              <Example />
            </CommonUiProvider>
          </Route>
        </Switch>
      </div>
    </Router>
  )
}

export default App
