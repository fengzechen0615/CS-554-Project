import React, { useEffect, useState } from 'react';
import { Button } from 'react-bootstrap';
import {
    Table,
    TableHead,
    TableBody,
    TableRow,
    TableCell,
    TableContainer,
    Paper,
} from '@material-ui/core';
import Pagination from '@material-ui/lab/Pagination';
import { getProducts, deleteProduct } from 'api/products';
import { showError, showSuccess } from 'components/sweetAlert/sweetAlert';

const COUNT_PER_PAGE = 10;

export default function Prodcuts() {
    const [products, setProducts] = useState([]);
    const [displayedProducts, setDisplayedProducts] = useState([]);
    const [page, setPage] = useState(1);
    const [count, setCount] = useState(0);

    useEffect(() => {
        const initProducts = async () => {
            try {
                const products = await getProducts();
                setProducts(products);
                setDisplayedProducts(products.slice(0, COUNT_PER_PAGE));
                setCount(Math.ceil(products.length / COUNT_PER_PAGE));
            } catch (error) {
                showError(error.message);
            }
        };
        initProducts();
    }, []);

    const refreshProducts = async () => {
        try {
            const products = await getProducts();
            setProducts(products);
            setDisplayedProducts(products.slice(0, COUNT_PER_PAGE));
            setCount(Math.ceil(products.length / COUNT_PER_PAGE));
            setPage(1);
        } catch (error) {
            showError(error.message);
        }
    };

    const deleteProductHandler = async (productId) => {
        try {
            await deleteProduct(productId);
            await refreshProducts();
            showSuccess('Successfully deleted the product!');
        } catch (error) {
            showError(error.message);
        }
    };

    const handlePageChange = async (ev, val) => {
        setPage(val);
    };

    useEffect(() => {
        const start = (page - 1) * COUNT_PER_PAGE;
        const end = start + COUNT_PER_PAGE;
        setDisplayedProducts(products.slice(start, end));
        // eslint-disable-next-line
    }, [page]);

    return (
        <div className='mt-5 mx-3'>
            <div className='d-flex justify-content-center'>
                <Pagination
                    count={count}
                    page={page}
                    onChange={handlePageChange}
                />
            </div>

            <TableContainer component={Paper}>
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell>#</TableCell>
                            <TableCell>Name</TableCell>
                            <TableCell>Seller</TableCell>
                            <TableCell>Description</TableCell>
                            <TableCell>Stock</TableCell>
                            <TableCell>Price</TableCell>
                            <TableCell>Operation</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {displayedProducts.map((product, idx) => (
                            <TableRow key={product._id}>
                                <TableCell>{idx + 1}</TableCell>
                                <TableCell>{product.productName}</TableCell>
                                <TableCell>{product.sellerName}</TableCell>
                                <TableCell>{product.description}</TableCell>
                                <TableCell>{product.stock}</TableCell>
                                <TableCell>{product.price}</TableCell>
                                <TableCell>
                                    <Button
                                        className='btn btn-block'
                                        variant='outline-danger'
                                        onClick={() =>
                                            deleteProductHandler(product._id)
                                        }
                                    >
                                        Delete
                                    </Button>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
        </div>
    );
}
