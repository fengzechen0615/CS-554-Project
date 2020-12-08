import React from 'react';
import { Card, Badge } from 'react-bootstrap';
import { Button } from '@material-ui/core';
import { Link } from 'react-router-dom';
import './product.css';

export default function Product(props) {
    return (
        <Card className='m-3'>
            <Card.Img variant='top' src={props.imageUrl} height={200} />
            <Card.Body>
                <Card.Title>{props.title}</Card.Title>
                <p className='mb-0 description'>{props.description}</p>
                <p className='mb-0'>Price: {props.price}</p>
                <div className='mb-2'>
                    {props.categories &&
                        props.categories.length > 0 &&
                        props.categories.map((category, idx) => (
                            <Badge variant='primary' key={idx} className='mr-2'>
                                {category}
                            </Badge>
                        ))}
                </div>
                <Button
                    color='primary'
                    variant='outlined'
                    component={Link}
                    to={`/product/${props.productId}`}
                >
                    Detail
                </Button>
            </Card.Body>
        </Card>
    );
}
