import React, { useEffect, useState } from 'react';

const Data = ({
  messagePayloadEdukit1,
  webSocket,
  messagePayloadEnvironment,
}) => {
  const [edukitOnOff, setEdukitOnOff] = useState(0);
  const [m1OnOff, setM1OnOff] = useState(0);
  const [m2OnOff, setM2OnOff] = useState(0);
  const [m3OnOff, setM3OnOff] = useState(0);
  const [colorOnOff, setColorOnOff] = useState(0);
  const [visionOnOff, setVisionOnOff] = useState(0);
  const [repeatedSec, setRrepeatedSec] = useState(0);
  // 3호기 축
  const [No3Motor1, setNo3Motor1] = useState(0);
  const [No3Motor2, setNo3Motor2] = useState(0);
  const [No2Mode, setNo2Mode] = useState(0);

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
        if (item.tagId === '14') {
          const convertedValue = item.value;
          setRrepeatedSec(convertedValue);
        }
        if (item.tagId === '21') {
          const convertedValue = item.value;
          setNo3Motor1(convertedValue);
        }
        if (item.tagId === '22') {
          const convertedValue = item.value;
          setNo3Motor2(convertedValue);
        }
        if (item.tagId === '31') {
          const convertedValue = item.value;
          setNo2Mode(convertedValue);
        }
      });
    }
  }, [messagePayloadEdukit1]);

  // 데이터 반환
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
