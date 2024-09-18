import React from 'react';
import Iconify from '../../../components/Iconify';
import { Icon } from '@iconify/react';
import axios from 'axios';
import { Stack,IconButton,Button, DialogContent,DialogContentText,TextField,Grid,Typography , Radio,FormControlLabel,Card,CardContent,FormGroup,Checkbox} from '@mui/material';
import RadioGroup from '@mui/material/RadioGroup';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Dialog from '@mui/material/Dialog';
import Slide from '@mui/material/Slide';
import { useEffect } from 'react';
import { useState } from 'react';
import { baseURL } from 'src/utils/api';
import { useAuth } from 'src/AuthContext';
import Gelathifacilitatorprofile from './Gelathifacilitatorprofile';
const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
  });

export default function Gelathifacilitatorlist(){
  const { apikey } = useAuth();
    const [data1, setData1] = useState('')
    const [open, setOpen] = React.useState(false);
    const [openFilter, setOpenFilter] = useState(false);
    const handleClickOpen = () => {
        setOpen(true);
      };
      const handleClose=()=>{
        setOpen(false)
      } 
      const handleOpenFilter = () => {
        setOpenFilter(true);
      };
      const handleCloseFilter = () => {
        setOpenFilter(false);
      };
      const id = sessionStorage?.getItem("proId")
      useEffect(() => {
        projData();
    
      }, [])
      const roleid = JSON.parse(sessionStorage.getItem('userDetails'))?.role
      const projData = async => {
        var userDetails = JSON.parse(sessionStorage?.getItem('userDetails'))
        var role = JSON.parse(sessionStorage?.getItem('userDetails'))?.role
        var idvalue = JSON.parse(sessionStorage?.getItem('userDetails'))?.id;
        var data = JSON.stringify({
          "project_id": id,
          "role_id": role,
          "emp_id": idvalue
        });
    
        var config = {
          method: 'post',
          url: baseURL + 'getProjectData',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `${apikey}`
          },
          data: data
        };
    
        axios(config)
          .then(function (response) {
            setData1({...response.data.list})
          })
          .catch(function (error) {
            // console.log(error);
          });
    
      }
    
      const viewUser = (item) => {
        sessionStorage.setItem('profiledetails', JSON.stringify(item))
       handleOpenFilter()
      }
     
    return(
        <>
      
        <div style={{position:'absolute',right:0,float:'right',marginLeft:0}}>
      
      <IconButton onClick={handleClickOpen}>
       <Iconify icon="material-symbols:add" width={20} height={20}  color="black"  />
      </IconButton>
      </div> 
      <Dialog fullScreen open={open} onClose={handleClose} TransitionComponent={Transition}>
      <AppBar sx={{ position: 'relative', bgcolor: '#ff7424' }}>
          <Toolbar>
          
       
                        <IconButton style={{color:"white"}} onClick={handleClose}>
                            <Iconify icon="material-symbols:arrow-back-rounded" />
                        </IconButton>
                        <Typography sx={{ ml: 2, flex: 1, color: "inherit" }} variant="h6" component="div" >
         People
          </Typography>
          </Toolbar>
        </AppBar>
        <DialogContent dividers={scroll === 'paper'} sx={{ background: "#f9fafb" }}>
          <DialogContentText
            id="scroll-dialog-description"
            tabIndex={-1}
          >
       <Grid>
         
       <Card>
        <CardContent>
            <Typography>Project : {data1?.project_name}</Typography>
            <Typography>Role : Field Associates</Typography>
        </CardContent>
       </Card><br/>
       {
            data1?.gelathiFacilitator?.map((item)=>
            <>
            <Card sx={{cursor:'pointer'}}  onClick={()=>viewUser(item)}>
                <CardContent>
                  <Typography value={item?.emp_id}>{item?.name}</Typography>
                </CardContent>
            </Card>
            <Stack direction="row" spacing={1} flexShrink={0} sx={{ mb: 1 }}>
              <Gelathifacilitatorprofile
                isOpenFilter={openFilter}
                onOpenFilter={handleOpenFilter}
                onCloseFilter={handleCloseFilter}
              />
            </Stack>
            </>)
        }
           
        </Grid>
        </DialogContentText>
        </DialogContent>
      </Dialog>
        
        
        
        
        
        
        
        </>
    )
}