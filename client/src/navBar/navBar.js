import React from 'react';
import { Navbar, Nav } from 'react-bootstrap';

export default function NavBar() {
    return (
        <Navbar bg='dark' variant='dark'>
            <Navbar.Brand href='#home'>Navbar</Navbar.Brand>
            <Nav className='mr-auto'>
                <Nav.Link href='/products'>Products</Nav.Link>
                <Nav.Link href='/user'>User</Nav.Link>
                <Nav.Link href='/login'>Login</Nav.Link>
                <Nav.Link href='/signup'>Sign Up</Nav.Link>
            </Nav>
        </Navbar>
    );
}
