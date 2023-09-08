import React, { useEffect, useState, useMemo } from 'react';
import { useControls, Leva } from 'leva';

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

  // useEffect(() => {
  //   messagePayload.Wrapper?.forEach((item) => {
  //     if (item.tagId === '1') {
  //       const convertedValue = item.value ? 1 : 0;
  //       setEdukitOnOff(convertedValue);
  //       console.log('edukitonOff', edukitOnOff);
  //     }
  //     if (item.tagId === '9') {
  //       const convertedValue = item.value ? 1 : 0;
  //       setM1OnOff(convertedValue);
  //       console.log('m1OnOff', m1OnOff);
  //     }
  //     if (item.tagId === '10') {
  //       const convertedValue = item.value ? 1 : 0;
  //       setM2OnOff(convertedValue);
  //       console.log('m2OnOff', m2OnOff);
  //     }
  //     if (item.tagId === '11') {
  //       const convertedValue = item.value ? 1 : 0;
  //       setM3OnOff(convertedValue);
  //       console.log('m3OnOff', m3OnOff);
  //     }
  //   });
  // }, [messagePayload.Wrapper]);

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
