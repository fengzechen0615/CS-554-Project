import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import {
    Card,
    CardActionArea,
    CardContent,
    CardMedia,
    Typography,
} from '@material-ui/core';
import './product.css';
import { useHistory } from 'react-router-dom';

const useStyles = makeStyles({
    root: {
        width: 250,
        margin: '12px',
    },
    media: {
        height: 240,
    },
    price: {
        color: '#dc3900',
        fontSize: '22px',
    },
    description: {
        height: '50px',
        width: '230px',
        overflow: 'hidden',
        color: '#404040',
        textOverflow: 'ellipsis',
    },
    seller: {
        color: '#767676',
    },
    stock: {
        color: '#767676',
        fontSize: '14px',
    },
});

export default function Product(props) {
    const classes = useStyles();
    const history = useHistory();
    return (
        <Card className={classes.root}>
            <CardActionArea
                onClick={() => history.push(`/product/${props.productId}`)}
            >
                <CardMedia
                    className={classes.media}
                    image={props.imageUrl}
                    title='product-image'
                />
                <CardContent>
                    <div className='d-flex justify-content-between align-items-center'>
                        <Typography
                            variant='body2'
                            component='p'
                            className={classes.price}
                        >
                            ${props.price}
                        </Typography>
                        <Typography
                            variant='body1'
                            component='p'
                            className={classes.stock}
                        >
                            {props.stock} in stock
                        </Typography>
                    </div>

                    <div className={classes.description}>{props.title}</div>
                    <div className='d-flex justify-content-between'>
                        <Typography
                            variant='body1'
                            component='p'
                            className={classes.seller}
                        >
                            {props.seller}
                        </Typography>
                        <Typography
                            variant='body1'
                            component='p'
                            className={classes.seller}
                        >
                            {props.date.split('T')[0]}
                        </Typography>
                    </div>
                </CardContent>
            </CardActionArea>
        </Card>
    );
}
