import { styled } from 'styled-components';

export const Table = styled.table`
  font-size: 1rem;
  /* width: 50%; */
  /* height: 70%; */
  margin-top: 5%;
  border-radius: 10px;
  border-collapse: collapse;
`;

export const Thead = styled.thead`
  background-color: beige;
  /* height: 10%; */
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
  padding: 1.5vw; /* 셀 내부 패딩을 추가합니다. */
  text-align: center;
`;

export const Td = styled.td`
  padding: 8px;
  text-align: center;
  padding: 1.5vw;
  /* border: 1px solid #999999; */
`;
