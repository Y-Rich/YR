import React from 'react';
import { Button, Input, Title } from '../../components/Components';
import { ModiBox, ModiContainer } from './style';

const UserModi = () => {
  return (
    <ModiContainer>
      <ModiBox>
        <Title>USER MODIFY</Title>
      </ModiBox>
      <ModiBox>
        <Input placeholder="Please enter your name"></Input>
        <Input
          placeholder="Cannot Change Your Email"
          disabled
          style={{ backgroundColor: '#d9d9c0' }}
        ></Input>
        <Input placeholder="Please enter your password"></Input>
        <Input placeholder="Check your password"></Input>
      </ModiBox>
      <ModiBox>
        <Button>Submit</Button>
      </ModiBox>
    </ModiContainer>
  );
};

export default UserModi;
