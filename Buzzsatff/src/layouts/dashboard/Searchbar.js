import { useState, useEffect } from 'react';
import { styled, alpha } from '@mui/material/styles';
import { Input, Slide, Button, IconButton, InputAdornment, ClickAwayListener,TextField } from '@mui/material';
import { Box, Stack, AppBar, Toolbar, } from '@mui/material';
import Iconify from '../../components/Iconify';
import useResponsive from '../../hooks/useResponsive';
export default function Searchbar({ getSearch }) {
  const [isOpen, setOpen] = useState(false);
  var searchData = ''
  const handleOpen = () => {
    setOpen((prev) => !prev);
  };
  const isDesktop = useResponsive('up', 'lg');
  const handleClose = () => {
    setOpen(false);
  };
  const APPBAR_MOBILE = 64;
  const APPBAR_DESKTOP = 92;
  const SearchbarStyle = styled('div')(({ theme }) => ({
    top: 0,
    left: isDesktop == false ? -70 : -0,
    zIndex: 99,
    width: '100%',
    display: 'flex',
    position: 'absolute',
    alignItems: 'center',
    height: APPBAR_MOBILE,
    backdropFilter: 'blur(6px)',
    WebkitBackdropFilter: 'blur(6px)', // Fix on Mobile
    padding: theme.spacing(0, 3),
    boxShadow: theme.customShadows.z8,
    backgroundColor: `${alpha(theme.palette.background.default, 0.72)}`,
    [theme.breakpoints.up('md')]: {
      height: APPBAR_DESKTOP,
      padding: theme.spacing(0, 5),
    },
  }));
  const DRAWER_WIDTH = 280;
  const RootStyle = styled(AppBar)(({ theme }) => ({
    boxShadow: 'none',
    backdropFilter: 'blur(6px)',
     WebkitBackdropFilter: 'blur(6px)', // Fix on Mobile
     backgroundColor: alpha(theme.palette.background.default, 0.72),
    [theme.breakpoints.up('lg')]: {
      width: `calc(100% - ${DRAWER_WIDTH + 1}px)`,
    },
    left: isDesktop == false ? 70 : null
  }));
  const ToolbarStyle = styled(Toolbar)(({ theme }) => ({
    minHeight: APPBAR_MOBILE,
    [theme.breakpoints.up('lg')]: {
      minHeight: APPBAR_DESKTOP,
      padding: theme.spacing(0, 5),
    },
  }));
  const changeText = (e) => {
    searchData = e?.target?.value
  }
  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      getSearch(searchData);
      handleClose();
    }
  };
  return (
    <RootStyle>
      <ToolbarStyle>
        <ClickAwayListener onClickAway={handleClose}>
          <div>
            {!isOpen && (
              
               <Input id="outlined-basic" color="common" disabled
                 placeholder='Search...'
                 onClick={handleOpen}
                 sx={{ m: 2, fontWeight: 'fontWeightBold',width:'70vw'}}
                 startAdornment= {
                   <InputAdornment position="start">
                    <IconButton >
                   <Iconify icon="eva:search-fill"  sx={{  width: 20, height: 20 }}  />
                    </IconButton>
                   </InputAdornment>
                 }
             />
            )}
            <Slide direction="down" in={isOpen} mountOnEnter unmountOnExit>
              <SearchbarStyle>
                <Input
                  autoFocus
                  fullWidth
                  onChange={(e) => { changeText(e) }}
                  onKeyDown={handleKeyPress}
                  disableUnderline
                  placeholder="Search…"
                  startAdornment={
                    <InputAdornment position="start">
                      <Iconify icon="eva:search-fill" sx={{ color: 'text.disabled', width: 20, height: 20 }} />
                    </InputAdornment>
                  }
                  sx={{ margin:5, fontWeight: 'fontWeightBold',width:'70vw'}}
                />
                <Button onClick={() => {
                  getSearch(searchData)
                  handleClose()
                }} sx={{
                  '&:hover': {
                    backgroundColor: '#ffd796',
                    color: '#ff7424'
                  },
                  color: 'white', backgroundColor: '#ff7424'
                }}>
                  Search
                </Button>
              </SearchbarStyle>
            </Slide>
          </div>
        </ClickAwayListener>
      </ToolbarStyle>
    </RootStyle>
  );
}