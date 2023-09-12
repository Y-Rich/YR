import React, { useState } from 'react';
import Draggable from 'react-draggable';
import { AiFillCaretRight } from 'react-icons/ai';
import { Box, Container, Title, ToggleBtn } from './style';
import GuiDetail from './GuiDetail';
import { Button, Input } from '../../components/Components';

const Gui = () => {
  //   const [position, setPosition] = useState({ x: 0, y: 0 });
  const [Opacity, setOpacity] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isOn, setIsOn] = useState({
    eduKit: false,
    m1: false,
    m2: false,
    m3: false,
    reset: false,
    duration_time: 0,
    color_check: false,
    limit: false,
    color: false,
    vision: false,
    m1_simulation: false,
    m3_simulation: false,
  });
  const position = sessionStorage.getItem('position');
  const facilities = sessionStorage.getItem('facilities');
  const lines = sessionStorage.getItem('lines');
  const toggleHandler = (key) => {
    setIsOn((prevIsOn) => ({
      ...prevIsOn,
      [key]: !prevIsOn[key],
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
        </Box>
        {isMenuOpen && (
          <Box
            className="gui"
            //   isOpen={isMenuOpen}
          >
            <Box className="guiDetail">
              <Title>에듀킷</Title>
              <GuiDetail
                isOn={isOn.eduKit}
                toggleHandler={() => toggleHandler('eduKit')}
              />
            </Box>
            <Box className="guiDetail">
              <Title>공정 1</Title>
              <GuiDetail
                isOn={isOn.m1}
                toggleHandler={() => toggleHandler('m1')}
              />
            </Box>
            <Box className="guiDetail">
              <Title>공정 2</Title>
              <GuiDetail
                isOn={isOn.m2}
                toggleHandler={() => toggleHandler('m2')}
              />
            </Box>
            <Box className="guiDetail">
              <Title>공정 3</Title>
              <GuiDetail
                isOn={isOn.m3}
                toggleHandler={() => toggleHandler('m3')}
              />
            </Box>
            <Box className="guiDetail reset">
              <Title>리셋</Title>
              <Button
                className="gui reset"
                isOn={isOn.reset}
                toggleHandler={() => toggleHandler('reset')}
              >
                Press
              </Button>
            </Box>
            <Box className="guiDetail">
              <Title>공정 반복 시간</Title>
              <Box className="small">
                <Input isOn={isOn.duration_time} className="gui" />
                ms
              </Box>
            </Box>
            <Box className="guiDetail">
              <Title>색 선별여부</Title>
              <GuiDetail
                isOn={isOn.color_check}
                toggleHandler={() => toggleHandler('color_check')}
              />
            </Box>
            <Box className="guiDetail">
              <Title>생산량 리미트</Title>
              <Box className="small">
                <Input isOn={isOn.limit} className="gui" />개
              </Box>
            </Box>
            <Box className="guiDetail">
              <Title>컬러 센서</Title>
              <GuiDetail
                isOn={isOn.color}
                toggleHandler={() => toggleHandler('color')}
              />
            </Box>
            <Box className="guiDetail">
              <Title>비전 센서</Title>
              <GuiDetail
                isOn={isOn.vision}
                toggleHandler={() => toggleHandler('vision')}
              />
            </Box>
            <Box className="guiDetail reset">
              <Title>1번 공정 시운전</Title>
              <Button
                className="gui"
                isOn={isOn.m1_simulation}
                toggleHandler={() => toggleHandler('m1_simulation')}
              >
                Press
              </Button>
            </Box>
            <Box className="guiDetail">
              <Title>3번 공정 시운전</Title>
              <GuiDetail
                isOn={isOn.m3_simulation}
                toggleHandler={() => toggleHandler('m3_simulation')}
              />
            </Box>
          </Box>
        )}
      </Container>
    </Draggable>
  );
};

export default Gui;
