import React, { useState } from 'react';
import {
  ModalContainer,
  ModalContent,
  ModalBtn,
  ConfirmModalBtn,
  CancleModalBtn,
} from '../../components/Modal'; // 스타일을 가져옵니다.

const ConfirmModal = ({
  isOpen,
  onClose,
  onConfirm,
  resetPermissionConfirmed,
}) => {
  const [isPermissionConfirmed, setIsPermissionConfirmed] = useState(false);

  const handleConfirm = () => {
    setIsPermissionConfirmed(true); // 퍼미션 컨펌 모달을 열음
  };

  const handleClose = () => {
    setIsPermissionConfirmed(false); // 모든 모달을 닫음
    onClose(); // 원래 모달을 닫음
  };

  return (
    <>
      {!isPermissionConfirmed && (
        <ModalContainer
          isOpen={isOpen} // 원래 모달은 퍼미션 컨펌 모달이 열린 경우에만 열리도록 설정
          onRequestClose={onClose}
          contentLabel="Confirm Modal"
        >
          <ModalContent>권한을 변경하시겠습니까?</ModalContent>
          <ConfirmModalBtn onClick={handleConfirm}>확인</ConfirmModalBtn>
          <CancleModalBtn onClick={onClose}>취소</CancleModalBtn>
        </ModalContainer>
      )}

      {isPermissionConfirmed && (
        <ModalContainer
          isOpen={true} // 퍼미션 컨펌 모달은 항상 열려 있도록 설정
          onRequestClose={() => setIsPermissionConfirmed(false)} // 닫힐 때 퍼미션 컨펌 모달의 상태를 변경
          contentLabel="Permission Confirmed Modal"
        >
          <ModalContent>변경되었습니다.</ModalContent>
          <ModalBtn onClick={handleClose}>확인</ModalBtn>
        </ModalContainer>
      )}
    </>
  );
};

export default ConfirmModal;
