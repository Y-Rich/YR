import React, { useEffect, useState, useMemo } from 'react';
import { useControls, Leva } from 'leva';

const GuiController = ({ messagePayload }) => {
  // 상태를 관리하기 위한 useState 훅 사용
  const [edukitOnOff, setEdukitOnOff] = useState(0);
  const [m1OnOff, setM1OnOff] = useState(0);
  const [m2OnOff, setM2OnOff] = useState(0);
  const [m3OnOff, setM3OnOff] = useState(0);

  const edukitOption = useMemo(() => {
    return {
      전체작동: {
        value: edukitOnOff,
        min: 0,
        max: 1,
        step: 1,
      },
    };
  }, [edukitOnOff]);

  const m1Options = useMemo(() => {
    return {
      기기작동: {
        value: m1OnOff,
        min: 0,
        max: 1,
        step: 1,
      },
    };
  }, [m1OnOff]);

  const m2Options = useMemo(() => {
    return {
      기기작동: {
        value: m2OnOff,
        min: 0,
        max: 1,
        step: 1,
      },
    };
  }, [m2OnOff]);

  const m3Options = useMemo(() => {
    return {
      기기작동: {
        value: m3OnOff,
        min: 0,
        max: 1,
        step: 1,
      },
    };
  }, [m3OnOff]);

  useEffect(() => {
    messagePayload.Wrapper?.forEach((item) => {
      if (item.tagId === '1') {
        const convertedValue = item.value ? 1 : 0;
        setEdukitOnOff(convertedValue);
        console.log('edukitonOff', edukitOnOff);
      }
      if (item.tagId === '9') {
        const convertedValue = item.value ? 1 : 0;
        setM1OnOff(convertedValue);
        console.log('m1OnOff', m1OnOff);
      }
      if (item.tagId === '10') {
        const convertedValue = item.value ? 1 : 0;
        setM2OnOff(convertedValue);
        console.log('m2OnOff', m2OnOff);
      }
      if (item.tagId === '11') {
        const convertedValue = item.value ? 1 : 0;
        setM3OnOff(convertedValue);
        console.log('m3OnOff', m3OnOff);
      }
    });
  }, [messagePayload.Wrapper]);

  const edukit = useControls('에듀킷', edukitOption);
  const model1 = useControls('공정1', m1Options);
  const model2 = useControls('공정2', m2Options);
  const model3 = useControls('공정3', m3Options);

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
