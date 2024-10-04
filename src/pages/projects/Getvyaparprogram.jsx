import * as React from 'react';
import { useState, useEffect } from 'react';
import axios from 'axios'
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
  CardActionArea,DialogContent,DialogContentText,
  Box,
  CircularProgress
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
import Iconify from 'src/components/Iconify';
import { Icon } from '@iconify/react';
import { baseURL } from 'src/utils/api';
import { useAuth } from 'src/AuthContext';
import GetVyaparProgramNewQuestion from './GetVyaparProgramNewQuestion';
const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});
export default function GetVyaparProgram({itm}) {
  console.log(itm ,"dataaaa")
  const { apikey } = useAuth();
  const [open, setOpen] = React.useState(false);

  const [loader, setLoader] = useState(true);
  const [surveyData, setSurveydata] = React.useState('')
  // const [surveyData, setSurveydata] = React.useState({
  //   age: null,
  //   amount_invested_when_the_business_started: null,
  //   are_you_able_to_raise_the_required_finance: "",
  //   are_you_proficient_with_numbers: "",
  //   are_you_proficient_with_written_language: "",
  //   average_monthly_income_enterprise: null,
  //   average_monthly_profit_enterprise: null,
  //   can_you_submit_a_business_plan_for_your_goal_to_us_right_now: "",
  //   cast: "",
  //   contact_number: "",
  //   core_opportunity: "",
  //   core_strength: "",
  //   core_threat: "",
  //   core_weakness: "",
  //   desired_monthly_income: null,
  //   district: "",
  //   do_bookkeeping: "",
  //   do_you_have_a_business_plan_to_reach_that_goal: "",
  //   do_you_have_internet_connection_on_your_smart_phone: "",
  //   do_you_own_a_smart_phone: "",
  //   dob: "",
  //   education: "",
  //   enterprise_status: "",
  //   entrepreneurial_aspirations: [],
  //   entry_date: "",
  //   frequency_of_recording_financial_books: "",
  //   gf_id: null,
  //   gram_panchayat: "",
  //   has_bank_account: "",
  //   has_business_goal_or_plan: "",
  //   has_hired_employees: "",
  //   higher_education: "",
  //   home_based_work_from_shop: "",
  //   house: "",
  //   household_income_monthly: null,
  //   how_much_monthly_income_would_you_like_to_ideally_earn: null,
  //   i_can_generate_ideas_to_solve_my_business_problems: "",
  //   i_have_taken_a_loan_from: "",
  //   i_have_trouble_accessing_loan_for_my_business: "",
  //   i_know_the_current_state_of_my_business_in_profit_loss_revenue: "",
  //   id: null,
  //   idea_category: "",
  //   idea_start: "",
  //   idea_status: "",
  //   initial_investment_amount: null,
  //   interest_rate: null,
  //   investment_source: "",
  //   license_for_existing_business: "",
  //   loan_currently_availed: "",
  //   loan_exists: "",
  //   loan_purpose: "",
  //   loan_repayment_till_date: null,
  //   loan_source: "",
  //   loan_startup: "",
  //   loan_taken: "",
  //   loan_total_amount: null,
  //   location_circle: "",
  //   maintain_daily_financial_books: "",
  //   marital_status: "",
  //   method_of_keeping_accounts: [],
  //   mobile_type: "",
  //   module1: "",
  //   module2: "",
  //   module3: "",
  //   module4: "",
  //   module5: "",
  //   money_management: "",
  //   monthly_expenditure: null,
  //   monthly_income: null,
  //   name_of_the_cohort: "",
  //   name_of_the_vyapari: "",
  //   need_additional_skills_business: "",
  //   no_hours_engaged_business: null,
  //   number_of_beehives_participated: null,
  //   number_of_paid_workers: null,
  //   number_of_people_in_the_household: null,
  //   number_of_years_the_business_has_been_operating: "",
  //   over_the_last_month_your_average_income: null,
  //   own_account_work: "",
  //   participant_id: null,
  //   personal_smartphone: "",
  //   please_list_down_the_various_components_of_business: "",
  //   primary_occupation_household: "",
  //   ration_card: "",
  //   reason_for_doing_business: "",
  //   reason_for_not_bookkeeping: "",
  //   reason_for_not_having_smartphone: "",
  //   relation_who_borrowed: "",
  //   run_enterprise_independently: "",
  //   run_growth_challenges: "",
  //   savings_available: null,
  //   secondary_occupation_household: "",
  //   sector_type_of_business: "",
  //   short_term_goal: "",
  //   skills_gained_from_program: "",
  //   skills_what_are_those: "",
  //   taluk: "",
  //   taluk_district: "",
  //   target_customer: "",
  //   tell_us_about_one_business_problem: "",
  //   tell_us_three_things_about_you_as_an_entrepreneur: "",
  //   tell_us_three_things_about_your_role_as_a_woman_at_home: "",
  //   total_household_members: null,
  //   underwent_skill_development_program: "",
  //   uses_upi: "",
  //   village_id: "",
  //   what_are_the_opportunities_for_your_business: "",
  //   what_are_the_prerequisites_to_access_a_loan: "",
  //   what_are_the_resources_available_with_you_for_your_business: "",
  //   what_are_the_strengths_of_your_business: "",
  //   what_are_the_weaknesses_of_your_business: "",
  //   what_are_your_challenges_in_running_and_growing_your_business: "",
  //   what_are_your_skills: "",
  //   what_is_your_business_goal_business_impurumenet_madodu: "",
  //   what_is_your_plan_to_overcome_these_challenges: "",
  //   what_kind_of_books_of_accounts_do_you_maintain: "",
  //   when_was_survey_done: "",
  //   who_is_your_customer_describe_them_to_us: "",
  //   why_do_you_do_business: "",
  //   womens_occupation: "",
  //   years_in_operation: null,
  //   you_stopped_hold_your_business: "",
  //   your_business_profit_last_month: null
  // });
  
  const handleClickOpen = () => {
    if (itm && itm.id) { // Check if itm and its id are defined
      GetVyaparformData(); // Call the API when the dialog opens
    }
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };
  // useEffect(() => {
  //   GetVyaparformData()
  // }, [itm]
  // )
  const handleInputChange = (event) => {
    const { name, value } = event.target;
    console.log('handleInputChange called:', name, value);
    setSurveydata((prevData) => ({
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
    setSurveydata(tempData);
  };
const GetVyaparformData=()=>{
  var data = JSON.stringify({
    "participantId": parseInt(itm?.id)
  });
  
  var config = {
    method: 'post',
    url: baseURL + 'getVyaparBaselineSurvey',
    headers: { 
      'Content-Type': 'application/json',
      'Authorization': `${apikey}`
    },
    data : data
  };
      
      axios(config)
      .then(function (response) {


        setSurveydata(response.data.data[0])
        setLoader(true);
      })
      .catch(function (error) {
        // console.log(error);
      });
      
}


useEffect(() => {
  const delay = 3000;
  const timeoutId = setTimeout(() => {
    setLoader(false);
  }, delay);
});
  return (
    <div>
      
        <Stack style={{ position:'absolute',right:0 ,float:'right',margin:2,padding:2 }}  mb={2}>
      
        <IconButton onClick={handleClickOpen}>
         <Icon  icon="ic:twotone-fact-check" width={30} height={25} marginTop={5}  color="green"  />
        </IconButton>
        </Stack> 
      <Dialog fullScreen open={open} onClose={handleClose} TransitionComponent={Transition}>
      <AppBar sx={{ position: 'fixed', bgcolor: '#ff7424' }}>
          <Toolbar sx={{ bgcolor: '#ff7424' }}>
          
                        <IconButton style={{color:"white"}} onClick={handleClose}>
                            <Iconify icon="material-symbols:arrow-back-rounded" />
                        </IconButton>
                        <Typography sx={{ ml: 2, flex: 1,color:"white" }} variant="h6" component="div"   >
          Buzz Vyapar Program Baseline 
          </Typography>
       
         
          </Toolbar>
          </AppBar>

          {loader ? 
            <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '70vh' }}>
              <CircularProgress sx={{ color: '#ff7424' }} />
            </Box>
           :

      <>
      
    { 
      (surveyData?.gram_panchayat === "")?
      <>
        <Grid>
     
          <Card>
     
            <CardContent>
            
            <Card style={{ marginTop: 20,  borderRadius: 20 }}>
                <CardContent>
                  <Typography style={{color:"#ff7424"}}>Name of the GF / ಗೆಳತಿಯ ಹೆಸರು*</Typography>
                  <Stack mt={2} >
                <Typography>Answer: {surveyData?.gf_id}</Typography>
             
                  </Stack>
                </CardContent>
              </Card>
              <Card style={{ marginTop: 20}}>
                <CardContent>
                  
                    <Typography style={{color:"#ff7424"}}>When was survey done / ಸಮೀಕ್ಷೆ ಯಾವಾಗ ಮಾಡಲಾಯಿತು? *</Typography>
                    <Stack mt={2}>  <Typography>Answer: {surveyData?.when_was_survey_done}</Typography>
                  </Stack>
                </CardContent>
              </Card>
              <Card style={{ marginTop: 20,  borderRadius: 20 }}>
                <CardContent>
                  <Typography style={{color:"#ff7424"}}>Name of vyapari / ವ್ಯಾಪಾರಿಯ ಹೆಸರು *</Typography>
                  <Stack mt={2} >
                  <Typography>Answer: {surveyData?.name_of_the_vyapari}</Typography>
                  </Stack>
                </CardContent>
              </Card>
               
                
              <Card style={{ marginTop: 20,  borderRadius: 20 }}>
                <CardContent>
                  <Typography style={{color:"#ff7424"}}>Age / ವಯಸ್ಸು *</Typography>
                  <Stack mt={2}>
                  <Typography>Answer: {surveyData?.age}</Typography>
                  </Stack>
                </CardContent>
              </Card>
              
                 
              <Card style={{ marginTop: 20,  borderRadius: 20 }}>
                <CardContent>
                  <Typography style={{color:"#ff7424"}}>Contact Number /ಸಂಪರ್ಕ ಸಂಖ್ಯೆ *</Typography>
                  <Stack mt={2}>
                  <Typography>Answer: {surveyData?.contact_number}</Typography>
                  </Stack>
                </CardContent>
              </Card>
               
               
              <Card style={{ marginTop: 20,  borderRadius: 20 }}>
                <CardContent>
                <Typography style={{color:"#ff7424"}}>Village Name *</Typography>
                <Stack mt={2}>
                  <Typography>Answer: {surveyData?.village_id}</Typography>
                  </Stack>
                </CardContent>
              </Card>
              <Card style={{ marginTop: 20,  borderRadius: 20 }}>
                <CardContent>
                <Typography style={{color:"#ff7424"}}>Name of the Cohort / ಸ್ಥಳ/ವೃತ್ತ *</Typography>
                <Stack mt={2}>
                  <Typography>Answer: {surveyData?.name_of_the_cohort}</Typography>
                  </Stack>
                </CardContent>
              </Card>
                 
              <Card style={{ marginTop: 20,  borderRadius: 20 }}>
                <CardContent>
                  
                    <Typography style={{color:"#ff7424"}}>Education / ವಿದ್ಯಾಭ್ಯಾಸ</Typography>
                    <Stack mt={2}>
                  <Typography>Answer: {surveyData?.highter_education}</Typography>
                  </Stack>
                  
                </CardContent>
              </Card>
                
              <Card style={{ marginTop: 20,  borderRadius: 20 }}>
                <CardContent>
                  
                    <Typography style={{color:"#ff7424"}}>Marital Status / ವೈವಾಹಿಕ ಸ್ಥಿತಿ </Typography>
                    <Stack mt={2}>
                  <Typography>Answer: {surveyData?.marital_status}</Typography>
                 
                  </Stack>
                </CardContent>
              </Card>
                
              <Card style={{ marginTop: 20,  borderRadius: 20 }}>
                <CardContent>
                <Typography style={{color:"#ff7424"}}>Number of people in the household / ಮನೆಯಲ್ಲಿರುವ ಜನರ ಸಂಖ್ಯೆ</Typography>
                <Stack mt={2}>
                  <Typography>Answer: {surveyData?.number_of_people_in_the_household}</Typography>
                  </Stack>
                </CardContent>
              </Card>
              <Card style={{ marginTop: 20,  borderRadius: 20 }}>
                <CardContent>
                  
                    <Typography style={{color:"#ff7424"}}>Do you own a smart phone / ನೀವು ಸ್ಮಾರ್ಟ್ ಫೋನ್ ಹೊಂದಿದ್ದೀರಾ?</Typography>
                   
                    <Stack mt={2}>
                  <Typography>Answer: {surveyData?.do_you_own_a_smart_phone}</Typography>
                  </Stack>
                </CardContent>
              </Card>
          
              <Card style={{ marginTop: 20,  borderRadius: 20 }}>
               
                <CardContent>
               <Typography style={{color:"#ff7424"}}>Sector/Type of business ಪ್ರಾಥಮಿಕ ವ್ಯವಹಾರದ ವಲಯ/ ವ್ಯ ವಹಾರದ ಪ್ರಕಾರ (ಇದು ಹೆಚ್ಚಿ ನ ಆದಾಯವನ್ನು ನೀಡುತ್ತದೆ)</Typography>
               <Stack mt={2}>
                  <Typography>Answer: {surveyData?.sector_type_of_business}</Typography>
                  </Stack> 
                </CardContent>
              </Card>
                 
                    <Card style={{ marginTop: 20,  borderRadius: 20 }}>
                <CardContent>
                 
                  <Typography style={{color:"#ff7424"}}>Are you proficient with numbers? / ನೀವು ಸಂಖ್ಯೆಗಳಲ್ಲಿ ಪ್ರವೀಣರಾಗಿದ್ದೀರಾ</Typography>
                  <Stack mt={2}>
                  <Typography>Answer: {surveyData?.are_you_proficient_with_numbers}</Typography>
                  </Stack>
                  
                </CardContent>
              </Card>
                
                
              <Card style={{ marginTop: 20,  borderRadius: 20 }}>
                <CardContent>
                  
                    <Typography style={{color:"#ff7424"}}>Are you proficient with written language / ನೀವು ಲಿಖಿತ ಭಾಷೆಯಲ್ಲಿ ಪ್ರವೀಣರಾಗಿದ್ದೀರಾ</Typography>
                   
                    <Stack mt={2}>
                  <Typography>Answer: {surveyData?.are_you_proficient_with_written_language}</Typography>
                  </Stack>
                </CardContent>
              </Card>
                
              <Card style={{ marginTop: 20,  borderRadius: 20 }}>
                <CardContent>
                <Typography style={{color:"#ff7424"}}>Household income (Monthly) ಮನೆಯಆದಾಯ (ಮಾಸಿಕ)</Typography>
                <Stack mt={2}>
                  <Typography>Answer: {surveyData?.household_income_monthly}</Typography>
                  </Stack>
                </CardContent>
              </Card>
             
              <Card style={{ marginTop: 20,  borderRadius: 20 }}>
                <CardContent>
                <Typography style={{color:"#ff7424"}}>Over the last month your average income / ಕಳೆದ ತಿಂಗಳು ನಿಮ್ಮ ಸರಾಸರಿ ಆದಾಯ</Typography>
                <Stack mt={2}>
                  <Typography>Answer: {surveyData?.over_the_last_month_your_average_income}</Typography>
                  </Stack>
                </CardContent>
              </Card>
              <Card style={{ marginTop: 20,  borderRadius: 20 }}>
                <CardContent>
                <Typography style={{color:"#ff7424"}}>Your profit (last month) / ನಿಮ್ಮ ಲಾಭ (ಕಳೆದ ತಿಂಗಳು) </Typography>
                <Stack mt={2}>
                  <Typography>Answer: {surveyData?.your_business_profit_last_month}</Typography>
                  </Stack>
                </CardContent>
              </Card>
              <Card style={{ marginTop: 20,  borderRadius: 20 }}>
                <CardContent>
                <Typography style={{color:"#ff7424"}}>How much monthly income would you like to ideally earn / ನೀವು ಎಷ್ಟು ಮಾಸಿಕ ಆದಾಯವನ್ನು ಆದರ್ಶಪ್ರಾಯವಾಗಿ ಗಳಿಸಲು ಬಯಸುತ್ತೀರಿ</Typography>
                   <Stack mt={2}>
                  <Typography>Answer: {surveyData?.how_much_monthly_income_would_you_like_to_ideally_earn}</Typography>
                  </Stack>
                </CardContent>
              </Card>
              <Card style={{ marginTop: 20,  borderRadius: 20 }}>
                <CardContent>
                <Typography style={{color:"#ff7424"}}>Amount invested when the business started (approximately if they know) / ವ್ಯಾಪಾರ ಪ್ರಾರಂಭವಾದಾಗ ಹೂಡಿಕೆ ಮಾಡಿದ ಮೊತ್ತ (ಅವರು ತಿಳಿದಿದ್ದರೆ)</Typography>
                <Stack mt={2}>
                  <Typography>Answer: {surveyData?.amount_invested_when_the_business_started}</Typography>
                  </Stack>
                </CardContent>
              </Card>
              <Card style={{ marginTop: 20,  borderRadius: 20 }}>
                <CardContent>
                 
                    <Typography style={{color:"#ff7424"}}>Number of years the business has been operating / ವ್ಯವಹಾರವು ಕಾರ್ಯನಿರ್ವಹಿಸುತ್ತಿರುವ ವರ್ಷಗಳ ಸಂಖ್ಯೆ</Typography>
                    <Stack mt={2}>
                  <Typography>Answer: {surveyData?.number_of_years_the_business_has_been_operating}</Typography>
                  </Stack>
                </CardContent>
              </Card>
              <Card style={{ marginTop: 20,  borderRadius: 20 }}>
                <CardContent>
                <Typography style={{color:"#ff7424"}}>For any reason have you stopped or kept hold your business / ಯಾವುದೇ ಕಾರಣಕ್ಕಾಗಿ ನೀವು ನಿಮ್ಮ ವ್ಯಾಪಾರವನ್ನು ನಿಲ್ಲಿಸಿದ್ದೀರಿ ಅಥವಾ ಹಿಡಿದಿಟ್ಟುಕೊಳ್ಳುತ್ತೀರಿ</Typography>
                  
                   
                <Stack mt={2}>
                  <Typography>Answer: {surveyData?.you_stopped_hold_your_business}</Typography>
                  </Stack>
                </CardContent>
              </Card>
              <Card style={{ marginTop: 20,  borderRadius: 20 }}>
                <CardContent>
                <Typography style={{color:"#ff7424"}}>No.of hours engaged in a day for business / ವ್ಯವಹಾರಕ್ಕಾಗಿ ಒಂದು ದಿನದಲ್ಲಿ ಎಷ್ಟು ಗಂಟೆಗಳು ತೊಡಗಿಸಿಕೊಳ್ಳುವಿರಿ?</Typography>
                <Stack mt={2}>
                  <Typography>Answer: {surveyData?.no_hours_engaged_business}</Typography>
                  </Stack>
                </CardContent>
              </Card>
              <Card style={{ marginTop: 20,  borderRadius: 20 }}>
                <CardContent>
                 
                    <Typography style={{color:"#ff7424"}}>Do you have license for existing business / ಅಸ್ತಿತ್ವದಲ್ಲಿರುವ ವ್ಯಾಪಾರಕ್ಕಾಗಿ ನೀವು ಪರವಾನಗಿ ಹೊಂದಿದ್ದೀರಾ?</Typography>
                   
                  
                    <Stack mt={2}>
                  <Typography>Answer: {surveyData?.license_for_existing_business}</Typography>
                  </Stack>
                </CardContent>
              </Card>
              <Card style={{ marginTop: 20,  borderRadius: 20 }}>
                <CardContent>
                
                    <Typography style={{color:"#ff7424"}}>Is it home based or will you work from a shop/business unit/ ಇದು ಮನೆ ಆಧಾರಿತವಾಗಿದೆಯೇ ಅಥವಾ ನೀವು ಅಂಗಡಿ/ ವ್ಯಾಪಾರ ಘಟಕದಿಂದ ಕೆಲಸ ಮಾಡುತ್ತೀರಾ?</Typography>
                   
                    <Stack mt={2}>
                  <Typography>Answer: {surveyData?.home_based_work_from_shop}</Typography>
                  </Stack>
                </CardContent>
              </Card>
              
              <Card style={{ marginTop: 20,  borderRadius: 20 }}>
                <CardContent>
                <Typography style={{color:"#ff7424"}}>Why do you do business / ನೀವು ಯಾಕೆ ವ್ಯಾಪಾರ ಮಾಡುತ್ತೀರಿ</Typography>
                <Stack mt={2}>
                  <Typography>Answer: {surveyData?.why_do_you_do_business}</Typography>
                  </Stack>
                </CardContent>
              </Card>
              <Card style={{ marginTop: 20,  borderRadius: 20 }}>
                <CardContent>
                  <Typography style={{color:"#ff7424"}}>Tell us three things about you as an enterpreneur / ವಾಣಿಜ್ಯೋದ್ಯಮಿಯಾಗಿ ನಿಮ್ಮ ಬಗ್ಗೆ ಮೂರು ವಿಷಯಗಳನ್ನು ನಮಗೆ ತಿಳಿಸಿ</Typography>
                  <Stack mt={2}>
                  <Typography>Answer: {surveyData?.tell_us_three_things_about_you_as_an_entrepreneur}</Typography>
                  </Stack>
                 
                </CardContent>
              </Card>
              <Card style={{ marginTop: 20,  borderRadius: 20 }}>
                <CardContent>
                <Typography style={{color:"#ff7424"}}>Tell us three things about your role as a woman at home</Typography>
                <Stack mt={2}>
                  <Typography>Answer: {surveyData?.tell_us_three_things_about_your_role_as_a_woman_at_home}</Typography>
                  </Stack>
                </CardContent>
              </Card>
              <Card style={{ marginTop: 20, backgroundColor: '#ff7424',borderRadius:0,height:'60px'}}>
                <CardContent>
                <Typography style={{color:"#ffffff"}}>Business Challenges</Typography>
                
                </CardContent>
              </Card>
    
              <Card style={{ marginTop: 20,  borderRadius: 20 }}>
                <CardContent>
                  
                    <Typography style={{color:"#ff7424"}}>What are your challenges in running and growing your business? / ನಿಮ್ಮ ವ್ಯಾಪಾರವನ್ನು ನಡೆಸುವಲ್ಲಿ ಮತ್ತು ಬೆಳೆಸುವಲ್ಲಿ ನಿಮ್ಮ ಸವಾಲುಗಳೇನು</Typography>
                    
                    <Stack mt={2}>
                  <Typography>Answer: {surveyData?.what_are_your_challenges_in_running_and_growing_your_business}</Typography>
                  </Stack>
                </CardContent>
              </Card>
              <Card style={{ marginTop: 20,  borderRadius: 20 }}>
                <CardContent>
                <Typography style={{color:"#ff7424"}}>What is your plan to overcome these challenges?</Typography>
                <Stack mt={2}>
                  <Typography>Answer: {surveyData?.what_is_your_plan_to_overcome_these_challenges}</Typography>
                  </Stack>
                </CardContent>
              </Card>
              
              <Card style={{ marginTop: 20,  borderRadius: 20 }}>
                <CardContent>
                <Typography style={{color:"#ff7424"}}>What are your skills?</Typography>
                <Stack mt={2}>
                  <Typography>Answer: {surveyData?.what_are_your_skills}</Typography>
                  </Stack>
                </CardContent>
              </Card>
              <Card style={{ marginTop: 20,  borderRadius: 20 }}>
                <CardContent>
                <Typography style={{color:"#ff7424"}}>What are the resources available with you for your business? / ನಿಮ್ಮ ವ್ಯಾಪಾರಕ್ಕಾಗಿ ನಿಮ್ಮ ಬಳಿ ಲಭ್ಯವಿರುವ ಸಂಪನ್ಮೂಲಗಳು ಯಾವುವು?</Typography>
                <Stack mt={2}>
                  <Typography>Answer: {surveyData?.what_are_the_resources_available_with_you_for_your_business}</Typography>
                  </Stack>
                </CardContent>
              </Card>
              <Card style={{ marginTop: 20, backgroundColor: '#ff7424',borderRadius:0,height:'60px'}}>
                <CardContent>
                <Typography style={{color:"#ffffff"}}>Business Components</Typography>
                
                </CardContent>
              </Card>
              <Card style={{ marginTop: 20,  borderRadius: 20 }}>
                <CardContent>
                <Typography style={{color:"#ff7424"}}>Who is your customer? Describe them to us / ನಿಮ್ಮ ಗ್ರಾಹಕ ಯಾರು? ಅವುಗಳನ್ನು ನಮಗೆ ವಿವರಿಸಿ</Typography>
                <Stack mt={2}>
                  <Typography>Answer: {surveyData?.who_is_your_customer_Describe_them_to_us}</Typography>
                  </Stack>
                </CardContent>
              </Card>
 
              <Card style={{ marginTop: 20,  borderRadius: 20 }}>
                <CardContent>
                  <Typography style={{color:"#ff7424"}}>Please identify parts/aspects of business / ವ್ಯಾಪಾರದ ಭಾಗಗಳು/ಮಗ್ಗಲುಗಳನ್ನು ಗುರುತಿಸಿ</Typography>
                  <Stack mt={2}>
                  <Typography>Answer: {surveyData?.please_list_down_the_various_components_of_business}</Typography>
                  </Stack>
                </CardContent>
              </Card>
              <Card style={{ marginTop: 20,  borderRadius: 20 }}>
                <CardContent>
                  
                    <Typography style={{color:"#ff7424"}}>I know the current state of my business in terms of is it making profit, loss revenue </Typography>
                    <Stack mt={2}>
                  <Typography>Answer: {surveyData?.please_list_down_the_various_components_of_business}</Typography>
                  </Stack>
                </CardContent>
              </Card>
              
              
              <Card style={{ marginTop: 20,  borderRadius: 20 }}>
                <CardContent>
                <Typography style={{color:"#ff7424"}}>What kind of books of accounts do you maintain?</Typography>
                <Stack mt={2}>
                  <Typography>Answer: {surveyData?.what_kind_of_books_of_accounts_do_you_maintain}</Typography>
                  </Stack>
                </CardContent>
              </Card>
          
              <Card style={{ marginTop: 20,  borderRadius: 20 }}>
                <CardContent>
                  
                    <Typography style={{color:"#ff7424"}}>I am confident that i can generate ideas to solve my business problems</Typography>
                   
                    <Stack mt={2}>
                  <Typography>Answer: {surveyData?.i_can_generate_ideas_to_solve_my_business_problems}</Typography>
                  </Stack>
                </CardContent>
              </Card>
              
              <Card style={{ marginTop: 20,  borderRadius: 20 }}>
                <CardContent>
                <Typography style={{color:"#ff7424"}}>Tell us about one business problm you solved, how did you solve it?</Typography>
                <Stack mt={2}>
                  <Typography>Answer: {surveyData?.tell_us_about_one_business_problem}</Typography>
                  </Stack>
                </CardContent>
              </Card>
              <Card style={{ marginTop: 20, backgroundColor: '#ff7424',borderRadius:0,height:'60px'}}>
                <CardContent>
                <Typography style={{color:"#ffffff"}}>Business Goal</Typography>
                
                </CardContent>
              </Card>
              <Card style={{ marginTop: 20,  borderRadius: 20 }}>
                <CardContent>
                <Typography style={{color:"#ff7424"}}>What is your business goal / ನಿಮ್ಮ ವ್ಯಾಪಾರ ಗುರಿ ಏನು?</Typography>
                <Stack mt={2}>
                  <Typography>Answer: {surveyData?.what_is_your_business_goal_Business_impurumenet_madodu}</Typography>
                  </Stack>
                </CardContent>
              </Card>
              
          
              <Card style={{ marginTop: 20,  borderRadius: 20 }}>
                <CardContent>
                
                    <Typography style={{color:"#ff7424"}}>Do you have a business plan to reach that goal?</Typography>
                  
                    <Stack mt={2}>
                  <Typography>Answer: {surveyData?.do_you_have_a_business_plan_to_reach_that_goal}</Typography>
                  </Stack>
                </CardContent>
              </Card>
              <Card style={{ marginTop: 20,  borderRadius: 20 }}>
                <CardContent>
                <Typography style={{color:"#ff7424"}}>Can you submit a business plan for your goal to us right now?</Typography>
                <Stack mt={2}>
                  <Typography>Answer: {surveyData?.can_you_submit_a_business_plan_for_your_goal_to_us_right_now}</Typography>
                  </Stack>
                </CardContent>
              </Card>
              
              <Card style={{ marginTop: 20, backgroundColor: '#ff7424',borderRadius:0,height:'60px'}}>
                <CardContent>
                <Typography style={{color:"#ffffff"}}>SWOT Analysis</Typography>
                
                </CardContent>
              </Card>
 
              <Card style={{ marginTop: 20,  borderRadius: 20 }}>
                <CardContent>
                <Typography style={{color:"#ff7424"}}>What are strengths of your business?</Typography>
                <Stack mt={2}>
                  <Typography>Answer: {surveyData?.what_are_the_strenghts_of_your_business}</Typography>
                  </Stack>
                </CardContent>
              </Card>
              <Card style={{ marginTop: 20,  borderRadius: 20 }}>
                <CardContent>
                <Typography style={{color:"#ff7424"}}>What are weaknesses of your business?</Typography>
                <Stack mt={2}>
                  <Typography>Answer: {surveyData?.what_are_the_weaknesses_of_your_business}</Typography>
                  </Stack>
                </CardContent>
              </Card>
              <Card style={{ marginTop: 20,  borderRadius: 20 }}>
                <CardContent>
                <Typography style={{color:"#ff7424"}}>What are opportunities of your business?</Typography>
                <Stack mt={2}>
                  <Typography>Answer: {surveyData?.what_are_the_oppourtunities_for_your_business}</Typography>
                  </Stack>
                </CardContent>
              </Card>
              <Card style={{ marginTop: 20, backgroundColor: '#ff7424',borderRadius:0,height:'60px'}}>
                <CardContent>
                <Typography style={{color:"#ffffff"}}>Access to finance</Typography>
                
                </CardContent>
              </Card>
             
             
              <Card style={{ marginTop: 20,  borderRadius: 20 }}>
                <CardContent>
                <Typography style={{color:"#ff7424"}}>Are you able to raise the required finance for your business right now?/ ಇದೀಗ ನಿಮ್ಮ ವ್ಯಾಪಾರಕ್ಕೆ ಅಗತ್ಯವಿರುವ ಹಣಕಾಸು ಸಂಗ್ರಹಿಸಲು ನಿಮಗೆ ಸಾಧ್ಯವಾಗುತ್ತದೆಯೇ?</Typography>
                <Stack mt={2}>
                  <Typography>Answer: {surveyData?.are_you_able_to_raise_the_required_finance}</Typography>
                  </Stack>
                </CardContent>
              </Card>
                 
              <Card style={{ marginTop: 20,  borderRadius: 20 }}>
                <CardContent>
                 
                    <Typography style={{color:"#ff7424"}}>I have taken a loan from</Typography>
                    
                    <Stack mt={2}>
                  <Typography>Answer: {surveyData?.i_have_taken_a_loan_from}</Typography>
                  </Stack>
                </CardContent>
              </Card>
               
               <Card style={{ marginTop: 20,  borderRadius: 20 }}>
                <CardContent>
                  
                    <Typography style={{color:"#ff7424"}}>I have trouble accessing loan for my business</Typography>
                    
                    <Stack mt={2}>
                  <Typography>Answer: {surveyData?.i_have_trouble_accessing_loan_for_my_business}</Typography>
                  </Stack>
                </CardContent>
              </Card>
              
              <Card style={{ marginTop: 20,  borderRadius: 20 }}>
                <CardContent>
                  <Typography style={{color:"#ff7424"}}>What are the prerequisites to access a loan? Tick the one's you think you need / ಸಾಲವನ್ನು ಪ್ರವೇಶಿಸಲು ಪೂರ್ವಾಪೇಕ್ಷಿತಗಳು ಯಾವುವು? ನಿಮಗೆ ಬೇಕು ಎಂದು ನೀವು ಭಾವಿಸುವದನ್ನು ಟಿಕ್ ಮಾಡಿ</Typography>
                  <Stack mt={2}>
                <Typography>Answer: 
                   {surveyData?.what_are_the_prerequisites_to_access_a_loan_Tick_the_ones_you_think_you_need}
                  </Typography>
                  </Stack>
                </CardContent>
              </Card>
              <Card style={{ marginTop: 20,  borderRadius: 20 }}>
                <CardContent>
                 
                    <Typography style={{color:"#ff7424"}}>Is there any loan currently availed by you/family / ನೀವು/ಕುಟುಂಬದಿಂದ ಪ್ರಸ್ತುತ ಯಾವುದಾದರೂ ಲೋನ್ ಇದೆಯೇ </Typography>
                    
                    <Stack mt={2}>
                  <Typography>Answer: {surveyData?.loan_currently_availed}</Typography>
                  </Stack>
                </CardContent>
              </Card>
              <Card style={{ marginTop: 20,  borderRadius: 20 }}>
                <CardContent>
                  
                    <Typography style={{color:"#ff7424"}}>Do you need any additional skills to run your business / ನಿಮ್ಮ ವ್ಯಾಪಾರವನ್ನು ನಡೆಸಲು ನಿಮಗೆ ಯಾವುದೇ ಹೆಚ್ಚುವರಿ ಕೌಶಲ್ಯಗಳ ಅಗತ್ಯವಿದೆಯೇ?</Typography>
                    
                    <Stack mt={2}>
                  <Typography>Answer: {surveyData?.need_additional_skills_business}</Typography>
                  </Stack>
                </CardContent>
              </Card>
             </CardContent>
             </Card>
        </Grid>
       
        </>
         :
         <GetVyaparProgramNewQuestion 
          sendData={surveyData}
          handleInputChange={handleInputChange}
          handleResources={handleResources}
         />
     }
     </>
      }
      </Dialog>
    </div>
  );
}
