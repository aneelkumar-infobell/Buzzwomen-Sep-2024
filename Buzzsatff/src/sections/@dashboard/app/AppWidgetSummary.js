// @mui
import PropTypes from 'prop-types';
import { alpha, styled } from '@mui/material/styles';
import { Card, Typography } from '@mui/material';
// utils
import { fShortenNumber } from '../../../utils/formatNumber';
// components
import Iconify from '../../../components/Iconify';

// ----------------------------------------------------------------------

const IconWrapperStyle = styled('div')(({ theme }) => ({
  margin: 'auto',
  display: 'flex',
  borderRadius: '50%',
  alignItems: 'center',
  width: theme.spacing(8),
  height: theme.spacing(8),
  justifyContent: 'center',
  marginBottom: theme.spacing(3),
}));

// ----------------------------------------------------------------------

AppWidgetSummary.propTypes = {
  title: PropTypes.string.isRequired,
  color: PropTypes.string,
  icon: PropTypes.string,
  total: PropTypes.number.isRequired,
  sx: PropTypes.object,
  style: PropTypes.object,

};

export default function AppWidgetSummary({ title, total, icon, color = 'primary', sx, style, ...other }) {




  return (
    <Card
      sx={{
        py: 5,
        boxShadow: 0,
        textAlign: "center",
        color: (theme) => theme.palette[color].darker,
        bgcolor: (theme) => theme.palette[color].lighter,
        ...sx,
        height: 
        {
          xs: 180
          ,
          sm: 200,
          md: 210,
          lg: 210,
          xl: 210,
        
        
        }
        ,
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        cursor:'context-menu'
      }}
      {...other}
    >
      <div>
        {(icon) ? <IconWrapperStyle
          sx={{
            width: {
              xs: 40,
              sm: 100,
          
              lg: 100,
              xl: 100,
            },
            height:{
              xs: 40,
              sm: 100,
            
              lg: 100,
              xl: 100,
            },
            color: (theme) => theme.palette[color].dark,
            backgroundImage: (theme) =>
              `linear-gradient(135deg, ${alpha(theme.palette[color].dark, 0)} 0%, ${alpha(
                theme.palette[color].dark,
                0.24
              )} 100%)`,
              marginTop:{xs:3},marginBottom:0,
          }}
        >
          <Iconify icon={icon} width={24} height={24} />
        </IconWrapperStyle> : null}
        <span style={{ opacity: 0.72,  color: '#103996' ,marginTop:'0px', marginBottom:{
xs:"10px"
        },
      fontSize:{
        xs: '0.5rem',sm:'14px',md:'16px',lg:'16px',xl:'16px'
        
      }}}><strong>{title}</strong></span><br />
        <span style={{  color: "#103996" ,marginBottom:10, fontSize:{
        xs: '12px',sm:'14px',md:'16px',lg:'16px',xl:'16px'
        
      }}}><strong>
          {total}
        </strong></span>

        {/* <Typography variant="h4" sx={{ opacity: 0.72 }}>
          {title}
        </Typography> */}
        {/* <Typography variant="h5">{fShortenNumber(total)}</Typography> */}
        {/* <Typography variant="h2">{(total)}</Typography> */}
      </div>


      {/* <Typography variant="subtitle2" sx={{ opacity: 0.72 }}>
        {title}
      </Typography> */}
    </Card>
  );
}
