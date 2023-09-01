import React from 'react';
import { FindBox, FindContainer, SmallBox } from './style';
import { Button, Input, LinkText, Title } from '../../components/Components';
const Find = () => {
  return (
    <FindContainer>
      <Title>Find</Title>
      <FindBox>
        <Input type="text" placeholder="Please enter your number" />
        <Input type="text" placeholder="Please enter your email" />
      </FindBox>
      <FindBox>
        <Button>SUBMIT</Button>
      </FindBox>
    </FindContainer>
  );
};

export default Find;
