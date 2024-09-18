import { useEffect, useState } from 'react';
import axios from 'axios';
import React from "react"
import Button from '@mui/material/Button';


import { Input } from '@mui/material';

import ListItemText from '@mui/material/ListItemText';
import ListItem from '@mui/material/ListItem';
import List from '@mui/material/List';
import Divider from '@mui/material/Divider';
import AppBar from '@mui/material/AppBar';
import { Dialog, Toolbar, DialogContent, DialogContentText, Card } from '@mui/material'
import PropTypes from 'prop-types';

import { baseURL } from 'src/utils/api';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import CloseIcon from '@mui/icons-material/Close';
import Slide from '@mui/material/Slide';
import TextField from '@mui/material/TextField';
import Stack from '@mui/material/Stack';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import Geocode from "react-geocode";
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import FormHelperText from '@mui/material/FormHelperText';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { useGeolocated } from "react-geolocated";
import Iconify from 'src/components/Iconify';
import moment from 'moment'
import { orange } from '@mui/material/colors';
import Webcam from "react-webcam";
import { useAuth } from 'src/AuthContext';
function getRandomNumber(min, max) {
  return Math.round(Math.random() * (max - min) + min);
}
const orangecolor = orange[800];
 

Edittraveldialog.propTypes = {
  isOpenFilter: PropTypes.bool,
  onOpenFilter: PropTypes.func,
  onCloseFilter: PropTypes.func,
};


