import React from 'react';
import { Button, Input, Title } from '../../components/Components';
import { ModiBox, ModiContainer } from './style';

const UserModi = () => {
  return (
    <ModiContainer>
      <ModiBox>
        <Title>User Modi</Title>
      </ModiBox>
      <ModiBox>
        <Input placeholder="name"></Input>
        <Input
          placeholder="email"
          disabled
          style={{ backgroundColor: '#d9d9c0' }}
        ></Input>
        <Input placeholder="password"></Input>
        <Input placeholder="passwordcheck"></Input>
      </ModiBox>
      <ModiBox>
        <Button>Submit</Button>
      </ModiBox>
    </ModiContainer>
  );
};

export default UserModi;
