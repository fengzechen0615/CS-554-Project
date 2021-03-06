import React, { useState } from 'react';
import { Modal, Button } from 'react-bootstrap';
import { makeStyles } from '@material-ui/core/styles';
import { postQuestion } from 'api/product';
import { showError, showSuccess } from 'components/sweetAlert/sweetAlert';

const useStyles = makeStyles((theme) => ({
    textarea: {
        width: '100%',
    },
}));

export default function PostQuestionModal(props) {
    const classes = useStyles();
    const [content, setContent] = useState('');
    const { productId } = props;

    const submitHandler = async () => {
        try {
            if (!content || content.trim() === '') {
                showError('Question can not be empty!');
                return;
            }
            await postQuestion(content, productId);
            await props.refresh();
            showSuccess('Successfully submitted question for this product!');
            props.handleClose();
        } catch (error) {
            showError(error.message);
        }
    };
    return (
        <Modal show={props.show} onHide={props.handleClose}>
            <Modal.Header closeButton>
                <Modal.Title>Post your question</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <label for='question-input'></label>
                <textarea
                    id='question-input'
                    className={classes.textarea}
                    value={content}
                    onChange={(event) => setContent(event.target.value)}
                ></textarea>
                <p>Your question might be answered by sellers.</p>
            </Modal.Body>
            <Modal.Footer>
                <Button variant='secondary' onClick={props.handleClose}>
                    Close
                </Button>
                <Button variant='primary' onClick={submitHandler}>
                    Post
                </Button>
            </Modal.Footer>
        </Modal>
    );
}
