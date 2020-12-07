import React, { useState } from 'react';
import { Button } from '@material-ui/core';
import PostQuestionModal from './postQuestionModal';
import './questions.css';

export default function Questions(props) {
    const [showPostQuestionModal, setShowPostQuestionModal] = useState(false);
    return (
        <div>
            <h2>Customer questions and answers</h2>
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
