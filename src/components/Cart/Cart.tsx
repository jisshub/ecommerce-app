import React from 'react';
import { CartContext } from '../../contexts/cartContext';
import { CartItem } from '../../contexts/cartContext';
import './style.css';
import Header from '../Header/Header';
import Footer from '../Footer/Footer';
import { RiDeleteBin5Fill, RiAddLine, RiSubtractLine } from 'react-icons/ri';


type CartProps = {};

const Cart: React.FC<CartProps> = () => {
    const context = React.useContext(CartContext);
    
    if (!context) {
        throw new Error("Cart component must be used within CartContext.Provider");
    }

    const { carts, setCarts  } = context;

    const handleDelete = (productId: number) => {
        const updatedCarts = carts.filter(cartItem => cartItem.product.id !== productId);
        setCarts(updatedCarts);
    };
    const handleDeleteAll = () => {
        setCarts([]);
    };

    const handleIncrement = (productId: number) => {
        const updatedCarts = carts.map(cartItem => 
            cartItem.product.id === productId 
            ? { ...cartItem, quantity: cartItem.quantity + 1 } 
            : cartItem
        );
        setCarts(updatedCarts);
    };
    
    const handleDecrement = (productId: number) => {
        const updatedCarts = carts.map(cartItem =>
            cartItem.product.id === productId && cartItem.quantity > 1
            ? { ...cartItem, quantity: cartItem.quantity - 1 }
            : cartItem
        ).filter(cartItem => cartItem.quantity > 0);
        setCarts(updatedCarts);
    };

    const totalPrice = carts.reduce((total, cartItem) => total + cartItem.product.price * cartItem.quantity, 0);
    
    return (
        <div className='carts-wrapper'>
            <Header />
            <div className="cart-container mt-5 mb-5">
                {carts.length === 0 ? (
                    <div className="empty-cart">
                        <h2>Your shopping cart is empty</h2>
                    </div>
                ) : (
                    <>
                        <h2 className="mb-4">Shopping Cart ({carts.length})</h2>
                        {carts.map((cartItem: CartItem) => (
                            <div key={cartItem.product.id} className="cart-box d-flex justify-content-between align-items-center">
                            <div>
                              <h5>{cartItem.product.title}</h5>
                              <div className="d-flex price-quantity">
                                <p className="mb-0">
                                    Price: ${cartItem.product.price}
                                </p>
                                <p>
                                    Quantity: {cartItem.quantity}
                                </p>
                                <div>
                                    <RiAddLine onClick={() => handleIncrement(cartItem.product.id)} className="increment-icon" />
                                    <RiSubtractLine onClick={() => handleDecrement(cartItem.product.id)} className="decrement-icon" />
                                </div>
                                </div>
                            </div>
                            <div>
                              <RiDeleteBin5Fill 
                                onClick={() => handleDelete(cartItem.product.id)} className="delete-icon" 
                              />
                            </div>
                          </div>
                        ))}

                        <div className="mt-3">
                            <button className="btn btn-danger" onClick={handleDeleteAll}>
                                Clear Cart
                            </button>
                        </div>
                        <p 
                            className="total-price">
                            Total: ${totalPrice.toFixed(2)}
                        </p>
                    </>
                )}
            </div>
            <Footer />
        </div>
    );
    
}

export default Cart;
