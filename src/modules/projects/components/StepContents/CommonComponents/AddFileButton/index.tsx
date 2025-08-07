import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { FiUpload } from 'react-icons/fi';
import { useDisclosure } from '@chakra-ui/react';
import AddFileModal from '@components/AddFileModal';
import { IShowProject } from '@modules/projects/interfaces/IProject';
import { useProject } from '@modules/projects/hooks/projects/index';
import { ScreenNameEnum } from '@modules/templates/types/ScreenNameEnum';
import { useTemplate } from '@modules/templates/hooks/index';
import { Container, IconContainer, Label } from './styles';
import { FileToSendTypeEnum } from '../../types/FileToSendTypeEnum';

interface AddFileButtonProps {
  label: string;
  project: IShowProject;
  fileType: FileToSendTypeEnum;
  readOnly: boolean;
}

const AddFileButton: React.FC<AddFileButtonProps> = ({
  label,
  fileType,
  project,
  readOnly,
}) => {
  const {
    isOpen: isOpenModal,
    onOpen: onOpenModal,
    onClose: onCloseModal,
  } = useDisclosure();

  const {
    SendROISpreadsheet,
    DeleteROISpreadsheet,
    SendErgonomicAep,
    DeleteErgonomicAep,
    SendErgonomicAet,
    DeleteErgonomicAet,
    SendElectromyography,
    DeleteElectromyography,
  } = useProject();

  const { ShowTemplateByScreen } = useTemplate();

  const [screenName, setScreenName] = useState<ScreenNameEnum>();

  const { data: templateData } = ShowTemplateByScreen(screenName);

  const titleToRender = useMemo(() => {
    switch (fileType) {
      case FileToSendTypeEnum.ROI:
        return 'Planilha ROI';
      case FileToSendTypeEnum.ERGONOMIC_AEP:
        return 'Avaliação Ergonômica Preliminar';
      case FileToSendTypeEnum.ERGONOMIC_AET:
        return 'Avaliação Ergonômica do Trabalho';
      case FileToSendTypeEnum.ELECTROMYOGRAPHY:
        return 'Eletromiografia';
      default:
        return '';
    }
  }, [fileType]);

  const currentFileName = useMemo(() => {
    let fullname = '';
    switch (fileType) {
      case FileToSendTypeEnum.ROI:
        fullname = project.roi_spreadsheet || '';
        break;
      case FileToSendTypeEnum.ERGONOMIC_AEP:
        fullname = project.ergonomic_evaluation_aep || '';
        break;
      case FileToSendTypeEnum.ERGONOMIC_AET:
        fullname = project.ergonomic_evaluation_aet || '';
        break;
      case FileToSendTypeEnum.ELECTROMYOGRAPHY:
        fullname = project.electromyography || '';
        break;
      default:
        return '';
    }

    const splittedName = fullname.split('-');
    const nameArray = splittedName.splice(-1, 1);
    const name = nameArray.join();

    return name;
  }, [fileType, project]);

  const currentFileUrl = useMemo(() => {
    switch (fileType) {
      case FileToSendTypeEnum.ROI:
        return project.roi_spreadsheet_url || '';
      case FileToSendTypeEnum.ERGONOMIC_AEP:
        return project.ergonomic_evaluation_aep_url || '';
      case FileToSendTypeEnum.ERGONOMIC_AET:
        return project.ergonomic_evaluation_aet_url || '';
      case FileToSendTypeEnum.ELECTROMYOGRAPHY:
        return project.electromyography_url || '';
      default:
        return '';
    }
  }, [fileType, project]);

  const sendFile = useCallback(
    (fileToSend: File) => {
      switch (fileType) {
        case FileToSendTypeEnum.ROI:
          SendROISpreadsheet({ projectId: project.id, fileToSend });
          break;
        case FileToSendTypeEnum.ERGONOMIC_AEP:
          SendErgonomicAep({ projectId: project.id, fileToSend });
          break;
        case FileToSendTypeEnum.ERGONOMIC_AET:
          SendErgonomicAet({ projectId: project.id, fileToSend });
          break;
        case FileToSendTypeEnum.ELECTROMYOGRAPHY:
          SendElectromyography({ projectId: project.id, fileToSend });
          break;
        default:
      }
    },
    [
      SendElectromyography,
      SendErgonomicAep,
      SendErgonomicAet,
      SendROISpreadsheet,
      fileType,
      project.id,
    ]
  );

  const deleteFile = useCallback(() => {
    switch (fileType) {
      case FileToSendTypeEnum.ROI:
        DeleteROISpreadsheet(project.id);
        break;
      case FileToSendTypeEnum.ERGONOMIC_AEP:
        DeleteErgonomicAep(project.id);
        break;
      case FileToSendTypeEnum.ERGONOMIC_AET:
        DeleteErgonomicAet(project.id);
        break;
      case FileToSendTypeEnum.ELECTROMYOGRAPHY:
        DeleteElectromyography(project.id);
        break;
      default:
    }
  }, [
    DeleteElectromyography,
    DeleteErgonomicAep,
    DeleteErgonomicAet,
    DeleteROISpreadsheet,
    fileType,
    project.id,
  ]);

  useEffect(() => {
    switch (fileType) {
      case FileToSendTypeEnum.ROI:
        setScreenName(ScreenNameEnum.ROI_SPREADSHEET);
        break;
      case FileToSendTypeEnum.ERGONOMIC_AEP:
        setScreenName(ScreenNameEnum.ERGONOMIC_EVALUATION_AEP);
        break;
      case FileToSendTypeEnum.ERGONOMIC_AET:
        setScreenName(ScreenNameEnum.ERGONOMIC_EVALUATION_AET);
        break;
      case FileToSendTypeEnum.ELECTROMYOGRAPHY:
        setScreenName(ScreenNameEnum.ELECTROMYOGRAPHY);
        break;
      default:
    }
  }, [fileType]);

  return (
    <>
      <AddFileModal
        disabled={readOnly}
        isOpen={isOpenModal}
        title={titleToRender}
        currentFileName={currentFileName}
        currentFileUrl={currentFileUrl}
        onDelete={() => {
          deleteFile();
          onCloseModal();
        }}
        onConfirm={(file) => {
          sendFile(file);
          onCloseModal();
        }}
        onClose={onCloseModal}
        availableFileTypes={[
          'application/pdf',
          'application/vnd.ms-excel',
          'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
        ]}
        templateFileUrl={templateData?.file_template_url || ''}
      />
      <Container onClick={onOpenModal}>
        <IconContainer>
          <FiUpload size={20} />
        </IconContainer>
        <Label>{label}</Label>
      </Container>
    </>
  );
};

export default AddFileButton;
