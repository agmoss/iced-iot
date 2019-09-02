import React from 'react';

const Header = (props) => {
    const {branding} = props;
    return (
        <nav className ="navbar mb-3 pt-3 pb-3 py-0  text-sm-center text-md-left">
            <div className="container">
                <a href="/" className="navbar-brand">{branding}</a>
            </div>
        </nav>
    );
}

Header.defaultProps = {
    branding: 'IoT Dashboard'

};

export default Header; 