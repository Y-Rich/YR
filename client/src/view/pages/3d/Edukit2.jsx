import { Canvas, useLoader, useFrame } from '@react-three/fiber';
import React, { useEffect, useRef, useState, useMemo } from 'react';
import Selector from '../../components/Selector';
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';
import Edukit from './loader';
import Loading from '../../components/Loading';
import TextSprite from './TextSprite';
import Gui from './Gui';

const PLC = (props) => {
  const { messagePayloadEdukit2, webSocket, messagePayloadEnvironment2 } =
    props.props;
  const page = 2;
  const [loading, setLoading] = useState(true);
  // const [webSocket, setWebSocket] = useState(null);
  // const [messagePayloadEdukit2, setMessagePayloadEdukit2] = useState(null);
  // const [messagePayloadEnvironment2, setMessagePayloadEnvironment2] =
  //   useState(null);
  const canvasRef = useRef(null);

  // textSprite Ref
  const textSprite1_1Ref = useRef(null);
  const textSprite1_2Ref = useRef(null);
  const textSprite2_1Ref = useRef(null);
  const textSprite2_2Ref = useRef(null);
  const textSprite3Ref = useRef(null);
  const textSpriteC_1Ref = useRef(null);
  const textSpriteC_2Ref = useRef(null);
  const textSpriteVRef = useRef(null);

  const [m3axis1, setM3axis1] = useState(0);
  const [m3axis2, setM3axis2] = useState(0);
  const [m1OnOff, setM1OnOff] = useState(0);
  const [m2OnOff, setM2OnOff] = useState(0);
  const [m3OnOff, setM3OnOff] = useState(0);
  const [COnOff, setCOnOff] = useState(0);
  const [VOnOff, setVOnOff] = useState(0);
  const [m1Pal, setM1Pal] = useState(0);
  const [m2Pal, setM2Pal] = useState(0);
  const [CFilter, setCFilter] = useState(0);

  // 에듀킷 실시간 변수
  const currentm3axis1 = useRef(m3axis1);
  const currentm3axis2 = useRef(m3axis2);
  const currentm1OnOff = useRef(m1OnOff);
  const currentm2OnOff = useRef(m2OnOff);
  const currentm3OnOff = useRef(m3OnOff);
  const currentCOnOff = useRef(COnOff);
  const currentVOnOff = useRef(VOnOff);
  const currentm1Pal = useRef(m1Pal);
  const currentm2Pal = useRef(m2Pal);
  const currentCFilter = useRef(CFilter);

  const edukitRef = useRef(null);

  useEffect(() => {
    setLoading(true);
    const canvas = canvasRef.current;
    const scene = new THREE.Scene();
    const edukit = new Edukit();
    edukit.fileload(scene);
    edukitRef.current = edukit;

    // TEXT SPRITE
    // 1호기
    const textSprite1_1 = new TextSprite({
      canvasX: 10, // X 좌표 설정
      canvasY: 9.5, // Y 좌표 설정
      canvasZ: -9, // Z 좌표 설정
    });
    const textSprite1_2 = new TextSprite({
      canvasX: 10, // X 좌표 설정
      canvasY: 8, // Y 좌표 설정
      canvasZ: -9, // Z 좌표 설정
    });
    // 2호기
    const textSprite2_1 = new TextSprite({
      canvasX: 1.5, // X 좌표 설정
      canvasY: 11.5, // Y 좌표 설정
      canvasZ: -9, // Z 좌표 설정
    });
    const textSprite2_2 = new TextSprite({
      canvasX: 1.5, // X 좌표 설정
      canvasY: 10, // Y 좌표 설정
      canvasZ: -9, // Z 좌표 설정
    });
    // 3호기
    const textSprite3 = new TextSprite({
      canvasX: -7, // X 좌표 설정
      canvasY: 13, // Y 좌표 설정
      canvasZ: -7, // Z 좌표 설정
    });
    // 컬러센서
    const textSpriteC_1 = new TextSprite({
      canvasX: 5.5, // X 좌표 설정
      canvasY: 5, // Y 좌표 설정
      canvasZ: -12, // Z 좌표 설정
    });
    const textSpriteC_2 = new TextSprite({
      canvasX: 5.5, // X 좌표 설정
      canvasY: 3.5, // Y 좌표 설정
      canvasZ: -12, // Z 좌표 설정
    });
    // 비전센서
    const textSpriteV = new TextSprite({
      canvasX: -3, // X 좌표 설정
      canvasY: 9, // Y 좌표 설정
      canvasZ: -12, // Z 좌표 설정
    });

    scene.add(textSprite1_1);
    scene.add(textSprite1_2);
    scene.add(textSprite2_1);
    scene.add(textSprite2_2);
    scene.add(textSprite3);
    scene.add(textSpriteC_1);
    scene.add(textSpriteC_2);
    scene.add(textSpriteV);

    textSprite1_1Ref.current = textSprite1_1;
    textSprite1_2Ref.current = textSprite1_2;
    textSprite2_1Ref.current = textSprite2_1;
    textSprite2_2Ref.current = textSprite2_2;
    textSprite3Ref.current = textSprite3;
    textSpriteC_1Ref.current = textSpriteC_1;
    textSpriteC_2Ref.current = textSpriteC_2;
    textSpriteVRef.current = textSpriteV;

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

    // const [minY, maxY] = [0, 18000000];
    // const [minX, maxX] = [0, 1030000];
    const [minY, maxY] = [0, 25000000];
    const [minX, maxX] = [0, 1250000];

    // yAxisFunc 함수는 num 속성 값을 슬라이더의 높이로 변환하는 함수입니다.
    // 해당 슬라이더는 min에서 max 사이의 값을 0에서 7 사이의 값으로 변환합니다.
    const yAxisFunc = (value) => {
      return ((value - minY) / (maxY - minY)) * 9;
    };
    //xAxisFunc 함수는 num2 속성 값을 슬라이더의 각도로 변환하는 함수입니다.
    //해당 슬라이더는 min에서 max 사이의 값을 0에서 90도 사이의 각도로 변환합니다.
    const xAxisFunc = (value) => {
      return ((value - minX) / (maxX - minX)) * THREE.MathUtils.degToRad(90);
    };

    // // m1OnOff 값이 변경되었을 때에만 textSprite1 업데이트 수행
    // let lastM1OnOff = m1OnOff; // 초기값으로 설정
    // console.log('lastM1OnOff =', lastM1OnOff);

    const tick = () => {
      // console.log(messagePayloadEdukit2);
      renderer.render(scene, camera);
      requestId = requestAnimationFrame(tick);

      camera.updateMatrixWorld();
      camera.updateProjectionMatrix();
      if (edukitRef.current.loaded) {
        setLoading(false);
      }

      if (edukitRef.current && edukitRef.current.loaded) {
        // console.log('-------------------Y', currentm3axis2);
        // console.log('-------------------X', currentm3axis1.current);
        edukitRef.current.actionY(yAxisFunc(currentm3axis2.current));
        edukitRef.current.actionX(xAxisFunc(currentm3axis1.current));

        // textSprite 업데이트
        textSprite1_1Ref.current.updateParameters(currentm1OnOff.current);
        textSprite1_2Ref.current.updateParameters(currentm1Pal.current);
        textSprite2_1Ref.current.updateParameters(currentm2OnOff.current);
        textSprite2_2Ref.current.updateParameters(currentm2Pal.current);
        textSprite3Ref.current.updateParameters(currentm3OnOff.current);
        textSpriteC_1Ref.current.updateParameters(currentCOnOff.current);
        textSpriteC_2Ref.current.updateParameters(currentCFilter.current);
        textSpriteVRef.current.updateParameters(currentVOnOff.current);
      }
    };

    tick();

    return () => {
      cancelAnimationFrame(requestId);
    };
  }, []);
  useEffect(() => {
    const switchOn = {
      borderColor: {
        r: 0,
        g: 255,
        b: 0,
        a: 1.0,
      },
      message: '   ON',
    };
    const switchOff = {
      borderColor: {
        r: 255,
        g: 0,
        b: 0,
        a: 1.0,
      },
      message: '   OFF',
    };
    const PalleteFull = {
      borderColor: {
        r: 0,
        g: 255,
        b: 0,
        a: 1.0,
      },
      message: '자재정상',
    };
    const PalleteLack = {
      borderColor: {
        r: 255,
        g: 0,
        b: 0,
        a: 1.0,
      },
      message: '자재없음',
    };
    const DiceFull = {
      borderColor: {
        r: 0,
        g: 255,
        b: 0,
        a: 1.0,
      },
      message: '부품정상',
    };
    const DiceLack = {
      borderColor: {
        r: 255,
        g: 0,
        b: 0,
        a: 1.0,
      },
      message: '조정중..',
    };
    const colorOn = {
      borderColor: {
        r: 0,
        g: 255,
        b: 0,
        a: 1.0,
      },
      message: ' 분류중',
    };
    const colorOff = {
      borderColor: {
        r: 255,
        g: 0,
        b: 0,
        a: 1.0,
      },
      message: '분류안함',
    };
    if (webSocket) {
      messagePayloadEdukit2?.Wrapper?.forEach((item) => {
        if (item.tagId === '21') {
          const convertedValue = parseInt(item.value);
          setM3axis1(convertedValue);
          currentm3axis1.current = convertedValue;
        }
        if (item.tagId === '22') {
          const convertedValue = parseInt(item.value);
          setM3axis2(convertedValue);
          currentm3axis2.current = convertedValue;
        }
        // 1호기 On/off
        if (item.tagId === '9') {
          const convertedValue = item.value ? 1 : 0;
          if (convertedValue) {
            setM1OnOff(switchOn);
            currentm1OnOff.current = switchOn;
          } else {
            setM1OnOff(switchOff);
            currentm1OnOff.current = switchOff;
          }
        }
        // 1호기 자재정상
        if (item.tagId === '2') {
          const convertedValue = item.value ? 1 : 0;
          if (convertedValue) {
            setM1Pal(PalleteLack);
            currentm1Pal.current = PalleteLack;
          } else {
            setM1Pal(PalleteFull);
            currentm1Pal.current = PalleteFull;
          }
        }
        // 2호기 On/off
        if (item.tagId === '10') {
          const convertedValue = item.value ? 1 : 0;
          if (convertedValue) {
            setM2OnOff(switchOn);
            currentm2OnOff.current = switchOn;
          } else {
            setM2OnOff(switchOff);
            currentm2OnOff.current = switchOff;
          }
        }
        // 2호기 부품정상
        if (item.tagId === '25') {
          const convertedValue = item.value ? 1 : 0;
          if (!convertedValue) {
            setM2Pal(DiceFull);
            currentm2Pal.current = DiceFull;
          } else {
            setM2Pal(DiceLack);
            currentm2Pal.current = DiceLack;
          }
        }
        // 3호기 On/off
        if (item.tagId === '11') {
          const convertedValue = item.value ? 1 : 0;
          if (convertedValue) {
            setM3OnOff(switchOn);
            currentm3OnOff.current = switchOn;
          } else {
            setM3OnOff(switchOff);
            currentm3OnOff.current = switchOff;
          }
        }
        // 칼라센서 On/Off
        if (item.tagId === '12') {
          const convertedValue = item.value ? 1 : 0;
          if (convertedValue) {
            setCOnOff(switchOn);
            currentCOnOff.current = switchOn;
          } else {
            setCOnOff(switchOff);
            currentCOnOff.current = switchOff;
          }
        }
        // 칼라센서 색모두/색선별
        if (item.tagId === '31') {
          const convertedValue = item.value ? 1 : 0;
          if (convertedValue) {
            setCFilter(colorOff);
            currentCFilter.current = colorOff;
          } else {
            setCFilter(colorOn);
            currentCFilter.current = colorOn;
          }
        }
        // 비전센서 On/off
        if (item.tagId === '13') {
          const convertedValue = item.value ? 1 : 0;
          if (convertedValue) {
            setVOnOff(switchOn);
            currentVOnOff.current = switchOn;
          } else {
            setVOnOff(switchOff);
            currentVOnOff.current = switchOff;
          }
        }
      });
    }
  }, [messagePayloadEdukit2]);

  return (
    <div>
      {loading ? <Loading /> : null}
      <Gui props={props.props} page={page} />
      <Selector />
      <div style={{ display: 'flex' }}></div>
      <canvas ref={canvasRef} id="webgl"></canvas>
    </div>
  );
};

export default PLC;
