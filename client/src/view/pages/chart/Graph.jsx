import React from 'react';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  ArcElement,
} from 'chart.js';
import { Line } from 'react-chartjs-2';
import { Pie } from 'react-chartjs-2';

export const LineGraph1 = ({
  title,
  labels,
  label,
  datas,
  borderColors,
  backgroundColors,
}) => {
  ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend
  );
  const options = {
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: 'top',
      },
      title: {
        display: true,
        text: title,
      },
    },
  };
  const data = {
    labels,
    datasets: [
      {
        label: label,
        data: datas,
        borderColor: borderColors,
        backgroundColor: backgroundColors,
      },
    ],
  };

  return <Line options={options} data={data} />;
};
export const LineGraph2 = ({
  title,
  labels,
  label1,
  label2,
  data1,
  data2,
  borderColor1,
  borderColor2,
  backgroundColor1,
  backgroundColor2,
}) => {
  ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend
  );
  const options = {
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: 'top',
      },
      title: {
        display: true,
        text: title,
      },
    },
  };
  const data = {
    labels,
    datasets: [
      {
        label: label1,
        data: data1,
        borderColor: borderColor1,
        backgroundColor: backgroundColor1,
      },
      {
        label: label2,
        data: data2,
        borderColor: borderColor2,
        backgroundColor: backgroundColor2,
      },
    ],
  };

  return <Line options={options} data={data} />;
};
export const LineGraph3 = ({
  title,
  labels,
  label1,
  label2,
  label3,
  data1,
  data2,
  data3,
}) => {
  ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend
  );
  const options = {
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: 'top',
      },
      title: {
        display: true,
        text: title,
      },
    },
  };
  const data = {
    labels,
    datasets: [
      {
        label: label1,
        data: data1,
        borderColor: 'rgb(251, 32, 79)',
        backgroundColor: 'rgba(255, 99, 132, 0.5)',
      },
      {
        label: label2,
        data: data2,
        borderColor: 'rgb(36, 164, 249)',
        backgroundColor: 'rgba(53, 162, 235, 0.5)',
      },
      {
        label: label3,
        data: data3,
        borderColor: 'rgb(194, 213, 25)',
        backgroundColor: 'rgba(217, 235, 53, 0.5)',
      },
    ],
  };

  return <Line options={options} data={data} />;
};
export const DoughnutGraph = ({ title, labels, datas }) => {
  ChartJS.register(ArcElement, Tooltip, Legend);

  const options = {
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: 'top',
      },
      title: {
        display: true,
        text: title,
      },
    },
  };
  const data = {
    labels,
    datasets: [
      {
        labels,
        data: datas,
        backgroundColor: ['#42a845', '#cfcfcf', '#7ea5dc'],
        borderColor: ['white', 'white', 'white'],
        borderWidth: 1,
      },
    ],
  };

  return <Pie options={options} data={data} />;
};
