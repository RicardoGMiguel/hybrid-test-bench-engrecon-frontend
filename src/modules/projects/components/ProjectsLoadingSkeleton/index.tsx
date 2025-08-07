import React from 'react';
import { Skeleton, Stack } from '@chakra-ui/react';
import { Container, SkeletonRow } from './styles';

const ProjectsLoadingSkeleton: React.FC = () => (
  <Container>
    <Stack>
      <SkeletonRow>
        <Skeleton height="475px" width="30%" borderRadius={40} />
        <Skeleton height="475px" width="30%" borderRadius={40} />
        <Skeleton height="475px" width="30%" borderRadius={40} />
      </SkeletonRow>
    </Stack>
  </Container>
);

export default ProjectsLoadingSkeleton;
