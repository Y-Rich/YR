import React, { useEffect, useState, useMemo } from 'react';
import { useControls, Leva } from 'leva';
import axios from 'axios';

const GuiController = ({ messagePayloadEdukit1, webSocket }) => {
  // 상태를 관리하기 위한 useState 훅 사용
  const [edukitOnOff, setEdukitOnOff] = useState(0);
  const [m1OnOff, setM1OnOff] = useState(0);
  const [m2OnOff, setM2OnOff] = useState(0);
  const [m3OnOff, setM3OnOff] = useState(0);

  const edukitOption = useMemo(() => {
    return {
      공장전원: {
        value: edukitOnOff,
        min: 0,
        max: 1,
        step: 1,
      },
    };
  }, [edukitOnOff]);

  const m1Options = useMemo(() => {
    return {
      공정1전원: {
        value: m1OnOff,
        min: 0,
        max: 1,
        step: 1,
      },
    };
  }, [m1OnOff]);

  const m2Options = useMemo(() => {
    return {
      공정2전원: {
        value: m2OnOff,
        min: 0,
        max: 1,
        step: 1,
      },
    };
  }, [m2OnOff]);

  const m3Options = useMemo(() => {
    return {
      공정3전원: {
        value: m3OnOff,
        min: 0,
        max: 1,
        step: 1,
      },
    };
  }, [m3OnOff]);

  const resetOptions = useMemo(() => {
    return {
      리셋: {
        value: 0,
        min: 0,
        max: 1,
        step: 1,
      },
    };
  });

  const secOptions = useMemo(() => {
    return {
      밀리초: 100,
    };
  });

  const colorOptions = useMemo(() => {
    return {
      색선별: {
        value: 0,
        min: 0,
        max: 1,
        step: 1,
      },
    };
  });

  const outputOptions = useMemo(() => {
    return {
      개: 10,
    };
  });

  const { 공장전원 } = useControls('에듀킷', edukitOption);
  const { 공정1전원 } = useControls('공정1', m1Options);
  const { 공정2전원 } = useControls('공정2', m2Options);
  const { 공정3전원 } = useControls('공정3', m3Options);
  const { 리셋 } = useControls('리셋', resetOptions);
  const { 밀리초 } = useControls('공정반복시간', secOptions);
  const { 색선별 } = useControls('색선별여부', colorOptions);
  const { 개 } = useControls('생산량리미트', outputOptions);

  // 에듀킷 제어
  const startToEdukit = () => {
    if (webSocket && 공장전원 === 1) {
      const data = JSON.stringify({ tagId: '1', value: '1' });
      webSocket.send(data);
      console.log('Data sent to the server: 1');
    }
  };
  const stopToEdukit = () => {
    if (webSocket && 공장전원 === 0) {
      const data = JSON.stringify({ tagId: '1', value: '0' });
      webSocket.send(data);
      console.log('Data sent to the server: 0');
    }
  };

  // 공정1 제어
  const startToM1 = () => {
    if (webSocket && 공정1전원 === 1) {
      const data = JSON.stringify({ tagId: '9', value: '1' });
      webSocket.send(data);
      console.log('Data sent to the server: 1');
    }
  };
  const stopToM1 = () => {
    if (webSocket && 공정1전원 === 0) {
      const data = JSON.stringify({ tagId: '9', value: '0' });
      webSocket.send(data);
      console.log('Data sent to the server: 0');
    }
  };

  // 공정2 제어
  const startToM2 = () => {
    if (webSocket && 공정2전원 === 1) {
      const data = JSON.stringify({ tagId: '10', value: '1' });
      webSocket.send(data);
      console.log('Data sent to the server: 1');
    }
  };
  const stopToM2 = () => {
    if (webSocket && 공정2전원 === 0) {
      const data = JSON.stringify({ tagId: '10', value: '0' });
      webSocket.send(data);
      console.log('Data sent to the server: 0');
    }
  };

  // 공정3 제어
  const startToM3 = () => {
    if (webSocket && 공정3전원 === 1) {
      const data = JSON.stringify({ tagId: '11', value: '1' });
      webSocket.send(data);
      console.log('Data sent to the server: 1');
    }
  };
  const stopToM3 = () => {
    if (webSocket && 공정3전원 === 0) {
      const data = JSON.stringify({ tagId: '11', value: '0' });
      webSocket.send(data);
      console.log('Data sent to the server: 0');
    }
  };

  // 리셋 제어
  const startToReset = () => {
    if (webSocket && 리셋 === 1) {
      const data = JSON.stringify({ tagId: '8', value: '1' });
      webSocket.send(data);
      console.log('Data sent to the server: reset');
    }
  };

  // 공정반복시간 제어
  const startToSeconds = () => {
    if (webSocket) {
      const num = 밀리초;
      const data = JSON.stringify({ tagId: '14', value: num.toString() });
      webSocket.send(data);
      console.log(`Data sent to the server: ${num.toString()}`);
    }
  };

  // 색선별 제어
  const startToColor = () => {
    if (webSocket && 색선별 === 1) {
      const data = JSON.stringify({ tagId: '31', value: '1' }); // 모두
      webSocket.send(data);
      console.log('Data sent to the server: 1');
    }
  };
  const stopToColor = () => {
    if (webSocket && 색선별 === 0) {
      const data = JSON.stringify({ tagId: '31', value: '0' }); // 색선별
      webSocket.send(data);
      console.log('Data sent to the server: 0');
    }
  };

  // 생산량리미트 제어
  const startToLimit = () => {
    if (webSocket) {
      const num = 개;
      const data = JSON.stringify({ tagId: '36', value: num.toString() });
      webSocket.send(data);
      console.log(`Data sent to the server: ${num.toString()}`);
    }
  };

  // ---------------------------------------------------------------

  // - **전체공정 정지** : "stop"   → 비상정지로 쓰세요
  // - **전체공정 시작** : "start"
  // - **1번 공정 시운전** : "No1_Action"
  // - **전체 공정 리셋**:  "Reset"    → 생산량이 초기값으로 설정됩니다.
  // - **1번 공정 전원** : "No1_ON" / "No1_OFF"
  // - **2번 공정 전원** : "No2_ON" / "No2_OFF"
  // - **3번 공정 전원** : "No3_ON" / "No3_OFF"
  // - **컬러센서 전원** : "sen1_ON" / "sen1_OFF"
  // - **비전센서 전원** : "sen2_ON" / "sen2_OFF"
  // - **1 공정의 반출 속도 조절** : "No1Delay"    -> 생산속도 조절이 가능하다. → "value에 원하는 시간 같이 보낸다.(10=1s)" 50은 5초...
  // - **2 공정 가공방법 선택** : "No2Mode_all" / "No2Mode_color" // -> "No2Mode_all" :모두, "No2Mode_color" : 색선별해서 흰색만 주사위준다. // 1호기의 칩색깔을 구분해서 주사위를 줄때 쓴다.
  // - **전체공정 생산량조절** : "OutputLimit" - 1호기 낼름 횟수 제한한다.... // value에 원하는 최대 생산량을 보낸다. 예를들어 value = 50 이면 전체 공정의 최대생산량은 50이다.
  // - **3 공정의 시운전** : "No3Gripper_ON" / "No3Gripper_OFF"

  const 전체공정_정지 = async () => {
    try {
      const response = await axios.post(
        'http://localhost:8000/control/edukit1',
        {
          command: 'stop',
        }
      );
      console.log('Success:', response.data);
      return response.data;
    } catch (error) {
      console.error('Failed to 전체공정_정지:', error);
      throw error;
    }
  };

  const 전체공정_시작 = async () => {
    try {
      const response = await axios.post(
        'http://localhost:8000/control/edukit1',
        {
          command: 'start',
        }
      );
      console.log('Success:', response.data);
      return response.data;
    } catch (error) {
      console.error('Failed to 전체공정_시작:', error);
      throw error;
    }
  };

  const 전체공정_리셋 = async () => {
    try {
      const response = await axios.post(
        'http://localhost:8000/control/edukit1',
        {
          command: 'Reset',
        }
      );
      console.log('Success:', response.data);
      return response.data;
    } catch (error) {
      console.error('Failed to 전체공정_리셋:', error);
      throw error;
    }
  };

  const 공정1_전원ON = async () => {
    try {
      const response = await axios.post(
        'http://localhost:8000/control/edukit1',
        {
          command: 'No1_ON',
        }
      );
      console.log('Success:', response.data);
      return response.data;
    } catch (error) {
      console.error('Failed to 공정1_전원ON:', error);
      throw error;
    }
  };

  const 공정2_전원ON = async () => {
    try {
      const response = await axios.post(
        'http://localhost:8000/control/edukit1',
        {
          command: 'No2_ON',
        }
      );
      console.log('Success:', response.data);
      return response.data;
    } catch (error) {
      console.error('Failed to 공정2_전원ON:', error);
      throw error;
    }
  };

  const 공정3_전원ON = async () => {
    try {
      const response = await axios.post(
        'http://localhost:8000/control/edukit1',
        {
          command: 'No3_ON',
        }
      );
      console.log('Success:', response.data);
      return response.data;
    } catch (error) {
      console.error('Failed to 공정3_전원ON:', error);
      throw error;
    }
  };

  const 공정1_전원OFF = async () => {
    try {
      const response = await axios.post(
        'http://localhost:8000/control/edukit1',
        {
          command: 'No1_OFF',
        }
      );
      console.log('Success:', response.data);
      return response.data;
    } catch (error) {
      console.error('Failed to 공정1_전원OFF:', error);
      throw error;
    }
  };

  const 공정2_전원OFF = async () => {
    try {
      const response = await axios.post(
        'http://localhost:8000/control/edukit1',
        {
          command: 'No2_OFF',
        }
      );
      console.log('Success:', response.data);
      return response.data;
    } catch (error) {
      console.error('Failed to 공정2_전원OFF:', error);
      throw error;
    }
  };

  const 공정3_전원OFF = async () => {
    try {
      const response = await axios.post(
        'http://localhost:8000/control/edukit1',
        {
          command: 'No3_OFF',
        }
      );
      console.log('Success:', response.data);
      return response.data;
    } catch (error) {
      console.error('Failed to 공정3_전원OFF:', error);
      throw error;
    }
  };

  const 컬러센서_전원ON = async () => {
    try {
      const response = await axios.post(
        'http://localhost:8000/control/edukit1',
        {
          command: 'sen1_ON',
        }
      );
      console.log('Success:', response.data);
      return response.data;
    } catch (error) {
      console.error('Failed to 컬러센서_전원ON:', error);
      throw error;
    }
  };

  const 컬러센서_전원OFF = async () => {
    try {
      const response = await axios.post(
        'http://localhost:8000/control/edukit1',
        {
          command: 'sen1_OFF',
        }
      );
      console.log('Success:', response.data);
      return response.data;
    } catch (error) {
      console.error('Failed to 컬러센서_전원OFF:', error);
      throw error;
    }
  };

  const 비전센서_전원ON = async () => {
    try {
      const response = await axios.post(
        'http://localhost:8000/control/edukit1',
        {
          command: 'sen2_ON',
        }
      );
      console.log('Success:', response.data);
      return response.data;
    } catch (error) {
      console.error('Failed to 비전센서_전원ON:', error);
      throw error;
    }
  };

  const 비전센서_전원OFF = async () => {
    try {
      const response = await axios.post(
        'http://localhost:8000/control/edukit1',
        {
          command: 'sen2_OFF',
        }
      );
      console.log('Success:', response.data);
      return response.data;
    } catch (error) {
      console.error('Failed to 비전센서_전원OFF:', error);
      throw error;
    }
  };

  const 반출속도 = async () => {
    try {
      const response = await axios.post(
        'http://localhost:8000/control/edukit1',
        {
          command: 'No1Delay',
          value: 999,
        }
      );
      console.log('Success:', response.data);
      return response.data;
    } catch (error) {
      console.error('Failed to 반출속도:', error);
      throw error;
    }
  };

  const 가공방법_모두 = async () => {
    try {
      const response = await axios.post(
        'http://localhost:8000/control/edukit1',
        {
          command: 'No2Mode_all',
        }
      );
      console.log('Success:', response.data);
      return response.data;
    } catch (error) {
      console.error('Failed to 가공방법_모두:', error);
      throw error;
    }
  };

  const 가공방법_선별 = async () => {
    try {
      const response = await axios.post(
        'http://localhost:8000/control/edukit1',
        {
          command: 'No2Mode_color',
        }
      );
      console.log('Success:', response.data);
      return response.data;
    } catch (error) {
      console.error('Failed to 가공방법_선별:', error);
      throw error;
    }
  };

  const 생산량조절 = async () => {
    try {
      const response = await axios.post(
        'http://localhost:8000/control/edukit1',
        {
          command: 'OutputLimit',
          value: 999,
        }
      );
      console.log('Success:', response.data);
      return response.data;
    } catch (error) {
      console.error('Failed to 생산량조절:', error);
      throw error;
    }
  };

  const 공정1_시운전 = async () => {
    try {
      const response = await axios.post(
        'http://localhost:8000/control/edukit1',
        {
          command: 'No1_Action',
        }
      );
      console.log('Success:', response.data);
      return response.data;
    } catch (error) {
      console.error('Failed to 공정1_시운전:', error);
      throw error;
    }
  };

  const 공정3_시운전ON = async () => {
    try {
      const response = await axios.post(
        'http://localhost:8000/control/edukit1',
        {
          command: 'No3Gripper_ON',
        }
      );
      console.log('Success:', response.data);
      return response.data;
    } catch (error) {
      console.error('Failed to 공정3_시운전ON:', error);
      throw error;
    }
  };

  const 공정3_시운전OFF = async () => {
    try {
      const response = await axios.post(
        'http://localhost:8000/control/edukit1',
        {
          command: 'No3Gripper_OFF',
        }
      );
      console.log('Success:', response.data);
      return response.data;
    } catch (error) {
      console.error('Failed to 공정3_시운전OFF:', error);
      throw error;
    }
  };

  // ---------------------------------------------------------------

  useEffect(() => {
    startToEdukit();
    stopToEdukit();
  }, [공장전원]);

  useEffect(() => {
    startToM1();
    stopToM1();
  }, [공정1전원]);

  useEffect(() => {
    startToM2();
    stopToM2();
  }, [공정2전원]);

  useEffect(() => {
    startToM3();
    stopToM3();
  }, [공정3전원]);

  useEffect(() => {
    startToReset();
  }, [리셋]);

  useEffect(() => {
    startToSeconds();
  }, [밀리초]);

  useEffect(() => {
    startToColor();
    stopToColor();
  }, [색선별]);

  useEffect(() => {
    startToLimit();
  }, [개]);

  return <></>;
};

export default GuiController;

// const [{ text }, set] = useControls(() => ({ text: 'my string' }));

// return (
//   <input
//     type="text"
//     value={text}
//     onChange={(e) => set({ text: e.target.value })}
//   />
// );
