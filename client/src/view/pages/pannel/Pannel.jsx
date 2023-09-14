import React, { useEffect, useState } from 'react';
import Selector from '../../components/Selector';
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
import GaugeChart from 'react-gauge-chart';
import Loading from '../../components/Loading';
import { CircularProgressbarWithChildren } from 'react-circular-progressbar';
import { Progress, ProgressBar } from '../../components/Components';

const Pannel = (props) => {
  const [loading, setLoading] = useState(true);

  // 웹소켓 데이터
  const { messagePayloadEdukit1, webSocket, messagePayloadEnvironment } =
    props.props;

  // 받은 데이터
  const [No1Delay, setNo1Delay] = useState('준비중...');
  const [No1Count, setNo1Count] = useState('준비중...');
  const [No2Count, setNo2Count] = useState('준비중...');
  const [No3Count, setNo3Delay] = useState('준비중...');
  const [OutputLimit, setOutputLimit] = useState('준비중...');
  const [DiceValue, setDiceValue] = useState('준비중...');
  const [DiceComparisonValue, setDiceComparisonValue] = useState('준비중...');
  const [Temperature, setTemperature] = useState('준비중...');
  const [Humidity, setHumidity] = useState('준비중...');
  const [Particulates, setParticulates] = useState('준비중...');

  //데이터 설정
  useEffect(() => {
    if (webSocket) {
      setLoading(false);
      messagePayloadEdukit1.Wrapper?.forEach((item) => {
        if (item.tagId === '14') {
          const convertedValue = parseInt(item.value) * 10;
          setNo1Delay(convertedValue.toString());
        }
        if (item.tagId === '15') {
          const convertedValue = item.value;
          setNo1Count(convertedValue);
        }
        if (item.tagId === '16') {
          const convertedValue = item.value;
          setNo2Count(convertedValue);
        }
        if (item.tagId === '17') {
          const convertedValue = item.value;
          setNo3Delay(convertedValue);
        }
        if (item.tagId === '36') {
          const convertedValue = item.value;
          setOutputLimit(convertedValue);
        }
        if (item.tagId === '37') {
          const convertedValue = item.value;
          setDiceValue(convertedValue);
        }
        if (item.tagId === '38') {
          const convertedValue = item.value;
          setDiceComparisonValue(convertedValue);
        }
      });
    }
  }, [messagePayloadEdukit1]);

  useEffect(() => {
    if (webSocket) {
      // console.log('here');
      console.log(messagePayloadEnvironment);
      setTemperature(messagePayloadEnvironment?.Temperature);
      setHumidity(messagePayloadEnvironment?.Humidity);
      setParticulates(messagePayloadEnvironment?.Particulates);
    }
  }, [messagePayloadEnvironment]);

  return (
    <Page>
      {/* // {loading ? <Loading /> : null} */}
      <Container className="top">
        <Box className="top left">
          <Section className="top left">
            <Title>목표 생산량</Title>
            <Content>{OutputLimit}개</Content>
          </Section>
          <Section>
            <Progress className="pannel top">
              <ProgressBar style={{ width: `${No3Count}%` }}></ProgressBar>
            </Progress>
          </Section>
          <Section className="top left">
            <Title>목표 생산량</Title>
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
            {/* <Content>{Temperature}℃</Content> */}
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
            {/* <Content>{Humidity}%</Content> */}
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
          {/* <Progress>
            <ProgressBar style={{ width: `${No1Delay}%` }}></ProgressBar>
          </Progress> */}
          <GaugeChart
            nrOfLevels={420}
            arcsLength={[0.3, 0.5, 0.2]}
            animate={false}
            hideText={true}
            // animDelay="10000"
            // animateDuration="10000"
            colors={['#5BE12C', '#F5CD19', '#EA4228']}
            percent={No1Delay * 0.1}
            arcPadding={0.02}
          />
          {/* <GaugeChart
            id="gauge-chart6"
            animate={false}
            nrOfLevels={15}
            percent={No1Delay * 0.01}
            needleColor="#345243"
          /> */}
          {/* </Section> */}
        </Box>
        <Box className="bottom right">
          <Section className="bottom right">
            <Title className="bottom right">양품 조건</Title>
            <Content>{DiceComparisonValue} 이상</Content>
          </Section>
          <Section className="bottom right">
            <Title className="bottom right">현재 주사위 상황</Title>
            <Dice src="./assets/dice.png" alt={` ${DiceValue}`} />
            {/* <Content className="dice">gkdnl</Content> */}
          </Section>
        </Box>
      </Container>
    </Page>
  );
};

export default Pannel;
