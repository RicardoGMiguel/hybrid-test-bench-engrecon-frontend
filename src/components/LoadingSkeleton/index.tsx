import React from 'react';
import { Skeleton, Stack } from '@chakra-ui/react';
import { Container } from './styles';

interface LoadingSkeletonProps {
  height?: number;
}

const LoadingSkeleton: React.FC<LoadingSkeletonProps> = ({ height }) => (
  <Container>
    <Stack>
      <Skeleton height={height ? `${height}px` : '64px'} borderRadius={10} />
      <Skeleton height={height ? `${height}px` : '64px'} borderRadius={10} />
      <Skeleton height={height ? `${height}px` : '64px'} borderRadius={10} />
      <Skeleton height={height ? `${height}px` : '64px'} borderRadius={10} />
    </Stack>
  </Container>
);

export default LoadingSkeleton;
