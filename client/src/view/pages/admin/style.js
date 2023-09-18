import { styled } from 'styled-components';

export const Title = styled.h1`
  font-size: 30px;
  position: absolute;
  top: 10%;
`;

export const Table = styled.table`
  font-size: 1rem;
  border-radius: 10px;
  overflow: hidden;
  border-collapse: collapse;
`;

export const Thead = styled.thead`
  background-color: beige;
  border-radius: 10px;
`;

export const Tbody = styled.tbody`
  background-color: #ffffff;
  border-radius: 10px;
`;

export const Tr = styled.tr`
  border-radius: 10px;
`;

export const Th = styled.th`
  padding: 1.5vw 4vw;
  text-align: center;
  background-color: #0xdddddd;
`;

export const Td = styled.td`
  padding: 8px;
  text-align: center;
  padding: 1.5vw;
`;

export const Scroll = styled.div`
  margin-top: 80px;
  max-height: 580px;
  overflow-y: auto;
  &::-webkit-scrollbar {
    width: 4px;
  }
  &::-webkit-scrollbar-thumb {
    border-radius: 2px;
    background: #ccc;
  }
`;
export const AuthButton = styled.button`
  position: absolute;
  top: 90px;
  right: 300px;
  background-color: #97c0d8;
  color: white;
  padding: 8px 12px;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  font-weight: bold;
`;
