import React, { useEffect, useState } from 'react'
import axios from 'axios';
import { Button, Box, TextField, Stack, CardContent, Card, FormControl, InputLabel, Select, MenuItem } from '@mui/material/';
import Dialog from '@mui/material/Dialog';
import ListItemText from '@mui/material/ListItemText';
import ListItem from '@mui/material/ListItem';
import List from '@mui/material/List';
import Divider from '@mui/material/Divider';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import CloseIcon from '@mui/icons-material/Close';
import Slide from '@mui/material/Slide';
import { DateTimePicker } from '@mui/x-date-pickers/DateTimePicker';
import { DialogContentText } from '@mui/material';
import dayjs from 'dayjs';
import { baseURL} from 'src/utils/api';
import moment from 'moment/moment';
import Iconify from 'src/components/Iconify';
import { useAuth } from 'src/AuthContext';

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});
   
export default function CreateTrainerBatch(props) {
   const { apikey } = useAuth();
  const [open, setOpen] = React.useState(false);
  const [village, setVillage] = useState([]);
  const [date, setDate] = useState("")
  const [trainerData, setTrainerData] = useState({
    "batch_name": "",
    "sub_village": "",
    "project_id": "",
    "contact_person": "",
    "number_of_participants": "",
    "day1": dayjs(new Date()),
    "day2": dayjs(new Date()),
    "location_id": "",
    "contact_number": "",
    "trainer_id": "",
    "talaq_id": ""
  })
  const [data, setData] = useState({
    talaq_id: '',
  })
  const today = dayjs();
  const dateChangeHandler =(e) =>{
    setTrainerData({ ...trainerData, day1: e })
  }
  const endDateChnageHandler = (e)=>{
    setTrainerData({ ...trainerData, day2: e })
  }
  const handleClickOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };
  useEffect(() => {
  if(props?.data1){
    villageList(props?.data1);
  }  
  }, [props?.data1])
  
  const villageList = async(i) => {
    var data = JSON.stringify({
      "taluk_id":parseInt(i?.location_id),
      "search":'',
    });
    var config = {
      method: 'post',
      url: baseURL + 'getVillageList',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `${apikey}`
      },
      data: data
    };
    axios(config)
      .then(function (response) {
        setVillage(response.data)
      })
      .catch(function (error) {
        // console.log(error);
      });
  }
  const createTrainerBatch = async => {
    var role = JSON.parse(sessionStorage?.getItem('userDetails'))?.role
    var idvalue = JSON.parse(sessionStorage?.getItem('userDetails'))?.id;
    const datass = village?.list?.filter(it => { return it?.id === trainerData?.talaq_id })
    var data = JSON.stringify({
      "batch_name": datass[0]?.name,
      "sub_village": trainerData?.sub_village,
      "project_id": props?.data1?.project_id,
      "contact_person": trainerData?.contact_person,
      "number_of_participants": trainerData?.number_of_participants,
      "day1": moment(trainerData?.day1.$d)?.format('YYYY/MM/DD  h:mm A'),
      "day2": moment(trainerData?.day2.$d)?.format('YYYY/MM/DD  h:mm A'),
      "location_id": trainerData?.talaq_id,
      "contact_number": trainerData?.contact_number,
      "trainer_id": idvalue
    });
    var config = {
      method: 'post',
      url: baseURL + 'createTrainingBatch',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `${apikey}`
      },
      data: data
    };
    axios(config)
      .then(function (response) {
        if (response?.data?.code) {
          alert(response?.data?.message)
          handleClose()
        }
        else{
          alert("added succesfully")
          handleClose()
        }
      })
      .catch(function (error) {
        // console.log(error);
      });
  }
  const styles = {
    buttonStyle: { boxShadow: "none", borderRadius: "7px", backgroundColor: "#edeff1", fontWeight: 500, textAlign: "left" },
    tableRowStyle: { justifyContent: 'center', alignItems: 'center', marginLeft: 200 },
    linkStyle: { textDecoration: 'none', color: "black" }
  }
  const [error, setError] = useState(false);
