import React, { useEffect, useState } from 'react';
import { CBox, ChartBox, ChartContainer, GBox, TitleBox } from './style';
import { DoughnutGraph, LineGraph } from './Graph';
import axios from 'axios';
import { Box, Title } from '../../components/Components';

export const Worker = ({ fac, line, userName }) => {
  console.log(fac, line, userName);
  const lineNumber = line[line.length - 1] + '호기';
  const [chartData, setChartData] = useState({
    data1_1: [],
    data1_2: [],
    data2_1: [],
    data2_2: [],
    data3_1: [],
    data3_2: [],
    data4_1: [],
    data4_2: [],
  });

  useEffect(() => {
    const fetchData = async (url, dataKey) => {
      try {
        const res = await axios.get(url);
        const newData = {
          [dataKey + '_1']: res.data.map((item) => item.create),
          [dataKey + '_2']: res.data.map((item) => item.error),
        };
        setChartData((prevData) => ({ ...prevData, ...newData }));
      } catch (err) {
        console.log(err);
      }
    };
    // fetchData('http://localhost:3001/mock/chart1.json', 'data1');
    // fetchData('http://localhost:3001/mock/chart2.json', 'data2');
    // fetchData('http://localhost:3001/mock/chart3.json', 'data3');
    // fetchData('http://localhost:3001/mock/chart4.json', 'data4');
    fetchData('http://localhost:3000/mock/chart1.json', 'data1');
    fetchData('http://localhost:3000/mock/chart2.json', 'data2');
    fetchData('http://localhost:3000/mock/chart3.json', 'data3');
    fetchData('http://localhost:3000/mock/chart4.json', 'data4');
  }, []);

  return (
    <ChartContainer>
      워커
      <ChartBox className="left">
        <Box className="chart title">
          <CBox>
            <p>담당자: {userName}</p>
            <p>
              소속: {fac} - {line}
            </p>
          </CBox>
          <TitleBox>
            <CBox className="title">
              <Title className="label">{lineNumber} 생산량</Title>
              <Title style={{ color: 'green' }}>53</Title>
            </CBox>
            <CBox className="title">
              <Title className="label">{lineNumber} 투입량</Title>
              <Title style={{ color: 'blue' }}>59</Title>
            </CBox>
            <CBox className="title">
              <Title className="label">오류 발생률</Title>
              <Title style={{ color: 'red' }}>6</Title>
            </CBox>
          </TitleBox>
        </Box>
        <Box className="chart graph">
          <GBox>
            <LineGraph
              title={lineNumber}
              label1="생산량"
              label2="오류율"
              data1={chartData.data1_1}
              data2={chartData.data1_2}
            />
          </GBox>
          <GBox>
            <LineGraph
              title={lineNumber}
              label1="생산량"
              label2="오류율"
              data1={chartData.data2_1}
              data2={chartData.data2_1}
            />
          </GBox>
        </Box>
      </ChartBox>
      <ChartBox>
        <GBox className="do">
          <DoughnutGraph />
        </GBox>
      </ChartBox>
    </ChartContainer>
  );
};
