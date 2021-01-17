import React, { useState } from 'react';
import { Link as RouterLink ,useNavigate} from 'react-router-dom';
import clsx from 'clsx';
import PropTypes from 'prop-types';
import {
  AppBar,
  Badge,
  Box,
  Hidden,
  IconButton,
  Toolbar,
  makeStyles
} from '@material-ui/core';
import MenuIcon from '@material-ui/icons/Menu';
import InputIcon from '@material-ui/icons/Input';

const useStyles = makeStyles(() => ({
  root: {},
  avatar: {
    width: 60,
    height: 60
  }
}));

const TopBar = ({
  className,
  onMobileNavOpen,
  ...rest
}) => {
  const classes = useStyles();
  const [notifications] = useState([]);
  const navigate = useNavigate();

  return (
    <AppBar
      className={clsx(classes.root, className)}
      elevation={0}
      {...rest}
    >
      <Toolbar>
        <RouterLink to="/">
        </RouterLink>
        <Box flexGrow={1} />
        <Hidden mdDown>
          {getNotification(notifications)}
          <IconButton color="inherit"
          onClick={()=>{
            navigate('/', { replace: true });
          }}>
            <InputIcon />
          </IconButton>
        </Hidden>
        <Hidden lgUp>
          <IconButton
            color="inherit"
            onClick={onMobileNavOpen}
          >
            <MenuIcon />
          </IconButton>
        </Hidden>
      </Toolbar>
    </AppBar>
  );
};

const getNotification = (notifications) =>{
  return null;
        // return (<IconButton color="inherit">
        //     <Badge
        //       badgeContent={notifications.length}
        //       color="primary"
        //       variant="dot"
        //     >
        //       <NotificationsIcon />
        //     </Badge>
        //   </IconButton>);
};


TopBar.propTypes = {
  className: PropTypes.string,
  onMobileNavOpen: PropTypes.func
};

export default TopBar;
