import { useEffect, useState } from 'react';
import axios from 'axios';
import React from 'react';
import PropTypes from 'prop-types';
import { baseURL, oldbaseURL } from 'src/utils/api';
import { Icon } from '@iconify/react';
import GreenSurvey from 'src/pages/projects/Components/GreenSurvey';
import Vyaparprogram from 'src/pages/projects/Components/Vyaparprogram';
import GelathiCircleForm from 'src/pages/projects/Components/GelathiCircleForm';
import {
  Box,
  TextField,
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
  Grid,
  CardContent,
  Tooltip,
} from '@mui/material';
import Iconify from '../../../components/Iconify';
import Scrollbar from '../../../components/Scrollbar';
import { ColorManyPicker } from '../../../components/color-utils';
import AddAttendance from './AddAttendance';
import Photos from '../../../pages/projects/Components/Photos';
import EditGelathiSession from 'src/pages/projects/Components/EditGelathisession';
import CheckinCheckOutDialog from './CheckinCheckOutDialog';
import CheckinGFL from './GflcheckIncheckout';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import moment from 'moment';
import CircularProgress from '@mui/material/CircularProgress';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DateTimePicker } from '@mui/x-date-pickers/DateTimePicker';
import { useMediaQuery } from '@mui/material';
import Collapse from '@mui/material/Collapse';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { styled } from '@mui/material/styles';
import { EightK } from '@mui/icons-material';
import ErrorOutlinedIcon from '@mui/icons-material/ErrorOutlined';
import { useAuth } from 'src/AuthContext';
const ExpandMore = styled((props) => {
  const { expand, ...other } = props;
  return <IconButton {...other} />;
})(({ theme, expand }) => ({}));
PoaGF.propTypes = {
  isOpenFilterGF: PropTypes.bool,
  onOpenFilterGF: PropTypes.func,
  onCloseFilterGF: PropTypes.func,
};
export default function PoaGF({ isOpenFilterGF, onOpenFilterGF, onCloseFilterGF, clcikData, batchState, reloadPOAGF}) {
    const { apikey } = useAuth();
  const [batch, setBatch] = useState('');
  const [loader,setLoader] = useState(false)
  const [photos, setPhotos] = React.useState(false);
  const [shown, setShown] = React.useState(false);
  const [images, setImages] = useState([]);
  const [showNote, setShowNote] = useState(false);
  const [schedule, setReschedule] = React.useState(false);
  const [date, setDate] = useState(new Date());
  const [isLoading, setISLoading] = useState(false);
  const [editSession, setEditsession] = useState(false);
  const [check, setCheck] = useState(false);
   const [vyaapar, setVyaapar] = useState('');
  const [getAllNotes, setGetAllNotes] = useState([]);
  const [SaveBtn, setSaveBtn] = useState(false);
  const [gelatiNote, setGelatiNote] = useState('');
  const [gelathisData, setGelathisdata] = useState('');
  const [showSurvey, setSurvey] = useState(false);
  const [session, setSession] = useState('');
  const [expanded, setExpanded] = React.useState(false);
  const [reload, setReload] = useState(false);
  const isSmallScreen = useMediaQuery('(max-width:600px)');
  const [isOnline, setOnline] = useState(true);
  const changeState = () => {
    setReload(!reload);
  };
  const handleExpandClick = () => {
    setExpanded(!expanded);
  };
  const role = JSON.parse(sessionStorage?.getItem('userDetails'))?.role;
  useEffect(() => {
    getTrainingBatch();
    changeState();
  }, [batchState, clcikData]);
  useEffect(() => {
    getGFSessionData();
    if(session.type && session?.tb_id && session?.primary_id){
      getNoteHandler();
    } 
  }, [clcikData, editSession]);
  useEffect(() => {
    let isSubscribe = true;
    if (isSubscribe) {
      if(session.type && session?.tb_id && session?.primary_id){
        getNoteHandler();
      } 
      getGFSessionData();
    }
    return () => {
      isSubscribe = false;
    };
  }, [session.tb_id, session.check_in, batch.check_1]);

  useEffect(()=>{
    setOnline(navigator.onLine)
  })
  window.addEventListener('online', () => {
    setOnline(true)
});
window.addEventListener('offline', () => {
    setOnline(false)
});


  const getTrainingBatch = (async) => {
    var role = JSON.parse(sessionStorage?.getItem('userDetails'))?.role;
    var idvalue = JSON.parse(sessionStorage?.getItem('userDetails'))?.id;
    var data = JSON.stringify({
      gf_session_id: clcikData?.id,
      role_id: role,
      user_id: idvalue,
    });
    var config = {
      method: 'post',
      url: baseURL+'getGFSessionData',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `${apikey}`
      },
      data: data,
    };
    axios(config)
      .then(function (response) {
        setBatch(response.data);
      })
      .catch(function (error) {
        // console.log(error);
      });
  };

  const getGFSessionData = (async) => {
    setLoader(true)
    var userid = JSON.parse(sessionStorage?.getItem('userDetails'))?.id;
    var data = JSON.stringify({
      gf_session_id: clcikData?.id,
      user_id : userid
    });
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
        localStorage.setItem('sessiondata', JSON.stringify(response.data));
        setSession(response.data);
        setLoader(false)
      })
      .catch(function (error) {
        let localData = JSON.parse(localStorage.getItem('sessiondata'));
        setSession(localData);
        setLoader(false)
      });
    if(session?.circle_id && session?.project_id){circle()}
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
          setShowNote(false);
        if(session.type && session?.tb_id && session?.primary_id){
          getNoteHandler();
        } 
          setSaveBtn(false);
          alert('Note Added Successfully...');
        }
      })
      .catch(function (error) {
        // console.log(error, 'failed');
      });
  };
  const getNoteHandler = () => {
    var userid = JSON.parse(sessionStorage.getItem('userDetails'))?.id;
    var role = JSON.parse(sessionStorage.getItem('userDetails'))?.role;
    var data = JSON.stringify({
      type: session.type,
      tb_id: session.tb_id,
      primary_id:session.primary_id
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
  useEffect(()=>{
   if(session?.circle_id && session?.project_id){
    circle()
   }
  },[reloadPOAGF])
  const circle = (async) => {
    const userid = JSON.parse(sessionStorage.getItem('userDetails'))?.id;
  
    var data = JSON.stringify({
      circle_id: session?.circle_id,
      project_id: session?.project_id,
      emp_id: userid,
    });
    var config = {
      method: 'post',
      url: baseURL+'getGelathiCircleDataNew',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `${apikey}`
      },
      data: data,
    };
    axios(config)
      .then(function (response) {
        localStorage.setItem('gelathisdata', JSON.stringify(response?.data));
        setGelathisdata(response?.data);
      })
      .catch(function (error) {
        // console.log(error);
        let localgelathisdata = JSON.parse(localStorage.getItem('gelathisdata'));
        setGelathisdata(localgelathisdata);
      });
  };
  function getBase64(file, callback) {
    const reader = new FileReader();
    reader.addEventListener('load', () => callback(reader.result));
    reader.readAsDataURL(file);
  }
  const convertImage = (e) => {
    const imageData = URL.createObjectURL(e.target.files[0]);
    getBase64(e.target.files[0], function (base64Data) {
      setImages([...images, base64Data]);
    });
  };
  const UploadImages = (e) => {
    if (images.length === 0) {
      alert('No photos to upload.');
      throw new Error('No photos to upload.');
    }
    var idvalue = JSON.parse(sessionStorage?.getItem('userDetails'))?.id;

    setISLoading(true);
    var raw = JSON.stringify({
      project_id: batch.project_id,
      gf_session_id: batch.id,
      gelathi_id: batch.user_id,
      photos: [images.toString().slice(22)],
    });

    var requestOptions = {
      method: 'POST',
      body: raw,
      redirect: 'follow',
      headers: { 
        'Authorization': `${apikey}`
      },
    };

    let res = fetch('https://bdms.buzzwomen.org/appGo/uploadGFSessionPhotos', requestOptions)
      .then((itn) => {
        setImages([]);
        alert('Image uploaded successfully..');
        getTrainingBatch();
        setISLoading(false);
      })
      .catch((err) => {
        // console.log(err, '<---wertyu');
      });
  };

  const deleteImage = (index) => {
    images.splice(index, 1);
    setImages([...images]);
  };
  const roleid = JSON.parse(sessionStorage.getItem('userDetails'))?.role;

  const removesession = (e) => {
    if (confirm('Do You want to Cancel?')) {
      var data = JSON.stringify({
        "poa_id": e?.id,
        "day": ""
      });
      
      var config = {
        method: 'post',
        url: baseURL + 'updatePoaCancel',
        headers: { 
          'Content-Type': 'application/json',
          'Authorization': `${apikey}`
        },
        data : data
      };
      axios(config)
        .then(function (response) {
          onCloseFilterGF();
          getTrainingBatch();
          getGFSessionData();
        })
        .catch(function (error) {
          // console.log(error);
        });
    }
  };
 
  const Reschedule = (e) => {
    var data = JSON.stringify({
      "poa_id": e,
      "date_time":moment(date?.$d)?.format('YYYY-MM-DD HH:mm')
    });
    
    var config = {
      method: 'post',
      url: baseURL+'updateReschedule',
      headers: { 
        'Content-Type': 'application/json',
        'Authorization': `${apikey}`
      },
      data : data
    };
    
    axios(config)
      .then(function (response) {
        setReschedule(false);
        onCloseFilterGF();
        getTrainingBatch();
      })
      .catch(function (error) {
        // console.log(error);
      });
      
    }
  
    const reschedudlehandler = () => {
      setReschedule(true);
    };

  useEffect(() => {
    gelathinamelist();
  }, []);


 const styles = {
    buttonStyle: { boxShadow: "none", borderRadius: "7px", backgroundColor: "#edeff1", fontWeight: 500, textAlign: "left" },
    tableRowStyle: { justifyContent: 'center', alignItems: 'center', marginLeft: 200 },
    linkStyle: { textDecoration: 'none', color: 'black' },
  };
  const [showForm, setShowForm] = useState(false);
  const [selectedFromIndex, setSelectedFormIndex] = useState({
    index: '',
    id: '',
  });
  const callGelathiFormComponent = (index, id) => {
    setShowForm(true);
    setSelectedFormIndex({
      index: index,
      id: id,
    });
  };

  const handleform = () => {
    alert('survey was done');
  };
  const handleSurveyform = ()=>{
    alert("This form was Filled!!")
  }
const [componentreload  ,setComponentReload] = useState(false)

const componentreloadmethod  = ()=>{
  setComponentReload(!componentreload)
}
  const [localFormPresent, setlocalFormPresent] = useState('');

  useEffect(() => {
  
    let session = JSON.parse(localStorage.getItem('sessiondata'))
    let localFormPresent1 = new Map();
    let existingData;
if(session?.type == 4){
  existingData = localStorage.getItem('spoorthi');
  let parsedData = JSON.parse(existingData);
  parsedData?.map((item) => {
    localFormPresent1.set(parseInt(item?.partcipantId), 'true');
  });
}
if(session?.type == 10){
  existingData = localStorage.getItem('green');
   let parsedData = JSON.parse(existingData);

    parsedData?.map((item) => {
      localFormPresent1.set(parseInt(item?.partcipantId), 'true');
    });
}
if(session?.type == 16){
 existingData = localStorage.getItem('vyapar');
 let parsedData = JSON.parse(existingData);

 parsedData?.map((item) => {
   localFormPresent1.set(parseInt(item?.partcipantId), 'true');
 });
}
    setlocalFormPresent(localFormPresent1);
  },[localStorage?.getItem("vyapar"),localStorage?.getItem("spoorthi"),localStorage?.getItem("green"),componentreload]);

  useEffect(() => {}, [componentreload]);

const gelathinamelist = (async) => {
  var config = {
    method: 'post',
    url: baseURL + 'getGelathiList',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `${apikey}`
    }
  };
  axios(config)
    .then(function (response) {
      localStorage.setItem('gelathilist',JSON.stringify(response?.data));
      setVyaapar(response?.data);
    })
    .catch(function (error) {
      let gelathidata=JSON.parse(localStorage.getItem('gelathilist'))
      setVyaapar(gelathidata);
    });
};
useEffect(()=>{

},[localStorage?.getItem("vyapar"),localStorage?.getItem("spoorthi"),localStorage?.getItem("green")])

  return (
    <>
     
     
     
      <Drawer
        width={isSmallScreen ? '100%' : 300}
        id="poa-gf-drawer"
        anchor="right"
        open={isOpenFilterGF}
        onClose={onCloseFilterGF}
        PaperProps={{
          sx: { width: 350 },
        }}
      >
        {loader?<CircularProgress sx={{color:'#ff7424',alignItems:'center',justifyContent:'center',marginTop:30,marginLeft:20}}/>:
       <>
       <Stack
          id="poa-gf-stack"
          direction="row"
          alignItems="center"
          justifyContent="space-between"
          sx={{ px: 1, py: 2 }}
        >
          <Typography id="poa-gf-subtitle" variant="subtitle1" sx={{ ml: 1 }}>
            {/* {`${clcikData?.title}: ${clcikData?.name}`} */}
            {/* {clcikData?.name} */}
            {session?.type_name == 'Circle Metting' ? 'Circle Meeting' : session?.type_name}
          </Typography>
          <IconButton id="poa-gf-close-icon-button" onClick={onCloseFilterGF}>
            <Iconify id="close-icon-poa-gf" icon="eva:close-fill" width={20} height={20} />
          </IconButton>
        </Stack>
        <Divider />

        <Scrollbar>
          <Stack spacing={3} sx={{ p: 2 }}>
            <div>
              <Card>
                <CardContent>
                  <Typography style={{ flexDirection: 'row' }} variant="body1" gutterBottom>
                    Project : &nbsp;{session?.projectName}
                  </Typography>
                  <Typography variant="body1" gutterBottom>
                    Partner : &nbsp;{session?.partnerName}
                    <br />
                    {session?.check_out=="0" && role != 12 ? (
                      <>
                      <Tooltip title="Edit">

                        <IconButton
                          onClick={() => {
                            setEditsession(true);
                          }}
                          style={{ right: -20 }}
                        >
                          <Iconify icon="material-symbols:edit"></Iconify>
                        </IconButton>
                      </Tooltip>
                      <Tooltip title="Reshedule">

                        <IconButton onClick={reschedudlehandler} style={{ right: -20 }}>
                          <Iconify icon="mdi:clock-time-four-outline"></Iconify>
                        </IconButton>
                      </Tooltip>
                      <Tooltip title="Delete">

                        <IconButton onClick={() => removesession(session)} style={{ right: -20 }}>
                          <Iconify icon="mdi:cancel-circle"></Iconify>
                        </IconButton>
                      </Tooltip>
                      </>
                    ) : null}
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
                    {session?.type_name}:<br />
                    &nbsp;{session?.gf_session_name}
                  </Typography>
                  <Typography variant="body1" gutterBottom>
                    Plan Day working:&nbsp;{session?.plan_date}
                  </Typography>

                  {session?.type == 1 ||
                  4 ||
                  5 ||
                  6 ||
                  7 ||
                  8 ||
                  9 ||
                  10 ||
                  11 ||
                  12 ||
                  13 ||
                  14 ||
                  15 ||
                  16 ||
                  17 ||
                  18 ||
                  19 ||
                  20 ||
                  21 ? null : (
                    <>
                      <Typography variant="body1" gutterBottom>
                        Contact Person:&nbsp;{session?.contact_person}
                      </Typography>
                      <Typography variant="body1" gutterBottom>
                        Contact Number:&nbsp;{session?.contact_number}
                      </Typography>
                    </>
                  )}
                  <Typography variant="body1" gutterBottom>
                    GF Name :&nbsp;{session?.gf_name}
                  </Typography>
                </CardContent>
              </Card>
              <AddAttendance
                batch={session}
                shown={shown}
                setShown={(e) => {
                  setShown(e);
                }}
              />
              {role == 6 || role == 13 ? (
                <Card style={{ marginTop: 20 }}>
                  <CardContent>
                    <label sx={styles.buttonStyle} for="inputTag" style={{ cursor: 'pointer', display: 'flex' }}>
                      <Iconify icon={'mdi:camera'} sx={{ width: 25, height: 25, ml: 2, color: '#ff7424' }} />
                      &nbsp;
                      <input
                        style={{ display: 'none' }}
                        accept="image/png, image/gif, image/jpeg"
                        id="inputTag"
                        type="file"
                        onChange={(e) => {
                          convertImage(e);
                        }}
                      />{' '}
                      Add Photos
                    </label>

                    <br />
                    <Button sx={{ color: '#ff7424' }} onClick={UploadImages}>
                      Upload Photos
                    </Button>
                    {images?.map((itm, index) => {
                      return (
                        <div style={{ display: 'flex', margin: '1rem' }}>
                          <img src={itm} style={{ height: '50px', width: '70px', marginTop: 20 }} />
                          <Iconify
                            onClick={() => {
                              deleteImage(index);
                            }}
                            icon={'typcn:delete'}
                            sx={{ width: 16, height: 16, ml: 1, color: 'red' }}
                          />
                        </div>
                      );
                    })}

                    {/* <CardContent>
                  <Typography>Upload Photos</Typography>
                </CardContent> */}

                    {isLoading ? (
                      <CircularProgress sx={{color:'#ff7424'}}/>
                    ) : (
                      batch?.photos && (
                        <div>
                          <div style={{ display: 'flex', flexDirection: 'row' }}>
                            {' '}
                            {batch?.photos[0].photo1 ? (
                              <img
                                id="img-event-data"
                                src={batch?.photos[0].photo1}
                                style={{ height: 100, width: 100 }}
                              />
                            ) : (
                              'No Photos Found'
                            )}
                            &nbsp;&nbsp;
                            {batch?.photos[0].photo2 ? (
                              <img
                                id="img-event-data"
                                src={batch?.photos[0].photo2}
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
              <br />
              {roleid == 6 && batch && (
                <CheckinCheckOutDialog
                  photos={check}
                  batch={batch}
                  setCheck={(e) => {
                    setCheck(e);
                  }}
                  getTrainingBatch={getTrainingBatch}
                  getGFSessionData={getGFSessionData}
                />
              )}
              {roleid == 13 && batch && (
                <CheckinGFL
                  photos={check}
                  batch={batch}
                  setCheck={(e) => {
                    setCheck(e);
                  }}
                  getTrainingBatch={getTrainingBatch}
                  getGFSessionData={getGFSessionData}
                />
              )}
              <br />
              <br />{' '}
              <Button
                variant="secondary"
                style={styles.buttonStyle}
                onClick={() => {
                  setShown(true);
                }}
                endIcon={
                  <IconButton>
                    {' '}
                    <Iconify style={{ color: '#6d7c89' }} icon="material-symbols:add" />{' '}
                  </IconButton>
                }
                startIcon={
                  <IconButton>
                    {' '}
                    <Iconify style={{ color: '#6d7c89' }} icon="ic:baseline-people" />
                  </IconButton>
                }
              >
                <span style={{ width: '200px' }}>Visit participants : {session?.total_participants}</span>
              </Button>
              <br />
              <br />
              {role == 6 || role == 13 ? (
                <Button
                  variant="secondary"
                  style={styles.buttonStyle}
                  onClick={() => {
                    setCheck(true);
                  }}
                  endIcon={
                    <IconButton>
                      {' '}
                      <Iconify style={{ color: '#6d7c89' }} icon="material-symbols:add" />{' '}
                    </IconButton>
                  }
                  startIcon={
                    <IconButton>
                      {' '}
                      <Iconify style={{ color: '#6d7c89' }} icon="cil:clock" />
                    </IconButton>
                  }
                >
                  <span style={{ width: '200px' }}>Check In/Check Out</span>
                </Button>
              ) : null}
              <br /> <br />
              <Button
                variant="secondary"
                style={styles.buttonStyle}
                endIcon={
                  <IconButton
                    onClick={() => {
                      setShowNote(true);
                    }}
                  >
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
              </Button>{' '}
              <br />
              {showNote ? (
                <div>
                  {/* <Dialog fullScreen open={open} onClose={handleClose}TransitionComponent={Transition}></Dialog> */}
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
                      <>
                        <Button
                          style={{
                            color: '#ff7424',
                            marginTop: 20,
                            marginLeft: 20,
                            marginBottom: 20,
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
                            marginTop: 20,
                            marginLeft: 20,
                            marginBottom: 20,
                            backgroundColor: '#aec6c1',
                          }}
                          onClick={() => {
                            setShowNote(false);
                          }}
                        >
                          Cancel
                          {/* <Cancel></Cancel> */}
                        </Button>
                      </>
                    ) : (
                      <>
                        <Button
                          disabled
                          style={{ color: '#ffd796', marginTop: 20, marginLeft: 20, marginBottom: 20 }}
                          onClick={() => {
                            alert('Text cannot be empty');
                          }}
                        >
                          Save
                        </Button>
                        <Button
                          style={{ color: 'black', marginTop: 20, marginLeft: 20, marginBottom: 20 }}
                          onClick={() => {
                            setShowNote(false);
                          }}
                        >
                          Cancel
                        </Button>
                      </>
                    )}
                  </Card>
                </div>
              ) : null}
              <br />
              {(session?.type==4 || session?.type==10 || session?.type==16) && (!(isOnline)) && 
              <Button
                variant="secondary"
                style={styles.buttonStyle}
                onClick={() => {
                  setSurvey(true);
                }}
                endIcon={
                  <IconButton>
                    {' '}
                    <Iconify style={{ color: '#6d7c89' }} icon="material-symbols:add" />{' '}
                  </IconButton>
                }
                startIcon={
                  <IconButton>
                    {' '}
                    <Iconify style={{ color: '#6d7c89' }} icon="clarity:form-line" />
                  </IconButton>
                }
              >
                <span style={{ width: '200px' }}>Survey Form</span>
              </Button>
}
  
             
              {(showSurvey && (!isOnline)) ? (
                <Stack>
                  <div>
                    <Card>
                      {session?.type == 4 || session.type == 10 || session.type == 16 ? (
                        <>
                          {gelathisData?.gelathis?.map((itm, index) => {
                            return (
                              <Card style={{borderRadius:0}}>

                              <CardContent style={{display:'flex',justifyContent: 'space-between'}}>
                            <div style={{alignItems:"flex-start"}}> {itm?.firstName}</div> 
                            <div style={{alignItems:"flex-end"}}>  
                                  
                                  {session?.type == 4 ? (
                                    itm?.is_survey ? (
                                      <>
                                 {(!localFormPresent.has(itm?.gelathi_id)) &&  
                                  // <IconButton onClick={handleform}>
                                  //       <Icon
                                  //         icon="clarity:form-line"
                                  //         width={20}
                                  //         height={20}
                                  //         color="green"
                                  //       />
                                  //     </IconButton>
                                <button onClick={handleform} style={{ border: 'none', outline: 'none', background: 'transparent', cursor: 'pointer'}}>
                                     <svg xmlns="http://www.w3.org/2000/svg" color="green" width="1.5em" height="1.5em" viewBox="0 0 36 36"><path fill="currentColor" d="M21 12H7a1 1 0 0 1-1-1V7a1 1 0 0 1 1-1h14a1 1 0 0 1 1 1v4a1 1 0 0 1-1 1ZM8 10h12V7.94H8Z" class="clr-i-outline clr-i-outline-path-1"/><path fill="currentColor" d="M21 14.08H7a1 1 0 0 0-1 1V19a1 1 0 0 0 1 1h11.36L22 16.3v-1.22a1 1 0 0 0-1-1ZM20 18H8v-2h12Z" class="clr-i-outline clr-i-outline-path-2"/><path fill="currentColor" d="M11.06 31.51v-.06l.32-1.39H4V4h20v10.25l2-1.89V3a1 1 0 0 0-1-1H3a1 1 0 0 0-1 1v28a1 1 0 0 0 1 1h8a3.44 3.44 0 0 1 .06-.49Z" class="clr-i-outline clr-i-outline-path-3"/><path fill="currentColor" d="m22 19.17l-.78.79a1 1 0 0 0 .78-.79Z" class="clr-i-outline clr-i-outline-path-4"/><path fill="currentColor" d="M6 26.94a1 1 0 0 0 1 1h4.84l.3-1.3l.13-.55v-.05H8V24h6.34l2-2H7a1 1 0 0 0-1 1Z" class="clr-i-outline clr-i-outline-path-5"/><path fill="currentColor" d="m33.49 16.67l-3.37-3.37a1.61 1.61 0 0 0-2.28 0L14.13 27.09L13 31.9a1.61 1.61 0 0 0 1.26 1.9a1.55 1.55 0 0 0 .31 0a1.15 1.15 0 0 0 .37 0l4.85-1.07L33.49 19a1.6 1.6 0 0 0 0-2.27ZM18.77 30.91l-3.66.81l.89-3.63L26.28 17.7l2.82 2.82Zm11.46-11.52l-2.82-2.82L29 15l2.84 2.84Z" class="clr-i-outline clr-i-outline-path-6"/><path fill="none" d="M0 0h36v36H0z"/></svg>
                                </button>
                                }
                                      {localFormPresent.has(itm?.gelathi_id) ? (
                                          //   <IconButton onClick={handleSurveyform}>
                                          //   <Icon
                                          //     icon="clarity:form-line"
                                          //     width={20}
                                          //     height={20}
                                             
                                          //     color="black"
                                          //   />
                                          // </IconButton>
                                          <button onClick={handleSurveyform} style={{ border: 'none', outline: 'none', background: 'transparent', cursor: 'pointer'}}>
                                              <svg xmlns="http://www.w3.org/2000/svg" color="black" width="1.5em" height="1.5em" viewBox="0 0 36 36"><path fill="currentColor" d="M21 12H7a1 1 0 0 1-1-1V7a1 1 0 0 1 1-1h14a1 1 0 0 1 1 1v4a1 1 0 0 1-1 1ZM8 10h12V7.94H8Z" class="clr-i-outline clr-i-outline-path-1"/><path fill="currentColor" d="M21 14.08H7a1 1 0 0 0-1 1V19a1 1 0 0 0 1 1h11.36L22 16.3v-1.22a1 1 0 0 0-1-1ZM20 18H8v-2h12Z" class="clr-i-outline clr-i-outline-path-2"/><path fill="currentColor" d="M11.06 31.51v-.06l.32-1.39H4V4h20v10.25l2-1.89V3a1 1 0 0 0-1-1H3a1 1 0 0 0-1 1v28a1 1 0 0 0 1 1h8a3.44 3.44 0 0 1 .06-.49Z" class="clr-i-outline clr-i-outline-path-3"/><path fill="currentColor" d="m22 19.17l-.78.79a1 1 0 0 0 .78-.79Z" class="clr-i-outline clr-i-outline-path-4"/><path fill="currentColor" d="M6 26.94a1 1 0 0 0 1 1h4.84l.3-1.3l.13-.55v-.05H8V24h6.34l2-2H7a1 1 0 0 0-1 1Z" class="clr-i-outline clr-i-outline-path-5"/><path fill="currentColor" d="m33.49 16.67l-3.37-3.37a1.61 1.61 0 0 0-2.28 0L14.13 27.09L13 31.9a1.61 1.61 0 0 0 1.26 1.9a1.55 1.55 0 0 0 .31 0a1.15 1.15 0 0 0 .37 0l4.85-1.07L33.49 19a1.6 1.6 0 0 0 0-2.27ZM18.77 30.91l-3.66.81l.89-3.63L26.28 17.7l2.82 2.82Zm11.46-11.52l-2.82-2.82L29 15l2.84 2.84Z" class="clr-i-outline clr-i-outline-path-6"/><path fill="none" d="M0 0h36v36H0z"/></svg>
                                         </button>
                                        ) : (
                                          ''
                                        )}
                                      </>
                                    ) : session?.type == 4 && session?.check_in != '0' ? (
                                        <>
                                        
                                       {!localFormPresent.has(itm?.gelathi_id) && 
                                      //  <IconButton
                                      //   onClick={() => {
                                      //     callGelathiFormComponent(index, itm?.gelathi_id);
                                      //   }}
                                      // >
                                      //   <Icon
                                      //     icon="clarity:form-line"
                                      //     width={20}
                                      //     height={20}
                                          
                                      //     color="#ff7424"
                                      //   />
                                      // </IconButton>
                                      <button onClick={()=>{ callGelathiFormComponent(index, itm?.gelathi_id);
                                        }} style={{border: 'none', outline: 'none', background: 'transparent', cursor: 'pointer'}}>
                                          <svg xmlns="http://www.w3.org/2000/svg" color="#ff7424" width="1.5em" height="1.5em" viewBox="0 0 36 36"><path fill="currentColor" d="M21 12H7a1 1 0 0 1-1-1V7a1 1 0 0 1 1-1h14a1 1 0 0 1 1 1v4a1 1 0 0 1-1 1ZM8 10h12V7.94H8Z" class="clr-i-outline clr-i-outline-path-1"/><path fill="currentColor" d="M21 14.08H7a1 1 0 0 0-1 1V19a1 1 0 0 0 1 1h11.36L22 16.3v-1.22a1 1 0 0 0-1-1ZM20 18H8v-2h12Z" class="clr-i-outline clr-i-outline-path-2"/><path fill="currentColor" d="M11.06 31.51v-.06l.32-1.39H4V4h20v10.25l2-1.89V3a1 1 0 0 0-1-1H3a1 1 0 0 0-1 1v28a1 1 0 0 0 1 1h8a3.44 3.44 0 0 1 .06-.49Z" class="clr-i-outline clr-i-outline-path-3"/><path fill="currentColor" d="m22 19.17l-.78.79a1 1 0 0 0 .78-.79Z" class="clr-i-outline clr-i-outline-path-4"/><path fill="currentColor" d="M6 26.94a1 1 0 0 0 1 1h4.84l.3-1.3l.13-.55v-.05H8V24h6.34l2-2H7a1 1 0 0 0-1 1Z" class="clr-i-outline clr-i-outline-path-5"/><path fill="currentColor" d="m33.49 16.67l-3.37-3.37a1.61 1.61 0 0 0-2.28 0L14.13 27.09L13 31.9a1.61 1.61 0 0 0 1.26 1.9a1.55 1.55 0 0 0 .31 0a1.15 1.15 0 0 0 .37 0l4.85-1.07L33.49 19a1.6 1.6 0 0 0 0-2.27ZM18.77 30.91l-3.66.81l.89-3.63L26.28 17.7l2.82 2.82Zm11.46-11.52l-2.82-2.82L29 15l2.84 2.84Z" class="clr-i-outline clr-i-outline-path-6"/><path fill="none" d="M0 0h36v36H0z"/></svg>
                                          </button>
                                      }
                                      {localFormPresent.has(itm?.gelathi_id) ? (
                                          //   <IconButton onClick={handleSurveyform}>
                                          //   <Icon
                                          //     icon="clarity:form-line"
                                          //     width={20}
                                          //     height={20}
                                             
                                          //     color="black"
                                          //   />
                                          // </IconButton>
                                          <button onClick={handleSurveyform} style={{border: 'none', outline: 'none', background: 'transparent', cursor: 'pointer'}}>
                                                 <svg xmlns="http://www.w3.org/2000/svg" color="black" width="1.5em" height="1.5em" viewBox="0 0 36 36"><path fill="currentColor" d="M21 12H7a1 1 0 0 1-1-1V7a1 1 0 0 1 1-1h14a1 1 0 0 1 1 1v4a1 1 0 0 1-1 1ZM8 10h12V7.94H8Z" class="clr-i-outline clr-i-outline-path-1"/><path fill="currentColor" d="M21 14.08H7a1 1 0 0 0-1 1V19a1 1 0 0 0 1 1h11.36L22 16.3v-1.22a1 1 0 0 0-1-1ZM20 18H8v-2h12Z" class="clr-i-outline clr-i-outline-path-2"/><path fill="currentColor" d="M11.06 31.51v-.06l.32-1.39H4V4h20v10.25l2-1.89V3a1 1 0 0 0-1-1H3a1 1 0 0 0-1 1v28a1 1 0 0 0 1 1h8a3.44 3.44 0 0 1 .06-.49Z" class="clr-i-outline clr-i-outline-path-3"/><path fill="currentColor" d="m22 19.17l-.78.79a1 1 0 0 0 .78-.79Z" class="clr-i-outline clr-i-outline-path-4"/><path fill="currentColor" d="M6 26.94a1 1 0 0 0 1 1h4.84l.3-1.3l.13-.55v-.05H8V24h6.34l2-2H7a1 1 0 0 0-1 1Z" class="clr-i-outline clr-i-outline-path-5"/><path fill="currentColor" d="m33.49 16.67l-3.37-3.37a1.61 1.61 0 0 0-2.28 0L14.13 27.09L13 31.9a1.61 1.61 0 0 0 1.26 1.9a1.55 1.55 0 0 0 .31 0a1.15 1.15 0 0 0 .37 0l4.85-1.07L33.49 19a1.6 1.6 0 0 0 0-2.27ZM18.77 30.91l-3.66.81l.89-3.63L26.28 17.7l2.82 2.82Zm11.46-11.52l-2.82-2.82L29 15l2.84 2.84Z" class="clr-i-outline clr-i-outline-path-6"/><path fill="none" d="M0 0h36v36H0z"/></svg>
                                            </button>
                                        
                                        ) : (
                                          ''
                                        )}
                                      </>
                                    ) : null
                                  ) : session?.type == 10 ? (
                                    itm?.is_green_survey ? (
                                      // <IconButton onClick={handleform}>
                                      //   <Icon
                                      //     icon="clarity:form-line"
                                      //     width={20}
                                      //     height={20}
                                      //     color="green"
                                      //   />
                                      // </IconButton>
                                      <button onClick={handleform} style={{ border: 'none', outline: 'none', background: 'transparent', cursor: 'pointer'}}>
                                         <svg xmlns="http://www.w3.org/2000/svg" color="green" width="1.5em" height="1.5em" viewBox="0 0 36 36"><path fill="currentColor" d="M21 12H7a1 1 0 0 1-1-1V7a1 1 0 0 1 1-1h14a1 1 0 0 1 1 1v4a1 1 0 0 1-1 1ZM8 10h12V7.94H8Z" class="clr-i-outline clr-i-outline-path-1"/><path fill="currentColor" d="M21 14.08H7a1 1 0 0 0-1 1V19a1 1 0 0 0 1 1h11.36L22 16.3v-1.22a1 1 0 0 0-1-1ZM20 18H8v-2h12Z" class="clr-i-outline clr-i-outline-path-2"/><path fill="currentColor" d="M11.06 31.51v-.06l.32-1.39H4V4h20v10.25l2-1.89V3a1 1 0 0 0-1-1H3a1 1 0 0 0-1 1v28a1 1 0 0 0 1 1h8a3.44 3.44 0 0 1 .06-.49Z" class="clr-i-outline clr-i-outline-path-3"/><path fill="currentColor" d="m22 19.17l-.78.79a1 1 0 0 0 .78-.79Z" class="clr-i-outline clr-i-outline-path-4"/><path fill="currentColor" d="M6 26.94a1 1 0 0 0 1 1h4.84l.3-1.3l.13-.55v-.05H8V24h6.34l2-2H7a1 1 0 0 0-1 1Z" class="clr-i-outline clr-i-outline-path-5"/><path fill="currentColor" d="m33.49 16.67l-3.37-3.37a1.61 1.61 0 0 0-2.28 0L14.13 27.09L13 31.9a1.61 1.61 0 0 0 1.26 1.9a1.55 1.55 0 0 0 .31 0a1.15 1.15 0 0 0 .37 0l4.85-1.07L33.49 19a1.6 1.6 0 0 0 0-2.27ZM18.77 30.91l-3.66.81l.89-3.63L26.28 17.7l2.82 2.82Zm11.46-11.52l-2.82-2.82L29 15l2.84 2.84Z" class="clr-i-outline clr-i-outline-path-6"/><path fill="none" d="M0 0h36v36H0z"/></svg>
                                     </button>
                                    ) : session?.type == 10 && session?.check_in != '0' ? (
                                      <IconButton
                                        onClick={() => {
                                          // callGelathiFormComponent(index , itm?.gelathi_id  )
                                          // if we want to see filed form means need to call another component so that time we can use this kind of methods to call instead of rendering inside the map
                                        }}
                                      >
                                       {!localFormPresent.has(itm?.gelathi_id) && <GreenSurvey itm={itm} componentreloadmethod ={componentreloadmethod} />}
                                        {localFormPresent.has(itm?.gelathi_id) ? (
                                          //   <IconButton onClick={handleSurveyform}>
                                          //   <Icon
                                          //     icon="clarity:form-line"
                                          //     width={20}
                                          //     height={20}
                                             
                                          //     color="black"
                                          //   />
                                          // </IconButton>
                                          <button onClick={handleSurveyform} style={{border: 'none', outline: 'none', background: 'transparent', cursor: 'pointer'}}>
                                                 <svg xmlns="http://www.w3.org/2000/svg" color="black" width="1.5em" height="1.5em" viewBox="0 0 36 36"><path fill="currentColor" d="M21 12H7a1 1 0 0 1-1-1V7a1 1 0 0 1 1-1h14a1 1 0 0 1 1 1v4a1 1 0 0 1-1 1ZM8 10h12V7.94H8Z" class="clr-i-outline clr-i-outline-path-1"/><path fill="currentColor" d="M21 14.08H7a1 1 0 0 0-1 1V19a1 1 0 0 0 1 1h11.36L22 16.3v-1.22a1 1 0 0 0-1-1ZM20 18H8v-2h12Z" class="clr-i-outline clr-i-outline-path-2"/><path fill="currentColor" d="M11.06 31.51v-.06l.32-1.39H4V4h20v10.25l2-1.89V3a1 1 0 0 0-1-1H3a1 1 0 0 0-1 1v28a1 1 0 0 0 1 1h8a3.44 3.44 0 0 1 .06-.49Z" class="clr-i-outline clr-i-outline-path-3"/><path fill="currentColor" d="m22 19.17l-.78.79a1 1 0 0 0 .78-.79Z" class="clr-i-outline clr-i-outline-path-4"/><path fill="currentColor" d="M6 26.94a1 1 0 0 0 1 1h4.84l.3-1.3l.13-.55v-.05H8V24h6.34l2-2H7a1 1 0 0 0-1 1Z" class="clr-i-outline clr-i-outline-path-5"/><path fill="currentColor" d="m33.49 16.67l-3.37-3.37a1.61 1.61 0 0 0-2.28 0L14.13 27.09L13 31.9a1.61 1.61 0 0 0 1.26 1.9a1.55 1.55 0 0 0 .31 0a1.15 1.15 0 0 0 .37 0l4.85-1.07L33.49 19a1.6 1.6 0 0 0 0-2.27ZM18.77 30.91l-3.66.81l.89-3.63L26.28 17.7l2.82 2.82Zm11.46-11.52l-2.82-2.82L29 15l2.84 2.84Z" class="clr-i-outline clr-i-outline-path-6"/><path fill="none" d="M0 0h36v36H0z"/></svg>
                                            </button>
                                        ) : (
                                          ''
                                        )}
                                      </IconButton>
                                    ) : null
                                  ) : session?.type == 16 ? (
                                    itm?.is_vyapar_survey ? (
                                      // <IconButton onClick={handleform}>
                                      //   <Icon
                                      //     icon="clarity:form-line"
                                      //     width={20}
                                      //     height={20}
                                         
                                      //     color="green"
                                      //   />
                                      // </IconButton>
                                      <button onClick={handleform} style={{ border: 'none', outline: 'none', background: 'transparent', cursor: 'pointer'}}>
                                          <svg xmlns="http://www.w3.org/2000/svg" color="green" width="1.5em" height="1.5em" viewBox="0 0 36 36"><path fill="currentColor" d="M21 12H7a1 1 0 0 1-1-1V7a1 1 0 0 1 1-1h14a1 1 0 0 1 1 1v4a1 1 0 0 1-1 1ZM8 10h12V7.94H8Z" class="clr-i-outline clr-i-outline-path-1"/><path fill="currentColor" d="M21 14.08H7a1 1 0 0 0-1 1V19a1 1 0 0 0 1 1h11.36L22 16.3v-1.22a1 1 0 0 0-1-1ZM20 18H8v-2h12Z" class="clr-i-outline clr-i-outline-path-2"/><path fill="currentColor" d="M11.06 31.51v-.06l.32-1.39H4V4h20v10.25l2-1.89V3a1 1 0 0 0-1-1H3a1 1 0 0 0-1 1v28a1 1 0 0 0 1 1h8a3.44 3.44 0 0 1 .06-.49Z" class="clr-i-outline clr-i-outline-path-3"/><path fill="currentColor" d="m22 19.17l-.78.79a1 1 0 0 0 .78-.79Z" class="clr-i-outline clr-i-outline-path-4"/><path fill="currentColor" d="M6 26.94a1 1 0 0 0 1 1h4.84l.3-1.3l.13-.55v-.05H8V24h6.34l2-2H7a1 1 0 0 0-1 1Z" class="clr-i-outline clr-i-outline-path-5"/><path fill="currentColor" d="m33.49 16.67l-3.37-3.37a1.61 1.61 0 0 0-2.28 0L14.13 27.09L13 31.9a1.61 1.61 0 0 0 1.26 1.9a1.55 1.55 0 0 0 .31 0a1.15 1.15 0 0 0 .37 0l4.85-1.07L33.49 19a1.6 1.6 0 0 0 0-2.27ZM18.77 30.91l-3.66.81l.89-3.63L26.28 17.7l2.82 2.82Zm11.46-11.52l-2.82-2.82L29 15l2.84 2.84Z" class="clr-i-outline clr-i-outline-path-6"/><path fill="none" d="M0 0h36v36H0z"/></svg>
                                     </button>
                                    ) : 
                                    session?.type == 16 && session?.check_in != '0' ? (
                                      
                                      <IconButton
                                      >
                                        {!localFormPresent.has(itm?.gelathi_id) && 
                                        <Vyaparprogram itm={itm}  componentreloadmethod={componentreloadmethod} />}
                                        {localFormPresent.has(itm?.gelathi_id) ? ( 
                                          // <Tooltip title="Its Field in Offline Mode">
                                          //   <ErrorOutlinedIcon />
                                          // </Tooltip>
                                        //   <IconButton onClick={handleSurveyform}>
                                        //   <Icon
                                        //     icon="clarity:form-line"
                                        //     width={20}
                                        //     height={20}
                                           
                                        //     color="black"
                                        //   />
                                        // </IconButton>
                                        <button onClick={handleSurveyform} style={{border: 'none', outline: 'none', background: 'transparent', cursor: 'pointer'}}>
                                           <svg xmlns="http://www.w3.org/2000/svg" color="black" width="1.5em" height="1.5em" viewBox="0 0 36 36"><path fill="currentColor" d="M21 12H7a1 1 0 0 1-1-1V7a1 1 0 0 1 1-1h14a1 1 0 0 1 1 1v4a1 1 0 0 1-1 1ZM8 10h12V7.94H8Z" class="clr-i-outline clr-i-outline-path-1"/><path fill="currentColor" d="M21 14.08H7a1 1 0 0 0-1 1V19a1 1 0 0 0 1 1h11.36L22 16.3v-1.22a1 1 0 0 0-1-1ZM20 18H8v-2h12Z" class="clr-i-outline clr-i-outline-path-2"/><path fill="currentColor" d="M11.06 31.51v-.06l.32-1.39H4V4h20v10.25l2-1.89V3a1 1 0 0 0-1-1H3a1 1 0 0 0-1 1v28a1 1 0 0 0 1 1h8a3.44 3.44 0 0 1 .06-.49Z" class="clr-i-outline clr-i-outline-path-3"/><path fill="currentColor" d="m22 19.17l-.78.79a1 1 0 0 0 .78-.79Z" class="clr-i-outline clr-i-outline-path-4"/><path fill="currentColor" d="M6 26.94a1 1 0 0 0 1 1h4.84l.3-1.3l.13-.55v-.05H8V24h6.34l2-2H7a1 1 0 0 0-1 1Z" class="clr-i-outline clr-i-outline-path-5"/><path fill="currentColor" d="m33.49 16.67l-3.37-3.37a1.61 1.61 0 0 0-2.28 0L14.13 27.09L13 31.9a1.61 1.61 0 0 0 1.26 1.9a1.55 1.55 0 0 0 .31 0a1.15 1.15 0 0 0 .37 0l4.85-1.07L33.49 19a1.6 1.6 0 0 0 0-2.27ZM18.77 30.91l-3.66.81l.89-3.63L26.28 17.7l2.82 2.82Zm11.46-11.52l-2.82-2.82L29 15l2.84 2.84Z" class="clr-i-outline clr-i-outline-path-6"/><path fill="none" d="M0 0h36v36H0z"/></svg>
                                        </button>
                                        ) : (
                                          ''
                                        )}
                                      </IconButton>
                                    ) : 
                                    (
                                      <></>
                                    )
                                  ) : (
                                    <></>
                                  )} </div>
                                </CardContent>
                              </Card>
                            );
                          })}
                        </>
                      ) : (
                        <CardContent>
                          <Typography style={{ textAlign: 'center', alignItems: 'center', fontWeight: 700 }}>
                            No Survey
                          </Typography>
                        </CardContent>
                      )}
                    </Card>
                    {showForm && (
              <GelathiCircleForm
                index={selectedFromIndex.index}
                // reloadmethod={reloadmethod}
                // itm={itm } 
                // clcikData={clcikData}
                // circleData={circleData}
                // singleCircleData={singleCircleData}
                id={selectedFromIndex.id}
                setShowForm={setShowForm}
                componentreloadmethod={componentreloadmethod}
                // gelathiDrawerReloder={gelathiDrawerReloder}
              />
            )}
          {/* {gelathisData?.gelathis?.map((itm,index)=>{
return (
  <Card style={{borderRadius:0}}>
   
    <CardContent style={{display:'flex',justifyContent: 'space-between'}}>
  <div style={{alignItems:"flex-start"}}> {itm?.firstName}</div> 
  <div style={{alignItems:"flex-end"}}>  {
    (( session?.type == 4) )? (
                            (itm?.is_survey)?
                            <IconButton 
                             
                              onClick={handleform}
                            >
                              <Icon icon="clarity:form-line" width={20} height={20} color="green" />
                            </IconButton>
                            : (session?.type==4 && session?.check_in != "0")? (
                            <IconButton
                          
                            onClick={() => {
                               callGelathiFormComponent(index, itm?.gelathi_id);
                             
                            }}
                          >
                            <Icon icon="clarity:form-line" width={20} height={20} color="#ff7424" />
                          </IconButton>
                          ):null
                          ) : 
                          (( session?.type == 10) )? (
                            (itm?.is_green_survey)?
                            <IconButton
                             
                            onClick={handleform}
                            >
                              <Icon icon="clarity:form-line" width={20} height={20} color="green" />
                            </IconButton>
                            : (session?.type==10 && session?.check_in != "0" )? (
                                <IconButton
                           
                              onClick={() => {
                                // callGelathiFormComponent(index , itm?.gelathi_id  )
                                // if we want to see filed form means need to call another component so that time we can use this kind of methods to call instead of rendering inside the map
                              }}
                            >
                              <GreenSurvey itm={itm }  />
                               </IconButton>
                             
                          ):null
                          ) : (( session?.type == 16) )? (
                            (itm?.is_vyapar_survey)?
                            <IconButton
                            
                            onClick={handleform}
                            >
                              <Icon icon="clarity:form-line" width={20} height={20} color="green" />
                            </IconButton>
                            : (session?.type==16 && session?.check_in != "0")? (
                              <IconButton
                          
                              onClick={() => {
                                // callGelathiFormComponent(index , itm?.gelathi_id  )
                                // if we want to see filed form means need to call another component so that time we can use this kind of methods to call instead of rendering inside the map
                              }}
                            >
                              <Vyaparprogram itm={itm }  />
                           </IconButton>
                          ):<></>
                          ): <></>
    }</div>
</CardContent>
  </Card>
  
)
          })}:<CardContent>
            <Typography style={{textAlign:'center',alignItems:'center',fontWeight:700}}>No Survey</Typography></CardContent>
             */}
        


            {/* {showGreenFrom && <GreenSurvey itm={formData } />} */}
      <Button
                  style={{ color: 'white', marginTop: 20, marginLeft: 20, marginBottom: 20,backgroundColor:'#ff7424' }}
                  onClick={()=>{
                   setSurvey(false)
                  }}
                >
                   Cancel
                  </Button>
        </div>
        </Stack>
  ):null
}
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
              </Card>{' '}
            </div>
          </Stack>
        </Scrollbar>
        </>}
       
      </Drawer>
    </>
  );
}
