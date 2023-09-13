import { styled } from 'styled-components';

export const Page = styled.main``;

export const Slide = styled.main`
  height: 100vh;
  background-color: #c2c2c2;
  .slick-dots {
    .slick-active {
      button::before {
        /* color: #c1c1c1; */
        color: pink;
        z-index: 999;
      }
    }
    button::before {
      /* color: #e9e9e9; */
      color: blueviolet;
      z-index: 999;
    }
  }
`;

export const ChartContainer = styled.section`
  width: 70%;
  box-shadow: 0px 0px 10px gray;
  margin: 10vh 15% 0 15%;
  padding: 3% 3% 3% 3%;
  display: flex;
  place-items: center;
  background-color: whitesmoke;
  border-radius: 5px;
`;

export const ChartBox = styled.section`
  display: flex;
  flex-direction: column;
  gap: 8vh;
  align-items: center;
  &.left {
    align-items: flex-start;
  }
  &::-webkit-scrollbar {
    display: none;
  }
`;
export const TitleBox = styled.div`
  display: flex;
  flex-direction: row;
  gap: 2vw;
`;
export const CBox = styled.div`
  display: flex;
  gap: 5vh;
  &.title {
    flex-direction: row;
    align-items: center;
  }
`;
export const GBox = styled.div`
  width: 20vw;
  height: 30vh;
  &.do {
    width: 30vw;
    height: 50vh;
  }
`;
