import { useEffect, useState } from 'react';
import axios from 'axios';
import React from 'react';
import PropTypes from 'prop-types';
// material
import {
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
  TextField,
  Card,
  Dialog,
  CardContent,
  TextareaAutosize,
  Grid,
  Tooltip,
} from '@mui/material';
import CircularProgress from '@mui/material/CircularProgress';
// components
import Iconify from '../../../components/Iconify';
import Scrollbar from '../../../components/Scrollbar';
import { ColorManyPicker } from '../../../components/color-utils';
import { Schedule } from '@mui/icons-material';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DateTimePicker } from '@mui/x-date-pickers/DateTimePicker';
import moment from 'moment';
import EditGelathiSession from './EditGelathisession';
import AddEnrollGelathi from './AddEnrolledGelathi';
import AddGreenMotivators from './AddGreenMotivators';
import AddEnrollVyapar from './AddenrolleVyapar';
import Collapse from '@mui/material/Collapse';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { styled } from '@mui/material/styles';
import { useMediaQuery } from '@mui/material';
import { oldbaseURL,baseURL } from 'src/utils/api';
import GelathiCircleDrawer from './GelathiCircleDrawer';
import { isError } from 'lodash';
import { useAuth } from 'src/AuthContext';
// import ShaktiDialog from '../projects/Components/ShaktiDialog'
// ----------------------------------------------------------------------
const ExpandMore = styled((props) => {
  const { expand, ...other } = props;
  return <IconButton {...other} />;
})(({ theme, expand }) => ({
  //   transform: !expand ? 'rotate(0deg)' : 'rotate(180deg)',
  // marginLeft: 'auto' ,
  //   transition: theme.transitions.create('transform', {
  //     duration: theme.transitions.duration.shortest,
  //   }),
}));
GelathiProgrameDrawer.propTypes = {
  isOpenFilter: PropTypes.bool,
  onOpenFilter: PropTypes.func,
  onCloseFilter: PropTypes.func,
};

