import * as React from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import { useTheme } from "@emotion/react";
import FlexBetween from "./FlexBetween";
import { TextField, useMediaQuery } from "@mui/material";

export default function ModalEditUser({
  handleOpenModal,
  handleCloseModal,
  open,
  setOpen,
  user,
}) {
  const theme = useTheme();
  const style = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: 600,
    backgroundColor: theme.palette.background.alt,
    border: "2px solid #000",
    color: theme.palette.secondary[200],
    boxShadow: 24,
    p: "1.5rem 2rem",
    borderRadius: "10px",
  };
  console.log(user, "user user");
  const isNonMobile = useMediaQuery("(min-width: 800px)");
  return (
    <>
      <Modal
        open={open}
        onClose={handleCloseModal}
        aria-labelledby="child-modal-title"
        aria-describedby="child-modal-description"
      >
        <Box sx={{ ...style }}>
          <Typography variant="h3" sx={{textAlign:'center',fontWeight:'bold'}} id="child-modal-title" >Edit Customer</Typography>
            <Box
              mt="20px"
              display="grid"
              gridTemplateColumns="repeat(2, minmax(0, 1fr))"
              justifyContent="space-between"
              rowGap="20px"
              columnGap="1.33%"
              sx={{
                // tất cả thẻ div bên trong sẽ ăn dòng này
                "& > div": { gridColumn: isNonMobile ? undefined : "span 1" },
              }}
            >
              <TextField id="outlined-basic" label="Outlined" variant="outlined" />
            </Box>
          <FlexBetween sx={{ justifyContent: "end" }}>
            <Button
              sx={{ color: theme.palette.secondary[300], marginRight: "8px" }}
              onClick={handleCloseModal}
            >
              Close
            </Button>
            <Button
              variant="contained"
              color="secondary"
              onClick={handleCloseModal}
            >
              Save
            </Button>
          </FlexBetween>
        </Box>
      </Modal>
    </>
  );
}
