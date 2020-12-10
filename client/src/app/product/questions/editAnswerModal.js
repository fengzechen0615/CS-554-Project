import React, { useState } from 'react';
import { Modal, Button } from 'react-bootstrap';
import { makeStyles } from '@material-ui/core/styles';
import { answerQuestion } from 'api/product';
import { showError, showSuccess } from 'components/sweetAlert/sweetAlert';

const useStyles = makeStyles((theme) => ({
    textarea: {
        width: '100%',
    },
}));

export default function EditQuestionModal(props) {
    const classes = useStyles();
    const [answer, setAnswer] = useState('');
    const question = props.question;

    const submitHandler = async () => {
        try {
            await answerQuestion(question._id, answer);
            await props.refresh();
            showSuccess('Successfully answered question for this product!');
            props.handleClose();
        } catch (error) {
            showError(error.message);
        }
    };
    return (
        <Modal show={props.show} onHide={props.handleClose}>
            <Modal.Header closeButton>
                <Modal.Title>Answer the question</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <p>{question.question}</p>
                <textarea
                    className={classes.textarea}
                    value={answer}
                    onChange={(event) => setAnswer(event.target.value)}
                ></textarea>
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
