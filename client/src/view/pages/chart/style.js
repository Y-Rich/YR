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
  padding: 5vh 0 5% 2%;
  // height: 100%;
  display: flex;
  flex-direction: row;
  place-items: center;
  background-color: #d9d9d9;
  justify-content: center;
  border-radius: 10px;
`;

export const ChartBox = styled.section`
  display: flex;
  flex-direction: column;
  gap: 5rem;
  overflow: scroll;
  align-items: center;
  &::-webkit-scrollbar {
    display: none;
  }
  border-radius: 5px;
`;
export const CBox = styled.div`
  display: flex;
  flex-direction: row;
  &.title {
    gap: 3vw;
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
