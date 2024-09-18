import { useState, useEffect } from 'react';
import { Card, Stack, Chip,Button, Container,DialogContent,DialogContentText, Typography, Grid, IconButton,TextField } from '@mui/material';
import ProjectMultiDrawer from '../Components/ProjectMultiDrawer';
import { Link, useLocation } from 'react-router-dom';
import { styled } from '@mui/material/styles';
import Iconify from 'src/components/Iconify';
import axios from 'axios';
import dayjs from 'dayjs';
import React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import { baseURL } from 'src/utils/api';
import Paper from '@mui/material/Paper';
import Page from 'src/components/Page';
import { StaticDatePicker } from '@mui/x-date-pickers/StaticDatePicker';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import moment from 'moment';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Dialog from '@mui/material/Dialog';
import Slide from '@mui/material/Slide';
import { useAuth } from 'src/AuthContext';
import BusEdit from '../Components/Buslistfilters/BusEdit';
const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
  });
export default function busTestList() {
    const { apikey } = useAuth();
  const {state} = useLocation()
  const userDetails = sessionStorage?.getItem('userId')
  const roleid = JSON.parse(sessionStorage.getItem('userDetails'))?.role
    const [clcikData, setClickData] = useState()
    const [date1, setDate1] = useState(null)
    const [open, setOpen] = React.useState(false);
    const [date2, setDate2] = useState(null)
    var  [selected, setSelected] = useState(null)
    const [buses, setBuses] = useState();
    const [userUpdate,setUserUpdate]=useState(false)
    const [detailsData, setDetailsData] = useState();
    const [deletebus, setDeleteBus] = useState();
    const [reload , setReload] = useState(false)
    const [admin , setAdmin] = useState(true)
    useEffect(() => {
        busesdata()
        // details()
    }, [reload]
    )
  //   useEffect(() => {
  //     busesdata()
  //     details()
  // }, [reload]
  // )
  const reloadHandler = ()=>{
    setReload(!reload)
  }
    const [openFilter, setOpenFilter] = useState(false);
    const handleOpenFilter = () => {
        setOpenFilter(true);
    };
    const handleCloseFilter = () => {
        setOpenFilter(false);
    };
        const handleClickOpen = () => {
        setOpen(true);
      };
      const handleClose=()=>{
    
        setOpen(false)
      }
      const onDateSubmit = (e) => {
        setSelected({  name: `${e?.fromDate} to ${e?.toDate}` })  
        busesdata(e?.fromDate, e?.toDate, "date")
        handleClose()
   
      }
    const handleDelete = () => {
      setSelected(null)
        busesdata();
    }
    const DeleteBus = async => {
      var data = JSON.stringify({
        "bus_id": buses?.bus_id || null
      });
  
      var config = {
        method: 'post',
        url: baseURL + 'deleteBus',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `${apikey}`
        },
        data: data
      };
  
      axios(config)
        .then(function (response) {
          setDeleteBus(response.data)
          alert(response.data.message)
          reloadHandler()
        })
        .catch(function (error) {
          // console.log(error);
        });
  
    }
   
    const busesdata = async (i, id, g) => {
        var userid = JSON.parse(sessionStorage.getItem('userDetails'))?.id
        var role = JSON.parse(sessionStorage.getItem('userDetails'))?.role
      
        const data = JSON.stringify({
          "fromDate":date1 && moment(date1?.$d)?.format('YYYY-MM-DD'),
          "toDate":date2 && moment(date2?.$d)?.format('YYYY-MM-DD'), 
          "bus_id":state?.id,
          });
      
          const config = {
            method: 'post',
            url: baseURL + 'getBusData',
            headers: {
              'Content-Type': 'application/json',
              'Authorization': `${apikey}`
            },
            data
          };
    
        axios(config)
          .then((response) => {
            setBuses(response?.data)
          })
          .catch((error) => {
            // console.log(error);
          });
      }
