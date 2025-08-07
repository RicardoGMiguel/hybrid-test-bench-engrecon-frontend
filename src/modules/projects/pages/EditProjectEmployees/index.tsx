import Button from '@components/Button';
import { useEmployee } from '@modules/employees/hooks/index';
import { useEquipment } from '@modules/equipments/hooks';
import EmployeeFormSelect, {
  EmployeeSelectOptionItem,
} from '@modules/projects/components/EmployeeFormSelect';
import { useProjectEmployee } from '@modules/projects/hooks/projectEmployees/index';
import { useProject } from '@modules/projects/hooks/projects/index';
import themeDefaults from '@style/themeDefaults';
import React, { useCallback, useEffect, useState } from 'react';
import { useFieldArray, useForm } from 'react-hook-form';
import { FiPlusCircle, FiSave, FiTrash2 } from 'react-icons/fi';
import { IoCaretBackSharp } from 'react-icons/io5';
import { useNavigate } from 'react-router-dom';

import {
  EditProjectEmployeeFormData,
  editProjectEmployeeFormResolver,
} from './editProjectEmployeeForm.zod';
import {
  ActionsContainer,
  Container,
  Content,
  CustomEmptyListMessage,
  DeleteButton,
  EmployeeForm,
  EmployeeFormContainer,
  FooterContainer,
  FormContainer,
  HeaderContainer,
  InputContainer,
  ListContainer,
  ListHeader,
  ListHeaderItem,
} from './styles';

