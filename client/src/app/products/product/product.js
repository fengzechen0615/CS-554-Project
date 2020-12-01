import React from 'react';
import { Card, Button, Badge } from 'react-bootstrap';
import './product.css';

export default function Product(props) {
    return (
        <Card className='m-3'>
            <Card.Img variant='top' src={props.imageUrl} height={200} />
            <Card.Body>
                <Card.Title>{props.title}</Card.Title>
                <p className='mb-0'>{props.description}</p>
                <p className='mb-0'>Date: {props.date.split('T')[0]}</p>
                <p className='mb-0'>Price: {props.price}</p>
                <p className='mb-0'>Stock: {props.stock}</p>
                <div className='mb-2'>
                    {props.categories &&
                        props.categories.length > 0 &&
                        props.categories.map((category, idx) => (
                            <Badge variant='primary' key={idx} className='mr-2'>
                                {category}
                            </Badge>
                        ))}
                </div>
                <Button size='sm' variant='outline-primary'>
                    Detail
                </Button>
            </Card.Body>
        </Card>
    );
}
