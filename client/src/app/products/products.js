import React, { useState, useEffect } from 'react';
import {
    Container,
    Row,
    Col,
    Tab,
    ListGroup,
    Spinner,
    Button,
    InputGroup,
    FormControl,
} from 'react-bootstrap';
import { getProducts } from 'api/products';
import { showError } from 'components/sweetAlert/sweetAlert';
import Product from './product/product';
import './products.css';

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
    };

    const handleSearchSubmit = (event) => {
        event.preventDefault();
        handleFilterChange(sortOrder, category, searchWord);
    };

    const handleSortChange = (sortOrder) => {
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

    if (!categories || categories.length === 0) {
        return (
            <div className='spinner-container'>
                <Spinner animation='border' role='status' className='spinner'>
                    <span className='sr-only'>Loading...</span>
                </Spinner>
            </div>
        );
    }

    return (
        <Container className='p-3' fluid={true}>
            <Row>
                <Col md='2'>
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
                                <ListGroup.Item key={idx} action eventKey={cat}>
                                    {cat}
                                </ListGroup.Item>
                            ))}
                        </ListGroup>
                    </Tab.Container>
                    <div className='mt-5'>
                        <Tab.Container
                            defaultActiveKey='Default'
                            onSelect={handleSortChange}
                            className='mt-5'
                        >
                            <ListGroup>
                                <ListGroup.Item>Sort</ListGroup.Item>
                                <ListGroup.Item action eventKey='Default'>
                                    Default
                                </ListGroup.Item>
                                <ListGroup.Item
                                    action
                                    eventKey='Price: Low to High'
                                >
                                    Price: Low to High
                                </ListGroup.Item>
                                <ListGroup.Item
                                    action
                                    eventKey='Price: High to Low'
                                >
                                    Price: High to Low
                                </ListGroup.Item>
                                <ListGroup.Item
                                    action
                                    eventKey='Newest Arrivals'
                                >
                                    Newest Arrivals
                                </ListGroup.Item>
                            </ListGroup>
                        </Tab.Container>
                    </div>
                </Col>

                <Col md='10'>
                    <div className='d-flex justify-content-between'>
                        <InputGroup className='mb-3'>
                            <FormControl
                                placeholder='Search Products'
                                aria-label='Search Products'
                                aria-describedby='basic-addon2'
                                onChange={handleSearchChange}
                            />
                            <InputGroup.Append>
                                <Button
                                    variant='outline-secondary'
                                    onClick={handleSearchSubmit}
                                >
                                    Search
                                </Button>
                            </InputGroup.Append>
                        </InputGroup>
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
