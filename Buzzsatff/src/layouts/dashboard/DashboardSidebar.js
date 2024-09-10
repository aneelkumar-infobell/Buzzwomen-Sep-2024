import PropTypes from 'prop-types';
import { useEffect, useState } from 'react';
import { Link as RouterLink, useLocation } from 'react-router-dom';
import { styled } from '@mui/material/styles';
import { Box, Link, Button, Drawer, Typography, Avatar, Stack } from '@mui/material';
import useResponsive from '../../hooks/useResponsive';
import Logo from '../../components/Logo';
import Scrollbar from '../../components/Scrollbar';
import NavSection from '../../components/NavSection';
import navConfig from './NavConfig';
import defaultImage from '../../assets/images/default.png';

// ----------------------------------------------------------------------

const DRAWER_WIDTH = 280;
const RootStyle = styled('div')(({ theme }) => ({
  [theme.breakpoints.up('lg')]: {
    flexShrink: 0,
    width: DRAWER_WIDTH,
  },
}));
const AccountStyle = styled('div')(({ theme }) => ({
  borderRadius: Number(theme.shape.borderRadius) * 1.5,
}));
DashboardSidebar.propTypes = {
  isOpenSidebar: PropTypes.bool,
  onCloseSidebar: PropTypes.func,
};
export default function DashboardSidebar({ isOpenSidebar, onCloseSidebar }) {
  const data = sessionStorage?.getItem('userId')
  var account = sessionStorage?.getItem('userDetails')
  account = JSON.parse(account)
  var roleValue = JSON.parse(sessionStorage.getItem('userDetails'))?.trainer_type;

  const { pathname } = useLocation();
  const isDesktop = useResponsive('up', 'lg');
  const [filteredNavConfig, setNavConfig] = useState([])
  const roleDashboard = {
     1:['1','16','17','18','5','6','7','8','9','11','14','10','12','13'],
     2: ['7', '5', '8', '9', '10', '12','14','13'],
     3:['1','16','17','18','5','6','7','8','9','11','10','12','14','13'],
     4:['4','16','17','18','5','6','7','8','9','10','12','14','13'],
     5:['2','5','6','7','10','12','13'],
     6:['16','17','18','6','7','10','12','13'],
     8: ["21","22","20","19","10","13"],
     9:['1','16','17','18','5','6','7','8','10','12','13'],
     11:['1','15','16','17','18','5','6','7','8','9','11','10','12','13'],
     12:['1','16','17','18','5','6','7','8','9','14','11','10','12','13'],
     
    13:['16','17','18','6','7','14','10','12','13'],
    15:['1','8']
     
     
    }

    const seniorTrainerDashboard={
      5:['2','5','23','6','7','8','9','10','12','13']
    }

 if(roleValue==='senior'){ 

    useEffect(()=>{
    let temp=[]
    for(let r=0;r<seniorTrainerDashboard[data].length;r++){
      let s = seniorTrainerDashboard[data][r]
      if(navConfig[s].id.includes(data)){
        temp.push(navConfig[s])
      }
    }
    
    setNavConfig(temp)
  
  },[])
 }
 
 else{
  useEffect(() => {
  let temp = []
  for (let r = 0; r < roleDashboard[data].length; r++) {
    let s = roleDashboard[data][r]
    if (navConfig[s].id.includes(data)) {
      temp.push(navConfig[s])
    }
  }
  setNavConfig(temp)
}, [])
 }
  useEffect(() => {

    if (isOpenSidebar) {
      onCloseSidebar();
    }
  }, [pathname]);
  const renderContent = (
    <Scrollbar
      sx={{
        height: 1,
        '& .simplebar-content': { height: 1, display: 'flex', flexDirection: 'column' },
      }}
    >
      <div style={{ textAlign: "center" }}>
        <Logo />
      </div>
      <Box sx={{ mb: 5, mx: 2.5 }} backgroundColor="#ff7424">
        <Link underline="none" component={RouterLink} to="/dashboard/profile">
          <div style={{ paddingTop: 20, paddingLeft: 100 }}>
            <Avatar src={account?.profile_pic} alt="photoURL" />
        </div>
          <Box sx={{ ml: 2 }}>
            <Typography variant="subtitle2" color='#ffffff' style={{ textAlign: "center" }}>
              Welcome, {account.first_name}  {(account.trainer_type=='senior')?<><br/>(Senior Trainer)</>:'('+(account.role_name)+')'}
            </Typography>
            <Typography variant="body2" sx={{ color: '#ffffff' }} style={{ textAlign: 'center' }}>
            
            </Typography>
          </Box>
        </Link>
      </Box>
      <NavSection navConfig={filteredNavConfig} />
      <Box sx={{ flexGrow: 1 }} />
    </Scrollbar>
  );
  return (
    <RootStyle>
      {!isDesktop && (
        <Drawer
          open={isOpenSidebar}
          onClose={onCloseSidebar}
          PaperProps={{
            sx: { width: DRAWER_WIDTH },
          }}
        >
          {renderContent}
        </Drawer>
      )}
      {isDesktop && (
        <Drawer
          open
          variant="persistent"
          PaperProps={{
            sx: {
              width: DRAWER_WIDTH,
              bgcolor: 'background.default',
              borderRightStyle: 'dashed',
            },
          }}
        >
          {renderContent}
        </Drawer>
      )}
    </RootStyle>
  );
}
