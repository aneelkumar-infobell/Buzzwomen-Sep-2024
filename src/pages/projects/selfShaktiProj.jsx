import { useEffect, useState } from 'react';
import axios from 'axios';
import React from "react"
import { Card, Stack, Chip,CardContent, Container, Typography, Grid, IconButton,Button, CircularProgress } from '@mui/material';
import ProjectMultiDrawer from '../Components/ProjectMultiDrawer';
import Iconify from 'src/components/Iconify';
import { Link, useLocation } from 'react-router-dom';
import Searchbar from 'src/layouts/dashboard/Searchbar';
import Shakthimain from './projectfilters/Shakthimain';
import { baseURL } from 'src/utils/api';
import { useAuth } from 'src/AuthContext';
export default function selfShaktiProj() {
    const { apikey } = useAuth();
    const {state} = useLocation()
    const [clcikData, setClickData] = useState()
    
  const [filterData, setFilterData] = useState({})
    const [count,setCount] = useState();
    var [selected, setSelected] = useState(null)
    var [search, setSearch] = useState('')
    const [trainerdata,setrainerdata]=useState('')
    const userid = JSON.parse(sessionStorage.getItem('userDetails'))?.role
    const searchFunction = (e) => {
        search = e
        setSearch(search)
        setSelected({ name: e, type: "Search" })
        shakti()
    } 
    
    
    const [data1, setData1] = useState('');
    const [openFilter, setOpenFilter] = useState(false);
    const [filter,setFilter]=useState(false);
    const [selfShakti,setSelfShakthi] = useState('');
    const [batchState,setBatchState] = useState()
    var  [selected, setSelected] = useState(null)
    var [search, setSearch] = useState('')
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
    const user = async (d, filter_type) => {
      if (filter_type) {
        setSelected(filter_type)
        let ids = { "Rescheduled":1,"Cancelled":2,"Trainers":5}
        filter_type.id = ids[filter_type.type]
      }
      shakti(d,filter_type);
   }
   useEffect(() => {
       shakti();
       }, []
   )
    const shakti = async(id,i,g) =>{
        var role = JSON.parse(sessionStorage?.getItem('userDetails'))?.role
        var idvalue = JSON.parse(sessionStorage?.getItem('userDetails'))?.id;
        var data = JSON.stringify({
          "end_date": g==="date"?i:'',
          "search": search,
          "project_id": state?.id,
          "filter_type": i?.id?JSON.stringify(parseInt(i?.id)):'',
          "start_date": g==="date"?id:'',
          "type":state?.type,
          "trainer_id":id?.emp_id?JSON.stringify(parseInt(id?.emp_id)):'',
          "emp_id": idvalue
        });
        
        var config = {
          method: 'post',
          url: baseURL + 'getTrainingBatch',
          headers: { 
            'Content-Type': 'application/json',
            'Authorization': `${apikey}`
          },
          data : data
        };
        
          
          axios(config)
          .then(function (response) {
            setSelfShakthi(response.data)
            setCount(response.data.list.length)
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
    const handleDelete = () => {
      setSelected(null)
        search = ''
        setSearch(search)
        shakti();
    }
  
    const onDateSubmit = (e) => {
      setSelected({ type: 'Date Range', name: `${e?.startDate} - ${e?.endDate}` })
  
      shakti(e?.startDate, e?.endDate, "date")
      setFilterData({ from_date: e?.startDate, to_date: e?.endDate })
      handleclose()
    }
    const getData = (itm, i) => {
    setSelected({itm,type:'Trainers'})
    const data = i === 5 ? { "trainer_id": itm?.emp_id } : i === 1 ? { "partner_id": itm?.id } : { "project_id": itm?.id }
    shakti(itm, i)
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
                    Self Shakthi 
                    <Button style={{ float: "right",right:30,position:'absolute', color: '#ff7424' }} sx={{ '&:hover': { backgroundColor: '#ffd796', }, }} onClick={() => { handleopen() }}>
            Filter
          </Button>
                </Typography>
                <Stack direction="row" spacing={1} flexShrink={0} sx={{ my: 1 }}>
                <Shakthimain
                    type="SelfShakthi"
                    onDateSubmit={onDateSubmit}
                    user={user}
                    data1={data1}
                    isOpenFilter={filter}
                    getData={getData}
                    shakti={shakti}
                    onOpenFilter={handleopen}
                    onCloseFilter={handleclose}
                />
            </Stack>
            </Stack>
            {
                    selected && (selected?.type=='Search') && <> <Chip style={{ backgroundColor: '#ffd796', color: '#000' }}label={`${selected?.type} : ${selected?.name} `} onDelete={() => { handleDelete(selected) }} /><br/>&nbsp;</>
            }
              {
                    selected && (selected?.type=='Trainers') && <> <Chip style={{ backgroundColor: '#ffd796', color: '#000' }}label={`${selected?.type} : ${selected?.itm?.name} `} onDelete={() => { handleDelete(selected) }} /><br/>&nbsp;</>
            }
          
            {
              selected && (selected?.type=='Rescheduled' || selected?.type=='Cancelled' )&& <> <Chip style={{ backgroundColor: '#ffd796', color: '#000' }}label={`${selected?.type}`} onDelete={() => { handleDelete(selected) }} /><br/>&nbsp;</>
            }
            <Card><CardContent style={{fontWeight:700}}>Project Name : {data1.project_name}</CardContent> </Card><br/>
            <Typography style={{fontWeight:500,marginLeft:2}}> All Training Batch : ({count})</Typography> 
             
                           <Stack direction="row" spacing={1} flexShrink={0} sx={{ my: 1 }}>
                <ProjectMultiDrawer
                batchState={batchState}
                shakti={shakti}
                    clcikData={clcikData}
                    isOpenFilter={openFilter}
                    onOpenFilter={handleOpenFilter}
                    onCloseFilter={handleCloseFilter}
                    projectId={state?.id}
                />
            </Stack>
                    {selfShakti == " "?
                    <>
                    <div style={{display:"flex", marginTop:"50%", marginLeft:"40%" }}>
                          <CircularProgress sx={{color:'#ff7424'}}/>
                          </div>
                    </>
                     :
                    
                    selfShakti?.list?.length!==0?selfShakti?.list?.map((itm) => {
                        return (
                    <Card style={styles.card1} 
                    onClick={() => {
                        setBatchState(itm)
                        setClickData({ name: itm.batch_name, title: "Self Shakti" })
                        handleOpenFilter()
                    }}
                    >
                        <Grid pt={1} pb={1} container xs={12} md={4} direction="row" alignItems="center" justifyContent="space-between" style={{ marginLeft: 15 }}>
                            <Typography variant="subtitle1" gutterBottom>
                           {itm?.batch_name}
                           {(itm?.day1_status=='Cancelled')?<Iconify sx={{marginLeft:2,width:20}} icon="material-symbols:cancel"/>:null}
                                {(itm?.day1_status=='Reschedule')?<Iconify sx={{marginLeft:2,width:20,height:20}} icon="mdi:clock-outline"/>:null}
                            </Typography>
                          
                        </Grid>
                        <Grid style={{ marginLeft: 15 }}>
                            <Typography  gutterBottom style={{ color: '#ff7518' }} >
                               Day 1 : {itm?.day1}</Typography>
                          
                           <Typography gutterBottom style={{ color: '#ff7518' }}> 
                            Day 2 : {itm?.day2}</Typography>
                            
                        </Grid>
                    </Card>)
            }):
            <>
            <h4 style={{textAlign:'center'}}>No Training Batch</h4>
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