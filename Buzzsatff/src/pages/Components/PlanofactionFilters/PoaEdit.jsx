import { useState, useEffect } from 'react';
import axios from 'axios';
import React from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import CloseIcon from '@mui/icons-material/Close';
import Slide from '@mui/material/Slide';
import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import IconButton from '@mui/material/IconButton';
import Box from '@mui/material/Box';
import Iconify from 'src/components/Iconify';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { TimePicker } from '@mui/x-date-pickers/TimePicker';
import { DateTimePicker } from '@mui/x-date-pickers/DateTimePicker';
import moment from 'moment';
import dayjs from 'dayjs';
import Stack from '@mui/material/Stack';
import Switch from '@mui/material/Switch';
import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';
import Alert from '@mui/material/Alert';
import Swal from 'sweetalert2';
import { baseURL } from 'src/utils/api';
import { useAuth } from 'src/AuthContext';

const label = { inputProps: { 'aria-label': 'Switch demo' } };
const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});
export default function PoaEdit({ setSucess, itm ,changeState}) {
    const { apikey } = useAuth();
  const [open, setOpen] = React.useState(false);
  const [scroll, setScroll] = useState('paper');
  const [addPoa, setAddPoa] = useState("");
  const [value, setValue] = React.useState(false);
  const [addData, setAddData] = useState({
    date: dayjs(new Date()),
    user_id: "",
    name: "",
    all_day: 0,
    description: "",
    date2: dayjs(new Date()),
    poa_id: ""
  })
  const handleChange2 = (event) => {
    setAddData({ ...addData, date2: event })
  }
  const handleChange = (event) => {
    setAddData({ ...addData, date: event })
  }
  const handleClickOpen = () => {
    setOpen(true);
    setScroll(scrollType);
  };
  const handleClose = () => {
    setOpen(false);
  };
  useEffect(() => {
   changeState();
    setAddData({
      date: itm?.date1,
      user_id:sessionStorage?.getItem('userId'),
      name: itm?.name,
      all_day: 0,
      description: itm?.description,
      date2: itm?.date2,
      poa_id: itm?.id
    })
  }, []
  )
  const detailsAdded = () => {
  }
  const AddPoa = async => {
    var data = JSON.stringify({
      "poa_id": addData?.poa_id,
      "date": moment(addData?.date?.$d)?.format('YYYY-MM-DD HH:mm:ss'),
      "user_id": sessionStorage?.getItem('userId'),
      "name": addData?.name,
      "all_day": addData?.all_day,
      "description": addData?.description,
      "date2": moment(addData?.date?.$d)?.format('YYYY-MM-DD HH:mm:ss')
    });
    var config = {
      method: 'post',
      url: baseURL + 'updateRescheduleEvent',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `${apikey}`
      },
      data: data
    };
    axios(config)
      .then(function (response) {
        if (response?.data?.code === 200) {
          alert(response.data.message)
          changeState()
          handleClose()
          setSucess("this is success create")
          alert(response.data.message)
       
          handleClose()
        }
        else {
          setValue(true)
          alert(response.data.message)
          Swal.fire({
            icon: 'success',
            title: 'Success',
            text: response.data.message,
            confirmButtonText: 'Ok',
            timer: 2000
          });
        
          setAddPoa(response?.data?.message)
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
  }
  return (
    <div>
      {(itm?.check_out==0 )?<IconButton id="icon-button-edit-poa" onClick={handleClickOpen} sx={{
        '&:hover': {
          backgroundColor: '#ffd796',
          borderColor: "#ff7424"
        },
        borderColor: "#ff7424",
        color: "#ed6c02"
      }} variant="outlined" >
        <Iconify id="icon-edit-outline" icon="ic:baseline-mode-edit-outline"></Iconify>
      </IconButton>:null}
      <Dialog
      id="scroll-dialog-desc"
        open={open}
        fullScreen
        onClose={handleClose}
        scroll={scroll}
        aria-labelledby="scroll-dialog-title"
        aria-describedby="scroll-dialog-description"
      >
        <Snackbar id="poa-edit-snackbar" open={value} autoHideDuration={6000} onClose={() => {
          setAddPoa(''),
            setValue(false)
        }}>
          <Alert id="edit-poa-add-alert" onClose={() => {
            setAddPoa(''),
              setValue(false)
          }} severity="error" sx={{ width: '100%' }}>
            {/* {addPoa} */}
          </Alert>
        </Snackbar>
        <AppBar id="edit-poa-appbar" sx={{ position: 'relative', bgcolor: '#ff7424' }}>
          <Toolbar id="edit-poa-toolbar">
            <IconButton id="close-icon" edge="start" color="inherit" onClick={handleClose} aria-label="close">
              <CloseIcon />
            </IconButton>
            <Typography id="edit-your-poa" sx={{ ml: 2, flex: 1, color: "inherit" }} variant="h6" component="div"  >
              Edit Your POA
            </Typography>
            <Button id="edit-poa-save-btn" autoFocus color="inherit" onClick={AddPoa}>
              save
            </Button>
          </Toolbar>
        </AppBar>
    
        <DialogContent id="edit-poa-dialog-content" dividers={scroll === 'paper'} sx={{ background: '#f9fafb' }}>
          <DialogContentText 
            id="scroll-dialog-description"
            tabIndex={-1}
          >
            <Box
              component="form"
              sx={{
                '& .MuiTextField-root': { m: 1 },
              }}
              noValidate
              autoComplete="off"
            >
              <div style={{ background: 'white', padding: '2rem', borderRadius: '10px' }}>
                <TextField fullWidth value={addData?.name} onChange={(e) => {
                  setAddData({ ...addData, name: e?.target?.value })
                 
                }} id="outlined-basic" label="Add Title" variant="outlined" color="common" />
                <Stack id="all-day-edit-poa-stack" direction={'row'} color="common">
                  <Typography id="all-day">All Day</Typography>
                  <Switch id="swithc-edit-poa"value={addData?.all_day} onChange={(e) => { setAddData({ ...addData, all_day: addData?.all_day === 1 ? 0 : 1 }) }} {...label} />
                </Stack>
                <Stack id="date-time-edit-poa-stack" direction={'row'}>
                  <DateTimePicker
                  id="date-time-picker"
                    label="Date&Time picker"
                    value={addData?.date}
                    onChange={(e) => { handleChange(e) }}
                    renderInput={(params) => <TextField {...params} color="common" />}
                    PopperProps={{
                      placement: "top"
                  
                    }}
                  />
                </Stack>
                {addData?.all_day === 0 &&
                  <Stack direction={'row'}>
                    <DateTimePicker
                      id="date&time-picker"
                      label="Date&Time picker"
                      value={addData?.date2}
                      onChange={(e) => { handleChange2(e) }}
                      renderInput={(params) => <TextField {...params} color="common" />}
                      PopperProps={{
                        placement: "top"
                    
                      }}
                    />
                  </Stack>
                }
                <br />
                <Stack>
                  <Typography id="description" variant="body1">Description</Typography>
                </Stack>
                <Stack>
                  <TextField id="outlined-basic" value={addData?.description} onChange={(e) => { setAddData({ ...addData, description: e?.target?.value }) }} label="Add Description For Creating Poa" variant="outlined" color="common" />
                </Stack>
                <Stack>
                </Stack>
              </div>
            </Box>
          </DialogContentText>
        </DialogContent>
      </Dialog>
    </div>
  );
}
