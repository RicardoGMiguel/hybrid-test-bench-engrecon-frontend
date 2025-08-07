import React, { useMemo } from 'react';
import { ResponsiveBar } from '@nivo/bar';
import themeDefaults from '@style/themeDefaults';
import CustomLabel from './CustomLabel';
import {
  Container,
  TitleContainer,
  Title,
  LegendContainer,
  Legend,
  Content,
} from './styles';

export interface ISensorData {
  less_fifteen?: number;
  less_thirty?: number;
  less_forty_five?: number;
  less_sixty?: number;
  plus_sixty?: number;
}

interface SensorsGraphProps {
  title: string;
  values: ISensorData;
  initialValues?: ISensorData;
}

const SensorsGraph: React.FC<SensorsGraphProps> = ({
  title,
  values,
  initialValues,
}) => {
  const graphData = useMemo(() => {
    if (initialValues) {
      return [
        {
          interval: '< 15°',
          value: values.less_fifteen || 0,
          valueColor: themeDefaults.colors.exyGray,
          initialValue: initialValues.less_fifteen || 0,
          initialValueColor: themeDefaults.colors.mediumGray,
        },
        {
          interval: '≥ 15° < 30°',
          value: values.less_thirty || 0,
          valueColor: themeDefaults.colors.exyGray,
          initialValue: initialValues.less_thirty || 0,
          initialValueColor: themeDefaults.colors.mediumGray,
        },
        {
          interval: '≥ 30° < 45°',
          value: values.less_forty_five || 0,
          valueColor: themeDefaults.colors.exyGray,
          initialValue: initialValues.less_forty_five || 0,
          initialValueColor: themeDefaults.colors.mediumGray,
        },
        {
          interval: '≥ 45° < 60°',
          value: values.less_sixty || 0,
          valueColor: themeDefaults.colors.exyGray,
          initialValue: initialValues.less_sixty || 0,
          initialValueColor: themeDefaults.colors.mediumGray,
        },
        {
          interval: '≥ 60°',
          value: values.plus_sixty || 0,
          valueColor: themeDefaults.colors.exyGray,
          initialValue: initialValues.plus_sixty || 0,
          initialValueColor: themeDefaults.colors.mediumGray,
        },
      ];
    }
    return [
      {
        interval: '< 15°',
        value: values.less_fifteen || 0,
        valueColor: themeDefaults.colors.exyGray,
      },
      {
        interval: '≥ 15° < 30°',
        value: values.less_thirty || 0,
        valueColor: themeDefaults.colors.exyGray,
      },
      {
        interval: '≥ 30° < 45°',
        value: values.less_forty_five || 0,
        valueColor: themeDefaults.colors.exyGray,
      },
      {
        interval: '≥ 45° < 60°',
        value: values.less_sixty || 0,
        valueColor: themeDefaults.colors.exyGray,
      },
      {
        interval: '≥ 60°',
        value: values.plus_sixty || 0,
        valueColor: themeDefaults.colors.exyGray,
      },
    ];
  }, [initialValues, values]);

  const maxScale = useMemo(() => {
    const maxValue = Math.max(...Object.values(values));
    if (initialValues) {
      const maxInitialValue = Math.max(...Object.values(initialValues));

      return Math.max(...[maxValue, maxInitialValue]) || 10;
    }
    return maxValue || 10;
  }, [initialValues, values]);

  return (
    <Container>
      <TitleContainer>
        <Title>{title}</Title>
        {initialValues && (
          <LegendContainer>
            <Legend backgroundColor={themeDefaults.colors.exyGray}>
              <div />
              <p>Resultado Atual</p>
            </Legend>
            <Legend backgroundColor={themeDefaults.colors.mediumGray}>
              <div />
              <p>Resultado Parcial</p>
            </Legend>
          </LegendContainer>
        )}
      </TitleContainer>
      <Content>
        <ResponsiveBar
          data={graphData}
          groupMode="grouped"
          keys={initialValues ? ['value', 'initialValue'] : ['value']}
          indexBy="interval"
          margin={{ top: 0, right: 130, bottom: 50, left: 130 }}
          padding={initialValues ? 0.4 : 0.6}
          layout="horizontal"
          valueScale={{
            type: 'linear',
            min: 0,
            max: maxScale,
          }}
          indexScale={{ type: 'band', round: true }}
          colors={(bar) => {
            const { id, data } = bar;
            return id === 'value'
              ? String(data.valueColor)
              : String(data.initialValueColor);
          }}
          enableGridX
          borderColor={{
            from: 'color',
            modifiers: [['darker', 1.6]],
          }}
          axisTop={null}
          axisRight={null}
          axisBottom={{
            tickSize: 5,
            tickPadding: 5,
            tickRotation: 0,
            legendPosition: 'middle',
            legendOffset: 32,
            truncateTickAt: 0,
            renderTick: (tick) => (
              <text
                x={tick.x}
                y={tick.y}
                textAnchor={tick.textAnchor}
                dominantBaseline="central"
                style={{
                  fill: themeDefaults.colors.orange,
                  fontSize: 16,
                  fontWeight: 900,
                }}
              >
                {tick.value}
              </text>
            ),
          }}
          axisLeft={{
            tickSize: 5,
            tickPadding: 5,
            tickRotation: 0,
            legendPosition: 'middle',
            legendOffset: -40,
            truncateTickAt: 0,
            renderTick: (tick) => (
              <text
                x={tick.x - 10}
                y={tick.y}
                textAnchor={tick.textAnchor}
                dominantBaseline="central"
                style={{
                  fill: themeDefaults.colors.orange,
                  fontSize: 20,
                  fontWeight: 900,
                }}
              >
                {tick.value}
              </text>
            ),
          }}
          labelSkipWidth={120}
          labelSkipHeight={12}
          enableLabel={false}
          role="application"
          barAriaLabel={(e) =>
            `${e.id}: ${e.formattedValue} in interval: ${e.indexValue}`
          }
          isInteractive={false}
          layers={[
            'grid',
            'axes',
            'bars',
            'markers',
            'legends',
            'annotations',
            CustomLabel,
          ]}
        />
      </Content>
    </Container>
  );
};

export default SensorsGraph;
