import styled from 'styled-components';

export const Container = styled.div`
  width: 100%;
  height: 100%;
  padding-top: 2rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  animation: ${({ theme }) => theme.animations.appearFromBottom} 0.6s;
`;

export const FormContainer = styled.form`
  width: 68%;
  height: 100%;
`;

export const Content = styled.div`
  width: 100%;
  height: 90%;
  padding: 1rem;
  border-radius: 20px;
  background-color: ${({ theme }) => theme.colors.exyGray};
`;

export const FooterContainer = styled.div`
  width: 100%;
  height: 10%;
  display: flex;
  align-items: flex-end;
  justify-content: space-between;
`;

export const HeaderContainer = styled.div`
  width: 100%;
  height: 14%;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
`;

export const ListHeader = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

export const ListHeaderItem = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  padding-left: 2rem;
  padding-right: 2rem;

  > p {
    font-size: 1.4rem;
    font-weight: 700;
    color: ${({ theme }) => theme.colors.orange};

    @media (max-width: ${({ theme }) => theme.breakpoints['3xl']}) {
      font-size: 1rem;
    }
  }
`;

export const ActionsContainer = styled.div`
  min-width: 80px;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
`;

export const DeleteButton = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;

  > svg {
    color: ${({ theme }) => theme.colors.exyGray};
    width: 30px;
    height: 30px;

    @media (max-width: ${({ theme }) => theme.breakpoints['3xl']}) {
      width: 20px;
      height: 20px;
    }
  }
`;

export const ListContainer = styled.div`
  width: 100%;
  height: 86%;
  border-radius: 10px;
  background-color: ${({ theme }) => theme.colors.exyGrayListBackground};
  padding-right: 0.2rem;
  overflow-y: auto;

  @media (max-width: ${({ theme }) => theme.breakpoints['3xl']}) {
    border-radius: 7px;
  }

  &::-webkit-scrollbar-track {
    padding: 0 2px;
    margin: 2px 0;
    border-radius: 0px;
    background: ${({ theme }) => theme.colors.exyGrayHover};
  }

  &::-webkit-scrollbar-thumb {
    border-radius: 5px;
    background: ${({ theme }) => theme.colors.white};
  }

  &::-webkit-scrollbar-thumb:hover {
    background: ${({ theme }) => theme.colors.lightGray};
  }

  &::-webkit-scrollbar {
    width: 5px;
  }
`;

export const EmployeeFormContainer = styled.div`
  width: 100%;
  height: 65px;
  padding-top: 2px;
  padding-bottom: 2px;

  @media (max-width: ${({ theme }) => theme.breakpoints['3xl']}) {
    height: 45px;
  }
`;

export const EmployeeForm = styled.div`
  width: 100%;
  height: 100%;
  border-radius: 10px;
  background-color: ${({ theme }) => theme.colors.lightGray};
  display: flex;

  @media (max-width: ${({ theme }) => theme.breakpoints['3xl']}) {
    border-radius: 7px;
  }
`;

export const InputContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 100%;
  padding-left: 2rem;
  padding-right: 2rem;
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
    color: ${({ theme }) => theme.colors.white};
  }
`;
