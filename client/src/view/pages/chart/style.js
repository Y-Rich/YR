import { styled } from 'styled-components';

export const ChartContainer = styled.main`
  display: grid;
  grid-template-columns: 60% 20%;
  grid-row-gap: 5vh;
  margin-top: 10vh;
  place-items: center;
  /* justify-items: center; */
  /* width: 90%; */

  /* display: flex;
  flex-direction: column; */
  /* align-items: center; */
  /* justify-content: center; */
`;

export const ChartBox = styled.section`
  background-color: white;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 30vw;
  height: 30vh;
  overflow: scroll;
  &::-webkit-scrollbar {
    display: none;
  }
  border-radius: 5px;
  iframe {
    border-radius: 5px;
  }
`;
