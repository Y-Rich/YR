import React, { useEffect, useRef } from 'react';
import { styled } from 'styled-components';

const ModalContainer = styled.section`
  width: 400px;
  height: 300px;
  z-index: 999;
  position: absolute;
  top: 40%;
  left: 50%;
  transform: translate(-50%, -50%);

  background-color: white;
  border-radius: 8px;
  box-shadow: 0 10px 10px rgba(0, 0, 0, 0.5);
  font-size: 20px;

  display: flex;
  flex-direction: column;
  //   justify-content: center;
  align-items: center;
`;

const ModalContent = styled.div`
  position: absolute;
  top: 35%;
`;

const ModalBtn = styled.button`
  background-color: #d9d9d9;
  border: 2mm outset black;
  border-radius: 5px;
  font-size: 1rem;
  font-weight: bold;
  width: 25%;
  height: 15%;
  position: absolute;
  bottom: 20px;
  cursor: pointer;
  &:hover {
    background-color: #a9a9a9;
  }
  &:active {
    border-style: 1mm inset black;
    box-shadow: inset -0.3rem -0.1rem 1.4rem #fbfbfb,
      inset 0.3rem 0.4rem 0.8rem #bec5d0;

    /* box-shadow: 2px 3px 0 rgb(0, 0, 0, 0.5); */
  }
`;

const Modal = ({ setModal, element }) => {
  const closeModal = (href) => {
    setModal(false);
    window.location.reload('/');
    // window.location.href = `/${href}`;
  };
  const modalRef = useRef(null);
  const handleOutsideClick = (e) => {
    if (modalRef.current && !modalRef.current.contains(e.target)) {
      closeModal();
    }
  };
  useEffect(() => {
    document.addEventListener('mousedown', handleOutsideClick);
    return () => {
      document.removeEventListener('mousedown', handleOutsideClick);
    };
  }, []);
  return (
    <ModalContainer ref={modalRef}>
      <ModalContent>{element}</ModalContent>
      <ModalBtn onClick={() => closeModal('')}>확인</ModalBtn>
    </ModalContainer>
  );
};

export default Modal;
