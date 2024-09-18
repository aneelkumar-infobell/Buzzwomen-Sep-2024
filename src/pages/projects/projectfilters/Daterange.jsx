
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
export default function Daterange(props) {
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date());
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
              }}
              renderInput={(params) => <TextField {...params} sx={{ color: "white" }} />}
            />
          </LocalizationProvider></Stack>
        <Stack>
        <label>To</label>
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <StaticDatePicker
              defaultValue={endDate}
              onChange={(newendvalue) => {
                setEndDate(newendvalue)
              }}
              renderInput={(params) => <TextField {...params} sx={{ color: "white" }} variant="outlined" color="" />}
            />
          </LocalizationProvider></Stack>
        <Button onClick={() => props?.onDateSubmit({ startDate: moment(startDate?.$d)?.format('YYYY-MM-DD'), endDate: moment(endDate?.$d)?.format('YYYY-MM-DD') })}
          sx=
          {{
            ":hover": {
              color: "#ed6c02",
              bgcolor: "#ffd796"
            },
            color: "#ffffff", bgcolor: "#ed6c02"
          }}>Submit</Button>
      </CardContent>
    </Card>
  );
}
