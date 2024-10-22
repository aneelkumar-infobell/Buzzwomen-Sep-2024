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
import MultipleChoice from 'src/components/MultipleChoice';
import {
  attended_gram_sabha,
  Can_you_go_to_these_places_alone,
  casteCategory,
  education,
  go_to_these_places_without_asking_permission_of_your_husband_or_a_senior_family_member,
  Gram_Samsad_is_being_organized,
  house,
  How_did_you_apply_for_it,
  How_frequently_do_you_discuss_politics_with_people_outside_of_your_family,
  How_often_do_you_approach_them_for_resolving_an_issue,
  identifications_cards,
  If_never_why_dont_you_discuss_politics,
  likelihoods,
  maritalStatus,
  most_important_sources_for_information_about_what_the_government_is_doing,
  never_approach_the_panchayat_members_What_are_the_reasons_for_that,
  Primary_occupations,
  rationCard,
  reasonsForVoting,
  religion,
  roof,
  Secondary_occupation,
  top_3_problems_in_your_village,
  What_do_you_do_in_Gram_Sabha,
  What_is_the_total_budget_spend_in_your_panchayat,
  Which_of_the_following_statements_do_you_agree_with,
  Why_dont_you_attend_Gram_sabha,
  yesNoDontKnow,
  yesOrNo,
} from './nagarika/NagarikaSurveyOption';
const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

