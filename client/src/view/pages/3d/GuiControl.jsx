import { Button, Input } from '../../components/Components';
import GuiDetail from './GuiDetail';
import { Box, Title } from './style';
import { doControl, doControlValue } from '../control/controls';
import axios from 'axios';

// 비상정지
const emergencyHandleOnClick = () => {
  doControl('stop', '비상정지');
  console.log('emergency clicked');
};

// 리셋
const resetHandleOnClick = () => {
  doControl('Reset', '리셋');
  console.log('리셋 clicked');
};

// 공정1 시운영
const m1SimulatorHandleOnClick = () => {
  doControl('No1_Action', '공정1 시운영');
  console.log('m1Simulator clicked');
};

// 에듀킷 켜기 끄기
const edukitHandleOnClick = (ison) => {
  if (ison === 1) {
    doControl('stop', '에듀킷 끄기');
    console.log('edukit Stop clicked');
  } else {
    doControl('start', '에듀킷 켜기');
    console.log('edukit Go clicked');
  }
};

// 공정1 켜기 끄기
const m1GoHandleOnClick = (ison) => {
  if (ison === 1) {
    doControl('No1_OFF', '공정1 끄기');
    console.log('m1 Stop clicked');
  } else {
    doControl('No1_ON', '공정1 켜기');
    console.log('m1 Go clicked');
  }
};

// 공정2 켜기 끄기
const m2GoHandleOnClick = (ison) => {
  if (ison === 1) {
    doControl('No2_OFF', '공정2 끄기');
    console.log('m2 Stop clicked');
  } else {
    doControl('No2_ON', '공정2 켜기');
    console.log('m2 Go clicked');
  }
};

// 공정3 켜기 끄기
const m3GoHandleOnClick = (ison) => {
  if (ison === 1) {
    doControl('No3_OFF', '공정3 끄기');
    console.log('m3 Stop clicked');
  } else {
    doControl('No3_ON', '공정3 켜기');
    console.log('m3 Go clicked');
  }
};

// 칼라센서 선별
const ColorFilterHandleOnClick = (ison) => {
  if (ison === true) {
    doControl('No2Mode_all', '칼라센서 선별않기');
    console.log('color 선별않기 clicked');
  } else if (ison === false) {
    doControl('No2Mode_color', '칼라센서 선별하기');
    console.log('color 선별하기 clicked');
  }
};

// 칼라센서 켜기 끄기
const colorGoHandleOnClick = (ison) => {
  if (ison === 1) {
    doControl('sen1_OFF', '칼라센서 끄기');
    console.log('color Stop clicked');
  } else {
    doControl('sen1_ON', '칼라센서 켜기');
    console.log('color Go clicked');
  }
};

// 비전센서 켜기 끄기
const visionGoHandleOnClick = (ison) => {
  if (ison === 1) {
    doControl('sen2_OFF', '비전센서 끄기');
    console.log('vision Stop clicked');
  } else {
    doControl('sen2_ON', '비전센서 켜기');
    console.log('vision Go clicked');
  }
};

// 공정 3 시운영 1
const m3Simulator1HandleOnClick = () => {
  console.log('m3Simulator1 clicked');
};

// 공정 3 시운영 2
const m3Simulator2HandleOnClick = () => {
  console.log('m3Simulator2 clicked');
};

export const Emergency = ({ ison, togglehandler }) => {
  return (
    <Box className="guiDetail reset">
      <Title>비상정지</Title>
      <Button className="gui reset" onClick={() => emergencyHandleOnClick()}>
        Press
      </Button>
    </Box>
  );
};
export const Edukit = ({ ison, togglehandler }) => {
  return (
    <Box className="guiDetail">
      <Title>에듀킷</Title>
      <GuiDetail ison={ison} togglehandler={() => edukitHandleOnClick(ison)} />
    </Box>
  );
};
export const M1 = ({ ison, togglehandler }) => {
  return (
    <Box className="guiDetail">
      <Title>공정 1</Title>
      <GuiDetail ison={ison} togglehandler={() => m1GoHandleOnClick(ison)} />
    </Box>
  );
};
export const M2 = ({ ison, togglehandler }) => {
  return (
    <Box className="guiDetail">
      <Title>공정 2</Title>
      <GuiDetail ison={ison} togglehandler={() => m2GoHandleOnClick(ison)} />
    </Box>
  );
};
export const M3 = ({ ison, togglehandler }) => {
  return (
    <Box className="guiDetail">
      <Title>공정 3</Title>
      <GuiDetail ison={ison} togglehandler={() => m3GoHandleOnClick(ison)} />
    </Box>
  );
};
export const Reset = ({ ison, togglehandler }) => {
  return (
    <Box className="guiDetail reset">
      <Title>리셋</Title>
      <Button className="gui reset" onClick={() => resetHandleOnClick()}>
        Press
      </Button>
    </Box>
  );
};
export const DurationTime = ({ ison, togglehandler }) => {
  return (
    <Box className="guiDetail">
      <Title>공정 반복 시간</Title>
      <Box className="small">
        <Input ison={ison} className="gui_a" value={ison} disabled />
        <Input ison={ison} className="gui_b" />
        ms
      </Box>
    </Box>
  );
};
export const ColorCheck = ({ ison, togglehandler }) => {
  return (
    <Box className="guiDetail">
      <Title>색 선별여부</Title>
      <GuiDetail
        ison={ison}
        togglehandler={() => ColorFilterHandleOnClick(ison)}
      />
    </Box>
  );
};
export const Limit = ({ ison, togglehandler }) => {
  return (
    <Box className="guiDetail">
      <Title>생산량 리미트</Title>
      <Box className="small">
        <Input ison={ison} className="gui_a" value={ison} disabled />
        <Input ison={ison} className="gui_b" /> 개
      </Box>
    </Box>
  );
};
export const Color = ({ ison, togglehandler }) => {
  return (
    <Box className="guiDetail">
      <Title>컬러 센서</Title>
      <GuiDetail ison={ison} togglehandler={() => colorGoHandleOnClick(ison)} />
    </Box>
  );
};
export const Vision = ({ ison, togglehandler }) => {
  return (
    <Box className="guiDetail">
      <Title>비전 센서</Title>
      <GuiDetail
        ison={ison}
        togglehandler={() => visionGoHandleOnClick(ison)}
      />
    </Box>
  );
};
export const M1Simulation = ({ ison, togglehandler }) => {
  return (
    <Box className="guiDetail reset">
      <Title>1번 공정 시운전</Title>
      <Button className="gui" onClick={() => m1SimulatorHandleOnClick()}>
        Press
      </Button>
    </Box>
  );
};
export const M3Simulation = ({ ison, togglehandler }) => {
  return (
    <Box className="guiDetail">
      <Title>3번 공정 시운전</Title>
      {/* <GuiDetail ison={ison} togglehandler={togglehandler} /> */}
      <Button className="gui" onClick={() => m3Simulator1HandleOnClick()}>
        Grip
      </Button>
      <Button className="gui" onClick={() => m3Simulator2HandleOnClick()}>
        Return
      </Button>
    </Box>
  );
};
