import React, { useEffect, useState } from 'react';
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
import axios from 'axios';
import { tempHumi } from '../../../services/chart';

export const LineGraph = ({
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
        borderColor: 'rgb(255, 99, 132)',
        backgroundColor: 'rgba(255, 99, 132, 0.5)',
      },
      {
        label: label2,
        data: data2,
        borderColor: 'rgb(53, 162, 235)',
        backgroundColor: 'rgba(53, 162, 235, 0.5)',
      },
      {
        label: label3,
        data: data3,
        borderColor: 'rgb(217, 235, 53)',
        backgroundColor: 'rgba(217, 235, 53, 0.5)',
      },
    ],
  };

  return <Line options={options} data={data} />;
};
export const DoughnutGraph = ({
  title,
  label1,
  label2,
  label3,
  data1,
  data2,
  data3,
}) => {
  ChartJS.register(ArcElement, Tooltip, Legend);

  const [labels, setLabels] = useState([]);

  useEffect(() => {
    axios
      .get('http://localhost:3001/mock/chart1.json')
      // .get('http://localhost:3000/mock/chart4.json')
      .then((res) => {
        const dataArray = res.data.map((v) => v.date);
        setLabels(dataArray);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);
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
        data: [12, 19, 3],
        backgroundColor: [
          'rgba(255, 99, 132, 0.2)',
          'rgba(54, 162, 235, 0.2)',
          'rgba(255, 206, 86, 0.2)',
        ],
        borderColor: [
          'rgba(255, 99, 132, 1)',
          'rgba(54, 162, 235, 1)',
          'rgba(255, 206, 86, 1)',
        ],
        borderWidth: 1,
      },
    ],
  };

  return <Pie options={options} data={data} />;
};
