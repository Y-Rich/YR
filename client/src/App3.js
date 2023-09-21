import React, { useState, Fragment, useEffect } from 'react';
import './App.css';
import {
  initializeMqtt,
  receiveMqttMessage,
  publishMqttMessage,
  disconnectMqtt,
} from './services/mqttService';

function App() {
  const [note, setNote] = useState('');
  const [messageToSend, setMessageToSend] = useState('');

  useEffect(() => {
    const topicsToSubscribe = ['publishtopic']; // 구독할 토픽 목록
    initializeMqtt(topicsToSubscribe)
      .then((client) => receiveMqttMessage(client))
      .then((receivedData) => {
        const { topic, note } = receivedData;
        // 이제 topic에 따라 처리할 수 있습니다.
        if (topic === 'publishtopic') {
          // topic1에 대한 처리
          console.log(note);
          setNote(note);
        } else if (topic === 'topic2') {
          // topic2에 대한 처리
        }
      })
      .catch((error) => console.error('MQTT Error:', error));

    // 컴포넌트가 언마운트될 때 MQTT 연결 종료
    return () => {
      disconnectMqtt();
    };
  }, []);

  // MQTT 메시지를 발행하는 함수
  const handlePublish = () => {
    if (messageToSend) {
      publishMqttMessage('test1', messageToSend)
        .then(() => setMessageToSend(''))
        .catch((error) => console.error('MQTT Publish Error:', error));
    }
  };

  return (
    <div>
      <p>Received MQTT message: {note}</p>
      <input
        type="text"
        placeholder="Enter message to publish"
        value={messageToSend}
        onChange={(e) => setMessageToSend(e.target.value)}
      />
      <button onClick={handlePublish}>Publish</button>
    </div>
  );
}
export default App;
