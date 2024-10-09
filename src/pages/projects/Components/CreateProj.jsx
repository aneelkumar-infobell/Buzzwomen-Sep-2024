import React, { useEffect, useState } from 'react'
import axios from 'axios';
import { Button, CardContent, Card, Grid, FormControl, InputLabel, MenuItem, Select, TextField, Stack, Snackbar, Alert, Modal, Box } from '@mui/material';
import Dialog from '@mui/material/Dialog';
import ListItemText from '@mui/material/ListItemText';
import moment from 'moment'
import ListItem from '@mui/material/ListItem';
import List from '@mui/material/List';
import Divider from '@mui/material/Divider';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import CloseIcon from '@mui/icons-material/Close';
import Slide from '@mui/material/Slide';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import Addbus from '../../buses/Addbus';
import dayjs from 'dayjs';
import AddTrainerDrawer from './AddTrainerDrawer';
import AddGelathifacilitators from './AddGelathifacilitators'
import Add from '@mui/icons-material/Add';
import { useNavigate } from 'react-router-dom';
import CancelIcon from '@mui/icons-material/Cancel';
import Iconify from 'src/components/Iconify';
import { baseURL } from 'src/utils/api';
import { useAuth } from 'src/AuthContext';
import EditIcon from '@mui/icons-material/Edit'; // Pen icon
import FunderApi from 'src/pages/Filters/components/FunderApi';
const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});
 
