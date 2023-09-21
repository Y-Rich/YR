import React from 'react';
import { ModalContainer, ModalContent, ModalBtn } from '../../components/Modal'; // 스타일을 가져옵니다.
import axios from 'axios';

const ConfirmModal = ({
  isOpen,
  onClose,
  selectedUserID,
  selectedPositionID,
  isPermissionConfirmed,
  setIsPermissionChangeConfirmed,
  reloadData,
}) => {
  const handleConfirm = () => {
    axios
      .put('http://192.168.0.127:8000/admin/permission', {
        id: selectedUserID,
        positionID: selectedPositionID,
      })
      .then((res) => {
        handleClose();
        setIsPermissionChangeConfirmed(true); // 권한 변경이 확인되었습니다.
        reloadData();
      })
      .catch((error) => {
        console.error('포지션 변경 중 에러가 발생했습니다.', error);
      });
  };

  const handleClose = () => {
    onClose();
  };

  return (
    <>
      {!isPermissionConfirmed && (
        <ModalContainer
          isOpen={isOpen}
          onRequestClose={onClose}
          contentLabel="Confirm Modal"
        >
          <ModalContent>변경되었습니다.</ModalContent>
          <ModalBtn
            onClick={() => {
              handleConfirm();
            }}
          >
            확인
          </ModalBtn>
        </ModalContainer>
      )}
    </>
  );
};

export default ConfirmModal;
