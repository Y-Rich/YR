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
    background-color: #f6f8f7;
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
    height: 70vh;
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
    &::after {
      height: 60%;
    }
  }
  &.password {
    margin-top: 40vh;
    &::after {
      height: 65%;
    }
  }
  &.register {
    margin-top: 35vh;
    gap: 4vh;
    &::after {
      top: 15%;
      width: 30%;
      // height: 75vh;
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
  &.modi {
    font-size: 50px;
  }
  &.label {
    font-size: 2vh;
    align-items: center;
    color: white;
  }
  &.mount {
    font-size: 6vh;
    color: white;
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
    &.check {
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
  &.password {
    gap: 3vh;
    padding-top: 4vh;
    align-items: center;
    &.check {
      padding-top: 0;
      gap: 0;
      flex-direction: row;
    }
  }
  &.chart {
    display: flex;
    &.big {
      min-width: 11vw;
      height: 12vh;
      font-size: 2.5rem;
      display: flex;
      flex-direction: row;
      border-radius: 5px;
      padding: 8px;
      gap: 3vh;
      background-color: white;
      box-shadow: 0 0 3px 0 rgba(0, 0, 0, 0.5);
      color: white;
    }
    &.tiny {
      flex-direction: column;
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
    &.check {
      width: 15vw;
      border-radius: 5px 0 0 5px;
    }
  }
  &.password {
    width: 20vw;
    height: 5vh;
    &.check {
      width: 15vw;
      border-radius: 5px 0 0 5px;
    }
  }
  &:focus {
    outline: none;
    box-shadow: none;
    transition: all 0.2s linear;
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
    &:focus {
      background-color: #dde998;
    }
  }
  &.gui_b_ms {
    width: 2.7vw;
    height: 3vh;
    margin-right: 0.5vw;
    &:focus {
      background-color: #dde998;
    }
  }
  &.gui_a_dicenum {
    width: 1.5vw;
    height: 3vh;
    margin-right: 0.5vw;
    background-color: #acacac;
  }
  &.gui_b_dicenum {
    width: 1.5vw;
    height: 3vh;
    margin-right: 0.5vw;
    &:focus {
      background-color: #dde998;
    }
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
    transition: all 0.2s linear;
  }
  &.gui {
    font-size: 0.8rem;
    color: #999;
    width: 5vw;
    background-color: #d9d9d9;
    border: 2mm outset rgba(133, 133, 117, 0.6);
    &:active {
      background-color: rgb(0, 200, 102);
      border: 2mm ridge rgba(0, 133, 117, 0.6);
    }
    &.reset {
      &:active {
        background-color: rgb(255, 1, 1);
        border: 2mm ridge rgba(141, 0, 0, 0.6);
      }
    }
    &.emergency {
      background-color: rgb(255, 1, 1);
      color: #eee;
      &:active {
        background-color: rgb(255, 50, 50);
        border: 2mm ridge rgba(141, 0, 0, 0.6);
      }
    }
  }
`;

export const LinkText = styled(Link)`
  padding: 20px;
  color: #000000;
  text-decoration: none;
  font-weight: 800;
  &:hover {
    color: #22598f;
    transform: scale(1.2);
    transition: all 0.2s linear;
  }
  &:focus {
    color: #000000;
    transition: all 0.2s linear;
  }
  &.logo {
    font-size: 20px;
    font-family: 'CWDangamAsac-Bold';
    // font-family: 'Nanum Myeongjo';
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

export const Progress = styled.div`
  width: 10vw;
  height: 2.5vh;
  background-color: #d7d7d7;
  border-radius: 10px;
  &.pannel {
    &.top {
      width: 25vw;
    }
    &.bottom {
      width: 20vw;
    }
  }
`;

export const ProgressBar = styled.div`
  height: 100%;
  background-color: #3d5a7f;
  border-radius: 10px;
  transition: width 0.3s ease-in-out;
`;

export const Slide = styled.main`
  height: 100vh;
  background-color: #f6f8f7;
  .slick-dots {
    .slick-active {
      button::before {
        color: #293242;
        z-index: 999;
        transition: all 0.2s linear;
      }
    }
    button::before {
      color: #3d5a7f;
      z-index: 999;
      transition: all 0.2s linear;
    }
  }
`;

export const DotsContainer = styled.div`
  border-radius: 10px;
  padding: 10px;
`;
export const Dots = styled.div`
  width: 20px;
  color: #293242;
  border: 2px #293242 solid;
  border-radius: 10px;
  &:hover {
    color: #3d5a7f;
    border: 2px #3d5a7f solid;
    transition: all 0.2s linear;
  }
  &:focus {
    color: gray;
    border: 1px gray solid;
  }
`;
