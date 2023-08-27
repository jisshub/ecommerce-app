/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { useState, useEffect, useContext } from 'react';
import { useParams } from 'react-router-dom';
import { getProduct } from '../../api/product';
import { Product } from '../../productTypes';
import Header from '../Header/Header';
import Footer from '../Footer/Footer';
import CartNotificationModal from '../CartNotificationModal/CartNotificationModal';
import { CartContext } from '../../contexts/cartContext';
import './style.css';

const ProductDetail: React.FC = () => {
    let { id = '0' } = useParams<{ id?: string }>();
    const [product, setProduct] = useState<Product | null>(null);
    const [showCartNotificationModal, setShowCartNotificationModal] = useState(false);
    const context = React.useContext(CartContext);

    if (!context) {
        throw new Error("CartContext must be used within a CartContext.Provider");
    }

    const { carts, setCarts } = context;

    function handleContinueShopping() {
        setShowCartNotificationModal(false);
    }
    
    function handleViewCart() {
        setShowCartNotificationModal(false);
    }

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

 
    function addToCart(product: Product) {
        try {
            setCarts(prevCarts => [...prevCarts, product]);
            setShowCartNotificationModal(true);
        } catch (error) {
            console.error('Failed to add product to cart', error);
        }
    }

    useEffect(() => {
        console.log('carts', carts);
    }, [carts]);

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
                        <button className="btn btn-primary custom-btn" onClick={() => addToCart(product)}>
                            Add to Cart
                        </button>
                    </div>

                </div>
                <CartNotificationModal 
                    show={showCartNotificationModal}
                    onClose={() => setShowCartNotificationModal(false)}
                    onContinueShopping={handleContinueShopping}
                    onViewCart={handleViewCart}
                />
            <Footer />
        </>
    );
}

export default ProductDetail;
