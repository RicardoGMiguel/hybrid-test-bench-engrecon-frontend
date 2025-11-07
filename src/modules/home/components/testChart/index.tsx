import React from 'react';
import { ResponsiveLine } from '@nivo/line';
import { IOscilloscopeProps } from '../../interfaces/IOscilloscopeProps';
import { Container } from './styles';

interface ChartProps {
  chartData: IOscilloscopeProps[];
  couplingVerticalLine: number;
}

const TestChart: React.FC<ChartProps> = ({
  chartData,
  couplingVerticalLine,
}) => (
  <Container>
    <ResponsiveLine
      data={chartData}
      margin={{ top: 50, right: 60, bottom: 70, left: 60 }}
      xScale={{ type: 'linear', min: 0, max: 'auto' }}
      yScale={{ type: 'linear', min: 0, max: 'auto' }} // para espaçamento vertical
      axisBottom={{
        legend: 'Tempo (s)',
        legendOffset: 30,
        tickSize: 5,
        tickPadding: 5,

        style: {
          legend: {
            text: {
              fontSize: 20,
            },
          },
        },
      }}
      axisLeft={{
        legend: 'Velocidade',
        legendOffset: -35,
        tickSize: 5,
        tickPadding: 5,

        style: {
          legend: {
            text: {
              fontSize: 20,
            },
          },
        },
      }}
      enablePoints
      pointSize={6}
      useMesh
      curve="linear"
      colors={{ scheme: 'category10' }}
      markers={[
        {
          axis: 'x', // pode ser 'x' ou 'y'
          value: couplingVerticalLine, // posição onde a linha será desenhada
          lineStyle: {
            stroke: '#f00',
            strokeWidth: 2,
            strokeDasharray: '6, 6',
          },
          legend: 'Instante do acoplamento',
          legendOrientation: 'vertical',
        },
      ]}
    />
  </Container>
);
export default TestChart;
