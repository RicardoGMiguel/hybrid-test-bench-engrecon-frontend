import React, { useEffect, useState } from 'react';
import { useAttendanceList } from '@modules/projects/hooks/attendanceLists/index';
import { IAttendanceList } from '@modules/projects/interfaces/IAttendanceLists';
import { useProject } from '@modules/projects/hooks/projects/index';
import { IShowProject } from '@modules/projects/interfaces/IProject';
import StepTitle from '../../CommonComponents/StepTitle';
import AttendanceList from './AttendanceList';
import StatusGraph from '../../CommonComponents/StatusGraph';
import {
  Container,
  Header,
  Content,
  AttendanceListContainer,
  StatusGraphContainer,
} from './styles';

interface TrainingStepProps {
  projectId: string;
  readOnly: boolean;
}

const TrainingStep: React.FC<TrainingStepProps> = ({ projectId, readOnly }) => {
  const { ShowProject } = useProject();
  const { ListAttendanceList } = useAttendanceList();

  const { data: projectData } = ShowProject(projectId);
  const { data: attendanceListData, isFetching } =
    ListAttendanceList(projectId);

  const [project, setProject] = useState<IShowProject>({} as IShowProject);
  const [attendanceList, setAttendanceList] = useState<IAttendanceList>();
  const [presentPercentage, setPresentPercentage] = useState(0);

  useEffect(() => {
    if (projectData) {
      setProject(projectData);
    }
  }, [projectData]);

  useEffect(() => {
    if (attendanceListData) {
      setAttendanceList(attendanceListData);
    }
  }, [attendanceListData]);

  useEffect(() => {
    if (attendanceListData) {
      const percentage = (
        (attendanceListData.attendance_list_chart.presents /
          attendanceListData.attendance_list_chart.total) *
        100
      ).toFixed(0);
      setPresentPercentage(Number(percentage));
    }
  }, [attendanceListData]);

  return (
    <Container>
      <Header>
        <StepTitle value="TREINAMENTO" />
      </Header>
      <Content>
        <AttendanceListContainer>
          <AttendanceList
            isLoading={isFetching}
            project={project}
            attendanceListData={attendanceList || ({} as IAttendanceList)}
            readOnly={readOnly}
          />
        </AttendanceListContainer>
        <StatusGraphContainer>
          <StatusGraph
            title="Status de Presença"
            legendDirection="column"
            label1="Presentes"
            label2="Ausentes"
            value1={presentPercentage}
            value2={100 - presentPercentage}
          />
        </StatusGraphContainer>
      </Content>
    </Container>
  );
};

export default TrainingStep;
