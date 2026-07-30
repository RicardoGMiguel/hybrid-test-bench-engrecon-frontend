import React from 'react';

import { FiLogOut } from 'react-icons/fi';

import { IconButton, useDisclosure } from '@chakra-ui/react';

import { useAuth } from '@modules/auth/hooks/auth';

import Confirmation from '@components/Confirmation';
import { TranslateRolePT } from '@modules/users/utils/translateRoleToPT';
import { useLocation, useMatch } from 'react-router-dom';
import themeDefaults from '@style/themeDefaults';
import { navItems } from './configs/navItems';
import DTLogo from './assets/logo_DT.png';
import GrayDTLogo from './assets/logo_DT_gray.png';
// import EngreconLogo from './assets/engrecon_icon_blue.png';

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

  const { pathname } = useLocation();

  const pathMatch = useMatch(pathname);

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
      <Container
        background={
          pathMatch?.pathnameBase?.split('/')[1] === 'reduced' ||
          pathMatch?.pathnameBase?.split('/')[1] === 'reduced-cycles'
            ? themeDefaults.colors.dt_red
            : themeDefaults.colors.dt_gray
        }
      >
        <LogoContent>
          <NavigationBar>
            <img
              src={
                pathMatch?.pathnameBase?.split('/')[1] === 'reduced' ||
                pathMatch?.pathnameBase?.split('/')[1] === 'reduced-cycles'
                  ? DTLogo
                  : GrayDTLogo
              }
              alt="DTIcon"
              style={{ height: 100 }}
            />
            {/* <img src={EngreconLogo} alt="EngreconLogo" id="engreconLogo" /> */}
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
