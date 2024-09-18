
import { Link as RouterLink } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import { useEffect,useState } from 'react';
import axios from 'axios';
import { styled } from '@mui/material/styles';
import { Card, Link, Container, Typography, Button } from '@mui/material';
import useResponsive from '../hooks/useResponsive';
import Page from '../components/Page';
import Logo from '../components/Logo';
import { LoginForm } from '../sections/auth/login';
import { auth, provider } from "../Firebase"
import AuthSocial from '../sections/auth/AuthSocial';
import Iconify from 'src/components/Iconify';
import { baseURL } from 'src/utils/api';
import { useAuth } from 'src/AuthContext';
import Cookies from 'js-cookie';
export default function Login() {
  const RootStyle = styled('div')(({ theme }) => ({
    [theme.breakpoints.up('md')]: {
      display: 'flex',
    },
  }));

  const [emailExists,setEmailExists] = useState(false);
  var userDetails;
  const { apikey, setApiKey } = useAuth();
  const apiHit = async (itm) => {
    var data = JSON.stringify({
      "email": itm?.user?.email,
      "profile_pic":itm?.user?.photoURL
    });
    var config = {
      method: 'post',
      url: baseURL + 'signIn',
      headers: {
        'Content-Type': 'application/json',
      },
      data: data
    };
    axios(config)
      .then(function (response) {
        sessionStorage?.setItem('user', JSON?.stringify(itm?.user))
        sessionStorage?.setItem('userId', response?.data?.role)
        if (response?.data?.code == 404) {
          alert("email id not found")
        }
        if(response?.data?.code == 400)
        {
          alert("Not Authorized")
        }
        else {
          Cookies.set('token', response.data.token, { expires: 1 }); // 1 day expiration
          sessionStorage.setItem('userDetails', JSON.stringify(response.data));
          userDetails = JSON.parse(JSON.stringify(response.data));
          if (userDetails.token) {
            setApiKey(userDetails.token);
            const updatedUserDetails = { ...userDetails };
            // delete updatedUserDetails.token;
          
            sessionStorage.setItem('userDetails', JSON.stringify(updatedUserDetails));
          }
    
          if (sessionStorage?.userDetails) {
            if (
              response.data.role == 2
            ) {
              navigate('/dashboard/projects')
            }
            else if (response.data.role == 8) {
              navigate('/dashboard/funderselshaktidashboard')
            }
            else if (response.data.role == 6 || response.data.role==13) {
              navigate('/dashboard/gelathiprogramdashboard')
            }
            else {
              navigate('/dashboard/app')
            }
          }
        }
      })
      .catch(function (error) {
        // console.log(error);
      });
  }


  const HeaderStyle = styled('header')(({ theme }) => ({
    top: 0,
    zIndex: 9,
    lineHeight: 0,
    width: '100%',
    display: 'flex',
    alignItems: 'center',
    position: 'absolute',
    padding: theme.spacing(3),
    justifyContent: 'space-between',
    [theme.breakpoints.up('md')]: {
      alignItems: 'flex-start',
      padding: theme.spacing(7, 5, 0, 7),
    },
  }));
  const SectionStyle = styled(Card)(({ theme }) => ({
    width: '100%',
    maxWidth: 464,
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    margin: theme.spacing(2, 0, 2, 2),
  }));
  const ContentStyle = styled('div')(({ theme }) => ({
    maxWidth: 480,
    margin: 'auto',
    minHeight: '100vh',
    display: 'flex',
    justifyContent: 'center',
    flexDirection: 'column',
    padding: theme.spacing(12, 0),
  }));
  const smUp = useResponsive('up', 'sm');
  const navigate = useNavigate();
  const mdUp = useResponsive('up', 'md');
  const googleLogin = async () => {
    auth.signInWithPopup(provider)
      .then(itm => { apiHit(itm) })
      .catch((error) => alert(error.message));
  
  }

  return (
    <Page title="Login" style={{ backgroundColor: "#ed6c02" }}>
      <RootStyle>
        <Container maxWidth="sm" >
          <ContentStyle >
            <div style={{ textAlign: "center" }}>
              <Logo />
            </div>
            <Typography variant="h4" gutterBottom align='center'  >
              Sign in to Buzz Staff
            </Typography>
            <Button onClick={googleLogin} style={{ textAlign: "center", alignContent: "center", }}
              sx={{
                '&:hover': {
                  backgroundColor: '#eaecde',
                },
                color: 'black', backgroundColor: '#ffffff'
              }}  >
              <Iconify icon="cib:google"></Iconify>&nbsp;&nbsp;&nbsp;&nbsp;Sign in with google
            </Button>
            <LoginForm />
          </ContentStyle>
        </Container>
      </RootStyle>
    </Page>
  );
}