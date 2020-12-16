import React, { useState, useEffect } from 'react';
import { Col, Container, Row } from 'react-bootstrap';
import { makeStyles } from '@material-ui/core/styles';
import {
    Chip,
    MenuItem,
    Select,
    InputLabel,
    FormControl,
    Button,
} from '@material-ui/core';
import { useParams } from 'react-router-dom';
import { showError, showSuccess } from 'components/sweetAlert/sweetAlert';
import { getProduct } from 'api/products';
import { buyProduct } from 'api/product';
import './product.css';
import Questions from './questions/questions';
import { useSelector } from 'react-redux';

const useStyles = makeStyles((theme) => ({
    formControl: {
        margin: 0,
        minWidth: 120,
    },
}));

export default function Main() {
    const user = useSelector((state) => state.user);
    const classes = useStyles();
    const [product, setProduct] = useState({});
    const [questions, setQuestions] = useState([]);
    const [quantity, setQuantity] = useState(1);
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

    const refreshProduct = async () => {
        try {
            const response = await getProduct(productId);
            const product = response.pgResult;
            setProduct(product);
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

    const buyProductHandler = async () => {
        try {
            const productId = product._id;
            const { sellerId, price, productName, description } = product;
            const imgUrl = product.imageUrl;
            const address = user.address || 'N/A';
            const buyerId = user._id;
            const dealNumber = quantity;
            await buyProduct(
                productId,
                sellerId,
                buyerId,
                address,
                price,
                dealNumber,
                productName,
                description,
                imgUrl
            );
            showSuccess('Successfully bought product!');
            refreshProduct();
        } catch (error) {
            showError(error?.response?.data?.error || error.message);
        }
    };

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
                    <div className='m-1 d-flex'>
                        <FormControl
                            variant='outlined'
                            margin='dense'
                            className={classes.formControl}
                        >
                            <InputLabel id='quantity'>Quantity</InputLabel>
                            <Select
                                labelId='quantity'
                                value={quantity}
                                onChange={(ev) => setQuantity(ev.target.value)}
                                label='Quantity'
                            >
                                {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((q) => (
                                    <MenuItem value={q} key={q}>
                                        {q}
                                    </MenuItem>
                                ))}
                            </Select>
                        </FormControl>
                        <Button
                            color='primary'
                            variant='outlined'
                            className='ml-1'
                            onClick={buyProductHandler}
                        >
                            Buy Now
                        </Button>
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
