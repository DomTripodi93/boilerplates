import React from 'react';

import {
    CustomizedButton,
    ButtonText
} from './custom-button.styles';

const CustomButton = ({ label, buttonStyle, action }) => (
    <CustomizedButton onClick={action} className={buttonStyle}>
        <ButtonText className={buttonStyle}>{label}</ButtonText>
    </CustomizedButton>
);

export default CustomButton;
