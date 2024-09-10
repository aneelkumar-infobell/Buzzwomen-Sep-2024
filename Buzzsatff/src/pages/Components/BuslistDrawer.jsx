import { useState, useEffect } from 'react';
import axios from 'axios';
import PropTypes from 'prop-types';
// material
import {
  Box,
  Radio,
  Stack,
  Button,
  Drawer,
  Rating,
  Divider,
  Checkbox,
  FormGroup,
  IconButton,
  Typography,
  RadioGroup,
  Card,
  CardContent,
} from '@mui/material';
// components
import Iconify from '../../components/Iconify';
import Scrollbar from '../../components/Scrollbar';
import BusEdit from './Buslistfilters/BusEdit'
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableRow from '@mui/material/TableRow';
import { baseURL } from 'src/utils/api';
import { useMediaQuery } from '@mui/material';
import { useAuth } from 'src/AuthContext';
BuslistDrawer.propTypes = {
  isOpenFilter: PropTypes.bool,
  onOpenFilter: PropTypes.func,
  onCloseFilter: PropTypes.func,
};
export default function BuslistDrawer({ isOpenFilter, onOpenFilter, onCloseFilter, clcikData, bus_id, deletebuses,busesd,updatedata }) {
    const { apikey } = useAuth();
  const [detailsData, setDetailsData] = useState();
  const [deletebus, setDeleteBus] = useState();
  const [userUpdate,setUserUpdate]=useState(false)
  const isSmallScreen = useMediaQuery('(max-width:600px)');
  useEffect(()=>{
    if(clcikData !== undefined || userUpdate!= false)
      details()
    },[clcikData,userUpdate]
    )
  const details = async => {
    var data = JSON.stringify({
      "bus_id": clcikData?.bus_id
    });
    var config = {
      method: 'post',
      url: baseURL + 'getBusData',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `${apikey}`
      },
      data
    };
    axios(config)
      .then(function (response) {
        setDetailsData(response.data)
        updatedata()
       
      })
      .catch(function (error) {
        // console.log(error, "<---error");
      });
  }
  const userDetails = sessionStorage?.getItem('userId')
  const DeleteBus = async => {
    var data = JSON.stringify({
      "bus_id": clcikData?.bus_id
    });
    var config = {
      method: 'post',
      url: baseURL + 'deleteBus',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `${apikey}`
      },
      data: data
    };
    axios(config)
      .then(function (response) {
        deletebuses()
        setDeleteBus(response.data)
      })
      .catch(function (error) {
        // console.log(error);
      });
  }
  return (
    <>
      <Drawer
 
        anchor="right"
        open={isOpenFilter}
        onClose={onCloseFilter}
        PaperProps={{
          sx: { width: 350 },
        }}
      >
        
         <AppBar sx={{ position: 'relative', bgcolor: '#ff7424' }}>
          <Toolbar>
             <IconButton style={{color:"white"}} onClick={onCloseFilter}>
                            <Iconify icon="material-symbols:arrow-back-rounded" />
                        </IconButton>
                        <Typography id="bus-details" variant="subtitle2" style={{color:'white'}}>
                    Bus Details   
          </Typography>
         
          </Toolbar>
        </AppBar>
        
        <Divider />
        <Scrollbar>
          <Stack spacing={3} sx={{ p: 3 }}>
            <div>
            {(userDetails==2)?<Button id="delete-icon" onClick={DeleteBus} style={{float:'right',textAlign:'left'}} sx={{
          '&:hover': {
            backgroundColor: 'white',
          },
          
        }} ><Iconify icon="ic:baseline-delete" style={{width:'30px',height:'30px',color:'#e69138',float:'right'}}></Iconify></Button>:null}
           {(userDetails==2)?<BusEdit clcikData={detailsData} busesd={busesd} updatedata={()=>{setUserUpdate(!userUpdate)}} />:null}
            <Card> 
                <CardContent>
                    <TableContainer >
                  <Table aria-label="customized table"  >
                    <TableBody >
                      <TableRow  >
                        <TableCell >Bus Number </TableCell>
                        <TableCell  >:&nbsp;{detailsData?.register_number}</TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell>Register Date</TableCell>
                        <TableCell >:&nbsp;{detailsData?.register_date}</TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell>Engine Number</TableCell>
                        <TableCell>:&nbsp;{detailsData?.engine_number}</TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell>Chassis Number</TableCell>
                        <TableCell>:&nbsp;{detailsData?.chassis_number} </TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell>Insurance Number</TableCell>
                        <TableCell>:&nbsp;{detailsData?.insurance_number}</TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell>Insurance&nbsp;Company</TableCell>
                        <TableCell>:&nbsp;{detailsData?.insurance_company}</TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell>Insurance&nbsp;Start&nbsp;date</TableCell>
                        <TableCell>:&nbsp;{detailsData?.insurance_start_date}</TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell>Insurance&nbsp;End&nbsp;Date</TableCell>
                        <TableCell>:&nbsp;{detailsData?.insurance_end_date}</TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell>Last Service Date</TableCell>
                        <TableCell>:&nbsp;{detailsData?.last_service_date}</TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell>Next Service Date</TableCell>
                        <TableCell>:&nbsp;{detailsData?.next_service_due_date}</TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell>Permit Details</TableCell>
                        <TableCell>:&nbsp;{detailsData?.permit}</TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell>Fitness Certificate</TableCell>
                        <TableCell>:&nbsp;{detailsData?.fitness_certificate}</TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell>Emission Date</TableCell>
                        <TableCell>:&nbsp;{detailsData?.emission_date}</TableCell>
                      </TableRow>
                    </TableBody>
                  </Table>
                </TableContainer>
                
                </CardContent>
              </Card>
            </div>
          </Stack>
        </Scrollbar>
      </Drawer>
    </>
  );
}
