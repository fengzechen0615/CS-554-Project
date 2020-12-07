import React, { useState, useEffect } from 'react';
import {
    Container,
    Form,
    FormControl,
    Button,
    Row,
    Col,
    Tab,
    ListGroup,
    Nav,
} from 'react-bootstrap';
import { getProducts } from 'api/products';
import { showError } from 'components/sweetAlert/sweetAlert';
import Product from './product/product';

export default function Main() {
    const [products, setProducts] = useState([]);
    const [categories, setCategories] = useState([]);
    const [filteredProducts, setFilteredProducts] = useState([]);
    const [sortOrder, setSortOrder] = useState('Default');
    const [category, setCategory] = useState('All');
    const [searchWord, setSearchWord] = useState('');

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

    const handleCategoryChange = (category) => {
        setCategory(category);
        handleFilterChange(sortOrder, category, searchWord);
    };

    const handleSearchChange = (event) => {
        const searchWord = event.target.value;
        setSearchWord(searchWord);
        handleFilterChange(sortOrder, category, searchWord);
    };

    const handleSortChange = (event) => {
        const sortOrder = event.target.value;
        setSortOrder(sortOrder);
        handleFilterChange(sortOrder, category, searchWord);
    };

    const filterByCategory = (products, category) => {
        if (category === 'All') {
            return products;
        }
        return products.filter((product) =>
            product.categoryArr.includes(category)
        );
    };

    const filterBySearch = (products, searchWord) => {
        const word = searchWord.toLowerCase();
        return products.filter((product) => {
            for (const key in product) {
                const val = product[key];
                if (typeof val === 'string' && val.toLowerCase().includes(word))
                    return true;
                if (Array.isArray(val)) {
                    for (const item of val) {
                        if (item.toLowerCase().includes(word)) return true;
                    }
                }
            }
            return false;
        });
    };

    const filterBySort = (products, sortOrder) => {
        if (sortOrder === 'Price: Low to High') {
            products.sort((a, b) => a.price - b.price);
        } else if (sortOrder === 'Price: High to Low') {
            products.sort((a, b) => b.price - a.price);
        } else if (sortOrder === 'Newest Arrivals') {
            products.sort((a, b) => new Date(b.date) - new Date(a.date));
        }
        return products;
    };

    const handleFilterChange = (sortOrder, category, searchWord) => {
        let filteredProducts = [...products];
        filteredProducts = filterByCategory(filteredProducts, category);
        filteredProducts = filterBySearch(filteredProducts, searchWord);
        filteredProducts = filterBySort(filteredProducts, sortOrder);
        setFilteredProducts(filteredProducts);
    };

    return (
        <Container className='p-3' fluid={true}>
            <Row>
                <Col md='2'>
                    <div>
                        <Tab.Container
                            defaultActiveKey='All'
                            onSelect={handleCategoryChange}
                        >
                            <ListGroup>
                                <ListGroup.Item>Category</ListGroup.Item>
                                <ListGroup.Item action eventKey='All'>
                                    All
                                </ListGroup.Item>

                                {categories.map((cat, idx) => (
                                    <ListGroup.Item
                                        key={idx}
                                        action
                                        eventKey={cat}
                                    >
                                        {cat}
                                    </ListGroup.Item>
                                ))}
                            </ListGroup>
                        </Tab.Container>
                    </div>
                </Col>
                <Col md='10'>
                    <div className='d-flex justify-content-between'>
                        <div className='d-flex'>
                            <Form inline className='m-1'>
                                <p className='m-1'>Sort By</p>
                                <Form.Control
                                    as='select'
                                    custom
                                    onChange={handleSortChange}
                                >
                                    <option>Default</option>
                                    <option>Price: Low to High</option>
                                    <option>Price: High to Low</option>
                                    <option>Newest Arrivals</option>
                                </Form.Control>
                            </Form>
                        </div>

                        <Form inline>
                            <FormControl
                                type='text'
                                placeholder='Search'
                                className='mr-sm-2'
                                onChange={handleSearchChange}
                            />
                            <Button variant='outline-info'>Search</Button>
                        </Form>
                    </div>
                    <div className='d-flex flex-wrap'>
                        {filteredProducts.map((product, idx) => (
                            <Product
                                key={idx}
                                title={product.productName}
                                description={product.description}
                                date={product.date}
                                imageUrl={product.imageUrl}
                                price={product.price}
                                stock={product.stock}
                                categories={product.categoryArr}
                                productId={product._id}
                                seller={product.sellerName}
                            />
                        ))}
                    </div>
                </Col>
            </Row>
        </Container>
    );
}
