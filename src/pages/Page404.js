import { Link as RouterLink } from 'react-router-dom';
import { styled } from '@mui/material/styles';
import { Button, Typography, Container, Box ,Grid} from '@mui/material';
import Page from '../components/Page';
import { useEffect,useState } from 'react';
const ContentStyle = styled('div')(({ theme }) => ({
  maxWidth: 480,
  margin: 'auto',
  minHeight: '100vh',
  display: 'flex',
  justifyContent: 'center',
  flexDirection: 'column',
  padding: theme.spacing(12, 0)
}));
export default function Page404() {

  const [countdown, setCountdown] = useState(15);

  useEffect(() => {
    const timer = setInterval(() => {
      setCountdown((prevCountdown) => prevCountdown - 1);
    }, 1000);

    return () => {
      clearInterval(timer);
    };
  }, []);

  useEffect(() => {
    if (countdown === 0) {
      // Redirect to the login page
      window.location.href = "/";
    }
  }, [countdown]);

  const circleStyle = {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: '50%',
    width: '40px',
    height: '40px',
    backgroundColor: '#f3f3f3',
    color: '#000',
    fontSize: '20px',
    fontWeight: '700',
  };


  return (
    <Page title="404 Page Not Found">
      <Container>
        <ContentStyle sx={{ textAlign: 'center', alignItems: 'center' }}>
          <Typography variant="h3" paragraph>
            Sorry, page not found!<br/>Session Expired
          </Typography>
         <Typography variant="h4" style={{display:'flex',fontWeight:700}} >Redirecting within&nbsp;
         <Box component="span" style={circleStyle}>
          {countdown}
        </Box>&nbsp;
     Seconds</Typography> 
          <Typography sx={{ color: 'text.secondary' }}>
            Sorry, we couldn’t find the page you’re looking for. Perhaps you’ve mistyped the URL? Be
            sure to check your spelling.
          </Typography>

          <Box
            component="img"
            src="/static/illustrations/illustration_404.svg"
            sx={{ height: 260, mx: 'auto', my: { xs: 5, sm: 10 } }}
          />
         
          <Button to="/" size="large" variant="contained" component={RouterLink}>
            Go to Login
          </Button>
        </ContentStyle>
      </Container>
    </Page>
  );
}
