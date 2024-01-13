import * as React from "react";
import Box from "@mui/material/Box";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import TabContext from "@mui/lab/TabContext";
import TabPanel from "@mui/lab/TabPanel";
import OnGoingOrders from "./component/OnGoingOrders";
import AddedCartDetailsForSeller from "./component/AddedCartDetailsForSeller";
import { useSelector } from "react-redux";

export default function SellerOrders() {

  const {currentUser} = useSelector((state) => state.user);
  const [value, setValue] = React.useState("1");

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <Box sx={{ width: "100%", bgcolor: "background.paper" }}>
      <TabContext value={value}>
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            borderBottom: 1,
            borderColor: "divider",
          }}
        >
          <Tabs
            value={value}
            onChange={handleChange}
            variant="scrollable"
            scrollButtons="auto"
            aria-label="scrollable auto tabs example"
          >
            <Tab label="Processing Orders" value="1" />
            <Tab label="Shipped Orders" value="2" />
            <Tab label="Delivered Orders" value="3" />
            {currentUser?.role === "Seller" && <Tab label="Added to Cart" value="4" />}
            <Tab label="Cancelled Orders" value="5" />
          </Tabs>
        </Box>
    <TabPanel value="1">
      <OnGoingOrders status={"processing"} />
    </TabPanel>
    <TabPanel value="2">
      <OnGoingOrders status={"shipped"} />
    </TabPanel>
    <TabPanel value="3">
      <OnGoingOrders status={"delivered"} />
    </TabPanel>
    {currentUser?.role === "Seller" && <TabPanel value="4"><AddedCartDetailsForSeller /></TabPanel>}
    <TabPanel value="5">
      <OnGoingOrders status={"cancelled"} />
    </TabPanel>
      </TabContext>
    </Box>
  );
}
