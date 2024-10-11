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

export default function GelathiCircleFormView({
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
  
  const [sendData , setSendData] = useState(
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
const  handleClickOpen = () => {
    setOpen(true);
    setLoader(true);
    setShowForm(true);
  };
  const handleClose = () => {
    setOpen(false);
    setIsFormPresentLocally(false)
    setShowForm(false);
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
 

 

  const [loader, setLoader] = useState(true);
console.log(id ,"datadatadata")
  const getSpoorthiFormTOView = async (district) => {
    var data = JSON.stringify({
        "partcipantId":parseInt(id.id) 
    });
    var config = {
      method: 'post',
      url: baseURL + 'getSpoorthiForm',
      headers: {
        'Content-Type': 'application/json',
         'Authorization': `${apikey}`
      },
      data: data
    };
    axios(config)
      .then(function (response) {
        console.log(response.data ,"response.dataresponse.data")
        const participantData = response.data;
        setSendData(participantData.data)
      })
      .catch(function (error) {
        // console.log(error);
      });
  }


  useEffect(() => {
    // After 3 seconds, set showCard to true to render the Card component
    const delay = 3000; // 3 seconds in milliseconds
    const timeoutId = setTimeout(() => {
      setLoader(false);
    }, delay);
  })

  useEffect(()=>{
    // getDistrict()
    getSpoorthiFormTOView()
  },[])

 
console.log(sendData ,"sendData")

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
            // gelathicirclesenddata();
          }}
        >
          <Toolbar sx={{ bgcolor: '#ff7424', color: 'white' }}>
            <IconButton style={{ float: 'right', color: 'white' }} onClick={handleClose}>
            {(isOnline())? <Iconify icon="material-symbols:arrow-back-rounded" />:<div style={{borderRadius:5}}> 🡠</div>}
            </IconButton>
            <Typography sx={{ ml: 2, flex: 1, color: 'inherit' }} variant="h6" component="div">
              View Spoorthi Baseline Questionnaire 
            </Typography>
            
          </Toolbar>
          {(loader)? 
          <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '70vh' }}>
                <CircularProgress sx={{color:'#ff7424'}}/>
           </Box>:
           <DialogContent dividers={scroll === 'paper'} sx={{ background: '#f9fafb' }}>
            <DialogContentText id="scroll-dialog-description" tabIndex={-1}>
              <Grid style={{ margin: 10 }}>
                {/* old version     */}
              { 
              (sendData?.spoorthi_session_number != "")?
              <>
              <Card mt={1} style={{ marginTop: 10, borderRadius: 20 }}>
                  <CardContent>
                    <Typography variant="subtitle2" style={{ color: '#ff7424' }}>
                      Surveyor's email address *
                    </Typography>
                    <Stack mt={2} mb={2}>
                      <TextField
                        id="Email"
                        disabled
                        label="Your Answer"
                      value={sendData.email_address}
                        variant="outlined"
                        color="common"
                      />
                    </Stack>
                  </CardContent>
                </Card>
                   <Card mt={1} style={{ marginTop: 10, borderRadius: 20 }}>
                  <CardContent>
                    <Typography variant="subtitle2" style={{ color: '#ff7424' }}>
                      Name of the Gelathi Facilitator/  /ಗೆಳತಿ ಆಯೋಜಕನ ಹೆಸರು*
                    </Typography>
                    <Stack mt={2} mb={2}>
                    <TextField
                        id="twoquestions"
                        label="Your Answer"
                        disabled
                       value={sendData.gelathiId}
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
                        Spoorthi Session Number/ಸ್ಪೂರ್ತಿ ಸೆಷನ್ಸಂಖ್ಯೆ * (Tick the Spoorthi in which you are collecting
                        the data)
                    
                      </Typography>
                      <Stack mt={2} mb={2}>
                      <TextField
                        id="twoquestions"
                        label="Your Answer"
                        disabled
                       value={sendData.spoorthi_session_number}
                        variant="outlined"
                        color="common"
                      />
                    </Stack>
                    </Stack>
                  </CardContent>
                </Card>
                 <Card style={{ marginTop: 10, borderRadius: 20 }}>
                  <CardContent>
                    <Typography variant="subtitle2" style={{ color: '#ff7424' }}>
                      Can you list down three of your skills/ ನಿಮ್ಮ ಮೂರು ಕೌಶಲ್ಯಗಳನ್ನು ನೀವು ಪಟ್ಟಿ ಮಾಡಬಹುದು?
                    </Typography>
                    <Stack mt={2} mb={2}>
                      <TextField
                        id="skillslist"
                        label="Your Answer"
                        disabled
                       value={sendData.list_down_your_skills}
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
                        I have used my skills to overcome my challenges/ನನ್ನ ಸವಾಲುಗಳನ್ನು ಜಯಿಸಲು ನಾನು ನನ್ನ ಕೌಶಲ್ಯವನ್ನು
                        ಬಳಸಿದ್ದೇನೆ
                      
                      </Typography>
                      <Stack mt={2} mb={2}>
                      <TextField
                        id="twoquestions"
                        label="Your Answer"
                        disabled
                       value={sendData.skills_to_overcome_my_challenges}
                        variant="outlined"
                        color="common"
                      />
                    </Stack>
                    </Stack>
                  </CardContent>
                </Card>
   <Card style={{ marginTop: 10, borderRadius: 20 }}>
                  <CardContent>
                    <Typography variant="subtitle2" style={{ color: '#ff7424' }}>
                      State one instance of when you used your skills and resources to combat your challenge/ನಿಮ್ಮ
                      ಸವಾಲನ್ನು ಎದುರಿಸಲು ನಿಮ್ಮ ಕೌಶಲ್ಯ ಮತ್ತು ಸಂಪನ್ಮೂಲಗಳನ್ನು ನೀವು ಬಳಸಿದಾಗ ಒಂದು ಉದಾಹರಣೆಯನ್ನು ತಿಳಿಸಿ
                    </Typography>
                    <Stack mt={2} mb={2}>
                      <TextField
                        id="skillsresources"
                        label="Your Answer"
                        disabled
                      value={sendData.used_skills_resources_combat_challenge}
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
                      
                      </Typography>
                      <RadioGroup
                        aria-labelledby="demo-radio-buttons-group-label"
                        name="radio-buttons-group"
                        value={sendData.listen_paragraph}
                        disabled
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
                      Please summarize the main points of the paragraph?/ಮೇಲಿನ ಪರಿಚ್ಚೇ ದದ ಮುಖ್ಯ ಅಂಶಗಳನ್ನು
                      ನೀವುಸಂಕ್ಷಿಪ್ತವಾಗಿ ತಿಳಿಸಿ. (ಸತ್ಯ ತೆ ಮತ್ತು ಭಾವನೆಗಳೆರಡನ್ನೂ ವಿಶ್ಲೇ ಷಿಸುವುದು)
                    </Typography>
                    <Stack mt={2} mb={2}>
                      <TextField
                        id="parapoints"
                        label="Your Answer"
                        disabled
                       value={sendData.summarize_main_points_paragraph}
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
                        disabled
                      value={sendData.ask_two_questions_help_you_understand}
                        variant="outlined"
                        color="common"
                      />
                    </Stack>
                  </CardContent>
                </Card>
                  <Card style={{ marginTop: 10, borderRadius: 20 }}>
                  <CardContent>
                    <Typography variant="subtitle2" style={{ color: '#ff7424' }}>
                      Please name three infrastructure of your village?/ಗ್ರಾಮದಲ್ಲಿ ಇರುವ ಮೂರುಮೂಲಸೌಕರ್ಯಗಳನ್ನು ಹೆಸರಿಸಿ.
                    </Typography>
                    <Stack mt={2} mb={2}>
                      <TextField
                        id="twoquestions"
                        label="Your Answer"
                        disabled
                       value={sendData.three_infrastructure_of_your_village}
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
                        I Know the need of my community/ನನ್ನ ಸಮುದಾಯದ ಅವಶ್ಯಕತೆ ನನಗೆ ತಿಳಿದಿದೆ
                      
                      </Typography>
                      <Stack mt={2} mb={2}>
                      <TextField
                        id="twoquestions"
                        label="Your Answer"
                        disabled
                       value={sendData.know_the_need_of_my_community}
                        variant="outlined"
                        color="common"
                      />
                    </Stack>
                    </Stack>
                  </CardContent>
                </Card>
                 <Card style={{ marginTop: 10, borderRadius: 20 }}>
                  <CardContent>
                    <Stack mt={2}>
                      <Typography variant="subtitle2" style={{ color: '#ff7424' }}>
                        I have come together with other community members to make a change in our community
                        infrastructure/ನಮ್ಮ ಸಮುದಾಯದ ಮೂಲಸೌಕರ್ಯದಲ್ಲಿ ಬದಲಾವಣೆ ಮಾಡಲು ನಾನು ಇತರ ಸಮುದಾಯದ ಸದಸ್ಯರೊಂದಿಗೆ
                        ಸೇರಿಕೊಂಡಿದ್ದೇನೆ
                    
                      </Typography>
                      <Stack mt={2} mb={2}>
                      <TextField
                        id="twoquestions"
                        label="Your Answer"
                        disabled
                       value={sendData.together_community_members_community_infrastructure}
                        variant="outlined"
                        color="common"
                      />
                    </Stack>
                    </Stack>
                  </CardContent>
                </Card>
                 <Card style={{ marginTop: 10, borderRadius: 20 }}>
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
                        disabled
                      value={sendData.with_other_community_infrastructure}
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
                        When you want to bring someone together and want to get an action done/ನೀವು ಯಾರನ್ನಾದರೂ ಒಟ್ಟಿಗೆ
                        ಸೇರಿಸಲು ಬಯಸಿದಾಗ ಮತ್ತು ಕ್ರಿಯೆಯನ್ನು ಮಾಡಲು ಬಯಸಿದಾಗ
                      
                      </Typography>
                      <Stack mt={2} mb={2}>
                      <TextField
                        id="twoquestions"
                        label="Your Answer"
                        disabled
                       value={sendData.bring_someone_together}
                        variant="outlined"
                        color="common"
                      />
                    </Stack>
                    </Stack>
                  </CardContent>
                </Card>
                 <Card style={{ marginTop: 10, borderRadius: 20 }}>
                  <CardContent>
                    <Stack mt={2}>
                      <Typography variant="subtitle2" style={{ color: '#ff7424' }}>
                        At the end of a conflict it matters to me that the other person's interest/need has been met as
                        well as mine / ಘರ್ಷಣೆಯ ಕೊನೆಯಲ್ಲಿ ಇನ್ನೊಬ್ಬರ ಆಸಕ್ತಿ/ಅವಶ್ಯಕತೆ ನನ್ನ ಜೊತೆಗೆ ಪೂರೈಸಲ್ಪಟ್ಟಿದೆ ಎಂಬುದು
                        ನನಗೆ ಮುಖ್ಯವಾಗಿದೆ
                     
                      </Typography>
                      <Stack mt={2} mb={2}>
                      <TextField
                        id="twoquestions"
                        label="Your Answer"
                        disabled
                       value={sendData.conflict_matters_interest_mine}
                        variant="outlined"
                        color="common"
                      />
                    </Stack>
                    </Stack>
                  </CardContent>
                </Card>
                 <Card style={{ marginTop: 10, borderRadius: 20 }}>
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
                        disabled
                      value={sendData.there_puja_at_my_house}
                        variant="outlined"
                        color="common"
                      />
                    </Stack>
                  </CardContent>
                </Card>

                </>:
                <>



                     {/* new version  */}
                          {/* new version  */}
                               {/* new version  */}
                <Card mt={1} style={{ marginTop: 10, borderRadius: 20 }}>
                  <CardContent>
                    <Typography variant="subtitle2" style={{ color: '#ff7424' }}>
                    Profile of the women/ಮಹಿಳೆಯರ ವಿವರ *
                    </Typography>
                    <Stack mt={2} mb={2}>
                      <TextField
                        id="Email"
                        disabled
                        label="Your Answer"
                       
                        value={sendData?.email_address}
                        variant="outlined"
                        color="common"
                      />
                    </Stack>
                  </CardContent>
                </Card>
             

                <Card mt={1} style={{ marginTop: 10, borderRadius: 20 }}>
                  <CardContent>
                    <Typography variant="subtitle2" style={{ color: '#ff7424' }}>
                    Respondent’s name/ಪ್ರತಿಕ್ರಿಯಿಸಿದವರ ಹೆಸರು*
                    </Typography>
                    <Stack mt={2} mb={2}>
                      <TextField
                        id="Email"
                        disabled
                        label="Your Answer"
                     
                        value={sendData?.gelathiId}
                        variant="outlined"
                        color="common"
                      />
                    </Stack>
                  </CardContent>
                </Card>
                 

<Card mt={1} style={{ marginTop: 10, borderRadius: 20 }}>
  <CardContent>
    <Typography variant="subtitle2" style={{ color: '#ff7424' }}>
      District/Taluk-ಜಿಲ್ಲೆ/ತಾಲೂಕು
    </Typography>
    <Stack mt={2} mb={2}>
                      <TextField
                        id="Email"
                        disabled
                        label="Your Answer"
                        value={sendData?.district}
                        variant="outlined"
                        color="common"
                      />
                    </Stack>
  </CardContent>
</Card>
               
            
<Card mt={1} style={{ marginTop: 10, borderRadius: 20 }}>
  <CardContent>
    <Typography variant="subtitle2" style={{ color: '#ff7424' }}>
    Taluk/ತಾಲೂಕು
    </Typography>
    <Stack mt={2} mb={2}>
                      <TextField
                        id="Email"
                        disabled
                        label="Your Answer"
                        value={sendData?.taluk}
                        variant="outlined"
                        color="common"
                      />
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
                        disabled
                       
                        value={sendData?.gram_panchayat}
                        variant="outlined"
                        color="common"
                      />
                    </Stack>
                  </CardContent>
                </Card>
              
                  <Card style={{ marginTop: 10, borderRadius: 20 }}>
                  <CardContent>
                    <Typography variant="subtitle2" style={{ color: '#ff7424' }}>
                    Village name/ಗ್ರಾಮದ ಹೆಸರು
                    </Typography>
                    <Stack mt={2} mb={2}>
                      <TextField
                        id="skillsresources"
                        label="Your Answer"
                        disabled
                        value={sendData?.village_name}
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
                      
                      </Typography>
                   
                    </Stack>
                    <Stack mt={2} mb={2}>
                      <TextField
                        id="Email"
                        disabled
                        label="Your Answer"
                      
                        value={sendData?.listen_paragraph}
                        variant="outlined"
                        color="common"
                      />
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
                        disabled
                        value={sendData?.total_adults_no_of_member_household}
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
                        value={sendData?.total_children_no_of_member_household}
                        variant="outlined"
                        color="common"
                        disabled
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
                      <TextField
                        id="Email"
                        disabled
                        label="Your Answer"
                       
                        value={sendData?.house}
                        variant="outlined"
                        color="common"
                      />
                    </Stack>
  </CardContent>
</Card>
                <Card mt={1} style={{ marginTop: 10, borderRadius: 20 }}>
                  <CardContent>
                    <Typography variant="subtitle2" style={{ color: '#ff7424' }}>
                    Ration card/ಪಡಿತರ ಚೀಟಿ: 

                    </Typography>
                    <Stack mt={2} mb={2}>
                      <TextField
                        id="Email"
                        disabled
                        label="Your Answer"
                    
                        value={sendData?.ration_card}
                        variant="outlined"
                        color="common"
                      />
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
                        value={sendData?.summarize_main_points_paragraph}
                        variant="outlined"
                        color="common"
                        disabled
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
                        value={sendData?.ask_two_questions_help_you_understand}
                        variant="outlined"
                        color="common"
                        disabled
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
                      <TextField
                        id="Email"
                        disabled
                        label="Your Answer"
                      
                        value={sendData?.cast_category}
                        variant="outlined"
                        color="common"
                      />
                    </Stack>
  </CardContent>
</Card>
              
              <Card mt={1} style={{ marginTop: 10, borderRadius: 20 }}>
  <CardContent>
    <Typography variant="subtitle2" style={{ color: '#ff7424' }}>
      Religion/ಧರ್ಮ:
    </Typography>
    <Stack mt={2} mb={2}>
                      <TextField
                        id="Email"
                        disabled
                        label="Your Answer"
                      
                        value={sendData?.religion}
                        variant="outlined"
                        color="common"
                      />
                    </Stack>
  </CardContent>
</Card>
               
                   <Card style={{ marginTop: 10, borderRadius: 20 }}>
                  <CardContent>
                    <Typography variant="subtitle2" style={{ color: '#ff7424' }}>
                    Mother Tongue/ಮಾತೃ ಭಾಷೆ
                    </Typography>
                    <Stack mt={2} mb={2}>
                      <TextField
                        id="twoquestions"
                        label="Your Answer"
                        value={sendData?.mother_tongue}
                        variant="outlined"
                        color="common"
                        disabled
                      />
                    </Stack>
                  </CardContent>
                </Card>
               
                
                <Card style={{ marginTop: 10, borderRadius: 20 }}>
                  <CardContent>
                    <Typography variant="subtitle2" style={{ color: '#ff7424' }}>
                    Age/ವಯಸ್ಸು
                    </Typography>
                    <Stack mt={2} mb={2}>
                      <TextField
                        id="twoquestions"
                        label="Your Answer"
                        value={sendData?.age}
                        variant="outlined"
                        
                        disabled
                        color="common"
                      />
                    </Stack>
                  </CardContent>
                </Card>
               
               
<Card mt={1} style={{ marginTop: 10, borderRadius: 20 }}>
  <CardContent>
    <Typography variant="subtitle2" style={{ color: '#ff7424' }}>
    Marital Status/ವೈವಾಹಿಕ ಸ್ಥಿತಿ
    </Typography>
    <Stack mt={2} mb={2}>
                      <TextField
                        id="Email"
                        disabled
                        label="Your Answer"
                       
                        value={sendData?.material_status}
                        variant="outlined"
                        color="common"
                      />
                    </Stack>
  </CardContent>
</Card>
              
              <Card mt={1} style={{ marginTop: 10, borderRadius: 20 }}>
  <CardContent>
    <Typography variant="subtitle2" style={{ color: '#ff7424' }}>
      Education/ಶಿಕ್ಷಣ:
    </Typography>
    <Stack mt={2} mb={2}>
                      <TextField
                        id="Email"
                        disabled
                        label="Your Answer"
                     
                        value={sendData?.education}
                        variant="outlined"
                        color="common"
                      />
                    </Stack>
  </CardContent>
</Card>
               
                <Card style={{ marginTop: 10, borderRadius: 20 }}>
                  <CardContent>
                    <Typography variant="subtitle2" style={{ color: '#ff7424' }}>
                    Phone Number/ದೂರವಾಣಿ ಸಂಖ್ಯೆ
                    </Typography>
                    <Stack mt={2} mb={2}>
                      <TextField
                        id="twoquestions"
                        label="Your Answer"
                        disabled
                        value={sendData?.phone_number}
                        variant="outlined"
                        color="common"
                      />
                    </Stack>
                  </CardContent>
                </Card>
               
                 <Card mt={1} style={{ marginTop: 10, borderRadius: 20 }}>
                  <CardContent>
                    <Typography variant="subtitle2" style={{ color: '#ff7424' }}>
                    Current Economic Activity - Primary Occupation of the Household/ 
                    ಪ್ರಸ್ತುತ ಆರ್ಥಿಕ ಚಟುವಟಿಕೆ - ಕುಟುಂಬದ  ಪ್ರಾಥಮಿಕ ಉದ್ಯೋಗ

                    </Typography>
                    <Stack mt={2} mb={2}>
                      <TextField
                        id="Email"
                        disabled
                        label="Your Answer"
                     
                        value={sendData?.current_economic_activity_primary_occupation}
                        variant="outlined"
                        color="common"
                      />
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
                      <TextField
                        id="Email"
                        disabled
                        label="Your Answer"
                        value={sendData?.secondary_occupation_household}
                        variant="outlined"
                        color="common"
                      />
                    </Stack>
                  </CardContent>
                </Card>

                <Card mt={1} style={{ marginTop: 10, borderRadius: 20 }}>
                  <CardContent>
                    <Typography variant="subtitle2" style={{ color: '#ff7424' }}>
                    Women's Occupation/ಮಹಿಳಾ ಉದ್ಯೋಗ

                    </Typography>
                    <Stack mt={2} mb={2}>
                      <TextField
                        id="Email"
                        disabled
                        label="Your Answer"
                        value={sendData?.womens_occupation}
                        variant="outlined"
                        color="common"
                      />
                    </Stack>
                  </CardContent>
                </Card>
                <Card style={{ marginTop: 10, borderRadius: 20 }}>
                  <CardContent>
                    <Typography variant="subtitle2" style={{ color: '#ff7424' }}>
                    Monthly household expenditure (in Rs)   
                    ಮಾಸಿಕ ಮನೆಯ ಖರ್ಚು (ರೂ.ಗಳಲ್ಲಿ)
                    </Typography>
                    <Stack mt={2} mb={2}>
                      <TextField
                        id="twoquestions"
                        label="Your Answer"
                        type="number"
                        disabled
                        value={sendData?.monthly_house_expend}
                        variant="outlined"
                        color="common"
                      />
                    </Stack>
                  </CardContent>
                </Card>
                <Card style={{ marginTop: 10, borderRadius: 20 }}>
                  <CardContent>
                    <Typography variant="subtitle2" style={{ color: '#ff7424' }}>
                    Monthly household income(in Rs.)   
                    ಮಾಸಿಕ ಮನೆಯ ಆದಾಯ(ರೂ.ಗಳಲ್ಲಿ)
                    </Typography>
                    <Stack mt={2} mb={2}>
                      <TextField
                        id="twoquestions"
                        label="Your Answer"
                          type="number"
                          disabled
                      value={sendData?.monthly_house_income}
                        variant="outlined"
                        color="common"
                      />
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
                        value={sendData?.skills_motivation}
                        variant="outlined"
                        color="common"
                        disabled
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
                        value={sendData?.womens_occupation}
                        variant="outlined"
                        color="common"
                        disabled
                      />
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
                        value={sendData?.goals_as_leader_next_year}
                        variant="outlined"
                        color="common"
                        disabled
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
                         value={sendData?.goals_for_ten_years}
                        variant="outlined"
                        color="common"
                        disabled
                      />
                    </Stack>
                  </CardContent>
                </Card>
                <Card style={{ marginTop: 10, borderRadius: 20 }}>
                  <CardContent>
                    <Typography variant="subtitle2" style={{ color: '#ff7424',textAlign: 'center' }}>
                    Community/ಸಮುದಾಯ 
                    </Typography>
                   
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
                        value={sendData?.support_feelings}
                        variant="outlined"
                        color="common"
                        disabled
                      />
                    </Stack>
                  </CardContent>
                </Card>
                <Card style={{ marginTop: 10, borderRadius: 20 }}>
                  <CardContent>
                    <Typography variant="subtitle2" style={{ color: '#ff7424' }}>
                    On a day when there is a scheduled community meeting, what do you feel?
                    ನಿಗದಿತ ಸಮುದಾಯ ಸಭೆ ಇರುವ ದಿನದಂದು, ನಿಮಗೆ ಅನಿಸುತ್ತದೆಯೇ  
                    </Typography>
                    <Stack mt={2} mb={2}>
                      <TextField
                        id="twoquestions"
                        label="Your Answer"
                        value={sendData?.meetings_day_feelings}
                        variant="outlined"
                        color="common"
                        disabled
                      />
                    </Stack>
                  </CardContent>
                </Card>

              
                <Card style={{ marginTop: 10, borderRadius: 20 }}>
                  <CardContent>
                    <Typography variant="subtitle2" style={{ color: '#ff7424' }}>
                    When someone makes you angry, how do you deal with the situation? (Multiple answers allowed)/ಯಾರಾದರೂ ನಿಮ್ಮನ್ನು ಕೋಪಗೊಳಿಸಿದಾಗ, ನೀವು ಪರಿಸ್ಥಿತಿಯನ್ನು ಹೇಗೆ ಎದುರಿಸುತ್ತೀರಿ? (ಬಹು ಉತ್ತರಗಳನ್ನು ಅನುಮತಿಸಲಾಗಿದೆ)
                    </Typography>
                   

                    <Stack mt={2}>
  <Typography variant="subtitle2" style={{ color: '#ff7424' }}>
    I calm myself first and don't react immediately? (Yes/No)
    ನಾನು ಮೊದಲು ನನ್ನನ್ನು ಶಾಂತಗೊಳಿಸುತ್ತೇನೆ ಮತ್ತು ತಕ್ಷಣ ಪ್ರತಿಕ್ರಿಯಿಸುವುದಿಲ್ಲವೇ? (ಹೌದು /ಇಲ್ಲ)
  </Typography>
  <RadioGroup
    aria-labelledby="demo-radio-buttons-group-label"
    name="radio-buttons-group"
    value={sendData?.calm_before_reaction_d} // Bind the value from state
    // Inline state update
    disabled
  >
    <FormControlLabel value="Yes" control={<Radio style={{ color: '#595959' }} />} label="Yes" />
    <FormControlLabel value="No" control={<Radio style={{ color: '#595959' }} />} label="No" />
  </RadioGroup>
</Stack>
<Stack mt={2}>
  <Typography variant="subtitle2" style={{ color: '#ff7424' }}>
  I shout at them  (Yes/No)
  ನಾನು ಅವರನ್ನು ಕೂಗುತ್ತೇನೆ (ಹೌದು /ಇಲ್ಲ)</Typography>
  <RadioGroup
    aria-labelledby="demo-radio-buttons-group-label"
    name="radio-buttons-group"
    value={sendData?.shout_at_others_d} // Bind the value from state
   disabled// Inline state update
  >
    <FormControlLabel value="Yes" control={<Radio style={{ color: '#595959' }} />} label="Yes" />
    <FormControlLabel value="No" control={<Radio style={{ color: '#595959' }} />} label="No" />
  </RadioGroup>
</Stack>

<Stack mt={2}>
  <Typography variant="subtitle2" style={{ color: '#ff7424' }}>
  I walk out without listening to them  (Yes/No)
  ನಾನು ಅವರ ಮಾತನ್ನು ಕೇಳದೆ ಹೊರನಡೆಯುತ್ತೇನೆ (ಹೌದು /ಇಲ್ಲ)</Typography>
  <RadioGroup
    aria-labelledby="demo-radio-buttons-group-label"
    name="radio-buttons-group"
    value={sendData?.walk_out_without_listening_d} // Bind the value from state
    disabled// Inline state update
  >
    <FormControlLabel value="Yes" control={<Radio style={{ color: '#595959' }} />} label="Yes" />
    <FormControlLabel value="No" control={<Radio style={{ color: '#595959' }} />} label="No" />
  </RadioGroup>
</Stack>
<Stack mt={2}>
  <Typography variant="subtitle2" style={{ color: '#ff7424' }}>

  I ask them to leave immediately (Yes/No)
ನಾನು ಅವರನ್ನು ತಕ್ಷಣ ಹೊರಡಲು ಕೇಳುತ್ತೇನೆ (ಹೌದು /ಇಲ್ಲ)
</Typography>
  <RadioGroup
    aria-labelledby="demo-radio-buttons-group-label"
    name="radio-buttons-group"
    value={sendData?.ask_to_leave_immediately_d} // Bind the value from state
   disabled // Inline state update
  >
    <FormControlLabel value="Yes" control={<Radio style={{ color: '#595959' }} />} label="Yes" />
    <FormControlLabel value="No" control={<Radio style={{ color: '#595959' }} />} label="No" />
  </RadioGroup>
</Stack>
<Stack mt={2}>
  <Typography variant="subtitle2" style={{ color: '#ff7424' }}>
  I try to listen to them patiently and make an attempt to understand their perspective (Yes/No)
ನಾನು ಅವರನ್ನು ತಾಳ್ಮೆಯಿಂದ ಕೇಳಲು ಪ್ರಯತ್ನಿಸುತ್ತೇನೆ ಮತ್ತು ಅವರ ದೃಷ್ಟಿಕೋನವನ್ನು ಅರ್ಥಮಾಡಿಕೊಳ್ಳಲು ಪ್ರಯತ್ನಿಸುತ್ತೇನೆ (ಹೌದು /ಇಲ್ಲ)
</Typography>
  <RadioGroup
    aria-labelledby="demo-radio-buttons-group-label"
    name="radio-buttons-group"
    value={sendData?.patiently_listen_understand_d} // Bind the value from state
   disabled// Inline state update
  >
    <FormControlLabel value="Yes" control={<Radio style={{ color: '#595959' }} />} label="Yes" />
    <FormControlLabel value="No" control={<Radio style={{ color: '#595959' }} />} label="No" />
  </RadioGroup>
</Stack>
<Stack mt={2}>
  <Typography variant="subtitle2" style={{ color: '#ff7424' }}>

  I articulate my disagreement with them calmly after sometime (Yes/No)
ಸ್ವಲ್ಪ ಸಮಯದ ನಂತರ ನಾನು ಅವರೊಂದಿಗೆ ನನ್ನ ಭಿನ್ನಾಭಿಪ್ರಾಯವನ್ನು ಶಾಂತವಾಗಿ ವ್ಯಕ್ತಪಡಿಸುತ್ತೇನೆ (ಹೌದು /ಇಲ್ಲ)
</Typography>
  <RadioGroup
    aria-labelledby="demo-radio-buttons-group-label"
    name="radio-buttons-group"
    value={sendData?.calm_disagreement_articulation_d} // Bind the value from state
   disabled// Inline state update
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
                    When someone gives me instructions and asks, “do you understand,” I say “yes” even if I’m not entirely sure. (Yes/No)
  ಯಾರಾದರೂ ನನಗೆ ಸೂಚನೆಗಳನ್ನು ನೀಡಿದಾಗ ಮತ್ತು "ನಿಮಗೆ ಅರ್ಥವಾಗಿದೆಯೇ" ಎಂದು ಕೇಳಿದಾಗ ನಾನು ಸಂಪೂರ್ಣವಾಗಿ ಖಚಿತವಾಗಿಲ್ಲದಿದ್ದರೂ ನಾನು "ಹೌದು" ಎಂದು ಹೇಳುತ್ತೇನೆ. (ಹೌದು/ಇಲ್ಲ)
 </Typography>
                    <Stack mt={2} mb={2}>
                      <TextField
                        id="twoquestions"
                        label="Your Answer"
                        value={sendData?.say_yes_when_unsure_of_instructions}
                        variant="outlined"
                        color="common"
                        disabled
                      />
                    </Stack>
                  </CardContent>
                </Card>
                <Card style={{ marginTop: 10, borderRadius: 20 }}>
                  <CardContent>
                    <Stack mt={2}>
                      <Typography variant="subtitle2" style={{ color: '#ff7424' }}>
                      I become impatient with people who do not express their thoughts and opinions clearly. (Yes/No)/ ತಮ್ಮ ಆಲೋಚನೆಗಳು ಮತ್ತು ಅಭಿಪ್ರಾಯಗಳನ್ನು ಸ್ಪಷ್ಟವಾಗಿ ವ್ಯಕ್ತಪಡಿಸದ ಜನರ ಬಗ್ಗೆ ನಾನು ಅಸಹನೆ ಹೊಂದುತ್ತೇನೆ. (ಹೌದು/ಇಲ್ಲ) 
                      
                   
                      </Typography>
                      <Stack mt={2} mb={2}>
                      <TextField
                        id="twoquestions"
                        label="Your Answer"
                        disabled
                          value={sendData?.impatient_with_unclear_comm}
                        variant="outlined"
                        color="common"
                      />
                    </Stack>
                    </Stack>
                    
                  </CardContent>
                </Card>
                <Card style={{ marginTop: 10, borderRadius: 20 }}>
                  <CardContent>
                    <Stack mt={2}>
                      <Typography variant="subtitle2" style={{ color: '#ff7424' }}>
                      Did you listen to the paragraph? Yes/No / 
                      ನೀವು ಪ್ಯಾರಾಗ್ರಾಫ್ ಅನ್ನು ಕೇಳಿದ್ದೀರಾ? ಹೌದು ಅಲ್ಲ
                      
                      </Typography>
                     
                    </Stack>
                    <Stack mt={2} mb={2}>
                      <TextField
                        id="twoquestions"
                        label="Your Answer"
                        disabled
                          value={sendData?.listen_paragraph}
                        variant="outlined"
                        color="common"
                      />
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
                        value={sendData?.summarize_main_points_paragraph}
                        variant="outlined"
                        color="common"
                        disabled
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
                        value={sendData?.ask_two_questions_help_you_understand}
                        variant="outlined"
                        color="common"
                        disabled
                      />
                    </Stack>
                  </CardContent>
                </Card>
                
                  <Card style={{ marginTop: 10, borderRadius: 20 }}>
                  <CardContent>
                    <Typography variant="subtitle2" style={{ color: '#ff7424', textAlign: 'center'  }}>
                    Confidence/ವಿಶ್ವಾಸ
                    </Typography>
                
                  </CardContent>
                </Card>
               
                <Card style={{ marginTop: 10, borderRadius: 20 }}>
                  <CardContent>
                    <Stack mt={2}>
                      <Typography variant="subtitle2" style={{ color: '#ff7424' }}>
                      There has been at least one instance when I continued to work on a goal even when others discouraged me. (Yes/No) / 
                      ಇತರರು ನನ್ನನ್ನು ನಿರುತ್ಸಾಹಗೊಳಿಸಿದಾಗಲೂ ನಾನು ಗುರಿಯ ಮೇಲೆ ಕೆಲಸ ಮಾಡುವುದನ್ನು ಮುಂದುವರೆಸಿದಾಗ ಕನಿಷ್ಠ ಒಂದು ನಿದರ್ಶನವಿದೆ. ಹೌದು /ಇಲ್ಲ 
                        
                      </Typography>
                     
                    </Stack> <Stack mt={2} mb={2}>
                      <TextField
                        id="twoquestions"
                        label="Your Answer"
                          value={sendData?.goal_persistence_instance}
                        variant="outlined"
                        color="common"
                        disabled
                      />
                    </Stack>
                  </CardContent>
                </Card>
             
                <Card style={{ marginTop: 10, borderRadius: 20 }}>
                  <CardContent>
                    <Stack mt={2}>
                      <Typography variant="subtitle2" style={{ color: '#ff7424' }}>
                      When I get a task to complete, I am usually excited to find a solution/ nervous  
                      ನಾನು ಕೆಲಸವನ್ನು ಪೂರ್ಣಗೊಳಿಸಲು ಬಂದಾಗ, ನಾನು ಸಾಮಾನ್ಯವಾಗಿ ಪರಿಹಾರವನ್ನು ಹುಡುಕಲು ಉತ್ಸುಕನಾಗಿದ್ದೇನೆ / ಉದ್ವಿಗ್ನ
                     
                      </Typography>
                    
                    </Stack>
                    <Stack mt={2} mb={2}>
                      <TextField
                        id="twoquestions"
                        label="Your Answer"
                          value={sendData?.task_response}
                        variant="outlined"
                        color="common"
                        disabled
                      />
                    </Stack>
                  </CardContent>
                </Card>
                {(sendData?.goal_persistence_instance === "Yes")?
                
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
                   disabled
                   value={
                    sendData?.narrate_instance2
                   }
                      variant="outlined"
                      color="common"
                    />
                  </Stack>
                </CardContent>
              </Card>
              :
              null}
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
                        value={sendData?.persisted_when_others_quit}
                        variant="outlined"
                        color="common"
                        disabled
                      />
                    </Stack>
                  </CardContent>
                </Card>
                {(sendData?.persisted_when_others_quit === "Yes")?
                
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
                     disabled
                     value={sendData?.narrate_instance}
                      variant="outlined"
                      color="common"
                    />
                  </Stack>
                </CardContent>
              </Card>
              :
              null}
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
                        value={sendData?.challenge_reaction}
                        variant="outlined"
                        color="common"
                        disabled
                      />
                    </Stack>
                  </CardContent>
                </Card>
                <Card style={{ marginTop: 10, borderRadius: 20 }}>
                  <CardContent>
                    <Typography variant="subtitle2" style={{ color: '#ff7424', textAlign: 'center' }}>
                    Conflict Management/ಸಂಘರ್ಷ ನಿರ್ವಹಣೆ
                    </Typography>
                
                  </CardContent>
                </Card>
                
               
             
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
                      
                          value={sendData?.conflict_handling}
                          disabled
                        variant="outlined"
                        color="common"
                      />
                    </Stack>
                  </CardContent>
                </Card>
                <Card style={{ marginTop: 10, borderRadius: 20 }}>
                  <CardContent>
                    <Typography variant="subtitle2" style={{ color: '#ff7424',textAlign: 'center' }}>
                    Sense of sisterhood/ಸಹೋದರಿಯ ಭಾವ
                    </Typography>
                 
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
                        value={sendData?.qualities_of_good_gelathi}
                        variant="outlined"
                        color="common"
                        disabled
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
                      
                      </Typography>
                      
                    </Stack>
                    <Stack mt={2} mb={2}>
                      <TextField
                        id="twoquestions"
                        label="Your Answer"
                          value={sendData?.members_emotional_bond}
                        variant="outlined"
                        disabled
                        color="common"
                      />
                    </Stack>
                  </CardContent>
                </Card>
                <Card style={{ marginTop: 10, borderRadius: 20 }}>
                  <CardContent>
                    <Stack mt={2}>
                      <Typography variant="subtitle2" style={{ color: '#ff7424' }}>
                      Do your group members discuss their personal issues when you get together? Yes/No/
                      ನಿಮ್ಮ ಗುಂಪಿನ ಸದಸ್ಯರು ನೀವು ಒಟ್ಟಿಗೆ ಸೇರಿದಾಗ  ತಮ್ಮ ವೈಯಕ್ತಿಕ ಸಮಸ್ಯೆಗಳನ್ನು ಚರ್ಚಿಸುತ್ತಾರೆಯೇ? ಹೌದು /ಇಲ್ಲ 
                     
                      </Typography>
                    
                    </Stack>
                    <Stack mt={2} mb={2}>
                      <TextField
                        id="twoquestions"
                        label="Your Answer"
                          value={sendData?.say_yes_when_unsure_of_instructions}
                        variant="outlined"
                        color="common"
                        disabled
                      />
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
                        value={sendData?.coping_mechanisms_when_sad}
                        variant="outlined"
                        color="common"
                        disabled
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
                      
                      </Typography>
                     
                    </Stack>
                    <Stack mt={2} mb={2}>
                      <TextField
                        id="twoquestions"
                        label="Your Answer"
                          value={sendData?.id}
                        variant="outlined"
                        color="common"
                        disabled
                      />
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
                        value={sendData?.coping_mechanisms_when_sad}
                        variant="outlined"
                        color="common"
                        disabled
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
                        value={sendData?.leadership_skills_reason_no}
                        variant="outlined"
                        color="common"
                        disabled
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
                        value={sendData?.leadership_skills}
                        variant="outlined"
                        disabled
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
                      
                      </Typography>
                     
                    </Stack>
                    <Stack mt={2} mb={2}>
                      <TextField
                        id="twoquestions"
                        label="Your Answer"
                          value={sendData?.community_members_takes_seriously}
                        variant="outlined"
                        color="common"
                        disabled
                      />
                    </Stack>
                  </CardContent>
                </Card>
                <Card style={{ marginTop: 10, borderRadius: 20 }}>
                  <CardContent>
                    <Stack mt={2}>
                      <Typography variant="subtitle2" style={{ color: '#ff7424' }}>
                      Do you take feedback from your community members? Yes/No/ 
                      ನಿಮ್ಮ ಸಮುದಾಯದ ಸದಸ್ಯರಿಂದ ನೀವು ಪ್ರತಿಕ್ರಿಯೆಯನ್ನು ತೆಗೆದುಕೊಳ್ಳುತ್ತೀರಾ? ಹೌದು /ಇಲ್ಲ
                     
                      </Typography>
                    
                    </Stack>
                    <Stack mt={2} mb={2}>
                      <TextField
                        id="twoquestions"
                        label="Your Answer"
                          value={sendData?.takes_feedback_from_community_members}
                        variant="outlined"
                        color="common"
                        disabled
                      />
                    </Stack>
                  </CardContent>
                </Card>
                <Card style={{ marginTop: 10, borderRadius: 20 }}>
                  <CardContent>
                    <Stack mt={2}>
                      <Typography variant="subtitle2" style={{ color: '#ff7424' }}>
                      Can you tell me one feedback that your community members gave you? Yes/No/  
                      ನಿಮ್ಮ ಸಮುದಾಯದ ಸದಸ್ಯರು ನಿಮಗೆ ನೀಡಿದ ಒಂದು ಪ್ರತಿಕ್ರಿಯೆಯನ್ನು ನೀವು ನನಗೆ ಹೇಳಬಲ್ಲಿರಾ? ಹೌದು /ಇಲ್ಲ  
                    
                      </Typography>
                     
                    </Stack>
                    <Stack mt={2} mb={2}>
                      <TextField
                        id="twoquestions"
                        label="Your Answer"
                        disabled
                          value={sendData?.feedback_from_community_members}
                        variant="outlined"
                        color="common"
                      />
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
                      disabled
                        id="twoquestions"
                        label="Your Answer"
                        value={sendData?.goals_as_gelathi}
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
                     
                      </Typography>
                    
                    </Stack>
                    <Stack mt={2} mb={2}>
                      <TextField
                        id="twoquestions"
                        label="Your Answer"
                        disabled
                          value={sendData?.willing_to_take_part_local_elections}
                        variant="outlined"
                        color="common"
                      />
                    </Stack>
                  </CardContent>
                </Card>
                
                </>}
                </Grid>
            </DialogContentText>
          </DialogContent>}
        </form>
      </Dialog>
    </div>
  );
}
