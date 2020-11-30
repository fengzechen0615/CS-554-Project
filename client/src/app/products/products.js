import React, { useState, useEffect } from 'react';
import { Container, Form, FormControl, Button } from 'react-bootstrap';
import { getProducts } from 'api/products';
import { showError } from 'components/sweetAlert/sweetAlert';
import Product from './product/product';

export default function Main() {
    const [products, setProducts] = useState([]);

    useEffect(() => {
        const initProducts = async () => {
            try {
                const products = await getProducts();
                setProducts(products);
            } catch (error) {
                showError(error.message);
            }
        };
        initProducts();
    }, []);

    return (
        <Container className='p-3'>
            <div className='d-flex justify-content-between'>
                <div className='d-flex'>
                    <Button className='m-1' variant='outline-primary'>
                        Latest
                    </Button>
                    <Button className='m-1' variant='outline-primary'>
                        Reset
                    </Button>
                    <Form inline className='m-1'>
                        <p className='m-1'>Category</p>
                        <Form.Control as='select' custom>
                            <option>rice</option>
                            <option>computer</option>
                            <option>3</option>
                            <option>4</option>
                            <option>5</option>
                        </Form.Control>
                    </Form>
                </div>

                <Form inline>
                    <FormControl
                        type='text'
                        placeholder='Search'
                        className='mr-sm-2'
                    />
                    <Button variant='outline-info'>Search</Button>
                </Form>
            </div>
            <div className='d-flex flex-wrap'>
                {products.map((product, idx) => (
                    <Product
                        key={idx}
                        title={product.productName}
                        description={product.description}
                        imageUrl={product.imageUrl}
                        price={product.price}
                        stock={product.stock}
                        categories={product.catagoryArr}
                    />
                ))}
            </div>
        </Container>
    );
}
