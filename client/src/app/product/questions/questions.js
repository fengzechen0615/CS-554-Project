import React, { useState } from 'react';
import { Button, Divider } from '@material-ui/core';
import { Row, Col } from 'react-bootstrap';
import PostQuestionModal from './postQuestionModal';
import EditAnswerModal from './editAnswerModal';
import { useSelector } from 'react-redux';
import './questions.css';

export default function Questions(props) {
    const [showPostQuestionModal, setShowPostQuestionModal] = useState(false);
    const [showEditAnswerModal, setShowEditAnswerModal] = useState(false);
    const [currentQuestion, setCurrentQuestion] = useState({});
    const questions = props.questions;
    const user = useSelector((state) => state.user);
    return (
        <div>
            <h2>Customer questions and answers</h2>
            <div>
                {questions.map((question) => (
                    <div key={question._id}>
                        <Divider className='my-2' />
                        <Row>
                            <Col xs={1}>Question:</Col>
                            <Col>{question.question}</Col>
                        </Row>
                        <Row>
                            <Col xs={1}>Answer:</Col>
                            <Col>
                                {question.answer}{' '}
                                {question.sellerId === user._id && (
                                    <Button
                                        color='primary'
                                        className='p-0 ml-2'
                                        onClick={() => {
                                            setShowEditAnswerModal(true);
                                            setCurrentQuestion(question);
                                        }}
                                    >
                                        Edit Answer
                                    </Button>
                                )}
                            </Col>
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
                refresh={props.refresh}
            />
            <EditAnswerModal
                show={showEditAnswerModal}
                handleClose={() => setShowEditAnswerModal(false)}
                productId={props.productId}
                refresh={props.refresh}
                question={currentQuestion}
            />
        </div>
    );
}
