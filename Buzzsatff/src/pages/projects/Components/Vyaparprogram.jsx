
 
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
  DialogContentText,Box,CircularProgress
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
const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});
   
export default function Vyaparprogram({ itm, changeState,componentreloadmethod }) {
  const { apikey } = useAuth();
  const [open, setOpen] = React.useState(false);
  const [successMessage, setsuccessMessage] = useState(false);
  const [message, setMessage] = useState('');
  const [selectedValue, setSelectedValue] = React.useState('a');
  const [vyaparform, setvyaparform] = useState([]);
  const [survey, setsurvey] = React.useState('');
  const [education, seteducation] = React.useState('');
  const [maritalstatus, setmaritalstatus] = React.useState('');
  const [phone, setphone] = React.useState('');
  const [sector, setSector] = React.useState('');
  const [numberproficiency, setnumberproficiency] = React.useState('');
  const [writtenproficiency, setwrittenproficiency] = React.useState('');
  const [bussinessyears, setBussinessyears] = React.useState('');
  const [licensevalue, setlicensevalue] = React.useState('');
  const [homebased, sethomebased] = React.useState('');
  const [challengesvalue, setChallengesvalue] = React.useState('');
  const [bussinesscurrentstate, setbussinesscurrentstate] = React.useState('');
  const [accountbooks, setaccountbooks] = React.useState('');
  const [generateideas, setgenerateideas] = React.useState('');
  const [bussinessplan, setbussinessplan] = React.useState('');
  const [submitbussinessplan, setsubmitbussinessplan] = React.useState('');
  const [loan, setloan] = React.useState('');
  const [accessingloan, setaccessingloan] = React.useState('');
  const [finance, setfinance] = React.useState('');
  const [currentloan, setcurrentloan] = React.useState('');
  const [bussinesskills, setbussinesskills] = React.useState('');
  const [checked, setChecked] = React.useState({
    tell_us_three_things_about_you_as_an_entrepreneur: [],
    please_list_down_the_various_components_of_business: [],
    what_are_the_prerequisites_to_access_a_loan: [],
  });
  const [isCurrentLoan, setIsCurrentLoan] = useState(false);
  const [helperText, setHelperText] = React.useState('');
  const [vyaapar, setVyaapar] = useState('');
  const label = { inputProps: { 'aria-label': 'Checkbox demo' } };
 
  const surveydone = (event) => {
    setsurvey(event.target.value);
    setwWenSurveyDoneError(false);
  };
  const educationlevel = (event) => {
    seteducation(event.target.value);
    setEducationError(false);
  };
  const marital = (event) => {
    setmaritalstatus(event.target.value);
    setMAritalStatusError(false);
  };
  const phonestatus = (event) => {
    setphone(event.target.value);
    setSmartPhoneError(false);
    if (event.target.value == 'Yes') {
      setIsSmartPhone(true);
    } else {
      setIsSmartPhone(false);
    }
  };
  const sectortype = (event) => {
    setSector(event.target.value);
    setSectorError(false);
  };
  const numberproficiencyvalue = (event) => {
    setnumberproficiency(event.target.value);
    setNumberproficiencyError(false);
  };
  const writtenproficiencyvalue = (event) => {
    setwrittenproficiency(event.target.value);
    setWrittenproficiencyError(false);
  };
  const bussinessyearsvalue = (event) => {
    setBussinessyears(event.target.value);
    setBussinessyearsError(false);
  };
  const handlelicensevalue = (event) => {
    setlicensevalue(event.target.value);
    setlicensevalueError(false);
  };
  const homebasedvalue = (event) => {
    sethomebased(event.target.value);
    setHounseBaseError(false);
  };
  const challengesbussiness = (event) => {
    setChallengesvalue(event.target.value);
    setchallengesvalueError(false);
  };
  const bussinesscurrentstatevalue = (event) => {
    setbussinesscurrentstate(event.target.value);
    setbussinesscurrentstateError(false);
  };
  const handleaccountbooks = (event) => {
    setaccountbooks(event.target.value);
    setaccountbooksError(false);
  };
  const generateideasvalue = (event) => {
    setgenerateideas(event.target.value);
    setgenerateideasError(false);
  };
  const bussinessplanvalue = (event) => {
    setbussinessplan(event.target.value);
    setbussinessplanError(false);
  };
  const submitbussinessplanvalue = (event) => {
    setsubmitbussinessplan(event.target.value);
    setsubmitbussinessplanError(false);
  };
  const financevalue = (event) => {
    setfinance(event.target.value);
    setfinanceError(false);
  };
  const loanvalue = (event) => {
    setloan(event.target.value);
    setloanError(false);
  };
  const accessingloanvalue = (event) => {
    setaccessingloan(event.target.value);
    setaccessingloanError(false);
  };
  const currentloanvalue = (event) => {
    setcurrentloan(event.target.value);
    setcurrentloanError(false);
    if (event.target.value == 'Yes') {
      setIsCurrentLoan(true);
    } else {
      setIsCurrentLoan(false);
    }
  };
  const bussinesskillsvalue = (event) => {
    setbussinesskills(event.target.value);
    setbussinessSkillError(false);
    if(event.target.value == "Yes"){
      setisAdditionalSkill(true)
    }else{
      setisAdditionalSkill(false)
    }
  };
  const internetHandler = (event) =>{
    setinternet(event.target.value)
  }
  const handleprerequisites = (label, event) => {
    var updatedList = [...checked[label]];
    if (event.target.checked) {
      updatedList = [...checked[label], event.target.value];
    } else {
      updatedList.splice(checked[label].indexOf(event.target.value), 1);
    }
    let tempData = { ...checked };
    tempData[label] = updatedList;
    setChecked(tempData);
  };
 
  const [sendData, setSendData] = useState({
    gfId: '',
    when_was_survey_done: '',
    name_of_the_vyapari: '',
    age: '',
    contact_number: '',
    village_id: itm?.villagename ,
    name_of_the_cohort: '',
    highter_education: '',
    marital_status: '',
    number_of_people_in_the_household: '',
    do_you_own_a_smart_phone: '',
    do_you_have_internet_connection_on_your_smart_phone: '',
    sector_type_of_business: '',
    are_you_proficient_with_numbers: '',
    are_you_proficient_with_written_language: '',
    household_income_monthly: '',
    over_the_last_month_your_average_income: '',
    your_business_profit_last_month: '',
    how_much_monthly_income_would_you_like_to_ideally_earn: '',
    amount_invested_when_the_business_started: '',
    number_of_years_the_business_has_been_operating: '',
    you_stopped_hold_your_business: '',
    no_hours_engaged_business: '',
    license_for_existing_business: '',
    home_based_work_from_shop: '',
    why_do_you_do_business: '',
    tell_us_three_things_about_you_as_an_entrepreneur: '',
    tell_us_three_things_about_your_role_as_a_woman_at_home: '',
    what_are_your_challenges_in_running_and_growing_your_business: '',
    what_is_your_plan_to_overcome_these_challenges: '',
    what_are_your_skills: '',
    what_are_the_resources_available_with_you_for_your_business: '',
    who_is_your_customer_Describe_them_to_us: '',
    please_list_down_the_various_components_of_business: '',
    I_know_the_current_state_of_my_business_in_profit_loss_revenue: '',
    what_kind_of_books_of_accounts_do_you_maintain: '',
    i_can_generate_ideas_to_solve_my_business_problems: '',
    tell_us_about_one_business_problem: '',
    what_is_your_business_goal_Business_impurumenet_madodu: '',
    do_you_have_a_business_plan_to_reach_that_goal: '',
    can_you_submit_a_business_plan_for_your_goal_to_us_right_now: '',
    what_are_the_strenghts_of_your_business: '',
    what_are_the_weaknesses_of_your_business: '',
    what_are_the_oppourtunities_for_your_business: '',
    are_you_able_to_raise_the_required_finance: '',
    i_have_taken_a_loan_from: '',
    i_have_trouble_accessing_loan_for_my_business: '',
    what_are_the_prerequisites_to_access_a_loan: '',
    loan_currently_availed: '',
    need_additional_skills_business: '',
    relation_who_borrowed: '',
    loan_total_amount: '',
    loan_source: '',
    loan_repayment_till_date: '',
    skils_what_are_those:'',
    do_you_have_internet_connection_on_your_smart_phone:''
  });
  const [Educationerror, setEducationError] = useState(false);
  const [whenSurveyDoneError, setwWenSurveyDoneError] = useState(false);
  const [MAritalStatusError, setMAritalStatusError] = useState(false);
  const [smartPhoneError, setSmartPhoneError] = useState(false);
  const [sectorError, setSectorError] = useState(false);
  const [numberproficiencyError, setNumberproficiencyError] = useState(false);
  const [writtenproficiencyError, setWrittenproficiencyError] = useState(false);
  const [bussinessyearsError, setBussinessyearsError] = useState(false);
  const [licensevalueaError, setlicensevalueError] = useState(false);
  const [HouseBaseError, setHounseBaseError] = useState(false);
  const [challengesvalueError, setchallengesvalueError] = useState(false);
  const [bussinesscurrentstateError, setbussinesscurrentstateError] = useState(false);
  const [accountbooksError, setaccountbooksError] = useState(false);
  const [generateideasError, setgenerateideasError] = useState(false);
  const [bussinessplanError, setbussinessplanError] = useState(false);
  const [submitbussinessplanError, setsubmitbussinessplanError] = useState(false);
  const [financeError, setfinanceError] = useState(false);
  const [loanError, setloanError] = useState(false);
  const [accessingloanError, setaccessingloanError] = useState(false);
  const [currentloanError, setcurrentloanError] = useState(false);
  const [bussinessSkillError, setbussinessSkillError] = useState(false);
  const [isSmartPhone, setIsSmartPhone] = useState(false);
  const [isAdditionalSkill ,setisAdditionalSkill] = useState(false)
const [internet , setinternet] = useState("")
const [loansError , setloansError] = useState(false)
const [bisnessError , setbusinessError] = useState(false)
const [entreprenur , setentrepreneurError] = useState(false)
  

const handleClickOpen = () => {
    setOpen(true);
    setLoader(true);
    };
  const handleClose = () => {
    setOpen(false);
    setIsFormPresentLocally(false)
  };
  useEffect(() => {
    gelathinamelist();
    // setenrolledVyaapar([{ stockname: "fist" }, { stockname: "second" }])
  }, []);

  const saveDataLocally = (key, data) => {
 
    const existingData = localStorage.getItem('vyapar');
    const parsedData = existingData ? JSON.parse(existingData) : [];
    const newData = { ...data}; // Replace with your own data object
    parsedData.push(newData);
    const updatedData = JSON.stringify(parsedData);
    localStorage.setItem('vyapar', updatedData);
   componentreloadmethod()
};
// Get data from local 
const [isFormPresentLocally ,setIsFormPresentLocally] =useState(false)
const localStorageData = localStorage.getItem('vyapar');
useEffect(()=>{
  const existingData = localStorage.getItem('vyapar');
      const parsedData = existingData ? JSON.parse(existingData) : [];
      if(parsedData?.length){
        parsedData.map(item=>{
          if(item?.partcipantId===itm.gelathi_id){
            setSendData(item);
            setIsFormPresentLocally(true)
          }
        })
      }
  },[])
const data1 = localStorage.getItem("vyapar");
const getDataLocally = (key) => {
  const data = localStorage.getItem("vyapar");
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
    var data ={}
    data = JSON.stringify({
      partcipantId: JSON.stringify(itm?.id)||JSON.stringify(itm?.gelathi_id),
      gfId: sendData?.gfId,
      when_was_survey_done: survey,
      name_of_the_vyapari: sendData?.name_of_the_vyapari,
      age: sendData?.age,
      contact_number: sendData?.contact_number,
      village_id: itm?.villagename  || sendData?.village_id,
      name_of_the_cohort: sendData?.name_of_the_cohort,
      highter_education: education,
      marital_status: maritalstatus,
      number_of_people_in_the_household: sendData?.number_of_people_in_the_household,
      do_you_own_a_smart_phone: phone,
      do_you_have_internet_connection_on_your_smart_phone: '3',
      sector_type_of_business: sector,
      are_you_proficient_with_numbers: numberproficiency,
      are_you_proficient_with_written_language: writtenproficiency,
      household_income_monthly: sendData?.household_income_monthly,
      over_the_last_month_your_average_income: sendData?.over_the_last_month_your_average_income,
      your_business_profit_last_month: sendData?.your_business_profit_last_month,
      how_much_monthly_income_would_you_like_to_ideally_earn:
        sendData?.how_much_monthly_income_would_you_like_to_ideally_earn,
      amount_invested_when_the_business_started: sendData?.amount_invested_when_the_business_started,
      number_of_years_the_business_has_been_operating: bussinessyears,
      you_stopped_hold_your_business: sendData?.you_stopped_hold_your_business,
      no_hours_engaged_business: sendData?.no_hours_engaged_business,
      license_for_existing_business: licensevalue,
      home_based_work_from_shop: homebased,
      why_do_you_do_business: sendData?.why_do_you_do_business,
      tell_us_three_things_about_you_as_an_entrepreneur: checked['tell_us_three_things_about_you_as_an_entrepreneur'],
      tell_us_three_things_about_your_role_as_a_woman_at_home:
        sendData?.tell_us_three_things_about_your_role_as_a_woman_at_home,
      what_are_your_challenges_in_running_and_growing_your_business: challengesvalue,
      what_is_your_plan_to_overcome_these_challenges: sendData?.what_is_your_plan_to_overcome_these_challenges,
      what_are_your_skills: sendData?.what_are_your_skills,
      what_are_the_resources_available_with_you_for_your_business:
        sendData?.what_are_the_resources_available_with_you_for_your_business,
      who_is_your_customer_Describe_them_to_us: sendData?.who_is_your_customer_Describe_them_to_us,
      please_list_down_the_various_components_of_business:
        checked['please_list_down_the_various_components_of_business'],
      I_know_the_current_state_of_my_business_in_profit_loss_revenue: bussinesscurrentstate,
      what_kind_of_books_of_accounts_do_you_maintain: accountbooks,
      i_can_generate_ideas_to_solve_my_business_problems: generateideas,
      tell_us_about_one_business_problem: sendData?.tell_us_about_one_business_problem,
      what_is_your_business_goal_Business_impurumenet_madodu:
        sendData?.what_is_your_business_goal_Business_impurumenet_madodu,
      do_you_have_a_business_plan_to_reach_that_goal: bussinessplan,
      can_you_submit_a_business_plan_for_your_goal_to_us_right_now: submitbussinessplan,
      what_are_the_strenghts_of_your_business: sendData?.what_are_the_strenghts_of_your_business,
      what_are_the_weaknesses_of_your_business: sendData?.what_are_the_weaknesses_of_your_business,
      what_are_the_oppourtunities_for_your_business: sendData?.what_are_the_oppourtunities_for_your_business,
      are_you_able_to_raise_the_required_finance: finance,
      i_have_taken_a_loan_from: loan,
      i_have_trouble_accessing_loan_for_my_business: accessingloan,
      what_are_the_prerequisites_to_access_a_loan: checked['what_are_the_prerequisites_to_access_a_loan'],
      loan_currently_availed: currentloan,
      ' need_additional_skills_business': bussinesskills,
      relation_who_borrowed: sendData?.relation_who_borrowed,
      loan_total_amount: sendData?.loan_total_amount,
      loan_source: sendData?.loan_source,
      loan_repayment_till_date: sendData?.loan_repayment_till_date,
      skils_what_are_those : sendData?.skils_what_are_those,
      do_you_have_internet_connection_on_your_smart_phone : internet
    });
    if(isOnline() && networkAccess())
    {
    if (education == '') {
      setEducationError(true);
      setHelperText('Please Select The Option');
    }
    if (survey == '') {
      setwWenSurveyDoneError(true);
      setHelperText('Please Select The Option');
    }
    if (maritalstatus == '') {
      setMAritalStatusError(true);
      setHelperText('Please Select The Option');
    }
    if (phone == '') {
      setSmartPhoneError(true);
      setHelperText('Please Select The Option');
    }
    if (sector == '') {
      setSectorError(true);
      setHelperText('Please Select The Option');
    }
    if (numberproficiency == '') {
      setNumberproficiencyError(true);
      setHelperText('Please Select The Option');
    }
    if (writtenproficiency == '') {
      setWrittenproficiencyError(true);
      setHelperText('Please Select The Option');
    }
    if (bussinessyears == '') {
      setBussinessyearsError(true);
      setHelperText('Please Select The Option');
    }
    if (licensevalue == '') {
      setlicensevalueError(true);
      setHelperText('Please Select The Option');
    }
    if (homebased == '') {
      setHounseBaseError(true);
      setHelperText('Please Select The Option');
    }
    if (challengesvalue == '') {
      setchallengesvalueError(true);
      setHelperText('Please Select The Option');
    }
    if (bussinesscurrentstate == '') {
      setbussinesscurrentstateError(true);
      setHelperText('Please Select The Option');
    }
    if (accountbooks == '') {
      setaccountbooksError(true);
      setHelperText('Please Select The Option');
    }
    if (generateideas == '') {
      setgenerateideasError(true);
      setHelperText('Please Select The Option');
    }
    if (bussinessplan == '') {
      setbussinessplanError(true);
      setHelperText('Please Select The Option');
    }
    if (submitbussinessplan == '') {
      setsubmitbussinessplanError(true);
      setHelperText('Please Select The Option');
    }
    if (finance == '') {
      setfinanceError(true);
      setHelperText('Please Select The Option');
    }
    if (loan == '') {
      setloanError(true);
      setHelperText('Please Select The Option');
    }
    if (accessingloan == '') {
      setaccessingloanError(true);
      setHelperText('Please Select The Option');
    }
    if (currentloan == '') {
      setcurrentloanError(true);
      setHelperText('Please Select The Option');
    }
    if (bussinesskills == '') {
      setbussinessSkillError(true);
      setHelperText('Please Select The Option');
    }
    if (checked['please_list_down_the_various_components_of_business'] == 0) {
      setbusinessError(true);
      setHelperText('Please Select The Option');
    }
    if (checked['tell_us_three_things_about_you_as_an_entrepreneur'] == 0) {
      setentrepreneurError(true);
      setHelperText('Please Select The Option');
    }
    if (checked['what_are_the_prerequisites_to_access_a_loan'] == 0) {
      setloansError(true);
      setHelperText('Please Select The Option');
    }
    if (
      bussinesskills != ' ' &&
      currentloan != '' &&
      accessingloan != '' &&
      loan != '' &&
      finance != '' &&
      submitbussinessplan != '' &&
      bussinessplan != '' &&
      generateideas != '' &&
      accountbooks != '' &&
      bussinesscurrentstate != '' &&
      challengesvalue != '' &&
      homebased != '' &&
      licensevalue != '' &&
      bussinessyears != '' &&
      writtenproficiency != '' &&
      numberproficiency != '' &&
      sector != '' &&
      phone != '' &&
      maritalstatus != '' &&
      survey != '' &&
      education != ''&&
      (checked['please_list_down_the_various_components_of_business'] != 0)&&
      (checked['tell_us_three_things_about_you_as_an_entrepreneur'] != 0)&&
      (checked['what_are_the_prerequisites_to_access_a_loan'] != 0)
    ) 
    {
if(localStorage.getItem('vyapar')){
  data = setvyaparform(saveDataLocally('vyapar',JSON.parse(data)));
  setvyaparform(data);
}

else{
      var data = JSON.stringify({
        partcipantId: JSON.stringify(itm?.id)|| JSON.stringify(itm?.gelathi_id),
        gfId: sendData?.gfId,
        when_was_survey_done: survey,
        name_of_the_vyapari: sendData?.name_of_the_vyapari,
        age: sendData?.age,
        contact_number: sendData?.contact_number,
        village_id: itm?.villagename  || sendData?.village_id,
        name_of_the_cohort: sendData?.name_of_the_cohort,
        highter_education: education,
        marital_status: maritalstatus,
        number_of_people_in_the_household: sendData?.number_of_people_in_the_household,
        do_you_own_a_smart_phone: phone,
        do_you_have_internet_connection_on_your_smart_phone: '3',
        sector_type_of_business: sector,
        are_you_proficient_with_numbers: numberproficiency,
        are_you_proficient_with_written_language: writtenproficiency,
        household_income_monthly: sendData?.household_income_monthly,
        over_the_last_month_your_average_income: sendData?.over_the_last_month_your_average_income,
        your_business_profit_last_month: sendData?.your_business_profit_last_month,
        how_much_monthly_income_would_you_like_to_ideally_earn:
          sendData?.how_much_monthly_income_would_you_like_to_ideally_earn,
        amount_invested_when_the_business_started: sendData?.amount_invested_when_the_business_started,
        number_of_years_the_business_has_been_operating: bussinessyears,
        you_stopped_hold_your_business: sendData?.you_stopped_hold_your_business,
        no_hours_engaged_business: sendData?.no_hours_engaged_business,
        license_for_existing_business: licensevalue,
        home_based_work_from_shop: homebased,
        why_do_you_do_business: sendData?.why_do_you_do_business,
        tell_us_three_things_about_you_as_an_entrepreneur: checked['tell_us_three_things_about_you_as_an_entrepreneur'],
        tell_us_three_things_about_your_role_as_a_woman_at_home:
          sendData?.tell_us_three_things_about_your_role_as_a_woman_at_home,
        what_are_your_challenges_in_running_and_growing_your_business: challengesvalue,
        what_is_your_plan_to_overcome_these_challenges: sendData?.what_is_your_plan_to_overcome_these_challenges,
        what_are_your_skills: sendData?.what_are_your_skills,
        what_are_the_resources_available_with_you_for_your_business:
          sendData?.what_are_the_resources_available_with_you_for_your_business,
        who_is_your_customer_Describe_them_to_us: sendData?.who_is_your_customer_Describe_them_to_us,
        please_list_down_the_various_components_of_business:
          checked['please_list_down_the_various_components_of_business'],
        I_know_the_current_state_of_my_business_in_profit_loss_revenue: bussinesscurrentstate,
        what_kind_of_books_of_accounts_do_you_maintain: accountbooks,
        i_can_generate_ideas_to_solve_my_business_problems: generateideas,
        tell_us_about_one_business_problem: sendData?.tell_us_about_one_business_problem,
        what_is_your_business_goal_Business_impurumenet_madodu:
          sendData?.what_is_your_business_goal_Business_impurumenet_madodu,
        do_you_have_a_business_plan_to_reach_that_goal: bussinessplan,
        can_you_submit_a_business_plan_for_your_goal_to_us_right_now: submitbussinessplan,
        what_are_the_strenghts_of_your_business: sendData?.what_are_the_strenghts_of_your_business,
        what_are_the_weaknesses_of_your_business: sendData?.what_are_the_weaknesses_of_your_business,
        what_are_the_oppourtunities_for_your_business: sendData?.what_are_the_oppourtunities_for_your_business,
        are_you_able_to_raise_the_required_finance: finance,
        i_have_taken_a_loan_from: loan,
        i_have_trouble_accessing_loan_for_my_business: accessingloan,
        what_are_the_prerequisites_to_access_a_loan: checked['what_are_the_prerequisites_to_access_a_loan'],
        loan_currently_availed: currentloan,
        ' need_additional_skills_business': bussinesskills,
        relation_who_borrowed: sendData?.relation_who_borrowed,
        loan_total_amount: sendData?.loan_total_amount,
        loan_source: sendData?.loan_source,
        loan_repayment_till_date: sendData?.loan_repayment_till_date,
        skils_what_are_those : sendData?.skils_what_are_those,
        do_you_have_internet_connection_on_your_smart_phone : internet
      });
}
      var config = {
        method: 'post',
        url: baseURL + 'addBuzzVyapar',
        headers: {
          'Content-Type': 'application/json',
           'Authorization': `${apikey}`
        },
        data: data,
      };
      axios(config)
        .then(function (response) {
          changeState();
          setvyaparform(response?.data);
          localStorage.removeItem('vyapar');
      
          setMessage(response?.data.message);
          setsuccessMessage(true);
        
          setIsCurrentLoan(false);
          setisAdditionalSkill(false)
          handleClose();
        })
        .catch(function (error) {
          setvyaparform(saveDataLocally('vyapar',data));
          componentreloadmethod()
        });
        handleClose()
      } 
      else {
      alert('PLease Fill All The Field ');
    }
  }
  else{

    if (education == '') {
      setEducationError(true);
      setHelperText('Please Select The Option');
    }
    if (survey == '') {
      setwWenSurveyDoneError(true);
      setHelperText('Please Select The Option');
    }
    if (maritalstatus == '') {
      setMAritalStatusError(true);
      setHelperText('Please Select The Option');
    }
    if (phone == '') {
      setSmartPhoneError(true);
      setHelperText('Please Select The Option');
    }
    if (sector == '') {
      setSectorError(true);
      setHelperText('Please Select The Option');
    }
    if (numberproficiency == '') {
      setNumberproficiencyError(true);
      setHelperText('Please Select The Option');
    }
    if (writtenproficiency == '') {
      setWrittenproficiencyError(true);
      setHelperText('Please Select The Option');
    }
    if (bussinessyears == '') {
      setBussinessyearsError(true);
      setHelperText('Please Select The Option');
    }
    if (licensevalue == '') {
      setlicensevalueError(true);
      setHelperText('Please Select The Option');
    }
    if (homebased == '') {
      setHounseBaseError(true);
      setHelperText('Please Select The Option');
    }
    if (challengesvalue == '') {
      setchallengesvalueError(true);
      setHelperText('Please Select The Option');
    }
    if (bussinesscurrentstate == '') {
      setbussinesscurrentstateError(true);
      setHelperText('Please Select The Option');
    }
    if (accountbooks == '') {
      setaccountbooksError(true);
      setHelperText('Please Select The Option');
    }
    if (generateideas == '') {
      setgenerateideasError(true);
      setHelperText('Please Select The Option');
    }
    if (bussinessplan == '') {
      setbussinessplanError(true);
      setHelperText('Please Select The Option');
    }
    if (submitbussinessplan == '') {
      setsubmitbussinessplanError(true);
      setHelperText('Please Select The Option');
    }
    if (finance == '') {
      setfinanceError(true);
      setHelperText('Please Select The Option');
    }
    if (loan == '') {
      setloanError(true);
      setHelperText('Please Select The Option');
    }
    if (accessingloan == '') {
      setaccessingloanError(true);
      setHelperText('Please Select The Option');
    }
    if (currentloan == '') {
      setcurrentloanError(true);
      setHelperText('Please Select The Option');
    }
    if (bussinesskills == '') {
      setbussinessSkillError(true);
      setHelperText('Please Select The Option');
    }
    if (checked['please_list_down_the_various_components_of_business'] == 0) {
      setbusinessError(true);
      setHelperText('Please Select The Option');
    }
    if (checked['tell_us_three_things_about_you_as_an_entrepreneur'] == 0) {
      setentrepreneurError(true);
      setHelperText('Please Select The Option');
    }
    if (checked['what_are_the_prerequisites_to_access_a_loan'] == 0) {
      setloansError(true);
      setHelperText('Please Select The Option');
    }
    if (
      bussinesskills != ' ' &&
      currentloan != '' &&
      accessingloan != '' &&
      loan != '' &&
      finance != '' &&
      submitbussinessplan != '' &&
      bussinessplan != '' &&
      generateideas != '' &&
      accountbooks != '' &&
      bussinesscurrentstate != '' &&
      challengesvalue != '' &&
      homebased != '' &&
      licensevalue != '' &&
      bussinessyears != '' &&
      writtenproficiency != '' &&
      numberproficiency != '' &&
      sector != '' &&
      phone != '' &&
      maritalstatus != '' &&
      survey != '' &&
      education != ''&&
      (checked['please_list_down_the_various_components_of_business'] != 0)&&
      (checked['tell_us_three_things_about_you_as_an_entrepreneur'] != 0)&&
      (checked['what_are_the_prerequisites_to_access_a_loan'] != 0)
    ) {

    setvyaparform(saveDataLocally('vyapar',JSON.parse(data)));
    handleClose();
    componentreloadmethod();
 
    }
    else{
      alert('Please Select the Option');
    }
  }
  };
  const gelathinamelist = (async) => {
    var config = {
      method: 'post',
      url: baseURL + 'getGelathiList',
      headers: {
        'Content-Type': 'application/json',
         'Authorization': `${apikey}`
      }
    };
    axios(config)
      .then(function (response) {
        localStorage.setItem('gelathilist',JSON.stringify(response?.data));
        setVyaapar(response?.data);
      })
      .catch(function (error) {
        let gelathidata=JSON.parse(localStorage.getItem('gelathilist'))
        setVyaapar(gelathidata);
      });
  };

    const [loader, setLoader] = useState(true);
  useEffect(() => {
    // After 3 seconds, set showCard to true to render the Card component
    const delay = 3000; // 3 seconds in milliseconds
    const timeoutId = setTimeout(() => {
      setLoader(false);
    }, delay);
  })


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
     {(isOnline())? <Stack style={{ position: 'absolute', right: 0, float: 'right', margin: 2, padding: 2 }} mb={2}>
        <button onClick={handleClickOpen} style={{border: 'none',marginRight:25, outline: 'none', background: 'transparent', cursor: 'pointer'}}>
         <svg xmlns="http://www.w3.org/2000/svg" color="#ff7424" width="1.5em" height="1.5em" viewBox="0 0 36 36"><path fill="currentColor" d="M21 12H7a1 1 0 0 1-1-1V7a1 1 0 0 1 1-1h14a1 1 0 0 1 1 1v4a1 1 0 0 1-1 1ZM8 10h12V7.94H8Z" class="clr-i-outline clr-i-outline-path-1"/><path fill="currentColor" d="M21 14.08H7a1 1 0 0 0-1 1V19a1 1 0 0 0 1 1h11.36L22 16.3v-1.22a1 1 0 0 0-1-1ZM20 18H8v-2h12Z" class="clr-i-outline clr-i-outline-path-2"/><path fill="currentColor" d="M11.06 31.51v-.06l.32-1.39H4V4h20v10.25l2-1.89V3a1 1 0 0 0-1-1H3a1 1 0 0 0-1 1v28a1 1 0 0 0 1 1h8a3.44 3.44 0 0 1 .06-.49Z" class="clr-i-outline clr-i-outline-path-3"/><path fill="currentColor" d="m22 19.17l-.78.79a1 1 0 0 0 .78-.79Z" class="clr-i-outline clr-i-outline-path-4"/><path fill="currentColor" d="M6 26.94a1 1 0 0 0 1 1h4.84l.3-1.3l.13-.55v-.05H8V24h6.34l2-2H7a1 1 0 0 0-1 1Z" class="clr-i-outline clr-i-outline-path-5"/><path fill="currentColor" d="m33.49 16.67l-3.37-3.37a1.61 1.61 0 0 0-2.28 0L14.13 27.09L13 31.9a1.61 1.61 0 0 0 1.26 1.9a1.55 1.55 0 0 0 .31 0a1.15 1.15 0 0 0 .37 0l4.85-1.07L33.49 19a1.6 1.6 0 0 0 0-2.27ZM18.77 30.91l-3.66.81l.89-3.63L26.28 17.7l2.82 2.82Zm11.46-11.52l-2.82-2.82L29 15l2.84 2.84Z" class="clr-i-outline clr-i-outline-path-6"/><path fill="none" d="M0 0h36v36H0z"/></svg>
        </button>
      </Stack>:<Stack>
        <button onClick={handleClickOpen} style={{border: 'none',marginRight:25, outline: 'none', background: 'transparent', cursor: 'pointer'}}>  
           <svg xmlns="http://www.w3.org/2000/svg" color="#ff7424" width="1.5em" height="1.5em" viewBox="0 0 36 36"><path fill="currentColor" d="M21 12H7a1 1 0 0 1-1-1V7a1 1 0 0 1 1-1h14a1 1 0 0 1 1 1v4a1 1 0 0 1-1 1ZM8 10h12V7.94H8Z" class="clr-i-outline clr-i-outline-path-1"/><path fill="currentColor" d="M21 14.08H7a1 1 0 0 0-1 1V19a1 1 0 0 0 1 1h11.36L22 16.3v-1.22a1 1 0 0 0-1-1ZM20 18H8v-2h12Z" class="clr-i-outline clr-i-outline-path-2"/><path fill="currentColor" d="M11.06 31.51v-.06l.32-1.39H4V4h20v10.25l2-1.89V3a1 1 0 0 0-1-1H3a1 1 0 0 0-1 1v28a1 1 0 0 0 1 1h8a3.44 3.44 0 0 1 .06-.49Z" class="clr-i-outline clr-i-outline-path-3"/><path fill="currentColor" d="m22 19.17l-.78.79a1 1 0 0 0 .78-.79Z" class="clr-i-outline clr-i-outline-path-4"/><path fill="currentColor" d="M6 26.94a1 1 0 0 0 1 1h4.84l.3-1.3l.13-.55v-.05H8V24h6.34l2-2H7a1 1 0 0 0-1 1Z" class="clr-i-outline clr-i-outline-path-5"/><path fill="currentColor" d="m33.49 16.67l-3.37-3.37a1.61 1.61 0 0 0-2.28 0L14.13 27.09L13 31.9a1.61 1.61 0 0 0 1.26 1.9a1.55 1.55 0 0 0 .31 0a1.15 1.15 0 0 0 .37 0l4.85-1.07L33.49 19a1.6 1.6 0 0 0 0-2.27ZM18.77 30.91l-3.66.81l.89-3.63L26.28 17.7l2.82 2.82Zm11.46-11.52l-2.82-2.82L29 15l2.84 2.84Z" class="clr-i-outline clr-i-outline-path-6"/><path fill="none" d="M0 0h36v36H0z"/></svg></button>
           </Stack>}
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
               {(isOnline())? <Iconify icon="material-symbols:arrow-back-rounded" />:<div style={{borderRadius:5}}>🡠</div>}
              </IconButton>
              <Typography sx={{ ml: 2, flex: 1, color: 'white' }} variant="h6" component="div">
                Buzz Vyapar Program Baseline
              </Typography>
              <Button edge="end" color="inherit" type="submit" onClick={()=>{}} style={{ color: 'white' }}>
               {(isOnline())? <Iconify icon="material-symbols:save" width={30} height={30} />:"save"}
              </Button>
            </Toolbar>
          </AppBar>
       {/* {isFormPresentLocally?
         <Typography sx={{ ml: 2, flex: 1, color: 'black',textAlign:'center' ,justifyContent:"center",alignItems:'center'}}  variant="h6" component="div">
         This form is already filled!
       </Typography> */}
       {/* :  */}
       {(loader)? 
          <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '70vh' }}>
                <CircularProgress sx={{color:'#ff7424'}}/>
           </Box>:
       <Grid>
      
            <Card>
              <CardContent>
                <Card style={{ marginTop: 50, borderRadius: 20 }}>
                  <CardContent>
                    <Typography style={{ color: '#ff7424' }}>Name of the GF / ಗೆಳತಿಯ ಹೆಸರು *</Typography>
                    <Stack mt={2} mb={2}>
                      <Select
                        color="common"
                        label="Choose Gelathi Facilitator"
                        required
                        variant="standard"
                        onChange={(e) => setSendData({ ...sendData, gfId: e?.target?.value })}
                        value={sendData?.gfId}
                      >
                        {vyaapar?.list?.map((itm) => {
                          return <MenuItem value={itm.id}>{itm?.first_name}</MenuItem>;
                        })}
                      </Select>
                    </Stack>
                  </CardContent>
                </Card>
                <Card style={{ marginTop: 20, borderRadius: 20 }}>
                  <CardContent>
                    <Stack mt={2}>
                      <Typography style={{ color: '#ff7424' }}>
                        When was survey done / ಸಮೀಕ್ಷೆ ಯಾವಾಗ ಮಾಡಲಾಯಿತು? *
                        {whenSurveyDoneError ? (
                          <FormHelperText style={{ color: 'red' }}>{helperText}</FormHelperText>
                        ) : null}
                      </Typography>
                      <RadioGroup
                        aria-labelledby="demo-radio-buttons-group-label"
                        // defaultValue="Yes"
                        name="radio-buttons-group"
                        value={survey}
                        onChange={surveydone}
                      >
                        <FormControlLabel
                          value="Before Bootcamp1"
                          control={<Radio style={{ color: '#595959' }} />}
                          label="Before Bootcamp1"
                        />
                        <FormControlLabel
                          value="Before Bootcamp2"
                          control={<Radio style={{ color: '#595959' }} />}
                          label="Before Bootcamp2"
                        />
                        <FormControlLabel
                          value="Other"
                          control={<Radio style={{ color: '#595959' }} />}
                          label="Other"
                        />
                      </RadioGroup>
                    </Stack>
                  </CardContent>
                </Card>
                <Card style={{ marginTop: 20, borderRadius: 20 }}>
                  <CardContent>
                    <Typography style={{ color: '#ff7424' }}>Name of vyapari / ವ್ಯಾಪಾರಿಯ ಹೆಸರು *</Typography>
                    <Stack mt={2} mb={2}>
                      <TextField
                        id="vyapari name"
                        required
                        label="Your Answer"
                        type="text"
                        variant="outlined"
                        color="common"
                      
                        onChange={(e) => setSendData({ ...sendData, name_of_the_vyapari: e?.target?.value })}
                        value={sendData?.name_of_the_vyapari}
                      />
                    </Stack>
                  </CardContent>
                </Card>
                <Card style={{ marginTop: 20, borderRadius: 20 }}>
                  <CardContent>
                    <Typography style={{ color: '#ff7424' }}>Age / ವಯಸ್ಸು *</Typography>
                    <Stack mt={2} mb={2}>
                      {/* <TextField id="Age" required type="number" min="0" label="Your Answer" variant="outlined" color="common" onChange={(e) => setSendData({ ...sendData, age:e.target.value})} value={sendData?.age}/> */}
                      <TextField
                        id="Age"
                        required
                        type="number"
                        step="0.01"
                        label="Your Answer"
                        variant="outlined"
                        color="common"
                        onChange={(e) => {
                          const newValue = e.target.value;
                          if (newValue >= 0) {
                            setSendData({ ...sendData, age: newValue });
                          }
                        }}
                        value={sendData?.age}
                      />
                    </Stack>
                  </CardContent>
                </Card>
                <Card style={{ marginTop: 20, borderRadius: 20 }}>
                  <CardContent>
                    <Typography style={{ color: '#ff7424' }}>Contact Number /ಸಂಪರ್ಕ ಸಂಖ್ಯೆ *</Typography>
                    <Stack mt={2} mb={2}>
                      <TextField
                        id="phone-number"
                        required
                        type="number"
                        inputProps={{ maxLength: 10, min: 10 }}
                        label="Your Answer"
                        variant="outlined"
                        color="common"
                        onChange={(e) => {
                          if (e.target.value.toString().length <= 10) {
                            setSendData({ ...sendData, contact_number: e.target.value });
                          }
                        }}
                        value={sendData?.contact_number}
                      />
                    </Stack>
                  </CardContent>
                </Card>
                <Card style={{ marginTop: 20, borderRadius: 20 }}>
                  <CardContent>
                    <Typography style={{ color: '#ff7424' }}>Village Name *</Typography>
                    <Stack mt={2} mb={2}>
                      <TextField
                        id="village Name"
                        required
                        label="Your Answer"
                        type="text"
                        variant="outlined"
                        color="common"
                        onChange={(e) => setSendData({ ...sendData, village_id: e.target.value })}
                        value={sendData?.village_id}
                      />
                    </Stack>
                  </CardContent>
                </Card>
                <Card style={{ marginTop: 20, borderRadius: 20 }}>
                  <CardContent>
                    <Typography style={{ color: '#ff7424' }}>Name of the Cohort / ಸ್ಥಳ/ವೃತ್ತ *</Typography>
                    <Stack mt={2} mb={2}>
                      <TextField
                        id="cohort name"
                        required
                        type="text"
                        label="Your Answer"
                        variant="outlined"
                        color="common"
                        onChange={(e) => setSendData({ ...sendData, name_of_the_cohort: e.target.value })}
                        value={sendData?.name_of_the_cohort}
                      />
                    </Stack>
                  </CardContent>
                </Card>
                <Card style={{ marginTop: 20, borderRadius: 20 }}>
                  <CardContent>
                    <Stack mt={2}>
                      <Typography style={{ color: '#ff7424' }}>
                        Education / ವಿದ್ಯಾಭ್ಯಾಸ
                        {Educationerror ? (
                          <FormHelperText style={{ color: 'red' }}>{helperText}</FormHelperText>
                        ) : null}{' '}
                      </Typography>
                      <RadioGroup
                        aria-labelledby="demo-radio-buttons-group-label"
                        // defaultValue="Yes"
                        name="radio-buttons-group"
                        value={education}
                        onChange={educationlevel}
                        required
                      >
                        <FormControlLabel
                          value="Below 8th std"
                          control={<Radio style={{ color: '#595959' }} />}
                          label="Below 8th std"
                        />
                        <FormControlLabel
                          value="10th - 12th std"
                          control={<Radio style={{ color: '#595959' }} />}
                          label="10th - 12th std"
                        />
                        <FormControlLabel
                          value="Under graduate"
                          control={<Radio style={{ color: '#595959' }} />}
                          label="Under graduate"
                        />
                        <FormControlLabel
                          value="Post graduation"
                          control={<Radio style={{ color: '#595959' }} />}
                          label="Post graduation"
                        />
                        <FormControlLabel
                          value="Technical(ITI/Diploma)"
                          control={<Radio style={{ color: '#595959' }} />}
                          label="Technical(ITI/Diploma)"
                        />
                        <FormControlLabel
                          value="No formal education"
                          control={<Radio style={{ color: '#595959' }} />}
                          label="No formal education"
                        />
                      </RadioGroup>
                    </Stack>
                  </CardContent>
                </Card>
                <Card style={{ marginTop: 20, borderRadius: 20 }}>
                  <CardContent>
                    <Stack mt={2}>
                      <Typography style={{ color: '#ff7424' }}>
                        Marital Status / ವೈವಾಹಿಕ ಸ್ಥಿತಿ
                        {MAritalStatusError ? (
                          <FormHelperText style={{ color: 'red' }}>{helperText}</FormHelperText>
                        ) : null}
                      </Typography>
                      <RadioGroup
                        aria-labelledby="demo-radio-buttons-group-label"
                        // defaultValue="Yes"
                        name="radio-buttons-group"
                        value={maritalstatus}
                        onChange={marital}
                      >
                        <FormControlLabel
                          value="Married"
                          control={<Radio style={{ color: '#595959' }} />}
                          label="Married"
                        />
                        <FormControlLabel
                          value="Unmarried"
                          control={<Radio style={{ color: '#595959' }} />}
                          label="Unmarried"
                        />
                        <FormControlLabel
                          value="Widowed"
                          control={<Radio style={{ color: '#595959' }} />}
                          label="Widowed"
                        />
                        <FormControlLabel
                          value="Seperated"
                          control={<Radio style={{ color: '#595959' }} />}
                          label="Separated"
                        />
                        <FormControlLabel
                          value="Divorced"
                          control={<Radio style={{ color: '#595959' }} />}
                          label="Divorced"
                        />
                      </RadioGroup>
                    </Stack>
                  </CardContent>
                </Card>
                <Card style={{ marginTop: 20, borderRadius: 20 }}>
                  <CardContent>
                    <Typography style={{ color: '#ff7424' }}>
                      Number of people in the household / ಮನೆಯಲ್ಲಿರುವ ಜನರ ಸಂಖ್ಯೆ
                    </Typography>
                    <Stack mt={2} mb={2}>
                      <TextField
                        id="household peoplecount"
                        type="number"
                        label="Your Answer"
                        required
                        variant="outlined"
                        color="common"
                        onChange={(e) =>
                          setSendData({ ...sendData, number_of_people_in_the_household: e.target.value })
                        }
                        value={sendData?.number_of_people_in_the_household}
                      />
                    </Stack>
                  </CardContent>
                </Card>
                <Card style={{ marginTop: 20, borderRadius: 20 }}>
                  <CardContent>
                    <Stack mt={2}>
                      <Typography style={{ color: '#ff7424' }}>
                        Do you own a smart phone / ನೀವು ಸ್ಮಾರ್ಟ್ ಫೋನ್ ಹೊಂದಿದ್ದೀರಾ?
                        {smartPhoneError ? (
                          <FormHelperText style={{ color: 'red' }}>{helperText}</FormHelperText>
                        ) : null}
                      </Typography>
                      <RadioGroup
                        aria-labelledby="demo-radio-buttons-group-label"
                        // defaultValue="Yes"
                        name="radio-buttons-group"
                        value={phone}
                        onChange={phonestatus}
                      >
                        <FormControlLabel value="Yes" control={<Radio style={{ color: '#595959' }} />} label="Yes" />
                        <FormControlLabel value="No" control={<Radio style={{ color: '#595959' }} />} label="No" />
                      </RadioGroup>
                    </Stack>
                  </CardContent>
                </Card>
                {isSmartPhone ? (
                  <Card style={{ marginTop: 20, borderRadius: 20 }}>
                    <CardContent>
                      <Stack mt={2}>
                        <Typography style={{ color: '#ff7424' }}>
                          Do you have internet connection on your smart phone? / ನಿಮ್ಮ ಸ್ಮಾರ್ಟ್ ಫೋನ್‌ನಲ್ಲಿ ಇಂಟರ್ನೆಟ್
                          ಸಂಪರ್ಕವಿದೆಯೇ?
                          {smartPhoneError ? (
                            <FormHelperText style={{ color: 'red' }}>{helperText}</FormHelperText>
                          ) : null}
                        </Typography>
                        <RadioGroup
                          aria-labelledby="demo-radio-buttons-group-label"
                          // defaultValue="Yes"
                          name="radio-buttons-group"
                          value={internet}
                          onChange={internetHandler}
                        >
                          <FormControlLabel value="Yes" control={<Radio style={{ color: '#595959' }} />} label="Yes" />
                          <FormControlLabel value="No" control={<Radio style={{ color: '#595959' }} />} label="No" />
                          <FormControlLabel
                            value="Sometime"
                            control={<Radio style={{ color: '#595959' }} />}
                            label="Sometimes"
                          />
                        </RadioGroup>
                      </Stack>
                    </CardContent>
                  </Card>
                ) : null}
                <Card style={{ marginTop: 20, borderRadius: 20 }}>
                  <CardContent>
                    <Typography style={{ color: '#ff7424' }}>
                      Sector/Type of business ಪ್ರಾಥಮಿಕ ವ್ಯವಹಾರದ ವಲಯ/ ವ್ಯ ವಹಾರದ ಪ್ರಕಾರ (ಇದು ಹೆಚ್ಚಿ ನ ಆದಾಯವನ್ನು ನೀಡುತ್ತದೆ)
                      {sectorError ? <FormHelperText style={{ color: 'red' }}>{helperText}</FormHelperText> : null}
                    </Typography>
                    <RadioGroup
                      aria-labelledby="demo-radio-buttons-group-label"
                      name="radio-buttons-group"
                      value={sector}
                      onChange={sectortype}
                    >
                      <FormControlLabel
                        value="Animal husbandry"
                        control={<Radio style={{ color: '#595959' }} />}
                        label="Animal husbandry"
                      />
                      <FormControlLabel
                        value="Petty shop"
                        control={<Radio style={{ color: '#595959' }} />}
                        label="Petty shop"
                      />
                      <FormControlLabel
                        value="Clothes Selling"
                        control={<Radio style={{ color: '#595959' }} />}
                        label="Clothes Selling"
                      />
                      <FormControlLabel
                        value="Vegetable Vendor"
                        control={<Radio style={{ color: '#595959' }} />}
                        label="Vegetable Vendor"
                      />
                      <FormControlLabel
                        value="Hotel or Catering"
                        control={<Radio style={{ color: '#595959' }} />}
                        label="Hotel or Catering"
                      />
                      <FormControlLabel
                        value="Tailor"
                        control={<Radio style={{ color: '#595959' }} />}
                        label="Tailor"
                      />
                      <FormControlLabel
                        value="Beautician"
                        control={<Radio style={{ color: '#595959' }} />}
                        label="Beautician"
                      />
                      <FormControlLabel
                        value="Rope making"
                        control={<Radio style={{ color: '#595959' }} />}
                        label="Rope making"
                      />
                      <FormControlLabel
                        value="Edible oil selling"
                        control={<Radio style={{ color: '#595959' }} />}
                        label="Edible oil selling"
                      />
                      <FormControlLabel value="Other" control={<Radio style={{ color: '#595959' }} />} label="Other" />
                    </RadioGroup>
                  </CardContent>
                </Card>
                <Card style={{ marginTop: 20, borderRadius: 20 }}>
                  <CardContent>
                    <Stack mt={2}>
                      <Typography style={{ color: '#ff7424' }}>
                        Are you proficient with numbers? / ನೀವು ಸಂಖ್ಯೆಗಳಲ್ಲಿ ಪ್ರವೀಣರಾಗಿದ್ದೀರಾ
                        {numberproficiencyError ? (
                          <FormHelperText style={{ color: 'red' }}>{helperText}</FormHelperText>
                        ) : null}
                      </Typography>
                      <RadioGroup
                        aria-labelledby="demo-radio-buttons-group-label"
                        // defaultValue="Yes"
                        name="radio-buttons-group"
                        value={numberproficiency}
                        onChange={numberproficiencyvalue}
                      >
                        <FormControlLabel
                          value="Basic"
                          control={<Radio style={{ color: '#595959' }} />}
                          label="Basic"
                        />
                        <FormControlLabel
                          value="Proficient"
                          control={<Radio style={{ color: '#595959' }} />}
                          label="Proficient"
                        />
                        <FormControlLabel
                          value="Competent"
                          control={<Radio style={{ color: '#595959' }} />}
                          label="Competent"
                        />
                      </RadioGroup>
                    </Stack>
                  </CardContent>
                </Card>
                <Card style={{ marginTop: 20, borderRadius: 20 }}>
                  <CardContent>
                    <Stack mt={2}>
                      <Typography style={{ color: '#ff7424' }}>
                        Are you proficient with written language / ನೀವು ಲಿಖಿತ ಭಾಷೆಯಲ್ಲಿ ಪ್ರವೀಣರಾಗಿದ್ದೀರಾ
                        {writtenproficiencyError ? (
                          <FormHelperText style={{ color: 'red' }}>{helperText}</FormHelperText>
                        ) : null}
                      </Typography>
                      <RadioGroup
                        aria-labelledby="demo-radio-buttons-group-label"
                        // defaultValue="Yes"
                        name="radio-buttons-group"
                        value={writtenproficiency}
                        onChange={writtenproficiencyvalue}
                      >
                        <FormControlLabel
                          value="Basic"
                          control={<Radio style={{ color: '#595959' }} />}
                          label="Basic"
                        />
                        <FormControlLabel
                          value="Proficient"
                          control={<Radio style={{ color: '#595959' }} />}
                          label="Proficient"
                        />
                        <FormControlLabel
                          value="Competent"
                          control={<Radio style={{ color: '#595959' }} />}
                          label="Competent"
                        />
                      </RadioGroup>
                    </Stack>
                  </CardContent>
                </Card>
                <Card style={{ marginTop: 20, borderRadius: 20 }}>
                  <CardContent>
                    <Typography style={{ color: '#ff7424' }}>Household income (Monthly) ಮನೆಯಆದಾಯ (ಮಾಸಿಕ)</Typography>
                    <Stack mt={2} mb={2}>
                      <TextField
                        id="income"
                        required
                        label="Your Answer"
                        type="number"
                        variant="outlined"
                        color="common"
                        onChange={(e) => setSendData({ ...sendData, household_income_monthly: e.target.value })}
                        value={sendData?.household_income_monthly}
                      />
                    </Stack>
                  </CardContent>
                </Card>
                <Card style={{ marginTop: 20, borderRadius: 20 }}>
                  <CardContent>
                    <Typography style={{ color: '#ff7424' }}>
                      Over the last month your average income / ಕಳೆದ ತಿಂಗಳು ನಿಮ್ಮ ಸರಾಸರಿ ಆದಾಯ
                    </Typography>
                    <Stack mt={2} mb={2}>
                      <TextField
                        id="average income"
                        required
                        type="number"
                        label="Your Answer"
                        variant="outlined"
                        color="common"
                        onChange={(e) =>
                          setSendData({ ...sendData, over_the_last_month_your_average_income: e.target.value })
                        }
                        value={sendData?.over_the_last_month_your_average_income}
                      />
                    </Stack>
                  </CardContent>
                </Card>
                <Card style={{ marginTop: 20, borderRadius: 20 }}>
                  <CardContent>
                    <Typography style={{ color: '#ff7424' }}>
                      Your profit (last month) / ನಿಮ್ಮ ಲಾಭ (ಕಳೆದ ತಿಂಗಳು){' '}
                    </Typography>
                    <Stack mt={2} mb={2}>
                      <TextField
                        id="profit"
                        required
                        label="Your Answer"
                        type="number"
                        variant="outlined"
                        color="common"
                        onChange={(e) => setSendData({ ...sendData, your_business_profit_last_month: e.target.value })}
                        value={sendData?.your_business_profit_last_month}
                      />
                    </Stack>
                  </CardContent>
                </Card>
                <Card style={{ marginTop: 20, borderRadius: 20 }}>
                  <CardContent>
                    <Typography style={{ color: '#ff7424' }}>
                      How much monthly income would you like to ideally earn / ನೀವು ಎಷ್ಟು ಮಾಸಿಕ ಆದಾಯವನ್ನು ಆದರ್ಶಪ್ರಾಯವಾಗಿ
                      ಗಳಿಸಲು ಬಯಸುತ್ತೀರಿ
                    </Typography>
                    <Stack mt={2} mb={2}>
                      <TextField
                        id="monthlyincome"
                        label="Your Answer"
                        type="number"
                        variant="outlined"
                        color="common"
                        onChange={(e) =>
                          setSendData({
                            ...sendData,
                            how_much_monthly_income_would_you_like_to_ideally_earn: e.target.value,
                          })
                        }
                        value={sendData?.how_much_monthly_income_would_you_like_to_ideally_earn}
                      />
                    </Stack>
                  </CardContent>
                </Card>
                <Card style={{ marginTop: 20, borderRadius: 20 }}>
                  <CardContent>
                    <Typography style={{ color: '#ff7424' }}>
                      Amount invested when the business started (approximately if they know) / ವ್ಯಾಪಾರ ಪ್ರಾರಂಭವಾದಾಗ
                      ಹೂಡಿಕೆ ಮಾಡಿದ ಮೊತ್ತ (ಅವರು ತಿಳಿದಿದ್ದರೆ)
                    </Typography>
                    <Stack mt={2} mb={2}>
                      <TextField
                        id="invested amount"
                        required
                        type="number"
                        label="Your Answer"
                        variant="outlined"
                        color="common"
                        onChange={(e) =>
                          setSendData({ ...sendData, amount_invested_when_the_business_started: e.target.value })
                        }
                        value={sendData?.amount_invested_when_the_business_started}
                      />
                    </Stack>
                  </CardContent>
                </Card>
                <Card style={{ marginTop: 20, borderRadius: 20 }}>
                  <CardContent>
                    <Stack mt={2}>
                      <Typography style={{ color: '#ff7424' }}>
                        Number of years the business has been operating / ವ್ಯವಹಾರವು ಕಾರ್ಯನಿರ್ವಹಿಸುತ್ತಿರುವ ವರ್ಷಗಳ ಸಂಖ್ಯೆ
                        {bussinessyearsError ? (
                          <FormHelperText style={{ color: 'red' }}>{helperText}</FormHelperText>
                        ) : null}
                      </Typography>
                      <RadioGroup
                        aria-labelledby="demo-radio-buttons-group-label"
                        // defaultValue="Yes"
                        name="radio-buttons-group"
                        value={bussinessyears}
                        onChange={bussinessyearsvalue}
                      >
                        <FormControlLabel
                          value="Less than 1 year"
                          control={<Radio style={{ color: '#595959' }} />}
                          label="Less than 1 year"
                        />
                        <FormControlLabel
                          value="1-3 years"
                          control={<Radio style={{ color: '#595959' }} />}
                          label="1-3 years"
                        />
                        <FormControlLabel
                          value="4-6 years"
                          control={<Radio style={{ color: '#595959' }} />}
                          label="4-6 years"
                        />
                        <FormControlLabel
                          value="5-8 years"
                          control={<Radio style={{ color: '#595959' }} />}
                          label="5-8 years"
                        />
                        <FormControlLabel
                          value="8-10 years"
                          control={<Radio style={{ color: '#595959' }} />}
                          label="8-10 years"
                        />
                        <FormControlLabel
                          value="more than 10 years"
                          control={<Radio style={{ color: '#595959' }} />}
                          label="more than 10 years"
                        />
                      </RadioGroup>
                    </Stack>
                  </CardContent>
                </Card>
                <Card style={{ marginTop: 20, borderRadius: 20 }}>
                  <CardContent>
                    <Typography style={{ color: '#ff7424' }}>
                      For any reason have you stopped or kept hold your business / ಯಾವುದೇ ಕಾರಣಕ್ಕಾಗಿ ನೀವು ನಿಮ್ಮ
                      ವ್ಯಾಪಾರವನ್ನು ನಿಲ್ಲಿಸಿದ್ದೀರಿ ಅಥವಾ ಹಿಡಿದಿಟ್ಟುಕೊಳ್ಳುತ್ತೀರಿ
                    </Typography>
                    <Stack mt={2} mb={2}>
                      <TextField
                        id="reason"
                        required
                        label="Your Answer"
                        variant="outlined"
                        color="common"
                        onChange={(e) => setSendData({ ...sendData, you_stopped_hold_your_business: e.target.value })}
                        value={sendData?.you_stopped_hold_your_business}
                      />
                    </Stack>
                  </CardContent>
                </Card>
                <Card style={{ marginTop: 20, borderRadius: 20 }}>
                  <CardContent>
                    <Typography style={{ color: '#ff7424' }}>
                      No.of hours engaged in a day for business / ವ್ಯವಹಾರಕ್ಕಾಗಿ ಒಂದು ದಿನದಲ್ಲಿ ಎಷ್ಟು ಗಂಟೆಗಳು
                      ತೊಡಗಿಸಿಕೊಳ್ಳುವಿರಿ?
                    </Typography>
                    <Stack mt={2} mb={2}>
                      <TextField
                        id="hours"
                        required
                        label="Your Answer"
                        type="number"
                        variant="outlined"
                        color="common"
                        onChange={(e) => setSendData({ ...sendData, no_hours_engaged_business: e.target.value })}
                        value={sendData?.no_hours_engaged_business}
                      />
                    </Stack>
                  </CardContent>
                </Card>
                <Card style={{ marginTop: 20, borderRadius: 20 }}>
                  <CardContent>
                    <Stack mt={2}>
                      <Typography style={{ color: '#ff7424' }}>
                        Do you have license for existing business / ಅಸ್ತಿತ್ವದಲ್ಲಿರುವ ವ್ಯಾಪಾರಕ್ಕಾಗಿ ನೀವು ಪರವಾನಗಿ
                        ಹೊಂದಿದ್ದೀರಾ?
                        {licensevalueaError ? (
                          <FormHelperText style={{ color: 'red' }}>{helperText}</FormHelperText>
                        ) : null}
                      </Typography>
                      <RadioGroup
                        aria-labelledby="demo-radio-buttons-group-label"
                        // defaultValue="Yes"
                        name="radio-buttons-group"
                        value={licensevalue}
                        onChange={handlelicensevalue}
                      >
                        <FormControlLabel value="Yes" control={<Radio style={{ color: '#595959' }} />} label="Yes" />
                        <FormControlLabel value="No" control={<Radio style={{ color: '#595959' }} />} label="No" />
                      </RadioGroup>
                    </Stack>
                  </CardContent>
                </Card>
                <Card style={{ marginTop: 20, borderRadius: 20 }}>
                  <CardContent>
                    <Stack mt={2}>
                      <Typography style={{ color: '#ff7424' }}>
                        Is it home based or will you work from a shop/business unit/ ಇದು ಮನೆ ಆಧಾರಿತವಾಗಿದೆಯೇ ಅಥವಾ ನೀವು
                        ಅಂಗಡಿ/ ವ್ಯಾಪಾರ ಘಟಕದಿಂದ ಕೆಲಸ ಮಾಡುತ್ತೀರಾ?
                        {HouseBaseError ? <FormHelperText style={{ color: 'red' }}>{helperText}</FormHelperText> : null}
                      </Typography>
                      <RadioGroup
                        aria-labelledby="demo-radio-buttons-group-label"
                        // defaultValue="Yes"
                        name="radio-buttons-group"
                        value={homebased}
                        onChange={homebasedvalue}
                      >
                        <FormControlLabel
                          value="I work from home"
                          control={<Radio style={{ color: '#595959' }} />}
                          label="I work from home"
                        />
                        <FormControlLabel
                          value="I have my own business space"
                          control={<Radio style={{ color: '#595959' }} />}
                          label="I have my own business space"
                        />
                        <FormControlLabel
                          value="I share the space with husband/family member"
                          control={<Radio style={{ color: '#595959' }} />}
                          label="I share the space with husband/family member"
                        />
                      </RadioGroup>
                    </Stack>
                  </CardContent>
                </Card>
                <Card style={{ marginTop: 20, borderRadius: 20 }}>
                  <CardContent>
                    <Typography style={{ color: '#ff7424' }}>
                      Why do you do business / ನೀವು ಯಾಕೆ ವ್ಯಾಪಾರ ಮಾಡುತ್ತೀರಿ
                    </Typography>
                    <Stack mt={2} mb={2}>
                      <TextField
                        id="business reason"
                        required
                        type="text"
                        label="Your Answer"
                        variant="outlined"
                        color="common"
                        onChange={(e) => setSendData({ ...sendData, why_do_you_do_business: e.target.value })}
                        value={sendData?.why_do_you_do_business}
                      />
                    </Stack>
                  </CardContent>
                </Card>
                <Card style={{ marginTop: 20, borderRadius: 20 }}>
                  <CardContent>
                    <Typography style={{ color: '#ff7424' }}>
                      Tell us three things about you as an enterpreneur / ವಾಣಿಜ್ಯೋದ್ಯಮಿಯಾಗಿ ನಿಮ್ಮ ಬಗ್ಗೆ ಮೂರು ವಿಷಯಗಳನ್ನು
                      ನಮಗೆ ತಿಳಿಸಿ
                      {HouseBaseError ? <FormHelperText style={{ color: 'red' }}>{helperText}</FormHelperText> : null}
                    </Typography>
                    <Stack mt={2}>
                      <FormGroup>
                        <FormControlLabel
                          value="Self Motivated"
                          control={<Checkbox style={{ color: '#595959' }} />}
                          label="Self Motivated"
                          onChange={(event) =>
                            handleprerequisites('tell_us_three_things_about_you_as_an_entrepreneur', event)
                          }
                        />
                        <FormControlLabel
                          value="Financial knowledge"
                          control={<Checkbox style={{ color: '#595959' }} />}
                          label="Financial knowledge"
                          onChange={(event) =>
                            handleprerequisites('tell_us_three_things_about_you_as_an_entrepreneur', event)
                          }
                        />
                        <FormControlLabel
                          value="Hard working"
                          control={<Checkbox style={{ color: '#595959' }} />}
                          label="Hard working"
                          onChange={(event) =>
                            handleprerequisites('tell_us_three_things_about_you_as_an_entrepreneur', event)
                          }
                        />
                        <FormControlLabel
                          value="Leadership quality"
                          control={<Checkbox style={{ color: '#595959' }} />}
                          label="Leadership quality"
                          onChange={(event) =>
                            handleprerequisites('tell_us_three_things_about_you_as_an_entrepreneur', event)
                          }
                        />
                        <FormControlLabel
                          value="Decision maker"
                          control={<Checkbox style={{ color: '#595959' }} />}
                          label="Decision maker"
                          onChange={(event) =>
                            handleprerequisites('tell_us_three_things_about_you_as_an_entrepreneur', event)
                          }
                        />
                        <FormControlLabel
                          value="Business Vision"
                          control={<Checkbox style={{ color: '#595959' }} />}
                          label="Business Vision"
                          onChange={(event) =>
                            handleprerequisites('tell_us_three_things_about_you_as_an_entrepreneur', event)
                          }
                        />
                        <FormControlLabel
                          value="Market Knowledge"
                          control={<Checkbox style={{ color: '#595959' }} />}
                          label="Market Knowledge"
                          onChange={(event) =>
                            handleprerequisites('tell_us_three_things_about_you_as_an_entrepreneur', event)
                          }
                        />
                        <FormControlLabel
                          value="Others"
                          control={<Checkbox style={{ color: '#595959' }} />}
                          label="Others"
                          onChange={(event) =>
                            handleprerequisites('tell_us_three_things_about_you_as_an_entrepreneur', event)
                          }
                        />
                      </FormGroup>
                    </Stack>
                  </CardContent>
                </Card>
                <Card style={{ marginTop: 20, borderRadius: 20 }}>
                  <CardContent>
                    <Typography style={{ color: '#ff7424' }}>
                      Tell us three things about your role as a woman at home
                    </Typography>
                    <Stack mt={2} mb={2}>
                      <TextField
                        id="reason"
                        required
                        label="Your Answer"
                        variant="outlined"
                        color="common"
                        onChange={(e) =>
                          setSendData({
                            ...sendData,
                            tell_us_three_things_about_your_role_as_a_woman_at_home: e.target.value,
                          })
                        }
                        value={sendData?.tell_us_three_things_about_your_role_as_a_woman_at_home}
                      />
                    </Stack>
                  </CardContent>
                </Card>
                <Card style={{ marginTop: 20, backgroundColor: '#ff7424', borderRadius: 0, height: '60px' }}>
                  <CardContent>
                    <Typography style={{ color: '#ffffff' }}>Business Challenges</Typography>
                  </CardContent>
                </Card>
                <Card style={{ marginTop: 20, borderRadius: 20 }}>
                  <CardContent>
                    <Stack mt={2}>
                      <Typography style={{ color: '#ff7424' }}>
                        What are your challenges in running and growing your business? / ನಿಮ್ಮ ವ್ಯಾಪಾರವನ್ನು ನಡೆಸುವಲ್ಲಿ
                        ಮತ್ತು ಬೆಳೆಸುವಲ್ಲಿ ನಿಮ್ಮ ಸವಾಲುಗಳೇನು
                        {challengesvalueError ? (
                          <FormHelperText style={{ color: 'red' }}>{helperText}</FormHelperText>
                        ) : null}
                      </Typography>
                      <RadioGroup
                        aria-labelledby="demo-radio-buttons-group-label"
                        // defaultValue="Yes"
                        name="radio-buttons-group"
                        value={challengesvalue}
                        onChange={challengesbussiness}
                      >
                        <FormControlLabel
                          value="Limited Funding"
                          control={<Radio style={{ color: '#595959' }} />}
                          label="Limited Funding"
                        />
                        <FormControlLabel
                          value="Balancing Responsibilities"
                          control={<Radio style={{ color: '#595959' }} />}
                          label="Balancing Responsibilities"
                        />
                        <FormControlLabel
                          value="Fear of Failure"
                          control={<Radio style={{ color: '#595959' }} />}
                          label="Fear of Failure"
                        />
                        <FormControlLabel
                          value="No Support System"
                          control={<Radio style={{ color: '#595959' }} />}
                          label="No Support System"
                        />
                        <FormControlLabel
                          value="Limited business knowledge"
                          control={<Radio style={{ color: '#595959' }} />}
                          label="Limited business knowledge"
                        />
                        <FormControlLabel
                          value="Other"
                          control={<Radio style={{ color: '#595959' }} />}
                          label="Other"
                        />
                      </RadioGroup>
                    </Stack>
                  </CardContent>
                </Card>
                <Card style={{ marginTop: 20, borderRadius: 20 }}>
                  <CardContent>
                    <Typography style={{ color: '#ff7424' }}>
                      What is your plan to overcome these challenges?
                    </Typography>
                    <Stack mt={2} mb={2}>
                      <TextField
                        id="challenges"
                        required
                        label="Your Answer"
                        variant="outlined"
                        color="common"
                        onChange={(e) =>
                          setSendData({ ...sendData, what_is_your_plan_to_overcome_these_challenges: e.target.value })
                        }
                        value={sendData?.what_is_your_plan_to_overcome_these_challenges}
                      />
                    </Stack>
                  </CardContent>
                </Card>
                <Card style={{ marginTop: 20, borderRadius: 20 }}>
                  <CardContent>
                    <Typography style={{ color: '#ff7424' }}>What are your skills?</Typography>
                    <Stack mt={2} mb={2}>
                      <TextField
                        id="skills"
                        required
                        label="Your Answer"
                        variant="outlined"
                        color="common"
                        onChange={(e) => setSendData({ ...sendData, what_are_your_skills: e.target.value })}
                        value={sendData?.what_are_your_skills}
                      />
                    </Stack>
                  </CardContent>
                </Card>
                <Card style={{ marginTop: 20, borderRadius: 20 }}>
                  <CardContent>
                    <Typography style={{ color: '#ff7424' }}>
                      What are the resources available with you for your business? / ನಿಮ್ಮ ವ್ಯಾಪಾರಕ್ಕಾಗಿ ನಿಮ್ಮ ಬಳಿ
                      ಲಭ್ಯವಿರುವ ಸಂಪನ್ಮೂಲಗಳು ಯಾವುವು?
                    </Typography>
                    <Stack mt={2} mb={2}>
                      <TextField
                        id="resources"
                        required
                        label="Your Answer"
                        variant="outlined"
                        color="common"
                        onChange={(e) =>
                          setSendData({
                            ...sendData,
                            what_are_the_resources_available_with_you_for_your_business: e.target.value,
                          })
                        }
                        value={sendData?.what_are_the_resources_available_with_you_for_your_business}
                      />
                    </Stack>
                  </CardContent>
                </Card>
                <Card style={{ marginTop: 20, backgroundColor: '#ff7424', borderRadius: 0, height: '60px' }}>
                  <CardContent>
                    <Typography style={{ color: '#ffffff' }}>Business Components</Typography>
                  </CardContent>
                </Card>
                <Card style={{ marginTop: 20, borderRadius: 20 }}>
                  <CardContent>
                    <Typography style={{ color: '#ff7424' }}>
                      Who is your customer? Describe them to us / ನಿಮ್ಮ ಗ್ರಾಹಕ ಯಾರು? ಅವುಗಳನ್ನು ನಮಗೆ ವಿವರಿಸಿ
                    </Typography>
                    <Stack mt={2} mb={2}>
                      <TextField
                        id="customer"
                        required
                        label="Your Answer"
                        variant="outlined"
                        color="common"
                        onChange={(e) =>
                          setSendData({ ...sendData, who_is_your_customer_Describe_them_to_us: e.target.value })
                        }
                        value={sendData?.who_is_your_customer_Describe_them_to_us}
                      />
                    </Stack>
                  </CardContent>
                </Card>
                <Card style={{ marginTop: 20, borderRadius: 20 }}>
                  <CardContent>
                    <Typography style={{ color: '#ff7424' }}>
                      Please identify parts/aspects of business / ವ್ಯಾಪಾರದ ಭಾಗಗಳು/ಮಗ್ಗಲುಗಳನ್ನು ಗುರುತಿಸಿ
                    </Typography>
                    <Stack mt={2}>
                      <FormGroup>
                        <FormControlLabel
                          value="Infrastructure"
                          control={<Checkbox style={{ color: '#595959' }} />}
                          label="Infrastructure"
                          onChange={(event) =>
                            handleprerequisites('please_list_down_the_various_components_of_business', event)
                          }
                        />
                        <FormControlLabel
                          value="Marketing"
                          control={<Checkbox style={{ color: '#595959' }} />}
                          label="Marketing"
                          onChange={(event) =>
                            handleprerequisites('please_list_down_the_various_components_of_business', event)
                          }
                        />
                        <FormControlLabel
                          value="Funding"
                          control={<Checkbox style={{ color: '#595959' }} />}
                          label="Funding"
                          onChange={(event) =>
                            handleprerequisites('please_list_down_the_various_components_of_business', event)
                          }
                        />
                        <FormControlLabel
                          value="Customers"
                          control={<Checkbox style={{ color: '#595959' }} />}
                          label="Customers"
                          onChange={(event) =>
                            handleprerequisites('please_list_down_the_various_components_of_business', event)
                          }
                        />
                        <FormControlLabel
                          value="Products/Services"
                          control={<Checkbox style={{ color: '#595959' }} />}
                          label="Products/Services"
                          onChange={(event) =>
                            handleprerequisites('please_list_down_the_various_components_of_business', event)
                          }
                        />
                        <FormControlLabel
                          value="Family support"
                          control={<Checkbox style={{ color: '#595959' }} />}
                          label="Family support"
                          onChange={(event) =>
                            handleprerequisites('please_list_down_the_various_components_of_business', event)
                          }
                        />
                        <FormControlLabel
                          value="Confidence"
                          control={<Checkbox style={{ color: '#595959' }} />}
                          label="Confidence"
                          onChange={(event) =>
                            handleprerequisites('please_list_down_the_various_components_of_business', event)
                          }
                        />
                        <FormControlLabel
                          value="Good Communication"
                          control={<Checkbox style={{ color: '#595959' }} />}
                          label="Good Communication"
                          onChange={(event) =>
                            handleprerequisites('please_list_down_the_various_components_of_business', event)
                          }
                        />
                      </FormGroup>
                    </Stack>
                  </CardContent>
                </Card>
                <Card style={{ marginTop: 20, borderRadius: 20 }}>
                  <CardContent>
                    <Stack mt={2}>
                      <Typography style={{ color: '#ff7424' }}>
                        I know the current state of my business in terms of is it making profit, loss revenue
                        {bussinesscurrentstateError ? (
                          <FormHelperText style={{ color: 'red' }}>{helperText}</FormHelperText>
                        ) : null}
                      </Typography>
                      <RadioGroup
                        aria-labelledby="demo-radio-buttons-group-label"
                        // defaultValue="Yes"
                        name="radio-buttons-group"
                        value={bussinesscurrentstate}
                        onChange={bussinesscurrentstatevalue}
                      >
                        <FormControlLabel
                          value="Strongly Agree"
                          control={<Radio style={{ color: '#595959' }} />}
                          label="Strongly Agree"
                        />
                        <FormControlLabel
                          value="Agree"
                          control={<Radio style={{ color: '#595959' }} />}
                          label="Agree"
                        />
                        <FormControlLabel
                          value="Neutral"
                          control={<Radio style={{ color: '#595959' }} />}
                          label="Neutral"
                        />
                        <FormControlLabel
                          value="Disagree"
                          control={<Radio style={{ color: '#595959' }} />}
                          label="Disagree"
                        />
                        <FormControlLabel
                          value="Strongly Disagree"
                          control={<Radio style={{ color: '#595959' }} />}
                          label="Strongly Disagree"
                        />
                      </RadioGroup>
                    </Stack>
                  </CardContent>
                </Card>
                <Card style={{ marginTop: 20, borderRadius: 20 }}>
                  <CardContent>
                    <Stack mt={2}>
                      <Typography style={{ color: '#ff7424' }}>
                        What kind of books of accounts do you maintain?
                        {accountbooksError ? (
                          <FormHelperText style={{ color: 'red' }}>{helperText}</FormHelperText>
                        ) : null}
                      </Typography>
                      <RadioGroup
                        aria-labelledby="demo-radio-buttons-group-label"
                        // defaultValue="Yes"
                        name="radio-buttons-group"
                        value={accountbooks}
                        onChange={handleaccountbooks}
                      >
                        <FormControlLabel
                          value="I maintain no accounts"
                          control={<Radio style={{ color: '#595959' }} />}
                          label="I maintain no accounts"
                        />
                        <FormControlLabel
                          value="I have rough accounts"
                          control={<Radio style={{ color: '#595959' }} />}
                          label="I have rough accounts"
                        />
                        <FormControlLabel
                          value="I have a proper accounts"
                          control={<Radio style={{ color: '#595959' }} />}
                          label="I have a proper accounts"
                        />
                      </RadioGroup>
                    </Stack>
                  </CardContent>
                </Card>
                <Card style={{ marginTop: 20, borderRadius: 20 }}>
                  <CardContent>
                    <Stack mt={2}>
                      <Typography style={{ color: '#ff7424' }}>
                        I am confident that i can generate ideas to solve my business problems
                        {generateideasError ? (
                          <FormHelperText style={{ color: 'red' }}>{helperText}</FormHelperText>
                        ) : null}
                      </Typography>
                      <RadioGroup
                        aria-labelledby="demo-radio-buttons-group-label"
                        // defaultValue="Yes"
                        name="radio-buttons-group"
                        value={generateideas}
                        onChange={generateideasvalue}
                      >
                        <FormControlLabel
                          value="Strongly Agree"
                          control={<Radio style={{ color: '#595959' }} />}
                          label="Strongly Agree"
                        />
                        <FormControlLabel
                          value="Agree"
                          control={<Radio style={{ color: '#595959' }} />}
                          label="Agree"
                        />
                        <FormControlLabel
                          value="Neutral"
                          control={<Radio style={{ color: '#595959' }} />}
                          label="Neutral"
                        />
                        <FormControlLabel
                          value="Disagree"
                          control={<Radio style={{ color: '#595959' }} />}
                          label="Disagree"
                        />
                        <FormControlLabel
                          value="Strongly Disagree"
                          control={<Radio style={{ color: '#595959' }} />}
                          label="Strongly Disagree"
                        />
                      </RadioGroup>
                    </Stack>
                  </CardContent>
                </Card>
                <Card style={{ marginTop: 20, borderRadius: 20 }}>
                  <CardContent>
                    <Typography style={{ color: '#ff7424' }}>
                      Tell us about one business problem you solved, how did you solve it?
                    </Typography>
                    <Stack mt={2} mb={2}>
                      <TextField
                        id="business sol"
                        required
                        label="Your Answer"
                        variant="outlined"
                        color="common"
                        onChange={(e) =>
                          setSendData({ ...sendData, tell_us_about_one_business_problem: e.target.value })
                        }
                        value={sendData?.tell_us_about_one_business_problem}
                      />
                    </Stack>
                  </CardContent>
                </Card>
                <Card style={{ marginTop: 20, backgroundColor: '#ff7424', borderRadius: 0, height: '60px' }}>
                  <CardContent>
                    <Typography style={{ color: '#ffffff' }}>Business Goal</Typography>
                  </CardContent>
                </Card>
                <Card style={{ marginTop: 20, borderRadius: 20 }}>
                  <CardContent>
                    <Typography style={{ color: '#ff7424' }}>
                      What is your business goal / ನಿಮ್ಮ ವ್ಯಾಪಾರ ಗುರಿ ಏನು?
                    </Typography>
                    <Stack mt={2} mb={2}>
                      <TextField
                        id="business goal"
                        required
                        label="Your Answer"
                        variant="outlined"
                        color="common"
                        onChange={(e) =>
                          setSendData({
                            ...sendData,
                            what_is_your_business_goal_Business_impurumenet_madodu: e.target.value,
                          })
                        }
                        value={sendData?.what_is_your_business_goal_Business_impurumenet_madodu}
                      />
                    </Stack>
                  </CardContent>
                </Card>
                <Card style={{ marginTop: 20, borderRadius: 20 }}>
                  <CardContent>
                    <Stack mt={2}>
                      <Typography style={{ color: '#ff7424' }}>
                        Do you have a business plan to reach that goal?
                        {bussinessplanError ? (
                          <FormHelperText style={{ color: 'red' }}>{helperText}</FormHelperText>
                        ) : null}
                      </Typography>
                      <RadioGroup
                        aria-labelledby="demo-radio-buttons-group-label"
                        // defaultValue="Yes"
                        name="radio-buttons-group"
                        value={bussinessplan}
                        onChange={bussinessplanvalue}
                      >
                        <FormControlLabel value="Yes" control={<Radio style={{ color: '#595959' }} />} label="Yes" />
                        <FormControlLabel value="No" control={<Radio style={{ color: '#595959' }} />} label="No" />
                        <FormControlLabel
                          value="I don't know"
                          control={<Radio style={{ color: '#595959' }} />}
                          label="I don't know"
                        />
                      </RadioGroup>
                    </Stack>
                  </CardContent>
                </Card>
                <Card style={{ marginTop: 20, borderRadius: 20 }}>
                  <CardContent>
                    <Stack mt={2}>
                      <Typography style={{ color: '#ff7424' }}>
                        Can you submit a business plan for your goal to us right now?
                        {submitbussinessplanError ? (
                          <FormHelperText style={{ color: 'red' }}>{helperText}</FormHelperText>
                        ) : null}
                      </Typography>
                      <RadioGroup
                        aria-labelledby="demo-radio-buttons-group-label"
                        // defaultValue="Yes"
                        name="radio-buttons-group"
                        value={submitbussinessplan}
                        onChange={submitbussinessplanvalue}
                      >
                        <FormControlLabel value="Yes" control={<Radio style={{ color: '#595959' }} />} label="Yes" />
                        <FormControlLabel value="No" control={<Radio style={{ color: '#595959' }} />} label="No" />
                        <FormControlLabel
                          value="I don't know"
                          control={<Radio style={{ color: '#595959' }} />}
                          label="I don't know"
                        />
                      </RadioGroup>
                    </Stack>
                  </CardContent>
                </Card>
                <Card style={{ marginTop: 20, backgroundColor: '#ff7424', borderRadius: 0, height: '60px' }}>
                  <CardContent>
                    <Typography style={{ color: '#ffffff' }}>SWOT Analysis</Typography>
                  </CardContent>
                </Card>
                <Card style={{ marginTop: 20, borderRadius: 20 }}>
                  <CardContent>
                    <Typography style={{ color: '#ff7424' }}>What are strengths of your business?</Typography>
                    <Stack mt={2} mb={2}>
                      <TextField
                        id="strengths"
                        required
                        label="Your Answer"
                        variant="outlined"
                        color="common"
                        onChange={(e) =>
                          setSendData({ ...sendData, what_are_the_strenghts_of_your_business: e.target.value })
                        }
                        value={sendData?.what_are_the_strenghts_of_your_business}
                      />
                    </Stack>
                  </CardContent>
                </Card>
                <Card style={{ marginTop: 20, borderRadius: 20 }}>
                  <CardContent>
                    <Typography style={{ color: '#ff7424' }}>What are weaknesses of your business?</Typography>
                    <Stack mt={2} mb={2}>
                      <TextField
                        id="weakness"
                        required
                        label="Your Answer"
                        variant="outlined"
                        color="common"
                        onChange={(e) =>
                          setSendData({ ...sendData, what_are_the_weaknesses_of_your_business: e.target.value })
                        }
                        value={sendData?.what_are_the_weaknesses_of_your_business}
                      />
                    </Stack>
                  </CardContent>
                </Card>
                <Card style={{ marginTop: 20, borderRadius: 20 }}>
                  <CardContent>
                    <Typography style={{ color: '#ff7424' }}>What are opportunities of your business?</Typography>
                    <Stack mt={2} mb={2}>
                      <TextField
                        id="opportunities"
                        required
                        label="Your Answer"
                        variant="outlined"
                        color="common"
                        onChange={(e) =>
                          setSendData({ ...sendData, what_are_the_oppourtunities_for_your_business: e.target.value })
                        }
                        value={sendData?.what_are_the_oppourtunities_for_your_business}
                      />
                    </Stack>
                  </CardContent>
                </Card>
                <Card style={{ marginTop: 20, backgroundColor: '#ff7424', borderRadius: 0, height: '60px' }}>
                  <CardContent>
                    <Typography style={{ color: '#ffffff' }}>Access to finance</Typography>
                  </CardContent>
                </Card>
                <Card style={{ marginTop: 20, borderRadius: 20 }}>
                  <CardContent>
                    <Stack mt={2}>
                      <Typography style={{ color: '#ff7424' }}>
                        Are you able to raise the required finance for your business right now?/ ಇದೀಗ ನಿಮ್ಮ ವ್ಯಾಪಾರಕ್ಕೆ
                        ಅಗತ್ಯವಿರುವ ಹಣಕಾಸು ಸಂಗ್ರಹಿಸಲು ನಿಮಗೆ ಸಾಧ್ಯವಾಗುತ್ತದೆಯೇ?
                        {financeError ? <FormHelperText style={{ color: 'red' }}>{helperText}</FormHelperText> : null}
                      </Typography>
                      <RadioGroup
                        aria-labelledby="demo-radio-buttons-group-label"
                        // defaultValue="Yes"
                        name="radio-buttons-group"
                        value={finance}
                        onChange={financevalue}
                      >
                        <FormControlLabel value="Yes" control={<Radio style={{ color: '#595959' }} />} label="Yes" />
                        <FormControlLabel value="No" control={<Radio style={{ color: '#595959' }} />} label="No" />
                      </RadioGroup>
                    </Stack>
                  </CardContent>
                </Card>
                <Card style={{ marginTop: 20, borderRadius: 20 }}>
                  <CardContent>
                    <Stack mt={2}>
                      <Typography style={{ color: '#ff7424' }}>
                        I have taken a loan from
                        {loanError ? <FormHelperText style={{ color: 'red' }}>{helperText}</FormHelperText> : null}
                      </Typography>
                      <RadioGroup
                        aria-labelledby="demo-radio-buttons-group-label"
                        // defaultValue="Yes"
                        name="radio-buttons-group"
                        value={loan}
                        onChange={loanvalue}
                      >
                        <FormControlLabel
                          value="Government bank"
                          control={<Radio style={{ color: '#595959' }} />}
                          label="Government bank"
                        />
                        <FormControlLabel
                          value="Private bank"
                          control={<Radio style={{ color: '#595959' }} />}
                          label="Private bank"
                        />
                        <FormControlLabel value="NGO" control={<Radio style={{ color: '#595959' }} />} label="NGO" />
                        <FormControlLabel
                          value="Money Lender"
                          control={<Radio style={{ color: '#595959' }} />}
                          label="Money Lender"
                        />
                        <FormControlLabel
                          value="Middleman/trader"
                          control={<Radio style={{ color: '#595959' }} />}
                          label="Middleman/trader"
                        />
                        <FormControlLabel
                          value="Parents"
                          control={<Radio style={{ color: '#595959' }} />}
                          label="Parents"
                        />
                        <FormControlLabel
                          value="Relatives/Neighbors"
                          control={<Radio style={{ color: '#595959' }} />}
                          label="Relatives/Neighbors"
                        />
                        <FormControlLabel
                          value="Friends"
                          control={<Radio style={{ color: '#595959' }} />}
                          label="Friends"
                        />
                        <FormControlLabel
                          value="Social Welfare departments"
                          control={<Radio style={{ color: '#595959' }} />}
                          label="Social Welfare departments"
                        />
                        <FormControlLabel
                          value="Cooperatives"
                          control={<Radio style={{ color: '#595959' }} />}
                          label="Cooperatives"
                        />
                        <FormControlLabel
                          value="SHG Group"
                          control={<Radio style={{ color: '#595959' }} />}
                          label="SHG Group"
                        />
                        <FormControlLabel
                          value="Other"
                          control={<Radio style={{ color: '#595959' }} />}
                          label="Other"
                        />
                      </RadioGroup>
                    </Stack>
                  </CardContent>
                </Card>
                <Card style={{ marginTop: 20, borderRadius: 20 }}>
                  <CardContent>
                    <Stack mt={2}>
                      <Typography style={{ color: '#ff7424' }}>
                        I have trouble accessing loan for my business
                        {accessingloanError ? (
                          <FormHelperText style={{ color: 'red' }}>{helperText}</FormHelperText>
                        ) : null}
                      </Typography>
                      <RadioGroup
                        aria-labelledby="demo-radio-buttons-group-label"
                        // defaultValue="Yes"
                        name="radio-buttons-group"
                        value={accessingloan}
                        onChange={accessingloanvalue}
                      >
                        <FormControlLabel
                          value="Strongly Agree"
                          control={<Radio style={{ color: '#595959' }} />}
                          label="Strongly Agree"
                        />
                        <FormControlLabel
                          value="Agree"
                          control={<Radio style={{ color: '#595959' }} />}
                          label="Agree"
                        />
                        <FormControlLabel
                          value="Neutral"
                          control={<Radio style={{ color: '#595959' }} />}
                          label="Neutral"
                        />
                        <FormControlLabel
                          value="Disagree"
                          control={<Radio style={{ color: '#595959' }} />}
                          label="Disagree"
                        />
                        <FormControlLabel
                          value="Strongly Disagree"
                          control={<Radio style={{ color: '#595959' }} />}
                          label="Strongly Disagree"
                        />
                      </RadioGroup>
                    </Stack>
                  </CardContent>
                </Card>
                <Card style={{ marginTop: 20, borderRadius: 20 }}>
                  <CardContent>
                    <Typography style={{ color: '#ff7424' }}>
                      What are the prerequisites to access a loan? Tick the one's you think you need / ಸಾಲವನ್ನು
                      ಪ್ರವೇಶಿಸಲು ಪೂರ್ವಾಪೇಕ್ಷಿತಗಳು ಯಾವುವು? ನಿಮಗೆ ಬೇಕು ಎಂದು ನೀವು ಭಾವಿಸುವದನ್ನು ಟಿಕ್ ಮಾಡಿ
                    </Typography>
                    <Stack mt={2}>
                      <FormGroup>
                        <FormControlLabel
                          value="KYC documents of all the applicants - PAN card, Aadhar Crad, address proof"
                          control={<Checkbox style={{ color: '#595959' }} />}
                          label="KYC documents of all the applicants - PAN card, Aadhar Crad, address proof"
                          onChange={(event) =>
                            handleprerequisites('what_are_the_prerequisites_to_access_a_loan', event)
                          }
                        />
                        <FormControlLabel
                          value="Address Proof of the business premises"
                          control={<Checkbox style={{ color: '#595959' }} />}
                          label="Address Proof of the business premises"
                          onChange={(event) =>
                            handleprerequisites('what_are_the_prerequisites_to_access_a_loan', event)
                          }
                        />
                        <FormControlLabel
                          value="2 Passport size photographs of the applicant"
                          control={<Checkbox style={{ color: '#595959' }} />}
                          label="2 Passport size photographs of the applicant"
                          onChange={(event) =>
                            handleprerequisites('what_are_the_prerequisites_to_access_a_loan', event)
                          }
                        />
                        <FormControlLabel
                          value="Light bill & rent agreement"
                          control={<Checkbox style={{ color: '#595959' }} />}
                          label="Light bill & rent agreement"
                          onChange={(event) =>
                            handleprerequisites('what_are_the_prerequisites_to_access_a_loan', event)
                          }
                        />
                        <FormControlLabel
                          value="Balance sheet and profit & Loss statement for the last 2-3 years"
                          control={<Checkbox style={{ color: '#595959' }} />}
                          label="Balance sheet and profit & Loss statement for the last 2-3 years"
                          onChange={(event) =>
                            handleprerequisites('what_are_the_prerequisites_to_access_a_loan', event)
                          }
                        />
                        <FormControlLabel
                          value="Quotations of machinery,equipment,furniture & other assets to be purchased"
                          control={<Checkbox style={{ color: '#595959' }} />}
                          label="Quotations of machinery,equipment,furniture & other assets to be purchased"
                          onChange={(event) =>
                            handleprerequisites('what_are_the_prerequisites_to_access_a_loan', event)
                          }
                        />
                        <FormControlLabel
                          value="Letters of support, reference"
                          control={<Checkbox style={{ color: '#595959' }} />}
                          label="Letters of support, reference"
                          onChange={(event) =>
                            handleprerequisites('what_are_the_prerequisites_to_access_a_loan', event)
                          }
                        />
                      </FormGroup>
                    </Stack>
                  </CardContent>
                </Card>
                <Card style={{ marginTop: 20, borderRadius: 20 }}>
                  <CardContent>
                    <Stack mt={2}>
                      <Typography style={{ color: '#ff7424' }}>
                        Is there any loan currently availed by you/family / ನೀವು/ಕುಟುಂಬದಿಂದ ಪ್ರಸ್ತುತ ಯಾವುದಾದರೂ ಲೋನ್
                        ಇದೆಯೇ
                        {currentloanError ? (
                          <FormHelperText style={{ color: 'red' }}>{helperText}</FormHelperText>
                        ) : null}
                      </Typography>
                      <RadioGroup
                        aria-labelledby="demo-radio-buttons-group-label"
                        // defaultValue="Yes"
                        name="radio-buttons-group"
                        value={currentloan}
                        onChange={currentloanvalue}
                      >
                        <FormControlLabel value="Yes" control={<Radio style={{ color: '#595959' }} />} label="Yes" />
                        <FormControlLabel value="No" control={<Radio style={{ color: '#595959' }} />} label="No" />
                      </RadioGroup>
                    </Stack>
                  </CardContent>
                </Card>
                {isCurrentLoan ? (
                  <Card style={{ marginTop: 20, borderRadius: 20 }}>
                    <CardContent>
                      <Typography style={{ color: '#ff7424' }}>If yes details/ ಹೌದು ಎಂದಾದರೆ, ವಿವರಗಳು</Typography>
                      <Stack mt={2} mb={2}>
                        <TextField
                          id="relation"
                          required
                          label="Relation (who borrowed)"
                          variant="outlined"
                          color="common"
                          onChange={(e) => setSendData({ ...sendData, relation_who_borrowed: e.target.value })}
                          value={sendData?.relation_who_borrowed}
                        />
                      </Stack>
                      <Stack mt={2} mb={2}>
                        <TextField
                          id="totalamount"
                          required
                          type="number"
                          label="Total amount"
                          variant="outlined"
                          color="common"
                          onChange={(e) => setSendData({ ...sendData, loan_total_amount: e.target.value })}
                          value={sendData?.loan_total_amount}
                        />
                      </Stack>
                      <Stack mt={2} mb={2}>
                        <TextField
                          id="source"
                          required
                          label="Source"
                          variant="outlined"
                          color="common"
                          onChange={(e) => setSendData({ ...sendData, loan_source: e.target.value })}
                          value={sendData?.loan_source}
                        />
                      </Stack>
                      <Stack mt={2} mb={2}>
                        <TextField
                          id="repayment"
                          required
                          label="Repayment till date"
                          variant="outlined"
                          color="common"
                          onChange={(e) => setSendData({ ...sendData, loan_repayment_till_date: e.target.value })}
                          value={sendData?.loan_repayment_till_date}
                        />
                      </Stack>
                    </CardContent>
                  </Card>
                ) : null}
                <Card style={{ marginTop: 20, borderRadius: 20 }}>
                  <CardContent>
                    <Stack mt={2}>
                      <Typography style={{ color: '#ff7424' }}>
                        Do you need any additional skills to run your business / ನಿಮ್ಮ ವ್ಯಾಪಾರವನ್ನು ನಡೆಸಲು ನಿಮಗೆ ಯಾವುದೇ
                        ಹೆಚ್ಚುವರಿ ಕೌಶಲ್ಯಗಳ ಅಗತ್ಯವಿದೆಯೇ?
                        {bussinessSkillError ? (
                          <FormHelperText style={{ color: 'red' }}>{helperText}</FormHelperText>
                        ) : null}
                      </Typography>
                      <RadioGroup
                        aria-labelledby="demo-radio-buttons-group-label"
                        // defaultValue="Yes"
                        name="radio-buttons-group"
                        value={bussinesskills}
                        onChange={bussinesskillsvalue}
                      >
                        <FormControlLabel value="Yes" control={<Radio style={{ color: '#595959' }} />} label="Yes" />
                        <FormControlLabel value="No" control={<Radio style={{ color: '#595959' }} />} label="No" />
                      </RadioGroup>
                    </Stack>
                  </CardContent>
                  {isAdditionalSkill?
                    <Card style={{ marginTop: 20, borderRadius: 20 }}>
                    <CardContent>
                      <Typography style={{ color: '#ff7424' }}>If yes what are those/ ಹೌದು ಎಂದಾದರೆ, ಅವು ಯಾವುವು</Typography>
                      <Stack mt={2} mb={2}>
                        <TextField
                          id="yourans"
                          required
                          label=" Your Answer"
                          variant="outlined"
                          color="common"
                          onChange={(e) => setSendData({ ...sendData, skils_what_are_those: e.target.value })}
                          value={sendData?.skils_what_are_those}
                        />
                      </Stack>
                      </CardContent>
                      </Card> : null}
                </Card>
                {/* -------------------------------- */}
              </CardContent>
            </Card>
          </Grid>}
          {/* } */}
        </form>
      </Dialog>
    </div>
  );
}