import { styled } from 'styled-components';

export const ModalWrapper = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.3);
  display: flex;
  justify-content: center;
  align-items: center;
`;

export const PermissionModalContent = styled.div`
  top: -10%;
  background-color: white;
  border-radius: 5px;
  box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.5);
  width: 350px;
  height: 290px;
  padding: 20px;
  position: relative;
  text-align: center;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: flex-start;
  text-align: left;
`;

export const CloseButton = styled.button`
  position: absolute;
  top: 137px;
  right: 590px;
`;

export const Positions = styled.h2`
  font-size: 25px;
  position: absolute;
  top: 7%;
  left: 50%;
  transform: translateX(-50%);
`;

export const Select = styled.select`
  font-size: 18px;
  width: 100%;
  cursor: pointer;
`;

export const Label = styled.label`
  font-size: 20px;
  margin-bottom: 10px;
  margin-top: 30px;
  font-weight: 300;
`;

export const Button = styled.button`
  margin-top: 30px;
  cursor: pointer;
  background-color: #3579a0;
  color: white;
  padding: 5px 10px;
  border: none;
  border-radius: 5px;
  font-size: 1rem;
  font-weight: bold;
  width: 25%;
  height: 60%;
`;

export const ButtonContainer = styled.div`
  display: flex;
  justify-content: flex-end;
  margin-top: 20px;
  width: 100%;
`;
