import React, { useEffect, useState } from 'react';
import { CBox, ChartBox, ChartContainer, GBox } from './style';
import { DoughnutGraph, LineGraph1, LineGraph2, LineGraph3 } from './Graph';
import { dailyM1Data, tempHumi } from '../../../services/chart';
import Loading from '../../components/Loading';
import { NavContent, ChartModal } from './ChartComponent';

export const F1 = () => {
  const [loading, setLoading] = useState(true);
  const [modal, setModal] = useState(false);
  const [humi, setHumi] = useState([]);
  const [temp, setTemp] = useState([]);
  const [time, setTime] = useState([]);
  const [dust, setDust] = useState([]);

  // const [monthly, setMonthly] = useState([]);
  // const [monthlyM1, setMonthlyM1] = useState([]);
  // const [monthlyM2, setMonthlyM2] = useState([]);
  const [dailyInput, setDailyInput] = useState([]);
  const [dailyOutput, setDailyOutput] = useState([]);
  const [dailyLine1Defect, setDailyLine1Defect] = useState([]);
  const [dailyLine2Defect, setDailyLine2Defect] = useState([]);

  const [dailyLine1DefectRatio, setDailyLine1DefectRatio] = useState([]);
  const [dailyLine2DefectRatio, setDailyLine2DefectRatio] = useState([]);
  const [dailyProdRate, setDailyProdRate] = useState([]);
  const handleClick = () => {
    setModal(true);
  };
  // const [daily, setDaily] = useState([]);
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
      dailyM1Data()
        .then((res) => {
          // setMonthly(res.monthlyAvgLineProdRate);
          // setMonthlyM1(res.monthlyAvgLine1defectRate);
          // setMonthlyM2(res.monthlyAvgLine2defectRate);
          setDailyInput(res.dailyAvgInput.map((v) => v.total));
          setDailyOutput(res.dailyAvgOutput.map((v) => v.total));
          console.log('1', res);
          if (res.dailyAvgLine1defectRate.length > 0) {
            console.log('2', res.dailyAvgLine1DefectRate[0].Detail);
          }
          const line1DefectsProducts = res.dailyAvgLine1DefectRate
            .map((item) => item.Detail.map((detail) => detail.DefectProducts))
            .flat();
          setDailyLine1Defect(line1DefectsProducts);
          setDailyLine2Defect(
            res.dailyAvgLine2DefectRate[0]?.Detail?.map((v) => v.DefectProducts)
          );
          setDailyLine1DefectRatio(
            res.dailyAvgLine1DefectRate[0]?.Detail?.map((v) => v.DefectRatio)
          );
          setDailyLine2DefectRatio(
            res.dailyAvgLine2DefectRate[0]?.Detail?.map((v) => v.DefectRatio)
          );
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
  const input = dailyInput.reduce((acc, item) => acc + item, 0);
  const output = dailyOutput.reduce((acc, item) => acc + item, 0);
  const err = Math.round(((input - output) / input) * 100);

  return (
    <ChartContainer>
      {/* {loading ? <Loading /> : null} */}
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
              data1={dailyLine1Defect}
              data2={dailyLine2Defect}
              borderColor1="#97c0db"
              borderColor2="#321fd9"
              backgroundColor1="#97c0db"
              backgroundColor2="#321fd9"
            />
          </GBox>
          <GBox>
            <LineGraph2
              title="일별 불량률"
              labels={time}
              label1="1호기"
              label2="2호기"
              data1={dailyLine1DefectRatio}
              data2={dailyLine1DefectRatio}
              borderColor1="#97c0db"
              borderColor2="#321fd9"
              backgroundColor1="#97c0db"
              backgroundColor2="#321fd9"
            />
          </GBox>
        </CBox>
      </ChartBox>
    </ChartContainer>
  );
};
