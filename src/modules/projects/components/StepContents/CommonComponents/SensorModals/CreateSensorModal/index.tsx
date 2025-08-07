import React, { useCallback, useEffect, useRef, useState } from 'react';
import { FiSave } from 'react-icons/fi';
import {
  FormControl,
  AlertDialog,
  AlertDialogContent,
  AlertDialogOverlay,
} from '@chakra-ui/react';
import { useSensor } from '@modules/projects/hooks/sensors/index';
import { useEvaluations } from '@modules/projects/hooks/evaluations/index';
import { useForm } from 'react-hook-form';
import { EvaluationStageEnum } from '@modules/projects/types/EvaluationStageEnum';

import Button from '@components/Button';
import themeDefaults from '@style/themeDefaults';
import { IFormCreateSensor } from '@modules/projects/interfaces/ISensor';
import { SensorTypeEnum } from '@modules/projects/types/SensorTypeEnum';
import ModalTextArea from '@components/Form/ModalTextArea';
import SensorFormSelect, { OptionItem } from '../../SensorFormSelect';
import { Container, Content, NameAndDateContainer } from './styles';
import {
  CreateSensorFormData,
  createSensorFormResolver,
} from './createSensorForm.zod';
import SensorFormDatePicker from '../../SensorFormDatePicker';

type CreateSensorModalProps = {
  isOpen: boolean;
  onClose: () => void;
  evaluationStage: EvaluationStageEnum;
  sensorType: SensorTypeEnum;
  projectId: string;
};

const CreateSensorModal: React.FC<CreateSensorModalProps> = ({
  isOpen,
  onClose,
  evaluationStage,
  sensorType,
  projectId,
}) => {
  const cancelRef = useRef<any>(null);
  const { CreateSensor } = useSensor();
  const { ListEvaluations } = useEvaluations();

  const { data: eveluationsData } = ListEvaluations(projectId, evaluationStage);

  const [isLoading, setIsLoading] = useState(false);
  const [exySensorsEmployeesOptions, setExySensorsEmployeesOptions] = useState<
    OptionItem[]
  >([]);

  const [otherSensorsEmployeesOptions, setOtherSensorsEmployeesOptions] =
    useState<OptionItem[]>([]);

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

      const options: OptionItem[] = employeesWithoutExySensors.map(
        (projectEmployee) => ({
          label: projectEmployee.employee.name,
          value: projectEmployee.id,
        })
      );

      setExySensorsEmployeesOptions(options);
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

    const options: OptionItem[] = employeesWithoutOtherSensors.map(
      (projectEmployee) => ({
        label: projectEmployee.employee.name,
        value: projectEmployee.id,
      })
    );

    setOtherSensorsEmployeesOptions(options);
  }, [eveluationsData?.control_employees, eveluationsData?.test_employees]);

  const {
    handleSubmit,
    reset,
    register,
    getFieldState,
    control,
    watch,
    formState: { errors, isValid },
  } = useForm<CreateSensorFormData>({
    resolver: createSensorFormResolver,
    mode: 'all',
  });

  const watchStartDate = watch('started_at');
  const watchEndDate = watch('ended_at');

  const onSubmit = useCallback(
    async (data: CreateSensorFormData) => {
      try {
        setIsLoading(true);

        const dataToSend: IFormCreateSensor = {
          ...data,
          evaluation_type: evaluationStage,
          sensor_type: sensorType,
          name: 'name',
          project_employee_id: data.project_employee_id.value,
        };

        if (!dataToSend.observation) dataToSend.observation = null;

        await CreateSensor(dataToSend);

        setIsLoading(false);
        onClose();
      } catch (error) {
        setIsLoading(false);
      }
    },
    [CreateSensor, evaluationStage, onClose, sensorType]
  );

  useEffect(() => {
    reset();
  }, [isOpen, reset]);

  return (
    <AlertDialog
      isOpen={isOpen}
      leastDestructiveRef={cancelRef}
      onClose={() => {
        reset();
        onClose();
      }}
      isCentered
      motionPreset="slideInBottom"
    >
      <AlertDialogOverlay>
        <AlertDialogContent minWidth={820} padding={10} borderRadius={10}>
          <Container>
            <Content onSubmit={handleSubmit(onSubmit)}>
              <NameAndDateContainer>
                <FormControl isInvalid={!!errors.project_employee_id}>
                  <SensorFormSelect
                    label="Nome"
                    control={control}
                    name="project_employee_id"
                    placeholder="Selecione um colaborador"
                    options={
                      sensorType === SensorTypeEnum.EXY
                        ? exySensorsEmployeesOptions
                        : otherSensorsEmployeesOptions
                    }
                    labelSize={1.4}
                  />
                </FormControl>
                <FormControl isInvalid={!!errors.started_at} width="85%">
                  <SensorFormDatePicker
                    control={control}
                    label="Data Inicial"
                    register={register}
                    name="started_at"
                    state={getFieldState('started_at')}
                    placeholder="__ /__ /____"
                    errors={errors.started_at}
                    maxDate={watchEndDate || undefined}
                  />
                </FormControl>
                <FormControl isInvalid={!!errors.ended_at} width="85%">
                  <SensorFormDatePicker
                    control={control}
                    label="Data Final"
                    register={register}
                    name="ended_at"
                    state={getFieldState('ended_at')}
                    placeholder="__ /__ /____"
                    errors={errors.ended_at}
                    minDate={watchStartDate || undefined}
                  />
                </FormControl>
              </NameAndDateContainer>
              <FormControl isInvalid={!!errors.result_description}>
                <ModalTextArea
                  label="Descrição do método de medição e resultados obtidos"
                  register={register}
                  name="result_description"
                  state={getFieldState('result_description')}
                  maxLength={500}
                />
              </FormControl>
              <FormControl isInvalid={!!errors.observation}>
                <ModalTextArea
                  label="Observações"
                  register={register}
                  name="observation"
                  state={getFieldState('observation')}
                  height={100}
                  maxLength={500}
                />
              </FormControl>
              <Button
                type="submit"
                label="Salvar"
                Icon={FiSave}
                backgroundColor={themeDefaults.colors.exyGray}
                color={themeDefaults.colors.white}
                disabled={!isValid || isLoading}
              />
            </Content>
          </Container>
        </AlertDialogContent>
      </AlertDialogOverlay>
    </AlertDialog>
  );
};

export default CreateSensorModal;
