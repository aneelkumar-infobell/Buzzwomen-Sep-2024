import { useState, useEffect } from 'react';
import axios from 'axios';
import React from "react";
import {Button,CardContent,Stack,Card} from '@mui/material';
import Dialog from '@mui/material/Dialog';
import PropTypes from 'prop-types';
import Divider from '@mui/material/Divider';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import CloseIcon from '@mui/icons-material/Close';
import Slide from '@mui/material/Slide';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Box from '@mui/material/Box';
import moment from 'moment';
import Iconify from 'src/components/Iconify';
import { useGeolocated } from 'react-geolocated';
import { baseURL } from 'src/utils/api';
import { useAuth } from 'src/AuthContext';
const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});
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
            <Typography>{children}</Typography>
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
  
  function a11yProps(index) {
    return {
      id: `simple-tab-${index}`,
      'aria-controls': `simple-tabpanel-${index}`,
    };
  }
export default function CheckinOut({photos,batch,setCheck}) {
    const { apikey } = useAuth();
  const newTime = new Date()
  const [open, setOpen] = React.useState(false);
  const [value, setValue] = React.useState(0);
  const [checkData,setCheckData]=React.useState('');
  const [lats,setLats] = React.useState({
    lat:"",
    lng:""
  })
  const [location,setLocation] = React.useState('')
  const [checkIn,setCheckIn] = useState({
    location:"",
    time:""
  })
  const [checkOut,setCheckOut] = useState({
    location:"",
    time:""
  })
  const [Day2checkIn,setDay2CheckIn] = useState({
    location:"",
    time:""
  })
  const [Day2checkOut,setDay2CheckOut] = useState({
    location:"",
    time:""
  })
  const handleChange = (event, newValue) => {
    setValue(newValue);
  };
  const handleClickOpen = () => {
    setOpen(true);
    GetStatus();
  };
  const handleClose = () => {
    setOpen(false);
  };
  useEffect(()=>{
    navigator.geolocation.getCurrentPosition(function(position) {
      setLats({lat:position.coords.latitude,lng:position.coords.longitude})
      var data = JSON.stringify({
        "latitude": JSON.stringify(position.coords.latitude),
        "longitude": JSON.stringify(position.coords.longitude)
      });
      var config = {
        method: 'post',
        url: baseURL+'getlocationName',
        headers: { 
          'Content-Type': 'application/json',
          'Authorization': `${apikey}`
        },
        data : data
      };
axios(config)
.then(function (response) {
  setLocation(response?.data)
})
.catch(function (error) {
  // console.log(error,",----ewrwerwer");
});
      
    });
  },[])
  const checkinout = async(type,batchid) =>{
    var data = JSON.stringify({
      "location_name": location,
      "user_id": batch?.data?.user_id,
      "lon": JSON.stringify(lats?.lng),
      "id": batchid,
      "type": JSON.stringify(type),
      "lat": JSON.stringify(lats?.lat)
    });
    
    var config = {
      method: 'post',
    maxBodyLength: Infinity,
      url: baseURL + 'checkInOut',
      headers: { 
        'Content-Type': 'application/json',
        'Authorization': `${apikey}`
      },
      data : data
    };
      axios(config)
      .then(function (response) {
        
        if(type ===1){
            setCheckIn({
                location:location,
                time:newTime
            })
        }
        if(type ===2){
          setCheckOut({
              location:location,
              time:newTime
          })
      }
      GetStatus();
      })
      .catch(function (error) {
        // console.log(error);
      });
  }
  const GetStatus = async=>{
    var data = JSON.stringify({
      "project_id": batch?.data?.project_id,
      "poa_type": "1",
      "type": "2",
      "tb_id": batch?.data?.id
    });
    
    var config = {
      method: 'post',
      url: baseURL + 'getCheckInOutStatus',
      headers: { 
        'Content-Type': 'application/json',
        'Authorization': `${apikey}`
      },
      data : data
    };
    axios(config)
    .then(function (response) {
      setCheckData(response.data)
    })
    .catch(function (error) {
      // console.log(error);
    });
  }
  var todaydate = moment(new Date()).format('DD-MM-YYYY');
  const styles = {
    buttonStyle: { boxShadow: "none", borderRadius: "7px", backgroundColor: "#edeff1", fontWeight: 500, textAlign: "left" },
    tableRowStyle: { justifyContent: 'center', alignItems: 'center', marginLeft: 200 },
    linkStyle: { textDecoration: 'none', color: "black" }
  }
  return (
    <div>
     {/* <Card><CardContent><Typography  onClick={handleClickOpen}>
                 Check in/ Check Out
                    <IconButton style={{ float: 'right' }}>
                      <Iconify
                        style={{ color: 'black' }}
                        icon="material-symbols:add"
                       
                      />
                    </IconButton>
                  </Typography></CardContent> </Card> */}
                  <Stack style={{ flexDirection: 'row'}}  mb={2}>
      
        <Button variant="secondary" style={styles.buttonStyle} onClick={handleClickOpen}
                    endIcon={<IconButton onClick={handleClickOpen}> <Iconify style={{ color: "#6d7c89" }} icon="material-symbols:add" /> </IconButton>}
                    startIcon={<IconButton> <Iconify style={{ color: "#6d7c89" }} icon="cil:clock" /></IconButton>}>
                    <span style={{ width: "200px" }}>CheckIn / CheckOut</span>
                  </Button>
        </Stack>
      <Dialog
        fullScreen
        open={open}
        onClose={handleClose}
        TransitionComponent={Transition}
      >
        <AppBar sx={{ position: 'relative', bgcolor: '#ff7424'}}>
          <Toolbar >
            <IconButton
              edge="start"
              color="inherit"
              onClick={handleClose}
              aria-label="close"
            >
              <CloseIcon />
            </IconButton>
            <Typography sx={{ ml: 2, flex: 1 }} variant="h6" component="div" style={{color:'white'}}>
             Check In / Check Out 
            </Typography>
          </Toolbar>
        </AppBar>
        <Box sx={{ width: '100%' }}>
      <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
        <Tabs  value={value} onChange={handleChange} indicatorColor='warning' aria-label="basic tabs example">
          <Tab label="Day1" {...a11yProps(0)}  sx={{
                  ':hover': {
                    bgcolor: '#ffd796', // theme.palette.primary.main
                    color: '#ed6c02',
                  },
                  color: 'black',
                }} style={
                  value == 0
                    ? {
                        borderBottom: '3px solid #ed6c02',
                        color: '#ed6c02',
                      }
                    : null
                }/>
          <Tab label="Day2" {...a11yProps(1)} sx={{
                  ':hover': {
                    bgcolor: '#ffd796', // theme.palette.primary.main
                    color: '#ed6c02',
                  },
                  color: 'black',
                }} 
                 style={
                  value == 1
                    ? {
                        borderBottom: '3px solid #ed6c02',
                        color: '#ed6c02',
                      }
                    : null
                }
                />
        </Tabs>
      </Box>
      <TabPanel value={value} index={0}>
       <Stack>
        <Typography style={{fontWeight:700,fontSize:25}}>
            Self Shakti Training Batch 
        </Typography>
     
        <Typography mt={3} mb={2}>
        {batch?.data?.name}
        </Typography>
        <Typography mb={2}>
        {/* {moment(batch?.data?.day1_actual)?.format('DD-MM-YYYY')} */}
        {batch?.data?.day1?.split(" ")[0]}
        </Typography>
        <Divider />
        <Typography mt={2}>
            Start :{batch?.data?.day1?.split(" ")[1]}&nbsp;{batch?.data?.day1?.split(" ")[2]}
        </Typography>
   
        {(checkData?.data?.check_in_date_day1=="" && (batch?.data?.day1_actual?.split(" ")[0])==todaydate)?<Button style={{float:'left',position:'absolute',left:20,top:320,color:'#ff7424',marginTop:5,marginBottom:5}} onClick={()=>checkinout(1,batch?.data?.day1_id)} sx={{
             '&:hover': {
               backgroundColor: '#ffd796',
             },
             color: '#ff7424',
             backgroundColor: '#ffd796',
             marginLeft: '10px',
           }}>
            CHECK IN</Button>
        :<Button disabled style={{float:'left',position:'absolute',left:20,top:320,marginTop:5,marginBottom:5}}>CHECKIN</Button>
        
        }<br/><br/>
     
        {(checkData?.data?.check_in_date_day1!='')?<><Typography>
            Checked In  : {checkData?.data?.check_in_date_day1} &nbsp; {checkData?.data?.check_in_time_day1}
        </Typography>
        <Typography>
           Location  : {checkData?.data?.check_in_location_day1}
        </Typography></>:null}<br/> <Divider />
        {/* </>:null} */}
        <Typography mt={2}>
            End 
        </Typography>
     
        {(checkData?.data?.check_in_date_day1!='' && checkData?.data?.check_out_date_day1==''&& batch?.countOfSurvey>=3 )?<Button onClick={()=>checkinout(2,batch?.data?.day1_id)} style={{float:'left',position:'absolute',left:20,top:520,marginBottom:2,color:'#ff7424'}} sx={{
             '&:hover': {
               backgroundColor: '#ffd796',
             },
             color: '#ff7424',
             backgroundColor: '#ffd796',
             marginLeft: '10px',
           }}>
            CHECK OUT
        </Button>:<Button disabled style={{float:'left',position:'absolute',left:20,top:500,marginBottom:2}}>CHECKOUT</Button>}<br/><br/>
       {(checkData?.data?.check_out_date_day1!="")?<><Typography>
            Checked Out  : {checkData?.data?.check_out_date_day1} &nbsp; {checkData?.data?.check_out_time_day1}
        </Typography>
        <Typography>
           Location  :  {checkData?.data?.check_out_location_day1}
        </Typography></>:null}
       </Stack>
      </TabPanel>
      <TabPanel value={value} index={1}>
      <Stack>
        <Typography style={{fontWeight:700,fontSize:25}}>
            Self Shakti Training Batch 
        </Typography>
        <Typography mt={3} mb={2}>
        {batch?.data?.name}
        </Typography>
        <Typography mb={2}>
        {/* {moment(batch?.data?.day2_actual)?.format('DD-MM-YYYY')} */}
        {batch?.data?.day2?.split(" ")[0]}
        </Typography>
        <Divider />
        <Typography mt={2}>
            Start :{batch?.data?.day2?.split(" ")[1]}&nbsp;{batch?.data?.day2?.split(" ")[2]}
        </Typography>
        {(checkData?.data?.check_in_date_day2=='' && (batch?.data?.day2_actual?.split(" ")[0])==todaydate)?<Button sx={{
             '&:hover': {
               backgroundColor: '#ffd796',
             },
             color: '#ff7424',
             backgroundColor: '#ffd796',
             marginLeft: '10px',
           }} style={{float:'left',position:'absolute',left:20,top:320,color:'#ff7424',marginTop:5,marginBottom:5}} onClick={()=>checkinout(1,batch?.data?.day2_id)}>
            CHECK IN</Button>
        :<Button disabled style={{float:'left',position:'absolute',left:20,top:320,marginTop:5,marginBottom:5}}>CHECKIN</Button>
        
        }<br/><br/>
       
        {(checkData?.data?.check_in_date_day2!='')?<><Typography>
            Checked In  : {checkData?.data?.check_in_date_day2} &nbsp; {checkData?.data?.check_in_time_day2}
        </Typography>
        <Typography>
           Location  : {checkData?.data?.check_in_location_day2}
        </Typography></>:null}<br/> <Divider />
  
        <Typography mt={2}>
            End 
        </Typography>
        {(checkData?.data?.check_in_date_day2!='' && checkData?.data?.check_out_date_day2=='' )?<Button sx={{
             '&:hover': {
               backgroundColor: '#ffd796',
             },
             color: '#ff7424',
             backgroundColor: '#ffd796',
             marginLeft: '10px',
           }} onClick={()=>checkinout(2,batch?.data?.day2_id)} style={{float:'left',position:'absolute',left:20,top:520,marginTop:5,marginBottom:5,color:'#ff7424'}}>
            CHECK OUT
        </Button>:<Button disabled style={{float:'left',position:'absolute',left:20,top:500,marginBottom:10}}>CHECKOUT</Button>}<br/><br/><br/>
       {(checkData?.data?.check_out_date_day2!='')?<><Typography>
            Checked Out  : {checkData?.data?.check_out_date_day2} &nbsp; {checkData?.data?.check_out_time_day2}
        </Typography>
        <Typography>
           Location  :  {checkData?.data?.check_out_location_day2}
        </Typography></>:null}
       </Stack>
      </TabPanel>
    
    </Box>
      </Dialog>
    </div>
  );
}