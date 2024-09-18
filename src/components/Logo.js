import PropTypes from 'prop-types';
import { Link as RouterLink } from 'react-router-dom';
// @mui
import { useTheme } from '@mui/material/styles';
import  { Box, Grid, Icon } from '@mui/material';
// ----------------------------------------------------------------------
Logo.propTypes = {
  disabledLink: PropTypes.bool,
  sx: PropTypes.object,
};
export default function Logo({ disabledLink = false, sx }) {
  const theme = useTheme();
  const PRIMARY_LIGHT = theme.palette.primary.light;
  const PRIMARY_MAIN = theme.palette.primary.main;
  const PRIMARY_DARK = theme.palette.primary.dark;
  // OR
  // const logo =Grid component="img" src="/static/logo.svg" sx={{ width: 40, height: 40, ...sx }} />
  const logo = (
    <Icon container component="img" src="/static/ic_launcher-web.png" sx={{height:70,width:70}} style={{width:"30%",height:"auto"}} />
    
  );
  if (disabledLink) {
    return <>{logo}</>;
  }
  return <>{logo}</>
}