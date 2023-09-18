import React from 'react';
import { styled } from 'styled-components';
import { GiSewingMachine } from 'react-icons/gi';
import { AiOutlineBarChart } from 'react-icons/ai';
import { LiaDigitalTachographSolid } from 'react-icons/lia';

const SelectorContainer = styled.footer`
  position: absolute;
  left: 5%;
  top: 50%;
  transform: translate(0%, -50%);

  border-radius: 5px;
  font-weight: 800;
  display: grid;
  grid-template-rows: 1fr 1fr 1fr;
  text-align: center;
  align-items: center;
  /* box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.5); */
  color: #000000;
  gap: 20px;
  z-index: 999;
`;
const Btn = styled.button`
  color: #ffffff;
  text-decoration: none;
  font-weight: 800;
  cursor: pointer;
  &:hover {
    color: #22598f;
  }
  &:focus {
    color: #000000;
  }
  background-color: #5498ff;
  padding: 15px;
  font-size: 1.5rem;
  border-radius: 5px;
  border: none;
  box-shadow: 0px 0px 5px rgba(0, 0, 0, 0.5);
  z-index: 999;
`;

const Selector = ({ onPageChange }) => {
  const fac = sessionStorage.getItem('facilities');
  // const position = sessionStorage.getItem('position');
  const position = 'manager';
  // console.log('현재 속한 공장은', facilities);

  return (
    <SelectorContainer>
      {/* 깃에 올리기 전에 지울 부분 ㅜㅜㅜㅜㅜㅜㅜ*/}
      {/* <Btn onClick={() => onPageChange('plc1')}>
        <GiSewingMachine />
      </Btn> */}
      {/* 깃에 올리기 전에 지울 부분 ㅗㅗㅗㅗㅗㅗㅗ*/}
      <Btn onClick={() => onPageChange('chart')}>
        <AiOutlineBarChart />
      </Btn>
      <Btn onClick={() => onPageChange('pannel')}>
        <LiaDigitalTachographSolid />
      </Btn>
      {position === 'manager' ? (
        <>
          <Btn onClick={() => onPageChange('plc1')}>
            <GiSewingMachine />
          </Btn>
          <Btn onClick={() => onPageChange('plc2')}>
            <GiSewingMachine />
          </Btn>
        </>
      ) : (
        (fac === 'fac1' && (
          <Btn onClick={() => onPageChange('plc1')}>
            <GiSewingMachine />
          </Btn>
        )) ||
        (fac === 'fac2' && (
          <Btn onClick={() => onPageChange('plc2')}>
            <GiSewingMachine />
          </Btn>
        ))
      )}
    </SelectorContainer>
  );
};

export default Selector;
