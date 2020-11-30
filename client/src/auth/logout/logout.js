import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { logout as LogoutRequest } from '../../api/users';
import { userLoggedOut } from '../../store/reducers/userSlice';

export default function Logout() {
    const dispatch = useDispatch();
    useEffect(() => {
        const logout = async () => {
            await LogoutRequest();
            dispatch(userLoggedOut());
        };
        logout();
    }, [dispatch]);
    return null;
}
