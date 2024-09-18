import { useState, useEffect } from 'react';
import axios from 'axios';
import { Card, Stack, Chip, Container, CardContent, Typography, Grid, IconButton, Button } from '@mui/material';
import GelathiCircleDrawer from '../projects/Components/GelathiCircleDrawer';
import { Link, useLocation } from 'react-router-dom';
import Iconify from 'src/components/Iconify';
import Searchbar from 'src/layouts/dashboard/Searchbar';
import ChooseGelathi from './Components/ChooseGelathi';
import Filtersmain from './projectfilters/filtersmain';
import { baseURL } from 'src/utils/api';
import { useAuth } from 'src/AuthContext';
export default function gelathiCirclesList() {
    const { apikey } = useAuth();
  const { state } = useLocation();
  const [clcikData, setClickData] = useState();
  const roleid = JSON.parse(sessionStorage?.getItem('userDetails'))?.role;
  const [gelathiCircles, setgelathiCircles] = useState('');
  const [filterData, setFilterData] = useState({});
  const [reload, setReload] = useState(false);
  const [data1, setData1] = useState('');
  var [search, setSearch] = useState('');
  var [selected, setSelected] = useState(null);
  const [count, setCount] = useState('');
  const [openFilter, setOpenFilter] = useState(false);
  const [filter, setFilter] = useState(false);
  const [reloadFromForm, setReloadFromForm] = useState(false);
  const reloadFunction = () => {
    setReloadFromForm(!reloadFromForm);
  };
  useEffect(() => {
    let isApiSubscribed = true;
    if (isApiSubscribed) {
      projData();
      circle();
    }
    return () => {
      isApiSubscribed = false;
    };
  }, [reloadFromForm]);
  const searchFunction = (e) => {
    search = e;
    setSearch(search);
    setSelected({ name: e, type: 'Search' });
    circle();
  };
  const id = sessionStorage?.getItem('proId');
  useEffect(() => {
    projData();
  }, []);
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
        setData1(response.data.list);
      })
      .catch(function (error) {
        // console.log(error);
      });
  };
  useEffect(() => {
    circle();
  }, []);
  const handleOpenFilter = () => {
    setOpenFilter(true);
  };
  const handleCloseFilter = () => {
    setOpenFilter(false);
  };
  const handleopen = () => {
    setFilter(true);
  };
  const handleclose = () => {
    setFilter(false);
  };
  const circle = async (id, i, g) => {
    var role = JSON.parse(sessionStorage?.getItem('userDetails'))?.role;
    var idvalue = JSON.parse(sessionStorage?.getItem('userDetails'))?.id;
    var data = JSON.stringify({
      search: search,
      project_id: state?.id,
      gelathi_id: idvalue,
    });
    var config = {
      method: 'post',
      
      url: baseURL+'getGelathiCircle',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `${apikey}`
      },
      data: data,
    };
    axios(config)
      .then(function (response) {
        setgelathiCircles(response.data);
        setCount(response?.data?.list.length);
        setReload(!reload);
      })
      .catch(function (error) {
        // console.log(error);
      });
  };
  const handleDelete = () => {
    setSelected(null);
    search = '';
    setSearch(search);
    circle();
  };
  const getData = (itm, i) => {
    setSelected({ itm, type: 'Field Associates' });
    const data = i === 6 ? { gelathi_id: itm?.id } : i === 1 ? { partner_id: itm?.id } : { project_id: itm?.id };
    circle(itm, i);
    setFilterData(data);
    handleclose();
  };
  const role = JSON.parse(sessionStorage?.getItem('userDetails'))?.role;
  return (
    <Container>
      {' '}
      <Searchbar getSearch={(e) => searchFunction(e)} />
      <Stack direction="row" alignItems="center" justifyContent="space-between" mb={5}>
        <Typography variant="h5" gutterBottom>
          <Link to="/dashboard/projects/project">
            <IconButton>
              <Iconify icon="material-symbols:arrow-back-rounded" />
            </IconButton>
          </Link>
          Gelathi Circles 
        </Typography>
        {role == 1 || role == 3 || role == 5 || role == 4 || role == 12 ? (
          <Button
            style={{ float: 'right', right: 30, position: 'absolute', color: '#ff7424' }}
            sx={{ '&:hover': { backgroundColor: '#ffd796' } }}
            onClick={() => {
              handleopen();
            }}
          >
            Filter
          </Button>
        ) : null}
        {roleid == 6 || roleid == 13 ? <ChooseGelathi data1={data1} circle={circle} /> : null}
      </Stack>
      <Stack direction="row" spacing={1} flexShrink={0} sx={{ my: 1 }}>
        <Filtersmain
          type="Gelathicircles"
          isOpenFilter={filter}
          onOpenFilter={handleopen}
          onCloseFilter={handleclose}
          data1={data1}
          getData={getData}
        />
      </Stack>
      {selected && selected?.type == 'Search' && (
        <>
          {' '}
          <Chip
            style={{ backgroundColor: '#ffd796', color: '#000' }}
            label={`${selected?.type} : ${selected?.name} `}
            onDelete={() => {
              handleDelete(selected);
            }}
          />
          <br />
          &nbsp;
        </>
      )}
      {selected && selected?.type == 'Field Associates' && (
        <>
          {' '}
          <Chip
            style={{ backgroundColor: '#ffd796', color: '#000' }}
            label={`${selected?.type} : ${selected?.itm?.name} `}
            onDelete={() => {
              handleDelete(selected);
            }}
          />
          <br />
          &nbsp;
        </>
      )}
      <Card>
        <CardContent style={{ fontWeight: 700 }}>Project Name : {data1.project_name}</CardContent>{' '}
      </Card>
      <br />
      <Typography style={{ fontWeight: 500, marginLeft: 2 }}>Circles : ({count})</Typography>
      <Stack direction="row" spacing={1} flexShrink={0} sx={{ my: 1 }}>
        <GelathiCircleDrawer
          clcikData={clcikData}
          isOpenFilter={openFilter}
          onOpenFilter={handleOpenFilter}
          onCloseFilter={handleCloseFilter}
          data1={data1}
          reloadmethod={reloadFunction}
        />
      </Stack>
      {gelathiCircles?.list?.length !== 0 ? (
        gelathiCircles?.list?.map((itm) => {
          return (
            <Card
              style={styles.card1}
              onClick={() => {
                setClickData({ name: itm.circle_name, title: ' Gelathi Circle', id: itm?.circle_id });
                handleOpenFilter();
              }}
            >
              <Grid
                pt={1}
                pb={1}
                container
                xs={12}
                md={4}
                direction="row"
                alignItems="center"
                justifyContent="space-between"
                style={{ marginLeft: 15 }}
              >
                <Typography variant="subtitle1" gutterBottom>
                  {`  ${itm?.circle_name}`}{' '}
                  <IconButton style={{ float: 'right', position: 'absolute', right: 20, color: 'black' }}>
                    <Iconify icon="mdi:clock-time-four-outline"></Iconify>
                  </IconButton>
                </Typography>
              </Grid>
              <Grid style={{ marginLeft: 15 }}>
                <Typography variant="subtitle2" gutterBottom>
                  {`   ${itm?.circle_date}`}
                </Typography>
              </Grid>
            </Card>
          );
        })
      ) : (
        <>
          <h4 style={{ textAlign: 'center' }}>No Gelathi Circle Found</h4>
        </>
      )}
    </Container>
  );
}
const styles = {
  card1: {
    backgroundColor: '#f5f5f5',
    opacity: 0.9,
    marginTop: '20px',
    padding: '1rem',
  },
};