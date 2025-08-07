import { useDisclosure } from '@chakra-ui/react';
import AddFileModal from '@components/AddFileModal';
import { useProject } from '@modules/projects/hooks/projects/index';
import { IShowProject } from '@modules/projects/interfaces/IProject';
import React, { useMemo } from 'react';
import { FiUpload } from 'react-icons/fi';
import { Container, IconContainer, Label } from './styles';

interface AddAttendanceFileButtonProps {
  label: string;
  project: IShowProject;
  readOnly: boolean;
}

const AddAttendanceFileButton: React.FC<AddAttendanceFileButtonProps> = ({
  label,
  project,
  readOnly,
}) => {
  const { SendAttendanceList, DeleteAttendanceList } = useProject();

  const {
    isOpen: isOpenModal,
    onOpen: onOpenModal,
    onClose: onCloseModal,
  } = useDisclosure();

  const currentFileName = useMemo(() => {
    const splittedName = (project.attendance_list || '').split('-');
    const nameArray = splittedName.splice(-1, 1);
    const name = nameArray.join();

    return name;
  }, [project]);

  return (
    <>
      <AddFileModal
        isOpen={isOpenModal}
        title="Lista de Presença"
        currentFileName={currentFileName}
        currentFileUrl={project.attendance_list_url}
        onDelete={() => {
          DeleteAttendanceList(project.id);
          onCloseModal();
        }}
        onConfirm={(file) => {
          SendAttendanceList({ projectId: project.id, fileToSend: file });
          onCloseModal();
        }}
        onClose={onCloseModal}
        availableFileTypes={[
          'application/pdf',
          'application/vnd.ms-excel',
          'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
        ]}
        disabled={readOnly}
      />
      <Container onClick={onOpenModal}>
        <Label>{label}</Label>
        <IconContainer>
          <FiUpload />
        </IconContainer>
      </Container>
    </>
  );
};

export default AddAttendanceFileButton;
