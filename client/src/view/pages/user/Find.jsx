import React from 'react';
import {
  Box,
  Button,
  Container,
  Input,
  Page,
  Title,
} from '../../components/Components';
const Find = () => {
  return (
    <Page>
      <Container className="login">
        <Title>Find</Title>
        <Box className="find">
          <Input
            className="login"
            type="text"
            placeholder="Please enter your number"
          />
          <Input
            className="login"
            type="text"
            placeholder="Please enter your email"
          />
        </Box>
        <Button className="submit">SUBMIT</Button>
      </Container>
    </Page>
  );
};

export default Find;
