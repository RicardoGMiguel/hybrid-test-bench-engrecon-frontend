import React, { useEffect, useMemo, useState } from 'react';
import { FiPlusCircle, FiTrash2 } from 'react-icons/fi';
import { useNavigate } from 'react-router-dom';
import { useDisclosure } from '@chakra-ui/react';
import Title from '@components/Title';
import SearchInput from '@components/SearchInput';
import Button from '@components/Button';
import ListHeader from '@components/List/ListHeader';
import ListItem from '@components/List/ListItem';
import Confirmation from '@components/Confirmation';
import LoadingSkeleton from '@components/LoadingSkeleton';
import EmptyListMessage from '@components/EmptyListMessage';
import { EmployeesHeaderLabels } from '@modules/employees/constants/EmployeesHeaderLabels';

import { IEmployee } from '@modules/employees/interfaces/IEmployee';
import { IList } from '@components/List/interfaces/IList';
import { PrivatePathsEnum } from '@routes/privateRoutes/privatePaths';
import { useEmployee } from '@modules/employees/hooks';
import { TranslateGenderToPT } from '@modules/employees/utils/translateGenderToPT';
import { format } from 'date-fns';
import { Container, Header, Content } from './styles';

const Employees: React.FC = () => {
  const navigate = useNavigate();

  const {
    isOpen: isOpenDelete,
    onOpen: onOpenDelete,
    onClose: onCloseDelete,
  } = useDisclosure();

  useEffect(() => {
    document.title = 'Exy | Colaboradores';
  }, []);

  const { ListEmployees, DeleteEmployee } = useEmployee();

  const { data, isFetching } = ListEmployees();

  const [employees, setEmployees] = useState<IEmployee[]>([]);

  const [filter, setFilter] = useState('');
  const [selectedEmployeeId, setSelectedEmployeeId] = useState('');

  useEffect(() => {
    if (data) {
      if (filter) {
        const lowerCaseFilter = filter.toLowerCase();
        const filteredItems = data.filter(
          (item) =>
            item.name.toLocaleLowerCase().includes(lowerCaseFilter) ||
            item.customer.name.toLocaleLowerCase().includes(lowerCaseFilter)
        );
        setEmployees(filteredItems);
        return;
      }

      setEmployees(data);
    }
  }, [data, filter]);

  const ListToRender = useMemo(() => {
    if (employees.length) {
      return employees.map((employee) => {
        const info: IList[] = [
          {
            label: employee.name,
          },
          {
            label: TranslateGenderToPT(employee.gender),
          },
          {
            label: employee.professional_registry,
          },
          {
            label: format(new Date(employee.birth_date), 'dd/MM/yyyy'),
          },
          {
            label: employee.position,
          },
          {
            label: employee.activity_time,
          },
          {
            label: employee.customer.name,
          },
        ];
        return (
          <ListItem
            actionsGapWidth={80}
            key={employee.id}
            list={info}
            editItem={() =>
              navigate(PrivatePathsEnum.UPDATE_EMPLOYEE, {
                state: {
                  selectedEmployee: employee,
                },
              })
            }
            deleteItem={() => {
              setSelectedEmployeeId(employee.id);
              onOpenDelete();
            }}
          />
        );
      });
    }

    return <EmptyListMessage message="Nenhum colaborador encontrado" />;
  }, [employees, navigate, onOpenDelete]);

  return (
    <>
      <Confirmation
        isOpen={isOpenDelete}
        title="Você tem certeza que deseja excluir este colaborador?"
        confirmButtonLabel="EXCLUIR"
        ConfirmationIcon={FiTrash2}
        onConfirm={() => {
          DeleteEmployee(selectedEmployeeId);
          onCloseDelete();
        }}
        onClose={onCloseDelete}
      />
      <Container>
        <Header>
          <div>
            <Title value="Colaboradores" />
            <SearchInput
              placeholder="Buscar..."
              value={filter}
              onChange={(value) => setFilter(value.currentTarget.value)}
            />
          </div>
          <Button
            onClick={() => navigate(PrivatePathsEnum.CREATE_EMPLOYEES)}
            Icon={FiPlusCircle}
            label="Cadastrar Novo"
            borderRadius={30}
          />
        </Header>

        <ListHeader headerList={EmployeesHeaderLabels} actionsGapWidth={80} />
        <Content>{isFetching ? <LoadingSkeleton /> : ListToRender}</Content>
      </Container>
    </>
  );
};

export default Employees;
