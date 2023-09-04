import React, { useEffect, useState } from 'react';
import { ChartBox, ChartContainer } from './style';
import Selector from '../../components/Selector';
import Graph from './Graph';
import axios from 'axios';

const Chart = () => {
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
        <Graph
          title="총 생산량"
          label1="생산량"
          label2="오류율"
          data1={data1_1}
          data2={data1_2}
        />
      </ChartBox>
      <ChartBox>
        <Graph
          title="1호기"
          label1="생산량"
          label2="오류율"
          data1={data2_1}
          data2={data2_2}
        />
      </ChartBox>
      <ChartBox>
        <Graph
          title="2호기"
          label1="생산량"
          label2="오류율"
          data1={data3_1}
          data2={data3_2}
        />
      </ChartBox>
      <ChartBox>
        <Graph
          title="센서정보"
          label1="온습도"
          label2="미세먼지"
          data1={data4_1}
          data2={data4_2}
        />
      </ChartBox>
      <Selector />
    </ChartContainer>
  );
};

export default Chart;