export default function Edittraveldialog({ isOpenFilter, onOpenFilter, onCloseFilter, viewMessage, editData, list }) {
  const { apikey } = useAuth();
  Geocode.setApiKey("AIzaSyAQZSphbIdAeypWHytAIHtJ5K-wuUHBfx4");
  const [open, setOpen] = useState(true);
  const [startTime, setStartTime] = useState('');
  const [images, setImages] = useState();
  const [upload, setUpload] = useState();
  const [taData,setTaData]=useState();

  const [sendData, setSendData] = useState(editData);



  const [imgSrc, setImgSrc] = React.useState(null);
  const [datadrop, setDataDrop] = useState();
  const handleClickOpen = () => {
    setOpen(true);
  };

  const userid = JSON.parse(sessionStorage.getItem('userDetails'))?.id
  
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
  }, [coords]
  )

  useEffect(() => {
    setSendData(editData)
  }, [])

  const [image, setImage] = React.useState([]);
  const [imagePath, setImagePath] = React.useState([]);
  const [viewImage, setViewImage] = React.useState(false);
  const hiddenFileInput = React.useRef(null);

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
  
  const postImages = async () => {
    if (image.length === 0) {
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
    let res = fetch("https://bdms.buzzwomen.org/appGo/taAttachments", requestOptions).then(itn => {
      // console.log(itn, "<--itemgh")
    })
      .catch(err => {
        // console.log(err, "<---wertyu")
      })

  }

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
      "emp_id":userid,
      "role_id": role,
      "date": "2022/08/11"
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
      })
      .catch(function (error) {
        // console.log(error);
      });
  }

  const deleteImage = (index) => {
    image.splice(index, 1);
    setImage([...image])
  }
  useEffect(() => {
getTadata()
  
  }, [editData]
  )
  const getTadata=()=>{
    var data = JSON.stringify({
      "ta_id": editData?.id
    });
    
    var config = {
      method: 'post',
      url: baseURL + 'getTa',
      headers: { 
        'Content-Type': 'application/json',
        'Authorization': `${apikey}`
      },
      data : data
    };
    
    axios(config)
    .then(function (response) {
      setTaData(response.data)
    })
    .catch(function (error) {
      // console.log(error);
    });
    
  }

  return (
    <div>
      <Dialog id="edit-ta-dialog" fullScreen open={isOpenFilter} onClose={onCloseFilter}
        aria-labelledby="scroll-dialog-title"
        aria-describedby="scroll-dialog-description">
        {/* <AppBar sx={{ position: 'relative', bgcolor: '#ff7424' }}> */}
        <Toolbar id="edit-ta-toolbar" sx={{ bgcolor: '#ff7424', color: 'white' }} >
          <IconButton id="close-icon" edge="start" sx={{ color: "inherit" }} onClick={onCloseFilter} aria-label="close">
            <CloseIcon />
          </IconButton>
          <Typography id="edit-travel-allowances" sx={{ ml: 2, flex: 1, color: "inherit" }} variant="h6" component="div" >
            View Travel Allowance
          </Typography>
        </Toolbar>
        <DialogContent dividers={scroll === 'paper'} sx={{ background: "#f9fafb" }}>
          <DialogContentText
            id="scroll-dialog-description"
            tabIndex={-1}
          >
            <div style={{ margin: "1rem" }}>


              {(editData?.modeoftravel && editData?.modeoftravel===3 )? <Stack style={{ marginTop: 20 }}>
                <TextField  disabled type="number" id="outlined-basic" defaultValue={editData?.start_odometer} onChange={(e) => { setSendData({ ...sendData, start_odometer: e?.target?.value }) }} label="Start Odometer Reading" variant="outlined" color="common" />
              </Stack>:null}


              <Stack id="location" style={{ marginTop: 20 }}>
                <TextField disabled defaultValue={editData?.start_location_name} id="outlined-basic" onChange={(e) => { setSendData({ ...sendData, start_location_name: e?.target?.value }) }} label="Location" variant="outlined" color="common" />
              </Stack><br></br>
              <Stack id="form" style={{ marginTop: 20 }}>
                <FormControl fullWidth >
                  <InputLabel disabled id="demo-simple-select-label" style={{ flexDirection: 'row', color: '#ff7424', fontWeight: 700 }}>Poa</InputLabel>
                  <Select disabled labelId="Select Poa" id="demo-simple-select" defaultValue={editData?.poa_id} label="Poa" onChange={(e) => setSendData({ ...sendData, poa_id: e?.target?.value })} variant="standard" color="common">
                    {datadrop?.data?.map(itm => {
                      return (<MenuItem value={itm?.id}>{itm?.name}</MenuItem>)
                    })}
                  </Select>
                </FormControl>

              </Stack><br></br>

              <Stack id="date-pickers" style={{ marginTop: 20 }}>
                <LocalizationProvider dateAdapter={AdapterDayjs}>
                  <DatePicker
                  disabled
                    id="edit-data-date"
                    defaultValue={editData?.date}
                    onChange={(newValue) => {
                      setSendData({ ...sendData, date: newValue })
                    }}
                    renderInput={(params) => <TextField disabled {...params} fullWidth />}
                  />
                </LocalizationProvider>
              </Stack><br></br>
              <Stack id="mode-of-travel" style={{ marginTop: 20 }}>
                <FormControl fullWidth>
                  <InputLabel id="demo-simple-select-label" style={{ flexDirection: 'row', color: '#ff7424', fontWeight: 700 }}>Mode Of Travel</InputLabel>
                  <Select disabled variant="standard" color="common" sx={{ fontSize: '13px' }}
                    labelId="Select Mode Of Travel"
                    id="demo-simple-select"
                    defaultValue={editData?.mode_of_travel}
                    onChange={(e) => setSendData({ ...sendData, mode_of_travel: e?.target?.value })}
                    label="select Mode Of Travel"



                  >
                    {datadrop?.Mode_of_Travel?.map(itm => {
                      return (<MenuItem value={itm?.id}>{itm?.name}</MenuItem>)
                    })}
                  </Select>
                </FormControl>
              </Stack><br></br>
              {(editData?.modeoftravel&&editData?.modeoftravel===1 | editData?.modeoftravel===4 | editData?.modeoftravel===5 | editData?.modeoftravel===6)?
              <Stack id="rate-per-km" style={{ marginTop: 20 }}>
                <FormControl fullWidth>
                  <InputLabel id="demo-simple-select-label" style={{ flexDirection: 'row', color: '#ff7424', fontWeight: 700 }}>Rate Per Km</InputLabel>
                  <Select disabled variant="standard" color="common" sx={{ fontSize: '13px' }}
                    labelId="Select Rate Per Km"
                    id="demo-simple-select"
                    defaultValue={editData?.rate_per_KM}
                    label="Select Rate Per Km"
                    onChange={(e) => setSendData({ ...sendData, rate_per_KM: e?.target?.value })}
                  >
                    {datadrop?.Rate_per_KM?.map(itm => {
                      return (<MenuItem value={itm?.amount}>{itm?.amount}</MenuItem>)
                    })}
                  </Select>
                </FormControl>
              </Stack>:null}<br></br>
              <Stack style={{ marginTop: 20 }}>
                <FormControl fullWidth>
                  <InputLabel id="demo-simple-select-label" style={{ flexDirection: 'row', color: '#ff7424', fontWeight: 700 }}>Food Expenses </InputLabel>
                  <Select disabled variant="standard" color="common" sx={{ fontSize: '13px' }}
                    labelId="Select Food Expenses"
                    id="demo-simple-select"
                    defaultValue={editData?.da}
                    label="Select Food Expenses"
                    onChange={(e) => setSendData({ ...sendData, da: e?.target?.value })}
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
              <Stack id="phone-charges" style={{ marginTop: 20 }}>
                <FormControl fullWidth>
                  <InputLabel id="demo-simple-select-label" style={{ flexDirection: 'row', color: '#ff7424', fontWeight: 700 }} >Phone Charges</InputLabel>
                  <Select disabled variant="standard" color="common" sx={{ fontSize: '13px' }}
                    labelId="Select Phone Charges"
                    id="demo-simple-select"
                    defaultValue={editData?.telephone}
                    label="Select Phone Charges"
                    onChange={(e) => setSendData({ ...sendData, telephone: e?.target?.value })}
                  >
                    {datadrop?.telephone?.map(itm => {
                      return (<MenuItem value={itm}>{itm}</MenuItem>)
                    })}
                  </Select>
                </FormControl>
              </Stack>

              <Stack style={{ marginTop: 20 }}>
                <TextField disabled id="outlined-basic" defaultValue={editData?.printing} onChange={(e) => { setSendData({ ...sendData, printing: e?.target?.value }) }} label="Printing" variant="outlined" color="common" />
              </Stack>
              <Stack style={{ marginTop: 20 }}>
                <TextField disabled id="outlined-basic" defaultValue={editData?.stationery} onChange={(e) => { setSendData({ ...sendData, stationery: e?.target?.value }) }} label="Stationary" variant="outlined" color="common" />
              </Stack>
              <Stack style={{ marginTop: 20 }}>
                <TextField disabled defaultValue={editData?.others} id="outlined-basic" onChange={(e) => { setSendData({ ...sendData, others: e?.target?.value }) }} label="other expenses" variant="outlined" color="common" />
              </Stack>
              <Stack style={{ marginTop: 20 }}>
                <TextField disabled id="outlined-basic" defaultValue={editData?.other_text} onChange={(e) => { setSendData({ ...sendData, other_text: e?.target?.value }) }} label="other expenses amounnt" variant="outlined" color="common" />
              </Stack>
              <Stack style={{ marginTop: 20 }}>
                <TextField disabled id="outlined-basic" defaultValue={editData?.end_odometer} onChange={(e) => { setSendData({ ...sendData, end_odometer: e?.target?.value }) }} label="end odometer reading" variant="outlined" color="common" />
              </Stack>
              <Stack style={{ marginTop: 20 }}>
                <TextField disabled id="outlined-basic" defaultValue={editData?.end_location_name} onChange={(e) => { setSendData({ ...sendData, end_location_name: e?.target?.value }) }} label="end location" variant="outlined" color="common" />
              </Stack>
             {(editData?.klmtr>0)? <Stack style={{ marginTop: 20 }}>
                <TextField disabled id="outlined-basic" defaultValue={editData?.klmtr} onChange={(e) => { setSendData({ ...sendData, klmtr: e?.target?.value }) }} label="Total Kilometer" variant="outlined" color="common" />
              </Stack>:null}
              <br /><br />
            <div>
                <div style={{ display: "flex" }}>
                  {
                    viewImage ?
                      image.map((i, index) => {
                        return <div style={{ display: "flex", margin: "1rem" }}>
                          <img id="img-hello" src={i} style={{ height: "50px", width: "70px" }} alt="hello" />
                          <Iconify
                            id="delete-image-icon"
                            onClick={() => { deleteImage(index) }}
                            icon={'typcn:delete'}
                            sx={{ width: 16, height: 16, ml: 1, color: "red" }}
                          />
                        </div>
                      }) : null
                  }
                </div>
<div><Typography variant="h6">Uploaded Images</Typography> <br/>
  {(taData?.files?.length>0)?<img src={taData?.files[0]?.image_name}/>:"No Images Found"}
</div>

              </div>

 </div>
          </DialogContentText></DialogContent>  </Dialog>
    </div>
  );
}



















