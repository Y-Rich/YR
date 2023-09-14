import React, { useEffect, useState } from 'react';
import { CBox, ChartBox, ChartContainer, GBox } from './style';
import { DoughnutGraph, LineGraph1, LineGraph2, LineGraph3 } from './Graph';
import { Box, Title } from '../../components/Components';
import { m1data, monthM1data, tempHumi } from '../../../services/chart';
import { AiFillAndroid, AiFillAppstore, AiFillSetting } from 'react-icons/ai';

export const F1 = () => {
  const [humi, setHumi] = useState([]);
  const [temp, setTemp] = useState([]);
  const [time, setTime] = useState([]);
  const [dust, setDust] = useState([]);
  const [monthly, setMonthly] = useState([]);
  const [monthlyM1, setMonthlyM1] = useState([]);
  const [monthlyM2, setMonthlyM2] = useState([]);
  const [dailyInput, setDailyInput] = useState([]);
  const [dailyOutput, setDailyOutput] = useState([]);
  useEffect(() => {
    try {
      tempHumi()
        .then((res) => {
          setHumi(res.dailyAvgHumi.map((v) => v.average));
          setTemp(res.dailyAvgTemp.map((v) => v.average));
          setDust(res.dailyAvgPar.map((v) => v.average * 100));
          setTime(res.dailyAvgHumi.map((v) => v.hour));
        })
        .catch((err) => {
          console.error(err);
        });
      m1data()
        .then((res) => {
          setMonthly(res.monthlyAvgLineProdRate);
          setMonthlyM1(res.monthlyAvgLine1defectRate);
          setMonthlyM2(res.monthlyAvgLine2defectRate);
          setDailyInput(res.dailyAvgInput.map((v) => v.total));
          setDailyOutput(res.dailyAvgOutput.map((v) => v.total));
          console.log(dailyInput);
          console.log(res);
        })
        .catch((err) => {
          console.log(err);
        });
      monthM1data()
        .then((res) => {
          console.log(res);
        })
        .catch((err) => {
          console.log(err);
        });
    } catch (err) {
      console.error(err);
    }
  }, []);
  const input = dailyInput.reduce((acc, item) => acc + item, 0);
  const output = dailyOutput.reduce((acc, item) => acc + item, 0);
  const err = Math.round(((input - output) / input) * 100);
  // console.log(humi);
  // console.log(temp);
  // console.log(time);

  return (
    <ChartContainer>
      <ChartBox className="top">
        {/* <CBox className="title"> */}
        <Box className="chart big" style={{ backgroundColor: '#55af58' }}>
          <AiFillAndroid style={{ color: '#adefaf' }} />
          <Box className="chart small">
            <Title className="label">총 생산량</Title>
            <Title
              className="mount"
              // style={{ color: 'green' }}
            >
              {output}
            </Title>
          </Box>
        </Box>
        <Box className="chart big" style={{ backgroundColor: '#3399fe' }}>
          <AiFillAppstore style={{ color: '#e2ecf6' }} />
          <Box className="chart small">
            <Title className="label">총 투입량</Title>
            <Title
              className="mount"
              // style={{ color: 'blue' }}
            >
              {input}
            </Title>
          </Box>
        </Box>
        <Box className="chart big" style={{ backgroundColor: '#e55353' }}>
          <AiFillSetting style={{ color: '#f4dada' }} />
          <Box className="chart small">
            <Title className="label">오류 발생률</Title>
            <Title
              className="mount"
              // style={{ color: 'red' }}
            >
              {err}%
            </Title>
          </Box>
        </Box>
        <Box className="chart big" style={{ backgroundColor: '#f7b115' }}>
          <AiFillSetting style={{ color: '#f9f0dd' }} />
          <Box className="chart small">
            <Title className="label">Line1 총 생산량</Title>
            <Title
              className="mount"
              // style={{ color: 'orange' }}
            >
              99
              {/* {monthly[0].count} */}
            </Title>
          </Box>
        </Box>
        <Box className="chart big" style={{ backgroundColor: '#321fd9' }}>
          <AiFillSetting style={{ color: '#dad8f2' }} />
          <Box className="chart small">
            <Title className="label">Line2 총 생산량</Title>
            <Title
              className="mount"
              // style={{ color: 'red' }}
            >
              1{/* {monthly[1].count} */}
            </Title>
          </Box>
        </Box>
        <Box className="chart big" style={{ backgroundColor: '#26293c' }}>
          <AiFillSetting style={{ color: '#7f83a0' }} />
          <Box className="chart small">
            <Title className="label">Line3 총 생산량</Title>
            <Title className="mount">1{/* {monthly[2].count} */}</Title>
          </Box>
        </Box>
        {/* </CBox> */}
      </ChartBox>
      <ChartBox className="bottom">
        <GBox className="do">
          <DoughnutGraph
            title="공정 별 생산"
            labels={monthly.map((v) => v._id)}
            datas={monthly.map((v) => v.count)}
          />
        </GBox>
        <CBox>
          <GBox>
            <LineGraph2
              title="실시간 공정별 생산 현황"
              labels={time}
              label1="투입량"
              label2="생산량"
              data1={dailyInput}
              data2={dailyOutput}
            />
          </GBox>
          <GBox>
            <LineGraph3
              title="온습도 및 미세먼지 현황"
              labels={time}
              label1="온도"
              label2="습도"
              label3="미세먼지"
              data1={temp}
              data2={humi}
              data3={dust}
            />
          </GBox>
          <GBox>
            <LineGraph1
              title="1호기 생산 현황"
              labels={time}
              label1="1호기"
              data1={dailyInput}
            />
          </GBox>
          <GBox>
            <LineGraph1
              title="2호기 생산 현황"
              labels={time}
              label1="2호기"
              data1={dailyInput}
            />
          </GBox>
        </CBox>
      </ChartBox>
    </ChartContainer>
  );
};
