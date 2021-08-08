import React from 'react';
import { Navigate } from 'react-router-dom';
import DashboardLayout from './layouts/DashboardLayout';
import MainLayout from './layouts/MainLayout';
import AccountView from './views/account/index';
import PayListView from './views/pay/index';
import DashboardView from './views/reports/index';
import LoginView from './views/auth/LoginView';
import NotFoundView from './views/errors/NotFoundView';
import IncomeListView from './views/income/index';
import FinanceListView from './views/finance/index';
import RegisterView from './views/auth/RegisterView';
import SettingsView from './views/settings/index';

const routes = [
  {
    path: 'app',
    element: <DashboardLayout />,
    children: [
      { path: 'account', element: <AccountView /> },
      { path: 'pay', element: <PayListView /> },
      { path: 'dashboard', element: <DashboardView /> },
      { path: 'income', element: <IncomeListView /> },
      { path: 'finance', element: <FinanceListView /> },
      { path: 'settings', element: <SettingsView /> },
      { path: '*', element: <Navigate to="/404" /> }
    ]
  },
  {
    path: '/',
    element: <MainLayout />,
    children: [
      { path: 'login', element: <LoginView /> },
      { path: 'register', element: <RegisterView /> },
      { path: '404', element: <NotFoundView /> },
      { path: '/', element: <Navigate to="/login" /> },
      { path: '*', element: <Navigate to="/404" /> }
    ]
  }
];

export default routes;
