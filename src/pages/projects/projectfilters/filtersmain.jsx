import { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';
import {
  Grid, Radio, Stack, Button, Drawer, Rating, Divider, Checkbox, FormGroup, IconButton, Typography, Chip, Card, CardContent, Box,
  TextField,
} from '@mui/material';
import Iconify from '../../../components/Iconify';
import Scrollbar from '../../../components/Scrollbar';
import GelathiFacilitators from './Gelathifacilitators';
import Daterange from './Daterange';
import { id } from 'date-fns/locale';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { LocalizationProvider } from '@mui/lab';
import Funders from 'src/pages/Filters/Funders';
import FuderList from 'src/pages/Filters/FuderList';
import FunderApi from 'src/pages/Filters/components/FunderApi';
Filtersmain.propTypes = {
    isOpenFilter: PropTypes.bool,
    onOpenFilter: PropTypes.func,
    onCloseFilter: PropTypes.func,
  };
export default function Filtersmain({ isOpenFilter,getDataForFUnder, onOpenFilter, onCloseFilter, clcikData, user, getData, onSumbit, onDateSubmit, type, data1, gelathiPrograme ,setDateParenent,setEndDateParenet}) {
    var [selectDATA, setSelectData] = useState()
    const [calOpen,setCalOpen] = useState(false);
    const [date, setDate] = useState(new Date())
const [dateValue,setdateValue]=useState(false);
const [endDateValue,setendateValue]=useState(false);
const [endDate, setEndDate] = useState(new Date())
let userDetails = sessionStorage?.getItem('userDetails')
userDetails = JSON.parse(userDetails)
    console.log(type ,"typetype" ,date , endDate ,dateValue ,endDateValue )
    const filterPermissions = {
      Funder: [{ id: 47, roles: ['1', '3', '12', '4','6'] }],
      GelathiProgram: [{id:45,roles:['1','3','4','6','12','13']},{ id: 47, roles: ['1', '3', '12', '4'] },{id:2,roles:['1','3','4','6','12','13']},{id:1,roles:['1','3','4','6','12','13']},{id:3,roles:['1','3','4','6','12','13']},
      { id: 22, roles: ['1','3','4','6','12','13']}, { id: 23, roles: ['1','3','4','6','12','13']},{id:46,roles:['13','4','3','1','12']},
      {id:4,roles:['1','12','13','6','3']},{id:5,roles:['1','3','4','6','12','13']},{id:6,roles:['13','4','3','1','12','6']}, 
      { id: 7, roles: ['1','3','4','6','12','13']}, { id: 8, roles: ['1','3','4','6','12','13']}, { id: 9, roles: ['1','3','4','6','12','13']},
      { id: 10, roles: ['1','3','4','6','12','13']}, { id: 11, roles: ['1','3','4','6','12','13']}, { id: 12, roles: ['1','3','4','6','12','13']},
      { id: 13, roles: ['1','3','4','6','12','13']}, { id: 14, roles: ['1','3','4','6','12','13']}, { id: 15, roles: ['1','3','4','6','12','13']},
      { id: 16, roles: ['1','3','4','6','12','13']}, { id: 17, roles: ['1','3','4','6','12','13']}, { id: 18, roles: ['1','3','4','6','12','13']},
      { id: 19, roles: ['1','3','4','6','12','13']}, { id: 20, roles: ['1','3','4','6','12','13']}, { id: 21, roles: ['1','3','4','6','12','13']},
   
   
    ],
  
      GreenMotivators: [{ id: 6, roles: ['1','3','12','4','6','13'] },{ id: 47, roles: ['1', '3', '12', '4'] },],
  
      Vyapar: [{ id: 6, roles: ['1','3','12','4','6','13'] },{ id: 47, roles: ['1', '3', '12', '4'] },],
  
      Gelathicircles: [{ id: 6, roles: ['1','3','12','4','6','13'] }],
      Gelathis:[{id:6,roles:['1','3','12','4','6']} ,{ id: 47, roles: ['1', '3', '12', '4'] },]
    }
  
  
    const allowedRolesForCalendar = ['3', '1', '12', '4']; // Define the allowed roles
    const data = sessionStorage?.getItem('userId')
    // Check if the user has one of the allowed roles
    const userHasCalendarAccess = allowedRolesForCalendar.includes(data)
    
  console.log(selectDATA ,"selectDATAselectDATA",userHasCalendarAccess ,"userHasCalendarAccess")
    const filtersHeaders = {
      46: 'Field Associates',
      9: 'Date Range',
      2: 'Village Visits',
      1: 'Circle Meetings',
      3: 'Beehive Visits',
      4: 'SPS',
      5: 'SPM1',
      6: 'SPM2',
      7: 'SPM3',
      8: 'SPM4',
      9: 'SPM5',
      10: 'GPS',
      11: 'GPM1',
      12:'GPM2',
      13:'GPM3',
      14:'GPM4',
      15:'GPM5',
      16: 'VPS',
      17: 'VPM1',
      18:'VPM2',
      19:'VPM3',
      20:'VPM4',
      21:'VPM5',
      22:'Rescheduled',
      23:'Cancelled',
      45: 'All Gelathi Sessions',
      47:"Funder"
     
    };
  
    const handleCalendar=()=>{
      setCalOpen(true)
    }
    const handlecloseCalendar=()=>{
      setCalOpen(false)
    }
    const setData = (value) => {

      setSelectData(value)
      if(value==46){
        shakti();
        onCloseFilter();
      }
      if(value==47){
        console.log(value,"Valuesssssssssss")
       
      }
      if(value==45 ){
        gelathiPrograme();
        onCloseFilter();
      }
     
      if (filtersHeaders[value] == 'Circle Meetings' || filtersHeaders[value] == 'Beehive Visits' || filtersHeaders[value]=='Rescheduled'
       || filtersHeaders[value]=='Cancelled' || filtersHeaders[value]=='Village Visits' || filtersHeaders[value]=="SPS" || filtersHeaders[value]=='SPM1' 
       || filtersHeaders[value]=='SPM2' || filtersHeaders[value]=='SPM3' ||filtersHeaders[value]=='SPM3'|| filtersHeaders[value]=='SPM4' || filtersHeaders[value]=='SPM5' 
       || filtersHeaders[value]=='GPS' || filtersHeaders[value]=='GPM1' || filtersHeaders[value]=='GPM2' || filtersHeaders[value]=='GPM3' || filtersHeaders[value]=='GPM4'
       || filtersHeaders[value]=='GPM5' || filtersHeaders[value]=='VPS' || filtersHeaders[value]=='VPM1'|| filtersHeaders[value]=='VPM2' || filtersHeaders[value]=='VPM3'
       || filtersHeaders[value]=='VPM4' || filtersHeaders[value]=='VPM5') {
        user(1, { id: value, type: filtersHeaders[value] });
        onCloseFilter()
      }
     
    }
    useEffect(() => {
        if (type == 'Demography') {
          setSelectData(filterPermissions[type][0].id)
        }
        else {
          filterPermissions[type].forEach
            ((e, i, arr) => {
              if (e.roles.includes(data)) {
                setSelectData(e?.id);
                arr.length = i + 1; // Behaves like `break`
              }
            })
        
      }
    }, [])
  
  
    const styles = {
      buttonStyle: {
        ':hover': {
          bgcolor: '#ffd796',
          color: '#ed6c02',
        },
        color: 'black',
        marginRight: "0.5rem",
        marginBottom: "0.5rem"
      },
      highlightStyle: {
        background: '#ffd796',
        color: '#ed6c02',
  
      }
    }
  
    return (
      <>
        <Drawer
          anchor="right"
          open={isOpenFilter}
          onClose={() => {
            setSelectData(null)
            onCloseFilter()
          }}
          PaperProps={{
            sx: { width: 400, },
          }}
        >
          <Stack direction="row" alignItems="center" justifyContent="space-between" sx={{ px: 1, py: 2 }}>
            <Typography variant="subtitle1" sx={{ ml: 1 }} style={{ marginLeft: 25 }}>
              Filters :  {filtersHeaders[selectDATA]}
            </Typography>
           { userHasCalendarAccess &&<IconButton onClick={handleCalendar} sx={{float:'right',position:'absolute',right:40}}><Iconify icon="material-symbols:calendar-month" ></Iconify></IconButton>}
            {/* {userHasCalendarAccess && ( */}
            <IconButton onClick={() => {
              setSelectData(null)
              onCloseFilter()
            }}>
              <Iconify icon="eva:close-fill" width={20} height={20} />
            </IconButton>
            {/* )} */}
          </Stack>
          {calOpen && 
        <>
        
        <Stack>
        <LocalizationProvider dateAdapter={AdapterDayjs}>
           <DatePicker
    onChange={(e) => {setDate(e),setdateValue(true) ,setDateParenent(e)}}
    renderInput={(params) => <TextField {...params} sx={{margin:1}} color="common" />}
    value={date} />
        </LocalizationProvider>
    
      </Stack>
      <Stack>
      <LocalizationProvider dateAdapter={AdapterDayjs}>
         <DatePicker
sx={{margin:5}}
  onChange={(e) => {setEndDate(e),setendateValue(true), setEndDateParenet(e)}}
  renderInput={(params) => <TextField {...params} sx={{margin:1}} color="common" />}
  value={endDate} />
      </LocalizationProvider>
   
    </Stack><br/>
    <Button onClick={handlecloseCalendar} style={styles.highlightStyle} sx={{width:20,textAlign:'center',left:30}}>OK</Button></>}
<br/>
          <Divider />
          <Scrollbar>
            <div>
              <Card style={{ backgroundColor: '#F6F8FB', }}>
                <CardContent>
                  {
                    filterPermissions[type].map(f => {
                      console.log(filterPermissions ,"filterPermissions" ,data ,f)
                      return (f.roles === true || f.roles.includes(data)) && <Button onClick={() => { setData(f.id) }}
                        sx={styles.buttonStyle} style={selectDATA == f.id ? styles.highlightStyle : null}>{filtersHeaders[f.id]}</Button>
                    })
                  }
                </CardContent>
              </Card>
            </div>
            {
            type != 'people' && <div>
          {
                selectDATA == 47 && <Grid>
                  <FuderList type={type} date={date} endDate={endDate} dateValue={dateValue} endDateValue={endDateValue} getData={getDataForFUnder} selectDATA={selectDATA} />
                </Grid>
              }
              {
                selectDATA == 46 && <Grid>
                  <GelathiFacilitators type={type} getData={getData} selectDATA={selectDATA} data1={data1} />
                </Grid>
              } 
              
              {
                selectDATA == 9 && <Grid>
                  <Daterange getData={getData} selectDATA={selectDATA} onDateSubmit={onDateSubmit} />
                </Grid>
              }
            
            </div>
          }
            
          </Scrollbar>
  
        </Drawer>
      </>
    );
  }
  const styles = {
    button: {
      '&:active': {
        backgroundColor: '#ffd796',
        color: '#ed6c02'
      },
      '&:hover': {
        backgroundColor: '#ffd796',
        color: '#ed6c02'
      },
    },
  }