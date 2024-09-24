import * as React from 'react';
import { useState, useEffect } from 'react';
import Swal from 'sweetalert2';
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
  FormHelperText,
  Box,
  CircularProgress,
} from '@mui/material';
import svgLogo from '../../../assets/form-line.svg';
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
import Slide from '@mui/material/Slide';
import { Color } from '@mui/material';
import { Link, useLocation } from 'react-router-dom';
import Iconify from '../../../components/Iconify';
import { Icon } from '@iconify/react';
import products from 'src/_mock/products';
import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';
import Alert from '@mui/material/Alert';
import { baseURL } from 'src/utils/api';
import { useAuth } from 'src/AuthContext';
import TextInput from 'src/components/TextInput';
import SelectInput from 'src/components/SelectInput';
import {
  According_to_you_whose_responsibility_is_it_to_tackle_climate_change,
  Can_you_name_the_categories_of_waste_you_produce,
  casteCategory,
  currentEconomicActivity,
  dayToDayLifeCombatClimateChange,
  disposeYourSanitaryPad,
  districtsOptions,
  Do_you_think_the_water_you_consume_is_safe,
  education,
  house,
  How_do_you_manage_waste_in_your_household,
  How_is_the_change_in_state_of_natural_resources_impacting_your_life,
  initiativesTakenToSaveTheEnvironmentInOurVillage,
  maritalStatus,
  menstruationFlow,
  motherTongue,
  phoneType,
  rationCard,
  religion,
  roof,
  secondaryOccupationHousehold,
  segregateYourWasteAtHome,
  usePesticidesFertiliserToProduceThisFood,
  What_are_the_main_products_and_services_that_you_use_in_your_everyday_life,
  What_is_the_main_source_of_water_used_by_your_household_for_domestic_purposes,
  What_kind_of_change_to_climate_do_you_think_has_happened,
  whatAreTheReasons,
  whatAreThosePractices,
  whatHaveYouNoticed,
  Which_following_are_natural_resources,
  Which_of_the_following_natural_resources_of_your_community_needs_immediate_attention_and_measures_of_conservation,
  WhichMainCropDoYouGrow,
  WomensOccupation,
  yesNoMaybe,
  yesOrNo,
} from './GreenSurveySelectOptions';
import MultipleChoice from 'src/components/MultipleChoice';
const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

