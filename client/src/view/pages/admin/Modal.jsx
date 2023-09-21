import React, { useState, useEffect } from 'react';
import {
  ModalWrapper,
  PermissionModalContent,
  CloseButton,
  Positions,
  Select,
  Label,
  Button,
  ButtonContainer,
} from './ModalStyle';
import ConfirmModal from './ConfirmModal';

const Modal = ({ isOpen, onClose, data, reloadData }) => {
  const [selectedUserID, setSelectedUserID] = useState('');
  const [selectedPositionID, setSelectedPositionID] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isConfirmationModalOpen, setIsConfirmationModalOpen] = useState(false);
  const [isPermissionChangeConfirmed, setIsPermissionChangeConfirmed] =
    useState(false);

  const handleUserChange = (event) => {
    setSelectedUserID(event.target.value);
  };

  const handlePositionChange = (event) => {
    setSelectedPositionID(event.target.value);
  };

  const handleClose = () => {
    setSelectedUserID(''); // 사용자 선택 초기화
    setSelectedPositionID(''); // 권한 선택 초기화
    onClose();
  };

  const handleSubmit = () => {
    setIsConfirmationModalOpen(true); // 변경 사항을 적용하기 전에 확인 모달을 엽니다.
  };

  const handleConfirm = () => {
    setIsSubmitting(true);
  };

  const positions = [
    { id: 1, name: 'manager' },
    { id: 4, name: 'supervisor_fac1' },
    { id: 5, name: 'supervisor_fac2' },
    { id: 6, name: 'worker_fac1_line1' },
    { id: 7, name: 'worker_fac1_line2' },
    { id: 8, name: 'worker_fac1_line3' },
    { id: 9, name: 'worker_fac2_line1' },
    { id: 10, name: 'worker_fac2_line2' },
    { id: 11, name: 'worker_fac2_line3' },
  ];

  const handleModalContentClick = (e) => {
    // 모달 내부를 클릭해도 모달이 닫히지 않도록 이벤트 중단
    e.stopPropagation();
  };

  useEffect(() => {
    if (isOpen) {
    }
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <ModalWrapper onClick={handleClose}>
      <PermissionModalContent onClick={handleModalContentClick}>
        <Positions>제어 권한 관리</Positions>
        <Label>사용자</Label>
        <Select value={selectedUserID} onChange={handleUserChange}>
          <option value=""></option>
          {data.map((user) => (
            <option key={user.employeeID} value={user.employeeID}>
              {user.name}
            </option>
          ))}
        </Select>
        <Label>권한</Label>
        <Select value={selectedPositionID} onChange={handlePositionChange}>
          <option value=""></option>
          {positions.map((position) => (
            <option key={position.id} value={position.id}>
              {position.name}
            </option>
          ))}
        </Select>
        <ButtonContainer>
          <Button onClick={handleSubmit} disabled={isSubmitting}>
            적용
          </Button>
        </ButtonContainer>
        {/* 변경 사항 확인 모달 */}
        {isConfirmationModalOpen && (
          <ConfirmModal
            isOpen={isConfirmationModalOpen}
            onClose={() => setIsConfirmationModalOpen(false)}
            onConfirm={handleConfirm}
            selectedUserID={selectedUserID}
            selectedPositionID={selectedPositionID}
            setIsPermissionChangeConfirmed={setIsPermissionChangeConfirmed}
            reloadData={reloadData}
            setIsSubmitting={setIsSubmitting}
            setIsConfirmationModalOpen={setIsConfirmationModalOpen}
          />
        )}
      </PermissionModalContent>
      <CloseButton onClick={handleClose}>x</CloseButton>
    </ModalWrapper>
  );
};

export default Modal;
