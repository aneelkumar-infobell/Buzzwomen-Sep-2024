import { useState, useEffect } from 'react';
import React from 'react'
import { Button, Card, CardActions, CardContent, Stack } from '@mui/material';
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
import ParticipantDrawer from './ParticipantDrawer';
import ShaktiForm from './ShaktiForm';
import Checkbox from '@mui/material/Checkbox';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import AddParticipants from './AddParticipants'
import ParticipentDetailsDailoge from './ParticipentDetailsDailoge';
import axios from 'axios';
import { CheckBox } from '@mui/icons-material';
import Iconify from 'src/components/Iconify';
import { baseURL } from 'src/utils/api';
import EditParticipantdata from './Editparticipantdata';
import { useAuth } from 'src/AuthContext';
import GelathiCircleForm from './GelathiCircleForm';
const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});
    
const label = { inputProps: { 'aria-label': 'Checkbox demo' } };
export default function Day2Completed({ shown, setShown, batch }) {
  const { apikey } = useAuth();
  const [openFilter, setOpenFilter] = useState(false);
  const [clcikData, setClickData] = useState()
  const [reload,setReload]=useState(false);
  const [gelathiCount,setGelathicount]=useState(0);
const userid = JSON.parse(sessionStorage.getItem('userDetails'))?.role
  const [checkData,setCheckData]=React.useState('');
  const [shopwShakthiForm ,setShowShakkthiForm] = useState(false)
  const handleOpenFilter = () => {
    setOpenFilter(true); 
   
  };
  const handleCloseFilter = () => {
    setOpenFilter(false);
  };
const [Add,setAdd]=React.useState(false);
const [editSession,setEditsession]=useState(false);
const [Trainingdata,setTrainingData]=useState(false);
  const [open, setOpen] = React.useState(false);
  React.useEffect(() => {
    //setShown(shown)
    setOpen(shown);
    
   
  }, [shown])
  React.useEffect(() => {
    //setShown(shown)
if( batch?.data?.id){
  getTrainingBatch();
}
    
   
  }, [open])
  const changeState = () => {
    setReload(!reload);
  };
  const handleClickOpen = () => {
    setShown(true)
    setOpen(true);
  };
  const handleClose = () => {
    setShown(false)
    setOpen(false);
  };
const handlesurvey =()=>{
    // alert('Survey was done')
    setShowShakkthiForm(true)
}
const handleShakformClose = ()=>{
  setShowShakkthiForm(false)
}
  const getTrainingBatch = async =>{
        
   
    var role = JSON.parse(sessionStorage?.getItem('userDetails'))?.role
    var idvalue = JSON.parse(sessionStorage?.getItem('userDetails'))?.id;
    var data = JSON.stringify({
      "batch_id": batch?.data?.id,
      "role_id": role
    });
    
    var config = {
      method: 'post',
      url: baseURL + 'getTrainingBatchData',
      headers: { 
        'Content-Type': 'application/json',
         'Authorization': `${apikey}`
      },
      data : data
    };
    
      
      axios(config)
      .then(function (response) {
        setTrainingData(response.data)
      })
      .catch(function (error) {
        // console.log(error);
      }); 
}
const handleedit =()=>{
  alert('Participant Information Already Collected')
}
let c=0;
const countsuggestedgelathi=()=>{
  
  for (let i = 0; i < Trainingdata?.all_participants?.length; i++) {
   
   if(Trainingdata?.all_participants[i]?.gelathiRecomm==1)
   {
    c=c+1;
   }
   
  } 
  
}
countsuggestedgelathi();
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
             Day2 Self Shakti
            </Typography>
         
          </Toolbar>
        </AppBar>
        <Stack style={{ top: 40 }}>
          <Card sx={{mt:2,ml:2}}>
           
            <TableContainer component={Paper} sx={{width:'50vw'}}>
          <Table aria-label="customized table">
           
           
            <TableBody>
              
          <TableRow><TableCell component="th" scope="row" sx={{fontWeight:700}}>Project </TableCell><TableCell>:&nbsp;&nbsp;{batch?.data?.projectName}</TableCell></TableRow>
          <TableRow><TableCell component="th" scope="row" sx={{fontWeight:700}}>Partner </TableCell><TableCell>:&nbsp;&nbsp;{batch?.data?.partnerName}</TableCell></TableRow>
          <TableRow><TableCell component="th" scope="row" sx={{fontWeight:700}}>Training&nbsp;Batch </TableCell><TableCell>:&nbsp;&nbsp;{batch?.data?.name}</TableCell></TableRow>
          <TableRow><TableCell component="th" scope="row" sx={{fontWeight:700}}>Day 1</TableCell><TableCell>: &nbsp;&nbsp;{batch?.data?.day1}</TableCell></TableRow>
          <TableRow><TableCell component="th" scope="row" sx={{fontWeight:700}}>Day 2</TableCell><TableCell>:&nbsp;&nbsp; {batch?.data?.day2}</TableCell></TableRow>
          <TableRow><TableCell component="th" scope="row" sx={{fontWeight:700}}>Contact&nbsp;Person </TableCell><TableCell>: &nbsp;&nbsp;{batch?.data?.contact_person}</TableCell></TableRow>
          <TableRow><TableCell component="th" scope="row" sx={{fontWeight:700}}>Contact&nbsp;Number</TableCell><TableCell>: &nbsp;&nbsp;{batch?.data?.contact_number}</TableCell></TableRow> 
          <TableRow><TableCell component="th" scope="row" sx={{fontWeight:700}}>Trainer&nbsp;Name</TableCell><TableCell>: &nbsp;&nbsp;{batch?.data?.trainer_name}</TableCell></TableRow>  </TableBody>
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
       {(Trainingdata?.data?.day2_completed=='1')?<> <Typography style={{textAlign:'center'}}>Day1 Participants : {Trainingdata?.total_participants}</Typography>
        <Typography style={{textAlign:'center'}}>Day2 Participants : {Trainingdata?.dayGelathi}</Typography></>:<><Typography style={{textAlign:'center'}}>Day1  : Actual Vs Target : {Trainingdata?.total_participants}/{Trainingdata?.data?.participants}</Typography></>}
{
    Trainingdata?.all_participants?.map(itm=>{
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
                        {(itm?.day2=='1')?<>(Day1 & Day2)</>:null}
                        </Typography>
                 
                    </div>
 {(itm?.gelathiRecomm=='1')?<IconButton><Iconify icon="mdi:tick-circle" style={{color:'green'}}></Iconify></IconButton>:null}
                {(userid==5 &&  itm?.final_save=='1')? <><Checkbox defaultChecked disabled/><IconButton style={{color:'#ff7424'}} onClick={handleedit}><Iconify  icon="material-symbols:edit"></Iconify></IconButton></> :
                null} 
                 {(userid==4 && itm?.isSurveyDone=='1')?<><Checkbox defaultChecked disabled/><IconButton >
          <Iconify icon="charm:notes-tick" width={20} height={20} color="green" onClick={handlesurvey}/>
        </IconButton></>:null} 
                  </CardActions>
                </CardContent>
              </Card>
            </Stack>
        )
    })
}
{shopwShakthiForm && (
              <GelathiCircleForm
                // index={selectedFromIndex.index}
                // reloadmethod={reloadmethod}
                // itm={itm } 
                // clcikData={clcikData}
                // circleData={circleData}
                // singleCircleData={singleCircleData}
                // id={selectedFromIndex.id}
                setShowForm={handleShakformClose}
                // componentreloadmethod={componentreloadmethod}
                // gelathiDrawerReloder={gelathiDrawerReloder}
              />
            )}
      </Dialog>
    </div>
  );
}