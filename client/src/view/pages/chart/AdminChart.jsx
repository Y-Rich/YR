import React, { useEffect, useState } from 'react';
import { CBox, ChartBox, ChartContainer, GBox } from './style';
import { DoughnutGraph, LineGraph1, LineGraph2, LineGraph3 } from './Graph';
import { Box, Title } from '../../components/Components';
import { monthM1Data, monthM2Data } from '../../../services/chart';
import { AiFillAndroid, AiFillAppstore, AiFillSetting } from 'react-icons/ai';
import Loading from '../../components/Loading';

export const AdminChart = () => {
  const [loading, setLoading] = useState(true);
  const [day, setDay] = useState([]);

  const [monthM1Input, setMonthM1Input] = useState([]);
  const [monthM1Output, setMonthM1Output] = useState([]);
  const [monthM1Line1Defect, setMonthM1Line1Defect] = useState([]);
  const [monthM1Line2Defect, setMonthM1Line2Defect] = useState([]);
  const [monthM1ProdRate, setMonthM1ProdRate] = useState([]);

  const [monthM2Input, setMonthM2Input] = useState([]);
  const [monthM2Output, setMonthM2Output] = useState([]);
  const [monthM2Line1Defect, setMonthM2Line1Defect] = useState([]);
  const [monthM2Line2Defect, setMonthM2Line2Defect] = useState([]);
  const [monthM2ProdRate, setMonthM2ProdRate] = useState([]);
  // const [monthM1, setMonthM1] = useState([]);
  useEffect(() => {
    try {
      monthM1Data()
        .then((res) => {
          setDay(res.monthlyAvgInput.map((v) => v.day));
          setMonthM1Input(res.monthlyAvgInput.map((v) => v.total));
          setMonthM1Output(res.monthlyAvgOutput.map((v) => v.total));
          setMonthM1Line1Defect(
            res.monthlyAvgLine1defectRate.map((v) => v.DefectRatio)
          );
          setMonthM1Line2Defect(
            res.monthlyAvgLine2defectRate.map((v) => v.DefectRatio)
          );
          setMonthM1ProdRate(res.monthlyAvgLineProdRate);
          setLoading(false);
        })
        .catch((err) => {
          console.log(err);
        });
      monthM2Data()
        .then((res) => {
          setMonthM2Input(res.monthlyAvgInput.map((v) => v.total));
          setMonthM2Output(res.monthlyAvgOutput.map((v) => v.total));
          setMonthM2Line1Defect(
            res.monthlyAvgLine1defectRate.map((v) => v.DefectRatio)
          );
          setMonthM2Line2Defect(
            res.monthlyAvgLine2defectRate.map((v) => v.DefectRatio)
          );
          setMonthM2ProdRate(res.monthlyAvgLineProdRate);
          setLoading(false);
        })
        .catch((err) => {
          console.log(err);
        });
    } catch (err) {
      console.error(err);
    }
  }, [monthM2Input]);
  const outputF1 = monthM1Output.reduce((acc, item) => acc + item, 0);
  const outputF2 = monthM2Output.reduce((acc, item) => acc + item, 0);
  const input =
    monthM1Input.reduce((acc, item) => acc + item, 0) +
    monthM2Input.reduce((acc, item) => acc + item, 0);
  const output =
    monthM1Output.reduce((acc, item) => acc + item, 0) +
    monthM2Output.reduce((acc, item) => acc + item, 0);
  const err = Math.round(((input - output) / input) * 100);

  return (
    <ChartContainer>
      {loading ? <Loading /> : null}
      <ChartBox className="top">
        {/* <CBox className="title"> */}
        <Box className="chart big" style={{ backgroundColor: '#293242' }}>
          <AiFillSetting style={{ color: '#7f83a0' }} />
          <Box className="chart small">
            <Title className="label">공장 : 서울특별시 강남구</Title>
            <Title className="mount">전체{/* {monthM1ly[2].count} */}</Title>
          </Box>
        </Box>
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
        <Box className="chart big" style={{ backgroundColor: '#3d5a7f' }}>
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
        <Box className="chart big" style={{ backgroundColor: '#ef6e4e' }}>
          <AiFillSetting style={{ color: '#f4dada' }} />
          <Box className="chart small">
            <Title className="label">불량률</Title>
            <Title
              className="mount"
              // style={{ color: 'red' }}
            >
              {/* {(monthM1Line1Defect +
                monthM1Line2Defect +
                monthM2Line1Defect +
                monthM2Line2Defect) *
                100} */}
              {err}%
            </Title>
          </Box>
        </Box>
        <Box className="chart big" style={{ backgroundColor: '#97c0db' }}>
          <AiFillSetting style={{ color: '#f9f0dd' }} />
          <Box className="chart small">
            <Title className="label">총 재고</Title>
            <Title
              className="mount"
              // style={{ color: 'orange' }}
            >
              {outputF1}
              {/* {monthM1ly[0].count} */}
            </Title>
          </Box>
        </Box>
        <Box className="chart big" style={{ backgroundColor: '#321fd9' }}>
          <AiFillSetting style={{ color: '#dad8f2' }} />
          <Box className="chart small">
            <Title className="label">목표 생산량</Title>
            <Title
              className="mount"
              // style={{ color: 'red' }}
            >
              {input + output}
              {/* {monthM1ly[1].count} */}
            </Title>
          </Box>
        </Box>
        {/* </CBox> */}
      </ChartBox>
      <ChartBox className="bottom">
        <GBox className="do">
          <DoughnutGraph
            title="이번 달 총 생산 현황"
            labels={['생산량', '불량']}
            datas={[output, input - output]}
          />
        </GBox>
        <CBox>
          <GBox>
            <LineGraph2
              title="이번 달 1공장 생산 현황"
              labels={day}
              label1="1공장 생산량"
              label2="1공장 투입량"
              data1={monthM1Output}
              data2={monthM1Input}
              borderColor1="#3d5a7f"
              borderColor2="#50a753"
              backgroundColor1="#2c405a"
              backgroundColor2="#458d47"
            />
          </GBox>
          <GBox>
            <LineGraph2
              title="이번 달 2공장 투입 현황"
              labels={day}
              label1="2공장 생산량"
              label2="2공장 투입량"
              data1={monthM2Output}
              data2={monthM2Input}
              borderColor1="#3d5a7f"
              borderColor2="#50a753"
              backgroundColor1="#2c405a"
              backgroundColor2="#458d47"
            />
          </GBox>
        </CBox>
      </ChartBox>
    </ChartContainer>
  );
};
