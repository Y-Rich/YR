import { connect } from 'mqtt';

const options = {
  // username: "xxxxxxxxx",
  // password: "xxxxxxxx",
  keepalive: 20,
  clientId: 'mqttjs_' + Math.random().toString(16).substr(2, 8),
};
const client = connect('ws://localhost:1884', options); // MQTT 브로커의 주소와 포트 (TCP 프로토콜 사용)

// 연결+구독
export function initializeMqtt(topicsToSubscribe) {
  return new Promise((resolve, reject) => {
    client.on('connect', () => {
      console.log('MQTT connected');
      // 여러 개의 토픽에 대한 구독을 설정합니다.
      topicsToSubscribe.forEach((topic) => {
        client.subscribe(topic, (err) => {
          if (err) {
            console.error(`Subscribe error for topic ${topic}:`, err);
            reject(err);
          } else {
            console.log(`Subscribed to ${topic}`);
          }
        });
      });
      resolve(client);
    });
  });
}

// 구독시 들어오는 메세지
export function receiveMqttMessage(client) {
  return new Promise((resolve, reject) => {
    client.on('message', function (topic, message) {
      const note = JSON.stringify(message);
      console.log(`Received message on topic ${topic}: ${note}`);
      resolve({ topic, note });
    });
  });
}

// 발행
export function publishMqttMessage(topic, message) {
  return new Promise((resolve, reject) => {
    client.publish(topic, message, (err) => {
      if (err) {
        console.error('Publish error:', err);
        reject(err);
      } else {
        console.log(`Published message to ${topic}: ${message}`);
        resolve();
      }
    });
  });
}

// 연결 끊기
export function disconnectMqtt() {
  client.end();
  console.log('MQTT disconnected');
}

// 다른 컴포넌트에서 사용 예시 코드
// import React, { useEffect, useState } from 'react';
// import { initializeMqtt, receiveMqttMessage, publishMqttMessage, disconnectMqtt } from './mqttService'; // mqttService 파일 경로를 적절히 지정해야 합니다.

// function MqttComponent() {
//   const [note, setNote] = useState('');
//   const [messageToSend, setMessageToSend] = useState('');

//   useEffect(() => {
//     const topicsToSubscribe = ['topic1', 'topic2']; // 구독할 토픽 목록
//     initializeMqtt(topicsToSubscribe)
//       .then((client) => receiveMqttMessage(client))
//       .then((receivedData) => {
//         const { topic, note } = receivedData;
//         // 이제 topic에 따라 처리할 수 있습니다.
//         if (topic === 'topic1') {
//           // topic1에 대한 처리
//         } else if (topic === 'topic2') {
//           // topic2에 대한 처리
//         }
//       })
//       .catch((error) => console.error('MQTT Error:', error));

//     // 컴포넌트가 언마운트될 때 MQTT 연결 종료
//     return () => {
//       disconnectMqtt();
//     };
//   }, []);

//   // MQTT 메시지를 발행하는 함수
//   const handlePublish = () => {
//     if (messageToSend) {
//       publishMqttMessage('my/topic', messageToSend)
//         .then(() => setMessageToSend(''))
//         .catch((error) => console.error('MQTT Publish Error:', error));
//     }
//   };

//   return (
//     <div>
//       <p>Received MQTT message: {note}</p>
//       <input
//         type="text"
//         placeholder="Enter message to publish"
//         value={messageToSend}
//         onChange={(e) => setMessageToSend(e.target.value)}
//       />
//       <button onClick={handlePublish}>Publish</button>
//     </div>
//   );
// }

// export default MqttComponent;
