import { useState, useEffect } from 'react';
import axios from 'axios'
import { Card, Stack, Chip, Container,CardContent, Typography, Grid, IconButton, CircularProgress, } from '@mui/material';
import ParticipantDrawer from '../projects/Components/ParticipantDrawer';
import { Link, useLocation } from 'react-router-dom';
import Iconify from 'src/components/Iconify';
import Searchbar from 'src/layouts/dashboard/Searchbar';
import BeehiveDrawer from './Components/BeehiveDrawer';
import Circledrawer from './Components/Circledrawer';
import { baseURL } from 'src/utils/api';
import { useAuth } from 'src/AuthContext';

export default function scheduleCircleMeet() {
    const { apikey } = useAuth();
    const {state} = useLocation()
    const [clcikData, setClickData] = useState()
    const [enrolled, setenrolled] = useState('');
    const [data1, setData1] = useState('')
    var [search, setSearch] = useState('')
    var [selected, setSelected] = useState(null)
    const searchFunction = (e) => {
        search = e
        setSearch(search)
        setSelected({ name: e, type: "Search" })
        enrolledGelathi()
    }
    const [count,setCount]= useState('');
    useEffect(() => {
        enrolledGelathi();
    }, []
    )
    const [openFilter, setOpenFilter] = useState(false);
    const handleOpenFilter = () => {
        setOpenFilter(true);
    };
    const handleCloseFilter = () => {
        setOpenFilter(false);
    };
          
          
  const enrolledGelathi = async(id,i,g) => {
    var role = JSON.parse(sessionStorage?.getItem('userDetails'))?.role
    var idvalue = JSON.parse(sessionStorage?.getItem('userDetails'))?.id;
    var data = JSON.stringify({
      "search": search,
      "project_id": state?.id,
      "gelathi_id": id?.emp_id?id?.emp_id:idvalue
    });
    var config = {
      method: 'post',
      url: baseURL+'getGelathiCircle',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `${apikey}`
      },
      data: data
    };
    axios(config)
      .then(function (response) {
        setenrolled(response.data)
        setCount(response?.data?.list.length)
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
      enrolledGelathi();
  }
    return (
        <Container><Searchbar getSearch={(e) => searchFunction(e)} />
            <Stack direction="row" alignItems="center" justifyContent="space-between" mb={5}>
                <Typography variant="h5" gutterBottom>
                    <Link to="/dashboard/projects/project">
                        <IconButton>
                            <Iconify icon="material-symbols:arrow-back-rounded" />
                        </IconButton></Link>
                        Schedule Circle Meet 
                </Typography>
            </Stack>  
            {
                    selected && <> <Chip style={{ backgroundColor: '#ffd796', color: '#000' }}label={`${selected?.type} : ${selected?.name} `} onDelete={() => { handleDelete(selected) }} /><br/>&nbsp;</>
            }
            <Card><CardContent style={{fontWeight:700}}>Project Name : {data1.project_name}</CardContent> </Card><br/>
            <Typography style={{fontWeight:500,marginLeft:2}}>Circles : ({count})</Typography> 
           
            <Stack direction="row" spacing={1} flexShrink={0} sx={{ my: 1 }}>
           
                <Circledrawer
                    clcikData={clcikData}
                    isOpenFilter={openFilter}
                    onOpenFilter={handleOpenFilter}
                    onCloseFilter={handleCloseFilter}
                    id={state?.id}
                    data1={data1}
                    head={'CM'}
                />
            </Stack>
            {
            enrolled == ""?
            <div style={{marginTop:"20%" , marginLeft:"40%"}}>
            <CircularProgress sx={{color:'#ff7424'}}/>
            </div>
            :
           
            
            enrolled?.list?.length!==0?enrolled?.list?.map((itm) => {
                return (
                    <Card style={styles.card1} onClick={() => {
                        setClickData({ name: itm?.circle_name, title: "Schedule A Circle Meeting",id:itm?.circle_id  , date: itm?.circle_date})
                        handleOpenFilter()
                    }}>
                        <Grid pt={1} pb={1} container xs={12} md={4} direction="row" alignItems="center" justifyContent="space-between" style={{ marginLeft: 15 }}>
                        <Typography variant="subtitle1" gutterBottom>
                {`  ${itm?.circle_name}`} <IconButton sx={{float:'right',position:'absolute',right:20,color:'black'}}><Iconify icon="mdi:clock-time-four-outline"></Iconify></IconButton>
              </Typography>
            </Grid>
            <Grid style={{ marginLeft: 15 }}>
              <Typography variant="subtitle2" gutterBottom>
                {`   ${itm?.circle_date}`}
              </Typography>
                        </Grid>
                    </Card>)
            }):
            <>
            <h1>No Circle Meet Found</h1>
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