import React, { useState } from "react";
import { Box, Container, Grid, makeStyles } from "@material-ui/core";
import Page from "../../component/Page";
import { useTranslation } from "react-i18next";

const useStyles = makeStyles((theme) => ({
  root: {
    backgroundColor: theme.palette.background.default,
    minHeight: "100%",
    paddingBottom: theme.spacing(3),
    paddingTop: theme.spacing(3),
  },
  productCard: {
    height: "100%",
  },
}));

const IncomeList = () => {
  const classes = useStyles();
  const { t } = useTranslation();
  return (
    <Page className={classes.root} title={t("nav_income")}>
      <Container maxWidth={false}>{t("nav_income")}</Container>
    </Page>
  );
};

export default IncomeList;
