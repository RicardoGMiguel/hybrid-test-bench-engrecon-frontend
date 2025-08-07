import { useDisclosure } from '@chakra-ui/react';
import AddFileModal from '@components/AddFileModal';
import Confirmation from '@components/Confirmation';
import EmptyListMessage from '@components/EmptyListMessage';
import { IList } from '@components/List/interfaces/IList';
import ListHeader from '@components/List/ListHeader';
import LoadingSkeleton from '@components/LoadingSkeleton';
import { useEvaluations } from '@modules/projects/hooks/evaluations/index';
import { useSensor } from '@modules/projects/hooks/sensors/index';
import { IEmployeeEvaluation } from '@modules/projects/interfaces/IEvaluation';
import { ISensor } from '@modules/projects/interfaces/ISensor';
import { EvaluationStageEnum } from '@modules/projects/types/EvaluationStageEnum';
import { SensorTypeEnum } from '@modules/projects/types/SensorTypeEnum';
import { format } from 'date-fns';
import React, { useEffect, useMemo, useState } from 'react';
import { FiPlusCircle, FiTrash2 } from 'react-icons/fi';
import CreateSensorModal from '../SensorModals/CreateSensorModal';
import EditSensorModal from '../SensorModals/EditSensorModal';
import { SensorListHeaderLabels } from './constants/SensorListHeaderLabels';
import SensorListItem from './SensorListItem';
import { Container, IconButton, List, Title, TitleContainer } from './styles';

interface SensorsListProps {
  projectId: string;
  title: string;
  evaluationStage: EvaluationStageEnum;
  sensorType: SensorTypeEnum;
  isLoading: boolean;
  sensors: ISensor[];
  readOnly: boolean;
}

