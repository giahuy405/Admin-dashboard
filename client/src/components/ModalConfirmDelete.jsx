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
  handleOpenModal2,
  handleCloseModal2,
  open2,
  setOpen2,
  paramsID,
  deletingTransaction,
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
  const [deleteTransaction, { isLoading: isDeleteingTrasaction }] = useDeleteTransactionMutation();
  const [openAlert, setOpenAlert] = React.useState(false);
  return (
    <>
      <Modal
        open={open2}
        onClose={handleCloseModal2}
        aria-labelledby="child-modal-title"
        aria-describedby="child-modal-description"
      >
        <Box sx={{ ...style }}>
          <h2 id="child-modal-title">Are you sure ?</h2>
          <p id="child-modal-description">This action cann't be reverted</p>
          <FlexBetween sx={{ justifyContent: "end" }}>
            <Button
              sx={{ color: theme.palette.secondary[300], marginRight: "8px" }}
              onClick={handleCloseModal2}
            >
              Close
            </Button>
            <Button
              variant="contained"
              color="error"
              onClick={async () => {
                deletingTransaction
                  ? await deleteTransaction(paramsID)
                  : await deleteUser(paramsID);

                handleCloseModal2();
                setOpenAlert(true);
              }}
            >
              Delete
            </Button>
          </FlexBetween>
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
