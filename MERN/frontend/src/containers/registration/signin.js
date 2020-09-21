import React, { useState } from 'react';
import { connect } from 'react-redux';

import { signInUser, checkUser } from '../../reducers/user/user.actions';

import FormInput from '../../shared/elements/form-input/form-input.component';
import CustomButton from '../../shared/elements/button/custom-button.component';

import './registration.styles.scss';


const Signin = props => {
    const [userCredentials, setUserCredentials] = useState({
        email: '',
        password: ''
    });

    const { email, password } = userCredentials;

    const handleSubmit = async event => {
        event.preventDefault();

        props.signInUser(userCredentials, () => { 
            let token = localStorage.getItem('token');
            let userId = localStorage.getItem('id');
            props.checkUser(userId, token);
            props.history.push('/') 
        });
    };

    const handleChange = event => {
        const { name, value } = event.target;

        setUserCredentials({ ...userCredentials, [name]: value });
    };

    return (
        <div className='size-holder middle'>
            <h3 className='centered'>
                Fill out the form below to register your Scheduling
                and Direction account!
            </h3>
            <br />
            <form onSubmit={handleSubmit}>
                <FormInput
                    label='Email'
                    type='email'
                    name='email'
                    value={email}
                    onChange={handleChange}
                    required
                />
                <FormInput
                    label='Password'
                    type='password'
                    name='password'
                    value={password}
                    onChange={handleChange}
                    required
                />
                <div className="input-width">
                    <CustomButton
                        buttonStyle="blue round form-button"
                        type="submit"
                        label="Sign In"
                    />
                </div>
            </form>
        </div>
    );
};

const mapDispatchToProps = dispatch => ({
    signInUser: (userCredentials, callback) => {
        dispatch(signInUser(userCredentials, callback))
    },
    checkUser: (userId, token) => dispatch(checkUser(userId, token)),
});

export default connect(null, mapDispatchToProps)(Signin);