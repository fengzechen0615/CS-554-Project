import React, { useState } from 'react';
import { Modal, Button, Form, Row, Col } from 'react-bootstrap';
import { Chip } from '@material-ui/core';
import { showError, showSuccess } from 'components/sweetAlert/sweetAlert';
import { createProduct } from 'api/products';

// address, avatar, nickname, phoneNumber, state, zipcode

export default function AddProductModal(props) {
    const [productName, setProductName] = useState('');
    const [description, setDescription] = useState('');
    const [categoryArr, setCategoryArr] = useState([]);
    const [category, setCategory] = useState('');
    const [file, setFile] = useState(null);
    const [stock, setStock] = useState('');
    const [price, setPrice] = useState('');
    const [fileKey, setFileKey] = useState('');

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

    const clearForm = () => {
        setProductName('');
        setDescription('');
        setCategoryArr([]);
        setCategory('');
        setStock('');
        setPrice('');
        resetFileInput();
    };

    const resetFileInput = () => {
        const randomString = Math.random().toString(36);
        setFileKey(randomString);
    };

    const submitHandler = async (event) => {
        event.preventDefault();
        if (!file) {
            showError('No File Selected!');
            return;
        }

        try {
            const formData = new FormData();
            formData.append('product', file, file.name);
            formData.append('productName', productName);
            formData.append('description', description);
            formData.append('categoryArr', categoryArr);
            formData.append('stock', stock);
            formData.append('price', price);
            await createProduct(formData);
            showSuccess('Successfully Created New Product!');
            clearForm();
            props.refresh();
        } catch (error) {
            showError(error?.response?.data?.error || error.message);
        }
    };

    const deleteCategoryHandler = (category) => {
        setCategoryArr((prev) => {
            return prev.filter((cat) => cat !== category);
        });
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
                                    onDelete={() => deleteCategoryHandler(cat)}
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
                            <Form.File
                                accept='image/x-png,image/gif,image/jpeg'
                                required
                                onChange={(ev) => setFile(ev.target.files[0])}
                                key={fileKey}
                            />
                        </Col>
                    </Form.Group>
                    <Form.Group as={Row}>
                        <Form.Label column sm={3}>
                            Stock
                        </Form.Label>
                        <Col sm={9}>
                            <Form.Control
                                type='number'
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
                                type='number'
                                value={price}
                                onChange={(ev) => setPrice(ev.target.value)}
                                required
                            />
                        </Col>
                    </Form.Group>
                </Form>
            </Modal.Body>

            <Modal.Footer>
                <Button variant='secondary' onClick={props.handleClose}>
                    Close
                </Button>
                <Button variant='primary' type='submit' form='addProductForm'>
                    Submit
                </Button>
            </Modal.Footer>
        </Modal>
    );
}
