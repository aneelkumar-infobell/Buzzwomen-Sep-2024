import * as React from 'react';
import { useState, useEffect } from 'react';
import axios from 'axios';
import {
  Button,
  Grid,
  Stack,
  TextField,
  Select,
  Radio,
  RadioGroup,
  InputLabel,
  MenuItem,
  Checkbox,
  FormGroup,
  FormControlLabel,
  Card,
  CardContent,
  CardActionArea,
  DialogContent,
  DialogContentText,
  Box,
  CircularProgress,
} from '@mui/material';
import Dialog from '@mui/material/Dialog';
import ListItemText from '@mui/material/ListItemText';
import ListItem from '@mui/material/ListItem';
import List from '@mui/material/List';
import Divider from '@mui/material/Divider';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import CloseIcon from '@mui/icons-material/Close';
import Snackbar from '@mui/material/Snackbar';
import MuiAlert, { AlertProps } from '@mui/material/Alert';
import Alert from '@mui/material/Alert';
import Slide from '@mui/material/Slide';
import { Color } from '@mui/material';
import { Link } from 'react-router-dom';
import Iconify from '../../../components/Iconify';
import { Icon } from '@iconify/react';
import FormHelperText from '@mui/material/FormHelperText';
import Swal from 'sweetalert2';
import { baseURL } from 'src/utils/api';
import { useAuth } from 'src/AuthContext';
import SelectInput from 'src/components/SelectInput';
import TextInput from 'src/components/TextInput';
import {
  Areyourunningtheenterpriseonyourown,
  casteCategory,
  challengesinrunningandgrowingyourbusiness,
  currentEconomicActivity,
  education,
  Fromwherehaveyoutakenit,
  house,
  Howdoyoukeeptheseaccounts,
  Howmanypaidworkersdoyouhave,
  Howoftendoyouwritetheserecords,
  maritalStatus,
  Numberofyearsthebusinesshasbeenoperating,
  phoneType,
  rationCard,
  secondaryOccupationHousehold,
  statusofyourenterprise,
  Whatareyouraspirationsasanentrepreneur,
  Whatcategorydoesyourbusinessideafallin,
  whatisthepurposeofbankloans,
  whatisthereasonfornotbookkeeping,
  Whatkindofenterprisedoyourun,
  whatskillshaveyougained,
  whenhaveyouhadtheideaofstartingbusiness,
  Wheredidyougettheinvestmenttostartyourbusiness,
  Whydoyoudobusiness,
  WomensOccupation,
  yesOrNo,
} from './vypar/VyaparSurveySelectOptions';
import MultipleChoice from 'src/components/MultipleChoice';
const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

