import React from 'react';

import {
    GroupContainer,
    FormInputContainer,
    FormInputLabel
} from './form-input.styles';

const FormInput = ({ handleChange, label, ...props }) => (
    <GroupContainer className="input-width grid100">
        <FormInputContainer onChange={handleChange} {...props} />
        {label ? (
            <FormInputLabel className={props.value ? 'shrink' : ''}>
                {label}
            </FormInputLabel>
        ) : null}
    </GroupContainer>
);

export default FormInput;
