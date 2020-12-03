import React from 'react';
import { Modal, Button } from 'react-bootstrap';

export default function PostQuestionModal(props) {
    return (
        <Modal show={props.show} onHide={props.handleClose}>
            <Modal.Header closeButton>
                <Modal.Title>Post your question</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <textarea></textarea>
                <p>Your question might be answered by sellers.</p>
            </Modal.Body>
            <Modal.Footer>
                <Button variant='secondary' onClick={props.handleClose}>
                    Close
                </Button>
                <Button variant='primary' onClick={props.handleClose}>
                    Save Changes
                </Button>
            </Modal.Footer>
        </Modal>
    );
}
