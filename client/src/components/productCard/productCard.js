import React from 'react';
import { Card, Button } from 'react-bootstrap';
import './productCard.css';

export default function ProductCard(props) {
  return (
    <Card className='m-3'>
      <Card.Img variant='top' src={`/images/${props.image}`} height={200} />
      <Card.Body>
        <Card.Title>{props.title}</Card.Title>
        <Card.Text className='text'>{props.description}</Card.Text>
        <Button variant='outline-primary'>Detail</Button>
      </Card.Body>
    </Card>
  );
}
