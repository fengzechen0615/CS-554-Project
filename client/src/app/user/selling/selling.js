import React, { useEffect, useState } from 'react';
import { Container, Button } from 'react-bootstrap';
import { useSelector } from 'react-redux';
import AddProductModal from './addProductModal';

// address, avatar, nickname, phoneNumber, state, zipcode

export default function UserSellingProducts(props) {
    const user = useSelector((state) => state.user);
    const [products, setProducts] = useState([]);
    const [showModal, setShowModal] = useState(false);

    useEffect(() => {
        const initProducts = async () => {
            const products = [];
            setProducts(products);
        };
        initProducts();
    }, []);

    return (
        <Container className='my-5'>
            <h1 className='text-center my-5'>User Selling products</h1>
            <Button onClick={() => setShowModal(true)}>Add Product</Button>
            <AddProductModal
                show={showModal}
                handleClose={() => setShowModal(false)}
            />
        </Container>
    );
}
