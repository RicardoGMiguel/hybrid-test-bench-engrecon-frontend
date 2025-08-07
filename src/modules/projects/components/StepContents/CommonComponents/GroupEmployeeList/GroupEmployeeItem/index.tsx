import { useAuth } from '@modules/auth/hooks/auth/index';
import { UserRolesEnum } from '@modules/users/types/UserRolesEnum';
import React, { useMemo, useState } from 'react';
import { FiEdit, FiEye, FiEyeOff } from 'react-icons/fi';
import {
  AnswerButton,
  ButtonsContainer,
  Container,
  IconButton,
  NameText,
} from './styles';

interface GroupEmployeeItemProps {
  name: string;
  hiddenName: string;
  showHideNameButton: boolean;
  showAnswerButton: boolean;
  onClickAnswerButton?: () => void;
  showEditButton: boolean;
  onClickEditButton?: () => void;
}

const GroupEmployeeItem: React.FC<GroupEmployeeItemProps> = ({
  name,
  hiddenName,
  showHideNameButton,
  showAnswerButton,
  onClickAnswerButton,
  showEditButton,
  onClickEditButton,
}) => {
  const { user } = useAuth();
  const [showName, setShowName] = useState(false);

  const visibilityButtons = useMemo(() => {
    if (showHideNameButton && user.role !== UserRolesEnum.VIEWER) {
      return (
        <IconButton onClick={() => setShowName(!showName)}>
          {showName ? <FiEyeOff /> : <FiEye />}
        </IconButton>
      );
    }
    return undefined;
  }, [showHideNameButton, showName, user.role]);

  return (
    <Container>
      {showName ? (
        <NameText>{name}</NameText>
      ) : (
        <NameText>{hiddenName}</NameText>
      )}
      <ButtonsContainer>
        {visibilityButtons}
        {onClickAnswerButton && (
          <AnswerButton
            type="button"
            onClick={() => {
              if (showAnswerButton && onClickAnswerButton)
                onClickAnswerButton();
            }}
            disabled={!showAnswerButton}
          >
            Responder
          </AnswerButton>
        )}
        {onClickEditButton && (
          <IconButton
            onClick={() => {
              if (showEditButton && onClickEditButton) onClickEditButton();
            }}
            disabled={!showEditButton}
          >
            <FiEdit />
          </IconButton>
        )}
      </ButtonsContainer>
    </Container>
  );
};

export default GroupEmployeeItem;
