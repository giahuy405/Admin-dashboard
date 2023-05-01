import React, { useState } from "react";
import {
  Box,
  Card,
  CardActions,
  CardContent,
  Collapse,
  Button,
  Typography,
  Rating,
  useTheme,
  useMediaQuery,
  Skeleton,
  Menu,
  MenuItem,
  makeStyles,
} from "@mui/material";
import Header from "components/Header";
import { useGetProductsQuery } from "state/api";
import FlexBetween from "components/FlexBetween";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";
import ModalConfirmDelete from "components/ModalDeleteProd";
const Product = ({
  _id,
  name,
  description,
  price,
  rating,
  category,
  supply,
  stat,
  setOpen
}) => {
  const theme = useTheme();
  const [isExpanded, setIsExpanded] = useState(false);

  // Menu control
  const [anchorEl, setAnchorEl] = useState(null);
  const isOpen = Boolean(anchorEl);
  const handleClick = (event) => setAnchorEl(event.currentTarget);
  const handleClose = () => setAnchorEl(null);

  return (
    <Card
      sx={{
        backgroundImage: "none",
        backgroundColor: theme.palette.background.alt,
        borderRadius: "0.55rem",
      }}
    >
      <CardContent>
        <FlexBetween>
          <Typography
            sx={{ fontSize: 14 }}
            color={theme.palette.secondary[200]}
            gutterBottom
          >
            {category}
          </Typography>
          <MoreHorizIcon
            sx={{
              ":hover": {
                cursor: "pointer",
              },
            }}
            onClick={handleClick}
          />
        </FlexBetween>
        <Typography variant="h5" component="div">
          {name}
        </Typography>
        <Typography sx={{ mb: "1.5rem" }} color={theme.palette.secondary[300]}>
          ${Number(price).toFixed(2)}
        </Typography>
        <Rating value={rating} readOnly />

        <Typography variant="body2">{description}</Typography>
      </CardContent>
      {/* Menu edit */}
      <Menu anchorEl={anchorEl} open={isOpen} onClose={handleClose}>
        <MenuItem>
          <EditIcon sx={{ marginRight: "6px" }} /> <span>Edit</span>
        </MenuItem>
        <MenuItem
         onClick={()=>setOpen(true)}
        >
          <DeleteIcon
           
            sx={{ marginRight: "6px" }}
          />{" "}
          <span>Delete</span>
        </MenuItem>
      </Menu>
      <CardActions>
        <Button
          variant="outlined"
          size="small"
          color="secondary"
          onClick={() => setIsExpanded(!isExpanded)}
        >
          See More
        </Button>
      </CardActions>
      <Collapse
        in={isExpanded}
        timeout="auto"
        unmountOnExit
        sx={{
          color: theme.palette.neutral[300],
        }}
      >
        <CardContent>
          <Typography>id: {_id}</Typography>
          <Typography>Supply Left: {supply}</Typography>
          <Typography>
            Yearly Sales This Year: {stat.yearlySalesTotal}
          </Typography>
          <Typography>
            Yearly Units Sold This Year: {stat.yearlyTotalSoldUnits}
          </Typography>
        </CardContent>
      </Collapse>
    </Card>
  );
};

const Skelekton = () => {
  const theme = useTheme();
  return (
    <Card
      sx={{
        backgroundImage: "none",
        backgroundColor: theme.palette.background.alt,
        borderRadius: "0.55rem",
      }}
    >
      <Typography w="100%" p="1rem">
        <Skeleton width={50} />
        <Skeleton width={80} />
        <Skeleton width={50} />
        <Skeleton width={100} sx={{ marginTop: "1rem" }} />
        <Skeleton width="100%" height={80} />
        <Skeleton width={30} />
      </Typography>
    </Card>
  );
};

const Products = () => {
  const { data, isLoading } = useGetProductsQuery();
  const isNonMobile = useMediaQuery("(min-width: 1100px)");

  // Modal control
  const [open, setOpen] = useState(false);
  const [paramsID, setParamsID] = useState(null);
  const handleOpenModal = (paramsID) => {
    setParamsID(paramsID);
    setOpen(true);
  };
  const handleCloseModal = () => {
    setOpen(false);
  };
  return (
    <Box m="1.5rem 2.5rem">
      <Header title="PRODUCT" content="List of products." />
      {data || !isLoading ? (
        <Box
          mt="20px"
          display="grid"
          gridTemplateColumns="repeat(4, minmax(0, 1fr))"
          justifyContent="space-between"
          rowGap="20px"
          columnGap="1.33%"
          sx={{
            // tất cả thẻ div bên trong sẽ ăn dòng này
            "& > div": { gridColumn: isNonMobile ? undefined : "span 4" },
          }}
        >
          {data?.data.map(
            ({
              _id,
              name,
              description,
              price,
              rating,
              category,
              supply,
              stat,
            }) => (
              <Product
                key={_id}
                _id={_id}
                name={name}
                description={description}
                price={price}
                rating={rating}
                category={category}
                supply={supply}
                stat={stat}
                setOpen={setOpen}
              />
            )
          )}
        </Box>
      ) : (
        <>
          <Box
            mt="20px"
            display="grid"
            gridTemplateColumns="repeat(4, minmax(0, 1fr))"
            justifyContent="space-between"
            rowGap="20px"
            columnGap="1.33%"
            sx={{
              // tất cả thẻ div bên trong sẽ ăn dòng này
              "& > div": { gridColumn: isNonMobile ? undefined : "span 4" },
            }}
          >
            <Skelekton />
            <Skelekton />
            <Skelekton />
            <Skelekton />
            <Skelekton />
            <Skelekton />
            <Skelekton />
            <Skelekton />
          </Box>
        </>
      )}
      <ModalConfirmDelete
        handleOpenModal={handleOpenModal}
        handleCloseModal={handleCloseModal}
        open={open}
        setOpen={setOpen}
        paramsID={paramsID}
      />
    </Box>
  );
};

export default Products;
