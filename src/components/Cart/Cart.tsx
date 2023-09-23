import React from 'react';
import { CartContext } from '../../contexts/cartContext';
import { CartItem } from '../../contexts/cartContext';
import './style.css';
import Header from '../Header/Header';
import Footer from '../Footer/Footer';
import { RiDeleteBin5Fill } from 'react-icons/ri';


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
