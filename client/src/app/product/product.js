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
    const [questions, setQuestions] = useState([]);
    const params = useParams();
    const { productId } = params;

    const refreshQuestions = async () => {
        try {
            const response = await getProduct(productId);
            const questions = response.qaResult;
            setQuestions(questions);
        } catch (error) {
            showError(error.message);
        }
    };

    useEffect(() => {
        const initProduct = async () => {
            try {
                const response = await getProduct(productId);
                const product = response.pgResult;
                const questions = response.qaResult;
                setProduct(product);
                setQuestions(questions);
            } catch (error) {
                showError(error.message);
            }
        };
        initProduct();
    }, [productId]);

    return (
        <Container className='p-3 mt-5'>
            <Row>
                <Col xs={12} md={6}>
                    <img src={`${product.imageUrl}`} alt={product.imageUrl} />
                </Col>
                <Col xs={12} md={6}>
                    <h1>{product.productName}</h1>
                    <p>{product.description}</p>
                    <p className='m-1'>Price: {product.price}</p>
                    <p className='m-1'>Stock: {product.stock}</p>
                    <p className='m-1'>
                        Seller:{' '}
                        {product.sellerName ? product.sellerName : 'N/A'}
                    </p>
                    <p className='m-1'>
                        Post Date: {product.date && product.date.split('T')[0]}{' '}
                    </p>
                    <div className='m-1'>
                        Category:{' '}
                        {product.categoryArr && product.categoryArr.length > 0
                            ? product.categoryArr.map((cat, idx) => (
                                  <Chip
                                      key={idx}
                                      label={cat}
                                      className='ml-1'
                                  />
                              ))
                            : 'N/A'}
                    </div>
                </Col>
            </Row>
            <br />
            <Questions
                productId={productId}
                questions={questions}
                refresh={refreshQuestions}
            />
        </Container>
    );
}
