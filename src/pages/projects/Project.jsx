import React, { useState, useEffect } from 'react';
import axios from 'axios';
import {
  Button,
  ButtonGroup,
  Card,
  Grid,
  Stack,
  CardContent,
  Container,
  TableBody,
  IconButton,
  TableCell,
  TableRow,
  Typography,
  TableContainer,
  Table,
} from '@mui/material';
import Iconify from 'src/components/Iconify';
import Page from 'src/components/Page';
import { Link, useLocation } from 'react-router-dom';
import { Box } from '@mui/system';
import CreateTrainerBatch from './Components/CreateTrainerBatch';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import Peopleprofile from './Components/projectpeopleprofile';
import Gelathifacilitatorlist from './Components/Gelathifacilitatorslist';
import Trainerslist from './Components/Trainerslist';
import Collapse from '@mui/material/Collapse';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { styled } from '@mui/material/styles';
import CreateProj from './Components/CreateProj';
import BusCheckList from '../BusCheckList';
import { baseURL} from 'src/utils/api';
import { useAuth } from 'src/AuthContext';
const ExpandMore = styled((props) => {
  const { expand, ...other } = props;
  return <IconButton {...other} />;
})(({ theme, expand }) => ({}));
function Project(props) {
    const { apikey } = useAuth();
  const location = useLocation();
  const [openFilter, setOpenFilter] = useState(false);
  const userDetails = sessionStorage?.getItem('userId');
  const [data1, setData1] = useState('');
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [anchorE2, setAnchorE2] = React.useState(null);
  const [anchorE3, setAnchorE3] = React.useState(null);
  const [anchorE4, setAnchorE4] = React.useState(null);
  const [anchorE5, setAnchorE5] = React.useState(null);
  const [anchorE6, setAnchorE6] = React.useState(null);
  const [circlemeeting, setCirclemeeting] = React.useState(null);
  
  const open = Boolean(anchorEl);
  const cm = Boolean(circlemeeting);
  const open2 = Boolean(anchorE2);
  const open3 = Boolean(anchorE3);
  const open4 = Boolean(anchorE4);
  const open5 = Boolean(anchorE5);
  const open6 = Boolean(anchorE6);
 ;
  const [expanded, setExpanded] = React.useState(false);
  const [edit, setEdit] = useState(false);
  const [projectDetails, setProjectDetails] = useState({
    projectName: 'BANGARAPETCI19102',
    districtName: 'Kolar',
    partnerName: 'CDPO',
    trainingTarget: '2879',
    projectDuration: ' From: 01 - 04 - 2019 To: 31 - 03 - 2020',
    projectStatus: 'Completed',
  });
  const handleExpandClick = () => {
    setExpanded(!expanded);
  };
 
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const spoorthiHandleClick= (event) => {
    setAnchorE2(event.currentTarget);
  };
  const greenHandleClick= (event) => {
    setAnchorE3(event.currentTarget);
  };
  const vyaparHandleClick= (event) => {
    setAnchorE4(event.currentTarget);
  };
  const nagarikaHandleClick= (event) => {
    setAnchorE6(event.currentTarget);
  };
  const villageVisitHandleClick= (event) => {
    setAnchorE5(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  const spoorthiHandleClose = () => {
    setAnchorE2(null);
  };
  const greenHandleClose = () => {
    setAnchorE3(null);
  };
  const vyaparHandleClose = () => {
    setAnchorE4(null);
  };
  const nagarikaHandleClose = () => {
    setAnchorE6(null);
  };
  const villageVisitHandleClose = () => {
    setAnchorE5(null);
  };
 
  const handleCircleClick = (event) => {
    setCirclemeeting(event.currentTarget);
  };
  const handleCircleClose = () => {
    setCirclemeeting(null);
  };
  const handleOpenFilter = () => {
    setOpenFilter(true);
  };
  const handleCloseFilter = () => {
    setOpenFilter(false);
  };
  const id = sessionStorage?.getItem('proId');
  useEffect(() => {
    projData();
  }, []);
  const viewUser = (itm) => {
    sessionStorage.setItem('profiledetails', JSON.stringify(itm));
    handleOpenFilter();
  };
  const viewPeople = (item) => {
    sessionStorage.setItem('profiledetails', JSON.stringify({ emp_id: item }));
    handleOpenFilter();
  };
  const roleid = JSON.parse(sessionStorage.getItem('userDetails'))?.role;
  const projData = (async) => {
    var userDetails = JSON.parse(sessionStorage?.getItem('userDetails'));
    var role = JSON.parse(sessionStorage?.getItem('userDetails'))?.role;
    var idvalue = JSON.parse(sessionStorage?.getItem('userDetails'))?.id;
    var data = JSON.stringify({
      project_id: id,
      role_id: role,
      emp_id: idvalue,
    });
    var config = {
      method: 'post',
      url: baseURL + 'getProjectData',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `${apikey}`
      },
      data: data,
    };
    axios(config)
      .then(function (response) {
        setData1({ ...response.data.list });
      })
      .catch(function (error) {
        // console.log(error);
      });
  };
  const styles = {
    buttonStyle: {
      boxShadow: 'none',
      borderRadius: '7px',
      backgroundColor: '#edeff1',
      fontWeight: 500,
      textAlign: 'left',
    },
    tableRowStyle: { justifyContent: 'center', alignItems: 'center', marginLeft: 200 },
    linkStyle: { textDecoration: 'none', color: 'black' },
    cirleMeetingbuttonStyle: { boxShadow: "none", borderRadius: "7px", backgroundColor: "#edeff1", fontWeight: 500, textAlign: "left", marginTop:"20px" },
  };
  const addIcon = (
    <IconButton>
      <Iconify style={{ color: '#6d7c89' }} icon="material-symbols:add" />
    </IconButton>
  );
const [openbusChecklist,setOpenBusChecklist] = useState(false);

  const handlebusChecklist=()=>{
    setOpenBusChecklist(true)
  }

  const userrole = JSON.parse(sessionStorage.getItem('userDetails'))?.trainer_type;
  return (
    <div>
      <Page title="Dashboard: Project">
        <Container>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={12} md={7}>
              <Typography variant="h4" sx={{ mb: 5 }}>
                <Link to="/dashboard/projects">
                  <IconButton>
                    <Iconify icon="material-symbols:arrow-back-rounded" />
                  </IconButton>
                </Link>
                <span> Project </span>
                {userDetails == 2 ? (
                  <Button
                    sx={{
                      '&:hover': {
                        backgroundColor: '#ffffff',
                      },
                      '&:focus': {
                        backgroundColor: 'white',
                      },
                    }}
                    style={{ float: 'right', color: '#ff7424', position: 'absolute', right: 0, marginRight: '125px' }}
                    onClick={() => {
                      setEdit(true);
                    }}
                  >
                    Edit
                  </Button>
                ) : null}
              </Typography>
              <Card>
                <TableContainer>
                  <Table aria-label="customized table">
                    <TableBody>
                      <TableRow style={styles.tableRowStyle}>
                        <TableCell>Project Name </TableCell>
                        <TableCell>:&nbsp; {data1.project_name} </TableCell>
                      </TableRow>
                      <TableRow style={styles.tableRowStyle}>
                        <TableCell>District Name</TableCell>
                        <TableCell>:&nbsp; {data1.location_name} </TableCell>
                      </TableRow>
                      <TableRow style={styles.tableRowStyle}>
                        <TableCell>Partner Name </TableCell>
                        <TableCell>:&nbsp; {data1.partnerName} </TableCell>
                      </TableRow>
                      {roleid == 1 || roleid == 2 || roleid == 3 || roleid == 4 || roleid == 12 || roleid == 5 ? (
                        <TableRow style={styles.tableRowStyle}>
                          <TableCell>Training Target</TableCell>
                          <TableCell>:&nbsp; {data1.training_target} </TableCell>
                        </TableRow>
                      ) : null}
                      <TableRow style={styles.tableRowStyle}>
                        <TableCell>Project Duration</TableCell>
                        <TableCell>
                          {' '}
                          :&nbsp; From : {data1.startDate}
                          <br />
                          &nbsp;&nbsp;&nbsp;To : {data1.endDate}
                        </TableCell>
                      </TableRow>
                      <TableRow style={styles.tableRowStyle}>
                        <TableCell>Project Status </TableCell>
                        <TableCell>:&nbsp; {data1.project_status} </TableCell>
                      </TableRow>
                    </TableBody>
                  </Table>
                </TableContainer>
              </Card>
              <br></br>
              {userDetails == 1 ||
              userDetails == 2 ||
              userDetails == 3 ||
              userDetails == 4 ||
              userDetails == 5 ||
              userDetails == 6 ||
              userDetails == 13 ||
              userDetails == 12 ? (
                <Card sx={{ width: '100%' }}>
                  <CardContent>
                    Project Team :
                    <ExpandMore
                      expand={expanded}
                      onClick={handleExpandClick}
                      aria-expanded={expanded}
                      aria-label="show more"
                    >
                      <ExpandMoreIcon />
                    </ExpandMore>
                    <Collapse in={expanded} timeout="auto" unmountOnExit>
                      {data1?.projectPeoplesList?.map((item, index) => (
                        <Card
                          value={item?.emp_id}
                          style={{ cursor: 'pointer', margin: 10, padding: 10 }}
                          onClick={() => viewUser(item, index)}
                        >
                          <span style={{ fontWeight: 700 }}>
                            {item.emp_name}
                            <Iconify
                              style={{ color: 'black', float: 'right', width: 20, height: 20 }}
                              icon="fluent:notebook-eye-20-filled"
                            />
                          </span>
                          <br></br>
                          {item?.role}&nbsp;
                        </Card>
                      ))}
                    </Collapse>
                  </CardContent>
                </Card>
              ) : null}
              {userDetails == 12 ? (
                <>
                  <Card
                    sx={{ width: '95%' }}
                    value={data1?.operations_manager_id}
                    style={{
                      cursor: 'pointer',
                      margin: 20,
                      marginLeft: 1,
                      paddingTop: 16,
                      paddingBottom: 15,
                      borderRadius: 0,
                      paddingLeft: 6,
                    }}
                    onClick={() => viewPeople(data1?.operations_manager_id)}
                  >
                    <span>{data1?.operations_manager_name}</span>
                  </Card>
                  <Card
                    sx={{ width: '95%' }}
                    style={{
                      cursor: 'pointer',
                      margin: 20,
                      marginLeft: 1,
                      paddingTop: 16,
                      paddingBottom: 15,
                      borderRadius: 0,
                      paddingLeft: 6,
                    }}
                  >
                    <span> My Poa</span>
                  </Card>
                  <Card
                    sx={{ width: '95%' }}
                    style={{
                      cursor: 'pointer',
                      margin: 20,
                      marginLeft: 1,
                      paddingTop: 16,
                      paddingBottom: 15,
                      borderRadius: 0,
                      paddingLeft: 6,
                    }}
                  >
                    <Box sx={{ display: 'flex', flexDirection: 'column' }}>
                      Trainers({data1?.trainers_count}) <Trainerslist />
                    </Box>{' '}
                  </Card>
                  <Card
                    sx={{ width: '95%' }}
                    style={{
                      cursor: 'pointer',
                      margin: 20,
                      marginLeft: 1,
                      paddingTop: 16,
                      paddingBottom: 15,
                      borderRadius: 0,
                      paddingLeft: 6,
                      paddingRight: 1,
                    }}
                  >
                    <Box sx={{ display: 'flex', flexDirection: 'column' }}>
                      Field Associates({data1?.gelathiFacilitator_count}) <Gelathifacilitatorlist />{' '}
                    </Box>
                  </Card>
                  <Card
                    sx={{ width: '95%' }}
                    style={{
                      cursor: 'pointer',
                      margin: 20,
                      marginLeft: 1,
                      paddingTop: 16,
                      paddingBottom: 15,
                      borderRadius: 0,
                      paddingLeft: 6,
                    }}
                    onClick={() => viewPeople(data1?.driverId)}
                  >
                    <span>Driver: {data1?.driver_name}</span>
                  </Card>
                </>
              ) : null}
            </Grid>
            {edit && (
              <CreateProj
                edit={true}
                createPro={edit}
                sendData={data1}
                setCreatePro={(e) => setEdit(e)}
                projData={projData}
                
              />
            )}
            <Stack direction="row" spacing={1} flexShrink={0} sx={{ mb: 1 }}>
              <Peopleprofile
                isOpenFilter={openFilter}
                onOpenFilter={handleOpenFilter}
                onCloseFilter={handleCloseFilter}
              />
            </Stack>
            <Grid item xs={12} sm={12} md={5}>
              <Box display="flex" justifyContent="center" alignItems="center" minHeight="10vh" marginTop="80px">
                <ButtonGroup orientation="vertical" style={{ boxShadow: 'none', borderRadius: '0px' }} elevation={0}>
                  {(userDetails == 1 || userDetails == 4 || userDetails == 3 || userDetails == 2 || userDetails == 12) ? 
                  (
                    <Link to="/dashboard/projects/busTest" state={{ id: data1?.bus_id }} style={styles.linkStyle}>
                      <Button
                        variant="secondary"
                        style={styles.buttonStyle}
                        endIcon={
                          <IconButton>
                            <Iconify style={{ color: 'black' }} icon="material-symbols:add" />
                          </IconButton>
                        }
                      >
                        <span style={{ width: '235px' }}>Bus&nbsp;{data1?.bus_number} & check List</span>
                      </Button>
                    </Link>
                  ) : (userrole=='senior')? <Button
                  variant="secondary"
                  style={styles.buttonStyle}
          
                  // endIcon={
                  //   <IconButton>
                  //     <Iconify style={{ color: 'black' }} icon="material-symbols:add" />
                  //   </IconButton>
                  // }

                >
                  <span style={{ display:'flex' }}>Bus&nbsp;:&nbsp;{data1?.bus_number} & check List 
                  <div style={{marginLeft:'37px'}}><BusCheckList data1={data1}/></div></span>
                </Button>:null}

                  {userDetails == 1 || userDetails == 4 || userDetails == 3 || userDetails == 2 || userDetails == 12 ? (
                    <br />
                  ) : (userrole=='senior')?<br/>:null}
                  {userDetails == 1 || userDetails == 4 || userDetails == 3 || userDetails == 2 || userDetails == 12 ? (
                    <Link
                      to="/dashboard/projects/materialStock"
                      state={{ id: data1?.project_id }}
                      style={styles.linkStyle}
                    >
                      <Button
                        variant="secondary"
                        style={styles.buttonStyle}
                        startIcon={
                          <IconButton>
                            <Iconify style={{ color: 'black' }} icon="material-symbols:list-alt-outline-sharp" />
                          </IconButton>
                        }
                        endIcon={
                          <IconButton>
                            <Iconify style={{ color: 'black' }} icon="material-symbols:add" />
                          </IconButton>
                        }
                      >
                        <span style={{ width: '200px' }}> Materials Stocklist</span>
                      </Button>
                    </Link>
                  ) : null}
                  {userDetails == 1 || userDetails == 4 || userDetails == 3 || userDetails == 2 || userDetails == 12 ? (
                    <br />
                  ) : null}
                  {userDetails == 1 || userDetails == 4 || userDetails == 3 || userDetails == 5 || userDetails == 12 ? (
                    <Link
                      to="/dashboard/projects/selfShakthi"
                      state={{ id: data1?.project_id, type: 'SelfShakthi', porjectId: data1?.project_id }}
                      style={styles.linkStyle}
                    >
                      <Button
                        variant="secondary"
                        style={styles.buttonStyle}
                        startIcon={
                          <IconButton>
                            <Iconify style={{ color: 'black' }} icon="mdi:bus-school" />
                          </IconButton>
                        }
                        endIcon={
                          <IconButton>
                            <Iconify style={{ color: '#6d7c89' }} icon="fluent:notebook-eye-20-filled" />
                          </IconButton>
                        }
                      >
                        <span style={{ width: '200px' }}>Self Shakthi program</span>
                      </Button>
                    </Link>
                  ) : null}
                  {userDetails == 1 || userDetails == 4 || userDetails == 3 || userDetails == 5 || userDetails == 12 ? (
                    <br />
                  ) : null}
                  {userDetails == 4 || userDetails == 12 ? (
                    <div>
                      <Link
                        to="/dashboard/projects/assigntargets"
                        state={{ id: data1?.project_id }}
                        style={styles.linkStyle}
                      >
                        <Button
                          variant="secondary"
                          style={styles.buttonStyle}
                          endIcon={
                            <IconButton>
                              <Iconify style={{ color: 'black' }} icon="material-symbols:add" />
                            </IconButton>
                          }
                          startIcon={
                            <IconButton>
                              <Iconify style={{ color: 'black' }} icon="ic:sharp-my-location" />
                            </IconButton>
                          }
                        >
                          <span style={{ width: '200px' }}>Assign Targets to trainers</span>
                        </Button>
                      </Link>
                    </div>
                  ) : null}
                  {userDetails == 4 || userDetails == 12 ? <br /> : null}
                  {userDetails == 1 ||
                  userDetails == 6 ||
                  userDetails == 4 ||
                  userDetails == 3 ||
                  userDetails == 13 ||
                  userDetails == 12 ? (
                    <Link
                      to="/dashboard/projects/gelathiProgram"
                      state={{ id: data1?.project_id }}
                      style={styles.linkStyle}
                    >
                      <Button
                        variant="secondary"
                        style={styles.buttonStyle}
                        endIcon={
                          <IconButton>
                            <Iconify style={{ color: '#6d7c89' }} icon="fluent:notebook-eye-20-filled" />
                          </IconButton>
                        }
                        startIcon={
                          <IconButton>
                            <Iconify style={{ color: 'black' }} icon="ic:sharp-spa" />
                          </IconButton>
                        }
                      >
                        <span style={{ width: '200px' }}> Gelathi Program</span>
                      </Button>
                    </Link>
                  ) : null}
                  {userDetails == 1 ||
                  userDetails == 6 ||
                  userDetails == 4 ||
                  userDetails == 3 ||
                  userDetails == 13 ||
                  userDetails == 6 ||
                  userDetails == 12 ? (
                    <br />
                  ) : null}
                  {userDetails == 13 || userDetails == 4 || userDetails == 12 ? (
                    <div>
                      <Link to="/dashboard/projects/assignbatches" style={styles.linkStyle}>
                        <Button
                          variant="secondary"
                          state={{ id: data1?.project_id }}
                          style={styles.buttonStyle}
                          endIcon={
                            <IconButton>
                              <Iconify style={{ color: 'black' }} icon="material-symbols:add" />
                            </IconButton>
                          }
                          startIcon={
                            <IconButton>
                              <Iconify style={{ color: 'black' }} icon="ic:baseline-home" />
                            </IconButton>
                          }
                        >
                          <span style={{ width: '200px' }}> Assign Villages to Field Associate</span>
                        </Button>
                      </Link>
                    </div>
                  ) : null}
                  {userDetails == 13 || userDetails == 4 || userDetails == 12 ? <br /> : null}
                  {userDetails == 1 ||
                  userDetails == 6 ||
                  userDetails == 3 ||
                  userDetails == 4 ||
                  userDetails == 13 ||
                  userDetails == 6  || userDetails == 12? (
                    <Link
                      to="/dashboard/projects/enrolledGelathi"
                      state={{ id: data1?.project_id }}
                      style={styles.linkStyle}
                    >
                      <Button
                        variant="secondary"
                        style={styles.buttonStyle}
                        startIcon={
                          <IconButton>
                            <Iconify style={{ color: 'black' }} icon="ic:round-people" />
                          </IconButton>
                        }
                        endIcon={
                          <IconButton>
                            <Iconify style={{ color: 'black' }} icon="material-symbols:add" />
                          </IconButton>
                        }
                      >
                        <span style={{ width: '200px' }}> Enrolled Gelathis</span>
                      </Button>
                    </Link>
                  ) : null}
                  {userDetails == 1 ||
                  userDetails == 6 ||
                  userDetails == 3 ||
                  userDetails == 4 ||
                  userDetails == 13 ||
                  userDetails == 6 
                  || userDetails == 12? (
                    <br />
                  ) : null}
                  {userDetails == 1 ||
                  userDetails == 6 ||
                  userDetails == 4 ||
                  userDetails == 3 ||
                  userDetails == 13 ||
                  userDetails == 12 ? (
                    <Link
                      to="/dashboard/projects/enrolledGreenMotivators"
                      state={{ id: data1?.project_id }}
                      style={styles.linkStyle}
                    >
                      <Button
                        variant="secondary"
                        style={{ ...styles.buttonStyle, color: 'green' }}
                        startIcon={
                          <IconButton>
                            <Iconify style={{ color: 'green' }} icon="mdi:user-add" />
                          </IconButton>
                        }
                        endIcon={
                          <IconButton>
                            <Iconify style={{ color: 'green' }} icon="material-symbols:add" />
                          </IconButton>
                        }
                      >
                        <span style={{ width: '200px' }}> Enrolled Green Motivators</span>
                      </Button>
                    </Link>
                  ) : null}
                  {userDetails == 1 ||
                  userDetails == 4 ||
                  userDetails == 3 ||
                  userDetails == 13 ||
                  userDetails == 6 ||
                  userDetails == 12 ? (
                    <br />
                  ) : null}
                  {userDetails == 1 ||
                  userDetails == 4 ||
                  userDetails == 3 ||
                  userDetails == 13 ||
                  userDetails == 6 ||
                  userDetails == 12 ? (
                    <Link
                      to="/dashboard/projects/enrolledVyaapar"
                      state={{ id: data1?.project_id }}
                      style={styles.linkStyle}
                    >
                      <Button
                        variant="secondary"
                        style={{ ...styles.buttonStyle, color: 'blue' }}
                        startIcon={
                          <IconButton>
                            <Iconify style={{ color: 'blue' }} icon="mdi:user-add" />
                          </IconButton>
                        }
                        endIcon={
                          <IconButton>
                            <Iconify style={{ color: 'blue' }} icon="material-symbols:add" />
                          </IconButton>
                        }
                      >
                        <span style={{ width: '200px' }}>Enrolled Vyapar</span>
                      </Button>
                    </Link>
                  ) : null}

{/* Enroll Nagarika part  */}
{/* {userDetails == 1 ||
                  userDetails == 4 ||
                  userDetails == 3 ||
                  userDetails == 13 ||
                  userDetails == 6 ||
                  userDetails == 12 ? (
                    <br />
                  ) : null} */}
{/* {userDetails == 1 ||
                  userDetails == 4 ||
                  userDetails == 3 ||
                  userDetails == 13 ||
                  userDetails == 6 ||
                  userDetails == 12 ? (
                    
                    <Link
                      to="/dashboard/projects/enrolledNagarika"
                      state={{ id: data1?.project_id }}
                      style={styles.linkStyle}
                    >
                      <Button
                        variant="secondary"
                        style={{ ...styles.buttonStyle, color: 'orange' }}
                        startIcon={
                          <IconButton>
                            <Iconify style={{ color: 'orange' }} icon="mdi:user-add" />
                          </IconButton>
                        }
                        endIcon={
                          <IconButton>
                            <Iconify style={{ color: 'orange' }} icon="material-symbols:add" />
                          </IconButton>
                        }
                      >
                        <span style={{ width: '200px' }}>Enrolled Nagarika</span>
                      </Button>
                    </Link>
                  ) : null} */}

                  {userDetails == 1 ||
                  userDetails == 6 ||
                  userDetails == 4 ||
                  userDetails == 3 ||
                  userDetails == 13 ||
                  userDetails == 12 ? (
                    <br />
                  ) : null}
                    {userDetails == 6 || userDetails == 13 ? (
                    <>
                      <span style={styles.linkStyle}>
                        <Button
                          variant="secondary"
                          style={styles.buttonStyle}
                          id="basic-button"
                          aria-controls={open5 ? 'basic-menu' : undefined}
                          aria-haspopup="true"
                          aria-expanded={open5 ? 'true' : undefined}
                          onClick={villageVisitHandleClick}
                          endIcon={<KeyboardArrowDownIcon />}
                          startIcon={
                            <IconButton>
                              {' '}
                              <Iconify style={{ color: 'black' }} icon="mdi:people-group-outline" />
                            </IconButton>
                          }
                        >
                          <span style={{ width: '210px' }}>Village visit</span>
                        </Button>
                      </span>
                      <Menu
                        anchorEl={anchorE5}
                        open={open5}
                        onClose={villageVisitHandleClose}
                        MenuListProps={{
                          'aria-labelledby': 'basic-button',
                        }}
                        style={{ justifyContent: 'flex-end' }}
                      >
                        <MenuItem>
                          <Link
                            to="/dashboard/projects/scheduleVillage"
                            state={{ id: data1?.project_id, name: data1?.project_name }}
                            style={styles.linkStyle}
                          >
                            <Button
                              variant="secondary"
                              style={styles.buttonStyle}
                              endIcon={
                                <IconButton>
                                  {' '}
                                  <Iconify style={{ color: '#6d7c89' }} icon="material-symbols:add" />{' '}
                                </IconButton>
                              }
                              startIcon={
                                <IconButton>
                                  {' '}
                                  <Iconify style={{ color: 'black' }} icon="mdi:bus-clock" />
                                </IconButton>
                              }
                            >
                              <span style={{ width: '200px' }}> Schedule A Village Visit</span>
                            </Button>
                          </Link>
                        </MenuItem>
                        <MenuItem>
                          <Link
                            to="/dashboard/projects/assignedVillages"
                            state={{ id: data1?.project_id }}
                            style={styles.linkStyle}
                          >
                            <Button
                              variant="secondary"
                              style={styles.buttonStyle}
                              endIcon={
                                <IconButton>
                                  {' '}
                                  <Iconify style={{ color: '#6d7c89' }} icon="material-symbols:add" />{' '}
                                </IconButton>
                              }
                              startIcon={
                                <IconButton>
                                  {' '}
                                  <Iconify style={{ color: 'black' }} icon="ic:baseline-home" />{' '}
                                </IconButton>
                              }
                            >
                              <span style={{ width: '200px' }}> Assigned Villages</span>
                            </Button>
                          </Link>
                        </MenuItem>
                      </Menu>
                    </>
                  ) : null}
                  {userDetails == 6 || userDetails == 13 ? <br /> : null}
                  {userDetails == 6 || userDetails == 13 ? (
                    <Link
                      to="/dashboard/projects/scheduleCircleMeet"
                      state={{ id: data1?.project_id }}
                      style={styles.linkStyle}
                    >
                      <Button
                        variant="secondary"
                        style={styles.buttonStyle}
                        endIcon={
                          <IconButton>
                            {' '}
                            <Iconify style={{ color: '#6d7c89' }} icon="material-symbols:add" />{' '}
                          </IconButton>
                        }
                        startIcon={
                          <IconButton>
                            {' '}
                            <Iconify style={{ color: 'black' }} icon="mdi:clock" />
                          </IconButton>
                        }
                      >
                        <span style={{ width: '200px' }}>Schedule A Circle Meeting</span>
                      </Button>
                    </Link>
                  ) : null}
                     {/* gelethi menu */}
                     {(userDetails == 6 || userDetails == 13) ? <><span style={styles.linkStyle}>
                    <Button variant="secondary" style={styles.cirleMeetingbuttonStyle}
                      id="basic-button"
                      aria-controls={open ? 'basic-menu' : undefined}
                      aria-haspopup="true"
                      aria-expanded={open ? 'true' : undefined}
                      onClick={handleClick}
                      endIcon={<KeyboardArrowDownIcon />}
                      startIcon={<IconButton> <Iconify style={{ color: "black" }} icon="guidance:meeting-point" /></IconButton>}
                    >
                      <span style={{ width: "210px" }} > Circle Meeting working</span>
                    </Button>
                  </span>
                    <Menu
                      anchorEl={anchorEl}
                      open={open}
                      onClose={handleClose}
                      MenuListProps={{
                        'aria-labelledby': 'basic-button',
                      }}
                      style={{ justifyContent: 'flex-end' }}
                    >
                      {/* spoorthi menu item  */}
                      <MenuItem>
                      <Button variant="secondary" style={styles.buttonStyle}
                      id="basic-button"
                      aria-controls={open2 ? 'basic-menu' : undefined}
                      aria-haspopup="true"
                      aria-expanded={open2 ? 'true' : undefined}
                      onClick={spoorthiHandleClick}
                      endIcon={<KeyboardArrowDownIcon />}
                      startIcon={<IconButton> <Iconify style={{ color: "black" }} icon="guidance:meeting-point" /></IconButton>}
                    >
                      <span style={{ width: "210px" }} > Spoorthi</span>
                    </Button>
                      </MenuItem>
                      <Menu
                      anchorEl={anchorE2}
                      open={open2}
                      onClose={spoorthiHandleClose}
                      MenuListProps={{
                        'aria-labelledby': 'basic-button',
                      }}
                      style={{ justifyContent: 'flex-end' }}
                    >
                      {/* spoorthi menu item  */}
                     
                      <IconButton onClick={spoorthiHandleClose} > <Iconify style={{ color: "black" ,margingLeft:"10px"}} icon="material-symbols:close-rounded"  /></IconButton>
                      
                      <MenuItem>
                        <Link to="/dashboard/projects/ProjectWiseGelathiCircle" state={{ id: data1?.project_id , title: "Sporthi Survey CM ", head:"_SPS", data: data1 , type:1}} style={styles.linkStyle}><Button variant="secondary" style={styles.buttonStyle}
                          endIcon={<IconButton> <Iconify style={{ color: "#6d7c89" }} icon="material-symbols:add" /> </IconButton>}
                          startIcon={<IconButton> <Iconify style={{ color: "black" }} icon="ic:baseline-home" /> </IconButton>}>
                          <span style={{ width: "200px" }}> Survey</span>
                        </Button>
                        </Link></MenuItem>
                     
                      <MenuItem>
                        <Link to="/dashboard/projects/ProjectWiseGelathiCircle" state={{ id: data1?.project_id , title: "Module 1 CM" , head:"_SPM1" }} style={styles.linkStyle}><Button variant="secondary" style={styles.buttonStyle}
                          endIcon={<IconButton> <Iconify style={{ color: "#6d7c89" }} icon="material-symbols:add" /> </IconButton>}
                          startIcon={<IconButton> <Iconify style={{ color: "black" }} icon="ic:baseline-home" /> </IconButton>}>
                          <span style={{ width: "200px" }}> Module 1</span>
                        </Button>
                        </Link></MenuItem>
                        <MenuItem>
                        <Link to="/dashboard/projects/ProjectWiseGelathiCircle" state={{ id: data1?.project_id , title: "Module 2 CM" , head:"_SPM2"}} style={styles.linkStyle}><Button variant="secondary" style={styles.buttonStyle}
                          endIcon={<IconButton> <Iconify style={{ color: "#6d7c89" }} icon="material-symbols:add" /> </IconButton>}
                          startIcon={<IconButton> <Iconify style={{ color: "black" }} icon="ic:baseline-home" /> </IconButton>}>
                          <span style={{ width: "200px" }}> Module 2</span>
                        </Button>
                        </Link>
                        </MenuItem>
                        <MenuItem>
                        <Link to="/dashboard/projects/ProjectWiseGelathiCircle" state={{ id: data1?.project_id , title: "Module 3 CM" , head:"_SPM3"}} style={styles.linkStyle}><Button variant="secondary" style={styles.buttonStyle}
                          endIcon={<IconButton> <Iconify style={{ color: "#6d7c89" }} icon="material-symbols:add" /> </IconButton>}
                          startIcon={<IconButton> <Iconify style={{ color: "black" }} icon="ic:baseline-home" /> </IconButton>}>
                          <span style={{ width: "200px" }}> Module 3</span>
                        </Button>
                        </Link>
                        </MenuItem>
                        <MenuItem>
                        <Link to="/dashboard/projects/ProjectWiseGelathiCircle" state={{ id: data1?.project_id , title: "Module 4 CM" , head:"_SPM4"}} style={styles.linkStyle}><Button variant="secondary" style={styles.buttonStyle}
                          endIcon={<IconButton> <Iconify style={{ color: "#6d7c89" }} icon="material-symbols:add" /> </IconButton>}
                          startIcon={<IconButton> <Iconify style={{ color: "black" }} icon="ic:baseline-home" /> </IconButton>}>
                          <span style={{ width: "200px" }}> Module 4</span>
                        </Button>
                        </Link>
                        </MenuItem>
                        <MenuItem>
                        <Link to="/dashboard/projects/ProjectWiseGelathiCircle" state={{ id: data1?.project_id , title: "Module 5 CM" , head:"_SPM5"}}style={styles.linkStyle}><Button variant="secondary" style={styles.buttonStyle}
                          endIcon={<IconButton> <Iconify style={{ color: "#6d7c89" }} icon="material-symbols:add" /> </IconButton>}
                          startIcon={<IconButton> <Iconify style={{ color: "black" }} icon="ic:baseline-home" /> </IconButton>}>
                          <span style={{ width: "200px" }}> Module 5</span>
                        </Button>
                        </Link>
                        </MenuItem>
                     
                    </Menu>
 {/* spoorthi menu item end   */}
 {/* green menu item  */}
 <MenuItem>
                      <Button variant="secondary" style={styles.buttonStyle}
                      id="basic-button"
                      aria-controls={open3 ? 'basic-menu' : undefined}
                      aria-haspopup="true"
                      aria-expanded={open3 ? 'true' : undefined}
                      onClick={greenHandleClick}
                      endIcon={<KeyboardArrowDownIcon />}
                      startIcon={<IconButton> <Iconify style={{ color: "black" }} icon="guidance:meeting-point" color="green" /></IconButton>}
                    >
                      <span style={{ width: "210px" }} > Green</span>
                    </Button>
                      </MenuItem>
                      <Menu
                      anchorEl={anchorE3}
                      open={open3}
                      onClose={greenHandleClose}
                      MenuListProps={{
                        'aria-labelledby': 'basic-button',
                      }}
                      style={{ justifyContent: 'flex-end' }}
                    >
                      {/* spoorthi menu item  */}
                      <IconButton onClick={greenHandleClose} > <Iconify style={{ color: "black" ,margingLeft:"10px"}} icon="material-symbols:close-rounded"  /></IconButton>
                      
                    <MenuItem>
                        <Link to="/dashboard/projects/ProjectWiseGelathiCircle" state={{ id: data1?.project_id , title: "Green Survey CM" , head:"_GPS"}}style={styles.linkStyle}><Button variant="secondary" style={styles.buttonStyle}
                          endIcon={<IconButton> <Iconify style={{ color: "#6d7c89" }} icon="material-symbols:add" /> </IconButton>}
                          startIcon={<IconButton> <Iconify style={{ color: "black" }} icon="ic:baseline-home" /> </IconButton>}>
                          <span style={{ width: "200px" }}> Survey</span>
                        </Button>
                        </Link></MenuItem>
                     
                      <MenuItem>
                        <Link to="/dashboard/projects/ProjectWiseGelathiCircle" state={{ id: data1?.project_id , title: "Module 1 CM" , head:"_GPM1"}} style={styles.linkStyle}><Button variant="secondary" style={styles.buttonStyle}
                          endIcon={<IconButton> <Iconify style={{ color: "#6d7c89" }} icon="material-symbols:add" /> </IconButton>}
                          startIcon={<IconButton> <Iconify style={{ color: "black" }} icon="ic:baseline-home" /> </IconButton>}>
                          <span style={{ width: "200px" }}> Module 1</span>
                        </Button>
                        </Link></MenuItem>
                        <MenuItem>
                        <Link to="/dashboard/projects/ProjectWiseGelathiCircle" state={{ id: data1?.project_id , title: "Module 2 CM" , head:"_GPM2"}} style={styles.linkStyle}><Button variant="secondary" style={styles.buttonStyle}
                          endIcon={<IconButton> <Iconify style={{ color: "#6d7c89" }} icon="material-symbols:add" /> </IconButton>}
                          startIcon={<IconButton> <Iconify style={{ color: "black" }} icon="ic:baseline-home" /> </IconButton>}>
                          <span style={{ width: "200px" }}> Module 2</span>
                        </Button>
                        </Link>
                        </MenuItem>
                        <MenuItem>
                        <Link to="/dashboard/projects/ProjectWiseGelathiCircle" state={{ id: data1?.project_id , title: "Module 3 CM", head:"_GPM3"}}style={styles.linkStyle}><Button variant="secondary" style={styles.buttonStyle}
                          endIcon={<IconButton> <Iconify style={{ color: "#6d7c89" }} icon="material-symbols:add" /> </IconButton>}
                          startIcon={<IconButton> <Iconify style={{ color: "black" }} icon="ic:baseline-home" /> </IconButton>}>
                          <span style={{ width: "200px" }}> Module 3</span>
                        </Button>
                        </Link>
                        </MenuItem>
                        <MenuItem>
                        <Link to="/dashboard/projects/ProjectWiseGelathiCircle" state={{ id: data1?.project_id , title: "Module 4 CM", head:"_GPM4"}} style={styles.linkStyle}><Button variant="secondary" style={styles.buttonStyle}
                          endIcon={<IconButton> <Iconify style={{ color: "#6d7c89" }} icon="material-symbols:add" /> </IconButton>}
                          startIcon={<IconButton> <Iconify style={{ color: "black" }} icon="ic:baseline-home" /> </IconButton>}>
                          <span style={{ width: "200px" }}> Module 4</span>
                        </Button>
                        </Link>
                        </MenuItem>
                        <MenuItem>
                        <Link to="/dashboard/projects/ProjectWiseGelathiCircle" state={{ id: data1?.project_id , title: "Module 5 CM", head:"_GPM5"}} style={styles.linkStyle}><Button variant="secondary" style={styles.buttonStyle}
                          endIcon={<IconButton> <Iconify style={{ color: "#6d7c89" }} icon="material-symbols:add" /> </IconButton>}
                          startIcon={<IconButton> <Iconify style={{ color: "black" }} icon="ic:baseline-home" /> </IconButton>}>
                          <span style={{ width: "200px" }}> Module 5</span>
                        </Button>
                        </Link>
                        </MenuItem>
                      
                    </Menu>
 {/* green menu item end  */}
 {/* vyapar menu item start */}
 <MenuItem>
                      <Button variant="secondary" style={styles.buttonStyle}
                      id="basic-button"
                      aria-controls={open4 ? 'basic-menu' : undefined}
                      aria-haspopup="true"
                      aria-expanded={open4 ? 'true' : undefined}
                      onClick={vyaparHandleClick}
                      endIcon={<KeyboardArrowDownIcon />}
                      startIcon={<IconButton> <Iconify style={{ color: "black" }} icon="guidance:meeting-point" /></IconButton>}
                    >
                      <span style={{ width: "210px" }} > Vyapar</span>
                    </Button>
                      </MenuItem>
                      <Menu
                      anchorEl={anchorE4}
                      open={open4}
                      onClose={vyaparHandleClose}
                      MenuListProps={{
                        'aria-labelledby': 'basic-button',
                      }}
                      style={{ justifyContent: 'flex-end' }}
                    >
                   <IconButton onClick={vyaparHandleClose} > <Iconify style={{ color: "black" ,margingLeft:"10px"}} icon="material-symbols:close-rounded"  /></IconButton>
                      
                    
                      <MenuItem>
                        <Link to="/dashboard/projects/ProjectWiseGelathiCircle" state={{ id: data1?.project_id , title: "Vyapar Survey CM", head:"_VPS"}} style={styles.linkStyle}><Button variant="secondary" style={styles.buttonStyle}
                          endIcon={<IconButton> <Iconify style={{ color: "#6d7c89" }} icon="material-symbols:add" /> </IconButton>}
                          startIcon={<IconButton> <Iconify style={{ color: "black" }} icon="ic:baseline-home" /> </IconButton>}>
                          <span style={{ width: "200px" }}> Survey </span>
                        </Button>
                        </Link></MenuItem>
                     
                      <MenuItem>
                        <Link to="/dashboard/projects/ProjectWiseGelathiCircle" state={{ id: data1?.project_id , title: "Module 1 CM" , head:"_VPM1"}} style={styles.linkStyle}><Button variant="secondary" style={styles.buttonStyle}
                          endIcon={<IconButton> <Iconify style={{ color: "#6d7c89" }} icon="material-symbols:add" /> </IconButton>}
                          startIcon={<IconButton> <Iconify style={{ color: "black" }} icon="ic:baseline-home" /> </IconButton>}>
                          <span style={{ width: "200px" }}> Module 1</span>
                        </Button>
                        </Link></MenuItem>
                        <MenuItem>
                        <Link to="/dashboard/projects/ProjectWiseGelathiCircle" state={{ id: data1?.project_id , title: "Module 2 CM", head:"_VPM2"}} style={styles.linkStyle}><Button variant="secondary" style={styles.buttonStyle}
                          endIcon={<IconButton> <Iconify style={{ color: "#6d7c89" }} icon="material-symbols:add" /> </IconButton>}
                          startIcon={<IconButton> <Iconify style={{ color: "black" }} icon="ic:baseline-home" /> </IconButton>}>
                          <span style={{ width: "200px" }}> Module 2</span>
                        </Button>
                        </Link>
                        </MenuItem>
                        <MenuItem>
                        <Link to="/dashboard/projects/ProjectWiseGelathiCircle" state={{ id: data1?.project_id , title: "Module 3 CM", head:"_VPM3"}} style={styles.linkStyle}><Button variant="secondary" style={styles.buttonStyle}
                          endIcon={<IconButton> <Iconify style={{ color: "#6d7c89" }} icon="material-symbols:add" /> </IconButton>}
                          startIcon={<IconButton> <Iconify style={{ color: "black" }} icon="ic:baseline-home" /> </IconButton>}>
                          <span style={{ width: "200px" }}> Module 3</span>
                        </Button>
                        </Link>
                        </MenuItem>
                        <MenuItem>
                        <Link to="/dashboard/projects/ProjectWiseGelathiCircle" state={{ id: data1?.project_id , title: "Module 4 CM", head:"_VPM4"}} style={styles.linkStyle}><Button variant="secondary" style={styles.buttonStyle}
                          endIcon={<IconButton> <Iconify style={{ color: "#6d7c89" }} icon="material-symbols:add" /> </IconButton>}
                          startIcon={<IconButton> <Iconify style={{ color: "black" }} icon="ic:baseline-home" /> </IconButton>}>
                          <span style={{ width: "200px" }}> Module 4</span>
                        </Button>
                        </Link>
                        </MenuItem>
                        <MenuItem>
                        <Link to="/dashboard/projects/ProjectWiseGelathiCircle" state={{ id: data1?.project_id , title: "Module 5 CM", head:"_VPM5"}} style={styles.linkStyle}><Button variant="secondary" style={styles.buttonStyle}
                          endIcon={<IconButton> <Iconify style={{ color: "#6d7c89" }} icon="material-symbols:add" /> </IconButton>}
                          startIcon={<IconButton> <Iconify style={{ color: "black" }} icon="ic:baseline-home" /> </IconButton>}>
                          <span style={{ width: "200px" }}> Module 5</span>
                        </Button>
                        </Link>
                        </MenuItem>
                      
                    </Menu>
 {/* vyapar menu item end  */}



 {/* Nagarika menu item start */}
 {/* <MenuItem>
                      <Button variant="secondary" style={styles.buttonStyle}
                      id="basic-button"
                      aria-controls={open4 ? 'basic-menu' : undefined}
                      aria-haspopup="true"
                      aria-expanded={open4 ? 'true' : undefined}
                      onClick={nagarikaHandleClick}
                      endIcon={<KeyboardArrowDownIcon />}
                      startIcon={<IconButton> <Iconify style={{ color: "black" }} icon="guidance:meeting-point" /></IconButton>}
                    >
                      <span style={{ width: "210px" }} > Nagarika</span>
                    </Button>
                      </MenuItem>
                      <Menu
                      anchorEl={anchorE6}
                      open={open6}
                      onClose={nagarikaHandleClose}
                      MenuListProps={{
                        'aria-labelledby': 'basic-button',
                      }}
                      style={{ justifyContent: 'flex-end' }}
                    >
                   <IconButton onClick={nagarikaHandleClose} > <Iconify style={{ color: "black" ,margingLeft:"10px"}} icon="material-symbols:close-rounded"  /></IconButton>
                      
                    
                      <MenuItem>
                        <Link to="/dashboard/projects/ProjectWiseGelathiCircle" state={{ id: data1?.project_id , title: "Nagarika Survey CM", head:"_NPS"}} style={styles.linkStyle}><Button variant="secondary" style={styles.buttonStyle}
                          endIcon={<IconButton> <Iconify style={{ color: "#6d7c89" }} icon="material-symbols:add" /> </IconButton>}
                          startIcon={<IconButton> <Iconify style={{ color: "black" }} icon="ic:baseline-home" /> </IconButton>}>
                          <span style={{ width: "200px" }}> Survey </span>
                        </Button>
                        </Link></MenuItem>
                     
                      <MenuItem>
                        <Link to="/dashboard/projects/ProjectWiseGelathiCircle" state={{ id: data1?.project_id , title: "Module 1 CM" , head:"_NPM1"}} style={styles.linkStyle}><Button variant="secondary" style={styles.buttonStyle}
                          endIcon={<IconButton> <Iconify style={{ color: "#6d7c89" }} icon="material-symbols:add" /> </IconButton>}
                          startIcon={<IconButton> <Iconify style={{ color: "black" }} icon="ic:baseline-home" /> </IconButton>}>
                          <span style={{ width: "200px" }}> Module 1</span>
                        </Button>
                        </Link></MenuItem>
                        <MenuItem>
                        <Link to="/dashboard/projects/ProjectWiseGelathiCircle" state={{ id: data1?.project_id , title: "Module 2 CM", head:"_NPM2"}} style={styles.linkStyle}><Button variant="secondary" style={styles.buttonStyle}
                          endIcon={<IconButton> <Iconify style={{ color: "#6d7c89" }} icon="material-symbols:add" /> </IconButton>}
                          startIcon={<IconButton> <Iconify style={{ color: "black" }} icon="ic:baseline-home" /> </IconButton>}>
                          <span style={{ width: "200px" }}> Module 2</span>
                        </Button>
                        </Link>
                        </MenuItem>
                        <MenuItem>
                        <Link to="/dashboard/projects/ProjectWiseGelathiCircle" state={{ id: data1?.project_id , title: "Module 3 CM", head:"_NPM3"}} style={styles.linkStyle}><Button variant="secondary" style={styles.buttonStyle}
                          endIcon={<IconButton> <Iconify style={{ color: "#6d7c89" }} icon="material-symbols:add" /> </IconButton>}
                          startIcon={<IconButton> <Iconify style={{ color: "black" }} icon="ic:baseline-home" /> </IconButton>}>
                          <span style={{ width: "200px" }}> Module 3</span>
                        </Button>
                        </Link>
                        </MenuItem>
                        <MenuItem>
                        <Link to="/dashboard/projects/ProjectWiseGelathiCircle" state={{ id: data1?.project_id , title: "Module 4 CM", head:"_NPM4"}} style={styles.linkStyle}><Button variant="secondary" style={styles.buttonStyle}
                          endIcon={<IconButton> <Iconify style={{ color: "#6d7c89" }} icon="material-symbols:add" /> </IconButton>}
                          startIcon={<IconButton> <Iconify style={{ color: "black" }} icon="ic:baseline-home" /> </IconButton>}>
                          <span style={{ width: "200px" }}> Module 4</span>
                        </Button>
                        </Link>
                        </MenuItem>
                        <MenuItem>
                        <Link to="/dashboard/projects/ProjectWiseGelathiCircle" state={{ id: data1?.project_id , title: "Module 5 CM", head:"_NPM5"}} style={styles.linkStyle}><Button variant="secondary" style={styles.buttonStyle}
                          endIcon={<IconButton> <Iconify style={{ color: "#6d7c89" }} icon="material-symbols:add" /> </IconButton>}
                          startIcon={<IconButton> <Iconify style={{ color: "black" }} icon="ic:baseline-home" /> </IconButton>}>
                          <span style={{ width: "200px" }}> Module 5</span>
                        </Button>
                        </Link>
                        </MenuItem>
                        <MenuItem>
                        <Link to="/dashboard/projects/ProjectWiseGelathiCircle" state={{ id: data1?.project_id , title: "Module 6 CM", head:"_NPM6"}} style={styles.linkStyle}><Button variant="secondary" style={styles.buttonStyle}
                          endIcon={<IconButton> <Iconify style={{ color: "#6d7c89" }} icon="material-symbols:add" /> </IconButton>}
                          startIcon={<IconButton> <Iconify style={{ color: "black" }} icon="ic:baseline-home" /> </IconButton>}>
                          <span style={{ width: "200px" }}> Module 6</span>
                        </Button>
                        </Link>
                        </MenuItem>
                      
                    </Menu> */}
 {/* Nagarika menu item end  */}
                    
                    </Menu></> : null}
                      {/* gelati menu end */}
                  {userDetails == 6 || userDetails == 13 ? <br /> : null}
                  {userDetails == 6 || userDetails == 13 ? (
                    <Link
                      to="/dashboard/projects/scheduleBeehiveVisit"
                      state={{ id: data1?.project_id }}
                      style={styles.linkStyle}
                    >
                      <Button
                        variant="secondary"
                        style={styles.buttonStyle}
                        endIcon={
                          <IconButton>
                            {' '}
                            <Iconify style={{ color: '#6d7c89' }} icon="material-symbols:add" />{' '}
                          </IconButton>
                        }
                        startIcon={
                          <IconButton>
                            {' '}
                            <Iconify style={{ color: 'black' }} icon="mdi:bus-clock" />
                          </IconButton>
                        }
                      >
                        <span style={{ width: '200px' }}>Schedule A Beehive Visit</span>
                      </Button>
                    </Link>
                  ) : null}
                  {userDetails == 6 || userDetails == 13 ? <br /> : null}
                  {userDetails == 5 ? <CreateTrainerBatch data1={data1} /> : null} {userDetails == 5 ? <br /> : null}
                  <br />
                </ButtonGroup>
              </Box>
            </Grid>
          </Grid>
        </Container>
      </Page>
    </div>
  );
}
export default Project;
