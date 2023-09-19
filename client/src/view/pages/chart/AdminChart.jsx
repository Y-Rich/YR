import React, { useEffect, useState } from 'react';
import { CBox, ChartBox, ChartContainer, GBox } from './style';
import { DoughnutGraph, LineGraph1, LineGraph2, LineGraph3 } from './Graph';
import { monthM1Data, monthM2Data } from '../../../services/chart';
import Loading from '../../components/Loading';
import { NavContent } from './ChartComponent';

export const AdminChart = () => {
  const [loading, setLoading] = useState(true);
  const [day, setDay] = useState([]);
  const [data, setData] = useState({
    monthM1Input: [],
    monthM1Output: [],
    monthM2Input: [],
    monthM2Output: [],
  });
  useEffect(() => {
    try {
      Promise.all([monthM1Data(), monthM2Data()])
        .then(([monthM1DataRes, monthM2DataRes]) => {
          const monthM1 = monthM1DataRes;
          const monthM2 = monthM2DataRes;
          setDay(monthM1.monthlyAvgInput.map((v) => v.day));
          setData({
            monthM1Input: monthM1.monthlyAvgInput.map((v) => v.total),
            monthM1Output: monthM1.monthlyAvgOutput.map((v) => v.total),
            monthM2Input: monthM2.monthlyAvgInput.map((v) => v.total),
            monthM2Output: monthM2.monthlyAvgOutput.map((v) => v.total),
          });
          setLoading(false);
        })
        .catch((err) => {
          console.error(err);
        });
    } catch (err) {
      console.error(err);
    }
  }, []);
  const outputF1 = data.monthM1Output.reduce((acc, item) => acc + item, 0);
  const outputF2 = data.monthM2Output.reduce((acc, item) => acc + item, 0);
  const input =
    data.monthM1Input.reduce((acc, item) => acc + item, 0) +
    data.monthM2Input.reduce((acc, item) => acc + item, 0);
  const output =
    data.monthM1Output.reduce((acc, item) => acc + item, 0) +
    data.monthM2Output.reduce((acc, item) => acc + item, 0);
  const err = Math.round(((input - output) / input) * 100);

  return (
    <ChartContainer>
      {loading ? <Loading /> : null}
      <ChartBox className="top">
        <NavContent
          location="세종, 화성"
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
          {!loading && (
            <DoughnutGraph
              title="이번 달 총 생산 현황"
              labels={['생산량', '불량']}
              datas={[output, input - output]}
            />
          )}
        </GBox>
        <CBox className="admin">
          <GBox className="admin">
            {!loading && (
              <LineGraph2
                title="이번 달 1공장 생산 현황"
                labels={day}
                label1="1공장 생산량"
                label2="1공장 투입량"
                data1={data.monthM1Output}
                data2={data.monthM1Input}
                borderColor1="#3d5a7f"
                borderColor2="#50a753"
                backgroundColor1="#2c405a"
                backgroundColor2="#458d47"
              />
            )}
          </GBox>
          <GBox className="admin">
            {!loading && (
              <LineGraph2
                title="이번 달 2공장 투입 현황"
                labels={day}
                label1="2공장 생산량"
                label2="2공장 투입량"
                data1={data.monthM2Output}
                data2={data.monthM2Input}
                borderColor1="#3d5a7f"
                borderColor2="#50a753"
                backgroundColor1="#2c405a"
                backgroundColor2="#458d47"
              />
            )}
          </GBox>
        </CBox>
      </ChartBox>
    </ChartContainer>
  );
};
