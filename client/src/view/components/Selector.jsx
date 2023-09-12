import React from 'react';
import { styled } from 'styled-components';
import { LinkText } from './Components';
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

const Selector = ({ onSelect }) => {
  return (
    <SelectorContainer>
      <LinkText
        to="/chart"
        className="selector"
        // onClick={() => onSelect('chart')}
      >
        <AiOutlineBarChart />
      </LinkText>
      <LinkText
        to="/pannel"
        className="selector"
        // onClick={() => onSelect('pannel')}
      >
        <LiaDigitalTachographSolid />
      </LinkText>
      <LinkText
        to="/plc"
        className="selector"
        // onClick={() => onSelect('plc')}
      >
        <GiSewingMachine />
      </LinkText>
    </SelectorContainer>
  );
};

export default Selector;
