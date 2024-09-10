import PropTypes from 'prop-types';
import Iconify from 'src/components/Iconify';
import Scrollbar from 'src/components/Scrollbar';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import defaultImage from '../../../assets/images/default.png';
import {useState} from 'react'
import { useEffect } from 'react';
import axios from 'axios';
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
import { baseURL } from 'src/utils/api';
import { useAuth } from 'src/AuthContext';

Peopleprofile.propTypes = {
  isOpenFilter: PropTypes.bool,
  onOpenFilter: PropTypes.func,
  onCloseFilter: PropTypes.func,
};
   
export default function Peopleprofile({isOpenFilter,onOpenFilter,onCloseFilter}){
   const { apikey } = useAuth();
    var [user,setUser]=useState(JSON.parse(sessionStorage?.getItem('profiledetails')))
    let userprofile =JSON.parse(sessionStorage.getItem('profiledetails'))
  
    const [profileData, setProfileData] = useState()
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
    
const roleid = profileData?.role_id
    return(
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
                    Mobile Number &nbsp;: &nbsp;<span style={{ fontWeight: 100, color: '#444444' }}>{profileData?.contactNum}</span>
                  </Typography>
                  <Typography variant="subtitle1" gutterBottom style={{ color: '#444444' }}>
                    Work &nbsp;:  &nbsp;<span style={{ fontWeight: 100, color: '#444444' }}>{profileData?.workNum} </span>
                  </Typography>
                  <Typography variant="subtitle1" gutterBottom style={{ color: '#444444' }}>
                    Email &nbsp;: &nbsp;<span style={{ fontWeight: 100, color: '#444444' }}> {profileData?.officeMailId}</span>
                  </Typography>
                  <Typography variant="subtitle1" gutterBottom style={{ color: '#444444' }}>
                    Address &nbsp;: &nbsp;<span style={{ fontWeight: 100, color: '#444444' }}>{profileData?.address}</span>
                  </Typography>
                  <Typography variant="subtitle1" gutterBottom style={{ color: '#444444' }}>
                    PinCode &nbsp;: &nbsp;<span style={{ fontWeight: 100, color: '#444444' }}>{profileData?.pincode}</span>
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
                    <div style={{ textAlign: "center" }}>No Projects.</div>
                  }
                </CardContent>
              </Card>
            </div>
          </Stack>
        </Scrollbar>
    
      </Drawer>
    </>
    )
}