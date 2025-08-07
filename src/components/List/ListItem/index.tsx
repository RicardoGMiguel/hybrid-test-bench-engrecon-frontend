import React from 'react';
import { FiEdit, FiTrash2 } from 'react-icons/fi';
import { CgEnter } from 'react-icons/cg';
import { PiKeyBold } from 'react-icons/pi';
import { IconType } from 'react-icons';
import { IList } from '../interfaces/IList';
import { ButtonGap, Container, Content, IconButton, Label } from './styles';

interface ListProps {
  list: IList[];
  actionsGapWidth: number;
  resetPassword?: () => void;
  editItem: () => void;
  EditIcon?: IconType;
  deleteItem?: () => void;
  accessItem?: () => void;
  disableAllButtons?: boolean;
  deleted?: boolean;
}

const ListItem: React.FC<ListProps> = ({
  list,
  actionsGapWidth,
  resetPassword,
  editItem,
  EditIcon,
  deleteItem,
  accessItem,
  disableAllButtons,
  deleted,
}) => (
  <Container>
    <Content deleted={deleted}>
      {list.map((item) => (
        <Label key={`${item.label}${Math.random()}`} deleted={deleted}>
          {item.label}
        </Label>
      ))}
      <ButtonGap minWidth={actionsGapWidth}>
        {resetPassword && (
          <IconButton
            onClick={() => {
              if (!disableAllButtons) resetPassword();
            }}
            disabled={disableAllButtons}
            deleted={deleted}
          >
            <PiKeyBold />
          </IconButton>
        )}
        <IconButton
          onClick={() => {
            if (!disableAllButtons) editItem();
          }}
          disabled={disableAllButtons}
          deleted={deleted}
        >
          {EditIcon ? <EditIcon /> : <FiEdit />}
        </IconButton>
        {deleteItem && (
          <IconButton
            onClick={() => {
              if (!disableAllButtons) deleteItem();
            }}
            disabled={disableAllButtons}
            deleted={deleted}
          >
            <FiTrash2 />
          </IconButton>
        )}
        {accessItem && (
          <IconButton
            onClick={() => {
              if (!disableAllButtons) accessItem();
            }}
            disabled={disableAllButtons}
            deleted={deleted}
          >
            <CgEnter />
          </IconButton>
        )}
      </ButtonGap>
    </Content>
  </Container>
);

export default ListItem;
