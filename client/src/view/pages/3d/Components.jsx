import React, { useEffect, useRef, useState } from 'react';
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
  /* &::-webkit-scrollbar {
    display: none;
  } */

  &::-webkit-scrollbar {
    width: 4px;
  }
  &::-webkit-scrollbar-thumb {
    /* border-radius: 2px; */
    background: #ccc;
  }
  &.log {
    width: 18vw;
    height: 15vh;
    bottom: 0;
    padding: 0.7em;
  }
  &.order {
    width: 18vw;
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
  letter-spacing: -0.05rem;
  line-height: 0.8rem;
  font-family: 'Hack';
  // font-size: 0.7rem;
  padding-bottom: 2px;
`;

const Btn = styled.button`
  /* border: none; */
  /* margin-right: 0.5vw; */
`;

export const Log = (props) => {
  const { logEdukit1, logEdukit2, webSocket } = props.props;
  const { page } = props;
  const [data, setData] = useState([]);
  const scrollRef = useRef(null);

  // scrollRef.current.scrollTop = scrollRef.current.scrollHeight;

  useEffect(() => {
    if (page === 1 && webSocket) {
      const formattedData = logEdukit1.map((item) => {
        const date = new Date(item.createdAt);
        const formattedDate = `[${date.getFullYear()}-${
          date.getMonth() + 1
        }-${date.getDate()} ${date.getHours()}:${date.getMinutes()}:${date.getSeconds()}]`;
        return {
          ...item,
          createdAt: formattedDate, // createdAt 필드를 형식화된 문자열로 대체
        };
      });
      setData([...formattedData]);

      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
      // console.log('here', formattedData);
    }
  }, [logEdukit1]);

  useEffect(() => {
    if (page === 2 && webSocket) {
      const formattedData = logEdukit2.map((item) => {
        const date = new Date(item.createdAt);
        const formattedDate = `[${date.getFullYear()}-${
          date.getMonth() + 1
        }-${date.getDate()} ${date.getHours()}:${date.getMinutes()}:${date.getSeconds()}]`;
        return {
          ...item,
          createdAt: formattedDate, // createdAt 필드를 형식화된 문자열로 대체
        };
      });
      setData([...formattedData]);

      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
      // console.log('here', formattedData);
    }
  }, [logEdukit2]);

  return (
    <Container className="log" ref={scrollRef}>
      {/* <Box className="log">최상단입니다...</Box> */}
      {data.map((item, index) => (
        <Box key={index}>
          {item.createdAt}
          {item.message}
        </Box>
      ))}
      {/* <Box>최하단입니다...</Box> */}
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
      시나리오 선택 :
      <DropDown>
        <ul>
          <li>하이~!</li>
          <li>오하요</li>
          <li>반가워`!</li>
          <li>짜이찌엔</li>
        </ul>
      </DropDown>
    </Container>
  );
};

export const DropDown = (props) => {
  const [open, setOpen] = useState(false);
  return (
    <li>
      <a href="#" className="icon-button" onClick={() => setOpen(!open)}>
        {props.icon}오잉
      </a>
      {open && props.children}
    </li>
  );
};
