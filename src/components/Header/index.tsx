import React from 'react';

import { FiLogOut } from 'react-icons/fi';
import { PiKeyBold } from 'react-icons/pi';
import { useNavigate } from 'react-router-dom';

import { IconButton, useDisclosure } from '@chakra-ui/react';

import { useAuth } from '@modules/auth/hooks/auth';

import Confirmation from '@components/Confirmation';
import { PrivatePathsEnum } from '@routes/privateRoutes/privatePaths';
import { TranslateRolePT } from '@modules/users/utils/translateRoleToPT';
import { UserRolesEnum } from '@modules/users/types/UserRolesEnum';
import { navItems } from './configs/navItems';
import ExyLogo from './assets/ExyLogo.png';

import {
  Container,
  LogoContent,
  InformationsContent,
  UserInfo,
  NavigationBar,
} from './styles';
import NavItem from './NavItem';

const Header: React.FC = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { user, signOut } = useAuth();

  const Navigate = useNavigate();

  return (
    <>
      <Confirmation
        isOpen={isOpen}
        title="Você tem certeza?"
        ConfirmationIcon={FiLogOut}
        confirmButtonLabel="SAIR"
        onConfirm={signOut}
        onClose={onClose}
      />
      <Container>
        <LogoContent>
          <NavigationBar>
            <img src={ExyLogo} alt="IconExy" />
            {navItems(user.role).map(({ route, label }) => (
              <NavItem key={label} route={route} label={label} />
            ))}
          </NavigationBar>
        </LogoContent>
        <InformationsContent>
          <UserInfo>
            <h1>{user.name}</h1>
            <h2>{TranslateRolePT(user.role)}</h2>
          </UserInfo>

          {user.role !== UserRolesEnum.GLOBAL_ADMIN && (
            <IconButton
              marginRight={8}
              icon={<PiKeyBold />}
              colorScheme="white"
              aria-label="Alterar senha"
              fontSize="40px"
              onClick={() => Navigate(PrivatePathsEnum.CHANGE_PASSWORD)}
            />
          )}

          <IconButton
            icon={<FiLogOut />}
            colorScheme="white"
            aria-label="Sair"
            fontSize="40px"
            onClick={onOpen}
          />
        </InformationsContent>
      </Container>
    </>
  );
};

export default Header;
