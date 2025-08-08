import React from 'react';
import { ResponsiveLine } from '@nivo/line';
import { Container } from './styles';

const phaseShift = 0.0008;

const staticData = [
  {
    id: 'Signal 1',
    color: 'hsl(0, 70%, 50%)',
    data: [
      { x: 0, y: 0 },
      { x: 0.01, y: 1 },
      { x: 0.02, y: 0 },
      { x: 0.03, y: 1 },
      { x: 0.04, y: 0 },
      { x: 0.05, y: 1 },
      { x: 0.06, y: 0 },
      { x: 0.07, y: 1 },
      { x: 0.08, y: 0 },
    ],
  },
  {
    id: 'Signal 2',
    color: 'hsl(240, 70%, 50%)',
    data: [
      { x: 0, y: 0 },
      { x: 0.01 + phaseShift, y: 1 },
      { x: 0.02 + phaseShift, y: 0 },
      { x: 0.03 + phaseShift, y: 1 },
      { x: 0.04 + phaseShift, y: 0 },
      { x: 0.05 + phaseShift, y: 1 },
      { x: 0.06 + phaseShift, y: 0 },
      { x: 0.07 + phaseShift, y: 1 },
      { x: 0.08 + phaseShift, y: 0 },
    ],
  },
];

const OscilloscopeNivo: React.FC = () => (
  // const [data, setData] = useState(staticData);
  // const [time, setTime] = useState(0);

  // useEffect(() => {
  //   const dt = 0.01;
  //   setInterval(() => {
  //     setTime((prev) => prev + dt);

  //     setData((prev) => {
  //       const newData = prev[0].data;
  //       if (newData[newData.length - 1].y === 0) {
  //         newData.push({ x: time, y: 1 });
  //       } else {
  //         newData.push({ x: time, y: 0 });
  //       }

  //       const maxX = Math.max(...newData.map((item) => item.x));

  //       if (maxX > 0.2) {
  //         newData.splice(1, newData.length - 1); // limpa array
  //         setTime(0);
  //       }

  //       const dataToSend = [...prev];

  //       dataToSend[0].data = newData;

  //       return dataToSend;
  //     });
  //   }, dt * 1000);

  //   setInterval(() => {
  //     setTime((prev) => prev + dt);

  //     setData((prev) => {
  //       const newData = prev[1].data;
  //       if (newData[newData.length - 1].y === 0) {
  //         newData.push({ x: time + phaseShift, y: 1 });
  //       } else {
  //         newData.push({ x: time + phaseShift, y: 0 });
  //       }

  //       const maxX = Math.max(...newData.map((item) => item.x));

  //       if (maxX > 0.2) {
  //         newData.splice(1, newData.length - 1); // limpa array
  //         setTime(0);
  //       }

  //       const dataToSend = [...prev];

  //       dataToSend[1].data = newData;

  //       return dataToSend;
  //     });
  //   }, dt * 1000);
  // }, [data, time]);

  <Container>
    <ResponsiveLine
      data={staticData}
      margin={{ top: 20, right: 30, bottom: 30, left: 40 }}
      xScale={{ type: 'linear', min: 'auto', max: 'auto' }}
      yScale={{ type: 'linear', min: -0.2, max: 1.2 }} // para espaçamento vertical
      axisBottom={{
        legend: 'Time (s)',
        legendOffset: 30,
        tickSize: 5,
        tickPadding: 5,
      }}
      axisLeft={{
        legend: 'Signal',
        legendOffset: -35,
        tickSize: 5,
        tickPadding: 5,
      }}
      enablePoints
      pointSize={6}
      useMesh
      curve="stepAfter"
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
          symbolSize: 12,
        },
      ]}
      colors={{ scheme: 'category10' }}
    />
  </Container>
);
export default OscilloscopeNivo;
