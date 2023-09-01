import React from 'react';
import { ChartBox, ChartContainer } from './style';
import Selector from '../../components/Selector';

const Chart = () => {
  return (
    <ChartContainer>
      <ChartBox>
        <iframe
          src="http://localhost:3000/d-solo/cf5a1daa-1651-4ef2-a0fa-654f37008575/01?orgId=1&panelId=1"
          width="450"
          height="200"
          frameborder="0"
        ></iframe>
      </ChartBox>
      <ChartBox>
        <iframe
          src="http://localhost:3000/d-solo/cf5a1daa-1651-4ef2-a0fa-654f37008575/01?orgId=1&panelId=1"
          width="450"
          height="200"
          frameborder="0"
        ></iframe>
      </ChartBox>
      <ChartBox>
        <iframe
          src="http://localhost:3000/d-solo/cf5a1daa-1651-4ef2-a0fa-654f37008575/01?orgId=1&panelId=1"
          width="450"
          height="200"
          frameborder="0"
        ></iframe>
      </ChartBox>
      <ChartBox>
        <iframe
          src="http://localhost:3000/d-solo/cf5a1daa-1651-4ef2-a0fa-654f37008575/01?orgId=1&panelId=1"
          width="450"
          height="200"
          frameborder="0"
        ></iframe>
      </ChartBox>
      <Selector />
    </ChartContainer>
  );
};

export default Chart;
