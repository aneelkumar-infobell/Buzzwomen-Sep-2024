import { useState, useEffect } from 'react';
import React from 'react'
import { Button, Card, CardActions, CardContent, Stack,TextField } from '@mui/material';
import Dialog from '@mui/material/Dialog';
import AppBar from '@mui/material/AppBar';
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
import { baseURL } from 'src/utils/api';
import { useAuth } from 'src/AuthContext';
const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});
   
export default function EditGelathiSession({session,editSession, setEditsession}) {
  const { apikey } = useAuth();
  const [openFilter, setOpenFilter] = useState(false);
  const [open, setOpen] = React.useState(false);
  const [date, setDate] = useState(new Date())
  React.useEffect(() => {
    setOpen(editSession)
  }, [editSession])
  const handleClickOpen = () => {
    setEditsession(true)
    setOpen(true);
  };
  const handleClose = () => {
    setEditsession(false)
    setOpen(false);
  };
  const UpdateSession=()=>{
    var data = JSON.stringify({
      "tb_name": session?.training_batch_name,
      "tb_id": session?.tb_id,
      "gf_session_type": session?.type,
      "plan_date": moment(date?.$d)?.format('DD-MM-YYYY HH:mm:ss'),
      "gf_session_id": session?.id
    });
    
    var config = {
      method: 'post',
      url: baseURL + 'editGFSession',
      headers: { 
        'Content-Type': 'application/json',
         'Authorization': `${apikey}`
      },
      data : data
    };
      
      axios(config)
      .then(function (response) {
        handleClose()
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
            <Typography sx={{ ml: 2, flex: 1,color:"white" }} variant="h6" component="div">
              Edit Session
            </Typography>
            <Button autoFocus color="inherit" onClick={UpdateSession}>
             Save
            </Button>
          
          </Toolbar>
        </AppBar>
        <Stack style={{ top: 40 }}>
          <Card sx={{mt:2,ml:2}}>
           
            <TableContainer component={Paper} sx={{width:'50vw'}}>
          <Table aria-label="customized table">
           
            <TableBody>
              
          <TableRow><TableCell component="th" scope="row" sx={{fontWeight:700}}>Project Name </TableCell><TableCell>:&nbsp;&nbsp;{session?.projectName}</TableCell></TableRow>
          <TableRow><TableCell component="th" scope="row" sx={{fontWeight:700}}>Partner Name </TableCell><TableCell>:&nbsp;&nbsp;{session?.partnerName}</TableCell></TableRow>
          <TableRow><TableCell component="th" scope="row" sx={{fontWeight:700}}>Batch Name </TableCell><TableCell>:&nbsp;&nbsp;{session?.training_batch_name}</TableCell></TableRow>
          </TableBody>
          </Table>
        </TableContainer>
          
          </Card>
        </Stack>
         <Stack style={{top:20,margin:10}}>
            <Card>
                <CardContent>
                        <Typography>Visit Participants : {session?.total_participants}</Typography>
                </CardContent>
            </Card>
            </Stack>
     
            <Stack style={{top:20,margin:10}} >
        <LocalizationProvider dateAdapter={AdapterDayjs}>
           <DateTimePicker
   required
   label="Date and Time"
    value={date}
    onChange={(e) => {setDate(e)}}
    renderInput={(params) => <TextField {...params} color="common" />}
    PopperProps={{
      placement: "top"
  
    }}
  />
        </LocalizationProvider>
       
      </Stack>
      </Dialog>
    </div>
  );
}