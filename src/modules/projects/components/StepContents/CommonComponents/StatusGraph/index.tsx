import { ResponsivePie } from '@nivo/pie';
import themeDefaults from '@style/themeDefaults';
import React, { useEffect, useState } from 'react';
import { Container, Content, Title } from './styles';

interface StatusGraphProps {
  title: string;
  label1: string;
  value1: number;
  label2: string;
  value2: number;
  legendDirection: 'row' | 'column';
  labelFontSize?: number;
}

const StatusGraph: React.FC<StatusGraphProps> = ({
  title,
  label1,
  value1,
  label2,
  value2,
  legendDirection,
  labelFontSize,
}) => {
  const [width, setWidth] = useState(window.innerWidth);

  useEffect(() => {
    // Função para atualizar o estado quando o tamanho da janela mudar
    const handleResize = () => setWidth(window.innerWidth);

    // Adiciona o evento resize quando o componente é montado
    window.addEventListener('resize', handleResize);

    // Remove o evento resize quando o componente é desmontado
    return () => window.removeEventListener('resize', handleResize);
  }, []);
  return (
    <Container>
      <Title>{title}</Title>
      <Content>
        <ResponsivePie
          data={[
            {
              id: label1,
              value: value1,
              color: themeDefaults.colors.orange,
            },
            {
              id: label2,
              value: value2,
              color: themeDefaults.colors.exyGray,
            },
          ]}
          isInteractive={false}
          animate
          colors={{ datum: 'data.color' }}
          margin={
            legendDirection === 'row'
              ? { top: 0, right: 10, bottom: 40, left: 10 }
              : { top: 10, right: 10, bottom: 10, left: 100 }
          }
          innerRadius={0}
          padAngle={0.7}
          activeOuterRadiusOffset={0}
          borderWidth={1}
          borderColor={{
            from: 'color',
            modifiers: [['darker', 0.2]],
          }}
          enableArcLinkLabels={false}
          arcLabel={(e) => (e.value === 0 ? '' : `${e.value}%`)}
          theme={{
            labels: {
              text: {
                fontSize: labelFontSize
                  ? (labelFontSize * width) / 2000
                  : width * 0.011,
                fill: themeDefaults.colors.white,
              },
            },
            legends: {
              text: {
                fontSize: width * 0.009,
              },
            },
          }}
          legends={[
            {
              anchor: legendDirection === 'row' ? 'bottom' : 'top-left',
              direction: legendDirection,
              justify: false,
              translateX: legendDirection === 'row' ? 0 : -width * 0.045,
              translateY:
                legendDirection === 'row' ? width * 0.02 : -width * 0.005,
              itemsSpacing: legendDirection === 'row' ? width * 0.02 : 0,
              itemWidth: width * 0.04,
              itemHeight: width * 0.02,
              itemTextColor: themeDefaults.colors.exyGray,
              itemDirection: 'left-to-right',
              itemOpacity: 1,
              symbolSize: width * 0.01,
              symbolShape: 'circle',
              symbolSpacing: width * 0.003,
            },
          ]}
        />
      </Content>
    </Container>
  );
};

export default StatusGraph;
