import { useState, useEffect } from 'react';
import React from 'react'
import { Button, Card, CardActions, CardContent, Stack , Drawer,IconButton} from '@mui/material';
import Iconify from '../../../components/Iconify';
import Typography from '@mui/material/Typography';
import CloseIcon from '@mui/icons-material/Close';
import Slide from '@mui/material/Slide';
import PropTypes from 'prop-types';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import ParticipantGf from '../ParticipantGf';
const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});
VillageDialog.propTypes = {
    isOpenFilter: PropTypes.bool,
    onOpenFilter: PropTypes.func,
    onCloseFilter: PropTypes.func,
};
export default function VillageDialog({ shown, setShown, batchState,batch,isOpenFilter,onOpenFilter,onCloseFilter }) {
  const [openFilter, setOpenFilter] = useState(false);
  const [clcikData, setClickData] = useState()
  const handleOpenFilter = () => {
    setOpenFilter(true);
  };
  const handleCloseFilter = () => {
    setOpenFilter(false);
  };
  const [open, setOpen] = React.useState(false);
  React.useEffect(() => {
    setOpen(shown)
  }, [shown])
  const handleClickOpen = () => {
    setShown(true)
    setOpen(true);
  };
  const handleClose = () => {
    setShown(false)
    setOpen(false);
  };
  
  return (
    <div>
       <Drawer
                anchor="right"
                open={isOpenFilter}
                onClose={onCloseFilter}
                PaperProps={{
                    sx: { width: 350, },
                }}
            >
              <AppBar sx={{ position: 'relative', bgcolor: '#ff7424' }}>
          <Toolbar>
          
          
                        <IconButton style={{color:"white"}} onClick={onCloseFilter}>
                            <Iconify icon="material-symbols:arrow-back-rounded" />
                        </IconButton>
                        <Typography variant="subtitle2" style={{color:'white'}}>
                    Self Shakthi
          </Typography>
         
          </Toolbar>
        </AppBar>
   
        <Stack style={{ top: 40 }}>
          <Card sx={{mt:2,ml:2}}>
           
          
             <CardContent> <Typography variant="subtitle2" sx={{color:"black"}}> Partner: {batch?.data?.partnerName} </Typography>
             
              <Typography variant="subtitle2" sx={{color:"black"}}> Training Batch  : {batch?.data?.name} </Typography>
            
              <Typography variant="subtitle2" sx={{color:"black"}}> Contact Person : {batch?.data?.contact_number}</Typography>
              <Typography variant="subtitle2" sx={{color:"black"}}> Contact Number : {batch?.data?.contact_person}</Typography> 
              <Typography variant="subtitle2" sx={{color:"black"}}> Trainer Name : {batch?.data?.trainer_name}</Typography> 
              </CardContent>
          </Card><br/>
          <Card style={{borderRadius:'0'}}>
            <CardContent>All Participants ({batch?.total_participants})</CardContent>
        </Card>
      
        </Stack>
       
        {batch?.all_participants?.map(itm => {
          return (
            <Stack style={{ top: 100 }}>
              <Card onClick={() => {
                handleOpenFilter()
                setClickData({ name: itm.participant_name, title: "Enrolled  Name" ,id:itm?.participant_id})
                
              }} style={{borderRadius:'0'}}>
                <CardContent>
                 
                      <Typography variant="subtitle2">{itm?.participant_name}
                      {(itm?.gelathiRecomm=='1')&& <IconButton sx={{float:'right',width:35,height:30,color:'green'}}><Iconify icon="mdi:tick-circle"></Iconify></IconButton>}
                      </Typography>
                
                </CardContent>
                
              </Card>
            </Stack>
          )
        })}
        <Stack direction="row" spacing={1} flexShrink={0} sx={{ my: 1 }}>
                <ParticipantGf
                  clcikData={clcikData}
                  isOpenFilter={openFilter}
                  onOpenFilter={handleOpenFilter}
                  onCloseFilter={handleCloseFilter}
                 
                />
              </Stack>
      </Drawer>
    </div>
  );
}