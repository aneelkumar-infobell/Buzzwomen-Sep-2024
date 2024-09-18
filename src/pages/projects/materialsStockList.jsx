import { useState, useEffect } from 'react';
import { Card, Stack, Chip, Container, Typography, Grid, IconButton,Button } from '@mui/material';
import { Link,useLocation } from 'react-router-dom';
import { styled } from '@mui/material/styles';
import Iconify from 'src/components/Iconify';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import Page from 'src/components/Page';
import TextField from '@mui/material/TextField';
import axios from 'axios';
import Swal from 'sweetalert2'
import { AltRouteTwoTone } from '@mui/icons-material';
import { baseURL} from 'src/utils/api';
import { useAuth } from 'src/AuthContext';
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
    '&:last-child td, &:last-child th': {
      border: 0,
    },
  }));
  const Userrole = sessionStorage.getItem("userId")
export default function MaterialStockList() {
    const { apikey } = useAuth();
  const Userrole = sessionStorage.getItem("userId")
  const {state} = useLocation()
    const [clcikData, setClickData] = useState()
    const [materialStock, setmaterialStock] = useState([]);
    const [demo, setDemo] = useState([]);
const [item ,setItem] = useState([])
const [reloadMaterialData , setReloadMaterialData] = useState(false)
    const [openFilter, setOpenFilter] = useState(false);
    const [admin, setAdmin] = useState(false);
    const [data1, setData1] = useState({});
    const [close , setClose ] = useState(false)
    const handleOpenFilter = () => {
        setOpenFilter(true);
    };
    const handleCloseFilter = () => {
        setOpenFilter(false);
    };
    
  useEffect(() => {
    demoi()
    projData()
  }, []
  )
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
const id = sessionStorage?.getItem('proId');
const projData = (async) => {
  var userDetails = JSON.parse(sessionStorage?.getItem('userDetails'));
  var role = JSON.parse(sessionStorage?.getItem('userDetails'))?.role;
  var idvalue = JSON.parse(sessionStorage?.getItem('userDetails'))?.id;
  var data = JSON.stringify({
    project_id: id,
    role_id: role,
    emp_id: idvalue,
  });
  var config = {
    method: 'post',
    url: baseURL + 'getProjectData',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `${apikey}`
    },
    data: data,
  };
  axios(config)
    .then(function (response) {
      setData1({ ...response.data.list });
    })
    .catch(function (error) {
      // console.log(error);
    });
};
const onChangeMaterialValue = (index , quantity)=>{
  const apiData = [...materialStock]
  const changedData = apiData[index]
  changedData['quantity'] = quantity
  apiData[index]=changedData
  setmaterialStock(apiData)
}
    const demoi = async () => {
      
        var userid = JSON.parse(sessionStorage.getItem('userDetails'))?.id
        var role =JSON.parse(sessionStorage.getItem('userDetails'))?.role
        var data = JSON.stringify({
          "project_id":state?.id
      });
   
      const config = {
        method: 'post',
        url: baseURL + 'getStockItems',
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
          'Authorization': `${apikey}`
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
      let 
      stock = materialStock;
      
      const onSubmit = ()=>{
        var userid = JSON.parse(sessionStorage.getItem('userDetails'))?.id
        var role =JSON.parse(sessionStorage.getItem('userDetails'))?.role
        
        if(stock.length<=0){
          alert("nothng ")
        }
        var data = JSON.stringify({
          
          "project_id": data1.project_id,
          "bus_id": data1.bus_id,
          "type": "0",
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
         demoi()
         }
         
        })
        .catch(function (error) {
          Swal.fire({
            icon: 'error',
            title: 'Error',
            text: response.data.message,
            confirmButtonText: 'Ok',
            timer: 2000
          });
        });
        setAdmin(false)
      }
    return (
        <Page title="Buzz Stock">
        <Container>
        <Stack direction="row" alignItems="center" justifyContent="space-between" mb={5}>
                <Typography variant="h5" gutterBottom>
                    <Link to="/dashboard/projects/project">
                        <IconButton>
                            <Iconify icon="material-symbols:arrow-back-rounded" />
                        </IconButton></Link>
                   Material Stock List 
                  {Userrole == 2 || Userrole==4?
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
                        <Iconify style={{color:"white"  }} icon="material-symbols:add" />
                      </IconButton>
                  }
                  </>
                    :null }
                </Typography>
            </Stack> 
            <Grid
        sx={{
          p: 1,
          margin: 'auto',
          maxWidth: 500,
          flexGrow: 1,
        }}
      >
          <TableContainer component={Paper} sx={{ justifyContent: 'center', alignItems: 'center', ml: 'auto', mr: 'auto', maxWidth: '800px', mt: '20px' }}>
      <Table aria-label="customized table">
        <TableHead>
          <TableRow style={{ justifyContent: 'center', alignItems: 'center' }}>
            <StyledTableCell>ITEM</StyledTableCell>
            <StyledTableCell>Available</StyledTableCell>
            {admin ? <StyledTableCell>Add</StyledTableCell> : null}
          </TableRow>
        </TableHead>
        <TableBody>
          {demo && demo.map((row, index) => (
            <StyledTableRow key={index}>
              <StyledTableCell component="th" scope="row">
                {row.name} {row.id}
              </StyledTableCell>
              <StyledTableCell>{row.quantity_exist}</StyledTableCell>
              {
                admin ? (
                  <StyledTableCell>
                    <TextField
                      required
                      id={`standard-required-${index}`}
                      type="number"
                      onChange={(e) => { onChangeMaterialValue(index, e.target.value) }}
                      defaultValue=""
                      variant="standard"
                    />
                  </StyledTableCell>
                ) : null
              }
            </StyledTableRow>
          ))}
        </TableBody>
      </Table>
      {(Userrole == 2 || Userrole == 4) && close ? (
        <div style={{ display: 'flex', justifyContent: 'flex-end', marginTop: '20px' }}>
          <Button
            onClick={onSubmit}
            sx={{
              '&:hover': {
                backgroundColor: '#ffd796',
              },
              color: '#ff7424',
              backgroundColor: '#ffd796',
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
const styles = {
    card1: {
        backgroundColor: '#f5f5f5',
        opacity: 0.9,
        marginTop: "20px",
        padding: "1rem"
    },
}