import React from 'react';
import { styled, keyframes } from 'styled-components';
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
    color: #749ec8;
    transition: all 0.2s linear;
  }
  /* &:focus {
    color: #000000;
  } */
  background-color: #293242;
  padding: 15px;
  font-size: 1.5rem;
  border-radius: 5px;
  border: none;
  box-shadow: 0px 0px 5px rgba(0, 0, 0, 0.5);
  z-index: 999;
`;

const hoverAction = keyframes`
  0% { opacity: 0; }
  10% { opacity: 0.5; }
  20% { opacity: 1; }
  100% { opacity: 1; }
`;

const ToolTipContainer = styled.div`
  position: relative;
  width: fit-content;
  height: fit-content;

  &:hover > .tooltip,
  &:active > .tooltip {
    display: block;
    transition: all 0.2s linear;
  }
`;

const ToolTipContent = styled.div`
  display: none;
  position: absolute;
  z-index: 200;
  color: #5f5e5e;
  ${({ direction }) => {
    switch (direction) {
      case 'left':
        return `
          left: -100%;
          top: 50%;
          transform: translate(0%, -50%);
        `;
      case 'right':
        return `
          right: -100%;
          top: 50%;
          transform: translate(0%, -50%);
        `;
      case 'top':
        return `
          top: -100%;
          left: 50%;
          transform: translate(-50%, 0%);
        `;
      case 'bottom':
        return `
          bottom: -100%;
          left: 50%;
          transform: translate(-50%, 0%);
        `;
      default:
        return '';
    }
  }}
  animation: ${hoverAction} 1s ease
`;

const Tooltip = ({ children, message, direction }) => {
  return (
    <ToolTipContainer>
      {children}
      <ToolTipContent className="tooltip" direction={direction}>
        {message}
      </ToolTipContent>
    </ToolTipContainer>
  );
};

const Selector = ({ onPageChange }) => {
  const fac = sessionStorage.getItem('facilities');
  const position = sessionStorage.getItem('position');

  return (
    <SelectorContainer>
      <Tooltip message="chart" direction="left">
        <Btn onClick={() => onPageChange('chart')}>
          <AiOutlineBarChart />
        </Btn>
      </Tooltip>

      <Tooltip message="pannel" direction="left">
        <Btn onClick={() => onPageChange('pannel')}>
          <LiaDigitalTachographSolid />
        </Btn>
      </Tooltip>
      {position === 'manager' ? (
        <>
          <Tooltip message="plc1" direction="left">
            <Btn onClick={() => onPageChange('plc1')}>
              <GiSewingMachine />
            </Btn>
          </Tooltip>
          <Tooltip message="plc2" direction="left">
            <Btn onClick={() => onPageChange('plc2')}>
              <GiSewingMachine />
            </Btn>
          </Tooltip>
        </>
      ) : (
        (fac === 'fac1' && (
          <Tooltip message="plc1" direction="left">
            <Btn onClick={() => onPageChange('plc1')}>
              <GiSewingMachine />
            </Btn>
          </Tooltip>
        )) ||
        (fac === 'fac2' && (
          <Tooltip message="plc2" direction="left">
            <Btn onClick={() => onPageChange('plc2')}>
              <GiSewingMachine />
            </Btn>
          </Tooltip>
        ))
      )}
    </SelectorContainer>
  );
};

export default Selector;
