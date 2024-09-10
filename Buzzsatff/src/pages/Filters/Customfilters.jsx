import { useState, useEffect } from 'react';
import axios from 'axios';
import Box from '@mui/material/Box';
import dayjs from 'dayjs';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import { FormControl ,InputLabel,TextField} from '@mui/material';
import Stack from '@mui/material/Stack';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { StaticDatePicker } from '@mui/x-date-pickers/StaticDatePicker';
import moment from 'moment'
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import MenuItem from '@mui/material/MenuItem';
import Select, { SelectChangeEvent, } from '@mui/material/Select';
import { baseURL } from 'src/utils/api';
import { useAuth } from 'src/AuthContext';
export default function Customfilter(props) {
    const { apikey } = useAuth();
  const [country, setCountry] = useState([])
  const [fund, setFund] = useState()
  const [endDate, setEndDate] = useState(new Date());
  const [startDate, setStartDate] = useState(new Date());
  const [states, setStates] = useState([])
  const [district, setDistrict] = useState([])
  const [taluk, setTaluk] = useState([])
  const [teamData, setTeamData] = useState([])
  const userid = JSON.parse(sessionStorage?.getItem('userDetails'))?.role
  const [listData, setListData] = useState();
  const [gelathiData, setGelathiData] = useState();
  var [data, setData] = useState({
    country: 1,
    state: '',
    startDate:"",
    endDate:"",
    type:"custom"
  })
  useEffect(() => {
    getCountry()
    location()
    getFunder()
    teamList()
    trainerList()
    gelathiList()

  }, []
  )
  const getCountry = async (district) => {
    var data = JSON.stringify({
      "country_id": "1",
     
    });
    var config = {
      method: 'post',
      url: baseURL + 'getLocation',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `${apikey}`
      },
      data: data
    };
    axios(config)
      .then(function (response) {
        setCountry(response.data)
      })
      .catch(function (error) {
      //  console.log(error);
      });
  }
  const location = async => {
    var data = JSON.stringify({
      "country_id": "1",
    });
    var config = {
      method: 'post',
      url: baseURL + 'getLocation',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `${apikey}`
      },
      data: data
    };
    axios(config)
      .then(function (response) {
        setStates(response?.data?.list)
      })
      .catch(function (error) {
        // console.log(error);
      });
  }
  const getState = async (id) => {
    var data = JSON.stringify({
      "country_id": "1",
      "state_id": JSON.stringify(parseInt(id))
    });
    var config = {
      method: 'post',
      url: baseURL + 'getLocation',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `${apikey}`
      },
      data: data
    };
    axios(config)
      .then(function (response) {
        setDistrict(response.data.list)
      })
      .catch(function (error) {
        // console.log(error);
      });
  }
  const getDistrict = async (district) => {
    var data = JSON.stringify({
      "country_id": "1",
      "state_id": data?.state,
      "district_id": JSON.stringify(parseInt(district.id)),
      "district_name":district.name
    });
    var config = {
      method: 'post',
      url: baseURL + 'getLocation',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `${apikey}`
      },
      data: data
    };
    axios(config)
      .then(function (response) {
        setTaluk(response.data.list)
      })
      .catch(function (error) {
      //  console.log(error);
      });
  }
  const getFunder = () => {
    var roleid = JSON.parse(sessionStorage?.getItem('userDetails'))?.role;
    var empid = JSON.parse(sessionStorage?.getItem('userDetails'))?.id;
    const data = JSON.stringify({
      "role_id": JSON.stringify(parseInt(roleid)),
      "filter_type": "2",
      "pageNum": 1,
      "emp_id": JSON.stringify(parseInt(empid))
  });
  const config = {
      method: 'post',
      url: baseURL + 'getPeopleFilters',
      headers: {
          'Content-Type': 'application/json',
          'Authorization': `${apikey}`
      },
      data
  };
    axios(config)
        .then((response) => {
            setFund(response?.data?.data)
        })
        .catch((error) => {
            // console.log(error);
        });
}
const teamList = async => {
  var config = {
    method: 'post',
    url: baseURL+'getOperationsManagerList',
    headers: {
      'Authorization': `${apikey}`
    }
  };
  axios(config)
    .then(function (response) {
      setTeamData(response.data)
    })
    .catch(function (error) {
      // console.log(error);
    });
}
const trainerList = async => {
  var data = JSON.stringify({
    "role_id": "5",
    "project_id": "292",
    "operation_manager_id": "122",
    "pageNum": "1"
  });
  var config = {
    method: 'post',
    url: baseURL + 'getPeopleList',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `${apikey}`
    },
    data: data
  };
  axios(config)
    .then(function (response) {
      setListData(response.data)
    })
    .catch(function (error) {
      // console.log(error);
    });
  }
  const gelathiList = () => {
    var data = JSON.stringify({
      "role_id": "6",
      "project_id": "292",
      "operation_manager_id": "35",
      "pageNum": "1"
  });
  var config = {
      method: 'post',
      url: baseURL + 'getPeopleList',
      headers: {
          'Content-Type': 'application/json',
          'Authorization': `${apikey}`
      },
      data: data
  };
    axios(config)
        .then(function (response) {
            setGelathiData(response.data)
        })
        .catch(function (error) {
            // console.log(error);
        });
}
  return (
    <div>
      <Card>
        <CardContent>
<Typography style={{textAlign:'center'}}>View Projects By</Typography>
          <Typography style={{ flexDirection: 'row', color: '#ed6c02' }} variant="subtitle1" gutterBottom>
            Country
            <Select fullWidth variant='standard' color="common"
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              defaultValue="0"
              label="Age"
            >
              <MenuItem value="0">{country?.country}</MenuItem>
            </Select> </Typography><br></br>
          <Typography style={{ flexDirection: 'row', color: '#ed6c02' }} variant="subtitle1" gutterBottom>
            {data.state == "" && "Select "}State
            <Select fullWidth variant='standard' color="common"
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              defaultValue={data.state}
              label="Age"
              onChange={(e => {
                setData({ ...data, state: e?.target?.value }),
                  getState(e?.target?.value)
              })}
            >
              {states?.map(itm => {
                return (
                  <MenuItem value={itm?.id}>{itm?.name}</MenuItem>
                )
              })
              }
            </Select> </Typography><br></br>
          <Typography style={{ flexDirection: 'row', color: '#ed6c02' }} variant="subtitle1" gutterBottom>
            {data.district_id == "" && "Select "}
            District
            <Select fullWidth variant='standard' color="common"
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              defaultValue={data.district_id}
              label="Age"
              onChange={(e => {
                setData({ ...data, district: e?.target?.value }),
                  getDistrict(e?.target?.value)
              })}
            >
              {district?.map(itm => {
                return (
                  <MenuItem value={itm}>{itm?.name}</MenuItem>
                )
              })
              }
            </Select></Typography><br></br>
          <Typography style={{ flexDirection: 'row', color: '#ed6c02' }} variant="subtitle1" gutterBottom>
            {data.talaq_id == "" && "Select "}Taluk
            <Select fullWidth variant='standard' color="common"
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              defaultValue={data.talaq_id}
              label="Age"
              onChange={(e => {
                setData({ ...data, talaq: e?.target?.value })
              })}
            >
              {taluk?.map(itm => {
                return (
                  <MenuItem value={itm}>{itm?.name}</MenuItem>
                )
              })
              }
            </Select></Typography><br/>
        <Typography style={{textAlign:'center'}}>Date Range</Typography><br/>
   
             <TextField type="date"
                   defaultValue={dayjs( moment(data?.startDate)?.format('YYYY-MM-DD'))}
                    style={{ margin:2 }}
                    value={data.startDate}
                    fullWidth
                    onChange={(e) => {
                      setData({ ...data, startDate: e?.target?.value })
                    }} /> <br/>
                  <TextField type="date"
                defaultValue={data?.endDate?dayjs( moment(data?.endDate)?.format('YYYY-MM-DD')):dayjs( moment(data?.endDate)?.format('YYYY-MM-DD'))}
                    style={{ margin:2}}
                    value={data.endDate}
                    fullWidth
                    onChange={(e) => {
                      setData({ ...data, endDate: e?.target?.value })
                    }} /> <br/>
        </CardContent>
       {(userid!=2)? <CardContent>
        <FormControl fullWidth>
        <Typography style={{ flexDirection: 'row', color: '#ed6c02' }} variant="subtitle1" gutterBottom>
            {data.funder_id == "" && "Select "}Funder
<Select fullWidth variant='standard' color="common"
    labelId="demo-simple-select-label"
    id="demo-simple-select"
    defaultValue={data.funder_id}
    required
    label="Select Funder"
    onChange={(e => {
        setData({ ...data, funder: e?.target?.value })
       
    })}
>
    {fund?.map(itm => {
        return (
            <MenuItem value={itm}>{itm?.name}</MenuItem>
        )
    })
    }
</Select>
</Typography>
</FormControl>
<Stack mt={3}>
                <FormControl fullWidth>
               
        <Typography style={{ flexDirection: 'row', color: '#ed6c02' }} variant="subtitle1" gutterBottom>
            {data.opsManager == "" && "Select "}Operation Manager
<Select fullWidth variant='standard' color="common"
        
                    defaultValue={data.opsManager}
                
                    value={data.opsManager}
                    label="Select Operation Manager"
                    onChange={(e => {
                      setData({ ...data, opsManager: e?.target?.value });
                      sessionStorage.setItem("opsManager", e?.target?.value)
                    })}
                  >
                    <MenuItem value="" default disabled>Choose Operation Manager</MenuItem>
                    {teamData?.list?.map(itm => {
                      return (
                        <MenuItem value={itm}>{itm?.first_name}</MenuItem>
                      )
                    })
                    }
                  </Select></Typography>
                </FormControl ></Stack >
                <Stack mt={3}>
                <FormControl fullWidth>
                 
        <Typography style={{ flexDirection: 'row', color: '#ed6c02' }} variant="subtitle1" gutterBottom>
            {data.trainerId == "" && "Select "}Trainers
<Select fullWidth variant='standard' color="common"
                
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    defaultValue={data.trainerId}
                
                    value={data.trainerId}
                    label="Select Operation Manager"
                    onChange={(e => {
                      setData({ ...data, trainer: e?.target?.value });
                      sessionStorage.setItem("trainerdata", e?.target?.value)
                    })}
                  >
                    <MenuItem value="" default disabled>Choose Trainer</MenuItem>
                    {listData?.list?.map(itm => {
                      return (
                        <MenuItem value={itm}>{itm?.first_name}</MenuItem>
                      )
                    })
                    }
                  </Select></Typography>
                </FormControl ></Stack >
                <Stack mt={3}>
                <FormControl fullWidth>
                 
        <Typography style={{ flexDirection: 'row', color: '#ed6c02' }} variant="subtitle1" gutterBottom>
            {data.funder_id == "" && "Select "}Field Associate
<Select fullWidth variant='standard' color="common"
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    defaultValue={data.gelathiId}
                
                    value={data.gelathiId}
                    label="Select Field Associate"
                    onChange={(e => {
                      setData({ ...data, gelathi: e?.target?.value });
                      sessionStorage.setItem("gelathidata", e?.target?.value)
                    })}
                  >
                    <MenuItem value="" default disabled>Choose Gelathi Faciliatator</MenuItem>
                    {gelathiData?.list?.map(itm => {
                      return (
                        <MenuItem value={itm}>{itm?.first_name}</MenuItem>
                      )
                    })
                    }
                  </Select></Typography>
                </FormControl ></Stack >
             
        </CardContent>:null}
        <Button style={{ float: "right", color: 'white', marginRight: '160px', marginBottom: '10px', backgroundColor: '#ed6c02', }}
          onClick={() => props?.onDatasubmit(data)}>Submit</Button>
      </Card>
    </div>
  );
}