const EditProjectEmployees: React.FC = () => {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);

  const [employeesOptions, setEmployeesOptions] = useState<
    EmployeeSelectOptionItem[]
  >([]);
  const [equipmentsOptions, setEquipmentsOptions] = useState<
    EmployeeSelectOptionItem[]
  >([]);

  const { selectedCustomerId } = useProject();

  const { setTempEditProjectEmployee, tempEditProjectEmployee } =
    useProjectEmployee();

  const { ListEmployees } = useEmployee();
  const { ListEquipments } = useEquipment();

  const { data: employeesData } = ListEmployees(selectedCustomerId);
  const { data: equipmentsData } = ListEquipments(selectedCustomerId);

  const {
    handleSubmit,
    control,
    watch,
    formState: { isValid },
  } = useForm<EditProjectEmployeeFormData>({
    resolver: editProjectEmployeeFormResolver,
    defaultValues: tempEditProjectEmployee,
  });

  const { fields, append, remove, update } = useFieldArray({
    control,
    name: 'selectedProjectEmployees',
  });

  const watchEmployees = watch('selectedProjectEmployees');

  const handleOnSelectEmployee = useCallback(() => {
    setEmployeesOptions(() => {
      if (employeesData) {
        const availableEmployeesOptions =
          employeesData.map<EmployeeSelectOptionItem>((employeeData) => ({
            label: employeeData.name,
            value: employeeData.id,
          }));

        const selectedEmployeesIds = watchEmployees?.map(
          (item) => item.employee.value
        );

        selectedEmployeesIds?.forEach((id) => {
          const selectedOptionIndex = availableEmployeesOptions.findIndex(
            (option) => option.value === id
          );
          if (selectedOptionIndex >= 0) {
            availableEmployeesOptions.splice(selectedOptionIndex, 1);
          }
        });

        return availableEmployeesOptions;
      }
      return [];
    });
  }, [employeesData, watchEmployees]);

  useEffect(() => {
    handleOnSelectEmployee();
  }, [handleOnSelectEmployee]);

  useEffect(() => {
    if (equipmentsData) {
      const initialEquipmentsOptions =
        equipmentsData.map<EmployeeSelectOptionItem>((equipment) => ({
          label: equipment.name,
          value: equipment.id,
        }));

      setEquipmentsOptions(initialEquipmentsOptions);
    }
  }, [equipmentsData]);

  const onSubmit = useCallback(
    async (data: EditProjectEmployeeFormData) => {
      try {
        setIsLoading(true);
        setTempEditProjectEmployee(data);
        navigate(-1);
        setIsLoading(false);
      } catch (error) {
        setIsLoading(false);
      }
    },
    [navigate, setTempEditProjectEmployee]
  );

  const handleOnRemoveEmployee = useCallback(
    (index: number) => {
      setEmployeesOptions((prevState) => {
        const availableOptions: EmployeeSelectOptionItem[] = [...prevState];
        const removedItem = watchEmployees[index];
        if (removedItem.employee.value) {
          availableOptions.push({
            label: removedItem.employee.label,
            value: removedItem.employee.value,
          });
        }
        return availableOptions;
      });
    },
    [watchEmployees]
  );

  return (
    <Container>
      <FormContainer onSubmit={handleSubmit(onSubmit)}>
        <Content>
          <HeaderContainer>
            <Button
              type="button"
              label="Adicionar colaborador"
              Icon={FiPlusCircle}
              backgroundColor={themeDefaults.colors.exyGray}
              color={themeDefaults.colors.white}
              disabled={!employeesOptions.length}
              onClick={() => {
                if (fields.length === 0 || isValid) {
                  append({
                    employee: {} as EmployeeSelectOptionItem,
                    equipment: {} as EmployeeSelectOptionItem,
                    group: {} as EmployeeSelectOptionItem,
                  });
                }
              }}
              size="sm"
            />
            <ListHeader>
              <ListHeaderItem>
                <p>Nome</p>
              </ListHeaderItem>
              <ListHeaderItem>
                <p>Grupo</p>
              </ListHeaderItem>
              <ListHeaderItem>
                <p>Equipamento</p>
              </ListHeaderItem>
              <ActionsContainer />
            </ListHeader>
          </HeaderContainer>
          <ListContainer>
            {fields.length ? (
              fields.map((item, index) => (
                <EmployeeFormContainer key={item.id}>
                  <EmployeeForm>
                    <InputContainer>
                      <EmployeeFormSelect
                        control={control}
                        name={`selectedProjectEmployees.${index}.employee`}
                        placeholder="Selecione um colaborador"
                        options={employeesOptions}
                        selected={() => handleOnSelectEmployee()}
                      />
                    </InputContainer>
                    <InputContainer>
                      <EmployeeFormSelect
                        control={control}
                        name={`selectedProjectEmployees.${index}.group`}
                        placeholder="Selecione um grupo"
                        selected={(value) => {
                          if (value === 'Controle') {
                            update(index, {
                              equipment: {},
                              employee: watchEmployees[index].employee,
                              group: watchEmployees[index].group,
                            });
                          }
                        }}
                        options={[
                          {
                            label: 'Teste',
                            value: 'Teste',
                          },
                          {
                            label: 'Controle',
                            value: 'Controle',
                          },
                        ]}
                      />
                    </InputContainer>
                    <InputContainer>
                      <EmployeeFormSelect
                        control={control}
                        name={`selectedProjectEmployees.${index}.equipment`}
                        placeholder={
                          watchEmployees[index].group.value === 'Controle' ||
                          !watchEmployees[index].group.value
                            ? ''
                            : 'Selecione um equipamento'
                        }
                        disabled={
                          watchEmployees[index].group.value === 'Controle' ||
                          !watchEmployees[index].group.value
                        }
                        options={equipmentsOptions}
                      />
                    </InputContainer>
                    <ActionsContainer>
                      <DeleteButton
                        type="button"
                        onClick={() => {
                          handleOnRemoveEmployee(index);
                          remove(index);
                        }}
                      >
                        <FiTrash2 />
                      </DeleteButton>
                    </ActionsContainer>
                  </EmployeeForm>
                </EmployeeFormContainer>
              ))
            ) : (
              <CustomEmptyListMessage>
                <p>Nenhum colaborador adicionado</p>
              </CustomEmptyListMessage>
            )}
          </ListContainer>
        </Content>
        <FooterContainer>
          <Button
            type="button"
            label="Voltar"
            Icon={IoCaretBackSharp}
            backgroundColor={themeDefaults.colors.exyGray}
            color={themeDefaults.colors.white}
            onClick={() => navigate(-1)}
          />
          <Button
            type="submit"
            label="Salvar"
            Icon={FiSave}
            disabled={isLoading}
          />
        </FooterContainer>
      </FormContainer>
    </Container>
  );
};

export default EditProjectEmployees;
