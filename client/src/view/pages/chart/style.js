import { styled } from 'styled-components';

export const ChartContainer = styled.section`
  margin: 1vh 10% 1% 12%;
  display: flex;
  flex-direction: column;
  gap: 2vh;
`;

export const ChartBox = styled.section`
  gap: 2vh;
  align-items: center;
  &.top {
    display: grid;
    grid-template-columns: 1fr 1fr 1fr 1fr 1fr 1fr;
  }
  &.bottom {
    display: flex;
    flex-direction: row;
    height: 100%;
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
  gap: 2vh;
  &.title {
    flex-direction: row;
  }
`;

export const GBox = styled.div`
  width: 23vw;
  height: 30vh;
  padding: 1vh;
  z-index: 888;
  &.do {
    width: 31vw;
    height: 64vh;
  }
  background-color: white;
  box-shadow: 0 0 3px 0 rgba(0, 0, 0, 0.5);
  border-radius: 5px;
`;
