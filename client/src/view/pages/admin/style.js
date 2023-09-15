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
  padding: 1.5vw;
  text-align: center;
  background-color: #dffbfc;
  justify-content: space-between;
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
  right: 380px;
  background-color: #97c0d8;
  color: white;
  padding: 8px 12px;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  font-weight: bold;
`;

export const ModalWrapper = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.3);
  display: flex;
  justify-content: center;
  align-items: center;
`;

export const ModalContent = styled.div`
  background-color: white;
  padding: 20px;
  border-radius: 5px;
  box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.5);
  font-size: 40px;
`;

export const CloseButton = styled.button`
  position: absolute;
  bottom: 20px;
  left: 50%;
  transform: translateX(-50%);
  background-color: #97c0d8;
  border: none;
  cursor: pointer;
  font-size: 18px;
`;
