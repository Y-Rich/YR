import { styled } from 'styled-components';
import { Link } from 'react-router-dom';

export const Title = styled.div`
  color: #000000;
  font-size: 80px;
`;

export const Input = styled.input`
  background-color: #d9d9d9;
  color: #000000;
  border: none;
  text-decoration: none;
  width: 35vw;
  height: 8vh;
  border-radius: 5px;
  font-size: 1rem;
  padding-left: 10px;
  &:focus {
    outline: none;
    box-shadow: none;
  }
  &::-webkit-input-placeholder {
    /* text-align: center; */
  }
`;

export const Button = styled.button`
  background-color: #5498ff;
  color: #ffffff;
  font-size: 20px;
  text-align: center;
  border: none;
  border-radius: 5px;
  width: 40vw;
  height: 8vh;
  cursor: pointer;
  font-weight: 600;
  &:hover {
    background-color: #4379cc;
  }
`;

export const LinkText = styled(Link)`
  padding: 20px;
  color: #000000;
  text-decoration: none;
  font-weight: 800;
  &:hover {
    color: #5498ff;
  }
  &:focus {
    color: #5498ff;
  }
  &.logo {
    font-size: 20px;
    font-family: 'CWDangamAsac-Bold';
    &:focus {
      color: #000000;
    }
  }
  &.edukit {
    color: #d9d9d9;
    &:hover {
      color: #5498ff;
    }
  }
  &.usermodi {
    color: #ffffff;
    &:hover {
      color: #5498ff;
    }
  }
  &.selector {
    padding: 10px;
  }
  &.smallbox {
    font-weight: normal;
  }
`;
