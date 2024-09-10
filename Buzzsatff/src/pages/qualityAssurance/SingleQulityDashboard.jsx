import * as React from 'react';
import { useState, useEffect } from 'react';
import Swal from 'sweetalert2'
import axios from 'axios';
import {
  Button,
  Grid,
  Stack,
  TextField,
  Select,
  Radio,
  RadioGroup,
  InputLabel,
  MenuItem,
  Checkbox,
  Box,
  FormGroup,
  FormControlLabel,
  Card,
  CardContent,
  CardActionArea,DialogContent,DialogContentText, FormHelperText
} from '@mui/material';
import Tabs from '@mui/material/Tabs';
import DialogForm from './components/DialogForm';
import Tab from '@mui/material/Tab';
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
import { Color } from '@mui/material';
import { Link, useLocation } from 'react-router-dom';
import Iconify from 'src/components/Iconify';
import { Icon } from '@iconify/react';
import products from 'src/_mock/products';
import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';
import Alert from '@mui/material/Alert';
import { ReplayCircleFilled } from '@mui/icons-material';
import { baseURL } from 'src/utils/api';
import { useAuth } from 'src/AuthContext';
import GetSingleQualityForm from './GetSingleQualityForm';
const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});
  
function TabPanel(props) {
    const { children, value, index, ...other } = props;
  
}
const SingleQulityDashboard = ({openSingleQulityDashboard , handleClose ,item} )=> {
  const { apikey } = useAuth();
const [value, setValue] = React.useState(0);
const data = sessionStorage?.getItem('userId')
var [dateValue, setDatevalue] = useState(new Date().toISOString().split('T')[0])
const image = ["tykml", "exrdcftvbgyhnuj"]
const [drawerEvent, SetDrawerEvent] = useState(false);
const [editData, setEditData] = useState(null)
const [openFilter, setOpenFilter] = useState(false);
const [mainValue, setMainValue] = useState(0)
const [batch,setBatch] = useState('')
const [showSingleform ,setShowSingleForm] = useState(false)
const [shown,setShown] = React.useState(false);
var [itmForForm, setItemForForm ] = useState()
const [openGetSingleQualityForm ,setOpenGetSingleQualityForm] = useState(false)
const userOwnPermissions=['9','5','12','4','13','6','3']
const userTeamPermissions=['2','1','12','4','13','3','11']
var [todayPoa,setTodayPoa]=useState('');
 
const getPOA =()=>{
    var data = JSON.stringify({
        "Emp_id":parseInt(item?.id),
        "Role_id":parseInt(item?.empRole)
    });
      
      var config = {
        method: 'post',
        url: baseURL + 'listQualityAssessmentForm',
        headers: { 
          'Content-Type': 'application/json',
          'Authorization': `${apikey}`
        },
        data : data
      };
      
      axios(config)
      .then(function (response) {
        todayPoa = response.data
        setTodayPoa(todayPoa)
      })
      .catch(function (error) {
        // console.log(error);
      });
      
}
useEffect(()=>{
  if(!userOwnPermissions.includes(data)){
  setMainValue(1)
  }
    },[])
const getDateValue = (e) => {
  setDatevalue(e)
}
const returnDateValue = () => {
  return dateValue
}
const handleChange = (event, newValue) => {
  setValue(newValue);
};
useEffect(()=>{
  if(item?.id!=null && item?.empRole!=null ) {
    getPOA()
  }
       },[item])
       const handleCloseGetSingleQualityForm = ()=>{
        setOpenGetSingleQualityForm(false)
      }
       const singleformHandler = (itm) =>{
        setShowSingleForm(true)
        itmForForm = itm
        setItemForForm(itm)
        setOpenGetSingleQualityForm(true)
       }
  return (
    <div> <Dialog fullScreen open={openSingleQulityDashboard} onClose={handleClose} TransitionComponent={Transition}>
        <AppBar sx={{ position: 'fixed', bgcolor: '#ff7424' }}>
          <Toolbar sx={{ bgcolor: '#ff7424', color: 'white' }} >
             <IconButton style={{color:"white"}} onClick={handleClose}>
                            <Iconify icon="material-symbols:arrow-back-rounded" />
                        </IconButton>
                        <Typography sx={{ ml: 2, flex: 1, color: "inherit" }} variant="h6" component="div" >
            Quality Assessment  Form 
          </Typography>
 </Toolbar>
              </AppBar>
     
              <div  style={{marginTop:"50px"}}>
            {
           todayPoa &&  todayPoa?.data?.map((itm)=>{
                return (
                    <>
                    <Card id="card-own-ta-amount" style={{ margin: "20px", borderRadius: "5px", backgroundColor: "#f7f7f7", cursor: "pointer", padding: "1rem" }} onClick={() => {
                                            singleformHandler(itm)
                                                 }} >
                    <Grid id="grid-own-ta-amount" container spacing={2}  >
                                            <Grid id="grid-own-open-filter"  item xs={8}>
                                                <b cursor="pointer" style={{ color: "blue" }} >{itm?.name_of_the_assessor}</b><br>
                                                </br>
                                                <Typography style={{fontSize:"0.7rem"}} > <b>{itm?.program_assessment == 1? 
                                                <>
                                                Trainer : {itm?.name_of_the_trainer_being_evaluated } <br/>
                                                Program Name: Self Shakti Training Program &nbsp;({itm?.day1_or_day2})
                                                </> :
                                                itm?.program_assessment == 2? 
                                                
                                                <>
                                                Field Associate : {itm?.name_of_the_gf}<br/>
                                                Program Name: Gelathi Program &nbsp;({itm?.assessment_of})
                                                </>
                                                : itm?.program_assessment == 3? 
                                                <>
                                                   Gelathi : {itm?.name_of_the_gelathi_being_evaluated}<br/>
                                                   Program Name: Self Shakti by Gelathi &nbsp;({itm?.days_modules})
                                                </>
                                              : null
                                              }</b></Typography>
                                            </Grid>
                                            <Grid item xs={4}>
                                                {/* <Iconify id="uiicons-cross" onClick={() => { handleDeleteTA(itm) }} style={{ float: "right", marginTop: 5, marginRight: 10, fontSize: 30, color: "gray" }} icon="system-uicons:cross"></Iconify>
                                                <Iconify id="icon-outline-access-time" style={{ float: "right", marginTop: 5, marginRight: 30, fontSize: 30, color: "#303030" }} icon="ic:outline-access-time"></Iconify>
                                           */}
                                            </Grid>
                                        </Grid>
                    
                    </Card>
                </>
                )
            })
           
          } 
           
         { todayPoa?.data== null? 
          
       <>
              <h4 style={{textAlign:'center' ,marginTop:"40px"}}>No Data Found</h4>
              </>:null
       }
          
         
        </div>
      {  (itmForForm) &&   <GetSingleQualityForm item ={itmForForm}  open={openGetSingleQualityForm} handleClose={handleCloseGetSingleQualityForm}/>
}
      </Dialog>
     
    </div>
  );
}
 
export default SingleQulityDashboard