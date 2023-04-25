import React, { useState } from "react";
import { Box, Button, useMediaQuery, useTheme } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import {
  useDeleteTransactionMutation,
  useGetTransactionQuery,
} from "state/api";
import Header from "components/Header";
import DataGridCustomToolbar from "components/DataGridCustomToolbar";
import DeleteIcon from "@mui/icons-material/Delete";
import ModalConfirmDelete from "components/ModalConfirmDelete";
import moment from "moment";
const Transactions = () => {
  const theme = useTheme();
  const isNonMobile = useMediaQuery('(min-width:700px)')
  
  // values to be sent to the backend
  const [page, setPage] = useState(0);
  const [pageSize, setPageSize] = useState(20);
  const [sort, setSort] = useState({});
  const [search, setSearch] = useState("");

  const [searchInput, setSearchInput] = useState("");
  const { data, isLoading } = useGetTransactionQuery({
    page,
    pageSize,
    sort: JSON.stringify(sort),
    search,
  });
  const [open2, setOpen2] = useState(false);
  const [paramsID, setParamsID] = useState(null);
  const handleOpenModal2 = (paramsID) => {
    setParamsID(paramsID);
    setOpen2(true);
  };
  const handleCloseModal2 = () => {
    setOpen2(false);
  };

  const columns = [
    {
      field: "_id",
      headerName: "ID",
      flex: 1,
    },
    {
      field: "userId",
      headerName: "User ID",
      flex: 1,
    },
    {
      field: "createdAt",
      headerName: "Created At",
      flex: 1,
      renderCell: (params) => {
        console.log(params)
         
        return <Box sx={{ textAlign: "left", width: "100%" }}>{moment(params.value).format('DD/MM/YYYY, h:mm:ss a')}</Box>;
      },
    },
    {
      field: "products",
      headerName: "Quantity of Products",
      flex: 0.6,
      sortable: false,
      renderCell: (params) => (
        <Box sx={{ textAlign: "center", width: "100%" }}>
          {params.value.length}
        </Box>
      ),
    },
    {
      field: "cost",
      headerName: "Cost",
      flex: 0.6,
      renderCell: (params) => `$${Number(params.value).toFixed(2)}`,
    },
    {
      // field: "_id",
      headerName: "Action",
      flex: 0.6,
      renderCell: (params) => {
        const handleDeleteClick = () => {
          handleOpenModal2(params.row._id);
        };

        return (
          <>
            {/* <Button
              sx={{ minWidth: "initial", marginRight: "5px" }}
              variant="contained"
              color="secondary"
              onClick={handleEditClick}
            >
              <EditIcon />
            </Button> */}
            <Button
              sx={{ minWidth: "initial" }}
              variant="contained"
              color="error"
              onClick={handleDeleteClick}
            >
              <DeleteIcon />
            </Button>
          </>
        );
      },
    },
  ];

  return (
    <Box m="1.5rem 2.5rem">
      <Header title="TRANSACTIONS" content="Entire list of transactions" />
      <Box
        height="80vh"
        mt="20px"
        sx={{
          "& .MuiDataGrid-root": {
            border: "none",
          },
          "& .MuiDataGrid-cell": {
            borderBottom: "none",
          },
          "& .MuiDataGrid-columnHeaders": {
            backgroundColor: theme.palette.background.alt,
            color: theme.palette.secondary[100],
            borderBottom: "none",
          },
          "& .MuiDataGrid-virtualScroller": {
            backgroundColor: theme.palette.primary.light,
          },
          "& .MuiDataGrid-footerContainer": {
            backgroundColor: theme.palette.background.alt,
            color: theme.palette.secondary[100],
            borderTop: "none",
          },
          "& .MuiDataGrid-toolbarContainer .MuiButton-text": {
            color: `${theme.palette.secondary[200]} !important`,
          },
        }}
      >
        <DataGrid
          loading={isLoading || !data}
          getRowId={(row) => row._id}
          rows={(data && data.transactions) || []}
          columns={columns}
          rowCount={(data && data.total) || 0}
          rowsPerPageOptions={[20, 50, 100]}
          pagination
          page={page}
          pageSize={pageSize}
          paginationMode="server"
          sortingMode="server"
          onPageChange={(newPage) => setPage(newPage)}
          onPageSizeChange={(newPageSize) => setPageSize(newPageSize)}
          onSortModelChange={(newSortModel) => setSort(...newSortModel)}
          components={{ Toolbar: DataGridCustomToolbar }}
          componentsProps={{
            toolbar: { searchInput, setSearchInput, setSearch },
          }}
        />
      </Box>
      <ModalConfirmDelete
        deletingTransaction={true}
        handleOpenModal2={handleOpenModal2}
        handleCloseModal2={handleCloseModal2}
        open2={open2}
        setOpen2={setOpen2}
        paramsID={paramsID}
      />
    </Box>
  );
};

export default Transactions;
