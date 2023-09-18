import React, { useState, useEffect } from 'react';
import {
  ModalWrapper,
  ModalContent,
  CloseButton,
  Positions,
  Select,
  Label,
  Button,
  ButtonContainer,
} from './ModalStyle';
import axios from 'axios';

const Modal = ({ isOpen, onClose, data, reloadData }) => {
  const [selectedUserID, setSelectedUserID] = useState('');
  const [selectedPositionID, setSelectedPositionID] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

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
    const confirmed = window.confirm('변경 사항을 적용하시겠습니까?');
    if (confirmed) {
      setIsSubmitting(true);

      axios
        .put('http://192.168.0.127:8000/admin/permission', {
          id: selectedUserID,
          positionID: selectedPositionID,
        })
        .then((res) => {
          handleClose();
          reloadData(); // 데이터 다시 불러오기
        })
        .catch((error) => {
          console.error('포지션 변경 중 에러가 발생했습니다.', error);
        })
        .finally(() => {
          setIsSubmitting(false);
        });
    }
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
      <ModalContent onClick={handleModalContentClick}>
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
      </ModalContent>
      <CloseButton onClick={handleClose}>x</CloseButton>
    </ModalWrapper>
  );
};

export default Modal;
