import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { getProduct } from '../../api/product';
import { Product } from '../../productTypes';
import Header from '../Header/Header';
import Footer from '../Footer/Footer';
import './style.css';

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
        <>
            <Header />
                <div className="product-detail d-flex flex-column justify-content-center align-items-center mt-5 mb-5">
                    <img 
                        src={product.image} 
                        alt={product.title}
                        className='product-image'     
                    />
                    <h1>{product.title}</h1>
                    <p className='product-description'>{product.description}</p>
                    <h2><strong>Price:</strong> ${product.price}</h2>
                    <h3><strong>Rating:</strong> {product.rating.rate}</h3>
                    <p><strong>Number of reviews:</strong> {product.rating.count}</p>
                    <div className="buttons-container">
                        <button className="btn btn-primary custom-btn" onClick={() => { /* functionality to add to cart */ }}>
                            Add to Cart
                        </button>
                        <button className="btn btn-secondary goto-cart-btn" onClick={() => { /* functionality to go to cart */ }}>
                            Go to Cart
                        </button>
                    </div>

                </div>
                
            <Footer />
        </>
    );
}

export default ProductDetail;
