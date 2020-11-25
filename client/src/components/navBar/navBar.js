import React from 'react';
import { Link } from 'react-router-dom';
import { Navbar, Nav, NavDropdown } from 'react-bootstrap';

export default function NavBar() {
    return (
        <Navbar bg='dark' variant='dark'>
            <Navbar.Brand as={Link} to='/products'>
                Navbar
            </Navbar.Brand>
            <Nav className='mr-auto'>
                <Nav.Link as={Link} to='/products'>
                    Products
                </Nav.Link>
                <NavDropdown title='User'>
                    <NavDropdown.Item as={Link} to='/user/info'>
                        Info
                    </NavDropdown.Item>
                    <NavDropdown.Item as={Link} to='/user/selling'>
                        Selling
                    </NavDropdown.Item>
                    <NavDropdown.Item as={Link} to='/user/purchase'>
                        Purchase
                    </NavDropdown.Item>
                </NavDropdown>
                <Nav.Link as={Link} to='/login'>
                    Login
                </Nav.Link>
                <Nav.Link as={Link} to='/signup'>
                    Sign Up
                </Nav.Link>
            </Nav>
        </Navbar>
    );
}
