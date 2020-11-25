import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import NavBar from './components/navBar/navBar';
import Main from './app/products/products';
import Login from './auth/login/login';
import SignUp from './auth/signup/signup';
import UserInfo from './app/user/info/info';

function App() {
    return (
        <Router>
            <div>
                <NavBar />
                <Switch>
                    <Route path='/products'>
                        <Main />
                    </Route>
                    <Route path='/user/info'>
                        <UserInfo />
                    </Route>
                    <Route path='/login'>
                        <Login />
                    </Route>
                    <Route path='/signup'>
                        <SignUp />
                    </Route>
                </Switch>
            </div>
        </Router>
    );
}

export default App;