export default function Vyaparprogram({ itm, changeState, componentreloadmethod }) {
  const { apikey } = useAuth();
  const [open, setOpen] = React.useState(false);
  const [successMessage, setsuccessMessage] = useState(false);
  const [vyaapar, setVyaapar] = useState('');
  console.log(itm, 'itm');
  const [sendData, setSendData] = useState({
    participant_id: parseInt(itm?.gelathi_id),
    gf_id: '',
    when_was_survey_done: '',
    name_of_the_vyapari: '',
    age: '',
    contact_number: '',
    village_id: '',
    location_circle: '',
    higher_education: '',
    marital_status: '',
    number_of_people_in_the_household: 0,
    do_you_own_a_smart_phone: '',
    do_you_have_internet_connection_on_your_smart_phone: '',
    sector_type_of_business: '',
    are_you_proficient_with_numbers: '',
    are_you_proficient_with_written_language: '',
    household_income_monthly: 0,
    over_the_last_month_your_average_income: 0,
    your_business_profit_last_month: 0,
    how_much_monthly_income_would_you_like_to_ideally_earn: 0,
    amount_invested_when_the_business_started: 0,
    number_of_years_the_business_has_been_operating: '',
    why_do_you_do_business: '',
    tell_us_three_things_about_you_as_an_entrepreneur: '',
    tell_us_three_things_about_your_role_as_a_woman_at_home: '',
    what_are_your_challenges_in_running_and_growing_your_business: '',
    what_is_your_plan_to_overcome_these_challenges: '',
    what_are_your_skills: '',
    what_are_the_resources_available_with_you_for_your_business: '',
    who_is_your_customer_describe_them_to_us: '',
    please_list_down_the_various_components_of_business: '',
    i_know_the_current_state_of_my_business_in_profit_loss_revenue: '',
    what_kind_of_books_of_accounts_do_you_maintain: '',
    i_can_generate_ideas_to_solve_my_business_problems: '',
    tell_us_about_one_business_problem: '',
    what_is_your_business_goal_business_impurumenet_madodu: '',
    do_you_have_a_business_plan_to_reach_that_goal: '',
    can_you_submit_a_business_plan_for_your_goal_to_us_right_now: '',
    what_are_the_strengths_of_your_business: '',
    what_are_the_weaknesses_of_your_business: '',
    what_are_the_opportunities_for_your_business: '',
    are_you_able_to_raise_the_required_finance: '',
    i_have_taken_a_loan_from: '',
    i_have_trouble_accessing_loan_for_my_business: '',
    what_are_the_prerequisites_to_access_a_loan: '',
    taluk_district: '',
    name_of_the_cohort: '',
    you_stopped_hold_your_business: '',
    no_hours_engaged_business: 0,
    license_for_existing_business: '',
    home_based_work_from_shop: '',
    loan_currently_availed: '',
    relation_who_borrowed: '',
    loan_total_amount: 0,
    loan_source: '',
    loan_repayment_till_date: 0,
    need_additional_skills_business: '',
    skills_what_are_those: '',
    module1: '',
    module2: '',
    module3: '',
    module4: '',
    module5: '',
    district: '',
    taluk: '',
    gram_panchayat: '',
    number_of_beehives_participated: 0,
    total_household_members: 0,
    house: '',
    ration_card: '',
    cast: 0,
    dob: '',
    education: '',
    primary_occupation_household: '',
    secondary_occupation_household: '',
    womens_occupation: '',
    monthly_expenditure: 0,
    mobile_type: '',
    personal_smartphone: '',
    reason_for_not_having_smartphone: '',
    has_bank_account: '',
    uses_upi: '',
    underwent_skill_development_program: '',
    skills_gained_from_program: '',
    enterprise_status: '',
    run_enterprise_independently: '',
    average_monthly_income_enterprise: 0,
    average_monthly_profit_enterprise: 0,
    desired_monthly_income: 0,
    initial_investment_amount: 0,
    investment_source: '',
    years_in_operation: 0,
    has_hired_employees: '',
    number_of_paid_workers: 0,
    reason_for_doing_business: '',
    entrepreneurial_aspirations: [],
    maintain_daily_financial_books: '',
    frequency_of_recording_financial_books: '',
    method_of_keeping_accounts: [],
    reason_for_not_bookkeeping: '',
    has_business_goal_or_plan: '',
    maintain_detailed_business_plan: '',
    short_term_goal: '',
    loan_taken: '',
    interest_rate: 0,
    loan_purpose: '',
    run_growth_challenges: '',
    core_strength: '',
    core_weakness: '',
    core_opportunity: '',
    core_threat: '',
    target_customer: '',
    own_account_work: '',
    idea_status: '',
    idea_start: '',
    idea_category: '',
    monthly_income: 0,
    money_management: '',
    do_bookkeeping: '',
    loan_exists: '',
    savings_available: '',
    loan_startup: '',
  });

  const handleClickOpen = () => {
    setOpen(true);
    setLoader(true);
  };
  const handleClose = () => {
    setOpen(false);
    setIsFormPresentLocally(false);
  };
  useEffect(() => {
    gelathinamelist();
  }, []);

  const saveDataLocally = (key, data) => {
    const existingData = localStorage.getItem('vyapar');
    const parsedData = existingData ? JSON.parse(existingData) : [];
    const newData = { ...data }; // Replace with your own data object
    parsedData.push(newData);
    const updatedData = JSON.stringify(parsedData);
    localStorage.setItem('vyapar', updatedData);
    // componentreloadmethod();
  };
  // Get data from local
  const [isFormPresentLocally, setIsFormPresentLocally] = useState(false);
  const localStorageData = localStorage.getItem('vyapar');
  useEffect(() => {
    const existingData = localStorage.getItem('vyapar');
    const parsedData = existingData ? JSON.parse(existingData) : [];
    if (parsedData?.length) {
      parsedData.map((item) => {
        if (item?.participant_id === itm.gelathi_id) {
          setSendData(item);
          setIsFormPresentLocally(true);
        }
      });
    }
  }, []);
  const data1 = localStorage.getItem('vyapar');
  const getDataLocally = (key) => {
    const data = localStorage.getItem('vyapar');
    return data ? JSON.parse(data) : null;
  };
  const isOnline = () => {
    return navigator.onLine;
  };

  const networkAccess = async () => {
    try {
      await fetch('https://www.google.com/', { mode: 'no-cors' });
      return true;
    } catch (error) {
      return false;
    }
  };

  const vyaparformdata = (async) => {
    console.log(sendData, 'sednign data');
    if (isOnline() && networkAccess()) {
      // if (localStorage.getItem('vyapar')) {
      //   saveDataLocally('vyapar', sendData);
      // }
      sendData.age = parseInt(sendData.age);
      sendData.amount_invested_when_the_business_started = parseInt(sendData.amount_invested_when_the_business_started);
      sendData.average_monthly_income_enterprise = parseInt(sendData.average_monthly_income_enterprise);
      sendData.average_monthly_profit_enterprise = parseInt(sendData.average_monthly_profit_enterprise);
      sendData.desired_monthly_income = parseInt(sendData.desired_monthly_income);
      sendData.gf_id = parseInt(sendData.gf_id);
      sendData.interest_rate = parseInt(sendData.interest_rate);
      sendData.monthly_expenditure = parseInt(sendData.monthly_expenditure);
      sendData.monthly_income = parseInt(sendData.monthly_income);
      sendData.number_of_beehives_participated = parseInt(sendData.number_of_beehives_participated);
      sendData.number_of_people_in_the_household = parseInt(sendData.number_of_people_in_the_household);
      sendData.participant_id = parseInt(itm.gelathi_id);
      sendData.cast = sendData.cast.toString();
      var config = {
        method: 'post',
        url: baseURL + 'addVyaparBaselineSurvey',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `${apikey}`,
        },
        data: sendData,
      };
      axios(config)
        .then(function (response) {
          console.log(response, 'responseeeeVypar');
          // props?.changeState();
          // props?.mainDrawerReload();
          changeState();
          localStorage.removeItem('vyapar');
          Swal.fire({
            icon: 'success',
            title: 'Success',
            text: response.data.Message,
            confirmButtonText: 'Ok',
            timer: 3000,
          });
          handleClose();
        })
        .catch(function (error) {
          console.log(sendData, 'responseeeegreen', error);
          console.log('responseeeeVypar', error?.response?.data?.Message);
          saveDataLocally('vyapar', sendData);
          // props?.mainDrawerReload();
          changeState();
          Swal.fire({
            icon: 'error',
            title: 'Error',
            text: error?.response?.data?.Message,
            confirmButtonText: 'Ok',
            timer: 2000,
          });
          handleClose();
        });
    } else {
      isOnline() ? '' : saveDataLocally('green', sendData);
      handleClose();
      // props?.mainDrawerReload();
    }
  };
  const gelathinamelist = (async) => {
    var config = {
      method: 'post',
      url: baseURL + 'getGelathiList',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `${apikey}`,
      },
    };
    axios(config)
      .then(function (response) {
        localStorage.setItem('gelathilist', JSON.stringify(response?.data));
        setVyaapar(response?.data.list);
      })
      .catch(function (error) {
        let gelathidata = JSON.parse(localStorage.getItem('gelathilist'));
        setVyaapar(gelathidata.list);
      });
  };

  const [loader, setLoader] = useState(true);
  useEffect(() => {
    // After 3 seconds, set showCard to true to render the Card component
    const delay = 3000; // 3 seconds in milliseconds
    const timeoutId = setTimeout(() => {
      setLoader(false);
    }, delay);
  });
  const handleInputChange = (event) => {
    const { name, value } = event.target;
    console.log(name, value, 'name value ');
    setSendData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
    if (name === 'district') {
      const selectedDistrict = district.find((d) => d.name === value);
      const districtId = selectedDistrict ? selectedDistrict.id : null;
      getDistrict(value, districtId);
    }
    if (name === 'taluk') {
      const selectedTaluk = taluk.find((d) => d.name === value);
      const talukId = selectedTaluk ? selectedTaluk.id : null;
      villageList(talukId);
    }
  };
  const handleResources = (label, event) => {
    var updatedList = [...sendData[label]];
    if (event.target.checked) {
      updatedList = [...sendData[label], event.target.value];
    } else {
      updatedList.splice(sendData[label].indexOf(event.target.value), 1);
    }
    let tempData = { ...sendData };
    tempData[label] = updatedList;
    console.log(updatedList);
    setSendData(tempData);
  };
  const [states, setStates] = useState([]);
  const [district, setDistrict] = useState([]);
  const [taluk, setTaluk] = useState([]);
  const [village, setVillage] = useState([]);
  useEffect(() => {
    getState();
    casted();
  }, []);
  const getState = async (id) => {
    var data = JSON.stringify({
      country_id: '1',
      state_id: JSON.stringify(3),
    });
    var config = {
      method: 'post',
      url: baseURL + 'getLocation',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `${apikey}`,
      },
      data: data,
    };
    axios(config)
      .then(function (response) {
        setDistrict(response.data.list);
      })
      .catch(function (error) {
        // console.log(error);
      });
  };
  const getDistrict = async (district, districtId) => {
    var data = JSON.stringify({
      country_id: '1',
      state_id: JSON.stringify(3),
      district_id: JSON.stringify(districtId),
      district_name: district,
    });
    var config = {
      method: 'post',
      url: baseURL + 'getLocation',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `${apikey}`,
      },
      data: data,
    };
    axios(config)
      .then(function (response) {
        setTaluk(response.data.list);
      })
      .catch(function (error) {
        //  console.log(error);
      });
  };
  const villageList = async (taluk_id) => {
    var data = JSON.stringify({
      taluk_id: parseInt(taluk_id),
      search: '',
    });
    var config = {
      method: 'post',
      url: baseURL + 'getVillageList',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `${apikey}`,
      },
      data: data,
    };
    axios(config)
      .then(function (response) {
        setVillage(response.data.list);
      })
      .catch(function (error) {
        // console.log(error);
      });
  };
  const [cast, setCaste] = useState([]);
  const casted = (async) => {
    var config = {
      method: 'post',
      maxBodyLength: Infinity,
      url: baseURL + 'getCaste',
      headers: {
        Authorization: `${apikey}`,
      },
    };

    axios(config)
      .then(function (response) {
        setCaste(response.data?.data);
      })
      .catch(function (error) {
        // console.log(error);
      });
  };
  return (
    <div>
      {successMessage && (
        <Snackbar open={successMessage} autoHideDuration={6000} onClose={() => setsuccessMessage(false)}>
          <Alert
            onClose={() => {
              setsuccessMessage(false);
            }}
            severity="success"
            sx={{ width: '100%', backgroundColor: 'green', color: 'white' }}
          >
            {message}
          </Alert>
        </Snackbar>
      )}
      {isOnline() ? (
        <Stack style={{ position: 'absolute', right: 0, float: 'right', margin: 2, padding: 2 }} mb={2}>
          <button
            onClick={handleClickOpen}
            style={{ border: 'none', marginRight: 25, outline: 'none', background: 'transparent', cursor: 'pointer' }}
          >
            <svg xmlns="http://www.w3.org/2000/svg" color="#ff7424" width="1.5em" height="1.5em" viewBox="0 0 36 36">
              <path
                fill="currentColor"
                d="M21 12H7a1 1 0 0 1-1-1V7a1 1 0 0 1 1-1h14a1 1 0 0 1 1 1v4a1 1 0 0 1-1 1ZM8 10h12V7.94H8Z"
                class="clr-i-outline clr-i-outline-path-1"
              />
              <path
                fill="currentColor"
                d="M21 14.08H7a1 1 0 0 0-1 1V19a1 1 0 0 0 1 1h11.36L22 16.3v-1.22a1 1 0 0 0-1-1ZM20 18H8v-2h12Z"
                class="clr-i-outline clr-i-outline-path-2"
              />
              <path
                fill="currentColor"
                d="M11.06 31.51v-.06l.32-1.39H4V4h20v10.25l2-1.89V3a1 1 0 0 0-1-1H3a1 1 0 0 0-1 1v28a1 1 0 0 0 1 1h8a3.44 3.44 0 0 1 .06-.49Z"
                class="clr-i-outline clr-i-outline-path-3"
              />
              <path
                fill="currentColor"
                d="m22 19.17l-.78.79a1 1 0 0 0 .78-.79Z"
                class="clr-i-outline clr-i-outline-path-4"
              />
              <path
                fill="currentColor"
                d="M6 26.94a1 1 0 0 0 1 1h4.84l.3-1.3l.13-.55v-.05H8V24h6.34l2-2H7a1 1 0 0 0-1 1Z"
                class="clr-i-outline clr-i-outline-path-5"
              />
              <path
                fill="currentColor"
                d="m33.49 16.67l-3.37-3.37a1.61 1.61 0 0 0-2.28 0L14.13 27.09L13 31.9a1.61 1.61 0 0 0 1.26 1.9a1.55 1.55 0 0 0 .31 0a1.15 1.15 0 0 0 .37 0l4.85-1.07L33.49 19a1.6 1.6 0 0 0 0-2.27ZM18.77 30.91l-3.66.81l.89-3.63L26.28 17.7l2.82 2.82Zm11.46-11.52l-2.82-2.82L29 15l2.84 2.84Z"
                class="clr-i-outline clr-i-outline-path-6"
              />
              <path fill="none" d="M0 0h36v36H0z" />
            </svg>
          </button>
        </Stack>
      ) : (
        <Stack>
          <button
            onClick={handleClickOpen}
            style={{ border: 'none', marginRight: 25, outline: 'none', background: 'transparent', cursor: 'pointer' }}
          >
            <svg xmlns="http://www.w3.org/2000/svg" color="#ff7424" width="1.5em" height="1.5em" viewBox="0 0 36 36">
              <path
                fill="currentColor"
                d="M21 12H7a1 1 0 0 1-1-1V7a1 1 0 0 1 1-1h14a1 1 0 0 1 1 1v4a1 1 0 0 1-1 1ZM8 10h12V7.94H8Z"
                class="clr-i-outline clr-i-outline-path-1"
              />
              <path
                fill="currentColor"
                d="M21 14.08H7a1 1 0 0 0-1 1V19a1 1 0 0 0 1 1h11.36L22 16.3v-1.22a1 1 0 0 0-1-1ZM20 18H8v-2h12Z"
                class="clr-i-outline clr-i-outline-path-2"
              />
              <path
                fill="currentColor"
                d="M11.06 31.51v-.06l.32-1.39H4V4h20v10.25l2-1.89V3a1 1 0 0 0-1-1H3a1 1 0 0 0-1 1v28a1 1 0 0 0 1 1h8a3.44 3.44 0 0 1 .06-.49Z"
                class="clr-i-outline clr-i-outline-path-3"
              />
              <path
                fill="currentColor"
                d="m22 19.17l-.78.79a1 1 0 0 0 .78-.79Z"
                class="clr-i-outline clr-i-outline-path-4"
              />
              <path
                fill="currentColor"
                d="M6 26.94a1 1 0 0 0 1 1h4.84l.3-1.3l.13-.55v-.05H8V24h6.34l2-2H7a1 1 0 0 0-1 1Z"
                class="clr-i-outline clr-i-outline-path-5"
              />
              <path
                fill="currentColor"
                d="m33.49 16.67l-3.37-3.37a1.61 1.61 0 0 0-2.28 0L14.13 27.09L13 31.9a1.61 1.61 0 0 0 1.26 1.9a1.55 1.55 0 0 0 .31 0a1.15 1.15 0 0 0 .37 0l4.85-1.07L33.49 19a1.6 1.6 0 0 0 0-2.27ZM18.77 30.91l-3.66.81l.89-3.63L26.28 17.7l2.82 2.82Zm11.46-11.52l-2.82-2.82L29 15l2.84 2.84Z"
                class="clr-i-outline clr-i-outline-path-6"
              />
              <path fill="none" d="M0 0h36v36H0z" />
            </svg>
          </button>
        </Stack>
      )}
      <Dialog fullScreen open={open} onClose={handleClose} TransitionComponent={Transition}>
        <form
          onSubmit={(e) => {
            e.preventDefault();
            vyaparformdata();
          }}
        >
          <AppBar sx={{ position: 'fixed', bgcolor: '#ff7424' }}>
            <Toolbar sx={{ position: 'relative', bgcolor: '#ff7424' }}>
              <IconButton style={{ color: 'white' }} onClick={handleClose}>
                {isOnline() ? (
                  <Iconify icon="material-symbols:arrow-back-rounded" />
                ) : (
                  <div style={{ borderRadius: 5 }}>🡠</div>
                )}
              </IconButton>
              <Typography sx={{ ml: 2, flex: 1, color: 'white' }} variant="h6" component="div">
                Buzz Vyapar Program Baselines working
              </Typography>
              <Button edge="end" color="inherit" type="submit" onClick={() => {}} style={{ color: 'white' }}>
                {isOnline() ? <Iconify icon="material-symbols:save" width={30} height={30} /> : 'save'}
              </Button>
            </Toolbar>
          </AppBar>

          {loader ? (
            <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '70vh' }}>
              <CircularProgress sx={{ color: '#ff7424' }} />
            </Box>
          ) : (
            <Grid>
              <Card>
                <CardContent>
                  <SelectInput
                    id="gf_id"
                    name="gf_id"
                    label="Field associate Name "
                    kannadaLabel="ಕ್ಷೇತ್ರದ ಸಹವರ್ತಿ ಹೆಸರು"
                    required
                    onChange={handleInputChange}
                    value={sendData?.gf_id}
                    options={vyaapar}
                  />
                  <TextInput
                    id="name_of_the_vyapari"
                    placeholder="Your Answer"
                    label="Respondent’s name"
                    kannadaLabel="ಪ್ರತಿಕ್ರಿಯಿಸಿದ ವ್ಯಕ್ತಿಯ ಹೆಸರು"
                    required
                    name="name_of_the_vyapari"
                    onChange={handleInputChange}
                    value={sendData?.name_of_the_vyapari}
                  />
                  <SelectInput
                    id="district"
                    name="district"
                    label="Districts name"
                    kannadaLabel="ಜಿಲ್ಲೆಗಳ ಹೆಸರು"
                    required
                    onChange={handleInputChange}
                    value={sendData?.district}
                    options={district}
                  />
                  <SelectInput
                    id="taluk"
                    name="taluk"
                    label="Taluks name"
                    kannadaLabel="ತಾಲೂಕು ಹೆಸರು"
                    required
                    onChange={handleInputChange}
                    value={sendData?.taluk}
                    options={taluk}
                  />
                  <SelectInput
                    id="village_id"
                    name="village_id"
                    label="Village name"
                    kannadaLabel="ಗ್ರಾಮದ ಹೆಸರು"
                    required
                    onChange={handleInputChange}
                    value={sendData?.village_id}
                    options={village}
                  />
                  <TextInput
                    id="gram_panchayat"
                    placeholder="Your Answer"
                    label="Gram Panchayat"
                    kannadaLabel="ಗ್ರಾಮ ಪಂಚಾಯತ"
                    required
                    name="gram_panchayat"
                    onChange={handleInputChange}
                    value={sendData?.gram_panchayat}
                  />
                  <TextInput
                    id="contact_number"
                    name="contact_number"
                    label="Contact number ಸಂಪರ್ಕ ಸಂಖ್ಯೆ"
                    type="number"
                    required
                    maxLength={10}
                    placeholder="Your Answer"
                    onChange={handleInputChange}
                    value={sendData.contact_number}
                  />
                  <TextInput
                    id="number_of_beehives_participated"
                    name="number_of_beehives_participated"
                    label="How many beehives have you participated in? ನೀವು ಎಷ್ಟು ಜೇನುಗೂಡು ಸಭೆಗಳಲ್ಲಿ ಭಾಗವಹಿಸಿದ್ದೀರಿ?"
                    type="number"
                    required
                    maxLength={10}
                    placeholder="Your Answer"
                    onChange={handleInputChange}
                    value={sendData.number_of_beehives_participated}
                  />
                  <TextInput
                    id="number_of_people_in_the_household"
                    name="number_of_people_in_the_household"
                    label="Total number of members in your household ನಿಮ್ಮ ಮನೆಯ ಸದಸ್ಯರ ಒಟ್ಟು ಸಂಖ್ಯೆ"
                    type="number"
                    required
                    maxLength={10}
                    placeholder="Your Answer"
                    onChange={handleInputChange}
                    value={sendData.number_of_people_in_the_household}
                  />
                  <SelectInput
                    id="house"
                    name="house"
                    label="House"
                    kannadaLabel="ಮನೆ"
                    required
                    onChange={handleInputChange}
                    value={sendData?.house}
                    options={house}
                  />
                  <SelectInput
                    id="ration_card"
                    name="ration_card"
                    label="Ration card"
                    kannadaLabel="ಪಡಿತರ ಚೀಟಿ"
                    required
                    onChange={handleInputChange}
                    value={sendData?.ration_card}
                    options={rationCard}
                  />
                  <SelectInput
                    id="cast"
                    name="cast"
                    label="Caste Category"
                    kannadaLabel="ಜಾತಿ ವರ್ಗ"
                    required
                    onChange={handleInputChange}
                    value={sendData?.cast}
                    options={cast}
                  />
                  <TextInput
                    id="age"
                    name="age"
                    label="Age  ವಯಸ್ಸು"
                    type="number"
                    required
                    maxLength={2}
                    placeholder="Your Answer"
                    onChange={handleInputChange}
                    value={sendData.age}
                  />
                  <SelectInput
                    id="education"
                    name="education"
                    label="Education"
                    kannadaLabel="ಶಿಕ್ಷಣ"
                    required
                    onChange={handleInputChange}
                    value={sendData?.education}
                    options={education}
                  />
                  <TextInput
                    id="phone_number"
                    name="phone_number"
                    label="Phone Number  ದೂರವಾಣಿ ಸಂಖ್ಯೆ"
                    type="number"
                    required
                    maxLength={10}
                    placeholder="Your Answer"
                    onChange={handleInputChange}
                    value={sendData.phone_number}
                  />
                  <SelectInput
                    id="marital_status"
                    name="marital_status"
                    label="Marital Status"
                    kannadaLabel="ವೈವಾಹಿಕ ಸ್ಥಿತಿ"
                    required
                    onChange={handleInputChange}
                    value={sendData?.marital_status}
                    options={maritalStatus}
                  />
                  <SelectInput
                    id="primary_occupation_household"
                    name="primary_occupation_household"
                    label="Current Economic Activity - Primary Occupation of the Household"
                    kannadaLabel="ಪ್ರಸ್ತುತ ಆರ್ಥಿಕ ಚಟುವಟಿಕೆ - ಕುಟುಂಬದ ಪ್ರಾಥಮಿಕ ಉದ್ಯೋಗ"
                    required
                    onChange={handleInputChange}
                    value={sendData?.primary_occupation_household}
                    options={currentEconomicActivity}
                  />
                  <SelectInput
                    id="secondary_occupation_household"
                    name="secondary_occupation_household"
                    label="Secondary Occupation of the Household"
                    kannadaLabel="ಕುಟುಂಬದ ದ್ವಿತೀಯ ಉದ್ಯೋಗ"
                    required
                    onChange={handleInputChange}
                    value={sendData?.secondary_occupation_household}
                    options={secondaryOccupationHousehold}
                  />
                  <SelectInput
                    id="womens_occupation"
                    name="womens_occupation"
                    label="Women's Occupation"
                    kannadaLabel="ಮಹಿಳಾ ಉದ್ಯೋಗ"
                    required
                    onChange={handleInputChange}
                    value={sendData?.womens_occupation}
                    options={WomensOccupation}
                  />

                  <TextInput
                    id="monthly_expenditure"
                    name="monthly_expenditure"
                    label="Monthly household expenditure (in Rs) ಮಾಸಿಕ ಮನೆಯ ಖರ್ಚು (ರೂ.ಗಳಲ್ಲಿ)"
                    type="number"
                    required
                    placeholder="Your Answer"
                    onChange={handleInputChange}
                    value={sendData.monthly_expenditure}
                  />
                  <TextInput
                    id="monthly_household_income"
                    name="monthly_household_income"
                    label="Monthly household income(in Rs.) ಮಾಸಿಕ ಮನೆಯ ಆದಾಯ(ರೂ.ಗಳಲ್ಲಿ)"
                    type="number"
                    required
                    placeholder="Your Answer"
                    onChange={handleInputChange}
                    value={sendData.monthly_household_income}
                  />

                  <SelectInput
                    id="mobile_type"
                    name="mobile_type"
                    label="What mobile type you are using ನೀವು ಯಾವ ರೀತಿಯ ಮೊಬೈಲ್ ಬಳಸುತ್ತಿರುವಿರಿ"
                    required
                    onChange={handleInputChange}
                    value={sendData?.mobile_type}
                    options={phoneType}
                  />
                  <SelectInput
                    id="do_you_own_a_smart_phone"
                    name="do_you_own_a_smart_phone"
                    label="Do you have a smartphone that you individually use and not share with others?
ನೀವು ಪ್ರತ್ಯೇಕವಾಗಿ ಬಳಸುವ ಮತ್ತು ಇತರರೊಂದಿಗೆ ಹಂಚಿಕೊಳ್ಳದ ಸ್ಮಾರ್ಟ್ ಫೋನ್ ಅನ್ನು ನೀವು ಹೊಂದಿದ್ದೀರಾ?"
                    required
                    onChange={handleInputChange}
                    value={sendData?.do_you_own_a_smart_phone}
                    options={yesOrNo}
                  />

                  <TextInput
                    id="reason_for_not_having_smartphone"
                    name="reason_for_not_having_smartphone"
                    label="If no , Reason for not having a smartphone
ಇಲ್ಲದಿದ್ದರೆ, ಸ್ಮಾರ್ಟ್ ಫೋನ್ ಇಲ್ಲದಿರುವುದಕ್ಕೆ ಕಾರಣ"
                    type="text"
                    required
                    placeholder="Your Answer"
                    onChange={handleInputChange}
                    value={sendData.reason_for_not_having_smartphone}
                  />
                  <SelectInput
                    id="has_bank_account"
                    name="has_bank_account"
                    label="Do you have bank account ನೀವು ಬ್ಯಾಂಕ್ ಖಾತೆ ಹೊಂದಿದ್ದೀರಾ"
                    required
                    onChange={handleInputChange}
                    value={sendData?.has_bank_account}
                    options={yesOrNo}
                  />
                  <SelectInput
                    id="uses_upi"
                    name="uses_upi"
                    label="Do you use UPI ನೀವು UPI ಬಳಸುತ್ತೀರಾ"
                    required
                    onChange={handleInputChange}
                    value={sendData?.uses_upi}
                    options={yesOrNo}
                  />
                  <SelectInput
                    id="underwent_skill_development_program"
                    name="underwent_skill_development_program"
                    label="Have you undergone any skill development program?
ನೀವು ಯಾವುದಾದರೂ ಕೌಶಲ್ಯ ಅಭಿವೃದ್ಧಿ ಕಾರ್ಯಕ್ರಮಕ್ಕೆ ಭಾವವಾಹಿಸಿದ್ಧಿರ ?"
                    required
                    onChange={handleInputChange}
                    value={sendData?.underwent_skill_development_program}
                    options={yesOrNo}
                  />
                  <SelectInput
                    id="skills_gained_from_program"
                    name="skills_gained_from_program"
                    label="if Yes, what skills have you gained?
ಹೌದು ಎಂದಾದರೆ, ನೀವು ಯಾವ ಕೌಶಲ್ಯಗಳನ್ನು ಗಳಿಸಿದ್ದೀರಿ?"
                    required
                    onChange={handleInputChange}
                    value={sendData?.skills_gained_from_program}
                    options={whatskillshaveyougained}
                  />
                  <SelectInput
                    id="enterprise_status"
                    name="enterprise_status"
                    label="What is the status of your enterprise? ನಿಮ್ಮ ಉದ್ಯಮದ ಸ್ಥಿತಿ ಏನು?"
                    required
                    onChange={handleInputChange}
                    value={sendData?.enterprise_status}
                    options={statusofyourenterprise}
                  />
                  <Card
                    style={{ marginTop: 40, backgroundColor: '#F6F8FB', borderRadius: 20 }}
                    hidden={
                      sendData?.enterprise_status ===
                      'I am planning to start an enterprise soon ನಾನು ಶೀಘ್ರದಲ್ಲೇ ಉದ್ಯಮವನ್ನು ಪ್ರಾರಂಭಿಸಲು ಯೋಜಿಸುತ್ತಿದ್ದೇನೆ'
                        ? true
                        : false
                    }
                  >
                    <CardContent>
                      <Typography
                        style={{ color: '#ff7424', textAlign: 'center', paddingBottom: '20px', fontSize: '20px' }}
                      >
                        I run an enterprise currently/ I used to run an enterprise ask these ನಾನು ಪ್ರಸ್ತುತ ಉದ್ಯಮವನ್ನು
                        ನಡೆಸುತ್ತಿದ್ದೇನೆ/ ನಾನು ಉದ್ಯಮವನ್ನು ನಡೆಸುತ್ತಿದ್ದೆ ಎಂಬ ಉತ್ತರವು ಇವುಗಳನ್ನು ಕೇಳಿ
                      </Typography>
                      <SelectInput
                        card={false}
                        id="type_of_enterprise_running"
                        name="type_of_enterprise_running"
                        label="What kind of enterprise do you run?
ನೀವು ಯಾವ ರೀತಿಯ ಉದ್ಯಮವನ್ನು ನಡೆಸುತ್ತೀರಿ?"
                        required
                        onChange={handleInputChange}
                        value={sendData?.type_of_enterprise_running}
                        options={Whatkindofenterprisedoyourun}
                      />
                      <SelectInput
                        card={false}
                        id="run_enterprise_independently"
                        name="run_enterprise_independently"
                        label="Are you running the enterprise on your own?
ನೀವು ಸ್ವಂತವಾಗಿ ಉದ್ಯಮವನ್ನು ನಡೆಸುತ್ತಿದ್ದೀರಾ?"
                        required
                        onChange={handleInputChange}
                        value={sendData?.run_enterprise_independently}
                        options={Areyourunningtheenterpriseonyourown}
                      />
                      <TextInput
                        card={false}
                        id="average_monthly_income_enterprise"
                        name="average_monthly_income_enterprise"
                        label="What is the average monthly income of your enterprise? (Rs)
ನಿಮ್ಮ ಉದ್ಯಮದ ಸರಾಸರಿ ಮಾಸಿಕ ಆದಾಯ ಎಷ್ಟು? (ರೂ)"
                        type="number"
                        placeholder="Your Answer"
                        onChange={handleInputChange}
                        value={sendData.average_monthly_income_enterprise}
                      />
                      <TextInput
                        card={false}
                        id="average_monthly_profit_enterprise"
                        name="average_monthly_profit_enterprise"
                        label="What is the average monthly profit of your enterprise? (Rs)
ನಿಮ್ಮ ಉದ್ಯಮದ ಸರಾಸರಿ ಮಾಸಿಕ ಲಾಭ ಎಷ್ಟು? (ರೂ)"
                        type="number"
                        required
                        placeholder="Your Answer"
                        onChange={handleInputChange}
                        value={sendData.average_monthly_profit_enterprise}
                      />
                      <TextInput
                        card={false}
                        id="desired_monthly_income"
                        name="desired_monthly_income"
                        label="How much monthly income would you like to ideally earn?
ನೀವು ಆದರ್ಶಪ್ರಾಯವಾಗಿ ಎಷ್ಟು ಮಾಸಿಕ ಆದಾಯವನ್ನುಗಳಿಸಲು ಬಯಸುತ್ತೀರಿ?"
                        type="number"
                        required
                        placeholder="Your Answer"
                        onChange={handleInputChange}
                        value={sendData.desired_monthly_income}
                      />
                      <TextInput
                        card={false}
                        id="amount_invested_when_the_business_started"
                        name="amount_invested_when_the_business_started"
                        label="Amount invested when the business started (approximately if they know)
ವ್ಯಾಪಾರ ಪ್ರಾರಂಭವಾದಾಗ ಹೂಡಿಕೆ ಮಾಡಿದ ಮೊತ್ತ (ಅಂದಾಜು ಅವರು ತಿಳಿದಿದ್ದರೆ)"
                        type="number"
                        required
                        placeholder="Your Answer"
                        onChange={handleInputChange}
                        value={sendData.amount_invested_when_the_business_started}
                      />
                      <SelectInput
                        card={false}
                        id="investment_source"
                        name="investment_source"
                        label="Where did you get the investment to start your business?
ನಿಮ್ಮ ವ್ಯಾಪಾರವನ್ನು ಪ್ರಾರಂಭಿಸಲು ನೀವು ಹೂಡಿಕೆಯನ್ನು ಎಲ್ಲಿ ಪಡೆದುಕೊಂಡಿದ್ದೀರಿ?"
                        required
                        onChange={handleInputChange}
                        value={sendData?.investment_source}
                        options={Wheredidyougettheinvestmenttostartyourbusiness}
                      />
                      <SelectInput
                        card={false}
                        id="number_of_years_the_business_has_been_operating"
                        name="number_of_years_the_business_has_been_operating"
                        label="Number of years the business has been operating
ಎಷ್ಟು ವರ್ಷದಿಂದ ವ್ಯಾಪಾರವನ್ನು ನಿರ್ವಹಿಸುತಿದ್ಧಿರ"
                        required
                        onChange={handleInputChange}
                        value={sendData?.number_of_years_the_business_has_been_operating}
                        options={Numberofyearsthebusinesshasbeenoperating}
                      />
                      <SelectInput
                        card={false}
                        id="has_hired_employees"
                        name="has_hired_employees"
                        label="If you are currently running a business, do you have employees you have hired?
ನೀವು ಪ್ರಸ್ತುತ ವ್ಯಾಪಾರವನ್ನು ನಡೆಸುತ್ತಿದ್ದರೆ,ವ್ಯಾಪಾರ ನಿರ್ವಹಣೆ ಮಾಡಲು ನೌಕರರನ್ನು ಹೊಂದಿದ್ಧೀರ?"
                        required
                        onChange={handleInputChange}
                        value={sendData?.has_hired_employees}
                        options={yesOrNo}
                      />
                      <SelectInput
                        card={false}
                        id="number_of_paid_workers"
                        name="number_of_paid_workers"
                        label="How many paid workers do you have?
ನಿಮ್ಮಲ್ಲಿ ಎಷ್ಟು ಸಂಬಳದ ಕೆಲಸಗಾರರಿದ್ದಾರೆ?"
                        required
                        onChange={handleInputChange}
                        value={sendData?.number_of_paid_workers}
                        options={Howmanypaidworkersdoyouhave}
                      />
                      <SelectInput
                        card={false}
                        id="why_do_you_do_business"
                        name="why_do_you_do_business"
                        label="Why do you do business?
ನೀವು ಯಾಕೆ ವ್ಯಾಪಾರ ಮಾಡುತ್ತೀರಿ?"
                        required
                        onChange={handleInputChange}
                        value={sendData?.why_do_you_do_business}
                        options={Whydoyoudobusiness}
                      />
                      <MultipleChoice
                        card={false}
                        label="What are your aspirations as an entrepreneur?
ಉದ್ಯಮಿಯಾಗಿ ನಿಮ್ಮ ಆಕಾಂಕ್ಷೆಗಳೇನು?"
                        name="entrepreneurial_aspirations"
                        required
                        handleResources={handleResources}
                        options={Whatareyouraspirationsasanentrepreneur}
                      />
                      <SelectInput
                        card={false}
                        id="maintain_daily_financial_books"
                        name="maintain_daily_financial_books"
                        label="Do you maintain daily financial books post training ?
ತರಬೇತಿಯ ನಂತರ ನೀವು ದೈನಂದಿನ ಹಣಕಾಸು ಪುಸ್ತಕಗಳನ್ನು ನಿರ್ವಹಿಸುತ್ತೀರಾ?"
                        required
                        onChange={handleInputChange}
                        value={sendData?.maintain_daily_financial_books}
                        options={yesOrNo}
                      />
                      <SelectInput
                        card={false}
                        id="frequency_of_recording_financial_books"
                        name="frequency_of_recording_financial_books"
                        label="If yes,How often do you write these records?
ಹೌದು ಎಂದಾದರೆ, ಈ ದಾಖಲೆಗಳನ್ನು ನೀವು ಎಷ್ಟು ಬಾರಿ ಬರೆಯುತ್ತೀರಿ?"
                        required
                        onChange={handleInputChange}
                        value={sendData?.frequency_of_recording_financial_books}
                        options={Howoftendoyouwritetheserecords}
                      />
                      <MultipleChoice
                        card={false}
                        label="How do you keep these accounts?
ಈ ಖಾತೆಗಳನ್ನು ನೀವು ಹೇಗೆ ಇಟ್ಟುಕೊಳ್ಳುತ್ತೀರಿ?"
                        name="method_of_keeping_accounts"
                        required
                        handleResources={handleResources}
                        options={Howdoyoukeeptheseaccounts}
                      />
                      <SelectInput
                        card={false}
                        id="reason_for_not_bookkeeping"
                        name="reason_for_not_bookkeeping"
                        label="If not, what is the reason for not bookkeeping?
ಇಲ್ಲದಿದ್ದರೆ, ಪುಸ್ತಕ ನಿರ್ವಹಣೆ ಮಾಡದಿರಲು ಕಾರಣವೇನು?"
                        required
                        onChange={handleInputChange}
                        value={sendData?.reason_for_not_bookkeeping}
                        options={whatisthereasonfornotbookkeeping}
                      />
                      <SelectInput
                        card={false}
                        id="do_you_have_a_business_plan_to_reach_that_goal"
                        name="do_you_have_a_business_plan_to_reach_that_goal"
                        label="Do you have a business goal/ plan?
ನೀವು ವ್ಯಾಪಾರದ ಗುರಿ/ಯೋಜನೆಯನ್ನು ಹೊಂದಿದ್ದೀರಾ?"
                        required
                        onChange={handleInputChange}
                        value={sendData?.do_you_have_a_business_plan_to_reach_that_goal}
                        options={yesOrNo}
                      />
                      <SelectInput
                        card={false}
                        id="maintain_detailed_business_plan"
                        name="maintain_detailed_business_plan"
                        label="Do you maintain a detailed business plan for your business ?
ನಿಮ್ಮ ವ್ಯಾಪಾರಕ್ಕಾಗಿ ನೀವು ವಿವರವಾದ ವ್ಯಾಪಾರ ಯೋಜನೆಯನ್ನು ನಿರ್ವಹಿಸುತ್ತೀರಾ?"
                        required
                        onChange={handleInputChange}
                        value={sendData?.maintain_detailed_business_plan}
                        options={yesOrNo}
                      />
                      <TextInput
                        card={false}
                        id="short_term_goal"
                        name="short_term_goal"
                        label="What is your short term goal for your business?
ನಿಮ್ಮ ವ್ಯಾಪಾರಕ್ಕಾಗಿ ನಿಮ್ಮ ಅಲ್ಪಾವಧಿಯ ಗುರಿ ಏನು?"
                        type="number"
                        required
                        placeholder="Your Answer"
                        onChange={handleInputChange}
                        value={sendData.short_term_goal}
                      />
                      <SelectInput
                        card={false}
                        id="loan_taken"
                        name="loan_taken"
                        label="Have you taken any loans for business?
ನೀವು ವ್ಯಾಪಾರಕ್ಕಾಗಿ ಯಾವುದಾದರೂ ಸಾಲವನ್ನು ತೆಗೆದುಕೊಂಡಿದ್ದೀರಾ?"
                        required
                        onChange={handleInputChange}
                        value={sendData?.loan_taken}
                        options={yesOrNo}
                      />
                      <SelectInput
                        card={false}
                        id="loan_source"
                        name="loan_source"
                        label="If yes, From where have you taken it? What is the interest rate?
ಹೌದು ಎಂದಾದರೆ, ನೀವು ಸಾಲವನ್ನು ಎಲ್ಲಿಂದ ತೆಗೆದುಕೊಂಡಿದ್ದೀರಿ? ಬಡ್ಡಿ ದರ ಎಷ್ಟು?"
                        required
                        onChange={handleInputChange}
                        value={sendData?.loan_source}
                        options={Fromwherehaveyoutakenit}
                      />
                      <TextInput
                        card={false}
                        id="interest_rate"
                        name="interest_rate"
                        label="What is the interest rate? ಬಡ್ಡಿ ದರ ಎಷ್ಟು?"
                        type="number"
                        required
                        placeholder="Your Answer"
                        onChange={handleInputChange}
                        value={sendData.interest_rate}
                      />
                      <SelectInput
                        card={false}
                        id="loan_purpose"
                        name="loan_purpose"
                        label="If yes,what is the purpose of bank loans
ಹೌದು ಎಂದಾದರೆ, ಬ್ಯಾಂಕ್ ಸಾಲದ ಉದ್ದೇಶವೇನು"
                        required
                        onChange={handleInputChange}
                        value={sendData?.loan_purpose}
                        options={whatisthepurposeofbankloans}
                      />
                      <SelectInput
                        card={false}
                        id="run_growth_challenges"
                        name="run_growth_challenges"
                        label="What are your challenges in running and growing your business ?
ನಿಮ್ಮ ವ್ಯಾಪಾರವನ್ನು ನಡೆಸುವಲ್ಲಿ ಮತ್ತು ಬೆಳೆಸುವಲ್ಲಿ ನಿಮ್ಮ ಸವಾಲುಗಳೇನು?"
                        required
                        onChange={handleInputChange}
                        value={sendData?.run_growth_challenges}
                        options={challengesinrunningandgrowingyourbusiness}
                      />
                      <TextInput
                        card={false}
                        id="what_are_the_strengths_of_your_business"
                        name="what_are_the_strengths_of_your_business"
                        label="State one strength of your business ನಿಮ್ಮ ವ್ಯಾಪಾರದ ಒಂದು ಬಲವನ್ನು ತಿಳಿಸಿ"
                        type="text"
                        required
                        placeholder="Your Answer"
                        onChange={handleInputChange}
                        value={sendData.what_are_the_strengths_of_your_business}
                      />
                      <TextInput
                        card={false}
                        id="what_are_the_weaknesses_of_your_business"
                        name="what_are_the_weaknesses_of_your_business"
                        label="State one weakness of the business ವ್ಯಾಪಾರದ ಒಂದು ದೌರ್ಬಲ್ಯವನ್ನು ತಿಳಿಸಿ"
                        type="text"
                        required
                        placeholder="Your Answer"
                        onChange={handleInputChange}
                        value={sendData.what_are_the_weaknesses_of_your_business}
                      />
                      <TextInput
                        card={false}
                        id="core_opportunity"
                        name="core_opportunity"
                        label="State one opportunity for your business ನಿಮ್ಮ ವ್ಯಾಪಾರದ ಒಂದು ಅವಕಾಶವನ್ನು ತಿಳಿಸಿ"
                        type="text"
                        required
                        placeholder="Your Answer"
                        onChange={handleInputChange}
                        value={sendData.core_opportunity}
                      />
                      <TextInput
                        card={false}
                        id="core_threat"
                        name="core_threat"
                        label="State one threat for your business ನಿಮ್ಮ ವ್ಯಾಪಾರಕ್ಕೆ ಒಂದು ಬೆದರಿಕೆಯನ್ನು ತಿಳಿಸಿ"
                        type="text"
                        required
                        placeholder="Your Answer"
                        onChange={handleInputChange}
                        value={sendData.core_threat}
                      />
                      <TextInput
                        card={false}
                        id="target_customer"
                        name="target_customer"
                        label="Who is your target customer? Describe ನಿಮ್ಮ ಗುರಿಯಲ್ಲಿರುವ ಗ್ರಾಹಕ ಯಾರು? ವಿವರಿಸಿ"
                        type="text"
                        required
                        placeholder="Your Answer"
                        onChange={handleInputChange}
                        value={sendData.target_customer}
                      />
                    </CardContent>
                  </Card>

                  <Card
                    style={{ marginTop: 40, backgroundColor: '#F6F8FB', borderRadius: 20 }}
                    hidden={
                      sendData?.enterprise_status ===
                      'Yes, I run an enterprise currently ಹೌದು ನಾನು ಪ್ರಸ್ತುತ ಎಂಟರ್‌ಪ್ರೈಸ್ ನಡೆಸುತ್ತಿದ್ದೇನೆ'
                        ? true
                        : false
                    }
                  >
                    <CardContent>
                      <Typography
                        style={{ color: '#ff7424', textAlign: 'center', paddingBottom: '20px', fontSize: '20px' }}
                      >
                        I am planning to start an enterprise ಉತ್ತರವಾದರೆ, ನಾನು ಉದ್ಯಮವನ್ನು ಪ್ರಾರಂಭಿಸಲು ಯೋಜಿಸುತ್ತಿದ್ದೇನೆ
                      </Typography>
                      <TextInput
                        card={false}
                        id="own_account_work"
                        name="own_account_work"
                        label="During the last 1 year, have you worked on your own account or in a business enterprise belonging to you for example, trader, shopkeeper, tailoring, etc. at least for two hours in any day?
ಕಳೆದ 1 ವರ್ಷದಲ್ಲಿ, ನೀವು ನಿಮ್ಮ ಸ್ವಂತ ಖಾತೆಯಲ್ಲಿ ಅಥವಾ ನಿಮಗೆ ಸೇರಿದ ವ್ಯಾಪಾರ ಉದ್ಯಮದಲ್ಲಿ ಉದಾಹರಣೆಗೆ, ವ್ಯಾಪಾರಿ, ಅಂಗಡಿಯವನು, ಟೈಲರಿಂಗ್, ಇತ್ಯಾದಿ. ಯಾವುದೇ ದಿನದಲ್ಲಿ ಕನಿಷ್ಠ ಎರಡು ಗಂಟೆಗಳ ಕಾಲ ಕೆಲಸ ಮಾಡಿದ್ದೀರಾ?"
                        type="text"
                        placeholder="Your Answer"
                        onChange={handleInputChange}
                        value={sendData.own_account_work}
                      />

                      <SelectInput
                        card={false}
                        id="idea_status"
                        name="idea_status"
                        label="Do you have a business idea you want to work on?
ನೀವು ಕೆಲಸ ಮಾಡಲು ಬಯಸುವ ವ್ಯಾಪಾರ ಕಲ್ಪನೆಯನ್ನು ನೀವು ಹೊಂದಿದ್ದೀರಾ?"
                        onChange={handleInputChange}
                        value={sendData?.idea_status}
                        options={yesOrNo}
                      />
                      <SelectInput
                        card={false}
                        id="idea_start"
                        name="idea_start"
                        label="Since when have you had the idea of starting business ? ವ್ಯಾಪಾರ ಆರಂಭಿಸುವ ಯೋಚನೆ ಯಾವಾಗಿನಿಂದ ಬಂತು?"
                        onChange={handleInputChange}
                        value={sendData?.idea_start}
                        options={whenhaveyouhadtheideaofstartingbusiness}
                      />
                      <SelectInput
                        card={false}
                        id="idea_category"
                        name="idea_category"
                        label="What category does your business idea fall in? ನಿಮ್ಮ ವ್ಯಾಪಾರ ಕಲ್ಪನೆಯು ಯಾವ ವರ್ಗಕ್ಕೆ ಸೇರುತ್ತದೆ?"
                        onChange={handleInputChange}
                        value={sendData?.idea_category}
                        options={Whatcategorydoesyourbusinessideafallin}
                      />
                      <TextInput
                        card={false}
                        id="monthly_income"
                        name="monthly_income"
                        label="How much monthly income would you like to ideally earn?
ನೀವು ಆದರ್ಶಪ್ರಾಯವಾಗಿ ಎಷ್ಟು ಮಾಸಿಕ ಆದಾಯವನ್ನು ಗಳಿಸಲು ಬಯಸುತ್ತೀರಿ?"
                        type="number"
                        placeholder="Your Answer"
                        onChange={handleInputChange}
                        value={sendData.monthly_income}
                      />
                      <SelectInput
                        card={false}
                        id="money_management"
                        name="money_management"
                        label="Do you like to manage money and keep track of incomes and expenses?
ನೀವು ಹಣವನ್ನು ನಿರ್ವಹಿಸಲು ಹಾಗೂ ಆದಾಯ ಮತ್ತು ವೆಚ್ಚಗಳನ್ನು ಟ್ರ್ಯಾಕ್ ಮಾಡಲು ಇಷ್ಟಪಡುತ್ತೀರಾ?"
                        onChange={handleInputChange}
                        value={sendData?.money_management}
                        options={yesOrNo}
                      />
                      <SelectInput
                        card={false}
                        id="do_bookkeeping"
                        name="do_bookkeeping"
                        label="Do you practice book keeping?
ನೀವು ಪುಸ್ತಕ ನಿರ್ವಹಣೆ ಮಾಡುವ ಅಭ್ಯಾಸ ಇದೆಯೇ?"
                        onChange={handleInputChange}
                        value={sendData?.do_bookkeeping}
                        options={yesOrNo}
                      />
                      <SelectInput
                        card={false}
                        id="loan_exists"
                        name="loan_exists"
                        label="Do you have any existing loan in your name?
                        ನಿಮ್ಮ ಹೆಸರಿನಲ್ಲಿ ಯಾವುದಾದರೂ ಸಾಲ ಅಸ್ತಿತ್ವದಲ್ಲಿದೆಯೇ ?"
                        onChange={handleInputChange}
                        value={sendData?.loan_exists}
                        options={yesOrNo}
                      />
                      <SelectInput
                        card={false}
                        id="savings_available"
                        name="savings_available"
                        label="Do you currently have personal savings that you could invest into a new enterprise now?
                        ನೀವು ಈಗ ಹೊಸ ಉದ್ಯಮದಲ್ಲಿ ಹೂಡಿಕೆ ಮಾಡಲು ,ಪ್ರಸ್ತುತ ವೈಯಕ್ತಿಕ ಉಳಿತಾಯವನ್ನು ಹೊಂದಿದ್ದೀರಾ?"
                        onChange={handleInputChange}
                        value={sendData?.savings_available}
                        options={yesOrNo}
                      />
                      <SelectInput
                        card={false}
                        id="loan_startup"
                        name="loan_startup"
                        label="Are you willing to take a loan to start a new business?
ನೀವು ಹೊಸ ವ್ಯಾಪಾರವನ್ನು ಪ್ರಾರಂಭಿಸಲು ಸಾಲವನ್ನು ತೆಗೆದುಕೊಳ್ಳಲು ಸಿದ್ಧರಿದ್ದೀರಾ?"
                        onChange={handleInputChange}
                        value={sendData?.loan_startup}
                        options={yesOrNo}
                      />
                    </CardContent>
                  </Card>
                </CardContent>
              </Card>
            </Grid>
          )}
          {/* } */}
        </form>
      </Dialog>
    </div>
  );
}
