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
export const LineGraph1 = ({ title, labels, label1, data1 }) => {
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
    ],
  };

  return <Line options={options} data={data} />;
};
export const LineGraph2 = ({ title, labels, label1, label2, data1, data2 }) => {
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
        backgroundColor: ['#1c3353', '#467fd0', '#7ea5dc'],
        borderColor: ['white', 'white', 'white'],
        borderWidth: 1,
      },
    ],
  };

  return <Pie options={options} data={data} />;
};
