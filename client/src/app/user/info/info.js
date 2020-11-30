import React, { useState } from 'react';
import { Container, Form, Button } from 'react-bootstrap';
import { useSelector } from 'react-redux';
import { showError, showSuccess } from 'components/sweetAlert/sweetAlert';
import { updateUser } from 'api/users';
// address, avatar, nickname, phoneNumber, state, zipcode

export default function UserInfo(props) {
    const user = useSelector((state) => state.user);
    const [address, setAddress] = useState(user.address);
    const [nickname, setNickname] = useState(user.nickname);
    const [phoneNumber, setPhoneNumber] = useState(user.phoneNumber);
    const [zipCode, setZipCode] = useState(user.zipCode);

    const submitHandler = async (event) => {
        event.preventDefault();
        try {
            await updateUser(nickname, phoneNumber, address, zipCode);
            showSuccess('Successfully updated user information!');
        } catch (error) {
            showError(error?.response?.data?.error || error.message);
        }
    };

    return (
        <Container className='my-5'>
            <h1 className='text-center my-5'>User Information</h1>
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
                    <Form.Label>Zip Code</Form.Label>
                    <Form.Control
                        type='text'
                        value={zipCode || ''}
                        onChange={(ev) => setZipCode(ev.target.value)}
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
