import React, { useEffect, useState } from 'react';
import { Container, Button } from 'react-bootstrap';
import AddProductModal from './addProductModal';
import EditProductModal from './editProductModal';
import Product from 'components/product-selling/product';
import { getUserProducts } from 'api/products';
import { showError } from 'components/sweetAlert/sweetAlert';

// address, avatar, nickname, phoneNumber, state, zipcode

export default function UserSellingProducts(props) {
    const [products, setProducts] = useState([]);
    const [showAddModal, setShowAddModal] = useState(false);
    const [showEditModal, setShowEditModal] = useState(false);
    const [productId, setProductId] = useState('');

    useEffect(() => {
        const initProducts = async () => {
            try {
                const products = await getUserProducts();
                setProducts(products);
            } catch (error) {
                showError(error.message);
            }
        };
        initProducts();
    }, []);

    const refreshProducts = async () => {
        const products = await getUserProducts();
        setProducts(products);
    };

    return (
        <Container className='my-5'>
            <h1 className='text-center my-5'>User Selling products</h1>
            <Button
                className='btn-block'
                variant='outline-primary'
                onClick={() => setShowAddModal(true)}
            >
                Add Product
            </Button>
            <div className='d-flex flex-wrap'>
                {products.map((product, idx) => (
                    <Product
                        key={idx}
                        title={product.productName}
                        description={product.description}
                        imageUrl={product.imageUrl}
                        price={product.price}
                        stock={product.stock}
                        categories={product.categoryArr}
                        productId={product._id}
                        setProductId={setProductId}
                        openModal={() => setShowEditModal(true)}
                    />
                ))}
            </div>
            <AddProductModal
                show={showAddModal}
                handleClose={() => setShowAddModal(false)}
                refresh={() => refreshProducts()}
            />
            <EditProductModal
                show={showEditModal}
                handleClose={() => setShowEditModal(false)}
                refresh={() => refreshProducts()}
                productId={productId}
            />
        </Container>
    );
}
