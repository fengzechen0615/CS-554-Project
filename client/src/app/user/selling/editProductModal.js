import React, { useEffect, useState } from 'react';
import { Modal, Button, Form, Row, Col } from 'react-bootstrap';
import { showError, showSuccess } from 'components/sweetAlert/sweetAlert';
import { getProduct } from 'api/products';
import { updateProduct } from 'api/product';

export default function AddProductModal(props) {
    const [productName, setProductName] = useState('');
    const [description, setDescription] = useState('');
    const [stock, setStock] = useState('');
    const [price, setPrice] = useState('');

    useEffect(() => {
        const initProduct = async () => {
            if (!props.productId) return;
            try {
                const product = (await getProduct(props.productId))?.pgResult;
                if (!product) {
                    showError('Sorry, can not get product!');
                    return;
                }
                setProductName(product.productName);
                setDescription(product.description);
                setStock(product.stock);
                setPrice(product.price);
            } catch (error) {
                showError(error.message);
            }
        };
        initProduct();
    }, [props.productId]);

    const submitHandler = async (event) => {
        event.preventDefault();
        try {
            await updateProduct(
                props.productId,
                productName,
                description,
                stock,
                price
            );
            showSuccess('Successfully Updated Product!');
            props.refresh();
        } catch (error) {
            showError(error?.response?.data?.error || error.message);
        }
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
                <Modal.Title>Edit Product</Modal.Title>
            </Modal.Header>

            <Modal.Body>
                <Form onSubmit={submitHandler} id='editProductForm'>
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
                <Button variant='primary' type='submit' form='editProductForm'>
                    Submit
                </Button>
            </Modal.Footer>
        </Modal>
    );
}
