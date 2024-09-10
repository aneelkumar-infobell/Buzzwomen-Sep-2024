import React from "react";
import { Typography,Card,CardContent, IconButton, Stack, Select,MenuItem} from "@mui/material";
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import { Link } from 'react-router-dom';
import Iconify from '../../components/Iconify';
import { Icon } from '@iconify/react';
import { useState, useEffect } from 'react';
import axios from 'axios'
import { useLocation, useNavigate } from 'react-router-dom';
import { Container } from "@mui/system";
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableContainer from '@mui/material/TableContainer';
import TableRow from '@mui/material/TableRow';
import TableCell from "@mui/material/TableCell";
import { baseURL } from "src/utils/api";
import { vi } from "date-fns/locale";
import { useAuth } from "src/AuthContext";
export default function AssignBatches(){
    const { apikey } = useAuth();
    const state = useLocation();
    const [gelathi, setGelathi] = useState('');
    const [gl,setGl] = useState(false);
    const [data1, setData1] = useState('')
    const [villages, setVillages] = useState('');
    const [batch,setBatch] = useState('');
    const [tc, setTc] = useState('');
    var [alloted,setAlloted]=useState(0)
    const [item,setItem]=useState('')
   const [selected,setSelected]=useState([])
   const id = sessionStorage?.getItem("proId")
useEffect(() => {
  projData();
}, [])
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
      setData1({ ...response.data.list })
    })
    .catch(function (error) {
      // console.log(error);
    });
}
const villagelist= async(itm) =>{
  setGl(true)
  setItem(itm)
  var data = JSON.stringify({
    "project_id":data1?.project_id, 
    "emp_id":JSON.stringify(itm?.emp_id),
    
  
    });

    var config = {
      method: 'post',
       url: baseURL+'getTrainingBatchList',
      
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `${apikey}`
      },
      data : data
    };
    axios(config)
    .then(function (response) {
      setVillages(response?.data)
      setAlloted(response?.data?.checked_count)
      setTc(response?.data?.list.length)
    })
    .catch(function (error) {
      // console.log(error);
    });
    
    
}
const CreateBatch= async(itm,i) =>{
  
  const userid = JSON.parse(sessionStorage.getItem('userDetails'))?.id
  selected.push(itm?.training_batch_id)
  setSelected(selected)
  var data = JSON.stringify({
     
    "project_id":data1?.project_id, 
    "training_batch_id":itm?.training_batch_id,
     "emp_id":JSON.stringify(item?.emp_id)
   });
   villages.list[i].flag = 1;
   setVillages(villages)
   setAlloted(alloted?alloted+1:1)

   var config = {
     method: 'post',
     url: baseURL+'createGFBatch',
     headers: {
       'Content-Type': 'application/json',
       'Authorization': `${apikey}`
     },
     data : data
   };
    axios(config)
    .then(function (response) {
      setBatch(response?.data)
      
    })
    .catch(function (error) {
      // console.log(error);
    });
    
}
const removeFlag = async (itm, i) => {
  var data = JSON.stringify({
     
    "project_id":data1?.project_id, 
    "training_batch_id":itm?.training_batch_id,
     "emp_id":JSON.stringify(parseInt(item?.emp_id))
   });
   villages.list[i].flag = 0;
   setVillages(villages)
   setAlloted(alloted?alloted-1:0)
   
   var config = {
     method: 'post',
     url: baseURL + 'deleteGFBatch',
     headers: {
       'Content-Type': 'application/json',
       'Authorization': `${apikey}`
     },
     data : data
   };
   axios(config)
   .then(function (response) {
     setBatch(response?.data)
     
   })
   .catch(function (error) {
    //  console.log(error);
   });
   
};
    return(
       
     
        <Container>
            <Stack direction="row" alignItems="center" justifyContent="space-between" mb={5}>
                <Typography variant="h5" gutterBottom>
                    <Link to="/dashboard/projects/project">
                        <IconButton>
                            <Iconify icon="material-symbols:arrow-back-rounded" />
                        </IconButton></Link>
                    Assign Batches
                </Typography>
           
            </Stack>
          
        
        {(data1?.gelathiFacilitator?.length>0)?<Card style={{ marginTop: 20,  borderRadius: 20 }}>
                <CardContent>
                  <Typography style={{color:"#ff7424"}}>Select Field Associate </Typography>
                  <Stack mt={2} mb={2}>
                  {/* {data.state == "" && "Select "} */}
              <Select color="common" label="Field Associate" variant="standard">
             
                  {data1?.gelathiFacilitator?.map((itm)=>{
                  
                    return(
                            <MenuItem onClick={()=>{villagelist(itm)}} value={itm?.emp_id}>{itm?.name}</MenuItem>
                            
                    )
                    
                  })}
                </Select>
                  </Stack>
                </CardContent>
          </Card>:<h3 style={{textAlign:'center'}}>No Field Associates</h3>}<br/>
                     {(gl)?<Typography gutterBottom style={{textAlign:'center'}}>
                     Total Villages: {alloted}/{tc}
                     </Typography>:null}
                
                 {(gl)?<Card style={{ marginTop: 10,  borderRadius: 20 }}>
                <CardContent>
                 
                 {tc==0? <div style={{textAlign:'center',justifyContent:"center",alignItems:"center",fontWeight:700,fontSize:15}}>No Villages</div>:
                 <Stack mt={2} mb={2}>
             
                  {villages?.list?.map((itm,i)=>{
                  
                    return(
                      <>
                            <TableContainer >
                  <Table aria-label="customized table">
                    <TableBody>
                      <TableRow >
                        <TableCell> <Iconify icon="mdi:car-sports-utility-vehicle" style={{float:'left',margin:5,display:'flex',fontSize:20, color:'black'}}/> 
                        <Typography value={itm?.training_batch_id}>{itm?.name} 
                    {
                    
                    (['1',1].includes(villages?.list[i]?.flag))?<IconButton  style={{float:'right'}} onClick={()=>removeFlag(itm,i)}>
                       
                          <Iconify icon="typcn:tick" style={{fontSize:20,color:"green"}}/>
                        </IconButton>:
                        (['0',0].includes(villages.list[i]?.flag))?<IconButton onClick={()=>CreateBatch(itm,i)} style={{float:'right'}}>
                          <Iconify icon="material-symbols:add-circle-rounded" style={{fontSize:20,color:"	#0ad5ee"}}/>
                        </IconButton>:null}
                          
                        </Typography>
                       
                        </TableCell>
                      </TableRow>
                    </TableBody>
                  </Table>
                </TableContainer>
                      </>
                    )
                  })}
                
                  </Stack>}
                </CardContent>
                 </Card>:null}
            
        </Container>
       
    )
}