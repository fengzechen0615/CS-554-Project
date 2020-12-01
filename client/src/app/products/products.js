import React, { useState, useEffect } from 'react';
import { Container, Form, FormControl, Button } from 'react-bootstrap';
import { getProducts } from 'api/products';
import { showError } from 'components/sweetAlert/sweetAlert';
import Product from './product/product';

export default function Main() {
    const [products, setProducts] = useState([]);
    const [categories, setCategories] = useState([]);
    const [filteredProducts, setFilteredProducts] = useState([]);

    useEffect(() => {
        const initProducts = async () => {
            try {
                const products = await getProducts();
                const categories = products
                    .map((product) => product.categoryArr)
                    .flat();
                const categorySet = [...new Set(categories)];
                setProducts(products);
                setFilteredProducts(products);
                setCategories(categorySet);
            } catch (error) {
                showError(error.message);
            }
        };
        initProducts();
    }, []);

    const handleCategoryChange = (event) => {
        const category = event.target.value;
        const filteredProducts = products.filter(
            (product) => product.categoryArr
        );
    };

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
                        <Form.Control
                            as='select'
                            custom
                            onChange={handleCategoryChange}
                        >
                            <option>All</option>
                            {categories.map((cat, idx) => (
                                <option key={idx}>{cat}</option>
                            ))}
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
                        categories={product.categoryArr}
                    />
                ))}
            </div>
        </Container>
    );
}
