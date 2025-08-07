import React, { useCallback, useRef, useState } from 'react';
import { FiSave, FiX, FiTrash2, FiUpload, FiDownload } from 'react-icons/fi';
import Confirmation from '@components/Confirmation';
import {
  useDisclosure,
  AlertDialog,
  AlertDialogContent,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogOverlay,
} from '@chakra-ui/react';
import { useToast } from '@hooks/toast/index';
import {
  CurrentFileContainer,
  CurrentFileButton,
  FileInputContainer,
  FileInput,
  FileName,
  ButtonsContainer,
  SaveButton,
  CancelButton,
  FileTemplateContainer,
} from './styles';

type AddFileModalProps = {
  isOpen: boolean;
  title: string;
  currentFileName?: string;
  currentFileUrl?: string;
  onDelete?: () => void;
  onConfirm: (file: File) => void;
  onClose: () => void;
  availableFileTypes: string[];
  disabled?: boolean;
  templateFileUrl?: string;
};

const AddFileModal: React.FC<AddFileModalProps> = ({
  isOpen,
  title,
  currentFileName,
  currentFileUrl,
  onDelete,
  onConfirm,
  onClose,
  availableFileTypes,
  disabled,
  templateFileUrl,
}) => {
  const { addToast } = useToast();
  const {
    isOpen: isOpenConfirmation,
    onOpen: onOpenConfirmation,
    onClose: onCloseConfirmation,
  } = useDisclosure();

  const fileInputRef = useRef<HTMLInputElement>(null);
  const cancelRef = useRef<any>(null);

  const [fileToSend, setFileToSend] = useState<File>({} as File);

  const onFileChange = useCallback(
    async (event: React.ChangeEvent<HTMLInputElement>): Promise<void> => {
      if (event.target.files !== null) {
        if (availableFileTypes.indexOf(event.target.files[0]?.type) !== -1) {
          setFileToSend(event.target.files[0]);
        } else {
          addToast({
            type: 'error',
            title: 'Erro no upload do arquivo',
            description: 'Verifique o formato do arquivo escolhido',
          });
        }
      }
    },
    [addToast, availableFileTypes]
  );

  return (
    <>
      {onDelete && (
        <Confirmation
          isOpen={isOpenConfirmation}
          title="Você tem certeza?"
          ConfirmationIcon={FiTrash2}
          confirmButtonLabel="EXCLUIR"
          onConfirm={() => {
            onDelete();
            onCloseConfirmation();
          }}
          onClose={onCloseConfirmation}
        />
      )}
      <AlertDialog
        isOpen={isOpen}
        leastDestructiveRef={cancelRef}
        onClose={onClose}
        isCentered
        motionPreset="slideInBottom"
      >
        <AlertDialogOverlay>
          <AlertDialogContent
            minWidth={820}
            minHeight={350}
            paddingTop={10}
            paddingBottom={10}
            paddingRight={20}
            paddingLeft={20}
            alignItems="center"
            justifyContent="space-between"
          >
            <AlertDialogHeader
              fontSize={30}
              width="100%"
              alignSelf="flex-start"
              padding={0}
              display="flex"
              justifyContent="space-between"
            >
              {title}
              {templateFileUrl && (
                <FileTemplateContainer>
                  <CurrentFileButton
                    onClick={() => {
                      window.open(templateFileUrl);
                    }}
                  >
                    <FiDownload size={30} />
                  </CurrentFileButton>
                  <FileName>Baixar template</FileName>
                </FileTemplateContainer>
              )}
            </AlertDialogHeader>
            {currentFileName && (
              <CurrentFileContainer>
                <CurrentFileButton
                  onClick={() => {
                    window.open(currentFileUrl);
                  }}
                >
                  <FiDownload size={30} />
                </CurrentFileButton>
                {onDelete && (
                  <CurrentFileButton
                    disabled={disabled}
                    onClick={() => {
                      if (!disabled) onOpenConfirmation();
                    }}
                  >
                    <FiTrash2 size={30} />
                  </CurrentFileButton>
                )}
                <FileName>{currentFileName}</FileName>
              </CurrentFileContainer>
            )}

            <FileInputContainer>
              <FileInput
                disabled={disabled}
                onClick={() => {
                  if (!disabled) fileInputRef.current?.click();
                }}
              >
                <p> Pesquisar arquivo no computador</p>
                <FiUpload size={25} />
                <input
                  id="input-file"
                  multiple={false}
                  type="file"
                  ref={fileInputRef}
                  onChange={onFileChange}
                  hidden
                />
              </FileInput>
              <FileName>
                {fileToSend.name || 'Nenhum arquivo selecionado'}
              </FileName>
            </FileInputContainer>

            <AlertDialogFooter>
              <ButtonsContainer>
                <SaveButton
                  disable={!fileToSend.name}
                  onClick={() => {
                    if (fileToSend.name) {
                      onConfirm(fileToSend);
                      setFileToSend({} as File);
                    }
                  }}
                >
                  <FiSave size={25} />
                  <p>SALVAR</p>
                </SaveButton>
                <CancelButton
                  onClick={() => {
                    setFileToSend({} as File);
                    onClose();
                  }}
                >
                  <FiX size={25} />
                  <p>CANCELAR</p>
                </CancelButton>
              </ButtonsContainer>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialogOverlay>
      </AlertDialog>
    </>
  );
};

export default AddFileModal;
