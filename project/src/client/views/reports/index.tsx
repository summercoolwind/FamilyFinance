import React from "react";
import { Container, Grid, makeStyles } from "@material-ui/core";
import Page from "../../component/Page";
import { useTranslation } from "react-i18next";
import DashboardView from "./DashboardView/DashboardView";

const useStyles = makeStyles((theme) => ({
  root: {
    backgroundColor: theme.palette.background.default,
    minHeight: "100%",
    paddingBottom: theme.spacing(3),
    paddingTop: theme.spacing(3),
  },
}));

const Dashboard = () => {
  const classes = useStyles();
  const { t } = useTranslation();
  return (
    <Page className={classes.root} title={t("nav_dashboard")}>
      <Container maxWidth={false}>
        {t("nav_dashboard")}
        <Grid container spacing={3}>
          <Grid item lg={12} sm={12} xl={12} xs={12}>
            <DashboardView />
          </Grid>
        </Grid>
      </Container>
    </Page>
  );
};

export default Dashboard;
