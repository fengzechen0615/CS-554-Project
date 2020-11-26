import React, { useEffect, useState } from 'react';
import { Modal, Button, Form, Row, Col } from 'react-bootstrap';
import { useSelector } from 'react-redux';

// address, avatar, nickname, phoneNumber, state, zipcode

export default function AddProductModal(props) {
    const user = useSelector((state) => state.user);
    const [productName, setProductName] = useState('');
    const [description, setDescription] = useState('');
    const [categoryArr, setCategoryArr] = useState([]);
    const [imageUrl, setImageUrl] = useState('');
    const [stock, setStock] = useState(10);
    const [price, setPrice] = useState(25);

    return (
        <Modal
            show={props.show}
            onHide={props.handleClose}
            backdrop='static'
            keyboard={false}
            centered
            size='lg'
        >
            <Modal.Header closeButton>
                <Modal.Title>Add New Product</Modal.Title>
            </Modal.Header>

            <Modal.Body>
                <Form>
                    <Form.Group as={Row}>
                        <Form.Label column sm={3}>
                            Product Name
                        </Form.Label>
                        <Col sm={9}>
                            <Form.Control
                                type='text'
                                value={productName}
                                onChange={(ev) =>
                                    setProductName(ev.target.value)
                                }
                                required
                            />
                        </Col>
                    </Form.Group>
                    <Form.Group as={Row}>
                        <Form.Label column sm={3}>
                            Description
                        </Form.Label>
                        <Col sm={9}>
                            <Form.Control
                                type='text'
                                value={description}
                                onChange={(ev) =>
                                    setDescription(ev.target.value)
                                }
                                required
                            />
                        </Col>
                    </Form.Group>
                </Form>
            </Modal.Body>

            <Modal.Footer>
                <Button variant='secondary'>Close</Button>
                <Button variant='primary'>Submit</Button>
            </Modal.Footer>
        </Modal>
    );
}
