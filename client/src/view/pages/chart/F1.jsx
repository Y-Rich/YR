import React, { useEffect, useState } from 'react';
import { CBox, ChartBox, ChartContainer, GBox } from './style';
import { DoughnutGraph, LineGraph } from './Graph';
import axios from 'axios';
import { Box, Title } from '../../components/Components';
import { tempHumi } from '../../../services/chart';

export const F1 = () => {
  const [humi, setHumi] = useState([]);
  const [temp, setTemp] = useState([]);
  const [time, setTime] = useState([]);
  const [data2_2, setData2_2] = useState([]);
  const [data3_1, setData3_1] = useState([]);
  const [data3_2, setData3_2] = useState([]);
  const [data4_1, setData4_1] = useState([]);
  const [data4_2, setData4_2] = useState([]);
  useEffect(() => {
    try {
      tempHumi()
        .then((res) => {
          setHumi(res.dailyAvgHumi.map((v) => v.average));
          setTemp(res.dailyAvgTemp.map((v) => v.average));
          setTime(res.dailyAvgHumi.map((v) => v.hour));
        })
        .catch((err) => {
          console.error(err);
        });
    } catch (err) {
      console.error(err);
    }
  }, []);
  console.log(humi);
  console.log(temp);
  console.log(time);

  return (
    <ChartContainer>
      매니저
      <ChartBox>
        <CBox className="title">
          <Box className="chart">
            <Title className="label">총 생산량</Title>
            <Title style={{ color: 'green' }}>53</Title>
          </Box>
          <Box className="chart">
            <Title className="label">총 투입량</Title>
            <Title style={{ color: 'blue' }}>59</Title>
          </Box>
          <Box className="chart">
            <Title className="label">오류 발생률</Title>
            <Title style={{ color: 'red' }}>6</Title>
          </Box>
        </CBox>
        <CBox>
          <GBox>
            <LineGraph
              title="실시간 공정별 생산 현황"
              labels={time}
              label1="1호기"
              label2="2호기"
              data1={data3_1}
              data2={data3_2}
            />
          </GBox>
          <GBox>
            <LineGraph
              title="온습도 및 미세먼지 현황"
              labels={time}
              label1="온도"
              label2="습도"
              data1={humi}
              data2={temp}
            />
          </GBox>
        </CBox>
      </ChartBox>
      <ChartBox>
        <GBox className="do">
          <DoughnutGraph />
        </GBox>
      </ChartBox>
    </ChartContainer>
  );
};
