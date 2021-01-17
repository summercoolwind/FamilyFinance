import React from 'react';
import {
  Container,
  Grid,
  makeStyles
} from '@material-ui/core';
import Page from '../../../component/Page';
import ProfileDetails from './ProfileDetails';
import { useTranslation} from 'react-i18next';

const useStyles = makeStyles((theme) => ({
  root: {
    backgroundColor: theme.palette.background.default,
    minHeight: '100%',
    paddingBottom: theme.spacing(3),
    paddingTop: theme.spacing(3)
  }
}));

const Account = () => {
  const classes = useStyles();
  const {t} = useTranslation();
  return (
    <Page
      className={classes.root}
      title={t('nav_account')}
    >
      <Container maxWidth="lg">
        <Grid
          container
          spacing={3}
        >
          <Grid
            item
            lg={8}
            md={6}
            xs={12}
          >
            <ProfileDetails className=""/>
          </Grid>
        </Grid>
      </Container>
    </Page>
  );
};

export default Account;
