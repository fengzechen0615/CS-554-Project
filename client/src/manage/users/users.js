import React, { useEffect, useState } from 'react';
import { Button, Container, Table } from 'react-bootstrap';
import { getAllUsers, toggleUserState } from 'api/users';
import { showError, showSuccess } from 'components/sweetAlert/sweetAlert';

export default function Users() {
    const [users, setUsers] = useState([]);

    useEffect(() => {
        const initUsers = async () => {
            try {
                const users = await getAllUsers();
                setUsers(users.filter((user) => !user.isAdmin));
            } catch (error) {
                showError(error.message);
            }
        };
        initUsers();
    }, []);

    const refreshUser = async () => {
        try {
            const users = await getAllUsers();
            setUsers(users.filter((user) => !user.isAdmin));
        } catch (error) {
            showError(error.message);
        }
    };

    const toggleStateHandler = async (userId) => {
        try {
            await toggleUserState(userId);
            await refreshUser();
            showSuccess('Successfully changed user state!');
        } catch (error) {
            showError(error.message);
        }
    };

    return (
        <Container className='mt-5'>
            <Table striped bordered hover>
                <thead>
                    <tr>
                        <th>#</th>
                        <th>Name</th>
                        <th>Email</th>
                        <th>State</th>
                        <th>Operation</th>
                    </tr>
                </thead>
                <tbody>
                    {users.map((user, idx) => (
                        <tr key={user._id}>
                            <td>{idx + 1}</td>
                            <td>{user.nickname}</td>
                            <td>{user.email}</td>
                            {user.state ? (
                                <td className='text-success'>Valid</td>
                            ) : (
                                <td className='text-danger'>Forbidden</td>
                            )}
                            <td>
                                {user.state ? (
                                    <Button
                                        className='btn btn-block'
                                        variant='outline-primary'
                                        onClick={() =>
                                            toggleStateHandler(user._id)
                                        }
                                    >
                                        Seal
                                    </Button>
                                ) : (
                                    <Button
                                        className='btn btn-block'
                                        variant='outline-primary'
                                        onClick={() =>
                                            toggleStateHandler(user._id)
                                        }
                                    >
                                        Unseal
                                    </Button>
                                )}
                            </td>
                        </tr>
                    ))}
                </tbody>
            </Table>
        </Container>
    );
}
