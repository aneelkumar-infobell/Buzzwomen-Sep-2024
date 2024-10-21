import { useState, useEffect } from 'react';
import axios from 'axios'
import { Card, Stack, Chip, Container,CardContent, Typography, Grid, IconButton,Button, CircularProgress } from '@mui/material';
import ParticipantDrawer from '../projects/Components/ParticipantDrawer';
import { Link, useLocation } from 'react-router-dom';
import Iconify from 'src/components/Iconify';
import Searchbar from 'src/layouts/dashboard/Searchbar';
import Filtersmain from './projectfilters/filtersmain';
import { baseURL } from 'src/utils/api';
import { useAuth } from 'src/AuthContext';
import GelathiCircleFormView from './Components/GelathiCircleFormView';
export default function enrolledGelathiList() {
    const { apikey } = useAuth();
    const {state} = useLocation()
    const [data1, setData1] = useState('')
    var [search, setSearch] = useState('')
    const [filterData, setFilterData] = useState({})
    var [selected, setSelected] = useState(null)
    const [clcikData, setClickData] = useState()
    const [enrolled, setenrolled] = useState('');
    const [remove,setRemoved]=useState('');
    const [count,setCount]= useState('');
    useEffect(() => {
        enrolledGelathi();
    }, []
    )
    const [gelathiId  ,setGelathiID] = useState('')
    const [openFilter, setOpenFilter] = useState(false);
    const [filter,setFilter]=useState(false);
    const [shopwShakthiForm ,setShowShakkthiForm] = useState(false)
    const handleOpenFilter = () => {
        setOpenFilter(true);
    };
    const handlesurvey =(itm)=>{
      console.log(itm ,"data")
      setGelathiID(itm)
      // alert('Survey was done')
      setShowShakkthiForm(true)
  }
  console.log(gelathiId ,"gelathiIdgelathiId")
  const handleShakformClose = ()=>{
    setShowShakkthiForm(false)
  }
    const handleCloseFilter = () => {
        setOpenFilter(false);
    };
    const handleopen=()=>{
      setFilter(true)
    };
    const handleclose=()=>{
      setFilter(false)
    }
    const searchFunction = (e) => {
        search = e
        setSearch(search)
        setSelected({ name: e, type: "Search" })
        enrolledGelathi()
    }
const roleid = JSON.parse(sessionStorage?.getItem('userDetails'))?.role;
    const enrolledGelathi = async(id,i,g) =>{
        var userDetails = JSON.parse(sessionStorage?.getItem('userDetails'))
  var role = JSON.parse(sessionStorage?.getItem('userDetails'))?.role
  var idvalue = JSON.parse(sessionStorage?.getItem('userDetails'))?.id;
  var data = JSON.stringify({
    "search": search,
    "project_id": state?.id,
    "emp_id": idvalue,
    "role_id": role,
    "gelathi_id":id?.emp_id?id?.emp_id:'',
  });
  
  var config = {
    method: 'post',
    url: baseURL+'getEnrollGelathi',
    headers: { 
      'Content-Type': 'application/json',
      'Authorization': `${apikey}`
    },
    data : data
  };
          
          axios(config)
          .then(function (response) {
            setenrolled(response.data)
            setCount(response?.data?.list.length)
          })
          .catch(function (error) {
            // console.log(error);
          });
    }
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
        setData1(response.data.list)
      })
      .catch(function (error) {
        // console.log(error);
      });
  }
  const handleDelete = () => {
    setSelected(null)
    search = ''
    setSearch(search)
    enrolledGelathi();
}
const getData = (itm, i) => {
  setSelected({itm,type:'Field Associates'})
  const data = i === 6 ? { "gelathi_id": itm?.id } : i === 1 ? { "partner_id": itm?.id } : { "project_id": itm?.id }
  enrolledGelathi(itm, i)
  setFilterData(data)
  handleclose()
  }
  const removeGelathi= async(itm)=>{
    if (confirm("Do You Want To Remove Gelathi?")){
      var data = JSON.stringify({
        "id": itm?.id,
        "tb_id": itm?.tb_id
      });
      
      var config = {
        method: 'post',
        url: baseURL + 'removeEnrollGelathi',
        headers: { 
          'Content-Type': 'application/json',
          'Authorization': `${apikey}`
        },
        data : data
      };
 
  axios(config)
  .then(function (response) {
    setRemoved(response.data)
    enrolledGelathi()
  })
  
  .catch(function (error) {
    // console.log(error);
  });
  }}
  const role = JSON.parse(sessionStorage?.getItem('userDetails'))?.role
    return (
        <Container>  <Searchbar getSearch={(e) => searchFunction(e)} />
            <Stack direction="row" alignItems="center" justifyContent="space-between" mb={5}>
                <Typography variant="h5" gutterBottom>
                    <Link to="/dashboard/projects/project">
                        <IconButton>
                            <Iconify icon="material-symbols:arrow-back-rounded" />
                        </IconButton></Link>
                   Gelathis 
                </Typography>
                {/* {(role==1 || role==3||role==5||role==4||role==12)?<Button style={{ float: "right",right:30,position:'absolute', color: '#ff7424' }} sx={{ '&:hover': { backgroundColor: '#ffd796', }, }} onClick={() => { handleopen() }}>
            Filter
          </Button>:null} */}
                
            </Stack>
            <Stack direction="row" spacing={1} flexShrink={0} sx={{ my: 1 }}>
                <Filtersmain
                    type="Gelathis"
                    isOpenFilter={filter}
                    data1={data1}
                    onOpenFilter={handleopen}
                    getData={getData}
                    onCloseFilter={handleclose}
                />
            </Stack>
            
            {
                    selected &&(selected?.type=='Search') && <> <Chip style={{ backgroundColor: '#ffd796', color: '#000' }}label={`${selected?.type} : ${selected?.name} `} onDelete={() => { handleDelete(selected) }} /><br/>&nbsp;</>
            }
             {
                    selected &&(selected?.type=='Field Associates') && <> <Chip style={{ backgroundColor: '#ffd796', color: '#000' }}label={`${selected?.type} : ${selected?.itm?.name} `} onDelete={() => { handleDelete(selected) }} /><br/>&nbsp;</>
            }
                   <Card><CardContent style={{fontWeight:700}}>Project Name : {data1.project_name}</CardContent> </Card><br/>
            <Typography style={{fontWeight:500,marginLeft:2}}>Enrolled Gelathis({count})</Typography> 
            {/* <Stack direction="row" flexWrap="wrap-reverse" alignItems="center" justifyContent="flex-end" sx={{ mb: 5 }}> */}
            <Stack direction="row" spacing={1} flexShrink={0} sx={{ my: 1 }}>
                <ParticipantDrawer
                    clcikData={clcikData}
                    isOpenFilter={openFilter}
                    onOpenFilter={handleOpenFilter}
                    onCloseFilter={handleCloseFilter}
                />
            </Stack>
            {
              enrolled == ""?
              <div style={{marginTop:"20%" , marginLeft:"40%"}}>
  <CircularProgress sx={{color:'#ff7424'}}/>
  </div>
  :
            
            enrolled?.list?.length!==0?enrolled?.list?.map((itm) => {
                return (
                    <Card style={{ ...styles.card1, display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '16px' }}>
                  
                        <div onClick={() => {
                        setClickData({ name: itm.gelathiname, title: "Participant Details",id:itm?.id })
                        handleOpenFilter()
                    }} pt={1} pb={1} container xs={12} md={4} direction="row" alignItems="center" justifyContent="space-between" style={{ marginLeft: 15 }}>
                            <Typography variant="subtitle1" gutterBottom>
                                {` Gelathi Name : ${itm?.gelathiname}`}
                            </Typography>
                        <Typography variant="subtitle1" gutterBottom>
                                {` Village Name : ${itm?.villagename}`}
                            </Typography>
                            {(roleid==1 || roleid==3 || roleid== 4|| roleid==12)?<Typography variant="subtitle1" gutterBottom>
                                {` Enrolled By : ${itm?.enrolled_by}`}
                            </Typography>:null}
                            <Typography variant="subtitle1" gutterBottom>
                                {` Enrolled Date : ${itm?.enroll_date}`}
                            </Typography>
                        </div>
                        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'flex-end' }}>
                        {(role==13 || role==6)?<IconButton style={{float:'right'}} onClick={()=>removeGelathi(itm)}><Iconify icon="ic:sharp-remove-circle"/></IconButton>:null}
                     {  itm?.is_survey? 
                     <IconButton >
          <Iconify icon="charm:notes-tick" width={20} height={20} color="green" onClick={() => handlesurvey(itm)}/>
        </IconButton> : <IconButton > <Iconify icon="charm:notes-tick" width={20} height={20} color="orange" onClick={() => alert("Not yet filled")}/>
        </IconButton>  }

                        </div>
                    </Card>
                    
                  )
            }):<>
            <h4 style={{textAlign:'center'}}>No Enrolled Gelathi Found</h4>
            </>}

            {shopwShakthiForm && (
              <GelathiCircleFormView
                // index={selectedFromIndex.index}
                // reloadmethod={reloadmethod}
                // itm={itm } 
                // clcikData={clcikData}
                // circleData={circleData}
                // singleCircleData={singleCircleData}
                 id={gelathiId}
                setShowForm={handleShakformClose}
                // componentreloadmethod={componentreloadmethod}
                // gelathiDrawerReloder={gelathiDrawerReloder}
              />
            )} 
        </Container>
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