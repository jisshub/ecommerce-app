import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { getProduct } from '../../api/product';
import { Product } from '../../productTypes';

const ProductDetail: React.FC = () => {
    let { id = '0' } = useParams<{ id?: string }>();
    const [product, setProduct] = useState<Product | null>(null);

    useEffect(() => {
        const fetchProduct = async () => {
            try {
                const data = await getProduct(parseInt(id || '0'));
                setProduct(data);
            } catch (error) {
                console.error('Failed to fetch product details', error);
            }
        };

        fetchProduct();
    }, [id]);

    if (!product) {
        return <p>Loading...</p>;
    }

    return (
        <div className="product-detail d-flex flex-column justify-content-center align-items-center">
            <img src={product.image} alt={product.title} />
            <h1>{product.title}</h1>
            <p>{product.description}</p>
            <h2><strong>Price:</strong> ${product.price}</h2>
            <h3><strong>Rating:</strong> {product.rating.rate}</h3>
            <p><strong>Number of reviews:</strong> {product.rating.count}</p>
        </div>
    );
}

export default ProductDetail;
