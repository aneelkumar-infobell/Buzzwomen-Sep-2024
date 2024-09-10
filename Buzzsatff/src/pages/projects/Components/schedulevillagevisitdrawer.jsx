import { useEffect, useState } from 'react';
import axios from 'axios';
import React from "react"
import PropTypes from 'prop-types';
import Iconify from '../../../components/Iconify';
import Scrollbar from '../../../components/Scrollbar';
import { useLocation, useNavigate } from 'react-router-dom';
import { baseURL } from 'src/utils/api';
import {
    Box,
    Radio,
    Stack,
    Button,
    Drawer,
    Rating,
    Divider,
    Checkbox,
    FormGroup,
    IconButton,
    Typography,
    RadioGroup,
    Card,
    CardContent,
    TextField
} from '@mui/material';
import { DateTimePicker } from '@mui/x-date-pickers/DateTimePicker';
import dayjs from 'dayjs';
import moment from 'moment';
import { useAuth } from 'src/AuthContext';
Villagevisitdrawer.propTypes = {
    isOpenFilter: PropTypes.bool,
    onOpenFilter: PropTypes.func,
    onCloseFilter: PropTypes.func,
}; 

export default function Villagevisitdrawer({ isOpenFilter, onOpenFilter, onCloseFilter, clcikData,data,id }){
  const { apikey } = useAuth();
    const [scheduleData,setScheduleData] = useState('')
      const navigate = useNavigate();
    const [addData, setAddData] = useState({
        date: dayjs(new Date()),
        user_id: "",
      })
 const handleChange = (event) => {
        setAddData({ ...addData, date: event })
      }
    useEffect(() => {
      if(clcikData?.id){
        VillageVisit();
      }
       
    }, [clcikData])
    const createGfSession = async =>{
      const userid = JSON.parse(sessionStorage.getItem('userDetails'))?.id
      var data = JSON.stringify({
        "project_id": scheduleData?.data?.project_id,
        "user_id": userid,
        "locationId":scheduleData?.data?.location_id ,
        "tb_name": scheduleData?.data?.name,
        "numOfParticipants":JSON.stringify(scheduleData?.all_participants?.length) ,
        "tb_id": scheduleData?.data?.id,
        "gf_session_type": 2,
        "plan_date": moment(addData?.date?.$d)?.format('YYYY-MM-DD hh:mm A'),
        "gf_session_name": null,
      });
      
      var config = {
        method: 'post',
      maxBodyLength: Infinity,
      url: baseURL+'createGFSessions',
        headers: { 
          'Content-Type': 'application/json',
          'Authorization': `${apikey}`
        },
        data : data
      };
          
          axios(config)
          .then(function (response) {
            if(response?.data?.code ===200){
            navigate('/dashboard/projects/gelathiProgram',{state:{id:id}})
            }
            else{
  alert(response?.data?.message)
            }
          })
          .catch(function (error) {
            // console.log(error);
          });
          
    }
    const VillageVisit = async =>{
        var role = JSON.parse(sessionStorage?.getItem('userDetails'))?.role
        var idvalue = JSON.parse(sessionStorage?.getItem('userDetails'))?.id;
        var data = JSON.stringify({
          "batch_id": clcikData?.id,
          "role_id": role
        });
        
        var config = {
          method: 'post',
        maxBodyLength: Infinity,
          url: baseURL + 'getTrainingBatchData',
          headers: { 
            'Content-Type': 'application/json',
             'Authorization': `${apikey}`
          },
          data : data
        };
            
            axios(config)
            .then(function (response) {
              setScheduleData(response?.data)
            })
            .catch(function (error) {
              // console.log(error);
            });
            
           
      }
    return(
        <>
          <Drawer
                anchor="right"
                open={isOpenFilter}
                onClose={onCloseFilter}
                PaperProps={{
                    sx: { width: 350, },
                }}
            >
                <Stack direction="row" alignItems="center" justifyContent="space-between" sx={{ px: 1, py: 2 }}>
                    <Typography variant="subtitle1" sx={{ ml: 1 }}>
                        {`${clcikData?.title}`}
                    </Typography>
                    <IconButton onClick={onCloseFilter}>
                        <Iconify icon="eva:close-fill" width={20} height={20} />
                    </IconButton>
                </Stack>
                <Divider />
                <Scrollbar>
                    <Stack spacing={3} sx={{ p: 3 }}>
                        <div>
                            <Card>
                                <CardContent>
                                <Typography style={{ flexDirection: 'row' }} variant="subtitle1" gutterBottom>
                              Project: &nbsp;&nbsp;<span style={{ fontWeight: 100 }}>{scheduleData?.data?.projectName}</span>
                             </Typography>
                                  
                                    <Typography style={{ flexDirection: 'row' }} variant="subtitle1" gutterBottom>
                                    Partner :&nbsp;&nbsp;<span style={{ fontWeight: 100 }}>{scheduleData?.data?.partnerName}</span>
                                    </Typography>
                                
                                    <Typography style={{ flexDirection: 'row' }} variant="subtitle1" gutterBottom>
                                        Village  :
                                        &nbsp;&nbsp;<span style={{ fontWeight: 100 }}>{scheduleData?.data?.name}</span>
                                    </Typography>
                                </CardContent>
                            </Card>
                            <Typography style={{ flexDirection: 'row',marginTop:20,marginLeft:5 }} variant="subtitle1" gutterBottom>
                                       All Participants :  {scheduleData?.all_participants?.length}
                                    </Typography>
                          
                                <Card style={{marginTop:20}}>
                                    <CardContent>
                                    <DateTimePicker
                    label="Date&Time picker"
                    value={addData?.date}
                    required
                    onChange={(e) => { handleChange(e) }}
                    renderInput={(params) => <TextField {...params} color="common" />}
                    PopperProps={{
                      placement: "top"
                  
                    }}
                  />
                                    </CardContent>
                                </Card>
                                <Stack mt={5}>
                                <Button fullWidth variant="contained" onClick={createGfSession} >Save</Button>
                                </Stack>
                </div>
                    </Stack>
                </Scrollbar>
                </Drawer>
        </>
    )
}