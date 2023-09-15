import React, { useState, useEffect } from 'react';
import { ModalWrapper, ModalContent, CloseButton } from './style';
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

  const handleSubmit = () => {
    setIsSubmitting(true);

    axios
      .put('http://192.168.0.127:8000/admin/permission', {
        id: selectedUserID,
        positionID: selectedPositionID,
      })
      .then((res) => {
        onClose();
        reloadData(); // 데이터 다시 불러오기
      })
      .catch((error) => {
        console.error('포지션 변경 중 에러가 발생했습니다.', error);
      })
      .finally(() => {
        setIsSubmitting(false);
      });
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

  useEffect(() => {
    if (isOpen) {
    }
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <ModalWrapper>
      <ModalContent>
        <h2>권한 관리</h2>
        <label>사용자 선택:</label>
        <select value={selectedUserID} onChange={handleUserChange}>
          <option value="">사용자를 선택하세요</option>
          {data.map((user) => (
            <option key={user.employeeID} value={user.employeeID}>
              {user.name}
            </option>
          ))}
        </select>
        <label>포지션 선택:</label>
        <select value={selectedPositionID} onChange={handlePositionChange}>
          <option value="">포지션을 선택하세요</option>
          {positions.map((position) => (
            <option key={position.id} value={position.id}>
              {position.name}
            </option>
          ))}
        </select>
        <button onClick={handleSubmit} disabled={isSubmitting}>
          적용
        </button>
        <button onClick={onClose}>닫기</button>
      </ModalContent>
      <CloseButton onClick={onClose}>X</CloseButton>
    </ModalWrapper>
  );
};

export default Modal;
