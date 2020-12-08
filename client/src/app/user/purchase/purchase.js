import React, { useEffect, useState } from 'react';
import { Container } from 'react-bootstrap';
import Product from 'components/product-order/product';
import { showError } from 'components/sweetAlert/sweetAlert';
import { getUserPurchasedProducts } from 'api/orders';

export default function UserSellingProducts(props) {
    const [products, setProducts] = useState([]);

    useEffect(() => {
        const initProducts = async () => {
            try {
                const products = await getUserPurchasedProducts();
                setProducts(products);
            } catch (error) {
                showError(error.message);
            }
        };
        initProducts();
    }, []);

    return (
        <Container className='my-5'>
            <h1 className='text-center my-5'>Purchased Products</h1>
            <div className='d-flex flex-wrap'>
                {products.map((product, idx) => (
                    <Product
                        key={idx}
                        title={product.productName}
                        description={product.description}
                        imageUrl={product.imgUrl}
                        price={product.price}
                        stock={product.stock}
                        categories={product.categoryArr}
                        productId={product.productId}
                    />
                ))}
            </div>
        </Container>
    );
}
