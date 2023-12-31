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
  padding: 1vw 3vw;
  text-align: center;
  background-color: #dddddd;
`;

export const Td = styled.td`
  text-align: center;
  padding: 1.5vw;
`;

export const Scroll = styled.div`
  margin-top: 80px;
  max-height: 480px;
  overflow-y: auto;
  margin-top: 7%;
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
  top: 15%;
  right: 320px;
  background-color: #4b5668;
  color: white;
  /* padding: 10px 14px; */
  width: 6vw;
  height: 6vh;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  font-weight: bold;
`;

export const ButtonContainer = styled.div`
  display: flex;
  flex-direction: column;
  position: absolute;
  top: 100px;
  left: 53px;
`;

export const EmpButton = styled.button`
  height: 40px;
  width: 140px;
  background-color: rgba(0, 0, 0, 0.5);
  color: white;
  padding: 8px 12px;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  font-weight: bold;
`;

export const FacButton = styled.button`
  height: 40px;
  width: 140px;
  background-color: rgba(0, 0, 0, 0.5);
  color: white;
  padding: 8px 12px;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  font-weight: bold;
`;

export const AdminButton = styled.button`
  height: 40px;
  width: 140px;
  background-color: rgba(0, 0, 0, 0.5);
  color: white;
  padding: 8px 12px;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  font-weight: bold;
`;
