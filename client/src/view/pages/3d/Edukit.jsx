import { Canvas, useLoader, useFrame } from '@react-three/fiber';
import React, { useEffect, useRef, useState, useMemo } from 'react';
import Selector from '../../components/Selector';
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';
import { GUI } from 'dat.gui';
import Stats from 'three/examples/jsm/libs/stats.module';
import Edukit from './loader';
import axios from 'axios';
import Loading from '../../components/Loading';
import { useControls } from 'leva';
import GuiController from './GuiController';
import TextSprite from './TextSprite';
import Gui from './Gui';

const PLC = () => {
  const [loading, setLoading] = useState(true);
  const [webSocket, setWebSocket] = useState(null);
  const [messagePayloadEdukit1, setMessagePayloadEdukit1] = useState(null);
  // const [messagePayloadEnvironment, setMessagePayloadEnvironment] =
  //   useState(null);
  const canvasRef = useRef(null);
  const [borderColor, setBorderColor] = useState({
    r: 255,
    g: 255,
    b: 255,
    a: 1.0,
  });
  const [edukitOnOff, setEdukitOnOff] = useState(0);
  const handleEdukitOnOffChange = (newValue) => {
    setEdukitOnOff(newValue);
    // 값이 변경될 때 수행해야 할 작업을 추가하세요.
  };
  // const guiRef = useRef(null);
  // const test = useMemo(() => {
  //   return {
  //     num1: {
  //       value: 0,
  //       min: -2728,
  //       max: 53294192312,
  //       step: 1,
  //     },
  //     num2: {
  //       value: 0,
  //       min: -2728,
  //       max: 53294192312,
  //       step: 1,
  //     },
  //   };
  // }, []);
  // const model = useControls('test', test);
  const [m3axis1, setM3axis1] = useState(0);
  const [m3axis2, setM3axis2] = useState(0);
  useEffect(() => {
    setLoading(true);
    const canvas = canvasRef.current;
    const scene = new THREE.Scene();
    const edukit = new Edukit();
    edukit.fileload(scene);

    // TEXT SPRITE
    // 1호기
    const message1 = 'On\n자재정상';
    const textSprite1 = new TextSprite(message1, {
      borderColor: borderColor,
      backgroundColor: { r: 0, g: 0, b: 0, a: 1.0 },
      textColor: { r: 255, g: 255, b: 255, a: 1.0 },
      canvasX: 10, // X 좌표 설정
      canvasY: 9, // Y 좌표 설정
      canvasZ: -9, // Z 좌표 설정
    });
    // 2호기
    const message2 = 'On\n부품정상';
    const textSprite2 = new TextSprite(message2, {
      borderColor: { r: 0, g: 245, b: 12, a: 1.0 },
      backgroundColor: { r: 0, g: 0, b: 0, a: 1.0 },
      textColor: { r: 255, g: 255, b: 255, a: 1.0 },
      canvasX: 1.5, // X 좌표 설정
      canvasY: 11, // Y 좌표 설정
      canvasZ: -9, // Z 좌표 설정
    });
    // 3호기
    const message3 = 'Off';
    const textSprite3 = new TextSprite(message3, {
      borderColor: { r: 255, g: 0, b: 0, a: 1.0 },
      backgroundColor: { r: 0, g: 0, b: 0, a: 1.0 },
      textColor: { r: 255, g: 255, b: 255, a: 1.0 },
      canvasX: -7, // X 좌표 설정
      canvasY: 14, // Y 좌표 설정
      canvasZ: -7, // Z 좌표 설정
    });
    // 컬러센서
    const messageC = 'On\n색선별';
    const textSpriteC = new TextSprite(messageC, {
      borderColor: { r: 0, g: 245, b: 12, a: 1.0 },
      backgroundColor: { r: 0, g: 0, b: 0, a: 1.0 },
      textColor: { r: 255, g: 255, b: 255, a: 1.0 },
      canvasX: 5.5, // X 좌표 설정
      canvasY: 4.5, // Y 좌표 설정
      canvasZ: -12, // Z 좌표 설정
    });
    // 비전센서
    const messageV = 'On\n';
    const textSpriteV = new TextSprite(messageV, {
      borderColor: { r: 0, g: 245, b: 12, a: 1.0 },
      backgroundColor: { r: 0, g: 0, b: 0, a: 1.0 },
      textColor: { r: 255, g: 255, b: 255, a: 1.0 },
      canvasX: -3, // X 좌표 설정
      canvasY: 9, // Y 좌표 설정
      canvasZ: -12, // Z 좌표 설정
    });

    scene.add(textSprite1);
    scene.add(textSprite2);
    scene.add(textSprite3);
    scene.add(textSpriteC);
    scene.add(textSpriteV);

    // // 테두리 색상을 업데이트한 후 텍스트 업데이트
    // textSprite1.updateBorderColor({ r: 255, g: 0, b: 255, a: 1.0 });
    // textSprite1.updateText(message1);

    // 카메라
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
    pointLight2.position.x = -30;
    scene.add(pointLight2);
    scene.add(new THREE.PointLightHelper(pointLight2)); // 라이트의 위치를 알려주는 헬퍼
    const control = new OrbitControls(camera, renderer.domElement);

    let requestId = null;

    const [min, max] = [-2728, 53294192312];

    // 3호기 축 움직이기
    const yAxisFunc = (() => {
      return function () {
        // return ((test.num1.value - min) / (max - min)) * 7;
        return M3y;
      };
    })();
    const xAxisFunc = (() => {
      return function () {
        return (
          // ((test.num2.value - min) / (max - min)) * THREE.MathUtils.degToRad(90)
          M3x
        );
      };
    })();

    // // m1OnOff 값이 변경되었을 때에만 textSprite1 업데이트 수행
    // let lastM1OnOff = m1OnOff; // 초기값으로 설정

    const tick = () => {
      renderer.render(scene, camera);
      requestId = requestAnimationFrame(tick);

      camera.updateMatrixWorld();
      camera.updateProjectionMatrix();

      if (edukit.loaded) {
        setLoading(false);
        edukit.actionY(yAxisFunc());
        edukit.actionX(xAxisFunc());
      }

      // if (m1OnOff !== lastM1OnOff) {
      //   lastM1OnOff = m1OnOff; // 현재 값으로 업데이트
      //   console.log('this m1OnOff changed');
      //   if (lastM1OnOff === 1) {
      //     textSprite1.updateText('전원On');
      //     textSprite1.updateBorderColor({ r: 255, g: 0, b: 0, a: 1.0 });
      //   } else if (lastM1OnOff === 0) {
      //     textSprite1.updateText('전원Off');
      //     textSprite1.updateBorderColor({ r: 255, g: 0, b: 255, a: 1.0 });
      //   }
      // }
    };

    tick();

    return () => {
      cancelAnimationFrame(requestId);
    };
  }, []);

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
      // // 환경 데이터
      // if (receivedMessage.topic === 'environment/data') {
      //   setMessagePayloadEnvironment(JSON.parse(receivedMessage.data));
      //   console.log(JSON.parse(receivedMessage.data));
      // }
    });

    return () => {
      ws.close(); // 웹소켓 연결 종료
    };
  }, []);
  const [M3x, setM3x] = useState(0);
  const [M3y, setM3y] = useState(0);
  // const [edukitOnOff, setEdukitOnOff] = useState(0);
  // const [m1OnOff, setM1OnOff] = useState(0);

  useEffect(() => {
    if (webSocket) {
      setM3x(0.5);
      setM3y(20);
      messagePayloadEdukit1.Wrapper?.forEach((item) => {
        // if (item.tagId === '21') {
        //   const convertedValue = parseInt(item.value);
        //   setM3x(convertedValue);
        //   console.log(M3x);
        // }
        // if (item.tagId === '22') {
        //   const convertedValue = parseInt(item.value);
        //   setM3y(convertedValue);
        //   console.log(M3y);
        // }
      });
    }
  }, [messagePayloadEdukit1]);

  return (
    <div>
      {loading ? <Loading /> : null}
      <Gui />
      <GuiController />
      <Selector />
      <div style={{ display: 'flex' }}></div>
      <canvas ref={canvasRef} id="webgl"></canvas>
    </div>
  );
};

export default PLC;
