import React, { useEffect, useMemo, useState } from 'react';
import GaugeComponent from 'react-gauge-component';
import { IoCaretDownSharp, IoCaretUpSharp, IoRemove } from 'react-icons/io5';
import themeDefaults from '@style/themeDefaults';
import {
  Container,
  Title,
  Content,
  CustomNeedleStripe,
  ValueContainer,
  LabelContainer,
  Label,
  MinMaxLabel,
  ComparisonContainer,
  LeftContainer,
  ResultLabel,
  PrevResult,
  RightContainer,
} from './styles';

interface GaugeGraphProps {
  title: string;
  value: number;
  symbol?: string;
  prevResultValue?: number;
  minValue: number;
  maxValue: number;
}

const GaugeGraph: React.FC<GaugeGraphProps> = ({
  title,
  value,
  prevResultValue,
  symbol,
  minValue,
  maxValue,
}) => {
  const [comparisonState, setComparisonState] = useState<
    'up' | 'down' | 'keep'
  >('keep');
  const [comparisonPercentage, setComparisonPercentage] = useState(0);

  useEffect(() => {
    if (prevResultValue) {
      const percentage = value / prevResultValue;
      if (percentage === 1) {
        setComparisonState('keep');
        setComparisonPercentage(0);
      }
      if (percentage > 1) {
        setComparisonState('up');
        setComparisonPercentage(Number(((percentage - 1) * 100).toFixed(0)));
      }
      if (percentage < 1) {
        setComparisonState('down');
        setComparisonPercentage(Number(((1 - percentage) * 100).toFixed(0)));
      }
    }

    if (prevResultValue === 0) {
      if (value === 0) {
        setComparisonState('keep');
        setComparisonPercentage(0);
        return;
      }
      setComparisonState('up');
      setComparisonPercentage(1000);
    }
  }, [prevResultValue, value]);

  const iconToRender = useMemo(() => {
    if (comparisonState === 'down') return <IoCaretDownSharp size={25} />;
    if (comparisonState === 'up') return <IoCaretUpSharp size={25} />;
    if (comparisonState === 'keep') return <IoRemove size={25} />;
    return undefined;
  }, [comparisonState]);

  const fractionDigits = useMemo(() => {
    if (symbol === '%') {
      return 0;
    }
    return 1;
  }, [symbol]);

  return (
    <Container hasComparison={prevResultValue !== undefined}>
      <Title>{title}</Title>
      <Content>
        <CustomNeedleStripe>
          <div />
        </CustomNeedleStripe>
        <ValueContainer>
          <LabelContainer>
            <MinMaxLabel>{minValue}</MinMaxLabel>
            <Label>
              {value?.toFixed(fractionDigits) || '---'}
              {symbol}
            </Label>
            <MinMaxLabel>{maxValue}</MinMaxLabel>
          </LabelContainer>
          {prevResultValue !== undefined && (
            <ComparisonContainer>
              <LeftContainer>
                <ResultLabel>RESULTADO ANTERIOR</ResultLabel>
                <PrevResult>
                  {prevResultValue?.toFixed(fractionDigits) || '---'}
                  {symbol}
                </PrevResult>
              </LeftContainer>
              <RightContainer state={comparisonState}>
                {iconToRender}
                {comparisonPercentage < 1000 ? (
                  <p>{comparisonPercentage}%</p>
                ) : (
                  <p>...%</p>
                )}
              </RightContainer>
            </ComparisonContainer>
          )}
        </ValueContainer>
        <GaugeComponent
          value={value || 0}
          type="semicircle"
          minValue={minValue}
          maxValue={maxValue}
          marginInPercent={{ top: 0.08, bottom: 0.0, left: 0, right: 0 }}
          labels={{
            valueLabel: {
              hide: true,
            },
            tickLabels: {
              hideMinMax: true,
            },
          }}
          arc={{
            colorArray: [
              themeDefaults.colors.gaugeFirstColor,
              themeDefaults.colors.gaugeSecondColor,
              themeDefaults.colors.gaugeThirdColor,
              themeDefaults.colors.gaugeFourthColor,
              themeDefaults.colors.gaugeFifthColor,
            ],
            cornerRadius: 0,
            subArcs: [
              { limit: maxValue / 5 },
              { limit: 2 * (maxValue / 5) },
              { limit: 3 * (maxValue / 5) },
              { limit: 4 * (maxValue / 5) },
              { limit: 5 * (maxValue / 5) },
            ],
            padding: 0,
            width: 0.4,
          }}
          pointer={{
            type: 'needle',
            elastic: true,
            animationDelay: 0,
            length: 0.75,
            width: 50,
            baseColor: themeDefaults.colors.exyGray,
          }}
        />
      </Content>
    </Container>
  );
};

export default GaugeGraph;
