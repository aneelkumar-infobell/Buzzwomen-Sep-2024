import { useState, useEffect } from 'react';
import { styled } from '@mui/material/styles';
import { Stack, Chip, Typography, Container,Box,CircularProgress} from '@mui/material';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { Grid } from '@mui/material';
import Button from '@mui/material/Button';
import Page from 'src/components/Page';
import axios from 'axios';
import FiltersHome from './Filters/FiltersHome';
import { baseURL } from 'src/utils/api';
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
function createData(name, calories) {
  return { name, calories };
}
export default function BuzzStock() {
  const { apikey } = useAuth();
  const [demo, setDemo] = useState([]);
  const [openFilter, setOpenFilter] = useState(false);
  const [openbusfilter, setopenbusfilter] = useState(false);
  const [selected, setSelected] = useState(null)
  const [filterData, setFilterData] = useState({})
  const [loader, setLoader] = useState(false);
  const handleOpenFilter = () => {
    setOpenFilter(true);
  };
  const handleCloseFilter = () => {
    setOpenFilter(false);
  };
  const handleopenbusfilter = () => {
    setopenbusfilter(true);
  };
  const handleclosebusfilter = () => {
    setopenbusfilter(false);
  };
  const onDateSubmit = (e) => {
    setSelected({ type: 'Date Range', name: `${e?.startDate} - ${e?.endDate}` })
    demoi(e?.startDate, e?.endDate, "date")
    handleclosebusfilter()
  }
  useEffect(() => {
    demoi()
  }, []
  )
  const handleDelete = () => {
    setSelected(null)
    demoi()
  }
  const demoi = async (id, i, g) => {
    setLoader(true);
    var userid = JSON.parse(sessionStorage.getItem('userDetails'))?.id
    var role =JSON.parse(sessionStorage.getItem('userDetails'))?.role
    var data = JSON.stringify({
      "from_date": g === "date" ? id : '',
      "to_date": g === "date" ? i : '',
      "user_id": userid,
      "role_id": role,
      project_id: g ? "" : i === 3 ? id?.id : '',
      taluk_id: g === "country" ? JSON.stringify(i) : "",
      district_id: g === "country" ? JSON.stringify(id) : "",
      funder_id: g ? "" : i === 2 ? id?.id : '',
    });
  
    const config = {
      method: 'post',
      url: baseURL+'getTotalstocks',
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
        'Authorization': `${apikey}`
      },
      data
    };
    axios(config)
      .then((response) => {
        setLoader(false);
        setDemo(response.data?.data)
      })
      .catch((error) => {
        // console.log(error);
      });
  }
  const onSumbit = (e, i) => {
    setSelected({ type: 'Location', name: ` ${e?.stateName} ; District : ${e?.districtName} ; Taluk : ${e?.talukName}` })
    handleclosebusfilter()
    demoi(e?.district_id, e?.talaq_id, "country")
  }
  const getData = (itm, i) => {
    setSelected(itm)
    setopenbusfilter(false);
    const data = i === 2 ? { "funder_id": itm?.id } : { "project_id": itm?.id }
    demoi(itm, i)
    setFilterData(data)
    handleCloseFilter()
  }
  if (loader) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '70vh' }}>
        <CircularProgress sx={{color:'#ff7424'}}/>
      </Box>
    );
  }
  return (
    
          <Page title="Buzz Stock">
            <Container>
         <Stack direction="row" alignItems="center" justifyContent="space-between" mb={5}>
          <Typography variant="h5" gutterBottom >
           Consolidated Org Stock
          </Typography>
          <Button style={{ float: "right", color: '#ff7424' }} id="filters"
            sx={{
              '&:hover': {
                backgroundColor: '#ffd796',
              },
            }}
            onClick={() => {
              handleopenbusfilter()
            }}>
            Filter
          </Button>
        </Stack>
      {selected?.type &&
        <Stack direction="row" spacing={1}>
           <Chip style={{ backgroundColor: '#ffd796', color: '#000' }}label={`${selected?.type} : ${selected?.name} `} onDelete={() => { handleDelete(selected) }} />
        </Stack>
      }
      <Stack direction="row" spacing={1} flexShrink={0} >
        
        <FiltersHome
          type="BuzzStock"
          getData={getData}
          onSumbit={onSumbit}
          same={() => { demoi(), handleclosebusfilter() }}
          onDateSubmit={onDateSubmit}
          isOpenFilter={openbusfilter}
          onOpenFilter={handleopenbusfilter}
          onCloseFilter={handleclosebusfilter} />
      </Stack>
      <Grid
        sx={{
          p: 1,
          margin: 'auto',
          maxWidth: 500,
          flexGrow: 1,
        }}
      >
      
        {(selected?.type=='Date Range')?<TableContainer component={Paper}>
          <Table aria-label="customized table">
            <TableHead>
              <TableRow style={{ justifyContent: 'center', alignItems: 'center', marginLeft: 200 }}>
                <StyledTableCell>ITEM</StyledTableCell>
                <StyledTableCell>Consumed/Available Quantity</StyledTableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {demo && demo.map((row) => (
                <StyledTableRow >
                  <StyledTableCell component="th" scope="row">
                    {row.name}        :        
                  </StyledTableCell>
                  <StyledTableCell>{(row.consumed=="")?0:row.consumed}/{row.current_stock}</StyledTableCell>
                </StyledTableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>:<TableContainer component={Paper}>
          <Table aria-label="customized table">
            <TableHead>
              <TableRow style={{ justifyContent: 'center', alignItems: 'center', marginLeft: 200 }}>
                <StyledTableCell>ITEM</StyledTableCell>
                <StyledTableCell>Available Quantity</StyledTableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {demo && demo.map((row) => (
                <StyledTableRow >
                  <StyledTableCell component="th" scope="row">
                    {row.name}        :        
                  </StyledTableCell>
                  <StyledTableCell>{row.current_stock}</StyledTableCell>
                </StyledTableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>}
      </Grid>
      </Container>
    </Page>
  );
}
