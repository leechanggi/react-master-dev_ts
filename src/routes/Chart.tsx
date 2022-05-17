import React from 'react';
import { useParams } from 'react-router-dom';
import { useQuery } from 'react-query';
import ApexChart from 'react-apexcharts';

import { fetchCoinHistory } from './api';

interface ChartPros {
  coinId: string | undefined;
}

interface IHistorical {
  time_open: string;
  time_close: string;
  open: number;
  high: number;
  low: number;
  close: number;
  volume: number;
  market_cap: number;
}

function Chart({ coinId }: ChartPros) {
  const params = useParams();

  const { isLoading, data } = useQuery<IHistorical[]>(['ohlcv', coinId], () => fetchCoinHistory(coinId), { refetchInterval: 100000 });

  return (
    <>
      {isLoading ? (
        'Loading chart...'
      ) : (
        <ApexChart
          type="line"
          series={[
            {
              name: 'Price',
              data: data?.map(price => price.close) as number[],
            },
          ]}
          options={{
            theme: {
              mode: 'dark',
            },
            stroke: {
              curve: 'smooth',
              width: 4,
            },
            chart: {
              width: 500,
              height: 300,
              background: 'transparent',
              toolbar: {
                show: false,
              },
            },
            fill: {
              type: 'gradient',
              gradient: {
                gradientToColors: ['blue'],
                stops: [0, 100],
              },
            },
            colors: ['red'],
            tooltip: {
              y: {
                formatter: value => `$${value.toFixed(3)}`,
              },
            },
            grid: {
              show: false,
            },
            xaxis: {
              type: 'datetime',
              categories: data?.map(price => price.time_close),
              labels: {
                show: false,
              },
              axisBorder: {
                show: false,
              },
              axisTicks: {
                show: false,
              },
            },
            yaxis: {
              show: false,
            },
          }}
        />
      )}
    </>
  );
}

export default Chart;
