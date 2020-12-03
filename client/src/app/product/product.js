import React, { useState, useEffect } from 'react';
import { Container } from 'react-bootstrap';
import { useParams } from 'react-router-dom';
import { showError } from 'components/sweetAlert/sweetAlert';
import { getProduct } from 'api/products';

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

    return <Container className='p-3'>product</Container>;
}
