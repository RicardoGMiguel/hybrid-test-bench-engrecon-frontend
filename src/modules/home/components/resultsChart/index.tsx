import React from 'react';
import { ResponsiveLine } from '@nivo/line';
import { IOscilloscopeProps } from '../../interfaces/IOscilloscopeProps';
import { Container, Title } from './styles';

interface ChartProps {
  title: string;
  axisLeftLegend: string;
  chartData: IOscilloscopeProps[];
  couplingCommandInstant: number;
  startCoupling: number;
}

const ResultsChart: React.FC<ChartProps> = ({
  title,
  axisLeftLegend,
  chartData,
  couplingCommandInstant,
  startCoupling,
}) => (
  <Container>
    <Title>{title}</Title>
    <ResponsiveLine
      data={chartData}
      margin={{ top: 20, right: 60, bottom: 90, left: 60 }}
      xScale={{ type: 'linear', min: 0, max: 'auto' }}
      yScale={{ type: 'linear', min: 0, max: 'auto' }} // para espaçamento vertical
      axisBottom={{
        legend: 'Time (s)',
        legendOffset: 35,
        tickSize: 5,
        tickPadding: 5,

        style: {
          legend: {
            text: {
              fontSize: 16,
            },
          },
        },
      }}
      axisLeft={{
        legend: axisLeftLegend,
        legendOffset: -45,
        tickSize: 5,
        tickPadding: 5,

        style: {
          legend: {
            text: {
              fontSize: 16,
            },
          },
        },
      }}
      enablePoints
      enableTouchCrosshair
      pointSize={1}
      useMesh
      curve="linear"
      colors={{ scheme: 'tableau10' }}
      markers={[
        {
          axis: 'x', // pode ser 'x' ou 'y'
          value: couplingCommandInstant, // posição
          lineStyle: {
            stroke: '#f00',
            strokeWidth: 2,
            strokeDasharray: '6, 6',
          },
          legend: 'Coupling Command',
          legendOrientation: 'vertical',
        },
        {
          axis: 'x',
          value: startCoupling,
          lineStyle: {
            stroke: '#014e27',
            strokeWidth: 2,
            strokeDasharray: '6, 6',
          },
          legend: 'Start coupling',
          legendOrientation: 'vertical',
        },
        // {
        //   axis: 'x',
        //   value: endCoupling,
        //   lineStyle: {
        //     stroke: '#00c763',
        //     strokeWidth: 2,
        //     strokeDasharray: '6, 6',
        //   },
        //   legend: 'Fim do engate',
        //   legendOrientation: 'vertical',
        // },
      ]}
      legends={[
        {
          anchor: 'bottom-right', // posição no gráfico
          direction: 'column', // ou 'row'
          justify: false,
          translateX: 100, // deslocamento horizontal
          translateY: 0, // deslocamento vertical
          itemsSpacing: 10, // espaçamento entre itens
          itemDirection: 'left-to-right',
          itemWidth: 100,
          itemHeight: 20,
          itemOpacity: 0.75,
          symbolSize: 12,
          symbolShape: 'circle', // 'circle', 'square', etc.
          symbolBorderColor: 'rgba(0, 0, 0, .5)',
          effects: [
            {
              on: 'hover',
              style: {
                itemOpacity: 1,
              },
            },
          ],
        },
      ]}
    />
  </Container>
);
export default ResultsChart;
