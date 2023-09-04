import React from 'react';
import { FindBox, FindContainer, SmallBox } from './style';
import { Button, Input, LinkText, Title } from '../../components/Components';
const Find = () => {
  return (
    <FindContainer>
      <Title>Find</Title>
      <FindBox>
        <Input type="text" placeholder="사번을 입력하세요" />
        <Input type="text" placeholder="ID를 입력하세요" />
      </FindBox>
      <FindBox>
        <Button>Submit</Button>
      </FindBox>
    </FindContainer>
  );
};

export default Find;
