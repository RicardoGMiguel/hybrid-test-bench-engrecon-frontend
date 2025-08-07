import React, { useEffect, useState, useMemo } from 'react';
import { IoCaretDownSharp, IoCaretUpSharp, IoRemove } from 'react-icons/io5';
import {
  Container,
  LeftContainer,
  ResultLabel,
  RightContainer,
  PrevResult,
} from './styles';

interface ComparisonProps {
  value: number;
  prevResultValue?: number;
  posX: number;
  posY: number;
}

const Comparison: React.FC<ComparisonProps> = ({
  value,
  prevResultValue,
  posX,
  posY,
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
    if (comparisonState === 'down') return <IoCaretDownSharp size={15} />;
    if (comparisonState === 'up') return <IoCaretUpSharp size={15} />;
    if (comparisonState === 'keep') return <IoRemove size={15} />;
    return undefined;
  }, [comparisonState]);
  return (
    <Container posX={posX} posY={posY}>
      <LeftContainer>
        <ResultLabel>RESULTADO ANTERIOR</ResultLabel>
        <PrevResult>
          {prevResultValue !== undefined && prevResultValue?.toFixed(1)}
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
    </Container>
  );
};

export default Comparison;
