import styled from 'styled-components';

export const Container = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

export const ProjectEmployeeHeader = styled.div`
  width: 100%;
  height: 15%;
  display: flex;
  align-items: center;
  gap: 20px;
`;

export const ProjectsEmployeeTitle = styled.p`
  font-size: 1.8rem;
  font-weight: 700;
  color: ${({ theme }) => theme.colors.exyGray};

  @media (max-width: ${({ theme }) => theme.breakpoints['3xl']}) {
    font-size: 1.2rem;
  }
`;

export const AddProjectEmpoloyeeButton = styled.button`
  width: 100px;
  height: 25px;
  font-size: 1rem;
  border-radius: 11px;
  background-color: ${({ theme }) => theme.colors.white};
  border: 2.5px solid ${({ theme }) => theme.colors.exyGray};
  color: ${({ theme }) => theme.colors.exyGray};
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: 0px 5px 5px rgba(0, 0, 0, 0.25);

  @media (max-width: ${({ theme }) => theme.breakpoints['3xl']}) {
    width: 70px;
    height: 17px;
    border: 1.8px solid ${({ theme }) => theme.colors.exyGray};
    font-size: 0.7rem;
  }

  &:hover {
    filter: ${({ theme }) => theme.filters.hover};
  }
`;

export const ProjectEmployeesContent = styled.div`
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
  width: 48%;
  height: 50px;
  border-bottom: 2px solid ${({ theme }) => theme.colors.exyGreen};
  padding: 0.5rem;
  display: flex;
  align-items: center;
  justify-content: space-between;

  @media (max-width: ${({ theme }) => theme.breakpoints['3xl']}) {
    height: 35px;
    border-bottom: 1.4px solid ${({ theme }) => theme.colors.exyGreen};
  }

  > p {
    font-size: 1.2rem;
    font-weight: 400;
    color: ${({ theme }) => theme.colors.exyGray};

    @media (max-width: ${({ theme }) => theme.breakpoints['3xl']}) {
      font-size: 1rem;
    }
  }
`;

export const DeleteButton = styled.div`
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;

  > svg {
    color: ${({ theme }) => theme.colors.exyGray};
    width: 25px;
    height: 25px;

    @media (max-width: ${({ theme }) => theme.breakpoints['3xl']}) {
      width: 17px;
      height: 17px;
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
  }
`;
