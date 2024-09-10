import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import Page from 'src/components/Page';
import { Link,useLocation } from 'react-router-dom';
import Iconify from 'src/components/Iconify';
import { styled } from '@mui/material/styles';
import { useState, useEffect } from 'react';
import axios from 'axios';
import Swal from 'sweetalert2'
import { baseURL } from 'src/utils/api';
import { useAuth } from 'src/AuthContext';
import { Card, Stack, Chip, Container, Typography, Grid, IconButton,Button ,CardContent,Select,MenuItem,TextField} from '@mui/material';
const StyledTableCell = styled(TableCell)(({ theme }) => ({
    [`&.${tableCellClasses.head}`]: {
      backgroundColor: theme.palette.common.black,
      color: theme.palette.common.white,
    },
    [`&.${tableCellClasses.body}`]: {
      fontSize: 14,
    },
  }));
  
  const StyledTableRow = styled(TableRow)(({ theme }) => ({
    '&:nth-of-type(odd)': {
      backgroundColor: theme.palette.action.hover,
    },
    // hide last border
    '&:last-child td, &:last-child th': {
      border: 0,
    },
  }));
 
export default function SeniorTrainerMaterialStocklist(){
    const { apikey } = useAuth();
    const [close , setClose ] = useState(false)
    const [demo,setDemo] = useState([])
    const [admin, setAdmin] = useState(false);
    const [projectsList,setProjects]=useState([])
    const [materialStock, setmaterialStock] = useState([]);
    const [ProjectId,setProjectId]=useState('');
const getProjects = async()=>{
    var roleid= JSON.parse(sessionStorage.getItem('userDetails'))?.role;
    var userid= JSON.parse(sessionStorage.getItem('userDetails'))?.id;
    var data = JSON.stringify({
      "search": "",
      "id": JSON.stringify(userid),
      "role_id": JSON.stringify(roleid),
      "filter_id": 0,
      "type": "",
      "pageNum": 1
    });
    
    var config = {
      method: 'post',
      url: baseURL + 'getProjects',
      headers: { 
        'Content-Type': 'application/json',
        'Authorization': `${apikey}`
      },
      data : data
    };
      
      axios(config)
      .then(function (response) {
  
        setProjects(response.data.list)
      })
      .catch(function (error) {
        // console.log(error);
      });
      
}
    useEffect(()=>{
        getProjects();
      },[])
   
  
      const demoi = async (itm) => {
          
        var userid = JSON.parse(sessionStorage.getItem('userDetails'))?.id
        var role =JSON.parse(sessionStorage.getItem('userDetails'))?.role
        var data = JSON.stringify({
          "project_id":itm?.id
      });
   
  
      const config = {
        method: 'post',
        url:baseURL + 'getStockItems',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `${apikey}`,
          Accept: 'application/json'
        },
        data
      };
    
        axios(config)
          .then((response) => {
            setDemo(response.data?.data)
          })
          .catch((error) => {
            // console.log(error);
          });
      }
      const onChangeMaterialValue = (index , quantity)=>{
        const apiData = [...materialStock]
        const changedData = apiData[index]
        changedData['quantity'] = quantity
        apiData[index]=changedData
        setmaterialStock(apiData)
      }
      useEffect(()=>{
      
        const materialData = []
        demo.forEach((item)=>{
          materialData.push({
            stock_id: item.stock_id,
            name: item.name,
            quantity:null
          })
        
        })
        setmaterialStock(materialData)
        
        }, [demo])
    
      let  stock = materialStock;
      const onSubmit = ()=>{
        var userid = JSON.parse(sessionStorage.getItem('userDetails'))?.id
        var role =JSON.parse(sessionStorage.getItem('userDetails'))?.role
        var data = JSON.stringify({
          
          "project_id": ProjectId?.id,
          "type": "1",
          "stock_list" :stock
      });
     
      const config = {
        method: 'post',
        url: baseURL+'consumeStock', 
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
          'Authorization': `${apikey}`
        },
        data :data
      };
        axios(config)
        .then(function (response) {
         if(response.status == 200){
          Swal.fire({
            icon: 'success',
            title: 'Success',
            text: response.data.message,
            confirmButtonText: 'Ok',
            timer: 2000
          });
         demoi(ProjectId)
         }
        })
        .catch(function (error) {
        //   Swal.fire({
        //     icon: 'error',
        //     title: 'Error',
        //     text: response.data.message,
        //     confirmButtonText: 'Ok',
        //     timer: 2000
        //   });
        });
        setAdmin(false)
      }
    
    return (
        <Page title="Buzz Stock">
        <Container>
        <Stack direction="row" alignItems="center" justifyContent="space-between" mb={5}>
                <Typography variant="h5" gutterBottom>
               
                   Material Stock List 
                 
                </Typography>
                <>
                  {close?
                    <IconButton  style={{ float: 'right',backgroundColor: '#ed6c02', color:"white", position: 'absolute', right: 0, marginRight: '125px' }} onClick={
                      ()=>{
                        setAdmin(false)
                        setClose(false)
                      }
                     }>
                        <Iconify style={{ color:"white" }} icon="material-symbols:close" />
                      </IconButton>
                  :
                    <IconButton  style={{ float: 'right', backgroundColor: '#ed6c02', color:"white", position: 'absolute', right: 0, marginRight: '125px' }} onClick={
                      ()=>{
                        setAdmin(true)
                        setClose(true)
                      }
                     }>
                        <Iconify style={{color:"white"  }} icon="mdi:minus" />
                      </IconButton>
                  }
                  </>
                
               
            </Stack> 
            
            {(projectsList?.length>0)?
            <Card style={{ marginTop: 20,  borderRadius: 20 }}>
                <CardContent>
                  <Typography style={{color:"#ff7424"}}>{ProjectId?"Project":"Select Project"}</Typography>
                  <Stack mt={2} mb={2}>
              <Select color="common" label="Projects" variant="standard">
             
                  {projectsList?.map((itm)=>{
                  
                    return(
                            <MenuItem onClick={()=>{demoi(itm);setProjectId(itm)}} value={itm?.id}>{itm?.name}</MenuItem>
                            
                    )
                    
                  })}
                </Select>
                  </Stack>
                </CardContent>
          </Card>
         :<h3 style={{textAlign:'center'}}>No Projects</h3>}<br/>
      <Grid
        sx={{
          p: 1,
          margin: 'auto',
          maxWidth: 500,
          flexGrow: 1,
        }}
      >
         <TableContainer component={Paper} sx={{ justifyContent: 'center', alignItems: 'center', mx: 'auto', maxWidth: '800px', mt: '20px' }}>
      <Table aria-label="customized table">
        {demo.length > 0 ? (
          <TableHead>
            <TableRow style={{ justifyContent: 'center', alignItems: 'center' }}>
              <StyledTableCell>Item</StyledTableCell>
              <StyledTableCell>Available</StyledTableCell>
              {admin ? <StyledTableCell>Consume</StyledTableCell> : null}
            </TableRow>
          </TableHead>
        ) : null}
        <TableBody>
          {demo.map((row, index) => (
            <StyledTableRow key={index}>
              <StyledTableCell component="th" scope="row">
                {row.name} {row.id}
              </StyledTableCell>
              <StyledTableCell>{row.quantity_exist}</StyledTableCell>
              {admin ? (
                <StyledTableCell>
                  <TextField
                    required
                    id={`standard-required-${index}`}
                    type="number"
                    onChange={(e) => {
                      onChangeMaterialValue(index, e.target.value);
                    }}
                    defaultValue=""
                    variant="standard"
                  />
                </StyledTableCell>
              ) : null}
            </StyledTableRow>
          ))}
        </TableBody>
      </Table>
      {close ? (
        <div style={{ display: 'flex', justifyContent: 'flex-end', marginTop: '20px' }}>
          <Button
            onClick={onSubmit}
            sx={{
              '&:hover': {
                backgroundColor: '#ffd796',
              },
              color: '#ff7424',
              backgroundColor: '#ffd796',
              marginLeft: '10px',
            }}
          >
            Save
          </Button>
        </div>
      ) : null}
    </TableContainer>

        </Grid>
        </Container>
        </Page>
    );
}