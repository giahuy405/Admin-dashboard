import React, { useState } from "react";
import { Box, useMediaQuery } from "@mui/material";
import { Outlet } from "react-router-dom";
import { useSelector } from "react-redux";
import Navbar from "components/Navbar";
import Sidebar from "components/Sidebar";
import { useGetUserQuery } from "state/api";
const Layout = () => {
  const isNonMobile = useMediaQuery("(min-width: 900px)"); // nếu là desktop sẽ là true, màn hình mobile sẽ là false

  // ở màn hình mobile thì 
  const [isSidebarOpen, setIsSidebarOpen] = useState(isNonMobile);

  const userId = useSelector((state) => state.global.userId);
  const { data,isLoading } = useGetUserQuery(userId);

  return (
    <Box display={isNonMobile ? "flex" : "block"} width="100%" height="100%">
      <Sidebar
        user={data?.data || {}}
        isNonMobile={isNonMobile}
        drawerWidth="250px"
        isSidebarOpen={isSidebarOpen}
        setIsSidebarOpen={setIsSidebarOpen}
      />

      <Box width="100%">
        <Navbar
         user={data?.data || {}}
          isSidebarOpen={isSidebarOpen}
          setIsSidebarOpen={setIsSidebarOpen}
        />
        <Outlet />
      </Box>
    </Box>
  );
};

export default Layout;
