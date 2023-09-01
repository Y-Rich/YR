import { styled } from 'styled-components';

export const LoginContainer = styled.main`
  background-color: #ffffff;
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  height: 100vh;
  padding-top: 10vh;
  /* justify-content: space-evenly; */
`;

export const LoginBox = styled.section`
  display: flex;
  flex-direction: column;
  gap: 5vh;
  padding-top: 8vh;
`;

export const SmallBox = styled.section`
  display: flex;
  flex-direction: row;
  gap: 10px;
  font-size: 12px;
`;
