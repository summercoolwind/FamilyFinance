import indigo from "@material-ui/core/colors/indigo";
import grey from "@material-ui/core/colors/grey";
import { useTranslation } from "react-i18next";
import CustomBar from "../../../containers/CustomBar";

const DashboardView = () => {
  const { t } = useTranslation();
  let labelLst = [
    t("dashboard_january"),
    t("dashboard_february"),
    t("dashboard_march"),
    t("dashboard_april"),
    t("dashboard_may"),
    t("dashboard_june"),
    t("dashboard_july"),
    t("dashboard_august"),
    t("dashboard_september"),
    t("dashboard_october"),
    t("dashboard_november"),
    t("dashboard_december"),
  ];
  let datasets = [
    {
      backgroundColor: indigo[500],
      data: [10, 10, 30, 4, 5, 6, 7, 8, 1, 1, 2, 2],
      label: t("dashboard_income"),
    },
    {
      backgroundColor: grey[200],
      data: [30, 5, 8, 12, 15, 16, 17, 18, 11, 10, 2, 5],
      label: t("dashboard_pay"),
    },
  ];
  let selectOption = {
    label: t("dashboard_year"),
    data: [
      { name: "2016", value: 2016 },
      { name: "2017", value: 2017 },
      { name: "2018", value: 2018 },
      { name: "2019", value: 2019 },
      { name: "2020", value: 2020 },
      { name: "2021", value: 2021 },
    ],
  };
  let selectIndex = 2021;

  return CustomBar(datasets, labelLst, selectOption, selectIndex);
};

export default DashboardView;
