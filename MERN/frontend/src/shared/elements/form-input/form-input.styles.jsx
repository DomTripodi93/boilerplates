import styled, { css } from 'styled-components';

const subColor = 'grey';
const mainColor = 'black';

const shrinkLabelStyles = css`
  top: -2px;
  font-size: 12px;
  color: ${mainColor};
`;

export const GroupContainer = styled.div`
  position: relative;
  margin: auto;

  input[type='password'] {
    letter-spacing: 0.3em;
  }

  &.input-width{
    width: 80%;
    margin: auto;
  }
`;

export const FormInputContainer = styled.input`
  background: none;
  background-color: white;
  color: ${mainColor};
  font-size: 16px;
  padding: 10px 10px 10px 10px;
  display: block;
  border: none;
  border-radius: 3px;
  border-bottom: 1px solid ${subColor};
  margin: 15px 0;
  overflow: hidden;

  &:focus {
    outline: none;
  }

  &:focus ~ label {
    ${shrinkLabelStyles}
  }
`;

FormInputContainer.displayName = 'FormInputContainer';

export const FormInputLabel = styled.label`
  color: ${subColor};
  font-size: 14px;
  font-weight: normal;
  position: absolute;
  pointer-events: none;
  left: 7px;
  top: 27px;
  transition: 300ms ease all;

  &.shrink {
    ${shrinkLabelStyles}
  }
`;

FormInputLabel.displayName = 'FormInputLabel';
