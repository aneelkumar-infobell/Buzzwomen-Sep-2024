import { useState } from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import { styled } from '@mui/material/styles';
import DashboardNavbar from './DashboardNavbar';
import DashboardSidebar from './DashboardSidebar';
import Footer from 'src/pages/offlineStatusbar';

const APP_BAR_MOBILE = 64;
const APP_BAR_DESKTOP = 92;

const RootStyle = styled('div')({
  display: 'flex',
  minHeight: '100vh', // Set min height to 100vh to ensure it takes the full viewport height
  overflow: 'hidden',
});

const MainStyle = styled('div')(({ theme }) => ({
  flexGrow: 1,
  overflow: 'auto',
  minHeight: '100%',
  paddingTop: APP_BAR_MOBILE + 24,
  paddingBottom: theme.spacing(10),
  [theme.breakpoints.up('lg')]: {
    paddingTop: APP_BAR_DESKTOP + 24,
    paddingLeft: theme.spacing(2),
    paddingRight: theme.spacing(2),
  },
}));

const NoSearchMainStyle = styled('div')(({ theme }) => ({
  flexGrow: 1,
  overflow: 'auto',
  minHeight: '100%',
  paddingTop: APP_BAR_MOBILE,
  paddingBottom: theme.spacing(10),
  paddingLeft: theme.spacing(2),
  paddingRight: theme.spacing(2),
  [theme.breakpoints.up('lg')]: {
    paddingTop: 2,
  },
}));

const FooterContainer = styled('div')({
  position: 'fixed', // Set the position to 'fixed' to keep the Footer at the bottom
  left: 0,
  bottom: 0,
  width: '100%', // Set the width to occupy the full screen
  zIndex: 9999, // Set a higher z-index value to ensure it stays above other elements
});

export default function DashboardLayout() {
  const { pathname } = useLocation();
  const [open, setOpen] = useState(false);
  const noSearchRequired = ['/dashboard/planofaction'];

  return (
    <div>
      <RootStyle>
        <DashboardNavbar onOpenSidebar={() => setOpen(true)} />
        <DashboardSidebar isOpenSidebar={open} onCloseSidebar={() => setOpen(false)} />
        {noSearchRequired.includes(pathname) ? (
          <NoSearchMainStyle>
            <Outlet />
          </NoSearchMainStyle>
        ) : (
          <MainStyle>
            <Outlet />
          </MainStyle>
        )}
      </RootStyle>
      <FooterContainer>
        <Footer />
      </FooterContainer>
    </div>
  );
}