export default function GelathiProgrameDrawer({
  isOpenFilter,
  onOpenFilter,
  onCloseFilter,
  clcikData,
  gelathiFacikitatorLead,
}) {
  const { apikey } = useAuth();
  var [session, setSession] = useState('');
  const [showNote, setShowNote] = useState(false);
  const [gelatiNote, setGelatiNote] = useState('');
  const [getAllNotes, setGetAllNotes] = useState([]);
  const isSmallScreen = useMediaQuery('(max-width:600px)');
  const [gf, setGf] = useState(false);
  const [reloadFromForm, setReloadFromForm] = useState(false);
  const reloadFunction = () => {
    setReloadFromForm(!reloadFromForm);
  };
const [iserror, setIsError] = useState(false)
  var roleid = JSON.parse(sessionStorage.getItem('userDetails'))?.role
    var userid = JSON.parse(sessionStorage.getItem('userDetails'))?.id
  const [SaveBtn, setSaveBtn] = useState(false);
  const [expanded, setExpanded] = React.useState(false);
  const handleExpandClick = () => {
    setExpanded(!expanded);
  };
  const [date, setDate] = useState(new Date());
  //   image
  const [isLoading, setISLoading] = useState(false);
  // const [dataImage, setImage] = React.useState([]);
  const [imagePath, setImagePath] = React.useState([]);
  // const [viewImage, setViewImage] = React.useState(false);
  const [schedule, setReschedule] = React.useState(false);
  const [locationS, setLocation] = useState();
  const [editSession, setEditsession] = useState(false);
 
  const [getImage, setGetImae] = useState([]);
  const [circleDrawerData, setCircleDrawerData] = useState();
  // const [images,setImages] = useState([])
  const [photos, setPhotos] = React.useState(false);
  const [shown, setShown] = React.useState(false);
  const [images, setImages] = useState([]);
  const [viewImage, setViewImage] = React.useState(false);
  const [openFilter, setOpenFilter] = useState(false);
  sessionStorage.setItem('clickData', clcikData);
  const localstoragrClickData = sessionStorage.getItem('clcikData');
  const userName = JSON.parse(sessionStorage.getItem('userDetails'))?.first_name;
  const userId = JSON.parse(sessionStorage.getItem('userDetails'))?.role;
  useEffect(()=>{
    let isSubscribe = true;
    setIsError(false)
    if (isSubscribe) {
     
      getGFSessionData();
    }
    return () => {
      isSubscribe = false;
    };
  }, [reloadFromForm])
  useEffect(() => {
    setImages([]);
    setIsError(false)
    // setGetAllNotes([])
  }, [session.tb_id]);
  useEffect(() => {
    setIsError(false)
    getGFSessionData();
    if(session.type && session?.tb_id && session.primary_id){
      getNoteHandler();
    }  
  }, [clcikData]);
  useEffect(() => {
    setIsError(false)
    let isSubscribe = true;
    setIsError(false)
    if (isSubscribe) {
      if(session.type && session?.tb_id && session.primary_id){
        getNoteHandler();
      }  
      getGFSessionData();
    }
    return () => {
      isSubscribe = false;
    };
  }, []);
  // geting notes for each drawer
  useEffect(() => {
    let isSubscribe = true;
    setIsError(false)
    if (isSubscribe) {
      if(session.type && session?.tb_id && session.primary_id){
        getNoteHandler();
      }  
      getGFSessionData();
    }
    return () => {
      isSubscribe = false;
    };
  }, [session.tb_id]);
  const handleOpenFilter = () => {
    setOpenFilter(true);
  };
  const handleCloseFilter = () => {
    setOpenFilter(false);
  };
  //   image converting
  function getBase64(file, callback) {
    const reader = new FileReader();
    reader.addEventListener('load', () => callback(reader.result));
    reader.readAsDataURL(file);
  }
  const convertImage = (e) => {
    const imageData = URL.createObjectURL(e.target.files[0]);
    getBase64(e.target.files[0], function (base64Data) {
      setImages([...images, base64Data]);
      setViewImage(true);
    });
  };
  // sending image we need to
  const UploadImages = async () => {
    setISLoading(true);
    if (images.length === 0) {
      alert('No photos to upload.');
      throw new Error('No photos to upload.');
    }
    var raw = JSON.stringify({
      project_id: session.project_id,
      gf_session_id: session.id,
      gelathi_id: session.user_id,
      photos: [images.toString().slice(22)],
    });
    var requestOptions = {
      method: 'POST',
      body: raw,
      redirect: 'follow',
      headers: {
        'Authorization': `${apikey}`
      }
    };
    let res = fetch(baseURL + 'uploadGFsessionPhotos', requestOptions)
      .then((itn) => {
        setImages([]);
        alert('Image uploaded successfully..');
        setISLoading(false);
      })
      .catch((err) => {
        // console.log(err, '<---wertyu');
      });
  };
  const getGFSessionData = (async) => {
    var data 
{  (userId == 6 ) ? 
  data =   JSON.stringify({
      gf_session_id: clcikData?.name,
      user_id: userid
      
      ,
    }):
    data  = JSON.stringify({
      gf_session_id: clcikData?.name,
   
    })
  }
    var config = {
      method: 'post',
      url: baseURL + 'getGFSessionData1',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `${apikey}`
      },
      data: data,
    };
    axios(config)
      .then(function (response) {
        session = response.data;
        setSession(session);
        setCircleDrawerData({
          id: session?.circle_id,
          project_id: session?.project_id,
          title: session?.type_name,
        });
      })
      .catch(function (error) {
        // console.log(error);
      });
  };
  const noteSubmitHandler = () => {
    var userid = JSON.parse(sessionStorage.getItem('userDetails'))?.id;
    var role = JSON.parse(sessionStorage.getItem('userDetails'))?.role;
    var data = JSON.stringify({
      notes: gelatiNote,
      type: JSON.stringify(parseInt(session.type)),
      tb_id: session.tb_id,
      emp_id: userid,
      primary_id:session.primary_id
    });
    const config = {
      method: 'post',
      url: baseURL+'createNotes',
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
        'Authorization': `${apikey}`
      },
      data: data,
    };
    axios(config)
      .then(function (response) {
        if (response.status == 200) {
          // viewMessage('Project added sucessfully');
          setShowNote(false);
        if(session.type && session?.tb_id && session.primary_id){
          getNoteHandler();
        }  
          setSaveBtn(false);
          alert('Note Added Successfully...');
        }
      })
      .catch(function (error) {
        setIsError(true)
      });
  };
  const getNoteHandler = () => {
    var userid = JSON.parse(sessionStorage.getItem('userDetails'))?.id;
    var role = JSON.parse(sessionStorage.getItem('userDetails'))?.role;
    var data = JSON.stringify({
      type: session.type,
      tb_id: session.tb_id,
      primary_id:session.primary_id
      // "type":2, "tb_id":21407
    });
    const config = {
      method: 'post',
      url: baseURL + 'getNotes',
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
         'Authorization': `${apikey}`
      },
      data: data,
    };
    axios(config)
      .then(function (response) {
        if (response.status == 200) {
          setGetAllNotes(response?.data?.notes);
        }
      })
      .catch(function (error) {
        // console.log(error, 'failed');
      });
  };
  
  const removesession = (e) => {
    if (confirm('Do You want to Cancel?')) {
      var data = JSON.stringify({
        poa_id: e?.id,
        day: '',
      });
      var config = {
        method: 'post',
        url: baseURL + 'updatePoaCancel',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `${apikey}`
        },
        data: data,
      };
      axios(config)
        .then(function (response) {
          onCloseFilter();
          getGFSessionData();
        })
        .catch(function (error) {
          // console.log(error);
        });
    }
  };
  const reschedudlehandler = () => {
    setReschedule(true);
  };
  const Reschedule = (e) => {
    var data = JSON.stringify({
      poa_id: e,
      date_time: moment(date?.$d)?.format('YYYY-MM-DD HH:mm'),
    });
    var config = {
      method: 'post',
      url: baseURL + 'updateReschedule',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `${apikey}`
      },
      data: data,
    };
    axios(config)
      .then(function (response) {
        setReschedule(false);
        onCloseFilter();
      })
      .catch(function (error) {
        // console.log(error);
      });
  };
  //Method to delete the images that is selected
  const deleteImage = (index) => {
    images.splice(index, 1);
    setImages([...images]);
  };
  const styles = {
    buttonStyle: {
      boxShadow: 'none',
      borderRadius: '7px',
      backgroundColor: '#edeff1',
      fontWeight: 500,
      textAlign: 'left',
    },
  };
 
  return (
    <>
      <Drawer
        width={isSmallScreen ? '100%' : 300}
        anchor="right"
        open={isOpenFilter}
        onClose={onCloseFilter}
        PaperProps={{
          sx: { width: 350 },
        }}
      >
        <Stack direction="row" alignItems="center" justifyContent="space-between" sx={{ px: 1, py: 2 }}>
          <Typography variant="body1" sx={{ ml: 1 }}>
            {session?.type_name == 'Circle Metting' ? 'Circle Meeting' : session?.type_name}
          </Typography>
          <IconButton onClick={onCloseFilter}>
            <Iconify icon="eva:close-fill" width={20} height={20} />
          </IconButton>
        </Stack>
        <Divider />
{
session.length <=0 ?
<>
<div style={{display:"flex", marginTop:"50%", marginLeft:"40%" }}>
      <CircularProgress sx={{color:'#ff7424'}}/>
      </div>
</>
:
        <Scrollbar>
          <Stack spacing={3} sx={{ p: 3 }}>
            <div>
              <Card>
                <CardContent>
                  <Typography style={{ flexDirection: 'row' }} variant="body1" gutterBottom>
                    Project:&nbsp;{session?.projectName}
                  </Typography>
                  <Typography variant="body1" gutterBottom>
                    Partner :&nbsp;{session?.partnerName}
                    <br/>
                  {(session?.check_out=="0" && (userId == 6 || userId == 13))? 

                      <>
                        {' '}
                        <Tooltip title='Edit'>

                        <IconButton
                          onClick={() => {
                            setEditsession(true);
                          }}
                          style={{ right: -20 }}
                        >
                         
                          <Iconify icon="material-symbols:edit"></Iconify>
                          
                        </IconButton>
                        </Tooltip>
                        <Tooltip title='Reshedule'>

                        <IconButton onClick={reschedudlehandler} style={{ right: -20 }}>
                          <Iconify icon="mdi:clock-time-four-outline"></Iconify>
                        </IconButton>
                        </Tooltip>
                        <Tooltip title='Delete'>

                        <IconButton onClick={() => removesession(session)} style={{ right: -20 }}>
                          <Iconify icon="mdi:cancel-circle"></Iconify>
                        </IconButton>
                        </Tooltip>
                      </>
                     :null}
                  </Typography>
                  {schedule && (
                    <Stack>
                      <LocalizationProvider dateAdapter={AdapterDayjs}>
                        <DateTimePicker
                          required
                          value={date}
                          onChange={(e) => {
                            setDate(e);
                          }}
                          renderInput={(params) => <TextField {...params} color="common" />}
                          PopperProps={{
                            placement: 'top',
                          }}
                        />
                      </LocalizationProvider>
                      <Button onClick={() => Reschedule(session?.id)}>Save</Button>
                    </Stack>
                  )}
                  <EditGelathiSession
                    session={session}
                    editSession={editSession}
                    setEditsession={(e) => {
                      setEditsession(e);
                    }}
                  />
                  <Typography variant="body1" gutterBottom>
                    {session?.type_name == 'Circle Metting' ? 'Circle Meeting' : session?.type_name} : <br />
                    {session?.gf_session_name}
                  </Typography>
                  <Typography variant="body1" gutterBottom>
                    Plan Date : {session?.plan_date}
                  </Typography>
                  {(session?.type == 2||3) ? (
                    <>
                     {(session?.contact_number && session.contact_person)?
                     <>
                      <Typography variant="body1" gutterBottom>
                        Contact Person :{session?.contact_person}
                      </Typography>
                      <Typography variant="body1" gutterBottom>
                        Contact Number  :{session?.contact_number}
                      </Typography>
                      </>: null
                      }
                      </>
                  ) : null}
                  <Typography variant="body1" gutterBottom>
                    Trainer Name &nbsp;:&nbsp;
                    {session?.trainer_name}
                  </Typography>
                  <Typography variant="body1" gutterBottom>
                    GF Name &nbsp;:&nbsp;
                    {session?.gf_name}
                  </Typography>
                </CardContent>
              </Card>
              <br />
            
              {userId == 6 || userId == 13 ? (
                <Card style={{ marginTop: 20 }}>
                  {session?.gf_session_name?.split('_')[1].slice(0, 2) == 'BV' &&
                  (userId == 13 || userId == 6) ? null : (
                    <>
                      <div style={{ display: 'flex' }}>
                        {viewImage
                          ? images.map((i, index) => {
                              return (
                                <div style={{ display: 'flex', margin: '1rem' }}>
                                  <img src={i} style={{ height: '50px', width: '70px' }} alt="hello" />
                                  <Iconify
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
                      <div id="input-icon-camera" style={{ display: 'flex' }}>
                        <label id="input-tag-event" for="inputTag" style={{ cursor: 'pointer', display: 'flex' }}>
                          <Iconify
                            id="icon-camera-poa-event"
                            icon={'mdi:camera'}
                            sx={{ width: 25, height: 25, ml: 2, color: '#ff7424' }}
                          />
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
                          onClick={UploadImages}
                          sx={{
                            '&:hover': {
                              backgroundColor: '#ffd796',
                            },
                            color: '#ff7424',
                            backgroundColor: '#ffd796',
                            marginLeft: '10px',
                            marginBottom:'6px'
                          }}
                        >
                          Upload
                        </Button>
                      </div>
                    </>
                  )}
                  {/* <Card style={{ marginTop: 20 }}>
              <CardContent>
               
             {isLoading? <CircularProgress /> : 
                <div>
                  <img src={eventData?.photo1 ? eventData?.photo1 : ''} />
                </div>
                }
              </CardContent>
            </Card> */}
                </Card>
              ) : null}
              {userId == 6 || userId == 13 ? (
                <Card id="event-data-card" style={{ marginTop: 20 }}>
                  <CardContent id="card-content-poa-event-data">
                    {isLoading ? (
                      <CircularProgress sx={{color:'#ff7424'}}/>
                    ) : (
                      session?.photos && (
                        <div>
                          <div style={{ display: 'flex', flexDirection: 'row' }}>
                            {' '}
                            {session?.photos[0].photo1 ? (
                              <img
                                id="img-event-data"
                                src={session?.photos[0].photo1}
                                style={{ height: 100, width: 100 }}
                              />
                            ) : (
                              'No Photos Found'
                            )}
                            &nbsp;&nbsp;
                            {session?.photos[0].photo2 ? (
                              <img
                                id="img-event-data"
                                src={session?.photos[0].photo2}
                                style={{ height: 100, width: 100 }}
                              />
                            ) : null}
                          </div>
                        </div>
                      )
                    )}
                  </CardContent>
                </Card>
              ) : null}
              {userId == 4 || userId == 3 || userId == 11 
                ? session?.photos && (
                    <div style={{ display: 'flex', flexDirection: 'row' }}>
                      {' '}
                      {session?.photos[0].photo1 ? (
                        <img id="img-event-data" src={session?.photos[0].photo1} style={{ height: 100, width: 100 }} />
                      ) : (
                        'No Photos Found '
                      )}
                      &nbsp;&nbsp;
                      {session?.photos[0].photo2 ? (
                        <img id="img-event-data" src={session?.photos[0].photo2} style={{ height: 100, width: 100 }} />
                      ) : null}
                    </div>
                  )
                : null}
              <br />
              <Stack style={{ flexDirection: 'row' }} mb={2}>
                <Button
                  variant="secondary"
                  style={styles.buttonStyle}
                  endIcon={
                    <IconButton>
                      {' '}
                      <Iconify style={{ color: '#6d7c89' }} icon="" />{' '}
                    </IconButton>
                  }
                  startIcon={
                    <IconButton>
                      {' '}
                      <Iconify style={{ color: '#6d7c89' }} icon="ic:sharp-people" />
                    </IconButton>
                  }
                >
                  <span style={{ width: '200px' }}>Visit Participants : {session?.total_participants}</span>
                </Button>
              </Stack>
              {session?.all_participants?.map((itm) => {
                return (
                  <>
                    {' '}
                    {itm?.enroll == '1' ? (
                      <>
                        {' '}
                        <Card>
                          <CardContent>
                            {itm?.participant_name}
                            <br />
                            {session?.enroll_participant_villagename}
                          </CardContent>
                        </Card>{' '}
                        <br />
                      </>
                    ) : null}
                  </>
                );
              })}
              {session?.type == 4 || session?.type == 10 || session?.type == 16 ? (
                userId == 6 || userId == 13 ? (
                  <Stack style={{ flexDirection: 'row' }} mb={2}>
                    <Button
                      variant="secondary"
                      style={styles.buttonStyle}
                      onClick={() => handleOpenFilter()}
                      endIcon={
                        <IconButton>
                          {' '}
                          <Iconify style={{ color: '#6d7c89' }} icon="material-symbols:add" />{' '}
                        </IconButton>
                      }
                      startIcon={
                        <IconButton>
                          {' '}
                          <Iconify style={{ color: '#6d7c89' }} icon="clarity:form-line" color="gray" />
                        </IconButton>
                      }
                    >
                      <span style={{ width: '200px' }}>Survey Form</span>
                    </Button>
                  </Stack>
                ) : null
              ) : null}
              <Stack direction="row" spacing={1} flexShrink={0} sx={{ my: 1 }}>
                <GelathiCircleDrawer
                  clcikData={circleDrawerData}
                  isOpenFilter={openFilter}
                  onOpenFilter={handleOpenFilter}
                  onCloseFilter={handleCloseFilter}
                  data1={gelathiFacikitatorLead}
                  reloadmethod={reloadFunction}
                  sessionData={session}
                  mainDrawerReload = {reloadFunction}
                />
              </Stack>
              {session?.check_in != '0' && userId == 6  && session?.type==2  ? (
                session?.gf_session_name?.split('_')[1].slice(0, 2) == 'BV' ||
                (session?.gf_session_name?.split('_')[1].slice(0, 2) == 'CM' &&
                  (userId == 13 || userId == 6)) ? null : (
                  <AddEnrollGelathi session={session} reloadmethod={reloadFunction} />
                )
              ) : null}
              {session?.check_in != '0' && userId == 6 && session?.type==2  ? (
                <>
                  {session?.gf_session_name?.split('_')[1].slice(0, 2) == 'BV' ||
                  (session?.gf_session_name?.split('_')[1].slice(0, 2) == 'CM' &&
                    (userId == 13 || userId == 6)) ? null : (
                    <AddGreenMotivators session={session} reloadmethod={reloadFunction} />
                  )}
                </>
              ) : null}
              {(session?.check_in != '0' && userId == 6 && session?.type==2 ) ?
             
             
              (
                session?.gf_session_name?.split('_')[1].slice(0, 2) == 'BV' ||
                (session?.gf_session_name?.split('_')[1].slice(0, 2) == 'CM' &&
                  (userId == 13 || userId == 6)) ? null : (
                  <AddEnrollVyapar session={session} reloadmethod={reloadFunction} />
                )
                
              ) 
            
              : null}
           
              <Stack style={{ flexDirection: 'row' }} mb={2}>
                <Button
                  variant="secondary"
                  style={styles.buttonStyle}
                  onClick={() => setShowNote(true)}
                  endIcon={
                    <IconButton>
                      {' '}
                      <Iconify style={{ color: '#6d7c89' }} icon="material-symbols:add" />{' '}
                    </IconButton>
                  }
                  startIcon={
                    <IconButton>
                      {' '}
                      <Iconify style={{ color: '#6d7c89' }} icon="ph:note-pencil" />
                    </IconButton>
                  }
                >
                  <span style={{ width: '200px' }}>Notes</span>
                </Button>
              </Stack>
              {showNote ? (
                <div>
                
                  <Card style={{ marginTop: 20, marginLeft: 10 }}>
                    <TextField
                      style={{ marginTop: 20, marginLeft: 20 }}
                      id="outlined-multiline-static"
                      label="Notes"
                      multiline
                      rows={5}
                      variant="outlined"
                      onChange={async (e) => {
                        let note = await e?.target?.value;
                        setSaveBtn(true);
                        setGelatiNote(e?.target?.value);
                      }}
                    ></TextField>
                    {SaveBtn ? (
                      <div style={{ display: 'flex', flexDirection: 'row' }}>
                        <Button
                          style={{
                            color: '#ff7424',
                            marginTop: 20,
                            marginBottom: 10,
                            marginLeft: 5,
                            backgroundColor: '#ffd796',
                          }}
                          onClick={noteSubmitHandler}
                          disabled={gelatiNote.trim() === ''}
                        >
                          Save
                        </Button>
                        <Button
                          style={{
                            color: 'black',
                            marginLeft: 20,
                            marginTop: 20,
                            marginBottom: 10,
                            backgroundColor: '#aec6c1',
                          }}
                          onClick={() => {
                            setShowNote(false);
                          }}
                        >
                          Cancel
                          {/* <Cancel></Cancel> */}
                        </Button>
                      </div>
                    ) : (
                      <div style={{ display: 'flex', flexDirection: 'row' }}>
                        <Button
                          disabled
                          style={{ color: '#ffd796', marginTop: 20, marginBottom: 10, marginLeft: 5 }}
                          onClick={() => {
                            alert('Text cannot be empty');
                          }}
                        >
                          Save
                        </Button>
                        <Button
                          style={{ color: 'black', marginLeft: 20, marginTop: 20, marginBottom: 10 }}
                          onClick={() => {
                            setShowNote(false);
                          }}
                        >
                          Cancel
                        </Button>
                      </div>
                    )}
                  </Card>
                </div>
              ) : null}
              <Card>
                <CardContent>
                  View All Comments :
                  <ExpandMore
                    expand={expanded}
                    onClick={handleExpandClick}
                    aria-expanded={expanded}
                    aria-label="show more"
                  >
                    <ExpandMoreIcon />
                  </ExpandMore>
                  <Collapse in={expanded} timeout="auto" unmountOnExit>
                    {getAllNotes &&
                      getAllNotes.map((i, index) => (
                        <>
                          {' '}
                          <Grid
                            container
                            direction="column"
                            justifyContent="center"
                            alignItems="center"
                            style={{ marginTop: 10 }}
                          >
                            <Typography variant="body1">
                              {' '}
                              {i?.name} {i?.date}
                            </Typography>
                          </Grid>
                          <Typography variant="body1" gutterBottom style={{ marginTop: 10, marginLeft: 30 }}>
                            {i?.notes}{' '}
                          </Typography>
                        </>
                      ))}
                  </Collapse>
                </CardContent>
              </Card>
            </div>
          </Stack>
        </Scrollbar>}
      </Drawer>
    </>
  );
}
