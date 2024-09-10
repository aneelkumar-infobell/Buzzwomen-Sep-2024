import { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import PropTypes from 'prop-types';
import Iconify from '../../../components/Iconify';
import Scrollbar from '../../../components/Scrollbar';
import Avatar from '@mui/material/Avatar';
import { useGeolocated } from 'react-geolocated';
import Geocode from 'react-geocode';
import React from 'react';
import {
  Grid,
  Box,
  Radio,
  Stack,
  Button,
  Drawer,
  Rating,
  Divider,
  Checkbox,
  FormGroup,
  IconButton,
  Typography,
  RadioGroup,
  Card,
  CardContent,
} from '@mui/material';
import CircularProgress from '@mui/material/CircularProgress'
import is from 'date-fns/locale/is';
import { baseURL } from 'src/utils/api';
PoaFilter.propTypes = {
  isOpenEvent: PropTypes.bool,
  onOpenEvent: PropTypes.func,
  onCloseEvent: PropTypes.func,
};
import { useAuth } from 'src/AuthContext';
export default function PoaFilter({ isOpenEvent, onCloseEvent, select, useridvalue , changeState ,clickedItemData}) {
    const { apikey } = useAuth();
  const [locationS, setLocation] = useState();
  const [checkin, setCheckIn] = useState('');
  const [checkout, setCheckout] = useState('');
  const [checkvisible, setCheckvisible] = useState(false);
  const [image, setImage] = React.useState([]);
  const [imagePath, setImagePath] = React.useState([]);
  const [type, setType] = React.useState('1');
  const [viewImage, setViewImage] = React.useState(false);
  const [eventdetails, seteventdetails] = React.useState(false);
  const userid = JSON.parse(sessionStorage.getItem('userDetails'))?.id;
  const [locationdata, setlocationdata] = React.useState('');
  const hiddenFileInput = React.useRef(null);
  var idvalue = JSON.parse(sessionStorage?.getItem('userDetails'))?.id;
  const [eventData, setEventData] = useState('');
  const [addImage, setAddImage] = useState('');
  const role = JSON.parse(sessionStorage?.getItem('userDetails'))?.role
  const [showCheckoutBtn , setCheckoutBtn] = useState(true)
  function getBase64(file, callback) {
    const reader = new FileReader();
    reader.addEventListener('load', () => callback(reader.result));
    reader.readAsDataURL(file);
  }
  const data = new FormData();
  const convertImage = (e) => {
    data.append('emp_id', userid);
    data.append('file', e.target.files[0]);
    setImagePath([...imagePath, e.target.files[0]]);
    const imageData = URL.createObjectURL(e.target.files[0]);
    getBase64(e.target.files[0], function (base64Data) {
      setImage( [base64Data]);
      setViewImage(true);
    });
  };
  const [isLoading, setISLoading] = useState(false)
  const postImages = async () => {
    if (image.length === 0) {
      alert("No image to upload");
      return;
    }
    
    setISLoading(true);
  
    var dataImage = JSON.stringify({
      "event_id": eventdetails.event_id, 
      "photos": image.toString().slice(22,)
    });
  
    var requestOptions = {
      method: 'POST',
      body: dataImage,
      redirect: 'follow',
      headers: { 
        'Authorization': `${apikey}`
      },
    };
  
    let res = fetch('https://bdms.buzzwomen.org/appGoGambia/uploadEventPhotos', requestOptions)
      .then((itn) => {
        setImage([])
        alert("Image uploaded successfully..")
        setISLoading(false)
      });
  }
  const deleteImage = (index) => {
    image.splice(index, 1);
    setImage([...image]);
  };
  const { coords, isGeolocationAvailable, isGeolocationEnabled } = useGeolocated({
    positionOptions: {
      enableHighAccuracy: false,
    },
    userDecisionTimeout: 5000,
  });
  useEffect(() => {
    let isSubscribe = true
    if(isSubscribe)
    {
    location();
    getlocationdata()
  }
  return ()=>{
    isSubscribe = false
  }
  }, [coords ,locationdata]);
  useEffect(()=>{
    let isSubscribe = true
    if(isSubscribe)
    {
      event()
      getlocationdata()
    }
    return ()=>{
      isSubscribe = false
    }
    
  },[locationdata ,image])
  useEffect(() => {
    navigator.geolocation.getCurrentPosition(function (position) {
      var data = JSON.stringify({
        latitude: JSON.stringify(position.coords.latitude),
        longitude:JSON.stringify( position.coords.longitude),
      });
      var config = {
        method: 'post',
        url: baseURL + 'getlocationName',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `${apikey}`
        },
        data: data,
      };
      axios(config)
        .then(function (response) {
          setLocation(response?.data);
        })
        .catch(function (error) {
          // console.log(error, ',----ewrwerwer');
        });
    });
  }, []);
  const postlocation = (async) => {
    var idvalue = JSON.parse(sessionStorage?.getItem('userDetails'))?.id;
    navigator.geolocation.getCurrentPosition(function (position) {
      var data = JSON.stringify({
        location_name: locationS,
        user_id: idvalue,
        lon: JSON.stringify(position.coords.longitude),
        id: select?.id,
        type: JSON.stringify(parseInt(type)),
        lat: JSON.stringify(position.coords.latitude),
      });
      var config = {
        method: 'post',
        url: baseURL + 'checkInOut',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `${apikey}`
        },
        data: data,
      };
      axios(config)
        .then(function (response) {
if (response.message === "Check Out Successfully"){
  setCheckout("change")
}else if(response.message === "Check In Successfully"){
  setCheckIn("changes")
}
          setlocationdata(response.data);
        })
        .catch(function (error) {
          // console.log(error);
        });
    });
  };
  const location = () => {
    Geocode.fromLatLng(coords?.latitude, coords?.longitude).then(
      (response) => {
        const address = response.results[0].formatted_address;
      },
      (error) => {
        // console.error(error);
      }
    );
  };
  const [idEvent, setIdEvent] = [
    {
      event_id: '',
      user_id: '',
    },
  ];
  useEffect(() => {
    let isSubscribe = true
    if(isSubscribe)
    {
      event();
      getlocationdata()
    }
    return ()=>{
      isSubscribe = false
    }
   
  }, [select ,locationdata,checkout, image]);
 
