import React, { useMemo } from 'react';
import { FiUpload } from 'react-icons/fi';
import { useDisclosure } from '@chakra-ui/react';
import AddFileModal from '@components/AddFileModal';
import { ITemplate } from '@modules/templates/interfaces/ITemplate';
import { useTemplate } from '@modules/templates/hooks/index';
import { Container, IconContainer, Label } from './styles';

interface AddTemplateFileButtonProps {
  template: ITemplate;
}

const AddTemplateFileButton: React.FC<AddTemplateFileButtonProps> = ({
  template,
}) => {
  const {
    isOpen: isOpenModal,
    onOpen: onOpenModal,
    onClose: onCloseModal,
  } = useDisclosure();

  const { UpdateTemplate } = useTemplate();

  const currentFileName = useMemo(() => {
    const fullname = template.file_template;

    if (fullname) {
      const splittedName = fullname.split('-');
      const nameArray = splittedName.splice(-1, 1);
      const name = nameArray.join();

      return name;
    }

    return '';
  }, [template.file_template]);

  return (
    <>
      <AddFileModal
        isOpen={isOpenModal}
        title={`Template ${template.name}`}
        currentFileName={currentFileName}
        currentFileUrl={template.file_template_url || ''}
        onConfirm={(file) => {
          UpdateTemplate({ templateId: template.id, fileToSend: file });
          onCloseModal();
        }}
        onClose={onCloseModal}
        availableFileTypes={[
          'application/pdf',
          'application/vnd.ms-excel',
          'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
        ]}
      />
      <Container onClick={onOpenModal}>
        <IconContainer>
          <FiUpload />
        </IconContainer>
        <Label>{template.name}</Label>
      </Container>
    </>
  );
};
export default AddTemplateFileButton;
