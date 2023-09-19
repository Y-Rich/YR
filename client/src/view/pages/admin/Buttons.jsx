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
  font-weight: 400;
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
  font-size: 1.1rem;
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

const Buttons = ({ onPageChange }) => {
  return (
    <SelectorContainer>
      <Btn onClick={() => onPageChange('employeeList')}>
        <AiOutlineBarChart />
        직원목록
      </Btn>
      <Btn onClick={() => onPageChange('employeeLog')}>
        <GiSewingMachine />
        직원로그
      </Btn>
      <Btn onClick={() => onPageChange('factoryLog')}>
        <LiaDigitalTachographSolid />
        공장로그
      </Btn>
    </SelectorContainer>
  );
};

export default Buttons;