const SensorsList: React.FC<SensorsListProps> = ({
  projectId,
  title,
  sensors,
  isLoading,
  evaluationStage,
  sensorType,
  readOnly,
}) => {
  const { DeleteSensor, SendSensorData } = useSensor();
  const { ListEvaluations } = useEvaluations();

  const { data: eveluationsData } = ListEvaluations(projectId, evaluationStage);
  const [selectedSensor, setSelectedSensor] = useState<ISensor>({} as ISensor);

  const {
    isOpen: isOpenCreateModal,
    onOpen: onOpenCreateModal,
    onClose: onCloseCreateModal,
  } = useDisclosure();

  const {
    isOpen: isOpenEditModal,
    onOpen: onOpenEditModal,
    onClose: onCloseEditModal,
  } = useDisclosure();

  const {
    isOpen: isOpenDelete,
    onOpen: onOpenDelete,
    onClose: onCloseDelete,
  } = useDisclosure();

  const {
    isOpen: isOpenUploadFileModal,
    onOpen: onOpenUploadFileModal,
    onClose: onCloseUploadFileModal,
  } = useDisclosure();

  const [exySensorsEmployeesOptions, setExySensorsEmployeesOptions] = useState<
    IEmployeeEvaluation[]
  >([]);

  const [otherSensorsEmployeesOptions, setOtherSensorsEmployeesOptions] =
    useState<IEmployeeEvaluation[]>([]);

  useEffect(() => {
    if (eveluationsData) {
      const controlEmployeesWithoutExySensor =
        eveluationsData?.control_employees.filter(
          (controlEmployee) => controlEmployee.exy_sensor === null
        );

      const testEmployeesWithoutExySensor =
        eveluationsData?.test_employees.filter(
          (testEmployee) => testEmployee.exy_sensor === null
        );

      const employeesWithoutExySensors = [
        ...(controlEmployeesWithoutExySensor || []),
        ...(testEmployeesWithoutExySensor || []),
      ];

      setExySensorsEmployeesOptions(employeesWithoutExySensors);
    }
  }, [
    eveluationsData,
    eveluationsData?.control_employees,
    eveluationsData?.test_employees,
  ]);

  useEffect(() => {
    const controlEmployeesWithoutOtherSensor =
      eveluationsData?.control_employees.filter(
        (controlEmployee) => controlEmployee.other_sensor === null
      );

    const testEmployeesWithoutOtherSensor =
      eveluationsData?.test_employees.filter(
        (testEmployee) => testEmployee.other_sensor === null
      );

    const employeesWithoutOtherSensors = [
      ...(controlEmployeesWithoutOtherSensor || []),
      ...(testEmployeesWithoutOtherSensor || []),
    ];

    setOtherSensorsEmployeesOptions(employeesWithoutOtherSensors);
  }, [eveluationsData?.control_employees, eveluationsData?.test_employees]);

  const ListToRender = useMemo(() => {
    if (isLoading) {
      return <LoadingSkeleton height={55} />;
    }
    return sensors?.length ? (
      sensors.map((sensor) => {
        const info: IList[] = [
          {
            label: sensor.project_employee.employee?.name,
          },
          {
            label: format(sensor.started_at, 'dd/MM/yyyy'),
          },
          {
            label: sensor.project_employee.equipment?.name || '---',
          },
        ];
        return (
          <SensorListItem
            readOnly={readOnly}
            actionsGapWidth={sensorType === SensorTypeEnum.EXY ? 100 : 60}
            key={sensor.id}
            list={info}
            uploadFile={
              sensorType === SensorTypeEnum.EXY
                ? () => {
                    setSelectedSensor(sensor);
                    onOpenUploadFileModal();
                  }
                : undefined
            }
            editItem={() => {
              setSelectedSensor(sensor);
              onOpenEditModal();
            }}
            deleteItem={() => {
              setSelectedSensor(sensor);
              onOpenDelete();
            }}
          />
        );
      })
    ) : (
      <EmptyListMessage message="Nenhum sensor encontrado" fontSize={1} />
    );
  }, [
    isLoading,
    onOpenDelete,
    onOpenEditModal,
    onOpenUploadFileModal,
    readOnly,
    sensorType,
    sensors,
  ]);

  const addButtonToRender = useMemo(() => {
    if (
      (sensorType === SensorTypeEnum.EXY &&
        exySensorsEmployeesOptions.length) ||
      (sensorType === SensorTypeEnum.OTHERS &&
        otherSensorsEmployeesOptions.length)
    ) {
      return (
        <IconButton onClick={onOpenCreateModal}>
          <FiPlusCircle />
        </IconButton>
      );
    }
    return undefined;
  }, [
    exySensorsEmployeesOptions.length,
    onOpenCreateModal,
    otherSensorsEmployeesOptions.length,
    sensorType,
  ]);

  return (
    <>
      <CreateSensorModal
        isOpen={isOpenCreateModal}
        onClose={onCloseCreateModal}
        evaluationStage={evaluationStage}
        sensorType={sensorType}
        projectId={projectId}
      />
      <EditSensorModal
        isOpen={isOpenEditModal}
        onClose={onCloseEditModal}
        sensor={selectedSensor}
        readOnly={readOnly}
      />
      <Confirmation
        isOpen={isOpenDelete}
        title="Você tem certeza que deseja excluir este sensor?"
        confirmButtonLabel="EXCLUIR"
        ConfirmationIcon={FiTrash2}
        onConfirm={() => {
          DeleteSensor(selectedSensor.id);
          onCloseDelete();
        }}
        onClose={onCloseDelete}
      />
      <AddFileModal
        isOpen={isOpenUploadFileModal}
        title="Sensores EXY"
        onConfirm={(file) => {
          SendSensorData({ sensorId: selectedSensor.id, fileToSend: file });
          onCloseUploadFileModal();
        }}
        onClose={onCloseUploadFileModal}
        availableFileTypes={['text/plain']}
      />
      <Container>
        <TitleContainer>
          <Title>{title}</Title>
          {!readOnly && addButtonToRender}
        </TitleContainer>
        <ListHeader
          headerList={SensorListHeaderLabels}
          actionsGapWidth={sensorType === SensorTypeEnum.EXY ? 100 : 60}
        />
        <List>{ListToRender}</List>
      </Container>
    </>
  );
};

export default SensorsList;
