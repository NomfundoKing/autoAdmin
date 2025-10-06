import styled from 'styled-components';

const Button = styled.button`
  padding: 12px;
  background: linear-gradient(red, black);
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-size: 16px;
  margin-top: 10px;

  &:hover {
    background: #141414;
  }
`;

export default Button;
