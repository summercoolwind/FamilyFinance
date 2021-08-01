import React from "react";
import { Box, Container, makeStyles } from "@material-ui/core";
import Page from "../../../component/Page";
import Password from "./Password";
import { useTranslation } from "react-i18next";

const useStyles = makeStyles((theme) => ({
  root: {
    backgroundColor: theme.palette.background.default,
    minHeight: "100%",
    paddingBottom: theme.spacing(3),
    paddingTop: theme.spacing(3),
  },
}));

const SettingsView = () => {
  const classes = useStyles();
  const { t } = useTranslation();
  return (
    <Page className={classes.root} title={t("nav_setting")}>
      <Container maxWidth="lg">
        <Box mt={3}>
          <Password className="" />
        </Box>
      </Container>
    </Page>
  );
};

export default SettingsView;
