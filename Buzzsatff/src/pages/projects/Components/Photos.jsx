import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import ListItemText from '@mui/material/ListItemText';
import ListItem from '@mui/material/ListItem';
import List from '@mui/material/List';
import Divider from '@mui/material/Divider';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import CloseIcon from '@mui/icons-material/Close';
import Slide from '@mui/material/Slide';
import { useState } from 'react';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import { Card,CardContent, Grid } from '@mui/material';
import Iconify from 'src/components/Iconify';
import Box from '@mui/material/Box';
import PropTypes from 'prop-types';
import { baseURL } from 'src/utils/api';
import axios from 'axios';
import { useAuth } from 'src/AuthContext';
const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});
    
function TabPanel(props) {
  const { children, value, index, ...other } = props;
  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}
TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired,
};
function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    'aria-controls': `simple-tabpanel-${index}`,
  };
}
export default function FullScreenDialog({ photos, setPhotos, batch }) {
   const { apikey } = useAuth();
  const userId = JSON.parse(sessionStorage.getItem('userDetails'))?.role;
  var idvalue = JSON.parse(sessionStorage?.getItem('userDetails'))?.id;
  const [images,setImages] = useState([])
  const [viewImage, setViewImage] = React.useState(false);
  const [reload,setReload]=React.useState(false);
  const [value, setValue] = React.useState(0);
  const [open, setOpen] = React.useState(false);
  const [trainingData,setTrainingData]=React.useState('');
  React.useEffect(() => {
    //setShown(shown)
    setOpen(photos)
  }, [photos])
  React.useEffect(() => {
    //setShown(shown)
    if(batch?.data?.id){
      getTrainingBatch()
    }
    
  }, [reload])
  React.useEffect(() => {
    //setShown(shown)
    if(batch?.data?.id){
      getTrainingBatch()
    }
  }, [])
  const handleClickOpen = () => {
    setPhotos(true)
    setOpen(true);
  };
  const handleChange = (event, newValue) => {
    setValue(newValue);
  };
  const handleClose = () => {
    setPhotos(false)
    setOpen(false);
  };
  function getBase64(file, callback) {
    const reader = new FileReader();
    reader.addEventListener('load', () => callback(reader.result));
    reader.readAsDataURL(file);
  }
const convertImage = (e) => {
    const imageData = URL.createObjectURL(e.target.files[0]);
    getBase64(e.target.files[0], function (base64Data) {
      setImages([...images, base64Data])
    setViewImage(true);
    });
  }
const UploadImages = async(e) =>{
  if (images.length === 0) {
    alert("No photos to upload.")
    throw new Error('No photos to upload.');
  }
    if(images.length<=0){
      alert("No Image is Selected!")
    }else{
      var raw = JSON.stringify({
        "project_id":  batch?.data?.project_id,
        "tb_id":batch?.data?.id,
        "trainer_id": idvalue,
        "day": e,
        "photos": [images.toString().slice(22,)]
    })
var config = {
  method: 'post',
  url: 'https://bdms.buzzwomen.org/appGoGambia/uploadTrainingPhotos',
  headers: { 
    'Content-Type': 'application/json',
    'Authorization': `${apikey}`
  },
  data : raw
};

axios(config)
.then(function (response) {
  setImages([])
setReload(!reload);
alert("Photo Uploaded Successfully..")
})
.catch(function (error) {
  // console.log(error);
});


}
    }
//Method to delete the images that is selected 
const deleteImage = (index) => {
images.splice(index, 1);
setImages([...images]);
};
const getTrainingBatch = async =>{
        
  var role = JSON.parse(sessionStorage?.getItem('userDetails'))?.role
  var idvalue = JSON.parse(sessionStorage?.getItem('userDetails'))?.id;
  var data = JSON.stringify({
    "batch_id": batch?.data?.id,
    "role_id": role
  });
  
  var config = {
    method: 'post',
    url: baseURL + 'getTrainingBatchData',
    headers: { 
      'Content-Type': 'application/json',
       'Authorization': `${apikey}`
    },
    data : data
  };
    axios(config)
    .then(function (response) {
      setTrainingData(response.data)

    })
    .catch(function (error) {
      // console.log(error);
    });
 
    
}
  return (
    <div>
      <Dialog
        fullScreen
        open={open}
        onClose={handleClose}
        TransitionComponent={Transition}
      >
        <AppBar sx={{ position: 'relative', bgcolor: '#ff7424' }}>
          <Toolbar>
            <IconButton
              edge="start"
              color="inherit"
              onClick={handleClose}
              aria-label="close"
            >
              <CloseIcon />
            </IconButton>
            <Typography sx={{ ml: 2, flex: 1 }} variant="h6" component="div" style={{color:'white'}}>
            {(userId==5)?"Add Photos":"Photos"}
            </Typography>
            {/* <Button autoFocus color="inherit" onClick={handleClose}>
              save
            </Button> */}
          </Toolbar>
        </AppBar>
        <List>
          <>
        
                         
  <Box sx={{ width: '100%' }}>
      <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
        <Tabs  value={value} onChange={handleChange} indicatorColor='warning' aria-label="basic tabs example">
          <Tab label="Day1" {...a11yProps(0)}  sx={{
                  ':hover': {
                    bgcolor: '#ffd796', // theme.palette.primary.main
                    color: '#ed6c02',
                  },
                  color: 'black',
                }} style={
                  value == 0
                    ? {
                        borderBottom: '3px solid #ed6c02',
                        color: '#ed6c02',
                      }
                    : null
                }/>
          <Tab label="Day2" {...a11yProps(1)} sx={{
                  ':hover': {
                    bgcolor: '#ffd796', // theme.palette.primary.main
                    color: '#ed6c02',
                  },
                  color: 'black',
                }} 
                 style={
                  value == 1
                    ? {
                        borderBottom: '3px solid #ed6c02',
                        color: '#ed6c02',
                      }
                    : null
                }
                />
        </Tabs>
      </Box>
      <TabPanel value={value} index={0}>
      {/* <Card id="delete-card-project" style={{marginTop:20}}> */}
{(userId==5)?<><div id="project-multidrawwer-div" style={{ display: 'flex' }}>
                {viewImage
                  ? images.map((i, index) => {
                      return (
                        <div style={{ display: 'flex', margin: '1rem' }}>
                          <img id="img-delete-project-multidrawer" src={i} style={{ height: '50px', width: '70px' }} alt="hello" />
                          <Iconify id="icon-delete-image"
                            onClick={() => {
                              deleteImage(index);
                            }}
                            icon={'typcn:delete'}
                            sx={{ width: 16, height: 16, ml: 1, color: 'red' }}
                          />
                        </div>
                      );
                    })
                  : null}
              </div>
              <br />
<div id="project-input-tag-div" style={{ display: 'flex' ,marginTop:"10px" , marginBottom:"10px"}}>
                  <label id="input-tag-project-multi-drawer" for="inputTag" style={{ cursor: 'pointer', display: 'flex' }}>
                    <Iconify id="camera-icon" icon={'mdi:camera'} sx={{ width: 25, height: 25, ml: 2, color: '#ff7424' }} />
                    &nbsp;
                    <input
                      style={{ display: 'none' }}
                      accept="image/png, image/gif, image/jpeg"
                      id="inputTag"
                      type="file"
                      onChange={(e) => {
                        convertImage(e);
                      }}
                    />
                  </label>
                
                  <br />
         
           <Button
           id="upload-btn"
           onClick={()=>UploadImages("1")}
           
           sx={{
             '&:hover': {
               backgroundColor: '#ffd796',
             },
             color: '#ff7424',
             backgroundColor: '#ffd796',
             marginLeft: '10px',
           }}
         >
           Upload   
         </Button>
         </div></>:null}
{/* </Card> */}
      <Card > <CardContent>  
        <Grid container spacing={2}>
  <Grid  xs={10} sm={6} style={{paddingRight:5}} >
    
    {(photos )?<img id="img-event-data" src={(trainingData?.photos[0].photo1)?(trainingData?.photos[0]?.photo1):batch?.photos[0].photo1} />:"No Photos"}</Grid>
    <Grid  xs={10} sm={6} style={{paddingRight:5}} >{(photos)?<img id="img-event-data" src={(trainingData?.photos[0].photo2)?(trainingData?.photos[0]?.photo2):batch?.photos[0].photo2} />:null}</Grid></Grid></CardContent></Card> 
      </TabPanel>
      <TabPanel value={value} index={1}>
    
{(userId==5)?<>
<div id="project-multidrawwer-div" style={{ display: 'flex' }}>
                {viewImage
                  ? images.map((i, index) => {
                      return (
                        <div style={{ display: 'flex', margin: '1rem' }}>
                          <img id="img-delete-project-multidrawer" src={i} style={{ height: '50px', width: '70px' }} alt="hello" />
                          <Iconify id="icon-delete-image"
                            onClick={() => {
                              deleteImage(index);
                            }}
                            icon={'typcn:delete'}
                            sx={{ width: 16, height: 16, ml: 1, color: 'red' }}
                          />
                        </div>
                      );
                    })
                  : null}
              </div>
              <br />
<div id="project-input-tag-div" style={{ display: 'flex' ,marginTop:"10px" , marginBottom:"10px"}}>
                  <label id="input-tag-project-multi-drawer" for="inputTag" style={{ cursor: 'pointer', display: 'flex' }}>
                    <Iconify id="camera-icon" icon={'mdi:camera'} sx={{ width: 25, height: 25, ml: 2, color: '#ff7424' }} />
                    &nbsp;
                    <input
                      style={{ display: 'none' }}
                      accept="image/png, image/gif, image/jpeg"
                      id="inputTag"
                      type="file"
                      onChange={(e) => {
                        convertImage(e);
                      }}
                    />
                  </label>
                
                  <br />
         
           <Button
           id="upload-btn"
           onClick={()=>UploadImages("2")}
           
           sx={{
             '&:hover': {
               backgroundColor: '#ffd796',
             },
             color: '#ff7424',
             backgroundColor: '#ffd796',
             marginLeft: '10px',
           }}
         >
           Upload   
         </Button>
         </div></>:null}
 <Card><CardContent>
  <Grid container spacing={2} >
  <Grid  xs={10} sm={6} style={{paddingRight:5}} >
  {(photos)?<img id="img-event-data" src={(trainingData?.photos[1].photo1)?(trainingData?.photos[1]?.photo1):batch?.photos[1].photo1}/>:"No Photos"}</Grid>
  <Grid  xs={10} sm={6} style={{paddingLeft:5}} >
{(photos)?<img id="img-event-data" src={(trainingData?.photos[1].photo2)?(trainingData?.photos[1]?.photo2):batch?.photos[1].photo2} />:null}
</Grid></Grid> </CardContent></Card>
      </TabPanel>
    
    </Box>
  
          </>
        </List>
      </Dialog>
    </div>
  );
}