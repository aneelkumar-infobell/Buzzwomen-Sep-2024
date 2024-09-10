import PropTypes from 'prop-types';
// material
import {
  Box,
  Radio,
  Stack,
  Button,
  Drawer,
  Rating,
  Divider,
  Checkbox,
  FormGroup,
  IconButton,
  Typography,
  RadioGroup,
  Card,
  Avatar,
  CardContent,
} from '@mui/material';
// components
import Iconify from '../../components/Iconify';
import Scrollbar from '../../components/Scrollbar';
import { ColorManyPicker } from '../../components/color-utils';
import UserEditProfile from './UserComponent/UserEditProfile';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import CloseIcon from '@mui/icons-material/Close';
import Slide from '@mui/material/Slide';
import { Color } from '@mui/material';
import { Link } from 'react-router-dom';
import { Icon } from '@iconify/react';
import defaultImage from '../../assets/images/default.png';
import { useState } from 'react';
import { useEffect } from 'react';
import axios from 'axios';
import { baseURL } from 'src/utils/api';
import { useMediaQuery } from '@mui/material';
import { useAuth } from 'src/AuthContext';

UserDrawer.propTypes = {
  isOpenFilter: PropTypes.bool,
  onOpenFilter: PropTypes.func,
  onCloseFilter: PropTypes.func,
};

