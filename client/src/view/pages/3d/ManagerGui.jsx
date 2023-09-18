import React, { useEffect, useRef, useState } from 'react';
import Draggable from 'react-draggable';
import { AiFillCaretRight } from 'react-icons/ai';
import { Box, Container, ToggleBtn } from './style';
import {
  Color,
  ColorCheck,
  DurationTime,
  Edukit,
  DiceNum,
  Limit,
  Reset,
  Vision,
} from './GuiControl';

const ManagerGui = (props) => {
  const { messagePayloadEdukit1, webSocket, messagePayloadEdukit2 } =
    props.props;
  const { page } = props;
  const [Opacity, setOpacity] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [ison, setison] = useState({
    eduKit: false,
    reset: false,
    duration_time: 0,
    color_check: false,
    dice_num: 0,
    limit: 0,
    color: false,
    vision: false,
  });

  // const position = 'manager'; // 권한 개발을 위한 설정
  const position = sessionStorage.getItem('position');
  const facilities = sessionStorage.getItem('facilities');
  const matchResult = facilities ? facilities.match(/\d+/) : null;
  const facNum = matchResult ? parseInt(matchResult[0], 10) : page; // null일 때 0으로 처리

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
        // 양품 판별 숫자
        if (item.tagId === '38') {
          const convertedValue = parseInt(item.value);
          setison((previson) => ({
            ...previson,
            dice_num: convertedValue,
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
        // 양품 판별 숫자
        if (item.tagId === '38') {
          const convertedValue = parseInt(item.value);
          setison((previson) => ({
            ...previson,
            dice_num: convertedValue,
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
      <Container className="manager">
        <Box className="btn" style={{ opacity: Opacity ? '0.6' : '1' }}>
          <ToggleBtn onClick={toggleMenu}>
            <AiFillCaretRight size="20" alt="햄버거 버튼" />
          </ToggleBtn>
          {facNum === 1 && `제1공장 - ${position}`}
          {facNum === 2 && `제2공장 - ${position}`}
        </Box>
        {isMenuOpen && (
          <Box className="gui">
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
            <DiceNum ison={ison.dice_num} className="gui" fac={facNum} />
          </Box>
        )}
      </Container>
    </Draggable>
  );
};

export default ManagerGui;
