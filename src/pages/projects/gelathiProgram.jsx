

import { useState, useEffect } from 'react';
import axios from 'axios'
import { Card, Stack, Chip, Container,Box , Typography, Grid, IconButton,CardContent,Button, CircularProgress } from '@mui/material';
import GelathiProgrameDrawer from '../projects/Components/GelathiProgrameDrawer';
import { Link, useLocation } from 'react-router-dom';
import Iconify from 'src/components/Iconify';
import Filtersmain from './projectfilters/filtersmain';
import Searchbar from 'src/layouts/dashboard/Searchbar';
import { baseURL } from 'src/utils/api';
import { useAuth } from 'src/AuthContext';
import moment from 'moment';

export default function gelathiProgram(props) {
    const { apikey } = useAuth();
    const {state} = useLocation();
    const [clcikData, setClickData] = useState()
    const [programe,setPrograme] = useState('')
    const [filterData, setFilterData] = useState({})
    const [data1, setData1] = useState('')
    const [count,setCount]= useState('');
    var [search, setSearch] = useState('')
    var [selected, setSelected] = useState(null)
    const [dateParenet, setDateParenent] = useState()
    const [endDateParenet, setEndDateParenet] = useState()
    let userDetails = sessionStorage?.getItem('userDetails')
userDetails = JSON.parse(userDetails)
    console.log(dateParenet,endDateParenet ,"gelati program ")
    const user = async (d, filter_type) => {
       if (filter_type) {
         setSelected(filter_type)
         let ids = { "Circle Meetings": 1,"Village Visits":2,"Beehive Visits":3,"Rescheduled":22,"Cancelled":23,"Field Associates":6  ,"SPS":4, "SPM1":5 , "SPM2":6 , "SPM3":7, 
         "SPM4":8,"SPM5":9,"GPS":10,"GPM1":11,"GPM2":12,"GPM3":13,"GPM4":14,"GPM5":15,"VPS":16,"VPM1":17,"VPM2":18,"VPM3":19,"VPM4":20,"VPM5":21 }
         filter_type.id = ids[filter_type.type]
       }
       gelathiPrograme(d,filter_type);
    }
    useEffect(() => {
        gelathiPrograme();
        }, []
    )
    console.log(filterData ,"filterData")
    const gelathiPrograme = async(id,i,g) =>{
      console.log( id,"id",  i, "iiii ",g ,"gggg")
        var role = JSON.parse(sessionStorage?.getItem('userDetails'))?.role
        var idvalue = JSON.parse(sessionStorage?.getItem('userDetails'))?.id;
        var data = JSON.stringify({
          "filter": i?.id?JSON.stringify(parseInt(i?.id)):'',
          "end_date":  g==="date"?i:dateParenet ? moment(endDateParenet?.$d)?.format('YYYY-MM-DD'):'',
          "search": search,
          "project_id": state?.id,
          "gelathi_id": JSON.stringify(id?.emp_id),
          "start_date":  g==="date"?id:dateParenet ? moment(dateParenet?.$d)?.format('YYYY-MM-DD'):'',
          "emp_id": idvalue,
          "funder":id?id.funderID:""
,
        });
        console.log(data ,"data")
        var config = {
          method: 'post',
          url: baseURL+'getGFSessionsNew',
          headers: { 
            'Content-Type': 'application/json',
            'Authorization': `${apikey}`
          },
          data : data
        };
          
          axios(config)
          .then(function (response) {
            setPrograme(response.data)
            setCount(response.data?.list?response.data?.list.length : 0 )
          })
          .catch(function (error) {
            // console.log(error);
          });
    }
    
    const id = sessionStorage?.getItem("proId")
    useEffect(() => {
        projData();
    
      }, [])
      
    const projData = async => {
        var userDetails = JSON.parse(sessionStorage?.getItem('userDetails'))
        var role = JSON.parse(sessionStorage?.getItem('userDetails'))?.role
        var idvalue = JSON.parse(sessionStorage?.getItem('userDetails'))?.id;
        var data = JSON.stringify({
          "project_id": id,
          "role_id": role,
          "emp_id": idvalue
        });
    
        var config = {
          method: 'post',
          url: baseURL + 'getProjectData',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `${apikey}`
          },
          data: data
        };
    
        axios(config)
          .then(function (response) {
            setData1(response.data.list)
          })
          .catch(function (error) {
            // console.log(error);
          });
    
      }
    const [openFilter, setOpenFilter] = useState(false);
    const [filter,setFilter]=useState(false);
    const handleOpenFilter = () => {
        setOpenFilter(true);
    };
    const handleCloseFilter = () => {
        setOpenFilter(false);
        
    };
    const handleopen=()=>{
      setFilter(true)
    };
    const handleclose=()=>{
      setFilter(false)
    }
    const handleDelete = () => {
      setSelected(null)
      search = ''
      setSearch(search)
      gelathiPrograme()   
  }
    const searchFunction = (e) => {
       
        search = e
        setSearch(search)
        setSelected({ name: e, type: "Search" })
        gelathiPrograme()
    }
    const onDateSubmit = (e) => {
      setSelected({ type: 'Date Range', name: `${e?.startDate} - ${e?.endDate}` })
      gelathiPrograme(e?.startDate, e?.endDate, "date")
      setFilterData({ from_date: e?.startDate, to_date: e?.endDate })
      handleclose()
    }

    const getData = (itm, i) => {
      console.log(itm, i ,"datain getData(")
    setSelected({itm,type:'Field Associates'})
    const data = i === 6 ? { "gelathi_id": itm?.id } : i === 1 ? { "partner_id": itm?.id } : { "project_id": itm?.id }
    gelathiPrograme(itm, i)
    setFilterData(data)
    handleclose()
    }
    const getDataForFUnder = (itm, i) => {
      console.log(itm, i ,"datain getData(")
 
    const data = i === 6 ? { "gelathi_id": itm?.id } : i === 1 ? { "partner_id": itm?.id } : { "project_id": itm?.id }
    gelathiPrograme(itm, i)
    setFilterData(data)
    handleclose()
    }
    return (
        <Container>
               <Searchbar getSearch={(e) => searchFunction(e)} />
          
            <Stack direction="row" alignItems="center" justifyContent="space-between" mb={5}>
                <Typography variant="h5" gutterBottom>
                    <Link to="/dashboard/projects/project">
                        <IconButton>
                            <Iconify icon="material-symbols:arrow-back-rounded" />
                        </IconButton></Link>
                    Gelathi Program  
                </Typography>
                <Button style={{ float: "right",right:30,position:'absolute', color: '#ff7424' }} sx={{ '&:hover': { backgroundColor: '#ffd796', }, }} onClick={() => { handleopen() }}>
            Filter
          </Button>
         
            </Stack>
            
            {
                    selected  && (selected?.type=='Search') && <> <Chip style={{ backgroundColor: '#ffd796', color: '#000' }}label={`${selected?.type} : ${selected?.name} `} onDelete={() => { handleDelete(selected) }} /><br/>&nbsp;</>
            }
             {
                    selected  && (selected?.type=='Field Associates') && <> <Chip style={{ backgroundColor: '#ffd796', color: '#000' }}label={`${selected?.type} : ${selected?.itm?.name} `} onDelete={() => { handleDelete(selected) }} /><br/>&nbsp;</>
            }
            {
                    selected  && (selected?.type=='Circle Meetings' || selected?.type=='Beehive Visits' || selected?.type=='Rescheduled'|| selected?.type=='Cancelled' || selected?.type=='Village Visits' 
                    || selected?.type=='SPS'|| selected?.type=='SPM1'|| selected?.type=='SPM2'|| selected?.type=='SPM3'|| selected?.type=='SPM4'|| selected?.type=='SPM5'
                    || selected?.type=='GPS'|| selected?.type=='GPM1'|| selected?.type=='GPM2'|| selected?.type=='GPM3'|| selected?.type=='GPM4'|| selected?.type=='GPM5'
                    || selected?.type=='VPS'|| selected?.type=='VPM1'|| selected?.type=='VPM2'|| selected?.type=='VPM3'|| selected?.type=='VPM4'|| selected?.type=='VPM5')
                     && <> <Chip style={{ backgroundColor: '#ffd796', color: '#000' }}label={`${selected?.type} `} onDelete={() => { handleDelete(selected) }} /><br/>&nbsp;</>
            }
            <Stack direction="row" spacing={1} flexShrink={0} sx={{ my: 1 }}>
                <Filtersmain
                    type="GelathiProgram"
                    user={user}
                    isOpenFilter={filter}
                    data1={data1}
                    onDateSubmit={onDateSubmit}
                    gelathiPrograme={gelathiPrograme}
                    getData={getData}
                    getDataForFUnder={getDataForFUnder}
                    onOpenFilter={handleopen}
                    onCloseFilter={handleclose}
                    setEndDateParenet={setEndDateParenet}
                    setDateParenent={setDateParenent}
                />
            </Stack>
               <Card>
                <CardContent style={{fontWeight:700}}>Project Name : {data1?.project_name}</CardContent> </Card><br/>
               <Typography style={{fontWeight:500,marginLeft:2}}> All Gelathi Sessions  ({count})</Typography> 
            {clcikData && <Stack direction="row" spacing={1} flexShrink={0} sx={{ my: 1 }}>
                <GelathiProgrameDrawer
                    clcikData={clcikData}
                    
                    isOpenFilter={openFilter}
                    onOpenFilter={handleOpenFilter}
                    onCloseFilter={handleCloseFilter}
                    gelathiFacikitatorLead={data1}
                />
            </Stack>}
            { programe == "" ? 
<div style={{marginTop:"20%" , marginLeft:"40%"}}>
  <CircularProgress sx={{color:'#ff7424'}}/>
  </div>
:  programe?.list?programe?.list?.map((itm) => {
                        return (
                            <Card style={styles.card1} onClick={() => {
                                setClickData({ name: itm?.gf_session_id, title: "Gelathi program Name" })
                                handleOpenFilter()
                            }}>  
                     
                        <Grid pt={1} pb={1} container xs={12} md={4} direction="row" alignItems="center" justifyContent="space-between" style={{marginLeft:15}}>
                         <Typography variant="subtitle1" gutterBottom>
                                {` ${itm?.gf_session_name}`}
                                {(itm?.status=='2')?<IconButton sx={{float:'right',position:'absolute',right:'0'}}><Iconify  icon="material-symbols:cancel"></Iconify></IconButton>:null}
                                {(itm?.status=='1')?<IconButton sx={{float:'right',position:'absolute',right:'0'}}><Iconify  icon="mdi:clock-outline"></Iconify></IconButton>:null}
                            </Typography>
                        </Grid>
                        <Grid style={{ marginLeft: 15 }}>
                            <Typography variant="subtitle2" gutterBottom >
                               Date : {itm?.plan_date}</Typography>
                        </Grid>
                    </Card>)
             }):
             <>
             <h4 style={{textAlign:'center'}}>No  Gelathi  Program Found</h4>
             </>}
          
        </Container>
    );
}
const styles = {
    card1: {
        backgroundColor: '#f5f5f5',
        opacity: 0.9,
        marginTop: "20px",
        padding: "1rem"
    },
}
