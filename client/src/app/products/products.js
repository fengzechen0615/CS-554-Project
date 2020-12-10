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
import Pagination from '@material-ui/lab/Pagination';
import { getProducts } from 'api/products';
import { showError } from 'components/sweetAlert/sweetAlert';
import Product from './product/product';
import './products.css';

export default function Main(props) {
    const COUNT_PER_PAGE = 12;
    const params = new URLSearchParams(window.location.search);
    console.log(params.get('category'));
    const [products, setProducts] = useState([]);
    const [categories, setCategories] = useState([]);
    const [filteredProducts, setFilteredProducts] = useState([]);
    const [displayedProducts, setDisplayedProducts] = useState([]);
    const [sortOrder, setSortOrder] = useState('Default');
    const [category, setCategory] = useState(params.get('category') || 'All');
    const [searchWord, setSearchWord] = useState('');
    const [page, setPage] = useState(1);
    const [count, setCount] = useState(null);

    useEffect(() => {
        const initProducts = async () => {
            try {
                const products = await getProducts();
                const categories = products
                    .map((product) => product.categoryArr)
                    .flat();
                const categorySet = [...new Set(categories)];
                setProducts(products);
                const filteredProducts = category
                    ? filterByCategory(products, category)
                    : products;
                setFilteredProducts(filteredProducts);
                setDisplayedProducts(filteredProducts.slice(0, COUNT_PER_PAGE));
                setCount(Math.ceil(filteredProducts.length / COUNT_PER_PAGE));
                setCategories(categorySet);
            } catch (error) {
                showError(error.message);
            }
        };
        initProducts();
        // eslint-disable-next-line
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
        setCount(Math.ceil(filteredProducts.length / COUNT_PER_PAGE));
        setPage(1);
        setDisplayedProducts(filteredProducts.slice(0, COUNT_PER_PAGE));
    };

    const handlePageChange = (event, value) => {
        setPage(value);
    };

    useEffect(() => {
        const start = (page - 1) * COUNT_PER_PAGE;
        const end = start + COUNT_PER_PAGE;
        setDisplayedProducts(filteredProducts.slice(start, end));
        window.scrollTo(0, 0);
    }, [page, filteredProducts]);

    if (!categories || categories.length === 0 || count === null) {
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
                <InputGroup className='mb-3 search-bar'>
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
            </Row>
            <Row>
                <Col md='2'>
                    <div className='list-bar'>
                        <Tab.Container
                            defaultActiveKey={params.get('category') || 'All'}
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
                    </div>
                </Col>

                <Col md='10'>
                    <div className='d-flex flex-wrap'>
                        {displayedProducts.map((product, idx) => (
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
                    <div className='d-flex justify-content-center'>
                        <Pagination
                            count={count}
                            page={page}
                            onChange={handlePageChange}
                        />
                    </div>
                </Col>
            </Row>
        </Container>
    );
}
