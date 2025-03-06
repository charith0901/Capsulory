import React from 'react';
import PropTypes from 'prop-types';

const Button = ({ onClick, children, className, disabled }) => {
    return (
        <button 
            onClick={onClick} 
            className={`button ${className}`} 
            disabled={disabled}
        >
            {children}
        </button>
    );
};

Button.propTypes = {
    onClick: PropTypes.func.isRequired,
    children: PropTypes.node.isRequired,
    className: PropTypes.string,
    disabled: PropTypes.bool,
};

Button.defaultProps = {
    className: '',
    disabled: false,
};

export default Button;