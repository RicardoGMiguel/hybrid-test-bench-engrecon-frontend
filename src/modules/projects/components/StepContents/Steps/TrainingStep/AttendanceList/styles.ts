import styled, { css } from 'styled-components';

export const Container = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

export const Header = styled.div`
  width: 100%;
  height: 15%;
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

export const Title = styled.p`
  font-size: 1.8rem;
  font-weight: 700;
  color: ${({ theme }) => theme.colors.exyGray};

  @media (max-width: ${({ theme }) => theme.breakpoints['3xl']}) {
    font-size: 1.25rem;
  }
`;

export const ButtonsContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;

  @media (max-width: ${({ theme }) => theme.breakpoints['3xl']}) {
    gap: 8.4px;
  }
`;

export const Content = styled.div`
  width: 100%;
  max-height: 85%;
  padding: 0.5rem;
  padding-left: 0;
  display: flex;
  gap: 4%;
  row-gap: 0;
  flex-wrap: wrap;
  overflow-y: auto;

  &::-webkit-scrollbar-track {
    padding: 0 2px;
    margin: 2px 0;
    border-radius: 0px;
    background: ${({ theme }) => theme.colors.white};
  }

  &::-webkit-scrollbar-thumb {
    border-radius: 5px;
    background: ${({ theme }) => theme.colors.exyGray};
  }

  &::-webkit-scrollbar-thumb:hover {
    background: ${({ theme }) => theme.colors.black};
  }

  &::-webkit-scrollbar {
    width: 5px;
  }
`;

export const EmployeeItem = styled.div`
  width: 30%;
  height: 50px;
  border-bottom: 2px solid ${({ theme }) => theme.colors.exyGray};
  padding: 0.5rem;
  display: flex;
  align-items: center;
  justify-content: space-between;

  @media (max-width: ${({ theme }) => theme.breakpoints['3xl']}) {
    height: 35px;
    padding: 0.35rem;
    border-bottom: 1.4px solid ${({ theme }) => theme.colors.exyGray};
  }

  > p {
    font-size: 1.2rem;
    font-weight: 400;
    color: ${({ theme }) => theme.colors.exyGray};
    width: 100%;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    padding-right: 0.5rem;

    @media (max-width: ${({ theme }) => theme.breakpoints['3xl']}) {
      font-size: 0.8rem;
    }
  }
`;

export const AttendanceButton = styled.div<{
  isEditing: boolean;
  isSelected?: boolean | null;
}>`
  width: 16px;
  height: 16px;
  border-radius: 8px;
  border: 1px solid ${({ theme }) => theme.colors.exyGray};
  background-color: ${({ theme }) => theme.colors.white};

  @media (max-width: ${({ theme }) => theme.breakpoints['3xl']}) {
    width: 11px;
    height: 11px;
    border-radius: 6px;
  }

  ${({ isEditing }) =>
    isEditing &&
    css`
      width: 17px;
      height: 17px;
      border-radius: 9px;
      border: 3px solid ${({ theme }) => theme.colors.exyGray};
      cursor: pointer;

      @media (max-width: ${({ theme }) => theme.breakpoints['3xl']}) {
        width: 12px;
        height: 12px;
        border-radius: 6px;
        border: 1.4px solid ${({ theme }) => theme.colors.exyGray};
      }
    `}

  ${({ isSelected }) =>
    isSelected &&
    css`
      background-color: ${({ theme }) => theme.colors.greenButtonColor};
    `}

  &:hover {
    filter: ${({ theme }) => theme.filters.hover};
  }
`;

export const IconButton = styled.div`
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;

  &:hover {
    filter: ${({ theme }) => theme.filters.hover};
  }

  > svg {
    color: ${({ theme }) => theme.colors.exyGray};
    width: 26px;
    height: 26px;

    @media (max-width: ${({ theme }) => theme.breakpoints['3xl']}) {
      width: 18px;
      height: 18px;
    }
  }
`;

export const CustomEmptyListMessage = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;

  > P {
    font-size: 1.2rem;
    font-weight: 600;
    color: ${({ theme }) => theme.colors.exyGray};

    @media (max-width: ${({ theme }) => theme.breakpoints['3xl']}) {
      font-size: 0.8rem;
    }
  }
`;
