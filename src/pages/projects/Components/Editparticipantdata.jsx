import { useState, useEffect } from 'react';
import React from 'react'
import { Button, Card, CardActions, CardContent, Stack,TextField ,Radio, DialogContent, DialogContentText,FormControlLabel, FormHelperText} from '@mui/material';
import Dialog from '@mui/material/Dialog';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import CloseIcon from '@mui/icons-material/Close';
import Slide from '@mui/material/Slide';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DateTimePicker } from '@mui/x-date-pickers/DateTimePicker';
import axios from 'axios';
import moment from 'moment';
import Select from '@mui/material/Select';
import FormControl from '@mui/material/FormControl';
import Switch from '@mui/material/Switch';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import RadioGroup from '@mui/material/RadioGroup';
import { baseURL } from 'src/utils/api';
import { useAuth } from 'src/AuthContext';

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});
  
const label = { inputProps: { 'aria-label': 'Switch demo' } };
export default function EditParticipantdata({editSession, setEditsession,Trainingdata, changeState,participantdata,cvalue}) {
    const { apikey } = useAuth();
  const [openFilter, setOpenFilter] = useState(false);
 const [showDate , setShowDate] = useState(false)
  const [sendData, setSendData] = useState({
    occupation:"",
    husbandOccupation:"",
    wifeIncomeMonthly:"",
    typeOfEnterprise:"",
    saving_amt:"",
    gelathiRecomm: 0,
    saving_goal:"",
    wifeSavingsMonthly:"",
    income:"",
    bank_acc:"",
     contact_no:"",
  husbandName:""
  });
  const [helperText, setHelperText] = useState('');
  const [open, setOpen] = React.useState(false);
  const [date, setDate] = useState(new Date());
  const [occupationdata,setOccupationdata]=React.useState('');
  const [HusbandOccupationError, setHusbandOccupationError] = useState(false);
  const [OccupationError, setOccupationError] = useState(false);
  const [BankError, setBankError] = useState(false);
  React.useEffect(() => {
    //setShown(shown)
    setOpen(editSession)
    
  }, [editSession])
  React.useEffect(()=>{
    Occupation();
  },[])
  const handleClickOpen = () => {
    setEditsession(true)
    setOpen(true);
  };
  const handleClose = () => {
    setEditsession(false)
    setOpen(false);
    changeState();
  };
const Occupation =()=>{
  var config = {
    method: 'post',
    url: baseURL + 'getOccupations',
    headers: {
       'Authorization': `${apikey}`
     }
  };
      axios(config)
      .then(function (response) {
        setOccupationdata(response.data)
      })
      .catch(function (error) {
        // console.log(error);
      });
      
}

const SendData = async => {
  var data = JSON.stringify({
    "income":parseInt(sendData?.income), 
    "occupation":JSON.stringify(parseInt(sendData?.occupation)),
     "typeOfEnterprise":sendData?.typeOfEnterprise, 
     "participant_id":parseInt(participantdata?.id), 
     "final_save":1, 
     "husbandOccupation":JSON.stringify(parseInt(sendData?.husbandOccupation)),
     "wifeIncomeMonthly":parseInt(sendData?.wifeIncomeMonthly), 
     "saving_goal":sendData?.saving_goal, 
     "bank_acc":parseInt(sendData?.bank_acc), 
     "wifeSavingsMonthly":parseInt(sendData?.wifeSavingsMonthly),
     "saving_amt":parseInt(sendData?.saving_amt), 
     "participant_day2":Trainingdata?.data?.day2, 
     "gelathiRecomm":sendData?.gelathiRecomm, 
     "project_id":parseInt(Trainingdata?.data?.project_id), 
     "tb_id":parseInt(Trainingdata?.data?.id),
      "contact_no":sendData?.contact_no,
  "husbandName":sendData?.husbandName
});
if (sendData?.husbandOccupation == '') {
  setHusbandOccupationError(true);
  setHelperText('Please Select The Option');
}
if (sendData?.occupation == '') {
  setOccupationError(true);
  setHelperText('Please Select The Option');
}
if (sendData?.bank_acc == '') {
  setBankError(true);
  setHelperText('Please Select The Option');
}
if (sendData?.husbandOccupation == '' || sendData?.occupation == '') {
  alert("Please Select The Option'");
}
else{
var config = {
  method: 'post',
  url: baseURL + 'editParticipant',
  headers: {
    'Content-Type': 'application/json',
     'Authorization': `${apikey}`
  },
  data: data
};
    axios(config)
      .then(function (response) {
        setSendData({
          occupation:"",
          husbandOccupation:"",
          wifeIncomeMonthly:"",
          typeOfEnterprise:"",
          saving_amt:"",
          gelathiRecomm: 0,
          saving_goal:"",
          wifeSavingsMonthly:"",
          income:"",
          bank_acc:"",
            contact_no:"",
  husbandName:""
      
        })
        handleClose()
        changeState();
      })
      .catch(function (error) {
        // console.log(error);
      });
  }
}
  return (
    <div>
        <Dialog fullScreen open={open} onClose={handleClose}
        aria-labelledby="scroll-dialog-title"
        aria-describedby="scroll-dialog-description">
                  <form
          onSubmit={(e) => {
            e.preventDefault();
            SendData();
          }}
        >
        <Toolbar sx={{ bgcolor: '#ed6c02', color: 'white' }} >
          <IconButton edge="start" sx={{ color: "inherit" }} onClick={handleClose} aria-label="close">
            <CloseIcon />
          </IconButton>
          <Typography sx={{ ml: 2, flex: 1, color: "inherit" }} variant="h6" component="div" >
           Update Participant Detail 
          </Typography>
        
          <Button autoFocus color="inherit" 
          type='submit'
          // onClick={() => SendData()}
          >
            save
          </Button>
        </Toolbar>
      
        <DialogContent dividers={scroll === 'paper'} sx={{ background: "#f9fafb" }}>
          <DialogContentText
            id="scroll-dialog-description"
            tabIndex={-1}
          >
            <FormControl fullWidth >
            {OccupationError ? <FormHelperText style={{ color: 'red' }}>{helperText}</FormHelperText> : null}{' '}
                 <InputLabel id="demo-simple-select-label" style={{ flexDirection: 'row', color: '#ed6c02', fontWeight: 700 ,marginTop:20}}>
                    {sendData?.occupation== "" ? "Select wife's occupation" : "Wife occupation"}</InputLabel>  <br/><br/>
                    <Select labelId="Select Wife's Occupation" id="demo-simple-select" value={sendData?.occupation} label="Wife Occupation" onChange={(e) => setSendData({ ...sendData, occupation: e?.target?.value })} variant="standard" color="common">
                    {occupationdata?.list?.map(itm => {
                      return (<MenuItem value={itm?.id}>{itm?.name}</MenuItem>)
                    })}
                  
                  </Select>
                  </FormControl> 
                  <FormControl fullWidth >
                  {HusbandOccupationError ? <FormHelperText style={{ color: 'red' }}>{helperText}</FormHelperText> : null}{' '}
                 <InputLabel id="demo-simple-select-label" style={{ flexDirection: 'row', color: '#ed6c02', fontWeight: 700 ,marginTop:30}}>
                    {sendData?.husbandOccupation== "" ? "Select Husband's occupation" : "Husband occupation"}</InputLabel>  <br/><br/><br/>
                    <Select labelId="Select Wife's Occupation" id="demo-simple-select" value={sendData?.husbandOccupation} label="Husband Occupation" onChange={(e) => setSendData({ ...sendData, husbandOccupation: e?.target?.value })} variant="standard" color="common">
                    {occupationdata?.list?.map(itm => {
                      return (<MenuItem value={itm?.id}>{itm?.name}</MenuItem>)
                    })}
                   
                  </Select>
                  </FormControl> 
                  <Stack style={{ marginTop: 20 }}>
                <TextField required id="Monthly-income" onChange={(e) => { setSendData({ ...sendData,wifeIncomeMonthly : e?.target?.value }) }} label="Monthly Wife's income" variant="outlined" color="common"/>
              </Stack>
              <Stack style={{ marginTop: 20 }}>
                <TextField required id="Monthly-savings" onChange={(e) => { setSendData({ ...sendData,wifeSavingsMonthly : e?.target?.value }) }} label="Monthly Wife's Savings" variant="outlined" color="common"/>
              </Stack>
              <Stack style={{ marginTop: 20 }}>
                <TextField required id="goal" onChange={(e) => { setSendData({ ...sendData,saving_goal : e?.target?.value }) }} label="What is your goal" variant="outlined" color="common"/>
              </Stack>
              <Stack style={{ marginTop: 20 }}>
                <TextField required id="Monthly family income" onChange={(e) => { setSendData({ ...sendData,income: e?.target?.value }) }} label="Monthly Family Income" variant="outlined" color="common"/>
              </Stack>
              <Stack style={{ marginTop: 20 }}>
                <TextField required id="Monthly _family_savings" onChange={(e) => { setSendData({ ...sendData,saving_amt : e?.target?.value }) }} label="Monthly Family Savings" variant="outlined" color="common"/>
              </Stack>
              <Stack style={{ marginTop: 20 }}>
                <TextField required id="type_of_enterprise" onChange={(e) => { setSendData({ ...sendData,typeOfEnterprise : e?.target?.value }) }} label="Type of Enterprise" variant="outlined" color="common"/>
              </Stack>
              <Stack style={{ marginTop: 20 }}>
                <TextField required id="contact_no" onChange={(e) => { setSendData({ ...sendData,contact_no : e?.target?.value }) }} label="Contact Number" variant="outlined" color="common"/>
              </Stack>
              <Stack style={{ marginTop: 20 }}>
                <TextField required id="husbandName" onChange={(e) => { setSendData({ ...sendData,husbandName : e?.target?.value }) }} label="Husband Name" variant="outlined" color="common"/>
              </Stack>
              <Stack mt={1}>
                <Typography style={{fontWeight:500}} >Bank Account *</Typography>
                <Typography>
               
               {BankError ? <FormHelperText style={{ color: 'red' }}>{helperText}</FormHelperText> : null}{' '}
             </Typography>
                <RadioGroup
                      aria-labelledby="demo-radio-buttons-group-label"
                      name="radio-buttons-group"
                      onChange={(e, value) => { setSendData({ ...sendData, bank_acc: value }) }}
                  
                    >
                    <div style={{display:"flex"}}>
                      <FormControlLabel value={0} control={<Radio style={{color:"#595959"}} />} label="No" />
                      <FormControlLabel value={1} control={<Radio style={{color:"#595959"}}  />} label="Yes" />
                      </div>
                    </RadioGroup>
            </Stack>
            <Stack id="create-poa-stack" direction={'row'}>
                  <Typography id="all-day">Suggested Gelathi</Typography><br/>
                  <Switch id="switch-suggested-gelathi" value={sendData?.gelathiRecomm} 
                  onChange={(e) => {
                     setSendData({ ...sendData, gelathiRecomm: sendData?.gelathiRecomm === 1 ? 0 : 1 }) 
                  }}/>
                </Stack>
          </DialogContentText></DialogContent> 
          </form>
           </Dialog>
    </div>
  );
}