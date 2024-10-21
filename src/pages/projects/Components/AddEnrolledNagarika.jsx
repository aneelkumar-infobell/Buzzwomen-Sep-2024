import { useState, useEffect } from 'react';
import axios from 'axios';
import React from "react";
import {Button,CardContent,Stack,Card, DialogContent, DialogContentText,CardActions,Checkbox,Toolbar,IconButton,Typography,Slide} from '@mui/material';
import Dialog from '@mui/material/Dialog';
import PropTypes from 'prop-types';
import CloseIcon from '@mui/icons-material/Close';
import moment from 'moment';
import Iconify from 'src/components/Iconify';
import AddParticipants from './AddParticipants';
import { baseURL } from 'src/utils/api';
import { useAuth } from 'src/AuthContext';
const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
  });
  const label = { inputProps: { 'aria-label': 'Checkbox demo' } };
  export default function AddEnrolledNagarika({session}){
      const { apikey } = useAuth();
      console.log(session ,"sessionsession")
    const [open, setOpen] = React.useState(false);
    const [sessiondata,setSessiondata]=useState('');
    const [participantData,setParticipantData]=useState('');
    const [reload , setReload] = useState(false)
    const reloadFUnction =() =>{
      setReload(!reload)
    }
    const handleClickOpen = () => {
        setOpen(true);
        
      };
    
      const handleClose = () => {
        setOpen(false);
      };
const setEnrolledVyapar=(itm)=>{
  var data = JSON.stringify({
    "id": itm?.participant_id,
    "gelathi_id": session?.user_id,
    "tb_id": session?.tb_id,
    "projectId": (session?.projectId)?session?.projectId:session?.project_id
  });
  
  var config = {
    method: 'post',
    url: baseURL + 'setEnrollnagarikaGelathi',
    headers: { 
      'Content-Type': 'application/json',
      'Authorization': `${apikey}`
    },
    data : data
  };
      
      axios(config)
      .then(function (response) {
        alert(response.data.message);
        
      })
      .catch(function (error) {
        // console.log(error);
      });
      
}
useEffect(()=>{
getEnrollVyapar();
getAddPartcipants();
},[open ,reload])
  const getEnrollVyapar=()=>{
    var role = JSON.parse(sessionStorage?.getItem('userDetails'))?.role;
    var idvalue = JSON.parse(sessionStorage?.getItem('userDetails'))?.id;
    var data = JSON.stringify({
    //   search: search,
      project_id:session?.project_id,
      emp_id: idvalue,
      gelathi_id: JSON.stringify(session?.gfl_id) ,
      start_date : '',
      end_date: ""
    });
      var config = {
        method: 'post',
        url: baseURL + 'getenrollnagarikagelathi',
        headers: { 
          'Content-Type': 'text/plain',
          'Authorization': `${apikey}`
        },
        data : data
      };
      
    
    axios(config)
    .then(function (response) {
      setSessiondata(response.data);
    })
    .catch(function (error) {
      // console.log(error);
    });
    
  }
const getAddPartcipants=()=>{
  var userid = JSON.parse(sessionStorage.getItem('userDetails'))?.id
  var data = JSON.stringify({
    "search": "",
    "project_id": session?.project_id,
    "emp_id": userid
  });
  
  var config = {
    method: 'post',
    url: baseURL+'getenrollnagarikagelathi',
    headers: { 
      'Content-Type': 'application/json',
      'Authorization': `${apikey}`
    },
    data : data
  };
  
  
  axios(config)
  .then(function (response) {
    setParticipantData(response.data)
  })
  .catch(function (error) {
    // console.log(error);
  });
  
}
  const styles = {
    buttonStyle: { boxShadow: "none", borderRadius: "7px", backgroundColor: "#edeff1", fontWeight: 500, textAlign: "left" }
  }
    return(
    <>
 <Stack style={{ flexDirection: 'row'}}  mb={2}>
      
      <Button variant="secondary" style={styles.buttonStyle}  onClick={handleClickOpen}
                  endIcon={<IconButton> <Iconify style={{ color: "#6d7c89" }} icon="material-symbols:add" /> </IconButton>}
                  startIcon={<IconButton> <Iconify style={{ color: "#6d7c89" }} icon="ic:sharp-people" /></IconButton>}>
                  <span style={{ width: "200px" }}>Enrolled Nagarika</span>
                </Button>
      </Stack>
     
    
      <Dialog fullScreen open={open} onClose={handleClose}
        aria-labelledby="scroll-dialog-title"
        aria-describedby="scroll-dialog-description">
        {/* <AppBar sx={{ position: 'relative', bgcolor: '#ed6c02' }}> */}
        <Toolbar sx={{ bgcolor: '#ed6c02', color: 'white' }} >
          <IconButton edge="start" sx={{ color: "inherit" }} onClick={handleClose} aria-label="close">
            <CloseIcon />
          </IconButton>
          <Typography sx={{ ml: 2, flex: 1, color: "inherit" }} variant="h6" component="div" >
            All Participants 
          </Typography>
          <AddParticipants type="vyapar" session={session}  reloadFUnction={reloadFUnction}/>
          
        </Toolbar>
        {/* <Webcam
    ref={webcamRef}
    screenshotFormat="image/jpeg"odimeter:"",
    /> */}
        {/* </AppBar> */}
        <DialogContent dividers={scroll === 'paper'} sx={{ background: "#f9fafb" }}>
          <DialogContentText
            id="scroll-dialog-description"
            tabIndex={-1}
          >
            <div style={{ margin: "1rem" }}>
                <Card>
                    <CardContent>
                    <Typography style={{ flexDirection: 'row' }} variant="body1" gutterBottom>
                                       Project :
                                     &nbsp; {sessiondata?.projectName}
                                   </Typography>
                                   <Typography variant="body1" gutterBottom>
                                       Partner : &nbsp;{sessiondata?.partnerName}
                                   </Typography>
                                   <Typography variant="body1" gutterBottom>
                                    Gelathi Session : &nbsp; {sessiondata?.gf_session_name}
                                   </Typography>
                    </CardContent>
                    
                    
                </Card><br/><Typography style={{textAlign:'center'}} variant="h6"> All Participants working: &nbsp; {sessiondata?.total_participants}</Typography>
                <Card>
                    <CardContent>
                        
                    {sessiondata?.all_participants?.map((itm) => 
                    {
                return (
                //   <div>
                //   <Typography value={item?.participant_id}>{item?.participant_name}</Typography>
                //   </div>
                  <CardContent >
                  <CardActions sx={{borderRadius:0}}>
                    <div  style={{width:'90vw',display:'flex',position:'relative',padding:'8px'}} >
                     
                      <Typography variant="subtitle2">{itm?.participant_name}</Typography> &nbsp;&nbsp; {(itm?.gelathi_status!="")?<div style={{color:'#f75f66'}}>{itm?.gelathi_status}</div >:null} 
                      
                      </div>
                    {(itm?.VyaparEnrollment=='0')?<Checkbox 
                    onClick={()=>{
                      setEnrolledVyapar(itm)
                    }} 
                    {...label}
                     />:<Checkbox defaultChecked={true} onClick={()=>{setEnrolledVyapar(itm)}} style={{color:'pink'}}/>}
                     
                  </CardActions> 
                  </CardContent>
                );
              }) }
                    
                    </CardContent>
                </Card>
           
            </div>
            
          </DialogContentText></DialogContent>  </Dialog>
      </>
    )
  }