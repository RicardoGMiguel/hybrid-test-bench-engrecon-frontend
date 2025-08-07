import keyImage from '@assets/keyImage.png';
import {
  AlertDialog,
  AlertDialogBody,
  AlertDialogCloseButton,
  AlertDialogContent,
  AlertDialogOverlay,
} from '@chakra-ui/react';
import themeDefaults from '@style/themeDefaults';
import React, { useRef } from 'react';
import { Container } from './styles';

type ForgotPasswordMessageProps = {
  isOpen: boolean;
  onClose: () => void;
};

const ForgotPasswordMessage: React.FC<ForgotPasswordMessageProps> = ({
  isOpen,
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
      size="4xl"
    >
      <AlertDialogOverlay />

      <AlertDialogContent style={{ borderRadius: 20 }}>
        <AlertDialogCloseButton
          size="lg"
          style={{
            color: themeDefaults.colors.orange,
          }}
        />
        <AlertDialogBody>
          <Container>
            <img src={keyImage} alt="forgotPassword" />
            <h1>NOVA SENHA</h1>
            <h2>Entre em contato com seu adm para gerar uma nova senha</h2>
            <a href="mailto:contato@exygroup.com">contato@exygroup.com</a>
          </Container>
        </AlertDialogBody>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default ForgotPasswordMessage;
