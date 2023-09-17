import React from 'react';
import axios from 'axios';
import styled from 'styled-components';
import { AiFillNotification } from 'react-icons/ai';

const Container = styled.nav`
  position: absolute;
  background-color: black;
  border: 2px solid green;
  color: white;
  white-space: normal;
  text-overflow: clip;
  overflow-x: hidden;
  overflow-y: scroll;
  &::-webkit-scrollbar {
    display: none;
  }
  &.log {
    width: 18vw;
    height: 15vh;
    bottom: 0;
    padding: 0.7em;
  }
  &.order {
    width: 25vw;
    /* height: 1vh; */
    top: 7%;
    padding: 0.5em;
  }
  &.btn {
    width: 18.45vw;
    padding: 0.5em;
    bottom: 18.5vh;
    display: flex;
    justify-content: space-between;
    align-items: center;
    cursor: pointer;
  }
`;
const Box = styled.div`
  font-size: 12px;
  // font-size: 0.7rem;
  padding-bottom: 2px;
`;

const Btn = styled.button`
  /* border: none; */
  /* margin-right: 0.5vw; */
`;

export const Log = () => {
  return (
    <Container className="log">
      <Box className="log">최상단입니다...</Box>
      <Box>[제 1공장]: 정다슬 - 1호기 제어</Box>
      <Box>[제 1공장]: 정다슬 - 1호기 제어</Box>
      <Box>[제 1공장]: 정다슬 - 1호기 제어</Box>
      <Box>[제 1공장]: 정다슬 - 1호기 제어</Box>
      <Box>[제 1공장]: 정다슬 - 1호기 제어</Box>
      <Box>[제 1공장]: 정다슬 - 1호기 제어</Box>
      <Box>[제 1공장]: 정다슬 - 1호기 제어</Box>
      <Box>[제 1공장]: 정다슬 - 1호기 제어</Box>
      <Box>[제 1공장]: 정다슬 - 1호기 제어</Box>
      <Box>[제 1공장]: 정다슬 - 1호기 제어</Box>
      <Box>최하단입니다...</Box>
    </Container>
  );
};
export const Order = () => {
  return (
    <Container className="order">
      <Box className="log">
        <AiFillNotification style={{ marginRight: '10px' }} />
        [제 1공장]: 정다슬 - 1호기 제어
      </Box>
    </Container>
  );
};

export const OrderBtn = () => {
  return (
    <Container className="btn">
      <Btn>이게</Btn>
      <Btn>무슨</Btn>
      <Btn>버튼</Btn>
      <Btn>이였지</Btn>
    </Container>
  );
};
