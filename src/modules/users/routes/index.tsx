import { Route } from 'react-router-dom';

import { PrivatePathsEnum } from '@routes/privateRoutes/privatePaths';
import UsersLayout from '../layout';
import Users from '../pages/Users';
import CreateUsers from '../pages/CreateUsers';
import EditUser from '../pages/EditUser';

const UsersRoutes = (
  <Route element={<UsersLayout />}>
    <Route path={PrivatePathsEnum.USERS} element={<Users />} />
    <Route path={PrivatePathsEnum.CREATE_USERS} element={<CreateUsers />} />
    <Route path={PrivatePathsEnum.UPDATE_USER} element={<EditUser />} />
  </Route>
);

export default UsersRoutes;
