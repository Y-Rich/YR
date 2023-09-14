import { styled } from 'styled-components';
import { Link } from 'react-router-dom';

export const Page = styled.main`
  color: #000000;
  font-size: 100px;
  width: 100%;
  height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  &.admin {
    background-color: #d9d9d9;
    align-items: baseline;
  }
  &::after {
    content: '';
    background: url('assets/back.jpg');
    background-size: cover;
    opacity: 0.5;
    position: absolute;
    top: 0px;
    left: 0px;
    right: 0px;
    bottom: 0px;
    z-index: -10;
  }
`;
export const Container = styled.section`
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
    margin-top: 45vh;
  }
  &.register {
    margin-top: 35vh;
    gap: 4vh;
    &::after {
      top: 15%;
      width: 30%;
      height: 75vh;
    }
  }
  &.modi {
    margin-top: 45vh;
    gap: 2vh;
    &::after {
      top: 15%;
      width: 30%;
      height: 75vh;
    }
  }
`;
export const Title = styled.div`
  color: #000000;
  font-size: 70px;
  &.register {
    font-size: 50px;
  }
  &.login {
  }
  &.modi {
    font-size: 50px;
  }
  &.label {
    /* margin-top: 20%; */
    font-size: 4vh;
    align-items: center;
  }
`;
export const Box = styled.article`
  align-items: center;
  display: flex;
  flex-direction: column;
  &.login {
    padding-top: 5vh;
    gap: 5vh;
  }
  &.register {
    gap: 2vh;
    &.phone {
      gap: 0;
      flex-direction: row;
    }
  }
  &.small {
    flex-direction: row;
    gap: 10px;
    font-size: 12px;
  }
  &.modi {
    gap: 2vh;
  }
  &.find {
    gap: 3vh;
    padding-top: 4vh;
    align-items: center;
  }
  &.chart {
    gap: 5vh;
    /* align-items: flex-start; */
    &.title {
      margin-left: 7%;
    }
    &.graph {
      flex-direction: row;
    }
  }
`;
export const Input = styled.input`
  background-color: #d9d9d9;
  color: #000000;
  border: none;
  text-decoration: none;
  width: 30vw;
  height: 5vh;
  border-radius: 5px;
  padding-left: 10px;
  &.login {
    width: 20vw;
    height: 5vh;
  }
  &.register {
    width: 20vw;
    &.phone {
      width: 15vw;
      border-radius: 5px 0 0 5px;
    }
  }
  &:focus {
    outline: none;
    box-shadow: none;
  }
  &::-webkit-input-placeholder {
    /* text-align: center; */
  }
  &.modi {
    width: 20vw;
    height: 5vh;
  }
  &.gui {
    width: 5vw;
    height: 3vh;
    margin-right: 0.5vw;
  }
  &.gui_a {
    width: 1.7vw;
    height: 3vh;
    margin-right: 0.5vw;
    background-color: #acacac;
  }
  &.gui_b {
    width: 2.8vw;
    height: 3vh;
    margin-right: 0.5vw;
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
    &.register {
      margin-top: 0vh;
    }
  }
  &.check {
    font-size: 0.8rem;
    width: 5vw;
    border-radius: 0 5px 5px 0;
  }
  &:hover {
    background-color: #4379cc;
  }
  &.gui {
    font-size: 0.8rem;
    color: #999;
    width: 5vw;
    background-color: #d9d9d9;
    border: 2mm outset rgba(133, 133, 117, 0.6);
    &.reset {
      &:active {
        background-color: rgb(255, 1, 1);
        border: 2mm ridge rgba(141, 0, 0, 0.6);
      }
    }
    &:active {
      background-color: rgb(0, 200, 102);
      border: 2mm ridge rgba(0, 133, 117, 0.6);
    }
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
    background-color: #5498ff;
    padding: 15px;
    font-size: 1.5rem;
    border-radius: 5px;
    box-shadow: 0px 0px 5px rgba(0, 0, 0, 0.5);
  }
  &.smallbox {
    font-weight: normal;
  }
`;