export default function NagarikaForm({ itm, changeState, componentreloadmethod }) {
  const { apikey } = useAuth();
  const [open, setOpen] = React.useState(false);
  const [successMessage, setsuccessMessage] = useState(false);
  const [vyaapar, setVyaapar] = useState('');
  const [sendData, setSendData] = useState({
    participant_id: itm?.gelathi_id,
    gelathi_id: '',
    profile_of_the_women: '',
    unique_identification_number_given_after_completion_of_ss: '',
    surveyors_name: '',
    respondents_name: '',
    district_taluk: '',
    if_tumkur: '',
    if_kolar: '',
    gram_panchayat: '',
    village_name: '',
    total_number_of_members_in_your_household: '',
    house: '',
    roof: '',
    ration_card: '',
    caste_category: '',
    sub_caste_name: '',
    religion: '',
    age: '',
    marital_status: '',
    highest_level_of_education_completed: '',
    primary_occupation: '',
    secondary_occupation: '',
    monthly_household_expenditure: '',
    monthly_household_income: '',
    are_you_the_sole_earning_member_of_your_family: '',
    migration_profile: '',
    has_anyone_in_your_household_migrated_last_1_year_for_work: '',
    does_the_migrant_member_send_remittances_to_the_household: '',
    civic_muscle: '',
    are_you_part_of_an_shg: '',
    do_you_have_any_of_these_identification_cards: '',
    how_did_you_apply_for_it: '',
    have_you_personally_applied_for_any_of_the_entitlement_schemes: '',
    what_scheme_did_you_apply_for: '',
    were_you_successful_in_getting_approval_for_the_scheme: '',
    if_you_were_not_successful_in_applying_for_the_scheme_why_not: '',
    will_cooperate_with_your_village_people_to_get_facility_putup: '',
    community_engagement: '',
    can_you_identify_top_3_problems_in_your_village: [],
    do_you_think_you_can_help_solve_these_problems: '',
    if_yes_how_do_you_think_you_can_help_solve_these_problems: '',
    if_no_why_do_you_think_you_cannot_help_solve_these_problems: '',
    do_you_think_every_village_has_same_or_similar_issues: '',
    do_you_vote: '',
    why_do_you_vote: '',
    if_no_why_dont_you_vote: '',
    do_you_attend_gram_sabha_regularly: '',
    when_was_the_last_time_you_attended_gram_sabha: '',
    how_do_you_know_when_gram_sabha_is_being_organized: '',
    what_do_you_do_in_gram_sabha: [],
    why_dont_you_attend_gram_sabha: '',
    do_you_know_who_your_panchayat_members_are: '',
    how_often_do_you_approach_them_for_resolving_an_issue: '',
    if_they_rarely_or_never_approach_panchayat_members_why: '',
    what_is_the_total_budget_spent_in_your_panchayat: '',
    as_a_citizen_i_have_rights: '',
    as_a_citizen_i_have_duties_to_make_governance_process_better: '',
    mobility_confidence_of_women: '',
    how_frequently_do_you_discuss_politics_with_people: '',
    if_never_why_dont_you_discuss_politics: '',
    did_you_try_to_get_people_together_to_solve_problem_in_community: '',
    can_you_go_to_these_places_without_permission_fromfamily_member: [],
    can_you_go_to_these_places_alone: [],
    what_are_your_most_imp_sources_for_information_about_government: [],
    which_of_the_following_statements_do_you_agree_with: '',
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
    const existingData = localStorage.getItem('nagarika');
    const parsedData = existingData ? JSON.parse(existingData) : [];
    const newData = { ...data }; // Replace with your own data object
    parsedData.push(newData);
    const updatedData = JSON.stringify(parsedData);
    localStorage.setItem('nagarika', updatedData);
    // componentreloadmethod();
  };
  // Get data from local
  const [isFormPresentLocally, setIsFormPresentLocally] = useState(false);
  const localStorageData = localStorage.getItem('nagarika');
  useEffect(() => {
    const existingData = localStorage.getItem('nagarika');
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
  const data1 = localStorage.getItem('nagarika');
  const getDataLocally = (key) => {
    const data = localStorage.getItem('nagarika');
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
      sendData.participant_id = sendData.participant_id.toString();
      var config = {
        method: 'post',
        url: baseURL + 'addnagarikaprogram',
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
          localStorage.removeItem('nagarika');
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
          saveDataLocally('nagarika', sendData);
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
                Nagarika Program
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
                    id="gelathi_id"
                    name="gelathi_id"
                    label="Field associate Name "
                    kannadaLabel="ಕ್ಷೇತ್ರದ ಸಹವರ್ತಿ ಹೆಸರು"
                    required
                    onChange={handleInputChange}
                    value={sendData?.gelathi_id}
                    options={vyaapar}
                  />
                  <TextInput
                    id="profile_of_the_women"
                    placeholder="Your Answer"
                    label="Profile of the women    ಮಹಿಳೆಯರ ವಿವರ"
                    kannadaLabel=""
                    required
                    name="profile_of_the_women"
                    onChange={handleInputChange}
                    value={sendData?.profile_of_the_women}
                  />
                  <TextInput
                    id="surveyors_name"
                    placeholder="Your Answer"
                    label="Surveyor's Name    ಸಮೀಕ್ಷಕರ  ಹೆಸರು"
                    kannadaLabel=""
                    required
                    name="surveyors_name"
                    onChange={handleInputChange}
                    value={sendData?.surveyors_name}
                  />
                  <TextInput
                    id="respondents_name"
                    placeholder="Your Answer"
                    label="Respondent’s name ಪ್ರತಿಕ್ರಿಯಿಸಿದವರ ಹೆಸರು "
                    kannadaLabel=""
                    required
                    name="respondents_name"
                    onChange={handleInputChange}
                    value={sendData?.respondents_name}
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
                    id="village_name"
                    name="village_name"
                    label="Village name"
                    kannadaLabel="ಗ್ರಾಮದ ಹೆಸರು"
                    required
                    onChange={handleInputChange}
                    value={sendData?.village_name}
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
                    id="total_number_of_members_in_your_household"
                    name="total_number_of_members_in_your_household"
                    label="Total number of members in your household ನಿಮ್ಮ ಮನೆಯ ಸದಸ್ಯರ ಒಟ್ಟು ಸಂಖ್ಯೆ"
                    type="number"
                    required
                    placeholder="Your Answer"
                    onChange={handleInputChange}
                    value={sendData.total_number_of_members_in_your_household}
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
                    id="roof"
                    name="roof"
                    label="Roof:    ಛಾವಣಿ: "
                    kannadaLabel=""
                    required
                    onChange={handleInputChange}
                    value={sendData?.roof}
                    options={roof}
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
                    id="caste_category"
                    name="caste_category"
                    label="Caste Category"
                    kannadaLabel="ಜಾತಿ ವರ್ಗ"
                    required
                    onChange={handleInputChange}
                    value={sendData?.caste_category}
                    options={casteCategory}
                  />
                  <TextInput
                    id="sub_caste_name"
                    name="sub_caste_name"
                    label="Sub-caste name   ಉಪಜಾತಿ ಹೆಸರು"
                    required
                    placeholder="Your Answer"
                    onChange={handleInputChange}
                    value={sendData.sub_caste_name}
                  />
                  <SelectInput
                    id="religion"
                    name="religion"
                    label="Religion   ಧರ್ಮ"
                    kannadaLabel=""
                    required
                    onChange={handleInputChange}
                    value={sendData?.religion}
                    options={religion}
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
                    id="highest_level_of_education_completed"
                    name="highest_level_of_education_completed"
                    label="Highest level of education completed  
ಉನ್ನತ ಮಟ್ಟದ ಶಿಕ್ಷಣವನ್ನು ಪೂರ್ಣಗೊಳಿಸಲಾಗಿದೆ "
                    kannadaLabel=""
                    required
                    onChange={handleInputChange}
                    value={sendData?.highest_level_of_education_completed}
                    options={education}
                  />

                  <SelectInput
                    id="primary_occupation"
                    name="primary_occupation"
                    label="Primary occupation (the work that you engage in for more than 6 months in a year)
ಪ್ರಾಥಮಿಕ ಉದ್ಯೋಗ (ಒಂದು ವರ್ಷದಲ್ಲಿ 6 ತಿಂಗಳಿಗಿಂತ ಹೆಚ್ಚು ಕಾಲ ನೀವು ತೊಡಗಿಸಿಕೊಂಡಿರುವ ಕೆಲಸ)"
                    kannadaLabel=""
                    required
                    onChange={handleInputChange}
                    value={sendData?.primary_occupation}
                    options={Primary_occupations}
                  />
                  <SelectInput
                    id="secondary_occupation"
                    name="secondary_occupation"
                    label="Secondary occupation
(the work that you engage in for extra income) ದ್ವಿತೀಯಕ ಉದ್ಯೋಗ
(ಹೆಚ್ಚುವರಿ ಆದಾಯಕ್ಕಾಗಿ ನೀವು ತೊಡಗಿಸಿಕೊಳ್ಳುವ ಕೆಲಸ)"
                    kannadaLabel=""
                    required
                    onChange={handleInputChange}
                    value={sendData?.secondary_occupation}
                    options={Secondary_occupation}
                  />

                  <TextInput
                    id="monthly_household_expenditure"
                    name="monthly_household_expenditure"
                    label="Monthly household expenditure (in Rs)   
ಮಾಸಿಕ ಮನೆಯ ಖರ್ಚು (ರೂ.ಗಳಲ್ಲಿ)"
                    type="number"
                    required
                    placeholder="Your Answer"
                    onChange={handleInputChange}
                    value={sendData.monthly_household_expenditure}
                  />
                  <TextInput
                    id="monthly_household_income"
                    name="monthly_household_income"
                    label="Monthly household income(in Rs.)   
ಮಾಸಿಕ ಮನೆಯ ಆದಾಯ(ರೂ.ಗಳಲ್ಲಿ)"
                    type="number"
                    required
                    placeholder="Your Answer"
                    onChange={handleInputChange}
                    value={sendData.monthly_household_income}
                  />

                  <SelectInput
                    id="are_you_the_sole_earning_member_of_your_family"
                    name="are_you_the_sole_earning_member_of_your_family"
                    label="Are you the sole earning member of your family?   
ನಿಮ್ಮ ಕುಟುಂಬದ ಏಕೈಕ ಗಳಿಕೆಯ ಸದಸ್ಯರಾಗಿದ್ದೀರಾ? 
- ನೀವು ಕುಟುಂಬದಲ್ಲಿ ಗಳಿಸುವ ಏಕೈಕ ಸದಸ್ಯರೇ?"
                    required
                    onChange={handleInputChange}
                    value={sendData?.are_you_the_sole_earning_member_of_your_family}
                    options={yesOrNo}
                  />
                  <TextInput
                    id="migration_profile"
                    name="migration_profile"
                    label="Migration profile   ವಲಸೆ ಪ್ರೊಫೈಲ್"
                    required
                    placeholder="Your Answer"
                    onChange={handleInputChange}
                    value={sendData.migration_profile}
                  />

                  <SelectInput
                    id="has_anyone_in_your_household_migrated_last_1_year_for_work"
                    name="has_anyone_in_your_household_migrated_last_1_year_for_work"
                    label="Has anyone in your household migrated in the last 1 year for work? 
ನಿಮ್ಮ ಮನೆಯಲ್ಲಿ ಯಾರಾದರೂ ಕೆಲಸಕ್ಕಾಗಿ ಕಳೆದ 1 ವರ್ಷದಲ್ಲಿ ವಲಸೆ ಹೋಗಿದ್ದಾರೆಯೇ? ಹೌದು ಅಲ್ಲ"
                    required
                    onChange={handleInputChange}
                    value={sendData?.has_anyone_in_your_household_migrated_last_1_year_for_work}
                    options={yesOrNo}
                  />

                  <SelectInput
                    id="does_the_migrant_member_send_remittances_to_the_household"
                    name="does_the_migrant_member_send_remittances_to_the_household"
                    label="Does the migrant member send remittances to the household? 
 ವಲಸಿಗ ಸದಸ್ಯರು ಮನೆಗೆ ಹಣ ಕಳುಹಿಸುತ್ತಾರೆಯೇ? ಹೌದು ಅಲ್ಲ"
                    required
                    onChange={handleInputChange}
                    value={sendData?.does_the_migrant_member_send_remittances_to_the_household}
                    options={yesOrNo}
                  />
                  <TextInput
                    id="civic_muscle"
                    name="civic_muscle"
                    label="Civic Muscle   /  ಗ್ರಾಮಡಲಿತದ ಸಾಮರ್ಥ್ಯ "
                    required
                    placeholder="Your Answer"
                    onChange={handleInputChange}
                    value={sendData.civic_muscle}
                  />

                  <SelectInput
                    id="are_you_part_of_an_shg"
                    name="are_you_part_of_an_shg"
                    label="Are you part of an SHG?    ನೀವು SHG ಯ ಭಾಗವಾಗಿದ್ದೀರಾ?"
                    required
                    onChange={handleInputChange}
                    value={sendData?.are_you_part_of_an_shg}
                    options={yesOrNo}
                  />
                  <SelectInput
                    id="do_you_have_any_of_these_identification_cards"
                    name="do_you_have_any_of_these_identification_cards"
                    label=" Do you have any of these identification cards? 
ಈ ಗುರುತಿನ ಚೀಟಿಗಳಲ್ಲಿ ಯಾವುದಾದರೂ ನಿಮ್ಮ ಬಳಿ ಇದೆಯೇ? "
                    required
                    onChange={handleInputChange}
                    value={sendData?.do_you_have_any_of_these_identification_cards}
                    options={identifications_cards}
                  />
                  <SelectInput
                    id="how_did_you_apply_for_it"
                    name="how_did_you_apply_for_it"
                    label=" How did you apply for it - ನೀವು ಅದಕ್ಕೆ ಹೇಗೆ ಅರ್ಜಿ ಸಲ್ಲಿಸಿದ್ದೀರಿ  "
                    required
                    onChange={handleInputChange}
                    value={sendData?.how_did_you_apply_for_it}
                    options={How_did_you_apply_for_it}
                  />

                  <SelectInput
                    id="have_you_personally_applied_for_any_of_the_entitlement_schemes"
                    name="have_you_personally_applied_for_any_of_the_entitlement_schemes"
                    label=" Have you personally (yourself) applied for any of the entitlement schemes?
ನೀವು ವೈಯಕ್ತಿಕವಾಗಿ ಯಾವುದಾದರೂ ಅರ್ಹತಾ ಯೋಜನೆಗಳಿಗೆ ಅರ್ಜಿ ಸಲ್ಲಿಸಿದ್ದೀರಾ? "
                    required
                    onChange={handleInputChange}
                    value={sendData?.have_you_personally_applied_for_any_of_the_entitlement_schemes}
                    options={yesOrNo}
                  />

                  <TextInput
                    id="what_scheme_did_you_apply_for"
                    name="what_scheme_did_you_apply_for"
                    label="
What scheme did you apply for?
  ನೀವು ಯಾವ ಯೋಜನೆಗೆ ಅರ್ಜಿ ಸಲ್ಲಿಸಿದ್ದೀರಿ?  "
                    required
                    onChange={handleInputChange}
                    value={sendData?.what_scheme_did_you_apply_for}
                  />
                  <SelectInput
                    id="were_you_successful_in_getting_approval_for_the_scheme"
                    name="were_you_successful_in_getting_approval_for_the_scheme"
                    label="Where you successful in getting the approval for the scheme?
  ನೀವು ಯೋಜನೆಗೆ ಅನುಮೋದನೆ ಪಡೆಯುವಲ್ಲಿ ಯಶಸ್ವಿಯಾದಿರಾ?  "
                    required
                    onChange={handleInputChange}
                    value={sendData?.were_you_successful_in_getting_approval_for_the_scheme}
                    options={yesOrNo}
                  />
                  <TextInput
                    id="if_you_were_not_successful_in_applying_for_the_scheme_why_not"
                    name="if_you_were_not_successful_in_applying_for_the_scheme_why_not"
                    label="If you were not successful in applying for the scheme. Why not?
ಯೋಜನೆಗೆ ಅರ್ಜಿ ಸಲ್ಲಿಸಲು ನೀವು ಯಶಸ್ವಿಯಾಗದಿದ್ದರೆ. ಏಕೆ ಇಲ್ಲ?  "
                    required
                    onChange={handleInputChange}
                    value={sendData?.if_you_were_not_successful_in_applying_for_the_scheme_why_not}
                  />
                  <SelectInput
                    id="will_cooperate_with_your_village_people_to_get_facility_putup"
                    name="will_cooperate_with_your_village_people_to_get_facility_putup"
                    label="If there is something you all (you and people in your village) need, for example- a new school/water facility etc., how likely is it that you will cooperate with your village people to get the facility put up.
ನಿಮ್ಮೆಲ್ಲರಿಗೂ (ನಿಮಗೆ ಮತ್ತು ನಿಮ್ಮ ಹಳ್ಳಿಯಲ್ಲಿರುವ ಜನರಿಗೆ) ಏನಾದರೂ ಅಗತ್ಯವಿದ್ದರೆ, ಉದಾಹರಣೆಗೆ- ಹೊಸ ಶಾಲೆ/ನೀರಿನ ಸೌಲಭ್ಯ ಇತ್ಯಾದಿಗಳಿದ್ದರೆ, ಸೌಲಭ್ಯವನ್ನು ಪಡೆಯಲು ನಿಮ್ಮ ಹಳ್ಳಿಯ ಜನರೊಂದಿಗೆ ನೀವು ಸಹಕರಿಸುವ ಸಾಧ್ಯತೆ ಎಷ್ಟು. "
                    required
                    onChange={handleInputChange}
                    value={sendData?.will_cooperate_with_your_village_people_to_get_facility_putup}
                    options={likelihoods}
                  />
                  <TextInput
                    id="community_engagement"
                    name="community_engagement"
                    label="
Community Engagement    ಸಮುದಾಯ ಸಹಭಾಗಿತ್ವ"
                    required
                    onChange={handleInputChange}
                    value={sendData?.community_engagement}
                  />
                  <MultipleChoice
                    id="can_you_identify_top_3_problems_in_your_village"
                    name="can_you_identify_top_3_problems_in_your_village"
                    label="Can you identify top 3 problems in your village
ನಿಮ್ಮ ಗ್ರಾಮದಲ್ಲಿರುವ ಪ್ರಮುಖ 3 ಸಮಸ್ಯೆಗಳನ್ನು ನೀವು ಗುರುತಿಸಬಹುದೇ?  "
                    required
                    handleResources={handleResources}
                    options={top_3_problems_in_your_village}
                  />
                  <SelectInput
                    id="do_you_think_you_can_help_solve_these_problems"
                    name="do_you_think_you_can_help_solve_these_problems"
                    label="Do you think you can help solve these problems
ಈ ಸಮಸ್ಯೆಗಳನ್ನು ಪರಿಹರಿಸಲು ನೀವು ಸಹಾಯ ಮಾಡಬಹುದೆಂದು ನೀವು ಭಾವಿಸುತ್ತೀರಾ  "
                    required
                    onChange={handleInputChange}
                    value={sendData?.do_you_think_you_can_help_solve_these_problems}
                    options={yesOrNo}
                  />
                  <TextInput
                    id="if_yes_how_do_you_think_you_can_help_solve_these_problems"
                    name="if_yes_how_do_you_think_you_can_help_solve_these_problems"
                    label="If, yes, how do you think you can help solve these problems?   
 ಹೌದು ಎಂದಾದರೆ, ಈ ಸಮಸ್ಯೆಗಳನ್ನು ಪರಿಹರಿಸಲು ನೀವು ಹೇಗೆ ಸಹಾಯ ಮಾಡಬಹುದು ಎಂದು ನೀವು ಭಾವಿಸುತ್ತೀರಿ?"
                    required
                    onChange={handleInputChange}
                    value={sendData?.if_yes_how_do_you_think_you_can_help_solve_these_problems}
                  />
                  <TextInput
                    id="if_no_why_do_you_think_you_cannot_help_solve_these_problems"
                    name="if_no_why_do_you_think_you_cannot_help_solve_these_problems"
                    label="If, no why do you think you cannot help solve these problems?    
ಇಲ್ಲದಿದ್ದರೆ, ಈ ಸಮಸ್ಯೆಗಳನ್ನು ಪರಿಹರಿಸಲು ನಿಮಗೆ ಸಹಾಯ ಮಾಡಲು ಸಾಧ್ಯವಿಲ್ಲ ಎಂದು ನೀವು ಏಕೆ ಭಾವಿಸುತ್ತೀರಿ?"
                    required
                    onChange={handleInputChange}
                    value={sendData?.if_no_why_do_you_think_you_cannot_help_solve_these_problems}
                  />
                  <SelectInput
                    id="do_you_think_every_village_has_same_or_similar_issues"
                    name="do_you_think_every_village_has_same_or_similar_issues"
                    label="Do you think every village has same or similar issues?            ಪ್ರತಿಯೊಂದು ಹಳ್ಳಿಗೂ ಒಂದೇ ರೀತಿಯ ಸಮಸ್ಯೆಗಳಿವೆ ಎಂದು ನೀವು ಭಾವಿಸುತ್ತೀರಾ?        "
                    required
                    onChange={handleInputChange}
                    value={sendData?.do_you_think_every_village_has_same_or_similar_issues}
                    options={yesOrNo}
                  />
                  <TextInput
                    id="do_you_vote"
                    name="do_you_vote"
                    label="Do you vote - ನೀವು ಮತ ​​ಹಾಕುತ್ತೀರಾ"
                    required
                    onChange={handleInputChange}
                    value={sendData?.do_you_vote}
                  />
                  <SelectInput
                    id="why_do_you_vote"
                    name="why_do_you_vote"
                    label="Why do you vote? - ನೀವು ಯಾಕೆ ಮತ ಚಲಾಯಿಸುತ್ತೀರಿ?"
                    required
                    onChange={handleInputChange}
                    value={sendData?.why_do_you_vote}
                    options={reasonsForVoting}
                  />
                  <TextInput
                    id="if_no_why_dont_you_vote"
                    name="if_no_why_dont_you_vote"
                    label="If no, why don't you vote?"
                    required
                    onChange={handleInputChange}
                    value={sendData?.if_no_why_dont_you_vote}
                  />
                  <SelectInput
                    id="do_you_attend_gram_sabha_regularly"
                    name="do_you_attend_gram_sabha_regularly"
                    label="Do you attend Gram Sabha regularly?
ನೀವು ನಿಯಮಿತವಾಗಿ ಗ್ರಾಮ ಸಭೆಗೆ ಹಾಜರಾಗುತ್ತೀರಾ? "
                    required
                    onChange={handleInputChange}
                    value={sendData?.do_you_attend_gram_sabha_regularly}
                    options={yesOrNo}
                  />
                  <SelectInput
                    id="when_was_the_last_time_you_attended_gram_sabha"
                    name="when_was_the_last_time_you_attended_gram_sabha"
                    label="When was the last time you attended  gram sabha ?
ನೀವು ಕೊನೆಯ ಬಾರಿಗೆ ಗ್ರಾಮಸಭೆಗೆ ಹಾಜರಾಗಿದ್ದು ಯಾವಾಗ? "
                    required
                    onChange={handleInputChange}
                    value={sendData?.when_was_the_last_time_you_attended_gram_sabha}
                    options={attended_gram_sabha}
                  />
                  <SelectInput
                    id="how_do_you_know_when_gram_sabha_is_being_organized"
                    name="how_do_you_know_when_gram_sabha_is_being_organized"
                    label="
How do you know when the Gram Sabha/Gram Samsad is being organized?  
  ಗ್ರಾಮ ಸಭೆ/ಗ್ರಾಮ ಸಂಸದ್ ಯಾವಾಗ ಆಯೋಜಿಸಲಾಗುತ್ತಿದೆ ಎಂದು ನಿಮಗೆ ಹೇಗೆ ಗೊತ್ತು?"
                    required
                    onChange={handleInputChange}
                    value={sendData?.how_do_you_know_when_gram_sabha_is_being_organized}
                    options={Gram_Samsad_is_being_organized}
                  />
                  <MultipleChoice
                    id="what_do_you_do_in_gram_sabha"
                    name="what_do_you_do_in_gram_sabha"
                    label=" What do you do in Gram Sabha?
ಗ್ರಾಮ ಸಭೆಯಲ್ಲಿ ನೀವು ಏನು ಮಾಡುತ್ತೀರಿ?  "
                    required
                    handleResources={handleResources}
                    options={What_do_you_do_in_Gram_Sabha}
                  />
                  <SelectInput
                    id="why_dont_you_attend_gram_sabha"
                    name="why_dont_you_attend_gram_sabha"
                    label="Why don't you attend Gram sabha ?
ನೀವು ಗ್ರಾಮ ಸಭೆಗೆ ಏಕೆ ಹಾಜರಾಗುವುದಿಲ್ಲ?  "
                    required
                    onChange={handleInputChange}
                    value={sendData?.why_dont_you_attend_gram_sabha}
                    options={Why_dont_you_attend_Gram_sabha}
                  />
                  <SelectInput
                    id="do_you_know_who_your_panchayat_members_are"
                    name="do_you_know_who_your_panchayat_members_are"
                    label="Do you know who your panchayat members are ?
ನಿಮ್ಮ ಪಂಚಾಯತ್ ಸದಸ್ಯರು ಯಾರು ಎಂದು ನಿಮಗೆ ತಿಳಿದಿದೆಯೇ?   "
                    required
                    onChange={handleInputChange}
                    value={sendData?.do_you_know_who_your_panchayat_members_are}
                    options={yesOrNo}
                  />
                  <SelectInput
                    id="how_often_do_you_approach_them_for_resolving_an_issue"
                    name="how_often_do_you_approach_them_for_resolving_an_issue"
                    label="How often do you approach them for resolving an issue?
ಸಮಸ್ಯೆಯೊಂದಕ್ಕೆ ನೀವು ಎಷ್ಟು ಬಾರಿ ಅವರನ್ನು ಸಂಪರ್ಕಿಸುತ್ತೀರಿ?   "
                    required
                    onChange={handleInputChange}
                    value={sendData?.how_often_do_you_approach_them_for_resolving_an_issue}
                    options={How_often_do_you_approach_them_for_resolving_an_issue}
                  />
                  <SelectInput
                    id="if_they_rarely_or_never_approach_panchayat_members_why"
                    name="if_they_rarely_or_never_approach_panchayat_members_why"
                    label="If you rarely or never approach the panchayat members, What are the reasons for that?
 ಅವರು ಪಂಚಾಯತ್ ಸದಸ್ಯರನ್ನು ಅಪರೂಪವಾಗಿ ಅಥವಾ ಎಂದಿಗೂ ಸಂಪರ್ಕಿಸದಿದ್ದರೆ, ಅದಕ್ಕೆ ಕಾರಣಗಳೇನು?     "
                    required
                    onChange={handleInputChange}
                    value={sendData?.if_they_rarely_or_never_approach_panchayat_members_why}
                    options={never_approach_the_panchayat_members_What_are_the_reasons_for_that}
                  />
                  <SelectInput
                    id="what_is_the_total_budget_spent_in_your_panchayat"
                    name="what_is_the_total_budget_spent_in_your_panchayat"
                    label="What is the total budget spend in your panchayat?    
ನಿಮ್ಮ ಪಂಚಾಯತ್‌ನಲ್ಲಿ ಒಟ್ಟು ಬಜೆಟ್ ವೆಚ್ಚ ಎಷ್ಟು?"
                    required
                    onChange={handleInputChange}
                    value={sendData?.what_is_the_total_budget_spent_in_your_panchayat}
                    options={What_is_the_total_budget_spend_in_your_panchayat}
                  />
                  <SelectInput
                    id="as_a_citizen_i_have_rights"
                    name="as_a_citizen_i_have_rights"
                    label="I believe that as a citizen I have rights    
ಒಬ್ಬ ನಾಗರಿಕನಾಗಿ ನನಗೆ ಹಕ್ಕುಗಳಿವೆ ಎಂದು ನಾನು ನಂಬುತ್ತೇನೆ"
                    required
                    onChange={handleInputChange}
                    value={sendData?.as_a_citizen_i_have_rights}
                    options={yesNoDontKnow}
                  />
                  <SelectInput
                    id="as_a_citizen_i_have_duties_to_make_governance_process_better"
                    name="as_a_citizen_i_have_duties_to_make_governance_process_better"
                    label="I believe that as a citizen I have duties to make the governance process better    
ಒಬ್ಬ ನಾಗರಿಕನಾಗಿ ಆಡಳಿತ ಪ್ರಕ್ರಿಯೆಯನ್ನು ಉತ್ತಮಗೊಳಿಸಲು ನಾನು ಕರ್ತವ್ಯಗಳನ್ನು ಹೊಂದಿದ್ದೇನೆ ಎಂದು ನಾನು ನಂಬುತ್ತೇನೆ"
                    required
                    onChange={handleInputChange}
                    value={sendData?.as_a_citizen_i_have_duties_to_make_governance_process_better}
                    options={yesNoDontKnow}
                  />
                  <TextInput
                    id="mobility_confidence_of_women"
                    name="mobility_confidence_of_women"
                    label="Mobility/ Confidence of the women    ಮಹಿಳೆಯರ ಚಲನಶೀಲತೆ / ವಿಶ್ವಾಸ"
                    required
                    onChange={handleInputChange}
                    value={sendData?.mobility_confidence_of_women}
                  />
                  <SelectInput
                    id="how_frequently_do_you_discuss_politics_with_people"
                    name="how_frequently_do_you_discuss_politics_with_people"
                    label="How frequently do you discuss politics with people outside of your family?    
ನಿಮ್ಮ ಕುಟುಂಬದ ಹೊರಗಿನ ಜನರೊಂದಿಗೆ ನೀವು ಎಷ್ಟು ಬಾರಿ ರಾಜಕೀಯವನ್ನು - ರಾಜಕೀಯದ ಬಗ್ಗೆ  ಚರ್ಚಿಸುತ್ತೀರಿ?"
                    required
                    onChange={handleInputChange}
                    value={sendData?.how_frequently_do_you_discuss_politics_with_people}
                    options={How_frequently_do_you_discuss_politics_with_people_outside_of_your_family}
                  />
                  <SelectInput
                    id="if_never_why_dont_you_discuss_politics"
                    name="if_never_why_dont_you_discuss_politics"
                    label="If never, why don't you discuss politics?    
ಎಂದಿಗೂ ಇಲ್ಲದಿದ್ದರೆ, ನೀವು ರಾಜಕೀಯವನ್ನು ಏಕೆ ಚರ್ಚಿಸಬಾರದು - ಚರ್ಚಿಸುವುದಿಲ್ಲ?"
                    required
                    onChange={handleInputChange}
                    value={sendData?.if_never_why_dont_you_discuss_politics}
                    options={If_never_why_dont_you_discuss_politics}
                  />
                  <SelectInput
                    id="did_you_try_to_get_people_together_to_solve_problem_in_community"
                    name="did_you_try_to_get_people_together_to_solve_problem_in_community"
                    label="In the past year, did you try to get people together to solve a problem in the community?   
 ಕಳೆದ ವರ್ಷದಲ್ಲಿ - ವರ್ಷಗಳಲ್ಲಿ, ಸಮುದಾಯದಲ್ಲಿನ ಸಮಸ್ಯೆಯನ್ನು ಪರಿಹರಿಸಲು ಜನರನ್ನು ಒಟ್ಟುಗೂಡಿಸಲು ನೀವು ಪ್ರಯತ್ನಿಸಿದ್ದೀರಾ?"
                    required
                    onChange={handleInputChange}
                    value={sendData?.did_you_try_to_get_people_together_to_solve_problem_in_community}
                    options={yesOrNo}
                  />
                  <MultipleChoice
                    id="can_you_go_to_these_places_without_permission_fromfamily_member"
                    name="can_you_go_to_these_places_without_permission_fromfamily_member"
                    label="Can you go to these places without asking permission of your husband or a senior family member?    
 ನಿಮ್ಮ ಪತಿ ಅಥವಾ ಕುಟುಂಬದ ಹಿರಿಯ ಸದಸ್ಯರ ಅನುಮತಿಯನ್ನು ಕೇಳದೆ ನೀವು ಈ ಸ್ಥಳಗಳಿಗೆ ಹೋಗಬಹುದೇ?"
                    required
                    handleResources={handleResources}
                    options={go_to_these_places_without_asking_permission_of_your_husband_or_a_senior_family_member}
                  />
                  <MultipleChoice
                    id="can_you_go_to_these_places_alone"
                    name="can_you_go_to_these_places_alone"
                    label="Can you go to these places alone?
    ನೀವು ಈ ಸ್ಥಳಗಳಿಗೆ ಒಬ್ಬರೇ ಹೋಗಬಹುದೇ?"
                    required
                    handleResources={handleResources}
                    options={Can_you_go_to_these_places_alone}
                  />
                  <MultipleChoice
                    id="what_are_your_most_imp_sources_for_information_about_government"
                    name="what_are_your_most_imp_sources_for_information_about_government"
                    label="What are your most important sources for information about what the government is doing?  
  ಸರ್ಕಾರ ಏನು ಮಾಡುತ್ತಿದೆ ಎಂಬುದರ ಕುರಿತು ಮಾಹಿತಿಗಾಗಿ ನಿಮ್ಮ ಪ್ರಮುಖ ಮೂಲಗಳು ಯಾವುವು?"
                    required
                    handleResources={handleResources}
                    options={most_important_sources_for_information_about_what_the_government_is_doing}
                  />
                  <SelectInput
                    id="which_of_the_following_statements_do_you_agree_with"
                    name="which_of_the_following_statements_do_you_agree_with"
                    label="Which of the following statements do you agree with?    
ಕೆಳಗಿನ ಯಾವ ಹೇಳಿಕೆಗಳನ್ನು ನೀವು ಒಪ್ಪುತ್ತೀರಿ?"
                    required
                    onChange={handleInputChange}
                    value={sendData?.which_of_the_following_statements_do_you_agree_with}
                    options={Which_of_the_following_statements_do_you_agree_with}
                  />
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
