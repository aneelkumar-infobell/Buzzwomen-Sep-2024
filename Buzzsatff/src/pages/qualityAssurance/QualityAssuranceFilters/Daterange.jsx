
import * as React from 'react';
import dayjs from 'dayjs';
import { useState } from 'react';
import TextField from '@mui/material/TextField';
import Card from '@mui/material/Card';
import Button from '@mui/material/Button';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { StaticDatePicker } from '@mui/x-date-pickers/StaticDatePicker';
import moment from 'moment'
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { CardContent, Stack } from '@mui/material';
import Box from '@mui/material/Box';
export default function StaticDatePickerDemo(props) {
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date());
  const [open, setOpen] = React.useState(false);
  const [dateRange, setDateRange] = React.useState({});
  const [showSubmit, setShowSubmit] = useState(false)
  const today = startDate;
  const tomorrow = dayjs().add(1, 'day');
  const [render ,setRender] = useState(false)
  React.useEffect(()=>{
  }, [render])
 
  return (
    <Card style={{ marginTop: 20 }} sx={{ color: "#ed6c02" }} >
      <CardContent sx={{ color: "#ed6c02" }}>
        <Stack>
         <label>From</label>
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <StaticDatePicker
              defaultValue={startDate}
              onChange={(newstartvalue) => {
                setStartDate(newstartvalue)
                setRender(true)
              }}
              renderInput={(params) => <TextField {...params} sx={{ color: "white" }} />}
            />
          </LocalizationProvider></Stack>
        <Stack>
        <label>To </label>
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <StaticDatePicker
              defaultValue={startDate}
                
              minDate={dayjs(startDate)}
              onChange={(newendvalue) => {
                setEndDate(newendvalue)
                setShowSubmit(true)
              }}
              renderInput={(params) => <TextField {...params} sx={{ color: "white" }} variant="outlined" color="" />}
            />
            
          </LocalizationProvider></Stack>
       
       {showSubmit? <Button onClick={() => props?.onDateSubmit({ startDate: moment(startDate?.$d)?.format('YYYY-MM-DD'), endDate: moment(endDate?.$d)?.format('YYYY-MM-DD') })}
          sx=
          {{
            ":hover": {
              color: "#ed6c02",
              bgcolor: "#ffd796"
            },
            color: "#ffffff", bgcolor: "#ed6c02"
          }}>Submit </Button> :
          <Button disabled onClick={() => props?.onDateSubmit({ startDate: moment(startDate?.$d)?.format('YYYY-MM-DD'), endDate: moment(endDate?.$d)?.format('YYYY-MM-DD') })}
         >Submit </Button> }
      </CardContent>
    </Card>
  );
}
