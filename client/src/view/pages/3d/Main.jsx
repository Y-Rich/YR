import React, { useState } from 'react';
import PLC from './Edukit';
import Selector from '../../components/Selector';
import Pannel from '../pannel/Pannel';
import Chart from '../chart/Chart';

const Main = () => {
  const [selected, setSelected] = useState('');
  const handleSelect = (option) => {
    setSelected(option);
  };

  return (
    <div>
      {selected === 'plc' && <PLC />}
      {selected === 'chart' && <Chart />}
      {selected === 'panel' && <Pannel />}
      <Selector onSelect={handleSelect} />
    </div>
  );
};

export default Main;
