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
import { CustomersHeaderLabels } from '@modules/customers/constants/CustomersHeaderLabels';

import { ICustomer } from '@modules/customers/interfaces/ICustomer';
import { IList } from '@components/List/interfaces/IList';
import { PrivatePathsEnum } from '@routes/privateRoutes/privatePaths';
import { useCustomer } from '@modules/customers/hooks';
import { Container, Header, Content } from './styles';

const Customers: React.FC = () => {
  const navigate = useNavigate();

  const {
    isOpen: isOpenDelete,
    onOpen: onOpenDelete,
    onClose: onCloseDelete,
  } = useDisclosure();

  useEffect(() => {
    document.title = 'Exy | Empresas';
  }, []);

  const { ListCustomers, DeleteCustomer } = useCustomer();

  const { data, isFetching } = ListCustomers();

  const [customers, setCustomers] = useState<ICustomer[]>([]);

  const [filter, setFilter] = useState('');
  const [selectedCustomerId, setSelectedCustomerId] = useState('');

  useEffect(() => {
    if (data) {
      if (filter) {
        const lowerCaseFilter = filter.toLowerCase();
        const filteredItems = data.filter((item) =>
          item.name.toLocaleLowerCase().includes(lowerCaseFilter)
        );
        setCustomers(filteredItems);
        return;
      }

      setCustomers(data);
    }
  }, [data, filter]);

  const ListToRender = useMemo(() => {
    if (customers.length) {
      return customers.map((customer) => {
        const info: IList[] = [
          {
            label: customer.name,
          },
          {
            label: customer.cnpj,
          },
          {
            label: customer.address_state,
          },
          {
            label: customer.email,
          },
          {
            label: `${customer.phone || customer.cellphone || '-'}`,
          },
        ];
        return (
          <ListItem
            actionsGapWidth={80}
            key={customer.id}
            list={info}
            editItem={() =>
              navigate(PrivatePathsEnum.UPDATE_CUSTOMER, {
                state: {
                  selectedCustomer: customer,
                },
              })
            }
            deleteItem={() => {
              setSelectedCustomerId(customer.id);
              onOpenDelete();
            }}
          />
        );
      });
    }

    return <EmptyListMessage message="Nenhuma empresa encontrada" />;
  }, [customers, navigate, onOpenDelete]);

  return (
    <>
      <Confirmation
        isOpen={isOpenDelete}
        title="Você tem certeza que deseja excluir esta empresa?"
        confirmButtonLabel="EXCLUIR"
        ConfirmationIcon={FiTrash2}
        onConfirm={() => {
          DeleteCustomer(selectedCustomerId);
          onCloseDelete();
        }}
        onClose={onCloseDelete}
      />
      <Container>
        <Header>
          <div>
            <Title value="Empresas" />
            <SearchInput
              placeholder="Buscar..."
              value={filter}
              onChange={(value) => setFilter(value.currentTarget.value)}
            />
          </div>
          <Button
            onClick={() => navigate(PrivatePathsEnum.CREATE_CUSTOMERS)}
            Icon={FiPlusCircle}
            label="Cadastrar Novo"
            borderRadius={30}
          />
        </Header>

        <ListHeader headerList={CustomersHeaderLabels} actionsGapWidth={80} />
        <Content>{isFetching ? <LoadingSkeleton /> : ListToRender}</Content>
      </Container>
    </>
  );
};

export default Customers;
