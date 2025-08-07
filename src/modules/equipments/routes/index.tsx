import { Route } from 'react-router-dom';

import { PrivatePathsEnum } from '@routes/privateRoutes/privatePaths';
import EnsureIsNotFirstLoginRoute from '@routes/privateRoutes/EnsureIsNotFirstLoginRoute';
import EquipmentsLayout from '../layout';
import Equipments from '../pages/Equipments';
import CreateEquipments from '../pages/CreateEquipments';
import EditEquipment from '../pages/EditEquipment';

const EquipmentsRoutes = (
  <Route element={<EquipmentsLayout />}>
    <Route
      path={PrivatePathsEnum.EQUIPMENTS}
      element={
        <EnsureIsNotFirstLoginRoute
          redirectTo={PrivatePathsEnum.PASSWORD_FIRST_LOGIN}
        >
          <Equipments />
        </EnsureIsNotFirstLoginRoute>
      }
    />
    <Route
      path={PrivatePathsEnum.CREATE_EQUIPMENTS}
      element={
        <EnsureIsNotFirstLoginRoute
          redirectTo={PrivatePathsEnum.PASSWORD_FIRST_LOGIN}
        >
          <CreateEquipments />
        </EnsureIsNotFirstLoginRoute>
      }
    />

    <Route
      path={PrivatePathsEnum.UPDATE_EQUIPMENT}
      element={
        <EnsureIsNotFirstLoginRoute
          redirectTo={PrivatePathsEnum.PASSWORD_FIRST_LOGIN}
        >
          <EditEquipment />
        </EnsureIsNotFirstLoginRoute>
      }
    />
  </Route>
);

export default EquipmentsRoutes;
