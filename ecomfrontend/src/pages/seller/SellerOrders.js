import * as React from "react";
import Box from "@mui/material/Box";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import TabContext from "@mui/lab/TabContext";
import TabPanel from "@mui/lab/TabPanel";
import OnGoingOrders from "./component/OnGoingOrders";

export default function CenteredTabs() {
  const [value, setValue] = React.useState("1");

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <Box sx={{ width: "100%", bgcolor: "background.paper" }}>
      <TabContext value={value}>
        <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
          <Tabs value={value} onChange={handleChange} centered>
            <Tab label="Processing Orders" value="1" />
            <Tab label="Shipped Orders" value="2" />
            <Tab label="Delivered Orders" value="3" />
            <Tab label="Added to Cart" value="4" />
            <Tab label="Cancelled Orders" value="5"/>
          </Tabs>
        </Box>
        <TabPanel value="1"> <OnGoingOrders/> </TabPanel>
        <TabPanel value="2">Item Two</TabPanel>
        <TabPanel value="3">Item Three</TabPanel>
        <TabPanel value="4">Item four</TabPanel>
        <TabPanel value="5">Item four</TabPanel>
      </TabContext>
    </Box>
  );
}
