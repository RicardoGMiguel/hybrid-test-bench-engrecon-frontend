import {
  AlertDialog,
  AlertDialogContent,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogOverlay,
} from '@chakra-ui/react';
import React, { useRef } from 'react';
import { IconType } from 'react-icons';
import { FiX } from 'react-icons/fi';
import { CancelButton, ConfirmationButton, Container } from './styles';

type ConfirmationProps = {
  isOpen: boolean;
  title: string;
  confirmButtonLabel: string;
  ConfirmationIcon: IconType;
  onConfirm: () => void;
  onClose: () => void;
};

const Confirmation: React.FC<ConfirmationProps> = ({
  isOpen,
  title,
  ConfirmationIcon,
  confirmButtonLabel,
  onConfirm,
  onClose,
}) => {
  const cancelRef = useRef<any>(null);

  return (
    <AlertDialog
      isOpen={isOpen}
      leastDestructiveRef={cancelRef}
      onClose={onClose}
      isCentered
      motionPreset="slideInBottom"
    >
      <AlertDialogOverlay>
        <AlertDialogContent
          paddingTop={5}
          paddingBottom={5}
          paddingRight={5}
          paddingLeft={5}
        >
          <AlertDialogHeader
            fontSize={24}
            fontWeight="bold"
            alignSelf="center"
            textAlign="center"
          >
            {title}
          </AlertDialogHeader>

          <AlertDialogFooter>
            <Container>
              <ConfirmationButton onClick={onConfirm}>
                <ConfirmationIcon />
                <p>{confirmButtonLabel}</p>
              </ConfirmationButton>
              <CancelButton onClick={onClose}>
                <FiX />
                <p>CANCELAR</p>
              </CancelButton>
            </Container>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialogOverlay>
    </AlertDialog>
  );
};

export default Confirmation;
