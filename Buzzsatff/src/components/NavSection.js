import { useState,useEffect } from 'react';
import PropTypes from 'prop-types';
import { NavLink as RouterLink, matchPath, useLocation } from 'react-router-dom';
import { alpha, useTheme, styled } from '@mui/material/styles';
import { Box, List, Collapse, ListItemText, ListItemIcon, ListItemButton } from '@mui/material';
import Iconify from './Iconify';
import { NoInternetConnection } from 'src/connection';

const ListItemStyle = styled((props) => <ListItemButton disableGutters {...props} />)(({ theme }) => ({
  ...theme.typography.body2,
  height: 48,
  position: 'relative',
  textTransform: 'capitalize',
  borderRadius: theme.shape.borderRadius,
  '&:hover': {
    backgroundColor: '#eeeeee',
    color: '#ff7424'
  },
}));
const ListItemIconStyle = styled(ListItemIcon)({
  width: 22,
  height: 22,
  color: 'inherit',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  color: '#ff7424'
});
// ----------------------------------------------------------------------
NavItem.propTypes = {
  item: PropTypes.object,
  active: PropTypes.func,
};
function NavItem({ item, active }) {
  const theme = useTheme();
  const isActiveRoot = active(item.path);
  const { title, path, icon, info, children } = item;
  const [open, setOpen] = useState(isActiveRoot);
  const handleOpen = () => {
    setOpen((prev) => !prev);
  };
  const activeRootStyle = {
    color: '#ff7424',
    fontWeight: 'fontWeightMedium',
    bgcolor: "#ffd796",
  };
  const activeSubStyle = {
    color: '#ff7424',
    fontWeight: 'fontWeightMedium',
    bgcolor: '#ffd796'
  };
  if (children) {
    return (
      <>
        <ListItemStyle
          onClick={handleOpen}
          sx={{
            ...(isActiveRoot && activeRootStyle),
            '&:focus': {
              backgroundColor: '#ffd796',
              color: '#ff7424'
            },
            '&:hover': {
              backgroundColor: '#ffd796',
              color: '#ff7424'
            },
          }}
        >
          <ListItemIconStyle>{icon && icon}</ListItemIconStyle>
          <ListItemText disableTypography primary={title} />
          {info && info}
          <Iconify
            icon={open ? 'eva:arrow-ios-downward-fill' : 'eva:arrow-ios-forward-fill'}
            sx={{ width: 16, height: 16, ml: 1 }}
          />
        </ListItemStyle>
        <Collapse in={open} timeout="auto" unmountOnExit>
          <List component="div" disablePadding>
            {children.map((item) => {
              const { title, path } = item;
              const isActiveSub = active(path);
              return (
                <ListItemStyle
                  key={title}
                  component={RouterLink}
                  to={path}
                  sx={{
                    ...(isActiveSub && activeSubStyle),
                  }}
                >
                  <ListItemIconStyle>
                    <Box
                      component="span"
                      sx={{
                        width: 4,
                        height: 4,
                        display: 'flex',
                        borderRadius: '50%',
                        alignItems: 'center',
                        justifyContent: 'center',
                        bgcolor: 'text.disabled',
                        transition: (theme) => theme.transitions.create('transform'),
                        ...(isActiveSub && {
                          transform: 'scale(2)',
                          bgcolor: 'primary.main',
                        }),
                      }}
                    />
                  </ListItemIconStyle>
                  <ListItemText disableTypography primary={title} />
                </ListItemStyle>
              );
            })}
          </List>
        </Collapse>
      </>
    );
  }
  return (
    <ListItemStyle
      component={RouterLink}
      to={path}
      sx={{
        ...((isActiveRoot) && activeRootStyle),
      }}
      style={{ marginTop: "0.3rem" }}
    >
      {isActiveRoot}
      <ListItemIconStyle>{icon && icon}</ListItemIconStyle>
      <ListItemText disableTypography primary={title} />
      {info && info}
    </ListItemStyle>
  );
}
NavSection.propTypes = {
  navConfig: PropTypes.array,
};
export default function NavSection({ navConfig, ...other }) {
  const [isOnline, setOnline] = useState(true);
 const projectline = navConfig?.filter(itm=>itm?.title ==="Plan Of Action")
  // On initization set the isOnline state.
  useEffect(()=>{
      setOnline(navigator.onLine)
  },[])

  // event listeners to update the state 
  window.addEventListener('online', () => {
      setOnline(true)
  });

  window.addEventListener('offline', () => {
      setOnline(false)
  });
  const mainData = isOnline? navConfig:projectline

  const { pathname } = useLocation();
  const match = (path) => (path ? !!matchPath({ path, end: false }, pathname) : false);
  return (
    <Box {...other}>
      <List disablePadding sx={{ p: 1 }}>
        {mainData.map((item) => (
          <NavItem key={item.title} item={item} active={match} />
        ))}
      </List>
    </Box>
  );
}
