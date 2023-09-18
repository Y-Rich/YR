import styled from 'styled-components';

export const Container = styled.section`
  margin: 1% 10% 1% 12%;
  width: 100%;
  &.top {
    display: grid;
    grid-template-columns: 4.1fr 1fr 1fr 1fr;
    grid-column-gap: 20px;
  }
  &.bottom {
    // gap: 1vw;
    // display: flex;
    // flex-direction: row;
    width: 78.5%;

    display: grid;
    grid-template-columns: 1.5fr 1fr 1.2fr;
    grid-column-gap: 1%;
  }
`;

export const Box = styled.section`
  display: flex;
  align-items: center;
  justify-content: center;
  &.top {
    height: 30vh;
    gap: 1vw;
    &.left {
      background-color: white;
      box-shadow: 0 0 3px 0 rgba(0, 0, 0, 0.5);
      border-radius: 5px;
      flex-direction: column;
    }
    &.right {
      flex-direction: row;
    }
  }
  &.bottom {
    background-color: white;
    box-shadow: 0 0 3px 0 rgba(0, 0, 0, 0.5);
    border-radius: 5px;
    height: 50vh;
    flex-direction: column;
    &.left {
      width: 35vw;
      gap: 10%;
    }
    &.middle {
      // width: 20vw;
      justify-content: space-evenly;
    }
    &.right {
      // width: 25vw;
      justify-content: space-evenly;
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
    }
    &.right {
      height: 85.8%;
      background-color: white;
      box-shadow: 0 0 3px 0 rgba(0, 0, 0, 0.5);
      border-radius: 5px;
      padding: 15px;
    }
  }
  &.bottom {
    &.right {
      gap: 20px;
    }
  }
`;

export const Title = styled.article`
  font-size: 20px;
  text-align: center;
  border-radius: 5px;
  color: #3d5a7f;
  background-color: aliceblue;
  margin: 5px;
  padding: 5px;
  &.fac {
    position: absolute;
    top: 2.5%;
    color: #293242;
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
      margin: 10px 0 10px 0;
    }
  }
`;

export const ContentBox = styled.div`
  display: flex;
  flex-direction: row;
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
  &.no_dice {
    padding: 57px;
  }
`;

export const Dice = styled.img`
  width: 20vh;
  /* box-shadow: 0px 0px 5px rgba(0, 0, 0, 0.5); */
`;