const handlenumber = (e) =>{
  const inputValue = e.target.value;
  if(/^[6-9]\d{0,9}$/.test(inputValue) || inputValue === ''){
    setTrainerData({ ...trainerData, contact_number: e?.target?.value })
    setError(false)
  }
  else{
   setError(true)
  }
}

  return (
    <div>
      <Button variant="secondary" style={styles.buttonStyle} onClick={handleClickOpen}
                    endIcon={<IconButton> <Iconify style={{ color: "#6d7c89" }} icon="material-symbols:add" /> </IconButton>}
                    startIcon={<IconButton> <Iconify style={{ color: "#6d7c89" }} icon="ic:sharp-supervised-user-circle" /></IconButton>}>
                    <span style={{ width: "200px" }}>New Training Batch</span>
                  </Button>
      <Dialog
        fullScreen
        open={open}
        onClose={handleClose}
        TransitionComponent={Transition}
      >
        <AppBar sx={{ position: 'fixed', bgcolor: '#ff7424' }}>
          <Toolbar>
            <IconButton
              edge="start"
              color="inherit"
              onClick={handleClose}
              aria-label="close"
            >
              <CloseIcon />
            </IconButton>
            <Typography sx={{ ml: 2, flex: 1 }} variant="h6" component="div" style={{color:"white"}}>
              Create  New Training Batch 
            </Typography>
            <Button variant="standard" onClick={createTrainerBatch}>
              
              Save
            </Button>
          </Toolbar>
        </AppBar>
        {/* <Card style={{ marginTop: 20 }}>
          <CardContent>
            <Stack style={{ marginTop: 20 }}>
              <Typography>Project : {props?.data1?.project_name}</Typography>
            </Stack>
            <Stack style={{ marginTop: 20 }}>
              <Typography> Partner : {props?.data1?.partnerName}</Typography>
            </Stack>
          </CardContent>
        </Card> */}
      <DialogContentText style={{ marginLeft: 20 ,marginTop: 80}}>
      <Typography>Project&nbsp;:&nbsp; {props?.data1?.project_name}</Typography>
        <Typography> Partner &nbsp;:&nbsp; {props?.data1?.partnerName}</Typography>
      </DialogContentText>
     
        
       
        <Stack margin={2} style={{ marginTop: 50 }}>
          <FormControl fullWidth>
            <InputLabel id="demo-simple-select-label" color="common">Select Village</InputLabel>
            <Select color="common"
              value={trainerData?.talaq_id}
              label="Select Village"
              
              onChange={(e => {
                setTrainerData({ ...trainerData, talaq_id: e?.target?.value })
              })}
            >
              <MenuItem value="" default disabled>Choose Village</MenuItem>
              {village?.list?.map(itm => {
                return (
                  <MenuItem name={itm?.name} value={itm?.id}>{itm?.name}</MenuItem>
                )
              })
              }
            </Select>
          </FormControl></Stack>
        <Stack margin={2} style={{ marginTop: 10 }}>
          <TextField
            fullWidth
            color="common"
            id="outlined-error"
            type="text"
            onChange={(e) => { setTrainerData({ ...trainerData, sub_village: e?.target?.value }) }}
            label="Sub Village" />
        </Stack>
        <Stack  margin={2} style={{ marginTop: 10 }}>
          <TextField
            fullWidth
            color="common"
            id="outlined-error"
            label="Number Of Participants"
            type='number'
            onChange={(e) => { setTrainerData({ ...trainerData, number_of_participants: e?.target?.value }) }}
          />
        </Stack>
        <Stack margin={2} style={{ marginTop: 10 }}>
          <TextField
            fullWidth
            color="common"
            onChange={(e) => { setTrainerData({ ...trainerData, contact_person: e?.target?.value }) }}
            type="text"
            id="outlined-error"
            label="Contact Person" />
        </Stack>
        <Stack margin={2} style={{ marginTop: 10 }}>
          <TextField
            fullWidth
            id="outlined-error"
            label="Contact Number "
            inputProps={{  inputMode: 'numeric',
            pattern: '[0-9]*', maxLength: 10 }}
            // onChange={(e) => { 
            //   const limitChar = 10
            //   if (e.target.value.toString().length <= limitChar) {
            //     setTrainerData({ ...trainerData, contact_number: e?.target?.value }) 
            //   }
            // }}
            onChange={handlenumber}
            value= {trainerData.contact_number}
            error = {error}
            helperText ={error?'Invalid Input':''}
            />
        </Stack>
        <Stack  style={{ marginTop: 10 }}>
          <Typography margin={2}>Day 1</Typography>
        </Stack>
        <Stack margin={2} style={{ marginTop: 20 }} color="common" >
          <DateTimePicker
            renderInput={(props) => <TextField {...props} />}
            // defaultValue={today}
            minDate={today}
            label="DateTimePicker"
            color="common"
            value={trainerData?.day1}
            PopperProps={{
              placement: "top"
          
            }}
            onChange={(e) => { dateChangeHandler(e) }}
          />
        </Stack>
        <Stack style={{ marginTop: 10 }}>
          <Typography margin={2}>Day 2</Typography>
        </Stack>
        <Stack margin={2} style={{ marginTop: 20 }}>
          <DateTimePicker 
          id="date-time-picker" 
          defaultValue={trainerData?.day1}
                     minDate={trainerData?.day1}
                     renderInput={(params) => <TextField required {...params} color="common" />}
            label="DateTimePicker"
          
            value={trainerData?.day2}
          
            onChange={(e) => { endDateChnageHandler(e) }}
            PopperProps={{
              placement: "top"
          
            }}
          />
        
        </Stack><br/><br/><br/>
      </Dialog>
    </div>
  );
}