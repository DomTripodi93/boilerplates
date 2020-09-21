import React from 'react';

import {
    FormSelectContainer,
    FormSelectLabel,
    FormSelector
} from './form-select.styles';

const FormSelect = ({ handleChange, label, options, ...props }) => {
    return (
        <FormSelectContainer className="input-width grid100" onChange={handleChange}>
            <FormSelector {...props}>
                {options.map(option => (
                    <option value={option.value} key={option.value}>{option.label}</option>
                ))}
            </FormSelector>
            {label ? (
                <FormSelectLabel className='shrink'>
                    {label}
                </FormSelectLabel>
            ) : null}
        </FormSelectContainer>
    )
};

export default FormSelect;
