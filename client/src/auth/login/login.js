import React, { useState } from 'react';
import { Container, Form, Button, Alert } from 'react-bootstrap';
import axios from 'axios';
import { SIGN_IN_API } from '../../constants';

export default function Login() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [showAlert, setShowAlert] = useState(false);

    const submitHandler = async (event) => {
        event.preventDefault();
        try {
            const res = await axios.post(SIGN_IN_API, {
                email,
                password,
            });
            console.log(res);
        } catch (error) {
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
                </Form>
            </div>
        </Container>
    );
}
