import React, { useEffect, useState } from 'react';

const Data = (messagePayloadEdukit1, webSocket, messagePayloadEnvironment) => {
  const [edukitOnOff, setEdukitOnOff] = useState(0);
  const [m1OnOff, setM1OnOff] = useState(0);
  const [m2OnOff, setM2OnOff] = useState(0);
  const [m3OnOff, setM3OnOff] = useState(0);
  const [colorOnOff, setColorOnOff] = useState(0);
  const [visionOnOff, setVisionOnOff] = useState(0);

  useEffect(() => {
    if (webSocket) {
      messagePayloadEdukit1.Wrapper?.forEach((item) => {
        if (item.tagId === '1') {
          const convertedValue = item.value ? 1 : 0;
          setEdukitOnOff(convertedValue);
        }
        if (item.tagId === '9') {
          const convertedValue = item.value ? 1 : 0;
          setM1OnOff(convertedValue);
        }
        if (item.tagId === '10') {
          const convertedValue = item.value ? 1 : 0;
          setM2OnOff(convertedValue);
        }
        if (item.tagId === '11') {
          const convertedValue = item.value ? 1 : 0;
          setM3OnOff(convertedValue);
        }
        if (item.tagId === '12') {
          const convertedValue = item.value ? 1 : 0;
          setColorOnOff(convertedValue);
        }
        if (item.tagId === '13') {
          const convertedValue = item.value ? 1 : 0;
          setVisionOnOff(convertedValue);
        }
      });
    }
  }, [messagePayloadEdukit1]);

  // 반환할 객체 내에서 상태를 반환
  return {
    edukitOnOff,
    m1OnOff,
    m2OnOff,
    m3OnOff,
    colorOnOff,
    visionOnOff,
  };
};

export default Data;
