import { useState, useEffect, forwardRef } from 'react';
import axios from 'axios';
import {
  Card,
  Stack,
  Chip,
  Container,
  Typography,
  CardContent,
  Grid,
  IconButton,
  Button,
  CircularProgress,
} from '@mui/material';
import ParticipantDrawer from '../projects/Components/ParticipantDrawer';
import { Link, useLocation } from 'react-router-dom';
import Iconify from 'src/components/Iconify';
import GreenSurvey from './Components/GreenSurvey';
import Searchbar from 'src/layouts/dashboard/Searchbar';
import Filtersmain from './projectfilters/filtersmain';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import Snackbar from '@mui/material/Snackbar';
import { baseURL } from 'src/utils/api';
import { useAuth } from 'src/AuthContext';
import MuiAlert, { AlertProps } from '@mui/material/Alert';
import ViewGreenSurvey from './Components/ViewGreenSurvey';
export default function enrolledGreenMotivatorsList() {
  const { apikey } = useAuth();
  const { state } = useLocation();
  const [clcikData, setClickData] = useState();
  const [green, setGreen] = useState('');
  const [filterData, setFilterData] = useState({});
  const [openMessage, setOpenMessage] = useState(false);
  const [message, setMessage] = useState('');
  var [selected, setSelected] = useState(null);
  const [data1, setData1] = useState('');
  var [search, setSearch] = useState('');
  const [count, setCount] = useState(0);
  const [reload, setReload] = useState(false);
  useEffect(() => {
    enrolledGreenMotivators();
  }, []);
  const [successMessage, setsuccessMessage] = useState(false);
  const [openFilter, setOpenFilter] = useState(false);
  const [filter, setFilter] = useState(false);
  const searchFunction = (e) => {
    search = e;
    setSearch(search);
    setSelected({ name: e, type: 'Search' });
    enrolledGreenMotivators();
  };
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
  const changeState = () => {
    setReload(!reload);
  };
  const enrolledGreenMotivators = async (id, i, g) => {
    var role = JSON.parse(sessionStorage?.getItem('userDetails'))?.role;
    var idvalue = JSON.parse(sessionStorage?.getItem('userDetails'))?.id;
    var data = JSON.stringify({
      search: search,
      project_id: state?.id,
      emp_id: idvalue,
      gelathi_id: id?.emp_id ? id?.emp_id : '',
    });

    var config = {
      method: 'post',
      url: baseURL + 'getEnrollGreenMotivators',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `${apikey}`,
      },
      data: data,
    };
    axios(config)
      .then(function (response) {
        setGreen(response.data);
        changeState();
        setCount(response?.data?.list.length);
      })
      .catch(function (error) {
        // console.log(error);
      });
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
        Authorization: `${apikey}`,
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
  const handleDelete = () => {
    setSelected(null);
    search = '';
    setSearch(search);
    enrolledGreenMotivators();
  };
  const Alert = forwardRef(function Alert(props, ref) {
    return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
  });
  const getData = (itm, i) => {
    setSelected({ itm, type: 'Field Associates' });
    const data = i === 6 ? { gelathi_id: itm?.id } : i === 1 ? { partner_id: itm?.id } : { project_id: itm?.id };
    enrolledGreenMotivators(itm, i);
    setFilterData(data);
    handleclose();
  };
  const removeGelathi = async (itm) => {
    if (confirm('Are you sure want to remove Gelathi')) {
      var data = JSON.stringify({
        id: itm?.id,
        tb_id: itm?.tb_id,
      });

      var config = {
        method: 'post',
        url: baseURL + 'removeGreenMotivators',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `${apikey}`,
        },
        data: data,
      };

      axios(config)
        .then(function (response) {
          enrolledGreenMotivators();
        })
        .catch(function (error) {
          // console.log(error);
        });
    }
  };
  const role = JSON.parse(sessionStorage?.getItem('userDetails'))?.role;
  return (
    <Container>
      <Searchbar getSearch={(e) => searchFunction(e)} />
      {successMessage && (
        <Snackbar open={successMessage} autoHideDuration={6000} onClose={() => setsuccessMessage(false)}>
          <Alert
            onClose={() => {
              setsuccessMessage(false);
            }}
            severity="success"
            sx={{ width: '100%', marginLeft: '250%' }}
          >
            {message}
          </Alert>
        </Snackbar>
      )}
      <Stack direction="row" alignItems="center" justifyContent="space-between" mb={5}>
        <Typography variant="h5" gutterBottom>
          <Link to="/dashboard/projects/project">
            <IconButton>
              <Iconify icon="material-symbols:arrow-back-rounded" />
            </IconButton>
          </Link>
          Green Motivators
        </Typography>
        {/* {(role==1 || role==3||role==5||role==4||role==12)?<Button style={{ float: "right",right:30,position:'absolute', color: '#ff7424' }} sx={{ '&:hover': { backgroundColor: '#ffd796', }, }} onClick={() => { handleopen() }}>
            Filter
          </Button>:null} */}
      </Stack>
      <Stack direction="row" spacing={1} flexShrink={0} sx={{ my: 1 }}>
        <Filtersmain
          type="GreenMotivators"
          isOpenFilter={filter}
          data1={data1}
          getData={getData}
          onOpenFilter={handleopen}
          onCloseFilter={handleclose}
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
      <Typography style={{ fontWeight: 500, marginLeft: 2 }}>Green Motivators : ({count})</Typography>

      <Stack direction="row" spacing={1} flexShrink={0} sx={{ my: 1 }}>
        <ParticipantDrawer
          clcikData={clcikData}
          isOpenFilter={openFilter}
          onOpenFilter={handleOpenFilter}
          onCloseFilter={handleCloseFilter}
        />
      </Stack>
      {green == '' ? (
        <div style={{ marginTop: '20%', marginLeft: '40%' }}>
          <CircularProgress sx={{ color: '#ff7424' }} />
        </div>
      ) : green?.list != null ? (
        green?.list?.map((itm) => {
          return (
            <Card style={styles.card1}>
              <div>
                {role == 13 || role == 6 ? (
                  <IconButton style={{ float: 'right', right: 30 }} onClick={() => removeGelathi(itm)}>
                    <Iconify icon="ic:sharp-remove-circle" />
                  </IconButton>
                ) : null}
              </div>
              <div
                onClick={() => {
                  setClickData({ name: itm, title: 'Enrolled Green Motivator Name', id: itm?.id });
                  handleOpenFilter();
                }}
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
                <div variant="subtitle1" gutterBottom>
                  {` Gelathi Name : ${itm?.gelathiname}`}
                  <div>
                    {role == 4 || role == 3 || role == 12 || role == 1 ? (
                      itm?.is_survey ? (
                        <IconButton style={{ float: 'right', right: 30 }}>
                          <ViewGreenSurvey itm={itm} changeState={changeState} />
                        </IconButton>
                      ) : role == 6 || role == 13 ? (
                        <GreenSurvey itm={itm} changeState={changeState} />
                      ) : (
                        <IconButton style={{ float: 'right', right: 30 }}>
                          <Iconify
                            icon="charm:notes-tick"
                            width={20}
                            height={20}
                            color="orange"
                            onClick={() => alert('Not yet filled')}
                          />
                        </IconButton>
                      )
                    ) : null}
                    {/* <GreenSurvey itm={itm} changeState={changeState}/> */}
                  </div>
                </div>

                <div variant="subtitle2" gutterBottom>
                  {` Village Name : ${itm?.villagename}`}
                </div>
                {role == 1 || role == 3 || role == 5 || role == 12 || role == 4 ? (
                  <div variant="subtitle2" gutterBottom>
                    {` Enrolled By : ${itm?.enrolled_by}`}
                  </div>
                ) : null}
                <div variant="body2" gutterBottom>
                  {` Enrolled Date  : ${itm?.enroll_date}`}
                </div>
              </div>
            </Card>
          );
        })
      ) : (
        <>
          <h4 style={{ textAlign: 'center' }}>No Green Motivators Found</h4>
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
