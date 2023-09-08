// import { OrbitControls, Html } from '@react-three/drei';
import { Canvas, useLoader, useFrame } from '@react-three/fiber';
import React, { useEffect, useRef, useState, useMemo } from 'react';
import Selector from '../../components/Selector';
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';
import { GUI } from 'dat.gui';
import Stats from 'three/examples/jsm/libs/stats.module';
import Edukit from './loader';
import axios from 'axios';
import {
  SideBarContainer,
  ArrowBtn,
  Content,
  ControlBox,
} from '../../components/SideBar';
import Loading from '../../components/Loading';
import { useControls } from 'leva';
import GuiController from './GuiController';

const PLC = () => {
  const [loading, setLoading] = useState(true);
  const [num, setNum] = useState(0); // 권한에 따른 제어를 위한 묵데이터
  const [webSocket, setWebSocket] = useState(null);
  const [messagePayload, setMessagePayload] = useState('');
  const [mqttmsg, setMqttmsg] = useState(); // MQTT로 받은 메세지
  const canvasRef = useRef(null);
  // const guiRef = useRef(null);
  useEffect(() => {
    setLoading(true);
    axios
      .get('http://localhost:3001/mock/user.json')
      .then((res) => {
        const userNum = res.data[1].role;
        setNum(userNum);
        console.log(userNum);
      })
      .catch((err) => {
        console.error(err);
      });

    const canvas = canvasRef.current;
    // const canvas = document.querySelector('#webgl');
    const scene = new THREE.Scene();
    const edukit = new Edukit();
    edukit.fileload(scene);
    const camera = new THREE.PerspectiveCamera(
      45,
      window.innerWidth / window.innerHeight,
      0.1,
      1000
    );
    camera.position.x = 0;
    camera.position.z = -60;
    camera.position.y = 15;
    scene.add(camera);
    // scene.add(new THREE.CameraHelper(camera)); // 카메라 헬퍼

    const renderer = new THREE.WebGLRenderer({ canvas: canvas });
    renderer.setPixelRatio(window.devicePixelRatio);
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setClearColor(0xdddddd); // webgl 전체 배경색
    renderer.shadowMap.enabled = true;

    window.addEventListener('resize', () => {
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
    });

    // Light1
    const directionalLight = new THREE.DirectionalLight(0xffffff, 1);
    directionalLight.position.y = 20;
    directionalLight.position.z = -10;
    scene.add(directionalLight);
    scene.add(new THREE.DirectionalLightHelper(directionalLight)); // 라이트의 위치를 알려주는 헬퍼
    // Light2
    const pointLight1 = new THREE.PointLight(0xffffff, 50, 0, 1);
    pointLight1.position.y = 20;
    pointLight1.position.z = -20;
    pointLight1.position.x = 20;
    scene.add(pointLight1);
    scene.add(new THREE.PointLightHelper(pointLight1)); // 라이트의 위치를 알려주는 헬퍼
    // Light3
    const pointLight2 = new THREE.PointLight(0xffffff, 50, 0, 1);
    pointLight2.position.y = 20;
    pointLight2.position.z = -20;
    pointLight2.position.x = -20;
    scene.add(pointLight2);
    scene.add(new THREE.PointLightHelper(pointLight2)); // 라이트의 위치를 알려주는 헬퍼
    const control = new OrbitControls(camera, renderer.domElement);

    let requestId = null;
    const tick = () => {
      renderer.render(scene, camera);
      requestId = requestAnimationFrame(tick);

      camera.updateMatrixWorld();
      camera.updateProjectionMatrix();

      if (edukit.loaded) {
        setLoading(false);
      }
    };
    tick();
    return () => {
      cancelAnimationFrame(requestId);
      //   client.end();
    };
  }, [num]);

  // 웹소켓 설정
  useEffect(() => {
    const ws = new WebSocket('ws://192.168.0.71:8080');

    setWebSocket(ws);

    ws.addEventListener('message', function (event) {
      const receivedMessage = event.data;

      setMessagePayload(JSON.parse(receivedMessage));
      console.log(JSON.parse(receivedMessage));
    });

    return () => {
      ws.close(); // 웹소켓 연결 종료
    };
  }, []);

  // // 데이터 받아오기
  // useFrame((state, delta) => {
  //   // GuiController의 edukitOption 바꾸기
  // });

  // 에듀킷 제어
  const startToEdukit = () => {
    if (webSocket) {
      const data = JSON.stringify({ tagId: '1', value: '1' });
      webSocket.send(data);
      console.log('Data sent to the server: 1');
    }
  };
  const stopToEdukit = () => {
    if (webSocket) {
      const data = JSON.stringify({ tagId: '1', value: '0' });
      webSocket.send(data);
      console.log('Data sent to the server: 0');
    }
  };

  return (
    <div>
      {loading ? <Loading /> : null}
      {/* <button onClick={() => startToEdukit()}>start</button>
      <button onClick={() => stopToEdukit()}>stop</button> */}
      <GuiController messagePayload={messagePayload} />
      <Selector />
      <div style={{ display: 'flex' }}></div>
      <canvas ref={canvasRef} id="webgl"></canvas>
    </div>
  );
};

export default PLC;
