import React from 'react';
import { Link } from 'react-router-dom';

const Home = () => {
    return (
        <div className="border centered">
            <h2 className="spaced">Welcome to TimeAndInvoicing V 0.1.0</h2>
            <h4 className="spaced">
                To get started <Link to="/register">sign up</Link> for a new account
            </h4>
            <h4 className="spaced">
                If you already have an account, you can <Link to='/signin'>log in</Link>
            </h4>
        </div>
    );
};

export default Home;