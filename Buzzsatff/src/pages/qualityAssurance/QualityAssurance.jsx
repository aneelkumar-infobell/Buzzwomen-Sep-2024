import { useState, useEffect } from 'react';
import React from 'react';
import axios from 'axios';
import QualityAssuranceFilter from './QualityAssuranceFilters/QualityAssurancefilter';
import { useTheme } from '@mui/material/styles';
import {
  Grid,
  Container,
  Typography,
  Stack,
  Divider,
  Card,
  CardContent,
  Button,
  Box,
  ButtonGroup,
  IconButton,
} from '@mui/material';
import { Link } from 'react-router-dom';
import LocationQuality from './QualityAssuranceFilters/Location';
import CircularProgress from '@mui/material/CircularProgress';
import Iconify from '../../components/Iconify';
import Page from '../../components/Page';
import Chip from '@mui/material/Chip';
import { AppWidgetSummary } from '../../sections/@dashboard/app';
import { useNavigate } from 'react-router-dom';
import FiltersHome from '../Filters/FiltersHome';
import DialogForm from './components/DialogForm'
import {baseURL} from 'src/utils/api';
import { useAuth } from 'src/AuthContext';
export default function QualityAssessment() {
  
    const { apikey } = useAuth();
  
  const [loader, setLoader] = useState(false)
const [errorMsg,setErrormsg]=useState('');
  const [openFilter, setOpenFilter] = useState(false);

  const [filterData, setFilterData] = useState({});

  const [slected, setSelected] = useState(null);

  

  const [open, setOpen] = React.useState(false);

  const [batch,setBatch] = useState('')

  const [shown,setShown] = React.useState(false);
  const [summaryData, setSummaryData] = useState([]);

  const styles = {
    buttonStyle: { boxShadow: "none", borderRadius: "7px", backgroundColor: "#edeff1", fontWeight: 500, textAlign: "left", width:"100%"},
    tableRowStyle: { justifyContent: 'center', alignItems: 'center', marginLeft: 200 },
    linkStyle: { textDecoration: 'none', color: "black" },
    cirleMeetingbuttonStyle: { boxShadow: "none", borderRadius: "7px", backgroundColor: "#edeff1", fontWeight: 500, textAlign: "left", marginBottom:"20px" },
  }

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleDelete = () => {
 
   
    setSelected(null)
    apiHit();
  }


  const handleOpenFilter = () => {
    setOpenFilter(true);
  };

  const handleCloseFilter = () => {
    setOpenFilter(false);
  };

  const apiHit = async (id, i, g) => {
    setLoader(true)
    var role = JSON.parse(sessionStorage.getItem('userDetails'))?.role
    var userid = JSON.parse(sessionStorage.getItem('userDetails'))?.id
   
    const data = {
      "Emp_id":JSON.parse(userid),
      "Role_id":JSON.parse(role),
      "Filter":g ? g:"",
      "Filter_District":g ==="Location" ? id :"",
      "Filter_Taluk":g==="Location" ? i :"",
      "Filter_Id":g === "Role" ? JSON.stringify(id):"",
      "Filter_StartDate":g === "Date" ? id :"",
      "Filter_EndDate":g === "Date" ? i :""
     
  }
    const config = {
      method: 'post',
      url: baseURL +'getDashboard',
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
         'Authorization': `${apikey}`
      },
      data,
    };

    axios(config)
      .then((response) => { 
        setLoader(false)
setSummaryData(response?.data);
      })
      .catch((error) => {
        // console.log(error);
      });
  };

  useEffect(() => {
    apiHit();
  }, []);

  if (loader) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: "center", height: '70vh' }}>
        <CircularProgress sx={{color:'#ff7424'}}/>
      </Box>
    )
  }
  const onSumbit = (e, i) => {
    setSelected({ type: 'Location', name: `  State : Karnataka ; District : ${e?.district?.name} ; Taluk : ${e?.talaq}` })
    handleCloseFilter()
    apiHit(e?.district?.name,e?.talaq,"Location")
  }
  const onDateSubmit = (e) => {
    setSelected({ type: 'Date Range', name: `${e?.startDate} to ${e?.endDate}` })
    apiHit(e?.startDate, e?.endDate, "Date")
    setFilterData({ from_date: e?.startDate, to_date: e?.endDate })
    handleCloseFilter()
  }
  const getData = (itm,i) => {
    setSelected({type:"Role",itm})
    handleCloseFilter()
    apiHit(itm?.id,i,"Role")
   
  }
  const userrole = JSON.parse(sessionStorage?.getItem('userDetails'))?.role;
  return (
    <>
      <Page title="Dashboard">
        <Stack direction="row" alignItems="center" justifyContent="space-between">
          <Typography variant="h5" gutterBottom sx={{ ml: 4 }}>
           Quality Assessment  
          </Typography>
          {(userrole!=2)?<Button
            style={{ float: 'right', color: '#ff7424' }}
            sx={{ '&:hover': { backgroundColor: '#ffd796' } }}
            onClick={() => {
              handleOpenFilter();
            }}
          >
            Filter
          </Button>:null}
          <QualityAssuranceFilter isOpenFilter={openFilter} onCloseFilter={handleCloseFilter}  onSumbit={onSumbit} onDateSubmit={onDateSubmit} getData={getData}/>
        </Stack>
        <Container maxWidth="xl">
         
        {
    slected && (slected.type =='Date Range')&& <Chip label={`${slected?.type} : ${slected?.name} `} onDelete={() => { handleDelete(slected) }}  />
  }
{
    slected && (slected.type =='Location')&& <Chip label={`${slected?.type} : ${slected?.name} `} onDelete={() => { handleDelete(slected) }}  />
}
{
  slected && (slected?.type=='Role') && <Chip label={` ${slected?.itm?.name} `} onDelete={() => { handleDelete(slected) }}  />
}
  <Grid justifyContent="center" container spacing={3} marginTop={1}>
            <Grid onClick={handleClickOpen} item xs={4} sm={8} md={4}>
              <AppWidgetSummary title="Self Shakti Training Program" total={summaryData?.data?.SStraining} color="primary" />
            </Grid>

            <Grid onClick={handleClickOpen} item xs={4} sm={8} md={4}>
              <AppWidgetSummary title="Gelathi Program" total={summaryData?.data?.GelathiProgram} color="secondary" />
            </Grid>
            <Grid item xs={4} sm={8} md={4}>
              <AppWidgetSummary title="Self Shakti by Gelathi" total={summaryData?.data?.SSbyGelathi} color="gelathis" />
            </Grid>
          </Grid>
          <div style={{display:'flex', flexDirection:'column', justifyContent:"center",alignItems:"center" ,width:"100%"}}>
          <div style={{marginTop:"20px" }}>
          <Link to="/dashboard/qualityAssessment/selfsakthi"
            style={styles.linkStyle}>
                    <Button variant="secondary"
                     onClick={()=>{
                     }}
                     style={styles.buttonStyle}
                    endIcon={<IconButton> <Iconify style={{ color: "black" }} icon="material-symbols:add" /> </IconButton>}
                    startIcon={<IconButton> <Iconify style={{ color: "black" }} icon="ic:sharp-supervised-user-circle" /></IconButton>}>
                    <span style={{ width: "200px" }}>  Quality Assessment Form</span>
                  </Button>
                  </Link>
                  </div>
          </div>
        </Container>
      </Page>
    </>
  );
}
