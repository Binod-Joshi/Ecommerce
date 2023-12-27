import React, { useEffect } from "react";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { useDispatch, useSelector } from "react-redux";
import { useState } from "react";
import {
  addProducts,
  settingAllToInitial,
  updatingProduct,
} from "../../store/productRelated/productHandle";
import styled from "styled-components";
import { TextareaAutosize } from "@mui/base/TextareaAutosize";
import { Alert, Card, CardMedia } from "@mui/material";
import { BsFillImageFill } from "react-icons/bs";
import { AiFillPlusCircle } from "react-icons/ai";
import { StyledButtonContainerr } from "./ParticularProduct";
import { useNavigate } from "react-router-dom";

const defaultTheme = createTheme();
const CustomizedTextField = styled(TextField)`
  height: 100px;
  margin-bottom: 20px;
`;

const AddProducts = ({ value, pData,passingFunctionForDivRemove }) => {
  const { status, loading, response } = useSelector((state) => state.product);
  const { currentUser } = useSelector((state) => state.user);
  const [checkFields, setCheckFields] = useState("");
  const [profilePic, setProfilePic] = useState("");
  const [updating, setUpdating] = useState(false);
  const [link, setLink] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  useEffect(()=> {
    dispatch(settingAllToInitial());
  },[]);

  const imageUpload = async (e) => {
    console.log(e.target.files[0]);
    const file = e.target.files[0];
    const base64 = await convertToBase64(file);
    console.log(base64);
    setProfilePic(base64);
  };

  const convertToBase64 = (file) => {
    const fileReader = new FileReader();
    fileReader.readAsDataURL(file);

    return new Promise((resolve, reject) => {
      fileReader.onload = () => {
        console.log(fileReader.result);
        resolve(fileReader.result);
      };
      fileReader.onerror = (error) => {
        reject(error);
      };
    });
  };

  const addProduct = (event, updating) => {
    event.preventDefault();
    console.log(value);

    let data = new FormData(event.currentTarget);
    let name = data.get("name");
    let cost = data.get("cost");
    let discount = data.get("discount");
    let category = data.get("category");
    let description = data.get("description");
    let quantity = data.get("quantity");
    let image = profilePic;
    let id = currentUser?._id;

    if (updating === "update") {

      if (
        !name && !cost && !discount && !description && !quantity
      ){
        setCheckFields("At least one field must be filled for the update.");
        const timeout = setTimeout(() => {
          setCheckFields("");
        }, 2000);

        return () => clearTimeout(timeout);
      }else{
        const productId = pData?._id;
        const fields = {
        // name: name || pData?.name, name na hoigya or paxa jhane bhayo
        name,cost,discount,description,quantity,
        productId,
        };
      console.log(fields);
      dispatch(updatingProduct(fields));
      passingFunctionForDivRemove();
      }
      

    } else {
      if (
        !name ||
        !cost ||
        !discount ||
        !category ||
        !image ||
        !description ||
        !quantity
      ) {
        setCheckFields("All fields are necessary.");
        const timeout = setTimeout(() => {
          setCheckFields("");
        }, 2000);

        return () => clearTimeout(timeout);
      }

      const fields = {
        name,
        cost,
        discount,
        category,
        image,
        description,
        quantity,
        id,
      };
      console.log(fields);

      dispatch(addProducts(fields));
    }
  };


  useEffect(() => {
    const timeout = setTimeout(() => {
      dispatch(settingAllToInitial());
    }, 5000); // Set the timeout duration in milliseconds, for example, 5000ms (5 seconds)
    return () => clearTimeout(timeout);
  }, [response]);


  const CancelHandle = () => {
    console.log("div harayo");
    passingFunctionForDivRemove();
  };

  return (
    <>
      {/*form type  */}
      <ThemeProvider theme={defaultTheme}>
        {response !== null || checkFields === "All fields are necessary." ? (
          <>
            <Alert
              severity="success"
              color="info"
              style={{
                position: "fixed",
                top: "65px",
                right: "5px",
                width: "30vw",
                zIndex: 1000,
              }}
            >
              {checkFields ? checkFields : response}
            </Alert>
          </>
        ) : (
          ""
        )}

        <Container component="main" maxWidth="xs">
          <CssBaseline />
          <Box
            sx={{
              marginTop: 8,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            {!value && (
              <Typography component="h1" variant="h5">
                Add Product
              </Typography>
            )}

            {profilePic && !value && (
              <Card sx={{ width: "355px", height: "355px", marginTop: "10px" }}>
                <CardMedia
                  component="img"
                  alt="green iguana"
                  height="355px"
                  width="355px"
                  image={profilePic}
                  style={{ objectFit: "cover" }}
                />
              </Card>
            )}

            {!value && (
              <div
                className="registerpicManagement"
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  flexDirection: "row",
                  gap: "10px",
                }}
              >
                <div>
                  <label htmlFor="fileInput">
                    <BsFillImageFill
                      className="settingsPPIcon"
                      style={{ fontSize: "50px" }}
                    />
                  </label>
                  <input
                    id="fileInput"
                    type="file"
                    style={{ display: "none" }}
                    className="settingsPPInput"
                    accept="image/*"
                    onChange={imageUpload}
                  />
                </div>

                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    flexDirection: "row",
                    gap: "10px",
                  }}
                >
                  <AiFillPlusCircle
                    style={{
                      marginBottom: "5px",
                      fontSize: "30px",
                      cursor: "pointer",
                    }}
                    onClick={() => setLink(true)}
                  />
                  {link && (
                    <input
                      type="text"
                      autoFocus={true}
                      placeholder="enter a link of a image."
                      className="writeInput"
                      onChange={(e) => setProfilePic(e.target.value)}
                    />
                  )}
                </div>
              </div>
            )}
            <Box
              component="form"
              onSubmit={
                value && value === "updateproduct"
                  ? (e) => addProduct(e, "update")
                  : addProduct
              }
              noValidate
              sx={{ mt: 1 }}
            >
              <TextField
                margin="normal"
                required
                fullWidth
                id="name"
                label={
                  pData && pData?.name
                    ? "Current name:" + pData?.name
                    : "Product name"
                }
                name="name"
                autoComplete="name"
                // value={data?.name}
                // onChange={}
                autoFocus
              />
              <TextField
                margin="normal"
                required
                fullWidth
                id="cost"
                label={
                  pData && pData?.cost
                    ? "Current mrp cost:" + pData?.cost
                    : "Product cost(MRP) in num"
                }
                name="cost"
                autoComplete="cost"
              />
              <TextField
                margin="normal"
                required
                fullWidth
                id="discount"
                label={
                  pData && pData?.discount
                    ? "Current discount:" + pData?.discount
                    : "discount in percentage"
                }
                name="discount"
                autoComplete="discount"
              />
              {!value && (
                <TextField
                  margin="normal"
                  required
                  fullWidth
                  id="category"
                  label="Product category"
                  name="category"
                  autoComplete="category"
                />
              )}
              <TextField
                margin="normal"
                required
                fullWidth
                id="quantity"
                label={
                  pData && pData?.quantity
                    ? "Current quantity:" + pData?.quantity
                    : "Product quantity"
                }
                name="quantity"
                autoComplete="quantity"
              />
              <TextareaAutosize
                aria-label="minimum height"
                minRows={8}
                placeholder="Product description..."
                margin="normal"
                required
                id="description"
                name="description"
                autoComplete="description"
                style={{ width: "100%", padding: "13px" }}
              />

              {!value && (
                <Button
                  type="submit"
                  fullWidth
                  variant="contained"
                  sx={{ mt: 3, mb: 2 }}
                >
                  Add Product
                </Button>
              )}

              {pData && <div style={{color:"red",display:"flex",justifyContent:"center",alignItems:"center"}}>{checkFields}</div>}
              
              {value && value === "updateproduct" && (
                <StyledButtonContainerr
                  style={{ width: "30vw", justifyContent: "space-around" }}
                >
                  <Button
                    variant="outlined"
                    type="submit"
                    color="error"
                    style={{ width: "60px" }}
                  >
                    
                    update
                  </Button>
                  <Button
                    variant="contained"
                    color="success"
                    style={{ marginLeft: "4px", width: "80px" }}
                    onClick={CancelHandle}
                  >
                    Cancel
                  </Button>
                </StyledButtonContainerr>
              )}
            </Box>
          </Box>
        </Container>
      </ThemeProvider>
    </>
  );
};

export default AddProducts;
