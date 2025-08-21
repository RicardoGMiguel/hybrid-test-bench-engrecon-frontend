import React from 'react';
import { ResponsiveLine } from '@nivo/line';
import { ICycle } from '@modules/cycles/interfaces/ICycle';
import { Container } from './styles';

interface ChartProps {
  chartData: ICycle[];
}

const CycleChart: React.FC<ChartProps> = ({ chartData }) => (
  <Container>
    <ResponsiveLine
      data={[
        {
          id: 'Signal 1',
          color: 'hsl(240, 70%, 50%)',
          data: chartData,
        },
      ]}
      margin={{ top: 50, right: 60, bottom: 50, left: 60 }}
      xScale={{ type: 'linear', min: 'auto', max: 'auto' }}
      yScale={{ type: 'linear', min: 'auto', max: 'auto' }}
      axisBottom={{
        legend: 'Time (s)',
        legendOffset: 40,
        tickSize: 5,
        tickPadding: 5,
        style: {
          ticks: {
            text: {
              fontSize: 16,
            },
          },
          legend: {
            text: {
              fontSize: 18,
            },
          },
        },
      }}
      axisLeft={{
        legend: 'Velocidade (km/h)',
        legendOffset: -40,
        tickSize: 5,
        tickPadding: 5,
        style: {
          ticks: {
            text: {
              fontSize: 16,
            },
          },
          legend: {
            text: {
              fontSize: 18,
            },
          },
        },
      }}
      enablePoints
      pointSize={6}
      useMesh
      curve="linear"
      legends={[
        {
          anchor: 'top-left',
          direction: 'row',
          justify: false,
          translateX: 0,
          translateY: -10,
          itemsSpacing: 10,
          itemDirection: 'left-to-right',
          itemWidth: 80,
          itemHeight: 20,
          symbolSize: 20,
        },
      ]}
      colors={{ scheme: 'category10' }}
    />
  </Container>
);
export default CycleChart;
