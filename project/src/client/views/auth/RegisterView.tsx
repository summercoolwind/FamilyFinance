import React from "react";
import { Link as RouterLink, useNavigate } from "react-router-dom";
import * as Yup from "yup";
import { Formik } from "formik";
import {
  Box,
  Button,
  Checkbox,
  Container,
  FormHelperText,
  Link,
  TextField,
  Typography,
  makeStyles,
} from "@material-ui/core";
import Page from "../../component/Page";
import { request } from "../../fetch/fetch";
import { useTranslation } from "react-i18next";

const useStyles = makeStyles((theme) => ({
  root: {
    backgroundColor: theme.palette.background.default,
    height: "100%",
    paddingBottom: theme.spacing(3),
    paddingTop: theme.spacing(3),
  },
}));

const RegisterView = () => {
  const classes = useStyles();
  const navigate = useNavigate();
  const { t } = useTranslation();

  return (
    <Page className={classes.root} title={t("nav_register")}>
      <Box
        display="flex"
        flexDirection="column"
        height="100%"
        justifyContent="center"
      >
        <Container maxWidth="sm">
          <Formik
            initialValues={{
              userName: "",
              password: "",
            }}
            validationSchema={Yup.object().shape({
              userName: Yup.string().max(255).required("User name is required"),
              password: Yup.string().max(255).required("password is required"),
            })}
            onSubmit={(value) => {
              request(
                "http://" + window.location.host + "/api/register",
                value,
                { method: "POST" }
              ).then((data) => {
                navigate("/app/dashboard", { replace: true });
              });
            }}
          >
            {({
              errors,
              handleBlur,
              handleChange,
              handleSubmit,
              isSubmitting,
              touched,
              values,
            }) => (
              <form onSubmit={handleSubmit}>
                <Box mb={3}>
                  <Typography color="textPrimary" variant="h2">
                    {t("create_new_account")}
                  </Typography>
                </Box>
                <TextField
                  error={Boolean(touched.userName && errors.userName)}
                  fullWidth
                  helperText={touched.userName && errors.userName}
                  label={t("user_name")}
                  margin="normal"
                  name="userName"
                  onBlur={handleBlur}
                  onChange={handleChange}
                  value={values.userName}
                  variant="outlined"
                />
                <TextField
                  error={Boolean(touched.password && errors.password)}
                  fullWidth
                  helperText={touched.password && errors.password}
                  label={t("password")}
                  margin="normal"
                  name="password"
                  onBlur={handleBlur}
                  onChange={handleChange}
                  type="password"
                  value={values.password}
                  variant="outlined"
                />

                <Box my={2}>
                  <Button
                    color="primary"
                    disabled={isSubmitting}
                    fullWidth
                    size="large"
                    type="submit"
                    variant="contained"
                  >
                    {t("nav_register")}
                  </Button>
                </Box>
                <Typography color="textSecondary" variant="body1">
                  {t("have_an_account")}
                  <Link component={RouterLink} to="/login" variant="h6">
                    {t("nav_login")}
                  </Link>
                </Typography>
              </form>
            )}
          </Formik>
        </Container>
      </Box>
    </Page>
  );
};

export default RegisterView;
