import React from 'react';
import { useState, useEffect } from 'react';
import { useTheme } from '@mui/material/styles';
import { Grid, Container, Typography, Stack, Divider, Card, CardContent, Button, Box } from '@mui/material';
import axios from 'axios';
import CircularProgress from '@mui/material/CircularProgress';
import Page from 'src/components/Page';
import Paper from '@mui/material/Paper';
import Chip from '@mui/material/Chip';
import { AppWidgetSummary } from 'src/sections/@dashboard/app';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import { useNavigate } from 'react-router-dom';
import FiltersHome from 'src/pages/Filters/FiltersHome';
import {baseURL} from 'src/utils/api';
import { useAuth } from 'src/AuthContext';

const FunderVyaparDashboard = () => {
      const { apikey } = useAuth();
  const navigate = useNavigate();
 
  const [openFilter, setOpenFilter] = useState(false);
  const [filterData, setFilterData] = useState({});
  const [loader, setLoader] = useState(false);
  const [errorMsg,setErrormsg]=useState(false)
  const [slected, setSelected] = useState(null);
  const [summaryData, setSummaryData] = useState([]);
  const [graphData, setGraphData] = useState(null);
  const apiHit = async (id, i, g) => {
    
    setLoader(true);
    var role = JSON.parse(sessionStorage.getItem('userDetails'))?.role;
    var userid = JSON.parse(sessionStorage.getItem('userDetails'))?.id;
  
   
    const data = {
      "roleid":role,
      "emp_id":userid
  }
    const config = {
      method: 'post',
     url: baseURL +'funderVyaparDashboard',
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
         'Authorization': `${apikey}`
      },
      data,
    };
    axios(config)
      .then((response) => {
        setLoader(false);
      
        setSummaryData(response.data);
     
      })
      .catch((error) => {
        setErrormsg(error);
       
      });
  };
  useEffect(() => {
    apiHit();
  }, []);
  if (loader) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '70vh' }}>
        <CircularProgress sx={{color:'#ff7424'}}/>
      </Box>
    );
  }

  if (summaryData?.length === 0) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '70vh' }}>
        <CircularProgress sx={{color:'#ff7424'}}/>
      </Box>
    );
  }
 
  
  
  return (
    <>
      <Page title="Dashboard">
        <Stack direction="row" alignItems="center" justifyContent="space-between">
          <Typography variant="h5" gutterBottom sx={{ ml: 4 }}>
          Vyapar Program 
          </Typography>
        
        </Stack>
        <Container maxWidth="xl">
        
         
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
              <AppWidgetSummary title="Number of Vyapar Cohorts"
               total={summaryData[0]?.noofvyaparcoharts} 
               color="motivator" />
            </Grid>
            <Grid item xs={4} sm={8} md={4}>
              <AppWidgetSummary
                title="Number of Villages"
                total={summaryData[0]?.villages}
                color="motivator"
              />
            </Grid>
            <Grid item xs={4} sm={8} md={4}>
              <AppWidgetSummary
                title="Number  of Vyapari Enrolled"
                total={summaryData[0]?.vyaparenrolled}
                color="motivator"
              />
            </Grid>
            <Grid item xs={4} sm={8} md={4}>
              <AppWidgetSummary
                title="Number of Vyapar Survey"
                total={summaryData[0]?.nofvyaparsurvey}
                color="motivator"
              />
            </Grid>
            <Grid item xs={4} sm={8} md={4}>
              <AppWidgetSummary
                title="Number of Vyapar Modules Completed"
                total={summaryData[0]?.noofvyaparmodulecompleted}
                color="motivator"
              />
            </Grid>
           
          </Grid>
          
     
        </Container>
      </Page>
    </>
  );
};
export default FunderVyaparDashboard