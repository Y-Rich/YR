import React from 'react';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import { Slide } from './style';
import { F1 } from './F1';
import { F2 } from './F2';
import { AdminChart } from './AdminChart';

const Chart = () => {
  const settings = {
    dots: true,
    fade: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
  };

  // const position = sessionStorage.getItem('position');
  const position = 'manager';
  const facilities = sessionStorage.getItem('facilities');

  return (
    <Slide>
      {position === 'manager' && (
        <Slider {...settings}>
          <AdminChart />
          <F1 />
          <F2 />
        </Slider>
      )}
      {(position === 'supervisior' || position === 'worker') && (
        <Slider {...settings}>
          {facilities === 'fac1' && <F1 />}
          {facilities === 'fac2' && <F2 />}
        </Slider>
      )}
    </Slide>
  );
};
export default Chart;
