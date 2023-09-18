import React, { useEffect, useState } from 'react';
import { CBox, ChartBox, ChartContainer, GBox } from './style';
import { DoughnutGraph, LineGraph1, LineGraph2, LineGraph3 } from './Graph';
import { monthM1Data, monthM2Data } from '../../../services/chart';
import Loading from '../../components/Loading';
import { NavContent } from './ChartComponent';

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
        <NavContent
          location="서울"
          factory="전체"
          output={output}
          input={input}
          errName="불량률"
          err={err}
          right1Title="총 재고"
          right1Num={outputF1}
          right2Title="목표 생산량"
          right2Num={input + output}
        />
      </ChartBox>
      <ChartBox className="bottom">
        <GBox className="do">
          <DoughnutGraph
            title="이번 달 총 생산 현황"
            labels={['생산량', '불량']}
            datas={[output, input - output]}
          />
        </GBox>
        <CBox className="admin">
          <GBox className="admin">
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
          <GBox className="admin">
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