export default function UserDrawer({ isOpenFilter, onOpenFilter, onCloseFilter, users ,deleteuser}) {
    const { apikey } = useAuth();
  const [profileData, setProfileData] = useState();
  const [user, setUser] = useState();
  const userDetails = sessionStorage?.getItem('userId');
  const isSmallScreen = useMediaQuery('(max-width:600px)');
const handleclose=()=>{
   isOpenFilter=false;

}
  useEffect(() => {
    //   editUser()
    updateSetUser();
  }, []);

  const updateSetUser = () => {
    setUser(JSON.parse(sessionStorage?.getItem('people')));
    handleclose();
  };
  const userData = JSON.parse(sessionStorage?.getItem('people'))?.id;
  useEffect(() => {
   if(userData){
     profile()
   }
  }, [isOpenFilter,onCloseFilter]);



  const profile = (async) => {
    const userData = JSON.parse(sessionStorage?.getItem('people'))?.id;
    var data = JSON.stringify({
      id: JSON.stringify(parseInt(userData)),
    });

    var config = {
      method: 'post',
      url: baseURL + 'getProfileData',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `${apikey}`
      },
      data: data,
    };


    axios(config)
      .then(function (response) {
        setProfileData(response.data);
      })
      .catch(function (error) {
        // console.log(error);
      });
  };
  const projectlist = JSON.parse(sessionStorage?.getItem('people'))?.project_list;
  const projectIds = projectlist?.map(item => item.project_id);

  const deleteprofile=(async)=>{
    const userData = JSON.parse(sessionStorage?.getItem('people'))?.id;
    const roleid = JSON.parse(sessionStorage?.getItem('people'))?.role_id;
 
    if(confirm('Are you sure want to  delete')){
      var data = JSON.stringify({
        "emp_id": userData,
        "delete": "1",
        "role_id": roleid,
        "project_id": projectIds
      });
      
      var config = {
        method: 'post',
        url: baseURL+'deleteUser',
        headers: { 
          'Content-Type': 'application/json',
          'Authorization': `${apikey}`
        },
        data : data
      };
    
    axios(config)
    .then(function (response) {
      updateSetUser()
      deleteuser()
     
    })
    .catch(function (error) {
      // console.log(error);
    });
  }
  }


  var roleid = JSON.parse(sessionStorage?.getItem('people'))?.role_id;
  var peopledetails =JSON.parse(sessionStorage?.getItem('people'))
  return (
    <>
      <Drawer
        anchor="right"
        open={isOpenFilter}
        onClose={onCloseFilter}
        PaperProps={{
          sx: { width: 350 },
        }}
      >
        <AppBar sx={{ position: 'relative', bgcolor: '#ff7424' }}>
          <Toolbar>
            <IconButton style={{ color: 'white', float: 'left' }} onClick={onCloseFilter}>
              <Iconify icon="material-symbols:arrow-back-rounded" />
            </IconButton>
            <Typography variant="subtitle2" style={{ color: 'white' }}>
              Member Detail
            </Typography>
          </Toolbar>
        </AppBar>

        <Divider />
        <br />

        {userDetails && userDetails == 2 && (
          <Stack direction={'row'} justifyContent="flex-end">
            <UserEditProfile updateSetUser={updateSetUser} profileData={profileData} closeUserDrawer={onCloseFilter}  />
            <Button onClick={()=>deleteprofile()}
              style={{ float: 'right' }}
              sx={{
                '&:hover': {
                  backgroundColor: '#ffd796',
                },
              }}
            >
              <Iconify id="delete-icon"
                icon="ic:baseline-delete"
                style={{ width: '30px', height: '30px', color: '#e69138', marginRight: 0 }}
              ></Iconify>
            </Button>
          </Stack>
        )}
        <Scrollbar>
          {(roleid==1 || roleid==2 || roleid==3 || roleid==4 || roleid==5 || roleid==6 || roleid==13 || roleid==12)?
          <Stack spacing={1} sx={{ px: 1 }}>
            <div>
              <Card>
                <CardContent>
                  <div style={{ float: 'left', paddingTop: 30, paddingRight: 5 }}>
                    <Avatar src={profileData?.profile_pic ? profileData.profile_pic : defaultImage} alt="photoURL" />
                  </div>
                  <Card sx={{ px: 1, boxShadow: 0 }}>
                    <Typography style={{ flexDirection: 'row', color: '#444444' }} variant="subtitle1" gutterBottom>
                      {profileData?.first_name}&nbsp;{profileData?.last_name}
                    </Typography>
                    <Typography style={{ flexDirection: 'row', color: '#444444' }} variant="body1" gutterBottom>
                      Role : <span style={{ fontWeight: 100, color: '#444444' }}>{profileData?.role_name}</span>
                    </Typography>
                    {userDetails && userDetails == 2 && (
                      <Typography variant="body1" gutterBottom style={{ color: '#444444' }}>
                        Status :{' '}
                        <span style={{ fontWeight: 100, color: '#444444' }}>
                          {profileData?.status === '1' ? 'Active' : null}
                        </span>
                      </Typography>
                    )}
                    <Typography variant="body1" gutterBottom style={{ color: '#444444' }}>
                      Reporting Manager :{' '}
                      <span style={{ fontWeight: 100, color: '#444444' }}>{profileData?.supervisorName}</span>
                    </Typography>

                    <Typography variant="body1" gutterBottom style={{ color: '#444444' }}>
                      Date Of Joining : <span style={{ fontWeight: 100, color: '#444444' }}>{profileData?.doj}</span>{' '}
                    </Typography>
                  </Card>
                </CardContent>
              </Card>

            </div>

            <div>
              <Card style={{ width: 'auto' }}>
                <CardContent>
                  <Card
                    variant="subtitle1"
                    gutterBottom
                    style={{
                      padding: 10,
                      color: 'white',
                      textAlign: 'center',
                      borderRadius: '0px',
                      backgroundColor: '#999999',
                    }}
                  >
                    Contact Information
                  </Card>
                  <br />
                  <Typography variant="subtitle1" gutterBottom style={{ color: '#444444' }}>
                    Mobile Number:<span style={{ fontWeight: 100, color: '#444444' }}>{profileData?.contactNum}</span>
                  </Typography>
                  <Typography variant="subtitle1" gutterBottom style={{ color: '#444444' }}>
                    Work: <span style={{ fontWeight: 100, color: '#444444' }}>{profileData?.workNum} </span>
                  </Typography>
                  <Typography variant="subtitle1" gutterBottom style={{ color: '#444444' }}>
                    Email:<span style={{ fontWeight: 100, color: '#444444' }}> {profileData?.officeMailId}</span>
                  </Typography>
                  <Typography variant="subtitle1" gutterBottom style={{ color: '#444444' }}>
                    Address:<span style={{ fontWeight: 100, color: '#444444' }}>{profileData?.address}</span>
                  </Typography>
                  <Typography variant="subtitle1" gutterBottom style={{ color: '#444444' }}>
                    PinCode:<span style={{ fontWeight: 100, color: '#444444' }}>{profileData?.pincode}</span>
                  </Typography>
                </CardContent>
              </Card>
            </div>

            <div>
              <Card>
                <CardContent>
                  <Card
                    variant="subtitle1"
                    gutterBottom
                    style={{
                      padding: 10,
                      color: 'white',
                      textAlign: 'center',
                      borderRadius: '0px',
                      backgroundColor: '#999999',
                    }}
                  >
                    Projects
                  </Card>
                  <br />
                  {peopledetails?.project_list ? (
                    <Typography variant="subtitle1" gutterBottom style={{ color: '#444444' }}>
                      {peopledetails?.project_list.map((project) => {
                        return (
                          <Typography variant="body1" gutterBottom>
                            {' '}
                            {project.projectName}
                          </Typography>
                        );
                      })}
                    </Typography>
                  ) : (
                    <div style={{ textAlign: 'center' }}>No projects found .</div>
                  )}
                </CardContent>
              </Card>
            </div>
          </Stack>

          :<Stack spacing={1} sx={{ px: 1 }}>
            <div>
              <Card>
                <CardContent>
                  <div style={{ float: 'left', paddingTop: 30, paddingRight: 5 }}>
                    <Avatar src={peopledetails?.profile_pic ? peopledetails.profile_pic : defaultImage} alt="photoURL" />
                  </div>
                  <Card sx={{ px: 1, boxShadow: 0 }}>
                    <Typography style={{ flexDirection: 'row', color: '#444444' }} variant="subtitle1" gutterBottom>
                      {peopledetails?.first_name}&nbsp;{peopledetails?.last_name}
                    </Typography>
                    <Typography style={{ flexDirection: 'row', color: '#444444' }} variant="body1" gutterBottom>
                      Role : <span style={{ fontWeight: 100, color: '#444444' }}>{peopledetails?.role_name}</span>
                    </Typography>
                    {userDetails && userDetails == 2 && (
                      <Typography variant="body1" gutterBottom style={{ color: '#444444' }}>
                        Status :{' '}
                        <span style={{ fontWeight: 100, color: '#444444' }}>
                          {peopledetails?.status === '1' ? 'Active' : null}
                        </span>
                      </Typography>
                    )}
                    <Typography variant="body1" gutterBottom style={{ color: '#444444' }}>
                      Reporting Manager :{' '}
                      <span style={{ fontWeight: 100, color: '#444444' }}>{peopledetails?.supervisorName}</span>
                    </Typography>

                    <Typography variant="body1" gutterBottom style={{ color: '#444444' }}>
                      Date Of Joining : <span style={{ fontWeight: 100, color: '#444444' }}>{peopledetails?.doj}</span>{' '}
                    </Typography>
                  </Card>
                </CardContent>
              </Card>

       
            </div>

            <div>
              <Card style={{ width: 'auto' }}>
                <CardContent>
                  <Card
                    variant="subtitle1"
                    gutterBottom
                    style={{
                      padding: 10,
                      color: 'white',
                      textAlign: 'center',
                      borderRadius: '0px',
                      backgroundColor: '#999999',
                    }}
                  >
                    Contact Information
                  </Card>
                  <br />
                  <Typography variant="subtitle1" gutterBottom style={{ color: '#444444' }}>
                    Mobile Number:<span style={{ fontWeight: 100, color: '#444444' }}>{peopledetails?.contactNum}</span>
                  </Typography>
                  <Typography variant="subtitle1" gutterBottom style={{ color: '#444444' }}>
                    Work: <span style={{ fontWeight: 100, color: '#444444' }}>{peopledetails?.workNum} </span>
                  </Typography>
                  <Typography variant="subtitle1" gutterBottom style={{ color: '#444444' }}>
                    Email:<span style={{ fontWeight: 100, color: '#444444' }}> {peopledetails?.officeMailId}</span>
                  </Typography>
                  <Typography variant="subtitle1" gutterBottom style={{ color: '#444444' }}>
                    Address:<span style={{ fontWeight: 100, color: '#444444' }}>{peopledetails?.address}</span>
                  </Typography>
                  <Typography variant="subtitle1" gutterBottom style={{ color: '#444444' }}>
                    PinCode:<span style={{ fontWeight: 100, color: '#444444' }}>{peopledetails?.pincode}</span>
                  </Typography>
                </CardContent>
              </Card>
            </div>

            <div>
              <Card>
                <CardContent>
                  <Card
                    variant="subtitle1"
                    gutterBottom
                    style={{
                      padding: 10,
                      color: 'white',
                      textAlign: 'center',
                      borderRadius: '0px',
                      backgroundColor: '#999999',
                    }}
                  >
                    Projects
                  </Card>
                  <br />
                  {peopledetails?.project_list ? (
                    <Typography variant="subtitle1" gutterBottom style={{ color: '#444444' }}>
                      {peopledetails?.project_list.map((project) => {
                        return (
                          <Typography variant="body1" gutterBottom>
                            {' '}
                            {project?.projectName}
                          </Typography>
                        );
                      })}
                    </Typography>
                  ) : (
                    <div style={{ textAlign: 'center' }}>No projects found .</div>
                  )}
                </CardContent>
              </Card>
            </div>
          </Stack>}
        </Scrollbar>

      </Drawer>
    </>
  );
}
