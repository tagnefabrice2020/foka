import { Divider, Menu, MenuItem, MenuProps, Typography } from "@mui/material";
import { Link } from "gatsby-plugin-react-i18next";
import React, { useState } from "react";
import { styled as MuiStyled, alpha } from "@mui/material/styles";
import { styled } from "styled-components";
import LogoutIcon from "@mui/icons-material/Logout";
import PersonOutlineIcon from "@mui/icons-material/PersonOutline";
import { useLogout } from "../../hooks/useLogout";
import { useAuthContext } from "../../hooks/useAuthContext";
import AccountBoxIcon from "@mui/icons-material/AccountBox";

const StyledMenu = MuiStyled((props: MenuProps) => (
  <Menu
    elevation={0}
    anchorOrigin={{
      vertical: "bottom",
      horizontal: "right",
    }}
    transformOrigin={{
      vertical: "top",
      horizontal: "right",
    }}
    {...props}
  />
))(({ theme }) => ({
  "& .MuiPaper-root": {
    borderRadius: 6,
    marginTop: theme.spacing(1),
    minWidth: 180,
    color:
      theme.palette.mode === "light"
        ? "rgb(55, 65, 81)"
        : theme.palette.grey[300],
    boxShadow:
      "rgb(255, 255, 255) 0px 0px 0px 0px, rgba(0, 0, 0, 0.05) 0px 0px 0px 1px, rgba(0, 0, 0, 0.1) 0px 10px 15px -3px, rgba(0, 0, 0, 0.05) 0px 4px 6px -2px",
    "& .MuiMenu-list": {
      padding: "4px 0",
    },
    "& .MuiMenuItem-root": {
      "& .MuiSvgIcon-root": {
        fontSize: 18,
        color: theme.palette.text.secondary,
        marginRight: theme.spacing(1.5),
      },
      "&:active": {
        backgroundColor: alpha(
          theme.palette.primary.main,
          theme.palette.action.selectedOpacity
        ),
      },
    },
  },
}));

const Header = () => {
  const [profileDropdownAnchorEl, setProfileDropdownAnchorEl] =
    useState<null | HTMLElement>(null);
  const open = Boolean(profileDropdownAnchorEl);
  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setProfileDropdownAnchorEl(event.currentTarget);
  };
  const { logout } = useLogout();
  const handleClose = () => {
    setProfileDropdownAnchorEl(null);
  };

  return (
    <NavBarContainer>
      <NavBar>
        <div id="logo" style={{ flexBasis: "12rem" }}>
          <img alt="logo" src="" />
        </div>
        <LanguageContainer id="langauges">
          {/* <LanguageText>English</LanguageText>
          <LanguageText>French</LanguageText> */}
          <Link to={`/`}>
            <Typography variant="caption">Home</Typography>
          </Link>
          <Link to={`/account/dashboard`}>
            <Typography variant="caption">Dashboard</Typography>
          </Link>
          <Link to={`/account/my-bundles`}>
            <Typography variant="caption">My Bundles</Typography>
          </Link>
          <Link to={`/account/dashboard`}>
            <Typography variant="caption">Parameters</Typography>
          </Link>
        </LanguageContainer>
        <Avartar
          id="avartar"
          className="cursor--pointer"
          style={{ marginLeft: "auto" }}
          aria-controls={open ? "profile-dropdown-menu" : undefined}
          aria-haspopup="true"
          aria-expanded={open ? "true" : undefined}
          onClick={handleClick}
        >
          <AccountBoxIcon />
        </Avartar>
        <StyledMenu
          id="demo-customized-menu"
          MenuListProps={{
            "aria-labelledby": "demo-customized-button",
          }}
          anchorEl={profileDropdownAnchorEl}
          open={open}
          onClose={handleClose}
        >
          <MenuItem onClick={handleClose} disableRipple>
            <PersonOutlineIcon />{" "}
            <Typography variant="caption">Profile</Typography>
          </MenuItem>

          <Divider sx={{ my: 0.5 }} />
          <MenuItem
            onClick={() => {
              logout();
              handleClose();
            }}
            disableRipple
          >
            <LogoutIcon /> <Typography variant="caption">Logout</Typography>
          </MenuItem>
        </StyledMenu>
      </NavBar>
    </NavBarContainer>
  );
};

const NavBarContainer = styled.div`
  height: 51px;
  width: 100%;
  box-shadow: rgba(27, 31, 35, 0.04) 0px 1px 0px,
    rgba(255, 255, 255, 0.25) 0px 1px 0px inset;
  background: #f5f8fa;
  z-index: 9;
  position: fixed;
  top: 0px;
`;

const NavBar = styled.div`
  display: flex;

  max-width: 1285px;
  height: 51px;
  
  position: fixed;
  z-index: 1;
  width: 100%;
  left: 50%;
  transform: translate(-50%);
`;

const LanguageContainer = styled.div`
  display: flex;
 
  flex-direction: row;
  height: calc(51px - 0px);
  & > a {
    display: flex;
    align-items: center;
    padding: 0 1rem;
   color: #000;
   font-weight: 700;
   text-decoration: none;
   &:hover {
    text-decoration: underline;
   }
  }

  & > a:not(:last-of-type) {
    border-right: 1px solid #eee;
  }
`;

const LanguageText = styled.p`
  display: flex;
  align-items: center;
  cursor: pointer;
`;

const Avartar = styled.div`
  height: calc(51px - 0px);
  width: calc(51px - 0px);
  background: #eee;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
`;

export default Header;
