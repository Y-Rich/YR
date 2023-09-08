import React, { useEffect, useState } from 'react';
import { CBox, ChartBox, ChartContainer, GBox } from './style';
import Selector from '../../components/Selector';
import { DoughnutGraph, LineGraph } from './Graph';
import axios from 'axios';
import { Box, Title } from '../../components/Components';

export const AdminChart = () => {
  const [data1_1, setData1_1] = useState([]);
  const [data1_2, setData1_2] = useState([]);
  const [data2_1, setData2_1] = useState([]);
  const [data2_2, setData2_2] = useState([]);
  const [data3_1, setData3_1] = useState([]);
  const [data3_2, setData3_2] = useState([]);
  const [data4_1, setData4_1] = useState([]);
  const [data4_2, setData4_2] = useState([]);

  useEffect(() => {
    axios
      .get('http://localhost:3001/mock/chart1.json')
      // .get('http://localhost:3000/mock/chart1.json')
      .then((res) => {
        const data1_1 = res.data.map((item) => item.create);
        const data1_2 = res.data.map((item) => item.error);
        setData1_1(data1_1);
        setData1_2(data1_2);
      })
      .catch((err) => {
        console.log(err);
      });
    axios
      .get('http://localhost:3001/mock/chart2.json')
      // .get('http://localhost:3000/mock/chart2.json')
      .then((res) => {
        const data2_1 = res.data.map((item) => item.create);
        const data2_2 = res.data.map((item) => item.error);
        setData2_1(data2_1);
        setData2_2(data2_2);
      })
      .catch((err) => {
        console.log(err);
      });
    axios
      .get('http://localhost:3001/mock/chart3.json')
      // .get('http://localhost:3000/mock/chart3.json')
      .then((res) => {
        const data3_1 = res.data.map((item) => item.create);
        const data3_2 = res.data.map((item) => item.error);
        setData3_1(data3_1);
        setData3_2(data3_2);
      })
      .catch((err) => {
        console.log(err);
      });
    axios
      .get('http://localhost:3001/mock/chart4.json')
      // .get('http://localhost:3000/mock/chart4.json')
      .then((res) => {
        const data4_1 = res.data.map((item) => item.temp);
        const data4_2 = res.data.map((item) => item.dust);
        setData4_1(data4_1);
        setData4_2(data4_2);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  return (
    <ChartContainer>
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
              title="2호기"
              label1="생산량"
              label2="오류율"
              data1={data3_1}
              data2={data3_2}
            />
          </GBox>
          <GBox>
            <LineGraph
              title="2호기"
              label1="생산량"
              label2="오류율"
              data1={data3_1}
              data2={data3_2}
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