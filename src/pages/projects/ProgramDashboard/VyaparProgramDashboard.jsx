import React from 'react';
import { useState, useEffect } from 'react';
import { useTheme } from '@mui/material/styles';
import { Grid, Container, Typography, Stack, Divider, Card, CardContent, Button, Box } from '@mui/material';
import axios from 'axios';
import CircularProgress from '@mui/material/CircularProgress';
import Page from 'src/components/Page';
import Paper from '@mui/material/Paper';
import Chip from '@mui/material/Chip';
import moment from 'moment'; 
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
const VyaparProgramDashboard = () => {
  const navigate = useNavigate();
  const { apikey } = useAuth();
  const data = sessionStorage?.getItem('userId');
  var roleid = JSON.parse(sessionStorage.getItem('userDetails'))?.role;
  const theme = useTheme();
  const intialValues = {
    funder: '',
    patner: '',
    project: '',
    fromDate: '',
    toDate: '',
  };
  const [openFilter, setOpenFilter] = useState(false);
  const [filterData, setFilterData] = useState({});
  const [loader, setLoader] = useState(false);
  const [errorMsg,setErrormsg]=useState(false)
  const [slected, setSelected] = useState(null);
  const [summaryData, setSummaryData] = useState([]);
  const [graphData, setGraphData] = useState(null);
  var startdate = moment(new Date()).format('YYYY-04-01')
  var endDate = moment(startdate, 'YYYY').add(1, 'year').format('YYYY-03-31')
  const apiHit = async (id, i, g,date1,date2) => {
    setLoader(true);
    var role = JSON.parse(sessionStorage.getItem('userDetails'))?.role;
    var userid = JSON.parse(sessionStorage.getItem('userDetails'))?.id;
    const data = {
      "partner_id":i === 1 ? id?.id : '',
      "start_date": (g === "date")? id:(g==="Calendar"|| g=== "countryCalendar")?moment(date1?.$d)?.format('YYYY-MM-DD'):(id===undefined)? startdate:"",
      "end_date": (g === "date")? i:(g==="Calendar"|| g=== "countryCalendar")?moment(date2?.$d)?.format('YYYY-MM-DD'):(i ===undefined)?endDate:"",
      "funder_id":i === 2 ? id?.id : '',
      "dist":(g === "country" || g==="countryCalendar") ? id : '',
      "taluk":(g === "country" || g==="countryCalendar") ? i : '',
      "project_id":i === 3 ? id?.id : '',
      "trainer_id":i === 5 ? id?.id : '',
      "gfid":i===6?id?.id:'',
      "opsmanager": i === 4 ? id?.id : '',
      "somid":i === 12 ? id?.id : '',
      "gflid": i === 13 ? id?.id : '',
      "roleid":role,
      "emp_id":userid
  }
  
    const config = {
      method: 'post',
      url: baseURL +'vyaparDashboard',
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
        // console.log(error,"errorrrrrrrrrrrr");
      });
  };

  const filterApi = async(id,i,g,date1,date2)=>{
    setLoader(true)
    var roleid = JSON.parse(sessionStorage.getItem('userDetails'))?.role
    var userid = JSON.parse(sessionStorage.getItem('userDetails'))?.id
    var data = JSON.stringify({
      "end_date":(g === "date")?i:(g=== "countryCalendar" || g==="Calendar")?moment(date2?.$d)?.format('YYYY-MM-DD'): '',
      "role_id": parseInt(roleid),
      "taluk_id":(g === "country" || g==="countryCalendar") ? i : "",
      "gfid": (i==6)?id?.id:'',
      "emp_id": parseInt(userid),
      "start_date":(g === "date")?id:(g=== "countryCalendar" || g==="Calendar")?moment(date1?.$d)?.format('YYYY-MM-DD'): '',
    });
    
    var config = {
      method: 'post',
      url: baseURL + 'vyaparfilter',
      headers: { 
        'Content-Type': 'application/json',
         'Authorization': `${apikey}`
      },
      data : data
    };
  
    axios(config)
    .then(function (response) {
      setSummaryData(response.data)
      setLoader(false)
    })
    .catch(function (error) {
      // console.log(error);
    });
    
  }
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
  const handleOpenFilter = () => {
    setOpenFilter(true);
  };
  const handleCloseFilter = () => {
    setOpenFilter(false);
  };
  const onDateSubmit = (e) => {
    setSelected({ type: 'Date Range', name: `${e?.startDate} to ${e?.endDate}` });
    filterApi(e?.startDate, e?.endDate, 'date');
    setFilterData({ from_date: e?.startDate, to_date: e?.endDate });
    handleCloseFilter();
  };
  const handleDelete = () => {
    setSelected(null);
    apiHit();
  };
  if (summaryData?.length === 0) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '70vh' }}>
        <CircularProgress sx={{color:'#ff7424'}}/>
      </Box>
    );
  }
  const getData = (itm, i,date1,date2,dateValue,endDateValue,g) => {
    setSelected(itm);
    const data = i === 2 ? { "funder_id": itm?.id } : i === 1 ? { "partner_id": itm?.id } : 
    i===3?{ "project_id": itm?.id }:i==4?{"opsManager":itm?.id}:i===12?{"somId":itm?.id} :i===5?{"trainerId":itm?.id}:i===6?{"gfid":itm?.id}:{"gflId":itm?.id}
    
    if(i==6){
      if(dateValue || endDateValue)
         {
           filterApi(itm, i,"Calendar",date1,date2)
         }
         else{
           filterApi(itm,i)
         }
     }
     else{
       if((dateValue || endDateValue)){
         apiHit(itm,i,"Calendar",date1,date2)
       }
       else{
         apiHit(itm,i)
       }
     }
    setFilterData(data);
    handleCloseFilter();
  };
  const onSumbit = (e, i) => {
    handleCloseFilter();
    setSelected({ type: 'Location', name: ` ${e?.stateName} - ${e?.districtName} - ${e?.talukName}` });
    if(e?.dateValue || e?.endDateValue)
    {
      filterApi(e?.district_id, e?.talaq_id, "countryCalendar",e?.start_date,e?.end_date,)
    }
    else{
      filterApi(e?.district_id,e?.talaq_id,"country")
    }
  };
 
  return (
    <>
      <Page title="Dashboard">
        <Stack direction="row" alignItems="center" justifyContent="space-between">
          <Typography variant="h5" gutterBottom sx={{ ml: 4 }}>
          Vyapar Program Summary
          </Typography>
          <Button
            style={{ float: 'right', color: '#ff7424' }}
            sx={{ '&:hover': { backgroundColor: '#ffd796' } }}
            onClick={() => {
              handleOpenFilter();
            }}
          >
            Filter
          </Button>
        </Stack>
        <Container maxWidth="xl">
        <Grid item spacing={10}>
          {
            slected && (slected.type =='Date Range')&& <Chip label={`${slected?.type} : ${slected?.name} `} onDelete={() => { handleDelete(slected) }} /> || slected &&<Chip label={`${slected?.type} : ${slected?.name} `} onDelete={() => { handleDelete(slected) }} />
          }
        </Grid>
          <Stack direction="row" spacing={1} flexShrink={0} sx={{ my: 1 }}>
            <FiltersHome
              type="GreenDashboard"
              onDateSubmit={onDateSubmit}
              onSumbit={onSumbit}
              getData={getData}
              isOpenFilter={openFilter}
              onOpenFilter={handleOpenFilter}
              onCloseFilter={handleCloseFilter}
            />
          </Stack>
         {
 (roleid == 1 || roleid == 9 || roleid == 3 || roleid == 4 || roleid == 12)?
           
         <Grid container spacing={3} marginTop={4}>
            <Grid item xs={4} sm={8} md={4}>
              <AppWidgetSummary
                title="Target"
                total={(summaryData?.summary_target>=0)?summaryData?.summary_target:null}
                color="motivator"
              />
            </Grid>
            <Grid item xs={4} sm={8} md={4}>
              <AppWidgetSummary
                title="Actual"
                total={(summaryData?.summary_actual>=0)?summaryData?.summary_actual:null}
                color="motivator"
              />
            </Grid>
           
            <Grid item xs={4} sm={8} md={4}>
              <AppWidgetSummary
                title="Number of Villages"
                total={(summaryData?.summary_villages>=0)?summaryData?.summary_villages:summaryData?.summary_villages}
                color="motivator"
              />
            </Grid>
            <Grid item xs={6} sm={8} md={6}>
              <AppWidgetSummary title="Number of Vyapar Cohorts"
               total={(summaryData?.summary_noofvyaparcoharts>=0)?summaryData?.summary_noofvyaparcoharts:summaryData?.summary_nofvyaparcoharts} 
               color="motivator" />
            </Grid>
            <Grid item xs={6} sm={8} md={6}>
              <AppWidgetSummary
                title="Number  of Vyapar Enrolled"
                total={(summaryData?.summary_vyaparenrolled>=0)?summaryData?.summary_vyaparenrolled:summaryData?.summary_vyaparenroll}
                color="motivator"
              />
            </Grid>
            <Grid item xs={6} sm={8} md={6}>
              <AppWidgetSummary
                title="Number of Vyapar Survey"
                total={(summaryData?.summary_noofVyaparsurvey>=0)?summaryData?.summary_noofVyaparsurvey:summaryData?.summary_novyaparsurvey}
                color="motivator"
              />
            </Grid>
            <Grid item xs={6} sm={8} md={6}>
              <AppWidgetSummary
                title="Number of Vyapar Modules Completed"
                total={(summaryData?.summary_noofvyaparmodulecomoleted>=0)?summaryData?.summary_noofvyaparmodulecomoleted:summaryData?.summary_vyaparmodule}
                color="motivator"
              />
            </Grid>
         
          </Grid>
          
          :
          
           (roleid == 5 || roleid == 6 ||roleid == 13)?
          <>
          <Grid container spacing={3} marginTop={4}>
            <Grid item xs={4} sm={8} md={4}>
              <AppWidgetSummary 
               title="Actual"
               total={summaryData?.summary_actual} 
               color="motivator" />
            </Grid>
            <Grid item xs={4} sm={8} md={4}>
              <AppWidgetSummary title="Target"
               total={(summaryData?.summary_Target>=0)?summaryData?.summary_Target:summaryData?.summary_target} 
               color="motivator" />
            </Grid>
            <Grid item xs={4} sm={8} md={4}>
              <AppWidgetSummary
                title="Number of Villages "
                total={summaryData?.summary_villages}
                color="motivator"
              />
            </Grid>
            <Grid item xs={4} sm={8} md={4}>
              <AppWidgetSummary
                title="Number of Vyapar Enrolled"
                total={(summaryData?.summary_vyaparenrolled>=0)?summaryData?.summary_vyaparenrolled:summaryData?.summary_vyaparenroll}
                color="motivator"

              />
            </Grid>
            <Grid item xs={4} sm={8} md={4}>
              <AppWidgetSummary
                title="Number of Vyapar Cohorts"
                total={(summaryData?.summary_noofvyaparcoharts>=0)?summaryData?.summary_noofvyaparcoharts:summaryData?.summary_nofvyaparcoharts}
                color="motivator"
              />
            </Grid>
            <Grid item xs={4} sm={8} md={4}>
              <AppWidgetSummary
                title="Number of Vyapar Survey"
                total={(summaryData?.summary_noofVyaparsurvey>=0)?summaryData?.summary_noofVyaparsurvey:summaryData?.summary_novyaparsurvey}
                color="motivator"
              />
            </Grid>
            {/* <Grid item xs={4} sm={8} md={4}>
              <AppWidgetSummary
                title="Number of Vyapar Enrolled"
                total={(summaryData?.summary_vyparenrolled>=0)?summaryData?.summary_vyparenrolled:summaryData?.summary_vyaparenroll}
                color="motivator"
              />
            </Grid> */}
            <Grid item xs={4} sm={8} md={4}>
              <AppWidgetSummary
                title="Number of Module Completed "
                total={(summaryData?.summary_noofvyaparmodulecomoleted>=0)?summaryData?.summary_noofvyaparmodulecomoleted:summaryData?.summary_vyaparmodule}
                color="motivator"
              />
            </Grid>
          </Grid>
          </>:
          <>
          </>
}
        {/* founder */}
{
  (roleid == 1 || roleid == 9 || roleid == 3 || roleid == 4 || roleid == 12)?
       
  <CardContent>
            <Typography variant="h4" gutterBottom style={{ marginLeft: "20px" }}>
            {
  (summaryData && summaryData.data && summaryData.data[0]?.startDate === "")
    ? "Funders List"
    : "Projects List"
}

            </Typography>
          
            {(summaryData?.data?.length>0) ?<CardContent maxWidth="md" style={{ display: 'flex', justifyContent: 'center', overflow: 'hidden' }}>
            <Grid item xs={12} sm={12} md={12} marginTop={3}>
          {summaryData?.data?.map((itm) => {
            return (
              <Card
                style={{
                  backgroundColor: '#f5f5f5',
                  flexDirection: 'column',
                  borderRadius: 12,
                  border: '2px solid',
                  borderColor: '#ffcc80',
                  marginBottom: '40px',
                }}
                
                >
                <CardContent>
<Container style={{ display: 'flex', flexDirection: 'column' }}>
  <Grid item xs={12} style={{ display: 'flex', flexDirection: 'row' }}>
    <span style={{ fontWeight: 700, fontSize: 15, flex: '1' }}>
    {(itm?.select_type=='1')?"Project Name":"Funder Name"}<br />
     
    </span>
    <span style={{ fontWeight: 700, fontSize: 15, flex: '2'}}>
      &nbsp;:&nbsp;{itm?.name}<br />
    </span>
    
    
    </Grid>
    <Grid item xs={12} style={{ display: 'flex', flexDirection: 'row' }}>
    <span style={{ fontWeight: 700, fontSize: 15, flex: '1' }}>
    Actual / Target  <br />
     
    </span>
    <span style={{ fontWeight: 700, fontSize: 15, flex: '2' }}>
     
      &nbsp;:&nbsp;{itm?.actual} / {itm?.target}
    </span>
  </Grid>
  {(itm?.select_type=='1')?<Grid item xs={12} style={{ display: 'flex', flexDirection: 'row' }}>
    <span style={{ fontWeight: 700, fontSize: 15, flex: '1' }}>
    Start Date<br />
     
    </span>
    <span style={{ fontWeight: 700, fontSize: 15, flex: '2' }}>
     
      &nbsp;:&nbsp;{itm?.start_date}
    </span>
  </Grid>:null}
  {(itm?.select_type=='1')?<Grid item xs={12} style={{ display: 'flex', flexDirection: 'row' }}>
    <span style={{ fontWeight: 700, fontSize: 15, flex: '1' }}>
    End Date<br />
     
    </span>
    <span style={{ fontWeight: 700, fontSize: 15, flex: '2' }}>
     
      &nbsp;:&nbsp;{itm?.end_date}
    </span>
  </Grid>:null}
 
</Container>
                  <Divider mt={1} />
                  <Grid container spacing={3} marginTop={4}>
          
<Grid item xs={6} sm={6} md={6}>
              <AppWidgetSummary
                title="Number of Villages"
                total={itm?.villages}
                color="villages"
                icon= "fontisto:holiday-village"
              />
            </Grid>
  <Grid item xs={6} sm={6} md={6}>
              <AppWidgetSummary
                title="Number of vyapar Coharts"
                total={(itm?.NoOfvyaparcoharts>=0)?itm?.NoOfvyaparcoharts:itm?.noofvyaparcoharts}
                color="motivator"
                icon="twemoji:women-holding-hands"
              />
            </Grid>
  <Grid item xs={6} sm={6} md={6}>
<AppWidgetSummary
  title="Number of Vyapar Survey "
  total={(itm?.noOfvyaparsurvey>=0)?itm?.noOfvyaparsurvey:itm?.noofvyaparsurvey}
  color="vyapar"
  icon="eos-icons:product-subscriptions-outlined"
/>
</Grid>
  <Grid item xs={6} sm={6} md={6}>
              <AppWidgetSummary
                title="Number of Module Completed"
                total={(itm?.noofvyaparmodulecompleted>=0)?itm?.noofvyaparmodulecompleted:itm?.noofvyaparmodule}
                color="vyapar"
                icon="eos-icons:product-subscriptions-outlined"
              />
            </Grid>
  <Grid item xs={6} sm={6} md={6}>
              <AppWidgetSummary
                title="Number of Vyapar Enrolled "
                total={(itm?.vyaparenrolled>=0)?itm?.vyaparenrolled:itm?.vyaparenroll}
                color="info"
                icon = "twemoji:women-holding-hands"
              />
            </Grid>
          
          </Grid>
                </CardContent>
              </Card>
            );
          })}
        </Grid>
</CardContent>:<h4 style={{textAlign:"center"}}>No Data</h4>}
</CardContent>
:         
          
(roleid == 5 ||roleid == 6 ||roleid == 13)?
<>
<CardContent>
            <Typography variant="h4" gutterBottom style={{ marginLeft: "20px" }}>
            {
  (summaryData && summaryData.data && summaryData.data[0]?.startDate === "")
    ? "Funders List"
    : "Projects List"
}

            </Typography>
          
            {(summaryData?.data?.length>0) ?
             <CardContent maxWidth="md" style={{ display: 'flex', justifyContent: 'center', overflow: 'hidden' }}>
            <Grid item xs={12} sm={12} md={12} marginTop={3}>
          {summaryData?.data?.map((itm) => {
            return (
              <Card
                style={{
                  backgroundColor: '#f5f5f5',
                  flexDirection: 'column',
                  borderRadius: 12,
                  border: '2px solid',
                  borderColor: '#ffcc80',
                  marginBottom: '40px',
                }}
                
                >
                <CardContent>
              
                <Container style={{ display: 'flex', flexDirection: 'column' }}>
  <Grid item xs={12} style={{ display: 'flex', flexDirection: 'row' }}>
    <span style={{ fontWeight: 700, fontSize: 15, flex: '1' }}>
    {(itm?.select_type=='1')?"Project Name":"Funder Name"}<br />
    </span>
    <span style={{ fontWeight: 700, fontSize: 15, flex: '2'}}>
      &nbsp;:&nbsp;{itm?.name}<br />
      {/* &nbsp;:&nbsp;{itm?.actual} / {itm?.target} */}
    </span>
    </Grid>
    <Grid item xs={12} style={{ display: 'flex', flexDirection: 'row' }}>
    <span style={{ fontWeight: 700, fontSize: 15, flex: '1' }}>
    Actual / Target  <br />
     
    </span>
    <span style={{ fontWeight: 700, fontSize: 15, flex: '2' }}>
     
      &nbsp;:&nbsp;{itm?.actual} / {itm?.target}
    </span>
  </Grid>
  {(itm?.select_type=='1')? <Grid item xs={12} style={{ display: 'flex', flexDirection: 'row' }}>
    <span style={{ fontWeight: 700, fontSize: 15, flex: '1' }}>
    Start Date  <br />
     
    </span>
    <span style={{ fontWeight: 700, fontSize: 15, flex: '2' }}>
     
      &nbsp;:&nbsp;{(itm?.startDate)?itm?.startDate:itm?.start_date} 
    </span>
  </Grid>:null}
  {(itm?.select_type=='1')?<Grid item xs={12} style={{ display: 'flex', flexDirection: 'row' }}>
    <span style={{ fontWeight: 700, fontSize: 15, flex: '1' }}>
    End Date  <br />
     
    </span>
    <span style={{ fontWeight: 700, fontSize: 15, flex: '2' }}>
     
      &nbsp;:&nbsp;{(itm?.endDate)?itm?.endDate:itm?.end_date} 
    </span>
  </Grid>:null}
</Container>
                  <Divider mt={1} />
                  <Grid container spacing={3} marginTop={4}>
          
<Grid item xs={6} sm={6} md={6}>
              <AppWidgetSummary
                title="Number  of Villages"
                total={itm?.villages}
                color="villages"
                icon= "fontisto:holiday-village"
              />
            </Grid>
  <Grid item xs={6} sm={6} md={6}>
              <AppWidgetSummary
                title="Number of Vyapar Cohorts"
                total={(itm?.NoOfvyaparcoharts>=0)?itm?.NoOfvyaparcoharts:itm?.noofvyaparcoharts}
                
                color="motivator"
                icon="twemoji:women-holding-hands"
              />
            </Grid>
  <Grid item xs={6} sm={6} md={6}>
<AppWidgetSummary
  title="Number of Vyapar Survey"
  total={(itm?.noOfvyaparsurvey>=0)?itm?.noOfvyaparsurvey:itm?.noofvyaparsurvey}
  color="vyapar"
  icon="eos-icons:product-subscriptions-outlined"
/>
</Grid>
  <Grid item xs={6} sm={6} md={6}>
<AppWidgetSummary
  title="Number of Vyapar Module Completed "
  total={(itm?.noofvyaparmodulecompleted>=0)?itm?.noofvyaparmodulecompleted:itm?.noofvyaparmodule}
  color="vyapar"
  icon="eos-icons:product-subscriptions-outlined"
/>
</Grid>
           
          
<Grid item xs={12} sm={6} md={6}>
<AppWidgetSummary
  title="Number of Vypar Enrolled"
  total={(itm?.vyaparenrolled>=0)?itm?.vyaparenrolled:itm?.vyaparenroll}
  color="info"
  icon = "twemoji:women-holding-hands"
/>
</Grid>
            
          
          </Grid>
                </CardContent>
              </Card>
            );
          })}
        </Grid>
</CardContent>:<h4 style={{textAlign:"center"}}>No Data</h4>}
</CardContent>
</>:      
<>
</>
}
{/* founder end  */}
        </Container>
      </Page>
    </>
  );
};
export default VyaparProgramDashboard