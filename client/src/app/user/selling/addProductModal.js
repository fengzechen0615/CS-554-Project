import React, { useEffect, useState } from 'react';
import { Modal, Button, Form, Row, Col } from 'react-bootstrap';
import { useSelector } from 'react-redux';
import { Chip } from '@material-ui/core';
import { showError } from 'components/sweetAlert/sweetAlert';

// address, avatar, nickname, phoneNumber, state, zipcode

export default function AddProductModal(props) {
    const user = useSelector((state) => state.user);
    const [productName, setProductName] = useState('');
    const [description, setDescription] = useState('');
    const [categoryArr, setCategoryArr] = useState([]);
    const [category, setCategory] = useState('');
    const [imageUrl, setImageUrl] = useState('');
    const [stock, setStock] = useState(10);
    const [price, setPrice] = useState(25);

    const addCategory = () => {
        if (!category) return;
        if (categoryArr.includes(category)) {
            showError('Category already exists!');
            return;
        }
        setCategoryArr((prev) => {
            return [...prev, category];
        });
        setCategory('');
    };

    const submitHandler = (event) => {
        event.preventDefault();
        alert(1);
    };

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
                <Form onSubmit={submitHandler} id='addProductForm'>
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
                    <Form.Group as={Row}>
                        <Form.Label column sm={3}>
                            Categories
                        </Form.Label>
                        <Col sm={9}>
                            {categoryArr.map((cat, idx) => (
                                <Chip
                                    key={idx}
                                    variant='outlined'
                                    color='primary'
                                    label={cat}
                                    onDelete={() => {}}
                                    className='mr-2 mt-2'
                                />
                            ))}
                        </Col>
                    </Form.Group>
                    <Form.Group as={Row}>
                        <Form.Label column sm={3}>
                            Add Category
                        </Form.Label>
                        <Col sm={6}>
                            <Form.Control
                                type='text'
                                value={category}
                                onChange={(ev) => setCategory(ev.target.value)}
                            />
                        </Col>
                        <Col sm={3}>
                            <Button
                                className='btn btn-block'
                                variant='outline-primary'
                                onClick={addCategory}
                            >
                                Add Category
                            </Button>
                        </Col>
                    </Form.Group>
                    <Form.Group as={Row}>
                        <Form.Label column sm={3}>
                            Image
                        </Form.Label>
                        <Col sm={9}>
                            <Form.File required />
                        </Col>
                    </Form.Group>
                    <Form.Group as={Row}>
                        <Form.Label column sm={3}>
                            Stock
                        </Form.Label>
                        <Col sm={9}>
                            <Form.Control
                                type='text'
                                value={stock}
                                onChange={(ev) => setStock(ev.target.value)}
                                required
                            />
                        </Col>
                    </Form.Group>
                    <Form.Group as={Row}>
                        <Form.Label column sm={3}>
                            Price
                        </Form.Label>
                        <Col sm={9}>
                            <Form.Control
                                type='text'
                                value={price}
                                onChange={(ev) => setPrice(ev.target.value)}
                                required
                            />
                        </Col>
                    </Form.Group>
                </Form>
            </Modal.Body>

            <Modal.Footer>
                <Button variant='secondary'>Close</Button>
                <Button variant='primary' type='submit' form='addProductForm'>
                    Submit
                </Button>
            </Modal.Footer>
        </Modal>
    );
}
