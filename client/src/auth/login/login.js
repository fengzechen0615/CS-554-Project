import React, { useState } from 'react';
import { Container, Form, Button, Alert } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { setUser } from '../../store/reducers/userSlice';
import { signIn } from '../../api/users';
import { useDispatch } from 'react-redux';
import { showError } from 'components/sweetAlert/sweetAlert';

export default function Login() {
    const [email, setEmail] = useState('htkzmo@gmail.com');
    const [password, setPassword] = useState('12345678');
    const [showAlert, setShowAlert] = useState(false);
    const dispatch = useDispatch();

    const submitHandler = async (event) => {
        event.preventDefault();
        try {
            const { data } = await signIn(email, password);
            localStorage.setItem('idToken', data.idToken);
            dispatch(setUser(data));
        } catch (error) {
            if (error?.response.data.error) {
                showError(error?.response?.data?.error);
                return;
            }
            setShowAlert(true);
            window.setTimeout(() => {
                setShowAlert(false);
            }, 2000);
        }
    };

    return (
        <Container className='p-3'>
            <div className='w-md-50 mr-auto ml-auto'>
                <Alert variant='warning' show={showAlert}>
                    Invalid Email or Password
                </Alert>
                <h1 className='text-center mb-5 mt-5'>Please Log In</h1>
                <Form onSubmit={submitHandler}>
                    <Form.Group controlId='formBasicEmail'>
                        <Form.Control
                            type='email'
                            placeholder='Email'
                            value={email}
                            onChange={(ev) => setEmail(ev.target.value)}
                            required
                        />
                    </Form.Group>
                    <Form.Group controlId='formBasicPassword'>
                        <Form.Control
                            type='password'
                            placeholder='Password'
                            value={password}
                            onChange={(ev) => setPassword(ev.target.value)}
                            required
                        />
                    </Form.Group>
                    <Button
                        className='btn btn-block'
                        variant='outline-primary'
                        type='submit'
                    >
                        Submit
                    </Button>
                    <div className='text-center pt-5'>
                        Do not have an account?{' '}
                        <Link to='/signup'>Register</Link> here{' '}
                    </div>
                </Form>
            </div>
        </Container>
    );
}
