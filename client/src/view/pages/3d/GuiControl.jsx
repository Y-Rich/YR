import { Button, Input } from '../../components/Components';
import GuiDetail from './GuiDetail';
import { Box, Title } from './style';
import { doControl, doControlValue } from '../control/controls';
// import axios from 'axios';

// 비상정지
const emergencyHandleOnClick = (fac) => {
  doControl(fac, 'stop', '비상정지');
  console.log('emergency clicked');
  console.log('here', fac);
};

// 리셋
const resetHandleOnClick = (fac) => {
  doControl(fac, 'Reset', '리셋');
  console.log('리셋 clicked');
};

// 공정1 시운영
const m1SimulatorHandleOnClick = (fac) => {
  doControl(fac, 'No1_Action', '공정1 시운영');
  console.log('m1Simulator clicked');
};

// 에듀킷 켜기 끄기
const edukitHandleOnClick = (fac, ison) => {
  if (ison === 1) {
    doControl(fac, 'stop', '에듀킷 끄기');
    console.log('edukit Stop clicked');
  } else {
    doControl(fac, 'start', '에듀킷 켜기');
    console.log('edukit Go clicked');
  }
};

// 공정1 켜기 끄기
const m1GoHandleOnClick = (fac, ison) => {
  if (ison === 1) {
    doControl(fac, 'No1_OFF', '공정1 끄기');
    console.log('m1 Stop clicked');
  } else {
    doControl(fac, 'No1_ON', '공정1 켜기');
    console.log('m1 Go clicked');
  }
};

// 공정2 켜기 끄기
const m2GoHandleOnClick = (fac, ison) => {
  if (ison === 1) {
    doControl(fac, 'No2_OFF', '공정2 끄기');
    console.log('m2 Stop clicked');
  } else {
    doControl(fac, 'No2_ON', '공정2 켜기');
    console.log('m2 Go clicked');
  }
};

// 공정3 켜기 끄기
const m3GoHandleOnClick = (fac, ison) => {
  if (ison === 1) {
    doControl(fac, 'No3_OFF', '공정3 끄기');
    console.log('m3 Stop clicked');
  } else {
    doControl(fac, 'No3_ON', '공정3 켜기');
    console.log('m3 Go clicked');
  }
};

// 칼라센서 선별
const ColorFilterHandleOnClick = (fac, ison) => {
  if (ison === true) {
    doControl(fac, 'No2Mode_all', '칼라센서 선별않기');
    console.log('color 선별않기 clicked');
  } else if (ison === false) {
    doControl(fac, 'No2Mode_color', '칼라센서 선별하기');
    console.log('color 선별하기 clicked');
  }
};

// 칼라센서 켜기 끄기
const colorGoHandleOnClick = (fac, ison) => {
  if (ison === 1) {
    doControl(fac, 'sen1_OFF', '칼라센서 끄기');
    console.log('color Stop clicked');
  } else {
    doControl(fac, 'sen1_ON', '칼라센서 켜기');
    console.log('color Go clicked');
  }
};

// 비전센서 켜기 끄기
const visionGoHandleOnClick = (fac, ison) => {
  if (ison === 1) {
    doControl(fac, 'sen2_OFF', '비전센서 끄기');
    console.log('vision Stop clicked');
  } else {
    doControl(fac, 'sen2_ON', '비전센서 켜기');
    console.log('vision Go clicked');
  }
};

// 공정 3 시운영 1
const m3Simulator1HandleOnClick = (fac) => {
  doControl(fac, 'No3Gripper_ON', '잡기');
  console.log('m3Simulator1 clicked');
};

// 공정 3 시운영 2
const m3Simulator2HandleOnClick = (fac) => {
  doControl(fac, 'No3Gripper_OFF', '리턴');
  console.log('m3Simulator2 clicked');
};

// 반출속도
const durationTimeHandleOnEnter = (e, fac) => {
  if (e.key === 'Enter') {
    const inputValue = e.target.value.trim();
    const number = parseInt(inputValue, 10); // 10진수 변환
    doControlValue(fac, 'No1Delay', number, '반출속도');
    console.log('durationTime entered = ', number);
    e.target.blur();
  }
};

// 생산량 조절
const limitHandleOnEnter = (e, fac) => {
  if (e.key === 'Enter') {
    const inputValue = e.target.value.trim();
    const number = parseInt(inputValue, 10); // 10진수 변환
    doControlValue(fac, 'OutputLimit', number, '생산량개수');
    console.log('limit entered = ', number);
    e.target.blur();
  }
};

