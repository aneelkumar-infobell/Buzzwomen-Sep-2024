import * as React from 'react';
import Button from '@mui/material/Button';
import CloseIcon from '@mui/icons-material/Close';
import { Card,Dialog, CardContent,Divider,AppBar,Toolbar,IconButton,Typography,Slide } from '@mui/material';
import { Stack } from '@mui/system';
import moment from 'moment';
import axios from 'axios';
import { useState,useEffect } from 'react';
import { baseURL } from 'src/utils/api';
import { useAuth } from 'src/AuthContext';

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});
export default function CheckinGFL({ photos, setCheck, batch,getTrainingBatch ,getGFSessionData}) {
    const { apikey } = useAuth();
  const [open, setOpen] = React.useState(false);
  React.useEffect(() => {
    setOpen(photos)
    GetStatus()
  }, [photos])
  const handleClickOpen = () => {
    setCheck(true)
    setOpen(true);
    GetStatus();
  };
  const handleClose = () => {
    setCheck(false)
    setOpen(false);
  };
  const newTime = new Date()
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
  const handleChange = (event, newValue) => {
    setValue(newValue);
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
  //console.log(error,",----ewrwerwer");
});
      
    });
  },[])

  const checkinout = async(type) =>{
    var data = JSON.stringify({
      "location_name": location,
      "user_id": batch?.user_id,
      "lon": JSON.stringify(lats?.lng),
      "id": batch?.id,
      "type": JSON.stringify(parseInt(type)),
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
        GetStatus();
        getTrainingBatch()
        getGFSessionData()
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
     
      })
      .catch(function (error) {
        // console.log(error);
      });
  }
const GetStatus = async=>{
    var idvalue = JSON.parse(sessionStorage?.getItem('userDetails'))?.id;
    var data = JSON.stringify({
      event_id: batch?.id,
      user_id: idvalue,
      
    });
    var config = {
      method: 'post',
      url: baseURL + 'getEventDetail',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `${apikey}`
      },
      data: data,
    };
    axios(config)
      .then(function (response) {
        setCheckData(response.data);
      })
      .catch(function (error) {
        // console.log(error);
      });
}
  return (
    <div>
      <Dialog
        fullScreen
        open={open}
        
        onClose={handleClose}
        TransitionComponent={Transition}
      >
        <AppBar sx={{ position: 'relative', bgcolor: '#ff7424' }}>
          <Toolbar>
            <IconButton
              edge="start"
              color="inherit"
              onClick={handleClose}
              aria-label="close"
            >
              <CloseIcon />
            </IconButton>
            <Typography sx={{ ml: 2, flex: 1 }} variant="h6" component="div" style={{color:'white'}}>
              Check in / CheckOut 
            </Typography>
         
          </Toolbar>
        </AppBar>
<Card >
<CardContent>
<Stack>
        <Typography>
     Gelathi Session
        </Typography>
        <Typography mt={3} mb={2}>
        {batch?.data?.name}
        </Typography>
        <Typography mb={2}>
        {moment(batch?.data?.day1_actual)?.format('DD-MM-YYYY')}
        </Typography>
        <Divider />
        <Typography mt={2}>
            Start :{batch?.plan_date?.split(" ")[0]}
        </Typography><br/>
        {(checkData?.check_in=='')?
        <Button style={{float:'left',position:'absolute',left:20,top:170,color:'#ff7424',marginTop:5,marginBottom:5}} onClick={()=>checkinout(1)} sx={{
             '&:hover': {
               backgroundColor: '#ffd796',
             },
             color: '#ff7424',
             backgroundColor: '#ffd796',
             marginLeft: '10px',
           }}>
            CHECK IN</Button>
        :<Button disabled style={{float:'left',position:'absolute',left:20,top:160,marginTop:5,marginBottom:5}}>CHECK IN</Button>
        
        }<br/>
     
        {(checkData?.check_in!='')?<><Typography>
            Checked In  : {checkData?.check_in} 
        </Typography>
        <Typography>
           Location  : {checkData?.check_in_location}
        </Typography></>:null}<br/> <Divider />
        <Typography mt={2}>
            End :
        </Typography>
        {(checkData?.check_in!='' && checkData?.check_out=='' )?<Button onClick={()=>checkinout(2)} style={{float:'left',position:'absolute',left:20,top:350,marginBottom:2,color:'#ff7424'}} sx={{
             '&:hover': {
               backgroundColor: '#ffd796',
             },
             color: '#ff7424',
             backgroundColor: '#ffd796',
             marginLeft: '10px',
           }}>
            CHECK OUT
        </Button>:<Button disabled style={{float:'left',position:'absolute',left:20,top:350,marginBottom:2}}>CHECK OUT</Button>}<br/><br/>
       {(checkData?.check_out!="")?<><Typography>
            Checked Out  :{checkData?.check_out}
        </Typography>
        <Typography>
           Location  :  {checkData?.check_out_location}
        </Typography></>:null}
       </Stack>
</CardContent>
</Card>
       
      </Dialog>
    </div>
  );
}