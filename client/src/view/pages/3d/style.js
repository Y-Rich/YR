import styled from 'styled-components';

export const Container = styled.section`
  width: 18vw;
  position: absolute;
  cursor: move;
  color: black;
  border-radius: 5px;
  user-select: none;
  color: whitesmoke;
  font-size: 12px;

  cursor: auto;
  -webkit-user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;
  user-select: none;
  gap: 2%;
`;

export const Box = styled.div`
  &.btn {
    width: 100%;
    height: 5vh;
    display: flex;
    cursor: grab;
    background-color: #a9a9a9;
    border-radius: 5px 5px 0 0;
    &:active {
      cursor: grabbing;
    }
  }
  &.small {
    margin-right: 5%;
  }
  &.gui {
    gap: 20px;
    /* height: ${(props) =>
      props.isOpen ? 'auto' : '0'}; /* 내용의 높이를 조절합니다. */
    /* overflow: hidden; 요소 내용이 숨겨진 경우 표시되지 않도록 합니다. */
    transition: ease;
    padding: 1em;
    margin: auto;
    background: gray;
    border-radius: 0 0 5px 5px;
  }
  &.guiDetail {
    margin-left: 10px;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    height: 6vh;
    &.reset {
      margin-right: 2vw;
    }
  }
`;

export const Title = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;
`;

export const Content = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
`;

export const ToggleBtn = styled.button`
  border: none;
  background: transparent;
  font-size: 12px;
  transition: transform 0.5s;
  cursor: pointer;

  -webkit-user-select: all;
  -moz-user-select: all;
  -ms-user-select: all;
  user-select: all;
  transform: rotate(${(props) => (props.isOpen ? '90deg' : '0deg')});
`;

export const ToggleContainer = styled.div`
  position: relative;
  /* margin-top: 8rem; */
  /* left: 47%; */
  cursor: pointer;

  > .toggle-container {
    width: 50px;
    height: 24px;
    border-radius: 30px;
    background-color: rgb(233, 233, 234);
  }
  //.toggle--checked 클래스가 활성화 되었을 경우의 CSS를 구현
  > .toggle--checked {
    background-color: rgb(0, 200, 102);
    transition: 0.5s;
  }

  > .toggle-circle {
    position: absolute;
    top: 1px;
    left: 1px;
    width: 22px;
    height: 22px;
    border-radius: 50%;
    background-color: rgb(255, 254, 255);
    transition: 0.5s;
  }
  > .toggle--checked {
    left: 27px;
    transition: 0.5s;
  }
`;

export const Desc = styled.div`
  text-align: center;
  margin: 15px;
`;
