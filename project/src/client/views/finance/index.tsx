import React, { useState } from 'react';
import { Container, makeStyles } from '@material-ui/core';
import Page from '../../component/Page';
import { useTranslation } from 'react-i18next';
import CustomTable from '../../containers/CustomTable';

const useStyles = makeStyles((theme) => ({
  root: {
    backgroundColor: theme.palette.background.default,
    minHeight: '100%',
    paddingBottom: theme.spacing(3),
    paddingTop: theme.spacing(3),
  },
  productCard: {
    height: '100%',
  },
}));

const FinanceList = () => {
  const classes = useStyles();
  const { t } = useTranslation();
  const columns = [
    {
      key: 'startTime',
      name: t('finance_type'),
    },
    {
      key: 'continueTime',
      name: t('finance_start_time'),
    },
    {
      key: 'finaceTypeId',
      name: t('finance_continue_time'),
    },
    {
      key: 'userId',
      name: t('finance_profit'),
    },
  ];

  return (
    <Page className={classes.root} title={t('nav_finance')}>
      <Container maxWidth={false}>
        {t('nav_finance')}
        {CustomTable(
          columns,
          'http://' + window.location.host + '/api/finance/list'
        )}
      </Container>
    </Page>
  );
};

export default FinanceList;
