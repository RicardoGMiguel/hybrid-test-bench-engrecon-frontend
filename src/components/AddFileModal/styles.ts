import styled, { css } from 'styled-components';

export const CurrentFileContainer = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  gap: 10px;
`;

export const CurrentFileButton = styled.div<{ disabled?: boolean }>`
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;

  > svg {
    color: ${({ theme }) => theme.colors.exyGray};
  }

  :hover {
    > svg {
      color: ${({ theme }) => theme.colors.exyGrayHover};
    }
  }

  ${({ disabled }) =>
    disabled &&
    css`
      cursor: not-allowed;
      > svg {
        color: ${({ theme }) => theme.colors.mediumGray};
      }

      &:hover {
        > svg {
          color: ${({ theme }) => theme.colors.mediumGray};
        }
      }
    `}
`;

export const FileInputContainer = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

export const FileInput = styled.div<{ disabled?: boolean }>`
  width: 800px;
  height: 50px;
  background-color: ${({ theme }) => theme.colors.exyGray};
  color: ${({ theme }) => theme.colors.white};
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 1rem;
  border-radius: 8px;
  cursor: pointer;

  :hover {
    background-color: ${({ theme }) => theme.colors.exyGrayHover};
  }

  > p {
    font-size: 1.2rem;
    font-weight: 600;
    color: ${({ theme }) => theme.colors.white};
  }

  > svg {
    color: ${({ theme }) => theme.colors.white};
  }

  ${({ disabled }) =>
    disabled &&
    css`
      cursor: not-allowed;
      background-color: ${({ theme }) => theme.colors.mediumGray};

      :hover {
        background-color: ${({ theme }) => theme.colors.mediumGray};
      }
    `}
`;

export const FileName = styled.p`
  width: 100%;
  font-size: 1.2rem;
  font-weight: 600;
  color: ${({ theme }) => theme.colors.exyGray};
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  margin-left: 10px;
`;

export const ButtonsContainer = styled.div`
  width: 400px;
  display: flex;
  align-items: center;
  justify-content: space-evenly;
`;

export const CancelButton = styled.div`
  width: 10rem;
  height: 3.2rem;
  box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
  background-color: ${({ theme }) => theme.colors.exyGray};
  border-radius: 12px;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 10px;
  cursor: pointer;

  :hover {
    background-color: ${({ theme }) => theme.colors.exyGrayHover};
  }

  > p {
    font-size: 1.1rem;
    font-weight: 700;
    color: ${({ theme }) => theme.colors.white};
  }

  > svg {
    color: ${({ theme }) => theme.colors.white};
  }
`;

export const SaveButton = styled.div<{ disable?: boolean }>`
  width: 10rem;
  height: 3.2rem;
  box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
  background-color: ${({ theme }) => theme.colors.white};
  border-radius: 12px;
  border: 2px solid ${({ theme }) => theme.colors.exyGray};
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 10px;
  cursor: pointer;

  :hover {
    background-color: ${({ theme }) => theme.colors.lightGray};
  }

  > p {
    font-size: 1.1rem;
    font-weight: 700;
    color: ${({ theme }) => theme.colors.exyGray};
  }

  > svg {
    color: ${({ theme }) => theme.colors.exyGray};
  }

  ${({ disable }) =>
    disable &&
    css`
      background-color: ${({ theme }) => theme.colors.lightGray};
      border: 2px solid ${({ theme }) => theme.colors.mediumGray};
      cursor: not-allowed;

      > p {
        color: ${({ theme }) => theme.colors.mediumGray};
      }

      > svg {
        color: ${({ theme }) => theme.colors.mediumGray};
      }
    `}
`;

export const FileTemplateContainer = styled.div`
  display: flex;
  align-items: center;
`;
