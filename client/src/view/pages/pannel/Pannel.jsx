import React, { useEffect, useState } from 'react';
import Selector from '../../components/Selector';
import { Page, Box, Container, Content, Dice, Section, Title } from './style';
import { info } from '../../../services/user';

const Pannel = () => {
  const num1 = 1;
  const num2 = 2;
  const num3 = 3;

  return (
    <Page>
      <Container>
        <Box>
          <Section>
            <Title>현재 공정 반복 시간</Title>
            <Content>55㎳</Content>
          </Section>
          <Section>
            <Title>생산 리미트</Title>
            <Content>10개</Content>
          </Section>
          <Section className="col">
            <Title>공정 반복 횟수</Title>
            <Content>1호기: {num1} 회</Content>
            <Content>2호기: {num2} 회</Content>
            <Content>3호기: {num3} 회</Content>
          </Section>
        </Box>
        <Box>
          <Section>
            <Section className="middle">
              <Title>미세먼지</Title>
              <Content>10㎍/㎥</Content>
            </Section>
            <Section className="middle">
              <Section>
                <Title>온도</Title>
                <Content>25℃</Content>
              </Section>
              <Section>
                <Title>습도</Title>
                <Content>30%</Content>
              </Section>
            </Section>
          </Section>

          <Section>
            <Title>양품 조건</Title>
            <Content>5 이상</Content>
          </Section>
          <Section className="col">
            <Title>현재 주사위 상황</Title>
            <Dice src="./assets/dice.png" />
            {/* <Content className="dice">gkdnl</Content> */}
          </Section>
        </Box>
        <Selector />
      </Container>
    </Page>
  );
};

export default Pannel;
