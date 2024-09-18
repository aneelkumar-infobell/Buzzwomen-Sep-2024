import React, { useRef, useState, useEffect } from 'react'
import axios from 'axios';
import CloseIcon from '@mui/icons-material/Close';
import { Button, Dialog, Toolbar, IconButton, Typography, TextField, DialogContent, DialogContentText, Box, DialogActions, FormControl, InputLabel, Select, MenuItem, RadioGroup, Radio, Autocomplete, FormControlLabel, FormGroup, Switch, CardContent } from '@mui/material'
import Iconify from '../../components/Iconify';
import AppBar from '@mui/material/AppBar';
import { baseURL } from 'src/utils/api';
import { useAuth } from 'src/AuthContext';
   
function AddUser(props) {
    const { apikey } = useAuth();
    const [open, setOpen] = useState(false);
    const [count, setCount] = useState('');
    // const [ceoUser, setCeoUser] = useState(props.data)
    let isValidForm = true;
    let [inputProject, setInputProject] = useState([''])
    let [filteredProjects, setFilteredProjects] = useState([])
    const [projects, setProjects] = useState([])
    let [errors, setErrors] = useState({ office_email_id: false })
    let [emailExists, setEmailExists] = useState(false)
    var [AddUser, setAddUser] = useState({
        role:'', first_name: '', last_name: "", contactNum: '', workNum: '', officeMailId: '', address: '', address3: "", address2: "",
        pincode: "", gender: "", present_status: true, doj: new Date(), reportingManager: {}, license_number: "", project_list: "",
        emp_id: ""
    })
    const [roles, setRoles] = useState([])
    const [reportingManager, setReportingManager] = useState([])
    const [reportingManagerProject, setReportingManagerProject] = useState([])
    useEffect(() => {
        getRoles()
        // getEmpId(2)
    }, [])
useEffect(()=>{
    let subscribe =true 
    if(AddUser.officeMailId.length > 0){
        if(subscribe){
            setTimeout(checkEmailExists() , 5000)
        }
           }
  
    return ()=>{
        subscribe =false
    }
       
},[AddUser.officeMailId])
const emailchangeHandler=(e) => { 
    
        setAddUser({ ...AddUser, officeMailId: e });
       checkEmailValidation()
       setTimeout(checkEmailExists() , 5000)
    }
    
    const handleClickOpen = () => {
        setOpen(true);
    };
    const handleClose = () => {
        setOpen(false);
    };
    const checkEmailExists = () => {
        const data = JSON.stringify({
            office_email_id: AddUser.officeMailId
        });
        const config = {
            method: 'post',
            url: baseURL + 'getEmailExist',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `${apikey}`
            },
            data
        };
      axios(config)
          .then((response) => {
              if (response.data.code===409) {
                  setEmailExists(true)
              }
              else {
                  setEmailExists(false)
              }
          })
          .catch((error) => {
            //   console.log(error);
          });
  }
    const checkEmailValidation = () => {
        if ((/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(AddUser.officeMailId))) {
            setErrors({ ...errors, office_email_id: false })
        }
        else {
            setErrors({ ...errors, office_email_id: true })
        }
    }
   
    const getRoles = () => {
        const data = JSON.stringify({
        });
        const config = {
            method: 'post',
            url: baseURL+'roles_list',
            headers: {
                'Content-Type': 'application/json',
                 'Authorization': `${apikey}`
            },
            data
        };
        axios(config)
            .then((response) => {
                setRoles(response.data.list)
            })
            .catch((error) => {
                // console.log(error);
            });
    }
    const getEmpId = async (value) => {
        setAddUser({ ...AddUser, role: value })
        let formData = new FormData();
        formData.append('role_id', value.id);
        formData.append('name', '');
        let res = await fetch(baseURL+'getAllBuzzTeam',
            {
                body: formData,
                method: "post",
                headers:{
                    'Authorization': `${apikey}`
                }
            })
            .then((res) => res.json())
        let temprepoManager = res.list.map(repo => { return { label: repo?.name, id: repo.id, role: repo.role } })
        setReportingManager([...temprepoManager])
    }
    const getProjectOfManager = async (value) => {
        setAddUser({ ...AddUser, reportingManager: value })
        let formData = new FormData();
        formData.append('manager_id', value.id);
        formData.append('first_name', '');
        const data = JSON.stringify({
            'manager_id': value.id
        });
        const config = {
            method: 'post',
            url: baseURL + 'getProjectList',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `${apikey}`
            },
            data
        };
        axios(config)
            .then((response) => {
               
                let temprepoManagerProject = response.data.list.map(repo => { return { label: repo?.projectName, id: repo.id } })
                setReportingManagerProject([...temprepoManagerProject,
                  
                ])
            })
            .catch((error) => {
                // console.log(error);
            });
    }
    const changeProject = (value) => {
        setInputProject([...value])
    }
    const getProjects = async () => {
        const data = JSON.stringify({
            "search": "",
            "id": "1",
            "role_id": "1",
            "filter_id": 0,
            "type": "",
            "pageNum": 1
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
let userid = JSON.parse(sessionStorage.getItem('userDetails'))?.id
    const submitUser = () => {
        AddUser.project_list = inputProject.map(i => i.id)
        AddUser.officeMailId = AddUser?.officeMailId
        AddUser.empRole = JSON.stringify(AddUser?.role.id);
        AddUser.supervisorId = AddUser?.reportingManager.id
        AddUser.profile_pic = ''
        AddUser.status = AddUser.present_status ? '1' : '0';
        AddUser.createdBy = userid,
            AddUser.lastUpdatedBy = userid
       
            const data = JSON.stringify(AddUser);
            const config = {
                method: 'post',
                url: baseURL+'createUser',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `${apikey}`
                },
                data
            };
        let apiCallName = (AddUser.role.roleName == "Funder") ? 'createFunder' : (AddUser.role.roleName == "Partner") ? 'createPartner' : false;
        axios(config)
            .then((response) => {
                if (response?.data?.success) {
                    let funderPartnerData = {}
                    if (apiCallName) {
                        (apiCallName == "Funder") ?
                            funderPartnerData = {
                                "countryID": 1,
                                "partnername": AddUser.first_name,
                                "workPhone": AddUser.workNum,
                                "mobilePhone": AddUser.contactNum,
                                "emailID": AddUser.officeMailId,
                                "address": AddUser.address,
                                "status": AddUser.present_status ? '1' : '0',
                                "city": "banglore",
                                "state": "Karnataka",
                                "pincode": AddUser.pincode,
                                "designation": "Funder",
                                "createdBy": userid,
                                "lastUpdatedBy": userid
                            } : funderPartnerData = {
                                "countryID": 1,
                                "partnername": AddUser.first_name,
                                "workPhone": AddUser.workNum,
                                "mobilePhone": AddUser.contactNum,
                                "emailID": AddUser.officeMailId,
                                "address": AddUser.address,
                                "status": AddUser.present_status ? '1' : '0',
                                "city": "banglore",
                                "state": "Karnataka",
                                "pincode": AddUser.pincode,
                                "designation": "Partner",
                                "createdBy": userid,
                                "lastUpdatedBy": userid
                            }
                            const partnerFunderConfig = {
                                method: 'POST',
                                url:  baseURL + `${apiCallName}`,
                                headers: {
                                    'Content-Type': 'application/json',
                                    'Authorization': `${apikey}`
                                },
                                funderPartnerData
                            }
                        axios(partnerFunderConfig)
                            .then((responseIn) => {
                                setOpen(false)
                                props.viewMessage('User Added successfully');
                            })
                            .catch((error2) => {
                                // console.log("error")
                            })
                    }
                }
            })
            .catch((error) => {
                // console.log(error);
            });
        handleClose()
    }
    let numrex=/^\d+$/
    return (
        <div>
            <Button id="add-new-user" style={{ float: "right", marginLeft: "1rem", borderRadius: "50%", padding: "0.2rem", marginTop: "-0.5rem", position: 'fixed', zIndex: '1', bottom: 40, right: 40 }} variant="contained" onClick={handleClickOpen} sx={{
                ':focus': {
                    backgroundColor: '#ffd796',
                    color: '#ff7424'
                },
                '&:hover': {
                    backgroundColor: '#ffd796',
                    color: '#ff7424'
                }, backgroundColor: '#ffd796',
                color: '#ff7424'
            }}><span style={{ fontSize: "2rem" }}>+</span></Button>
            <Dialog
                open={open}
                fullScreen
                onClose={handleClose}
                aria-labelledby="scroll-dialog-title"
                aria-describedby="scroll-dialog-description"
            >
                {/* <AppBar > */}
                <form onSubmit={(e)=>{e.preventDefault(); submitUser()}}>
                    <Toolbar sx={{ bgcolor: '#ff7424' }}>
                        <IconButton edge="start" onClick={handleClose} aria-label="close" id="close-user" style={{color:'white'}}>
                            <CloseIcon />
                        </IconButton>
                        <Typography sx={{ ml: 2, flex: 1 }} variant="h6" component="div" style={{color:'white'}}>
                            Add Users 
                        </Typography>
                        <Button  type="submit" id="save_user" style={{color:"white"}}>
                            save
                        </Button>
                    </Toolbar>
                            <div style={{ background: "white", padding: "2rem", borderRadius: "10px" }}>
                                <FormControl fullWidth style={{ marginLeft: '0.5rem', marginBottom: "0.5rem", color: '#ff7424' }}>
                                    <InputLabel id="choose_role" fullWidth color="common" style={{ color: '#ff7424' }}>{AddUser.role.id>1?"Role":"Choose Role"} </InputLabel>
                                    <Select fullWidth color="common" variant='standard'
                                        labelId="role-label"
                                        id="role"
                                        onChange={(e) => { getEmpId(e.target.value) }}
                                    >
                                        {roles?.map(role => {
                                            return <MenuItem value={role ?? ''}>{role?.roleName}</MenuItem>
                                        })}
                                    </Select>
                                </FormControl>
                               <br/><br/> <TextField fullWidth id="First_name" helperText='Name required*' label="Name" value={AddUser.first_name} required onChange={(e) => { setAddUser({ ...AddUser, first_name: e.target.value }) }} variant="outlined" color="common" />
                                {
                                    ["Admin", "Program Manager", "Operations Manager", "Gelathi Facilitator Lead", 'FIN/HR/VIEWER', 'Senior Operations Manager'].includes(AddUser.role?.roleName) && <TextField fullWidth id="last_name" label="Last Name" variant="outlined" value={AddUser.last_name} onChange={(e) => { setAddUser({ ...AddUser, last_name: e.target.value }) }} />
                                }<br/>
                                {!["Funder", "Partner"].includes(AddUser.role?.roleName) && <FormControl style={{ marginLeft: "1rem" }}>
                                    <RadioGroup
                                        row
                                        onChange={(e, value) => { setAddUser({ ...AddUser, gender: value }) }}
                                        aria-labelledby="demo-radio-buttons-group-label"
                                        defaultValue="male"
                                        first_name="radio-buttons-group"
                                    >
                                        <FormControlLabel id="female" value="female" control={<Radio />} label="Female" color='#ff7424'/>
                                        <FormControlLabel id="male" value="male" control={<Radio />} label="Male" />
                                    </RadioGroup>
                                </FormControl>}
                                <br /><br/>
                                 {!["Funder", "Partner"].includes(AddUser.role?.roleName) && <FormControl fullWidth>
                                 {reportingManager.length > 0 && 
                                   <Autocomplete
                                        disablePortal
                                        id="combo-box-demo"
                                        options={Array.isArray(reportingManager) ? reportingManager : []}
                                        // getOptionLabel={(option) => option.name} // Specify how to extract the label
                                        defaultValue={AddUser.reportingManager}
                                        label="reportingManager"
                                        onChange={(event, value) => getProjectOfManager(value)}
                                       
                                        renderInput={(params) => <TextField id="reposrting-manager" {...params} label="ReportingManger" />}
                                    />}
                                </FormControl>
                                } 
                            </div>
                                <CardContent>
                                <h3>Contact Information</h3>
                                </CardContent>
                          
                            <div style={{ background: "white", padding: "2rem", borderRadius: "10px" }}>
                                <TextField fullWidth required id="Mobile_number" label="Mobile number" helperText={`Mobile Number Required (${AddUser?.contactNum?.length}/10)`} inputProps={{ maxLength: 10 }} multiline value={AddUser.contactNum} type="number" onChange={(e) => { 
                                    if(numrex.test(e?.target?.value)){
                                        setAddUser({ ...AddUser, contactNum: e.target.value })
                                    }
                                    }} variant="outlined" color="common" /><br/><br/>
                                <TextField fullWidth id="Work" label="Work"  inputProps={{ inputMode: 'numeric', pattern: '[0-9]*' }}
          onInput = {(e) =>{
            e.target.value = Math.max(0, parseInt(e.target.value) ).toString().slice(0,10)
        }} value={AddUser.workNum} onChange={(e) => {
                                     setAddUser({ ...AddUser, workNum: e.target.value }) }} type="number" variant="outlined" color='common' /><br/><br/>
                                <TextField fullWidth type="email" required id="Email" label="Email"  value={AddUser?.officeMailId} 
                                onChange={(e)=>{
                                    emailchangeHandler(e.target.value)
                                }} 
                                     onPaste={(e) => { 
                                        setAddUser({ ...AddUser, officeMailId: e.target.value }); 
                                        checkEmailValidation()
                                     }}
                                         variant="outlined" color="common" /><br/><br/>
                                <div style={{ marginLeft: "1rem", fontSize: "0.8rem", fontWeight: "700" }}>
                                    {/* {emailExists ? <span style={{ color: "crimson", display: "flex" }}><Iconify icon="gridicons:cross-circle" width={20} height={20} /> &nbsp; Email Id already exists !</span> : (errors.office_email_id) ? <span style={{ color: "crimson", display: "flex" }}><Iconify icon="gridicons:cross-circle" width={20} height={20} /> &nbsp;Invalid Email Id</span> : (AddUser.office_email_id != "") ? <span style={{ color: "green", display: "flex" }}><Iconify icon="mdi:tick-circle" width={20} height={20} /> &nbsp;Valid Email Id</span> : null} */}
                                </div>
                                <TextField fullWidth required id="Address" label="Address" helperText='Address Required*' value={AddUser.address} onChange={(e) => { setAddUser({ ...AddUser, address: e.target.value }) }} variant="outlined" color="common"/><br/><br/>
                                {!["Funder", "Partner"].includes(AddUser.role?.roleName) && <TextField fullWidth id="Address1" label="Address 1" value={AddUser.address3} onChange={(e) => { setAddUser({ ...AddUser, address3: e.target.value }) }} variant="outlined" color="common"/>}<br/><br/>
                                {!["Funder", "Partner"].includes(AddUser.role?.roleName) && < TextField fullWidth id="Address2" label="Address 2" value={AddUser.address2} onChange={(e) => { setAddUser({ ...AddUser, address2: e.target.value }) }} variant="outlined" color="common"/>}<br/><br/>
                                <TextField fullWidth id="pincode"  label="Pincode" 
                                inputProps={{ inputMode: 'numeric', pattern: '[0-9]*'}}
          onInput = {(e) =>{
            e.target.value = Math.max(0, parseInt(e.target.value) ).toString().slice(0,6)
          }} type="number" required value={AddUser.pincode}  onChange={(e) => { setAddUser({ ...AddUser, pincode: e.target.value }) }} variant="outlined" color="common"/><br/><br/>
                                {
                                    ["Trainer", 'Field Associate', 'FIN/HR/VIEWER', 'Senior Operations Manager'].includes(AddUser.role?.roleName) && <FormControl fullWidth>
                                        <Autocomplete
                                            multiple
                                            limitTags={2}
                                            id="Projects"
                                            options={reportingManagerProject}
                                            onChange={(e, value) => changeProject(value)}
                                            getOptionLabel={(option) => option.label}
                                            renderInput={(params) => (
                                                <TextField {...params} id="choose_project" label="Choose project" placeholder="Choose project" color="common"/>
                                            )}
                                        />
                                    </FormControl>
                                }
                                {["Driver"].includes(AddUser.role?.roleName) && <TextField fullWidth id="license_number" label="License Number" value={AddUser.license_number} onChange={(e) => { setAddUser({ ...AddUser, license_number: e.target.value }) }} variant="outlined" />
                                }
                            </div>
                </form>
            </Dialog>
        </div>
    )
}
export default AddUser