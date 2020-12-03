import React, { useState, useEffect } from 'react';
import { Container } from 'react-bootstrap';

export default function Main() {
    const [product, setProduct] = useState({});

    useEffect(() => {
        const initProduct = async () => {
            const product = {};
            setProduct(product);
        };
        initProduct();
    });

    return <Container className='p-3'>product</Container>;
}
