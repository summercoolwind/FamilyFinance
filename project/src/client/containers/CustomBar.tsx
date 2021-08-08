import {
  Box,
  Card,
  CardContent,
  CardHeader,
  createStyles,
  Divider, 
  makeStyles,
  Select,
  Theme,
  useTheme,
} from "@material-ui/core";
import clsx from "clsx";
import React, { useEffect, useState } from "react";
import FormControl from "@material-ui/core/FormControl";
import InputLabel from "@material-ui/core/InputLabel";
import MenuItem from "@material-ui/core/MenuItem";
import Bar from "react-chartjs-2";

const CustomBar = (dataSets, labelLst, selectOption, selectIndex) => {
  const theme = useTheme();
  let [dataSet, changeDataSets] = useState(dataSets);
  useEffect(() => {}, selectIndex);
  const data = {
    datasets: dataSet,
    labels: labelLst,
  };

  const options = {
    animation: false,
    cornerRadius: 20,
    layout: { padding: 0 },
    legend: { display: false },
    maintainAspectRatio: false,
    responsive: true,
    scales: {
      xAxes: [
        {
          barThickness: 12,
          maxBarThickness: 10,
          barPercentage: 0.5,
          categoryPercentage: 0.5,
          ticks: {
            fontColor: theme.palette.text.secondary
          },
          gridLines: {
            display: false,
            drawBorder: false
          }
        }
      ],
      yAxes: [
        {
          ticks: {
            fontColor: theme.palette.text.secondary,
            beginAtZero: true,
            min: 0
          },
          gridLines: {
            borderDash: [2],
            borderDashOffset: [2],
            color: theme.palette.divider,
            drawBorder: false,
            zeroLineBorderDash: [2],
            zeroLineBorderDashOffset: [2],
            zeroLineColor: theme.palette.divider
          }
        }
      ]
    },
    tooltips: {
      backgroundColor: theme.palette.background.default,
      bodyFontColor: theme.palette.text.secondary,
      borderColor: theme.palette.divider,
      borderWidth: 1,
      enabled: true,
      footerFontColor: theme.palette.text.secondary,
      intersect: false,
      mode: 'index',
      titleFontColor: theme.palette.text.primary
    }
  };

  const useStyles = makeStyles((theme: Theme) =>
    createStyles({
      formControl: {
        margin: theme.spacing(1),
        minWidth: 120,
      },
      selectEmpty: {
        marginTop: theme.spacing(2),
      },
      root: {},
    })
  );
  const classes = useStyles();
  const [age, setAge] = React.useState( selectIndex as string);
  const handleChange = (event: React.ChangeEvent<{ value: unknown }>) => {
    setAge(event.target.value as string);
  };
  return (
    <Card className={clsx(classes.root, "")}>
      <CardHeader
        action={
          <FormControl variant="outlined" className={classes.formControl}>
            <InputLabel id="demo-simple-select-outlined-label">
              {selectOption.label}
            </InputLabel>
            <Select
              labelId="demo-simple-select-outlined-label"
              id="demo-simple-select-outlined"
              value={age}
              onChange={handleChange}
              label={selectOption.label}
            >
              {getMenuItems(selectOption.data)}
            </Select>
          </FormControl>
        }
      />
      <Divider />
      <CardContent>
        <Box height={400} position="relative">
        <Bar data={data} options={options} />
        </Box>
      </CardContent>
    </Card>
  );
};

export default CustomBar;
const getMenuItems = (data: any): React.ReactNodeArray | React.ReactPortal => {
  let menuItems = [];
  for (let index = 0; index < data.length; index++) {
    menuItems.push(
      <MenuItem value={data[index].value}>{data[index].name}</MenuItem>
    );
  }
  return menuItems;
};
