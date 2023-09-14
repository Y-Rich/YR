import React, { useEffect, useState } from 'react';
import { CBox, ChartBox, ChartContainer, GBox } from './style';
import { DoughnutGraph, LineGraph1, LineGraph2, LineGraph3 } from './Graph';
import { Box, Title } from '../../components/Components';
import { tempHumi } from '../../../services/chart';
import { AiFillAndroid, AiFillAppstore, AiFillSetting } from 'react-icons/ai';

export const F2 = () => {
  const [humi, setHumi] = useState([]);
  const [temp, setTemp] = useState([]);
  const [time, setTime] = useState([]);
  const [dust, setDust] = useState([]);
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
          setDust(res.dailyAvgPar.map((v) => v.average * 100));
          setTime(res.dailyAvgHumi.map((v) => v.hour));
        })
        .catch((err) => {
          console.error(err);
        });
    } catch (err) {
      console.error(err);
    }
  }, []);
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
              53
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
              59
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
              6
            </Title>
          </Box>
        </Box>
        <Box className="chart big" style={{ backgroundColor: '#f7b115' }}>
          <AiFillSetting style={{ color: '#f9f0dd' }} />
          <Box className="chart small">
            <Title className="label">모였지</Title>
            <Title
              className="mount"
              // style={{ color: 'orange' }}
            >
              99
            </Title>
          </Box>
        </Box>
        <Box className="chart big" style={{ backgroundColor: '#321fd9' }}>
          <AiFillSetting style={{ color: '#dad8f2' }} />
          <Box className="chart small">
            <Title className="label">오류 발생률</Title>
            <Title
              className="mount"
              // style={{ color: 'red' }}
            >
              6
            </Title>
          </Box>
        </Box>
        <Box className="chart big" style={{ backgroundColor: '#26293c' }}>
          <AiFillSetting style={{ color: '#7f83a0' }} />
          <Box className="chart small">
            <Title className="label">오류 발생률</Title>
            <Title className="mount">6</Title>
          </Box>
        </Box>
        {/* </CBox> */}
      </ChartBox>
      <ChartBox className="bottom">
        <GBox className="do">
          <DoughnutGraph />
        </GBox>
        <CBox>
          <GBox>
            <LineGraph2
              title="실시간 공정별 생산 현황"
              labels={time}
              label1="1호기"
              label2="2호기"
              data1={data3_1}
              data2={data3_2}
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
              title="실시간 공정별 생산 현황"
              labels={time}
              label1="1호기"
              label2="2호기"
              data1={data3_1}
              data2={data3_2}
            />
          </GBox>
          <GBox>
            <LineGraph1
              title="실시간 공정별 생산 현황"
              labels={time}
              label1="1호기"
              label2="2호기"
              data1={data3_1}
              data2={data3_2}
            />
          </GBox>
        </CBox>
      </ChartBox>
    </ChartContainer>
  );
};
