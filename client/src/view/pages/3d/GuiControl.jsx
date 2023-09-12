import { Button, Input } from '../../components/Components';
import GuiDetail from './GuiDetail';
import { Box, Title } from './style';

export const Edukit = ({ isOn, toggleHandler }) => {
  return (
    <Box className="guiDetail">
      <Title>에듀킷</Title>
      <GuiDetail
        isOn={isOn.eduKit}
        toggleHandler={() => toggleHandler('eduKit')}
      />
    </Box>
  );
};
export const M1 = ({ isOn, toggleHandler }) => {
  return (
    <Box className="guiDetail">
      <Title>공정 1</Title>
      <GuiDetail isOn={isOn.m1} toggleHandler={() => toggleHandler('m1')} />
    </Box>
  );
};
export const M2 = ({ isOn, toggleHandler }) => {
  return (
    <Box className="guiDetail">
      <Title>공정 2</Title>
      <GuiDetail isOn={isOn.m2} toggleHandler={() => toggleHandler('m2')} />
    </Box>
  );
};
export const M3 = ({ isOn, toggleHandler }) => {
  return (
    <Box className="guiDetail">
      <Title>공정 3</Title>
      <GuiDetail isOn={isOn.m3} toggleHandler={() => toggleHandler('m3')} />
    </Box>
  );
};
export const Reset = ({ isOn, toggleHandler }) => {
  return (
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
  );
};
export const DurationTime = ({ isOn, toggleHandler }) => {
  return (
    <Box className="guiDetail">
      <Title>공정 반복 시간</Title>
      <Box className="small">
        <Input isOn={isOn.duration_time} className="gui" />
        ms
      </Box>
    </Box>
  );
};
export const ColorCheck = ({ isOn, toggleHandler }) => {
  return (
    <Box className="guiDetail">
      <Title>색 선별여부</Title>
      <GuiDetail
        isOn={isOn.color_check}
        toggleHandler={() => toggleHandler('color_check')}
      />
    </Box>
  );
};
export const Limit = ({ isOn, toggleHandler }) => {
  return (
    <Box className="guiDetail">
      <Title>생산량 리미트</Title>
      <Box className="small">
        <Input isOn={isOn.limit} className="gui" />개
      </Box>
    </Box>
  );
};
export const Color = ({ isOn, toggleHandler }) => {
  return (
    <Box className="guiDetail">
      <Title>컬러 센서</Title>
      <GuiDetail
        isOn={isOn.color}
        toggleHandler={() => toggleHandler('color')}
      />
    </Box>
  );
};
export const Vision = ({ isOn, toggleHandler }) => {
  return (
    <Box className="guiDetail">
      <Title>비전 센서</Title>
      <GuiDetail
        isOn={isOn.vision}
        toggleHandler={() => toggleHandler('vision')}
      />
    </Box>
  );
};
export const M1Simulation = ({ isOn, toggleHandler }) => {
  return (
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
  );
};
export const M3Simulation = ({ isOn, toggleHandler }) => {
  return (
    <Box className="guiDetail">
      <Title>3번 공정 시운전</Title>
      <GuiDetail
        isOn={isOn.m3_simulation}
        toggleHandler={() => toggleHandler('m3_simulation')}
      />
    </Box>
  );
};
