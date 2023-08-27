import React from 'react';
import { Product } from '../../productTypes';
import { CartContext } from '../../contexts/cartContext';
import './style.css';
import Header from '../Header/Header';
import Footer from '../Footer/Footer';

// Remove the carts prop from here
type CartProps = {};

const Cart: React.FC<CartProps> = () => {
    // Set a fallback value for the context
    const context = React.useContext(CartContext);
    
    if (!context) {
        throw new Error("Cart component must be used within CartContext.Provider");
    }

    const { carts } = context;

    return (
        <div className='carts-wrapper'>
            <Header />
            <div className="cart-container mt-5 mb-5">
                {carts.map((product: Product) => (
                    <div key={product.id} className="cart-box">
                        <h2>{product.title}</h2>
                        <p>Price: ${product.price}</p>
                    </div>
                ))}
            </div>
            <Footer />
        </div>
    );
}

export default Cart;
