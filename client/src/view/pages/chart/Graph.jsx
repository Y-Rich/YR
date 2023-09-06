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
} from 'chart.js';
import { Line } from 'react-chartjs-2';
import axios from 'axios';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

const Graph = ({ title, label1, label2, label3, data1, data2, data3 }) => {
  const [labels, setLabels] = useState([]);

  useEffect(() => {
    axios
      .get('http://localhost:3001/mock/chart1.json')
      .then((res) => {
        const dataArray = res.data.map((v) => v.date);
        setLabels(dataArray);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);
  const options = {
    responsive: true,
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
      // {
      //   label: label3,
      //   data: data3,
      //   borderColor: 'rgb(217, 235, 53)',
      //   backgroundColor: 'rgba(217, 235, 53, 0.5)',
      // },
    ],
  };

  return <Line options={options} data={data} />;
};

export default Graph;
