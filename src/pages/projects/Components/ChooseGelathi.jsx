import { useState, useEffect, forwardRef } from 'react';
import axios from 'axios'
import React from "react";
import { PropTypes } from 'prop-types';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import { Link, useLocation } from 'react-router-dom';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import {Stack,Checkbox, Card, CardContent, Grid} from '@mui/material';
import TextField from '@mui/material/TextField';
import Divider from '@mui/material/Divider';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import CloseIcon from '@mui/icons-material/Close';
import Slide from '@mui/material/Slide';
import CreateGelathiCircle from './CreateGelathiCircle';
import { Container } from '@mui/system';
import InputAdornment from '@mui/material/InputAdornment';
import SearchIcon from '@mui/icons-material/Search';
import { baseURL } from 'src/utils/api';
// import SearchBar from '@mkyy/mui-search-bar';
import Box from '@mui/material/Box';
import { useAuth } from 'src/AuthContext';

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});
const label = { inputProps: { 'aria-label': 'Checkbox demo' } };
  
export default function ChooseGelathi( {data1,circle}) {
  const { apikey } = useAuth();
  var [searchData,setSearchData]=useState('')
    const {state} = useLocation()
    const [clcikData, setClickData] = useState()
    const [enrolled, setenrolled] = useState('');
   const [gelathiData,setGelathiData] = useState([])
  const [open, setOpen] = React.useState(false);
  var [search, setSearch] = useState('')
  const searchFunction = (e) => {
    search = e
    setSearch(search)
    enrolledGelathi()
  }
  const handleClickOpen = () => {
    setOpen(true);
  };
  const setGelathiDataToEmpty = ()=>{
    setGelathiData([])
  }
  const checkBoxData = (itm) =>{
    if(gelathiData?.find(i=>i?.id===itm?.id))
    {
        const filterData = gelathiData?.filter(item=>item?.id!==itm?.id)
        setGelathiData(filterData)
    }else{
        setGelathiData([...gelathiData,itm])
    }
  }
  const handleClose = () => {
    setOpen(false);
  };
  useEffect(() => {
    
    let isApiSubscribed = true;
    if(state.head == "_SPS")
    { 
     if (isApiSubscribed) {
      enrolledGelathi();
     }
   }
   if(state.head == "_GPS"){
     if (isApiSubscribed) {
     
       enrolledGreenMotivators()
      
     }
   }
   if(state.head == "_VPS"){
    if (isApiSubscribed) {
    
      enrolledVyaapar()
     
    }
  }
     return () => {
       isApiSubscribed = false;
     };
}, []
)
const enrolledVyaapar= async(id,i,g) =>{
  var role = JSON.parse(sessionStorage?.getItem('userDetails'))?.role
  var idvalue = JSON.parse(sessionStorage?.getItem('userDetails'))?.id;
  var data = JSON.stringify({
    "search": search,
    "project_id": state?.id,
    "emp_id": idvalue,
    "gelathi_id":id?.emp_id?id?.emp_id:'',
  });
  
  var config = {
    method: 'post',
    url: baseURL+'getEnrollVyaparEnrollment',
    headers: { 
      'Content-Type': 'application/json',
       'Authorization': `${apikey}`
    },
    data : data
  };
    
    axios(config)
    .then(function (response) {
      setenrolled(response?.data)
      setCount(response?.data?.list.length)
    })
    .catch(function (error) {
      // console.log(error);
    });
    
}
const enrolledGreenMotivators = async(id,i,g) =>{
    var role = JSON.parse(sessionStorage?.getItem('userDetails'))?.role
    var idvalue = JSON.parse(sessionStorage?.getItem('userDetails'))?.id;
    var data = JSON.stringify({
      "search": search,
      "project_id": state?.id,
      "emp_id": idvalue,
      "gelathi_id":id?.emp_id?id?.emp_id:""
    });
    
    var config = {
      method: 'post',
      url: baseURL+'getEnrollGreenMotivators',
      headers: { 
        'Content-Type': 'application/json',
        'Authorization': `${apikey}`
      },
      data : data
    };
      
      axios(config)
      .then(function (response) {
        setenrolled(response.data)
        setCount(response?.data?.list.length)
      })
      .catch(function (error) {
        // console.log(error);
      });
      
}
  const enrolledGelathi = async =>{
    var userDetails = JSON.parse(sessionStorage?.getItem('userDetails'))
var role = JSON.parse(sessionStorage?.getItem('userDetails'))?.role
var idvalue = JSON.parse(sessionStorage?.getItem('userDetails'))?.id;
var data = JSON.stringify({
  "search": search,
  "project_id": state?.id,
  "emp_id": idvalue,
  "role_id": role
});
var config = {
  method: 'post',
  url: baseURL+'getEnrollGelathi',
  headers: {
    'Content-Type': 'application/json',
    'Authorization': `${apikey}`
  },
  data : data
};
      axios(config)
      .then(function (response) {
        setenrolled(response.data)
      })
      .catch(function (error) {
        // console.log(error);
      });
}
const changeText = (e) => {
  setSearchData(e?.target?.value)
  searchFunction(e?.target?.value)
}
  return (
    <div>
        
     <Button variant="contained" onClick={handleClickOpen} style={{
        float: "right", marginLeft: "1rem", borderRadius: "50%", padding: "0.2rem", marginTop: "-0.5rem",
        position: 'fixed', zIndex: '1', bottom: 40, right: 40
      }} sx={{
        ':hover': {
          bgcolor: '#ffd796',
          color: '#ff7424',
          border: '#ffd796'
        },
        bgcolor: '#ffd796',
        color: "#ff7424",
        border: 'none'
      }} title="Create POA">
      <span style={{ fontSize: "2rem" }}>+</span>
      </Button>
      <Dialog
        fullScreen
        open={open}
        onClose={handleClose}
        TransitionComponent={Transition}
      >
       
      
        
        <Stack direction="row">
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
            <Typography sx={{ ml: 2, flex: 1 }} variant="h6" component="div" color='inherit'>
             Gelathis  
            </Typography>
             
            
            <CreateGelathiCircle handleCloseGelathi={handleClose} gelathiData={gelathiData} circle={circle} data1={data1} setGelathidataemptyInChild={setGelathiDataToEmpty}/>
          </Toolbar>
         
        </AppBar>
        </Stack>
       <br/><br/> 
       <DialogContent dividers={scroll === 'paper'}>
                    <DialogContentText
                        id="scroll-dialog-description"
                        tabIndex={-1}
                    >
                        <Box
                            component="form"
                            sx={{
                                '& .MuiTextField-root': { m: 1 },
                            }}
                        >
                          <TextField id="outlined-basic" label="Search..." sx={{flex: 10}}  onChange={(e) => { changeText(e) } } InputProps={{
          startAdornment: (
            <Button ><InputAdornment position="start">
              
            <SearchIcon />
          </InputAdornment></Button>
            
          ),
        }}variant="outlined" style={{marginTop: 40, marginLeft:10,  width: 1240}}/>
        <Card><CardContent>Project : {data1?.project_name} </CardContent></Card>
          {enrolled?.list?.length!==0?enrolled?.list?.map((itm) => {
                return (
        <Stack> 
       
        <Card style={{marginTop:10}}>
        <CardContent direction={'row'}>
        <Stack>
        <Typography variant="subtitle1" gutterBottom>
        <Checkbox style={{marginRight: 10}} {...label} onChange={()=>{checkBoxData(itm)}} />    
        {` ${itm?.gelathiname}`} ; {` ${itm?.villagename}`}</Typography>
                           
        </Stack>
        
       
        </CardContent>
        </Card>
       </Stack>)
            }):
            <>
            <Typography sx={{ textAlign:'center',mt:2}} variant="h6" component="div" color='inherit'>
            No Enrolled Gelathi Found
            </Typography>
       
            </>}
           
</Box>
</DialogContentText>
</DialogContent>
      </Dialog>
    </div>
  );
}