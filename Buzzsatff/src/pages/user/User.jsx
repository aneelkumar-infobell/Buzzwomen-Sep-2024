import { useState, useEffect, useRef, forwardRef } from 'react';
import axios from 'axios';
import { Container, Stack, Typography, Box, Toolbar, Button, TextField, Select, MenuItem, Snackbar, Chip } from '@mui/material';
import MuiAlert, { AlertProps } from '@mui/material/Alert';
import CircularProgress from '@mui/material/CircularProgress';
import Pagination from '@mui/material/Pagination';
import Page from '../../components/Page';
import { ProductSort, ProductList, ProductCartWidget, ProductFilterSidebar } from '../../sections/@dashboard/products';
import PRODUCTS from '../../_mock/products';
import UserDrawer from '../Components/UserDrawer';
import AddUser from './AddUser';
import Searchbar from 'src/layouts/dashboard/Searchbar';
import FiltersHome from '../Filters/FiltersHome';
import { baseURL } from 'src/utils/api';
import { useAuth } from 'src/AuthContext';
  
export default function User() {
  const { apikey } = useAuth();
  const [openFilter, setOpenFilter] = useState(false);
  const [users, setUsers] = useState([]);
  const [ceoUser, setCeoUser] = useState([])
  const [peopleFilter, setpeopleFilter] = useState(false)
  const [open, setOpen] = useState(false);
  const [scroll, setScroll] = useState('paper');
  const [projects, setProjects] = useState([])
  const [searchUser, setSearchUser] = useState("");
  const [page, setPage] = useState(1)
  const [count, setCount] = useState('')
  const [openMessage, setOpenMessage] = useState(false)
  const [message, setMessage] = useState(false)
  const [selected, setSelected] = useState(null)
  const [loader, setLoader] = useState(true)
  const Alert = forwardRef(function Alert(props, ref) {
    return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
  });
  const handleClickOpen = (scrollType) => () => {
    setOpen(true);
    setScroll(scrollType);
  };
  const handleClose = () => {
    setOpen(false);
  };
  const descriptionElementRef = useRef(null);
  const handleOpenFilter = () => {
    setOpenFilter(true);
  };
  const handlepeopleOpenFilter = () => {
    setpeopleFilter(true);
  };
 
  const handleCloseFilter = () => {
    setOpenFilter(false);
    // setSearchUser(null);
    // setSelected(null)
   };
  const handlepeopleCloseFilter = () => {
    setpeopleFilter(false);
  };
  useEffect(() => {
    user()
    setLoader(true)
  }, [searchUser]
  )
  const getProjects = async (d) => {
    const data = JSON.stringify({
      "search": "",
      "id": "1",
      "role_id": "1",
      "filter_id": 0,
      "type": "",
      "pageNum": d ? d : 1
    });
    const config = {
      method: 'post',
      url: baseURL + 'getProjects',
      headers: {
        'Content-Type': 'application/json',
         'Authorization': `${apikey}`
      },
      data
    };
    axios(config)
      .then((response) => {
        setProjects(response.data)
      })
      .catch((error) => {
        // console.log(error);
      });
  }
  useEffect(() => {
    if (open) {
      const { current: descriptionElement } = descriptionElementRef;
      if (descriptionElement !== null) {
        descriptionElement.focus();
      }
    }
  }, [open]);
  var userAccess = ['2']
  var userIdCheck = sessionStorage?.getItem('userId')
  const user = async (d, filter_type) => {
    setLoader(true)
    if (filter_type) {
      setSelected(filter_type)
      let ids = { "Trainer": 5, "Drivers": 7, "Funder": 8, "Partner": 9,'Field Associate': 6 }
      filter_type.id = ids[filter_type.type]
    }
    const dataid = sessionStorage?.getItem('userDetails')
    const data = JSON.stringify({
      "search": searchUser,
      "user_id": JSON?.parse(dataid)?.id,
      "role_id": JSON?.parse(dataid)?.role,
      "filter_id": filter_type?.id ? JSON.stringify(filter_type?.id):"",
      "type": "",
      "pageNum": JSON.stringify(d ? d : 1)
    });
    const config = {
      method: 'post',
      url: baseURL+'getAllPeople',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `${apikey}`
      },
      data
    };
    axios(config)
      .then((response) => {
        if (response.data.list) {
          setUsers(response.data.list)
        }
        else {
          setUsers([])
        }
        setCount(response?.data?.total_count % 25 == 0 ? parseInt(response?.data?.total_count / 25) : parseInt(response?.data?.total_count / 25) + 1)
        setLoader(false)
      })
      .catch((error) => {
        // console.log(error);
      });
  }
  const pageChange = (event, newPage) => {
    setPage(newPage);
    (selected?.type) ? user(newPage, selected) : user(newPage)
  }
  const handleDelete = () => {
    user()
    setSelected(null)
    setSearchUser("")
   
  }
  const searchBarCall = (e) => {
    setSearchUser(e)
    setSelected({ type: `Search :  ${e}` })
    // console.log(e)
  }
  if (loader) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: "center", height: '70vh' }}>
        <CircularProgress sx={{color:'#ff7424'}}/>
      </Box>
    )
  }
  else {
    return (
      <Page title="All Users">
        {/* <DashboardNavbar getSearch={(e) => setSearchUser(e)}  onOpenSidebar={() => setOpen(true)} /> */}
        <Searchbar getSearch={(e) => { searchBarCall(e) }} id="searchbar" />
        <Snackbar open={openMessage} autoHideDuration={6000} onClose={() => setOpenMessage(false)} id="alert_message">
          <Alert onClose={() => { setOpenMessage(false) }} severity="success" sx={{ width: '100%' }}>
            {message}
          </Alert>
        </Snackbar>  
          <Stack direction="row" spacing={1} flexShrink={0} sx={{ my: 1 }}>
            <FiltersHome
              type="People"
              user={user}
              isOpenFilter={peopleFilter}
              onOpenFilter={handlepeopleOpenFilter}
              onCloseFilter={handlepeopleCloseFilter}
            />
          </Stack>
          {userAccess.includes(userIdCheck) &&
            <Stack direction="row" spacing={1} flexShrink={0} sx={{ my: 1 }}>
              <AddUser viewMessage={(text) => {
                setMessage(text)
                setOpenMessage(true)
              }} data={ceoUser} />
            </Stack>
          }
      
        <Container>
          <Typography variant="h4" sx={{ mb: 5 }}>
            People
            <Button style={{ float: "right", color: '#ff7424' }} id="filters"
              sx={{
                '&:hover': {
                  backgroundColor: '#ffd796',
                },
              }}
              onClick={() => {
                handlepeopleOpenFilter()
              }}>Filters</Button>
          </Typography>
          {selected?.type &&
            <div><Stack direction="row" spacing={1}>
               <Chip style={{ backgroundColor: '#ffd796', color: '#000' }}label={`${selected?.type}`} onDelete={() => { handleDelete() }} />
            </Stack><br/></div>
          }
            <ProductList users={users} products={PRODUCTS} isOpenFilter={openFilter}
            onOpenFilter={handleOpenFilter}
            onCloseFilter={handleCloseFilter} />
          <Stack direction="row" flexWrap="wrap-reverse" alignItems="center" justifyContent="flex-end" sx={{ mb: 5 }}>
            <Stack direction="row" spacing={1} flexShrink={0} sx={{ mb: 1 }}>
              <UserDrawer
                isOpenFilter={openFilter}
                onOpenFilter={handleOpenFilter}
                onCloseFilter={handleCloseFilter}
                users={users}
                deleteuser={() => {
                  setOpenFilter(!openFilter)
                  handleCloseFilter();
                  handleDelete();
                }}
              />
            </Stack>
          </Stack>
        
          <ProductCartWidget /><br></br>
          {
            users.length > 0 && <Pagination page={page} onChange={pageChange} rowsPerPage={25} count={count} variant="outlined" color="warning" sx={{ color: "#ffd796",marginBottom:5 }} style={{ float: "right" }} />
          }
        </Container>
      </Page >
    );
  }
}