const handlecheckin = () => {
    setCheckIn(locationS);
    setType('2');
    setCheckvisible(true);
    postlocation();
    setCheckoutBtn(true)
 event()
  };
  const handlecheckout = () => {
    setCheckout(locationS);
    setCheckvisible(true);
    postlocation();
    changeState()
    setCheckoutBtn(false)
    event()
  };
  const event = (async) => {
    var idvalue = JSON.parse(sessionStorage?.getItem('userDetails'))?.id;
    var data = JSON.stringify({
      event_id: select?.id
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
        setEventData(response.data);
      })
      .catch(function (error) {
        // console.log(error);
      });
  };
  useEffect(() => {
    getlocationdata();
  }, [select ]);
  const getlocationdata = (async) => {
    var idvalue = JSON.parse(sessionStorage?.getItem('userDetails'))?.id;
    var data = JSON.stringify({
      event_id: select?.id
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
        if (response.data.check_in) {
          setType(2);
        }
        seteventdetails(response.data);
       
      })
      .catch(function (error) {
        // console.log(error);
      });
  };
  return (
    <>
      <Drawer
        id="poa-event-drawer"
        anchor="right"
        open={isOpenEvent}
        onClose={() => {
          setEventData('');
          onCloseEvent();
        }}
        PaperProps={{
          sx: { width: 320 },
        }}
      >
        <Stack id="event-detail-stack" direction="row" alignItems="center" justifyContent="space-between" sx={{ px: 1, py: 2 }}>
          <Typography id="event-detail" variant="subtitle1" sx={{ ml: 1 }} style={{ marginLeft: 25, color: 'black' }}>
            Event Detail 
          </Typography>
          <IconButton id="close-fill-icon-button"
            onClick={() => {
              onCloseEvent();
            }}
          >
            <Iconify id="close-fill-icon" icon="eva:close-fill" width={20} height={20} />
          </IconButton>
        </Stack>
        <Divider />
        <Scrollbar id="poa-event-scrollbar">
          {/* <Stack spacing={3} sx={{ p: 3 }}> */}
          <div>
            <Card id="poa-event-card" style={{ backgroundColor: '#f6f8fb', marginTop: 20 }}>
              <CardContent id="poa-event-card-content">
                <Typography id="event-title" variant="body1">Event Title  :{eventData?.name}</Typography>
                <Typography id="event-date" variant="body1">Event&nbsp;date&nbsp;and&nbsp;time :{eventData?.date1}</Typography>
                <Typography id="description" variant="body1">Description :{eventData?.description}</Typography>
              </CardContent>
            </Card>
            {(eventdetails?.check_in == '' || eventdetails?.check_out == '') &&
            useridvalue == idvalue &&
            select?.status == 0 ? (
              <Card id="check-in-out-status-card" style={{ backgroundColor: '#f6f8fb', marginTop: 20 }}>
                <CardContent>
                  <Typography id="check-in-out-status" style={{ textAlign: 'center' }}>
                    <u>CheckIn/Out Status</u>
                  </Typography>
                  <br />
                  {(eventData?.check_in ==="")? (
                    <Button id="check-in-button"
                    sx={{
                      '&:hover': {
                        backgroundColor: '#ffd796',
                      },
                      color: '#ff7424',
                      backgroundColor: '#ffd796',
                      marginLeft: '10px',
                    }}
                      onClick={handlecheckin}
                    >
                      CHECK IN 
                    </Button>
                  ) : (
                    <Button id="check-out-button"
                    sx={{
                      '&:hover': {
                        backgroundColor: '#ffd796',
                      },
                      color: '#ff7424',
                      backgroundColor: '#ffd796',
                      marginLeft: '10px',
                    }}
                      onClick={handlecheckout}
                    >
                      CHECK OUT
                    </Button>
                  )}
                  <Typography id="check-in-time" variant="body1"><span>Checkin Time</span><span style={{marginLeft:"2.8rem"}}>:</span>{eventData?.check_in} </Typography>
                  <Typography id="checkin-location"> <span>Checkin Location</span><span style={{marginLeft:"1.1rem"}}>:</span>{eventData?.check_in_location} </Typography>
                  <Typography id="checkout-time">  <span>Checkout Time</span><span style={{marginLeft:"2.2rem"}}>:</span> {eventData?.check_out}</Typography>
               
                  <Typography id="checkout-location"> <span>Checkout Location</span><span style={{marginLeft:".5rem"}}>:</span> {eventData?.check_out_location}</Typography>
                </CardContent>
              </Card>
            ) : (
              <Card id="check-in-out-card" style={{ backgroundColor: '#f6f8fb', marginTop: 20 }}>
                <CardContent id="check-in-out-card-content">
                  <Typography id="check-in-out-status" style={{ textAlign: 'center' }}>
                    <u >CheckIn/Out Status</u>
                  </Typography>
                  <br />
                  <Typography id="checkin-time-event" variant="body1">Checkin Time:{eventdetails?.check_in} </Typography>
                  <Typography id="checkin-location-event">Checkin Location: {eventdetails?.check_in_location} </Typography>
                  <Typography id="checkout-time-event">Checkout Time : {eventdetails?.check_out}</Typography>
                  <Typography id="checkout-location-event">Checkout Location: {eventdetails?.check_out_location}</Typography>
                </CardContent>
              </Card>
            )}
            <div>
              <div style={{ display: 'flex' }}>
                {viewImage
                  ? image?.map((i, index) => {
                      return (
                        <div id="image-icon" style={{ display: 'flex', margin: '1rem' }}>
                          <img id="delete-img" src={i} style={{ height: '50px', width: '70px' }} alt="hello" />
                          <Iconify id="delete-img-icon"
                            onClick={() => {
                              deleteImage(index);
                            }}
                            icon={'typcn:delete'}
                            sx={{ width: 16, height: 16, ml: 1, color: 'red' }}
                          />
                        </div>
                      );
                    })
                  : null}
              </div>
              <br />
              
        {clickedItemData.status == 2?
        null:
        <>
                  {eventdetails?.event_completed == 0 &&  role !=1  ?
                  <>
                 
                <div id="input-icon-camera" style={{ display: 'flex' }}>
                  <label id="input-tag-event" for="inputTag" style={{ cursor: 'pointer', display: 'flex' }}>
                    <Iconify id="icon-camera-poa-event" icon={'mdi:camera'} sx={{ width: 25, height: 25, ml: 2, color: '#ff7424' }} />
                    &nbsp;
                    <input
                      style={{ display: 'none' }}
                      accept="image/png, image/gif, image/jpeg"
                      id="inputTag"
                      type="file"
                      onChange={(e) => {
                        convertImage(e);
                      }}
                    />
                  </label>
                  Add Photos
                  <br />
         
           <Button
           id="upload-btn"
           onClick={postImages}
           
           sx={{
             '&:hover': {
               backgroundColor: '#ffd796',
             },
             color: '#ff7424',
             backgroundColor: '#ffd796',
             marginLeft: '10px',
           }}
         >
           Upload  
         </Button>
         </div>
              
           
         </>
         :
        null
        }  
        </>
        }
              </div> 
                 
             
            <Card id="event-data-card" style={{ marginTop: 20 }}>
              <CardContent id="card-content-poa-event-data">
               
             {isLoading? <CircularProgress sx={{color:'#ff7424'}}/> : 
                <div>
                  <img id="img-event-data" src={eventData?.photo1 ? eventData?.photo1 : ''} />
                </div>}
              </CardContent>
            </Card>
          </div>
        </Scrollbar>
      </Drawer>
    </>
  );
}
