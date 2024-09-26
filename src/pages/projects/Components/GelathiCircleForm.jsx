import * as React from 'react';
import { useEffect, useState } from 'react';
import axios from 'axios';
import {
  Button,
  Grid,
  Stack,
  TextField,
  Select,
  Radio,
  RadioGroup,
  MenuItem,
  FormControlLabel,
  Card,
  CardContent,
  DialogContent,
  DialogContentText,Box, CircularProgress
} from '@mui/material';
import { Icon } from '@iconify/react';
import Dialog from '@mui/material/Dialog';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Slide from '@mui/material/Slide';
import { useLocation } from 'react-router-dom';
import FormHelperText from '@mui/material/FormHelperText';
import Iconify from '../../../components/Iconify';
import { baseURL } from 'src/utils/api';
import { useAuth } from 'src/AuthContext';
const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

export default function GelathiCircleForm({
  itm,
  gelathiDrawerReloder,
  setShowForm,
  index,
  circleData,
  reloadmethod,
  clcikData,
  singleCircleData,
  id,componentreloadmethod 
}) {
    const { apikey } = useAuth();
  const { state } = useLocation();
  const [open, setOpen] = React.useState(true);
  const [vyaapar, setVyaapar] = useState('');
  const [circleform, setcircleform] = useState('');
  const [selectedValue, setSelectedValue] = React.useState('');
  const [skillValue, setSkillValue] = React.useState('');
  const [listenpara, setListenpara] = React.useState('');
  const [takeFeddBakcError, setTakeFeddBakcError] = useState(false);
  const [takeFeddBakc, setTakeFeddBakc] = React.useState('');
  const [giveAnOppurtutnityError, setGiveAnOppurtutnityError] = useState(false);
  const [giveAnOppurtutnity, setGiveAnOppurtutnity] = React.useState(''); 
  const [canUTellMeError, setCanUTellMeError] = useState(false);
  const [canUTellMe, setCanUTellMe] = React.useState('');
  const [goladAchicedError, setGoladAchicedError] = useState(false);
  const [goladAchicedValue, setGoladAchiced] = React.useState('');
  const [emotionbondError, setEmotionbondError] = useState(false);
  const [takeYouSeriouslyEroor, setTakeYouSeriouslyEroor] = useState(false);
  const [takeYouSeriously, setTakeYouSeriously] = React.useState('');
  const [emotionbond, setEmotionbond] = React.useState('');
  const [whenIgetTaskError, setWhenIgetTaskError] = useState(false);
  const [duscussPersonal, setDuscussPersonal] = React.useState('');
  const [duscussPersonalError, setDuscussPersonalError] = useState(false);
  const [whenIgetTask, setwhenIgetTask] = React.useState('');
  const [oneInstanaceError, setOneInstanaceError] = useState(false);
  const [oneInstanace, setOneInstanace] = React.useState('');
  const [didYouListenParaError, setDidYouListenParaError] = useState(false);
  const [didYouListenPara, setDidYouListenPara] = React.useState('');
  const [iBecameImpatientError, setIBecameImpatientError] = useState(false);
  const [iBecameImpatient, setIBecameImpatient] = React.useState('');
  const [leaderShipSkillError, setLeaderShipSkillError] = useState(false);
  const [leaderShipSkill, setILeaderShipSkill] = React.useState('');
  const [community, setCommunity] = React.useState('');
  const [age, setAge] = React.useState('');
  const [communitymem, setCommunitymem] = React.useState('');
  const [bringtogether, setbringTogether] = React.useState('');
  const [conflicts, setConflicts] = React.useState('');
  const label = { inputProps: { 'aria-label': 'Checkbox demo' } };
  const [sendData, setSendData] = useState(
    {
      "partcipantId": "",
      "GelathiId": "",
      "email_address": "",
      "Spoorthi_Session_Number": "",
      "list_down_your_skills": "",
      "skills_to_overcome_my_challenges": "",
      "used_skills_resources_combat_challenge": "",
      "listen_paragraph": "",
      //above is pending 
      "summarize_main_points_paragraph": "",
      "ask_two_questions_help_you_understand": "",
      "three_infrastructure_of_your_village": "",
      "know_the_need_of_my_community": "",
      "together_community_members_community_infrastructure": "",
      "with_other_community_infrastructure": "",
      "bring_someone_together": "",
      "brought_people_together_incident": "",
      "conflict_with_anyone_ask_position": "",
      "conflict_matters_interest_mine": "",
      "There_puja_at_my_house": "",
      "module1": "",
      "module2": "",
      "module3": "",
      "module4": "",
      "module5": "",
      "district": "",
      "district_name": "",
      "taluk": "",
      "taluk_name": "",
      "gram_panchayat": "",
      "village_name": "",
      "total_adults_no_of_member_household": "",
      "total_children_no_of_member_household": "",
      "house": "",
      "house_name": "",
      "ration_card": "",
      "ration_card_name":"",
      "cast_category": "",
      "cast_category_name": "",
      "mother_tongue": "",
      "religion": "",
      "religion_name": "",
      "age": "",
      "material_status": "",
      "material_status_name": "",
      "education": "",
      "education_name": "",
      "phone_number": "",
      "current_economic_activity_primary_occupation": "",
      "current_economic_activity_primary_occupation_name": "",
      "secondary_occupation_household": "",
      "secondary_occupation_household_name": "",
      "womens_occupation": "",
      "womens_occupation_name": "",
      "skills_motivation": "",
      "three_reasons_become_gelathi": "",
      "goals_achieve_as_gelathi": "",
      //above is pending 
      "goals_as_leader_next_year": "",
      "goals_for_ten_years": "",
      "community": "",
      "support_feelings": "",
      "meetings_day_feelings": "",
      "deal_with_angry_situation": "",
      "impatient_with_unclear_comm": "",
      //above is pending 
      "say_yes_when_unsure_of_instructions": "",
      //above is pending 
      "confidence": "",
      "persisted_when_others_quit": "",
      "narrate_instance": "",
      "goal_persistence_instance": "",
      //above is pending
      "task_response": "",
      //above is pending
      "challenge_reaction": "",
      "conflict_management": "",
      "conflict_handling": "",
      "solution_agreeable_to_others": "",
      "sense_of_sisterhood": "",
      "qualities_of_good_gelathi": "",
      "members_emotional_bond": "",
      //above is pending
      "members_discuss_personal_issues": "",
      //above is pendning
      "coping_mechanisms_when_sad": "",
      "possess_leadership_skills": "",
      //above is pending
      "leadership_skills_reason_yes": "",
      "leadership_skills_reason_no": "",
      "leadership_skills": "",
      "community_members_takes_seriously": "",
      //above is pending
      "takes_feedback_from_community_members": "",
      //above is pending 
      "feedback_from_community_members": "",
      //above is ending 
      "goals_as_gelathi": "",
      "willing_to_take_part_local_elections": ""
      //above is pending 
  }
   
  );
  const [talukOptions ,setTalukOptions] = useState([])
  const [districtOptions ,setDistrictOptions] = useState([])
  const [helperText, setHelperText] = React.useState('Please Select The Option.');
  const [sessionValueError, setSessionValueError] = useState(false);
  const [skillError, setSkillError] = useState(false);
  const [listenparaError, setListenParaError] = useState(false);
  const [communityError, setcommunityError] = useState(false);
  const [communitymemError, setcommunitymemError] = useState(false);
  const [bringtogetherError, setbringtogetherError] = useState(false);
  const [conflictsError, setconflictsError] = useState(false);
  const [spoorthiForm, setSpoorthiForm] = useState('');
  const [isFormPresentLocally ,setIsFormPresentLocally] =useState(false)
// Define the secondary income options with English and Kannada names
const womenWorkOptions = [
  { id: 1, name: "Crop cultivator/ಕೃಷಿ" },
  { id: 2, name: "Livestock farming/ಜಾನುವಾರು ಸಾಕಣೆ" },
  { id: 3, name: "Farm wage worker/ಕೃಷಿ ಕೂಲಿ ಕಾರ್ಮಿಕ" },
  { id: 4, name: "Non farm sector wage worker like factory worker, sales girl, domestic worker/ಕಾರ್ಖಾನೆಯ ಕೆಲಸಗಾರ, ಮಾರಾಟಗಾರ್ತಿ, ಮನೆಕೆಲಸದಂತಹ ಕೃಷಿಯೇತರ ವಲಯದ ಕೂಲಿ ಕೆಲಸಗಾರ" },
  { id: 5, name: "Business/Self employed like tailor, shop owner/ಟೈಲರ್, ಅಂಗಡಿ ಮಾಲೀಕರು, ವ್ಯಾಪಾರ/ಸ್ವಯಂ ಉದ್ಯೋಗಿ" },
  { id: 6, name: "Government employee/ಸರ್ಕಾರಿ ಉದ್ಯೋಗಿ" },
  { id: 7, name: "Private company employee/ಖಾಸಗಿ ಕಂಪನಿ ಉದ್ಯೋಗಿ" },
  { id: 8, name: "Housewife/ಮನೆಕೆಲಸ" },
  { id: 9, name: "Student/ವಿದ್ಯಾರ್ಥಿ" },
  { id: 10, name: "Looking for job/ಕೆಲಸ ಹುಡುಕುತ್ತಿರುವ" }
];
const secondaryIncomeOptions = [
  { id: 1, name: "Crop cultivator/ಕೃಷಿ" },
  { id: 2, name: "Livestock farming/ಜಾನುವಾರು ಸಾಕಣೆ" },
  { id: 3, name: "Farm wage worker/ಕೃಷಿ ಕೂಲಿ ಕಾರ್ಮಿಕ" },
  { id: 4, name: "Non farm sector wage worker like factory worker, sales girl, domestic worker/ಕಾರ್ಖಾನೆಯ ಕೆಲಸಗಾರ, ಮಾರಾಟಗಾರ್ತಿ, ಮನೆಕೆಲಸದಂತಹ ಕೃಷಿಯೇತರ ವಲಯದ ಕೂಲಿ ಕೆಲಸಗಾರ" },
  { id: 5, name: "Business/Self employed like tailor, shop owner/ಟೈಲರ್, ಅಂಗಡಿ ಮಾಲೀಕರು, ವ್ಯಾಪಾರ/ಸ್ವಯಂ ಉದ್ಯೋಗಿ" },
  { id: 6, name: "Government employee/ಸರ್ಕಾರಿ ಉದ್ಯೋಗಿ" },
  { id: 7, name: "Private company employee/ಖಾಸಗಿ ಕಂಪನಿ ಉದ್ಯೋಗಿ" },
  { id: 9, name: "Student/ವಿದ್ಯಾರ್ಥಿ" },
  { id: 10, name: "Looking for job/ಕೆಲಸ ಹುಡುಕುತ್ತಿರುವ" },
  { id: 11, name: "Not applicable/ಅನುಸ್ಥಿತಿಯಲ್ಲ" },
  { id: 12, name: "Other/ಇತರೆ"}
]
  // const districtOptions = [
  //   { id: 1, name: "Tumkur/ತುಮಕೂರು" },
  //   { id: 2, name: "Bangalore Rural/ಬೆಂಗಳೂರು ಗ್ರಾಮಾಂತರ" },
  //   { id: 3, name: "Kolar/ಕೋಲಾರ" },
  //   { id: 4, name: "Ramanagara/ರಾಮನಗರ" },
  //   { id: 5, name: "Chitradurga/ಚಿತ್ರದುರ್ಗ" },
  //   { id: 6, name: "Chikkaballapur/ಚಿಕ್ಕಬಳ್ಳಾಪುರ" },
  //   { id: 7, name: "Hassan/ಹಾಸನ" },
  //   { id: 8, name: "Davangere/ದಾವಣಗೆರೆ" },
  //   { id: 9, name: "Mandya/ಮಂಡ್ಯ" },
  //   { id: 10, name: "Mysore/ಮೈಸೂರು" },
  //   { id: 11, name: "Chamarajnagar/ಚಾಮರಾಜನಗರ" }
  // ];
  const houseOptions = [
    { id: 1, name: "Owned/ಸ್ವಂತ" },
    { id: 2, name: "Rented/ಬಾಡಿಗೆ" },
    { id: 3, name: "Others…/ಇತರೆ…"}
  ]
  const cardOptions = [
    { id: 1, name: "None/ಯಾವುದೂ ಇಲ್ಲ" },
    { id: 2, name: "APL/ಎಪಿಎಲ್" },
    { id: 3, name: "BPL/ಬಿಪಿಎಲ್" },
    { id: 4, name: "Antyodaya/ಅಂತ್ಯೋದಯ"}
  ]

  const casteOptions = [
    { id: 1, name: "ST/ಪರಿಶಿಷ್ಟ ಜಾತಿ" },
    { id: 2, name: "SC/ಪರಿಶಿಷ್ಟ ಪಂಗಡ" },
    { id: 3, name: "OBC/ಹಿಂದುಳಿದ ವರ್ಗ" },
    { id: 4, name: "Others/ಇತರೆ" }
  ];
  const religiousOptions = [
    { id: 1, name: "Hindu/ಹಿಂದೂ" },
    { id: 2, name: "Muslim/ಮುಸ್ಲಿಂ" },
    { id: 3, name: "Christian/ಕ್ರಿಶ್ಚಿಯನ್" },
    { id: 4, name: "Other/ಇತರೆ" },
    { id: 5, name: "No Religion/ಧರ್ಮವಿಲ್ಲ"}
  ]
// Define the marital status options with English and Kannada names
const maritalStatusOptions = [
  { id: 1, name: "Unmarried/ಅವಿವಾಹಿತ" },
  { id: 2, name: "Married/ವಿವಾಹಿತ" },
  { id: 3, name: "Divorced/ವಿಚ್ಛೇದಿತ" },
  { id: 4, name: "Widowed/ವಿಧವೆ" }
];

const educationOptions = [
  { id: 1, name: "Primary (1-6)/ಪ್ರಾಥಮಿಕ (1-6)" },
  { id: 2, name: "Secondary (6-10)/ದ್ವಿತೀಯ (6-10)" },
  { id: 3, name: "PU (11 and 12)/ಪಿಯು (11 ಮತ್ತು 12)" },
  { id: 4, name: "Degree/ಪದವಿ" },
  { id: 5, name: "Post Graduation/ಸ್ನಾತಕೋತ್ತರ ಪದವಿ" },
  { id: 6, name: "Other/ಇತರೆ" }
];
const occupationOptions = [
  { id: 1, name: "Crop cultivator/ಕೃಷಿ" },
  { id: 2, name: "Livestock farming/ಜಾನುವಾರು ಸಾಕಣೆ" },
  { id: 3, name: "Farm wage worker/ಕೃಷಿ ಕೂಲಿ ಕಾರ್ಮಿಕ" },
  { id: 4, name: "Non farm sector wage worker like factory worker, sales girl, domestic worker/ಕಾರ್ಖಾನೆಯ ಕೆಲಸಗಾರ, ಮಾರಾಟಗಾರ್ತಿ, ಮನೆಕೆಲಸದಂತಹ ಕೃಷಿಯೇತರ ವಲಯದ ಕೂಲಿ ಕೆಲಸಗಾರ" },
  { id: 5, name: "Business/Self employed like tailor, shop owner/ಟೈಲರ್, ಅಂಗಡಿ ಮಾಲೀಕರು, ವ್ಯಾಪಾರ/ಸ್ವಯಂ ಉದ್ಯೋಗಿ" },
  { id: 6, name: "Government employee/ಸರ್ಕಾರಿ ಉದ್ಯೋಗಿ" },
  { id: 7, name: "Private company employee/ಖಾಸಗಿ ಕಂಪನಿ ಉದ್ಯೋಗಿ" },
  { id: 9, name: "Student/ವಿದ್ಯಾರ್ಥಿ" },
  { id: 10, name: "Looking for job/ಕೆಲಸ ಹುಡುಕುತ್ತಿರುವ" }
];

const getTaluk = async (id) => {
  var data = JSON.stringify({
    "country_id": "1",
    "state_id": "3",
    "district_id": JSON.stringify(id)
  });
  var config = {
    method: 'post',
    url: baseURL + 'getLocation',
    headers: {
      'Content-Type': 'application/json',
       'Authorization': `${apikey}`
    },
    data: data
  };
  axios(config)
    .then(function (response) {
      setTalukOptions(response.data.list)
    })
    .catch(function (error) {
      // console.log(error);
    });
}
const getDistrict = async (district) => {
  var data = JSON.stringify({
    "country_id": "1",
    "state_id": '3',
    "district_id": "",
    
  });
  var config = {
    method: 'post',
    url: baseURL + 'getLocation',
    headers: {
      'Content-Type': 'application/json',
       'Authorization': `${apikey}`
    },
    data: data
  };
  axios(config)
    .then(function (response) {
      setDistrictOptions(response.data.list)
    })
    .catch(function (error) {
      // console.log(error);
    });
}
  const handleChangeSelect = (event) => {
    setAge(event.target.value);
  };
  // const sessionValue = (event) => {
  //   setSelectedValue(event.target.value);
  //   setSessionValueError(false);
  // };
  // const skillsoption = (event) => {
  //   setSkillValue(event.target.value);
  //   setSkillError(false);
  // };
  const paravalue = (event) => {
    setListenpara(event.target.value);
    setListenParaError(false);
  };
  const goladAchiced = (event) => {
    setGoladAchiced(event.target.value);
    setGoladAchicedError(false);
  };
  const takeFeddBakcHandler = (event) => {
    setTakeFeddBakc(event.target.value);
    setTakeFeddBakcError(false);
  };
  const canUTellMeHandker = (event) => {
    setCanUTellMe(event.target.value);
    setCanUTellMeError(false);
  };
  const giveAnOppurtutnityHandler = (event) => {
    setGiveAnOppurtutnity(event.target.value);
    setGiveAnOppurtutnityError(false);
  };
  const takeYouSeriouslyEroorHandler = (event) => {
    setTakeYouSeriously(event.target.value);
    setTakeYouSeriouslyEroor(false);
  };
  const leaderShipSkillHandler = (event) => {
    setILeaderShipSkill(event.target.value);
    setLeaderShipSkillError(false);
  };
  const oneInstanaceHandle = (event) => {
    setOneInstanace(event.target.value);
    setOneInstanaceError(false);
  };
  const duscussPersonalHandler = (event) => {
    setDuscussPersonal(event.target.value);
    setDuscussPersonalError(false);
  };
  const impatientHandle = (event) => {
    setIBecameImpatient(event.target.value);
    setIBecameImpatientError(false);
  };
  const didYouListenParaHandle = (event) => {
    setDidYouListenPara(event.target.value);
    setDidYouListenParaError(false);
  };
  const whenIgetTaskHandler = (event) => {
    setwhenIgetTask(event.target.value);
    setWhenIgetTaskError(false);
  };
  const emotionbondHandler = (event) => {
    setEmotionbond(event.target.value);
    setEmotionbondError(false);
  };
  // const communityvalue = (event) => {
  //   setCommunity(event.target.value);
  //   setcommunityError(false);
  // };
  // const communitymemvalue = (event) => {
  //   setCommunitymem(event.target.value);
  //   setcommunitymemError(false);
  // };
  // const bringtogethervalue = (event) => {
  //   setbringTogether(event.target.value);
  //   setbringtogetherError(false);
  // };
  // const Conflictvalue = (event) => {
  //   setConflicts(event.target.value);
  //   setconflictsError(false);
  // };
  const handleClickOpen = () => {
    setOpen(true);
    setLoader(true);
    setShowForm(true);
  };
  const handleClose = () => {
    setOpen(false);
    setIsFormPresentLocally(false)
    setShowForm(false);
  };
  useEffect(() => {
    gelathinamelist();
   
  }, []);
  useEffect(()=>{

    const existingData = localStorage.getItem('spoorthi');
  
        const parsedData = existingData ? JSON.parse(existingData) : [];
  
        if(parsedData?.length){
  
          parsedData.map(item=>{
  
            if(
              item?.partcipantId=== id
              // || item?.partcipantId===props?.itm.gelathi_id
              ){
  
              setSendData(item);
  
              setIsFormPresentLocally(true)
  
            }
  
          })
  
        }
  
  },[])
  const gelathinamelist = (async) => {
    // var data = JSON.stringify({
    //   partcipantId: id,
    // });
    var config = {
      method: 'post',
      url: baseURL + 'getGelathiList',
      headers: {
        'Content-Type': 'application/json',
         'Authorization': `${apikey}`
      },
      // data: data,
    };
    axios(config)
      .then(function (response) {
        localStorage.setItem('gelathilist',JSON.stringify(response?.data));
        setVyaapar(response?.data);
      })
      .catch(function (error) {
        // console.log(error);
        let gelathidata=JSON.parse(localStorage.getItem('gelathilist'))
        setVyaapar(gelathidata);
      });
  };

//   const saveDataLocally = (key, data) => {
  
 

//     const existingData = localStorage.getItem('spoorthi');
//     const parsedData = existingData ? JSON.parse(existingData) : [];
//     const newData = data; // Replace with your own data object
//     parsedData.push(newData);
//     const updatedData = parsedData;

//     localStorage.setItem('spoorthi', updatedData);

//     console.log("i called and store ", updatedData)

//   // localStorage.setItem(key, JSON.stringify(data));

// };

const saveDataLocally = (key, data) => {
 
  const existingData = localStorage.getItem('spoorthi');
  const parsedData = existingData ? JSON.parse(existingData) : [];
  const newData = data; // Replace with your own data object
  parsedData.push(newData);
  const updatedData = JSON.stringify(parsedData);
  localStorage.setItem('spoorthi', updatedData);
  componentreloadmethod();
// localStorage.setItem(key, JSON.stringify(data));
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
  const dummy ={
    partcipantId: JSON.stringify(parseInt(id)),
    email_address: sendData?.email_address,
    GelathiId: sendData?.GelathiId,
    Spoorthi_Session_Number: selectedValue,
    list_down_your_skills: sendData?.list_down_your_skills,
    skills_to_overcome_my_challenges: skillValue,
    used_skills_resources_combat_challenge: sendData?.used_skills_resources_combat_challenge,
    listen_paragraph: listenpara,
    summarize_main_points_paragraph: sendData?.summarize_main_points_paragraph,
    ask_two_questions_help_you_understand: sendData?.ask_two_questions_help_you_understand,
    three_infrastructure_of_your_village: sendData?.three_infrastructure_of_your_village,
    know_the_need_of_my_community: community,
    together_community_members_community_infrastructure: communitymem,
    with_other_community_infrastructure: sendData?.with_other_community_infrastructure,
    bring_someone_together: bringtogether,
    brought_people_together_incident: sendData?.brought_people_together_incident,
    conflict_with_anyone_ask_position: sendData?.conflict_with_anyone_ask_position,
    conflict_matters_interest_mine: conflicts,
    There_puja_at_my_house: sendData?.There_puja_at_my_house,
  }

  const gelathicircleformdata = async () => {
    var data = {}
    data = JSON.stringify(
      {
        "partcipantId": JSON.stringify(parseInt(id)),
        "GelathiId": sendData.GelathiId,
        "email_address": sendData.email_address,
        "listen_paragraph":sendData.listen_paragraph,
        "summarize_main_points_paragraph": sendData.summarize_main_points_paragraph,
        "ask_two_questions_help_you_understand": sendData.ask_two_questions_help_you_understand,
        "district": sendData.district_name,
        "taluk": sendData.taluk_name,
        "gram_panchayat": sendData.gram_panchayat,
        "village_name": sendData.village_name,
        "total_adults_no_of_member_household": sendData.total_adults_no_of_member_household,
        "total_children_no_of_member_household": sendData.total_children_no_of_member_household,
        "house": sendData.house_name,
        "ration_card": sendData.ration_card_name,
        "cast_category": sendData.cast_category_name,
        "mother_tongue": sendData.mother_tongue,
        "religion": sendData.religion_name,
        "age": sendData.age,
        "material_status":sendData.material_status_name,
        "education": sendData.education_name,
        "phone_number": sendData.phone_number,
        "current_economic_activity_primary_occupation": sendData.current_economic_activity_primary_occupation_name,
        "secondary_occupation_household":sendData.secondary_occupation_household_name,
        "womens_occupation": sendData.womens_occupation_name,
        "skills_motivation": sendData.skills_motivation,
        "three_reasons_become_gelathi":sendData.three_reasons_become_gelathi,
        "goals_achieve_as_gelathi": goladAchiced,
        "goals_as_leader_next_year": sendData.goals_as_leader_next_year,
        "goals_for_ten_years": sendData.goals_for_ten_years,
        "community": sendData.community,
        "support_feelings": sendData.support_feelings,
        "meetings_day_feelings": sendData.meetings_day_feelings,
        "deal_with_angry_situation": sendData.deal_with_angry_situation ,
        "impatient_with_unclear_comm": iBecameImpatient,
        "say_yes_when_unsure_of_instructions":sendData.say_yes_when_unsure_of_instructions,
        "confidence": sendData.confidence,
        "persisted_when_others_quit":sendData.persisted_when_others_quit,
        "narrate_instance": sendData.narrate_instance,
        "goal_persistence_instance":sendData.persisted_when_others_quit,
        "task_response": sendData.whenIgetTask,
        "challenge_reaction": sendData.challenge_reaction,
        "conflict_management": sendData.conflict_management,
        "conflict_handling":sendData.conflict_handling,
        "solution_agreeable_to_others": sendData.solution_agreeable_to_others,
        "sense_of_sisterhood": sendData.sense_of_sisterhood,
        "qualities_of_good_gelathi":sendData.qualities_of_good_gelathi,
        "members_emotional_bond": emotionbond,
        "members_discuss_personal_issues":duscussPersonal,
        "coping_mechanisms_when_sad": sendData.coping_mechanisms_when_sad,
        "possess_leadership_skills": leaderShipSkill,
        "leadership_skills_reason_yes": sendData.leadership_skills_reason_yes,
        "leadership_skills_reason_no": sendData.leadership_skills_reason_no,
        "leadership_skills":sendData.leadership_skills,
        "community_members_takes_seriously": takeYouSeriously,
        "takes_feedback_from_community_members":takeFeddBakc,
        "feedback_from_community_members": canUTellMe,
        "goals_as_gelathi": sendData.goals_as_gelathi,
        "willing_to_take_part_local_elections": giveAnOppurtutnity
    }

  //   {
  //     "partcipantId": "785828",
  //     "GelathiId": "892",
  //     "email_address": "participant@example.com",
  //     "listen_paragraph": "Listening to others attentively",
  //     "summarize_main_points_paragraph": "Key points were summarized effectively",
  //     "ask_two_questions_help_you_understand": "What were the challenges? How can we solve them?",
  //     "district": "District Name",
  //     "taluk": "Taluk Name",
  //     "gram_panchayat": "Panchayat Name",
  //     "village_name": "Village Name",
  //     "total_adults_no_of_member_household": "5",
  //     "total_children_no_of_member_household": "2",
  //     "house": "Yes",
  //     "ration_card": "Yes",
  //     "cast_category": "General",
  //     "mother_tongue": "Kannada",
  //     "religion": "Hindu",
  //     "age": "35",
  //     "material_status": "Married",
  //     "education": "Graduate",
  //     "phone_number": "9876543210",
  //     "current_economic_activity_primary_occupation": "Farming",
  //     "secondary_occupation_household": "None",
  //     "womens_occupation": "Tailoring",
  //     "skills_motivation": "To improve livelihood",
  //     "three_reasons_become_gelathi": "Leadership, Community involvement, Social impact",
  //     "goals_achieve_as_gelathi": "Increase community participation in development",
  //     "goals_as_leader_next_year": "Build a school in the village",
  //     "goals_for_ten_years": "Make the village self-sufficient in resources",
  //     "community": "Yes",
  //     "support_feelings": "Supportive environment",
  //     "meetings_day_feelings": "Meetings are productive and engaging",
  //     "deal_with_angry_situation": "I remain calm and try to understand the other person's point of view",
  //     "impatient_with_unclear_comm": "Yes, I get impatient sometimes",
  //     "say_yes_when_unsure_of_instructions": "No",
  //     "confidence": "High",
  //     "persisted_when_others_quit": "Yes, I continued the project even when others gave up",
  //     "narrate_instance": "I continued a village clean-up initiative when others were hesitant",
  //     "goal_persistence_instance": "I achieved the clean-up goal after persistent effort",
  //     "task_response": "I respond promptly and efficiently",
  //     "challenge_reaction": "I analyze the situation before reacting",
  //     "conflict_management": "I try to mediate between conflicting parties",
  //     "conflict_handling": "I listen to both sides and propose a compromise",
  //     "solution_agreeable_to_others": "Yes, the proposed solution was accepted by everyone",
  //     "sense_of_sisterhood": "Yes, there is a strong bond among women in the community",
  //     "qualities_of_good_gelathi": "Leadership, empathy, communication",
  //     "members_emotional_bond": "Yes, the group is emotionally bonded",
  //     "members_discuss_personal_issues": "Yes, we share and discuss personal challenges",
  //     "coping_mechanisms_when_sad": "I talk to friends and family, and practice meditation",
  //     "possess_leadership_skills": "Yes",
  //     "leadership_skills_reason_yes": "I have led various community projects successfully",
  //     "leadership_skills_reason_no": "",
  //     "leadership_skills": "Strong leadership qualities with good communication",
  //     "community_members_takes_seriously": "Yes, they respect my decisions",
  //     "takes_feedback_from_community_members": "Yes",
  //     "feedback_from_community_members": "They give constructive feedback to improve my leadership",
  //     "goals_as_gelathi": "Improve village infrastructure and social services",
  //     "willing_to_take_part_local_elections": "Yes"
  // }
  ); 

  console.log(data ,"formData")
    if(isOnline() && networkAccess())
      {

   
    // if (selectedValue == '') {
    //   setSessionValueError(true);
    //   setHelperText('Please Select The Option 1');
    // }
    // if (skillValue == '') {
    //   setSkillError(true);
    //   setHelperText('Please Select The Option2');
    // }

    //working
    // if (listenpara == '') {
    //   setListenParaError(true);
    //   setHelperText('Please Select The Option3');
    // }
    // if (goladAchicedValue == '') {
    //   setGoladAchicedError(true);
    //   setHelperText('Please Select The Option4');
    // }
    // if (takeFeddBakc == '') {
    //   setTakeFeddBakc(true);
    //   setHelperText('Please Select The Option5');
    // }
    // if (takeYouSeriously == '') {
    //   setTakeYouSeriouslyEroor(true);
    //   setHelperText('Please Select The Option6');
    // }

    // if (leaderShipSkill == '') {
    //   setLeaderShipSkillError(true);
    //   setHelperText('Please Select The Option7');
    // }
    // if (duscussPersonal == '') {
    //   setDuscussPersonalError(true);
    //   setHelperText('Please Select The Option8');
    // }
    // if (whenIgetTask == '') {
    //   setWhenIgetTaskError(true);
    //   setHelperText('Please Select The Option9');
    // }
    // if (emotionbond == '') {
    //   setEmotionbondError(true);
    //   setHelperText('Please Select The Option10');
    // }
    // if (oneInstanace == '') {
    //   setOneInstanaceError(true);
    //   setHelperText('Please Select The Option11');
    // }
    // if (didYouListenPara == '') {
    //   setDidYouListenParaError(true);
    //   setHelperText('Please Select The Option12');
    // }
    // if (iBecameImpatient == '') {
    //   setIBecameImpatient(true);
    //   setHelperText('Please Select The Option13');
    // }
    // if (conflicts == '') {
    //   setconflictsError(true);
    //   setHelperText('Please Select The Option17');
    // }
    // if (community == '') {
    //   setcommunityError(true);
    //   setHelperText('Please Select The Option14');
    // }


    //commented
    // if (communitymem == '') {
    //   setcommunitymemError(true);
    //   setHelperText('Please Select The Option15');
    // }
    // if (bringtogether == '') {
    //   setbringtogetherError(true);
    //   setHelperText('Please Select The Option16');
    // }
   
    if (true
      // conflicts != '' &&

      // community != '' &&
      // listenpara != '' 



      // bringtogether != '' &&
      // communitymem != ' ' &&
   
      // skillValue != '' &&
      // selectedValue != ''
    )
     {
      if(localStorage.getItem('spoorthi')){
        // data  = setSpoorthiForm()
        // setSpoorthiForm(data)
        saveDataLocally('spoorthi', data)
        data = setSpoorthiForm(saveDataLocally('spoorthi', JSON.parse(data)));
        setSpoorthiForm(data);

      }
      
      else{
console.log ("comming")
     var  data = JSON.stringify(
      {
        "partcipantId": JSON.stringify(parseInt(id)),
        "GelathiId": sendData.GelathiId,
        "email_address": sendData.email_address,
        "listen_paragraph":sendData.listen_paragraph,
        "summarize_main_points_paragraph": sendData.summarize_main_points_paragraph,
        "ask_two_questions_help_you_understand": sendData.ask_two_questions_help_you_understand,
        "district": sendData.district_name,
        "taluk": sendData.taluk_name,
        "gram_panchayat": sendData.gram_panchayat,
        "village_name": sendData.village_name,
        "total_adults_no_of_member_household": sendData.total_adults_no_of_member_household,
        "total_children_no_of_member_household": sendData.total_children_no_of_member_household,
        "house": sendData.house_name,
        "ration_card": sendData.ration_card_name,
        "cast_category": sendData.cast_category_name,
        "mother_tongue": sendData.mother_tongue,
        "religion": sendData.religion_name,
        "age": sendData.age,
        "material_status":sendData.material_status_name,
        "education": sendData.education_name,
        "phone_number": sendData.phone_number,
        "current_economic_activity_primary_occupation": sendData.current_economic_activity_primary_occupation_name,
        "secondary_occupation_household":sendData.secondary_occupation_household_name,
        "womens_occupation": sendData.womens_occupation_name,
        "skills_motivation": sendData.skills_motivation,
        "three_reasons_become_gelathi":sendData.three_reasons_become_gelathi,
        "goals_achieve_as_gelathi": goladAchiced,
        "goals_as_leader_next_year": sendData.goals_as_leader_next_year,
        "goals_for_ten_years": sendData.goals_for_ten_years,
        "community": sendData.community,
        "support_feelings": sendData.support_feelings,
        "meetings_day_feelings": sendData.meetings_day_feelings,
        "deal_with_angry_situation": sendData.deal_with_angry_situation ,
        "impatient_with_unclear_comm": iBecameImpatient,
        "say_yes_when_unsure_of_instructions":sendData.say_yes_when_unsure_of_instructions,
        "confidence": sendData.confidence,
        "persisted_when_others_quit":sendData.persisted_when_others_quit,
        "narrate_instance": sendData.narrate_instance,
        "goal_persistence_instance":sendData.persisted_when_others_quit,
        "task_response": sendData.whenIgetTask,
        "challenge_reaction": sendData.challenge_reaction,
        "conflict_management": sendData.conflict_management,
        "conflict_handling":sendData.conflict_handling,
        "solution_agreeable_to_others": sendData.solution_agreeable_to_others,
        "sense_of_sisterhood": sendData.sense_of_sisterhood,
        "qualities_of_good_gelathi":sendData.qualities_of_good_gelathi,
        "members_emotional_bond": emotionbond,
        "members_discuss_personal_issues":duscussPersonal,
        "coping_mechanisms_when_sad": sendData.coping_mechanisms_when_sad,
        "possess_leadership_skills": leaderShipSkill,
        "leadership_skills_reason_yes": sendData.leadership_skills_reason_yes,
        "leadership_skills_reason_no": sendData.leadership_skills_reason_no,
        "leadership_skills":sendData.leadership_skills,
        "community_members_takes_seriously": takeYouSeriously,
        "takes_feedback_from_community_members":takeFeddBakc,
        "feedback_from_community_members": canUTellMe,
        "goals_as_gelathi": sendData.goals_as_gelathi,
        "willing_to_take_part_local_elections": giveAnOppurtutnity
    }
  //   {
  //     "partcipantId": "785828",
  //     "GelathiId": "892",
  //     "email_address": "participant@example.com",
  //     "listen_paragraph": "Listening to others attentively",
  //     "summarize_main_points_paragraph": "Key points were summarized effectively",
  //     "ask_two_questions_help_you_understand": "What were the challenges? How can we solve them?",
  //     "district": "District Name",
  //     "taluk": "Taluk Name",
  //     "gram_panchayat": "Panchayat Name",
  //     "village_name": "Village Name",
  //     "total_adults_no_of_member_household": "5",
  //     "total_children_no_of_member_household": "2",
  //     "house": "Yes",
  //     "ration_card": "Yes",
  //     "cast_category": "General",
  //     "mother_tongue": "Kannada",
  //     "religion": "Hindu",
  //     "age": "35",
  //     "material_status": "Married",
  //     "education": "Graduate",
  //     "phone_number": "9876543210",
  //     "current_economic_activity_primary_occupation": "Farming",
  //     "secondary_occupation_household": "None",
  //     "womens_occupation": "Tailoring",
  //     "skills_motivation": "To improve livelihood",
  //     "three_reasons_become_gelathi": "Leadership, Community involvement, Social impact",
  //     "goals_achieve_as_gelathi": "Increase community participation in development",
  //     "goals_as_leader_next_year": "Build a school in the village",
  //     "goals_for_ten_years": "Make the village self-sufficient in resources",
  //     "community": "Yes",
  //     "support_feelings": "Supportive environment",
  //     "meetings_day_feelings": "Meetings are productive and engaging",
  //     "deal_with_angry_situation": "I remain calm and try to understand the other person's point of view",
  //     "impatient_with_unclear_comm": "Yes, I get impatient sometimes",
  //     "say_yes_when_unsure_of_instructions": "No",
  //     "confidence": "High",
  //     "persisted_when_others_quit": "Yes, I continued the project even when others gave up",
  //     "narrate_instance": "I continued a village clean-up initiative when others were hesitant",
  //     "goal_persistence_instance": "I achieved the clean-up goal after persistent effort",
  //     "task_response": "I respond promptly and efficiently",
  //     "challenge_reaction": "I analyze the situation before reacting",
  //     "conflict_management": "I try to mediate between conflicting parties",
  //     "conflict_handling": "I listen to both sides and propose a compromise",
  //     "solution_agreeable_to_others": "Yes, the proposed solution was accepted by everyone",
  //     "sense_of_sisterhood": "Yes, there is a strong bond among women in the community",
  //     "qualities_of_good_gelathi": "Leadership, empathy, communication",
  //     "members_emotional_bond": "Yes, the group is emotionally bonded",
  //     "members_discuss_personal_issues": "Yes, we share and discuss personal challenges",
  //     "coping_mechanisms_when_sad": "I talk to friends and family, and practice meditation",
  //     "possess_leadership_skills": "Yes",
  //     "leadership_skills_reason_yes": "I have led various community projects successfully",
  //     "leadership_skills_reason_no": "",
  //     "leadership_skills": "Strong leadership qualities with good communication",
  //     "community_members_takes_seriously": "Yes, they respect my decisions",
  //     "takes_feedback_from_community_members": "Yes",
  //     "feedback_from_community_members": "They give constructive feedback to improve my leadership",
  //     "goals_as_gelathi": "Improve village infrastructure and social services",
  //     "willing_to_take_part_local_elections": "Yes"
  // }
      );
      }
      var config = {
        method: 'post',
        url: baseURL+ 'addSpoorthiBaselineQuestionnaire',
        headers: {
          'Content-Type': 'application/json',
           'Authorization': `${apikey}`
        },
        data: data,
      };
      axios(config)
        .then(function (response) {
          if (response.data.success) {
            setcircleform(response?.data);
            alert('Spoorthi Form Submitted Successfully.');
            reloadmethod();
            gelathiDrawerReloder();
          }
        })
        .catch(function (error) {
          // console.log(error);
          setSpoorthiForm(saveDataLocally('spoorthi', data));
          componentreloadmethod();
        });
      // handleClose();
    }
     else {
      alert('Please Select The Option why this is comming. ');
    }
  }
   else{
    // if (selectedValue == '') {
    //   setSessionValueError(true);
    //   setHelperText('Please Select The Option111');
    // }
    // if (skillValue == '') {
    //   setSkillError(true);
    //   setHelperText('Please Select The Option2222');
    // }
   
    // if (communitymem == '') {
    //   setcommunitymemError(true);
    //   setHelperText('Please Select The Option555');
    // }
    // if (bringtogether == '') {
    //   setbringtogetherError(true);
    //   setHelperText('Please Select The Option666');
    // }

    //working
    // if (conflicts == '') {
    //   setconflictsError(true);
    //   setHelperText('Please Select The Option777');
    // }
    // if (listenpara == '') {
    //   setListenParaError(true);
    //   setHelperText('Please Select The Option333');
    // }
    // if (community == '') {
    //   setcommunityError(true);
    //   setHelperText('Please Select The Option4444');
    // }
    if (true
      // conflicts != '' &&
      // community != '' &&
      // listenpara != '' 



      // bringtogether != '' &&
      // communitymem != ' ' &&
     
      // skillValue != '' &&
      // selectedValue != ''
    ){

      console.log("comming inside local" )
      // setSpoorthiForm()
      // saveDataLocally('spoorthi', data)
      setSpoorthiForm(saveDataLocally('spoorthi', JSON.parse(data)));
      componentreloadmethod();
      handleClose();
    }else{
      alert("Please Select The Option ")

    }
  }

  };

  const [loader, setLoader] = useState(true);
  useEffect(() => {
    // After 3 seconds, set showCard to true to render the Card component
    const delay = 3000; // 3 seconds in milliseconds
    const timeoutId = setTimeout(() => {
      setLoader(false);
    }, delay);
  })

  useEffect(()=>{
    getDistrict()
  },[])
  return (
    <div>
      <Stack style={{ flexDirection: 'row', float: 'right' }} mb={2}>
      
        <button onClick={handleClickOpen} style={{border: 'none', outline: 'none', background: 'transparent', cursor: 'pointer'}}>
        <svg xmlns="http://www.w3.org/2000/svg" color="#ff7424" width="1.5em" height="1.5em" viewBox="0 0 36 36"><path fill="currentColor" d="M21 12H7a1 1 0 0 1-1-1V7a1 1 0 0 1 1-1h14a1 1 0 0 1 1 1v4a1 1 0 0 1-1 1ZM8 10h12V7.94H8Z" class="clr-i-outline clr-i-outline-path-1"/><path fill="currentColor" d="M21 14.08H7a1 1 0 0 0-1 1V19a1 1 0 0 0 1 1h11.36L22 16.3v-1.22a1 1 0 0 0-1-1ZM20 18H8v-2h12Z" class="clr-i-outline clr-i-outline-path-2"/><path fill="currentColor" d="M11.06 31.51v-.06l.32-1.39H4V4h20v10.25l2-1.89V3a1 1 0 0 0-1-1H3a1 1 0 0 0-1 1v28a1 1 0 0 0 1 1h8a3.44 3.44 0 0 1 .06-.49Z" class="clr-i-outline clr-i-outline-path-3"/><path fill="currentColor" d="m22 19.17l-.78.79a1 1 0 0 0 .78-.79Z" class="clr-i-outline clr-i-outline-path-4"/><path fill="currentColor" d="M6 26.94a1 1 0 0 0 1 1h4.84l.3-1.3l.13-.55v-.05H8V24h6.34l2-2H7a1 1 0 0 0-1 1Z" class="clr-i-outline clr-i-outline-path-5"/><path fill="currentColor" d="m33.49 16.67l-3.37-3.37a1.61 1.61 0 0 0-2.28 0L14.13 27.09L13 31.9a1.61 1.61 0 0 0 1.26 1.9a1.55 1.55 0 0 0 .31 0a1.15 1.15 0 0 0 .37 0l4.85-1.07L33.49 19a1.6 1.6 0 0 0 0-2.27ZM18.77 30.91l-3.66.81l.89-3.63L26.28 17.7l2.82 2.82Zm11.46-11.52l-2.82-2.82L29 15l2.84 2.84Z" class="clr-i-outline clr-i-outline-path-6"/><path fill="none" d="M0 0h36v36H0z"/></svg>
        </button>
      </Stack>
      <Dialog fullScreen open={open} onClose={handleClose} TransitionComponent={Transition}>
        <form
          onSubmit={(e) => {
            e.preventDefault();
            gelathicircleformdata();
          }}
        >
          <Toolbar sx={{ bgcolor: '#ff7424', color: 'white' }}>
            <IconButton style={{ float: 'right', color: 'white' }} onClick={handleClose}>
            {(isOnline())? <Iconify icon="material-symbols:arrow-back-rounded" />:<div style={{borderRadius:5}}> 🡠</div>}
            </IconButton>
            <Typography sx={{ ml: 2, flex: 1, color: 'inherit' }} variant="h6" component="div">
              Spoorthi Baseline Questionnaire 
            </Typography>
            <Button
              edge="end"
              type="submit"
              onClick={() => {
                // console.log('save');
              }}
              color="inherit"
            >
             {(isOnline())? <Iconify icon="material-symbols:save" width={30} height={30} />:"save"}
            </Button>
          </Toolbar>
          {(loader)? 
          <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '70vh' }}>
                <CircularProgress sx={{color:'#ff7424'}}/>
           </Box>:
           <DialogContent dividers={scroll === 'paper'} sx={{ background: '#f9fafb' }}>
            <DialogContentText id="scroll-dialog-description" tabIndex={-1}>
              <Grid style={{ margin: 10 }}>
                {/* <Card mt={1} style={{ marginTop: 10, borderRadius: 20 }}>
                  <CardContent>
                    <Typography variant="subtitle2" style={{ color: '#ff7424' }}>
                      Surveyor's email address *
                    </Typography>
                    <Stack mt={2} mb={2}>
                      <TextField
                        id="Email"
                        required
                        label="Enter Email"
                        onChange={(e) => {
                          setSendData({ ...sendData, email_address: e?.target?.value });
                        }}
                        variant="outlined"
                        color="common"
                      />
                    </Stack>
                  </CardContent>
                </Card> */}
                <Card mt={1} style={{ marginTop: 10, borderRadius: 20 }}>
                  <CardContent>
                    <Typography variant="subtitle2" style={{ color: '#ff7424' }}>
                    Profile of the women/ಮಹಿಳೆಯರ ವಿವರ *
                    </Typography>
                    <Stack mt={2} mb={2}>
                      <TextField
                        id="Email"
                        required
                        label="Enter Email"
                        onChange={(e) => {
                          setSendData({ ...sendData, email_address: e?.target?.value });
                        }}
                        variant="outlined"
                        color="common"
                      />
                    </Stack>
                  </CardContent>
                </Card>
                {/* <Card mt={1} style={{ marginTop: 10, borderRadius: 20 }}>
                  <CardContent>
                    <Typography variant="subtitle2" style={{ color: '#ff7424' }}>
                      Name of the Gelathi Facilitator/  /ಗೆಳತಿ ಆಯೋಜಕನ ಹೆಸರು*
                    </Typography>
                    <Stack mt={2} mb={2}>
                      <Select
                        color="common"
                        label="Choose Gelathi Facilitator"
                        variant="standard"
                        required
                        onChange={(e) => setSendData({ ...sendData, GelathiId: e?.target?.value })}
                        value={sendData?.GelathiId}
                      >
                        {vyaapar?.list?.map((itm) => {
                          return <MenuItem value={itm?.id}>{itm?.first_name}</MenuItem>;
                        })}
                      </Select>
                    </Stack>
                  </CardContent>
                </Card> */}

                <Card mt={1} style={{ marginTop: 10, borderRadius: 20 }}>
                  <CardContent>
                    <Typography variant="subtitle2" style={{ color: '#ff7424' }}>
                    Respondent’s name/ಪ್ರತಿಕ್ರಿಯಿಸಿದವರ ಹೆಸರು*
                    </Typography>
                    <Stack mt={2} mb={2}>
                      <Select
                        color="common"
                        label="Choose Gelathi Facilitator"
                        variant="standard"
                        required
                        onChange={(e) => setSendData({ ...sendData, GelathiId: e?.target?.value })}
                        value={sendData?.GelathiId}
                      >
                        {vyaapar?.list?.map((itm) => {
                          return <MenuItem value={itm?.id}>{itm?.first_name}</MenuItem>;
                        })}
                      </Select>
                    </Stack>
                  </CardContent>
                </Card>
                 {/* <Card style={{ marginTop: 10, borderRadius: 20 }}>
                  <CardContent>
                    <Stack mt={2}>
                      <Typography variant="subtitle2" style={{ color: '#ff7424' }}>
                        Spoorthi Session Number/ಸ್ಪೂರ್ತಿ ಸೆಷನ್ಸಂಖ್ಯೆ * (Tick the Spoorthi in which you are collecting
                        the data)
                        {sessionValueError ? (
                          <FormHelperText style={{ color: 'red' }}>{helperText}</FormHelperText>
                        ) : null}{' '}
                      </Typography>
                      <RadioGroup
                        aria-labelledby="demo-radio-buttons-group-label"
                        name="radio-buttons-group"
                        value={selectedValue}
                        onChange={sessionValue}
                       >
                        <FormControlLabel
                          value="Session 1"
                          control={<Radio style={{ color: '#595959' }} />}
                          label="Session 1"
                        />
                        <FormControlLabel
                          value="Session 2"
                          control={<Radio style={{ color: '#595959' }} />}
                          label="Session 2"
                        />
                        <FormControlLabel
                          value="Session 3"
                          control={<Radio style={{ color: '#595959' }} />}
                          label="Session 3"
                        />
                        <FormControlLabel
                          value="Session 4"
                          control={<Radio style={{ color: '#595959' }} />}
                          label="Session 4"
                        />
                        <FormControlLabel
                          value="Session 5"
                          control={<Radio style={{ color: '#595959' }} />}
                          label="Session 5"
                        />
                        <FormControlLabel
                          value="Session 6"
                          control={<Radio style={{ color: '#595959' }} />}
                          label="Session 6"
                        />
                      </RadioGroup>
                    </Stack>
                  </CardContent>
                </Card> */}

<Card mt={1} style={{ marginTop: 10, borderRadius: 20 }}>
  <CardContent>
    <Typography variant="subtitle2" style={{ color: '#ff7424' }}>
      District/Taluk-ಜಿಲ್ಲೆ/ತಾಲೂಕು
    </Typography>
    <Stack mt={2} mb={2}>
      <Select
        color="common"
        label="Choose District/Taluk-ಜಿಲ್ಲೆ/ತಾಲೂಕು"
        variant="standard"
        required
        onChange={(e) => {
          const selectedOption = districtOptions.find(option => option.id === e.target.value);
          setSendData({ 
            ...sendData, 
            district: selectedOption?.id, 
            district_name: selectedOption?.name 
          });
          console.log(selectedOption ,selectedOption?.id ,selectedOption?.name  )
        getTaluk(e?.target?.value)}}
        value={sendData?.district}
      >
        {/* Use the districtOptions variable for mapping */}
        {districtOptions && districtOptions.map((itm) => (
          <MenuItem key={itm.id} value={itm.id}>
            {itm.name}
          </MenuItem>
        ))}
      </Select>
    </Stack>
  </CardContent>
</Card>
                {/* <Card style={{ marginTop: 10, borderRadius: 20 }}>
                  <CardContent>
                    <Typography variant="subtitle2" style={{ color: '#ff7424' }}>
                      Can you list down three of your skills/ ನಿಮ್ಮ ಮೂರು ಕೌಶಲ್ಯಗಳನ್ನು ನೀವು ಪಟ್ಟಿ ಮಾಡಬಹುದು?
                    </Typography>
                    <Stack mt={2} mb={2}>
                      <TextField
                        id="skillslist"
                        label="Your Answer"
                        required
                        onChange={(e) => {
                          setSendData({ ...sendData, list_down_your_skills: e?.target?.value });
                        }}
                        variant="outlined"
                        color="common"
                      />
                    </Stack>
                  </CardContent>
                </Card> */}
            
<Card mt={1} style={{ marginTop: 10, borderRadius: 20 }}>
  <CardContent>
    <Typography variant="subtitle2" style={{ color: '#ff7424' }}>
    Taluk/ತಾಲೂಕು
    </Typography>
    <Stack mt={2} mb={2}>
      <Select
        color="common"
        label="Choose District/Taluk-ಜಿಲ್ಲೆ/ತಾಲೂಕು"
        variant="standard"
        required
        onChange={(e) => {
          const selectedOption = talukOptions.find(option => option.id === e.target.value);
          setSendData({ ...sendData, taluk: selectedOption.id ,taluk_name: selectedOption?.name })

        
        }}
        value={sendData?.taluk}
      >
        {/* Use the districtOptions variable for mapping */}
        {talukOptions && talukOptions.map((itm) => (
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
                    Gram panchayat/ಗ್ರಾಮ ಪಂಚಾಯಿತಿ*
                    </Typography>
                    <Stack mt={2} mb={2}>
                      <TextField
                        id="grampanchayath"
                        label="Your Answer"
                        required
                        onChange={(e) => {
                          setSendData({ ...sendData, gram_panchayat: e?.target?.value });
                        }}
                        variant="outlined"
                        color="common"
                      />
                    </Stack>
                  </CardContent>
                </Card>
                 {/* <Card style={{ marginTop: 10, borderRadius: 20 }}>
                  <CardContent>
                    <Typography variant="subtitle2" style={{ color: '#ff7424' }}>
                      State one instance of when you used your skills and resources to combat your challenge/ನಿಮ್ಮ
                      ಸವಾಲನ್ನು ಎದುರಿಸಲು ನಿಮ್ಮ ಕೌಶಲ್ಯ ಮತ್ತು ಸಂಪನ್ಮೂಲಗಳನ್ನು ನೀವು ಬಳಸಿದಾಗ ಒಂದು ಉದಾಹರಣೆಯನ್ನು ತಿಳಿಸಿ
                    </Typography>
                    <Stack mt={2} mb={2}>
                      <TextField
                        id="skillsresources"
                        label="Your Answer"
                        onChange={(e) => {
                          setSendData({ ...sendData, used_skills_resources_combat_challenge: e?.target?.value });
                        }}
                        variant="outlined"
                        color="common"
                      />
                    </Stack>
                  </CardContent>
                </Card> */}
                  <Card style={{ marginTop: 10, borderRadius: 20 }}>
                  <CardContent>
                    <Typography variant="subtitle2" style={{ color: '#ff7424' }}>
                    Village name/ಗ್ರಾಮದ ಹೆಸರು
                    </Typography>
                    <Stack mt={2} mb={2}>
                      <TextField
                        id="skillsresources"
                        label="Your Answer"
                        onChange={(e) => {
                          setSendData({ ...sendData, village_name: e?.target?.value });
                        }}
                        variant="outlined"
                        color="common"
                      />
                    </Stack>
                  </CardContent>
                </Card>
              
                  <Card style={{ marginTop: 10, borderRadius: 20 }}>
                  <CardContent>
                    <Stack mt={2}>
                      <Typography variant="subtitle2" style={{ color: '#ff7424' }}>
                        ನಮ್ಮ ಹಳ್ಳಿಯಲ್ಲಿರುವ ಕಸದ ಗುಡ್ಡೆ ಹಾದುಹೋಗುವಾಗ ನನಗೆ ಸದಾ ಬೇಸರವಾಗುತ್ತಿತ್ತು . ಈ ಪ್ರದೇಶವು, ನಮ್ಮಿಂ ದಲೇ
                        ತುಂಬಾ ಕೆಟ್ಟ ದಾಗಿ ದುರ್ವಾಸನೆ ಬೀರುತ್ತಿದೆ ಎಂದು ನನಗೆ ತಿಳಿದಿತ್ತು . ಆದರೆ, ಅದರ ಬಗ್ಗೆ ನನಗೆ ಏನುಮಾಡಬೇಕೆಂ ದು
                        ತಿಳಿದಿರಲಿಲ್ಲ . ಕಸವು ಪರಿಸರಕ್ಕೆ ದೊಡ್ಡ ಅಪಾಯವಾಗಿದೆ. ಇವು ಬಳಸಿದ ಪೇಪರ್, ಟಿಫಿನ್ ಪ್ಯಾ ಕಿಂ ಗಳು, ಪ್ಲಾಸ್ಟಿ
                        ಕ್ ಚೀಲಗಳು, ಐಸ್ ಕ್ರೀ ಮೊದಿಕೆಗಳು, ಬಾಟಲ್ ಕ್ಯಾ ನ್ಗಳು,ಮರಗಳಿಂದ ಬಿದ್ದ ಎಲೆಗಳು ಮತ್ತು ಇನ್ನೂ ವಿವಿಧಮೂಲಗಳಿಂದ
                        ಬರುತ್ತದೆ. ಕಸವು ಆವರಣವನ್ನು ಕೊಳಕು, ಅಶುದ್ಧ ಗೊಳಿಸುತ್ತದೆ ಮತ್ತು ರೋಗಗಳನ್ನು ಹುಟ್ಟು ಹಾಕುತ್ತದೆ ಎಂದು ನನಗೆ
                        ತಿಳಿದಿದೆ. ಎಸೆಯಲ್ಪಟ್ಟ ಬಹಳಷ್ಟು ಕಸವು ನವೀಕರಿಸಬಹುದಾದ ಮತ್ತು ಮರುಬಳಕೆಮಾಡಬಹುದಾದ ಕಾಗದ,ಲೋಹಗಳು ಮತ್ತು
                        ಗಾಜಿನಂತಹ ವಸ್ತುಗಳನ್ನು ಒಳಗೊಂಡಿರುತ್ತದೆ, ಅದನ್ನು ಹತ್ತಿರದ ಮರುಬಳಕೆ ಕೇಂದ್ರ ಕ್ಕೆ ಕಳುಹಿಸಬಹುದು ಅಥವಾ
                        ಜಂಕೀಲರ್ಗೆ ವಿಲೇವಾರಿಮಾಡಬಹುದು. ಇಂದಿನಿಂದ, ನಾನು ನನಗೆ ತಿಳಿದಿರುವ ವಸ್ತುಗಳನ್ನು ಮರುಬಳಕೆಮಾಡಲು ಪ್ರಯತ್ನಿ
                        ಸುತ್ತೇ ನೆ.Did you listen to the paragraph
                        {listenparaError ? (
                          <FormHelperText style={{ color: 'red' }}>{helperText}</FormHelperText>
                        ) : null}{' '}
                      </Typography>
                      <RadioGroup
                        aria-labelledby="demo-radio-buttons-group-label"
                        name="radio-buttons-group"
                        value={listenpara}
                        onChange={paravalue}
                      >
                        <FormControlLabel value="Yes" control={<Radio style={{ color: '#595959' }} />} label="Yes" />
                        <FormControlLabel value="No" control={<Radio style={{ color: '#595959' }} />} label="No" />
                      </RadioGroup>
                    </Stack>
                  </CardContent>
                </Card>

                <Card style={{ marginTop: 10, borderRadius: 20 }}>
                  <CardContent>
                    <Typography variant="subtitle2" style={{ color: '#ff7424' }}>
                    Total number of members in your household (adult)
 ನಿಮ್ಮ ಮನೆಯ ಸದಸ್ಯರ ಒಟ್ಟು ಸಂಖ್ಯೆ
                    </Typography>
                    <Stack mt={2} mb={2}>
                      <TextField
                        id="skillsresources"
                        label="Your Answer"
                        onChange={(e) => {
                          setSendData({ ...sendData, total_adults_no_of_member_household: e?.target?.value });
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
                    Total number of members in your household (children)
                    </Typography>
                    <Stack mt={2} mb={2}>
                      <TextField
                        id="skillsresources"
                        label="Your Answer"
                        onChange={(e) => {
                          setSendData({ ...sendData, total_children_no_of_member_household: e?.target?.value });
                        }}
                        variant="outlined"
                        color="common"
                      />
                    </Stack>
                  </CardContent>
                </Card>
               
<Card mt={1} style={{ marginTop: 10, borderRadius: 20 }}>
  <CardContent>
    <Typography variant="subtitle2" style={{ color: '#ff7424' }}>
      House/ಮನೆ:
    </Typography>
    <Stack mt={2} mb={2}>
      <Select
        color="common"
        label="Choose House Type/ಮನೆ ಪ್ರಕಾರ"
        variant="standard"
        required
        onChange={(e) => {
           const selectedOption = houseOptions.find(option => option.id === e.target.value);
          setSendData({ ...sendData, house: selectedOption.id, house_name: selectedOption?.name  });
       
          console.log(selectedOption); }}
        value={sendData?.house}
      >
        {/* Map the houseOptions to the dropdown */}
        {houseOptions.map((itm) => (
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
                    Ration card/ಪಡಿತರ ಚೀಟಿ: 

                    </Typography>
                    <Stack mt={2} mb={2}>
                      <Select
                        color="common"
                        label="Choose  Ration card/ಪಡಿತರ ಚೀಟಿ:"
                        variant="standard"
                        required
                        onChange={(e) => {
                          const selectedOption = cardOptions.find(option => option.id === e.target.value);
                         setSendData({ ...sendData, ration_card: selectedOption.id, ration_card_name: selectedOption?.name  });
                      
                         console.log(selectedOption); }}
                        value={sendData?.ration_card}
                      >
                       {cardOptions.map((itm) => (
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
                      Please summarize the main points of the paragraph?/ಮೇಲಿನ ಪರಿಚ್ಚೇ ದದ ಮುಖ್ಯ ಅಂಶಗಳನ್ನು
                      ನೀವುಸಂಕ್ಷಿಪ್ತವಾಗಿ ತಿಳಿಸಿ. (ಸತ್ಯ ತೆ ಮತ್ತು ಭಾವನೆಗಳೆರಡನ್ನೂ ವಿಶ್ಲೇ ಷಿಸುವುದು)
                    </Typography>
                    <Stack mt={2} mb={2}>
                      <TextField
                        id="parapoints"
                        label="Your Answer"
                        onChange={(e) => {
                          setSendData({ ...sendData, summarize_main_points_paragraph: e?.target?.value });
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
                      Please ask two questions that can help you understand the previous paragraph better?/ಹಿಂದಿನ
                      ಪರಿಚ್ಛೇ ದವನ್ನು ಚೆನ್ನಾಗಿ ಅರ್ಥಮಾಡಿಕೊಳ್ಳಲು ನಿಮಗೆ ಸಹಾಯ ಮಾಡುವ ಎರಡು ಪ್ರಶ್ನೆ ನೀವು ಕೇಳಿ.
                    </Typography>
                    <Stack mt={2} mb={2}>
                      <TextField
                        id="twoquestions"
                        label="Your Answer"
                        onChange={(e) => {
                          setSendData({ ...sendData, ask_two_questions_help_you_understand: e?.target?.value });
                        }}
                        variant="outlined"
                        color="common"
                      />
                    </Stack>
                  </CardContent>
                </Card>
              
<Card mt={1} style={{ marginTop: 10, borderRadius: 20 }}>
  <CardContent>
    <Typography variant="subtitle2" style={{ color: '#ff7424' }}>
    Caste Category/ಜಾತಿ ವರ್ಗ:
    </Typography>
    <Stack mt={2} mb={2}>
      <Select
        color="common"
        label="Choose Caste Category/ಜಾತಿ ವರ್ಗ:"
        variant="standard"
        required
        onChange={(e) => {
          const selectedOption = casteOptions.find(option => option.id === e.target.value);
         setSendData({ ...sendData, cast_category: selectedOption.id, cast_category_name: selectedOption?.name  });
      
         console.log(selectedOption); }}
        value={sendData?.cast_category}
      >
        {/* Map the houseOptions to the dropdown */}
        {casteOptions.map((itm) => (
          <MenuItem key={itm.id} value={itm.id}>
            {itm.name}
          </MenuItem>
        ))}
      </Select>
    </Stack>
  </CardContent>
</Card>
                {/* <Card style={{ marginTop: 10, borderRadius: 20 }}>
                  <CardContent>
                    <Typography variant="subtitle2" style={{ color: '#ff7424' }}>
                      Please name three infrastructure of your village?/ಗ್ರಾಮದಲ್ಲಿ ಇರುವ ಮೂರುಮೂಲಸೌಕರ್ಯಗಳನ್ನು ಹೆಸರಿಸಿ.
                    </Typography>
                    <Stack mt={2} mb={2}>
                      <TextField
                        id="twoquestions"
                        label="Your Answer"
                        onChange={(e) => {
                          setSendData({ ...sendData, three_infrastructure_of_your_village: e?.target?.value });
                        }}
                        variant="outlined"
                        color="common"
                      />
                    </Stack>
                  </CardContent>
                </Card> */}
              <Card mt={1} style={{ marginTop: 10, borderRadius: 20 }}>
  <CardContent>
    <Typography variant="subtitle2" style={{ color: '#ff7424' }}>
      Religion/ಧರ್ಮ:
    </Typography>
    <Stack mt={2} mb={2}>
      <Select
        color="common"
        label="Choose Religion/ಧರ್ಮ"
        variant="standard"
        required
        onChange={(e) => {
          const selectedOption = religiousOptions.find(option => option.id === e.target.value);
         setSendData({ ...sendData, religion: selectedOption.id, religion_name: selectedOption?.name  });
      
         console.log(selectedOption); }} value={sendData?.religion}
      >
        {/* Map the religiousOptions to the dropdown */}
        {religiousOptions.map((itm) => (
          <MenuItem key={itm.id} value={itm.id}>
            {itm.name}
          </MenuItem>
        ))}
      </Select>
    </Stack>
  </CardContent>
</Card>
                {/* <Card style={{ marginTop: 10, borderRadius: 20 }}>
                  <CardContent>
                    <Stack mt={2}>
                      <Typography variant="subtitle2" style={{ color: '#ff7424' }}>
                        I Know the need of my community/ನನ್ನ ಸಮುದಾಯದ ಅವಶ್ಯಕತೆ ನನಗೆ ತಿಳಿದಿದೆ
                        {communityError ? (
                          <FormHelperText style={{ color: 'red' }}>{helperText}</FormHelperText>
                        ) : null}{' '}
                      </Typography>
                      <RadioGroup
                        aria-labelledby="demo-radio-buttons-group-label"
                        name="radio-buttons-group"
                        value={community}
                        onChange={communityvalue}
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
                          value="Strongly Disagree"
                          control={<Radio style={{ color: '#595959' }} />}
                          label="Strongly Disagree"
                        />
                        <FormControlLabel
                          value="Disagree"
                          control={<Radio style={{ color: '#595959' }} />}
                          label="Disagree"
                        />
                      </RadioGroup>
                    </Stack>
                  </CardContent>
                </Card> */}
                   <Card style={{ marginTop: 10, borderRadius: 20 }}>
                  <CardContent>
                    <Typography variant="subtitle2" style={{ color: '#ff7424' }}>
                    Mother Tongue/ಮಾತೃ ಭಾಷೆ
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
                {/* <Card style={{ marginTop: 10, borderRadius: 20 }}>
                  <CardContent>
                    <Stack mt={2}>
                      <Typography variant="subtitle2" style={{ color: '#ff7424' }}>
                        I have come together with other community members to make a change in our community
                        infrastructure/ನಮ್ಮ ಸಮುದಾಯದ ಮೂಲಸೌಕರ್ಯದಲ್ಲಿ ಬದಲಾವಣೆ ಮಾಡಲು ನಾನು ಇತರ ಸಮುದಾಯದ ಸದಸ್ಯರೊಂದಿಗೆ
                        ಸೇರಿಕೊಂಡಿದ್ದೇನೆ
                        {communitymemError ? (
                          <FormHelperText style={{ color: 'red' }}>{helperText}</FormHelperText>
                        ) : null}{' '}
                      </Typography>
                      <RadioGroup
                        aria-labelledby="demo-radio-buttons-group-label"
                        name="radio-buttons-group"
                        value={communitymem}
                        onChange={communitymemvalue}
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
                          value="Strongly Disagree"
                          control={<Radio style={{ color: '#595959' }} />}
                          label="Strongly Disagree"
                        />
                        <FormControlLabel
                          value="Disagree"
                          control={<Radio style={{ color: '#595959' }} />}
                          label="Disagree"
                        />
                      </RadioGroup>
                    </Stack>
                  </CardContent>
                </Card> */}
                
                <Card style={{ marginTop: 10, borderRadius: 20 }}>
                  <CardContent>
                    <Typography variant="subtitle2" style={{ color: '#ff7424' }}>
                    Age/ವಯಸ್ಸು
                    </Typography>
                    <Stack mt={2} mb={2}>
                      <TextField
                        id="twoquestions"
                        label="Your Answer"
                        onChange={(e) => {
                          setSendData({ ...sendData, age: e?.target?.value });
                        }}
                        variant="outlined"
                        color="common"
                      />
                    </Stack>
                  </CardContent>
                </Card>
                {/* <Card style={{ marginTop: 10, borderRadius: 20 }}>
                  <CardContent>
                    <Typography variant="subtitle2" style={{ color: '#ff7424' }}>
                      Tell us about one instance when you came together with other community members to make a change in
                      the community infrastructure/ಸಮುದಾಯದ ಮೂಲಸೌಕರ್ಯದಲ್ಲಿ ಬದಲಾವಣೆಯನ್ನು ಮಾಡಲು ನೀವು ಇತರ ಸಮುದಾಯದ
                      ಸದಸ್ಯರೊಂದಿಗೆ ಸೇರಿಕೊಂಡಾಗ ಒಂದು ಉದಾಹರಣೆಯ ಕುರಿತು ನಮಗೆ ತಿಳಿಸಿ
                    </Typography>
                    <Stack mt={2} mb={2}>
                      <TextField
                        id="instance"
                        label="Your Answer"
                        onChange={(e) => {
                          setSendData({ ...sendData, with_other_community_infrastructure: e?.target?.value });
                        }}
                        variant="outlined"
                        color="common"
                      />
                    </Stack>
                  </CardContent>
                </Card> */}
               
<Card mt={1} style={{ marginTop: 10, borderRadius: 20 }}>
  <CardContent>
    <Typography variant="subtitle2" style={{ color: '#ff7424' }}>
    Marital Status/ವೈವಾಹಿಕ ಸ್ಥಿತಿ
    </Typography>
    <Stack mt={2} mb={2}>
      <Select
        color="common"
        label="Choose Marital Status/ವೈವಾಹಿಕ ಸ್ಥಿತಿ"
        variant="standard"
        required
        onChange={(e) => {
          const selectedOption = maritalStatusOptions.find(option => option.id === e.target.value);
         setSendData({ ...sendData, material_status: selectedOption.id, material_status_name: selectedOption?.name  });
      
         console.log(selectedOption); }}value={sendData?.material_status}
      >
        {/* Map the maritalStatusOptions to the dropdown */}
        {maritalStatusOptions.map((itm) => (
          <MenuItem key={itm.id} value={itm.id}>
            {itm.name}
          </MenuItem>
        ))}
      </Select>
    </Stack>
  </CardContent>
</Card>
                {/* <Card style={{ marginTop: 10, borderRadius: 20 }}>
                  <CardContent>
                    <Stack mt={2}>
                      <Typography variant="subtitle2" style={{ color: '#ff7424' }}>
                        When you want to bring someone together and want to get an action done/ನೀವು ಯಾರನ್ನಾದರೂ ಒಟ್ಟಿಗೆ
                        ಸೇರಿಸಲು ಬಯಸಿದಾಗ ಮತ್ತು ಕ್ರಿಯೆಯನ್ನು ಮಾಡಲು ಬಯಸಿದಾಗ
                        {bringtogetherError ? (
                          <FormHelperText style={{ color: 'red' }}>{helperText}</FormHelperText>
                        ) : null}{' '}
                      </Typography>
                      <RadioGroup
                        aria-labelledby="demo-radio-buttons-group-label"
                        name="radio-buttons-group"
                        value={bringtogether}
                        onChange={bringtogethervalue}
                      >
                        <FormControlLabel
                          value="Most often I am successful"
                          control={<Radio style={{ color: '#595959' }} />}
                          label="Most often I am successful"
                        />
                        <FormControlLabel
                          value="I am successful at doing this"
                          control={<Radio style={{ color: '#595959' }} />}
                          label="I am successful at doing this"
                        />
                        <FormControlLabel
                          value="I struggle to bring women together"
                          control={<Radio style={{ color: '#595959' }} />}
                          label="I struggle to bring women together"
                        />
                        <FormControlLabel
                          value="I am successful at getting women together but not getting an action done"
                          control={<Radio style={{ color: '#595959' }} />}
                          label="I am successful at getting women together but not getting an action done"
                        />
                      </RadioGroup>
                    </Stack>
                  </CardContent>
                </Card> */}
              <Card mt={1} style={{ marginTop: 10, borderRadius: 20 }}>
  <CardContent>
    <Typography variant="subtitle2" style={{ color: '#ff7424' }}>
      Education/ಶಿಕ್ಷಣ:
    </Typography>
    <Stack mt={2} mb={2}>
      <Select
        color="common"
        label="Choose Education Level/ಶಿಕ್ಷಣದ ಮಟ್ಟ"
        variant="standard"
        required
        onChange={(e) => {
          const selectedOption = educationOptions.find(option => option.id === e.target.value);
         setSendData({ ...sendData, education: selectedOption.id, education_name: selectedOption?.name  });
      
         console.log(selectedOption); }}
        value={sendData?.education}
      >
        {/* Map the educationOptions to the dropdown */}
        {educationOptions.map((itm) => (
          <MenuItem key={itm.id} value={itm.id}>
            {itm.name}
          </MenuItem>
        ))}
      </Select>
    </Stack>
  </CardContent>
</Card>
                {/* <Card style={{ marginTop: 10, borderRadius: 20 }}>
                  <CardContent>
                    <Stack mt={2}>
                      <Typography variant="subtitle2" style={{ color: '#ff7424' }}>
                        At the end of a conflict it matters to me that the other person's interest/need has been met as
                        well as mine / ಘರ್ಷಣೆಯ ಕೊನೆಯಲ್ಲಿ ಇನ್ನೊಬ್ಬರ ಆಸಕ್ತಿ/ಅವಶ್ಯಕತೆ ನನ್ನ ಜೊತೆಗೆ ಪೂರೈಸಲ್ಪಟ್ಟಿದೆ ಎಂಬುದು
                        ನನಗೆ ಮುಖ್ಯವಾಗಿದೆ
                        {conflictsError ? (
                          <FormHelperText style={{ color: 'red' }}>{helperText}</FormHelperText>
                        ) : null}{' '}
                      </Typography>
                      <RadioGroup
                        aria-labelledby="demo-radio-buttons-group-label"
                        name="radio-buttons-group"
                        value={conflicts}
                        onChange={Conflictvalue}
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
                          value="Strongly Disagree"
                          control={<Radio style={{ color: '#595959' }} />}
                          label="Strongly Disagree"
                        />
                        <FormControlLabel
                          value="Disagree"
                          control={<Radio style={{ color: '#595959' }} />}
                          label="Disagree"
                        />
                      </RadioGroup>
                    </Stack>
                  </CardContent>
                </Card> */}
                <Card style={{ marginTop: 10, borderRadius: 20 }}>
                  <CardContent>
                    <Typography variant="subtitle2" style={{ color: '#ff7424' }}>
                    Phone Number/ದೂರವಾಣಿ ಸಂಖ್ಯೆ
                    </Typography>
                    <Stack mt={2} mb={2}>
                      <TextField
                        id="twoquestions"
                        label="Your Answer"
                        onChange={(e) => {
                          setSendData({ ...sendData, phone_number: e?.target?.value });
                        }}
                        variant="outlined"
                        color="common"
                      />
                    </Stack>
                  </CardContent>
                </Card>
                {/* <Card style={{ marginTop: 10, borderRadius: 20 }}>
                  <CardContent>
                    <Typography variant="subtitle2" style={{ color: '#ff7424' }}>
                      There is a puja at my house and I am sitting for it. Suddenly, my neighbour plays loud and
                      inappropriate music which disturbs the puja. How will you talk to your neighbour on the grivance
                      you have with them?/ನನ್ನ ಮನೆಯಲ್ಲಿ ಪೂಜೆ ಇದೆ ಅದಕ್ಕಾಗಿ ಕುಳಿತಿದ್ದೇನೆ. ಇದ್ದಕ್ಕಿದ್ದಂತೆ, ನನ್ನ
                      ನೆರೆಹೊರೆಯವರು ಜೋರಾಗಿ ಮತ್ತು ಅನುಚಿತವಾದ ಸಂಗೀತವನ್ನು ನುಡಿಸುತ್ತಾರೆ ಅದು ಪೂಜೆಗೆ ಅಡ್ಡಿಪಡಿಸುತ್ತದೆ. ನಿಮ್ಮ
                      ನೆರೆಹೊರೆಯವರೊಂದಿಗೆ ನೀವು ಹೊಂದಿರುವ ಕುಂದುಕೊರತೆಯ ಬಗ್ಗೆ ನೀವು ಹೇಗೆ ಮಾತನಾಡುತ್ತೀರಿ?
                    </Typography>
                    <Stack mt={2} mb={2}>
                      <TextField
                        id="instance"
                        label="Your Answer"
                        onChange={(e) => {
                          setSendData({ ...sendData, There_puja_at_my_house: e?.target?.value });
                        }}
                        variant="outlined"
                        color="common"
                      />
                    </Stack>
                  </CardContent>
                </Card> */}
                 <Card mt={1} style={{ marginTop: 10, borderRadius: 20 }}>
                  <CardContent>
                    <Typography variant="subtitle2" style={{ color: '#ff7424' }}>
                    Current Economic Activity - Primary Occupation of the Household/ 
                    ಪ್ರಸ್ತುತ ಆರ್ಥಿಕ ಚಟುವಟಿಕೆ - ಕುಟುಂಬದ  ಪ್ರಾಥಮಿಕ ಉದ್ಯೋಗ

                    </Typography>
                    <Stack mt={2} mb={2}>
                      <Select
                        color="common"
                        label="Choose Current Economic Activity"
                        variant="standard"
                        required
                        onChange={(e) => {
                          const selectedOption = occupationOptions.find(option => option.id === e.target.value);
                         setSendData({ ...sendData, current_economic_activity_primary_occupation: selectedOption.id, current_economic_activity_primary_occupation_name: selectedOption?.name  });
                      
                         console.log(selectedOption); }} value={sendData?.current_economic_activity_primary_occupation}
                      >
                       {/* Map the occupationOptions to the dropdown */}
        {occupationOptions.map((itm) => (
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
                    Secondary Occupation of the Household/
                    ಕುಟುಂಬದ  ದ್ವಿತೀಯಕ ಉದ್ಯೋಗ

                    </Typography>
                    <Stack mt={2} mb={2}>
                      <Select
                        color="common"
                        label="Choose Secondary Occupation of the Household"
                        variant="standard"
                        required
                        onChange={(e) => {
                          const selectedOption = secondaryIncomeOptions.find(option => option.id === e.target.value);
                         setSendData({ ...sendData, secondary_occupation_household: selectedOption.id, secondary_occupation_household_name: selectedOption?.name  });
                      
                         console.log(selectedOption); }}
                         
                         value={sendData?.secondary_occupation_household}
                      >
                               {secondaryIncomeOptions.map((itm) => (
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
                    Women's Occupation/ಮಹಿಳಾ ಉದ್ಯೋಗ

                    </Typography>
                    <Stack mt={2} mb={2}>
                      <Select
                        color="common"
                        label="Choose Women's Occupation/ಮಹಿಳಾ ಉದ್ಯೋಗ"
                        variant="standard"
                        required
                        onChange={(e) => {
                          const selectedOption = womenWorkOptions.find(option => option.id === e.target.value);
                         setSendData({ ...sendData, womens_occupation: selectedOption.id, womens_occupation_name: selectedOption?.name  });
                      
                         console.log(selectedOption); }}
                        
                        value={sendData?.womens_occupation}
                      >
                       {womenWorkOptions.map((itm) => (
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
                    Skills and Motivation/ಕೌಶಲ್ಯ ಮತ್ತು ಪ್ರೇರಣೆ
                    </Typography>
                    <Stack mt={2} mb={2}>
                      <TextField
                        id="twoquestions"
                        label="Your Answer"
                        onChange={(e) => {
                          setSendData({ ...sendData, skills_motivation: e?.target?.value });
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
                    Can you tell me three reasons that motivated you to become a Gelathi? Record Verbatim/   
ನೀವು ಗೆಳತಿ ಆಗಲು ಪ್ರೇರೇಪಿಸಿದ ಮೂರು ಕಾರಣಗಳನ್ನು ನನಗೆ ಹೇಳಬಲ್ಲಿರಾ?ಮೌಖಿಕವಾಗಿ ದಾಖಲಿಸಿ
                    </Typography>
                    <Stack mt={2} mb={2}>
                      <TextField
                        id="twoquestions"
                        label="Your Answer"
                        onChange={(e) => {
                          setSendData({ ...sendData, three_reasons_become_gelathi: e?.target?.value });
                        }}
                        variant="outlined"
                        color="common"
                      />
                    </Stack>
                  </CardContent>
                </Card>
                <Card style={{ marginTop: 10, borderRadius: 20 }}>
                  <CardContent>
                    <Stack mt={2}>
                      <Typography variant="subtitle2" style={{ color: '#ff7424' }}>
                      Have you prepared a list of goals that you want to achieve as a Gelathi? (Yes/No)
                      /ನೀವು ಗೆಳತಿಯಾಗಿ ಸಾಧಿಸಲು ಬಯಸುವ ಗುರಿಗಳ ಪಟ್ಟಿಯನ್ನು ನೀವು ಸಿದ್ಧಪಡಿಸಿದ್ದೀರಾ? (ಹೌದು/ಇಲ್ಲ)
                        {goladAchicedError ? (
                          <FormHelperText style={{ color: 'red' }}>{helperText}</FormHelperText>
                        ) : null}{' '}
                      </Typography>
                      <RadioGroup
                        aria-labelledby="demo-radio-buttons-group-label"
                        name="radio-buttons-group"
                        value={goladAchicedValue}
                        onChange={goladAchiced}
                      >
                        <FormControlLabel value="Yes" control={<Radio style={{ color: '#595959' }} />} label="Yes" />
                        <FormControlLabel value="No" control={<Radio style={{ color: '#595959' }} />} label="No" />
                      </RadioGroup>
                    </Stack>
                  </CardContent>
                </Card>
                <Card style={{ marginTop: 10, borderRadius: 20 }}>
                  <CardContent>
                    <Typography variant="subtitle2" style={{ color: '#ff7424' }}>
                    Can you mention three goals that you want to achieve as a group leader in the next one year? Record Verbatim/ಮುಂದಿನ ಒಂದು ವರ್ಷದಲ್ಲಿ ಗುಂಪಿನ ನಾಯಕರಾಗಿ ನೀವು ಸಾಧಿಸಲು ಬಯಸುವ ಮೂರು ಗುರಿಗಳನ್ನು ನೀವು ನಮೂದಿಸಬಹುದೇ? ಮೌಖಿಕವಾಗಿ ದಾಖಲಿಸಿ
                    </Typography>
                    <Stack mt={2} mb={2}>
                      <TextField
                        id="twoquestions"
                        label="Your Answer"
                        onChange={(e) => {
                          setSendData({ ...sendData, goals_as_leader_next_year: e?.target?.value });
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
                    Can you mention three goals that you want to see achieved in your village in the next 10 years? Record Verbatim/ಮುಂದಿನ 10 ವರ್ಷಗಳಲ್ಲಿ ನಿಮ್ಮ ಗ್ರಾಮದಲ್ಲಿ ಸಾಧಿಸಲು ನೀವು ಬಯಸುವ ಮೂರು ಗುರಿಗಳನ್ನು ನೀವು ನಮೂದಿಸಬಹುದೇ? ಮೌಖಿಕವಾಗಿ ದಾಖಲಿಸಿ
                    </Typography>
                    <Stack mt={2} mb={2}>
                      <TextField
                        id="twoquestions"
                        label="Your Answer"
                        onChange={(e) => {
                          setSendData({ ...sendData, goals_for_ten_years: e?.target?.value });
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
                    Community/ಸಮುದಾಯ 
                    </Typography>
                    <Stack mt={2} mb={2}>
                      <TextField
                        id="twoquestions"
                        label="Your Answer"
                        onChange={(e) => {
                          setSendData({ ...sendData, community: e?.target?.value });
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
                    Usually, what do you feel when women come to you for advice or support?/ಸಾಮಾನ್ಯವಾಗಿ, ಮಹಿಳೆಯರು ಸಲಹೆ ಅಥವಾ ಬೆಂಬಲಕ್ಕಾಗಿ ನಿಮ್ಮ ಬಳಿಗೆ ಬಂದಾಗ ನಿಮಗೆ ಏನನಿಸುತ್ತದೆ? 

                    </Typography>
                    <Stack mt={2} mb={2}>
                      <TextField
                        id="twoquestions"
                        label="Your Answer"
                        onChange={(e) => {
                          setSendData({ ...sendData, support_feelings: e?.target?.value });
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
                    On a day when there is a scheduled community meeting, do you feel   
                    </Typography>
                    <Stack mt={2} mb={2}>
                      <TextField
                        id="twoquestions"
                        label="Your Answer"
                        onChange={(e) => {
                          setSendData({ ...sendData, meetings_day_feelings: e?.target?.value });
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
                    When someone makes you angry, how do you deal with the situation? (Multiple answers allowed)/ಯಾರಾದರೂ ನಿಮ್ಮನ್ನು ಕೋಪಗೊಳಿಸಿದಾಗ, ನೀವು ಪರಿಸ್ಥಿತಿಯನ್ನು ಹೇಗೆ ಎದುರಿಸುತ್ತೀರಿ? (ಬಹು ಉತ್ತರಗಳನ್ನು ಅನುಮತಿಸಲಾಗಿದೆ)
                    </Typography>
                    <Stack mt={2} mb={2}>
                      <TextField
                        id="twoquestions"
                        label="Your Answer"
                        onChange={(e) => {
                          setSendData({ ...sendData, deal_with_angry_situation: e?.target?.value });
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
                    When someone gives me instructions and asks, “do you understand,” I say “yes” even if I’m not entirely sure. (Yes/No)
  ಯಾರಾದರೂ ನನಗೆ ಸೂಚನೆಗಳನ್ನು ನೀಡಿದಾಗ ಮತ್ತು "ನಿಮಗೆ ಅರ್ಥವಾಗಿದೆಯೇ" ಎಂದು ಕೇಳಿದಾಗ ನಾನು ಸಂಪೂರ್ಣವಾಗಿ ಖಚಿತವಾಗಿಲ್ಲದಿದ್ದರೂ ನಾನು "ಹೌದು" ಎಂದು ಹೇಳುತ್ತೇನೆ. (ಹೌದು/ಇಲ್ಲ)
 </Typography>
                    <Stack mt={2} mb={2}>
                      <TextField
                        id="twoquestions"
                        label="Your Answer"
                        onChange={(e) => {
                          setSendData({ ...sendData, say_yes_when_unsure_of_instructions: e?.target?.value });
                        }}
                        variant="outlined"
                        color="common"
                      />
                    </Stack>
                  </CardContent>
                </Card>
                <Card style={{ marginTop: 10, borderRadius: 20 }}>
                  <CardContent>
                    <Stack mt={2}>
                      <Typography variant="subtitle2" style={{ color: '#ff7424' }}>
                      I become impatient with people who do not express their thoughts and opinions clearly. (Yes/No)/ ತಮ್ಮ ಆಲೋಚನೆಗಳು ಮತ್ತು ಅಭಿಪ್ರಾಯಗಳನ್ನು ಸ್ಪಷ್ಟವಾಗಿ ವ್ಯಕ್ತಪಡಿಸದ ಜನರ ಬಗ್ಗೆ ನಾನು ಅಸಹನೆ ಹೊಂದುತ್ತೇನೆ. (ಹೌದು/ಇಲ್ಲ) {iBecameImpatientError ? (
                          <FormHelperText style={{ color: 'red' }}>{helperText}</FormHelperText>
                        ) : null}{' '}
                      </Typography>
                      <RadioGroup
                        aria-labelledby="demo-radio-buttons-group-label"
                        name="radio-buttons-group"
                        value={iBecameImpatient}
                        onChange={impatientHandle}
                      >
                        <FormControlLabel value="Yes" control={<Radio style={{ color: '#595959' }} />} label="Yes" />
                        <FormControlLabel value="No" control={<Radio style={{ color: '#595959' }} />} label="No" />
                      </RadioGroup>
                    </Stack>
                  </CardContent>
                </Card>
                <Card style={{ marginTop: 10, borderRadius: 20 }}>
                  <CardContent>
                    <Stack mt={2}>
                      <Typography variant="subtitle2" style={{ color: '#ff7424' }}>
                      Did you listen to the paragraph? Yes/No / 
                      ನೀವು ಪ್ಯಾರಾಗ್ರಾಫ್ ಅನ್ನು ಕೇಳಿದ್ದೀರಾ? ಹೌದು ಅಲ್ಲ
                        {didYouListenParaError ? (
                          <FormHelperText style={{ color: 'red' }}>{helperText}</FormHelperText>
                        ) : null}{' '}
                      </Typography>
                      <RadioGroup
                        aria-labelledby="demo-radio-buttons-group-label"
                        name="radio-buttons-group"
                        value={didYouListenPara}
                        onChange={didYouListenParaHandle}
                      >
                        <FormControlLabel value="Yes" control={<Radio style={{ color: '#595959' }} />} label="Yes" />
                        <FormControlLabel value="No" control={<Radio style={{ color: '#595959' }} />} label="No" />
                      </RadioGroup>
                    </Stack>
                  </CardContent>
                </Card>
                <Card style={{ marginTop: 10, borderRadius: 20 }}>
                  <CardContent>
                    <Typography variant="subtitle2" style={{ color: '#ff7424' }}>
                    Can you summarize the main points of the paragraph? ( analyzing both facts and emotion)/  
                    ಪ್ಯಾರಾಗ್ರಾಫ್‌ನ ಮುಖ್ಯ ಅಂಶಗಳನ್ನು ನೀವು ಸಂಕ್ಷಿಪ್ತಗೊಳಿಸಬಹುದೇ? (ಸತ್ಯಗಳು ಮತ್ತು ಭಾವನೆಗಳೆರಡನ್ನೂ ವಿಶ್ಲೇಷಿಸುವುದು)
                    </Typography>
                    <Stack mt={2} mb={2}>
                      <TextField
                        id="twoquestions"
                        label="Your Answer"
                        onChange={(e) => {
                          setSendData({ ...sendData, summarize_main_points_paragraph: e?.target?.value });
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
                    Can you ask two questions that can help you understand the previous paragraph better?/ 
                    ಹಿಂದಿನ ಪ್ಯಾರಾಗ್ರಾಫ್ ಅನ್ನು ಚೆನ್ನಾಗಿ ಅರ್ಥಮಾಡಿಕೊಳ್ಳಲು ನಿಮಗೆ ಸಹಾಯ ಮಾಡುವ ಎರಡು ಪ್ರಶ್ನೆಗಳನ್ನು ನೀವು ಕೇಳಬಹುದೇ?
                    </Typography>
                    <Stack mt={2} mb={2}>
                      <TextField
                        id="twoquestions"
                        label="Your Answer"
                        onChange={(e) => {
                          setSendData({ ...sendData, ask_two_questions_help_you_understand: e?.target?.value });
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
                    There has been at least one instance when I took on a task even when other members in the group quit./  
                    ಗುಂಪಿನಲ್ಲಿರುವ ಇತರ ಸದಸ್ಯರು ತ್ಯಜಿಸಿದಾಗಲೂ ನಾನು ಕೆಲಸವನ್ನು ತೆಗೆದುಕೊಂಡಾಗ ಕನಿಷ್ಠ ಒಂದು ನಿದರ್ಶನವಿದೆ.
                    </Typography>
                    <Stack mt={2} mb={2}>
                      <TextField
                        id="twoquestions"
                        label="Your Answer"
                        onChange={(e) => {
                          setSendData({ ...sendData, persisted_when_others_quit: e?.target?.value });
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
                    Can you narrate that instance /
                    ಆ ನಿದರ್ಶನವನ್ನು ಹೇಳಬಲ್ಲಿರಾ
                    </Typography>
                    <Stack mt={2} mb={2}>
                      <TextField
                        id="twoquestions"
                        label="Your Answer"
                        onChange={(e) => {
                          setSendData({ ...sendData, narrate_instance: e?.target?.value });
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
                    Confidence/ವಿಶ್ವಾಸ
                    </Typography>
                    <Stack mt={2} mb={2}>
                      <TextField
                        id="twoquestions"
                        label="Your Answer"
                        onChange={(e) => {
                          setSendData({ ...sendData, confidence: e?.target?.value });
                        }}
                        variant="outlined"
                        color="common"
                      />
                    </Stack>
                  </CardContent>
                </Card>
               
                <Card style={{ marginTop: 10, borderRadius: 20 }}>
                  <CardContent>
                    <Stack mt={2}>
                      <Typography variant="subtitle2" style={{ color: '#ff7424' }}>
                      There has been at least one instance when I continued to work on a goal even when others discouraged me. (Yes/No) / 
                      ಇತರರು ನನ್ನನ್ನು ನಿರುತ್ಸಾಹಗೊಳಿಸಿದಾಗಲೂ ನಾನು ಗುರಿಯ ಮೇಲೆ ಕೆಲಸ ಮಾಡುವುದನ್ನು ಮುಂದುವರೆಸಿದಾಗ ಕನಿಷ್ಠ ಒಂದು ನಿದರ್ಶನವಿದೆ. ಹೌದು /ಇಲ್ಲ 
                        {oneInstanaceError ? (
                          <FormHelperText style={{ color: 'red' }}>{helperText}</FormHelperText>
                        ) : null}{' '}
                      </Typography>
                      <RadioGroup
                        aria-labelledby="demo-radio-buttons-group-label"
                        name="radio-buttons-group"
                        value={oneInstanace}
                        onChange={oneInstanaceHandle}
                      >
                        <FormControlLabel value="Yes" control={<Radio style={{ color: '#595959' }} />} label="Yes" />
                        <FormControlLabel value="No" control={<Radio style={{ color: '#595959' }} />} label="No" />
                      </RadioGroup>
                    </Stack>
                  </CardContent>
                </Card>
             
                <Card style={{ marginTop: 10, borderRadius: 20 }}>
                  <CardContent>
                    <Stack mt={2}>
                      <Typography variant="subtitle2" style={{ color: '#ff7424' }}>
                      When I get a task to complete, I am usually excited to find a solution/ nervous  
                      ನಾನು ಕೆಲಸವನ್ನು ಪೂರ್ಣಗೊಳಿಸಲು ಬಂದಾಗ, ನಾನು ಸಾಮಾನ್ಯವಾಗಿ ಪರಿಹಾರವನ್ನು ಹುಡುಕಲು ಉತ್ಸುಕನಾಗಿದ್ದೇನೆ / ಉದ್ವಿಗ್ನ
                        {whenIgetTaskError ? (
                          <FormHelperText style={{ color: 'red' }}>{helperText}</FormHelperText>
                        ) : null}{' '}
                      </Typography>
                      <RadioGroup
                        aria-labelledby="demo-radio-buttons-group-label"
                        name="radio-buttons-group"
                        value={whenIgetTask}
                        onChange={whenIgetTaskHandler}
                      >
                        <FormControlLabel value="Yes" control={<Radio style={{ color: '#595959' }} />} label="Yes" />
                        <FormControlLabel value="No" control={<Radio style={{ color: '#595959' }} />} label="No" />
                      </RadioGroup>
                    </Stack>
                  </CardContent>
                </Card>
                <Card style={{ marginTop: 10, borderRadius: 20 }}>
                  <CardContent>
                    <Typography variant="subtitle2" style={{ color: '#ff7424' }}>
                    How did you react when you were faced with a challenging situation / 
                    ನೀವು ಸವಾಲಿನ ಪರಿಸ್ಥಿತಿಯನ್ನು ಎದುರಿಸಿದಾಗ ನೀವು ಹೇಗೆ ಪ್ರತಿಕ್ರಿಯಿಸಿದ್ದೀರಿ
                    </Typography>
                    <Stack mt={2} mb={2}>
                      <TextField
                        id="twoquestions"
                        label="Your Answer"
                        onChange={(e) => {
                          setSendData({ ...sendData, challenge_reaction: e?.target?.value });
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
                    Conflict Management/ಸಂಘರ್ಷ ನಿರ್ವಹಣೆ
                    </Typography>
                    <Stack mt={2} mb={2}>
                      <TextField
                        id="twoquestions"
                        label="Your Answer"
                        onChange={(e) => {
                          setSendData({ ...sendData, conflict_management: e?.target?.value });
                        }}
                        variant="outlined"
                        color="common"
                      />
                    </Stack>
                  </CardContent>
                </Card>
                
                <br />
              </Grid>
              <Card style={{ marginTop: 10, borderRadius: 20 }}>
                  <CardContent>
                    <Typography variant="subtitle2" style={{ color: '#ff7424' }}>
                    How do you handle conflicts in group?/
  ಗುಂಪಿನಲ್ಲಿ ಸಂಘರ್ಷಗಳನ್ನು ಹೇಗೆ ನಿಭಾಯಿಸುತ್ತೀರಿ?

                    </Typography>
                    <Stack mt={2} mb={2}>
                      <TextField
                        id="twoquestions"
                        label="Your Answer"
                        onChange={(e) => {
                          setSendData({ ...sendData, conflict_handling: e?.target?.value });
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
                    Sense of sisterhood/ಸಹೋದರಿಯ ಭಾವ
                    </Typography>
                    <Stack mt={2} mb={2}>
                      <TextField
                        id="twoquestions"
                        label="Your Answer"
                        onChange={(e) => {
                          setSendData({ ...sendData, sense_of_sisterhood: e?.target?.value });
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
                    What according to you are the three qualities of a good Gelathi? Record verbatim/ 
                    ನಿಮ್ಮ ಪ್ರಕಾರ ಉತ್ತಮ ಗೆಳತಿಯ ಮೂರು ಗುಣಗಳು ಯಾವುವು? ಮೌಖಿಕವಾಗಿ ರೆಕಾರ್ಡ್ ಮಾಡಿ

                    </Typography>
                    <Stack mt={2} mb={2}>
                      <TextField
                        id="twoquestions"
                        label="Your Answer"
                        onChange={(e) => {
                          setSendData({ ...sendData, qualities_of_good_gelathi: e?.target?.value });
                        }}
                        variant="outlined"
                        color="common"
                      />
                    </Stack>
                  </CardContent>
                </Card>
                <Card style={{ marginTop: 10, borderRadius: 20 }}>
                  <CardContent>
                    <Stack mt={2}>
                      <Typography variant="subtitle2" style={{ color: '#ff7424' }}>
                      Do the members in your community share an emotional bond with each other? Yes/No/
                      ನಿಮ್ಮ ಸಮುದಾಯದ ಸದಸ್ಯರು ಪರಸ್ಪರ ಭಾವನಾತ್ಮಕ ಬಂಧವನ್ನು ಹಂಚಿಕೊಳ್ಳುತ್ತಾರೆಯೇ? ಹೌದು /ಇಲ್ಲ 
                        {emotionbondError ? (
                          <FormHelperText style={{ color: 'red' }}>{helperText}</FormHelperText>
                        ) : null}{' '}
                      </Typography>
                      <RadioGroup
                        aria-labelledby="demo-radio-buttons-group-label"
                        name="radio-buttons-group"
                        value={emotionbond}
                        onChange={emotionbondHandler}
                      >
                        <FormControlLabel value="Yes" control={<Radio style={{ color: '#595959' }} />} label="Yes" />
                        <FormControlLabel value="No" control={<Radio style={{ color: '#595959' }} />} label="No" />
                      </RadioGroup>
                    </Stack>
                  </CardContent>
                </Card>
                <Card style={{ marginTop: 10, borderRadius: 20 }}>
                  <CardContent>
                    <Stack mt={2}>
                      <Typography variant="subtitle2" style={{ color: '#ff7424' }}>
                      Do your group members discuss their personal issues when you get together? Yes/No/
                      ನಿಮ್ಮ ಗುಂಪಿನ ಸದಸ್ಯರು ನೀವು ಒಟ್ಟಿಗೆ ಸೇರಿದಾಗ  ತಮ್ಮ ವೈಯಕ್ತಿಕ ಸಮಸ್ಯೆಗಳನ್ನು ಚರ್ಚಿಸುತ್ತಾರೆಯೇ? ಹೌದು /ಇಲ್ಲ 
                        {duscussPersonalError ? (
                          <FormHelperText style={{ color: 'red' }}>{helperText}</FormHelperText>
                        ) : null}{' '}
                      </Typography>
                      <RadioGroup
                        aria-labelledby="demo-radio-buttons-group-label"
                        name="radio-buttons-group"
                        value={duscussPersonal}
                        onChange={duscussPersonalHandler}
                      >
                        <FormControlLabel value="Yes" control={<Radio style={{ color: '#595959' }} />} label="Yes" />
                        <FormControlLabel value="No" control={<Radio style={{ color: '#595959' }} />} label="No" />
                      </RadioGroup>
                    </Stack>
                  </CardContent>
                </Card>
                <Card style={{ marginTop: 10, borderRadius: 20 }}>
                  <CardContent>
                    <Typography variant="subtitle2" style={{ color: '#ff7424' }}>
                    When you feel sad/lonely/lost, what do you do? / 
                    ನೀವು ದುಃಖ/ಒಂಟಿತನ/ಕಳೆದುಹೋದಾಗ, ನೀವು ಏನು ಮಾಡುತ್ತೀರಿ?

                    </Typography>
                    <Stack mt={2} mb={2}>
                      <TextField
                        id="twoquestions"
                        label="Your Answer"
                        onChange={(e) => {
                          setSendData({ ...sendData, coping_mechanisms_when_sad: e?.target?.value });
                        }}
                        variant="outlined"
                        color="common"
                      />
                    </Stack>
                  </CardContent>
                </Card>
                
                <Card style={{ marginTop: 10, borderRadius: 20 }}>
                  <CardContent>
                    <Stack mt={2}>
                      <Typography variant="subtitle2" style={{ color: '#ff7424' }}>
                      Do you think you possess leadership skills /  
                      ನೀವು ನಾಯಕತ್ವದ ಕೌಶಲ್ಯಗಳನ್ನು ಹೊಂದಿದ್ದೀರಿ ಎಂದು ನೀವು ಭಾವಿಸುತ್ತೀರಾ? 
                        {leaderShipSkillError ? (
                          <FormHelperText style={{ color: 'red' }}>{helperText}</FormHelperText>
                        ) : null}{' '}
                      </Typography>
                      <RadioGroup
                        aria-labelledby="demo-radio-buttons-group-label"
                        name="radio-buttons-group"
                        value={leaderShipSkill}
                        onChange={leaderShipSkillHandler}
                      >
                        <FormControlLabel value="Yes" control={<Radio style={{ color: '#595959' }} />} label="Yes" />
                        <FormControlLabel value="No" control={<Radio style={{ color: '#595959' }} />} label="No" />
                      </RadioGroup>
                    </Stack>
                  </CardContent>
                </Card>
                <Card style={{ marginTop: 10, borderRadius: 20 }}>
                  <CardContent>
                    <Typography variant="subtitle2" style={{ color: '#ff7424' }}>
                    If yes to the above question, why do you think you possess leadership skills?/  
                      ಮೇಲಿನ ಪ್ರಶ್ನೆಗೆ ಹೌದಾದರೆ, ನೀವು ನಾಯಕತ್ವದ ಕೌಶಲ್ಯವನ್ನು ಏಕೆ ಹೊಂದಿದ್ದೀರಿ ಎಂದು ನೀವು ಭಾವಿಸುತ್ತೀರಿ?
                       

                    </Typography>
                    <Stack mt={2} mb={2}>
                      <TextField
                        id="twoquestions"
                        label="Your Answer"
                        onChange={(e) => {
                          setSendData({ ...sendData, leadership_skills_reason_yes: e?.target?.value });
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
                    If no, please record verbatim - why do you think you do not possess leadership skills?/  
                    ಇಲ್ಲದಿದ್ದರೆ, ದಯವಿಟ್ಟು ಮೌಖಿಕವಾಗಿ ರೆಕಾರ್ಡ್ ಮಾಡಿ - ನೀವು ನಾಯಕತ್ವ ಕೌಶಲ್ಯಗಳನ್ನು ಹೊಂದಿಲ್ಲ ಎಂದು ಏಕೆ ಭಾವಿಸುತ್ತೀರಿ?

                    </Typography>
                    <Stack mt={2} mb={2}>
                      <TextField
                        id="twoquestions"
                        label="Your Answer"
                        onChange={(e) => {
                          setSendData({ ...sendData, leadership_skills_reason_no: e?.target?.value });
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
                    Name two leadership skills you possess/ 
                    ನೀವು ಹೊಂದಿರುವ ಎರಡು ನಾಯಕತ್ವ ಕೌಶಲ್ಯಗಳನ್ನು ಹೆಸರಿಸಿ
                    </Typography>
                    <Stack mt={2} mb={2}>
                      <TextField
                        id="twoquestions"
                        label="Your Answer"
                        onChange={(e) => {
                          setSendData({ ...sendData, leadership_skills: e?.target?.value });
                        }}
                        variant="outlined"
                        color="common"
                      />
                    </Stack>
                  </CardContent>
                </Card>
                <Card style={{ marginTop: 10, borderRadius: 20 }}>
                  <CardContent>
                    <Stack mt={2}>
                      <Typography variant="subtitle2" style={{ color: '#ff7424' }}>
                      Do you think that your community members take you seriously? Yes/NO
                      ನಿಮ್ಮ ಸಮುದಾಯದ ಸದಸ್ಯರು ನಿಮ್ಮನ್ನು ಗಂಭೀರವಾಗಿ ಪರಿಗಣಿಸುತ್ತಾರೆ ಎಂದು ನೀವು ಭಾವಿಸುತ್ತೀರಾ? ಹೌದು /ಇಲ್ಲ 
                        {takeYouSeriouslyEroor ? (
                          <FormHelperText style={{ color: 'red' }}>{helperText}</FormHelperText>
                        ) : null}{' '}
                      </Typography>
                      <RadioGroup
                        aria-labelledby="demo-radio-buttons-group-label"
                        name="radio-buttons-group"
                        value={takeYouSeriously}
                        onChange={takeYouSeriouslyEroorHandler}
                      >
                        <FormControlLabel value="Yes" control={<Radio style={{ color: '#595959' }} />} label="Yes" />
                        <FormControlLabel value="No" control={<Radio style={{ color: '#595959' }} />} label="No" />
                      </RadioGroup>
                    </Stack>
                  </CardContent>
                </Card>
                <Card style={{ marginTop: 10, borderRadius: 20 }}>
                  <CardContent>
                    <Stack mt={2}>
                      <Typography variant="subtitle2" style={{ color: '#ff7424' }}>
                      Do you take feedback from your community members? Yes/No/ 
                      ನಿಮ್ಮ ಸಮುದಾಯದ ಸದಸ್ಯರಿಂದ ನೀವು ಪ್ರತಿಕ್ರಿಯೆಯನ್ನು ತೆಗೆದುಕೊಳ್ಳುತ್ತೀರಾ? ಹೌದು /ಇಲ್ಲ
                       {takeFeddBakcError ? (
                          <FormHelperText style={{ color: 'red' }}>{helperText}</FormHelperText>
                        ) : null}{' '}
                      </Typography>
                      <RadioGroup
                        aria-labelledby="demo-radio-buttons-group-label"
                        name="radio-buttons-group"
                        value={takeFeddBakc}
                        onChange={takeFeddBakcHandler}
                      >
                        <FormControlLabel value="Yes" control={<Radio style={{ color: '#595959' }} />} label="Yes" />
                        <FormControlLabel value="No" control={<Radio style={{ color: '#595959' }} />} label="No" />
                      </RadioGroup>
                    </Stack>
                  </CardContent>
                </Card>
                <Card style={{ marginTop: 10, borderRadius: 20 }}>
                  <CardContent>
                    <Stack mt={2}>
                      <Typography variant="subtitle2" style={{ color: '#ff7424' }}>
                      Can you tell me one feedback that your community members gave you? Yes/No/  
                      ನಿಮ್ಮ ಸಮುದಾಯದ ಸದಸ್ಯರು ನಿಮಗೆ ನೀಡಿದ ಒಂದು ಪ್ರತಿಕ್ರಿಯೆಯನ್ನು ನೀವು ನನಗೆ ಹೇಳಬಲ್ಲಿರಾ? ಹೌದು /ಇಲ್ಲ  
                      {canUTellMeError ? (
                          <FormHelperText style={{ color: 'red' }}>{helperText}</FormHelperText>
                        ) : null}{' '}
                      </Typography>
                      <RadioGroup
                        aria-labelledby="demo-radio-buttons-group-label"
                        name="radio-buttons-group"
                        value={canUTellMe}
                        onChange={canUTellMeHandker}
                      >
                        <FormControlLabel value="Yes" control={<Radio style={{ color: '#595959' }} />} label="Yes" />
                        <FormControlLabel value="No" control={<Radio style={{ color: '#595959' }} />} label="No" />
                      </RadioGroup>
                    </Stack>
                  </CardContent>
                </Card>
                <Card style={{ marginTop: 10, borderRadius: 20 }}>
                  <CardContent>
                    <Typography variant="subtitle2" style={{ color: '#ff7424' }}>
                    Have you prepared a list of goals that you want to achieve as a Gelathi?/ 
                      ನೀವು ಗೆಳತಿಯಾಗಿ ಸಾಧಿಸಲು ಬಯಸುವ ಗುರಿಗಳ ಪಟ್ಟಿಯನ್ನು ಸಿದ್ಧಪಡಿಸಿದ್ದೀರಾ?
                      
                    </Typography>
                    <Stack mt={2} mb={2}>
                      <TextField
                        id="twoquestions"
                        label="Your Answer"
                        onChange={(e) => {
                          setSendData({ ...sendData, goals_as_gelathi: e?.target?.value });
                        }}
                        variant="outlined"
                        color="common"
                      />
                    </Stack>
                  </CardContent>
                </Card>
                <Card style={{ marginTop: 10, borderRadius: 20 }}>
                  <CardContent>
                    <Stack mt={2}>
                      <Typography variant="subtitle2" style={{ color: '#ff7424' }}>
                      If given an opportunity, would you be willing to take part in the local elections and become an elected representative?/ 
                      ಅವಕಾಶ ಸಿಕ್ಕರೆ ಸ್ಥಳೀಯ ಚುನಾವಣೆಯಲ್ಲಿ ಭಾಗವಹಿಸಿ ಚುನಾಯಿತ ಪ್ರತಿನಿಧಿಯಾಗಲು ಸಿದ್ಧರಿದ್ದೀರಾ? 
                        {giveAnOppurtutnityError ? (
                          <FormHelperText style={{ color: 'red' }}>{helperText}</FormHelperText>
                        ) : null}{' '}
                      </Typography>
                      <RadioGroup
                        aria-labelledby="demo-radio-buttons-group-label"
                        name="radio-buttons-group"
                        value={giveAnOppurtutnity}
                        onChange={giveAnOppurtutnityHandler}
                      >
                        <FormControlLabel value="Yes" control={<Radio style={{ color: '#595959' }} />} label="Yes" />
                        <FormControlLabel value="No" control={<Radio style={{ color: '#595959' }} />} label="No" />
                      </RadioGroup>
                    </Stack>
                  </CardContent>
                </Card>
            </DialogContentText>
          </DialogContent>}
        </form>
      </Dialog>
    </div>
  );
}
