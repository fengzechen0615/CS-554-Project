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
            <Carousel>
                <Carousel.Item>
                    <img
                        className='d-block w-100'
                        src='images/banners/banner-1.jpg'
                        alt='First slide'
                    />
                </Carousel.Item>
                <Carousel.Item>
                    <img
                        className='d-block w-100'
                        src='images/banners/banner-2.jpg'
                        alt='Third slide'
                    />
                </Carousel.Item>
                <Carousel.Item>
                    <img
                        className='d-block w-100'
                        src='images/banners/banner-3.jpg'
                        alt='Third slide'
                    />
                </Carousel.Item>
            </Carousel>
            <div className='d-flex justify-content-center m-5'>
                <Button
                    variant='outline-danger'
                    size='lg'
                    as={Link}
                    to='/products'
                >
                    View More Products
                </Button>
            </div>
            <Container>
                <Row className='mt-3 pb-5'>
                    <Card className='card'>
                        <CardActionArea
                            onClick={() =>
                                history.push('/products?category=Bags')
                            }
                        >
                            <CardMedia
                                className='media'
                                image='/images/products/product-1607043195509.png'
                                title='product-image'
                            />
                            <CardContent>
                                <Typography
                                    gutterBottom
                                    variant='body1'
                                    component='h2'
                                    align='center'
                                >
                                    Discover More Bags
                                </Typography>
                            </CardContent>{' '}
                        </CardActionArea>
                    </Card>
                    <Card className='card'>
                        <CardActionArea
                            onClick={() =>
                                history.push('/products?category=Electronics')
                            }
                        >
                            <CardMedia
                                className='media'
                                image='/images/products/product-1607043197891.jpeg'
                                title='product-image'
                            />
                            <CardContent>
                                <Typography
                                    gutterBottom
                                    variant='body1'
                                    component='h2'
                                    align='center'
                                >
                                    Discover More Electronics
                                </Typography>
                            </CardContent>{' '}
                        </CardActionArea>
                    </Card>
                    <Card className='card'>
                        <CardActionArea
                            onClick={() =>
                                history.push(
                                    `/products?category=Health & Beauty`
                                )
                            }
                        >
                            <CardMedia
                                className='media'
                                image='/images/products/product-1607043203344.jpeg'
                                title='product-image'
                            />
                            <CardContent>
                                <Typography
                                    gutterBottom
                                    variant='body1'
                                    component='h2'
                                    align='center'
                                >
                                    {'Discover More Health & Beauty'}
                                </Typography>
                            </CardContent>{' '}
                        </CardActionArea>
                    </Card>
                </Row>
                <Row className='mt-3 pb-5'>
                    <Card className='card'>
                        <CardActionArea
                            onClick={() =>
                                history.push('/products?category=Men')
                            }
                        >
                            <CardMedia
                                className='media'
                                image='/images/products/product-1607043205323.jpeg'
                                title='product-image'
                            />
                            <CardContent>
                                <Typography
                                    gutterBottom
                                    variant='body1'
                                    component='h2'
                                    align='center'
                                >
                                    Discover More Clothes for Men
                                </Typography>
                            </CardContent>{' '}
                        </CardActionArea>
                    </Card>
                    <Card className='card'>
                        <CardActionArea
                            onClick={() =>
                                history.push('/products?category=Women')
                            }
                        >
                            <CardMedia
                                className='media'
                                image='/images/products/product-1607043211365.webp'
                                title='product-image'
                            />
                            <CardContent>
                                <Typography
                                    gutterBottom
                                    variant='body1'
                                    component='h2'
                                    align='center'
                                >
                                    Discover More Clothes for Women
                                </Typography>
                            </CardContent>{' '}
                        </CardActionArea>
                    </Card>
                    <Card className='card'>
                        <CardActionArea
                            onClick={() =>
                                history.push(
                                    '/products?category=Watch & Jewelry'
                                )
                            }
                        >
                            <CardMedia
                                className='media'
                                image='/images/products/product-1607043208800.png'
                                title='product-image'
                            />
                            <CardContent>
                                <Typography
                                    gutterBottom
                                    variant='body1'
                                    component='h2'
                                    align='center'
                                >
                                    {'Discover More Watch & Jewelry'}
                                </Typography>
                            </CardContent>{' '}
                        </CardActionArea>
                    </Card>
                </Row>
            </Container>
        </div>
    );
}
