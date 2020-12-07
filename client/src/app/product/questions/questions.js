import React, { useState } from 'react';
import { Button, Divider } from '@material-ui/core';
import { Row, Col } from 'react-bootstrap';
import PostQuestionModal from './postQuestionModal';
import './questions.css';

export default function Questions(props) {
    const [showPostQuestionModal, setShowPostQuestionModal] = useState(false);
    const questions = props.questions;
    return (
        <div>
            <h2>Customer questions and answers</h2>
            <div>
                {questions.map((question) => (
                    <div>
                        <Divider className='my-2' />
                        <Row>
                            <Col xs={1}>Question:</Col>
                            <Col>{question.question}</Col>
                        </Row>
                        <Row>
                            <Col xs={1}>Answer:</Col>
                            <Col>{question.answer}</Col>
                        </Row>
                    </div>
                ))}
            </div>
            <div className='mt-5 post-question'>
                <span className='bold'>
                    Don't see the answer you're looking for?
                </span>
                <Button
                    color='primary'
                    variant='outlined'
                    className='ml-3'
                    onClick={() => setShowPostQuestionModal(true)}
                >
                    Post your quetion
                </Button>
            </div>
            <PostQuestionModal
                show={showPostQuestionModal}
                handleClose={() => setShowPostQuestionModal(false)}
                productId={props.productId}
            />
        </div>
    );
}
