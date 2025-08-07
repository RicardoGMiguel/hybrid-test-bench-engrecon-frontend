import React from 'react';
import { ThemeProvider } from 'styled-components';
import { AnimatePresence } from 'framer-motion';

import themeDefaults from '@style/themeDefaults';

import { AuthProvider } from '@modules/auth/hooks/auth';
import { UserProvider } from '@modules/users/hooks/index';
import { CustomerProvider } from '@modules/customers/hooks/index';
import { EmployeeProvider } from '@modules/employees/hooks/index';
import { EquipmentProvider } from '@modules/equipments/hooks/index';
import { ProjectProvider } from '@modules/projects/hooks/projects/index';
import { ProjectEmployeeProvider } from '@modules/projects/hooks/projectEmployees/index';
import { AutoEvaluationProvider } from '@modules/projects/hooks/autoEvaluations/index';
import { KinesisEvaluationProvider } from '@modules/projects/hooks/kinesisEvaluations/index';
import { SensorProvider } from '@modules/projects/hooks/sensors/index';
import { EvaluationsProvider } from '@modules/projects/hooks/evaluations/index';
import { AttendanceListProvider } from '@modules/projects/hooks/attendanceLists/index';
import { MonitoringEvaluationProvider } from '@modules/projects/hooks/monitoringEvaluations/index';
import { ReportsProvider } from '@modules/projects/hooks/reports/index';
import { TemplateProvider } from '@modules/templates/hooks/index';

import { ToastProvider } from './toast';
import { ChakraProvider } from './ChakraProvider';

type AppProviderProps = {
  children: React.ReactNode;
};

/**
 * @description Aqui são importados todos os hooks com contexto do projeto,
 * a estrutura pode ficar um pouco diferente para módulos com mais de um contexto,
 * como é o exemplo do módulo de usuários
 */
const AppProvider: React.FC<AppProviderProps> = ({ children }) => (
  <ThemeProvider theme={themeDefaults}>
    <ChakraProvider>
      <AnimatePresence>
        <ToastProvider>
          <AuthProvider>
            <UserProvider>
              <CustomerProvider>
                <EquipmentProvider>
                  <EmployeeProvider>
                    <ProjectProvider>
                      <ProjectEmployeeProvider>
                        <AutoEvaluationProvider>
                          <KinesisEvaluationProvider>
                            <SensorProvider>
                              <AttendanceListProvider>
                                <EvaluationsProvider>
                                  <MonitoringEvaluationProvider>
                                    <ReportsProvider>
                                      <TemplateProvider>
                                        {children}
                                      </TemplateProvider>
                                    </ReportsProvider>
                                  </MonitoringEvaluationProvider>
                                </EvaluationsProvider>
                              </AttendanceListProvider>
                            </SensorProvider>
                          </KinesisEvaluationProvider>
                        </AutoEvaluationProvider>
                      </ProjectEmployeeProvider>
                    </ProjectProvider>
                  </EmployeeProvider>
                </EquipmentProvider>
              </CustomerProvider>
            </UserProvider>
          </AuthProvider>
        </ToastProvider>
      </AnimatePresence>
    </ChakraProvider>
  </ThemeProvider>
);

export default AppProvider;