const details = async => {
  var data = JSON.stringify({
    "bus_id": buses?.bus_id 
  });
  var config = {
    method: 'post',
    url: baseURL + 'getBusData',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `${apikey}`
    },
    data
  };
  axios(config)
    .then(function (response) {
      setDetailsData(response.data)
      updatedata()
    })
    .catch(function (error) {
      // console.log(error, "<---error");
    });
}
    return (
        <Container>
             <Stack direction="row" alignItems="center" justifyContent="space-between" mb={5}>
                <Typography variant="h5" gutterBottom>
                    <Link to="/dashboard/projects/project">
                        <IconButton>
                            <Iconify icon="material-symbols:arrow-back-rounded" />
                        </IconButton></Link>
                        Bus Details  
                        </Typography>
                        <div style={{display:"flex"}}>
                    {(userDetails==2)?<Button id="delete-icon" onClick={DeleteBus} style={{float:'right',textAlign:'left'}} sx={{
          '&:hover': {
            backgroundColor: 'white',
          },
        }} ><Iconify icon="ic:baseline-delete" style={{width:'30px',height:'30px',color:'#e69138',float:'right'}}></Iconify> </Button>:null}
           {(userDetails==2)?
           <div style={{"width":"30px"}}>
           <BusEdit clcikData={buses}
             admin ={admin}
             updatedata={()=>{setUserUpdate(!userUpdate)}}
             reloadHandler={reloadHandler}
             />
          </div>
             :null}
                    </div>
        
          
                    {(roleid!=2)?<Button variant="secondary" title="Choose date"  onClick={handleClickOpen}> <Iconify sx={{width:30,height:30}} icon="material-symbols:calendar-month"/>
                  </Button>:null}
               
             
            </Stack> 
             
            <Dialog fullScreen open={open} onClose={handleClose} TransitionComponent={Transition}>
          <AppBar sx={{ position: 'relative', bgcolor: '#ff7424' }}>
          <Toolbar>
          
       
                        <IconButton style={{color:"white"}} onClick={handleClose}>
                            <Iconify icon="material-symbols:arrow-back-rounded" />
                        </IconButton>
                        <Typography sx={{ ml: 2, flex: 1, color: "inherit" }} variant="h6" component="div" >
       Choose Date
       <Button style={{float:'right',color:'white'}} onClick={() => onDateSubmit({ fromDate: moment(date1?.$d)?.format('YYYY-MM-DD'), toDate: moment(date2?.$d)?.format('YYYY-MM-DD') })}>Submit</Button>
          </Typography>
        
          </Toolbar>
        </AppBar><br/>
       
            <Stack style={{marginTop:5,marginLeft:5,marginRight:5}}>
        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <DatePicker fullWidth
            label="From"
            defaultValue={date1}
            
            onChange={(newValue) => {
              setDate1(newValue)
             
              if(state?.id){
                busesdata()
              }
            }}
            value={date1}
            renderInput={(params) => <TextField {...params} color="common" />}
          />
        </LocalizationProvider>
  </Stack>
  <Stack style={{marginTop:10,marginLeft:5,marginRight:5}}>
        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <DatePicker fullWidth
            label="To"
            defaultValue={date2}
            minDate={dayjs(date1)}
            onChange={(newValue) => {
              setDate2(newValue)
             if(state?.id){
               busesdata()
             }
            }}
            value={date2}
            renderInput={(params) => <TextField {...params} color="common" />}
          />
        </LocalizationProvider>
      </Stack><br/>
 
      </Dialog>
      {
                    selected && <> <Chip style={{ backgroundColor: '#ffd796', color: '#000' }}label={` ${selected?.name} `} onDelete={() => { handleDelete(selected) }} /><br/>&nbsp;</>
      }
         <TableContainer component={Paper} sx={{width: ['100%', '60vw', '40vw'],justifyContent:'center',alignItems:'center',ml:10}}>
          <Table aria-label="customized table">
           
            <TableBody>
             <TableRow>
              <TableCell>Bus Number</TableCell>
              {(buses?.code!=404)?  <TableCell>:&nbsp;{buses?.register_number} </TableCell>: <TableCell>:&nbsp;null</TableCell>}
             </TableRow>
               <TableRow>
              <TableCell>Register Date</TableCell>
              {(buses?.code!=404)?  <TableCell>:&nbsp;{buses?.register_date}</TableCell>: <TableCell>:&nbsp;null</TableCell>}
             </TableRow>
               <TableRow>
              <TableCell>Engine Number</TableCell>
              {(buses?.code!=404)?   <TableCell>:&nbsp;{buses?.engine_number}</TableCell>: <TableCell>:&nbsp;null</TableCell>}
             </TableRow>
               <TableRow>
              <TableCell>Chasis Number</TableCell>
              {(buses?.code!=404)?<TableCell>:&nbsp;{buses?.chassis_number} </TableCell>: <TableCell>:&nbsp;null</TableCell>}
             </TableRow>
               <TableRow>
              <TableCell>Insurance Number</TableCell>
              {(buses?.code!=404)?   <TableCell>:&nbsp;{buses?.insurance_number}</TableCell>: <TableCell>:&nbsp;null</TableCell>}
             </TableRow>
               <TableRow>
              <TableCell>Insurance Company</TableCell>
              {(buses?.code!=404)?  <TableCell>:&nbsp;{buses?.insurance_company}</TableCell>: <TableCell>:&nbsp;null</TableCell>}
             </TableRow>
              <TableRow>
              <TableCell>Insurance Start Date</TableCell>
              {(buses?.code!=404)?<TableCell>:&nbsp;{buses?.insurance_start_date}</TableCell>: <TableCell>:&nbsp;null</TableCell>}
             </TableRow>
              <TableRow>
              <TableCell>Insurance End Date</TableCell>
              {(buses?.code!=404)? <TableCell>:&nbsp;{buses?.insurance_end_date}</TableCell>: <TableCell>:&nbsp;null</TableCell>}
             </TableRow>
              <TableRow>
              <TableCell>Last Service Date</TableCell>
              {(buses?.code!=404)?  <TableCell>:&nbsp;{buses?.last_service_date} </TableCell>: <TableCell>:&nbsp;null</TableCell>}
             </TableRow>
              <TableRow>
              <TableCell>Next Service Date</TableCell>
              {(buses?.code!=404)? <TableCell>:&nbsp;{buses?.next_service_due_date} </TableCell>: <TableCell>:&nbsp;null</TableCell>}
             </TableRow>
              <TableRow>
              <TableCell>Permit Details</TableCell>
              {(buses?.code!=404)?   <TableCell>:&nbsp;{buses?.permit} </TableCell>: <TableCell>:&nbsp;null</TableCell>}
             </TableRow>
              <TableRow>
              <TableCell>Fitness Certificate</TableCell>
              {(buses?.code!=404)? <TableCell>:&nbsp;{buses?.fitness_certificate} </TableCell>: <TableCell>:&nbsp;null</TableCell>}
             </TableRow>
              <TableRow>
              <TableCell>Emission Date</TableCell>
              {(buses?.code!=404)?  <TableCell>:&nbsp;{buses?.emission_date} </TableCell>: <TableCell>:&nbsp;null</TableCell>}
             </TableRow>
             
            </TableBody>
          </Table>
        </TableContainer>
        </Container>
    );
}
const styles = {
    card1: {
        backgroundColor: '#f5f5f5',
        opacity: 0.9,
        marginTop: "20px",
        padding: "1rem"
    },
}