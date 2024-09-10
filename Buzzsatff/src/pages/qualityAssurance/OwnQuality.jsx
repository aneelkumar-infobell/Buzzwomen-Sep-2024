import { useEffect, useState, forwardRef } from 'react';
import { useForm } from "react-hook-form";
import React from "react";
import axios from 'axios';
import PropTypes from 'prop-types';
import Select from '@mui/material/Select';
import { Container, Stack, Typography, Box, Button, TextField, Grid, Snackbar, Card, CardActionArea, MenuItem, CircularProgress } from '@mui/material';
import { baseURL} from 'src/utils/api';
import GetSingleQualityForm from './GetSingleQualityForm';
import Iconify from 'src/components/Iconify';
import { useAuth } from 'src/AuthContext';
  
function TabPanel(props) {
    const { children, value, index, ...other } = props;
    return (
        <div
            role="tabpanel"
            hidden={value !== index}
            id={`simple-tabpanel-${index}`}
            aria-labelledby={`simple-tab-${index}`}
            {...other}
        >
            {value === index && (
                <Box sx={{ p: 3 }}>
                    <Typography>{children}</Typography>
                </Box>
            )}
        </div>
    );
}
TabPanel.propTypes = {
    children: PropTypes.node,
    index: PropTypes.number.isRequired,
    value: PropTypes.number.isRequired,
};
function a11yProps(index) {
    return {
        id: `simple-tab-${index}`,
        'aria-controls': `simple-tabpanel-${index}`,
    };
}
export default function OwnQuality({reload}) {
  const { apikey } = useAuth();
var [singleFormData , setSingleFormData] = useState('')
const [ open ,setOpen] = useState(false)
    const [todayPoa,setTodayPoa]=useState('');
    const [showSingleform ,setShowSingleForm] = useState(false)
    var userid = JSON.parse(sessionStorage.getItem('userDetails'))?.id
    var role =JSON.parse(sessionStorage.getItem('userDetails'))?.role
    useEffect(()=>{
       
      if(userid && role ) {
        getPOA()
      }

          },[reload])
          useEffect(()=>{
            if(userid && role ) {
              getPOA()
            }
               },[])
          var [itmForForm, setItemForForm ] = useState()
          const [openGetSingleQualityForm ,setOpenGetSingleQualityForm] = useState(false)     
          
      
const getPOA =()=>{
    var data = JSON.stringify({
        "Emp_id":parseInt(userid),
        "Role_id":parseInt(role)
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
        setTodayPoa(response.data)
      })
      .catch(function (error) {
        // console.log(error);
      });
      
}
const handleClose = ()=>{
    setOpen(false)
  }
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
        todayPoa?.data == null ?
        <div style={{marginTop:"20%" , marginLeft:"40%",fontWeight:700,fontSize:20}}>
     No data Found
  </div>
:  
        <div>
            {
           todayPoa &&  todayPoa?.data?.map((itm)=>{
                return (
                    <>
                    <Card id="card-own-ta-amount" style={{ margin: "20px", borderRadius: "5px", backgroundColor: "#f7f7f7", cursor: "pointer", padding: "1rem" }} onClick={() => {
                                            
                                                 }} >
                    <Grid id="grid-own-ta-amount" container spacing={2} >
                                            <Grid id="grid-own-open-filter"  item xs={8}>
                                                <b cursor="pointer" style={{ color: "blue" }} >{itm?.name_of_the_assessor}</b><br>
                                                </br>
                                                <Typography style={{fontSize:"0.7rem"}} > <b>{itm?.program_assessment == 1? 
                                                <>
                                                Trainer Evaluated: {itm?.name_of_the_trainer_being_evaluated } <br/>
                                                Program Name : Self Shakti Training Program &nbsp;({itm?.day1_or_day2})
                                                </> :
                                                itm?.program_assessment == 2? 
                                                <>
                                                Field Associate Evaluated: {itm?.name_of_the_gf}<br/>
                                                Program Name : Gelathi Program  &nbsp;({itm?.assessment_of})
                                                </>
                                                : itm?.program_assessment == 3? 
                                                <>
                                                   Gelathi Evaluated: {itm?.name_of_the_gelathi_being_evaluated}<br/>
                                                   Program Name : Self Shakti by Gelathi &nbsp;({itm?.days_modules})
                                                </>
                                              : null
                                              }</b></Typography>
                                           
                                            </Grid>
                                            <Grid item xs={4}>
                                                <Iconify id="uiicons-cross" onClick={() => {
                                                    singleformHandler(itm)
                                                     }} style={{ float: "right", marginTop: 5, marginRight: 10, fontSize: 30, color: "gray" }} icon="mdi:form-outline"></Iconify>
                                             
                                            </Grid>
                                        </Grid>
                    
                    </Card>
                </>
                )
            })
          } 
{itmForForm &&   <GetSingleQualityForm item ={itmForForm}  open={openGetSingleQualityForm} handleClose={handleCloseGetSingleQualityForm}/>
     } 
 
       </div>
    );
}