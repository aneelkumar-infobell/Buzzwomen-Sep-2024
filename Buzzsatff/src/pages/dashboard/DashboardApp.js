                 
import React from 'react'
import { useState, useEffect } from 'react';
import { useTheme } from '@mui/material/styles';
import { Grid, Container, Typography, Stack, Divider, Card, CardContent, Button, Box } from '@mui/material';
import axios from 'axios';
import CircularProgress from '@mui/material/CircularProgress';
import Page from 'src/components/Page';
import Paper from '@mui/material/Paper';
import Chip from '@mui/material/Chip';
import { AppWidgetSummary } from 'src/sections/@dashboard/app';
import { useNavigate } from 'react-router-dom';
import FiltersHome from 'src/pages/Filters/FiltersHome';
import {baseURL} from 'src/utils/api';
import { useAuth } from 'src/AuthContext';
import moment from 'moment';
const DashboardApp = () => {
    const { apikey } = useAuth();
  const navigate = useNavigate();
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
  var startdate = moment(new Date()).format('YYYY-04-01')
  var endDate = moment(startdate, 'YYYY').add(1, 'year').format('YYYY-03-31')
  const [graphData, setGraphData] = useState(null);
  const itemStyles = [{ itemXs: 4, itemSm: 8, itemMd: 4 }, { itemXs: 6, itemSm: 8, itemMd: 6 }]
  var roleid = JSON.parse(sessionStorage.getItem('userDetails'))?.role
  var rolevalue = JSON.parse(sessionStorage.getItem('userDetails'))?.trainer_type;
  var userid = JSON.parse(sessionStorage.getItem('userDetails'))?.id
  const apiHit = async (id, i, g,date1,date2) => {
    setLoader(true)
    var roleid = JSON.parse(sessionStorage.getItem('userDetails'))?.role
    var userid = JSON.parse(sessionStorage.getItem('userDetails'))?.id
    const data  ={
      "partner_id": i === 1 ? id?.id : '',
    "start_date": (g === "date")? id:(g==="Calendar"|| g=== "countryCalendar")?moment(date1?.$d)?.format('YYYY-MM-DD'):(id===undefined)? startdate:"",
    "end_date":  (g === "date")? i:(g==="Calendar"|| g=== "countryCalendar")?moment(date2?.$d)?.format('YYYY-MM-DD'):(i ===undefined)?endDate:"",
    "funder_id":i === 2 ? id?.id : '',
    "dist":(g === "country" || g==="countryCalendar")? id : "",
    "taluk":(g === "country" || g==="countryCalendar") ? i : "",
    "project_id":i===3? id?.id : '',
    "trainer_id":i === 5 ? id?.id : '',
    "opsmanager":i === 4 ? id?.id : '',
    "somid": i === 12 ? id?.id : '',
    "gflid":i === 13 ? id?.id : '',
    "roleid":roleid,
    "emp_id":userid
  }
    const config = {
      method: 'post',
      url :baseURL +"ssDashboard",
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
  
  const filterApi = async(id,i,g,date1,date2)=>{
    setLoader(true)
    var roleid = JSON.parse(sessionStorage.getItem('userDetails'))?.role
    var userid = JSON.parse(sessionStorage.getItem('userDetails'))?.id
    var data = JSON.stringify({
      "end_date":(g === "date")?i:(g=== "countryCalendar" || g==="Calendar")?moment(date2?.$d)?.format('YYYY-MM-DD'): '',
      "role_id": parseInt(roleid),
      "taluk_id":(g === "country" || g==="countryCalendar") ? i : "",
      "trainerId": (i==5)?id?.id:'',
      "emp_id": parseInt(userid),
      "start_date":(g === "date")?id:(g=== "countryCalendar" || g==="Calendar")?moment(date1?.$d)?.format('YYYY-MM-DD'): '',
    });
    
    var config = {
      method: 'post',
      url: baseURL + 'ssfilter',
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
    i===3?{ "project_id": itm?.id }:i==4?{"opsManager":itm?.id}:i===12?{"somId":itm?.id} :i===5?{"trainerId":itm?.id}:{"gflId":itm?.id}
   
    if(i==5 )
    {
      
      if( (dateValue || endDateValue))
      {
        filterApi(itm,i,"Calendar",date1,date2)
      }
      else{
        filterApi(itm,i)
      }
    }
    if( (dateValue || endDateValue))
        {
          apiHit(itm, i,"Calendar",date1,date2)
          
        }
      else if(i!=5){
          apiHit(itm,i)
        }
    setFilterData(data)
    handleCloseFilter()
  }
 
  const onSumbit = (e, i) => {
    handleCloseFilter()
    setSelected({ type: 'Location', name: ` ${e?.stateName} - ${e?.districtName} - ${e?.talukName}` })
    if(e?.dateValue && e?.endDateValue)
    {
      filterApi(e?.district_id, e?.talaq_id, "countryCalendar",e?.start_date,e?.end_date,)
    }
    else{
      filterApi(e?.district_id,e?.talaq_id,"country")
    }
  }
 
const userId = JSON.parse(sessionStorage.getItem('userDetails'))?.role
  return (
    <>
      <Page title="Dashboard">
      <Stack direction="row" alignItems="center" justifyContent="space-between" >
          <Typography variant="h5" gutterBottom sx={{ml:4}}>
          Self Shakthi Program Summary   
 
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
              type="Dashboard"
              onDateSubmit={onDateSubmit}
              onSumbit={onSumbit}
              getData={getData}
              isOpenFilter={openFilter}
              onOpenFilter={handleOpenFilter}
              onCloseFilter={handleCloseFilter}
            />
          </Stack>
        {  (roleid == 1 || roleid == 9 || roleid == 3 || roleid == 4 || roleid == 12)?
        
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
                title="Number  of Villages"
                total={(summaryData?.summary_villages>=0)?summaryData?.summary_villages:null}
                color="motivator"
              />
            </Grid>
            <Grid item xs={4} sm={8} md={4}>
              <AppWidgetSummary
                title="Number of Batches"
                total={(summaryData?.summary_NoofBatches>=0)?summaryData?.summary_NoofBatches:summaryData?.summary_nobatches}
                color="motivator"
              />
            </Grid>
            <Grid item xs={4} sm={8} md={4}>
              <AppWidgetSummary
                title="Number of Self Shakthi Survey"
                total={(summaryData?.summary_Noofselfshakthisurvey>=0)?summaryData?.summary_Noofselfshakthisurvey:summaryData?.summary_nosurvey}
                color="motivator"ata
              />
            </Grid>
            <Grid item xs={4} sm={8} md={4}>
              <AppWidgetSummary
                title="2nd Day Turnout  %"
                total={(summaryData?.summary_day2>=0)?summaryData?.summary_day2:null}
                color="motivator"
              />
            </Grid>
          
          </Grid>
     : (roleid == 13)?
     <>
<Grid container spacing={3} marginTop={4}>
            <Grid item xs={4} sm={8} md={4}>
              <AppWidgetSummary
                title="Number of Beehive"
                total={(summaryData?.summary_beehive>=0)?summaryData?.summary_beehive:null}
                color="motivator"
              />
            </Grid>
            <Grid item xs={4} sm={8} md={4}>
              <AppWidgetSummary
                title="Number of Circle Meet"
                total={(summaryData?.summary_circle_meet>=0)?summaryData?.summary_circle_meet:null}
                color="motivator"
              />
            </Grid>
            <Grid item xs={4} sm={8} md={4}>
              <AppWidgetSummary
                title="Number  of Circles"
                total={(summaryData?.summary_circles>=0)?summaryData?.summary_circles:null}
                color="motivator"
              />
            </Grid>
          </Grid>
          <Grid  container spacing={3} marginTop={4}>
          <Grid item xs={6} sm={8} md={6}>
              <AppWidgetSummary
                title="Number of Enroll"
                total={(summaryData?.summary_enroll>=0)?summaryData?.summary_enroll:null}
                color="motivator"
              />
            </Grid>
            <Grid item xs={6} sm={8} md={6}>
              <AppWidgetSummary
                title="Number of Green"
                total={(summaryData?.summary_green>=0)?summaryData?.summary_green:null}
                color="motivator"
              />
            </Grid>

          </Grid>
          <Grid  container spacing={3} marginTop={4}>
          <Grid item xs={6} sm={8} md={6}>
              <AppWidgetSummary
                title="Number of Vyapar"
                total={(summaryData?.summary_vyapar>=0)?summaryData?.summary_vyapar:null}
                color="motivator"
              />
            </Grid>
            <Grid item xs={6} sm={8} md={6}>
              <AppWidgetSummary
                title="Number of VIllage Visits"
                total={(summaryData?.summary_villagevisit>=0)?summaryData?.summary_villagevisit:null}
                color="motivator"
              />
            </Grid>
          </Grid>
     
     </>
//      :
//      (rolevalue=='senior')?
//      <>
//      <Grid container spacing={3} marginTop={4}>
//             <Grid item xs={12} sm={6} md={4}>

//               <AppWidgetSummary
//                 title="Target"
//                 total={(summaryData?.summary_target>=0)?summaryData?.summary_target:null}
//                 color="motivator"

//               />
//             </Grid>
//             <Grid item xs={12} sm={6} md={4}>

//               <AppWidgetSummary
//                 title="Actual"
//                 total={(summaryData?.summary_actual>=0)?summaryData?.summary_actual:null}
//                 color="motivator"

//               />
//             </Grid>

//             <Grid item xs={12} sm={6} md={4}>

// <AppWidgetSummary
//   title="2nd Day Turnout  %"
//   total={(summaryData?.summary_day2>=0)?summaryData?.summary_day2:null}
//   color="motivator"

// />
// </Grid>
//             <Grid item xs={12} sm={6} md={6}>

//               <AppWidgetSummary
//                 title="Villages"
//                 total={(summaryData?.summary_villages>=0)?summaryData?.summary_villages:null}
//                 color="motivator"

//               />
//             </Grid>

//             <Grid item xs={12} sm={6} md={6}>

// <AppWidgetSummary
//   title="Women"
//   total={(summaryData?.summary_actual>=0)?summaryData?.summary_actual:null}
//   color="motivator"

// />
// </Grid>
          
          
//           </Grid>
//      </>:
:
     ((roleid == 5) ||roleid == 13)?
    
     <>
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
                title="Number  of Villages"
                total={(summaryData?.summary_villages>=0)?summaryData?.summary_villages:null}
                color="motivator"
              />
            </Grid>
            <Grid item xs={4} sm={8} md={4}>
              <AppWidgetSummary
                title="Number of Batches"
                total={(summaryData?.summary_NoofBatches>=0)?summaryData?.summary_NoofBatches:summaryData?.summary_nobatches}
                color="motivator"
              />
            </Grid>
            <Grid item xs={4} sm={8} md={4}>
              <AppWidgetSummary
                title="Number of Self Shakthi Survey"
                total={(summaryData?.summary_Noofselfshakthisurvey>=0)?summaryData?.summary_Noofselfshakthisurvey:summaryData?.summary_nosurvey}
                color="motivator"
              />
            </Grid>
            <Grid item xs={4} sm={8} md={4}>
              <AppWidgetSummary
                title="2nd Day Turnout  %"
                total={(summaryData?.summary_day2>=0)?summaryData?.summary_day2:null}
                color="motivator"
              />
            </Grid>
          
          </Grid>
     </>
     :
     (roleid == 6 )?
     <>
     <Grid container spacing={3} marginTop={4}>
            <Grid item xs={4} sm={8} md={4}>
              <AppWidgetSummary
                title="Number of Beehive"
                total={(summaryData?.summary_beehive>=0)?summaryData?.summary_beehive:null}
                color="motivator"
              />
            </Grid>
            <Grid item xs={4} sm={8} md={4}>
              <AppWidgetSummary
                title="Number of Circle Meet"
                total={(summaryData?.summary_circle_meet>=0)?summaryData?.summary_circle_meet:null}
                color="motivator"
              />
            </Grid>
            <Grid item xs={4} sm={8} md={4}>
              <AppWidgetSummary
                title="Number  of Circles"
                total={(summaryData?.summary_circles>=0)?summaryData?.summary_circles:null}
                color="motivator"
              />
            </Grid>

          </Grid>
          <Grid  container spacing={2} marginTop={4}>
          <Grid item xs={6} sm={8} md={6}>
              <AppWidgetSummary
                title="Number of Enroll"
                total={(summaryData?.summary_enroll>=0)?summaryData?.summary_enroll:null}
                color="motivator"
              />
            </Grid>
            
            <Grid item xs={6} sm={8} md={6}>
              <AppWidgetSummary
                title="Number of VIllage Visits"
                total={(summaryData?.summary_villagevisit>=0)?summaryData?.summary_villagevisit:null}
                color="motivator"
              />
            </Grid>
          </Grid>
     
     </>
     :null

     
     }
          
{/* founder */}
{
  (roleid == 1 || roleid == 9 || roleid == 3 || roleid == 4 || roleid == 12)?
  
  <CardContent>
            <Typography variant="h4" gutterBottom style={{ marginLeft: "20px" }}>
           {(summaryData?.data[0]?.select_type==1)? "Projects List:":"Funders List"} 
             
            </Typography>
          
           {(summaryData?.data?.length>0) ?<CardContent maxWidth="md" style={{ display: 'flex', justifyContent: 'center', overflow: 'hidden' }}>
            <Grid item xs={12} sm={12} md={12} >
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
                title="Number  of Villages"
                total={(itm?.villages>=0)?itm?.villages:null}
                color="villages"
                icon= "fontisto:holiday-village"
              />
            </Grid>
 <Grid item xs={6} sm={6} md={6}>
              <AppWidgetSummary
                title="Number of Batches"
                total={(itm?.noofbatches>=0)?itm?.noofbatches:itm?.nobatches}
                color="motivator"
                icon="twemoji:women-holding-hands"
              />
            </Grid>
 <Grid item xs={6} sm={6} md={6}>
              <AppWidgetSummary
                title="Number of Self Shakthi Survey"
                total={(itm?.noofselfshakthisurvey>=0)?itm?.noofselfshakthisurvey:itm?.noofsurvey}
                color="vyapar"
                icon="eos-icons:product-subscriptions-outlined"
              />
            </Grid>
 <Grid item xs={6} sm={6} md={6}>
              <AppWidgetSummary
                title="2nd Day Turnout  %"
                total={(itm?.day2>=0)?itm?.day2:null}
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
: (rolevalue=='senior')?
<>
{(summaryData?.data?.length>0) ?<CardContent>
            <Typography variant="h4" gutterBottom style={{ marginLeft: "20px" }}>
            {"Projects List"} 
              {/* for gfl it should be showned as project not as funder */}
            </Typography>
          
            {/* <CardContent maxWidth="md" style={{ display: 'flex', justifyContent: 'center', overflow: 'hidden' }}> */}
            <Grid item xs={12} sm={12} md={12} >
          {summaryData?.data?.map((itm) => {
            return (
        <> 
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
        <Grid container spacing={3}>  
        

  <Grid item xs={12} style={{ display: 'flex', flexDirection: 'row' }}>
    <span style={{ fontWeight: 700, fontSize: 15, flex: '1' }}>
      {(itm?.select_type=='1')?"Project Name":"Funder"}<br />
     
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
  <Grid item xs={12} style={{ display: 'flex', flexDirection: 'row' }}>
    <span style={{ fontWeight: 700, fontSize: 15, flex: '1' }}>
    Start Date  <br />
     
    </span>
    <span style={{ fontWeight: 700, fontSize: 15, flex: '2' }}>
     
      &nbsp;:&nbsp;{itm?.startDate} 
    </span>
  </Grid>
  <Grid item xs={12} style={{ display: 'flex', flexDirection: 'row' }}>
    <span style={{ fontWeight: 700, fontSize: 15, flex: '1' }}>
    End Date  <br />
     
    </span>
    <span style={{ fontWeight: 700, fontSize: 15, flex: '2' }}>
     
      &nbsp;:&nbsp;{itm?.endDate} 
    </span>
  </Grid>
                  <Divider mt={1} />
                  <Grid container spacing={2} marginTop={4}>
<Grid item xs={4} sm={8} md={4}>

<AppWidgetSummary
  title="Villages"
  total={(itm?.villages>=0)?itm?.villages:null}
  color="villages"
  icon= "fontisto:holiday-village"

/>
</Grid>
  <Grid item xs={4} sm={8} md={4}>

<AppWidgetSummary
  title="Women"
  total={(itm?.actual>=0)?itm?.actual:itm?.actual}
  color="info"
  icon = "twemoji:women-holding-hands"

/>
</Grid>
           
 <Grid item xs={4} sm={8} md={4}>

              <AppWidgetSummary
                title="2nd day Turnout(%)"
                total={(itm?.day2>=0)?itm?.day2:itm?.day2}
                color="vyapar"
                icon="eos-icons:product-subscriptions-outlined"

              />
            </Grid>

          </Grid>
              </Grid>
              </Container>
              </CardContent>
              </Card>
              </> 
            );
          })}
        </Grid>
{/* </CardContent> */}
</CardContent>:<h4 style={{textAlign:"center"}}>No Data</h4>}
</>:
 (roleid == 5 || roleid == 13)?
<>
{(summaryData?.data?.length>0) ?<CardContent>
            <Typography variant="h4" gutterBottom style={{ marginLeft: "20px" }}>
            {(summaryData?.data[0]?.select_type==1)? "Projects List":"Funders List"} 
              {/* for gfl it should be showned as project not as funder */}
            </Typography>
          
            <CardContent maxWidth="md" style={{ display: 'flex', justifyContent: 'center', overflow: 'hidden' }}>
            <Grid item xs={12} sm={12} md={12} >
          {summaryData?.data?.map((itm) => {
            return (
              <Card
                style={{
                  display:'flex',
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
      {(itm?.select_type=='1')?"Project Name":"Funder"}<br />
     
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
  <Grid item xs={12} style={{ display: 'flex', flexDirection: 'row' }}>
    <span style={{ fontWeight: 700, fontSize: 15, flex: '1' }}>
    Start Date  <br />
     
    </span>
    <span style={{ fontWeight: 700, fontSize: 15, flex: '2' }}>
     
      &nbsp;:&nbsp;{itm?.startDate} 
    </span>
  </Grid>
  <Grid item xs={12} style={{ display: 'flex', flexDirection: 'row' }}>
    <span style={{ fontWeight: 700, fontSize: 15, flex: '1' }}>
    End Date  <br />
     
    </span>
    <span style={{ fontWeight: 700, fontSize: 15, flex: '2' }}>
     
      &nbsp;:&nbsp;{itm?.endDate} 
    </span>
  </Grid>
</Container>
                  <Divider mt={1} />
                  <Grid container spacing={3} marginTop={4}>
      

<Grid item xs={4} sm={6} md={6}>

<AppWidgetSummary
  title="Number  of Villages Visits"
  total={(itm?.villages>=0)?itm?.villages:null}
  color="villages"
  icon= "fontisto:holiday-village"
/>
</Grid>
  <Grid item xs={4} sm={6} md={6}>
<AppWidgetSummary
  title="Number of Batch"
  total={(itm?.noofbatches>=0)?itm?.noofbatches:itm?.nobatches}
  color="info"
  icon = "twemoji:women-holding-hands"
/>
</Grid>
           
 <Grid item xs={6} sm={6} md={6}>
              <AppWidgetSummary
                title="Number of Self Shakthi Survey"
                total={(itm?.noofselfshakthisurvey>=0)?itm?.noofselfshakthisurvey:itm?.noofsurvey}
                color="vyapar"
                icon="eos-icons:product-subscriptions-outlined"
              />
            </Grid>
 <Grid item xs={6} sm={6} md={6}>
<AppWidgetSummary
  title="2nd Day Turnout  %"
  total={itm?.day2}
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
</CardContent>
</CardContent>:<h4 style={{textAlign:"center"}}>No Data</h4>}
</>
:
(roleid == 6)?
<>
{(summaryData?.data?.length>0) ?<CardContent>
            <Typography variant="h4" gutterBottom style={{ marginLeft: "20px" }}>
            {"Projects List"} 
              {/* for gfl it should be showned as project not as funder */}
            </Typography>
          
            <CardContent maxWidth="md" style={{ display: 'flex', justifyContent: 'center', overflow: 'hidden' }}>
            <Grid item xs={12} sm={12} md={12} >
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
      {(itm?.select_type=='1')?"Project Name":"Funder"}<br />
     
    </span>
    <span style={{ fontWeight: 700, fontSize: 15, flex: '2'}}>
      &nbsp;:&nbsp;{itm?.name}<br />
      {/* &nbsp;:&nbsp;{itm?.actual} / {itm?.target} */}
    </span>
    
    
    </Grid>
    {/* <Grid item xs={12} style={{ display: 'flex', flexDirection: 'row' }}>
    <span style={{ fontWeight: 700, fontSize: 15, flex: '1' }}>
    Actual / Target  <br />
     
    </span>
    <span style={{ fontWeight: 700, fontSize: 15, flex: '2' }}>
     
      &nbsp;:&nbsp;{itm?.actual} / {itm?.target}
    </span>
  </Grid> */}
  {/* <Grid item xs={12} style={{ display: 'flex', flexDirection: 'row' }}>
    <span style={{ fontWeight: 700, fontSize: 15, flex: '1' }}>
    Start Date  <br />
     
    </span>
    <span style={{ fontWeight: 700, fontSize: 15, flex: '2' }}>
     
      &nbsp;:&nbsp;{itm?.startDate} 
    </span>
  </Grid> */}
  {/* <Grid item xs={12} style={{ display: 'flex', flexDirection: 'row' }}>
    <span style={{ fontWeight: 700, fontSize: 15, flex: '1' }}>
    End Date  <br />
     
    </span>
    <span style={{ fontWeight: 700, fontSize: 15, flex: '2' }}>
     
      &nbsp;:&nbsp;{itm?.endDate} 
    </span>
  </Grid> */}
</Container>
                  <Divider mt={1} />
                  <Grid container spacing={3} marginTop={4}>
      

<Grid item xs={6} sm={6} md={6}>

<AppWidgetSummary
  title="Number  of Villages Visits"
  total={(itm?.villagevisit>=0)?itm?.villagevisit:null}
  color="villages"
  icon= "fontisto:holiday-village"

/>
</Grid>
  <Grid item xs={6} sm={6} md={6}>

<AppWidgetSummary
  title="Number of Circle"
  total={(itm?.circles>=0)?itm?.circles:itm?.circles}
  color="info"
  icon = "twemoji:women-holding-hands"

/>
</Grid>
           
 <Grid item xs={6} sm={6} md={6}>

              <AppWidgetSummary
                title="Number of Enroll"
                total={(itm?.enroll>=0)?itm?.enroll:itm?.enroll}
                color="vyapar"
                icon="eos-icons:product-subscriptions-outlined"

              />
            </Grid>
 <Grid item xs={6} sm={6} md={6}>

<AppWidgetSummary
  title="Number of Circle Meet"
  total={itm?.circle_meet}
  color="info"
  icon = "twemoji:women-holding-hands"

/>
</Grid>
<Grid item xs={6} sm={6} md={6}>

<AppWidgetSummary
  title="Number of Circle Meet"
  total={itm?.beehive}
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
</CardContent>
</CardContent>:<h4 style={{textAlign:"center"}}>No Data</h4>}
</>:
<>
</>
}
{/* founder end  */}
        </Container>
      </Page>
    </>
  )
}
export default DashboardApp