export default function GreenSurvey(props) {
  const { apikey } = useAuth();
  const { state } = useLocation();
  const [open, setOpen] = React.useState(false);
  const [value, setValue] = React.useState(false);
  const label = { inputProps: { 'aria-label': 'Checkbox demo' } };
  const [sendData, setSendData] = useState({
    partcipantId: props?.itm?.id || props?.itm.gelathi_id,
    email: '',
    name_of_the_surveyor: '',
    name_of_the_respondent: '',
    village_name: '',
    phone_number: '',
    natural_resources_impacting_your_life: [],
    natural_wealth: '',
    what_do_you_know_about_it: '',
    change_in_the_weather_climate: '',
    shown_below_do_you_agree_with: '',
    how_concerned_local_water_quality: '',
    personal_actions_can_affect_water_quality: '',
    take_water_conservation_measures: '',
    if_yes_what_kind_of_measures: '',
    list_down_impact_of_climate_change: '',
    gifting_his_6_acres_land_to_children: '',
    which_one_according_to_you_is_right: '',
    believe_connection_between_the_food_health_climate: '',
    native_food_you_believe_is_envionmentally_friendly: '',
    household_activity_pollutes_natural_resources: '',
    alternatives_household_materials_cause_pollution: '',
    if_yes_what_are_they: [],
    this_switch_to_eco_friendly_products: '',
    climate_change_is_a_lot_of_effort: '',
    action_out_of_concern_for_climate_change: '',
    if_yes_what_did_you_do_are_you_doing: '',
    natural_resource_community_immediate_attention_measures: '',
    if_yes_what_is_that_resource: '',
    initiative_to_conserve_the_environment: '',
    community_together_achieve_my_conservation_goal: '',
    entry_date: '',
    district_name: '',
    taluk_name: '',
    panchayat_name: '',
    adult_members: '',
    children_members: '',
    house: '',
    roof: '',
    ration_card: '',
    cast: '',
    mother_tongue: '',
    religion: '',
    age: '',
    marital_status: '',
    education: '',
    phone_type: '',
    primary_occupation: [],
    secondary_occupation: [],
    womens_occupation: '',
    household_migration_last_year: '',
    migrant_sends_remittances: '',
    household_owns_land: '',
    land_acres: '',
    monthly_expenditure: '',
    monthly_income: '',
    daily_climate_action: [],
    runs_enterprise: '',
    eco_friendly_practices_enterprise: '',
    eco_friendly_practices_details: [],
    waste_segregation_at_home: '',
    is_menstruating: '',
    menstruation_products_used: [],
    sanitary_disposal_method: '',
    soil_changes_over_years: '',
    soil_observations_if_no_changes: [],
    essential_characteristics_of_fertile_soil: '',
    main_crop_grown: '',
    access_to_nutritional_food: '',
    reasons_for_lack_of_nutritional_food: [],
    identify_trees_in_community: '',
    tree_names_in_community: '',
    food_production: '',
    sell_produce_local_market: '',
    use_pesticides_fertilizers: [],
    community_government_environment_initiatives: [],
    natural_resources: [],
    climate_change: '',
    changes_happened_to_the_climate: [],
    climate_change_threatens_personal_family_health_safety: [],
    done_to_tackle_climate_change: '',
    do_something_to_tackle_climate_change: [],
    main_source_of_water: [],
    water_you_consume_safe: '',
    eco_friendly_products_and_activities: '',
    little_more_than_what_you_pay_for_the_chemicals: '',
    conserve_local_seeds: '',
    achieve_with_regard_to_natural_resource_conservation: [],
    natural_resource_conservation_goal: '',
    goal: '',
    mobilized_community_for_conservation: '',
    green_action_in_community: '',
    details_of_green_action: '',
    main_products_services_used: [],
    household_waste_management: '',
    waste_categories_produced: '',
    access_to_daily_living_products: '',
    locally_produced_products_consumed: '',
  });
  // Save data to local storage
  const saveDataLocally = (key, data) => {
    const existingData = localStorage.getItem('green');
    const parsedData = existingData ? JSON.parse(existingData) : [];
    const newData = { ...data }; // Replace with your own data object
    parsedData.push(newData);
    const updatedData = JSON.stringify(parsedData);
    localStorage.setItem('green', updatedData);
    // props.componentreloadmethod();
  };
  const networkAccess = async () => {
    try {
      await fetch('https://www.google.com/', { mode: 'no-cors' });
      return true;
    } catch (error) {
      return false;
    }
  };
  const handleClose = () => {
    setOpen(false);
    setIsFormPresentLocally(false);
  };

  const isOnline = () => {
    return navigator.onLine;
  };

  const greensurveyformdata = async () => {
    console.log({ sendData });
    if (isOnline() && networkAccess()) {
      if (localStorage.getItem('green')) {
        saveDataLocally('green', sendData);
      }
      sendData.adult_members = parseInt(sendData.adult_members);
      sendData.age = parseInt(sendData.age);
      sendData.children_members = parseInt(sendData.children_members);
      sendData.participantId = parseInt(sendData.participantId);
      var config = {
        method: 'post',
        url: baseURL + 'addGreenBaselineSurvey',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `${apikey}`,
        },
        data: sendData,
      };
      axios(config)
        .then(function (response) {
          console.log(response, 'responseeeegreen');
          props?.changeState();
          // props?.mainDrawerReload();
          localStorage.removeItem('green');
          Swal.fire({
            icon: 'success',
            title: 'Success',
            text: response.data.message,
            confirmButtonText: 'Ok',
            timer: 3000,
          });
          handleClose();
        })
        .catch(function (error) {
          console.log(sendData, 'responseeeegreen', error);
          saveDataLocally('green', sendData);
          // props?.mainDrawerReload();
          Swal.fire({
            icon: 'error',
            title: 'Error',
            text: error?.message,
            confirmButtonText: 'Ok',
            timer: 2000,
          });
        });
    } else {
      isOnline() ? '' : saveDataLocally('green', sendData);
      handleClose();
      // props?.mainDrawerReload();
    }
  };

  const [loader, setLoader] = useState(true);
  useEffect(() => {
    const delay = 3000;
    const timeoutId = setTimeout(() => {
      setLoader(false);
    }, delay);
  });
  const handleInputChange = (event) => {
    const { name, value } = event.target;
    console.log('handleInputChange called:', name, value);
    setSendData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
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
    setSendData(tempData);
  };
  const handleform = () => {
    alert('Surevy was done');
  };
  const handleClickOpen = () => {
    setOpen(true);
    setLoader(true);
  };
  const [isFormPresentLocally, setIsFormPresentLocally] = useState(false);

  return (
    <div>
      {isOnline() ? (
        <Stack style={{ position: 'absolute', right: 0, float: 'right' }} mb={2}>
          {!props?.itm?.is_green_survey ? (
            <button
              onClick={handleClickOpen}
              style={{ border: 'none', marginRight: 6, outline: 'none', background: 'transparent', cursor: 'pointer' }}
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
          ) : (
            <button
              onClick={handleform}
              style={{ border: 'none', marginRight: 6, outline: 'none', background: 'transparent', cursor: 'pointer' }}
            >
              <svg xmlns="http://www.w3.org/2000/svg" color="green" width="1.5em" height="1.5em" viewBox="0 0 36 36">
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
          )}
        </Stack>
      ) : (
        <Stack style={{ position: 'absolute', right: 0, float: 'right' }} mb={2}>
          {!props?.itm?.is_green_survey ? (
            <button
              onClick={handleClickOpen}
              style={{ border: 'none', outline: 'none', background: 'transparent', cursor: 'pointer' }}
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
          ) : (
            <button
              onClick={handleform}
              style={{ border: 'none', outline: 'none', background: 'transparent', cursor: 'pointer' }}
            >
              <svg xmlns="http://www.w3.org/2000/svg" color="green" width="1.5em" height="1.5em" viewBox="0 0 36 36">
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
          )}
        </Stack>
      )}
      <Dialog fullScreen open={open} onClose={handleClose} TransitionComponent={Transition}>
        <form
          onSubmit={(e) => {
            e.preventDefault();
            greensurveyformdata();
          }}
        >
          <AppBar sx={{ position: 'fixed', bgcolor: '#ff7424' }}>
            <Toolbar sx={{ bgcolor: '#ff7424', color: 'white' }}>
              <IconButton style={{ color: 'white' }} onClick={handleClose}>
                {isOnline() ? (
                  <Iconify icon="material-symbols:arrow-back-rounded" />
                ) : (
                  <div style={{ borderRadius: 5 }}>🡠</div>
                )}
              </IconButton>
              <Typography sx={{ ml: 2, flex: 1, color: 'inherit' }} variant="h6" component="div">
                Green Baseline Survey
              </Typography>
              <Button autoFocus edge="end" color="inherit" type="submit">
                {isOnline() ? <Iconify icon="material-symbols:save" width={30} height={30} /> : 'Save'}
              </Button>
            </Toolbar>
          </AppBar>

          {isFormPresentLocally ? (
            <Typography sx={{ ml: 2, flex: 1, color: 'inherit' }} variant="h6" component="div">
              This Form is Filled!
            </Typography>
          ) : loader ? (
            <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '70vh' }}>
              <CircularProgress sx={{ color: '#ff7424' }} />
            </Box>
          ) : (
            <Grid>
              <Card>
                <CardContent>
                  <TextInput
                    id="name_of_the_respondent"
                    name="name_of_the_respondent"
                    label="Name of the respondent"
                    required
                    placeholder="Your Answer"
                    onChange={handleInputChange}
                    value={sendData.name_of_the_respondent || ''}
                  />
                  <TextInput
                    id="name_of_the_surveyor"
                    placeholder="Your Answer"
                    label="Green Motivator name"
                    kannadaLabel="ಹಸಿರು ಪ್ರೇರಕಿಯ ಹೆಸರು"
                    required
                    type="email"
                    name="name_of_the_surveyor"
                    onChange={handleInputChange}
                    value={sendData?.name_of_the_surveyor}
                  />
                  <SelectInput
                    id="district_name"
                    name="district_name"
                    label="Districts name"
                    kannadaLabel="ಜಿಲ್ಲೆಗಳ ಹೆಸರು"
                    required
                    onChange={handleInputChange}
                    value={sendData?.district_name}
                    options={districtsOptions}
                  />
                  <SelectInput
                    id="taluk_name"
                    name="taluk_name"
                    label="Taluks name"
                    kannadaLabel="ತಾಲೂಕು ಹೆಸರು"
                    required
                    onChange={handleInputChange}
                    value={sendData?.taluk_name}
                    options={districtsOptions}
                  />
                  <SelectInput
                    id="panchayat_name"
                    name="panchayat_name"
                    label="Panchayat name"
                    kannadaLabel="ಪಂಚಾಯತ್ ಹೆಸರು"
                    required
                    onChange={handleInputChange}
                    value={sendData?.panchayat_name}
                    options={districtsOptions}
                  />
                  <SelectInput
                    id="village_name"
                    name="village_name"
                    label="Village name"
                    kannadaLabel="ಗ್ರಾಮದ ಹೆಸರು"
                    required
                    onChange={handleInputChange}
                    value={sendData?.village_name}
                    options={districtsOptions}
                  />

                  <TextInput
                    id="adult_members"
                    name="adult_members"
                    label="Total number of members in your household (adult)"
                    kannadaLabel="ನಿಮ್ಮ ಮನೆಯ ಸದಸ್ಯರ ಒಟ್ಟು ಸಂಖ್ಯೆ"
                    type="number"
                    required
                    inputProps={{ inputMode: 'numeric', pattern: '[0-9]*', maxLength: 2 }}
                    placeholder="Your Answer"
                    onChange={handleInputChange}
                    value={sendData.adult_members}
                  />
                  <TextInput
                    id="children_members"
                    name="children_members"
                    label="Total number of members in your household (children)"
                    type="number"
                    required
                    inputProps={{ inputMode: 'numeric', pattern: '[0-9]*', maxLength: 2 }}
                    placeholder="Your Answer"
                    onChange={handleInputChange}
                    value={sendData.children_members}
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
                    label="Roof"
                    kannadaLabel="ಛಾವಣಿ"
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
                    id="cast"
                    name="cast"
                    label="Caste Category"
                    kannadaLabel="ಜಾತಿ ವರ್ಗ"
                    required
                    onChange={handleInputChange}
                    value={sendData?.cast}
                    options={casteCategory}
                  />
                  <SelectInput
                    id="mother_tongue"
                    name="mother_tongue"
                    label="Mother Tongue"
                    kannadaLabel="ಮಾತೃ ಭಾಷೆ"
                    required
                    onChange={handleInputChange}
                    value={sendData?.mother_tongue}
                    options={motherTongue}
                  />
                  <SelectInput
                    id="religion"
                    name="religion"
                    label="religion"
                    kannadaLabel="ಧರ್ಮ"
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
                    inputProps={{ inputMode: 'numeric', pattern: '[0-9]*', maxLength: 2 }}
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
                    id="education"
                    name="education"
                    label="Education"
                    kannadaLabel="ಶಿಕ್ಷಣ"
                    required
                    onChange={handleInputChange}
                    value={sendData?.education}
                    options={education}
                  />
                  <SelectInput
                    id="phone_type"
                    name="phone_type"
                    label="Phone type"
                    kannadaLabel="ಫೋನ್ ಪ್ರಕಾರ"
                    required
                    onChange={handleInputChange}
                    value={sendData?.phone_type}
                    options={phoneType}
                  />

                  <TextInput
                    id="phone_number"
                    name="phone_number"
                    label="Phone Number  ದೂರವಾಣಿ ಸಂಖ್ಯೆ"
                    type="number"
                    required
                    inputProps={{ inputMode: 'numeric', pattern: '[0-9]*', maxLength: 2 }}
                    placeholder="Your Answer"
                    onChange={handleInputChange}
                    value={sendData.phone_number}
                  />

                  <MultipleChoice
                    id="primary_occupation"
                    name="primary_occupation"
                    label="Current Economic Activity - Primary Occupation of the Household"
                    kannadaLabel="ಪ್ರಸ್ತುತ ಆರ್ಥಿಕ ಚಟುವಟಿಕೆ - ಕುಟುಂಬದ ಪ್ರಾಥಮಿಕ ಉದ್ಯೋಗ"
                    required
                    handleResources={handleResources}
                    options={currentEconomicActivity}
                  />
                  <MultipleChoice
                    id="secondary_occupation"
                    name="secondary_occupation"
                    label="Secondary Occupation of the Household "
                    kannadaLabel="ಕುಟುಂಬದ ದ್ವಿತೀಯಕ ಉದ್ಯೋಗ"
                    required
                    handleResources={handleResources}
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
                  <SelectInput
                    id="household_migration_last_year"
                    name="household_migration_last_year"
                    label="Has anyone in your household migrated in the last 1 year for work?  "
                    kannadaLabel="ನಿಮ್ಮ ಮನೆಯಲ್ಲಿ ಯಾರಾದರೂ ಕೆಲಸಕ್ಕಾಗಿ ಕಳೆದ 1 ವರ್ಷದಲ್ಲಿ ವಲಸೆ ಹೋಗಿದ್ದಾರೆಯೇ? "
                    required
                    onChange={handleInputChange}
                    value={sendData?.household_migration_last_year}
                    options={yesOrNo}
                  />
                  <SelectInput
                    id="migrant_sends_remittances"
                    name="migrant_sends_remittances"
                    label="Does the migrant member send remittances to the household? Y/N "
                    kannadaLabel="ವಲಸಿಗ ಸದಸ್ಯರು ಮನೆಗೆ ಹಣ ಕಳುಹಿಸುತ್ತಾರೆಯೇ? ಹೌದು ಅಲ್ಲ"
                    required
                    onChange={handleInputChange}
                    value={sendData?.migrant_sends_remittances}
                    options={yesOrNo}
                  />
                  <SelectInput
                    id="household_owns_land"
                    name="household_owns_land"
                    label="Does your household have a land?"
                    kannadaLabel=""
                    required
                    onChange={handleInputChange}
                    value={sendData?.household_owns_land}
                    options={yesOrNo}
                  />

                  <TextInput
                    id="land_acres"
                    name="land_acres"
                    label="How much land do you have ( in acres)?"
                    type="number"
                    required
                    inputProps={{ inputMode: 'numeric', maxLength: 100 }}
                    placeholder="Your Answer"
                    onChange={handleInputChange}
                    value={sendData.land_acres}
                  />
                  <TextInput
                    id="monthly_expenditure"
                    name="monthly_expenditure"
                    label="Monthly household expenditure (in Rs) ಮಾಸಿಕ ಮನೆಯ ಖರ್ಚು (ರೂ.ಗಳಲ್ಲಿ)"
                    type="number"
                    required
                    inputProps={{ inputMode: 'numeric', maxLength: 100 }}
                    placeholder="Your Answer"
                    onChange={handleInputChange}
                    value={sendData.monthly_expenditure}
                  />
                  <TextInput
                    id="monthly_income"
                    name="monthly_income"
                    label="Monthly household income(in Rs.)  ಮಾಸಿಕ ಮನೆಯ ಆದಾಯ(ರೂ.ಗಳಲ್ಲಿ)"
                    type="number"
                    required
                    inputProps={{ inputMode: 'numeric', maxLength: 100 }}
                    placeholder="Your Answer"
                    onChange={handleInputChange}
                    value={sendData.monthly_income}
                  />

                  <Card style={{ marginTop: 40, backgroundColor: '#F6F8FB', borderRadius: 20 }}>
                    <CardContent>
                      <Typography style={{ color: '#ff7424' }}>
                        l.Behaviour and Skills l.ನಡವಳಿಕೆ ಮತ್ತು ಕೌಶಲ್ಯಗಳು
                      </Typography>

                      <MultipleChoice
                        card={false}
                        label="1.What are small changes you have made in your day-to-day life to combat climate change ?  
                          1.ಹವಾಮಾನ ಬದಲಾವಣೆಯನ್ನು ಎದುರಿಸಲು ನಿಮ್ಮ ದಿನನಿತ್ಯದ ಜೀವನದಲ್ಲಿ ನೀವು ಮಾಡಿದ ಸಣ್ಣ ಬದಲಾವಣೆಗಳು ಯಾವುವು?"
                        name="daily_climate_action"
                        required
                        handleResources={handleResources}
                        options={dayToDayLifeCombatClimateChange}
                      />
                      <SelectInput
                        card={false}
                        id="runs_enterprise"
                        name="runs_enterprise"
                        label="2. Does your family or you run an enterprise?   "
                        kannadaLabel="2. ನಿಮ್ಮ ಕುಟುಂಬ ಅಥವಾ ನೀವು ಉದ್ಯಮವನ್ನು ನಡೆಸುತ್ತೀರಾ? "
                        required
                        onChange={handleInputChange}
                        value={sendData?.runs_enterprise}
                        options={yesOrNo}
                      />
                      <SelectInput
                        card={false}
                        id="eco_friendly_practices_enterprise"
                        name="eco_friendly_practices_enterprise"
                        label="3. If running an enterprise, have you brought in eco-friendly practices in your enterprise?   "
                        kannadaLabel="3. ಉದ್ಯಮವನ್ನು ನಡೆಸುತ್ತಿದ್ದರೆ, ನಿಮ್ಮ ಉದ್ಯಮದಲ್ಲಿ ನೀವು ಪರಿಸರ ಸ್ನೇಹಿ ಅಭ್ಯಾಸಗಳನ್ನು ತಂದಿದ್ದೀರಾ? "
                        required
                        onChange={handleInputChange}
                        value={sendData?.eco_friendly_practices_enterprise}
                        options={yesOrNo}
                      />
                      <MultipleChoice
                        card={false}
                        label="4. If yes, what are those practices?"
                        kannadaLabel="4. ಹೌದು ಎಂದಾದರೆ, ಆ ಅಭ್ಯಾಸಗಳು ಯಾವುವು?"
                        name="eco_friendly_practices_details"
                        required
                        handleResources={handleResources}
                        options={whatAreThosePractices}
                      />

                      <SelectInput
                        card={false}
                        id="waste_segregation_at_home"
                        name="waste_segregation_at_home"
                        label="5. Do you segregate your waste at home? "
                        kannadaLabel="5. ನೀವು  ನಿಮ್ಮ  ಮನೆಯಲ್ಲಿ ಬರುವ  ತ್ಯಾಜ್ಯವನ್ನು ಪ್ರತ್ಯೇಕಿಸುತ್ತೀರಾ?"
                        required
                        onChange={handleInputChange}
                        value={sendData?.waste_segregation_at_home}
                        options={segregateYourWasteAtHome}
                      />
                      <SelectInput
                        card={false}
                        id="is_menstruating"
                        name="is_menstruating"
                        label="6. Are you a menstruating woman?"
                        kannadaLabel="6. ನೀವು ಮುಟ್ಟಿನ ಮಹಿಳೆಯೇ? "
                        required
                        onChange={handleInputChange}
                        value={sendData?.is_menstruating}
                        options={segregateYourWasteAtHome}
                      />

                      <MultipleChoice
                        card={false}
                        label="7. If yes, what do you use for your menstruation flow? "
                        kannadaLabel="7. ಹೌದು ಎಂದಾದರೆ, ನಿಮ್ಮ ಮುಟ್ಟಿನ ಸಂಧರ್ಭದಲ್ಲಿ ನೀವು ಏನು ಬಳಸುತ್ತೀರಿ?"
                        name="menstruation_products_used"
                        required
                        handleResources={handleResources}
                        options={menstruationFlow}
                      />

                      <SelectInput
                        card={false}
                        id="sanitary_disposal_method"
                        name="sanitary_disposal_method"
                        label="8.How do you dispose of your sanitary pad/ tampons/ clothes?  "
                        kannadaLabel="8. ನಿಮ್ಮ ಸ್ಯಾನಿಟರಿ ಪ್ಯಾಡ್ / ಟ್ಯಾಂಪೂನ್ / ಬಟ್ಟೆಗಳನ್ನು ನೀವು ಹೇಗೆ ವಿಲೇವಾರಿ ಮಾಡುತ್ತೀರಿ?"
                        required
                        onChange={handleInputChange}
                        value={sendData?.sanitary_disposal_method}
                        options={disposeYourSanitaryPad}
                      />
                      <SelectInput
                        card={false}
                        id="soil_changes_over_years"
                        name="soil_changes_over_years"
                        label="9. Is there any differences you notices in the soil for years"
                        kannadaLabel="9. ಕಳೆದ ಕೆಲವು  ವರ್ಷಗಳಲ್ಲಿ ಮಣ್ಣಿನಲ್ಲಿ ಏನಾದರೂ ಬದಲಾವಣೆ ಗುರುತಿಸಿದ್ಧಿರ ?"
                        required
                        onChange={handleInputChange}
                        value={sendData?.soil_changes_over_years}
                        options={yesOrNo}
                      />

                      <MultipleChoice
                        card={false}
                        label="10.If no , what have you noticed "
                        kannadaLabel="10. ಇಲ್ಲದಿದ್ದರೆ, ನೀವು ಏನು ಗಮನಿಸಿದ್ದೀರಿ"
                        name="soil_observations_if_no_changes"
                        required
                        handleResources={handleResources}
                        options={whatHaveYouNoticed}
                      />

                      <SelectInput
                        card={false}
                        id="essential_characteristics_of_fertile_soil"
                        name="essential_characteristics_of_fertile_soil"
                        label="11.According to you, what are the essential characteristics of fertile soil?"
                        kannadaLabel="11.ನಿಮ್ಮ ಪ್ರಕಾರ, ಫಲವತ್ತಾದ ಮಣ್ಣಿನ ಅಗತ್ಯ ಗುಣಲಕ್ಷಣಗಳು ಯಾವುವು?"
                        required
                        onChange={handleInputChange}
                        value={sendData?.essential_characteristics_of_fertile_soil}
                        options={yesOrNo}
                      />
                      <SelectInput
                        card={false}
                        id="main_crop_grown"
                        name="main_crop_grown"
                        label="12.Which main crop do you grow?  "
                        kannadaLabel="12.ನೀವು ಯಾವ ಮುಖ್ಯ ಬೆಳೆ ಬೆಳೆಯುತ್ತೀರಿ?"
                        required
                        onChange={handleInputChange}
                        value={sendData?.main_crop_grown}
                        options={WhichMainCropDoYouGrow}
                      />
                      <SelectInput
                        card={false}
                        id="access_to_nutritional_food"
                        name="access_to_nutritional_food"
                        label="13.Are you able to access nutritional food at your place?  "
                        kannadaLabel="13. ನಿಮ್ಮ ಸ್ಥಳದಲ್ಲಿ ಪೌಷ್ಠಿಕಾಂಶದ ಆಹಾರವನ್ನು ಕೊಂಡುಕೊಳ್ಳಲು ನಿಮಗೆ ಸಾಧ್ಯವೇ?"
                        required
                        onChange={handleInputChange}
                        value={sendData?.access_to_nutritional_food}
                        options={yesOrNo}
                      />
                      <MultipleChoice
                        card={false}
                        label="14.If no , what are the reasons "
                        kannadaLabel="14.ಇಲ್ಲದಿದ್ದರೆ, ಕಾರಣಗಳೇನು "
                        name="reasons_for_lack_of_nutritional_food"
                        required
                        handleResources={handleResources}
                        options={whatAreTheReasons}
                      />
                    </CardContent>
                  </Card>
                  <Card style={{ marginTop: 40, backgroundColor: '#F6F8FB', borderRadius: 20 }}>
                    <CardContent>
                      <Typography style={{ color: '#ff7424' }}>
                        II. Community Awareness Questions II. ಸಮುದಾಯ ಜಾಗೃತಿ ಪ್ರಶ್ನೆಗಳು
                      </Typography>

                      <SelectInput
                        card={false}
                        id="identify_trees_in_community"
                        name="identify_trees_in_community"
                        label="1.Would you be able to identify the kind of trees you have in your community?   "
                        kannadaLabel="1.ನಿಮ್ಮ ಸಮುದಾಯದಲ್ಲಿ ನೀವು ಹೊಂದಿರುವ ಮರಗಳನ್ನು ಗುರುತಿಸಲು ನಿಮಗೆ ಸಾಧ್ಯವಾಗುತ್ತದೆಯೇ? "
                        required
                        onChange={handleInputChange}
                        value={sendData?.identify_trees_in_community}
                        options={yesOrNo}
                      />

                      <TextInput
                        card={false}
                        id="tree_names_in_community"
                        name="tree_names_in_community"
                        label="2.Name any two of them? "
                        kannadaLabel="2.ಅವುಗಳಲ್ಲಿ ಯಾವುದಾದರೂ ಎರಡನ್ನು ಹೆಸರಿಸಿ?"
                        type="text"
                        required
                        placeholder="Your Answer"
                        onChange={handleInputChange}
                        value={sendData.tree_names_in_community}
                      />
                      <SelectInput
                        card={false}
                        id="food_production"
                        name="food_production"
                        label="3.Do you produce any food? "
                        kannadaLabel="3.ನೀವು ಯಾವುದೇ ಆಹಾರವನ್ನು ಬೆಳೆಯುತ್ತೀರಾ? "
                        required
                        onChange={handleInputChange}
                        value={sendData?.food_production}
                        options={yesOrNo}
                      />
                      <SelectInput
                        card={false}
                        id="sell_produce_local_market"
                        name="sell_produce_local_market"
                        label="4.Do you sell your produce in the local market? "
                        kannadaLabel="4.ನಿಮ್ಮ ಉತ್ಪನ್ನಗಳನ್ನು ಸ್ಥಳೀಯ ಮಾರುಕಟ್ಟೆಯಲ್ಲಿ ಮಾರಾಟ ಮಾಡುತ್ತೀರಾ? "
                        required
                        onChange={handleInputChange}
                        value={sendData?.sell_produce_local_market}
                        options={yesOrNo}
                      />
                      <SelectInput
                        card={false}
                        id="this_switch_to_eco_friendly_products"
                        name="this_switch_to_eco_friendly_products"
                        label="Would you be willing to switch to these eco-friendly products and activities? "
                        kannadaLabel="ಈ ಪರಿಸರ ಸ್ನೇಹಿ ಉತ್ಪನ್ನಗಳಿಗೆ ಮತ್ತು ಚಟುವಟಿಕೆಗಳಿಗೆ ಬದಲಾಯಿಸಲು ನೀವು ಸಿದ್ಧರಿದ್ದೀರಾ?"
                        required
                        onChange={handleInputChange}
                        value={sendData?.this_switch_to_eco_friendly_products}
                        options={yesNoMaybe}
                      />
                      <MultipleChoice
                        card={false}
                        label="5.Do you use pesticides & fertiliser to produce this food?  "
                        kannadaLabel="5.ಈ ಆಹಾರವನ್ನು ಬೆಳೆಯಲು ನೀವು ಕೀಟನಾಶಕಗಳು ಮತ್ತು ರಸಗೊಬ್ಬರಗಳನ್ನು ಬಳಸುತ್ತೀರಾ?"
                        name="use_pesticides_fertilizers"
                        required
                        handleResources={handleResources}
                        options={usePesticidesFertiliserToProduceThisFood}
                      />
                      <MultipleChoice
                        card={false}
                        label="6.Initiatives taken by your community/government to save the environment in our village  "
                        kannadaLabel="6.ನಮ್ಮ ಗ್ರಾಮದಲ್ಲಿ ಪರಿಸರವನ್ನು ಉಳಿಸಲು ನಿಮ್ಮ ಸಮುದಾಯ/ಸರ್ಕಾರ ಕೈಗೊಂಡ ಉಪಕ್ರಮಗಳು"
                        name="community_government_environment_initiatives"
                        required
                        handleResources={handleResources}
                        options={initiativesTakenToSaveTheEnvironmentInOurVillage}
                      />
                    </CardContent>
                  </Card>
                  <Card style={{ marginTop: 40, backgroundColor: '#F6F8FB', borderRadius: 20 }}>
                    <CardContent>
                      <Typography style={{ color: '#ff7424' }}>
                        III.Knowledge related questions from the curriculum III. ಪಠ್ಯಕ್ರಮದಿಂದ ಜ್ಞಾನ ಸಂಬಂಧಿತ ಪ್ರಶ್ನೆಗಳು
                      </Typography>

                      <MultipleChoice
                        card={false}
                        label="1.Which of the following are natural resources?  "
                        kannadaLabel="1. ಕೆಳಗಿನವುಗಳಲ್ಲಿ ಯಾವುದು ನೈಸರ್ಗಿಕ ಸಂಪನ್ಮೂಲಗಳು? "
                        name="natural_resources"
                        required
                        handleResources={handleResources}
                        options={Which_following_are_natural_resources}
                      />
                      <SelectInput
                        card={false}
                        id="climate_change"
                        name="climate_change"
                        label="2.Have you heard of “climate change”?   "
                        kannadaLabel="2.ನೀವು “ಹವಾಮಾನ ಬದಲಾವಣೆ” ಬಗ್ಗೆ ಕೇಳಿದ್ದೀರಾ? "
                        required
                        onChange={handleInputChange}
                        value={sendData?.climate_change}
                        options={yesOrNo}
                      />
                      <MultipleChoice
                        card={false}
                        label="3.What kind of change to climate do you think has happened? "
                        kannadaLabel="3.ಹವಾಮಾನದಲ್ಲಿ ಯಾವ ರೀತಿಯ ಬದಲಾವಣೆ ಸಂಭವಿಸಿದೆ ಎಂದು ನೀವು ಭಾವಿಸುತ್ತೀರಿ?"
                        name="changes_happened_to_the_climate"
                        required
                        handleResources={handleResources}
                        options={What_kind_of_change_to_climate_do_you_think_has_happened}
                      />
                      <MultipleChoice
                        card={false}
                        label="4.How is the change in state of natural resources impacting your life?"
                        kannadaLabel="4.ನೈಸರ್ಗಿಕ ಸಂಪನ್ಮೂಲಗಳ ಸ್ಥಿತಿಯಲ್ಲಿನ ಬದಲಾವಣೆಯು ನಿಮ್ಮ ಜೀವನದ ಮೇಲೆ ಹೇಗೆ ಪರಿಣಾಮ ಬೀರುತ್ತದೆ?"
                        name="climate_change_threatens_personal_family_health_safety"
                        required
                        handleResources={handleResources}
                        options={How_is_the_change_in_state_of_natural_resources_impacting_your_life}
                      />
                      <SelectInput
                        card={false}
                        id="done_to_tackle_climate_change"
                        name="done_to_tackle_climate_change"
                        label="5.Do you think anything can be done to tackle climate change?"
                        kannadaLabel="5.ಹವಾಮಾನ ಬದಲಾವಣೆಯನ್ನು ನಿಭಾಯಿಸಲು ಏನಾದರೂ ಮಾಡಬಹುದು ಎಂದು ನೀವು ಭಾವಿಸುತ್ತೀರಾ?"
                        required
                        onChange={handleInputChange}
                        value={sendData?.done_to_tackle_climate_change}
                        options={yesOrNo}
                      />
                      <MultipleChoice
                        card={false}
                        label="6.According to you, whose responsibility is it to tackle climate change? "
                        kannadaLabel="6.ನಿಮ್ಮ ಪ್ರಕಾರ, ಹವಾಮಾನ ಬದಲಾವಣೆಯನ್ನು ನಿಭಾಯಿಸುವುದು ಯಾರ ಜವಾಬ್ದಾರಿ?"
                        name="do_something_to_tackle_climate_change"
                        required
                        handleResources={handleResources}
                        options={According_to_you_whose_responsibility_is_it_to_tackle_climate_change}
                      />
                      <MultipleChoice
                        card={false}
                        label="7.What is the main source of water used by your household for domestic purposes, such as drinking, cooking and hand washing?  "
                        kannadaLabel="7.ಕುಡಿಯುವುದು, ಅಡುಗೆ ಮಾಡುವುದು ಮತ್ತು ಕೈ ತೊಳೆಯುವುದು ಮುಂತಾದ ಗೃಹ ಉದ್ದೇಶಗಳಿಗಾಗಿ ನಿಮ್ಮ ಮನೆಯವರು ಬಳಸುವ ನೀರಿನ ಮುಖ್ಯ ಮೂಲ ಯಾವುದು?"
                        name="main_source_of_water"
                        required
                        handleResources={handleResources}
                        options={What_is_the_main_source_of_water_used_by_your_household_for_domestic_purposes}
                      />
                      <SelectInput
                        card={false}
                        id="water_you_consume_safe"
                        name="water_you_consume_safe"
                        label="8.Do you think the water you consume is safe?  "
                        kannadaLabel="8.ನೀವು ಸೇವಿಸುವ ನೀರು ಸುರಕ್ಷಿತವಾಗಿದೆ ಎಂದು ನೀವು ಭಾವಿಸುತ್ತೀರಾ?"
                        required
                        onChange={handleInputChange}
                        value={sendData?.water_you_consume_safe}
                        options={Do_you_think_the_water_you_consume_is_safe}
                      />
                      <SelectInput
                        card={false}
                        id="eco_friendly_products_and_activities"
                        name="eco_friendly_products_and_activities"
                        label="9.Would you be willing to switch to the eco-friendly products and activities in your daily household activities?   "
                        kannadaLabel="9.ನಿಮ್ಮ ದೈನಂದಿನ ಮನೆಯ ಚಟುವಟಿಕೆಗಳಲ್ಲಿ ಪರಿಸರ ಸ್ನೇಹಿ ಉತ್ಪನ್ನಗಳು ಮತ್ತು ಚಟುವಟಿಕೆಗಳಿಗೆ ಬದಲಾಯಿಸಲು ನೀವು ಸಿದ್ಧರಿದ್ದೀರಾ? "
                        required
                        onChange={handleInputChange}
                        value={sendData?.eco_friendly_products_and_activities}
                        options={yesOrNo}
                      />
                      <SelectInput
                        card={false}
                        id="little_more_than_what_you_pay_for_the_chemicals"
                        name="little_more_than_what_you_pay_for_the_chemicals"
                        label="10.Would you be willing to make this switch to eco-friendly products even if you have to pay a little more than what you pay for the chemical products?   "
                        kannadaLabel="10. ರಾಸಾಯನಿಕ ಉತ್ಪನ್ನಗಳಿಗೆ ನೀವು ಪಾವತಿಸುವುದಕ್ಕಿಂತ ಸ್ವಲ್ಪ ಹೆಚ್ಚು ಪಾವತಿಸಬೇಕಾದರೂ ಸಹ ಪರಿಸರ ಸ್ನೇಹಿ ಉತ್ಪನ್ನಗಳಿಗೆ ಈ ಬದಲಾವಣೆಯನ್ನು ಮಾಡಲು ನೀವು ಸಿದ್ಧರಿದ್ದೀರಾ? "
                        required
                        onChange={handleInputChange}
                        value={sendData?.little_more_than_what_you_pay_for_the_chemicals}
                        options={yesOrNo}
                      />
                      <SelectInput
                        card={false}
                        id="conserve_local_seeds"
                        name="conserve_local_seeds"
                        label="11.Are you taking any steps to conserve local seeds in your community? "
                        kannadaLabel="11.ನಿಮ್ಮ ಸಮುದಾಯದಲ್ಲಿ ಸ್ಥಳೀಯ ಬೀಜಗಳನ್ನು ಸಂರಕ್ಷಿಸಲು ನೀವು ಯಾವುದೇ ಕ್ರಮಗಳನ್ನು ತೆಗೆದುಕೊಳ್ಳುತ್ತಿರುವಿರಾ?"
                        required
                        onChange={handleInputChange}
                        value={sendData?.conserve_local_seeds}
                        options={yesOrNo}
                      />
                    </CardContent>
                  </Card>
                  <Card style={{ marginTop: 40, backgroundColor: '#F6F8FB', borderRadius: 20 }}>
                    <CardContent>
                      <Typography style={{ color: '#ff7424' }}>IV. Green Village IV. ಹಸಿರು ಗ್ರಾಮ</Typography>

                      <MultipleChoice
                        card={false}
                        label="1.Which of the following natural resources of your community needs immediate attention and measures of conservation? "
                        kannadaLabel="1.ನಿಮ್ಮ ಸಮುದಾಯದ ಕೆಳಗಿನ ಯಾವ ನೈಸರ್ಗಿಕ ಸಂಪನ್ಮೂಲಗಳಿಗೆ ತಕ್ಷಣದ ಗಮನ ಮತ್ತು ಸಂರಕ್ಷಣೆಯ ಕ್ರಮಗಳ ಅಗತ್ಯವಿದೆ?"
                        name="achieve_with_regard_to_natural_resource_conservation"
                        required
                        handleResources={handleResources}
                        options={
                          Which_of_the_following_natural_resources_of_your_community_needs_immediate_attention_and_measures_of_conservation
                        }
                      />
                      <SelectInput
                        card={false}
                        id="natural_resource_conservation_goal"
                        name="natural_resource_conservation_goal"
                        label="2.Do you have a goal with regard to natural resource conservation in your village?  "
                        kannadaLabel="2.ನಿಮ್ಮ ಗ್ರಾಮದಲ್ಲಿ ನೈಸರ್ಗಿಕ ಸಂಪನ್ಮೂಲ ಸಂರಕ್ಷಣೆಗೆ ಸಂಬಂಧಿಸಿದಂತೆ ನೀವು ಗುರಿ ಹೊಂದಿದ್ದೀರಾ?"
                        required
                        onChange={handleInputChange}
                        value={sendData?.natural_resource_conservation_goal}
                        options={yesOrNo}
                      />
                      <TextInput
                        card={false}
                        id="goal"
                        name="goal"
                        label="3. What is this goal? "
                        kannadaLabel="3. ಈ ಗುರಿ ಏನು?"
                        type="text"
                        required
                        placeholder="Your Answer"
                        onChange={handleInputChange}
                        value={sendData.goal}
                      />
                      <SelectInput
                        card={false}
                        id="mobilized_community_for_conservation"
                        name="mobilized_community_for_conservation"
                        label="4. Have you mobilised people in your community together to achieve your natural resource conservation goal?   "
                        kannadaLabel="4. ನಿಮ್ಮ ನೈಸರ್ಗಿಕ ಸಂಪನ್ಮೂಲ ಸಂರಕ್ಷಣೆ ಗುರಿಯನ್ನು ಸಾಧಿಸಲು ನಿಮ್ಮ ಸಮುದಾಯದ ಜನರನ್ನು ನೀವು ಒಟ್ಟಾಗಿ ಸಜ್ಜುಗೊಳಿಸಿದ್ದೀರಾ? "
                        required
                        onChange={handleInputChange}
                        value={sendData?.mobilized_community_for_conservation}
                        options={yesOrNo}
                      />
                      <SelectInput
                        card={false}
                        id="green_action_in_community"
                        name="green_action_in_community"
                        label="Have you taken a green action in your community?"
                        required
                        onChange={handleInputChange}
                        value={sendData?.green_action_in_community}
                        options={yesOrNo}
                      />
                      <TextInput
                        card={false}
                        id="details_of_green_action"
                        name="details_of_green_action"
                        label="What is that green action?"
                        type="text"
                        required
                        placeholder="Your Answer"
                        onChange={handleInputChange}
                        value={sendData.details_of_green_action}
                      />
                      <MultipleChoice
                        card={false}
                        label="What are the main products and services that you use in your everyday life?"
                        kannadaLabel="ನಿಮ್ಮ ದೈನಂದಿನ ಜೀವನದಲ್ಲಿ ನೀವು ಬಳಸುವ ಮುಖ್ಯ ಉತ್ಪನ್ನಗಳು ಮತ್ತು ಸೇವೆಗಳು ಯಾವುವು? "
                        name="main_products_services_used"
                        required
                        handleResources={handleResources}
                        options={What_are_the_main_products_and_services_that_you_use_in_your_everyday_life}
                      />
                      <SelectInput
                        card={false}
                        id="household_waste_management"
                        name="household_waste_management"
                        label="How do you manage waste in your household? "
                        kannadaLabel="ನಿಮ್ಮ ಮನೆಯ ತ್ಯಾಜ್ಯವನ್ನು ನೀವು ಹೇಗೆ ನಿರ್ವಹಿಸುತ್ತೀರಿ?"
                        required
                        onChange={handleInputChange}
                        value={sendData?.household_waste_management}
                        options={How_do_you_manage_waste_in_your_household}
                      />
                      <SelectInput
                        card={false}
                        id="waste_categories_produced"
                        name="waste_categories_produced"
                        label="Can you name the categories of waste you produce?  "
                        kannadaLabel=" ನೀವು ಉತ್ಪಾದಿಸುವ ತ್ಯಾಜ್ಯದ ವರ್ಗಗಳನ್ನು ನೀವು ಹೆಸರಿಸಬಹುದೇ?"
                        required
                        onChange={handleInputChange}
                        value={sendData?.waste_categories_produced}
                        options={Can_you_name_the_categories_of_waste_you_produce}
                      />
                      <SelectInput
                        card={false}
                        id="access_to_daily_living_products"
                        name="access_to_daily_living_products"
                        label="Do you have access to daily living products locally?"
                        kannadaLabel=" ನೀವು ದೈನಂದಿನ  ವಸ್ತುಗಳನ್ನು ಸ್ಥಳೀಯವಾಗಿ   ಪಡೆಯುತ್ತಿದ್ದೀರಾ?"
                        required
                        onChange={handleInputChange}
                        value={sendData?.access_to_daily_living_products}
                        options={yesOrNo}
                      />
                      <TextInput
                        card={false}
                        id="locally_produced_products_consumed"
                        name="locally_produced_products_consumed"
                        label="If yes, what products do you consume that are produced locally?"
                        kannadaLabel="ಹೌದು ಎಂದಾದರೆ, ಸ್ಥಳೀಯವಾಗಿ ಉತ್ಪಾದಿಸುವ ಯಾವ ಉತ್ಪನ್ನಗಳನ್ನು ನೀವು ಬಳಸುತ್ತೀರಿ?"
                        type="text"
                        required
                        placeholder="Your Answer"
                        onChange={handleInputChange}
                        value={sendData.locally_produced_products_consumed}
                      />
                    </CardContent>
                  </Card>
                </CardContent>
              </Card>
            </Grid>
          )}
        </form>
      </Dialog>
    </div>
  );
}
