import { IList } from '@components/List/interfaces/IList';
import React from 'react';
import { FiEdit, FiTrash2, FiUpload } from 'react-icons/fi';
import { ButtonGap, Container, Content, IconButton, Label } from './styles';

interface SensorListProps {
  list: IList[];
  actionsGapWidth: number;
  uploadFile?: () => void;
  editItem: () => void;
  deleteItem: () => void;
  readOnly: boolean;
}

const SensorListItem: React.FC<SensorListProps> = ({
  list,
  actionsGapWidth,
  uploadFile,
  editItem,
  deleteItem,
  readOnly,
}) => (
  <Container>
    <Content>
      {list.map((item) => (
        <Label key={item.label}>{item.label}</Label>
      ))}
      <ButtonGap minWidth={actionsGapWidth}>
        {uploadFile && (
          <IconButton
            onClick={() => {
              if (!readOnly) uploadFile();
            }}
            disabled={readOnly}
          >
            <FiUpload />
          </IconButton>
        )}
        <IconButton onClick={editItem}>
          <FiEdit />
        </IconButton>
        <IconButton
          onClick={() => {
            if (!readOnly) deleteItem();
          }}
          disabled={readOnly}
        >
          <FiTrash2 />
        </IconButton>
      </ButtonGap>
    </Content>
  </Container>
);

export default SensorListItem;
