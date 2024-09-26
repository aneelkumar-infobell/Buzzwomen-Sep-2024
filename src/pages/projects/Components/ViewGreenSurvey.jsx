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

import ViewNewQuestion from './green/ViewNewQuestion';
import ViewOldQuestion from './green/ViewOldQuestion';
const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

export default function ViewGreenSurvey(props) {
  const { apikey } = useAuth();
  const { state } = useLocation();
  const [open, setOpen] = React.useState(false);
  const [value, setValue] = React.useState(false);
  const label = { inputProps: { 'aria-label': 'Checkbox demo' } };
  const [sendData, setSendData] = useState({
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

  const getFormData = async () => {
    var config = {
      method: 'post',
      url: baseURL + 'getGreenBaselineSurvey',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `${apikey}`,
      },
      data: {
        participantId: parseInt(props?.itm?.id) || parseInt(props?.itm.gelathi_id),
      },
    };
    axios(config)
      .then(function (response) {
        console.log(response.data.data, 'responseeeegreen');
        setSendData(response.data.data[0]);
      })
      .catch(function (error) {
        console.log(sendData, 'responseeeegreen', error);
        Swal.fire({
          icon: 'error',
          title: 'Error',
          text: error?.message,
          confirmButtonText: 'Ok',
          timer: 2000,
        });
      });
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
    getFormData();
    setOpen(true);
    setLoader(true);
  };
  const [isFormPresentLocally, setIsFormPresentLocally] = useState(false);

  return (
    <div>
      {isOnline() ? (
        <Stack style={{ position: 'absolute', right: 0, float: 'right' }} mb={2}>
          {!props?.itm?.is_green_survey ? (
            <Iconify icon="clarity:form-line" onClick={handleClickOpen} color="green" />
          ) : (
            <Iconify icon="clarity:form-line" onClick={handleClickOpen} color="green" />
          )}
        </Stack>
      ) : (
        <Stack style={{ position: 'absolute', right: 0, float: 'right' }} mb={2}>
          {!props?.itm?.is_green_survey ? (
            <Iconify icon="clarity:form-line" onClick={handleClickOpen} color="green" />
          ) : (
            <Iconify icon="clarity:form-line" onClick={handleform} color="green" />
          )}
        </Stack>
      )}
      <Dialog fullScreen open={open} onClose={handleClose} TransitionComponent={Transition}>
        <form>
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
                View Green Baseline Survey
              </Typography>
            </Toolbar>
          </AppBar>

          {loader ? (
            <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '70vh' }}>
              <CircularProgress sx={{ color: '#ff7424' }} />
            </Box>
          ) : (
            <>
              {sendData.district_name ? (
                <ViewNewQuestion
                  sendData={sendData}
                  handleInputChange={handleInputChange}
                  handleResources={handleResources}
                />
              ) : (
                <ViewOldQuestion
                  sendData={sendData}
                  handleInputChange={handleInputChange}
                  handleResources={handleResources}
                />
              )}
            </>
          )}
        </form>
      </Dialog>
    </div>
  );
}