export const Emergency = ({ ison, togglehandler, fac }) => {
  console.log('here', fac);
  return (
    <Box className="guiDetail reset">
      <Title>비상정지</Title>
      <Button
        className="gui emergency"
        onClick={() => emergencyHandleOnClick(fac)}
      >
        Warning
      </Button>
    </Box>
  );
};
export const Edukit = ({ ison, togglehandler, fac }) => {
  return (
    <Box className="guiDetail">
      <Title>에듀킷</Title>
      <GuiDetail
        ison={ison}
        togglehandler={() => edukitHandleOnClick(fac, ison)}
      />
    </Box>
  );
};
export const M1 = ({ ison, togglehandler, fac }) => {
  return (
    <Box className="guiDetail">
      <Title>공정 1</Title>
      <GuiDetail
        ison={ison}
        togglehandler={() => m1GoHandleOnClick(fac, ison)}
      />
    </Box>
  );
};
export const M2 = ({ ison, togglehandler, fac }) => {
  return (
    <Box className="guiDetail">
      <Title>공정 2</Title>
      <GuiDetail
        ison={ison}
        togglehandler={() => m2GoHandleOnClick(fac, ison)}
      />
    </Box>
  );
};
export const M3 = ({ ison, togglehandler, fac }) => {
  return (
    <Box className="guiDetail">
      <Title>공정 3</Title>
      <GuiDetail
        ison={ison}
        togglehandler={() => m3GoHandleOnClick(fac, ison)}
      />
    </Box>
  );
};
export const Reset = ({ ison, togglehandler, fac }) => {
  return (
    <Box className="guiDetail reset">
      <Title>리셋</Title>
      <Button className="gui reset" onClick={() => resetHandleOnClick(fac)}>
        Reset
      </Button>
    </Box>
  );
};
export const DurationTime = ({ ison, togglehandler, fac }) => {
  return (
    <Box className="guiDetail">
      <Title>공정 반복 시간</Title>
      <Box className="small">
        <Input ison={ison} className="gui_a" value={ison} disabled />
        <Input
          ison={ison}
          className="gui_b"
          onKeyDown={(e) => durationTimeHandleOnEnter(e, fac)}
        />
        ms
      </Box>
    </Box>
  );
};
export const ColorCheck = ({ ison, togglehandler, fac }) => {
  return (
    <Box className="guiDetail">
      <Title>색 선별여부</Title>
      <GuiDetail
        ison={ison}
        togglehandler={() => ColorFilterHandleOnClick(fac, ison)}
      />
    </Box>
  );
};
export const Limit = ({ ison, togglehandler, fac }) => {
  return (
    <Box className="guiDetail">
      <Title>생산량 리미트</Title>
      <Box className="small">
        <Input ison={ison} className="gui_a" value={ison} disabled />
        <Input
          ison={ison}
          className="gui_b"
          onKeyDown={(e) => limitHandleOnEnter(e, fac)}
        />{' '}
        개
      </Box>
    </Box>
  );
};
export const Color = ({ ison, togglehandler, fac }) => {
  return (
    <Box className="guiDetail">
      <Title>컬러 센서</Title>
      <GuiDetail
        ison={ison}
        togglehandler={() => colorGoHandleOnClick(fac, ison)}
      />
    </Box>
  );
};
export const Vision = ({ ison, togglehandler, fac }) => {
  return (
    <Box className="guiDetail">
      <Title>비전 센서</Title>
      <GuiDetail
        ison={ison}
        togglehandler={() => visionGoHandleOnClick(fac, ison)}
      />
    </Box>
  );
};
export const M1Simulation = ({ ison, togglehandler, fac }) => {
  return (
    <Box className="guiDetail reset">
      <Title>1번 공정 시운전</Title>
      <Button className="gui" onClick={() => m1SimulatorHandleOnClick(fac)}>
        Press
      </Button>
    </Box>
  );
};
export const M3Simulation1 = ({ ison, togglehandler, fac }) => {
  return (
    <Box className="guiDetail reset">
      <Title>3번 공정 시운전</Title>
      <Button className="gui" onClick={() => m3Simulator1HandleOnClick(fac)}>
        Grip
      </Button>
    </Box>
  );
};
export const M3Simulation2 = ({ ison, togglehandler, fac }) => {
  return (
    <Box className="guiDetail reset">
      <Title> </Title>
      <Button className="gui" onClick={() => m3Simulator2HandleOnClick(fac)}>
        Return
      </Button>
    </Box>
  );
};
