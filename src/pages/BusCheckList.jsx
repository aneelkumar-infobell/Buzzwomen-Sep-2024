
import React from "react";
import { Dialog,Toolbar,IconButton ,TextField,Typography,AppBar,Card,CardContent,Stack,Slide,TableBody,Button,TableContainer,TableRow,TableCell,Table,Paper, Checkbox} from "@mui/material";

import { Icon } from '@iconify/react';
import { useState,useEffect } from "react";
import axios from "axios";
import Iconify from "src/components/Iconify";
import moment from "moment";
import Scrollbar from "src/components/Scrollbar";
import { CheckBox } from "@mui/icons-material";
import { baseURL } from "src/utils/api";
import { useAuth } from "src/AuthContext";

const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
  });
export default function BusCheckList({itm,busesd,data1}){
  const { apikey } = useAuth();
    const [open,setOpen] = useState(false);
    const [busData,setBusData]=useState(false);
    const handleClickOpen = () => {
        setOpen(true);
      };
      const handleClose = () => {
        setOpen(false);
        busesd();
    
      };
     useEffect(()=>{
        getbuschecklist()
     },[itm?.bus_id,data1?.bus_id])

    var date = new Date()
const getbuschecklist=async()=>{
    var data = JSON.stringify({
        "bus_id": (itm?.bus_id)?itm?.bus_id:data1?.bus_id,
        "date": moment(date)?.format('YYYY-MM-DD'),
        "project_id":(itm?.project_id)?itm?.project_id:data1?.project_id
      });
      
      var config = {
        method: 'post',
        url: baseURL + 'getBusCheckList',
        headers: { 
          'Content-Type': 'application/json',
          'Authorization': `${apikey}`
        },
        data : data
      };
      
      axios(config)
      .then(function (response) {
        // console.log(JSON.stringify(response.data));
       
        setBusData(response.data);
      })
      .catch(function (error) {
        // console.log(error);
      });
}


  const [sendData, setSendData] = useState({

            "sufficient_diesel": 0,
            "tyres_air_condition": 0,
            "battery": 0,
            "switch_box": 0,
            "led_tv_remote": 0,
            "fan": 0,
            "tube_lights": 0,
            "mic": 0,
            "jock_liver": 0,
            "wheel_spanner": 0,
            "canopy_unfold_rod": 0,
            "speaker": 0,
            "chairs": 0,
            "tent_sidewall": 0,
            "tray": 0,
            "vehicle_clean": 0
    
    });
   const buschecklist=async()=>{
    var data = JSON.stringify({
        "bus_id": (itm?.bus_id)?parseInt(itm?.bus_id):parseInt(data1?.bus_id),
        "date": moment(date)?.format('YYYY-MM-DD'),
        "project_id": (itm?.project_id)?parseInt(itm?.project_id):parseInt(data1?.project_id),
        "sufficient_diesel": (sendData?.sufficient_diesel==true)?1:0,
        "tyres_air_condition": (sendData?.tyres_air_condition==true)?1:0,
        "battery": (sendData?.battery==true)?1:0,
        "switch_box":(sendData?.switch_box==true)?1: 0,
        "led_tv_remote": (sendData?.led_tv_remote==true)?1:0,
        "fan": (sendData?.fan==true)?1:0,
        "tube_lights": (sendData?.tube_lights==true)?1:0,
        "mic": (sendData?.mic==true)?1:0,
        "jock_liver": (sendData?.jock_liver==true)?1:0,
        "wheel_spanner":(sendData?.wheel_spanner==true)?1: 0,
        "canopy_unfold_rod":(sendData?.canopy_unfold_rod==true)?1: 0,
        "speaker":(sendData?.speaker==true)? 1:0,
        "chairs":(sendData?.chairs==true) ?1:0,
        "tent_sidewall": (sendData?.tent_sidewall==true)?1:0,
        "tray": (sendData?.tray==true)?1:0,
        "vehicle_clean":(sendData?.vehicle_clean==true)?1: 0
      });
      
      var config = {
        method: 'post',
        url: baseURL + 'addBusCheckList',
        headers: { 
          'Content-Type': 'application/json',
          'Authorization': `${apikey}`
        },
        data : data
      };
      
      axios(config)
      .then(function (response) {
        // console.log(JSON.stringify(response.data));
        alert(response.data.message)
        handleClose();
    
      })
      .catch(function (error) {
        // console.log(error);
      });
   }
   
    return (
        <>
   <IconButton onClick={handleClickOpen} style={{justifyContent:'flex-end'}} ><Iconify sx={{color:"gray"}} icon="ic:sharp-list-alt" width={25} height={25} /> </IconButton>
   <Dialog open={open} onClose={handleClose} fullScreen TransitionComponent={Transition}>
   <AppBar sx={{ position: 'fixed', bgcolor: '#ff7424' }}>
            <Toolbar sx={{ position: 'relative', bgcolor: '#ff7424' }}>
              <IconButton style={{ color: 'white' }} onClick={handleClose}>
<Iconify icon="material-symbols:arrow-back-rounded" />
              </IconButton>
              <Typography sx={{ ml: 2, flex: 1, color: 'white' }} variant="h6" component="div">
                Bus Checklist
              </Typography>
              <Button edge="end" color="inherit" type="submit" onClick={buschecklist} style={{ color: 'white',border:'none' }}>
             <Iconify icon="material-symbols:save" width={30} height={30} />
              </Button>
            </Toolbar>
          </AppBar>
          <Scrollbar><Card style={{marginTop:50,marginLeft:10}}>
    <CardContent>
        <Typography>Project : {(itm?.project_name)?itm?.project_name:data1?.project_name}</Typography>
        <Typography>Bus Number : {(itm?.register_number)?itm?.register_number:data1?.bus_number}</Typography>
    </CardContent>
</Card><br/>
       
        {(busData?.final_save==0)  ? <Card> 
                <CardContent>
                    <TableContainer >
                  <Table aria-label="customized table"  >
                    <TableBody >
                      <TableRow  >
                        <TableCell>Sufficient Diesel </TableCell>
                       <TableCell><Checkbox  onChange={(e) => {
                      setSendData({ ...sendData, sufficient_diesel: e.target.checked })}}/></TableCell>
                      
                      </TableRow>
                      <TableRow>
                        <TableCell>Tyres Air Condition</TableCell>
                        <TableCell><Checkbox  onChange={(e) => {
                      setSendData({ ...sendData, tyres_air_condition: e.target.checked })}}/></TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell>Battery</TableCell>
                        <TableCell><Checkbox  onChange={(e) => {
                      setSendData({ ...sendData, battery: e.target.checked })}}/></TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell>Switch Box</TableCell>
                        <TableCell><Checkbox  onChange={(e) => {
                      setSendData({ ...sendData, switch_box: e.target.checked })}}/></TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell>Led tv and Remote</TableCell>
                        <TableCell><Checkbox  onChange={(e) => {
                      setSendData({ ...sendData, led_tv_remote: e.target.checked })}}/></TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell>Fan</TableCell>
                        <TableCell><Checkbox  onChange={(e) => {
                      setSendData({ ...sendData, fan: e.target.checked })}}/></TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell>Tube Lights</TableCell>
                        <TableCell><Checkbox  onChange={(e) => {
                      setSendData({ ...sendData, tube_lights: e.target.checked })}}/></TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell>Mic</TableCell>
                        <TableCell><Checkbox  onChange={(e) => {
                      setSendData({ ...sendData, mic: e.target.checked })}}/></TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell>Jack Liver</TableCell>
                        <TableCell><Checkbox  onChange={(e) => {
                      setSendData({ ...sendData, jock_liver: e.target.checked })}}/></TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell>Wheel Spanner</TableCell>
                        <TableCell><Checkbox  onChange={(e) => {
                      setSendData({ ...sendData, wheel_spanner: e.target.checked })}}/></TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell>Canopy Unfold Rod</TableCell>
                        <TableCell><Checkbox  onChange={(e) => {
                      setSendData({ ...sendData, canopy_unfold_rod: e.target.checked })}}/></TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell>Speaker</TableCell>
                        <TableCell><Checkbox  onChange={(e) => {
                      setSendData({ ...sendData, speaker: e.target.checked })}}/></TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell>Chairs</TableCell>
                        <TableCell><Checkbox onChange={(e) => {
                      setSendData({ ...sendData, chairs: e.target.checked })}}/></TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell>Tent Sidewall</TableCell>
                        <TableCell><Checkbox onChange={(e) => {
                      setSendData({ ...sendData, tent_sidewall: e.target.checked })}}/></TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell>Tray</TableCell>
                        <TableCell><Checkbox onChange={(e) => {
                      setSendData({ ...sendData, tray: e.target.checked })}}/></TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell>Vehicle Clean</TableCell>
                        <TableCell><Checkbox  onChange={(e) => {
                      setSendData({ ...sendData, vehicle_clean: e.target.checked })}}/></TableCell>
                      </TableRow>
                    </TableBody>
                  </Table>
                </TableContainer>
                
                </CardContent>
              </Card>:<Card> 
                <CardContent>
                    <TableContainer >
                  <Table aria-label="customized table"  >
                    <TableBody >
                      <TableRow  >
                        <TableCell>Sufficient Diesel </TableCell>
                       <TableCell><Checkbox /></TableCell>
                      
                      </TableRow>
                      <TableRow>
                        <TableCell>Tyres Air Condition</TableCell>
                        <TableCell><Checkbox checked={busData?.tyres_air_condition==1} disabled={busData?.final_save==1}/></TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell>Battery</TableCell>
                        <TableCell><Checkbox checked={busData?.battery==1} disabled={busData?.final_save==1}/></TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell>Switch Box</TableCell>
                        <TableCell><Checkbox checked={busData?.switch_box==1} disabled={busData?.final_save==1}/></TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell>Led tv and Remote</TableCell>
                        <TableCell><Checkbox checked={busData?.led_tv_remote==1} disabled={busData?.final_save==1}/></TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell>Fan</TableCell>
                        <TableCell><Checkbox checked={busData?.fan}  disabled={busData?.final_save==1}/></TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell>Tube Lights</TableCell>
                        <TableCell><Checkbox checked={busData?.tube_lights==1} disabled={busData?.final_save==1}/></TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell>Mic</TableCell>
                        <TableCell><Checkbox checked={busData?.mic==1} disabled={busData?.final_save==1}/></TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell>Jack Liver</TableCell>
                        <TableCell><Checkbox checked={busData?.jock_liver==1} disabled={busData?.final_save==1}/></TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell>Wheel Spanner</TableCell>
                        <TableCell><Checkbox checked={busData?.wheel_spanner==1} disabled={busData?.final_save==1}/></TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell>Canopy Unfold Rod</TableCell>
                        <TableCell><Checkbox checked={busData?.canopy_unfold_rod==1} disabled={busData?.final_save==1}/></TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell>Speaker</TableCell>
                        <TableCell><Checkbox checked={busData?.speaker==1}  disabled={busData?.final_save==1}/></TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell>Chairs</TableCell>
                        <TableCell><Checkbox checked={busData?.chairs==1} disabled={busData?.final_save==1}/></TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell>Tent Sidewall</TableCell>
                        <TableCell><Checkbox checked={busData?.tent_sidewall==1} disabled={busData?.final_save==1}/></TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell>Tray</TableCell>
                        <TableCell><Checkbox checked={busData?.tray==1} disabled={busData?.final_save==1}/></TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell>Vehicle Clean</TableCell>
                        <TableCell><Checkbox checked={busData?.vehicle_clean==1} disabled={busData?.final_save==1}/></TableCell>
                      </TableRow>
                    </TableBody>
                  </Table>
                </TableContainer>
                
                </CardContent>
              </Card>}
              </Scrollbar>
          
   </Dialog>
       </>
    )
}