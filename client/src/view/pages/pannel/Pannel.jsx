import React, { useEffect, useState } from 'react';
import Selector from '../../components/Selector';
import { Page, Box, Container, Content, Dice, Section, Title } from './style';
import { info } from '../../../services/user';
import Loading from '../../components/Loading';

const Pannel = (props) => {
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState('');
  const [userName, setUserName] = useState('');
  const [position, setPosition] = useState('');
  const [facilities, setFacilities] = useState([]);
  const [lines, setLines] = useState([]);

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
      setTemperature(messagePayloadEnvironment?.Temperature);
      setHumidity(messagePayloadEnvironment?.Humidity);
    }
  }, [messagePayloadEnvironment]);

  useEffect(() => {
    try {
      info().then((res) => {
        setUserName(res.name);
        const userPosition = res.Position.positionName.toString();
        setUser(userPosition);
        const facMatches = user.match(/fac\d+/g) || [];
        const lineMatches = user.match(/line\d+/g) || [];
        setFacilities(facMatches);
        setLines(lineMatches);
        if (userPosition.includes('manager')) {
          setPosition('manager');
        } else if (userPosition.includes('supervisor')) {
          setPosition('supervisor');
        } else if (userPosition.includes('worker')) {
          setPosition('worker');
        }
      });
    } catch (error) {
      console.error('Failed to loading:', error);
      throw error;
    }
  }, [user]);

  sessionStorage.setItem('userName', userName);
  sessionStorage.setItem('position', position);
  sessionStorage.setItem('facilities', facilities);
  sessionStorage.setItem('lines', lines);

  return (
    <Page>
      {/* {loading ? <Loading /> : null} */}
      <Container>
        <Box>
          <Section>
            <Title>현재 공정 반복 시간</Title>
            <Content>{No1Delay}㎳</Content>
          </Section>
          <Section>
            <Title>생산 리미트</Title>
            <Content>{OutputLimit}개</Content>
          </Section>
          <Section className="col">
            <Title>공정 반복 횟수</Title>
            <Content>1호기: {No1Count} 회</Content>
            <Content>2호기: {No2Count} 회</Content>
            <Content>3호기: {No3Count} 회</Content>
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
                <Content>{Temperature}℃</Content>
              </Section>
              <Section>
                <Title>습도</Title>
                <Content>{Humidity}%</Content>
              </Section>
            </Section>
          </Section>

          <Section>
            <Title>양품 조건</Title>
            <Content>{DiceComparisonValue} 이상</Content>
          </Section>
          <Section className="col">
            <Title>현재 주사위 상황</Title>
            <Dice src="./assets/dice.png" alt={` ${DiceValue}`} />
            {/* <Content className="dice">gkdnl</Content> */}
          </Section>
        </Box>
        <Selector />
      </Container>
    </Page>
  );
};

export default Pannel;
