import styled from 'styled-components';

export const Page = styled.main`
  height: 100vh;
  background-color: #c2c2c2;
  display: flex;
  justify-content: center;
`;

export const Container = styled.section`
  width: 70%;
  height: 75%;
  display: flex;
  margin-top: 4%;
  border-radius: 10px;
  box-shadow: 0px 0px 10px gray;
  background-color: whitesmoke;
  color: #d9d9d9;
  justify-content: center;
`;

export const Box = styled.section`
  display: flex;
  flex-direction: column;
  gap: 8vh;
  padding: 5%;
`;

export const Section = styled.section`
  display: flex;
  align-items: center;
  justify-content: space-between;
  flex-direction: row;
  gap: 3vw;
  &.col {
    flex-direction: column;
  }
  &.middle {
    flex-direction: column;
  }
`;

export const Title = styled.article`
  font-size: 30px;
  text-align: center;
  border-radius: 5px;
  color: #5498ff;
`;

export const Content = styled.div`
  color: #46640b;
  font-size: 30px;
  border-radius: 5px;
  &.small {
    font-size: 20px;
  }
  &.dice {
    background-image: url('./assets/dice.png');
  }
`;

export const Dice = styled.img`
  width: 20vh;
  box-shadow: 0px 0px 5px rgba(0, 0, 0, 0.5);
`;
