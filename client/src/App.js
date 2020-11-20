import React from 'react';
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import NavBar from './navBar/navBar';
import Main from './products/products';

function App() {
  return (
    <Router>
      <div>
        <NavBar />
        <Switch>
          <Route path='/products'>
            <Main />
          </Route>
        </Switch>
      </div>
    </Router>
  );
}

export default App;
