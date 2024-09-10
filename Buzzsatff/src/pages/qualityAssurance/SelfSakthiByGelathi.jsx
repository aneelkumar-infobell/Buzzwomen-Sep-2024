
import { useEffect, useState, forwardRef } from 'react';
import { useForm } from "react-hook-form";
import React from "react";
import axios from 'axios';
import PropTypes from 'prop-types';
import { Container, Stack, Typography, Box, Button, TextField, Grid, Snackbar, Card, CardActionArea ,IconButton} from '@mui/material';
import MuiAlert, { AlertProps } from '@mui/material/Alert';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Page from '../../components/Page';

import Iconify from 'src/components/Iconify';
import DialogForm from './components/DialogForm';
import { Link } from 'react-router-dom';
import OwnQuality from './OwnQuality';
import TeamQuality from './TeamQuality';


function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          <Typography id="children">{children}</Typography>
        </Box>
      )}
    </div>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired,
};


const SelfSakthiByGelathi = () => {
    const [value, setValue] = React.useState(0);
    const data = sessionStorage?.getItem('userId')
    var [dateValue, setDatevalue] = useState(new Date().toISOString().split('T')[0])
    const image = ["tykml", "exrdcftvbgyhnuj"]
    const [openMessage, setOpenMessage] = React.useState(false);
    const [mainValue, setMainValue] = useState(0)
    const [batch,setBatch] = useState('')

    const [shown,setShown] = React.useState(false);

    const userOwnPermissions=['9','5','12','4','13','6','3']
    const userTeamPermissions=['2','1','12','4','13','3','11']
  
  
    const Alert = forwardRef(function Alert(props, ref) {
      return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
    });

    const [reload ,setReload] = useState(false)
  
  const reloadfunction = ()=>{
    setReload(!reload)
  }
    
    useEffect(()=>{
      if(!userOwnPermissions.includes(data)){
      setMainValue(1)
      }
        },[])
      
    const getDateValue = (e) => {
      setDatevalue(e)
    }
  
    const returnDateValue = () => {
      return dateValue
    }
  
    const handleChange = (event, newValue) => {
      setValue(newValue);
    };
    return (
      <Page id="dashboard-products" title="Dashboard: Products">
        <Container id="container-travel-allowance">
  
  
          <Typography id="travel-allowance" variant="h4" sx={{ mb: 5 }}>
          <Link to="/dashboard/qualityAssurance">
                  <IconButton>
                    <Iconify icon="material-symbols:arrow-back-rounded" />
                  </IconButton></Link>
            Self Sakthi Program
            {/* <Button style={{ float: "right" }}>Filters</Button> */}
          </Typography>
          <Snackbar id="ta-snackbar" open={openMessage} autoHideDuration={6000} onClose={() => setOpenMessage(false)}>
            <Alert id="ta-message-alert" onClose={() => { setOpenMessage(false) }} severity="success" sx={{ width: '100%' }}>
              {message}
            </Alert>
          </Snackbar>
      <Box id="warning-box" sx={{ borderBottom: 1, borderColor: 'divider' }}>
            <Tabs id="warning" variant="fullWidth" indicatorColor='warning'>
  
             {
              userOwnPermissions.includes(data) &&  
              <Tab
              id="own"
              onClick={() => { setMainValue(0) }}
              sx={{
                ':hover': {
                  bgcolor: '#ffd796', // theme.palette.primary.main
                  color: '#ff7424',
                },
  
                color: 'black',
              }} label="OWN" style={mainValue == 0 ? {
                borderBottom: '3px solid #ff7424',
                color: "#ff7424",
              } : null} />
             }
  
  
  {
  userTeamPermissions.includes(data) &&
  <Tab
  id="team"
  onClick={() => { setMainValue(1) }}
  sx={{
    ':hover': {
      bgcolor: '#ffd796', // theme.palette.primary.main
      color: '#ff7424',
    },
  
    color: 'black',
  }} label="TEAM" style={mainValue == 1 ? {
    borderBottom: '3px solid #ff7424',
    color: "#ff7424",
  } : null} />
  
  }   </Tabs>
          </Box>
          <br />
      
        {
          userTeamPermissions.includes(data) &&   <TabPanel id="return-date-tab" value={mainValue} index={1}>
          <Stack id="return-date-stack" direction="row" spacing={1} flexShrink={0} sx={{ my: 1 }}>
            <Box id="team-box" sx={{ width: '100%' }}>
              <TeamQuality componentname="selfshakthibygelathi"  reload={reload}/>
            </Box>
          </Stack>
        </TabPanel>
  
        }
         {
          userOwnPermissions.includes(data) &&  <TabPanel value={mainValue} index={0}>
          <OwnQuality  componentname="selfshakthibygelathi" reload={reload}/>
        </TabPanel>
         }
  
  
          <br></br>
  
    { (mainValue==0) &&     <Stack id="travel-dialog-stack" direction="row" spacing={1} flexShrink={0} sx={{ my: 1 }}>
            <DialogForm id="travel-dialog"  batch={batch} shown={shown} setShown={(e)=>{setShown(e)} }  reloadfunction={reloadfunction}
   />
          </Stack>}
        </Container ></Page >
    );
  }

export default SelfSakthiByGelathi