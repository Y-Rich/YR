import React, { useState, useEffect, useRef } from 'react';
import { styled } from 'styled-components';
import { LinkText } from './Components';

const SelectorContainer = styled.footer`
  position: absolute;
  bottom: 10%;
  right: 15%;
  border-radius: 5px;
  font-weight: 800;
  /* display: flex; */
  display: grid;
  /* flex-direction: row; */
  grid-template-columns: 1fr 1fr;
  text-align: center;
  align-items: center;
  background-color: #d9d9d9;
  color: #000000;
`;

const Selector = () => {
  return (
    <SelectorContainer>
      <LinkText to="/chart" className="selector">
        Chart
      </LinkText>
      <LinkText to="/plc" className="selector">
        3D
      </LinkText>
    </SelectorContainer>
  );
};

export default Selector;
