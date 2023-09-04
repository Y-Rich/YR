import React, { useEffect, useRef, useState } from 'react';
import Selector from '../../components/Selector';
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';
import { RectAreaLightHelper } from 'three/examples/jsm/helpers/RectAreaLightHelper';
import { DatGui, DatNumber } from 'react-dat-gui';
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
  const [num, setNum] = useState(0);
  const [object, setObject] = useState({ num: -2728, num2: 0 });
  useEffect(() => {
    axios
      .get('http://localhost:3001/mock/user.json')
      .then((res) => {
        setNum(res.data[0].role);
        console.log(res.data[0].role);
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
    const folders = [
      { name: '1호기 제어', enabled: num === 4 || num === 1 },
      { name: '2호기 제어', enabled: num === 4 || num === 2 },
      { name: '3호기 제어', enabled: num === 4 || num === 3 },
    ];

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
  }, []);
  const SideBar = ({ width = 280, folders }) => {
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
          <ControlBox className="control">
            <DatGui data={object} onUpdate={setObject}>
              {folders.map((folder, index) => (
                <DatNumber
                  key={index}
                  path={`object.num${index + 1}`}
                  label={`rangebar${index + 1}`}
                  min={-2728}
                  max={53294192312}
                  step={0.1}
                />
              ))}
            </DatGui>
          </ControlBox>
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
