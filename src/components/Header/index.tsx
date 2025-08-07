import React from 'react';

import { FiLogOut } from 'react-icons/fi';

import { IconButton, useDisclosure } from '@chakra-ui/react';

import { useAuth } from '@modules/auth/hooks/auth';

import Confirmation from '@components/Confirmation';
import { TranslateRolePT } from '@modules/users/utils/translateRoleToPT';
import { navItems } from './configs/navItems';
import DTLogo from './assets/logo_DT.png';
import EngreconLogo from './assets/engrecon_icon_blue.png';

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
            <img src={DTLogo} alt="DTIcon" />
            <img src={EngreconLogo} alt="EngreconLogo" id="engreconLogo" />
            {navItems().map(({ route, label }) => (
              <NavItem key={label} route={route} label={label} />
            ))}
          </NavigationBar>
        </LogoContent>
        <InformationsContent>
          <UserInfo>
            <h1>{user.name}</h1>
            <h2>{TranslateRolePT(user.role)}</h2>
          </UserInfo>

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
