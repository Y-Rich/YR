import { styled } from 'styled-components';

export const Slide = styled.main`
  .slick-dots {
    .slick-active {
      button::before {
        color: #c1c1c1;
      }
    }
    button::before {
      color: #e9e9e9;
    }
  }
`;

export const ChartContainer = styled.main`
  width: 70%;
  margin: 9vh 0 0 15%;
  padding: 5vh 0 3% 2%;
  // height: 100%;
  display: flex;
  flex-direction: row;
  place-items: center;
  background-color: #d9d9d9;
  justify-content: center;
  border-radius: 5px;
`;

export const ChartBox = styled.section`
  display: flex;
  flex-direction: column;
  gap: 8vh;
  overflow: scroll;
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
    flex-direction: column;
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
