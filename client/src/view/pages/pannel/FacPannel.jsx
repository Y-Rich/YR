import React from 'react';
import {
  Page,
  Box,
  Container,
  Content,
  Dice,
  Section,
  Title,
  ContentBox,
} from './style';
import { Progress, ProgressBar } from '../../components/Components';
import GaugeChart from 'react-gauge-chart';
import { CircularProgressbarWithChildren } from 'react-circular-progressbar';

const FacPannel = ({
  facName,
  OutputLimit,
  No3Count,
  Particulates,
  Temperature,
  Humidity,
  No1Count,
  No2Count,
  No1Delay,
  DiceComparisonValue,
  DiceValue,
}) => {
  const [min, max] = [60, 220];
  const gauge = (No1Delay) => {
    return (No1Delay - min) / (max - min);
  };
  return (
    <>
      <Container className="top">
        <Box className="top left">
          <Section className="top left">
            <Title className="fac">{facName}</Title>
            <Title>목표 생산량</Title>
            <Content>{OutputLimit}개</Content>
          </Section>
          <Section>
            <Progress className="pannel top">
              <ProgressBar style={{ width: `${No3Count}%` }}></ProgressBar>
            </Progress>
          </Section>
          <Section className="top left">
            <Title>현재 생산량</Title>
            <Content>{No3Count}개</Content>
          </Section>
        </Box>
        <Box className="top right">
          <Section className="top right">
            <Title className="top right">미세먼지</Title>
            <CircularProgressbarWithChildren
              value={Particulates * 100}
              strokeWidth={20}
              styles={{
                root: { height: '21vh' },
                path: {
                  stroke: '#4fce84',
                  strokeWidth: '15px',
                  strokeLinecap: 'butt',
                  transition: 'stroke-dashoffset 0.5s ease 0s',
                },

                trail: {
                  strokeWidth: '15px',
                  stroke: '#d7d7d7',
                },
                text: {
                  fill: '#333333',
                  fontSize: '18px',
                },
                background: {
                  fill: '#3e98c7',
                },
              }}
            >
              {Particulates}㎍/㎥
            </CircularProgressbarWithChildren>
            {/* <Content>10㎍/㎥</Content> */}
          </Section>
          <Section className="top right">
            <Title className="top right">온도</Title>
            <CircularProgressbarWithChildren
              value={Temperature}
              strokeWidth={20}
              styles={{
                root: { height: '21vh' },
                path: {
                  stroke: '#4fce84',
                  strokeWidth: '15px',
                  strokeLinecap: 'butt',
                  transition: 'stroke-dashoffset 0.5s ease 0s',
                },

                trail: {
                  strokeWidth: '15px',
                  stroke: '#d7d7d7',
                },
                text: {
                  fill: '#333333',
                  fontSize: '18px',
                },
                background: {
                  fill: '#3e98c7',
                },
              }}
            >
              {Temperature}℃
            </CircularProgressbarWithChildren>
          </Section>
          <Section className="top right">
            <Title className="top right">습도</Title>
            <CircularProgressbarWithChildren
              value={Humidity}
              strokeWidth={20}
              styles={{
                root: { height: '21vh' },
                path: {
                  stroke: '#4fce84',
                  strokeWidth: '15px',
                  strokeLinecap: 'butt',
                  transition: 'stroke-dashoffset 0.5s ease 0s',
                },

                trail: {
                  strokeWidth: '15px',
                  stroke: '#d7d7d7',
                },
                text: {
                  fill: '#333333',
                  fontSize: '18px',
                },
                background: {
                  fill: '#3e98c7',
                },
              }}
            >
              {Humidity}%
            </CircularProgressbarWithChildren>
          </Section>
        </Box>
      </Container>
      <Container className="bottom">
        <Box className="bottom left">
          <Title className="bottom left">공정 반복 횟수</Title>
          <Section className="bottom left">
            <ContentBox>
              <Content className="bottom left">1호기</Content>
              <Content className="bottom left">{No1Count} 회</Content>
            </ContentBox>
            <Progress className="pannel bottom">
              <ProgressBar style={{ width: `${No1Count * 5}%` }}></ProgressBar>
            </Progress>
          </Section>
          <Section className="bottom left">
            <ContentBox>
              <Content className="bottom left">2호기</Content>
              <Content className="bottom left">{No2Count} 회</Content>
            </ContentBox>
            <Progress className="pannel bottom">
              <ProgressBar style={{ width: `${No2Count * 5}%` }}></ProgressBar>
            </Progress>
          </Section>
          <Section className="bottom left">
            <ContentBox>
              <Content className="bottom left">3호기</Content>
              <Content className="bottom left">{No3Count} 회</Content>
            </ContentBox>
            <Progress className="pannel bottom">
              <ProgressBar style={{ width: `${No3Count * 5}%` }}></ProgressBar>
            </Progress>
          </Section>
        </Box>
        <Box className="bottom middle">
          {/* <Section className="bottom middle"> */}
          <Title className="bottom middle">현재 공정 반복 시간</Title>
          <Content className="bottom middle">{No1Delay}㎳</Content>
          <GaugeChart
            nrOfLevels={420}
            arcsLength={[0.6, 0.2, 0.1]}
            animate={false}
            hideText={true}
            colors={['#5BE12C', '#F5CD19', '#EA4228']}
            percent={gauge(No1Delay)}
            arcPadding={0.02}
          />
        </Box>
        <Box className="bottom right">
          <Section className="bottom right">
            <Title className="bottom right">양품 조건</Title>
            <Content>{DiceComparisonValue} 이상</Content>
          </Section>
          <Section className="bottom right">
            <Title className="bottom right">현재 주사위 상황</Title>
            {DiceValue === '1' && (
              <Dice src="./diceImg/cubes_gambling_1.png" alt={`${DiceValue}`} />
            )}
            {DiceValue === '2' && (
              <Dice src="./diceImg/cubes_gambling_2.png" alt={`${DiceValue}`} />
            )}
            {DiceValue === '3' && (
              <Dice src="./diceImg/cubes_gambling_3.png" alt={`${DiceValue}`} />
            )}
            {DiceValue === '4' && (
              <Dice src="./diceImg/cubes_gambling_4.png" alt={`${DiceValue}`} />
            )}
            {DiceValue === '5' && (
              <Dice src="./diceImg/cubes_gambling_5.png" alt={`${DiceValue}`} />
            )}
            {DiceValue === '6' && (
              <Dice src="./diceImg/cubes_gambling_6.png" alt={`${DiceValue}`} />
            )}
            {DiceValue === '0' && (
              <Content className="no_dice">읽은 값 없음</Content>
            )}

            {/* <Content className="dice">gkdnl</Content> */}
          </Section>
        </Box>
      </Container>
    </>
  );
};

export default FacPannel;
