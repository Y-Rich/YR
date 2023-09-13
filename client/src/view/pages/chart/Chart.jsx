import React from 'react';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import Selector from '../../components/Selector';
import { Slide } from './style';
import { F1, Manager } from './F1';

const Chart = () => {
  const settings = {
    dots: true,
    fade: true,
    infinite: true,
    speed: 500,
    slidesToShow: 4,
    slidesToScroll: 4,
  };

  const position = sessionStorage.getItem('position');
  const facilities = sessionStorage.getItem('facilities');

  return (
    <Slide>
      {position === 'manager' && (
        <Slider {...settings}>
          <F1 />
          <F1 />
        </Slider>
      )}
      {(position === 'supervisior' || position === 'worker') && (
        <Slider {...settings}>
          {facilities === 'fac1' && <F1 />}
          {facilities === 'fac2' && <F1 />}
        </Slider>
      )}
      <Selector />
    </Slide>
  );
};
export default Chart;
