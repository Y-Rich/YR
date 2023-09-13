import { styled } from 'styled-components';

export const Page = styled.main``;

export const Slide = styled.main`
  height: 100vh;
  background-color: #f6f8f7;
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
  /* width: 70%; */
  /* box-shadow: 0px 0px 10px gray; */
  margin: 3vh 10% 1% 10%;
  /* padding: 3% 3% 3% 3%; */
  display: flex;
  flex-direction: column;
  /* place-items: center; */
  /* background-color: whitesmoke; */
  /* border-radius: 5px; */
  /* align-items: flex-end; */
  gap: 2vh;
`;

export const ChartBox = styled.section`
  display: flex;
  flex-direction: row;
  /* width: 1000px; */
  gap: 2vh;
  align-items: center;
  &.left {
    /* align-items: flex-start; */
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
  display: grid;
  grid-template-columns: 1fr 1fr;
  /* width: 10vw; */
  /* height: 100%; */
  gap: 2vh;
  &.title {
    flex-direction: row;
    /* align-items: center; */
  }
`;
export const GBox = styled.div`
  width: 22.5vw;
  /* height: 30vh; */
  padding: 1vh;
  &.do {
    width: 31vw;
    height: 64vh;
  }
  background-color: white;
  box-shadow: 0 0 5px 0 rgba(0, 0, 0, 0.5);
  border-radius: 10px;
`;
