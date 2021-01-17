import React, { useState } from 'react';
import {
  Container,
  makeStyles
} from '@material-ui/core';
import Page from '../../../component/Page';
import { useTranslation} from 'react-i18next';

const useStyles = makeStyles((theme) => ({
  root: {
    backgroundColor: theme.palette.background.default,
    minHeight: '100%',
    paddingBottom: theme.spacing(3),
    paddingTop: theme.spacing(3)
  },
  productCard: {
    height: '100%'
  }
}));

const FinanceList = () => {
  const classes = useStyles();
  const {t} = useTranslation();
  return (
    <Page
      className={classes.root}
      title={t('nav_finance')}
    >
      <Container maxWidth={false}>
        {t("nav_finance")}
      </Container>
    </Page>
  );
};

export default FinanceList;
