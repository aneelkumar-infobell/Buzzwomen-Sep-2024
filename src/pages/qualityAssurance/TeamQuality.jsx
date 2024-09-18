import { useEffect, useState, forwardRef } from 'react';
import { useForm } from 'react-hook-form';
import React from 'react';
import axios from 'axios';
import PropTypes from 'prop-types';
import { baseURL } from 'src/utils/api';
import {
  Container,
  Stack,
  Typography,
  Box,
  Button,
  TextField,
  Grid,
  Snackbar,
  Card,
  CardActionArea,
  Checkbox,
  Dialog,
  DialogContentText,
  Toolbar,
  IconButton,
  DialogContent,
  CircularProgress,
} from '@mui/material';
import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import CloseIcon from '@mui/icons-material/Close';
import MuiAlert, { AlertProps } from '@mui/material/Alert';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Page from '../../components/Page';
import moment from 'moment';
import Iconify from 'src/components/Iconify';
import { oldbaseURL } from 'src/utils/api';
import { useAuth } from 'src/AuthContext';
import SingleQulityDashboard from './SingleQulityDashboard';
  

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
export default function TeamQuality({reload}) {
    const { apikey } = useAuth();
  const [value, setValue] = React.useState(0);
  const data = sessionStorage?.getItem('userId');
  var [dateValue, setDatevalue] = useState(new Date().toISOString().split('T')[0]);
  const [drawerEvent, SetDrawerEvent] = useState(false);
  const [selectedTeamTA, setselectedTeamTA] = useState(null);
  const [openFilter, setOpenFilter] = useState(false);
  const [openDetailsFilter, setOpenDetailsFilter] = useState(false);
  const [selectedTeamMember, setSelectedTeamMember] = useState(null);
  const [teamMembersData, setTeamMembersData] = useState([]);
  const [mainValue, setMainValue] = useState(0);
  const [filterData, setFilterData] = useState(null);
  const [teamTADataIDs, setteamTADataIDs] = useState(null);
  const [teamTAData, setTeamMembersTAData] = useState([]);
  const [checkedData, setCheckedData] = useState([]);
  var [selectedAll, setSelectedAll] = useState(false);
  const [comments, setComments] = useState('');
  const [approve, setapprove] = useState('');
  const [statusValue, setStatus] = useState([]);
  const [reject, setreject] = useState('');
  const [verifylist, setverifylist] = useState('');
  const [open, setOpen] = useState(false);
  var [singlePersonFormDetail, setSinglePersonFormDetail] = useState('');
  var [todayPoa, setTodayPoa] = useState([]);


  useEffect(() => {
    getPOA();
  }, [reload]);
  useEffect(() => {
    getPOA();
  }, [])
  var userid = JSON.parse(sessionStorage.getItem('userDetails'))?.id
  var role =JSON.parse(sessionStorage.getItem('userDetails'))?.role
  const getPOA = () => {
    var data = JSON.stringify({
      emp_id: userid,
      team: '',
    });
    var config = {
      method: 'post',
      url: baseURL + 'getMyTeamQAF',
      headers: {
        'Content-Type': 'application/json',
         'Authorization': `${apikey}`
      },
      data: data,
    };
    axios(config)
      .then(function (response) {
        todayPoa = response.data.data;
        setTodayPoa(todayPoa);
      })
      .catch(function (error) {
        // console.log(error);
      });
  };
  const handleClose = () => {
    setOpen(false);
  };
  const singleItemHandler = (itm) => {
    singlePersonFormDetail = itm;
    setSinglePersonFormDetail(singlePersonFormDetail);
    setOpen(true);
  };

  return (
    todayPoa.length==0 ?
    <div style={{fontWeight:700,fontSize:20,textAlign:"center",justifyContent:'center',alignItems:"center"}}>
No Data Found
</div>
:
    <div>
      {todayPoa &&
        todayPoa?.map((itm) => {
          return (
            <>
              <Card
                id="card-own-ta-amount"
                style={{
                  margin: '20px',
                  borderRadius: '5px',
                  backgroundColor: '#f7f7f7',
                  cursor: 'pointer',
                  padding: '1rem',
                }}
              >
                <Grid id="grid-own-ta-amount" container spacing={2}>
                  <Grid
                    id="grid-own-open-filter"
                    onClick={() => {
                    }}
                    item
                    xs={8}
                  >
                    <b cursor="pointer" style={{ color: 'blue' }}>
                      {itm?.name}
                    </b>
                    <br></br>
                  </Grid>
                  <Grid item xs={4}>
                    <Iconify
                      id="uiicons-cross"
                      onClick={() => {   singleItemHandler( itm )
                      }}
                      style={{ float: 'right', marginTop: 5, marginRight: 10, fontSize: 30, color: 'gray' }}
                      icon="mdi:form-outline"
                    ></Iconify>
                  
                  </Grid>
                </Grid>
              </Card>
            </>
          );
        })}
      <SingleQulityDashboard openSingleQulityDashboard={open} handleClose={handleClose} item={singlePersonFormDetail} />
    </div>
  );
}
