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
  border: none;
  border-radius: 5px;
  font-size: 1rem;
  font-weight: bold;
  width: 25%;
  height: 15%;
  position: absolute;
  bottom: 20px;
`;

const Modal = ({ setModal, element }) => {
  const closeModal = (href) => {
    setModal(false);
    window.location.href = `/${href}`;
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
