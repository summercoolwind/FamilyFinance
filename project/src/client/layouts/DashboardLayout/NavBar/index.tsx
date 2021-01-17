import React, { useEffect } from 'react';
import { Link as RouterLink, useLocation } from 'react-router-dom';
import PropTypes from 'prop-types';
import {
  Avatar,
  Box,
  Button,
  Divider,
  Drawer,
  Hidden,
  List,
  Typography,
  makeStyles
} from '@material-ui/core';
import {
  AlertCircle as AlertCircleIcon,
  BarChart as BarChartIcon,
  Lock as LockIcon,
  Settings as SettingsIcon,
  Inbox as IncomeIcon,
  ShoppingBag as ShoppingBagIcon,
  DollarSign as FinanceIcon,
  User as UserIcon,
  UserPlus as UserPlusIcon,
  UserCheck as UserCheckIcon,
  Users as UsersIcon
} from 'react-feather';
import { useTranslation} from 'react-i18next';
import NavItem from './NavItem';

const items = [
  {
    href: '/app/dashboard',
    icon: BarChartIcon,
    title: 'nav_dashboard'
  },
  {
    href: '/app/pay',
    icon: ShoppingBagIcon,
    title: 'nav_pay'
  },
  {
    href: '/app/income',
    icon: IncomeIcon,
    title: 'nav_income'
  },
  {
    href: '/app/finance',
    icon: FinanceIcon,
    title: 'nav_finance'
  },
  {
    href: '/app/account',
    icon: UserIcon,
    title: 'nav_account'
  },
  {
    href: '/app/settings',
    icon: SettingsIcon,
    title: 'nav_setting'
  },
  {
    href: '/login',
    icon: LockIcon,
    title: 'nav_login'
  },
  {
    href: '/register',
    icon: UserPlusIcon,
    title: 'nav_register'
  }
];

const useStyles = makeStyles(() => ({
  mobileDrawer: {
    width: 256
  },
  desktopDrawer: {
    width: 256,
    top: 64,
    height: 'calc(100% - 64px)'
  },
  avatar: {
    cursor: 'pointer',
    width: 64,
    height: 64
  }
}));

const NavBar = ({ onMobileClose, openMobile }) => {
  const classes = useStyles();
  const location = useLocation();

  useEffect(() => {
    if (openMobile && onMobileClose) {
      onMobileClose();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [location.pathname]);
  const {t} = useTranslation();

  const content = (
    <Box
      height="100%"
      display="flex"
      flexDirection="column"
    >
      <Box p={2}>
        <List>
          {items.map((item) => (
            <NavItem
              className=""
              href={item.href}
              key={item.title}
              title={t(item.title)}
              icon={item.icon}
            />
          ))}
        </List>
      </Box>
      <Box flexGrow={1} />
      <Box
        p={2}
        m={2}
        bgcolor="background.dark"
      >
      </Box>
    </Box>
  );

  return (
    <>
      <Hidden lgUp>
        <Drawer
          anchor="left"
          classes={{ paper: classes.mobileDrawer }}
          onClose={onMobileClose}
          open={openMobile}
          variant="temporary"
        >
          {content}
        </Drawer>
      </Hidden>
      <Hidden mdDown>
        <Drawer
          anchor="left"
          classes={{ paper: classes.desktopDrawer }}
          open
          variant="persistent"
        >
          {content}
        </Drawer>
      </Hidden>
    </>
  );
};

NavBar.propTypes = {
  onMobileClose: PropTypes.func,
  openMobile: PropTypes.bool
};

NavBar.defaultProps = {
  onMobileClose: () => {},
  openMobile: false
};

export default NavBar;
