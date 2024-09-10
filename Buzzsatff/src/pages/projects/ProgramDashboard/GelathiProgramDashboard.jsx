import React from 'react'
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
import GalathiChart from 'src/pages/Components/Charts/GalathiChart';
import {baseURL} from 'src/utils/api';
import { useAuth } from 'src/AuthContext';
import { isThisMinute } from 'date-fns';
const GelathiProgramDashboard = () => {
    const navigate = useNavigate();
    const { apikey } = useAuth();
    const data = sessionStorage?.getItem('userId')
    const theme = useTheme();
    const intialValues = {
      funder: "",
      patner: "",
      project: "",
      fromDate: '',
      toDate: ""
    }
    const [openFilter, setOpenFilter] = useState(false);
   const [filterData, setFilterData] = useState({})
    const [loader, setLoader] = useState(false)
    const [errorMsg,setErrormsg]=useState(false)
    const [slected, setSelected] = useState(null)
   const [summaryData, setSummaryData] = useState([]);
    const [graphData, setGraphData] = useState(null);
   
    var roleid = JSON.parse(sessionStorage.getItem('userDetails'))?.role
    var userid = JSON.parse(sessionStorage.getItem('userDetails'))?.id
    var startdate = moment(new Date()).format('YYYY-04-01')
    var endDate = moment(startdate, 'YYYY').add(1, 'year').format('YYYY-03-31')
    const apiHit = async (id, i, g,date1,date2) => {
      setLoader(true)
      var role = JSON.parse(sessionStorage.getItem('userDetails'))?.role
      var userid = JSON.parse(sessionStorage.getItem('userDetails'))?.id
      const data = {
        "partner_id": i === 1 ? id?.id : '',
        "start_date": (g === "date")? id:(g==="Calendar" || g=== "countryCalendar")?moment(date1?.$d)?.format('YYYY-MM-DD'):(id===undefined)? startdate:"",
        "end_date": (g === "date")? i:(g==="Calendar" || g==="countryCalendar")?moment(date2?.$d)?.format('YYYY-MM-DD'):(i ===undefined)?endDate:"",
        "funder_id": i === 2 ? id?.id : '',
        "dist":(g === "country" || g==="countryCalendar") ? id : "",
        "taluk":(g === "country" || g==="countryCalendar") ? i : "",
        "project_id":i === 3 ? id?.id : '',
        "trainer_id":i === 5 ? id?.id : '',
        // "gfid":i===6?id?.id:'',
        "opsmanager":i === 4 ? id?.id : '',
        "somid":i === 12 ? id?.id : '',
        "gflid":i === 13 ? id?.id : '',
       "roleid":role,
        "emp_id":userid
    }
    
      const config = {
        method: 'post',
        url: baseURL + 'gelathiProgramDashboard',
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
          'Authorization':`${apikey}`
        },
        data,
      };
  
      axios(config)
        .then((response) => { 
          setLoader(false)
  setSummaryData(response.data);
        })
        .catch((error) => {
              //console.log(error)
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
        url: baseURL + 'gelathifilter',
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
  
    const onDateSubmit = (e) => {
      setSelected({ type: 'Date Range', name: `${e?.startDate} to ${e?.endDate}` })
      filterApi(e?.startDate, e?.endDate, "date")
      setFilterData({ from_date: e?.startDate, to_date: e?.endDate })
      handleCloseFilter()
    }
  
    const handleDelete = () => {
      setSelected(null)
      apiHit();
    }
  
  
    if (summaryData?.length === 0 ) {
      return (
        <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: "center", height: '70vh' }}>
          <CircularProgress sx={{color:'#ff7424'}}/>
        </Box>
      )
    }
  
    const getData = (itm, i,date1,date2,dateValue,endDateValue,g) => {
      setSelected(itm)
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
      setFilterData(data)
      handleCloseFilter()
    }
    const onSumbit = (e, i) => {
      handleCloseFilter()
      setSelected({ type: 'Location', name: ` ${e?.stateName} - ${e?.districtName} - ${e?.talukName}` })
    if(e?.dateValue || e?.endDateValue)
    {
      filterApi(e?.district_id, e?.talaq_id, "countryCalendar",e?.start_date,e?.end_date,)
    }
    else{
      filterApi(e?.district_id,e?.talaq_id,"country")
    }
    }
    return (
      <>
  
        <Page title="Dashboard">
        <Stack direction="row" alignItems="center" justifyContent="space-between" >
            <Typography variant="h5" gutterBottom sx={{ml:4}}>
            Gelathi Program Summary
  
            </Typography>
            <Button style={{ float: "right", color: '#ff7424' }} sx={{ '&:hover': { backgroundColor: '#ffd796', }, }} onClick={() => { handleOpenFilter() }}>
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
           (roleid == 1 || roleid == 9 || roleid == 3 || roleid == 4 || roleid == 12 )?
          <Grid container spacing={3} marginTop={4}>
            <Grid item xs={4} sm={8} md={4}>
  
      <AppWidgetSummary
    title="Target"
    total={(summaryData?.summary_Target)?summaryData?.summary_Target:summaryData?.summary_target}
    color="motivator"
  />
            </Grid>
            <Grid item xs={4} sm={8} md={4}>
  
  <AppWidgetSummary
    title="Actual"
    total={summaryData?.summary_actual}
    color="motivator"
  />
           </Grid>
              <Grid item xs={4} sm={8} md={4}>
  
                <AppWidgetSummary
                  title="Number of Villages"
                  total={(summaryData?.summary_villages)?summaryData?.summary_villages:0}
                  color="motivator"
  
                />
              </Grid>
              <Grid item xs={4} sm={8} md={4}>
  
                <AppWidgetSummary
                  title="Number of Gelathi Enrolled"
                  total={(summaryData?.summary_Gelathienrolled>=0)?summaryData?.summary_Gelathienrolled:summaryData?.summary_spoorthienroll}
                  color="motivator"
  
                />
              </Grid>
              <Grid item xs={4} sm={8} md={4}>
  
                <AppWidgetSummary
                  title="Number  of Circle Meeting"
                  total={(summaryData?.summary_NoofCircleMeeting>=0)?summaryData?.summary_NoofCircleMeeting:summaryData?.summary_nospoorthiciclemeet}
                  color="motivator"
  
                />
              </Grid>
              <Grid item xs={4} sm={8} md={4}>
  
                <AppWidgetSummary
                  title="Number of Spoorthi Survey"
                  total={(summaryData?.summary_sporthisurvey>=0)?summaryData?.summary_sporthisurvey:summaryData?.summary_nospoorthisurvey}
                  color="motivator"
  
                />
              </Grid>
              <Grid item xs={6} sm={8} md={6}>
  
                <AppWidgetSummary
                  title="Number of Spoorthi Modules Completed"
                  total={(summaryData?.summary_Noofsporthicompleted>=0)?summaryData?.summary_Noofsporthicompleted:summaryData?.summary_spoorthimodule}
                  color="motivator"
  
                />
              </Grid>
              <Grid item xs={6} sm={8} md={6}>
  
                <AppWidgetSummary
                  title="Number of Beehives"
                  total={(summaryData?.summary_Noofbeehives>=0)?summaryData?.summary_Noofbeehives:summaryData?.summary_noofspoorthibeehives}
                  color="motivator"
  
                />
              </Grid>
             
            </Grid>
            :
  (roleid == 5 || roleid == 6 || roleid == 13)?
            <>
<Grid container spacing={3} marginTop={4}>
<Grid item xs={4} sm={8} md={4}>
  
  <AppWidgetSummary
    title="Target"
    total={(summaryData?.summary_Target)?summaryData?.summary_Target:summaryData?.summary_target}
    color="motivator"
  />
</Grid>
<Grid item xs={4} sm={8} md={4}>
  
  <AppWidgetSummary
    title="Actual"
    total={summaryData?.summary_actual}
    color="motivator"
  />
</Grid>
              <Grid item xs={4} sm={8} md={4}>
  
                <AppWidgetSummary
                  title="Number of Villages"
                  total={summaryData?.summary_villages}
                  color="motivator"
  
                />
              </Grid>
              <Grid item xs={4} sm={8} md={4}>
  
                <AppWidgetSummary
                  title="Number of Gelathi Enrolled"
                  total={(summaryData?.summary_Gelathienrolled>=0)?summaryData?.summary_Gelathienrolled:summaryData?.summary_spoorthienroll}
                  color="motivator"
                
                />
              </Grid>
              <Grid item xs={4} sm={8} md={4}>
  
                <AppWidgetSummary
                  title="Number  of Circle Meeting"
                  total={(summaryData?.summary_NoofCircleMeeting>=0)?summaryData?.summary_NoofCircleMeeting:summaryData?.summary_nospoorthiciclemeet}
                  color="motivator"
  
                />
              </Grid>
              <Grid item xs={4} sm={8} md={4}>
  
                <AppWidgetSummary
                  title="Number of Spoorthi Survey"
                  total={(summaryData?.summary_sporthisurvey>=0)?summaryData?.summary_sporthisurvey:summaryData?.summary_nospoorthisurvey}
                  color="motivator"
  
                />
              </Grid>
              <Grid item xs={6} sm={8} md={6}>
  
                <AppWidgetSummary
                  title="Number of Spoorthi Modules Completed"
                  total={(summaryData?.summary_Noofsporthicompleted>=0)?summaryData?.summary_Noofsporthicompleted:summaryData?.summary_spoorthimodule}
                  color="motivator"
  
                />
              </Grid>
              <Grid item xs={6} sm={8} md={6}>
  
                <AppWidgetSummary
                  title="Number of Beehives"
                  total={(summaryData?.summary_Noofbeehives>=0)?summaryData?.summary_Noofbeehives:summaryData?.summary_noofspoorthibeehives}
                  color="motivator"
  
                />
              </Grid>
             
            </Grid>
            </>:  <>
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
          
            {(summaryData?.data?.length>0) ? <CardContent maxWidth="md" style={{ display: 'flex', justifyContent: 'center', overflow: 'hidden' }}>
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
      {(itm?.select_type=='1')?"Project ":"Funder"}<br />
     
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
                title="Number of Circle Meeting"
                total={(itm?.NoofCircleMeeting>=0)?itm?.NoofCircleMeeting:itm?.noofspoortthimeeting}
                color="motivator"
                icon="twemoji:women-holding-hands"
              />
            </Grid>
            <Grid item xs={6} sm={6} md={6}>
              <AppWidgetSummary
                title="Number of Gelathi Enrolled"
                total={(itm?.Gelathienrolled>=0)?itm?.Gelathienrolled:itm?.spoorthienroll}
                color="motivator"
                icon="twemoji:women-holding-hands"
              />
            </Grid>
            <Grid item xs={6} sm={6} md={6}>
<AppWidgetSummary
  title="Number of Spoorthi Survey"
  total={(itm?.Noofsporthisurvey>=0)?itm?.Noofsporthisurvey:itm?.noofspoorthisurvey}
  color="info"
  icon = "eos-icons:product-subscriptions-outlined"
/>
</Grid>
<Grid item xs={6} sm={6} md={6}>
<AppWidgetSummary
  title="Number of Beehives"
  total={(itm?.Noofbeehives>=0)?itm?.Noofbeehives:itm?.noofspoorthibeehives}
  color="info"
  icon = "twemoji:women-holding-hands"
/>
</Grid>
<Grid item xs={6} sm={6} md={6}>
              <AppWidgetSummary
                title="Number of Spoorthi Modules Completed"
                total={(itm?.Noofsporthicompleted>=0)?itm?.Noofsporthicompleted:itm?.noofspoorthimodule}
                color="vyapar"
                icon="eos-icons:product-subscriptions-outlined"
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
(roleid == 5|| roleid == 6 || roleid == 13)?
<>
<CardContent>
            <Typography variant="h4" gutterBottom style={{ marginLeft: "20px" }}>
            {
  (summaryData && summaryData.data && summaryData.data[0]?.startDate === "")
    ? "Funders List"
    : "Projects List"
}
            </Typography>
          
            {(summaryData?.data?.length>0) ? <CardContent maxWidth="md" style={{ display: 'flex', justifyContent: 'center', overflow: 'hidden' }}>
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
      {(itm?.select_type=="1")?"Project":"Funder"}<br />
     
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
                title="Number of Gelathi cohorts"
                total={(itm?.NoofCircleMeeting>=0)? itm?.NoofCircleMeeting:itm?.noofspoortthimeeting}
                color="motivator"
                icon="twemoji:women-holding-hands"
              />
            </Grid>
            
           <Grid item xs={6} sm={6} md={6}>
              <AppWidgetSummary
                title="Number of Beehive"
                total={(itm?.Noofbeehives>=0)?itm?.Noofbeehives:itm?.noofspoorthibeehives}
                color="motivator"
                icon="twemoji:women-holding-hands"
              />
            </Grid>
           <Grid item xs={6} sm={6} md={6}>
<AppWidgetSummary
  title="Number of Gelathi Enroll"
  total={(itm?.Gelathienrolled>=0)?itm?.Gelathienrolled:itm?.spoorthienroll}
  color="info"
  icon = "eos-icons:product-subscriptions-outlined"
/>
</Grid>
<Grid item xs={6} sm={6} md={6}>
<AppWidgetSummary
  title="Number of Spoorthi Survey "
  total={(itm?.Noofsporthisurvey>=0)?itm?.Noofsporthisurvey:itm?.noofspoorthisurvey}
  color="info"
  icon = "twemoji:women-holding-hands"
/>
</Grid>
           <Grid item xs={6} sm={6} md={6}>
              <AppWidgetSummary
                title="Number of Spoorthi Completed"
                total={(itm?.Noofsporthicompleted>=0)?itm?.Noofsporthicompleted:itm?.noofspoorthimodule}
                color="vyapar"
                icon="eos-icons:product-subscriptions-outlined"
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
</>
:
<>
</>
}
          </Container>
        </Page>
      </>
    )
  
  }
export default GelathiProgramDashboard;