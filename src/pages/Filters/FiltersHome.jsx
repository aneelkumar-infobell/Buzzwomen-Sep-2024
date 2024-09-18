import { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';
// material
import {
  Grid, Radio, Stack, Button, Drawer,TextField, Rating, Divider, Checkbox, FormGroup, IconButton, Typography, Chip, Card, CardContent, Box,
} from '@mui/material';
// components
import Iconify from '../../components/Iconify';
import Scrollbar from '../../components/Scrollbar';
import { ColorManyPicker } from '../../components/color-utils';
import Funders from './Funders';
import Partners from './Partners';
import Projects from './Projects';
import Location from './Location';
import Customfilter from './Customfilters';
import SrOperationManager from './SrOperationManager'
import Participant from './Participant';
import Trainers from './Trainers';
import GelathisLead from './GelathisLead';
import DateRangeFilter from './DateRangeFilter';
import OperationManager from './OperationManager';
import GelathiFacilitator from './GelathiFacilitator';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import moment from 'moment';
// ----------------------------------------------------------------------
export const SORT_BY_OPTIONS = [
  { value: 'featured', label: 'Featured' },
  { value: 'newest', label: 'Newest' },
  { value: 'priceDesc', label: 'Price: High-Low' },
  { value: 'priceAsc', label: 'Price: Low-High' },
];
export const FILTER_GENDER_OPTIONS = ['Men', 'Women', 'Kids'];
export const FILTER_CATEGORY_OPTIONS = ['All', 'Shose', 'Apparel', 'Accessories'];
export const FILTER_RATING_OPTIONS = ['up4Star', 'up3Star', 'up2Star', 'up1Star'];
export const FILTER_PRICE_OPTIONS = [
  { value: 'below', label: 'Below $25' },
  { value: 'between', label: 'Between $25 - $75' },
  { value: 'above', label: 'Above $75' },
];
export const FILTER_COLOR_OPTIONS = [
  '#00AB55',
  '#000000',
  '#FFFFFF',
  '#FFC0CB',
  '#FF4842',
  '#1890FF',
  '#94D82D',
  '#FFC107',
];
FiltersHome.propTypes = {
  isOpenFilter: PropTypes.bool,
  onOpenFilter: PropTypes.func,
  onCloseFilter: PropTypes.func,
};
export default function FiltersHome({ isOpenFilter, onOpenFilter, onCloseFilter, clcikData, getData, onSumbit, onDatasubmit, onDateSubmit, type, resetBus, user, projectr, resetProjects }) {
  var [selectDATA, setSelectData] = useState()
const [calOpen,setCalOpen] = useState(false);
const [date, setDate] = useState(new Date())
const [dateValue,setdateValue]=useState(false);
const [endDateValue,setendateValue]=useState(false);
const [endDate, setEndDate] = useState(new Date())
  const filterPermissions = {
    Dashboard: [{ id: 2, roles: ['1', '8', '12', '3', '11', '9', '7'] }, { id: 1, roles: ['1', '8', '11', '12', '9', '3', '7'] }, { id: 3, roles: ['1', '4', '8', '5', '6', '12', '13', '11', '3', '9', '7'] }, { id: 4, roles: ['1', '8', '12', '9', '11', '3', '7'] }, { id: 5, roles: ['1', '9', '11', '4', '8', '12', '3', '7'] }, { id: 6, roles: ['13'] }, { id: 9, roles: ['1', '9', '11', '4', '6', '8', '5', '12', '13', '3', '7'] }, { id: 7, roles: ['1', '4', '9', '11', '8', '12', '3', '7'] },  { id: 12, roles: ['1', '3', '11'] }, { id: 13, roles: ['1', '11', '3'] }],
    GreenDashboard: [{ id: 2, roles: ['1', '8', '12', '3', '11', '9', '7'] }, { id: 1, roles: ['1', '8', '11', '12', '9', '3', '7'] }, { id: 3, roles: ['1', '4', '8', '5', '6', '12', '13', '11', '3', '9', '7'] }, { id: 4, roles: ['1', '8', '12', '9', '11', '3', '7'] },{ id: 5, roles: ['9', '11', '4', '8', '12', '3', '7'] }, { id: 6, roles: ['1','13','12','4','3'] }, { id: 9, roles: ['1', '9', '11', '4', '6', '8', '5', '12', '13', '3', '7'] }, { id: 7, roles: ['1', '4', '9', '11', '8', '12', '3', '7'] },  { id: 12, roles: ['1', '3', '11'] }, { id: 13, roles: ['1', '11', '3'] }],
    ProjectDashboard: [{ id: 2, roles: ['1', '8', '12', '3', '11', '9', '7'] }, { id: 1, roles: ['1', '8', '11', '12', '9', '3', '7'] }, { id: 3, roles: ['1', '4', '8', '5', '6', '12', '13', '11', '3', '9', '7'] }, { id: 4, roles: ['1', '8', '12', '9', '11', '3', '7'] }, { id: 5, roles: ['1', '9', '11', '4', '8', '12', '3', '7'] }, { id: 6, roles: ['13'] }, { id: 9, roles: ['1', '9', '11', '4', '6', '8', '5', '12', '13', '3', '7'] }, { id: 7, roles: ['1', '4', '9', '11', '8', '12', '3', '7'] },  { id: 12, roles: ['1', '3', '11'] }, { id: 13, roles: ['1', '11', '3'] }],
    Projects: [{ id: 31, roles: ['1', '2', '3', '4', '5', '9', '11', '12', '13', '6'] }, { id: 7, roles: ['1', '2', '3', '4', '13', '12', '5', '9', '11', '6'] }, { id: 9, roles: ['1', '2', '3', '13', '4', '12', '11', '5', '9', '6'] }, { id: 2, roles: ['1', '3', '12', '11', '2'] }, { id: 4, roles: ['1', '3', '12', '11', '2'] }, { id: 5, roles: ['1', '3', '12', '11', '2'] }, { id: 6, roles: ['1', '3', '12', '11', '2'] },{id:35,roles:['1','3','12','2','4']}],
    BusList: [{ id: 30, roles: true }, { id: 3, roles: true }, { id: 2, roles: true }, { id: 7, roles: true },],
    People: [{ id: 1, roles: ['1', '3', '12', '11', '2'] }, { id: 2, roles: ['1', '12', '11', '3', '2'] }, { id: 32, roles: ['1', '3', '12', '11', '2'] }, { id: 33, roles: ['1', '3', '12', '11', '2'] }, { id: 5, roles: ['1', '3', '12', '11', '4', '2'] }, { id: 6, roles: ['1', '3', '12', '11', '4', '2'] }, { id: 34, roles: ['1', '4', '3', '11', '12', '2'] },],
    Demography: [{ id: 3, roles: true }, { id: 2, roles: true }, { id: 7, roles: true }],
    BuzzStock: [{ id: 3, roles: true }, { id: 2, roles: true }, { id: 7, roles: true }, { id: 9, roles: true }]
  }
  const data = sessionStorage?.getItem('userId')
  // partner = 1, funder = 2, project = 3, opm = 4, trainer = 5, gelathi = 6 SOM=12 GFl=13
  const filtersHeaders = { 1: 'Partner', 2: 'Funder', 3: 'Project', 4: 'Operation Manager', 5: 'Trainer', 6: 'Field Associate', 12: 'Sr. Operation Manager', 13: 'Gelathi Facilitator Leads', 9: 'Date Range', 7: 'Location', 10: 'Participant', 30: 'All Bus', 31: 'All Projects', 32: 'All Buzz team Members', 33: 'Management Team', 34: 'Drivers',35:'Custom Filters' }
  const setData = (value) => {
    setSelectData(value)
    if (type == 'People') {
      user(1, { id: value, type: filtersHeaders[value] });
      onCloseFilter()
    }
    if (value == 30) {
      resetBus();
      onCloseFilter()
    }
    if (value == 31) {
      // call all projects
      resetProjects()
      onCloseFilter()
    }
  }
  useEffect(() => {
    if (type != 'People') {
      if (type == 'Demography' || type == 'BuzzStock' || type == 'BusList') {
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
  const handleCalendar=()=>{
    setCalOpen(true)
  }
  const handlecloseCalendar=()=>{
    setCalOpen(false)
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
          sx: { width: 380, },
        }}
      >
        <Stack direction="row" alignItems="center" justifyContent="space-between" sx={{ px: 1, py: 2 }}>
          <Typography variant="subtitle1" sx={{ ml: 1 }} style={{ marginLeft: 25 }}>
            Filters :  {filtersHeaders[selectDATA]} 
          </Typography>
          {(filtersHeaders[selectDATA] !="Date Range" && (type=='Dashboard' || type=='GreenDashboard'))?
          <><IconButton onClick={handleCalendar} sx={{float:'right',position:'absolute',right:40}}><Iconify icon="material-symbols:calendar-month" ></Iconify></IconButton></>:null}
         
 
          <IconButton onClick={() => {
            setSelectData(null)
            onCloseFilter()
          }}>
            <Iconify icon="eva:close-fill" width={20} height={20} />
          </IconButton>
        </Stack>
        {calOpen && 
        <><Stack>
        <LocalizationProvider dateAdapter={AdapterDayjs}>
           <DatePicker
    onChange={(e) => {setDate(e),setdateValue(true)}}
    renderInput={(params) => <TextField {...params} sx={{margin:1}} color="common" />}
    value={date} />
        </LocalizationProvider>
    
      </Stack>
      <Stack>
      <LocalizationProvider dateAdapter={AdapterDayjs}>
         <DatePicker
sx={{margin:5}}
  onChange={(e) => {setEndDate(e),setendateValue(true)}}
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
                  filterPermissions[type]?.map(f => {
                    return (f.roles === true || f.roles.includes(data)) && <Button onClick={() => { setData(f.id) }}
                      sx={styles.buttonStyle} style={selectDATA == f.id ? styles.highlightStyle : null}>{filtersHeaders[f.id]}</Button>
                  })
                }
              </CardContent>
            </Card>
          </div>
          {
            type != 'People' && <div>
              {
                selectDATA == 1 && <Grid>
                  <Partners date={date} endDate={endDate} dateValue={dateValue} endDateValue={endDateValue} getData={getData} selectDATA={selectDATA} />
                </Grid>
              }
              {
                selectDATA == 2 && <Grid>
                  <Funders type={type} date={date} endDate={endDate} dateValue={dateValue} endDateValue={endDateValue} getData={getData} selectDATA={selectDATA} />
                </Grid>
              }
              {
                selectDATA == 3 && <Grid>
                  <Projects getData={getData} date={date} dateValue={dateValue} endDateValue={endDateValue} endDate={endDate} selectDATA={selectDATA} />
                </Grid>
              }
              {
                selectDATA == 4 && <Grid>
                  <OperationManager type={type} date={date} endDate={endDate} dateValue={dateValue} endDateValue={endDateValue} getData={getData} selectDATA={selectDATA} />
                </Grid>
              }
              {
                selectDATA == 5 && <Grid>
                  <Trainers type={type} date={date} endDate={endDate} getData={getData} dateValue={dateValue} endDateValue={endDateValue} selectDATA={selectDATA} />
                </Grid>
              }
              {
                selectDATA == 6 && <Grid>
                  <GelathiFacilitator type={type} date={date} endDate={endDate} getData={getData} dateValue={dateValue} endDateValue={endDateValue} selectDATA={selectDATA} />
                </Grid>
              }
              {
                selectDATA == 7 && <Grid>
                  <Location getData={getData} date={date} endDate={endDate} selectDATA={selectDATA} dateValue={dateValue} endDateValue={endDateValue} onSumbit={onSumbit} />
                </Grid>
              }
              {
                selectDATA == 9 && <Grid>
                  <DateRangeFilter getData={getData} selectDATA={selectDATA} onDateSubmit={onDateSubmit} />
                </Grid>
              }
              {
                selectDATA == 10 && <Grid>
                  <Participant getData={getData} date={date} selectDATA={selectDATA} onDateSubmit={onDateSubmit} dateValue={dateValue} endDateValue={endDateValue} />
                </Grid>
              }
              {
                selectDATA == 12 && <Grid>
                  <SrOperationManager getData={getData} date={date} endDate={endDate} selectDATA={selectDATA} dateValue={dateValue} endDateValue={endDateValue} />
                </Grid>
              }
              {
                selectDATA == 13 && <Grid>
                  <GelathisLead getData={getData} date={date} endDate={endDate} selectDATA={selectDATA} dateValue={dateValue} endDateValue={endDateValue} />
                </Grid>
              }
              {
                selectDATA == 35 && <Grid>
                  <Customfilter getData={getData} selectDATA={selectDATA} onDatasubmit={onDatasubmit} />
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