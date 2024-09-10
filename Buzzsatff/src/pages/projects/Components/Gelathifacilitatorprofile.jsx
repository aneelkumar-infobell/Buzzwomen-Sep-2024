import PropTypes from 'prop-types';
import Iconify from 'src/components/Iconify';
import Scrollbar from 'src/components/Scrollbar';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import defaultImage from '../../../assets/images/default.png';
import {useState} from 'react'
import { useEffect } from 'react';
import axios from 'axios';
import Dialog from '@mui/material/Dialog';
import React from 'react';
import { baseURL } from 'src/utils/api';
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
  Card, Avatar,
  CardContent,
} from '@mui/material';
import Slide from '@mui/material/Slide';
import { useAuth } from 'src/AuthContext';
const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
  });
Gelathifacilitatorprofile.propTypes = {
  isOpenFilter: PropTypes.bool,
  onOpenFilter: PropTypes.func,
  onCloseFilter: PropTypes.func,
};
 
export default function Gelathifacilitatorprofile({isOpenFilter,onOpenFilter,onCloseFilter}){
  const { apikey } = useAuth();
  var [user,setUser]=useState(JSON.parse(sessionStorage?.getItem('people')))
    const [profileData, setProfileData] = useState()
    useEffect(() => {
     
      updateSetUser()
    }, []
    )
    const updateSetUser=()=>{
      setUser(JSON.parse(sessionStorage?.getItem('people')))
    }    
    const userData = JSON.parse(sessionStorage?.getItem('profiledetails'))?.emp_id
    useEffect(() => {
       if(userData){
        profile()
       } 
      },
      [isOpenFilter])
      const profile = async => {
      
        var data = JSON.stringify({
          "id": userData
        });
    
        var config = {
          method: 'post',
          url: baseURL + 'getProfileData',
          headers: {
            'Content-Type': 'application/json',
             'Authorization': `${apikey}`
          },
          data: data
        };
    
        axios(config)
          .then(function (response) {
            setProfileData(response.data)
          })
          .catch(function (error) {
            // console.log(error);
          });
    
      }
    return(
        <>
      <Dialog 
        fullScreen
        open={isOpenFilter}
        onClose={onCloseFilter}
        TransitionComponent={Transition}
        
      >
        <AppBar sx={{ position: 'relative', bgcolor: '#ff7424' }}>
          <Toolbar>
            <IconButton style={{ color: "white", float: 'left' }} onClick={onCloseFilter}>
              <Iconify icon="material-symbols:arrow-back-rounded" />
            </IconButton>
            <Typography variant="subtitle2" style={{ color: 'white' }}>
              Profile
            </Typography>
          </Toolbar>
        </AppBar>
        <Divider /><br />
        <Scrollbar>
          <Stack spacing={1} sx={{ px: 1 }}>
            <div>
              <Card >
                <CardContent>
                  <div style={{ float: 'left', paddingTop: 30, paddingRight: 5 }}>
                    <Avatar src={(profileData?.profile_pic) ? profileData.profile_pic : defaultImage} alt="photoURL" />
                  </div>
                  <Card sx={{ px: 1, boxShadow: 0 }} >
                    <Typography style={{ flexDirection: 'row', color: '#444444', }} variant="subtitle1" gutterBottom>{profileData?.first_name}&nbsp;{profileData?.last_name} 
                    </Typography> 
                    <Typography style={{ flexDirection: 'row', color: '#444444' }} variant="body1" gutterBottom>
                      Role : <span style={{ fontWeight: 100, color: '#444444' }}>{profileData?.role_name}</span>
                    </Typography>
                   <Typography variant="body1" gutterBottom style={{ color: '#444444' }}>
                      Status : <span style={{ fontWeight: 100, color: '#444444' }}>{profileData?.status === '1' ? "Active" : null}</span>
                    </Typography>
                    <Typography variant="body1" gutterBottom style={{ color: '#444444' }}>
                      Reporting Manager : <span style={{ fontWeight: 100, color: '#444444' }}>{profileData?.supervisorName}</span>
                    </Typography>
            
                    <Typography variant="body1" gutterBottom style={{ color: '#444444' }}>
                      Date Of Joining : <span style={{ fontWeight: 100, color: '#444444' }}>{profileData?.doj}</span> </Typography>
                  </Card>
                </CardContent>
              </Card>
            </div>
            <div>
              <Card style={{ width: "auto" }}>
                <CardContent>
                  <Card variant="subtitle1" gutterBottom style={{ padding: 10, color: 'white', textAlign: 'center', borderRadius: '0px', backgroundColor: '#999999' }}>
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
                  <Card variant="subtitle1" gutterBottom style={{ padding: 10, color: 'white', textAlign: 'center', borderRadius: '0px', backgroundColor: '#999999' }}>
                    Projects
                  </Card>
                  <br />
                  {profileData?.project_list ?
                    <Typography variant="subtitle1" gutterBottom style={{ color: '#444444' }}>
                      {profileData?.project_list.map(project => {
                        return (
                          <Typography variant="body1" gutterBottom>   {project.projectName}</Typography>
                        )
                      })}
                    </Typography>
                    :
                    <div style={{ textAlign: "center" }}>No projects found .</div>
                  }
                </CardContent>
              </Card>
            </div>
          </Stack>
        </Scrollbar>
    
      </Dialog>
    </>
    )
}