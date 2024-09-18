import { useEffect, useState } from 'react';
import axios, * as others from 'axios';
import React from "react"
import dayjs from 'dayjs';
import AppBar from '@mui/material/AppBar';
import { Dialog, Toolbar ,Input,Button,IconButton,Typography,Slide,TextField,Stack,InputLabel,MenuItem,FormControl,Select} from '@mui/material'
import CloseIcon from '@mui/icons-material/Close';
import Geocode from "react-geocode";
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { useGeolocated } from "react-geolocated";
import Iconify from 'src/components/Iconify';
import moment from 'moment'
import InputAdornment from '@mui/material/InputAdornment';
import AttachMoneyIcon from '@mui/icons-material/AttachMoney';
import LocalPrintshop from '@mui/icons-material/LocalPrintshop';
import CurrencyRupee  from '@mui/icons-material/CurrencyRupee';
import DiamondRounded  from '@mui/icons-material/DiamondRounded';
import  Room  from '@mui/icons-material/Room';
import { baseURL } from 'src/utils/api';
import { useAuth } from 'src/AuthContext';
export default function TravelDialog({ viewMessage }) {
  const apikey = JSON.parse(sessionStorage.getItem('userDetails'))?.token
  Geocode.setApiKey("AIzaSyAQZSphbIdAeypWHytAIHtJ5K-wuUHBfx4");
  const [open, setOpen] = useState(false);
  const [imageId,setImageId]=useState('');
  const userid = JSON.parse(sessionStorage.getItem('userDetails'))?.id
  const [sendData, setSendData] = useState({
    odimeter: "",
    location: "",
    poa: "",
    // srpoa:"",
    date: new Date(),          
    modeoftravel: "",
    rateperkm: "",
    foodexpenses: "",
    telephonecharges: "",
    printing: "",
    stationery: "",
    otherExpenses: "",
    OtherAmount: "",
    endOdimeter: "",
    endLocation: "",
    totalkm: "",
    fairamount:""
  });
  const [datadrop, setDataDrop] = useState();
  const handleClickOpen = () => {
    setImage([]);
    setOpen(true);
  };
  const { coords, isGeolocationAvailable, isGeolocationEnabled } =
    useGeolocated({
      positionOptions: {
        enableHighAccuracy: false,
      },
      userDecisionTimeout: 5000,
    });
  const handleClose = () => {
    setOpen(false);
  };
  const [age, setAge] = useState('');
  const handleChange = (event) => {
    setAge(event.target.value);
  };
  useEffect(() => {
    drop()
    location()
    setSendData([])
   
  }, [coords,open]
  )
  const [image, setImage] = React.useState([]);
  const [imagePath, setImagePath] = React.useState([]);
  const [viewImage, setViewImage] = React.useState(false);
  const [locationS,setLocation] = useState()
  const hiddenFileInput = React.useRef(null);
  const [dropDownValues, setDropDownValues] = useState([])
  const today = dayjs();
  const handleClick = event => {
    hiddenFileInput.current.click();
  };
  function getBase64(file, callback) {
    const reader = new FileReader();
    reader.addEventListener('load', () => callback(reader.result));
    reader.readAsDataURL(file);
  }
  const data = new FormData();
  const convertImage = (e) => {
    data.append('emp_id', userid);
    data.append('file', e.target.files[0]);
    setImagePath([...imagePath, e.target.files[0]])
    const imageData = URL.createObjectURL(e.target.files[0]);
    getBase64(e.target.files[0], function (base64Data) {
      setImage([...image, base64Data])
      setViewImage(true)
    });
  }
  const uiphoto = async =>{
    if(image.length===0){
      alert("No photos to upload.")
      throw new Error('No photos to upload.');
    }
    var dataImage = []
    const form = new FormData()
    form?.append("emp_id", userid)
    const data = imagePath?.map(itm => {
      form?.append("file[]", itm)
    })
   
var requestOptions = {
  method: 'POST',
  body: form,
  redirect: 'follow',
  headers: { 
    'Authorization': `${apikey}`
  },
};
fetch("https://bdms.buzzwomen.org/appGo/taAttachments", requestOptions)
  .then(response => response.text())
  .then(result => setImageId(JSON.parse(result)))
  alert("Uploaded Successfully")
  .catch(error => {
    // console.log('error', error)
  });
  }
var Uimagelength = imageId?.data?.slice(-1)
var Imagevalue = [(Uimagelength)?Uimagelength[0]?.id :""]
  const SendData = async => {
    var data = JSON.stringify({
      "date": moment(sendData?.date)?.format('YYYY-MM-DD'),
      "insideBangalore": "false",
      "end_odometer": (sendData?.endOdimeter)?sendData?.endOdimeter:'',
      "telephone": (sendData?.telephonecharges==1)?"249":"0",
      "end_location_name":locationS,
      "fare_amount":(sendData?.fairamount)?sendData?.fairamount:"",
      "printing": sendData?.printing,
      "start_location_name": locationS,
      "poa_id": JSON.stringify(sendData?.poa),
      "start_odometer": (sendData?.odimeter)?sendData?.odimeter:'',
      "rate_per_KM": (sendData?.rateperkm)?sendData?.rateperkm:'',
      "stationery": sendData?.stationery,
      "klmtr": (sendData?.totalkm)?sendData?.totalkm:'',
      "da": JSON.stringify(sendData?.foodexpenses),
      "others": sendData?.otherExpenses,
      "emp_id":userid,
      "mode_of_travel": JSON.stringify(sendData?.modeoftravel),
      "other_text": sendData?.OtherAmount,
      "files": [parseInt(Imagevalue)]
    
    });
    var config = {
      method: 'post',
      url: baseURL + 'addNewTA',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `${apikey}`
      },

      data: data
    };
    axios(config)
      .then(function (response) {
       {(response.data.message=="Added Successfully") ?viewMessage(response.data.message):alert(response.data.message)}
       handleClose()
       setImageId('')
      })
      .catch(function (error) {
        // console.log(error);
        
        alert(response.message)
      });
  }
 
  useEffect(()=>{
    navigator.geolocation.getCurrentPosition(function(position) {
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
  const location = () => {
    Geocode.fromLatLng(coords?.latitude, coords?.longitude).then(
      (response) => {
        const address = response.results[0].formatted_address;
      },
      (error) => {
        // console.error(error);
      }
    );
  }
  const drop = async => {
    var role = JSON.parse(sessionStorage.getItem('userDetails'))?.role
    var userid = JSON.parse(sessionStorage.getItem('userDetails'))?.id
    var data = JSON.stringify({
      "emp_id": userid,
     
    });
    var config = {
      method: 'post',
      url: baseURL+'getPoaTa',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `${apikey}`
      },
      data: data
    };
    axios(config)
      .then(function (response) {
        setDataDrop(response.data)
        const date = moment(new Date()).format('YYYY-MM-DD')
        let dropDownValues = response.data.data.filter(x=> {
          const date1 = moment(x.date)?.format('YYYY-MM-DD')
          return  date1=== date;
        })
        setDropDownValues(dropDownValues);
      })
      .catch(function (error) {
        // console.log(error);
      });
  }
  const deleteImage = (index) => {
    image.splice(index, 1);
    setImage([...image])
  }
  const userDetails = sessionStorage?.getItem('userId')
  return (
    <div>
{( userDetails ==3 ||userDetails==4 || userDetails==5 || userDetails==6 || userDetails==12 || userDetails==13)?<Button variant="contained" style={{
        float: "right", marginLeft: "1rem", borderRadius: "50%", padding: "0.2rem", marginTop: "-0.5rem",
        position: 'fixed', zIndex: '1', bottom: 40, right: 40
      }} onClick={handleClickOpen} sx={{
        ':hover': {
          bgcolor: '#ffd796', // theme.palette.primary.main
          color: '#ff7424',
          border: '#ffd796'
        },
        ':active': {
          bgcolor: '#ffd796',
          color: "#ff7424"
        },
        bgcolor: '#ffd796',
        color: "#ff7424",
        border: 'none'
      }} >
        <span style={{ fontSize: "2rem" }}>+</span>
      </Button>:null}
      <Dialog fullScreen open={open} onClose={handleClose}
        aria-labelledby="scroll-dialog-title"
        aria-describedby="scroll-dialog-description">
      <form onSubmit={(e)=>{e.preventDefault(); SendData()}}>
      <AppBar sx={{ position: 'fixed', bgcolor: '#ff7424' }}>
        <Toolbar sx={{ bgcolor: '#ff7424', color: 'white' }} >
          <IconButton edge="start" sx={{ color: "inherit" }} onClick={handleClose} aria-label="close">
            <CloseIcon />
          </IconButton>
          <Typography sx={{ ml: 2, flex: 1, color: "inherit" }} variant="h6" component="div" >
            Create Allowance
          </Typography>
          <Button autoFocus color="inherit" type="submit">
          <Iconify icon="material-symbols:save" width={30} height={30} />
          </Button>
        </Toolbar>
        </AppBar>
 
            <div style={{ margin: "1rem" }}>
            <Stack style={{ marginTop: 90 }}>
                <FormControl fullWidth>
                  <InputLabel id="demo-simple-select-label" style={{ flexDirection: 'row', color: '#ff7424'}}>{sendData?.modeoftravel==""?"Select Mode of Travel":"Mode of Travel"}</InputLabel>
                  <Select required variant="standard" color="common" sx={{ fontSize: '13px' }}
                    labelId="Select Mode Of Travel"
                    id="demo-simple-select"
                    value={sendData?.modeoftravel}
                    onChange={(e) => setSendData({ ...sendData, modeoftravel: e?.target?.value })}
                    label="select Mode Of Travel"
                  >
                    {datadrop?.Mode_of_Travel?.map(itm => {
                      return (<MenuItem value={itm?.id}>{itm?.name}</MenuItem>)
                    })}
                  </Select>
                </FormControl>
              </Stack><br></br>
            
              {(sendData?.modeoftravel&&sendData?.modeoftravel===1 | sendData?.modeoftravel===4 | sendData?.modeoftravel===5 | sendData?.modeoftravel===6)?<Stack style={{ marginTop: 20 }}>
                <TextField required id="outlined-basic" type="number" onChange={(e) => { setSendData({ ...sendData, fairamount: e?.target?.value }) }} label="Fair amount" variant="outlined" color="common" />
              </Stack>:
              <Stack style={{ marginTop: 20 }}>
                <FormControl fullWidth>
                  <InputLabel id="demo-simple-select-label" style={{ flexDirection: 'row', color: '#ff7424'}}>{sendData?.rateperkm==""?"Select Rate per KM":"Rate per KM"}</InputLabel>
                  <Select required variant="standard" color="common" sx={{ fontSize: '13px' }}
                    labelId="Select Rate Per Km"
                    id="demo-simple-select"
                    value={sendData?.rateperkm}
                    label="Select Rate Per Km"
                    onChange={(e) => setSendData({ ...sendData, rateperkm: e?.target?.value })}
                  >
                    {/* {datadrop?.Rate_per_KM?.map(itm => {
                      return (<MenuItem value={itm?.amount}>{itm?.amount}</MenuItem>)
                    })} */}
                    {(sendData?.modeoftravel&&sendData?.modeoftravel===3)?<MenuItem value="3.5">Rs 3.50/Km</MenuItem>:<MenuItem value="10">Rs 10/km</MenuItem>}
                  </Select>
                </FormControl>
              </Stack> 
              
              }<br></br>
                {   (sendData?.modeoftravel&&sendData?.modeoftravel===3 || sendData?.modeoftravel&&sendData?.modeoftravel===2 )?   <Stack style={{ marginTop: 20 }}>
             <TextField id="outlined-basic" 
              type="number"  
inputProps={{inputmode: 'numeric',pattern: '[0-9]*' }} onChange={(e) => { setSendData({ ...sendData, odimeter: e?.target?.value }) }} label="Start Odometer Reading *" variant="outlined" color="common" 
             />
           </Stack>:null}
        
              <Stack style={{ marginTop: 20 ,color:'black'}}>
                <TextField id="outlined-basic" value={locationS} disabled={true} onChange={(e) => { setSendData({ ...sendData, location: e?.target?.value }) }} label="Start Location" variant="outlined" color="common" 
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="start">
                    <Room sx={{color:"green"}} />
                    </InputAdornment>
                   ),
               }}  />
              </Stack><br></br>
      
              <Stack style={{ marginTop: 20 }}>       
             <FormControl fullWidth >
         
              <InputLabel id="demo-simple-select-label" style={{ flexDirection: 'row', color: '#ff7424'}}>{sendData?.poa==""?"Select POA *":"POA *"}</InputLabel>
                {(datadrop?.data?.length>0)?<Select required labelId="Select Poa" id="demo-simple-select" value={sendData?.poa} label="Select Poa" onChange={(e) => setSendData({ ...sendData, poa: e?.target?.value })} variant="standard" color="common">
                  {datadrop?.data.map(itm => {
                    return (<MenuItem value={itm?.id}>{itm?.name}</MenuItem>)
                  })}
                </Select>:<Typography variant="body2" style={{marginLeft:20,marginTop:40}}>No POA</Typography>}
                </FormControl>
              </Stack>
              <Stack style={{ marginTop: 20 }}>
                <LocalizationProvider dateAdapter={AdapterDayjs}>
                  <DatePicker
                    required
                    inputFormat="YYYY-MM-DD"
                    minDate={today}
                    views={["year", "month", "day"]}
                    value={sendData?.date}
                    onChange={(newValue) => {
                      setSendData({ ...sendData, date: newValue })
                    }}
                    renderInput={(params) => <TextField {...params} fullWidth />}
                  />
                </LocalizationProvider>
              </Stack>
              <br></br>
   
             
              <Stack style={{ marginTop: 20 }}>
                <FormControl fullWidth>
                  <InputLabel id="demo-simple-select-label" style={{ flexDirection: 'row', color: '#ff7424'}}>{sendData?.foodexpenses==""?"Select Food Expenses":"Food Expenses"}</InputLabel>
                  <Select required variant="standard" color="common" sx={{ fontSize: '13px' }}
                    labelId="Select Food Expenses"
                    id="demo-simple-select"
                    value={sendData?.foodexpenses}
                    label="Select Food Expenses"
                    onChange={(e) => setSendData({ ...sendData, foodexpenses: e?.target?.value })}
                  >
                    {datadrop?.DA?.map(itm => {
                      return (<MenuItem value={itm?.amount}>{itm?.name}</MenuItem>)
                    })}
                  </Select>
                </FormControl>
              </Stack><br></br>
              <Stack style={{ marginTop: 20 }}>
                <h4>Other Benefits</h4>
              </Stack>
              <Stack style={{ marginTop: 20 }}>
                <FormControl fullWidth>
                  <InputLabel id="demo-simple-select-label" style={{ flexDirection: 'row', color: '#ff7424'}}>{sendData?.telephonecharges==""?"Select Phone Charges":"Phone Charges"}</InputLabel>
                  <Select required variant="standard" color="common" sx={{ fontSize: '13px' }}
                    labelId="Select Phone Charges"
                    id="demo-simple-select"
                    value={sendData?.telephonecharges}
                    label="Select Phone Charges"
                    onChange={(e) => setSendData({ ...sendData, telephonecharges: e?.target?.value })}
                  >
                    {datadrop?.telephone?.map(itm => {
                      return (<MenuItem value={itm.id}>{itm.name}</MenuItem>)
                    })}
                  </Select>
                </FormControl>
              </Stack>
              <Stack style={{ marginTop: 20 }}>
                <TextField id="outlined-basic" type="number" onChange={(e) => { 
                
                  setSendData({ ...sendData, printing: e?.target?.value }) }} label="printing" variant="outlined" color="common" 
                InputProps={{
                     endAdornment: (
                       <InputAdornment position="start">
                       <LocalPrintshop color="secondary" />
                       </InputAdornment>
                      ),
                  }} />
              
              </Stack>
              <Stack style={{ marginTop: 20 }}>  
                <TextField id="outlined-basic" type="number" onChange={(e) => { setSendData({ ...sendData, stationery: e?.target?.value }) }} label="stationery" variant="outlined" color="common" 
                InputProps={{
                     endAdornment: (
                       <InputAdornment position="start">
                       <AttachMoneyIcon />
                       </InputAdornment>
                      ),
                  }} />
              </Stack>
              <Stack style={{ marginTop: 20 }}>
                <TextField id="outlined-basic" onChange={(e) => { setSendData({ ...sendData, otherExpenses: e?.target?.value }) }} label="Other Expenses" variant="outlined" color="common"
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="start">
                  
                  <DiamondRounded sx={{color:"red"}}/>
                    </InputAdornment>
                   ),
               }}  />
              </Stack>
              <Stack style={{ marginTop: 20 }}>
                <TextField id="outlined-basic" type="number" onChange={(e) => { setSendData({ ...sendData, OtherAmount: e?.target?.value }) }} label="Other Expenses Amount" variant="outlined" color="common" 
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="start">
                    <CurrencyRupee sx={{color:"green"}}/>
                    </InputAdornment>
                   ),
               }} />
              </Stack>
           { (sendData?.modeoftravel&&sendData?.modeoftravel===3 || sendData?.modeoftravel&&sendData?.modeoftravel===2 )?   <Stack style={{ marginTop: 20 }}>
                <TextField id="outlined-basic" type="number" onChange={(e) => { setSendData({ ...sendData, endOdimeter: e?.target?.value }) }} label="End Odometer Reading" variant="outlined" color="common" />
              </Stack>: null}
              <Stack style={{ marginTop: 20 }}>
                <TextField id="outlined-basic" disabled={true} value={locationS} onChange={(e) => { setSendData({ ...sendData, endLocation: e?.target?.value }) }} label="End Location" variant="outlined" 
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="start">
                    <Room sx={{color:"green"}} />
                    </InputAdornment>
                   ),
               }}   />
              </Stack>
              {(sendData?.modeoftravel&&sendData?.modeoftravel===3 || sendData?.modeoftravel&&sendData?.modeoftravel===2 )?<Stack style={{ marginTop: 20 }}>
                <TextField required type="number" id="outlined-basic" onChange={(e) => { setSendData({ ...sendData, totalkm: e?.target?.value }) }} label="Total Kilometer" variant="outlined" color="common"   />
              </Stack>:null}
              <br /><br /> 
            </div></form> 
              <div>
                <div style={{ display: "flex" }}>
                  {
                    viewImage ?
                      image.map((i, index) => {
                        return <div style={{ display: "flex", margin: "1rem" }}>
                          <img src={i} style={{ height: "50px", width: "70px" }} alt="hello" />
                          <Iconify
                            onClick={() => { deleteImage(index) }}
                            icon={'typcn:delete'}
                            sx={{ width: 16, height: 16, ml: 1, color: "red" }}
                          />
                        </div>
                      }) : null
                  }
                </div>
                <div style={{display:'flex'}}>
                <label for="inputTag" style={{ cursor: "pointer", display: "flex" }}>
                  <Iconify
                    icon={'mdi:camera'}
                    sx={{ width: 25, height: 25, ml: 2, color: "#ff7424" }}
                  />&nbsp;
                  Click here to Add images
                  <input style={{ display: "none" }} accept="image/png, image/gif, image/jpeg" id="inputTag" type="file" onChange={(e) => { convertImage(e) }} />
                </label>
                <Button onClick={uiphoto} 
                sx={{
                  '&:hover': {
                    backgroundColor: '#ffd796',
                  },
                  color: "#ff7424",
                  backgroundColor:'#ffd796',
                  marginLeft:'10px'
                }}>Upload</Button></div>
              </div>
           </Dialog>
    </div>
  );
}