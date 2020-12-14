import React from 'react';
import { Carousel, Container, Button } from 'react-bootstrap';
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
                        <div>
                            <h1 className='carousel-title'>E Commerce</h1>
                            <p className='carousel-para'>
                                A website to sell & buy products
                            </p>
                            <p className='carousel-para'>
                                Diverse categories
                            </p>
                            <p className='carousel-para'>
                                Directly contact between seller & buyer
                            </p>
                            <Button
                                variant='outline-danger'
                                size='lg'
                                as={Link}
                                to='/products'
                            >
                                View More
                            </Button>
                        </div>
                    </div>
                </Carousel.Item>
                <Carousel.Item>
                    <img
                        className='d-block w-100 carouselImg'
                        src='images/banners/banner-2.jpg'
                        alt='Third slide'
                    />
                    <div className='carousel-description'>
                        <div>
                            <h1 className='carousel-title'>Looking for something?</h1>
                            <p className='carousel-para'>
                                Thousands of products selling on this website
                            </p>
                            <p className='carousel-para'>
                                Check your order any time
                            </p>
                            <p className='carousel-para'>
                                Have questions? Ask seller directly
                            </p>
                            <Button
                                variant='outline-danger'
                                size='lg'
                                as={Link}
                                to='/login'
                            >
                                Become a buyer now! 
                            </Button>
                        </div>
                    </div>
                </Carousel.Item>
                <Carousel.Item>
                    <img
                        className='d-block w-100 carouselImg'
                        src='images/banners/banner-3.jpg'
                        alt='Third slide'
                    />
                    <div className='carousel-description'>
                        <div>
                            <h1 className='carousel-title'>Sell something?</h1>
                            <p className='carousel-para'>
                                Easy to put on sale
                            </p>
                            <p className='carousel-para'>
                                Saftey first account to protect your money
                            </p>
                            <Button
                                variant='outline-danger'
                                size='lg'
                                as={Link}
                                to='/login'
                            >
                                Become a seller now!
                            </Button>
                        </div>
                    </div>
                </Carousel.Item>
            </Carousel>
            <Container>
                <h1 className='title'>Explore Our Website</h1>
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
                                alt='/images/category/bag.jpeg'
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
                                alt='/images/category/eletronic.jpg'
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
                                    `/products?category=${encodeURIComponent(
                                        'Health & Beauty'
                                    )}`
                                )
                            }
                        >
                            <img
                                className='card-img'
                                src='/images/category/health.jpeg'
                                alt='/images/category/health.jpeg'
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
                                alt='/images/category/men.jpg'
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
                                alt='/images/category/women.webp'
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
                                    `/products?category=${encodeURIComponent(
                                        'Watch & Jewelry'
                                    )}`
                                )
                            }
                        >
                            <img
                                className='card-img'
                                src='/images/category/necklaces.jpg'
                                alt='/images/category/necklaces.jpg'
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
