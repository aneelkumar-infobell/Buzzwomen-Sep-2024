import { useState, useEffect, forwardRef } from 'react';
import axios from 'axios';
import PropTypes from 'prop-types';
import { Grid, Container, Stack, Typography, Box, CardContent, Card, Chip, Icon, IconButton, Button, Snackbar, CircularProgress } from '@mui/material';
import Tabs from '@mui/material/Tabs';
import Pagination from '@mui/material/Pagination';
import Tab from '@mui/material/Tab';
import Page from '../../components/Page';
import Iconify from '../../components/Iconify';
import { Link } from 'react-router-dom';
import AddProject from './Addproject';
import FiltersHome from '../Filters/FiltersHome';
import MuiAlert, { AlertProps } from '@mui/material/Alert';
import Searchbar from 'src/layouts/dashboard/Searchbar';
import { baseURL } from 'src/utils/api';
import { useAuth } from 'src/AuthContext';
function TabPanel(props) {
    const { children, value, index, ...other } = props;
    return (
        <div
            role="tabpanel"
            hidden={value !== index}
            id={`simple-tabpanel-${index}`}
            aria-labelledby={`simple-tab-${index}`}
            {...other}
        >
            {value === index && (
                <Box sx={{ p: 3 }}>
                    <Typography>{children}</Typography>
                </Box>
            )}
        </div>
    );
}
TabPanel.propTypes = {
    children: PropTypes.node,
    index: PropTypes.number.isRequired,
    value: PropTypes.number.isRequired,
};
function a11yProps(index) {
    return {
        id: `simple-tab-${index}`,
        'aria-controls': `simple-tabpanel-${index}`,
    };
}
export default function AllProjects({ handleClickOpen, handleClose, open }) {
      const { apikey } = useAuth();
    var userAccess = ['2']
    const callOpenFunction = (id) => {
        sessionStorage.setItem("proId", id)
        handleClickOpen()
    }
    var userIdCheck = sessionStorage?.getItem('userId')
    var userDetails = JSON.parse(sessionStorage?.getItem('userDetails'))
    var [page, setPage] = useState(1)
    const [value, setValue] = useState(0);
    const [projects, setProjects] = useState([])
    const [publishedProject, setPublishedProject] = useState([])
    const [completedProject, setCompletedProject] = useState([])
    const [inProgressProjects,setInProgressProjects]=useState([])
    const [openFilter, setOpenFilter] = useState(false);
    var [search, setSearch] = useState('')
    var [selected, setSelected] = useState(null)
    const [loader, setLoader] = useState(false);
    const [count, setCount] = useState('')
    const [openMessage, setOpenMessage] = useState(false);
    const [message, setMessage] = useState(false)
    const [countCompleted, setCountCompleted] = useState('')
    const [countPublished, setCountPublished] = useState('')
    const [countInprogress,setCountInprogress]=useState('');
    const pageChange = (event, newPage) => {
        page = newPage
        setPage(page);
        projectr()
    }
    const handleOpenFilter = () => {
        setOpenFilter(true);
    };
    const handleCloseFilter = () => {
        setOpenFilter(false);
    };
    const handleChange = (event, newValue) => {
        setValue(newValue);
    };
    useEffect(() => {
        projectr()
    }, []
    )
    const projectr = async (i, id, g) => {
        setLoader(true);
var data ={}
        {(id==4)? 
             data = JSON.stringify({
            "search": search,
            "id": userDetails?.id,
            "role_id": userIdCheck,
            "filter_id": 0,
            "type": "",
            "pageNum": page,
            "operations_manager_id": g ? "" : id === 4 ? i?.id : null,
         }):(id==5)?
        data = JSON.stringify({
            "search": search,
            "id": userDetails?.id,
            "role_id": userIdCheck,
            "filter_id": 0,
            "type": "",
            "pageNum": page,
            "trainer_id": g ? "" : id === 5 ? i?.id : null,
        }):(id==13)? data = JSON.stringify({
            "search": search,
            "id": userDetails?.id,
            "role_id": userIdCheck,
            "filter_id": 0,
            "type": "",
            "pageNum": page,
            "gelathi_id":g?"":id==13?i?.id:null
        }): 
       (g=='date') ?
       data = JSON.stringify({
            end_date: g === "date" ? id : '',
            start_date: g === "date" ? i: '',
            "search": search,
            "id": userDetails?.id,
            "role_id": userIdCheck,
            "filter_id": 0,
            "type": "",
            "pageNum": page,
            
           
        })
        :(i?.type=='custom')?  
       
        data = JSON.stringify({
            end_date: i?.endDate,
            start_date: i?.startDate,
            "search": search,
            "id": userDetails?.id,
            "role_id": userIdCheck,
            "filter_id": 0,
            "type": "",
            "pageNum": page,
            // count: count,
            taluk_id: JSON.stringify(i?.taluk_id),
            district_id:JSON.stringify(i?.district?.id),
            districtName:i?.district?.name,
            "funder_id": i?.funder?.id,
            funder_name:i?.funder?.name,
            operations_manager_id:i?.opsManager?.id,
            operations_manager_name:i?.opsManager?.name,
            "trainerId":i?.trainer?.id,
            "gelathiId":i?.gelathi?.id,
           
        }) 
        :
        data = JSON.stringify({
            end_date: g === "date" ? id : null,
            start_date: g === "date" ? i : null,
            "search": search,
            "id": userDetails?.id,
            "role_id": userIdCheck,
            "filter_id": 0,
            "type": "",
            "pageNum": page,
            // count: count,
            taluk_id: g === "country" ? JSON.stringify(id ): null,
            district_id: g === "country" ? JSON.stringify(i) : null,
            "funder_id": id === 2 ? i?.id : null,
            "opsManager":id===4?i?.id:null,
            "trainerId":g?"":id===5?i?.id:null,
            "gelathiId":g?"":id===13?i?.id:null,
            "partner_id": g ? "" : id === 1 ? i?.id : null,
           
        })
    }
        const config = {
            method: 'post',
            url: baseURL + 'getProjects',
            headers: { 
                'Content-Type': 'application/json',
                'Authorization': `${apikey}`
            },
            data
        };
        axios(config)
            .then((response) => {
                setLoader(false);
                setCount(response.data.count % 25 == 0 ? parseInt(response.data.count / 25) : parseInt(response.data.count / 25) + 1)
                setProjects(response.data.list)
                let published = response.data.list.filter(r => r.project_status_name == 'Published')
                setCountPublished(published?.length % 25 == 0 ? parseInt(published?.length / 25) : parseInt(published?.length / 25) + 1)
                setPublishedProject(published)
               
                let completed = response.data.list.filter(r => r.project_status_name == 'Completed')
                setCountCompleted(completed?.length % 25 == 0 ? parseInt(completed?.length / 25) : parseInt(completed?.length / 25) + 1)
                setCompletedProject(completed)
                let inprogress = response.data.list.filter(r=>r.project_status_name == 'In Progress')
                setCountInprogress(inprogress?.length % 25 ==0 ? parseInt(inprogress?.length / 25): parseInt(inprogress?.length / 25 ) + 1)
                setInProgressProjects(inprogress)
               
            })
            .catch((error) => {
                // console.log(error);
            });
    }
    if (loader) {
        return (
          <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '70vh' }}>
            <CircularProgress sx={{color:'#ff7424'}}/>
          </Box>
        );
      }
    const getData = (itm, i) => {
        setOpenFilter(false);
        setSelected(itm)
        projectr(itm, i)
    }
    const onSumbit = (e, i) => {
        setSelected({ type: 'Location', name: ` ${e?.stateName} ; District : ${e?.districtName} ; Taluk : ${e?.talukName}` })
        handleCloseFilter()
        projectr(e?.district_id, e?.talaq_id, "country")
    }
    const onDateSubmit = (e) => {
        setSelected({ type: 'Date Range', name: `${e?.startDate} - ${e?.endDate}` })
        projectr(e?.startDate, e?.endDate, "date")
        setOpenFilter(false);
    }
    const onDatasubmit=(e)=>{
        setSelected({type:'Custom Filter',name: `District: ${e?.district?.name};Taluk:${e?.talaq?.name} ; From: ${e?.startDate} to:${e?.endDate}`})
        handleCloseFilter()
        projectr(e,"custom")
    }
    const searchFunction = (e) => {
        page = 1
        setPage(page)
        search = e
        setSearch(search)
        setSelected({ name: e, type: "Search" })
        projectr()
    }
    const resetProjects = () => {
        setSelected(null)
        setSearch('')
        projectr()
    }
    const handleDelete = () => {
        setSelected(null)
        search = ''
        setSearch(search)
        page = 1
        setPage(page)
        projectr();
    }
    const Alert = forwardRef(function Alert(props, ref) {
        return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
    });
    return (
        <Page title="Dashboard: Projects">
            <Snackbar open={openMessage} autoHideDuration={6000} onClose={() => setOpenMessage(false)} id="alertmessage">
                <Alert onClose={() => { setOpenMessage(false) }} severity="success" sx={{ width: '100%' }}>
                    {message}
                </Alert>
            </Snackbar>
            <Searchbar getSearch={(e) => searchFunction(e)} id="search-bar"/>
            <Container>
                <Typography variant="h4" sx={{ mb: 5 }}>
                    All Projects    <Button style={{ float: "right", color: '#ff7424' }} id="filter"
                        sx={{
                            '&:hover': {
                                backgroundColor: '#ffd796',
                            },
                        }}
                        onClick={() => {
                            handleOpenFilter()
                        }}
                    >
                        Filter
                    </Button>
                </Typography>
                { selected &&  ( selected?.type=='Location' || selected?.type=='Date Range') &&  <Chip style={{ backgroundColor: '#ffd796', color: '#000' }}label={`${selected?.type} : ${selected?.name} `} onDelete={() => { handleDelete(selected) }} /> }
                  
                { selected  && ( selected?.type=='Funder' || selected?.type=='Operation Manager' || selected?.type=='Trainers' || selected?.type=='Field Associate' ) &&  <Chip style={{ backgroundColor: '#ffd796', color: '#000' }}label={`${selected?.type} : ${selected?.first_name} `} onDelete={() => { handleDelete(selected) }} /> }
         
                {selected && (selected?.type=='Custom Filter') &&  <Chip style={{ backgroundColor: '#ffd796', color: '#000' }}label={`${selected?.type}:${selected?.name}`} onDelete={() => { handleDelete(selected) }}/> }
                {selected && (selected?.type=='Search') && <Chip style={{ backgroundColor: '#ffd796', color: '#000' }}label={`${selected?.type}:${selected?.name}`} onDelete={() => { handleDelete(selected) }}/>}
             
                <Stack direction="row" spacing={1} flexShrink={0} sx={{ my: 1 }}>
                    <FiltersHome
                        type="Projects"
                        onSumbit={onSumbit}
                        onDateSubmit={onDateSubmit}
                        resetProjects={resetProjects}
                        getData={getData}
                        onDatasubmit={onDatasubmit}
                        isOpenFilter={openFilter}
                        projectr={projectr}
                        onOpenFilter={handleOpenFilter}
                        onCloseFilter={handleCloseFilter}
                    />
                </Stack>
                <Stack direction="row" spacing={1} flexShrink={0} sx={{ my: 1 }}>
                    <Box sx={{ width: '100%' }}>
                        <Box sx={{ borderBottom: 1, borderColor: 'divider' }} >
                            <Tabs variant="fullWidth" value={value} onChange={handleChange} indicatorColor="warning"
                                aria-label="basic tabs example">
                                <Tab id="All_projects"
                                    sx={{
                                        ':hover': {
                                            bgcolor: '#ffd796', // theme.palette.primary.main
                                            color: '#ff7424',
                                        },
                                        color: 'black',
                                        minWidth:'auto'
                                    }} label="All" {...a11yProps(0)} style={value == 0 ? {
                                        borderBottom: '3px solid #ff7424',
                                        color: "#ff7424",
                                    } : null} />
                                <Tab id="Published"
                                    sx={{
                                        ':hover': {
                                            bgcolor: '#ffd796', // theme.palette.primary.main
                                            color: '#ff7424',
                                        },
                                        color: 'black',
                                        minWidth:'auto',
                                    }} style={value == 1 ? {
                                        borderBottom: '3px solid #ff7424',
                                        color: "#ff7424",
                                    } : null} label="Published" {...a11yProps(1)} />
                                <Tab id="completed"
                                    sx={{
                                        ':hover': {
                                            bgcolor: '#ffd796', // theme.palette.primary.main
                                            color: '#ff7424',
                                        },
                                        color: 'black',
                                        minWidth:'auto'
                                    }} label="Completed" {...a11yProps(2)} style={value == 2 ? {
                                        borderBottom: '3px solid #ff7424',
                                        color: "#ff7424",
                                    } : null} />
                                      <Tab id="In Progress"
                                    sx={{
                                        ':hover': {
                                            bgcolor: '#ffd796', // theme.palette.primary.main
                                            color: '#ff7424',
                                        },
                                        color: 'black',
                                        minWidth:'auto'
                                    }} label="In Progress" {...a11yProps(3)} style={value == 3 ? {
                                        borderBottom: '3px solid #ff7424',
                                        color: "#ff7424",
                                    } : null} />
                            </Tabs>
                        </Box>
                        <TabPanel value={value} index={0}>
                            {projects == []?
                            <div >
<CircularProgress sx={{color:'#ff7424'}}/>
                            </div>
                            :   projects?.length > 0 ? 
                                <>
                                         {projects.map((p) => (
        <Link to="/dashboard/projects/project" style={{ textDecoration: 'none' }}>
          <Card onClick={() => { callOpenFunction(p.id) }}>
            <CardContent>
              <Typography variant='h6'>{p?.name}</Typography>
              <Grid container direction="row" spacing={2} alignItems="center">
                <Grid item xs={12} md={6}>
                  <Typography variant='body1'>{p?.location_name}</Typography>
                </Grid>
                <Grid item xs={12} md={6}>
                  <Stack direction="row" flexWrap="wrap" justifyContent="flex-end" alignItems="center" marginTop={-1}>
                    {p?.project_status_name === 'Completed' ? (
                      <Chip style={{ backgroundColor: 'green', color: '#fff' }} label={p?.project_status_name} size="small" color="success" variant="contained" />
                    ) : p?.project_status_name === 'Published' ? (
                      <Chip style={{ backgroundColor: '#ffd796', color: '#000' }} label={p?.project_status_name} size="small" color="secondary" variant="contained" />
                    ) : p?.project_status_name === 'In Progress' ? (
                      <Chip style={{ backgroundColor: 'orange', color: '#000' }} label={p?.project_status_name} size="small" variant="contained" />
                    ) : (
                      <Chip style={{ backgroundColor: '#ffd796', color: '#000' }} label={p?.project_status_name} size="small" variant="contained" />
                    )}
                  </Stack>
                </Grid>
              </Grid>
            </CardContent>
          </Card><br />
        </Link>
      ))}

                                    {/* {
                                        <Pagination page={page} onChange={pageChange} rowsPerPage={25} count={count} variant="contained" color="warning" sx={{ color: "#ffd796" }} style={{ float: "right" }} />
                                    } */}
                                    </> :
                                    <h2 style={{ textAlign: "center", color: "black" }}><br />No Projects</h2>
                            }
                        </TabPanel>
                        <TabPanel value={value} index={1}>
                            {
                                publishedProject?.length > 0 ? <>
                                    {publishedProject.map(p => <Link to="/dashboard/projects/project" style={{ textDecoration: 'none' }}>
                                        <Card onClick={() => { callOpenFunction(p.id) }}>
                                            <CardContent>
                                                <Typography variant='h6'>{p?.name}</Typography>
                                                <Grid container direction="row" spacing={2} alignItems="center">
                                                <Grid item xs={12} md={6}>
                  <Typography variant='body1'>{p?.location_name}</Typography>
                </Grid>    
                                                    <Grid item xs={12} md={6}>
                                      <Stack direction="row" flexWrap="wrap" justifyContent="flex-end" alignItems="center" marginTop={-1}>
                                                    {( p?.project_status_name=='Completed')? <Chip style={{ backgroundColor: 'green', color: '#fff' }} label={p?.project_status_name} size="small" color="success" variant="contained" />:(p?.project_status_name=='Published')? <Chip style={{ backgroundColor: '#ffd796', color: '#000' }}label={p?.project_status_name} size="small" color="secondary" variant="contained" />: <Chip style={{ backgroundColor: '#ffd796', color: '#000' }}label={p?.project_status_name} size="small" color="error" variant="contained" />}
                                                    </Stack></Grid>
                                                    </Grid>
                                              
                                            </CardContent>
                                        </Card><br />
                                    </Link>)}
                                    {/* {
                                        <Pagination page={page} onChange={pageChange} rowsPerPage={25} count={countPublished} variant="contained" color="warning" sx={{ color: "#ffd796" }} style={{ float: "right" }} />
                                    } */}
                                    </> :
                                    <h2 style={{ textAlign: "center", color: "black" }}><br />No Projects</h2>
                            }
                        </TabPanel>
                        <TabPanel value={value} index={2}>
                            {
                                completedProject?.length > 0 ? <>
                                      {completedProject.map((p) => (
        <Link to="/dashboard/projects/project" style={{ textDecoration: 'none' }}>
          <Card onClick={() => { callOpenFunction(p.id) }}>
            <CardContent>
              <Typography variant='h6'>{p?.name}</Typography>
              <Grid container spacing={2}>
                <Grid item xs={12} md={6}>
                  <Typography variant='body1'>{p?.location_name}</Typography>
                </Grid>
                <Grid item xs={12} md={6}>
                  <Stack direction="row" justifyContent="flex-end" alignItems="center">
                    {p?.project_status_name === 'Completed' ? (
                      <Chip style={{ backgroundColor: 'green', color: '#fff' }} label={p?.project_status_name} size="small" color="success" variant="contained" />
                    ) : p?.project_status_name === 'Published' ? (
                      <Chip style={{ backgroundColor: '#ffd796', color: '#000' }} label={p?.project_status_name} size="small" color="secondary" variant="contained" />
                    ) : (
                      <Chip style={{ backgroundColor: '#ffd796', color: '#000' }} label={p?.project_status_name} size="small" color="error" variant="contained" />
                    )}
                  </Stack>
                </Grid>
              </Grid>
            </CardContent>
          </Card><br />
        </Link>
      ))}
                                    {/* {
                                        <Pagination page={page} onChange={pageChange} rowsPerPage={25} count={countCompleted} variant="contained" color="warning" sx={{ color: "#ffd796" }} style={{ float: "right" }} />
                                    } */}
                                </> :
                                    <h2 style={{ textAlign: "center", color: "black" }}><br />No Projects</h2>
                            }
                        </TabPanel>
                        <TabPanel value={value} index={3}>
                            {
                                inProgressProjects?.length > 0 ? <>
                                       {inProgressProjects.map((p) => (
        <Link to="/dashboard/projects/project" style={{ textDecoration: 'none' }}>
          <Card onClick={() => { callOpenFunction(p.id) }}>
            <CardContent>
              <Typography variant='h6'>{p?.name}</Typography>
              <Grid container direction="row" spacing={2} alignItems="center">
                <Grid item xs={12} md={6}>
                  <Typography variant='body1'>{p?.location_name}</Typography>
                </Grid>
                <Grid item xs={12} md={6}>
                  <Stack direction="row" justifyContent="flex-end" alignItems="center">
                    {p?.project_status_name === 'In Progress' ? (
                      <Chip style={{ backgroundColor: 'orange', color: '#fff' }} label={p?.project_status_name} size="small" variant="contained" />
                    ) : null}
                  </Stack>
                </Grid>
              </Grid>
            </CardContent>
          </Card><br />
        </Link>
      ))}
                                    {/* {
                                        <Pagination page={page} onChange={pageChange} rowsPerPage={25} count={countInprogress} variant="contained" color="warning" sx={{ color: "#ffd796" }} style={{ float: "right" }} />
                                    } */}
                                </> :
                                    <h2 style={{ textAlign: "center", color: "black" }}><br />No Projects</h2>
                            }
                        </TabPanel>
                     
                    </Box>
                </Stack>
                {userAccess.includes(userIdCheck) &&
                    <Stack direction="row" spacing={1} flexShrink={0} sx={{ my: 1 }}>
                        <AddProject viewMessage={(text) => {
                            setMessage(text)
                            setOpenMessage(true)
                        }} />
                    </Stack>
                }
            </Container>
        </Page >
    );
}