export default function CreateProj({ createPro, setCreatePro, sendData, viewMessage, edit ,projData}) {
  const { apikey } = useAuth();
  const formatDate = (itm)=>{
    const currentDATE = itm?.split("-")
     const newDate = `${currentDATE[2]}-${currentDATE[1]}-${currentDATE[0]}`
    return newDate
   
   }
  const [data, setData] = useState({ ...sendData,start_date:sendData?.startDate?formatDate(sendData?.startDate):new Date(),end_date:sendData?.endDate?formatDate(sendData?.endDate):new Date()});
  const [open, setOpen] = React.useState(false);
  const [openFilter, setOpenFilter] = useState(false);
  const [opengelathiFilter, setOpengelathiFilter] = useState(false);
  const [partner, setPartner] = useState([])
  const [warn,setWarn]=useState(false)
  const [message,setMessage]=useState(null)
  const minDate = new Date()
  const [notify, setNotify] = useState(false)
  const [busData, setBusData] = useState([])
  const [teamData, setTeamData] = useState([])
  const [trainerData, setTrainerData] = useState([])
  let [name, setName] = useState(sendData?.trainers)
  let [gelathiName, setGelathiName] = useState(sendData?.gelathiFacilitator)
  const [driverData, setDriverData] = useState([])
  const [deleteData, setDeleteData] = useState([])
const [createProj ,setCreateProj] = useState(true)
const [assproject,setAssproject]=useState([])
const [isReload , setIsReload]= useState(false)
const [openFunderModal, setOpenFunderModal] = useState(false);
const [funderList, setFunderList] = useState([]);
const [selectedFunder, setSelectedFunder] = useState('');
  const [Gf,setGf]=useState([]);
  const handleClickOpen = () => {
    setOpen(true);
  };
  const handleOpenFilter = () => {
    setOpenFilter(true);
  };
  const handleCloseFilter = () => {
    setOpenFilter(false);
  };
  const handlegelathiOpenFilter = () => {
    setOpengelathiFilter(true);
  };
  const handlegelathiCloseFilter = () => {
    setOpengelathiFilter(false);
  };
  const handleClose = () => {
    setOpen(false);
  };
  useEffect(() => {
    if (edit) {
      setOpen(true);
      assignValues()
    }
setShowAddBuss(false)
    partnerList();
    teamList();
    driverList();
    setNotify(true);
  }, [])
  const assignValues = () => {
    let tempdata = {
      ...sendData,
      startDate: sendData.startDate,
      endDate: sendData.endDate,
      operations_manager_id: sendData.operations_manager_id,
      driver_id: sendData.driverId,
      training_target:sendData.training_target,
      project_id:sendData.project_id,
      gfl_id:sendData.gfl_id
    }
    setData(tempdata)
  }
  const partnerList = async => {
    var config = {
      method: 'post',
      url: baseURL +'getPartnerList',
      headers: {
         'Authorization': `${apikey}`
      }
    };
    axios(config)
      .then(function (response) {
        setPartner(response.data)
      })
      .catch(function (error) {
        // console.log(error);
      });
  }
  const busList = async => {
    var config = {
      method: 'post',
      url: baseURL + 'getBusList',
      headers: {
        'Authorization': `${apikey}`
      }
    };
    axios(config)
      .then(function (response) {
        setBusData(response.data)
      })
      .catch(function (error) {
        // console.log(error);
      });
  }
  const teamList = async => {
    var config = {
      method: 'post',
      url: baseURL + 'getOperationsManagerList',
      headers: {
        'Authorization': `${apikey}`
      }
    };
    axios(config)
      .then(function (response) {
        setTeamData(response.data)
       
      })
      .catch(function (error) {
        // console.log(error);
      });
  }
  const driverList = async => {
    var config = {
      method: 'post',
      url: baseURL + 'getDriverList',
      headers: {
         'Authorization': `${apikey}`
      }
    };
    axios(config)
      .then(function (response) {
        setDriverData(response.data)
      })
      .catch(function (error) {
        // console.log(error);
      });
  }

var userdata = (sendData?.operations_manager_id)?sendData?.operations_manager_id: JSON.parse(sessionStorage.getItem('operations_manager_id'))
 
useEffect(() => {
    Gfl();
  },[userdata])

  const Gfl = async()=>{
    
    var data = JSON.stringify({
      "user_id": JSON.stringify(parseInt(userdata))
      });
    var config = {
      method: 'post',
      url: baseURL+'getgfl',
      headers: { 
        'Content-Type': 'application/json',
        'Authorization': `${apikey}`
      },
      data : data
    };
axios(config)
.then(function (response) {
  setGf(response.data.gfl_list);
})
.catch(function (error) {
  // console.log(error);
});
  
  }
 
  const createProject2 = () => {

    if(data.operations_manager_id<=0 || data.operations_manager_id == ''){
      setWarn(true)
      setMessage("Please Add operations manager")
  
     }
     else if(data.driverId.length<=0 || data.driverId.length==""){
      setWarn(true)
      setMessage("Please Add Driver ")
     }
   else{
    var userid = JSON.parse(sessionStorage.getItem('userDetails'))?.id
    var formdata = new FormData();
    setCreatePro(false)
    formdata.append('user_id', userid);
    formdata.append('project_id', data.project_id)
    formdata.append('partnerID', data.partner_id)
    formdata.append('training_target', data.training_target)
    // formdata.append('start_date', moment(data.start_date)?.format('DD-MM-YYYY'))
    // formdata.append('end_date', moment(data.end_date)?.format('DD-MM-YYYY'))
    if (data?.start_date) {
      formdata.append('start_date', moment(data?.start_date).format('DD-MM-YYYY'));
    }
    else{
      formdata.append('start_date', data?.startDate);
    }
    //  formdata.append('end_date', moment(data.end_date)?.format('DD-MM-YYYY'))
    if (data?.end_date) {
      formdata.append('end_date', moment(data?.end_date)?.format('DD-MM-YYYY'));
    }
    else{
      formdata.append('end_date',data?.endDate);
    }
    formdata.append('busID', data.bus_id)
    formdata.append('driverID', data.driverId)
    formdata.append("gfl_id",data.gfl_id)
    formdata.append("operations_manager_id", data.operations_manager_id)
    formdata.append("locationID", data.location_id)
    formdata.append("location_name", data.location_name),
    formdata.append("publish", 1)
    var config = {
      method: 'post',
      url: baseURL + 'createProject',
      headers: {
        'Authorization': `${apikey}`
      },
      data: formdata
    };
    axios(config)
      .then(function (response) {
        projData();
        viewMessage('Project added sucessfully')
        
      })
      .catch(function (error) {
        // console.log(error);
      });
   }
  }
  const createProjectpublish = () => {
     var userid = JSON.parse(sessionStorage.getItem('userDetails'))?.id
     var formdata = new FormData();
     setCreatePro(false)
     formdata.append('user_id', userid);
     formdata.append('project_id', data.project_id)
     formdata.append('partnerID', data.partner_id)
     formdata.append('training_target', data.training_target)
    //  formdata.append('start_date', moment(data.start_date)?.format('DD-MM-YYYY'))
    if (data?.start_date) {
      formdata.append('start_date', moment(data?.start_date).format('DD-MM-YYYY'));
    }
    else{
      formdata.append('start_date', data?.startDate);
    }
    //  formdata.append('end_date', moment(data.end_date)?.format('DD-MM-YYYY'))
    if (data?.end_date) {
      formdata.append('end_date', moment(data?.end_date)?.format('DD-MM-YYYY'));
    }
    else{
      formdata.append('end_date',data?.endDate);
    }
     formdata.append('busID', data.bus_id)
     formdata.append('driverID', data.driverId)
     formdata.append("operations_manager_id", data.operations_manager_id)
     formdata.append("gfl_id",data.gfl_id)
     formdata.append("locationID", data.location_id)
     formdata.append("location_name", data.location_name),
     formdata.append("", "")
     var config = {
       method: 'post',
       url: baseURL + 'createProject',
       headers: {
        'Authorization': `${apikey}`
       },
       data: formdata
     };
 
     axios(config)
       .then(function (response) {
         projData();
         viewMessage('Project added sucessfully')
      
       })
       .catch(function (error) {
        //  console.log(error);
       });
    
   }
   useEffect(()=>{
     Gfl()
  },[data?.operations_manager_id])
const [showAddBuss , setShowAddBuss] = useState(false)
const [showbusForm ,setShowBusForm] =useState(true)
const mainShowBussHandler = ()=>{
  setShowBusForm(true)
  setShowAddBuss(false)
  setIsReload(!isReload)
}
  const navigate = useNavigate();
  const addBusHandler =()=>{
    setShowAddBuss(true)
   
  }
  useEffect(()=>{
    busList();
  }, [showAddBuss])
  // Function to fetch funder list when modal opens
  const handleOpenFunderModal = async () => {
    setOpenFunderModal(true);
    const funders = await FunderApi({ selectDATA: 1, apikey }); // Adjust `selectDATA` based on your needs
    if (funders) {
      setFunderList(funders);
    }
  };

  const handleCloseFunderModal = () => setOpenFunderModal(false);
  const handleFunderChange = (event) => {
    setSelectedFunder(event.target.value);
    ContactlessOutlined.log(event.target.value )
  };
   // Function to call assignNewFunder API and then getprojectData API
   const handleSave = async () => {
    const project_id = sendData?.project_id || sendData?.projectId; // Adjust based on your data structure
    const payload = {
      funderID:parseInt(selectedFunder) ,
      project_id: parseInt(project_id)
    };

    try {
      // Call the assignNewFunder API
      const response = await axios.post(baseURL +'assignNewFunder', payload, {
        headers: {
          'Authorization': apikey,
          'Content-Type': 'application/json'
        }
      });

      console.log(response.data.code,"responseresponseresponse") 
     if(response.data.code == 200) {
        // On success, call the getprojectData API
        await projData();
        // Close the modal after both API calls are successful
        handleCloseFunderModal();
      } else {
        console.error("Failed to assign new funder.");
      }
    } catch (error) {
      console.error("Error while assigning funder: ", error);
    }
  };
  return (
    <div>
      {
        !edit && <Button fullWidth variant="filled" onClick={handleClickOpen}>
          Create New Project
        </Button>
      }
      <Dialog
        fullScreen
        open={createPro}
        onClose={handleClose}
        TransitionComponent={Transition}
      >
        <form onSubmit={(e) => { e.preventDefault(); createProjectpublish() }}>
          <AppBar sx={{ position: 'fixed', bgcolor: '#ed6c02' }}>
            <Toolbar id="create-proj-toolbar">
             <IconButton id="start-icon-button" edge="start" color="inherit" onClick={()=>{setCreatePro(false)}}> <CloseIcon/></IconButton>
              <IconButton id="material-symbol-save" edge="end"  autoFocus color="inherit" type="submit" sx={{right:40,float:'right',position:'absolute'}}>
                 <Iconify icon="material-symbols:save"/>
              </IconButton>
               <Button  id="publish" autoFocus color="inherit" sx={{float:'right',color: "inherit"}}  variant="h6" onClick={createProject2}>
                publish
              </Button>
            </Toolbar>
          </AppBar>
          <Grid sx={{marginTop:5}}>
            <CardContent>
            <Snackbar id="alert-message" open={warn} autoHideDuration={3000} onClose={() => { setWarn(false) }}>
                <Alert onClose={() => { setWarn(false) }} severity="warning" sx={{ width: '100%' }}>
                {message}
                </Alert>
              </Snackbar>
              {(!edit)?<Snackbar id="success-alert-snackbar" open={notify} autoHideDuration={3000} onClose={() => { setNotify(false) }}>
                <Alert onClose={() => { setNotify(false) }} severity="success" sx={{ width: '100%' }}>
                  Project created succesfully
                </Alert>
              </Snackbar>:null}
              <Card style={{ top: 15 }}>
                <CardContent>
                  <Typography id="project-text" sx={{ ml: 2, flex: 1 }} variant="h6" component="div">
                    Project : {edit ? sendData?.project_name : sendData?.projectname}
                  </Typography>
                  <Typography id="district-text" sx={{ ml: 2, flex: 1 }} variant="h6" component="div">
                    District : {edit ? sendData?.location_name : sendData?.locationName}
                  </Typography>
                  <Typography id="district-text" sx={{ ml: 2, flex: 1 }} variant="h6" component="div">
                    Funder : {edit ? sendData?.funder_name : sendData?.funder_name}
                    <IconButton onClick={handleOpenFunderModal} aria-label="edit" size="small" sx={{ color: '#ed6c02' }}>
              <EditIcon />
            </IconButton>
                  </Typography>
                </CardContent>
              </Card>
            </CardContent>
          </Grid>
          <Grid>
            <CardContent id="project-det">
              <Typography style={{ marginLeft: 10 }} variant="h6">Project Details  :</Typography>
            </CardContent>
            <CardContent>
              <Stack>
                <FormControl fullWidth>
                  <InputLabel color="common" id="Partner"> Select Partner</InputLabel>
                  <Select
                    required
                    labelId="Partner-label"
                    id="select_partner"
                    value={data.partner_id}
                    label="Select Partner"
                    onChange={(e => {
                      setData({ ...data, partner_id: e?.target?.value })
                    })}
                  >
                    {/* <MenuItem value="" >Choose Partner </MenuItem> */}
                    {partner?.list?.map(itm => {
                      return (
                        <MenuItem value={itm?.partnerID}>{itm?.partnerName}</MenuItem>
                      )
                    })
                    }
                  </Select>
                </FormControl></Stack>
            </CardContent>
            <CardContent>
              <Stack mt={1} mb={2}>
                <TextField id="Training Target" type="number"  defaultValue={data?.training_target} color="common" onChange={(e) => { setData({ ...data, training_target: e?.target?.value }) }} label="Training Target" variant="outlined" />
              </Stack>
            </CardContent>
            <Divider />
            <Grid>
              <CardContent id="project-from-to">
                <Typography style={{ marginLeft: 10 }} variant="h6">Project From / To Dates :</Typography>
              </CardContent>
              <Stack>
                <CardContent>
                  <TextField id="start-date" type="date"
                    required
                   // defaultValue={dayjs(data?.start_date)}
                   defaultValue={data?.start_date}
                    style={{ width: '20vw' }}
                    
                    InputProps={{
                      inputProps: { min: moment(new Date())?.format('DD-MM-YYYY') }
                    }}
                    value={data.start_date}
                    onChange={(e) => {
                      setData({ ...data, start_date: e?.target?.value })
                    }} />
                  <TextField id="end-date" type="date" required
                defaultValue={data?.end_date?dayjs( moment(data?.end_date)?.format('DD-MM-YYYY')):dayjs( moment(data?.endDate)?.format('DD-MM-YYYY'))}
                    style={{ width: '20vw', marginLeft: "2rem" }}
                    value={data.end_date}
                    InputProps={{
                      inputProps: { min: moment(data.start_date)?.format('DD-MM-YYYY') }
                    }}
                  
                    onChange={(e) => {
                      setData({ ...data, end_date: e?.target?.value })
                    }} />
                  
                
                </CardContent>
              </Stack>
            </Grid>
            <Divider />
            <CardContent>
              <Stack >
                <CardContent style={{padding:"9px"}} >
                <Typography  style={{ width: '20vw' }}variant="h6">Resources</Typography>
              <Button onClick={addBusHandler} id="add new bus" style={{ width: '20vw', marginLeft: "80%", marginTop:"-41px" ,backgroundColor: '#ed6c02', color:"white" }}>Add New Bus</Button>
                </CardContent>
              </Stack>
              
             
             
      {showAddBuss?<Addbus showAddBuss={showAddBuss} createProj={showbusForm} showBussHandler={mainShowBussHandler}/>: null}  
     
    
              <Stack mt={2}>
                <FormControl fullWidth>
                  <InputLabel id="Bus" color="common">Select Bus</InputLabel>
                  <Select id="select-bus"
                    // labelId="demo-simple-select-label"
                    //id="demo-simple-select"
                    defaultValue={data.bus_id}
                    value={data.bus_id}
                    label="Select Bus"
                    onChange={(e => {
                      setData({ ...data, bus_id: e?.target?.value })
                    })}
                  >
                    <MenuItem id="choose-bus" value="" default disabled>Choose Bus</MenuItem>
                    {busData?.list?.map(itm => {
                      return (
                        <MenuItem value={itm?.id}>{itm?.register_number}</MenuItem>
                      )
                    })
                    }
                  </Select>
                </FormControl ></Stack >
            </CardContent >
            <Divider />
            <CardContent>
              <Typography id="team-members" variant="h6">Team Members</Typography>
              <Stack mt={3}>
                <FormControl fullWidth>
                  <InputLabel id="operation_manager_value">Select Operation Manager</InputLabel>
                  <Select 
                    id="select-operation-manager"
                    defaultValue={data.operations_manager_id}
                
                    value={data.operations_manager_id}
                    
                    label="Select Operation Manager"
                    onChange={(e => {
                      setData({ ...data, operations_manager_id: e?.target?.value });
                      sessionStorage.setItem("operations_manager_id", e?.target?.value)
                    })}
                  >
                    <MenuItem id="operation-manager" value="" default disabled>Choose Operation Manager</MenuItem>
                    {teamData?.list?.map(itm => {
                      return (
                        <MenuItem value={itm?.id}>{itm?.first_name}</MenuItem>
                      )
                    })
                    }
                  </Select>
                </FormControl ></Stack >
              <Stack mt={3}>
                <FormControl fullWidth>
                  <InputLabel id="driver">Select Driver</InputLabel>
                  <Select
                    // labelId="demo-simple-select-label"
                    id="select_driver"
                    value={data.driverId}
                    defaultValue={data.driverId}
                    label="Select Driver"
                    onChange={(e => {
                      setData({ ...data, driverId: e?.target?.value })
                      // driverList(e?.target?.value)
                    })}
                  >
                    <MenuItem id="choose-driver" value="" default disabled>Choose Driver</MenuItem>
                    {driverData?.list?.map(itm => {
                      return (
                        <MenuItem value={itm?.id}>{itm?.first_name}</MenuItem>
                      )
                    })
                    }
                  </Select>
                </FormControl></Stack> 
                <Stack mt={3}>
                <FormControl fullWidth>
                  <InputLabel id="driver">Select Gelathi Facilitator Leads</InputLabel>
                 {(Gf?.length>0)? <Select
                    id="select_GF"
                    value={data.gfl_id}
                    defaultValue={data.gfl_id}
                    label="Select Gelathi Facilitator Lead"
                    onChange={(e => {
                      setData({ ...data, gfl_id: e?.target?.value })
                      // driverList(e?.target?.value)
                    })}
                  >
                    <MenuItem id="Choose Gelathi Facilitator Lead" value="" default disabled>Choose Gelathi Facilitator Lead</MenuItem>
                    {Gf?.map(itm => {
                      return (
                        <MenuItem value={itm?.id}>{itm?.first_name}</MenuItem>
                      )
                    })
                    }
                  </Select>:<Select label="Select Gelathi Facilitator Lead"><MenuItem id="Select Gelathi Facilitator Lead" value="" disabled>No Gelathi Facilitator Lead</MenuItem></Select>}
                </FormControl></Stack>  
               
            </CardContent>
            <Divider />
            {data?.operations_manager_id && <AddTrainerDrawer id="add_trainers"
              isOpenFilter={openFilter}
              getData={(e) => { setName(e) }}
              operations_manager_id={data.operations_manager_id}
              onOpenFilter={handleOpenFilter}
              sendData={sendData}
              name={name}
              onCloseFilter={handleCloseFilter}
            />}
            {data?.operations_manager_id && <AddGelathifacilitators id="add_gelathifacilitators"
              sendData={sendData}
              isOpenFilter={opengelathiFilter}
              operations_manager_id={data.operations_manager_id}
              getData={(e) => { setGelathiName(e) }}
              onOpenFilter={handlegelathiOpenFilter}
              onCloseFilter={handlegelathiCloseFilter}
            />}
           
            <CardContent>
              <Card onClick={() => {
              
                handleOpenFilter()
              }}>
                <CardContent>
                 
                  <div id="trainerslist" style={{fontWeight:700}} >Trainers   ({(name?.length?name?.length:0)})<IconButton id="trainerdrawer" style={{float:'right'}}>
                      <Iconify style={{ color: "black" }} icon="material-symbols:add" />
                    </IconButton></div>
                 
            
                  {name?.length !== 0 &&
                    <Card style={{ marginTop: 10 }}>
                      <CardContent>
                        <Stack direction={'row'} spacing={4}>
                       
                          {name?.map((i, index) => {
                            return (
                              <Stack direction={'row'} >
                                <Typography mt={2} variant='subtitle2'>{i?.name}</Typography>
                                <Stack style={{ marginLeft: 20 }} mt={2} >
                               
                                </Stack>
                              </Stack>
                            )
                          })
                          }
                           
                        </Stack >
                      </CardContent >
                    </Card >
                  }
                </CardContent >
              </Card >
            </CardContent >
            <CardContent>
              <Card onClick={() => {
                handlegelathiOpenFilter()
              }}>
                <CardContent>
                <div id="gelathi-facilators-list" style={{fontWeight:700}}>Gelathi Facilators  ({gelathiName?.length?gelathiName?.length:0})
                  <IconButton id="gelathidrawer" style={{float:'right'}}>
                      <Iconify style={{ color: "black" }} icon="material-symbols:add" />
                    </IconButton>
                  
                    
                    </div>
                  {gelathiName?.length !== 0 &&
                    <Card style={{ marginTop: 10 }}>
                      <CardContent>
                        <Stack spacing={4}  direction={'row'}>
                          {gelathiName?.map(i => {
                            return (
                              <Stack >
                                <Typography mt={2} variant='subtitle2'>{i?.name}</Typography>
                                <Stack style={{ marginLeft: 20 }} mt={2} >
                                 
                                </Stack>
                              </Stack>
                            )
                          })}
                        </Stack>
                      </CardContent>
                    </Card>
                  }
                </CardContent>
              </Card>
            </CardContent>
          </Grid >
        </form>
        <Modal open={openFunderModal} onClose={handleCloseFunderModal}>
        <Box sx={{ p: 4, backgroundColor: 'white', margin: 'auto', mt: 10, maxWidth: 400 }}>
          <Typography variant="h6" gutterBottom>
            Select Funder
          </Typography>
          <FormControl fullWidth>
            <InputLabel id="funder-select-label">Funder</InputLabel>
            <Select
              labelId="funder-select-label"
              id="funder-select"
              value={selectedFunder}
              label="Funder"
              onChange={handleFunderChange}
            >
              {funderList.map((funder, index) => (
                <MenuItem key={index} value={funder.funderID}>
                  {funder.funderName}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
          <Box sx={{ mt: 2, display: 'flex', justifyContent: 'flex-end', gap: 2 }}>
            <Button variant="contained" sx={{ backgroundColor: '#ed6c02' , '&:hover': {
                        backgroundColor: '#ffffff',
                      },
                      '&:focus': {
                        backgroundColor: 'white',
                      }, }} onClick={handleSave} disabled={!selectedFunder}>
              Save
            </Button>
            <Button variant="outlined" onClick={handleCloseFunderModal}>
              Close
            </Button>
          </Box>
        </Box>
        
      </Modal>
      </Dialog >
    </div >
  );
}