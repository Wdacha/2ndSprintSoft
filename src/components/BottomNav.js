import React from "react";
import { BottomNavigation, BottomNavigationAction } from "@mui/material";
import { Home as HomeIcon, Save as SaveIcon, Add as AddIcon } from "@mui/icons-material";
import { useNavigate } from "react-router-dom";

const BottomNav = () => {
  const [value, setValue] = React.useState("home");
  const navigate = useNavigate();

  const handleChange = (event, newValue) => {
    setValue(newValue);
    navigate(newValue);
  };

  return (
    <BottomNavigation
      value={value}
      onChange={handleChange}
      showLabels
      sx={{
        position: "fixed",
        bottom: 0,
        left: 0,
        right: 0,
        zIndex: 1000,
        width: "100%",
        borderTop: "1px solid rgba(0, 0, 0, 0.12)"
      }}
    >
      <BottomNavigationAction label="Home" value="/" icon={<HomeIcon />} />
      <BottomNavigationAction label="Add" value="/add" icon={<AddIcon />} />
      <BottomNavigationAction label="Saved" value="/saved" icon={<SaveIcon />} />
    </BottomNavigation>
  );
};

export default BottomNav;
