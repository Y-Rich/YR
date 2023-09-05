import React, { useEffect, useRef, useState } from 'react';
import Selector from '../../components/Selector';
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';
import { RectAreaLightHelper } from 'three/examples/jsm/helpers/RectAreaLightHelper';
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

const PLC = () => {
  const [num, setNum] = useState(0); // 권한에 따른 제어를 위한 묵데이터
  const [webSocket, setWebSocket] = useState(null);
  const [messagePayload, setMessagePayload] = useState('');
  const [mqttmsg, setMqttmsg] = useState(); // MQTT로 받은 메세지

  useEffect(() => {
    axios
      .get('http://localhost:3001/mock/user.json')
      .then((res) => {
        setNum(res.data[2].role);
        console.log(res.data[2].role);
      })
      .catch((err) => {
        console.err(err);
      });

    const canvas = document.querySelector('#webgl');
    const scene = new THREE.Scene();
    const edukit = new Edukit();
    edukit.fileload(scene);
    const camera = new THREE.PerspectiveCamera(
      45,
      window.innerWidth / window.innerHeight,
      0.1,
      1000
    );
    camera.position.x = 20;
    camera.position.z = 20;
    camera.position.y = 10;
    scene.add(camera);

    const gui = new GUI({ autoPlace: false });
    document.querySelector('.control').appendChild(gui.domElement);

    const stats = new Stats();
    document.querySelector('.control').appendChild(stats.dom);

    const object = {
      num: -2728,
      num2: 0,
    };

    const [min, max] = [-2728, 53294192312];
    const yAxisFunc = (() => {
      return function () {
        return ((object.num - min) / (max - min)) * 7;
      };
    })();
    const xAxisFunc = (() => {
      return function () {
        return (
          ((object.num2 - min) / (max - min)) * THREE.MathUtils.degToRad(90)
        );
      };
    })();
    if (num === 4) {
      console.log(num);
      const folder1 = gui.addFolder('1호기 제어');
      folder1.add(object, 'num', min, max, 0.1).name('rangebar').listen();
      folder1.add(object, 'num2', min, max, 0.01).name('rangebar2').listen();

      const folder2 = gui.addFolder('2호기 제어');
      folder2.add(object, 'num', min, max, 0.1).name('rangebar').listen();
      folder2.add(object, 'num2', min, max, 0.01).name('rangebar2').listen();

      const folder3 = gui.addFolder('3호기 제어');
      folder3.add(object, 'num', min, max, 0.1).name('rangebar').listen();
      folder3.add(object, 'num2', min, max, 0.01).name('rangebar2').listen();
    }
    if (num === 1) {
      const folder1 = gui.addFolder('1호기 제어');
      folder1.add(object, 'num', min, max, 0.1).name('rangebar').listen();
      folder1.add(object, 'num2', min, max, 0.01).name('rangebar2').listen();
    }
    if (num === 2) {
      const folder2 = gui.addFolder('2호기 제어');
      folder2.add(object, 'num', min, max, 0.1).name('rangebar').listen();
      folder2.add(object, 'num2', min, max, 0.01).name('rangebar2').listen();
    }
    if (num === 3) {
      const folder3 = gui.addFolder('3호기 제어');
      folder3.add(object, 'num', min, max, 0.1).name('rangebar').listen();
      folder3.add(object, 'num2', min, max, 0.01).name('rangebar2').listen();
    }

    const renderer = new THREE.WebGLRenderer({ canvas: canvas });
    renderer.setPixelRatio(window.devicePixelRatio);
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.shadowMap.enabled = true;

    window.addEventListener('resize', () => {
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
    });
    const ambientLight = new THREE.AmbientLight(0xffffff, 1);
    scene.add(ambientLight);

    const control = new OrbitControls(camera, renderer.domElement);

    let requestId = null;
    const tick = () => {
      renderer.render(scene, camera);
      requestId = requestAnimationFrame(tick);

      stats.update();
      camera.updateMatrixWorld();
      camera.updateProjectionMatrix();

      if (edukit.loaded) {
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
      const receivedMessage = event.data;

      setMessagePayload(JSON.parse(receivedMessage));
      console.log(JSON.parse(receivedMessage));
    });

    return () => {
      ws.close(); // 웹소켓 연결 종료
    };
  }, []);

  const SideBar = ({ width = 280 }) => {
    const [isOpen, setOpen] = useState(false);
    const [xPosition, setX] = useState(-width);
    const side = useRef();

    const toggleMenu = () => {
      if (xPosition < 0) {
        setX(0);
        setOpen(true);
      } else {
        setX(-width);
        setOpen(false);
      }
    };

    const handleClose = async (e) => {
      let sideArea = side.current;
      let sideCildren = side.current.contains(e.target);
      if (isOpen && (!sideArea || !sideCildren)) {
        await setX(-width);
        await setOpen(false);
      }
    };

    useEffect(() => {
      window.addEventListener('click', handleClose);
      return () => {
        window.removeEventListener('click', handleClose);
      };
    });

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
      <SideBarContainer
        ref={side}
        style={{
          width: `${width}px`,
          height: '100%',
          transform: `translatex(${-xPosition}px)`,
        }}
      >
        <ArrowBtn onClick={() => toggleMenu()}>
          {isOpen ? <span>ⓧ</span> : '▶'}
        </ArrowBtn>
        <Content>
          <ControlBox className="control"></ControlBox>
        </Content>
      </SideBarContainer>
    );
  };
  return (
    <div>
      <SideBar />
      <Selector />
      <div style={{ display: 'flex' }}></div>
      <canvas id="webgl"></canvas>
    </div>
  );
};

export default PLC;
