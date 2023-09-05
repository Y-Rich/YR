import { styled } from 'styled-components';
import { Link } from 'react-router-dom';

export const Container = styled.main`
  /* background-color: #ffffff; */
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  height: 100vh;
  &::after {
    content: '';
    width: 30%;
    height: 65vh;
    background-color: #ffffff;
    opacity: 0.7;
    position: absolute;
    top: 20%;
    left: 35vw;
    z-index: -10;
    border-radius: 10px;
  }

  &.login {
    justify-content: center;
  }
  &.register {
    gap: 5vh;
    &::after {
      content: '';
      width: 30%;
      height: 75vh;
      background-color: #ffffff;
      opacity: 0.7;
      position: absolute;
      top: 15%;
      left: 35vw;
      z-index: -10;
      border-radius: 10px;
    }
  }
`;
export const Title = styled.div`
  color: #000000;
  font-size: 70px;
  &.register {
    margin-top: 10%;
  }
  &.login {
    padding-top: 4%;
  }
  &.modi {
    margin-top: 15%;
  }
`;
export const Box = styled.section`
  align-items: center;
  /* gap: 5vh; */
  &.login {
    display: flex;
    flex-direction: column;
    padding-top: 5vh;
    gap: 5vh;
  }
  &.register {
    display: flex;
    flex-direction: column;
    gap: 2vh;
  }
  &.small {
    display: flex;
    flex-direction: row;
    gap: 10px;
    font-size: 12px;
  }
  &.number {
    display: flex;
    flex-direction: row;
  }
  /* &.register {
    display: flex;
    flex-direction: column;
    gap: 3vh;
    padding-top: 4vh;
    align-items: center;
  } */
`;
export const Input = styled.input`
  background-color: #d9d9d9;
  color: #000000;
  border: none;
  text-decoration: none;
  width: 30vw;
  height: 5vh;
  border-radius: 5px;
  font-size: 1rem;
  padding-left: 10px;
  &.login {
    width: 20vw;
    height: 5vh;
  }
  &.register {
    width: 20vw;
  }
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
  width: 32vw;
  height: 5vh;
  cursor: pointer;
  font-weight: 600;
  &.submit {
    width: 10vw;
    height: 7vh;
    margin-top: 3vh;
  }
  &.check {
    width: 200px;
  }
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
    color: #c4c4c4;
    &:hover {
      color: #5498ff;
    }
  }
  &.usermodi {
    color: #000000;
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
