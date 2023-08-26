import React, { useState, useEffect } from 'react';
import './style.css'

type SnackbarProps = {
    message: string;
    type: 'success' | 'error';
    onHidden?: () => void;
};

const Snackbar = ({ message, type, onHidden }: SnackbarProps) => {
    const [visible, setVisible] = useState(true);

    useEffect(() => {
        const timeout = setTimeout(() => {
            setVisible(false);
            onHidden && onHidden();
        }, 3000);

        return () => clearTimeout(timeout);
    }, [onHidden]);

    if (!visible) return null;

    return (
        <div className="toast" role="alert" aria-live="assertive" aria-atomic="true">
            <div className="toast-header">
                <strong className="mr-auto">{type === 'success' ? 'Success' : 'Error'}</strong>
                <button type="button" className="ml-2 mb-1 close" onClick={() => setVisible(false)} aria-label="Close">
                    <span aria-hidden="true">&times;</span>
                </button>
            </div>
            <div className="toast-body">
                {message}
            </div>
        </div>
    );
};

export default Snackbar;
