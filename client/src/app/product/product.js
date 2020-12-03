import React, { useState, useEffect } from 'react';
import { Col, Container, Row } from 'react-bootstrap';
import { Chip } from '@material-ui/core';
import { useParams } from 'react-router-dom';
import { showError } from 'components/sweetAlert/sweetAlert';
import { getProduct } from 'api/products';
import './product.css';
import Questions from './questions/questions';

export default function Main() {
    const [product, setProduct] = useState({});
    const params = useParams();
    const { productId } = params;

    useEffect(() => {
        const initProduct = async () => {
            try {
                const product = await getProduct(productId);
                console.log(product);
                setProduct(product);
            } catch (error) {
                showError(error.message);
            }
        };
        initProduct();
    }, []);

    return (
        <Container className='p-3 mt-5'>
            <Row>
                <Col xs={12} md={6}>
                    <img src={`${product.imageUrl}`} />
                </Col>
                <Col xs={12} md={6}>
                    <h1>{product.productName}</h1>
                    <p>{product.description}</p>
                    <p className='m-1'>Price: {product.price}</p>
                    <p className='m-1'>Stock: {product.stock}</p>
                    <p className='m-1'>Seller: </p>
                    <p className='m-1'>
                        Post Date: {product.date && product.date.split('T')[0]}{' '}
                    </p>
                    <div className='m-1'>
                        Category:{' '}
                        {product.categoryArr &&
                            product.categoryArr.length > 0 &&
                            product.categoryArr.map((cat, idx) => (
                                <Chip key={idx} label={cat} />
                            ))}
                    </div>
                </Col>
            </Row>
            <br />
            <Questions />
        </Container>
    );
}
