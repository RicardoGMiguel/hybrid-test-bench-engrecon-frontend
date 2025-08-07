import React, {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from 'react';
import { FiSave } from 'react-icons/fi';
import {
  FormControl,
  AlertDialog,
  AlertDialogContent,
  AlertDialogOverlay,
} from '@chakra-ui/react';
import { useSensor } from '@modules/projects/hooks/sensors/index';
import { useForm } from 'react-hook-form';

import Button from '@components/Button';
import themeDefaults from '@style/themeDefaults';
import {
  IFormUpdateSensor,
  ISensor,
} from '@modules/projects/interfaces/ISensor';
import ModalTextArea from '@components/Form/ModalTextArea';
import { Container, Content, NameAndDateContainer } from './styles';
import {
  EditSensorFormData,
  editSensorFormResolver,
} from './editSensorForm.zod';
import SensorFormDatePicker from '../../SensorFormDatePicker';
import SensorFormSelect from '../../SensorFormSelect';

type EditSensorModalProps = {
  isOpen: boolean;
  onClose: () => void;
  sensor: ISensor;
  readOnly: boolean;
};

const EditSensorModal: React.FC<EditSensorModalProps> = ({
  isOpen,
  onClose,
  sensor,
  readOnly,
}) => {
  const cancelRef = useRef<any>(null);
  const { UpdateSensor } = useSensor();

  const [isLoading, setIsLoading] = useState(false);

  const [disableNameSelect, setDisableNameSelect] = useState(false);

  const defaultValues: EditSensorFormData = useMemo(
    () => ({
      project_employee_id: {
        label: sensor.project_employee?.employee?.name,
        value: sensor.project_employee?.employee_id,
      },
      ended_at: new Date(sensor.ended_at),
      started_at: new Date(sensor.started_at),
      result_description: sensor.result_description,
      observation: sensor.observation,
    }),
    [sensor]
  );

  const {
    handleSubmit,
    reset,
    register,
    getFieldState,
    control,
    watch,
    formState: { errors, isValid },
  } = useForm<EditSensorFormData>({
    resolver: editSensorFormResolver,
    mode: 'all',
    values: defaultValues,
  });

  const watchStartDate = watch('started_at');
  const watchEndDate = watch('ended_at');

  const onSubmit = useCallback(
    async (data: EditSensorFormData) => {
      try {
        setIsLoading(true);

        const dataToSend: IFormUpdateSensor = {
          name: 'name',
          started_at: data.started_at,
          ended_at: data.ended_at,
          result_description: data.result_description,
          observation: data.observation,
        };

        if (!dataToSend.observation) dataToSend.observation = null;

        await UpdateSensor({ sensorId: sensor.id, data: dataToSend });

        setIsLoading(false);
        setDisableNameSelect(false);
        onClose();
      } catch (error) {
        setIsLoading(false);
      }
    },
    [UpdateSensor, onClose, sensor.id]
  );

  useEffect(() => {
    reset();
  }, [isOpen, reset]);

  useEffect(() => {
    if (isOpen) setTimeout(() => setDisableNameSelect(true), 0);
  }, [isOpen]);

  return (
    <AlertDialog
      isOpen={isOpen}
      leastDestructiveRef={cancelRef}
      onClose={() => {
        reset();
        onClose();
        setDisableNameSelect(false);
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
                    options={[
                      {
                        label: '',
                        value: '',
                      },
                    ]}
                    labelSize={1.4}
                    disabled={disableNameSelect}
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
                    disabled={readOnly}
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
                    disabled={readOnly}
                  />
                </FormControl>
              </NameAndDateContainer>
              <FormControl isInvalid={!!errors.result_description}>
                <ModalTextArea
                  label="Descrição do método de medição e resultados obtidos"
                  register={register}
                  name="result_description"
                  state={getFieldState('result_description')}
                  disabled={readOnly}
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
                  disabled={readOnly}
                  maxLength={500}
                />
              </FormControl>
              <Button
                type="submit"
                label="Salvar"
                Icon={FiSave}
                backgroundColor={themeDefaults.colors.exyGray}
                color={themeDefaults.colors.white}
                disabled={!isValid || isLoading || readOnly}
              />
            </Content>
          </Container>
        </AlertDialogContent>
      </AlertDialogOverlay>
    </AlertDialog>
  );
};

export default EditSensorModal;
