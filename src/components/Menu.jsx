import React, { useState, useCallback } from "react";
import SwipeableViews from 'react-swipeable-views';
import { useTheme, Box, AppBar, Tabs, Tab, Container } from "@mui/material";
import TabPanel from "./TabPanel";
import Destinatarios from "../pages/Destinatarios";

function Menu() {
    const theme = useTheme();
    const [value, setValue] = useState(0);

    const a11yProps = useCallback((index) => (
        {
            id: `full-width-tab-${index}`,
            'aria-controls': `full-width-tabpanel-${index}`,
        }
    ), []);

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

    const handleChangeIndex = (index) => {
        setValue(index);
    };

    return (
        <Box sx={{ bgcolor: 'background.paper', width: 'auto' }}>
            <AppBar position="static">
                <Tabs
                    value={value}
                    onChange={handleChange}
                    indicatorColor="secondary"
                    textColor="inherit"
                    variant="fullWidth"
                    aria-label="full width tabs example"
                >
                    <Tab label="Mensajería" {...a11yProps(0)} />
                    <Tab label="Destinatarios" {...a11yProps(1)} />
                </Tabs>
            </AppBar>
            <SwipeableViews
                axis={theme.direction === 'rtl' ? 'x-reverse' : 'x'}
                index={value}
                onChangeIndex={handleChangeIndex}
            >
                <TabPanel value={value} index={0} dir={theme.direction}>
                    Info Mensajeria
                </TabPanel>
                <TabPanel value={value} index={1} dir={theme.direction}>
                    <Container maxWidth="80%">
                        <Destinatarios/>
                    </Container>
                </TabPanel>
            </SwipeableViews>
        </Box>
    );
}

export default Menu;