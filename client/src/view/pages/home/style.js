import { styled } from 'styled-components';

export const HomeContainer = styled.main`
  color: #000000;
  font-size: 100px;
  width: 100%;
  height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  &::after {
    content: '';
    background: url('assets/back.jpg');
    background-size: cover;
    opacity: 0.5;
    position: absolute;
    top: 0px;
    left: 0px;
    right: 0px;
    bottom: 0px;
    z-index: -10;
  }
`;

export const Banner = styled.div`
  background-image: url('assets/edukit.png');
  background-size: cover;
  width: 30%;
  height: 50vh;
  position: absolute; /* 위치를 변경하기 위해 position을 사용 */
  left: ${({ ready }) =>
    ready ? '70%' : '30%'}; /* 버튼을 눌렀을 때 위치 변경 */
  transition: left 0.5s;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

export const Button = styled.button`
  background-color: white;
  position: absolute; /* 위치를 변경하기 위해 position을 사용 */
  left: ${({ ready }) =>
    ready ? '30%' : '70%'}; /* 버튼을 눌렀을 때 위치 변경 */
  transition: left 0.5s;
`;
