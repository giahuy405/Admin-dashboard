import React, { useEffect, useState } from "react";
import { Box, Button, useTheme } from "@mui/material";
import { useGetCustomerQuery, useGetUserQuery } from "state/api.js";
import Header from "components/Header";
import { DataGrid } from "@mui/x-data-grid";
import { useQueryClient } from "react-query";
import Modal from "@mui/material/Modal";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import FlexBetween from "components/FlexBetween";

import ModalEditUser from "components/ModalEditUser";
import ModalConfirmDelete from "components/ModalConfirmDelete";
const Customers = () => {
  const [open, setOpen] = useState(false);
  const [open2, setOpen2] = useState(false);
  const [paramsID, setParamsID] = useState(null);
  const [userId, setUserId] = useState(null);
  const handleOpenModal = () => {
    setOpen(true);
  };
  const handleCloseModal = () => {
    setOpen(false);
  };

  const handleOpenModal2 = (paramsID) => {
    setParamsID(paramsID);
    setOpen2(true);
  };
  const handleCloseModal2 = () => {
    setOpen2(false);
  };

  const theme = useTheme();
  const { data, isLoading } = useGetCustomerQuery();
  const { data: getUserByID, isLoading: isLD } = useGetUserQuery(userId);
  // console.log(data?.data[0]);

  const columns = [
    {
      field: "_id",
      headerName: "ID",
      flex: 1,
    },
    {
      field: "name",
      headerName: "Name",
      flex: 0.5,
    },
    {
      field: "email",
      headerName: "Email",
      flex: 1,
    },
    {
      field: "phoneNumber",
      headerName: "Phone Number",
      flex: 0.5,
      renderCell: (params) => {
        return params.value.replace(/^(\d{3})(\d{3})(\d{4})/, "($1)$2-$3");
      },
    },
    {
      field: "country",
      headerName: "Country",
      flex: 0.4,
    },
    {
      field: "occupation",
      headerName: "Occupation",
      flex: 1,
    },
    {
      field: "role",
      headerName: "Action",
      flex: 0.65,
      renderCell: (params) => {
        const handleDeleteClick = async () => {
          // handle delete logic here, using params.row.id to get the ID of the row to delete
          handleOpenModal2(params.row._id);
        };
        const handleEditClick = async () => {
          handleOpenModal();
          setUserId(params.row._id);
        };

        return (
          <>
            <Button
              sx={{ minWidth: "initial", marginRight: "5px" }}
              variant="contained"
              color="secondary"
              onClick={handleEditClick}
            >
              <EditIcon />
            </Button>
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
      <FlexBetween>
        <Header title="CUSTOMERS" content="List of Customers" />
        <Button variant="outlined" color="secondary">
          Create new customer +
        </Button>
      </FlexBetween>
      <Box
        mt="20px"
        height="75vh"
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
          loading={isLoading || !data?.data}
          getRowId={(row) => row._id}
          rows={data?.data || []}
          columns={columns}
        />
      </Box>
      <ModalEditUser
        user={getUserByID?.data || {}}
        handleOpenModal={handleOpenModal}
        handleCloseModal={handleCloseModal}
        open={open}
        setOpen={setOpen}
      />
      <ModalConfirmDelete
        handleOpenModal2={handleOpenModal2}
        handleCloseModal2={handleCloseModal2}
        open2={open2}
        setOpen2={setOpen2}
        paramsID={paramsID}
      />
    </Box>
  );
};

export default Customers;
