import { useState, useEffect } from 'react';
import axios from 'axios'
import { Card, Stack, Chip,CardContent, Container, Typography, Grid, IconButton, CircularProgress, } from '@mui/material';
import ParticipantDrawer from '../projects/Components/ParticipantDrawer';
import { Link, useLocation } from 'react-router-dom';
import Iconify from 'src/components/Iconify';
import Searchbar from 'src/layouts/dashboard/Searchbar';
import Villagevisitdrawer from './Components/schedulevillagevisitdrawer';
import { baseURL } from 'src/utils/api';
import { useAuth } from 'src/AuthContext';
export default function scheduleVillage() {
    const { apikey } = useAuth();
    const {state} = useLocation()
    const [data1, setData1] = useState('')
    var [search, setSearch] = useState('')
    var [selected, setSelected] = useState(null)
    const [clcikData, setClickData] = useState()
    const [villageData, setVillageData] = useState('');
   const [count,setCount]=useState('')
    const searchFunction = (e) => {
        search = e
        setSearch(search)
        setSelected({ name: e, type: "Search" })
        scheduleVillage()
    }
    useEffect(() => {
        scheduleVillage();
    }, []
    )
    const [openFilter, setOpenFilter] = useState(false);
    const handleOpenFilter = () => {
        setOpenFilter(true);
    };
    const handleCloseFilter = () => {
        setOpenFilter(false);
    };
    const scheduleVillage = async =>{
        var role = JSON.parse(sessionStorage?.getItem('userDetails'))?.role
        var idvalue = JSON.parse(sessionStorage?.getItem('userDetails'))?.id;
        var data = JSON.stringify({
          "search": search,
          "project_id": state?.id,
          "emp_id": idvalue
        });
        
        var config = {
          method: 'post',
          url: baseURL+'getGFAssignedBatch',
          headers: { 
            'Content-Type': 'application/json',
            'Authorization': `${apikey}`
          },
          data : data
        };
          
          axios(config)
          .then(function (response) {
            setVillageData(response.data)
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
     scheduleVillage();
  }
    return (
        <Container> <Searchbar getSearch={(e) => searchFunction(e)} />
            <Stack direction="row" alignItems="center" justifyContent="space-between" mb={5}>
                <Typography variant="h5" gutterBottom>
                    <Link to="/dashboard/projects/project">
                        <IconButton>
                            <Iconify icon="material-symbols:arrow-back-rounded" />
                        </IconButton></Link>
                    Schedule Village Visit 
                </Typography>
            </Stack> 
             {
                    selected && <> <Chip style={{ backgroundColor: '#ffd796', color: '#000' }}label={`${selected?.type} : ${selected?.name} `} onDelete={() => { handleDelete(selected) }} /><br/>&nbsp;</>
            }
            <Card><CardContent style={{fontWeight:700}}>Project Name : {data1.project_name}</CardContent> </Card><br/>
            <Typography style={{ fontWeight: 500, marginLeft: 2 }}>Villages : ({count})</Typography>
            {/* <Stack direction="row" flexWrap="wrap-reverse" alignItems="center" justifyContent="flex-end" sx={{ mb: 5 }}> */}
            <Stack direction="row" spacing={1} flexShrink={0} sx={{ my: 1 }}>
                <Villagevisitdrawer
                    clcikData={clcikData}
                    isOpenFilter={openFilter}
                    onOpenFilter={handleOpenFilter}
                    onCloseFilter={handleCloseFilter}
                    id={state?.id}
                />
            </Stack>
            {/* </Stack> */}
            {
            
            villageData == ""?
            <div style={{marginTop:"20%" , marginLeft:"40%"}}>
            <CircularProgress sx={{color:'#ff7424'}}/>
            </div>
            :
            villageData?.list?.length!==0?villageData?.list?.map((itm) => {
                return (
                    <Card style={styles.card1} onClick={() => {
                        setClickData({ name: itm.training_batch_name, title: "Schedule a Village visit",id:itm?.training_batch_id })
                        handleOpenFilter()
                    }}>
                        <Grid pt={1} pb={1} container xs={12} md={4} direction="row" alignItems="center" justifyContent="space-between" style={{ marginLeft: 15}}>
                          <Typography variant="subtitle1" gutterBottom>
                                {` ${itm?.training_batch_name}`}
                            </Typography>
                        </Grid>
                      
                    </Card>)
              }):
              <>
              <h1>No Schedule Village Visit Found</h1>
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