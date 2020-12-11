import React, { useEffect } from 'react';
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Redirect,
} from 'react-router-dom';
import { useSelector } from 'react-redux';
import 'bootstrap/dist/css/bootstrap.min.css';
import NavBar from 'components/navBar/navBar';
import AdminNavBar from 'components/navBar/adminNavBar';
import Main from 'app/products/products';
import Login from 'auth/login/login';
import SignUp from 'auth/signup/signup';
import UserInfo from 'app/user/info/info';
import UserSelling from 'app/user/selling/selling';
import UserPurchase from 'app/user/purchase/purchase';
import UserSold from 'app/user/sold/sold';
import Logout from 'auth/logout/logout';
import Product from 'app/product/product';
import Home from 'app/home/home';
import AdminUsers from 'manage/users/users';
import { signInWithIdToken } from 'api/users';
import { setUser } from 'store/reducers/userSlice';
import { useDispatch } from 'react-redux';
import { showLoginSuccess } from 'components/sweetAlert/sweetAlert';

function App() {
    const user = useSelector((state) => state.user);
    const dispatch = useDispatch();

    useEffect(() => {
        const autoLogin = async () => {
            const idToken = localStorage.getItem('idToken');
            if (!idToken) return;
            const user = await signInWithIdToken(idToken);
            dispatch(setUser(user));
            showLoginSuccess();
        };
        autoLogin();
    }, [dispatch]);

    // tourist accunt
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
                        <Route path='/' exact>
                            <Home />
                        </Route>
                        <Redirect to='/login' />
                    </Switch>
                </div>
            </Router>
        );
    }

    // admin account
    if (user.isAdmin) {
        return (
            <Router>
                <div>
                    <AdminNavBar />
                    <Switch>
                        <Route path='/admin/products'>products</Route>
                        <Route path='/admin/users'>
                            <AdminUsers />
                        </Route>
                        <Route path='/logout'>
                            <Logout />
                        </Route>
                        <Redirect to='/admin/users' />
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
                    <Route path='/' exact>
                        <Home />
                    </Route>
                    <Route path='/products'>
                        <Main />
                    </Route>
                    <Route path='/product/:productId'>
                        <Product />
                    </Route>
                    <Route path='/user/info'>
                        <UserInfo />
                    </Route>
                    <Route path='/user/selling'>
                        <UserSelling />
                    </Route>
                    <Route path='/user/purchase'>
                        <UserPurchase />
                    </Route>
                    <Route path='/user/sold'>
                        <UserSold />
                    </Route>
                    <Route path='/logout'>
                        <Logout />
                    </Route>
                    <Redirect to='/products' />
                </Switch>
            </div>
        </Router>
    );
}

export default App;
