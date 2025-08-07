import { useDisclosure } from '@chakra-ui/react';
import Button from '@components/Button';
import Confirmation from '@components/Confirmation';
import EmptyListMessage from '@components/EmptyListMessage';
import ListHeader from '@components/List/ListHeader';
import ListItem from '@components/List/ListItem';
import LoadingSkeleton from '@components/LoadingSkeleton';
import SearchInput from '@components/SearchInput';
import Title from '@components/Title';
import { UsersHeaderLabels } from '@modules/users/constants/UsersHeaderLabels';
import React, { useEffect, useMemo, useState } from 'react';
import { FiPlusCircle, FiTrash2 } from 'react-icons/fi';
import { PiKeyBold } from 'react-icons/pi';
import { useNavigate } from 'react-router-dom';

import { IList } from '@components/List/interfaces/IList';
import { IUser } from '@modules/users/interfaces/IUser';
import { UserRolesEnum } from '@modules/users/types/UserRolesEnum';
import { TranslateRolePT } from '@modules/users/utils/translateRoleToPT';
import { PrivatePathsEnum } from '@routes/privateRoutes/privatePaths';
import { useUser } from '../../hooks/index';
import { Container, Content, Header } from './styles';

const Users: React.FC = () => {
  const navigate = useNavigate();

  const {
    isOpen: isOpenDelete,
    onOpen: onOpenDelete,
    onClose: onCloseDelete,
  } = useDisclosure();

  const {
    isOpen: isOpenResetPassword,
    onOpen: onOpenResetPassword,
    onClose: onCloseResetPassword,
  } = useDisclosure();

  useEffect(() => {
    document.title = 'Exy | Usuários';
  }, []);

  const { ListUsers, DeleteUser, ResetPassword } = useUser();

  const { data, isFetching } = ListUsers();

  const [users, setUsers] = useState<IUser[]>([]);

  const [filter, setFilter] = useState('');
  const [selectedUserId, setSelectedUserId] = useState('');

  useEffect(() => {
    if (data) {
      if (filter) {
        const lowerCaseFilter = filter.toLowerCase();
        const filteredItems = data.filter(
          (item) =>
            item.name.toLocaleLowerCase().includes(lowerCaseFilter) ||
            item.customer?.name.toLocaleLowerCase().includes(lowerCaseFilter)
        );
        setUsers(filteredItems);
        return;
      }

      setUsers(data);
    }
  }, [data, filter]);

  const ListToRender = useMemo(() => {
    if (users.length) {
      return users.map((user) => {
        const info: IList[] = [
          {
            label: user.name,
          },
          {
            label: user.email,
          },
          {
            label: `${user.phone || user.cellphone || '-'}`,
          },
          {
            label: user.position,
          },
          {
            label: TranslateRolePT(user.role),
          },
          {
            label: user.customer?.name,
          },
        ];
        return (
          <ListItem
            actionsGapWidth={120}
            key={user.id}
            list={info}
            disableAllButtons={!!(user.role === UserRolesEnum.GLOBAL_ADMIN)}
            resetPassword={() => {
              setSelectedUserId(user.id);
              onOpenResetPassword();
            }}
            editItem={() =>
              navigate(PrivatePathsEnum.UPDATE_USER, {
                state: {
                  selectedUser: user,
                },
              })
            }
            deleteItem={() => {
              setSelectedUserId(user.id);
              onOpenDelete();
            }}
          />
        );
      });
    }

    return <EmptyListMessage message="Nenhum usuário encontrado" />;
  }, [users, onOpenResetPassword, navigate, onOpenDelete]);

  return (
    <>
      <Confirmation
        isOpen={isOpenResetPassword}
        title="Você tem certeza que deseja resetar a senha deste usuário?"
        confirmButtonLabel="RESETAR"
        ConfirmationIcon={PiKeyBold}
        onConfirm={() => {
          ResetPassword(selectedUserId);
          onCloseResetPassword();
        }}
        onClose={onCloseResetPassword}
      />
      <Confirmation
        isOpen={isOpenDelete}
        title="Você tem certeza que deseja excluir este usuário?"
        confirmButtonLabel="EXCLUIR"
        ConfirmationIcon={FiTrash2}
        onConfirm={() => {
          DeleteUser(selectedUserId);
          onCloseDelete();
        }}
        onClose={onCloseDelete}
      />
      <Container>
        <Header>
          <div>
            <Title value="Usuários" />
            <SearchInput
              placeholder="Buscar..."
              value={filter}
              onChange={(value) => setFilter(value.currentTarget.value)}
            />
          </div>
          <Button
            onClick={() => navigate(PrivatePathsEnum.CREATE_USERS)}
            Icon={FiPlusCircle}
            label="Cadastrar Novo"
            borderRadius={30}
          />
        </Header>

        <ListHeader headerList={UsersHeaderLabels} actionsGapWidth={120} />
        <Content>{isFetching ? <LoadingSkeleton /> : ListToRender}</Content>
      </Container>
    </>
  );
};

export default Users;
