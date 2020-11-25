import React, { useState } from 'react';
import {
    Container,
    Row,
    Col,
    Form,
    FormControl,
    Button,
} from 'react-bootstrap';
import ProductCard from '../components/productCard/productCard';
import { useSelector } from 'react-redux';

export default function Main() {
    const user = useSelector((state) => state.user);
    console.log(user);

    const [products, setProducts] = useState([
        {
            name: 'rice',
            description: 'Botan Musenmai Calrose Rice, 5 Pound',
            image: 'rice-1.jpg',
        },
        {
            name: 'rice',
            description:
                'Iberia Jasmine Rice, 5 lbs Long Grain Naturally Fragrant Enriched Jasmine Rice, White',
            image: 'rice-1.jpg',
        },
        {
            name: 'rice',
            description:
                'Iberia Jasmine Rice, 5 lbs Long Grain Naturally Fragrant Enriched Jasmine Rice, White',
            image: 'rice-1.jpg',
        },
        {
            name: 'rice',
            description:
                'Iberia Jasmine Rice, 5 lbs Long Grain Naturally Fragrant Enriched Jasmine Rice, White',
            image: 'rice-1.jpg',
        },
        {
            name: 'rice',
            description:
                'Iberia Jasmine Rice, 5 lbs Long Grain Naturally Fragrant Enriched Jasmine Rice, White',
            image: 'rice-1.jpg',
        },
    ]);

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
            <Row>
                {products.map((product, idx) => (
                    <Col key={idx}>
                        <ProductCard
                            title={product.name}
                            description={product.description}
                            image={product.image}
                        />
                    </Col>
                ))}
            </Row>
        </Container>
    );
}
