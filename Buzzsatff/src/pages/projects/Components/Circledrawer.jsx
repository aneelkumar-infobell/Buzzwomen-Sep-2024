import { useEffect, useState } from 'react';
import axios from 'axios';
import React from 'react';
import { Icon } from '@iconify/react';
import PropTypes from 'prop-types';
import Iconify from '../../../components/Iconify';
import Scrollbar from '../../../components/Scrollbar';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
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
  TextField,
} from '@mui/material';
import { DateTimePicker } from '@mui/x-date-pickers/DateTimePicker';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import dayjs from 'dayjs';
import moment from 'moment';
import GelathiCircleForm from './GelathiCircleForm';
import {oldbaseURL} from 'src/utils/api';
import InputAdornment from '@mui/material/InputAdornment';
import SearchIcon from '@mui/icons-material/Search';
import { useAuth } from 'src/AuthContext';
Circledrawer.propTypes = {
  isOpenFilter: PropTypes.bool,
  onOpenFilter: PropTypes.func,
  onCloseFilter: PropTypes.func,
};
export default function Circledrawer({ isOpenFilter,head , onOpenFilter, onCloseFilter, clcikData, data1, id }) {
    const { apikey } = useAuth();
  const [scheduleData, setScheduleData] = useState('');
  var [searchData, setSearchData] = useState('');
  var [search, setSearch] = useState('');
  var [selected, setSelected] = useState(null);
  const { state } = useLocation();
  const [sendData, setSendData] = React.useState({
    project_id: '',
    circle_name: '',
    circle_date: '',
    gelathi_created_id: '',
  });
  const searchFunction = (e) => {
    search = e;
    setSearch(search);
    enrolledGelathi();
  };
  const changeText = (e) => {
    setSearchData(e?.target?.value);
    searchFunction(e?.target?.value);
  };
  const enrolledGelathi = (async) => {
    var userDetails = JSON.parse(sessionStorage?.getItem('userDetails'));
    var role = JSON.parse(sessionStorage?.getItem('userDetails'))?.role;
    var idvalue = JSON.parse(sessionStorage?.getItem('userDetails'))?.id;
    var data = JSON.stringify({
      search: search,
      project_id: state?.id,
      emp_id: idvalue,
      role_id: role,
    });
    var config = {
      method: 'post',
      url: baseURL+'getEnrollGelathi',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `${apikey}`
      },
      data: data,
    };
    axios(config)
      .then(function (response) {
        setenrolled(response.data);
      })
      .catch(function (error) {
        // console.log(error);
      });
  };
  const removegelathicircle = async (itm) => {
    if (confirm('Are you sure want to remove')) {
      var data = JSON.stringify({
        circle_id: clcikData?.id,
        flag: 0,
        gelathi_id: itm?.gelathi_id,
      });
      var config = {
        method: 'post',
        url: baseURL+'updateEnrolledGelathi',
        headers: {
          'Content-Type': 'application/json',
           'Authorization': `${apikey}`
        },
        data: data,
      };
      axios(config)
        .then(function (response) {
          if(clcikData?.id &&data1?.project_id){
             circle()
          }
        })
        .catch(function (error) {
          // console.log(error);
        });
    }
  };
  const navigate = useNavigate();
  const [addData, setAddData] = useState({
    date: dayjs(new Date()),
    user_id: '',
  });
  const handleChange = (event) => {
    setAddData({ ...addData, date: event });
  };
  useEffect(() => {
    if(clcikData?.id){
      VillageVisit();
    }
    if(clcikData?.id &&data1?.project_id){
      circle();
   }
    setSendData({
      circle_date: clcikData?.date,
    });
  }, [clcikData]);
  const [circleData, setcircleData] = useState('');
  const createGfSession = (async) => {
    const userid = JSON.parse(sessionStorage.getItem('userDetails'))?.id;
    var data = JSON.stringify({
       project_id: data1?.project_id,
      user_id: userid,
      circle_id: head=="CM"?   clcikData?.id : clcikData?.circleDI,
      locationId:data1?.location_id,
       tb_name: clcikData?.name,
      tb_id: 0,
      plan_date: moment(sendData?.circle_date?.$d)?.format('YYYY-MM-DD HH:mm:ss'),
      numOfParticipants: circleData?.gelathis?.length,
      gf_session_type: state?.head == '_SPS'
      ? "4"
      : state?.head == '_SPM1'
      ? "5"
      : state?.head == '_SPM2'
      ? '6'
      : state?.head == '_SPM3'
      ? '7'
      : state?.head == '_SPM4'
      ? '8'
      : state?.head == '_SPM5'
      ? '9'
      : state?.head == '_GPS'
      ? '10'
      : state?.head == '_GPM1'
      ? '11'
      : state?.head == '_GPM2'
      ? '12'
      : state?.head == '_GPM3'
      ? '13'
      : state?.head == '_GPM4'
      ? '14'
      : state?.head == '_GPM5'
      ? '15'
      : state?.head == '_VPS'
      ? '16'
      : state?.head == '_VPM1'
      ? '17'
      : state?.head == '_VPM2'
      ? '18'
      : state?.head == '_VPM3'
      ? '19'
      : state?.head == '_VPM4'
      ? '20'
      : state?.head == '_VPM5'
      ? '21'
      : head == "CM" ? "1": null ,
        
     
    });
    var config = {
      method: 'post',
      maxBodyLength: Infinity,
       url: baseURL+'createGFSessionsNew1',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `${apikey}`
      },
      data: data,
    };
    axios(config)
      .then(function (response) {
        if (response?.data?.code === 200) {
          navigate('/dashboard/projects/gelathiProgram', { state: { id: id } })
        } else {
          alert(response?.data?.message);
        }
      })
      .catch(function (error) {
        // console.log(error);
      });
  };
  const VillageVisit = (async) => {
    var role = JSON.parse(sessionStorage?.getItem('userDetails'))?.role;
    var idvalue = JSON.parse(sessionStorage?.getItem('userDetails'))?.id;
    var data = JSON.stringify({
      batch_id: clcikData?.id,
      role_id: role,
    });
    var config = {
      method: 'post',
      maxBodyLength: Infinity,
      url: baseURL +'getTrainingBatchData',
      headers: {
        'Content-Type': 'application/json',
         'Authorization': `${apikey}`
      },
      data: data,
    };
    axios(config)
      .then(function (response) {
        setScheduleData(response?.data);
      })
      .catch(function (error) {
        // console.log(error);
      });
  };
  const circle = async () => {
    const userid = await JSON.parse(sessionStorage.getItem('userDetails'))?.id;
    var data = JSON.stringify({
      circle_id: clcikData?.id,
      project_id: data1?.project_id,
      emp_id: userid,
    });
    var config = {
      method: 'post',
      url: baseURL+'getGelathiCircleDataNew',
      headers: {
        'Content-Type': 'application/json',
         'Authorization': `${apikey}`
      },
      data: data,
    };
    axios(config)
      .then(function (response) {
        setcircleData(response?.data);
      })
      .catch(function (error) {
        // console.log(error);
      });
  };
  return (
    <>
      <Drawer
        anchor="right"
        open={isOpenFilter}
        onClose={onCloseFilter}
        PaperProps={{
          sx: { width: 350 },
        }}
      >
        <Stack direction="row" alignItems="center" justifyContent="space-between" sx={{ px: 1, py: 2 }}>
          <Typography variant="subtitle1" sx={{ ml: 1 }}>
            Schedule a CM 
          </Typography>
          <IconButton onClick={onCloseFilter}>
            <Iconify icon="eva:close-fill" width={20} height={20} />
          </IconButton>
        </Stack>
        <Divider />
        <Scrollbar>
          <Stack spacing={3} sx={{ p: 3 }}>
            <div>
        
              <Typography
                style={{ flexDirection: 'row', marginTop: 20, marginLeft: 5 }}
                variant="subtitle1"
                gutterBottom
              >
                Circle Name : {`${clcikData?.name}`}
              </Typography>
              <Typography
                style={{ flexDirection: 'row', marginTop: 20, marginLeft: 5 }}
                variant="subtitle1"
                gutterBottom
              >
                Date And Time :{`${clcikData?.date}`}
              </Typography>
              {/* <DatePicker
                required
                label="Date"
                defaultValue={sendData?.circle_date}
                onChange={(newValue) => setSendData({ ...sendData, circle_date: newValue })}
                renderInput={(params) => <TextField {...params} fullWidth />}
                value={sendData?.circle_date}
              /> */}
                          <DateTimePicker
                    label="Date&Time picker"
                    value={sendData?.circle_date}
                    required
                    onChange={(newValue) => setSendData({ ...sendData, circle_date: newValue })}
                    renderInput={(params) => <TextField {...params} color="common" />}
                    PopperProps={{
                      placement: "top"
                  
                    }}
                  />
              {/* <TextField
                id="outlined-basic"
                label="Search..."
                sx={{ flex: 10 }}
                onChange={(e) => {
                  changeText(e);
                }}
                InputProps={{
                  startAdornment: (
                    <Button>
                      <InputAdornment position="start">
                        <SearchIcon />
                      </InputAdornment>
                    </Button>
                  ),
                }}
                variant="outlined"
                style={{ marginTop: 40, marginLeft: 10, width: '100%' }}
              /> */}
              <Typography
                style={{ flexDirection: 'row', marginTop: 20, marginLeft: 5 }}
                variant="subtitle1"
                gutterBottom
              >
                Enrolled Gelathis  (
                {scheduleData?.all_participants?.length > 0
                  ? scheduleData?.all_participants?.length
                  : circleData?.gelathis?.length}
                ):{' '}
              </Typography>
            </div>
          
            {circleData?.gelathis?.length > 0 ? (
              <div>
                {circleData?.gelathis?.map((itm) => {
                  
                  return (
                    <Card style={{ marginTop: 20 }}>
                      <CardContent>
                        <Stack style={{ float: 'right' }}>
                          <IconButton style={{ marginLeft: 70 }} onClick={() => removegelathicircle(itm)}>
                            <Icon
                              icon="material-symbols:check-box-rounded"
                              width={20}
                              height={20}
                              marginTop={20}
                              color="#ff7424"
                            />
                          </IconButton>
                          {/* <GelathiCircleForm /> */}
                        </Stack>
                        <Typography variant="subtitle1">{itm?.firstName}</Typography>
                        <Typography variant="subtitle1" gutterBottom>
                          <Typography variant="body1" gutterBottom>
                            {itm?.villagename}
                          </Typography>
                        </Typography>
                      </CardContent>
                    </Card>
                  );
                })}
              </div>
            ) : (
              <h5 style={{ textAlign: 'center', marginTop: '50%' }}>No Gelathi</h5>
            )}
          </Stack>
        </Scrollbar>
        <Stack mt={5} spacing={3} sx={{ p: 3 }}>
          <Button fullWidth variant="contained" onClick={createGfSession} style={{ backgroundColor: '#FF7424' }}>
            Save
          </Button>
        </Stack>
      </Drawer>
    </>
  );
}
