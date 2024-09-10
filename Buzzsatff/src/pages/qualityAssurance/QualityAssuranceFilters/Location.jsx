import { useState, useEffect } from 'react';
import axios from 'axios';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Iconify from '../../../components/Iconify';
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import Select, { SelectChangeEvent, } from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import { baseURL } from 'src/utils/api';
import { date } from 'yup';
import { useAuth } from 'src/AuthContext';
const bull = (
  <Box component="span" sx={{ display: 'inline-block', mx: '2px', transform: 'scale(0.8)' }}>
    •
  </Box>
);
  
export default function LocationQuality(props) {
  const { apikey } = useAuth();
  const [country, setCountry] = useState([])
  const [states, setStates] = useState([])
  const [district, setDistrict] = useState([])
  const [taluk, setTaluk] = useState([])
  const [data, setData] = useState({
    country: 1,
    state: '',
    
  
  })
  useEffect(() => {
    location()
  }, []
  )
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
      "district_id": JSON.stringify(district?.id),
      
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
        // console.log(error);
      });
  }
  return (
    <div>
      <Card>
        <CardContent>
          <Typography style={{ flexDirection: 'row', color: '#ff7424' }} variant="subtitle1" gutterBottom>
            State
            <Select fullWidth variant='standard' color="common"
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              value={data.state}
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
          <Typography style={{ flexDirection: 'row', color: '#ff7424' }} variant="subtitle1" gutterBottom>District
            <Select fullWidth variant='standard' color="common"
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              value={data.district_id}
              label="Age"
              onChange={(e => {
                setData({ ...data, district: e?.target?.value}),
                  getDistrict(e?.target?.value)
              })}
            >
              {district?.map(itm => {
                return (
                  <MenuItem value={itm} >{itm?.name}</MenuItem>
                )
              })
              }
            </Select></Typography><br></br>
            
          <Typography style={{ flexDirection: 'row', color: '#ff7424' }} variant="subtitle1" gutterBottom>Taluk
            <Select fullWidth variant='standard' color="common"
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              value={data.talaq_id}
              label="Age"
              onChange={(e => {
                setData({ ...data, talaq: e?.target?.value })
              
              })}
            >
              {taluk?.map(itm => {
                return (
                  <MenuItem value={itm?.name}>{itm?.name}</MenuItem>
                )
              })
              }
            </Select></Typography>
        </CardContent>
        <Button style={{ float: "right", color: 'white', marginRight: '160px', marginBottom: '10px', backgroundColor: '#ff7424', }}
          onClick={() => props?.onSumbit(data)}>Submit</Button>
      </Card>
    </div>
  );
}
