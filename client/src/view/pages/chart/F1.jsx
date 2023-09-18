import React, { useEffect, useState } from 'react';
import { CBox, ChartBox, ChartContainer, GBox } from './style';
import { DoughnutGraph, LineGraph1, LineGraph2, LineGraph3 } from './Graph';
import { dailyM1Data, tempHumi } from '../../../services/chart';
import Loading from '../../components/Loading';
import { NavContent, ChartModal } from './ChartComponent';

export const F1 = () => {
  const [loading, setLoading] = useState(true);
  const [modal, setModal] = useState(false);
  const [data, setData] = useState({
    humi: [],
    temp: [],
    time: [],
    dust: [],
    dailyInput: [],
    dailyOutput: [],
    dailyLine1Defect: [],
    dailyLine2Defect: [],
    dailyLine1DefectRatio: [],
    dailyLine2DefectRatio: [],
    dailyProdRate: [],
  });
  const handleClick = () => {
    setModal(true);
  };

  useEffect(() => {
    try {
      tempHumi()
        .then((res) => {
          setData((prevData) => ({
            ...prevData,
            humi: res.dailyAvgHumi.map((v) => v.average),
            temp: res.dailyAvgTemp.map((v) => v.average),
            dust: res.dailyAvgPar.map((v) => v.average * 100),
            time: res.dailyAvgHumi.map((v) => v.hour),
          }));
        })
        .catch((err) => {
          console.error(err);
        });
      dailyM1Data()
        .then((res) => {
          setData((prevData) => ({
            ...prevData,
            dailyInput: res.dailyAvgInput.map((v) => v.total),
            dailyOutput: res.dailyAvgOutput.map((v) => v.total),
            dailyLine1Defect: res.dailyAvgLine1defectRate[0]?.Detail?.map(
              (v) => v.DefectProducts
            ),
            dailyLine2Defect: res.dailyAvgLine2defectRate[0]?.Detail?.map(
              (v) => v.DefectProducts
            ),
            dailyLine1DefectRatio: res.dailyAvgLine1defectRate[0]?.Detail?.map(
              (v) => v.DefectRatio
            ),
            dailyLine2DefectRatio: res.dailyAvgLine2defectRate[0]?.Detail?.map(
              (v) => v.DefectRatio
            ),
            dailyProdRate: res.dailyAvgLine2defectRate[0]?.Detail?.map(
              (v) => v.ProductionRate
            ),
          }));
          setLoading(false);
        })
        .catch((err) => {
          console.log(err);
          setLoading(false);
        });
    } catch (err) {
      console.error(err);
    }
  }, []);
  const { dailyInput, dailyOutput, time, temp, humi, dust } = data;
  const input = dailyInput.reduce((acc, item) => acc + item, 0);
  const output = dailyOutput.reduce((acc, item) => acc + item, 0);
  const err = Math.round(((input - output) / input) * 100);

  return (
    <ChartContainer>
      {loading ? <Loading /> : null}
      <ChartBox className="top">
        <NavContent
          location="서울"
          factory="Fac1"
          output={output}
          input={input}
          errName="오류 발생률"
          err={err}
          right1Title="Line1 불량"
          right1Num="99"
          right2Title="Line2 불량"
          right2Num="1"
        />
      </ChartBox>
      <ChartBox className="bottom">
        <GBox className="do">
          <DoughnutGraph
            title="공정 별 생산"
            labels={['생산량', '불량']}
            datas={[output, input - output]}
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
              borderColor1="#3d5a7f"
              borderColor2="#50a753"
              backgroundColor1="#2c405a"
              backgroundColor2="#458d47"
            />
          </GBox>
          <GBox onClick={handleClick} className="modal">
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
          {modal && (
            <ChartModal
              setModal={setModal}
              time={time}
              dust={dust}
              temp={temp}
              humi={humi}
            />
          )}
          <GBox>
            <LineGraph2
              title="일별 불량 개수"
              labels={time}
              label1="1호기"
              label2="2호기"
              data1={data.dailyLine1Defect}
              data2={data.dailyLine2Defect}
              borderColor1="#FF7272"
              borderColor2="#FFB5B5"
              backgroundColor1="#FF7272"
              backgroundColor2="#FFB5B5"
            />
          </GBox>
          <GBox>
            <LineGraph2
              title="일별 불량률"
              labels={time}
              label1="1호기"
              label2="2호기"
              data1={data.dailyLine1DefectRatio}
              data2={data.dailyLine2DefectRatio}
              borderColor1="#FF7272"
              borderColor2="#FFB5B5"
              backgroundColor1="#FF7272"
              backgroundColor2="#FFB5B5"
            />
          </GBox>
        </CBox>
      </ChartBox>
    </ChartContainer>
  );
};
