import React from 'react';
import { Navbar, Nav, Form, FormControl, Button } from 'react-bootstrap';

export default function NavBar() {
  return (
    <Navbar bg='dark' variant='dark'>
      <Navbar.Brand href='#home'>Navbar</Navbar.Brand>
      <Nav className='mr-auto'>
        <Nav.Link href='/products'>Products</Nav.Link>
        <Nav.Link href='/user'>User</Nav.Link>
      </Nav>
    </Navbar>
  );
}
