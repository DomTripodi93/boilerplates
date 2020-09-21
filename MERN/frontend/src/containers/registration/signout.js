import React from 'react';
import CustomButton from '../../shared/elements/button/custom-button.component';
import { signOutUser } from '../../reducers/user/user.actions';
import { connect } from 'react-redux';

import './registration.styles.scss';


const Signout = props => {
    const handleCancel = () => {
        props.history.push('/');
    };

    const handleConfirm = () => {
        props.signOutUser(handleCancel);
    };

    return (
        <div className='border'>
            <h1 className='centered spaced'>Are you sure you want to log out?</h1>
            <div className='grid50 spaced'>
                <div className='middle'>
                    <CustomButton action={handleConfirm} buttonStyle='green round' label="Yes" />
                </div>
                <div className='middle'>
                    <CustomButton action={handleCancel} buttonStyle='red round' label="No" />
                </div>
            </div>
        </div>
    );
}

const mapDispatchToProps = dispatch => {
    return {
        signOutUser: (callback) => dispatch(signOutUser(callback))
    };
}

export default connect(null, mapDispatchToProps)(Signout);