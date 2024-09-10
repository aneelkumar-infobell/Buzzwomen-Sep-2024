import { useEffect, useState } from 'react';
import React from "react";
import PropTypes from 'prop-types';
import axios from 'axios';
import { styled } from '@mui/material/styles';
import { Button, Stack, TextField, Grid, Divider, Box, Container } from '@mui/material';
import Chip from '@mui/material/Chip';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import Collapse from '@mui/material/Collapse';
import Avatar from '@mui/material/Avatar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import { red } from '@mui/material/colors';
import Edit from '@mui/icons-material/Edit';
import ShareIcon from '@mui/icons-material/Share';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import { Link as RouterLink } from 'react-router-dom';
import Iconify from '../../components/Iconify';
import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import CloseIcon from '@mui/icons-material/Close';
import Page from 'src/components/Page';
import defaultImage from '../../assets/images/default.png';
import { useNavigate } from 'react-router-dom';
import DialogTitle from '@mui/material/DialogTitle';
import Dialog from '@mui/material/Dialog';
import { DialogContent } from '@mui/material';
import { baseURL } from 'src/utils/api';
import { useAuth } from 'src/AuthContext';
const ExpandMore = styled((props) => {
  const { expand, ...other } = props;
  return <IconButton {...other} />;
})(({ theme, expand }) => ({
}));
const Alert = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});
function SimpleDialog(props) {
  const { onClose, selectedValue, open } = props;
  const navigate = useNavigate();
  const logoutuser = (path) => {




    sessionStorage.clear()
    navigate('/')
  }
  const loginuser = (path) => {


    navigate(-1)
  }
  const handleClose = () => {
    onClose(selectedValue);
  };
  const handleListItemClick = (value) => {
    onClose(value);
  };
  return (
    <Dialog open={open} style={{ width: "100vw" }}>
      <DialogTitle style={{ textAlign: "center" }}>Are You Sure?</DialogTitle>
      <DialogContent>Do you want to logout?</DialogContent>
      <div style={{ margin: "5px", textAlign: "center" }}> <Button id="No"
        sx={{
          ':hover': {
            color: "#ffffff", bgcolor: "#ff7424"
          },
          color: "#ffffff", bgcolor: "#ff7424", borderRadius: "5px"
        }} onClick={loginuser}>No</Button>&nbsp;&nbsp;&nbsp;
        <Button sx={{
          ':hover': {
            color: "#ffffff", bgcolor: "#ff7424"
          },
          color: "#ffffff", bgcolor: "#ff7424"
        }} onClick={logoutuser} id="yes">Yes</Button>
      </div>
    </Dialog>
  );
}
SimpleDialog.propTypes = {
  onClose: PropTypes.func.isRequired,
  open: PropTypes.bool.isRequired,


};
export default function RecipeReviewCard({ profileData, changeUser }) {
    const { apikey } = useAuth();
  const [expanded, setExpanded] = React.useState(false);
  const userDetails = JSON.parse(sessionStorage.getItem('userDetails'))
  const [open, setOpen] = React.useState(false);
  const [count, setCount] = React.useState('');
  const [editData, setEditData] = useState({
    firstName: profileData?.first_name,
    lastName: profileData?.last_name,
    profilepic: profileData?.profile_pic,
    gender: profileData?.gender,
    doj: profileData?.doj,
    role: profileData?.role_id,
    pincode: profileData?.pincode,
    officeMailId: profileData?.officeMailId,
    personalMailId: profileData?.personalMailId,
    contactNum: profileData?.contactNum,
    workNum: profileData?.workNum,
    address: profileData?.address,
    address3: profileData?.address3,
    address2: profileData?.address2,
    empRole: profileData?.role_name,
    supervisorId: profileData?.supervisorId,
    status: profileData?.status,
    project_list: profileData?.project_list,
    license_number: profileData?.license_number,
    createdBy: profileData?.id,
    lastUpdatedBy: profileData?.id
  })
  useEffect(() => {
    setEditData({
      firstName: profileData?.first_name,
      lastName: profileData?.last_name,
      profilepic: profileData?.profile_pic,
      gender: profileData?.gender,
      doj: profileData?.doj,
      pincode: profileData?.pincode,
      officeMailId: profileData?.officeMailId,
      personalMailId: profileData?.personalMailId,
      contactNum: profileData?.contactNum,
      workNum: profileData?.workNum,
      address: profileData?.address,
      address3: profileData?.address3,
      address2: profileData?.address2,
      empRole: profileData?.role_name,
      supervisorId: profileData?.supervisorId,
      status: profileData?.status,
      project_list: profileData?.project_list,
      license_number: profileData?.license_number,
      createdBy: profileData?.id,
      lastUpdatedBy: profileData?.id
    })
  }, [profileData])


  const handleExpandClick = () => {
    setExpanded(true);
  };
  const handleCloseClick = () => {
    setExpanded(false);
  };

  const handleClickOpen = () => {
    setOpen(true);
  };
  const handleClose = (value) => {
    setOpen(false);
  };

  
  var Project_List = profileData?.project_list?.map((e)=>e.project_id)
  const editProfile = async => {
    handleCloseClick();
    const userDetails = sessionStorage?.getItem("userDetails")
    var data = JSON.stringify({
      "id": parseInt(JSON?.parse(userDetails)?.id),
      "countryID": "1",
      "first_name": editData?.firstName,
      "last_name": editData?.lastName,
      "profile_pic": editData?.profilepic,
      "gender": editData?.gender,
      "doj": editData?.doj,
      "pincode": editData?.pincode,
      "empRole": profileData?.role_id,
      "officeMailId": editData?.officeMailId,
      "personalMailId": editData?.personalMailId,
      "contactNum": editData?.contactNum,
      "workNum": editData?.workNum,
      "address": editData?.address,
      "address3": editData?.address3,
      "address2": editData?.address2,
      "role": profileData?.role_name == "Admin"?"2":
      profileData?.role_name == "CEO" ? "1" :
      profileData?.role_name == "Program Manager" ? "3" :
      profileData?.role_name == "Operations Manager" ? "4" :  
      profileData?.role_name == "Trainer" ? "5" :
      profileData?.role_name == "Field Associate" ? "6" :
      profileData?.role_name == "Driver" ? "7":
      profileData?.role_name == "Funder" ?"8":
      profileData?.role_name == "Partner" ? "9" :
      profileData?.role_name == "FIN/HR/VIEWER" ? "11" :
      profileData?.role_name == "Senior Operations Manager" ? "12" :profileData?.role_name == "Gelathi Facilitator Lead" ? "13" : profileData?.role_name == "Senior Trainer" ? "5" : null,
      "supervisorId": editData?.supervisorId,
      "status": editData?.status,
      "createdBy": editData?.createdBy,
      "lastUpdatedBy": editData?.lastUpdatedBy,
      "project_list": Project_List,
      "license_number": editData?.license_number
    });
    var config = {
      method: 'post',
      url: baseURL+'editUser',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `${apikey}`
      },
      data: data
    };
    axios(config)
      .then(function (response) {
        setEditData(response.data)
        changeUser();
        <Alert severity="success">Updated Data!</Alert>
      })
      .catch(function (error) {
        // console.log(error);
      });
  }

  return (
    <Page title="profile" style={{ margin: "1rem" }}>
      <Container>
        <Grid container spacing={2} justifyContent="space-around">
          <Grid item xs={10} sm={6}>
            <Stack direction="row" alignItems="center" justifyContent="space-between" mb={5}>
              <Typography variant="h5" gutterBottom>
                Profile
              </Typography>
      
            </Stack>
            <div style={{ display: "flex", justifyContent: "center", width: "60vw" }}>
              <div>
                <Card sx={{ width: '100wh' }} ><br />
                  <Stack spacing={1} sx={{ px: [0, 1, 2] }}>
                    <Card >
                      <CardContent>
                        <div style={{ display:"flex",alignItems:"center", paddingBottom: 40 }}>
                          <Avatar src={(profileData?.profile_pic) ? profileData.profile_pic : defaultImage} alt="photoURL" style={{ height: 50, width: 50 }} />
                       
                       <div style={{ marginLeft: 10 }}>
                            <Typography style={{ flexDirection: 'row', color: '#444444' }} variant="subtitle1" gutterBottom>{profileData?.first_name}&nbsp;{profileData?.last_name}</Typography>
                            <Typography style={{ flexDirection: 'row', color: '#444444' }} variant="body1" gutterBottom>
                              Role : <span style={{ fontWeight: 100, color: '#444444' }}>{userDetails?.role_name}</span>
                            </Typography>
                            <Typography variant="body1" gutterBottom style={{ color: '#444444' }}>
                              Status : <span style={{ fontWeight: 100, color: '#444444' }}>{profileData?.status === '1' ? 'Active' : null}</span>
                            </Typography>
                            <Typography variant="body1" gutterBottom style={{ color: '#444444' }}>
                              Reporting Manager : <span style={{ fontWeight: 100, color: '#444444' }}>{profileData?.supervisorName === "" ? "" : profileData?.supervisorName}</span>
                            </Typography>
                            <Typography variant="body1" gutterBottom style={{ color: '#444444' }}>
                              Date Of Joining : <span style={{ fontWeight: 100, color: '#444444' }}>{profileData?.doj}</span> </Typography>
                         
                          </div> </div>
                          </CardContent>
                    </Card>
                    <div>
                      <Card style={{ width: "auto" }}>
                        <CardContent>
                          {(!expanded) ?
                            <Card variant="subtitle1" gutterBottom style={{ padding: 10, color: 'white', textAlign: 'center', borderRadius: '0px', backgroundColor: '#ff7424' }}>
                              Contact Information
                            </Card> : null}
                          <TableContainer >
                            <Table aria-label="customized table"  >
                              <TableBody >
                                <TableRow style={{ height: "8px !important" }} >
                                  <TableCell > Mobile </TableCell>
                                  <TableCell>: &nbsp;{profileData?.contactNum}</TableCell>
                                </TableRow>
                                <TableRow style={{ height: "8px !important" }} >
                                  <TableCell> Work Mobile Number</TableCell>
                                  <TableCell>: &nbsp;{profileData?.workNum}</TableCell>
                                </TableRow>
                                <TableRow style={{ height: "8px !important" }} >
                                  <TableCell>Email</TableCell>
                                  <TableCell>:&nbsp;{profileData?.officeMailId}</TableCell>
                                </TableRow>
                                <TableRow style={{ height: "8px !important" }} >
                                  <TableCell>Address</TableCell>
                                  <TableCell>: &nbsp;{profileData?.address}{profileData?.address2}{profileData?.address3}</TableCell>
                                </TableRow>
                                <TableRow style={{ height: "8px !important" }} >
                                  <TableCell>Pincode:</TableCell>
                                  <TableCell>: &nbsp;{profileData?.pincode}</TableCell>
                                </TableRow>
                              </TableBody>
                            </Table>
                          </TableContainer>
                        </CardContent>
                      </Card>
                    </div>
                    <br></br>
                    <div>
                      <Card style={{ width: "auto", marginTop:0}}>
                        <CardContent>
                      <Card variant="subtitle1" gutterBottom style={{ padding: 10, color: 'white', textAlign: 'center', borderRadius: '0px', backgroundColor: '#ff7424' }}>
                        Projects
                      </Card>
                      {(profileData?.project_list!=null) ? <Card>
                        <CardContent>
                          {
                            profileData?.project_list?.map((item) =>
                              <>
                                {item?.projectName}<br /></>
                            )
                          }
                        </CardContent>
                      </Card> : <div style={{ textAlign: 'center',alignItems:'center',justifyContent:'center' }}>No data</div>}
                      </CardContent>
                      </Card>
                    </div>
                  </Stack>
                  <CardActions disableSpacing>
                    {(!expanded) ? <ExpandMore disableRipple style={{ backgroundColor: 'transparent' }} expand={expanded} onClick={handleExpandClick} aria-expanded={expanded} aria-label="show more">
                      <Button variant="warning" style={{ textAlign: 'right' }} id="edit_user"
                        sx={{
                          ':hover': {
                            bgcolor: '#ffd796', // theme.palette.primary.main
                            color: '#ff7424',
                          },
                          ':focus': {
                            bgcolor: '#ffd796',
                            color: "#ff7424"
                          },
                          bgcolor: '#ffd796',
                          color: "#ff7424"
                        }} component={RouterLink} to="#" startIcon={<Iconify icon="material-symbols:edit" />}>
                        Edit User
                      </Button>
                    </ExpandMore> :
                      <IconButton title="close" onClick={handleCloseClick} color="inherit" aria-label="close" style={{ float: 'right',left:50 }} id="close">
                        <CloseIcon />
                      </IconButton>}
                  </CardActions>
              
                  <Collapse in={expanded} timeout="auto" unmountOnExit>
                    <CardContent>
                      <Stack mb={3} style={{ backgroundColor: '#ffd796', borderRadius: 9 }}>
                        <Typography style={{ padding: 10, color: 'white', textAlign: 'center', borderRadius: '0px', backgroundColor: '#ff7424' ,marginTop:0}}
                          variant="h6">

                          User Information
                        </Typography>
                      </Stack>
                      <Card>
                        <TableContainer >
                          <Table aria-label="customized table"  >
                            <TableBody >
                              <TableRow style={{ height: "8px !important" }} >
                                <TableCell>UserName :</TableCell>
                                <TableCell> {profileData?.first_name} {profileData?.last_name}</TableCell>
                              </TableRow>
                              <TableRow style={{ height: "8px !important" }} >
                                <TableCell> Role :</TableCell>
                                <TableCell>{userDetails?.role_name}</TableCell>
                              </TableRow>
                            </TableBody>
                          </Table>
                        </TableContainer>
                      </Card>
                      <Stack mb={1.5}>
                        <Divider variant="middle" />
                      </Stack>
                      <Card variant="subtitle1" gutterBottom style={{ padding: 10, color: 'white', textAlign: 'center', borderRadius: '0px', backgroundColor: '#ff7424' }}>
                        Contact Information
                       
                      </Card><br />
                      <Grid direction={'column'} spacing={1.8} alignItems="center" justifyContent="space-between">
                        <Typography fullWidth>Email :&nbsp;{profileData?.officeMailId}</Typography><br />
                        <Grid item mb={1}>
                          <TextField
                            fullWidth
                            size="small"
                            margin="dense"
                            value={editData?.contactNum}
                            onChange={(e) => { setEditData({ ...editData, contactNum: e?.target?.value }) }}
                            type="number"
                            inputProps={{ inputMode: 'numeric', pattern: '[1-9]{1}[0-9]{9}', maxLength: 10 }}
                            onInput={(e) => {
                              e.target.value = Math.max(0, parseInt(e.target.value)).toString().slice(0, 10)
                            }}
                            id="Mobile-Number"
                            label="Mobile Number"
                            variant="outlined" color="common"
                          />
                        </Grid>
                        <Grid item mb={2}>
                          <TextField fullWidth size="small" id="Work" margin="dense"
                            type="number"
                            value={editData?.workNum}
                            onChange={(e) => { setEditData({ ...editData, workNum: e?.target?.value }) }}
                            inputProps={{ inputMode: 'numeric', pattern: '[0-9]*' }}
                            onInput={(e) => {
                              e.target.value = Math.max(0, parseInt(e.target.value)).toString().slice(0, 10)
                            }}
                            label="Work" variant="outlined" color="common" />
                        </Grid>
                        <Grid item mb={2}>
                          <TextField
                            fullWidth
                            helperText="Address Required *"
                            size="small"
                            id="Address"
                            value={editData?.address}
                            onChange={(e) => { setEditData({ ...editData, address: e?.target?.value }) }}
                            label="Address"
                            variant="outlined" color="common"
                          />
                        </Grid>
                        <Grid item mb={2}>
                          <TextField fullWidth size="small" id="Address1"
                            value={editData?.address3}
                            onChange={(e) => { setEditData({ ...editData, address3: e?.target?.value }) }}
                            label="Address1" variant="outlined" color="common" />
                        </Grid>
                        <Grid item mb={2}>
                          <TextField fullWidth size="small"
                            value={editData?.address2}
                            onChange={(e) => { setEditData({ ...editData, address2: e?.target?.value }) }}
                            id="Address2" label="Address2" variant="outlined" color="common" />
                        </Grid>
                        <Grid item mb={2}>
                          <TextField fullWidth size="small" id="PinCode" type="number"
                            value={editData?.pincode}
                            onChange={(e) => { setEditData({ ...editData, pincode: e?.target?.value }) }}
                            label="PinCode" variant="outlined" color="common"
                            inputProps={{ inputMode: 'numeric', pattern: '[0-9]*' }}
                            onInput={(e) => {
                              e.target.value = Math.max(0, parseInt(e.target.value)).toString().slice(0, 6)
                            }} />
                        </Grid>
                      </Grid>
                      <Box display="flex" justifyContent="flex-end">
                        <Button onClick={editProfile} variant="warning" id="save_details"
                          sx={{
                            ':hover': {
                              bgcolor: '#ffd796', // theme.palette.primary.main
                              color: '#ff7424',
                            },
                            ':focus': {
                              bgcolor: '#ffd796',
                              color: "#ff7424"
                            },
                            bgcolor: '#ffd796',
                            color: "#ff7424"
                          }} component={RouterLink} to="#" startIcon={<Iconify icon="eva:save-fill" />}>
                          Save
                        </Button>
                      </Box>
                    </CardContent>
                  </Collapse>
                </Card>
              </div>
            </div>
          </Grid></Grid>
      </Container>
    </Page>
  );
}
