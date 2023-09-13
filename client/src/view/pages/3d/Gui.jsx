import React, { useState } from 'react';
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
  M3Simulation,
  Reset,
  Vision,
} from './GuiControl';

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
            {position === 'manager' && (
              <>
                <Edukit
                  isOn={isOn.eduKit}
                  toggleHandler={() => toggleHandler('eduKit')}
                />
                <M1 isOn={isOn.m1} toggleHandler={() => toggleHandler('m1')} />
                <M2 isOn={isOn.m2} toggleHandler={() => toggleHandler('m2')} />
                <M3 isOn={isOn.m3} toggleHandler={() => toggleHandler('m3')} />
                <Reset
                  className="gui reset"
                  isOn={isOn.reset}
                  toggleHandler={() => toggleHandler('reset')}
                />
                <DurationTime isOn={isOn.duration_time} className="gui" />
                <ColorCheck
                  isOn={isOn.color_check}
                  toggleHandler={() => toggleHandler('color_check')}
                />
                <Limit isOn={isOn.limit} className="gui" />
                <Color
                  isOn={isOn.color}
                  toggleHandler={() => toggleHandler('color')}
                />
                <Vision
                  isOn={isOn.vision}
                  toggleHandler={() => toggleHandler('vision')}
                />
                <M1Simulation
                  className="gui"
                  isOn={isOn.m1_simulation}
                  toggleHandler={() => toggleHandler('m1_simulation')}
                />
                <M3Simulation
                  isOn={isOn.m3_simulation}
                  toggleHandler={() => toggleHandler('m3_simulation')}
                />
              </>
            )}
            {position === 'supervisior' && (
              <>
                {facilities == 'fac1' && (
                  <>
                    <Edukit
                      isOn={isOn.eduKit}
                      toggleHandler={() => toggleHandler('eduKit')}
                    />
                    <M1
                      isOn={isOn.m1}
                      toggleHandler={() => toggleHandler('m1')}
                    />
                    <M2
                      isOn={isOn.m2}
                      toggleHandler={() => toggleHandler('m2')}
                    />
                    <M3
                      isOn={isOn.m3}
                      toggleHandler={() => toggleHandler('m3')}
                    />
                    <Reset
                      className="gui reset"
                      isOn={isOn.reset}
                      toggleHandler={() => toggleHandler('reset')}
                    />
                    <DurationTime isOn={isOn.duration_time} className="gui" />
                    <ColorCheck
                      isOn={isOn.color_check}
                      toggleHandler={() => toggleHandler('color_check')}
                    />
                    <Limit isOn={isOn.limit} className="gui" />
                    <Color
                      isOn={isOn.color}
                      toggleHandler={() => toggleHandler('color')}
                    />
                    <Vision
                      isOn={isOn.vision}
                      toggleHandler={() => toggleHandler('vision')}
                    />
                    <M1Simulation
                      className="gui"
                      isOn={isOn.m1_simulation}
                      toggleHandler={() => toggleHandler('m1_simulation')}
                    />
                    <M3Simulation
                      isOn={isOn.m3_simulation}
                      toggleHandler={() => toggleHandler('m3_simulation')}
                    />
                  </>
                )}
                {facilities == 'fac2' && (
                  <>
                    <Edukit
                      isOn={isOn.eduKit}
                      toggleHandler={() => toggleHandler('eduKit')}
                    />
                    <M1
                      isOn={isOn.m1}
                      toggleHandler={() => toggleHandler('m1')}
                    />
                    <M2
                      isOn={isOn.m2}
                      toggleHandler={() => toggleHandler('m2')}
                    />
                    <M3
                      isOn={isOn.m3}
                      toggleHandler={() => toggleHandler('m3')}
                    />
                    <Reset
                      className="gui reset"
                      isOn={isOn.reset}
                      toggleHandler={() => toggleHandler('reset')}
                    />
                    <DurationTime isOn={isOn.duration_time} className="gui" />
                    <ColorCheck
                      isOn={isOn.color_check}
                      toggleHandler={() => toggleHandler('color_check')}
                    />
                    <Limit isOn={isOn.limit} className="gui" />
                    <Color
                      isOn={isOn.color}
                      toggleHandler={() => toggleHandler('color')}
                    />
                    <Vision
                      isOn={isOn.vision}
                      toggleHandler={() => toggleHandler('vision')}
                    />
                    <M1Simulation
                      className="gui"
                      isOn={isOn.m1_simulation}
                      toggleHandler={() => toggleHandler('m1_simulation')}
                    />
                    <M3Simulation
                      isOn={isOn.m3_simulation}
                      toggleHandler={() => toggleHandler('m3_simulation')}
                    />
                  </>
                )}
              </>
            )}
            {position === 'worker' && (
              <>
                {facilities == 'fac1' && (
                  <>
                    {lines == 'line1' && (
                      <>
                        <Edukit
                          isOn={isOn.eduKit}
                          toggleHandler={() => toggleHandler('eduKit')}
                        />
                        <M1
                          isOn={isOn.m1}
                          toggleHandler={() => toggleHandler('m1')}
                        />
                        <M1Simulation
                          className="gui"
                          isOn={isOn.m1_simulation}
                          toggleHandler={() => toggleHandler('m1_simulation')}
                        />
                      </>
                    )}
                    {lines == 'line2' && (
                      <>
                        <Edukit
                          isOn={isOn.eduKit}
                          toggleHandler={() => toggleHandler('eduKit')}
                        />
                        <M2
                          isOn={isOn.m2}
                          toggleHandler={() => toggleHandler('m2')}
                        />
                      </>
                    )}
                    {lines == 'line3' && (
                      <>
                        <Edukit
                          isOn={isOn.eduKit}
                          toggleHandler={() => toggleHandler('eduKit')}
                        />
                        <M3
                          isOn={isOn.m3}
                          toggleHandler={() => toggleHandler('m3')}
                        />
                        <M3Simulation
                          className="gui"
                          isOn={isOn.m3_simulation}
                          toggleHandler={() => toggleHandler('m3_simulation')}
                        />
                      </>
                    )}
                  </>
                )}
                {facilities == 'fac2' && (
                  <>
                    {lines == 'line1' && (
                      <>
                        <Edukit
                          isOn={isOn.eduKit}
                          toggleHandler={() => toggleHandler('eduKit')}
                        />
                        <M1
                          isOn={isOn.m1}
                          toggleHandler={() => toggleHandler('m1')}
                        />
                        <M1Simulation
                          className="gui"
                          isOn={isOn.m1_simulation}
                          toggleHandler={() => toggleHandler('m1_simulation')}
                        />
                      </>
                    )}
                    {lines == 'line2' && (
                      <>
                        <Edukit
                          isOn={isOn.eduKit}
                          toggleHandler={() => toggleHandler('eduKit')}
                        />
                        <M2
                          isOn={isOn.m2}
                          toggleHandler={() => toggleHandler('m2')}
                        />
                      </>
                    )}
                    {lines == 'line3' && (
                      <>
                        <Edukit
                          isOn={isOn.eduKit}
                          toggleHandler={() => toggleHandler('eduKit')}
                        />
                        <M3
                          isOn={isOn.m3}
                          toggleHandler={() => toggleHandler('m3')}
                        />
                        <M3Simulation
                          className="gui"
                          isOn={isOn.m3_simulation}
                          toggleHandler={() => toggleHandler('m3_simulation')}
                        />
                      </>
                    )}
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
