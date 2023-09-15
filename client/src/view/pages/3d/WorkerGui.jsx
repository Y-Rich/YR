import React, { useEffect, useRef, useState } from 'react';
import Draggable from 'react-draggable';
import { AiFillCaretRight } from 'react-icons/ai';
import { Box, Container, ToggleBtn } from './style';
import {
  M1,
  M1Simulation,
  M2,
  M3,
  M3Simulation1,
  M3Simulation2,
  Emergency,
} from './GuiControl';

const WorkerGui = (props) => {
  const { messagePayloadEdukit1, webSocket, messagePayloadEdukit2 } =
    props.props;
  const { page } = props;
  const [Opacity, setOpacity] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [ison, setison] = useState({
    eduKit: false,
    m1: false,
    m2: false,
    m3: false,
    reset: false,
    duration_time: 0,
    color_check: false,
    limit: 0,
    color: false,
    vision: false,
    m1_simulation: false,
    m3_simulation: false,
  });

  const position = sessionStorage.getItem('position');
  // const position = 'manager'; // 권한 개발을 위한 설정
  const facilities = sessionStorage.getItem('facilities');
  const matchResult = facilities ? facilities.match(/\d+/) : null;
  const facNum = matchResult ? parseInt(matchResult[0], 10) : page; // null일 때 0으로 처리

  const lines = sessionStorage.getItem('lines');
  const togglehandler = (key) => {
    setison((previson) => ({
      ...previson,
      [key]: !previson[key],
    }));
  };
  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };
  const handleStart = () => {
    setOpacity(true);
  };
  const handleEnd = () => {
    setOpacity(false);
  };
  //   const trackPos = (data) => {
  //     setPosition({ x: data.x, y: data.y });
  //   };

  // tagID 설정
  // fac1 공장1
  useEffect(() => {
    if ((facilities === 'fac1' || page === 1) && webSocket) {
      // console.log('here1', facilities);
      // console.log(ison);
      // console.log('position = ', position);
      messagePayloadEdukit1?.Wrapper?.forEach((item) => {
        // 에듀킷 On/off
        if (item.tagId === '1') {
          const convertedValue = item.value ? 1 : 0;
          setison((previson) => ({
            ...previson,
            eduKit: convertedValue,
          }));
        }
        // 1호기 On/off
        if (item.tagId === '9') {
          const convertedValue = item.value ? 1 : 0;
          setison((previson) => ({
            ...previson,
            m1: convertedValue,
          }));
        }
        // 2호기 On/off
        if (item.tagId === '10') {
          const convertedValue = item.value ? 1 : 0;
          setison((previson) => ({
            ...previson,
            m2: convertedValue,
          }));
        }
        // 3호기 On/off
        if (item.tagId === '11') {
          const convertedValue = item.value ? 1 : 0;
          setison((previson) => ({
            ...previson,
            m3: convertedValue,
          }));
        }
        // 3호기 시운전
        if (item.tagId === '40') {
          const convertedValue = item.value ? 1 : 0;
          setison((previson) => ({
            ...previson,
            m3_simulation: convertedValue,
          }));
        }
      });
    }
  }, [messagePayloadEdukit1]);

  // tagID 설정
  // fac2 공장2
  useEffect(() => {
    if ((facilities === 'fac2' || page === 2) && webSocket) {
      // console.log('here2', facilities);
      // console.log(ison);
      messagePayloadEdukit2?.Wrapper?.forEach((item) => {
        // 에듀킷 On/off
        if (item.tagId === '1') {
          const convertedValue = item.value ? 1 : 0;
          setison((previson) => ({
            ...previson,
            eduKit: convertedValue,
          }));
        }

        // 1호기 On/off
        if (item.tagId === '9') {
          const convertedValue = item.value ? 1 : 0;
          setison((previson) => ({
            ...previson,
            m1: convertedValue,
          }));
        }
        // 2호기 On/off
        if (item.tagId === '10') {
          const convertedValue = item.value ? 1 : 0;
          setison((previson) => ({
            ...previson,
            m2: convertedValue,
          }));
        }
        // 3호기 On/off
        if (item.tagId === '11') {
          const convertedValue = item.value ? 1 : 0;
          setison((previson) => ({
            ...previson,
            m3: convertedValue,
          }));
        }
        // 3호기 시운전
        if (item.tagId === '40') {
          const convertedValue = item.value ? 1 : 0;
          setison((previson) => ({
            ...previson,
            m3_simulation: convertedValue,
          }));
        }
      });
    }
  }, [messagePayloadEdukit2]);

  return (
    <Draggable
      // onDrag={(e, data) => trackPos(data)}
      onStart={handleStart}
      onStop={handleEnd}
    >
      <Container>
        <Box className="btn" style={{ opacity: Opacity ? '0.6' : '1' }}>
          <ToggleBtn onClick={toggleMenu}>
            <AiFillCaretRight size="20" alt="햄버거 버튼" />
          </ToggleBtn>
          {facilities === 'fac1' && '제1공장 - worker'}
          {facilities === 'fac2' && '제2공장 - manager'}
        </Box>
        {isMenuOpen && (
          <Box className="gui">
            <Emergency
              className="gui"
              togglehandler={() => togglehandler('emergency')}
              fac={facNum}
            />
            {!(lines === 'line2' || lines === 'line3') && (
              <>
                <M1
                  ison={ison.m1}
                  togglehandler={() => togglehandler('m1')}
                  fac={facNum}
                />
              </>
            )}
            {!(lines === 'line1' || lines === 'line3') && (
              <>
                <M2
                  ison={ison.m2}
                  togglehandler={() => togglehandler('m2')}
                  fac={facNum}
                />
              </>
            )}
            {!(lines === 'line1' || lines === 'line2') && (
              <>
                <M3
                  ison={ison.m3}
                  togglehandler={() => togglehandler('m3')}
                  fac={facNum}
                />
              </>
            )}
            {!(lines === 'line2' || lines === 'line3') && (
              <>
                <M1Simulation
                  className="gui"
                  ison={ison.m1_simulation}
                  togglehandler={() => togglehandler('m1_simulation')}
                  fac={facNum}
                />
              </>
            )}
            {!(lines === 'line1' || lines === 'line2') && (
              <>
                <M3Simulation1
                  ison={ison.m3_simulation}
                  togglehandler={() => togglehandler('m3_simulation1')}
                  fac={facNum}
                />
                <M3Simulation2
                  ison={ison.m3_simulation}
                  togglehandler={() => togglehandler('m3_simulation2')}
                  fac={facNum}
                />
              </>
            )}
          </Box>
        )}
      </Container>
    </Draggable>
  );
};

export default WorkerGui;
