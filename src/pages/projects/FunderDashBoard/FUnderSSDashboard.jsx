
import React from 'react'
import { useState, useEffect } from 'react';
import { useTheme } from '@mui/material/styles';
import { Grid, Container, Typography, Stack, Divider, Card, CardContent, Button, Box } from '@mui/material';
import axios from 'axios';
import CircularProgress from '@mui/material/CircularProgress';
// import Iconify from '../components/Iconify';
// import Page from '../components/Page';
import Page from 'src/components/Page';
import Paper from '@mui/material/Paper';
import Chip from '@mui/material/Chip';
import { AppWidgetSummary } from 'src/sections/@dashboard/app';
// import DashboardFilter from './Components/DashboardFilters/DashboardFilter';
// import { ProductSort, ProductList, ProductCartWidget, ProductFilterSidebar } from '../sections/@dashboard/products';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import { useNavigate } from 'react-router-dom';
// import CardHeader from '@mui/material/CardHeader';
// import { max } from 'lodash';
// import FiltersHome from './Filters/FiltersHome';
import FiltersHome from 'src/pages/Filters/FiltersHome';
//  import GalathiChart from './Components/Charts/GalathiChart';
 import GalathiChart from 'src/pages/Components/Charts/GalathiChart';
import {baseURL} from 'src/utils/api';
import { useAuth } from 'src/AuthContext';
import moment from 'moment';
const FUnderSSDashboard = () => {
    const { apikey } = useAuth();
  const navigate = useNavigate();
 
  const [openFilter, setOpenFilter] = useState(false);
  const [filterData, setFilterData] = useState({})
  const [loader, setLoader] = useState(false)
const [errorMsg,setErrormsg]=useState(false)
  const [slected, setSelected] = useState(null)
  const [summaryData, setSummaryData] = useState([]);

  const [graphData, setGraphData] = useState(null);
  const itemStyles = [{ itemXs: 4, itemSm: 8, itemMd: 4 }, { itemXs: 6, itemSm: 8, itemMd: 6 }]
  
  var roleid = JSON.parse(sessionStorage.getItem('userDetails'))?.role
  var userid = JSON.parse(sessionStorage.getItem('userDetails'))?.id
  const apiHit = async (id, i, g) => {
    setLoader(true)
    var roleid = JSON.parse(sessionStorage.getItem('userDetails'))?.role
    var userid = JSON.parse(sessionStorage.getItem('userDetails'))?.id
    const data  ={
 
    "roleid":roleid,
    "emp_id":userid
  }
  
    const config = {
      method: 'post',
     url :baseURL +"funderSSDashboard",
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
         'Authorization': `${apikey}`
      },
      data,
    };
    axios(config)
      .then((response) => { 
        setLoader(false)
setSummaryData(response.data);
      })
      .catch((error) => {
       
        // console.log(error);
      });
  };

  useEffect(() => {
    apiHit();
  }, []);
  
  if (loader) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: "center", height: '70vh' }}>
        <CircularProgress sx={{color:'#ff7424'}}/>
      </Box>
    )
  }
 
  const handleOpenFilter = () => {
    setOpenFilter(true);
  };
  const handleCloseFilter = () => {
    setOpenFilter(false);
  };
  
  if (summaryData?.length === 0 ) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: "center", height: '70vh' }}>
        <CircularProgress sx={{color:'#ff7424'}}/>
      </Box>
    )
  }
  const summarySubDataView = [
    { ...itemStyles[0], title: "Villages", total: 'villages', color: "villages", icon: 'fontisto:holiday-village' },
    { ...itemStyles[0], title: "Women", total: 'women', color: "info", icon: 'twemoji:women-holding-hands' },
    { ...itemStyles[0], title: "2nd Day TurnOut(%)", total: 'day2', ext: ' % ', color: "warning", icon: 'twemoji:women-holding-hands' },
    { ...itemStyles[0], title: "Gelathis", total: 'enrolled', color: "gelathis", icon: 'fluent:people-team-16-regular' },
    { ...itemStyles[0], title: "Green Motivator", total: 'greenMotivators', color: "motivator", icon: 'openmoji:leafy-green' },
    { ...itemStyles[0], title: "Vyapar", total: 'vyapar', color: "vyapar", icon: 'eos-icons:product-subscriptions-outlined' },
  ]
const userId = JSON.parse(sessionStorage.getItem('userDetails'))?.role
  return (
    <>
      <Page title="Dashboard">
      <Stack direction="row" alignItems="center" justifyContent="space-between" >
          <Typography variant="h5" gutterBottom sx={{ml:4}}>
          Self Sakthi Program 
          </Typography>
         
        </Stack>
        <Container maxWidth="xl">
        <Grid item spacing={10}>
</Grid>
         
        <Grid container spacing={3} marginTop={4}>
            <Grid item xs={4} sm={8} md={4}>
              <AppWidgetSummary
                title="Target"
                total={summaryData[0]?.target}
                color="motivator"
              />
            </Grid>
            <Grid item xs={4} sm={8} md={4}>
              <AppWidgetSummary
                title="Actual"
                total={summaryData[0]?.actual}
                color="motivator"
              />
            </Grid>
            <Grid item xs={4} sm={8} md={4}>
              <AppWidgetSummary
                title="Number  of Vilages"
                total={summaryData[0]?.villages}
                color="motivator"
              />
            </Grid>
            <Grid item xs={4} sm={8} md={4}>
              <AppWidgetSummary
                title="Number of Batches"
                total={summaryData[0]?.noofbatches}
                color="motivator"
              />
            </Grid>
            <Grid item xs={4} sm={8} md={4}>
              <AppWidgetSummary
                title="Number of Self Sakthi Survey"
                total={summaryData[0]?.noofselfshakthisurvey}
                color="motivator"
              />
            </Grid>
            <Grid item xs={4} sm={8} md={4}>
              <AppWidgetSummary
                title="2nd Day Turnout  %"
                total={summaryData[0]?.day2}
                color="motivator"
              />
            </Grid>
          
          </Grid>
     
        
        </Container>
      </Page>
    </>
  )
}
export default FUnderSSDashboard