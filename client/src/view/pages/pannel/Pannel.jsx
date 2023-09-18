import React, { useEffect, useState } from 'react';
import { Page } from './style';
import Slider from 'react-slick';
import Loading from '../../components/Loading';
import FacPannel from './FacPannel';
import { Dots, DotsContainer, Slide } from '../../components/Components';

const Pannel = (props) => {
  const [loading, setLoading] = useState(true);
  const settings = {
    dots: true,
    fade: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    appendDots: (dots) => (
      <DotsContainer>
        <ul style={{ margin: '0px' }}> {dots} </ul>
      </DotsContainer>
    ),
    customPaging: (i) => (
      <Dots>
        {position === 'manager'
          ? ['1', '2'][i]
          : facilities === 'fac1'
          ? ['1'][i]
          : facilities === 'fac2'
          ? ['2'][i]
          : null}
      </Dots>
    ),
  };

  // const position = sessionStorage.getItem('position');
  const position = 'manager';
  const facilities = sessionStorage.getItem('facilities');

  // 웹소켓 데이터
  const {
    messagePayloadEdukit1,
    webSocket,
    messagePayloadEnvironment1,
    messagePayloadEdukit2,
    messagePayloadEnvironment2,
  } = props.props;
  const [f1Info, setF1Info] = useState({
    No1Delay: '준비중...',
    No1Count: '준비중...',
    No2Count: '준비중...',
    No3Count: '준비중...',
    OutputLimit: '준비중...',
    DiceValue: '준비중...',
    DiceComparisonValue: '준비중...',
    Temperature: '준비중...',
    Humidity: '준비중...',
    Particulates: '준비중...',
  });
  const [f2Info, setF2Info] = useState({
    No1Delay: '준비중...',
    No1Count: '준비중...',
    No2Count: '준비중...',
    No3Count: '준비중...',
    OutputLimit: '준비중...',
    DiceValue: '준비중...',
    DiceComparisonValue: '준비중...',
    Temperature: '준비중...',
    Humidity: '준비중...',
    Particulates: '준비중...',
  });
  // 받은 데이터
  // const [No1Delay, setNo1Delay] = useState('준비중...');
  // const [No1Count, setNo1Count] = useState('준비중...');
  // const [No2Count, setNo2Count] = useState('준비중...');
  // const [No3Count, setNo3Delay] = useState('준비중...');
  // const [OutputLimit, setOutputLimit] = useState('준비중...');
  // const [DiceValue, setDiceValue] = useState('준비중...');
  // const [DiceComparisonValue, setDiceComparisonValue] = useState('준비중...');
  // const [Temperature, setTemperature] = useState('준비중...');
  // const [Humidity, setHumidity] = useState('준비중...');
  // const [Particulates, setParticulates] = useState('준비중...');
  // const updateF1Info = (fieldName, value) => {
  //   setF1Info((prevF1Info) => ({
  //     ...prevF1Info,
  //     [fieldName]: value,
  //   }));
  // };
  //데이터 설정
  useEffect(() => {
    if (webSocket) {
      messagePayloadEdukit1?.Wrapper?.forEach((item) => {
        if (item.tagId === '14') {
          const convertedValue = parseInt(item.value) * 10;
          setF1Info((prevF1Info) => ({
            ...prevF1Info,
            No1Delay: convertedValue.toString(),
          }));
        }
        if (item.tagId === '15') {
          const convertedValue = item.value;
          setF1Info((prevF1Info) => ({
            ...prevF1Info,
            No1Count: convertedValue,
          }));
        }
        if (item.tagId === '16') {
          const convertedValue = item.value;
          setF1Info((prevF1Info) => ({
            ...prevF1Info,
            No2Count: convertedValue,
          }));
        }
        if (item.tagId === '17') {
          const convertedValue = item.value;
          setF1Info((prevF1Info) => ({
            ...prevF1Info,
            No3Count: convertedValue,
          }));
        }
        if (item.tagId === '36') {
          const convertedValue = item.value;
          setF1Info((prevF1Info) => ({
            ...prevF1Info,
            OutputLimit: convertedValue,
          }));
        }
        if (item.tagId === '37') {
          const convertedValue = item.value;
          setF1Info((prevF1Info) => ({
            ...prevF1Info,
            DiceValue: convertedValue,
          }));
        }
        if (item.tagId === '38') {
          const convertedValue = item.value;
          setF1Info((prevF1Info) => ({
            ...prevF1Info,
            DiceComparisonValue: convertedValue,
          }));
        }
      });
    }
  }, [messagePayloadEdukit1]);

  useEffect(() => {
    if (webSocket) {
      // console.log(messagePayloadEnvironment1);
      setF1Info((prevF1Info) => ({
        ...prevF1Info,
        Temperature: messagePayloadEnvironment1?.Temperature,
        Humidity: messagePayloadEnvironment1?.Humidity,
        Particulates: messagePayloadEnvironment1?.Particulates,
      }));
      setLoading(false);
    }
  }, [messagePayloadEnvironment1]);

  useEffect(() => {
    if (webSocket) {
      messagePayloadEdukit2?.Wrapper?.forEach((item) => {
        if (item.tagId === '14') {
          const convertedValue = parseInt(item.value) * 10;
          setF2Info((prevF2Info) => ({
            ...prevF2Info,
            No1Delay: convertedValue.toString(),
          }));
        }
        if (item.tagId === '15') {
          const convertedValue = item.value;
          setF2Info((prevF2Info) => ({
            ...prevF2Info,
            No1Count: convertedValue,
          }));
        }
        if (item.tagId === '16') {
          const convertedValue = item.value;
          setF2Info((prevF2Info) => ({
            ...prevF2Info,
            No2Count: convertedValue,
          }));
        }
        if (item.tagId === '17') {
          const convertedValue = item.value;
          setF2Info((prevF2Info) => ({
            ...prevF2Info,
            No3Count: convertedValue,
          }));
        }
        if (item.tagId === '36') {
          const convertedValue = item.value;
          setF2Info((prevF2Info) => ({
            ...prevF2Info,
            OutputLimit: convertedValue,
          }));
        }
        if (item.tagId === '37') {
          const convertedValue = item.value;
          setF2Info((prevF2Info) => ({
            ...prevF2Info,
            DiceValue: convertedValue,
          }));
        }
        if (item.tagId === '38') {
          const convertedValue = item.value;
          setF2Info((prevF2Info) => ({
            ...prevF2Info,
            DiceComparisonValue: convertedValue,
          }));
        }
      });
    }
  }, [messagePayloadEdukit2]);

  useEffect(() => {
    if (webSocket) {
      // console.log(messagePayloadEnvironment1);
      setF2Info((prevF2Info) => ({
        ...prevF2Info,
        Temperature: messagePayloadEnvironment1?.Temperature,
        Humidity: messagePayloadEnvironment1?.Humidity,
        Particulates: messagePayloadEnvironment1?.Particulates,
      }));
      setLoading(false);
    }
  }, [messagePayloadEnvironment2]);

  return (
    <Slide>
      {/* {loading ? <Loading /> : null} */}
      {position === 'manager' && (
        <Slider {...settings}>
          <FacPannel
            facName="공장 1"
            OutputLimit={f1Info.OutputLimit}
            No3Count={f1Info.No3Count}
            Particulates={f1Info.Particulates}
            Temperature={f1Info.Temperature}
            Humidity={f1Info.Humidity}
            No1Count={f1Info.No1Count}
            No2Count={f1Info.No2Count}
            No1Delay={f1Info.No1Delay}
            DiceComparisonValue={f1Info.DiceComparisonValue}
            DiceValue={f1Info.DiceValue}
          />
          <FacPannel
            facName="공장 2"
            OutputLimit={f2Info.OutputLimit}
            No3Count={f2Info.No3Count}
            Particulates={f2Info.Particulates}
            Temperature={f2Info.Temperature}
            Humidity={f2Info.Humidity}
            No1Count={f2Info.No1Count}
            No2Count={f2Info.No2Count}
            No1Delay={f2Info.No1Delay}
            DiceComparisonValue={f2Info.DiceComparisonValue}
            DiceValue={f2Info.DiceValue}
          />
        </Slider>
      )}
      {(position === 'supervisior' || position === 'worker') && (
        <Slider {...settings}>
          {facilities === 'fac1' && (
            <FacPannel
              facName="공장 1"
              OutputLimit={f1Info.OutputLimit}
              No3Count={f1Info.No3Count}
              Particulates={f1Info.Particulates}
              Temperature={f1Info.Temperature}
              Humidity={f1Info.Humidity}
              No1Count={f1Info.No1Count}
              No2Count={f1Info.No2Count}
              No1Delay={f1Info.No1Delay}
              DiceComparisonValue={f1Info.DiceComparisonValue}
              DiceValue={f1Info.DiceValue}
            />
          )}
          {facilities === 'fac2' && (
            <FacPannel
              facName="공장 2"
              OutputLimit={f2Info.OutputLimit}
              No3Count={f2Info.No3Count}
              Particulates={f2Info.Particulates}
              Temperature={f2Info.Temperature}
              Humidity={f2Info.Humidity}
              No1Count={f2Info.No1Count}
              No2Count={f2Info.No2Count}
              No1Delay={f2Info.No1Delay}
              DiceComparisonValue={f2Info.DiceComparisonValue}
              DiceValue={f2Info.DiceValue}
            />
          )}
        </Slider>
      )}
    </Slide>
  );
};

export default Pannel;
