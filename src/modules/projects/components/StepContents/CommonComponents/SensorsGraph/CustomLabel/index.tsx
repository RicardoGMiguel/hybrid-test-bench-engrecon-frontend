import React from 'react';
import { ComputedBarDatum, BarDatum } from '@nivo/bar';
import themeDefaults from '@style/themeDefaults';

interface CustomLabelProps {
  bars: readonly ComputedBarDatum<BarDatum>[];
}

const CustomLabel: React.FC<CustomLabelProps> = ({ bars }) => (
  <>
    {bars.map((bar) => (
      <g
        transform={`translate(${bar.x + bar.width + 10},${
          bar.y + bar.height / 2
        })`}
        key={bar.key}
      >
        <text
          textAnchor="start"
          alignmentBaseline="middle"
          style={{
            fill: themeDefaults.colors.orange,
            fontSize: 18,
            fontWeight: 900,
          }}
        >
          {bar.data.value} min
        </text>
      </g>
    ))}
  </>
);

export default CustomLabel;
