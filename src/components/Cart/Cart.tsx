import React from 'react';
import { Product } from '../../productTypes';
import { CartContext } from '../../contexts/cartContext';
import './style.css';
import Header from '../Header/Header';
import Footer from '../Footer/Footer';
import { RiDeleteBin5Fill } from 'react-icons/ri';


// Remove the carts prop from here
type CartProps = {};

const Cart: React.FC<CartProps> = () => {
    // Set a fallback value for the context
    const context = React.useContext(CartContext);
    
    if (!context) {
        throw new Error("Cart component must be used within CartContext.Provider");
    }

    const { carts, setCarts  } = context;

    const handleDelete = (productId: number) => {
        const updatedCarts = carts.filter(product => product.id !== productId);
        setCarts(updatedCarts);
    };

    return (
    <div className='carts-wrapper'>
        <Header />
        <div className="cart-container mt-5 mb-5">
            {
                carts.length === 0 ? (
                    <div className="empty-cart">
                        <h2>Your Shopping Cart is empty</h2>
                    </div>
                ) : (
                    <div>
                        <h2 className="mb-4">Shopping Cart</h2>
                        {carts.map((product: Product) => (
                            <div key={product.id} className="cart-box d-flex justify-content-between align-items-center">
                                <div>
                                    <h5>{product.title}</h5>
                                    <p className="mb-0">Price: ${product.price}</p>
                                </div>
                                <div>
                                    <RiDeleteBin5Fill 
                                        onClick={() => handleDelete(product.id)} className="delete-icon" 
                                    />
                                </div>
                            </div>
                        ))}
                    </div>
                )
            }
        </div>
        <Footer />
    </div>

    );
}

export default Cart;

