import {
  Grid,
  Box,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TablePagination,
  TableRow,
} from "@material-ui/core";
import React, { useEffect, useState } from "react";
import PerfectScrollbar from "react-perfect-scrollbar";
import { request } from "../fetch/fetch";
const CustomTable = (columns, getRowStr) => {
  let columnsCells = getColumnsCells(columns);
  const [pageSize, changePageSize] = useState(5);
  const [pageIndex, changePageIndex] = useState(0);
  const [rows, updateRows] = useState([]);
  useEffect(() => {
    request(getRowStr, { pageSize, pageIndex }, {
      method: "GET",
    }).then((data) => {
      updateRows(data.data);
    });
  }, [pageSize * pageIndex]);
  let startIndex = pageIndex * pageSize;
  let endIndex = (pageIndex + 1) * pageSize;
  return (
    <Grid container>
      <Grid item xs={4}></Grid>
      <PerfectScrollbar>
        <Box minWidth={1050}>
          <Table>
            <TableHead>
              {columnsCells}
            </TableHead>
            <TableBody>
              {rows.slice(startIndex, endIndex).map((customer) => (
                getTowCells(customer, columns)
              ))}
            </TableBody>
          </Table>
        </Box>
      </PerfectScrollbar>
      <TablePagination
        component="div"
        count={rows.length}
        onChangePage={(event, curPageIndex) => {
          changePageIndex(curPageIndex);
        }}
        onChangeRowsPerPage={(event) => {
          changePageSize(parseInt(event.target.value));
        }}
        page={pageIndex}
        rowsPerPage={pageSize}
        rowsPerPageOptions={[5, 10, 25]}
      />
    </Grid>
  );
};

const getColumnsCells = (columns) => {
  let columnsCellLst = [];
  for (let columIndex = 0; columIndex < columns.length; columIndex++) {
    columnsCellLst.push(
      <TableCell>{columns[columIndex].name}</TableCell>);
  }
  return (<TableRow>
    {columnsCellLst}
  </TableRow>);
}
const getTowCells = (customer: any, columns: any): string | number | boolean | {} | React.ReactElement<any, string | React.JSXElementConstructor<any>> | React.ReactNodeArray | React.ReactPortal => {
  let columnsCellLst = [];
  for (let columIndex = 0; columIndex < columns.length; columIndex++) {
    columnsCellLst.push(
      <TableCell>{customer[columns[columIndex]].key}</TableCell>);
  }
  return (<TableRow hover key={customer._id}>
    {columnsCellLst}
  </TableRow>);
}

export default CustomTable;