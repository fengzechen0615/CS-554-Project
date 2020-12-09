import React from 'react';
import { Carousel, Container, Row, Button } from 'react-bootstrap';
import {
    Card,
    CardActionArea,
    CardContent,
    CardMedia,
    Typography,
} from '@material-ui/core';
import { Link, useHistory } from 'react-router-dom';
import './home.css';

export default function Home() {
    const history = useHistory();
    return (
        <div className='bg home'>
            <Carousel className='carousel'>
                <Carousel.Item>
                    <img
                        className='d-block w-100 carouselImg'
                        src='images/banners/banner-1.jpg'
                        alt='First slide'
                    />
                    <div className='carousel-description'>
                        <h2>Xian Yu</h2>
                        <p>A website to sell & buy products!</p>
                        <Button
                            variant='outline-danger'
                            size='lg'
                            as={Link}
                            to='/products'
                        >
                            View More
                        </Button>
                    </div>
                </Carousel.Item>
                <Carousel.Item>
                    <img
                        className='d-block w-100 carouselImg'
                        src='images/banners/banner-2.jpg'
                        alt='Third slide'
                    />
                    <div className='carousel-description'>
                        <h2>Top 10 products</h2>
                        <p>top 10</p>
                    </div>
                </Carousel.Item>
                <Carousel.Item>
                    <img
                        className='d-block w-100 carouselImg'
                        src='images/banners/banner-3.jpg'
                        alt='Third slide'
                    />
                    <div className='carousel-description'>
                        <h2>Xian Yu</h2>
                        <p>A website to sell & buy products!</p>
                    </div>
                </Carousel.Item>
            </Carousel>
            <Container>
                <h1 className="title">Explore Our Website</h1>
                <ul className='card-list clearfix'>
                    <li>
                        <button
                            className='card-btn'
                            onClick={() =>
                                history.push('/products?category=Bags')
                            }
                        >
                            <img
                                className='card-img'
                                src='/images/category/bag.jpeg'
                            ></img>
                            <div className='overlay'>
                                <p>Discover More Bags</p>
                            </div>
                        </button>
                    </li>
                    <li>
                        <button
                            className='card-btn'
                            onClick={() =>
                                history.push('/products?category=Electronics')
                            }
                        >
                            <img
                                className='card-img'
                                src='/images/category/eletronic.jpg'
                            ></img>
                            <div className='overlay'>
                                <p>Discover More Electronics</p>
                            </div>
                        </button>
                    </li>
                    <li>
                        <button
                            className='card-btn'
                            onClick={() =>
                                history.push(
                                    `/products?category=Health & Beauty`
                                )
                            }
                        >
                            <img
                                className='card-img'
                                src='/images/category/health.jpeg'
                            ></img>
                            <div className='overlay'>
                                <p>Discover More Health & Beauty</p>
                            </div>
                        </button>
                    </li>
                </ul>
                <ul className='card-list clearfix'>
                    <li>
                        <button
                            className='card-btn'
                            onClick={() =>
                                history.push('/products?category=Men')
                            }
                        >
                            <img
                                className='card-img'
                                src='/images/category/men.jpg'
                            ></img>
                            <div className='overlay'>
                                <p>Discover More Clothes for Men</p>
                            </div>
                        </button>
                    </li>
                    <li>
                        <button
                            className='card-btn'
                            onClick={() =>
                                history.push('/products?category=Women')
                            }
                        >
                            <img
                                className='card-img'
                                src='/images/category/women.webp'
                            ></img>
                            <div className='overlay'>
                                <p>Discover More Clothes for Women</p>
                            </div>
                        </button>
                    </li>
                    <li>
                        <button
                            className='card-btn'
                            onClick={() =>
                                history.push(
                                    '/products?category=Watch & Jewelry'
                                )
                            }
                        >
                            <img
                                className='card-img'
                                src='/images/category/necklaces.jpg'
                            ></img>
                            <div className='overlay'>
                                <p>Discover More Watch & Jewelry</p>
                            </div>
                        </button>
                    </li>
                </ul>
            </Container>
        </div>
    );
}
