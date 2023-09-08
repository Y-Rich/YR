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

const PLC = () => {
  const [loading, setLoading] = useState(true);
  const [num, setNum] = useState(0); // 권한에 따른 제어를 위한 묵데이터
  const [webSocket, setWebSocket] = useState(null);
  const [messagePayloadEdukit1, setMessagePayloadEdukit1] = useState();
  const [messagePayloadEnvironment, setMessagePayloadEnvironment] = useState();
  const canvasRef = useRef(null);
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
    axios
      .get('http://localhost:3001/mock/user.json')
      .then((res) => {
        const userNum = res.data[1].role;
        setNum(userNum);
      })
      .catch((err) => {
        console.error(err);
      });

    const canvas = canvasRef.current;
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
        return m3axis1;
      };
    })();
    const xAxisFunc = (() => {
      return function () {
        return (
          // ((test.num2.value - min) / (max - min)) * THREE.MathUtils.degToRad(90)
          m3axis2
        );
      };
    })();

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
      const receivedMessage = JSON.parse(event.data);
      console.log(receivedMessage);
      setMessagePayloadEdukit1(receivedMessage);
      // if (receivedMessage.topic === 'edukit1') {
      //   setMessagePayloadEdukit1(receivedMessage.data);
      //   console.log(receivedMessage.data);
      // }
      // if (receivedMessage.topic === 'environment/data') {
      //   setMessagePayloadEnvironment(receivedMessage.data);
      //   console.log(receivedMessage.data);
      // }
    });

    return () => {
      ws.close(); // 웹소켓 연결 종료
    };
  }, []);

  // 3호기 축 값 웹소켓으로 받기
  useEffect(() => {
    messagePayloadEdukit1?.Wrapper?.forEach((item) => {
      if (item.tagId === '21') {
        const convertedValue = parseInt(item.value);
        setM3axis1(convertedValue);
        setM3axis1(convertedValue);
        console.log('M3axis1', convertedValue);
      }
      if (item.tagId === '22') {
        const convertedValue = parseInt(item.value);
        setM3axis2(convertedValue);
        setM3axis2(convertedValue);
        console.log('M3axis2', convertedValue);
      }
    });
  }, [messagePayloadEdukit1]);

  return (
    <div>
      {loading ? <Loading /> : null}
      <GuiController
        messagePayloadEdukit1={messagePayloadEdukit1}
        webSocket={webSocket}
      />
      <Selector />
      <div style={{ display: 'flex' }}></div>
      <canvas ref={canvasRef} id="webgl"></canvas>
    </div>
  );
};

export default PLC;
