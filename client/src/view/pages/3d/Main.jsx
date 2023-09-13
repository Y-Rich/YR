import React, { useEffect, useState } from 'react';
import PLC from './Edukit';
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
  const [messagePayloadEnvironment, setMessagePayloadEnvironment] =
    useState(null);

  // 웹소켓 설정
  useEffect(() => {
    const ws = new WebSocket('ws://192.168.0.71:8080');

    setWebSocket(ws);

    ws.addEventListener('message', function (event) {
      const receivedMessage = JSON.parse(event.data);
      // console.log(receivedMessage);
      // setMessagePayloadEdukit1(receivedMessage);
      if (receivedMessage.topic === 'edukit1') {
        setMessagePayloadEdukit1(JSON.parse(receivedMessage.data));
        console.log(JSON.parse(receivedMessage.data));
      }
      // 환경 데이터
      if (receivedMessage.topic === 'environment/data') {
        setMessagePayloadEnvironment(JSON.parse(receivedMessage.data));
        console.log(JSON.parse(receivedMessage.data));
      }
    });

    return () => {
      ws.close(); // 웹소켓 연결 종료
    };
  }, []);

  const props = {
    webSocket,
    messagePayloadEdukit1,
    messagePayloadEnvironment,
  };

  return (
    <div>
      {selected === 'plc' && <PLC props={props} />}
      {selected === 'chart' && <Chart />}
      {selected === 'pannel' && <Pannel props={props} />}
      <Selector onPageChange={handleSelect} />
    </div>
  );
};

export default Main;
