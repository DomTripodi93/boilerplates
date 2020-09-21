import styled, { css } from 'styled-components';

const subColor = 'grey';
const mainColor = 'black';

const shrinkLabelStyles = css`
  top: -2px;
  font-size: 12px;
  color: ${mainColor};
`;

export const FormSelectContainer = styled.div`
  position: relative;
  margin: auto;

  &.input-width{
    width: 80%;
    margin: auto;
  }
`

FormSelectContainer.displayName = 'FormSelectContainer'


export const FormSelector = styled.select`
  border-radius: 3px;
  width: 100%;
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
  z-index: 0;

  option {
    color: black;
    background: white;
    display: flex;
    white-space: pre;
    min-height: 20px;
    padding: 0px 2px 1px;
    z-index: 5;
  }

  &:focus {
    outline: none;
  }
`;

FormSelector.displayName = 'FormSelector';


export const FormSelectLabel = styled.label`
  color: ${subColor};
  font-size: 14px;
  font-weight: normal;
  position: absolute;
  pointer-events: none;
  left: 7px;
  transition: 300ms ease all;

  &.shrink {
    ${shrinkLabelStyles}
  }
`;

FormSelectLabel.displayName = 'FormSelectLabel';