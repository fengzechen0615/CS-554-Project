import React, { useState } from 'react';
import { Container, Form, Button, Alert } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { SIGN_UP_API } from '../../constants';
import { showError, showSuccess } from 'components/sweetAlert/sweetAlert';

export default function Login() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [nickname, setNickname] = useState('');

    const submitHandler = async (event) => {
        event.preventDefault();
        try {
            const res = await axios.post(SIGN_UP_API, {
                email,
                password,
                nickname,
            });
            showSuccess('Successfully Registered!');
        } catch (error) {
            showError(error?.response?.data?.error || error.message);
        }
    };

    return (
        <Container className='p-3'>
            <div className='w-md-50 mr-auto ml-auto'>
                <h1 className='text-center mb-5 mt-5'>Please Sign Up</h1>
                <Form onSubmit={submitHandler}>
                    <Form.Group controlId='formBasicEmail'>
                        <Form.Control
                            type='text'
                            placeholder='Nick Name'
                            value={nickname}
                            onChange={(ev) => setNickname(ev.target.value)}
                            required
                        />
                    </Form.Group>
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
                        Already have an account? <Link to='/login'>Login</Link>{' '}
                        here{' '}
                    </div>
                </Form>
            </div>
        </Container>
    );
}
