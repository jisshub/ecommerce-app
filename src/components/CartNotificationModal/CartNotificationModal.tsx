import React from 'react';
import { useNavigate } from 'react-router-dom';

interface CartNotificationModalProps {
    show: boolean;
    onClose: () => void;
    onViewCart: () => void;
    onContinueShopping: () => void;
}

const CartNotificationModal: React.FC<CartNotificationModalProps> = ({ show, onViewCart, onContinueShopping }) => {

    const navigate = useNavigate();

    if (!show) return null;

    const handleContinueShopping = () => {
        navigate('/');
    };
    return (
        <div className="modal show" style={{ display: 'block' }}>
            <div className="modal-dialog modal-dialog-centered">
                <div className="modal-content">
                    <div className="modal-body">
                        Product added to cart successfully!
                    </div>
                    <div className="modal-footer">
                        <button type="button" className="btn btn-secondary" onClick={handleContinueShopping}>
                            Continue Shopping
                        </button>
                        <button type="button" className="btn btn-primary" onClick={onViewCart}>
                            View Cart
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CartNotificationModal;
