import React from 'react';
import ReactDOM from 'react-dom';
import Snackbar from '../components/shared/Snackbar';

function showSnackbar(message: string, type: 'success' | 'error' = 'success') {
    const div = document.createElement('div');
    document.body.appendChild(div);

    const onHidden = () => {
        ReactDOM.unmountComponentAtNode(div);
        div.remove();
    };

    ReactDOM.render(<Snackbar message={message} type={type} onHidden={onHidden} />, div);
}

export default showSnackbar;
