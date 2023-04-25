import {
    GridColumnMenuContainer,
    GridFilterMenuItem,
    HideGridColMenuItem,
  } from "@mui/x-data-grid";
  
  const CustomColumnMenu = (props) => {

    // 2 trường filter và Hide thôi 
    const { hideMenu, currentColumn, open } = props;
    return (
      <GridColumnMenuContainer
        hideMenu={hideMenu}
        currentColumn={currentColumn}
        open={open}
      >
        <GridFilterMenuItem onClick={hideMenu} column={currentColumn} />
        <HideGridColMenuItem onClick={hideMenu} column={currentColumn} />  
      </GridColumnMenuContainer>
    );
  };
  
  export default CustomColumnMenu;
  