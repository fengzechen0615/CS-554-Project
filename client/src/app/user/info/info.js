import React, { useEffect, useState } from 'react';
import { Container, Form, Button } from 'react-bootstrap';
import { useSelector } from 'react-redux';
import {
    showError,
    showSuccess,
} from '../../../components/sweetAlert/sweetAlert';

// address, avatar, nickname, phoneNumber, state, zipcode

export default function UserInfo(props) {
    const user = useSelector((state) => state.user);
    const [address, setAddress] = useState(user.address);
    const [nickname, setNickname] = useState(user.nickname);
    const [phoneNumber, setPhoneNumber] = useState(user.phoneNumber);
    const [state, setState] = useState(user.state);
    const [zipcode, setZipcode] = useState(user.zipcode);

    const submitHandler = (event) => {
        event.preventDefault();
        const newInfo = {
            address,
            nickname,
            phoneNumber,
            state,
            zipcode,
        };
    };

    return (
        <Container className='my-5'>
            <h1 className='text-center my-5'>User Infomation</h1>
            <Form onSubmit={submitHandler}>
                <Form.Group>
                    <Form.Label>Nick Name</Form.Label>
                    <Form.Control
                        type='text'
                        value={nickname || ''}
                        onChange={(ev) => setNickname(ev.target.value)}
                    />
                </Form.Group>
                <Form.Group>
                    <Form.Label>State</Form.Label>
                    <Form.Control
                        type='text'
                        value={state || ''}
                        onChange={(ev) => setState(ev.target.value)}
                    />
                </Form.Group>
                <Form.Group>
                    <Form.Label>Zip Code</Form.Label>
                    <Form.Control
                        type='text'
                        value={zipcode || ''}
                        onChange={(ev) => setZipcode(ev.target.value)}
                    />
                </Form.Group>
                <Form.Group>
                    <Form.Label>Address</Form.Label>
                    <Form.Control
                        type='text'
                        value={address || ''}
                        onChange={(ev) => setAddress(ev.target.value)}
                    />
                </Form.Group>

                <Form.Group>
                    <Form.Label>Phone Number</Form.Label>
                    <Form.Control
                        type='text'
                        value={phoneNumber || ''}
                        onChange={(ev) => setPhoneNumber(ev.target.value)}
                    />
                </Form.Group>

                <Button
                    variant='outline-primary'
                    type='submit'
                    className='btn btn-block mt-5'
                >
                    Change Information
                </Button>
            </Form>
        </Container>
    );
}
