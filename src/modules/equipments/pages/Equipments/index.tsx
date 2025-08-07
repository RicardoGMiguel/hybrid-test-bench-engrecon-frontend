import { useDisclosure } from '@chakra-ui/react';
import Button from '@components/Button';
import Confirmation from '@components/Confirmation';
import EmptyListMessage from '@components/EmptyListMessage';
import ListHeader from '@components/List/ListHeader';
import ListItem from '@components/List/ListItem';
import LoadingSkeleton from '@components/LoadingSkeleton';
import SearchInput from '@components/SearchInput';
import Title from '@components/Title';
import { EquipmentsHeaderLabels } from '@modules/equipments/constants/EquipmentsHeaderLabels';
import { TranslateEquipmentSizePT } from '@modules/equipments/utils/translateEquipmentSizeToPT';
import { TranslateEquipmentTypePT } from '@modules/equipments/utils/translateEquipmentTypeToPT';
import React, { useEffect, useMemo, useState } from 'react';
import { FiPlusCircle, FiTrash2 } from 'react-icons/fi';
import { useNavigate } from 'react-router-dom';

import { IList } from '@components/List/interfaces/IList';
import { useEquipment } from '@modules/equipments/hooks';
import { IEquipment } from '@modules/equipments/interfaces/IEquipment';
import { PrivatePathsEnum } from '@routes/privateRoutes/privatePaths';
import { Container, Content, Header } from './styles';

const Equipments: React.FC = () => {
  const navigate = useNavigate();

  const {
    isOpen: isOpenDelete,
    onOpen: onOpenDelete,
    onClose: onCloseDelete,
  } = useDisclosure();

  useEffect(() => {
    document.title = 'Exy | Equipamentos';
  }, []);

  const { ListEquipments, DeleteEquipment } = useEquipment();

  const { data, isFetching } = ListEquipments();

  const [equipments, setEquipments] = useState<IEquipment[]>([]);

  const [filter, setFilter] = useState('');
  const [selectedEquipmentId, setSelectedEquipmentId] = useState('');

  useEffect(() => {
    if (data) {
      if (filter) {
        const lowerCaseFilter = filter.toLowerCase();
        const filteredItems = data.filter(
          (item) =>
            item.name.toLocaleLowerCase().includes(lowerCaseFilter) ||
            item.customer.name.toLocaleLowerCase().includes(lowerCaseFilter)
        );
        setEquipments(filteredItems);
        return;
      }

      setEquipments(data);
    }
  }, [data, filter]);

  const ListToRender = useMemo(() => {
    if (equipments.length) {
      return equipments.map((equipment) => {
        const info: IList[] = [
          {
            label: equipment.name,
          },
          {
            label: TranslateEquipmentTypePT(equipment.type),
          },
          {
            label: TranslateEquipmentSizePT(equipment.size),
          },
          {
            label: equipment.code,
          },
          {
            label: equipment.customer?.name,
          },
        ];
        return (
          <ListItem
            actionsGapWidth={80}
            key={equipment.id}
            list={info}
            editItem={() =>
              navigate(PrivatePathsEnum.UPDATE_EQUIPMENT, {
                state: {
                  selectedEquipment: equipment,
                },
              })
            }
            deleteItem={() => {
              setSelectedEquipmentId(equipment.id);
              onOpenDelete();
            }}
          />
        );
      });
    }

    return <EmptyListMessage message="Nenhum equipamento encontrado" />;
  }, [equipments, navigate, onOpenDelete]);

  return (
    <>
      <Confirmation
        isOpen={isOpenDelete}
        title="Você tem certeza que deseja excluir este equipamento?"
        confirmButtonLabel="EXCLUIR"
        ConfirmationIcon={FiTrash2}
        onConfirm={() => {
          DeleteEquipment(selectedEquipmentId);
          onCloseDelete();
        }}
        onClose={onCloseDelete}
      />
      <Container>
        <Header>
          <div>
            <Title value="Equipamentos" />
            <SearchInput
              placeholder="Buscar..."
              value={filter}
              onChange={(value) => setFilter(value.currentTarget.value)}
            />
          </div>
          <Button
            onClick={() => navigate(PrivatePathsEnum.CREATE_EQUIPMENTS)}
            Icon={FiPlusCircle}
            label="Cadastrar Novo"
            borderRadius={30}
          />
        </Header>

        <ListHeader headerList={EquipmentsHeaderLabels} actionsGapWidth={80} />
        <Content>{isFetching ? <LoadingSkeleton /> : ListToRender}</Content>
      </Container>
    </>
  );
};

export default Equipments;
