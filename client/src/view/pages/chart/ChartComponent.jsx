import React, { useEffect, useRef } from 'react';
import { Box, Title } from '../../components/Components';
import { BiSolidFactory } from 'react-icons/bi';
import { AiFillAndroid, AiFillAppstore, AiFillSetting } from 'react-icons/ai';
import { styled } from 'styled-components';
import { LineGraph1, LineGraph3 } from './Graph';
import { MdOutlineReportGmailerrorred, MdReport } from 'react-icons/md';
import { GoContainer } from 'react-icons/go';
import { SiIbeacon } from 'react-icons/si';
import { CiInboxIn, CiInboxOut } from 'react-icons/ci';
import { FaMagnifyingGlassChart } from 'react-icons/fa6';

const BtnContainer = styled.div`
  position: absolute;
  cursor: pointer;
  color: #a6a6a6;
  font-size: 1.2rem;
  padding: 3px;
  &:hover {
    color: black;
    transform: scale(1.2);
    transition: all 0.2s linear;
  }
`;

const ModalContainer = styled.section`
  z-index: 999;
  position: absolute;
  top: 50%;
  left: 50%;
  width: 50vw;
  height: 82vh;
  transform: translate(-50%, -50%);

  display: flex;
  flex-direction: column;

  background-color: white;
  border-radius: 8px;
  box-shadow: 0 5px 5px rgba(0, 0, 0, 0.5);
  font-size: 20px;

  overflow-y: scroll;
  &::-webkit-scrollbar {
    display: none;
  }
`;
const ModalBox = styled.div`
  &.title {
    font-size: 2rem;
    text-align: center;
    padding: 1rem;
    background-color: #e7e9ec;
  }
  &.graph {
    display: grid;
    grid-template-columns: 1fr 1fr;
    justify-items: center;
  }
`;
const ModalChart = styled.div`
  padding: 0 5px 5px 5px;
  width: 20vw;
  height: 35vh;
`;

export const NavContent = ({
  location,
  factory,
  output,
  input,
  errName,
  err,
  right1Title,
  right1Num,
  right2Title,
  right2Num,
}) => {
  return (
    <>
      <Box className="chart big" style={{ backgroundColor: '#293242' }}>
        <BiSolidFactory style={{ color: '#7f83a0' }} />
        <Box className="chart tiny">
          <Title className="label">공장 : {location}</Title>
          <Title className="mount">{factory}</Title>
        </Box>
      </Box>
      <Box className="chart big" style={{ backgroundColor: '#42a845' }}>
        <CiInboxOut style={{ color: '#adefaf' }} />
        <Box className="chart tiny">
          <Title className="label">총 생산량</Title>
          <Title className="mount">{output}</Title>
        </Box>
      </Box>
      <Box className="chart big" style={{ backgroundColor: '#3d5a7f' }}>
        <CiInboxIn style={{ color: '#e2ecf6' }} />
        <Box className="chart tiny">
          <Title className="label">총 투입량</Title>
          <Title className="mount">{input}</Title>
        </Box>
      </Box>
      <Box className="chart big" style={{ backgroundColor: '#9B0000' }}>
        <MdOutlineReportGmailerrorred style={{ color: '#f6d8d8' }} />
        <Box className="chart tiny">
          <Title className="label">{errName}</Title>
          <Title className="mount">{err}%</Title>
        </Box>
      </Box>
      <Box className="chart big" style={{ backgroundColor: '#FF7272' }}>
        <GoContainer style={{ color: '##f4c0b4' }} />
        <Box className="chart tiny">
          <Title className="label">{right1Title}</Title>
          <Title className="mount">{right1Num}</Title>
        </Box>
      </Box>
      <Box className="chart big" style={{ backgroundColor: '#FFB5B5' }}>
        <GoContainer style={{ color: '#f9d4d4' }} />
        <Box className="chart tiny">
          <Title className="label">{right2Title}</Title>
          <Title className="mount">{right2Num}</Title>
        </Box>
      </Box>
    </>
  );
};

export const ChartModal = ({ setModal, time, dust, temp, humi }) => {
  const closeModal = () => {
    setModal(false);
  };
  const modalRef = useRef(null);
  const handleOutsideClick = (e) => {
    if (modalRef.current && !modalRef.current.contains(e.target)) {
      closeModal();
    }
  };
  useEffect(() => {
    document.addEventListener('mousedown', handleOutsideClick);
    return () => {
      document.removeEventListener('mousedown', handleOutsideClick);
    };
  }, []);
  return (
    <ModalContainer ref={modalRef} className="chart" onClick={closeModal}>
      <ModalBox className="title">fac1의 온습도 미세먼지 자세히 보기</ModalBox>
      <ModalBox className="graph">
        <ModalChart>
          <LineGraph1
            // title="미세먼지"
            labels={time}
            label="미세먼지"
            datas={dust}
            borderColors="rgb(194, 213, 25)"
            backgroundColors="rgba(217, 235, 53, 0.5)"
          />
        </ModalChart>
        <ModalChart>
          <LineGraph1
            // title="온도"
            labels={time}
            label="온도"
            datas={temp}
            borderColors="rgb(251, 32, 79)"
            backgroundColors="rgba(255, 99, 132, 0.5)"
          />
        </ModalChart>
        <ModalChart>
          <LineGraph1
            // title="습도"
            labels={time}
            label="습도"
            datas={humi}
            borderColors="rgb(36, 164, 249)"
            backgroundColors="rgba(53, 162, 235, 0.5)"
          />
        </ModalChart>
        <ModalChart>
          <LineGraph3
            // title="클린룸 상황"
            labels={time}
            label1="온도"
            label2="습도"
            label3="미세먼지"
            data1={temp}
            data2={humi}
            data3={dust}
          />
        </ModalChart>
      </ModalBox>
    </ModalContainer>
  );
};

export const ModalBtn = ({ handleClick }) => {
  return (
    <BtnContainer>
      <FaMagnifyingGlassChart onClick={handleClick}></FaMagnifyingGlassChart>
    </BtnContainer>
  );
};
