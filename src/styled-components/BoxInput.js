import styled from 'styled-components';

export const BoxInput = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  text-align: center;
  font-size: 0.875rem;
  border-radius: 1rem;
  padding: 0 0.25rem;
  
  input[type="radio"] {
    margin: 0.5rem 0.25rem;
    width: 1rem;
    height: 1rem;
  }
  
  input[type='radio']:checked:after {
    width: 1rem;
    height: 1rem;
    border-radius: .5rem;
    position: relative;
    background-color: ${props => props.theme.input};
    content: '';
    display: inline-block;
    visibility: visible;
  }
`
