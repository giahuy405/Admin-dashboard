import * as React from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import { useTheme } from "@emotion/react";
import FlexBetween from "./FlexBetween";
import { useDeleteTransactionMutation, useDeleteUserMutation } from "state/api";
import { Alert, Snackbar } from "@mui/material";

// const Alert = React.forwardRef(function Alert(props, ref) {
//   return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
// });

export default function ModalConfirmDelete({
  handleOpenModal,
  handleCloseModal,
  open,
  setOpen,
}) {
  const theme = useTheme();
  const style = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: 400,
    backgroundColor: theme.palette.background.alt,
    border: "2px solid #000",
    color: theme.palette.secondary[200],
    boxShadow: 24,
    p: "1.5rem 2rem",
    borderRadius: "10px",
  };
  const [deleteUser, { isLoading: isDeleteing }] = useDeleteUserMutation();
  const [deleteTransaction, { isLoading: isDeleteingTrasaction }] =
    useDeleteTransactionMutation();
  const [openAlert, setOpenAlert] = React.useState(false);
  return (
    <>
      <Modal
        open={open}
        onClose={handleCloseModal}
        aria-labelledby="child-modal-title"
        aria-describedby="child-modal-description"
      >
        <Box sx={{ ...style }}>
          <h2 id="child-modal-title">Are you sure ?</h2>
          <p id="child-modal-description">This action cann't be reverted</p>
          <Button
            variant="contained"
            color="error"
            
            sx={{
              width: "100%",
              display: "block",
              marginBottom:'10px'
            }}
            onClick={async () => {
              handleCloseModal();
              setOpenAlert(true);
            }}
          >
            Delete
          </Button>
          <Button
           
            variant="outlined"
            sx={{
              color: theme.palette.secondary[300],
              width: "100%",
              border:'1px solid grey',
              ':hover':{
                border:'1px solid grey',
              },
              display: "block",
            }}
            onClick={handleCloseModal}
          >
            Cancel
          </Button>
        </Box>
      </Modal>

      {/* Alert */}
      <Snackbar
        open={openAlert}
        autoHideDuration={1400}
        onClose={() => setOpenAlert(false)}
        anchorOrigin={{ vertical: "top", horizontal: "center" }}
      >
        <Alert
          onClose={() => setOpenAlert(false)}
          severity="success"
          sx={{ width: "100%" }}
        >
          Successfully deleted !
        </Alert>
      </Snackbar>
    </>
  );
}
