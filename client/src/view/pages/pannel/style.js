import styled from 'styled-components';

export const Page = styled.main`
  width: 100%;
  height: 100vh;
  background-color: #f6f8f7;
  display: flex;
  flex-direction: column;
  color: #d9d9d9;
  .slick-dots {
    .slick-active {
      button::before {
        /* color: #c1c1c1; */
        color: #293242;
        z-index: 999;
      }
    }
    button::before {
      /* color: #e9e9e9; */
      color: #3d5a7f;
      z-index: 999;
    }
  }
`;

export const Container = styled.section`
  /* gap: 10px; */
  margin: 1vh 10% 1% 12%;
  &.top {
    gap: 2vw;
    display: grid;
    width: 100%;
    grid-template-columns: 2fr 1fr 1fr 1fr;
  }
  &.bottom {
    gap: 1vw;
    display: flex;
    flex-direction: row;
  }
  /* gap: 8vh; */
  /* padding: 5%; */
`;

export const Box = styled.section`
  display: flex;
  align-items: center;
  justify-content: center;
  &.top {
    height: 30vh;
    gap: 1vw;
    &.left {
      width: 80vh;
      background-color: white;
      box-shadow: 0 0 3px 0 rgba(0, 0, 0, 0.5);
      border-radius: 5px;
      flex-direction: column;
    }
    &.right {
      gap: 2vw;
      flex-direction: row;
    }
  }
  &.bottom {
    background-color: white;
    box-shadow: 0 0 3px 0 rgba(0, 0, 0, 0.5);
    border-radius: 5px;
    height: 50vh;
    width: 50vw;
    justify-content: space-evenly;
    flex-direction: column;
    &.left {
      gap: 10px;
    }
    &.middle {
      width: 30vw;
    }
    &.right {
      width: 40vw;
    }
  }
`;

export const Section = styled.section`
  &.top {
    &.left {
      width: 90%;
      padding: 10px;
      display: flex;
      flex-direction: row;
      align-items: center;
      justify-content: space-between;
      gap: 1vw;
    }
    &.right {
      width: 10.2vw;
      background-color: white;
      box-shadow: 0 0 3px 0 rgba(0, 0, 0, 0.5);
      border-radius: 5px;
      padding: 10px;
    }
  }
  &.bottom {
    &.right {
      gap: 10px;
    }
  }
`;

export const Title = styled.article`
  font-size: 20px;
  text-align: center;
  border-radius: 5px;
  color: #5498ff;
  background-color: aliceblue;
  margin: 5px;
  padding: 5px;
  &.fac {
    position: absolute;
    top: 1vh;
    color: #3d5a7f;
  }
  &.top {
    &.right {
      background-color: aliceblue;
      margin: 5px;
      padding: 5px;
    }
  }
  &.bottom {
    &.left {
    }
    &.middle {
      margin-bottom: 10px;
    }
    &.right {
      margin-bottom: 10px;
    }
  }
`;

export const ContentBox = styled.div`
  display: flex;
  flex-direction: row;
  /* gap: 1vw; */
  padding: 10px;
  justify-content: space-between;
`;

export const Content = styled.div`
  color: #46640b;
  font-size: 30px;
  border-radius: 5px;

  &.bottom {
    &.left {
      font-size: 20px;
    }
    &.middle {
    }
    &.right {
    }
  }
  &.small {
    font-size: 20px;
  }
  &.dice {
    background-image: url('./assets/dice.png');
  }
`;

export const Dice = styled.img`
  width: 20vh;
  /* box-shadow: 0px 0px 5px rgba(0, 0, 0, 0.5); */
`;
