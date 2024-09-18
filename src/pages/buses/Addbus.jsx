import React, { useRef, useState } from 'react'
import axios from 'axios';
import CloseIcon from '@mui/icons-material/Close';
import { Button, Dialog, Toolbar, IconButton, Typography, Stack, TextField, DialogContent, DialogContentText, Box, DialogActions } from '@mui/material'
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { useLocation, useNavigate } from "react-router-dom";
import { baseURL} from 'src/utils/api';
import {useAuth} from 'src/AuthContext';
import moment from 'moment'
function Addbus( {showAddBuss,createProj,showBussHandler}) {
      const { apikey } = useAuth();
    const navigate = useNavigate();
    const location = useLocation();
    const [date, setDate] = useState(moment(new Date())?.format('YYYY-MM-DD'))
    // const [addBus, setAddBus] = useState({
    //     register_number: '', register_date: moment(date?.$d)?.format('YYYY-MM-DD'), engine_number: '', chassis_number: '', insurance_number: '',
    //     insurance_company: "", insurance_start_date: new Date(), insurance_end_date: moment(date?.$d)?.format('YYYY-MM-DD'), last_service_date: moment(date?.$d)?.format('YYYY-MM-DD'), next_service_due_date: moment(date?.$d)?.format('YYYY-MM-DD'), fitness_certificate: moment(date?.$d)?.format('YYYY-MM-DD'), permit: moment(date?.$d)?.format('YYYY-MM-DD'), emission_date:moment(date?.$d)?.format('YYYY-MM-DD')
    // })
    const initialState = {
        register_number: '',
        register_date: null,
        engine_number: '',
        chassis_number: '',
        insurance_number: '',
        insurance_company: '',
        insurance_start_date: null,
        insurance_end_date: null,
        last_service_date: null,
        next_service_due_date: null,
        fitness_certificate: null,
        permit: null,
        emission_date: null,
      };
    const [addBus, setAddBus] = useState(initialState);
    const [openAddBus, setOpenAddBus] = useState(false)
    const handleClickOpen = () => {
        setOpenAddBus(true);
    };
    const handleClose = () => {
        setOpenAddBus(false);
        showBussHandler()
        // setAddBus({
        //     register_number: '', register_date: moment(date?.$d)?.format('YYYY-MM-DD'), engine_number: '', chassis_number: '', insurance_number: '',
        //     insurance_company: "", insurance_start_date: new Date(), insurance_end_date: moment(date?.$d)?.format('YYYY-MM-DD'), last_service_date: moment(date?.$d)?.format('YYYY-MM-DD'), next_service_due_date: moment(date?.$d)?.format('YYYY-MM-DD'), fitness_certificate: moment(date?.$d)?.format('YYYY-MM-DD'), permit: moment(date?.$d)?.format('YYYY-MM-DD'), emission_date:moment(date?.$d)?.format('YYYY-MM-DD')
        // })
        setAddBus({
            register_number: '', register_date: moment(date?.$d)?.format('YYYY-MM-DD'), engine_number: '', chassis_number: '', insurance_number: '',
            insurance_company: "", insurance_start_date: new Date(), insurance_end_date: moment(date?.$d)?.format('YYYY-MM-DD'), last_service_date: moment(date?.$d)?.format('YYYY-MM-DD'), next_service_due_date: moment(date?.$d)?.format('YYYY-MM-DD'), fitness_certificate: moment(date?.$d)?.format('YYYY-MM-DD'), permit: moment(date?.$d)?.format('YYYY-MM-DD'), emission_date:moment(date?.$d)?.format('YYYY-MM-DD')
        })
    };
    const submitBus = () => {
        var userid = JSON.parse(sessionStorage.getItem('userDetails'))?.id
        var role =JSON.parse(sessionStorage.getItem('userDetails'))?.role

        addBus["register_date"] = moment(addBus["register_date"])?.format('YYYY-MM-DD')
        addBus["fitness_certificate"] = moment(addBus["fitness_certificate"])?.format('YYYY-MM-DD')
        addBus["permit"] = moment(addBus["permit    "])?.format('YYYY-MM-DD')

        var data = JSON.stringify({
            "lastUpdatedBy": userid,
            "createdBy": userid ,
            ...addBus
        });
        
            var config = {
                method: 'post',
                url: baseURL + 'createBus',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `${apikey}`
                },
                data: data
            };
            showAddBuss? 
            showBussHandler() 
            
            : null
            setAddBus(initialState)
            axios(config)
                .then(function (response) {
                    alert(response.data.message)
                    if (response.data.code == 200) {
                        setOpenAddBus(false)
                        showAddBuss? 
                        showBussHandler() 
                        
                        : null
                
                        // console.log("calling the api ")
                    }
                })
                .catch(function (error) {
                    // console.log(error);
                });
           
      
    }
    return (
        <div>
            {showAddBuss ? 
            <>
          
                <Dialog
                id="scroll-dialog-title"
                open={createProj}
                fullScreen
                onClose={handleClose}
                aria-labelledby="scroll-dialog-title"
                aria-describedby="scroll-dialog-description"
            >
               <form  onSubmit={(e)=>{e.preventDefault(); submitBus()}}>
                <>  <Toolbar sx={{ color: "#ffffff", backgroundColor: "#ff7424" }}>
                    <IconButton edge="start" color="inherit" onClick={handleClose} aria-label="close">
                        <CloseIcon />
                    </IconButton>
                    <Typography id="add-new-bus" sx={{ ml: 2, flex: 1, color: "#ffffff" }} variant="h6" component="div" >
                        Add New Bus
                        <Button variant="standard" id="Add" type="submit" style={{float:'right',color:'white'}} >Add</Button>
                    </Typography>
                </Toolbar>
          
                            <TextField fullWidth id="outlined-basic" label="Bus Number" helperText="Bus Number required*" defaultValue={addBus.register_number} onChange={(e) => { setAddBus({ ...addBus, register_number: e.target.value }) }} variant="outlined" color="common" /><br />
                            
                            <Stack style={{ marginTop: 20 }} color="common">
                                <LocalizationProvider dateAdapter={AdapterDayjs}> 
                                    <DatePicker id="Register_date" required
                                        inputFormat="DD/MM/YYYY"
                                        views={["year", "month", "day"]}
                                        label="Register Date"
                                        onChange={(e) => {
                                            setAddBus({ ...addBus, register_date: e })
                                        }}
                                        value={addBus?.register_date}
                                        renderInput={(params) => <TextField {...params} fullWidth />}
                                    />
                                </LocalizationProvider>
                            </Stack><br/>
                            <TextField fullWidth required id="Engine Number" label="Engine Number" defaultValue={addBus.engine_number} onChange={(e) => { setAddBus({ ...addBus, engine_number: e.target.value }) }} variant="outlined" color="common" /><br /><br/>
                            <TextField fullWidth required id="Chassis Number" label="Chassis Number" defaultValue={addBus.chassis_number} onChange={(e) => { setAddBus({ ...addBus, chassis_number: e.target.value }) }} variant="outlined" color="common" /><br /><br/>
                            <TextField fullWidth required id="Insurance Number" label="Insurance Number" defaultValue={addBus.insurance_number} onChange={(e) => { setAddBus({ ...addBus, insurance_number: e.target.value }) }} variant="outlined" color="common" /><br /><br/>
                            <TextField fullWidth required id="Insurance Company" label="Insurance Company" defaultValue={addBus.insurance_company} onChange={(e) => { setAddBus({ ...addBus, insurance_company: e.target.value }) }} variant="outlined" color="common" /><br /><br/>
                            <Stack style={{ marginTop: 20 }} color="common">
                                <LocalizationProvider dateAdapter={AdapterDayjs}>
                                    <DatePicker id="insurance_start_date" required
                                        inputFormat="DD/MM/YYYY"
                                        views={["year", "month", "day"]}
                                        label="Insurance Start Date"
                                        onChange={(e) => {
                                            setAddBus({ ...addBus, insurance_start_date: e })
                                        }}
                                        value={addBus?.insurance_start_date}
                                        renderInput={(params) => <TextField {...params} fullWidth />}
                                    />
                                </LocalizationProvider>
                            </Stack>
                           
                            <Stack style={{ marginTop: 20 }} color="common">
                                <LocalizationProvider dateAdapter={AdapterDayjs}>
                                    <DatePicker id="insuarnce_end_date" required
                                        inputFormat="DD/MM/YYYY"
                                        views={["year", "month", "day"]}
                                        label="Insurance End Date"
                                        onChange={(e) => {
                                            setAddBus({ ...addBus, insurance_end_date: e })
                                        }}
                                        value={addBus?.insurance_end_date}
                                        renderInput={(params) => <TextField {...params} fullWidth />}
                                    />
                                </LocalizationProvider>
                            </Stack>
                          
                            <Stack style={{ marginTop: 20 }} color="common">
                                <LocalizationProvider dateAdapter={AdapterDayjs}>
                                    <DatePicker id="last_service_date" required
                                        inputFormat="DD/MM/YYYY"
                                        views={["year", "month", "day"]}
                                        label="Last Service Date"
                                        onChange={(e) => {
                                            setAddBus({ ...addBus, last_service_date: e })
                                        }}
                                        value={addBus?.last_service_date}
                                        renderInput={(params) => <TextField {...params} fullWidth />}
                                    />
                                </LocalizationProvider>
                            </Stack>
                          
                            <Stack style={{ marginTop: 20 }} color="common">
                                <LocalizationProvider dateAdapter={AdapterDayjs}>
                                    <DatePicker id="next_service_due_date" required
                                        inputFormat="DD/MM/YYYY"
                                        views={["year", "month", "day"]}
                                        label="Next Service Date"
                                        onChange={(e) => {
                                            setAddBus({ ...addBus, next_service_due_date: e })
                                        }}
                                        value={addBus?.next_service_due_date}
                                        renderInput={(params) => <TextField {...params} fullWidth />}
                                    />
                                </LocalizationProvider>
                            </Stack>
                           
                            <Stack style={{ marginTop: 20 }} color="common">
                                <LocalizationProvider dateAdapter={AdapterDayjs}>
                                    <DatePicker id="fitness_certificate" required
                                        inputFormat="DD/MM/YYYY"
                                        views={["year", "month", "day"]}
                                        label="Fitness Certificate"
                                        onChange={(e) => {
                                            setAddBus({ ...addBus, fitness_certificate: e })
                                        }}
                                        value={addBus?.fitness_certificate}
                                        renderInput={(params) => <TextField {...params} fullWidth />}
                                    />
                                </LocalizationProvider>
                            </Stack>
                            <Stack style={{ marginTop: 20,borderColor:'none' }} color="common">
                               
                                    <DatePicker id="permit" required
                                        inputFormat="DD/MM/YYYY"
                                        views={["year", "month", "day"]}
                                        label="Permit Details"
                                        onChange={(e) => {
                                            setAddBus({ ...addBus, permit: e })
                                        }}
                                        value={addBus?.permit}
                                        renderInput={(params) => <TextField {...params} fullWidth />}
                                    />
                       
                            </Stack>
                       
                            <Stack style={{ marginTop: 20 }} color="common">
                                <LocalizationProvider dateAdapter={AdapterDayjs}>
                                    <DatePicker id="emission_date" required
                                        inputFormat="DD/MM/YYYY"
                                        views={["year", "month", "day"]}
                                        label="Emission Date"
                                        defaultValue="DD/MM/YYYY"
                                        onChange={(e) => {
                                            setAddBus({ ...addBus, emission_date: e })
                                        }}
                                        value={addBus?.emission_date}
                                        renderInput={(params) => <TextField {...params} fullWidth />}
                                    />
                                </LocalizationProvider>
                            </Stack>
<br/><br/>
                </></form>
            </Dialog>
            </>:
            <Button id="add-bus-btn" style={{ float: "right", marginLeft: "1rem", borderRadius: "50%", padding: "0.2rem", marginTop: "-0.5rem", position: 'fixed', zIndex: '1', bottom: 40, right: 40 }}
            sx={{
                '&:hover': {
                    backgroundColor: '#ffd796',
                },
                backgroundColor: "#ffd796"
            }} variant="contained" onClick={handleClickOpen}>
            <span style={{ fontSize: "2rem", color: "#ff7424" }}>+</span></Button>
            }
            
            <Dialog
                id="scroll-dialog-desc"
                open={openAddBus}
                fullScreen
                onClose={handleClose}
                aria-labelledby="scroll-dialog-title"
                aria-describedby="scroll-dialog-description"
            >
                <Toolbar id="add-bus-toolbar" sx={{ color: "#ffffff", backgroundColor: "#ff7424" }}>
                    <IconButton id="start-icon-button" edge="start" color="inherit" onClick={handleClose} aria-label="close">
                        <CloseIcon />
                    </IconButton>
                    <Typography id="add-new-bus" sx={{ ml: 2, flex: 1, color: "#ffffff" }} variant="h6" component="div" >
                        Add New Bus
                    </Typography>
                </Toolbar>
                <DialogContent dividers={scroll === 'paper'}>
                    <DialogContentText
                        id="scroll-dialog-description"
                        tabIndex={-1}
                    >
                        <Box id="form"
                            component="form"
                            sx={{
                                '& .MuiTextField-root': { m: 1 },
                            }}
                        >
          
                            <TextField fullWidth id="Bus Number" label="Bus Number" helperText="Bus Number required*" defaultValue={addBus.register_number} onChange={(e) => { setAddBus({ ...addBus, register_number: e.target.value }) }} variant="outlined" color="common" /><br />
                    
                            <Stack style={{ marginTop: 20 }} color="common">
                                <LocalizationProvider dateAdapter={AdapterDayjs}>
                                    <DatePicker id="register-date"
                                        inputFormat="YYYY/MM/DD"
                                        views={["year", "month", "day"]}
                                        label="Register Date"
                                        onChange={(e) => {
                                            setAddBus({ ...addBus, register_date: e })
                                        }}
                                        value={addBus?.register_date}
                                        renderInput={(params) => <TextField {...params} fullWidth />}
                                    />
                                </LocalizationProvider>
                            </Stack>
                            <TextField fullWidth id="engine-number" label="Engine Number" defaultValue={addBus.engine_number} onChange={(e) => { setAddBus({ ...addBus, engine_number: e.target.value }) }} variant="outlined" color="common" /><br />
                            <TextField fullWidth id="chassis-number" label="Chassis Number" defaultValue={addBus.chassis_number} onChange={(e) => { setAddBus({ ...addBus, chassis_number: e.target.value }) }} variant="outlined" color="common" /><br />
                            <TextField fullWidth id="insurance-number" label="Insurance Number" defaultValue={addBus.insurance_number} onChange={(e) => { setAddBus({ ...addBus, insurance_number: e.target.value }) }} variant="outlined" color="common" /><br />
                            <TextField fullWidth id="insurance-company" label="Insurance Company" defaultValue={addBus.insurance_company} onChange={(e) => { setAddBus({ ...addBus, insurance_company: e.target.value }) }} variant="outlined" color="common" /><br />
                           
                            <Stack style={{ marginTop: 20 }} color="common">
                                <LocalizationProvider dateAdapter={AdapterDayjs}>
                                    <DatePicker id ="insurance-start"
                                        inputFormat="YYYY/MM/DD"
                                        views={["year", "month", "day"]}
                                        label="Insurance Start Date"
                                        onChange={(e) => {
                                            setAddBus({ ...addBus, insurance_start_date: e })
                                        }}
                                        value={addBus?.insurance_start_date}
                                        renderInput={(params) => <TextField {...params} fullWidth />}
                                    />
                                </LocalizationProvider>
                            </Stack>
                           
                            <Stack style={{ marginTop: 20 }} color="common">
                                <LocalizationProvider dateAdapter={AdapterDayjs}>
                                    <DatePicker id="insurance-end"
                                        inputFormat="YYYY/MM/DD"
                                        views={["year", "month", "day"]}
                                        label="Insurance End Date"
                                        onChange={(e) => {
                                            setAddBus({ ...addBus, insurance_end_date: e })
                                        }}
                                        value={addBus?.insurance_end_date}
                                        renderInput={(params) => <TextField {...params} fullWidth />}
                                    />
                                </LocalizationProvider>
                            </Stack>
                           
                            <Stack style={{ marginTop: 20 }} color="common">
                                <LocalizationProvider dateAdapter={AdapterDayjs}>
                                    <DatePicker id="last-service"
                                        inputFormat="YYYY/MM/DD"
                                        views={["year", "month", "day"]}
                                        label="Last Service Date"
                                        onChange={(e) => {
                                            setAddBus({ ...addBus, last_service_date: e })
                                        }}
                                        value={addBus?.last_service_date}
                                        renderInput={(params) => <TextField {...params} fullWidth />}
                                    />
                                </LocalizationProvider>
                            </Stack>
                           
                            <Stack style={{ marginTop: 20 }} color="common">
                                <LocalizationProvider dateAdapter={AdapterDayjs}>
                                    <DatePicker id="next-service"
                                        inputFormat="YYYY/MM/DD"
                                        views={["year", "month", "day"]}
                                        label="Next Service Date"
                                        onChange={(e) => {
                                            setAddBus({ ...addBus, next_service_due_date: e })
                                        }}
                                        value={addBus?.next_service_due_date}
                                        renderInput={(params) => <TextField {...params} fullWidth />}
                                    />
                                </LocalizationProvider>
                            </Stack>
                        
                            <Stack style={{ marginTop: 20 }} color="common">
                                <LocalizationProvider dateAdapter={AdapterDayjs}>
                                    <DatePicker id="fitness-certificate"
                                        inputFormat="YYYY/MM/DD"
                                        views={["year", "month", "day"]}
                                        label="Fitness Certificate"
                                        onChange={(e) => {
                                            setAddBus({ ...addBus, fitness_certificate: e })
                                        }}
                                        value={addBus?.fitness_certificate}
                                        renderInput={(params) => <TextField {...params} fullWidth />}
                                    />
                                </LocalizationProvider>
                            </Stack>
                            <Stack style={{ marginTop: 20,borderColor:'none' }} color="common">
                               
                                    <DatePicker id="permit-details"
                                        inputFormat="YYYY-MM-DD"
                                        views={["year", "month", "day"]}
                                        label="Permit Details"
                                        onChange={(e) => {
                                            setAddBus({ ...addBus, permit: e })
                                        }}
                                        value={addBus?.permit}
                                        renderInput={(params) => <TextField {...params} fullWidth />}
                                    />
                       
                            </Stack>
                           
                            <Stack style={{ marginTop: 20 }} color="common">
                                <LocalizationProvider dateAdapter={AdapterDayjs}>
                                    <DatePicker id="emission-date"
                                        inputFormat="YYYY/MM/DD"
                                        views={["year", "month", "day"]}
                                        label="Emission Date"
                                        defaultValue="DD/MM/YYYY"
                                        onChange={(e) => {
                                            setAddBus({ ...addBus, emission_date: e })
                                        }}
                                        value={addBus?.emission_date}
                                        renderInput={(params) => <TextField {...params} fullWidth />}
                                    />
                                </LocalizationProvider>
                            </Stack>
                        </Box>
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button id="add-button" variant="contained" onClick={submitBus} sx={{
                        '&:hover': {
                            backgroundColor: '#ffd796',
                            color: '#ff7424'
                        },
                        color: "#ffffff",
                        backgroundColor: '#ff7424'
                    }}>Add</Button>
                    <Button variant="contained" id="cancelbutton" color="error" onClick={handleClose}>Cancel</Button>
                </DialogActions>
            </Dialog>
        </div>
    )
}
export default Addbus