import React from 'react';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import { Dots, DotsContainer, Slide } from '../../components/Components';
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
    appendDots: (dots) => (
      <DotsContainer>
        <ul style={{ margin: '0px' }}> {dots} </ul>
      </DotsContainer>
    ),
    customPaging: (i) => (
      <Dots>
        {position === 'manager'
          ? ['All', '1', '2'][i]
          : facilities === 'fac1'
          ? ['1'][i]
          : facilities === 'fac2'
          ? ['2'][i]
          : null}
      </Dots>
    ),
  };

  const position = sessionStorage.getItem('position');
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
      {(position === 'supervisor' || position === 'worker') && (
        <Slider {...settings}>
          {facilities === 'fac1' && <F1 />}
          {facilities === 'fac2' && <F2 />}
        </Slider>
      )}
    </Slide>
  );
};
export default Chart;
