import styled from 'styled-components';

export const Button = styled.button`
  position: relative;
  padding: 15px;
  font-size: 32px;
  font-weight: bold;
  border-radius: .5rem;
  text-align: center;
  border: none;
  transition: .1s linear;
  
  &:active {
    transform: translate(0px,5px);
    border-bottom: 1px solid;
  }
`
