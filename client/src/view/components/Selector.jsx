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
`;
const Btn = styled.button`
  color: #000000;
  text-decoration: none;
  font-weight: 800;
  cursor: pointer;
  &:hover {
    color: #5498ff;
  }
  /* &:focus {
    color: #5498ff;
  } */
  background-color: #5498ff;
  padding: 15px;
  font-size: 1.5rem;
  border-radius: 5px;
  border: none;
  box-shadow: 0px 0px 5px rgba(0, 0, 0, 0.5);
`;

const Selector = ({ onPageChange }) => {
  return (
    <SelectorContainer>
      <Btn onClick={() => onPageChange('chart')}>
        <AiOutlineBarChart />
      </Btn>
      <Btn onClick={() => onPageChange('pannel')}>
        <LiaDigitalTachographSolid />
      </Btn>
      <Btn onClick={() => onPageChange('plc')}>
        <GiSewingMachine />
      </Btn>
    </SelectorContainer>
  );
};

export default Selector;
