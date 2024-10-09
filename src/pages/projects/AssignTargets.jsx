import React from "react";
import { Container,Stack,Typography,IconButton,TextField,InputLabel,Button } from "@mui/material";
import { Link, useLocation } from 'react-router-dom';
import Iconify from '../../components/Iconify';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead'
import TableRow from '@mui/material/TableRow';
import TableCell from "@mui/material/TableCell";
import axios from "axios";
import { baseURL} from "src/utils/api";
import { useEffect, useState} from "react";
import { useAuth } from "src/AuthContext";
export default function AssignTargets()
{
    const { apikey } = useAuth();
  const {state} =useLocation()
const [trainersTargets,setTrainersTargets]=useState('');
var [createTarget,setCreateTarget] = useState([]);
const [data1, setData1]=useState()
  useEffect(() => {
    targets();
    projData();
}, []
)
const assign=(e,index)=>{
  createTarget[index].emp_target=e
  setCreateTarget(createTarget)
}
  const targets=async=>{
    var data = JSON.stringify({
      "project_id": state?.id
    });
    var config = {
      method: 'post',
      url: baseURL+'getAssignTargets',
      headers: { 
        'Content-Type': 'application/json',
        'Authorization': `${apikey}`
      },
      data : data
    };
axios(config)
.then(function (response) {
  let temp=[]
  response?.data?.list?.target_list?.forEach(r=>temp.push({
    
      "emp_id": r?.emp_id,
      "emp_target": r?.emp_target
    
  }))
  setCreateTarget(temp)
  setTrainersTargets(response.data?.list)
})
.catch(function (error) {
  // console.log(error);
});
  }
  
const createTrainerTarget=async=>{
  var data = JSON.stringify({
    "target_list":createTarget,
    "project_id": state?.id
  });
  var config = {
    method: 'post',
    url: baseURL+'createTrainerTarget',
    headers: { 
      'Content-Type': 'application/json',
      'Authorization': `${apikey}`
    },
    data : data
  };
axios(config)
.then(function (response) {
 alert("Target Added Successfully")
})
.catch(function (error) {
  // console.log(error);
  alert("Something went wrong!")
});
}
const projData = async => {
  var userDetails = JSON.parse(sessionStorage?.getItem('userDetails'))
  var role = JSON.parse(sessionStorage?.getItem('userDetails'))?.role
  var idvalue = JSON.parse(sessionStorage?.getItem('userDetails'))?.id;
  var data = JSON.stringify({
    "project_id": state?.id,
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
    return(
        <Container>
            <Stack direction="row" alignItems="center" justifyContent="space-between" mb={5}>
                <Typography variant="h5" gutterBottom>
                    <Link to="/dashboard/projects/project">
                        <IconButton>
                            <Iconify icon="material-symbols:arrow-back-rounded" />
                        </IconButton></Link>
                    Assign Targets    <IconButton sx={{float:'right',color:'#ff7424',position:'absolute',right:50}} onClick={createTrainerTarget} title="save"><Iconify icon="material-symbols:save"></Iconify></IconButton>
                </Typography> 
         
           
            </Stack>
            <TableContainer >
                  <Table style={{textAlign:"left"}}aria-label="customized table">
                    <TableBody>
                      <TableRow >
                        <TableCell style={{ borderBottom: "none"}}>Project &nbsp;:&nbsp;{data1?.project_name}</TableCell>
                      </TableRow>
                      <TableRow >
                        <TableCell style={{ borderBottom: "none"}}>Location &nbsp;:&nbsp;{data1?.location_name}</TableCell>
                      </TableRow>
                      <TableRow >
                        <TableCell style={{ borderBottom: "none"}}>Partner &nbsp;:&nbsp;{data1?.partnerName}</TableCell>
                      </TableRow>
                     
                    </TableBody>
                  </Table>
                </TableContainer><br/>
                <Typography gutterBottom style={{textAlign:'center'}}>
                     Total Targets : {data1?.training_target}
                </Typography>
                
                 {trainersTargets?.target_list?.map((item,index)=>{
                  return(
                   <>
                   <div style={{marginLeft:"20px"}}>
                   <Typography value={item?.emp_id}>
                       {item?.emp_name}
                    </Typography>
                    </div> 
                    
                    <TextField type="number" id="targets" label="Targets" sx={{ml:5,mt:1,mb:2}}  onChange={(e) => { assign(e?.target?.value,index) }} defaultValue={createTarget[index]?.emp_target} color="common" /> 
                    
                   </>
                  )}
                 )}
                  
              
        </Container>
    )
}