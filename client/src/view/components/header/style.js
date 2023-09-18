import { styled } from 'styled-components';

export const HeaderContainer = styled.header`
  position: sticky;
  width: 100%;
  display: flex;
  flex-direction: column;
  align-content: center;
  justify-content: space-between;
  align-items: center;
  padding: 1% 0 1% 0;

  background-color: #d9d9d9;
  color: #000000;
`;

export const HeaderBox = styled.section`
  padding: 0 5% 0 5%;
`;
export const Text = styled.div`
  /* background-color: aliceblue; */
  font-size: 15px;
  padding: 3px;
  position: absolute;
  right: 23%;
  display: flex;
  flex-direction: row;
  /* gap: 10px; */
  /* font-weight: bold; */
`;
