import { useState, useEffect } from 'react';
import React from 'react'
import { Button, Card, CardActions, CardContent, Stack, TextField, Radio, DialogContent, DialogContentText, FormControlLabel, FormHelperText } from '@mui/material';
import Dialog from '@mui/material/Dialog';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import CloseIcon from '@mui/icons-material/Close';
import Slide from '@mui/material/Slide';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DateTimePicker } from '@mui/x-date-pickers/DateTimePicker';
import axios from 'axios';
import moment from 'moment';
import Select from '@mui/material/Select';
import FormControl from '@mui/material/FormControl';
import Switch from '@mui/material/Switch';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import RadioGroup from '@mui/material/RadioGroup';
import { baseURL } from 'src/utils/api';
import { useAuth } from 'src/AuthContext';

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

const label = { inputProps: { 'aria-label': 'Switch demo' } };
export default function EditParticipantdata({ editSession, setEditsession, Trainingdata, changeState, participantdata, cvalue }) {
  const { apikey } = useAuth();
  const [openFilter, setOpenFilter] = useState(false);
  const [showDate, setShowDate] = useState(false)
  const [sendData, setSendData] = useState({
    occupation: "",
    husbandOccupation: "",
    wifeIncomeMonthly: "",
    typeOfEnterprise: "",
    saving_amt: "",
    gelathiRecomm: 0,
    saving_goal: "",
    wifeSavingsMonthly: "",
    income: "",
    bank_acc: "",
    contact_no: "",
    husbandName: ""
  });
  const [helperText, setHelperText] = useState('');
  const [open, setOpen] = React.useState(false);
  const [date, setDate] = useState(new Date());
  const [occupationdata, setOccupationdata] = React.useState('');
  const [HusbandOccupationError, setHusbandOccupationError] = useState(false);
  const [OccupationError, setOccupationError] = useState(false);
  const [BankError, setBankError] = useState(false);
  const assestsOwned = [
    { id: 1, name: "Property owned (Asset) / ಆಸ್ತಿ ಮಾಲೀಕತ್ವ (ಆಸ್ತಿ) " },
    { id: 2, name: "Bank Loan (Liability) /  ಬ್ಯಾಂಕ್ ಸಾಲ (ಬಾಧ್ಯತೆ) " },
    { id: 3, name: "Gold (Asset) / ಚಿನ್ನ (ಆಸ್ತಿ)" },
    { id: 4, name: "Mortgage (Liability) /  ಅಡಮಾನ (ಬಾಧ್ಯತೆ) " },
    { id: 5, name: "Vehicle 2 wheeler / ವಾಹನ 2 ಚಕ್ರ " },
    { id: 6, name: "4 wheeler (Asset) / 4 ಚಕ್ರ ವಾಹನ (ಆಸ್ತಿ)" },
  
  ]
  const newBookkeepingEntries = [
    { id: 1, name: "Lending Rs. 500 for a neighbour for one day / ಸಾಲ ನೀಡುವುದು ರೂ. ಒಂದು ದಿನಕ್ಕೆ ನೆರೆಯವರಿಗೆ 500" },
    { id: 2, name: "Profit from the enterprise / ಉದ್ಯಮದಿಂದ ಲಾಭ" },
    { id: 3, name: "Spending Rs. 50 for transport / ಖರ್ಚು ರೂ. ಸಾರಿಗೆಗಾಗಿ 50" },
    { id: 4, name: "Loan taken from bank / ಬ್ಯಾಂಕ್‌ನಿಂದ ಪಡೆದ ಸಾಲ" },
    { id: 5, name: "Money withdrawn from bank, ATM and kept at home / ಬ್ಯಾಂಕ್, ಎಟಿಎಂನಿಂದ ಹಿಂತೆಗೆದುಕೊಂಡ ಹಣ ಮತ್ತು ಮನೆಯಲ್ಲಿ ಇಡಲಾಗಿದೆ" },
    { id: 6, name: "None / ಯಾವುದು ಇಲ್ಲ" }
  ];
  const purposesForMoney = [
    { id: 1, name: "To buy an asset (Productive) / ಆಸ್ತಿಯನ್ನು ಖರೀದಿಸಲು (ಉತ್ಪಾದಕ)" },
    { id: 2, name: "To start a business (Productive) / ವ್ಯವಹಾರವನ್ನು ಪ್ರಾರಂಭಿಸಲು (ಉತ್ಪಾದಕ)" },
    { id: 3, name: "To buy a new saree for a wedding (Consumptive) / ಮದುವೆಗೆ ಹೊಸ ಸೀರೆ ಖರೀದಿಸಲು (ಉಪಯೋಗ)" },
    { id: 4, name: "For festival celebrations (Consumptive) / ಹಬ್ಬದ ಆಚರಣೆಗಳಿಗಾಗಿ (ಉಪಯೋಗ)" },
    { id: 5, name: "Children's education (Productive) / ಮಕ್ಕಳ ಶಿಕ್ಷಣ (ಉತ್ಪಾದಕ)" },
    { id: 6, name: "For bigger TV (Consumptive) / ದೊಡ್ಡ ಟಿವಿಗಾಗಿ (ಉಪಯೋಗ)" },
    { id: 7, name: "For a fancy phone (Consumptive) / ಅಲಂಕಾರಿಕ ಫೋನ್‌ಗಾಗಿ (ಸೇವಕ)" }
  ];
  const timeFrequencies = [
    { id: 1, name: "Monthly / ಮಾಸಿಕ" },
    { id: 2, name: "Once in two months / ಎರಡು ತಿಂಗಳಿಗೊಮ್ಮೆ" },
    { id: 3, name: "Once in 6 months / 6 ತಿಂಗಳಿಗೊಮ್ಮೆ" },
    { id: 4, name: "Once in a year / ವರ್ಷಕ್ಕೊಮ್ಮೆ" }
  ];
  
  React.useEffect(() => {
    //setShown(shown)
    setOpen(editSession)

  }, [editSession])
  React.useEffect(() => {
    Occupation();
  }, [])
  const handleClickOpen = () => {
    setEditsession(true)
    setOpen(true);
  };
  const handleClose = () => {
    setEditsession(false)
    setOpen(false);
    changeState();
  };
  const Occupation = () => {
    var config = {
      method: 'post',
      url: baseURL + 'getOccupations',
      headers: {
        'Authorization': `${apikey}`
      }
    };
    axios(config)
      .then(function (response) {
        setOccupationdata(response.data)
      })
      .catch(function (error) {
        // console.log(error);
      });

  }

  const SendData = async => {
    var data = JSON.stringify({
      "income": parseInt(sendData?.income),
      "occupation": JSON.stringify(parseInt(sendData?.occupation)),
      "typeOfEnterprise": sendData?.typeOfEnterprise,
      "participant_id": parseInt(participantdata?.id),
      "final_save": 1,
      "husbandOccupation": JSON.stringify(parseInt(sendData?.husbandOccupation)),
      "wifeIncomeMonthly": parseInt(sendData?.wifeIncomeMonthly),
      "saving_goal": sendData?.saving_goal,
      "bank_acc": parseInt(sendData?.bank_acc),
      "wifeSavingsMonthly": parseInt(sendData?.wifeSavingsMonthly),
      "saving_amt": parseInt(sendData?.saving_amt),
      "participant_day2": Trainingdata?.data?.day2,
      "gelathiRecomm": sendData?.gelathiRecomm,
      "project_id": parseInt(Trainingdata?.data?.project_id),
      "tb_id": parseInt(Trainingdata?.data?.id),
      "contact_no": sendData?.contact_no,
      "husbandName": sendData?.husbandName
    });
    if (sendData?.husbandOccupation == '') {
      setHusbandOccupationError(true);
      setHelperText('Please Select The Option');
    }
    if (sendData?.occupation == '') {
      setOccupationError(true);
      setHelperText('Please Select The Option');
    }
    if (sendData?.bank_acc == '') {
      setBankError(true);
      setHelperText('Please Select The Option');
    }
    if (sendData?.husbandOccupation == '' || sendData?.occupation == '') {
      alert("Please Select The Option'");
    }
    else {
      var config = {
        method: 'post',
        url: baseURL + 'editParticipant',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `${apikey}`
        },
        data: data
      };
      axios(config)
        .then(function (response) {
          setSendData({
            occupation: "",
            husbandOccupation: "",
            wifeIncomeMonthly: "",
            typeOfEnterprise: "",
            saving_amt: "",
            gelathiRecomm: 0,
            saving_goal: "",
            wifeSavingsMonthly: "",
            income: "",
            bank_acc: "",
            contact_no: "",
            husbandName: ""

          })
          handleClose()
          changeState();
        })
        .catch(function (error) {
          // console.log(error);
        });
    }
  }
  return (
    <div>
      <Dialog fullScreen open={open} onClose={handleClose}
        aria-labelledby="scroll-dialog-title"
        aria-describedby="scroll-dialog-description">
        <form
          onSubmit={(e) => {
            e.preventDefault();
            SendData();
          }}
        >
          <Toolbar sx={{ bgcolor: '#ed6c02', color: 'white' }} >
            <IconButton edge="start" sx={{ color: "inherit" }} onClick={handleClose} aria-label="close">
              <CloseIcon />
            </IconButton>
            <Typography sx={{ ml: 2, flex: 1, color: "inherit" }} variant="h6" component="div" >
              Update Participant Detail working
            </Typography>

            <Button autoFocus color="inherit"
              type='submit'
            // onClick={() => SendData()}
            >
              save
            </Button>
          </Toolbar>

          <DialogContent dividers={scroll === 'paper'} sx={{ background: "#f9fafb" }}>
            <DialogContentText
              id="scroll-dialog-description"
              tabIndex={-1}
            >
              <FormControl fullWidth >
                {OccupationError ? <FormHelperText style={{ color: 'red' }}>{helperText}</FormHelperText> : null}{' '}
                <InputLabel id="demo-simple-select-label" style={{ flexDirection: 'row', color: '#ed6c02', fontWeight: 700, marginTop: 20 }}>
                  {sendData?.occupation == "" ? "Select wife's occupation" : "Wife occupation"}</InputLabel>  <br /><br />
                <Select labelId="Select Wife's Occupation" id="demo-simple-select" value={sendData?.occupation} label="Wife Occupation" onChange={(e) => setSendData({ ...sendData, occupation: e?.target?.value })} variant="standard" color="common">
                  {occupationdata?.list?.map(itm => {
                    return (<MenuItem value={itm?.id}>{itm?.name}</MenuItem>)
                  })}

                </Select>
              </FormControl>
              <FormControl fullWidth >
                {HusbandOccupationError ? <FormHelperText style={{ color: 'red' }}>{helperText}</FormHelperText> : null}{' '}
                <InputLabel id="demo-simple-select-label" style={{ flexDirection: 'row', color: '#ed6c02', fontWeight: 700, marginTop: 30 }}>
                  {sendData?.husbandOccupation == "" ? "Select Husband's occupation" : "Husband occupation"}</InputLabel>  <br /><br /><br />
                <Select labelId="Select Wife's Occupation" id="demo-simple-select" value={sendData?.husbandOccupation} label="Husband Occupation" onChange={(e) => setSendData({ ...sendData, husbandOccupation: e?.target?.value })} variant="standard" color="common">
                  {occupationdata?.list?.map(itm => {
                    return (<MenuItem value={itm?.id}>{itm?.name}</MenuItem>)
                  })}

                </Select>
              </FormControl>
              <Stack style={{ marginTop: 20 }}>
                <TextField required id="Monthly-income" onChange={(e) => { setSendData({ ...sendData, wifeIncomeMonthly: e?.target?.value }) }} label="Monthly Wife's income" variant="outlined" color="common" />
              </Stack>
              <Stack style={{ marginTop: 20 }}>
                <TextField required id="Monthly-savings" onChange={(e) => { setSendData({ ...sendData, wifeSavingsMonthly: e?.target?.value }) }} label="Monthly Wife's Savings" variant="outlined" color="common" />
              </Stack>
              <Stack style={{ marginTop: 20 }}>
                <TextField required id="goal" onChange={(e) => { setSendData({ ...sendData, saving_goal: e?.target?.value }) }} label="What is your goal" variant="outlined" color="common" />
              </Stack>
              <Stack style={{ marginTop: 20 }}>
                <TextField required id="Monthly family income" onChange={(e) => { setSendData({ ...sendData, income: e?.target?.value }) }} label="Monthly Family Income" variant="outlined" color="common" />
              </Stack>
              <Stack style={{ marginTop: 20 }}>
                <TextField required id="Monthly _family_savings" onChange={(e) => { setSendData({ ...sendData, saving_amt: e?.target?.value }) }} label="Monthly Family Savings" variant="outlined" color="common" />
              </Stack>
              <Stack style={{ marginTop: 20 }}>
                <TextField required id="type_of_enterprise" onChange={(e) => { setSendData({ ...sendData, typeOfEnterprise: e?.target?.value }) }} label="Type of Enterprise" variant="outlined" color="common" />
              </Stack>
              <Stack style={{ marginTop: 20 }}>
                <TextField required id="contact_no" onChange={(e) => { setSendData({ ...sendData, contact_no: e?.target?.value }) }} label="Contact Number" variant="outlined" color="common" />
              </Stack>
              <Stack style={{ marginTop: 20 }}>
                <TextField required id="husbandName" onChange={(e) => { setSendData({ ...sendData, husbandName: e?.target?.value }) }} label="Husband Name" variant="outlined" color="common" />
              </Stack>
              <Stack mt={1}>
                <Typography style={{ fontWeight: 500 }} >Bank Account *</Typography>
                <Typography>

                  {BankError ? <FormHelperText style={{ color: 'red' }}>{helperText}</FormHelperText> : null}{' '}
                </Typography>
                <RadioGroup
                  aria-labelledby="demo-radio-buttons-group-label"
                  name="radio-buttons-group"
                  onChange={(e, value) => { setSendData({ ...sendData, bank_acc: value }) }}

                >
                  <div style={{ display: "flex" }}>
                    <FormControlLabel value={0} control={<Radio style={{ color: "#595959" }} />} label="No" />
                    <FormControlLabel value={1} control={<Radio style={{ color: "#595959" }} />} label="Yes" />
                  </div>
                </RadioGroup>
              </Stack>
              <Stack id="create-poa-stack" direction={'row'}>
                <Typography id="all-day">Suggested Gelathi</Typography><br />
                <Switch id="switch-suggested-gelathi" value={sendData?.gelathiRecomm}
                  onChange={(e) => {
                    setSendData({ ...sendData, gelathiRecomm: sendData?.gelathiRecomm === 1 ? 0 : 1 })
                  }} />
              </Stack>
{/* new code ----------------------------------------------------------------------- */}
              <Stack style={{ marginTop: 20 }}>
                <TextField required id="contact_no" onChange={(e) => { setSendData({ ...sendData, contact_no: e?.target?.value }) }}
                  label="Has anyone in your household migrated in the last 1 year for work? Y/N/ನಿಮ್ಮ ಮನೆಯಲ್ಲಿ ಯಾರಾದರೂ ಕೆಲಸಕ್ಕಾಗಿ ಕಳೆದ 1 ವರ್ಷದಲ್ಲಿ ವಲಸೆ ಹೋಗಿದ್ದಾರೆಯೇ? ಹೌದು ಅಲ್ಲ

" variant="outlined" color="common" />
              </Stack>
              <Stack mt={1}>
                <Typography style={{ fontWeight: 500 }} >Does the migrant member send remittances to the household? Y/N  
                /ವಲಸಿಗ ಸದಸ್ಯರು ಮನೆಗೆ ಹಣ ಕಳುಹಿಸುತ್ತಾರೆಯೇ? ಹೌದು ಅಲ್ಲ</Typography>
                <Typography>

                  {BankError ? <FormHelperText style={{ color: 'red' }}>{helperText}</FormHelperText> : null}{' '}
                </Typography>
                <RadioGroup
                  aria-labelledby="demo-radio-buttons-group-label"
                  name="radio-buttons-group"
                  onChange={(e, value) => { setSendData({ ...sendData, bank_acc: value }) }}

                >
                  <div style={{ display: "flex" }}>
                    <FormControlLabel value={0} control={<Radio style={{ color: "#595959" }} />} label="No" />
                    <FormControlLabel value={1} control={<Radio style={{ color: "#595959" }} />} label="Yes" />
                  </div>
                </RadioGroup>
              </Stack>

                <Card mt={1} style={{ marginTop: 10, borderRadius: 20 }}>
                  <CardContent>
                    <Typography variant="subtitle2" style={{ color: '#ff7424' }}>
                    Are the following liabilities or assets?/ಈ ಕೆಳಗಿನ ಹೊಣೆಗಾರಿಕೆಗಳು ಅಥವಾ ಸ್ವತ್ತುಗಳು?

                    </Typography>
                    <Stack mt={2} mb={2}>
                      <Select
                        color="common"
                        label="Choose Secondary Occupation of the Household"
                        variant="standard"
                        required
                        onChange={(e) => {
                          const selectedOption = assestsOwned.find(option => option.id === e.target.value);
                         setSendData({ ...sendData, secondary_occupation_household: selectedOption.id, secondary_occupation_household_name: selectedOption?.name  });
                      
                         console.log(selectedOption); }}
                         
                         value={sendData?.secondary_occupation_household}
                      >
                               {assestsOwned.map((itm) => (
          <MenuItem key={itm.id} value={itm.id}>
            {itm.name}
          </MenuItem>
        ))}

                      </Select>
                    </Stack>
                  </CardContent>
                </Card>
                <Card mt={1} style={{ marginTop: 10, borderRadius: 20 }}>
                  <CardContent>
                    <Typography variant="subtitle2" style={{ color: '#ff7424' }}>
                    Which of the following would you record as a bookkeeping entry?   
                    ಕೆಳಗಿನವುಗಳಲ್ಲಿ ಯಾವುದನ್ನು ನೀವು ಬುಕ್‌ಕೀಪಿಂಗ್ ನಮೂದು ಎಂದು ರೆಕಾರ್ಡ್ ಮಾಡುತ್ತೀರಿ?
                    </Typography>
                    <Stack mt={2} mb={2}>
                      <Select
                        color="common"
                        label="CHoose Option"
                        variant="standard"
                        required
                        onChange={(e) => {
                          const selectedOption = newBookkeepingEntries.find(option => option.id === e.target.value);
                         setSendData({ ...sendData, secondary_occupation_household: selectedOption.id, secondary_occupation_household_name: selectedOption?.name  });
                      
                         console.log(selectedOption); }}
                         
                         value={sendData?.secondary_occupation_household}
                      >
                               {newBookkeepingEntries.map((itm) => (
          <MenuItem key={itm.id} value={itm.id}>
            {itm.name}
          </MenuItem>
        ))}

                      </Select>
                    </Stack>
                  </CardContent>
                </Card>
                <Card mt={1} style={{ marginTop: 10, borderRadius: 20 }}>
                  <CardContent>
                    <Typography variant="subtitle2" style={{ color: '#ff7424' }}>
                    Please tell me if the following loans are productive or consumptive?   
                    ಈ ಕೆಳಗಿನ ಸಾಲಗಳು ಉತ್ಪಾದಕವೇ ಅಥವಾ ಉಪಭೋಗಕಾರಿಯೇ ಎಂದು ದಯವಿಟ್ಟು ನನಗೆ ತಿಳಿಸಿ?
                    </Typography>
                    <Stack mt={2} mb={2}>
                      <Select
                        color="common"
                        label="Choose Secondary Occupation of the Household"
                        variant="standard"
                        required
                        onChange={(e) => {
                          const selectedOption = purposesForMoney.find(option => option.id === e.target.value);
                         setSendData({ ...sendData, secondary_occupation_household: selectedOption.id, secondary_occupation_household_name: selectedOption?.name  });
                      
                         console.log(selectedOption); }}
                         
                         value={sendData?.secondary_occupation_household}
                      >
                               {purposesForMoney.map((itm) => (
          <MenuItem key={itm.id} value={itm.id}>
            {itm.name}
          </MenuItem>
        ))}

                      </Select>
                    </Stack>
                  </CardContent>
                </Card>

                <Card style={{ marginTop: 10, borderRadius: 20 }}>
                  <CardContent>
                    <Typography variant="subtitle2" style={{ color: '#ff7424' }}>
                    You have taken a loan of Rs. 20,000 to be paid back in equal monthly payments in one year and you have to pay back Rs. 2000 a month. What is the annual interest rate? 
                    20000ರೂ ಗಳನ್ನೂ ಸಾಲ ಮಾಡಿದ್ಧಿರ , ಒಂದು ವರ್ಷದಲ್ಲಿ ಸಮಾನ ಮಾಸಿಕ ಪಾವತಿಗಳಲ್ಲಿ 2000 ರೂ  ಮರುಪಾವತಿಸಿದರೆ ಮತ್ತು  ವಾರ್ಷಿಕ ಬಡ್ಡಿ ದರ ಎಷ್ಟು?
                    </Typography>
                    <Stack mt={2} mb={2}>
                      <TextField
                        id="twoquestions"
                        label="Your Answer"
                        onChange={(e) => {
                          setSendData({ ...sendData, mother_tongue: e?.target?.value });
                        }}
                        variant="outlined"
                        color="common"
                      />
                    </Stack>
                  </CardContent>
                </Card>
                <Card style={{ marginTop: 10, borderRadius: 20 }}>
                  <CardContent>
                    <Typography variant="subtitle2" style={{ color: '#ff7424' }}>
                    You lend Rs.1000 to a friend one evening and she gives you Rs. 1000 back the next day. If the interest is 2% per day, how much should he pay back in total tomorrow?  
                    ನೀವು ಸ್ನೇಹಿತರಿಗೆ ಒಂದು ಸಂಜೆ 1000 ರೂ ಸಾಲ ನೀಡುತ್ತೀರಿ ಮತ್ತು ಅವಳು ಮರುದಿನ 1000 ರೂ ಮರು ಪಾವತಿ ಮಾಡುತ್ತಾರೆ ,ಒಂದು ದಿನಕ್ಕೆ ಬಡ್ಡಿ 2 % ಆದರೆ , ನಾಳೆ  ಅವರು ಒಟ್ಟು ಎಷ್ಟು ಮರುಪಾವತಿಸಬೇಕು?"</Typography>
                    <Stack mt={2} mb={2}>
                      <TextField
                        id="twoquestions"
                        label="Your Answer"
                        onChange={(e) => {
                          setSendData({ ...sendData, mother_tongue: e?.target?.value });
                        }}
                        variant="outlined"
                        color="common"
                      />
                    </Stack>
                  </CardContent>
                </Card>
                <Card style={{ marginTop: 10, borderRadius: 20 }}>
                  <CardContent>
                    <Typography variant="subtitle2" style={{ color: '#ff7424' }}>
                    Assume you invest Rs.15,000 as capital in a saree business for 30 sarees. You spend Rs.200 to transport the sarees from the wholesaler to your village. If you sell all the sarees for 21,000, how much profit have you made?   
                    ನೀವು 30 ಸೀರೆಗಳಿಗೆ ಸೀರೆ ವ್ಯಾಪಾರದಲ್ಲಿ ರೂ.15,000 ಬಂಡವಾಳವಾಗಿ ಹೂಡಿಕೆ ಮಾಡುತ್ತೀರಿ ಎಂದು ಭಾವಿಸಿ. ಸಗಟು ವ್ಯಾಪಾರಿಯಿಂದ ನಿಮ್ಮ ಗ್ರಾಮಕ್ಕೆ ಸೀರೆಗಳನ್ನು ಸಾಗಿಸಲು ನೀವು 200 ರೂ. ಎಲ್ಲಾ ಸೀರೆಗಳನ್ನು 21,000ಕ್ಕೆ ಮಾರಿದರೆ ಎಷ್ಟು ಲಾಭಸಿಗುತ್ತದೆ ?
                    </Typography>
                    <Stack mt={2} mb={2}>
                     
                      <TextField
                        id="twoquestions"
                        label="Your Answer"
                        onChange={(e) => {
                          setSendData({ ...sendData, mother_tongue: e?.target?.value });
                        }}
                        variant="outlined"
                        color="common"
                      />
                    </Stack>
                  </CardContent>
                </Card>
                <Card style={{ marginTop: 10, borderRadius: 20 }}>
                  <CardContent>
                    <Typography variant="subtitle2" style={{ color: '#ff7424' }}>
                    Personal Account   ವೈಯಕ್ತಿಕ ಖಾತೆ
                    </Typography>
                    <Stack mt={2} mb={2}>
                      <TextField
                        id="twoquestions"
                        label="Your Answer"
                        onChange={(e) => {
                          setSendData({ ...sendData, mother_tongue: e?.target?.value });
                        }}
                        variant="outlined"
                        color="common"
                      />
                    </Stack>
                  </CardContent>
                </Card>
                <Stack mt={1}>
                <Typography style={{ fontWeight: 500 }} >Do you have a personal bank account? (Y/N)/</Typography>ನೀವು ವೈಯಕ್ತಿಕ ಬ್ಯಾಂಕ್ ಖಾತೆಯನ್ನು ಹೊಂದಿದ್ದೀರಾ? (ಹೌದು/ಇಲ್ಲ) <Typography>

                  {BankError ? <FormHelperText style={{ color: 'red' }}>{helperText}</FormHelperText> : null}{' '}
                </Typography>
                <RadioGroup
                  aria-labelledby="demo-radio-buttons-group-label"
                  name="radio-buttons-group"
                  onChange={(e, value) => { setSendData({ ...sendData, bank_acc: value }) }}

                >
                  <div style={{ display: "flex" }}>
                    <FormControlLabel value={0} control={<Radio style={{ color: "#595959" }} />} label="No" />
                    <FormControlLabel value={1} control={<Radio style={{ color: "#595959" }} />} label="Yes" />
                  </div>
                </RadioGroup>
              </Stack>
              <Card mt={1} style={{ marginTop: 10, borderRadius: 20 }}>
                  <CardContent>
                    <Typography variant="subtitle2" style={{ color: '#ff7424' }}>
                    How often do you operate your bank account    ನಿಮ್ಮ ಬ್ಯಾಂಕ್ ಖಾತೆಯನ್ನು ನೀವು ಎಷ್ಟು ಬಾರಿ ನಿರ್ವಹಿಸುತ್ತೀರಿ  </Typography>
                    <Stack mt={2} mb={2}>
                      <Select
                        color="common"
                        label="Choose Secondary Occupation of the Household"
                        variant="standard"
                        required
                        onChange={(e) => {
                          const selectedOption = timeFrequencies.find(option => option.id === e.target.value);
                         setSendData({ ...sendData, secondary_occupation_household: selectedOption.id, secondary_occupation_household_name: selectedOption?.name  });
                      
                         console.log(selectedOption); }}
                         
                         value={sendData?.secondary_occupation_household}
                      >
                               {timeFrequencies.map((itm) => (
          <MenuItem key={itm.id} value={itm.id}>
            {itm.name}
          </MenuItem>
        ))}

                      </Select>
                    </Stack>
                  </CardContent>
                </Card>
            </DialogContentText></DialogContent>
        </form>
      </Dialog>
    </div>
  );
}