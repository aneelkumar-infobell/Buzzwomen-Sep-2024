import { useState, useEffect } from 'react';
import React from 'react'
import { Button, Card, CardActions, CardContent, Stack ,Icon} from '@mui/material';
import Dialog from '@mui/material/Dialog';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import CloseIcon from '@mui/icons-material/Close';
import Slide from '@mui/material/Slide';
import ShaktiForm from './ShaktiForm';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import AddParticipants from './AddParticipants'
import ParticipentDetailsDailoge from './ParticipentDetailsDailoge';
import axios from 'axios';
import { baseURL } from 'src/utils/api';
import { useAuth } from 'src/AuthContext';
const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});
 
export default function ShaktiDialog({ shown, setShown, batch ,reloadfuncton ,handleCloseDilog }) {
   const { apikey } = useAuth();
  const [openFilter, setOpenFilter] = useState(false);
  const [clcikData, setClickData] = useState()
  const [checkData,setCheckData]=React.useState('');

  const handleOpenFilter = () => {
    setOpenFilter(true);
  };
  const handleCloseFilter = () => {
    setOpenFilter(false);
  };
  const [open, setOpen] = React.useState(false);
  React.useEffect(() => {
    setOpen(shown);
   
  }, [shown])
  const handleClickOpen = () => {
    setShown(true)
    setOpen(true);
  };
  const handleClose = () => {
    setShown(false)
    setOpen(false);
  };
  React.useEffect(() => {
    //setShown(shown)
    GetStatus();
   
  }, [batch,reloadfuncton])
  const GetStatus = async=>{
    var data = JSON.stringify({
      "project_id": batch?.data?.project_id,
      "poa_type": "1",
      "type": "2",
      "tb_id": batch?.data?.id
    });
    
    var config = {
      method: 'post',
      url: baseURL + 'getCheckInOutStatus',
      headers: { 
        'Content-Type': 'application/json',
        'Authorization': `${apikey}`
      },
      data : data
    };
    
    axios(config)
    .then(function (response) {
      setCheckData(response.data)
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
              Self Shakti  working
            </Typography>
            <AddParticipants batch={batch} checkData={checkData} reloadFUnction={reloadfuncton} handleCloseDilog={handleCloseDilog}/>
          </Toolbar>
        </AppBar>
        <Stack style={{ top: 40 }}>
          <Card sx={{mt:2,ml:2}}>
           
            <TableContainer component={Paper} sx={{width:'50vw'}}>
          <Table aria-label="customized table">
           
           
            <TableBody>
              
          <TableRow><TableCell component="th" scope="row" sx={{fontWeight:700}}>Project </TableCell><TableCell>:&nbsp;&nbsp;{batch?.data?.projectName}</TableCell></TableRow>
          <TableRow><TableCell component="th" scope="row" sx={{fontWeight:700}}>Training&nbsp;Batch </TableCell><TableCell>:&nbsp;&nbsp;{batch?.data?.name}</TableCell></TableRow>
          <TableRow><TableCell component="th" scope="row" sx={{fontWeight:700}}>Day 1</TableCell><TableCell>: &nbsp;&nbsp;{batch?.data?.day1}</TableCell></TableRow>
          <TableRow><TableCell component="th" scope="row" sx={{fontWeight:700}}>Day 2</TableCell><TableCell>:&nbsp;&nbsp; {batch?.data?.day2}</TableCell></TableRow>
          <TableRow><TableCell component="th" scope="row" sx={{fontWeight:700}}>Contact&nbsp;Person </TableCell><TableCell>: &nbsp;&nbsp;{batch?.data?.contact_person}</TableCell></TableRow>
          <TableRow><TableCell component="th" scope="row" sx={{fontWeight:700}}>Contact&nbsp;Number</TableCell><TableCell>: &nbsp;&nbsp;{batch?.data?.contact_number}</TableCell></TableRow>  </TableBody>
          </Table>
        </TableContainer>
             
          </Card>
        </Stack>
        <Stack direction="row" spacing={1} flexShrink={0} sx={{ my: 1 }}>
        
          <ParticipentDetailsDailoge
            clcikData={clcikData}
            isOpenFilter={openFilter}
     onCloseFilter={handleCloseFilter}
          />
        </Stack>
        {batch?.all_participants?.map(itm => {
          return (
            <Stack style={{ top: 100 }}>
              <Card >
                <CardContent >
                  <CardActions sx={{borderRadius:0}}>
                    <div  style={{width:'90vw',display:'flex',position:'relative',padding:'8px'}} >
                     
                      <Typography variant="subtitle2" onClick={()=>{handleOpenFilter();
                      setClickData({ name: itm.gelathiname, title: "Enrolled  Name",id:itm?.participant_id})}
                      }>
                        {itm?.participant_name}
                        </Typography>
                 <ShaktiForm itm={itm} reloadFUnction={reloadfuncton} />
                    </div>
                  </CardActions>
                </CardContent>
              </Card>
            </Stack>
          )
        })}
      </Dialog>
    </div>
  );
}