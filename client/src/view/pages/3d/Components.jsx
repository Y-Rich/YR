import React, { useEffect, useRef, useState } from 'react';
import axios from 'axios';
import styled, { keyframes } from 'styled-components';
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
const hoverAction = keyframes`
  0% { color: yellow; }
  10% { color: white; }
  20% { color: yellow; }
  100% { color: white; }
`;
const Box = styled.div`
  font-size: 12px;
  letter-spacing: -0.05rem;
  line-height: 0.8rem;
  font-family: 'Hack';
  // font-size: 0.7rem;
  padding-bottom: 2px;
  &.scenario {
    animation: ${hoverAction} 1s ease;
  }
`;

const Btn = styled.button`
  /* border: none; */
  /* margin-right: 0.5vw; */
`;

export const Log = (props) => {
  const { logEdukit1, logEdukit2, webSocket, scenario } = props.props;
  const { page } = props;
  const [data, setData] = useState([]);
  const [date, setDate] = useState([]);

  const getToday = () => {
    const today = new Date();
    const year = today.getFullYear(); // 현재 연도
    const month = String(today.getMonth() + 1).padStart(2, '0'); // 현재 월 (0부터 시작하므로 +1)
    const day = String(today.getDate()).padStart(2, '0'); // 현재 날짜

    // const dateString = `${year}-${month}-${day}`;

    const hours = String(today.getHours()).padStart(2, '0'); // 현재 시간 (0-23)
    const minutes = String(today.getMinutes()).padStart(2, '0'); // 현재 분
    const seconds = String(today.getSeconds()).padStart(2, '0'); // 현재 초

    const dateTimeString = `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
    // console.log(dateTimeString);
    setDate(dateTimeString);
  };
  const scrollRef = useRef(null);

  useEffect(() => {
    if (page === 1 && webSocket) {
      getToday();
      const formattedData = logEdukit1.map((item) => {
        const date = new Date(item.createdAt);
        const formattedDate = `[${
          date.getMonth() + 1
        }/${date.getDate()} ${date.getHours()}:${date.getMinutes()}:${date.getSeconds()}]`;
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
      getToday();
      const formattedData = logEdukit2.map((item) => {
        const date = new Date(item.createdAt);
        // const formattedDate = `[${date.getFullYear()}-${
        //   date.getMonth() + 1
        // }-${date.getDate()} ${date.getHours()}:${date.getMinutes()}:${date.getSeconds()}]`;
        const formattedDate = `[${
          date.getMonth() + 1
        }/${date.getDate()} ${date.getHours()}:${date.getMinutes()}:${date.getSeconds()}]`;

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
      {page === 1 && <Box className="log">1공장 {date} 로그 기록중</Box>}
      {page === 2 && <Box className="log">2공장 {date} 로그 기록중</Box>}
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

export const Order = (props) => {
  const { webSocket, scenario } = props.props;
  const [alarm, setAlarm] = useState('적용 중인 시나리오 없음.');

  useEffect(() => {
    if (webSocket) {
      console.log('here1', scenario);
      if (scenario !== null) {
        console.log('here2', scenario);
        setAlarm(scenario?.message);
      }
    }
  }, [scenario]);
  return (
    <Container className="order">
      <Box className="log scenario">
        <AiFillNotification style={{ marginRight: '10px' }} />
        알림 : {alarm}
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
