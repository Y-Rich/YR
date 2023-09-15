import React, { useEffect, useState } from 'react';
import PLC1 from './Edukit1';
import PLC2 from './Edukit2';
import Selector from '../../components/Selector';
import Pannel from '../pannel/Pannel';
import Chart from '../chart/Chart';

const Main = () => {
  const [selected, setSelected] = useState('pannel');
  const handleSelect = (option) => {
    setSelected(option);
  };
  const [webSocket, setWebSocket] = useState(null);
  const [messagePayloadEdukit1, setMessagePayloadEdukit1] = useState(null);
  const [messagePayloadEnvironment1, setMessagePayloadEnvironment1] =
    useState(null);
  const [messagePayloadEdukit2, setMessagePayloadEdukit2] = useState(null);
  const [messagePayloadEnvironment2, setMessagePayloadEnvironment2] =
    useState(null);

  // 웹소켓 설정
  useEffect(() => {
    const ws = new WebSocket('ws://192.168.0.71:8080');

    setWebSocket(ws);

    ws.addEventListener('message', function (event) {
      const receivedMessage = JSON.parse(event.data);

      // 공장1
      if (receivedMessage.topic === 'edukit1') {
        setMessagePayloadEdukit1(JSON.parse(receivedMessage.data));
        // console.log('1공장', JSON.parse(receivedMessage.data));
      }
      // 환경 데이터
      if (receivedMessage.topic === 'edukit1/environment/data') {
        setMessagePayloadEnvironment1(JSON.parse(receivedMessage.data));
        // console.log('1공장', JSON.parse(receivedMessage.data));
      }

      // 공장2
      if (receivedMessage.topic === 'edukit2') {
        setMessagePayloadEdukit2(JSON.parse(receivedMessage.data));
        // console.log('2공장', JSON.parse(receivedMessage.data));
      }
      // 환경 데이터
      if (receivedMessage.topic === 'edukit2/environment/data') {
        setMessagePayloadEnvironment2(JSON.parse(receivedMessage.data));
        // console.log('2공장', JSON.parse(receivedMessage.data));
      }
    });

    return () => {
      ws.close(); // 웹소켓 연결 종료
    };
  }, []);

  const props = {
    webSocket,
    messagePayloadEdukit1,
    messagePayloadEnvironment1,
    messagePayloadEdukit2,
    messagePayloadEnvironment2,
  };

  // 권한 가져오기
  const facilities = sessionStorage.getItem('facilities');
  // console.log('현재 속한 공장은', facilities);

  return (
    <div>
      {selected === 'plc1' && <PLC1 props={props} />}
      {selected === 'plc2' && <PLC2 props={props} />}
      {selected === 'chart' && <Chart />}
      {selected === 'pannel' && <Pannel props={props} />}
      <Selector onPageChange={handleSelect} />
    </div>
  );
};

export default Main;
