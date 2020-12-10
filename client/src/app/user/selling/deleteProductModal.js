import React from 'react';
import { Modal, Button } from 'react-bootstrap';
import { showError, showSuccess } from 'components/sweetAlert/sweetAlert';
import { deleteProduct } from 'api/products';

export default function DeleteProductModal(props) {
    const deleteHandler = async (event) => {
        try {
            await deleteProduct(props.productId);
            showSuccess('Successfully Deleted the Product!');
            props.handleClose();
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
                <Modal.Title>Delete Product</Modal.Title>
            </Modal.Header>

            <Modal.Body>
                <p>Are you sure you want to delete the product?</p>
            </Modal.Body>
            <Modal.Footer>
                <Button variant='secondary' onClick={props.handleClose}>
                    Close
                </Button>
                <Button variant='danger' type='submit' onClick={deleteHandler}>
                    Delete
                </Button>
            </Modal.Footer>
        </Modal>
    );
}
