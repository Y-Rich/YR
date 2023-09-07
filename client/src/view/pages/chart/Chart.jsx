import React from 'react';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import { AdminChart } from './AdminChart';
import { EmployeeChart } from './EmployeeChart';
import { Page } from '../../components/Components';
import Selector from '../../components/Selector';
import { Slide } from './style';

const Chart = () => {
  const settings = {
    dots: true,
    fade: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
  };
  const role = 2;

  // const renderCharts = () => {
  //   const charts = [];
  //   for (let i = 0; i < role; i++) {
  //     charts.push(
  //       <div key={i}>
  //         <AdminChart />
  //       </div>
  //     );
  //   }
  //   return charts;
  // };

  return (
    <Slide>
      <Slider {...settings}>
        {/* {renderCharts()} */}
        <AdminChart />
        <EmployeeChart />
      </Slider>
      <Selector />
    </Slide>
  );
};
export default Chart;
