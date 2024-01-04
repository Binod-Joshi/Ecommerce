import * as React from "react";
import {
  ThemeProvider,
  createTheme,
  styled,
  alpha,
} from "@mui/material/styles";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";

import { KeyboardArrowDown, KeyboardArrowUp } from "@mui/icons-material";
import { LightPurpleButton } from "../utils/buttonStyles";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import {
  getProducts,
  getSearchedProducts,
  setCategory,
} from "../store/productRelated/productHandle";
import { useEffect, useState } from "react";
import { useMediaQuery } from "@mui/material";

// Create a theme
const theme = createTheme();

const ProductsMenu = ({ dropName }) => {
  const [isUniqueItemsReady, setIsUniqueItemsReady] = useState(false);
  const navigate = useNavigate();

  const dispatch = useDispatch();

  const location = useLocation();

  const { productData, categoriesList } = useSelector((state) => state.product);
  const isMobileScreen = useMediaQuery(theme.breakpoints.down("sm"));

  const [anchorEl, setAnchorEl] = useState(null);

  const open = Boolean(anchorEl);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const uniqueItems = [
    ...new Set(productData?.map((product) => product.category)),
  ];
  useEffect(() => {
    if (uniqueItems.length > 0 && !isUniqueItemsReady) {
      dispatch(setCategory(uniqueItems));
      setIsUniqueItemsReady(true); // Set the flag to prevent useEffect from running again
    }
  }, [isUniqueItemsReady, uniqueItems.length]);

  const catHandler = (key) => {
    setAnchorEl(null);
    if (dropName === "Categories") {
      dispatch(getSearchedProducts(key));
    }
  };

  return (
    <ThemeProvider theme={theme}>
      <div style={{ marginLeft: isMobileScreen ? 0 : "2rem" }}>
        <LightPurpleButton
          id="demo-customized-button"
          aria-controls={open ? "demo-customized-menu" : undefined}
          aria-haspopup="true"
          aria-expanded={open ? "true" : undefined}
          disableElevation
          onClick={handleClick}
          endIcon={open ? <KeyboardArrowUp /> : <KeyboardArrowDown />}
        >
          {dropName}
        </LightPurpleButton>
        {dropName === "Categories" && (
          <StyledMenu
            id="demo-customized-menu"
            MenuListProps={{
              "aria-labelledby": "demo-customized-button",
            }}
            anchorEl={anchorEl}
            open={open}
            onClose={handleClose}
          >
            {categoriesList?.map((category, index) => (
              <MenuItem
                onClick={() => {
                  catHandler(category);
                }}
                key={index}
              >
                {category}
              </MenuItem>
            ))}
          </StyledMenu>
        )}
      </div>
    </ThemeProvider>
  );
};

const StyledMenu = styled((props) => (
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

export default ProductsMenu;
