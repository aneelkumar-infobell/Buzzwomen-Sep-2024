import { useState,useEffect } from 'react';
import axios from 'axios';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Iconify from '../../../components/Iconify';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { useAuth } from 'src/AuthContext';
import { baseURL } from 'src/utils/api';
export default function AdminQuality({selectDATA,getData}) {
  const { apikey } = useAuth();
  
  const [partner,setPartner] = useState();
  useEffect(()=>{
    UserData()
    },[]
    )
  
    const UserData=()=>{
        var userid = JSON.parse(sessionStorage.getItem('userDetails'))?.id
        var data = JSON.stringify({
            "id": JSON.parse(userid),
            "Role_Id": JSON.parse(selectDATA)
          });
          
          var config = {
            method: 'post',
            url: baseURL + 'getEmpData',
            headers: { 
              'Content-Type': 'application/json',
              'Authorization': `${apikey}`
            },
            data : data
          };
          
          axios(config)
          .then(function (response) {
            setPartner(response.data)
          })
          .catch(function (error) {
            // console.log(error);
          });
    }
    
  return (
    <div>
    
<Card style={{marginTop:20}}>
        {partner?.length!==0?partner?.Data?.map(itm=>{
 return(
       
            <CardContent>
                 <TableContainer >
              <Table aria-label="customized table"  >
                <TableBody  >
                  <TableRow style={{ height: "10px !important" }} onClick={() => getData(itm, selectDATA)} >
                    <TableCell style={{ width: "10px" }}> <Iconify icon="mdi:user-circle" width={20} height={20} /> </TableCell>
                    <TableCell >  {itm?.name}</TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </TableContainer>
            </CardContent>
 )
             }):null}
          </Card>
         
          </div>
  );
}