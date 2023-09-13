import React, { useEffect, useState } from 'react';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import { Supervisor } from './Supervisor';
import { Worker } from './Worker';
import Selector from '../../components/Selector';
import { Page, Slide } from './style';
import { info } from '../../../services/user';
import { Manager } from './Manager';

const Chart = (props) => {
  const [user, setUser] = useState('');
  const [userName, setUserName] = useState('');
  const [position, setPosition] = useState('');
  const [facilities, setFacilities] = useState([]);
  const [lines, setLines] = useState([]);
  const settings = {
    dots: true,
    fade: true,
    infinite: true,
    speed: 500,
    slidesToShow: 4,
    slidesToScroll: 4,
  };
  useEffect(() => {
    try {
      info().then((res) => {
        console.log(res);
        setUserName(res.name);
        const userPosition = res.Position.positionName.toString();
        setUser(userPosition);
        // setUser('manager');
        const facMatches = user.match(/fac\d+/g) || [];
        const lineMatches = user.match(/line\d+/g) || [];

        setFacilities(facMatches);
        setLines(lineMatches);
        console.log(userPosition);

        if (userPosition.includes('manager')) {
          setPosition('manager');
        } else if (userPosition.includes('supervisor')) {
          setPosition('supervisor');
        } else if (userPosition.includes('worker')) {
          if (facMatches.length > 0 && lineMatches.length > 0) {
            setPosition('worker');
            // setFacilities(facMatches[0]);
            // setLines(lineMatches[0]);
          } else if (facMatches.length > 0) {
            setPosition(`worker_${facMatches[0]}`);
          }
        }
      });
    } catch (error) {
      console.error('Failed to loading:', error);
      throw error;
    }
  }, [user]);

  console.log(user);
  console.log(position);
  console.log(facilities);
  console.log(lines);
  const renderComponents = () => {
    switch (position) {
      case 'manager':
        return (
          <Slider {...settings}>
            <Manager />
            {facilities.map((fac) => (
              <>
                <Supervisor key={`supervisor_${fac}`} fac={fac} />
                {lines.map((line) => (
                  <Worker
                    key={`worker_${fac}_${line}`}
                    fac={fac}
                    line={line}
                    userName
                  />
                ))}
              </>
            ))}
          </Slider>
        );
      case 'supervisor':
        return (
          <Slider {...settings}>
            <Supervisor />
            {facilities.map((fac) =>
              lines.map((line) => (
                <Worker
                  key={`${fac}_${line}`}
                  // props={`${fac}_${line}`}
                  fac={fac}
                  line={line}
                  userName
                />
              ))
            )}
          </Slider>
        );
      case 'worker':
        return (
          <Slider {...settings}>
            {facilities.map((fac) =>
              lines.map((line) => (
                <Worker
                  key={`${fac}_${line}`}
                  // props={`${fac}_${line}`}
                  fac={fac}
                  line={line}
                  userName={userName}
                />
              ))
            )}
          </Slider>
        );
      default:
        return null;
    }
  };

  return (
    <Page>
      <Slide>
        {renderComponents()}
        <Selector />
      </Slide>
    </Page>
  );
};
export default Chart;
