import React, { useEffect, useRef, useState } from 'react';
import Draggable from 'react-draggable';
import { AiFillCaretRight } from 'react-icons/ai';
import { Box, Container, Title, ToggleBtn } from './style';
import GuiDetail from './GuiDetail';
import { Button, Input } from '../../components/Components';
import {
  Color,
  ColorCheck,
  DurationTime,
  Edukit,
  Limit,
  M1,
  M1Simulation,
  M2,
  M3,
  M3Simulation1,
  M3Simulation2,
  Reset,
  Vision,
  Emergency,
} from './GuiControl';

const Gui = (props) => {
  const { messagePayloadEdukit1, webSocket, messagePayloadEdukit2 } =
    props.props;

  // // tagID 값에 대한 변수 선언
  // const [m1OnOff, setM1OnOff] = useState(0);
  // const [m2OnOff, setM2OnOff] = useState(0);
  // const [m3OnOff, setM3OnOff] = useState(0);
  // const [COnOff, setCOnOff] = useState(0);
  // const [VOnOff, setVOnOff] = useState(0);
  // const [m1Pal, setM1Pal] = useState(0);
  // const [m2Pal, setM2Pal] = useState(0);
  // const [CFilter, setCFilter] = useState(0);

  // // 에듀킷 실시간 변수
  // const currentm1OnOff = useRef(m1OnOff);
  // const currentm2OnOff = useRef(m2OnOff);
  // const currentm3OnOff = useRef(m3OnOff);
  // const currentCOnOff = useRef(COnOff);
  // const currentVOnOff = useRef(VOnOff);
  // const currentm1Pal = useRef(m1Pal);
  // const currentm2Pal = useRef(m2Pal);
  // const currentCFilter = useRef(CFilter);

  //   const [position, setPosition] = useState({ x: 0, y: 0 });
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
  const facNum = matchResult ? parseInt(matchResult[0], 10) : 0; // null일 때 0으로 처리

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
    if (facilities === 'fac1' && webSocket) {
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
        // 칼라센서 On/Off
        if (item.tagId === '12') {
          const convertedValue = item.value ? 1 : 0;
          setison((previson) => ({
            ...previson,
            color: convertedValue,
          }));
        }
        // 칼라센서 색모두/색선별
        if (item.tagId === '31') {
          const convertedValue = item.value ? 1 : 0;
          setison((previson) => ({
            ...previson,
            color_check: !convertedValue,
          }));
        }
        // 비전센서 On/off
        if (item.tagId === '13') {
          const convertedValue = item.value ? 1 : 0;
          setison((previson) => ({
            ...previson,
            vision: convertedValue,
          }));
        }
        // 공정반복시간
        if (item.tagId === '14') {
          const convertedValue = parseFloat(item.value) * 10;
          setison((previson) => ({
            ...previson,
            duration_time: convertedValue,
          }));
        }
        // 생산량리미트
        if (item.tagId === '36') {
          const convertedValue = parseFloat(item.value);
          setison((previson) => ({
            ...previson,
            limit: convertedValue,
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
    if (facilities === 'fac2' && webSocket) {
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
        // 칼라센서 On/Off
        if (item.tagId === '12') {
          const convertedValue = item.value ? 1 : 0;
          setison((previson) => ({
            ...previson,
            color: convertedValue,
          }));
        }
        // 칼라센서 색모두/색선별
        if (item.tagId === '31') {
          const convertedValue = item.value ? 1 : 0;
          setison((previson) => ({
            ...previson,
            color_check: !convertedValue,
          }));
        }
        // 비전센서 On/off
        if (item.tagId === '13') {
          const convertedValue = item.value ? 1 : 0;
          setison((previson) => ({
            ...previson,
            vision: convertedValue,
          }));
        }
        // 공정반복시간
        if (item.tagId === '14') {
          const convertedValue = parseFloat(item.value) * 10;
          setison((previson) => ({
            ...previson,
            duration_time: convertedValue,
          }));
        }
        // 생산량리미트
        if (item.tagId === '36') {
          const convertedValue = parseFloat(item.value);
          setison((previson) => ({
            ...previson,
            limit: convertedValue,
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
          <ToggleBtn isOpen={isMenuOpen} onClick={toggleMenu}>
            <AiFillCaretRight size="20" alt="햄버거 버튼" />
          </ToggleBtn>
          {facilities === 'fac1' && '제1공장'}
          {facilities === 'fac2' && '제2공장'}
        </Box>
        {isMenuOpen && (
          <Box
            className="gui"
            //   isOpen={isMenuOpen}
          >
            {(position === 'manager' ||
              position === 'supervisor' ||
              position === 'worker') && (
              <>
                <Emergency
                  className="gui"
                  togglehandler={() => togglehandler('emergency')}
                  fac={facNum}
                />
              </>
            )}
            {(position === 'manager' || position === 'supervisor') && (
              <>
                <Reset
                  className="gui reset"
                  ison={ison.reset}
                  togglehandler={() => togglehandler('reset')}
                  fac={facNum}
                />
                <Edukit
                  ison={ison.eduKit}
                  togglehandler={() => togglehandler('eduKit')}
                  fac={facNum}
                />
                <DurationTime
                  ison={ison.duration_time}
                  className="gui"
                  fac={facNum}
                />
                <Limit ison={ison.limit} className="gui" fac={facNum} />
                <Color
                  ison={ison.color}
                  togglehandler={() => togglehandler('color')}
                  fac={facNum}
                />
                <Vision
                  ison={ison.vision}
                  togglehandler={() => togglehandler('vision')}
                  fac={facNum}
                />
                <ColorCheck
                  ison={ison.color_check}
                  togglehandler={() => togglehandler('color_check')}
                  fac={facNum}
                />
              </>
            )}
            {(position === 'manager' ||
              position === 'supervisor' ||
              position === 'worker') && (
              <>
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
              </>
            )}
          </Box>
        )}
      </Container>
    </Draggable>
  );
};

export default Gui;
