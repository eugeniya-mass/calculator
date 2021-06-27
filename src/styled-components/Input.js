import styled from 'styled-components';

export const Input = styled.input.attrs({
    type: 'radio'
})`

  &:not(:checked):after {
    position: absolute;
    content: '';
    width: 1rem;
    height: 1rem;
    background-color: ${props => props.theme.switcher || '#d03f2f'};
  }
  
  input[type='radio']:checked:after {
    width: 1rem;
    height: 1rem;
    border-radius: .5rem;
    position: relative;
    background-color: ${props => props.inputColor || '#d03f2f'};
    content: '';
    display: inline-block;
    visibility: visible;
  }
`
