import React, { useEffect, useRef } from 'react';
import { styled } from 'styled-components';
import { LineGraph1, LineGraph2, LineGraph3 } from '../pages/chart/Graph';

const ModalContainer = styled.section`
  width: 400px;
  height: 300px;
  z-index: 999;
  position: absolute;
  top: 40%;
  left: 50%;
  transform: translate(-50%, -50%);

  background-color: white;
  border-radius: 8px;
  box-shadow: 0 10px 10px rgba(0, 0, 0, 0.5);
  font-size: 20px;

  display: flex;
  flex-direction: column;
  //   justify-content: center;
  align-items: center;
  &.chart {
    top: 50%;
    width: 50vw;
    height: 80vh;
    display: grid;
    grid-template-columns: 1fr 1fr;
    justify-items: center;
    align-content: center;
  }
`;

const ModalContent = styled.div`
  position: absolute;
  top: 35%;
`;

const ModalBtn = styled.button`
  background-color: #3579a0;
  border: none;
  /* border: 0.5mm outset black; */
  border-radius: 5px;
  font-size: 1rem;
  font-weight: bold;
  width: 25%;
  height: 15%;
  position: absolute;
  bottom: 20px;
  color: white;
  cursor: pointer;
  /* box-shadow: 0px 0px 2px 1px #abd6ef; */
  &:hover {
    background-color: #a9a9a9;
  }
  &:active {
    border-style: 1mm inset black;
    box-shadow: inset -0.3rem -0.1rem 1.4rem #fbfbfb,
      inset 0.3rem 0.4rem 0.8rem #bec5d0;

    /* box-shadow: 2px 3px 0 rgb(0, 0, 0, 0.5); */
  }
`;

const ModalChart = styled.div`
  padding: 10px;
  width: 20vw;
  height: 35vh;
`;

export const RefreshModal = ({ setRefreshModal, element }) => {
  const closeModal = (href) => {
    setRefreshModal(false);
    window.location.reload('/');
    // window.location.href = `/${href}`;
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
    <ModalContainer ref={modalRef}>
      <ModalContent>{element}</ModalContent>
      <ModalBtn onClick={closeModal}>확인</ModalBtn>
    </ModalContainer>
  );
};

export const AlertModal = ({ setAlertModal, element }) => {
  const closeModal = () => {
    setAlertModal(false);
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
    <ModalContainer ref={modalRef}>
      <ModalContent>{element}</ModalContent>
      <ModalBtn onClick={closeModal}>확인</ModalBtn>
    </ModalContainer>
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
      <ModalChart>
        <LineGraph1
          title="미세먼지"
          labels={time}
          label="미세먼지"
          datas={dust}
          borderColors="rgb(194, 213, 25)"
          backgroundColors="rgba(217, 235, 53, 0.5)"
        />
      </ModalChart>
      <ModalChart>
        <LineGraph1
          title="온도"
          labels={time}
          label="온도"
          datas={temp}
          borderColors="rgb(251, 32, 79)"
          backgroundColors="rgba(255, 99, 132, 0.5)"
        />
      </ModalChart>
      <ModalChart>
        <LineGraph1
          title="습도"
          labels={time}
          label="습도"
          datas={humi}
          borderColors="rgb(36, 164, 249)"
          backgroundColors="rgba(53, 162, 235, 0.5)"
        />
      </ModalChart>
      <ModalChart>
        <LineGraph3
          title="클린룸 상황"
          labels={time}
          label1="온도"
          label2="습도"
          label3="미세먼지"
          data1={temp}
          data2={humi}
          data3={dust}
        />
      </ModalChart>
    </ModalContainer>
  );
};
