import React from 'react';
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Redirect,
} from 'react-router-dom';
import { useSelector } from 'react-redux';
import 'bootstrap/dist/css/bootstrap.min.css';
import NavBar from './components/navBar/navBar';
import Main from './app/products/products';
import Login from './auth/login/login';
import SignUp from './auth/signup/signup';
import UserInfo from './app/user/info/info';

function App() {
    const user = useSelector((state) => state.user);
    if (!user.email) {
        return (
            <Router>
                <div>
                    <Switch>
                        <Route path='/login'>
                            <Login />
                        </Route>
                        <Route path='/signup'>
                            <SignUp />
                        </Route>
                        <Redirect to='/login' />
                    </Switch>
                </div>
            </Router>
        );
    }

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
                    <Redirect to='/products' />
                </Switch>
            </div>
        </Router>
    );
}

export default App;
