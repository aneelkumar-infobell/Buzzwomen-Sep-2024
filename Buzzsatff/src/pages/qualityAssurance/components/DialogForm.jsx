import * as React from 'react';
import { useState, useEffect } from 'react';
import {
    Button,
    Grid,
    Stack,
    TextField,
    Select,
    Radio,
    InputLabel,
    MenuItem,
    Checkbox,
    FormGroup,
    FormControlLabel,
    Card,
    Box,
    FormControl,
    CardContent,Icon,RadioGroup, FormHelperText, Autocomplete, Popper
  } from '@mui/material';
  import Swal from 'sweetalert2'
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
import axios from 'axios';
import moment from 'moment';
import { baseURL} from 'src/utils/api';
import { DateTimePicker } from '@mui/x-date-pickers/DateTimePicker';
import dayjs from 'dayjs';
import "../../../assets/css/custom.css"
import { setISODay } from 'date-fns/esm';
import { useAuth } from 'src/AuthContext';
const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});
  
export default function DialogForm({ shown, setShown, batch,reloadfunction }) {
  const { apikey } = useAuth();
    const [openFilter, setOpenFilter] = useState(false);
    const [clcikData, setClickData] = useState()
    const handleOpenFilter = () => {
      setOpenFilter(true);
    };
  
    const handleCloseFilter = () => {
      setOpenFilter(false);
    };
    var checkData = {
      the_gf_comptetly_carried_out_following_funtions:[],
      the_gf_caried_followig_fuctions_bfore_traning_or_meting_started:[],
      check_which_ones_the_gf_did_not_do:[],
      any_futher_training_and_understding_reqired_by_gf_traing_module:[],
      check_which_ones_the_gelathi_did_not_do:[],
      check_which_ones_the_gelathi_did_not_do_1:[],
      check_which_ones_the_gelathi_did_not_do_2:[],
      check_which_ones_the_trainer_did_not_do:[],
      check_which_ones_the_trainer_did_not_do_1:[],
      check_which_ones_the_trainer_did_not_do_2:[],
      check_which_ones_the_trainer_did_not_do_3:[],
      check_which_ones_the_trainer_did_not_do_4:[],
      during_the_debrief_the_trainer_did:[],
      during_the_debriefs_for_role_plays_the_trainer_did_not_ask:[],
      during_the_debrief_did_the_trainer_did_not_do_the_following:[],
      days_modules:[],
      during_the_debrief_did_the_gelathi:[],
      during_the_debriefs_for_role_plays_the_gelathi_did_not_ask:[],
      during_the_debrief_did_the_gelathi_not_ask:[],
      the_gelathi_did_not_ask_1:[],
      the_gf_competently_covered_folowing_things_in_training_delivered:[],
      check_which_instructions_the_trainer_did_not_do:[],
      during_the_debrief_did_the_trainer_not_ask:[],
      the_trainer_did_not_ask:[],
      what_did_the_trainer_not_do:[],
      during_the_debrief_did_the_trainer_not_ask_1:[],
      check_which_ones_the_trainer_did_not_do_5:[],
      check_which_ones_the_trainer_did_not_do_6:[],
      during_the_debrief_did_the_trainer_not_ask_2:[],
      check_which_instructions_the_gelathi_did_not_do:[],
      
      
  };
  
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
  const filterOptions = (options, { inputValue }) => {
    const values = options.filter(option =>
      {
        return option.first_name.toLowerCase().includes(inputValue.toLowerCase());
        
    }
    );
    return values;
  };
    var role = JSON.parse(sessionStorage.getItem('userDetails'))?.role
    var userid = JSON.parse(sessionStorage.getItem('userDetails'))?.id
    const [open, setOpen] = React.useState(false);
    React.useEffect(() => {
      setOpen(shown)
    }, [shown])
  
    const handleClickOpen = () => {
      sendForm = {...formData};
      setSendForm(sendForm);
checked = {...checkData}
setProgramAssessment('')
setLeave2('')
setParticipant('')
setEngage('')
setDay1Day2('')
setChecked(checked)
reloadfunction()
      setShown(true)
      setOpen(true);
    };
  
    const handleClose = () => {
      setShown(false)
      setOpen(false);
    };
    const handleClickOpendilog = () => {
        setOpen(true);
      };
      
  const [sendData,setSendData]=useState('');
  const [age, setAge] = React.useState('');
  const [states, setStates] = useState([]);
  const [trainers,setTrainers]=useState([]);
  const [assessmentType,setassessmentType]=useState('');
  const [intract,setIntract]=useState('');
  const [module,setModule]=useState('');
  const [module1,setModule1]=useState('');
  const [module2,setModule2]=useState('');
  const [attend,setAttend]=useState('');
  const [rate1,setRate1]=useState('');
  const [rate2,setRate2]=useState('');
  const [rate3,setRate3]=useState('');
  const [rate4,setRate4]=useState('');
  const [rate5,setRate5]=useState('');
  const [rate6,setRate6]=useState('');
  const [rate7,setRate7]=useState('');
  const [rate8,setRate8]=useState('');
  const [rate9,setRate9]=useState('');
  const [rate10,setRate10]=useState('');
  const [leave,setLeave]=useState('');
  const [leave1,setLeave1]=useState('');
  const [leave2,setLeave2]=useState('');
  const [leave3,setLeave3]=useState('');
  const [leave4,setLeave4]=useState('');
  const [engage,setEngage]=useState('');
  const [participant,setParticipant]=useState('');
  const [level1,setLevel1]=useState('');
  const [level2,setLevel2]=useState('');
  const [level3,setLevel3]=useState('');
  const [level4,setLevel4]=useState('');
  const [level5,setLevel5]=useState('');
  const [day1Day2,setDay1Day2]=useState('');
  var [Id,setID]=useState();
  const [programAssessment,setProgramAssessment]=useState('')
  const [district, setDistrict] = useState([])
  const [state,setState]=useState([])
  const [poa, setPoa] = useState([])
  const [taluk, setTaluk] = useState([])
  const [gfName,setGFName]=useState([])
  const today = dayjs();
  const [data, setData] = useState({
    country: 1,
    state_id: state,
    district_id: '',
    talaq_id: ''
  })
  
  const handleChange = (event) => {
    setAge(event.target.value);
  };
  
 
  useEffect(() => {
    getGFname()
    Trainerlist()
    getState()
    
  }, []
  )
  const handleprogramassessment=(event)=>{
    setProgramAssessment(event.target.value)
    getPoa(event.target.value)
}
  const handleassessmentType=(event)=>{
    setassessmentType(event.target.value)
    
}
  const handleIntract=(event)=>{
    setIntract(event.target.value)
    
}
  const handleModule=(event)=>{
    setModule(event.target.value)
    
}
  const handleModule1=(event)=>{
    setModule1(event.target.value)
    
}
  const handleModule2=(event)=>{
    setModule2(event.target.value)
    
}
  const handleAttend=(event)=>{
    setAttend(event.target.value)
    
}
  const handleRate1=(event)=>{
    setRate1(event.target.value)
    
}
  const handleRate2=(event)=>{
    setRate2(event.target.value)
    
}
  const handleRate3=(event)=>{
    setRate3(event.target.value)
    
}
  const handleRate4=(event)=>{
    setRate4(event.target.value)
    
}
  const handleRate5=(event)=>{
    setRate5(event.target.value)
    
}
  const handleRate6=(event)=>{
    setRate6(event.target.value)
    
}
  const handleRate7=(event)=>{
    setRate7(event.target.value)
    
}
  const handleRate8=(event)=>{
    setRate8(event.target.value)
    
}
  const handleRate9=(event)=>{
    setRate9(event.target.value)
    
}
  const handleRate10=(event)=>{
    setRate10(event.target.value)
    
}
  const handleLeave=(event)=>{
    setLeave(event.target.value)
    
}
  const handleLeave1=(event)=>{
    setLeave1(event.target.value)
    
}
  const handleLeave2=(event)=>{
    setLeave2(event.target.value)
    
}
  const handleLeave3=(event)=>{
    setLeave3(event.target.value)
    
}
  const handleLeave4=(event)=>{
    setLeave4(event.target.value)
    
}
  const handleEngage=(event)=>{
    setEngage(event.target.value)
    
}
  const handleParticipant=(event)=>{
    setParticipant(event.target.value)
    
}
  const handlelevel1=(event)=>{
    setLevel1(event.target.value)
    
}
  const handlelevel2=(event)=>{
    setLevel2(event.target.value)
    
}
  const handlelevel3=(event)=>{
    setLevel3(event.target.value)
    
}
  const handlelevel4=(event)=>{
    setLevel4(event.target.value)
    
}
  const handlelevel5=(event)=>{
    setLevel5(event.target.value)
    
}
  const handleDay1daay2=(event)=>{
    setDay1Day2(event.target.value)
    
}
 
  const getPoa = (type) => {
    var data = JSON.stringify({
     "type":  type==3 ? '' : type,
     "session_type":'',
    });
    var config = {
      method: 'post',
      url: baseURL + 'getPoa',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `${apikey}`
      },
      data: data
    };
    axios(config)
      .then(function (response) {
        setPoa(response.data)
      })
      .catch(function (error) {
        // console.log(error);
      });
  }
  const getState = () => {
 
    var config = {
      method: 'post',
      url: baseURL + 'allState',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `${apikey}`
      },
     
    };
    axios(config)
      .then(function (response) {
        setState(response.data)
      })
      .catch(function (error) {
        // console.log(error);
      });
  }
  useEffect(()=>{
    if(sendForm?.state?.id){
      getDistrict(sendForm?.state?.id)
    }
    console.log("working")
  },[sendForm?.state])

  const getDistrict = (id) => {
   var data = {
      country: 1,
      state_id:id,
      district_id: '',
      talaq_id: ''
    }
    var config = {
      method: 'post',
      url: baseURL + 'allDist',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `${apikey}`
      },
      data: data
    };
    axios(config)
      .then(function (response) {
        setDistrict(response.data)
      })
      .catch(function (error) {
        // console.log(error);
      });
  }
  const getGFname = async (id) => {
    
    var data = JSON.stringify({
      //"role_id":6,
     });
     var config = {
       method: 'post',
       url: baseURL+'getGelathiList',
       headers: {
         'Content-Type': 'application/json',
          'Authorization': `${apikey}`
       },
       data: data
     };
    axios(config)
      .then(function (response) {
        setGFName(response.data.list
        )
      })
      .catch(function (error) {
        // console.log(error);
      });
  }
 
  const getTaluk = async (id) => {
    
    var data = JSON.stringify({
      "dist_id":Id,
    });
    var config = {
      method: 'post',
      url: baseURL + 'listTaluk',
      headers: {
        'Content-Type': 'application/json',
         'Authorization': `${apikey}`
      },
      data: data
    };
    axios(config)
      .then(function (response) {
        setTaluk(response.data)
      })
      .catch(function (error) {
        // console.log(error);
      });
  }
 
  const Trainerlist = async (id) => {
    
    var data = JSON.stringify({
      //"role_id":"5"
    });
    var config = {
      method: 'post',
      url: baseURL+'getTrainersList',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `${apikey}`
      },
      data: data
    };
    axios(config)
      .then(function (response) {
        setTrainers(response?.data?.list)
      })
      .catch(function (error) {
        // console.log(error);
      });
  }
  const validationData = {
    1:{
      "Day 1":[],
      "Day 1":[]
      },
    2:[],
    3:[]
  }
 
  var formData =     {
    emp_id:"",
     district:'',
     state:'',
     role_id:"",
     email_address: "",
     name_of_the_assessor: "",
     entry_date: dayjs(new Date()),
     program_assessment: "",
     today_poa: "",
     name_of_the_district: "",
     name_of_the_taluk: "",
     name_of_the_village_and_the_venue_of_meeting_or_training: "",
     day1_or_day2:"",
     name_of_the_trainer_being_evaluated:"",
     check_which_ones_the_trainer_did_not_do: "",
     how_many_women_attended_the_training_session: "",
     check_which_ones_the_trainer_did_not_do_1:"",
     were_the_women_interactive: "",
     did_any_women_leave_tring_session_dring_or_after_1st_module: "",
     if_so_how_many: "",
     did_this_module_take_20_minutes_as_allotted: "",
     did_any_new_women_attend_the_training_session_during_module:"",
     if_so_how_many_1: "",
     during_the_debrief_did_the_trainer_did_not_do_the_following:"",
     check_which_ones_the_trainer_did_not_do_2: "",
     during_the_debrief_the_trainer_did: "",
     did_any_women_leve_training_session_during_or_after_1st_module_1: "",
     if_so_how_many_2: "",
     did_this_module_take_20_minutes_as_allotted_1: "",
     did_any_new_women_attend_training_session_during_this_module_1: "",
     if_so_how_many_3: "",
     check_which_ones_the_trainer_did_not_do_3:"",
     during_the_debriefs_for_role_plays_the_trainer_did_not_ask: "",
     did_the_trainer_leave_women_to_read_role_play_card_themselves: "",
     did_the_groups_engage_and_interact_among_themselves_well: "",
     were_the_participants_responsive_during_the_debriefing: "",
     did_any_women_leave_tring_session_dring_or_after_1st_module_2: "",
     if_so_how_many_4: "",
     did_this_module_take_30_minutes_as_allotted: "",
     how_many_women_remained_by_the_end_of_this_training_session: "",
     how_many_are_likely_to_come_back: "",
     did_any_new_women_attend_training_session_during_this_module_2: "",
     if_so_how_many_5: "",
     did_this_module_take_30_minutes_as_allotted_1: "",
     check_which_ones_the_trainer_did_not_do_4: "",
     was_the_recap_done: "",
     did_the_recap_take_15_minutes_as_allotted: "",
     name_of_the_gf: "",
     no_of_participants_at_the_start_of_the_session: "",
     assessment_of: "",
     the_gf_comptetly_carried_out_following_funtions: "",
     the_gf_caried_followig_fuctions_bfore_traning_or_meting_started:"",
     how_many_stories_of_success_or_change_emerged_from_the_recap: "",
     ment_name_of_gelathis_success_stories_and_story_couple_of_lines:"",
     check_which_ones_the_gf_did_not_do: "",
     number_of_enrolled_gelathis_in_the_circle: "",
     no_of_attended_gelathis: "",
     level_of_participation_1: "",
     level_of_participation_2: "",
     level_of_participation_3: "",
     level_of_participation_4: "",
     level_of_participation_5: "",
     the_gf_competently_covered_folowing_things_in_training_delivered: "",
     rate_the_gf_1: "",
     rate_the_gf_2: "",
     rate_the_gf_3: "",
     rate_the_gf_4:"",
     rate_the_gf_5: "",
     rate_the_gf_6:"",
     rate_the_gf_7: "",
     rate_the_gf_8:"",
     rate_the_gf_9: "",
     rate_the_gf_10:"",
     what_worked_in_the_training: "",
     what_can_be_better_next_time: "",
     any_futher_training_and_understding_reqired_by_gf_traing_module: "",
     did_you_find_anything_traiing_or_gf_that_neds_to_worked_priority: "",
     details_of_success_stories_to_be_collected_from_gelathis_by_gf: "",
     deadline_to_collect_the_stories: dayjs(new Date()),
     end_time_of_the_training:"",
     no_of_participants_at_end_of_the_session: "",
     any_other_comments_about_the_gelathi_facilitator: "",
     name_of_the_gelathi_being_evaluated: "",
     name_of_the_gelathi_being_evaluated_1:'',
     days_modules: "",
     check_which_ones_the_gelathi_did_not_do: "",
     how_many_women_attended_the_training_session_1:"",
     how_many_women_attended_the_training_session_2: "",
     how_many_women_attended_the_training_session_3:'',
     how_many_women_attended_the_training_session_4:'',
     check_which_ones_the_gelathi_did_not_do_1: "",
     was_the_recap_done_1: "",
     did_the_debrief_done_by_gelathi: "",
     during_the_debriefs_for_role_plays_the_gelathi_did_not_ask: "",
     repeat_the_activity_with_the_second_volunteer: "",
     during_the_debrief_did_the_gelathi_not_ask:"",
     the_gelathi_did_not_ask_1:"",
     check_which_ones_the_gelathi_did_not_do_2:"",
     check_which_ones_the_gelathi_did_not_do_3:"",
     check_which_ones_the_gelathi_did_not_do_4:"",
     during_the_debrief_did_the_gelathi:"",
     did_any_wmen_leave_the_trning_sesion_during_or_aftr_tis_modle_2:"",
     check_which_instructions_the_trainer_did_not_do:'',
     during_the_debrief_did_the_trainer_not_ask:"",
     were_the_participants_responsive_during_the_debriefing_1:'',
     the_trainer_did_not_ask:'',
     what_did_the_trainer_not_do:"",
     during_the_debrief_did_the_trainer_not_ask_1:'',
     were_the_participants_responsive_during_the_debriefing_2:"",
     did_this_module_take_30_minutes_as_allotted_2:'',
     check_which_ones_the_trainer_did_not_do_5:'',
     check_which_ones_the_trainer_did_not_do_6:'',
     during_the_debrief_did_the_trainer_not_ask_2:'',
     were_the_participants_responsive_during_the_debriefing_3:'',
     did_any_wmen_leave_the_trning_sesion_during_or_aftr_tis_modle_3:'',
     check_which_instructions_the_gelathi_did_not_do:'',
     did_this_module_take_30_minutes_as_allotted_3:"",
   }
const [apiData, setApiData] = useState({})
  var [sendForm, setSendForm]  = useState ({...formData})
  var [checked, setChecked]  = useState ({...checkData})
  const setFormDistrictName = (value)=>{
    let {id,name}=value
    setSendForm({ ...sendForm, name_of_the_district:name,district:value})
    Id = id;
    setID(id)
    
    getTaluk();
  }
  const [helperText, setHelperText] = React.useState('');
  const [programAssessmentError,setprogramAssessmentError]=useState(false)
  const [day1_or_day2Error,setday1_or_day2Error]=useState(false)
  const [check_which_ones_the_trainer_did_not_doError,setcheck_which_ones_the_trainer_did_not_doError]=useState(false)
  const [name_of_the_trainer_being_evaluatedError,setname_of_the_trainer_being_evaluatedError]=useState(false)
  const [how_many_women_attended_the_training_sessionError,sethow_many_women_attended_the_training_sessionError]=useState(false)
  const [check_which_ones_the_trainer_did_not_do_1Error,setcheck_which_ones_the_trainer_did_not_do_1Error]=useState(false)
  const [intractError,setintractError]=useState(false)
  const [did_any_women_leave_tring_session_dring_or_after_1st_moduleError,setdid_any_women_leave_tring_session_dring_or_after_1st_moduleError]=useState(false)
  const [moduleError,setmoduleError]=useState(false)
  const [did_any_new_women_attend_the_training_session_during_moduleError,setdid_any_new_women_attend_the_training_session_during_moduleError]=useState(false)
  const [check_which_ones_the_trainer_did_not_do_2Error,setcheck_which_ones_the_trainer_did_not_do_2Error]=useState(false)
  const [during_the_debrief_the_trainer_didError,setduring_the_debrief_the_trainer_didError]=useState(false)
  const [did_any_women_leve_training_session_during_or_after_1st_module_1Error,setdid_any_women_leve_training_session_during_or_after_1st_module_1Error]=useState(false)
  const [module1Error,setmodule1Error]=useState(false)
  const [attendError,setattendError]=useState(false)
  const [check_which_ones_the_trainer_did_not_do_3Error,setcheck_which_ones_the_trainer_did_not_do_3Error]=useState(false)
  const [during_the_debriefs_for_role_plays_the_trainer_did_not_askError,setduring_the_debriefs_for_role_plays_the_trainer_did_not_askError]=useState(false)
  const [leave2Error,setleave2Error]=useState(false)
  const [engageError,setengageError]=useState(false)
  const [participantError,setparticipantError]=useState(false)
  const [did_any_wmen_leave_the_trning_sesion_during_or_aftr_tis_modle_1Error,setdid_any_wmen_leave_the_trning_sesion_during_or_aftr_tis_modle_1Error]=useState(false)
  const [did_this_module_take_30_minutes_as_allottedError,setdid_this_module_take_30_minutes_as_allottedError]=useState(false)
  const [did_any_new_women_attend_training_session_during_this_module_2Error,setdid_any_new_women_attend_training_session_during_this_module_2Error]=useState(false)
  const [check_which_ones_the_trainer_did_not_do_4Error,setcheck_which_ones_the_trainer_did_not_do_4Error]=useState(false)
  const [did_this_module_take_30_minutes_as_allotted_1Error,setdid_this_module_take_30_minutes_as_allotted_1Error]=useState(false)
  const [check_which_ones_the_trainer_did_not_do_5Error,setcheck_which_ones_the_trainer_did_not_do_5Error]=useState(false)
  const [was_the_recap_doneError,setwas_the_recap_doneError]=useState(false)
  const [did_the_recap_take_15_minutes_as_allottedError,setdid_the_recap_take_15_minutes_as_allottedError]=useState(false)
  const [during_the_debrief_did_the_trainer_did_not_do_the_followingError,setduring_the_debrief_did_the_trainer_did_not_do_the_followingError]=useState(false)
  const [check_which_instructions_the_trainer_did_not_doError,secheck_which_instructions_the_trainer_did_not_doError]=useState(false)
  const [repeat_the_activity_with_the_second_volunteerError,setrepeat_the_activity_with_the_second_volunteerError]=useState(false)
  const [were_the_participants_responsive_during_the_debriefing_1Error,setwere_the_participants_responsive_during_the_debriefing_1Error]=useState(false)
  const [the_trainer_did_not_askError,setthe_trainer_did_not_askError]=useState(false)
  const [what_did_the_trainer_not_doError,setwhat_did_the_trainer_not_doError]=useState(false)
  const [during_the_debrief_did_the_trainer_not_ask_1Error,setduring_the_debrief_did_the_trainer_not_ask_1Error]=useState(false)
  const [were_the_participants_responsive_during_the_debriefing_2Error,setwere_the_participants_responsive_during_the_debriefing_2Error]=useState(false)
  const [did_any_wmen_leave_the_trning_sesion_during_or_aftr_tis_modle_2Error,setdid_any_wmen_leave_the_trning_sesion_during_or_aftr_tis_modle_2Error]=useState(false)
  const [did_this_module_take_30_minutes_as_allotted_3Error,setdid_this_module_take_30_minutes_as_allotted_3Error]=useState(false)
  const [during_the_debrief_did_the_trainer_not_ask_2Error,setduring_the_debrief_did_the_trainer_not_ask_2Error]=useState(false)
  const [were_the_participants_responsive_during_the_debriefing_3Error,setwere_the_participants_responsive_during_the_debriefing_3Error]=useState(false)
  const [did_any_wmen_leave_the_trning_sesion_during_or_aftr_tis_modle_3Error,setdid_any_wmen_leave_the_trning_sesion_during_or_aftr_tis_modle_3Error]=useState(false)
  const [did_this_module_take_30_minutes_as_allotted_2Error,setdid_this_module_take_30_minutes_as_allotted_2Error]=useState(false)
  const [check_which_ones_the_trainer_did_not_do_6Error,setcheck_which_ones_the_trainer_did_not_do_6Error]=useState(false)
  const [name_of_the_gfError,setname_of_the_gfError]=useState(false)
  const [assessmentTypeError,setassessmentTypeError]=useState(false)
  const [check_which_ones_the_gf_did_not_doError,setcheck_which_ones_the_gf_did_not_doError]=useState(false)
  const [check_which_ones_the_gelathi_did_not_doError,setcheck_which_ones_the_gelathi_did_not_doError]=useState(false)
  const [levelError,setlevelError]=useState(false)
  const [the_gf_competently_covered_folowing_things_in_training_deliveredError,setthe_gf_competently_covered_folowing_things_in_training_deliveredError]=useState(false)
  const [rateError,setrateError]=useState(false)
  const [any_futher_training_and_understding_reqired_by_gf_traing_moduleError,setany_futher_training_and_understding_reqired_by_gf_traing_moduleError]=useState(false)
  const [the_gf_comptetly_carried_out_following_funtionsError,setthe_gf_comptetly_carried_out_following_funtionsError]=useState(false)
  const [the_gf_caried_followig_fuctions_bfore_traning_or_meting_started,setthe_gf_caried_followig_fuctions_bfore_traning_or_meting_started]=useState(false)
  const [days_modules2Error,setdays_modules2Error]=useState(false)
  const [check_which_ones_the_gelathi_did_not_do_1Error,setcheck_which_ones_the_gelathi_did_not_do_1Error]=useState(false)
  const [check_which_ones_the_gelathi_did_not_do_2Error,setcheck_which_ones_the_gelathi_did_not_do_2Error]=useState(false)
  const [during_the_debrief_did_the_gelathiError,setduring_the_debrief_did_the_gelathiError]=useState(false)
  const [during_the_debriefs_for_role_plays_the_gelathi_did_not_askError,setduring_the_debriefs_for_role_plays_the_gelathi_did_not_askError]=useState(false)
  const [was_the_recap_done_1Error,setwas_the_recap_done_1Error]=useState(false)
  const [check_which_instructions_the_gelathi_did_not_doError,setcheck_which_instructions_the_gelathi_did_not_doError]=useState(false)
  const [did_the_debrief_done_by_gelathiError,setdid_the_debrief_done_by_gelathiError]=useState(false)
  const [the_gelathi_did_not_ask_1,setthe_gelathi_did_not_ask_1]=useState(false)
  const [during_the_debrief_did_the_gelathi_not_askError,setduring_the_debrief_did_the_gelathi_not_askError]=useState(false)
  const [today_poaError,settoday_poaError]=useState(false)
  const [districtError,setdistrictError]=useState(false)
  const [stateError,setstateError]=useState(false)
  const [name_of_the_talukError,setname_of_the_talukError]=useState(false)
  const [the_gf_caried_followig_fuctions_bfore_traning_or_meting_startedError,setthe_gf_caried_followig_fuctions_bfore_traning_or_meting_startedError]=useState(false)
  const [the_gelathi_did_not_ask_1Error,setthe_gelathi_did_not_ask_1Error]=useState(false)
const validation =()=>{
  if(programAssessment==0){
    setprogramAssessmentError(true);
    setHelperText('Please Select The Option');
  }
  
  if(sendForm.today_poa==''){
    settoday_poaError(true);
    setHelperText('Please Select The Option');
  }
  if(sendForm.state==''){
    alert('please Fill all the field')
    setStateError(true);
    setHelperText('Please Select The Option');
  }
  if(sendForm.district==''){
    alert('please Fill all the field')
    setdistrictError(true);
    setHelperText('Please Select The Option');
  }
  if(sendForm.name_of_the_taluk==''){
    alert('please Fill all the field')
    setname_of_the_talukError(true);
    setHelperText('Please Select The Option');
  }
  if(programAssessment ==1 ){
    if(day1Day2==''){
      alert('please Fill all the field')
      setday1_or_day2Error(true);
      setHelperText('Please Select The Option');
    }
    else if(day1Day2=='Day 1'){
      if (sendForm.name_of_the_trainer_being_evaluated == '')
      {
        setname_of_the_trainer_being_evaluatedError(true)
        setHelperText('Please Select The Option');
        alert("please fill ")
      }
      else if (sendForm.how_many_women_attended_the_training_session == '')
      {
        sethow_many_women_attended_the_training_sessionError(true)
        setHelperText('Please Select The Option');
        alert("please fill ")
      }
     else if  (intract == '')
      {
        setintractError(true)
        setHelperText('Please Select The Option');
        alert("please fill ")
      }
     else if  (sendForm.did_any_women_leave_tring_session_dring_or_after_1st_module == '')
      {
        setdid_any_women_leave_tring_session_dring_or_after_1st_moduleError(true)
        setHelperText('Please Select The Option');
        alert("please fill ")
      }
     else if  (module == '')
      {
        setmoduleError(true)
        setHelperText('Please Select The Option');
        alert("please fill ")
      }
     else if  (sendForm.did_any_new_women_attend_the_training_session_during_module == '')
      {
        setdid_any_new_women_attend_the_training_session_during_moduleError(true)
        setHelperText('Please Select The Option');
        alert("please fill ")
      }
     else if  (checked['during_the_debrief_the_trainer_did'] == 0)
      {
        setduring_the_debrief_the_trainer_didError(true)
        setHelperText('Please Select The Option');
        alert("please fill ")
      }
     else if  (sendForm.did_any_women_leve_training_session_during_or_after_1st_module_1=='')
      {
        setdid_any_women_leve_training_session_during_or_after_1st_module_1Error(true)
        setHelperText('Please Select The Option');
        alert("please fill ")
      }
     else if  (module1=='')
      {
        setmodule1Error(true)
        setHelperText('Please Select The Option');
        alert("please fill ")
      }
     else if  (attend=='')
      {
        setattendError(true)
        setHelperText('Please Select The Option');
        alert("please fill ")
      }
      else if  (leave2=='')
      {
        setleave2Error(true)
        setHelperText('Please Select The Option');
        alert("please fill ")
      }
      else if  (engage=='')
      {
        setengageError(true)
        setHelperText('Please Select The Option');
        alert("please fill ")
      }
      else if  (participant=='')
      {
        setparticipantError(true)
        setHelperText('Please Select The Option');
        alert("please fill ")
      }
      else if (sendForm.did_any_wmen_leave_the_trning_sesion_during_or_aftr_tis_modle_1 == '')
      {
        setdid_any_wmen_leave_the_trning_sesion_during_or_aftr_tis_modle_1Error(true)
        setHelperText('Please Select The Option');
        alert("please fill ")   
      }
      else if  (sendForm.did_this_module_take_30_minutes_as_allotted=='')
      {
        setdid_this_module_take_30_minutes_as_allottedError(true)
        setHelperText('Please Select The Option');
        alert("please fill ")
      }
      else if  (sendForm.did_any_new_women_attend_training_session_during_this_module_2=='')
      {
        setdid_any_new_women_attend_training_session_during_this_module_2Error(true)
        setHelperText('Please Select The Option');
        alert("please fill ")
      }
      else if  (sendForm.did_this_module_take_30_minutes_as_allotted_1=='')
      {
        setdid_this_module_take_30_minutes_as_allotted_1Error(true)
        setHelperText('Please Select The Option');
        alert("please fill ")
      }
      else{
        apiFormHit()
      }
    }
    else if(day1Day2=='Day 2'){
      if (sendForm.name_of_the_trainer_being_evaluated == '')
      {
        setname_of_the_trainer_being_evaluatedError(true)
        setHelperText('Please Select The Option');
        alert("please fill ")
      }
      else if (sendForm.was_the_recap_done=='')
      {
        setwas_the_recap_doneError(true)
        setHelperText('Please Select The Option');
        alert("please fill ")
      }
      else if (sendForm.did_the_recap_take_15_minutes_as_allotted=='')
      {
        setdid_the_recap_take_15_minutes_as_allottedError(true)
        setHelperText('Please Select The Option');
        alert("please fill ")
      }
      else if  (participant=='')
      {
        setparticipantError(true)
        setHelperText('Please Select The Option');
        alert("please fill ")
      }
      else if  (sendForm.did_any_women_leave_tring_session_dring_or_after_1st_module == '')
      {
        setdid_any_women_leave_tring_session_dring_or_after_1st_moduleError(true)
        setHelperText('Please Select The Option');
        alert("please fill ")
      }
      else if  (sendForm.did_this_module_take_30_minutes_as_allotted=='')
      {
        setdid_this_module_take_30_minutes_as_allottedError(true)
        setHelperText('Please Select The Option');
        alert("please fill ")
      }
      else if  (sendForm.repeat_the_activity_with_the_second_volunteer=='')
      {
        setrepeat_the_activity_with_the_second_volunteerError(true)
        setHelperText('Please Select The Option');
        alert("please fill ")
      }
      
      else if  (sendForm.were_the_participants_responsive_during_the_debriefing_1=='')
      {
        setwere_the_participants_responsive_during_the_debriefing_1Error(true)
        setHelperText('Please Select The Option');
        alert("please fill ")
      }
      else if (sendForm.did_any_wmen_leave_the_trning_sesion_during_or_aftr_tis_modle_1 == '')
      {
        setdid_any_wmen_leave_the_trning_sesion_during_or_aftr_tis_modle_1Error(true)
        setHelperText('Please Select The Option');
        alert("please fill ")
      }
      else if  (sendForm.did_this_module_take_30_minutes_as_allotted_1=='')
      {
        setdid_this_module_take_30_minutes_as_allotted_1Error(true)
        setHelperText('Please Select The Option');
        alert("please fill ")
      }
      
      else if  (sendForm.were_the_participants_responsive_during_the_debriefing_2=='')
      {
        setwere_the_participants_responsive_during_the_debriefing_2Error(true)
        setHelperText('Please Select The Option');
        alert("please fill ")
      }
      else if  (sendForm.did_any_wmen_leave_the_trning_sesion_during_or_aftr_tis_modle_2=='')
      {
        setdid_any_wmen_leave_the_trning_sesion_during_or_aftr_tis_modle_2Error(true)
        setHelperText('Please Select The Option');
        alert("please fill ")
      }
      else if  (sendForm.did_this_module_take_30_minutes_as_allotted_3=='')
      {
        setdid_this_module_take_30_minutes_as_allotted_3Error(true)
        setHelperText('Please Select The Option');
        alert("please fill ")
      }
      else if  (sendForm.were_the_participants_responsive_during_the_debriefing_3=='')
      {
        setwere_the_participants_responsive_during_the_debriefing_3Error(true)
        setHelperText('Please Select The Option');
        alert("please fill ")
      }
      else if  (sendForm.did_this_module_take_30_minutes_as_allotted_2=='')
      {
        setdid_any_wmen_leave_the_trning_sesion_during_or_aftr_tis_modle_3Error(true)
        setHelperText('Please Select The Option');
        alert("please fill ")
      }
      else if  (sendForm.were_the_participants_responsive_during_the_debriefing_3=='')
      {
        setdid_this_module_take_30_minutes_as_allotted_2Error(true)
        setHelperText('Please Select The Option');
        alert("please fill ")
      }
      else{
        apiFormHit()
      }
  
    }
 
  }
  if(programAssessment ==2 ){
    if(sendForm.name_of_the_gf==''){
      alert('please Fill all the field')
      setname_of_the_gfError(true);
      setHelperText('Please Select The Option');
    }
    else if (assessmentType==''){
      alert('please Fill all the field')
      setassessmentTypeError(true);
      setHelperText('Please Select The Option');
    }
    else if (checked['the_gf_comptetly_carried_out_following_funtions'] == 0){
      alert('please Fill all the field')
      setthe_gf_comptetly_carried_out_following_funtionsError(true);
      setHelperText('Please Select The Option');
    }
    else if (checked['the_gf_caried_followig_fuctions_bfore_traning_or_meting_started'] == 0){
      alert('please Fill all the field')
      setthe_gf_caried_followig_fuctions_bfore_traning_or_meting_startedError(true);
      setHelperText('Please Select The Option');
    }
    else if (level1=='' || level2=='' || level3==''  || level4==''  || level5=='' ){
      alert('please Fill all the field')
      setlevelError(true);
      setHelperText('Please Select All level In The  Option');
    }
    
    else if (checked['the_gf_competently_covered_folowing_things_in_training_delivered'] == 0){
      alert('please Fill all the field')
      setthe_gf_competently_covered_folowing_things_in_training_deliveredError(true);
      setHelperText('Please Select The Option');
    }
    else if (rate1=='' || rate2=='' || rate3=='' || rate4=='' || rate5=='' || rate6=='' || rate7=='' || rate8=='' || rate9=='' || rate10==''  ){
      alert('please Fill all the field')
      setrateError(true);
      setHelperText('Please Select All Sesion  The Option');
    }
    else if (checked['any_futher_training_and_understding_reqired_by_gf_traing_module'] == 0){
      alert('please Fill all the field')
      setany_futher_training_and_understding_reqired_by_gf_traing_moduleError(true);
      setHelperText('Please Select The Option');
    }
    else{
      apiFormHit()
    }
  }
 
  if(programAssessment==3){
    if( sendForm.days_modules==''){
      alert('please Fill all the field')
      setdays_modules2Error(true);
      setHelperText('Please Select The Option');
 
    }
    else if(sendForm.days_modules=='Session-1 _ Introduction'){
        apiFormHit()
    }
    else if(sendForm.days_modules=='Session-2 _ Financial Management'){
      if (sendForm.was_the_recap_done=='')
      {
        setwas_the_recap_doneError(true)
        setHelperText('Please Select The Option');
        alert("Please Select The Option")
      }
      else {
        apiFormHit()
      }
    }
    else if(sendForm.days_modules=='Session-3 _Basics of an enterprise'){
    
       if(checked['during_the_debrief_did_the_gelathi'] == 0){
        alert('please Fill all the field')
        setduring_the_debrief_did_the_gelathiError(true);
        setHelperText('Please Select The Option');
      }
      else {
        apiFormHit()
      }
    }
    else if(sendForm.days_modules=='Session-4 _Building Relationship'){
    
        apiFormHit()
    }
    else if(sendForm.days_modules=='Session-5 _Assets and Liabilities'){
      if (sendForm.was_the_recap_done_1=='')
      {
        setwas_the_recap_done_1Error(true)
        setHelperText('Please Select The Option');
        alert("Please Select The Option")
      }
      else {
        apiFormHit()
      }
    }
    else if(sendForm.days_modules=='Session-6 _Goal setting game'){
      
      
       if  (sendForm.repeat_the_activity_with_the_second_volunteer=='')
      {
        setrepeat_the_activity_with_the_second_volunteerError(true)
        setHelperText('Please Select The Option');
        alert("please fill ")
      }
      else if  (sendForm.did_the_debrief_done_by_gelathi=='')
      {
        setdid_the_debrief_done_by_gelathiError(true)
        setHelperText('Please Select The Option');
        alert("please fill ")
      }
      else {
        apiFormHit()
      }
    }
    else if(sendForm.days_modules=='Session-7 _Financial Goals'){
        apiFormHit()
    }
    else if(sendForm.days_modules=='Session-8 _Loans-Group discussion of Case Studies'){
        apiFormHit()
    }
    else{
      apiFormHit()
    }
  }
}
  const apiFormHit = async => {
let data = JSON.stringify({
  emp_id:parseInt(userid) ,
  role_id: parseInt(role) ,
  email_address: sendForm?.email_address,
  name_of_the_assessor: sendForm?.name_of_the_assessor,
 entry_date: moment(sendForm?.entry_date?.$d)?.format('YYYY-MM-DDTHH:mm:ss') + "Z",
  program_assessment: parseInt(programAssessment),
  today_poa: sendForm.today_poa,
  name_of_the_state:sendForm?.name_of_the_state,
  name_of_the_district:sendForm?.name_of_the_district,
  name_of_the_taluk: sendForm?.name_of_the_taluk,
  name_of_the_village_and_the_venue_of_meeting_or_training: sendForm?.name_of_the_village_and_the_venue_of_meeting_or_training,
  day1_or_day2:day1Day2,
  name_of_the_trainer_being_evaluated:sendForm.name_of_the_trainer_being_evaluated,
  check_which_ones_the_trainer_did_not_do: checked['check_which_ones_the_trainer_did_not_do'],
  how_many_women_attended_the_training_session: parseInt(sendForm?.how_many_women_attended_the_training_session),
  check_which_ones_the_trainer_did_not_do_1:checked['check_which_ones_the_trainer_did_not_do_1'],
  were_the_women_interactive: intract,
  did_any_women_leave_tring_session_dring_or_after_1st_module: sendForm.did_any_women_leave_tring_session_dring_or_after_1st_module,
  if_so_how_many: parseInt(sendForm.if_so_how_many),
  did_this_module_take_20_minutes_as_allotted: module,
  did_any_new_women_attend_the_training_session_during_module:sendForm.did_any_new_women_attend_the_training_session_during_module,
  if_so_how_many_1:parseInt(sendForm.if_so_how_many_1),
  check_which_ones_the_trainer_did_not_do_2: checked['check_which_ones_the_trainer_did_not_do_2'],
  during_the_debrief_did_the_trainer_did_not_do_the_following:checked['during_the_debrief_did_the_trainer_did_not_do_the_following'],
  during_the_debrief_the_trainer_did: checked['during_the_debrief_the_trainer_did'],
  did_any_women_leve_training_session_during_or_after_1st_module_1:sendForm.did_any_women_leve_training_session_during_or_after_1st_module_1,
  if_so_how_many_2: parseInt(sendForm.if_so_how_many_2),
  did_this_module_take_20_minutes_as_allotted_1: module1,
  did_any_new_women_attend_training_session_during_this_module_1: attend,
  if_so_how_many_3: parseInt(sendForm.if_so_how_many_3),
  check_which_ones_the_trainer_did_not_do_3:checked['check_which_ones_the_trainer_did_not_do_3'],
  during_the_debriefs_for_role_plays_the_trainer_did_not_ask: checked['during_the_debriefs_for_role_plays_the_trainer_did_not_ask'],
  did_the_trainer_leave_women_to_read_role_play_card_themselves: leave2,
  did_the_groups_engage_and_interact_among_themselves_well: engage,
  were_the_participants_responsive_during_the_debriefing:participant,
  did_any_wmen_leave_the_trning_sesion_during_or_aftr_tis_modle_1: sendForm.did_any_wmen_leave_the_trning_sesion_during_or_aftr_tis_modle_1,
  if_so_how_many_4: parseInt(sendForm.if_so_how_many_4),
  did_this_module_take_30_minutes_as_allotted: sendForm.did_this_module_take_30_minutes_as_allotted,
  how_many_women_remained_by_the_end_of_this_training_session: parseInt( sendForm.how_many_women_remained_by_the_end_of_this_training_session),
  how_many_are_likely_to_come_back:parseInt( sendForm.how_many_are_likely_to_come_back),
  did_any_new_women_attend_training_session_during_this_module_2: sendForm.did_any_new_women_attend_training_session_during_this_module_2,
  if_so_how_many_5: parseInt(sendForm.if_so_how_many_5),
  did_this_module_take_30_minutes_as_allotted_1: sendForm.did_this_module_take_30_minutes_as_allotted_1,
  check_which_ones_the_trainer_did_not_do_4: checked['check_which_ones_the_trainer_did_not_do_4'],
  was_the_recap_done: sendForm.was_the_recap_done,
  did_the_recap_take_15_minutes_as_allotted: sendForm.did_the_recap_take_15_minutes_as_allotted,
  name_of_the_gf: sendForm?.name_of_the_gf,
  no_of_participants_at_the_start_of_the_session: parseInt(sendForm.no_of_participants_at_the_start_of_the_session),
  assessment_of: assessmentType,
  the_gf_comptetly_carried_out_following_funtions: checked['the_gf_comptetly_carried_out_following_funtions'],
  the_gf_caried_followig_fuctions_bfore_traning_or_meting_started:checked['the_gf_caried_followig_fuctions_bfore_traning_or_meting_started'],
  how_many_stories_of_success_or_change_emerged_from_the_recap: parseInt(sendForm?.how_many_stories_of_success_or_change_emerged_from_the_recap),
  ment_name_of_gelathis_success_stories_and_story_couple_of_lines:sendForm?.ment_name_of_gelathis_success_stories_and_story_couple_of_lines,
  check_which_ones_the_gf_did_not_do: checked['check_which_ones_the_gf_did_not_do'],
  number_of_enrolled_gelathis_in_the_circle: parseInt(sendForm.number_of_enrolled_gelathis_in_the_circle),
  no_of_attended_gelathis: parseInt(sendForm.no_of_attended_gelathis),
  level_of_participation_1: parseInt(level1),
  level_of_participation_2: parseInt(level2),
  level_of_participation_3: parseInt(level3),
  level_of_participation_4: parseInt(level4),
  level_of_participation_5: parseInt(level5),
  the_gf_competently_covered_folowing_things_in_training_delivered: checked['the_gf_competently_covered_folowing_things_in_training_delivered'],
  rate_the_gf_1: parseInt(rate1),
  rate_the_gf_2:parseInt(rate2),
  rate_the_gf_3: parseInt(rate3),
  rate_the_gf_4:parseInt(rate4),
  rate_the_gf_5: parseInt(rate5),
  rate_the_gf_6:parseInt(rate6),
  rate_the_gf_7: parseInt(rate7),
  rate_the_gf_8:parseInt(rate8),
  rate_the_gf_9: parseInt(rate9),
  rate_the_gf_10:parseInt(rate10),
  what_worked_in_the_training: sendForm.what_worked_in_the_training,
  what_can_be_better_next_time: sendForm.what_can_be_better_next_time,
  any_futher_training_and_understding_reqired_by_gf_traing_module: checked['any_futher_training_and_understding_reqired_by_gf_traing_module'],
  did_you_find_anything_traiing_or_gf_that_neds_to_worked_priority: sendForm.did_you_find_anything_traiing_or_gf_that_neds_to_worked_priority,
  details_of_success_stories_to_be_collected_from_gelathis_by_gf: sendForm.details_of_success_stories_to_be_collected_from_gelathis_by_gf,
  deadline_to_collect_the_stories: moment(sendForm?.deadline_to_collect_the_stories?.$d)?.format('YYYY-MM-DDTHH:mm:ss') + "Z",
  end_time_of_the_training:sendForm.end_time_of_the_training,
  no_of_participants_at_end_of_the_session: parseInt(sendForm.no_of_participants_at_end_of_the_session),
  any_other_comments_about_the_gelathi_facilitator: sendForm.any_other_comments_about_the_gelathi_facilitator,
  name_of_the_gelathi_being_evaluated: sendForm.name_of_the_gelathi_being_evaluated,
  name_of_the_gelathi_being_evaluated_1: sendForm.name_of_the_gelathi_being_evaluated_1,
  days_modules: sendForm.days_modules,
  check_which_ones_the_gelathi_did_not_do: checked['check_which_ones_the_gelathi_did_not_do'],
  how_many_women_attended_the_training_session_2:parseInt (sendForm.how_many_women_attended_the_training_session_2),
  how_many_women_attended_the_training_session_3:parseInt( sendForm.how_many_women_attended_the_training_session_3),
  how_many_women_attended_the_training_session_4:parseInt (sendForm.how_many_women_attended_the_training_session_4),
  how_many_women_attended_the_training_session_1:parseInt (sendForm.how_many_women_attended_the_training_session_1),
  check_which_ones_the_gelathi_did_not_do_1: checked['check_which_ones_the_gelathi_did_not_do_1'],
  was_the_recap_done_1:sendForm.was_the_recap_done_1,
  did_the_debrief_done_by_gelathi: sendForm.did_the_debrief_done_by_gelathi,
  during_the_debriefs_for_role_plays_the_gelathi_did_not_ask: checked['check_which_ones_the_gelathi_did_not_do_1'],
  repeat_the_activity_with_the_second_volunteer: sendForm.repeat_the_activity_with_the_second_volunteer,
  during_the_debrief_did_the_gelathi_not_ask:checked['during_the_debrief_did_the_gelathi_not_ask'],
  the_gelathi_did_not_ask_1:checked['the_gelathi_did_not_ask_1'],
  check_which_ones_the_gelathi_did_not_do_2:checked['check_which_ones_the_gelathi_did_not_do_2'],
  check_which_ones_the_gelathi_did_not_do_3:checked['check_which_ones_the_gelathi_did_not_do_3'],
  check_which_ones_the_gelathi_did_not_do_4:checked['check_which_ones_the_gelathi_did_not_do_4'],
  during_the_debrief_did_the_gelathi:checked['during_the_debrief_did_the_gelathi'],
  check_which_instructions_the_trainer_did_not_do:checked['check_which_instructions_the_trainer_did_not_do'],
  during_the_debrief_did_the_trainer_not_ask:checked['during_the_debrief_did_the_trainer_not_ask'],
  the_trainer_did_not_ask:checked['the_trainer_did_not_ask'],
  what_did_the_trainer_not_do:checked['what_did_the_trainer_not_do'],
  during_the_debrief_did_the_trainer_not_ask_1:checked['during_the_debrief_did_the_trainer_not_ask_1'],
  check_which_ones_the_trainer_did_not_do_5:checked['check_which_ones_the_trainer_did_not_do_5'],
  check_which_ones_the_trainer_did_not_do_6:checked['check_which_ones_the_trainer_did_not_do_6'],
  during_the_debrief_did_the_trainer_not_ask_2:checked['during_the_debrief_did_the_trainer_not_ask_2'],
  check_which_instructions_the_gelathi_did_not_do:checked['check_which_instructions_the_gelathi_did_not_do'],
  did_any_wmen_leave_the_trning_sesion_during_or_aftr_tis_modle_2:sendForm.did_any_wmen_leave_the_trning_sesion_during_or_aftr_tis_modle_2,
  were_the_participants_responsive_during_the_debriefing_1:sendForm.were_the_participants_responsive_during_the_debriefing_1,
  were_the_participants_responsive_during_the_debriefing_2:sendForm.were_the_participants_responsive_during_the_debriefing_2,
  did_this_module_take_30_minutes_as_allotted_2:sendForm.did_this_module_take_30_minutes_as_allotted_2,
  were_the_participants_responsive_during_the_debriefing_3:sendForm.were_the_participants_responsive_during_the_debriefing_3,
  did_any_wmen_leave_the_trning_sesion_during_or_aftr_tis_modle_3:sendForm.did_any_wmen_leave_the_trning_sesion_during_or_aftr_tis_modle_3,
  did_this_module_take_30_minutes_as_allotted_3:sendForm.did_this_module_take_30_minutes_as_allotted_3,
  });
let config = {
  method: 'post',
  maxBodyLength: Infinity,
  url: baseURL + 'addQualityAssessmentForm ',
  headers: { 
    'Content-Type': 'application/json',
    'Authorization': `${apikey}`
  },
  data : data
};
axios.request(config)
.then((response) => {
 setApiData(response.data)
 Swal.fire({
  icon: 'success',
  title: 'Success',
  text: response.data.message,
  confirmButtonText: 'Ok',
  timer: 3000
});
handleClose()
sendForm = {...formData};
setSendForm(sendForm);
checked = {...checkData}
setProgramAssessment('')
setLeave2('')
setParticipant('')
setEngage('')
setDay1Day2('')
setChecked(checked)
reloadfunction()
})
.catch((error) => {
  Swal.fire({
    icon: 'error',
    title: 'Error',
    text: response.data.message,
    confirmButtonText: 'Ok',
    timer: 2000
  });
  handleClose();
});
  }
  const handleTime = (event) => {
  setSendForm({ ...sendForm, entry_date: event });
   
  }; 
  const [others,setothers] = useState('')
  const handlother=(e)=>{
    setothers(e.target.value)
  }
  const validate = ( )=>{
  }
  const TenQna = ()=>{
 
    <FormControl >
    </FormControl>
  }
  console.log("state",sendForm?.state)
  return (
    <>
        <Button variant="contained" style={{
        float: "right", marginLeft: "1rem", borderRadius: "50%", padding: "0.2rem", marginTop: "-0.5rem",
        position: 'fixed', zIndex: '1', bottom: 40, right: 40
      }} onClick={handleClickOpendilog} sx={{
        ':hover': {
          bgcolor: '#ffd796', // theme.palette.primary.main
          color: '#ff7424',
          border: '#ffd796'
        },
        ':active': {
          bgcolor: '#ffd796',
          color: "#ff7424"
        },
        bgcolor: '#ffd796',
        color: "#ff7424",
        border: 'none'
      }} >
        <span style={{ fontSize: "2rem" }}>+</span>
      </Button>
      <Button  onClick={handleClickOpen}>
       
      </Button>
    
      <Dialog
        fullScreen
        open={open}
        onClose={handleClose}
        TransitionComponent={Transition}
      >
          <form onSubmit={(e)=>{e.preventDefault();validation()}}>
        <AppBar sx={{ position: 'fixed', bgcolor: '#ff7424' }}>
          <Toolbar>
            <IconButton
              edge="start"
              color="inherit"
              onClick={handleClose}
              aria-label="close"
            >
              <CloseIcon />
            </IconButton>
            <Typography sx={{ ml: 2, flex: 1, color:"white"  }} variant="h6" component="div">
            Quality Assessment Form 
            </Typography>
            <Button autoFocus color="inherit" type='submit'>
              save
            </Button>
          </Toolbar>
        </AppBar>
        
  
        
    {/* 1 */}
    <Grid style={{backgroundColor:"#FFD580", marginTop: "30px"}}>
            <Typography></Typography>
       
        
        <Card sx={{marginTop:'60px', margin:"20px"}}>
        <CardContent>
            <Typography style={{marginTop:'10px'}}>
            The purpose of this 'Buzz training quality evaluation' form is -<br/>
            1. To evaluate if the standard pedagogical practices are being followed in Buzz Meeting/Training<br/>
            2. To evaluate the effectiveness of training<br/>
            3. To record and reflect on the trainers / facilitator's competency and facilitation<br/>
            4. to record/Identify stories from community
            </Typography>
 
                </CardContent>
        </Card>
        <Card sx={{mt:4, margin:"20px"}}>
        <CardContent>
            <Typography>Email</Typography>
            <Stack mt={2} mb={2}>
                    {/* <TextField required label="Your Answer" variant="outlined" color="common" /> */}
                   <TextField  type='email' required inputProps={{ required: true }}  label="Your Answer" variant="outlined" color="common" onChange={(e) => setSendForm({ ...sendForm, email_address:e.target.value})} value={sendForm?.email_address}   
/>
                </Stack> 
                </CardContent>
        </Card>
        
     
     <Card sx={{mt:2, margin:"20px"}} >
        <CardContent>
            <Typography>Name of the Assessor
       </Typography>
            <Stack mt={2} mb={2}>
                    <TextField  required inputProps={{ required: true }} label="Your Answer" variant="outlined" color="common" onChange={(e) => setSendForm({ ...sendForm, name_of_the_assessor:e.target.value})} value={sendForm?.name_of_the_assessor}/>
                </Stack> 
        </CardContent>
     </Card>
     <Card sx={{ margin:"20px"}}>
        <CardContent>
        <Stack>
                <Typography variant="body2"> Date of the evaluation of the training/meeting</Typography>
                <Stack mt={2} mb={2}>
                <DateTimePicker
id="date-time-picker" 
            minDate={today}
 required 
  label="From"
  onChange={(e) => { handleTime(e) }}
  value={sendForm?.entry_date}
  PopperProps={{
    placement: "top"
  }}
  renderInput={(params) => <TextField  required inputProps={{ required: true }} {...params} color="common" />}
/>
                </Stack> 
              </Stack>
        </CardContent>
     </Card>
     <Card sx={{ margin:"20px"}}>
        <CardContent>
        <Stack mt={2}>
                <Typography>
                   Program Assessment
                   {programAssessmentError ? (
                          <FormHelperText style={{ color: 'red' }}>{helperText}</FormHelperText>
                        ) : null}{' '}
                </Typography>
                <RadioGroup
              aria-labelledby="demo-radio-buttons-group-label"
              name="radio-buttons-group"
              value={programAssessment}
              onChange={handleprogramassessment}
              required inputProps={{ required: true }} 
            >
                
                    <FormControlLabel value="1"  control={<Radio style={{color:"#595959"}}/>} label="Self Shakti Training Program" />
                    <FormControlLabel value="2" control={<Radio style={{color:"#595959"}}/>} label="Gelathi Program" />
                    <FormControlLabel value="3" control={<Radio style={{color:"#595959"}}/>} label="Self Shakti by Gelathi" />
                   
                  </RadioGroup>
              
              </Stack>
        </CardContent>
       { (programAssessment!=3) && poa?.length !=0?   <CardContent>
        <Stack mt={2}>
                <Typography>
                Select Poa
                {today_poaError ? (
                          <FormHelperText style={{ color: 'red' }}>{helperText}</FormHelperText>
                        ) : null}{' '}
                </Typography>
                <Box sx={{ minWidth: 120 }}>
      <FormControl style={{marginTop:"5px"}} fullWidth>
        <InputLabel id="Name of the Poa">Poa</InputLabel>
        <Select
          labelId="Name of the Poa"
          id="Name of the Poa"
          value={sendForm?.today_poa}
          label="Poa"
          onChange={(e =>{
            setSendForm({ ...sendForm, today_poa:e?.target?.value})
          })}
        >
          {poa?.map(itm =>{
            return (
              <MenuItem value={itm?.name}>{itm?.name}</MenuItem>
            )
          })}
        </Select>
      </FormControl>
    </Box>
              </Stack>
        </CardContent>: null}
     </Card>
     <Card sx={{ margin:"20px"}}>
      <CardContent>
      <Box sx={{ minWidth: 120 }}>
      <FormControl style={{marginTop:"5px"}} fullWidth>
        <InputLabel id="Name of the State">Name of the State
        {stateError ? (
                          <FormHelperText style={{ color: 'red' }}>{helperText}</FormHelperText>
                        ) : null}{' '}
        </InputLabel>
        <Select
          labelId="Name of the State"
          id="Name of the State"
          value={sendForm?.state}
          label="Name of the State"
          onChange={(e =>{
          setSendForm({...sendForm , state : e?.target?.value }) 
            // setFormStateName(e?.target?.value)
              getDistrict(e?.target?.value?.id)
            console.log(e?.target?.value,sendForm?.state,"stateeee")
            
          })}
        >
          {state?.map(itm =>{
            return (
              <MenuItem value={itm}>{itm?.name}</MenuItem>
            )
          })}
        </Select>
      </FormControl>
      </Box>
      </CardContent>
     </Card>
     <Card sx={{ margin:"20px"}}>
        <CardContent>
    
<Box sx={{ minWidth: 120 }}>

      <FormControl style={{marginTop:"5px"}} fullWidth>
        <InputLabel id="Name of the District">Name of the District
        {districtError ? (
                          <FormHelperText style={{ color: 'red' }}>{helperText}</FormHelperText>
                        ) : null}{' '}
        </InputLabel>
        <Select
          labelId="Name of the District"
          id="Name of the District"
          value={sendForm?.district}
          label="Name of the District"
          onChange={(e =>{
            setFormDistrictName(e?.target?.value)
            
          })}
        >
          {district?.map(itm =>{
            return (
              <MenuItem value={itm}>{itm?.name}</MenuItem>
            )
          })}
        </Select>
      </FormControl>
    </Box>
        </CardContent>
     </Card>

     <Card sx={{ margin:"20px"}}>
        <CardContent>
        <Box sx={{ minWidth: 120 }}>
      <FormControl style={{marginTop:"5px"}} fullWidth>
        <InputLabel id="Name of the taluk">Name of the Taluk
        {name_of_the_talukError ? (
                          <FormHelperText style={{ color: 'red' }}>{helperText}</FormHelperText>
                        ) : null}{' '}</InputLabel>
        <Select
          labelId="Name of the taluk"
          id="Name of the taluk"
          value={sendForm?.name_of_the_taluk}
          label="Name of the taluk"
          onChange={(e =>{
            setSendForm({ ...sendForm, name_of_the_taluk:e?.target?.value})
          })}
        >
          {taluk?.map((itm,i) =>{
            return (
              <MenuItem value={itm}>{itm}</MenuItem>
            )
          })}
        </Select>
      </FormControl>
    </Box>
        </CardContent>
     </Card>
     <Card sx={{ margin:"20px"}}>
        <CardContent>
        <Stack>
                <Typography variant="body2">Name of the village and the venue of meeting/training/ಗ್ರಾಮದ ಹೆಸರು ಮತ್ತು ಸಭೆ / ತರಬೇತಿಯ ಸ್ಥಳ</Typography>
                <Stack mt={2} mb={2}>
                    <TextField required inputProps={{ required: true }} label="Your Answer" variant="outlined" color="common" onChange={(e) => setSendForm({ ...sendForm, name_of_the_village_and_the_venue_of_meeting_or_training:e.target.value})} value={sendForm?.name_of_the_village_and_the_venue_of_meeting_or_training}/>
                </Stack>  
              </Stack>
       
        </CardContent>
     </Card>
     
        </Grid>
        <br/>
        
         {/* 2 */}
      {( programAssessment==2 )?  <Grid  backgroundColor={"#FFD580"} sx={{maxHeight:'3500px'}} >
          
        <CardContent >
          <Card sx={{maxHeight:'600px'}}>
          <Card sx = {{backgroundColor:'#ff7424', }} mt={2}>
          <CardContent>
          <Typography variant = 'h5'>Gelathi Program
          {name_of_the_gfError ? (
                          <FormHelperText style={{ color: 'red' }}>{helperText}</FormHelperText>
                        ) : null}{' '}
          </Typography>
          </CardContent>
        </Card  >
        <CardContent style={{height:'200px'}}>
         
          <Box sx={{ minWidth: 120 }}>
  
      <Autocomplete
      disablePortal
      
      id="combo-box-demo"
      options={gfName}
      filterOptions={filterOptions}
      getOptionLabel={(option) => ( option.first_name  ) }
      sx={{zIndex: 9999, width: '100%'}}
      
      
      componentsProps={{
        paper: {
          sx: {
            height: 200,
            zIndex: 9999,
            position: 'relative',
            
          }
        }
      }}
      MenuProps={{
        anchorOrigin: {
          vertical: 'bottom',
          horizontal: 'left',
        },
        transformOrigin: {
          vertical: 'top',
          horizontal: 'left',
        },
        getContentAnchorEl: null,
        PaperProps: {
          style: {
            maxHeight: 200, // Adjust the maximum height of the dropdown
          },
        },
      }}
     onChange={(event, value) => {
  setSendForm({ ...sendForm, name_of_the_gf: value.first_name });
}}
renderOption={(props, option) => (
  <Box  component="li" sx={{ '& > img': { mr: 2, flexShrink: 0 } }} {...props} key={option.id}>
    {option.first_name}
  </Box>
)}
      renderInput={(params) => <TextField  fullWidth {...params} label="Name of the Field Associate"       
       />}     
    />
    </Box>
        </CardContent>
          </Card>
          <Card  sx={{ marginTop:"20px"}}>
              <CardContent>
                  <Typography>No of participants at the start of the session
            </Typography>
                  <Stack mt={2} mb={2}>
                          <TextField required inputProps={{ required: true }} type="number"  label="Your Answer" variant="outlined" color="common" onChange={(e) => setSendForm({ ...sendForm, no_of_participants_at_the_start_of_the_session:e.target.value})} value={sendForm?.no_of_participants_at_the_start_of_the_session}/>
                      </Stack> 
              </CardContent>
          </Card>
          <Card sx={{ marginTop:"20px"}}>
        <CardContent>
        <Stack mt={2}>
                <Typography>
                Assessment of
                {assessmentTypeError ? (
                          <FormHelperText style={{ color: 'red' }}>{helperText}</FormHelperText>
                        ) : null}{' '}
                </Typography>
                <Stack mt={2}>
                  <RadioGroup 
                     name="radio-buttons-group"
                   value={assessmentType}
                   onChange={handleassessmentType}
                   >
                    
                    <FormControlLabel control={<Radio  />} label="Circle Meeting" value="Circle Meeting"/>
                    <FormControlLabel control={<Radio  />} label="Spoorthi Module 1" value="Spoorthi Module 1" />
                        <FormControlLabel control={<Radio  />} label="Spoorthi Module 2" value="Spoorthi Module 2"/>
                        <FormControlLabel control={<Radio  />} label="Spoorthi Module 3" value="Spoorthi Module 3"/>
                        <FormControlLabel control={<Radio  />} label="Spoorthi Module 4" value="Spoorthi Module 4"/>
                        <FormControlLabel control={<Radio  />} label="Green Module 1" value="Green Module 1"/>
                        <FormControlLabel control={<Radio  />} label="Green Module 2" value="Green Module 2"/>
                        <FormControlLabel control={<Radio  />} label="Green Module 3" value="Green Module 3"/>
                        <FormControlLabel control={<Radio  />} label="Green Module 4" value="Green Module 4"/>
                        <FormControlLabel control={<Radio  />} label="Green Module 5" value="Green Module 5"/>
                        <FormControlLabel control={<Radio  />} label="Vyapar Module 1" value="Vyapar Module 1"/>
                        <FormControlLabel control={<Radio  />} label="Vyapar Module 2" value="Vyapar Module 2"/>
                        <FormControlLabel control={<Radio  />} label="Vyapar Module 3" value="Vyapar Module 3"/>
                        <FormControlLabel control={<Radio  />} label="Vyapar Module 4" value="Vyapar Module 4"/>
                        <FormControlLabel control={<Radio  />} label="Vyapar Module 5" value="Vyapar Module 5"/>
                  </RadioGroup>
                </Stack>
              </Stack>
        </CardContent>
          </Card>
          <Card sx={{marginTop:2}}>
                <CardContent>
                <Typography >
                The Field Associate competently carried out the following functions
                {the_gf_comptetly_carried_out_following_funtionsError ? (
                          <FormHelperText style={{ color: 'red' }}>{helperText}</FormHelperText>
                        ) : null}{' '}
                </Typography>
                <FormGroup>
                <FormControlLabel control={<Checkbox  />} label="Reached the venue on time" value="Reached the venue on time"  onChange={(event) =>handleprerequisites('the_gf_comptetly_carried_out_following_funtions', event)}/>
                <FormControlLabel control={<Checkbox  />} label="Confirmed a suitable venue to conduct the training" value="Confirmed a suitable venue to conduct the training"  onChange={(event) =>handleprerequisites('the_gf_comptetly_carried_out_following_funtions', event)}/>
                <FormControlLabel control={<Checkbox  />} label="Arranged drinking water facilities for the training" value="Arranged drinking water facilities for the training"  onChange={(event) =>handleprerequisites('the_gf_comptetly_carried_out_following_funtions', event)}/>
                <FormControlLabel control={<Checkbox  />} label="Confirmed location had accessible washroom facilities" value="Confirmed location had accessible washroom facilities" onChange={(event) =>handleprerequisites('the_gf_comptetly_carried_out_following_funtions', event)}/>
                <FormControlLabel control={<Checkbox  />} label="Carried all the training materials with her" value="Carried all the training materials with her" onChange={(event) =>handleprerequisites('the_gf_comptetly_carried_out_following_funtions', event)}/>
                <FormControlLabel control={<Checkbox  />} label="Commenced the training on time" value="Commenced the training on time"  onChange={(event) =>handleprerequisites('the_gf_comptetly_carried_out_following_funtions', event)}/>
                {/* <FormControlLabel control={<Checkbox  />} label="Beehive Initiative Circle Meeting" value="Beehive Initiative Circle Meeting"  onChange={(event) =>handleprerequisites('the_gf_comptetly_carried_out_following_funtions', event)}/> */}
          </FormGroup>
      </CardContent>
           </Card>
      
           <Card sx={{marginTop:2}}>
              <CardContent>
                        <Typography >
                        The Field Associate carried out the following functions before the training/meeting started
                        {the_gf_caried_followig_fuctions_bfore_traning_or_meting_startedError ? (
                          <FormHelperText style={{ color: 'red' }}>{helperText}</FormHelperText>
                        ) : null}{' '}
                        </Typography>
                        <FormGroup>
                        <FormControlLabel control={<Checkbox  />} label="Group is made to sit in circle or proper shape" value="Group is made to sit in circle or proper shape" onChange={(event) =>handleprerequisites('the_gf_caried_followig_fuctions_bfore_traning_or_meting_started', event)}/>
                        <FormControlLabel control={<Checkbox  />} label="Welcomed the gathering" value="Welcomed the gathering" onChange={(event) =>handleprerequisites('the_gf_caried_followig_fuctions_bfore_traning_or_meting_started', event)}/>
                        <FormControlLabel control={<Checkbox  />} label="Briefed everyone about the rules of the meeting/training" value="Briefed everyone about the rules of the meeting/training" onChange={(event) =>handleprerequisites('the_gf_caried_followig_fuctions_bfore_traning_or_meting_started', event)}/>
                        <FormControlLabel control={<Checkbox  />} label="Started the session with a brief recap of previous sessions" value="Started the session with a brief recap of previous sessions" onChange={(event) =>handleprerequisites('the_gf_caried_followig_fuctions_bfore_traning_or_meting_started', event)}/>
                        <FormControlLabel control={<Checkbox  />} label="Field Associate distributed the notes and seed pens or pencils" value="Field Associate distributed the notes and seed pens or pencils" onChange={(event) =>handleprerequisites('the_gf_caried_followig_fuctions_bfore_traning_or_meting_started', event)}/>
                        {/* <FormControlLabel control={<Checkbox  />} label="Beehive Initiative Circle Meeting" value="Beehive Initiative Circle Meeting" onChange={(event) =>handleprerequisites('the_gf_caried_followig_fuctions_bfore_traning_or_meting_started', event)}/> */}
                  </FormGroup>
              </CardContent>
              </Card>
        <Card  sx={{ marginTop:"20px"}}>
                <CardContent>
                    <Typography>How many stories of success or change emerged from the recap
              </Typography>
                    <Stack mt={2} mb={2}>
                            <TextField required inputProps={{ required: true }} type="number" label="Your Answer" variant="outlined" color="common" onChange={(e) => setSendForm({ ...sendForm, how_many_stories_of_success_or_change_emerged_from_the_recap:e.target.value})} value={sendForm?.how_many_stories_of_success_or_change_emerged_from_the_recap}/>
                        </Stack> 
                </CardContent>
        </Card>
        <Card  sx={{ marginTop:"20px"}}>
                <CardContent>
                    <Typography>Mention name of the Gelathis with success stories and a story in couple of lines
              </Typography>
                    <Stack mt={2} mb={2}>
                            <TextField required inputProps={{ required: true }}  label="Your Answer" variant="outlined" color="common" onChange={(e) => setSendForm({ ...sendForm, ment_name_of_gelathis_success_stories_and_story_couple_of_lines:e.target.value})} value={sendForm?.ment_name_of_gelathis_success_stories_and_story_couple_of_lines}/>
                        </Stack> 
                </CardContent>
        </Card>
        </CardContent>
        </Grid> :null}
      
         {/* 3 */}
     {  ( assessmentType=='Circle Meeting' )?    <Grid  backgroundColor={"#FFD580"}>
          
        <CardContent>
          <Card>
          <Card sx = {{backgroundColor:'#ff7424'}} mt={2}>
          <CardContent>
          <Typography variant = 'h5'>Circle Meeting</Typography>
          </CardContent>
        </Card>
        <CardContent>
          <Typography >
          Check which ones the Field Associate did NOT do
          {check_which_ones_the_gf_did_not_doError ? (
                          <FormHelperText style={{ color: 'red' }}>{helperText}</FormHelperText>
                        ) : null}{' '}
          </Typography>
          <FormGroup>
            <FormControlLabel control={<Checkbox  />} label="Welcome and spoorthi song" value="Welcome and spoorthi song" onChange={(event) =>handleprerequisites('check_which_ones_the_gf_did_not_do', event)}/>
            <FormControlLabel control={<Checkbox  />} label="Introduction of GF, Gelathis and Buzz" value="Introduction of GF, Gelathis and Buzz" onChange={(event) =>handleprerequisites('check_which_ones_the_gf_did_not_do', event)}/>
            <FormControlLabel control={<Checkbox  />} label="Set the ground rules" value="Set the ground rules" onChange={(event) =>handleprerequisites('check_which_ones_the_gf_did_not_do', event)}/>
            <FormControlLabel control={<Checkbox  />} label="Congratulate the Gelathis" value="Congratulate the Gelathis" onChange={(event) =>handleprerequisites('check_which_ones_the_gf_did_not_do', event)}/>
            <FormControlLabel control={<Checkbox  />} label="Collect opinion about the Buzz Self Shakthi training" value="Collect opinion about the Buzz Self Shakthi training" onChange={(event) =>handleprerequisites('check_which_ones_the_gf_did_not_do', event)}/>
            <FormControlLabel control={<Checkbox  />} label="Explain the Buzz GFs roles and responsibility" value="Explain the Buzz GFs roles and responsibility" onChange={(event) =>handleprerequisites('check_which_ones_the_gf_did_not_do', event)}/>
            <FormControlLabel control={<Checkbox  />} label="Explain the concept of Buzz Gelathi" value="Explain the concept of Buzz Gelathi" onChange={(event) =>handleprerequisites('check_which_ones_the_gf_did_not_do', event)}/>
            <FormControlLabel control={<Checkbox  />} label="Brief about  functions of Buzz Gelathi" value="Brief about  functions of Buzz Gelathi" onChange={(event) =>handleprerequisites('check_which_ones_the_gf_did_not_do', event)}/>
            <FormControlLabel control={<Checkbox  />} label="Explain the challenges of Buzz Gelathis during execution of her role" value="Explain the challenges of Buzz Gelathis during execution of her role" onChange={(event) =>handleprerequisites('check_which_ones_the_gf_did_not_do', event)}/>
            <FormControlLabel control={<Checkbox  />} label="Explain the ambition of Buzz Gelathis" value="Explain the ambition of Buzz Gelathis" onChange={(event) =>handleprerequisites('check_which_ones_the_gf_did_not_do', event)}/>
            <FormControlLabel control={<Checkbox  />} label="Discuss the expectation of Buzz Gelathis" value="Discuss the expectation of Buzz Gelathis" onChange={(event) =>handleprerequisites('check_which_ones_the_gf_did_not_do', event)}/>
            <FormControlLabel control={<Checkbox  />} label="Explain the Spoorthi fellowship training" value="Explain the Spoorthi fellowship training" onChange={(event) =>handleprerequisites('check_which_ones_the_gf_did_not_do', event)}/>
            <FormControlLabel control={<Checkbox  />} label="Explain about Beehive initiative meeting" value="Explain about Beehive initiative meeting" onChange={(event) =>handleprerequisites('check_which_ones_the_gf_did_not_do', event)}/>
            <FormControlLabel control={<Checkbox  />} label="Explain about Buzz Green programme" value="Explain about Buzz Green programme" onChange={(event) =>handleprerequisites('check_which_ones_the_gf_did_not_do', event)}/>
            <FormControlLabel control={<Checkbox  />} label="Explain about the Buzz Vyapar programme" value="Explain about the Buzz Vyapar programme" onChange={(event) =>handleprerequisites('check_which_ones_the_gf_did_not_do', event)}/>
            <FormControlLabel control={<Checkbox  />} label="Share the mobile number" value="Share the mobile number" onChange={(event) =>handleprerequisites('check_which_ones_the_gf_did_not_do', event)}/>
            <FormControlLabel control={<Checkbox  />} label="Get the sign, group photo and vote of thanks" value="Get the sign, group photo and vote of thanks" onChange={(event) =>handleprerequisites('check_which_ones_the_gf_did_not_do', event)}/>
    </FormGroup>
        </CardContent>
          </Card>
      
        </CardContent>
        </Grid>:null}
        
              {/* 4 */}
     { ( assessmentType=='Spoorthi Module 1' )?   <Grid  backgroundColor={"#FFD580"}>
          
        <CardContent>
          <Card>
          <Card sx = {{backgroundColor:'#ff7424'}} mt={2}>
          <CardContent>
          <Typography variant = 'h5'>Spoorthi-1</Typography>
          </CardContent>
        </Card>
        <CardContent>
          <Typography >
          Check which ones the Field Associate did NOT do
          {check_which_ones_the_gf_did_not_doError ? (
                          <FormHelperText style={{ color: 'red' }}>{helperText}</FormHelperText>
                        ) : null}{' '}
          </Typography>
          <FormGroup>
            <FormControlLabel control={<Checkbox  />} label="Spoorthi Song" value="Spoorthi Song" onChange={(event) =>handleprerequisites('check_which_ones_the_gf_did_not_do', event)}/>
            <FormControlLabel control={<Checkbox  />} label="Set the ground rules" value="Set the ground rules" onChange={(event) =>handleprerequisites('check_which_ones_the_gf_did_not_do', event)}/>
            <FormControlLabel control={<Checkbox  />} label="Introduction of GF and Gelathi" value="Introduction of GF and Gelathi" onChange={(event) =>handleprerequisites('check_which_ones_the_gf_did_not_do', event)}/>
            <FormControlLabel control={<Checkbox  />} label="Explain the objective of the Spoorthi Training" value="Explain the objective of the Spoorthi Training" onChange={(event) =>handleprerequisites('check_which_ones_the_gf_did_not_do', event)}/>
            <FormControlLabel control={<Checkbox  />} label="Explain the duration of Spoorthi Fellowship" value="Explain the duration of Spoorthi Fellowship" onChange={(event) =>handleprerequisites('check_which_ones_the_gf_did_not_do', event)}/>
            <FormControlLabel control={<Checkbox  />} label="Visualization of Tree activity" value="Visualization of Tree activity" onChange={(event) =>handleprerequisites('check_which_ones_the_gf_did_not_do', event)}/>
            <FormControlLabel control={<Checkbox  />} label="Debrief of Visualization of Tree activity" value="Debrief of Visualization of Tree activity"  onChange={(event) =>handleprerequisites('check_which_ones_the_gf_did_not_do', event)}/>
            <FormControlLabel control={<Checkbox  />} label="List down about the Gelathi's skills and shared in pair" value="List down about the Gelathi's skills and shared in pair" onChange={(event) =>handleprerequisites('check_which_ones_the_gf_did_not_do', event)}/>
            <FormControlLabel control={<Checkbox  />} label="List down about the Gelathi's challenges and shared in pair" value="List down about the Gelathi's challenges and shared in pair" onChange={(event) =>handleprerequisites('check_which_ones_the_gf_did_not_do', event)}/>
            <FormControlLabel control={<Checkbox  />} label="List down about the Gelathi's resources and shared in pair" value="List down about the Gelathi's resources and shared in pair" onChange={(event) =>handleprerequisites('check_which_ones_the_gf_did_not_do', event)}/>
            <FormControlLabel control={<Checkbox  />} label="Share in pair how they resolve the challenges by using their own skills and resources" value="Share in pair how they resolve the challenges by using their own skills and resources" onChange={(event) =>handleprerequisites('check_which_ones_the_gf_did_not_do', event)}/>
            <FormControlLabel control={<Checkbox  />} label="Given name for Spoorthi-1" value="Given name for Spoorthi-1" onChange={(event) =>handleprerequisites('check_which_ones_the_gf_did_not_do', event)}/>
            <FormControlLabel control={<Checkbox  />} label="Feedback done" value="Feedback done" onChange={(event) =>handleprerequisites('check_which_ones_the_gf_did_not_do', event)}/>
    </FormGroup>
        </CardContent>
          </Card>
      
        </CardContent>
        </Grid>:null}
       
       {/* 5 */}
      { ( assessmentType=='Spoorthi Module 2' )? 
          <div>
                  <Grid  backgroundColor={"#FFD580"}>
          {/* page-5 */}
        <CardContent>
          <Card>
          <Card sx = {{backgroundColor:'#ff7424'}} mt={2}>
          <CardContent>
          <Typography variant = 'h5'>Spoorthi-2</Typography>
          </CardContent>
        </Card>
        <CardContent>
          <Typography >
          Check which ones the Field Associate did NOT do
          {check_which_ones_the_gf_did_not_doError ? (
                          <FormHelperText style={{ color: 'red' }}>{helperText}</FormHelperText>
                        ) : null}{' '}
          </Typography>
          <FormGroup>
            <FormControlLabel control={<Checkbox  />} label="Spoorthi Song"  value="Spoorthi Song" onChange={(event) =>handleprerequisites('check_which_ones_the_gf_did_not_do', event)}/>
            <FormControlLabel control={<Checkbox  />} label="Recap Of Spoorthi-1"  value="Recap Of Spoorthi-1" onChange={(event) =>handleprerequisites('check_which_ones_the_gf_did_not_do', event)}/>
            <FormControlLabel control={<Checkbox  />} label="Paper cutting activity with instructions" value="Paper cutting activity with instruction"  onChange={(event) =>handleprerequisites('check_which_ones_the_gf_did_not_do', event)}/>
            <FormControlLabel control={<Checkbox  />} label="Debrief on the paper cutting activity" value="Debrief on the paper cutting activity"  onChange={(event) =>handleprerequisites('check_which_ones_the_gf_did_not_do', event)}/>
            <FormControlLabel control={<Checkbox  />} label="Magic stick activity about the active listening" value="Magic stick activity about the active listening"  onChange={(event) =>handleprerequisites('check_which_ones_the_gf_did_not_do', event)}/>
            <FormControlLabel control={<Checkbox  />} label="Debrief the magic stick activity" value="Debrief the magic stick activity"  onChange={(event) =>handleprerequisites('check_which_ones_the_gf_did_not_do', event)}/>
            <FormControlLabel control={<Checkbox  />} label="List down points about active listening" value="List down points about active listening"  onChange={(event) =>handleprerequisites('check_which_ones_the_gf_did_not_do', event)}/>
            <FormControlLabel control={<Checkbox  />} label="Debrief the active listening activity" value="Debrief the active listening activity"  onChange={(event) =>handleprerequisites('check_which_ones_the_gf_did_not_do', event)}/>
            <FormControlLabel control={<Checkbox  />} label="Discuss about the Gelathi tool kit" value="Discuss about the Gelathi tool kit"  onChange={(event) =>handleprerequisites('check_which_ones_the_gf_did_not_do', event)}/>
            {/* <FormControlLabel control={<Checkbox  />} label=" Discussion about the borewell activity" value="Discussion about the borewell activity"  onChange={(event) =>handleprerequisites('check_which_ones_the_gf_did_not_do', event)}/> */}
            <FormControlLabel control={<Checkbox  />} label="Given name for Spoorthi-2" value="Given name for Spoorthi-2"  onChange={(event) =>handleprerequisites('check_which_ones_the_gf_did_not_do', event)}/>
            <FormControlLabel control={<Checkbox  />} label="Feedback done" value="Feedback done" onChange={(event) =>handleprerequisites('check_which_ones_the_gf_did_not_do', event)}/>
            
            
    </FormGroup>
        </CardContent>
          </Card>
      
        </CardContent>
        </Grid>
        <br/>
          </div>
        :null  }      
        
          {/* 6 */}
         {( assessmentType=='Spoorthi Module 3' )?  <Grid  backgroundColor={"#FFD580"}>
          {/* page-6 */}
        <CardContent>
          <Card>
          <Card sx = {{backgroundColor:'#ff7424'}} mt={2}>
          <CardContent>
          <Typography variant = 'h5'>Spoorthi-3</Typography>
          </CardContent>
        </Card>
        <CardContent>
          <Typography >
          Check which ones the Field Associate did NOT do
          {check_which_ones_the_gf_did_not_doError ? (
                          <FormHelperText style={{ color: 'red' }}>{helperText}</FormHelperText>
                        ) : null}{' '}
          </Typography>
          <FormGroup>
         
            <FormControlLabel control={<Checkbox  />} label="Spoorthi song" value="Spoorthi song" onChange={(event) =>handleprerequisites('check_which_ones_the_gf_did_not_do', event)}/>
            <FormControlLabel control={<Checkbox  />} label="Recap of Spoorthi-2" value="Recap of Spoorthi-2" onChange={(event) =>handleprerequisites('check_which_ones_the_gf_did_not_do', event)}/>
            <FormControlLabel control={<Checkbox  />} label="The hand drawing activity" value="The hand drawing activity" onChange={(event) =>handleprerequisites('check_which_ones_the_gf_did_not_do', event)}/>
            <FormControlLabel control={<Checkbox  />} label="Presentation of the hand drawing activity" value="Presentation of the hand drawing activity"  onChange={(event) =>handleprerequisites('check_which_ones_the_gf_did_not_do', event)}/>
            <FormControlLabel control={<Checkbox  />} label="Debrief on the hand drawing activity" value="Debrief on the hand drawing activity" onChange={(event) =>handleprerequisites('check_which_ones_the_gf_did_not_do', event)}/>
            <FormControlLabel control={<Checkbox  />} label="List down elements of human growth" value="List down elements of human growth" onChange={(event) =>handleprerequisites('check_which_ones_the_gf_did_not_do', event)}/>
            <FormControlLabel control={<Checkbox  />} label="Model village drawing done by Gelathis" value="Model village drawing done by Gelathis" onChange={(event) =>handleprerequisites('check_which_ones_the_gf_did_not_do', event)}/>
            <FormControlLabel control={<Checkbox  />} label="Presentation done by 2 Gelathis of model village drawing" value="Presentation done by 2 Gelathis of model village drawing" onChange={(event) =>handleprerequisites('check_which_ones_the_gf_did_not_do', event)}/>
            <FormControlLabel control={<Checkbox  />} label="Discuss what elements do they want to make their village become model village" value="Discuss what elements do they want to make their village become model village" onChange={(event) =>handleprerequisites('check_which_ones_the_gf_did_not_do', event)}/>
            <FormControlLabel control={<Checkbox  />} label="Discuss as a  pair what they should do first to make their village as a model village?" value="Discuss as a  pair what they should do first to make their village as a model village?" onChange={(event) =>handleprerequisites('check_which_ones_the_gf_did_not_do', event)}/>
            <FormControlLabel control={<Checkbox  />} label="Debrief about the model village" value="Debrief about the model village" onChange={(event) =>handleprerequisites('check_which_ones_the_gf_did_not_do', event)}/>
            <FormControlLabel control={<Checkbox  />} label="Given name for spoorthi-3" value="Given name for spoorthi-3" onChange={(event) =>handleprerequisites('check_which_ones_the_gf_did_not_do', event)}/>
            <FormControlLabel control={<Checkbox  />} label="Feedback" value="Feedback" onChange={(event) =>handleprerequisites('check_which_ones_the_gf_did_not_do', event)}/>
    </FormGroup>
        </CardContent>
          </Card>
      
        </CardContent>
          </Grid>:null}
           {/* 7 */}
         { ( assessmentType=='Spoorthi Module 4' )?  <Grid  backgroundColor={"#FFD580"}>
          {/* page-7 */}
        <CardContent>
          <Card>
          <Card sx = {{backgroundColor:'#ff7424'}} mt={2}>
          <CardContent>
          <Typography variant = 'h5'>Spoorthi-4</Typography>
          </CardContent>
        </Card>
        <CardContent>
          <Typography >
          Check which ones the Field Associate did NOT do
          {check_which_ones_the_gf_did_not_doError ? (
                          <FormHelperText style={{ color: 'red' }}>{helperText}</FormHelperText>
                        ) : null}{' '}
          </Typography>
          <FormGroup>
            <FormControlLabel control={<Checkbox  />} label="Spoorthi Song" value="Spoorthi Song"onChange={(event) =>handleprerequisites('check_which_ones_the_gf_did_not_do', event)}/>
            <FormControlLabel control={<Checkbox  />} label="Recap of Spoorthi-3" value="Recap of Spoorthi-3"onChange={(event) =>handleprerequisites('check_which_ones_the_gf_did_not_do', event)}/>
            <FormControlLabel control={<Checkbox  />} label="Ask if any interesting things that have happened in your village or there any challenges" value="Ask if any interesting things that have happened in your village or there any challenges" onChange={(event) =>handleprerequisites('check_which_ones_the_gf_did_not_do', event)}/>
            <FormControlLabel control={<Checkbox  />} label="Did role play-1 with pair?" value="Did role play-1 with pair?"onChange={(event) =>handleprerequisites('check_which_ones_the_gf_did_not_do', event)}/>
            <FormControlLabel control={<Checkbox  />} label="Did debrief for role play-1?" value="Did debrief for role play-1?" onChange={(event) =>handleprerequisites('check_which_ones_the_gf_did_not_do', event)}/>
            <FormControlLabel control={<Checkbox  />} label="Did role play-2 with pair?" value="Did role play-2 with pair?" onChange={(event) =>handleprerequisites('check_which_ones_the_gf_did_not_do', event)}/>
            <FormControlLabel control={<Checkbox  />} label="Did debrief for role play-2?" value="Did debrief for role play-2?"onChange={(event) =>handleprerequisites('check_which_ones_the_gf_did_not_do', event)}/>
            <FormControlLabel control={<Checkbox  />} label="Did role play-3 with pair?" value="Did role play-3 with pair?"/>
            <FormControlLabel control={<Checkbox  />} label="Did debrief for role play-3?" value="Did debrief for role play-3?" onChange={(event) =>handleprerequisites('check_which_ones_the_gf_did_not_do', event)}/>
            <FormControlLabel control={<Checkbox  />} label="List down the dos and don'ts when reaching the community"  value="List down the dos and don'ts when reaching the community"onChange={(event) =>handleprerequisites('check_which_ones_the_gf_did_not_do', event)}/>
            <FormControlLabel control={<Checkbox  />} label="Debrief about the do's and don'ts" value="Debrief about the do's and don'ts"onChange={(event) =>handleprerequisites('check_which_ones_the_gf_did_not_do', event)}/>
            <FormControlLabel control={<Checkbox  />} label="Given name for spoorthi-4" value="Given name for spoorthi-4"onChange={(event) =>handleprerequisites('check_which_ones_the_gf_did_not_do', event)}/>
            <FormControlLabel control={<Checkbox  />} label="Feedback" value="Feedback"onChange={(event) =>handleprerequisites('check_which_ones_the_gf_did_not_do', event)}/>
    </FormGroup>
        </CardContent>
          </Card>
      
        </CardContent>
        </Grid>:null}
        
        {   ( assessmentType=='Green Module 1' )?  <Grid backgroundColor={"#FFD580"}> 
        <CardContent>
          {/* page-40 */}
          <Card>
          <Card sx = {{backgroundColor:'#ff7424'}} mt={2}>
          <CardContent>
          <Typography variant = 'h5'>Green Module 1:</Typography>
          </CardContent>
        </Card>
        <CardContent>
          <Typography >
          Check which ones the Field Associate did not do
          {check_which_ones_the_gf_did_not_doError ? (
                          <FormHelperText style={{ color: 'red' }}>{helperText}</FormHelperText>
                        ) : null}{' '}
          </Typography>
          <FormGroup>
      <FormControlLabel control={<Checkbox  />} label="Introduction of GF and Green Motivators" value={'Introduction of GF and Green Motivators'}  onChange={(event) =>handleprerequisites('check_which_ones_the_gf_did_not_do', event)}/>
      <FormControlLabel control={<Checkbox  />} label="Welcome the participants" value={'Welcome the participants'} onChange={(event) =>handleprerequisites('check_which_ones_the_gf_did_not_do', event)}/>
      <FormControlLabel control={<Checkbox  />} label="List down the natural resources found in the visualization" value={'List down the natural resources found in the visualization'} onChange={(event) =>handleprerequisites('check_which_ones_the_gf_did_not_do', event)}/>
      <FormControlLabel control={<Checkbox  />} label="Ask how is Climate now?" value={'Ask how  Climate now'} onChange={(event) =>handleprerequisites('check_which_ones_the_gf_did_not_do', event)}/>
      <FormControlLabel control={<Checkbox  />} label="Duration of Green Training" value={'Duration of Green Training'} onChange={(event) =>handleprerequisites('check_which_ones_the_gf_did_not_do', event)}/>
      <FormControlLabel control={<Checkbox  />} label="List down the points from the video" value={'List down the points from the video'} onChange={(event) =>handleprerequisites('check_which_ones_the_gf_did_not_do', event)}/>
      <FormControlLabel control={<Checkbox  />} label="Present that weather severity table" value={'Present that weather severity table'} onChange={(event) =>handleprerequisites('check_which_ones_the_gf_did_not_do', event)}/>
      <FormControlLabel control={<Checkbox  />} label="Gave feedback to GF and GM" value={'Gave feedback to GF and GM'} onChange={(event) =>handleprerequisites('check_which_ones_the_gf_did_not_do', event)}/>
      <FormControlLabel control={<Checkbox  />} label="Discuss with three questions after weather severity table" value={'Discuss with three questions after weather severity table'} onChange={(event) =>handleprerequisites('check_which_ones_the_gf_did_not_do', event)}/>
      <FormControlLabel control={<Checkbox  />} label=" Set the ground rules" value={'Set the ground rules'} onChange={(event) =>handleprerequisites('check_which_ones_the_gf_did_not_do', event)}/>
      <FormControlLabel control={<Checkbox  />} label="Visualization about the natural resources" value={'Visualization about the natural resources'} onChange={(event) =>handleprerequisites('check_which_ones_the_gf_did_not_do', event)}/>
      <FormControlLabel control={<Checkbox  />} label="Explain the objectives of the Green Training" value={'Explain the objectives of the Green Training'} onChange={(event) =>handleprerequisites('check_which_ones_the_gf_did_not_do', event)}/>
      <FormControlLabel control={<Checkbox  />} label="Play the climate change video" value={'Play the climate change video'} onChange={(event) =>handleprerequisites('check_which_ones_the_gf_did_not_do', event)}/>
      <FormControlLabel control={<Checkbox  />} label="Provided and discussed homework" value={'Provided and discussed homework'} onChange={(event) =>handleprerequisites('check_which_ones_the_gf_did_not_do', event)}/>
      <FormControlLabel control={<Checkbox  />} label=" Green Song" value={'Green Song'} onChange={(event) =>handleprerequisites('check_which_ones_the_gf_did_not_do', event)}/>
      <FormControlLabel control={<Checkbox  />} label=" Survey of 3 green motivators" value={'Survey of 3 green motivatorsGreen Song'} onChange={(event) =>handleprerequisites('check_which_ones_the_gf_did_not_do', event)}/>
    </FormGroup>
        </CardContent>
          </Card>
      
        </CardContent>
        </Grid>:null}
        {    ( assessmentType=='Green Module 2' )?     <Grid  backgroundColor={'#FFD580'}>
          {/* page-41 */}
        <CardContent>
          <Card>
          <Card sx = {{backgroundColor:'#ff7424'}} mt={2}>
          <CardContent>
          <Typography variant = 'h5'>Green Module 2:</Typography>
          </CardContent>
        </Card>
        <CardContent>
          <Typography >
          Check which ones the Gelati Facilitator  did not do
          {check_which_ones_the_gf_did_not_doError ? (
                          <FormHelperText style={{ color: 'red' }}>{helperText}</FormHelperText>
                        ) : null}{' '}
          </Typography>
          <FormGroup>
         
            <FormControlLabel control={<Checkbox  />} label="Welcome the participants" value={'Welcome the participants'}onChange={(event) =>handleprerequisites('check_which_ones_the_gf_did_not_do', event)}/>
            <FormControlLabel control={<Checkbox  />} label="Sang the green Song" value={'Sang the green Song'}onChange={(event) =>handleprerequisites('check_which_ones_the_gf_did_not_do', event)}/>
            <FormControlLabel control={<Checkbox  />} label="Recap of Day 1" value={'Recap of Day 1'}onChange={(event) =>handleprerequisites('check_which_ones_the_gf_did_not_do', event)}/>
            <FormControlLabel control={<Checkbox  />} label="Homework check" value={'Homework check'} onChange={(event) =>handleprerequisites('check_which_ones_the_gf_did_not_do', event)}/>
            <FormControlLabel control={<Checkbox  />} label=" Discuss about water" value={'Discuss about water'}onChange={(event) =>handleprerequisites('check_which_ones_the_gf_did_not_do', event)}/>
            <FormControlLabel control={<Checkbox  />} label="List down the points about source and usage of water" value={'List down the points about source and usage of water'}onChange={(event) =>handleprerequisites('check_which_ones_the_gf_did_not_do', event)}/>
            <FormControlLabel control={<Checkbox  />} label="Provided feedback to GF and GM" value={'Provided feedback to GF and GM'}onChange={(event) =>handleprerequisites('check_which_ones_the_gf_did_not_do', event)}/>
            <FormControlLabel control={<Checkbox  />} label="Completed and discussed homework" value={'Completed and discussed homework'}onChange={(event) =>handleprerequisites('check_which_ones_the_gf_did_not_do', event)}/>
            <FormControlLabel control={<Checkbox  />} label="Explain the water cycle activity" value={'Explain the water cycle activity'}onChange={(event) =>handleprerequisites('check_which_ones_the_gf_did_not_do', event)}/>
            <FormControlLabel control={<Checkbox  />} label="Borewell activity in 2 groups" value={'Borewell activity in 2 groups'}onChange={(event) =>handleprerequisites('check_which_ones_the_gf_did_not_do', event)}/>
            <FormControlLabel control={<Checkbox  />} label=" Discussion about the borewell activity" value={'Discussion about the borewell activity'}onChange={(event) =>handleprerequisites('check_which_ones_the_gf_did_not_do', event)}/>
            <FormControlLabel control={<Checkbox  />} label="Play the two videos regarding water"value={'Play the two videos regarding water'} onChange={(event) =>handleprerequisites('check_which_ones_the_gf_did_not_do', event)}/>
            <FormControlLabel control={<Checkbox  />} label=" Discuss about the videos" value={'Discuss about the videos'}onChange={(event) =>handleprerequisites('check_which_ones_the_gf_did_not_do', event)}/>
            <FormControlLabel control={<Checkbox  />} label="Explain the 3 principals of save water" value={'Explain the 3 principals of save water'}onChange={(event) =>handleprerequisites('check_which_ones_the_gf_did_not_do', event)}/>
    </FormGroup>
        </CardContent>
          </Card>
      
        </CardContent>
        </Grid>:null}
       {( assessmentType=='Green Module 3' )?  <Grid  backgroundColor={"#FFD580"}>
          {/* page-42 */}
        <CardContent>
          <Card>
          <Card sx = {{backgroundColor:'#ff7424'}} mt={2}>
          <CardContent>
          <Typography variant = 'h5'>Green Module 3:</Typography>
          </CardContent>
        </Card>
        <CardContent>
          <Typography >
          Check which ones Gelati facilitator did not do
          {check_which_ones_the_gf_did_not_doError ? (
                          <FormHelperText style={{ color: 'red' }}>{helperText}</FormHelperText>
                        ) : null}{' '}
    </Typography>
          <FormGroup>
            <FormControlLabel control={<Checkbox  />} label="Welcome the participants" value={'Welcome the participants'}onChange={(event) =>handleprerequisites('check_which_ones_the_gf_did_not_do', event)} />
            <FormControlLabel control={<Checkbox  />} label="Sing the green Song" value={'Sing the green Song'}onChange={(event) =>handleprerequisites('check_which_ones_the_gf_did_not_do', event)}/>
            <FormControlLabel control={<Checkbox  />} label="Recap of Day 2" value={'Recap of Day 2'}onChange={(event) =>handleprerequisites('check_which_ones_the_gf_did_not_do', event)}/>
            <FormControlLabel control={<Checkbox  />} label="Checking the homework" value={'Checking the homework'}onChange={(event) =>handleprerequisites('check_which_ones_the_gf_did_not_do', event)}/>
            <FormControlLabel control={<Checkbox  />} label=" Discuss about the Earth" value={'Discuss about the Earth'}onChange={(event) =>handleprerequisites('check_which_ones_the_gf_did_not_do', event)}/>
            <FormControlLabel control={<Checkbox  />} label=" Tree picture drawing" value={'Tree picture drawing'}onChange={(event) =>handleprerequisites('check_which_ones_the_gf_did_not_do', event)}/>
            <FormControlLabel control={<Checkbox  />} label=" Tree picture presentation by participants" value={'Tree picture presentation by participants'}onChange={(event) =>handleprerequisites('check_which_ones_the_gf_did_not_do', event)}/>
            <FormControlLabel control={<Checkbox  />} label="Explain the importance of Honeybee" value={'Explain the importance of Honeybee'}onChange={(event) =>handleprerequisites('check_which_ones_the_gf_did_not_do', event)}/>
            <FormControlLabel control={<Checkbox  />} label="Explain the importance of Birds" value={'Explain the importance of Birds'}onChange={(event) =>handleprerequisites('check_which_ones_the_gf_did_not_do', event)}/>
            <FormControlLabel control={<Checkbox  />} label="Explain about seed propagation" value={'Explain about seed propagation'}onChange={(event) =>handleprerequisites('check_which_ones_the_gf_did_not_do', event)}/>
            <FormControlLabel control={<Checkbox  />} label=" Discuss the difference between present and past food" value={'Discuss the difference between present and past food'}onChange={(event) =>handleprerequisites('check_which_ones_the_gf_did_not_do', event)}/>
            <FormControlLabel control={<Checkbox  />} label="Explain the importance of kitchen garden" value={'Explain the importance of kitchen garden'}onChange={(event) =>handleprerequisites('check_which_ones_the_gf_did_not_do', event)}/>
            <FormControlLabel control={<Checkbox  />} label=" Read and explain the case study" value={'Read and explain the case study'}onChange={(event) =>handleprerequisites('check_which_ones_the_gf_did_not_do', event)}/>
            <FormControlLabel control={<Checkbox  />} label="Discuss about the case study" value={'Discuss about the case study'}onChange={(event) =>handleprerequisites('check_which_ones_the_gf_did_not_do', event)}/>
            <FormControlLabel control={<Checkbox  />} label="Discuss about the solution to protect earth" value={'Discuss about the solution to protect earth'}onChange={(event) =>handleprerequisites('check_which_ones_the_gf_did_not_do', event)}/>
            <FormControlLabel control={<Checkbox  />} label="Provide feedback GF and GM" value={'Provide feedback GF and GM'}onChange={(event) =>handleprerequisites('check_which_ones_the_gf_did_not_do', event)}/>
            <FormControlLabel control={<Checkbox  />} label="Homework" value={'Homework'}onChange={(event) =>handleprerequisites('check_which_ones_the_gf_did_not_do', event)}/>
            
            
    </FormGroup>
        </CardContent>
          </Card>
      
        </CardContent>
        </Grid>:null}
      { ( assessmentType=='Green Module 4' )? <Grid  backgroundColor={"#FFD580"}>
          {/* page-43 */}
        <CardContent>
          <Card>
          <Card sx = {{backgroundColor:'#ff7424'}} mt={2}>
          <CardContent>
          <Typography variant = 'h5'>Green Module 4</Typography>
          </CardContent>
        </Card>
        <CardContent>
          <Typography >
          Check which ones Gelati Facilitator did not do
          {check_which_ones_the_gf_did_not_doError ? (
                          <FormHelperText style={{ color: 'red' }}>{helperText}</FormHelperText>
                        ) : null}{' '}
          </Typography>
          <FormGroup>
           
        <FormControlLabel control={<Checkbox  />} label="Welcome" value={'Welcome'}onChange={(event) =>handleprerequisites('check_which_ones_the_gf_did_not_do', event)}/>
        <FormControlLabel control={<Checkbox  />} label="Green Song" value={'Green Song'}onChange={(event) =>handleprerequisites('check_which_ones_the_gf_did_not_do', event)}/>
        <FormControlLabel control={<Checkbox  />} label="Recap of Day-3" value={'Recap of Day-3'}onChange={(event) =>handleprerequisites('check_which_ones_the_gf_did_not_do', event)}/>
        <FormControlLabel control={<Checkbox  />} label="Checking the Homework" value={'Checking the Homework'}onChange={(event) =>handleprerequisites('check_which_ones_the_gf_did_not_do', event)}/>
        <FormControlLabel control={<Checkbox  />} label="Explain the pollution and it types" value={'Explain the pollution and it types'}onChange={(event) =>handleprerequisites('check_which_ones_the_gf_did_not_do', event)}/>
        <FormControlLabel control={<Checkbox  />} label="Discuss about pollution and nonpollution activity in groups" value={'Discuss about pollution and nonpollution activity in groups'}onChange={(event) =>handleprerequisites('check_which_ones_the_gf_did_not_do', event)}/>
        <FormControlLabel control={<Checkbox  />} label="List down the day to day usage things" value={'List down the day to day usage things'}onChange={(event) =>handleprerequisites('check_which_ones_the_gf_did_not_do', event)}/>
        <FormControlLabel control={<Checkbox  />} label="List down which are the natural resources polluting, reasons & impact"value={'List down which are the natural resources polluting, reasons & impact'} onChange={(event) =>handleprerequisites('check_which_ones_the_gf_did_not_do', event)}/>
        <FormControlLabel control={<Checkbox  />} label="Debrief about pollution and usage" value={'Debrief about pollution and usage'}onChange={(event) =>handleprerequisites('check_which_ones_the_gf_did_not_do', event)}/>
        <FormControlLabel control={<Checkbox  />} label="Feedback GF and GM" value={'Feedback GF and GM'}onChange={(event) =>handleprerequisites('check_which_ones_the_gf_did_not_do', event)}/>
        <FormControlLabel control={<Checkbox  />} label="Homework" value={'Homework'}onChange={(event) =>handleprerequisites('check_which_ones_the_gf_did_not_do', event)}/>
            
    </FormGroup>
        </CardContent>
          </Card>
      
        </CardContent>
        </Grid>:null}
       { ( assessmentType=='Green Module 5' )?<Grid  backgroundColor={"#FFD580"}>
          {/* page-44 */}
        <CardContent>
          <Card>
          <Card sx = {{backgroundColor:'#ff7424'}} mt={2}>
          <CardContent>
          <Typography variant = 'h5'>Green Module 5</Typography>
          </CardContent>
        </Card>
        <CardContent>
          <Typography >
          Check which one Gelati Facilitator Did NOT do
          {check_which_ones_the_gf_did_not_doError ? (
                          <FormHelperText style={{ color: 'red' }}>{helperText}</FormHelperText>
                        ) : null}{' '}
          </Typography>
          <FormGroup>
           
          <FormControlLabel control={<Checkbox  />} label="Welcome" value={'Welcome'}onChange={(event) =>handleprerequisites('check_which_ones_the_gf_did_not_do', event)} />
        <FormControlLabel control={<Checkbox  />} label="Green song" value={'Green song'}onChange={(event) =>handleprerequisites('check_which_ones_the_gf_did_not_do', event)}/>
        <FormControlLabel control={<Checkbox  />} label="Recap of Day 4" value={'Recap of Day 4'}onChange={(event) =>handleprerequisites('check_which_ones_the_gf_did_not_do', event)}/>
        <FormControlLabel control={<Checkbox  />} label="Discussion about 3 principles of pollution and usage" value={'Discussion about 3 principles of pollution and usage'}onChange={(event) =>handleprerequisites('check_which_ones_the_gf_did_not_do', event)}/>
        <FormControlLabel control={<Checkbox  />} label="List out of which things are polluting the environment" value={'List out of which things are polluting the environment'}onChange={(event) =>handleprerequisites('check_which_ones_the_gf_did_not_do', event)}/>
        <FormControlLabel control={<Checkbox  />} label="Discussion about 3 principles of prevention of environmental damage" value={'Discussion about 3 principles of prevention of environmental damage'}onChange={(event) =>handleprerequisites('check_which_ones_the_gf_did_not_do', event)}/>
        <FormControlLabel control={<Checkbox  />} label="List the steps that can be taken to conserve water, By 1 week,1 month, 1 year" value={'List the steps that can be taken to conserve water, By 1 week,1 month, 1 year'}onChange={(event) =>handleprerequisites('check_which_ones_the_gf_did_not_do', event)}/>
        <FormControlLabel control={<Checkbox  />} label="List the steps that can be taken to conserve earth, By 1 week, 1 Month, 1 Year" value={'List the steps that can be taken to conserve earth, By 1 week, 1 Month, 1 Year'}onChange={(event) =>handleprerequisites('check_which_ones_the_gf_did_not_do', event)}/>
        <FormControlLabel control={<Checkbox  />} label="Green village was discussed" value={'Green village was discussed'}onChange={(event) =>handleprerequisites('check_which_ones_the_gf_did_not_do', event)} />
        <FormControlLabel control={<Checkbox  />} label="My contacts activity" value={'My contacts activity'}onChange={(event) =>handleprerequisites('check_which_ones_the_gf_did_not_do', event)}/>
        <FormControlLabel control={<Checkbox  />} label="List/draw the natural resources in their village" value={'List/draw the natural resources in their village'}onChange={(event) =>handleprerequisites('check_which_ones_the_gf_did_not_do', event)}/>
        <FormControlLabel control={<Checkbox  />} label="Discuss the importance of forest, Lake, & Gomalas" value={'Discuss the importance of forest, Lake, & Gomalas'}onChange={(event) =>handleprerequisites('check_which_ones_the_gf_did_not_do', event)}/>
        <FormControlLabel control={<Checkbox  />} label="Discuss the elements required for restoration of natural resources" value={'Discuss the elements required for restoration of natural resources'}onChange={(event) =>handleprerequisites('check_which_ones_the_gf_did_not_do', event)}/>
        <FormControlLabel control={<Checkbox  />} label="Feedback GF and GM" value={'Feedback GF and GM'}onChange={(event) =>handleprerequisites('check_which_ones_the_gf_did_not_do', event)}/>
        <FormControlLabel control={<Checkbox  />} label="Distribution of Certificates" value={'Distribution of Certificates'}onChange={(event) =>handleprerequisites('check_which_ones_the_gf_did_not_do', event)}/>
            
    </FormGroup>
        </CardContent>
          </Card>
      
        </CardContent>
        </Grid>:null}
       {( assessmentType=='Vyapar Module 1' )? <Grid  backgroundColor={"#FFD580"}>
         
         <CardContent>
           <Card>
           <Card sx = {{backgroundColor:'#ff7424'}} mt={2}>
           <CardContent>
           <Typography variant = 'h5'>Vyapar Training  1</Typography>
           </CardContent>
         </Card>
         <CardContent>
         <Stack mt={2}>
         <Stack>
                 <Typography variant="body1">
                 Check which ones the Field Associate did not do
                 {check_which_ones_the_gf_did_not_doError ? (
                          <FormHelperText style={{ color: 'red' }}>{helperText}</FormHelperText>
                        ) : null}{' '}
                 </Typography>
                 <Stack mt={2}>
                 <FormGroup>
             <FormControlLabel control={<Checkbox  />} label="Welcome"value={'Welcome'}onChange={(event) =>handleprerequisites('check_which_ones_the_gf_did_not_do', event)} />
             <FormControlLabel control={<Checkbox  />} label="Set the Ground rules" value={'Set the Ground rules'}onChange={(event) =>handleprerequisites('check_which_ones_the_gf_did_not_do', event)}/>
             <FormControlLabel control={<Checkbox  />} label="Explain the objectives of Vyapar training" value={'WelcExplain the objectives of Vyapar trainingome'}onChange={(event) =>handleprerequisites('check_which_ones_the_gf_did_not_do', event)}/>
             <FormControlLabel control={<Checkbox  />} label="Duration of the Training" value={'Duration of the Training'}onChange={(event) =>handleprerequisites('check_which_ones_the_gf_did_not_do', event)}/>
             <FormControlLabel control={<Checkbox  />} label="Self Shakthi Training discussion" value={'Self Shakthi Training discussion'}onChange={(event) =>handleprerequisites('check_which_ones_the_gf_did_not_do', event)}/>
             <FormControlLabel control={<Checkbox  />} label="List the different aspects of business" value={'List the different aspects of business'}onChange={(event) =>handleprerequisites('check_which_ones_the_gf_did_not_do', event)}/>
             <FormControlLabel control={<Checkbox  />} label="what was the reason for starting this business" value={'what was the reason for starting this business'}onChange={(event) =>handleprerequisites('check_which_ones_the_gf_did_not_do', event)}/>
             <FormControlLabel control={<Checkbox  />} label="Geetha Story-balance of vyapar and life" value={'Geetha Story-balance of vyapar and life'}onChange={(event) =>handleprerequisites('check_which_ones_the_gf_did_not_do', event)}/>
             <FormControlLabel control={<Checkbox  />} label="Debrief about the Geetha Story" value={'Debrief about the Geetha Story'}onChange={(event) =>handleprerequisites('check_which_ones_the_gf_did_not_do', event)}/>
             <FormControlLabel control={<Checkbox  />} label="What effects did Geetha’s life on business and vice versa" value={'What effects did Geetha’s life on business and vice versa'}onChange={(event) =>handleprerequisites('check_which_ones_the_gf_did_not_do', event)}/>
             <FormControlLabel control={<Checkbox  />} label="What effects did your life on business and vice versa" value={'What effects did your life on business and vice versa'}onChange={(event) =>handleprerequisites('check_which_ones_the_gf_did_not_do', event)}/>
             <FormControlLabel control={<Checkbox  />} label="Form groups of  three Business women"value={'Form groups of  three Business women'}onChange={(event) =>handleprerequisites('check_which_ones_the_gf_did_not_do', event)} />
             <FormControlLabel control={<Checkbox  />} label="Listed Skills by Vyaparis" value={'Listed Skills by Vyaparis'}onChange={(event) =>handleprerequisites('check_which_ones_the_gf_did_not_do', event)}/>
             <FormControlLabel control={<Checkbox  />} label="Listed Resource by Vyaparis" value={'Listed Resource by Vyaparis'}onChange={(event) =>handleprerequisites('check_which_ones_the_gf_did_not_do', event)}/>
             <FormControlLabel control={<Checkbox  />} label="Repeated challenges by Vyaparis" value={'Repeated challenges by Vyaparis'}onChange={(event) =>handleprerequisites('check_which_ones_the_gf_did_not_do', event)}/>
             <FormControlLabel control={<Checkbox  />} label="Group discussion - how to deal with the challenges" value={'Group discussion - how to deal with the challenges'}onChange={(event) =>handleprerequisites('check_which_ones_the_gf_did_not_do', event)}/>
             <FormControlLabel control={<Checkbox  />} label="Given name for Vyapar-1" value={'Given name for Vyapar-1'}onChange={(event) =>handleprerequisites('check_which_ones_the_gf_did_not_do', event)}/>
             <FormControlLabel control={<Checkbox  />} label="Feedback" value={'Feedback'}onChange={(event) =>handleprerequisites('check_which_ones_the_gf_did_not_do', event)}/>
             <FormControlLabel control={<Checkbox  />} label="Homework" value={'Homework'}onChange={(event) =>handleprerequisites('check_which_ones_the_gf_did_not_do', event)}/>
             <FormControlLabel control={<Checkbox  />} label="Was the pledge made?" value={'Was the pledge made'}onChange={(event) =>handleprerequisites('check_which_ones_the_gf_did_not_do', event)}/>           
     </FormGroup>
                 </Stack>
               </Stack>
               </Stack>
         </CardContent>   </Card>
        
     </CardContent>
         </Grid>:null}
        {( assessmentType=='Vyapar Module 2' )? <Grid  backgroundColor={"#FFD580"}>
         
         <CardContent>
           <Card>
           <Card sx = {{backgroundColor:'#ff7424'}} mt={2}>
           <CardContent>
           <Typography variant = 'h5'>Vyapar Training  2
           </Typography>
           </CardContent>
         </Card>
         <CardContent>
         <Stack mt={2}>
         <Stack>
                 <Typography variant="body1">
                 Check which ones the Facilitators did not do
                 {check_which_ones_the_gf_did_not_doError ? (
                          <FormHelperText style={{ color: 'red' }}>{helperText}</FormHelperText>
                        ) : null}{' '}
                 </Typography>
                 <Stack mt={2}>
                 <FormGroup>
             <FormControlLabel control={<Checkbox  />} label="Welcome" value={'Welcome'}onChange={(event) =>handleprerequisites('check_which_ones_the_gf_did_not_do', event)}/>
             <FormControlLabel control={<Checkbox  />} label="Recap of the 1st Vyapar training" value={'Recap of the 1st Vyapar training'}onChange={(event) =>handleprerequisites('check_which_ones_the_gf_did_not_do', event)}/>
             <FormControlLabel control={<Checkbox  />} label="Ask the question why you are joining here?"value={'Ask the question why you are joining here'}onChange={(event) =>handleprerequisites('check_which_ones_the_gf_did_not_do', event)} />
             <FormControlLabel control={<Checkbox  />} label="Ask about the Self Shakthi day-2 phone question" value={'Ask about the Self Shakthi day-2 phone question'}onChange={(event) =>handleprerequisites('check_which_ones_the_gf_did_not_do', event)}/>
             <FormControlLabel control={<Checkbox  />} label="Business improvement / growth factors listed" value={'Business improvement / growth factors listed'}onChange={(event) =>handleprerequisites('check_which_ones_the_gf_did_not_do', event)}/>
             <FormControlLabel control={<Checkbox  />} label="What type of business are you doing?"value={'What type of business are you doing'}onChange={(event) =>handleprerequisites('check_which_ones_the_gf_did_not_do', event)} />
             <FormControlLabel control={<Checkbox  />} label="What is the Income & formula of income"value={'What is the Income & formula of income'}onChange={(event) =>handleprerequisites('check_which_ones_the_gf_did_not_do', event)} />
             <FormControlLabel control={<Checkbox  />} label="Income and Expenses chart"value={'Income and Expenses chart'}onChange={(event) =>handleprerequisites('check_which_ones_the_gf_did_not_do', event)} />
             <FormControlLabel control={<Checkbox  />} label="Who is your customer?"value={'Who is your customer'}onChange={(event) =>handleprerequisites('check_which_ones_the_gf_did_not_do', event)} />
             <FormControlLabel control={<Checkbox  />} label="Types of Sales" value={'Types of Sales'}onChange={(event) =>handleprerequisites('check_which_ones_the_gf_did_not_do', event)}/>
             <FormControlLabel control={<Checkbox  />} label="Types of Expenses" value={'Types of Expenses'}onChange={(event) =>handleprerequisites('check_which_ones_the_gf_did_not_do', event)}/>
             <FormControlLabel control={<Checkbox  />} label="Formula of Profit" value={'Formula of Profit'}onChange={(event) =>handleprerequisites('check_which_ones_the_gf_did_not_do', event)}/>
             <FormControlLabel control={<Checkbox  />} label="List of the daily expenses and Income chart in the book" value={'List of the daily expenses and Income chart in the book'}onChange={(event) =>handleprerequisites('check_which_ones_the_gf_did_not_do', event)}/>
             <FormControlLabel control={<Checkbox  />} label="Given name for Vyapar-2" value={'Given name for Vyapar-2'}onChange={(event) =>handleprerequisites('check_which_ones_the_gf_did_not_do', event)}/>
             <FormControlLabel control={<Checkbox  />} label="Feedback" value={'Feedback'}onChange={(event) =>handleprerequisites('check_which_ones_the_gf_did_not_do', event)}/>
             <FormControlLabel control={<Checkbox  />} label="Homework" value={'Homework'}onChange={(event) =>handleprerequisites('check_which_ones_the_gf_did_not_do', event)}/>
             <FormControlLabel control={<Checkbox  />} label="Was the pledge made?" value={'Was the pledge made'}onChange={(event) =>handleprerequisites('check_which_ones_the_gf_did_not_do', event)}/>           
     </FormGroup>
                 </Stack>
               </Stack>
               </Stack>
         </CardContent>   </Card>
        
     </CardContent>
         </Grid>:null}
        { ( assessmentType=='Vyapar Module 3' )? <Grid  backgroundColor={"#FFD580"}>
         
         <CardContent>
           <Card>
           <Card sx = {{backgroundColor:'#ff7424'}} mt={2}>
           <CardContent>
           <Typography variant = 'h5'>Vyapar Training 3</Typography>
           </CardContent>
         </Card>
         <CardContent>
         <Stack mt={2}>
         <Stack>
                 <Typography variant="body1">
                 Check which ones the Field Associates did not do
                 {check_which_ones_the_gf_did_not_doError ? (
                          <FormHelperText style={{ color: 'red' }}>{helperText}</FormHelperText>
                        ) : null}{' '}
                 </Typography>
                 <Stack mt={2}>
                 <FormGroup>
             <FormControlLabel control={<Checkbox  />} label="Welcome"  value={'Welcome'}onChange={(event) =>handleprerequisites('check_which_ones_the_gf_did_not_do', event)}/>
             <FormControlLabel control={<Checkbox  />} label="Recap of the 2nd Vyapar training" value={'Recap of the 2nd Vyapar training'}onChange={(event) =>handleprerequisites('check_which_ones_the_gf_did_not_do', event)}/>
             <FormControlLabel control={<Checkbox  />} label="Definition of the problem"value={'Definition of the problem'}onChange={(event) =>handleprerequisites('check_which_ones_the_gf_did_not_do', event)} />
             <FormControlLabel control={<Checkbox  />} label="Temporary solution and permanent solution" value={'Temporary solution and permanent solution'}onChange={(event) =>handleprerequisites('check_which_ones_the_gf_did_not_do', event)}/>
             <FormControlLabel control={<Checkbox  />} label="Explanation of business problem"value={'Explanation of business problem'}onChange={(event) =>handleprerequisites('check_which_ones_the_gf_did_not_do', event)} />
             <FormControlLabel control={<Checkbox  />} label="Temporary solution and permanent solution regarding the business  problem"value={'Temporary solution and permanent solution regarding the business  problem'}onChange={(event) =>handleprerequisites('check_which_ones_the_gf_did_not_do', event)} />
             <FormControlLabel control={<Checkbox  />} label="List down their own business problems" value={'List down their own business problems'}onChange={(event) =>handleprerequisites('check_which_ones_the_gf_did_not_do', event)}/>
             <FormControlLabel control={<Checkbox  />} label="Discuss about the solution in the group"value={'Discuss about the solution in the group'}onChange={(event) =>handleprerequisites('check_which_ones_the_gf_did_not_do', event)} />
             <FormControlLabel control={<Checkbox  />} label="Activity as a tool for coping with risk"value={'Activity as a tool for coping with risk'}onChange={(event) =>handleprerequisites('check_which_ones_the_gf_did_not_do', event)} />
             <FormControlLabel control={<Checkbox  />} label="Debrief about the activity by GF"value={'Debrief about the activity by GF'}onChange={(event) =>handleprerequisites('check_which_ones_the_gf_did_not_do', event)} />
             <FormControlLabel control={<Checkbox  />} label="Given name for Vyapar-3"value={'Given name for Vyapar-3'}onChange={(event) =>handleprerequisites('check_which_ones_the_gf_did_not_do', event)} />
             <FormControlLabel control={<Checkbox  />} label="Feedback" value={'Feedback'}onChange={(event) =>handleprerequisites('check_which_ones_the_gf_did_not_do', event)}/>
             <FormControlLabel control={<Checkbox  />} label="Homework" value={'Homework'}onChange={(event) =>handleprerequisites('check_which_ones_the_gf_did_not_do', event)}/>
             <FormControlLabel control={<Checkbox  />} label="Was the pledge made?" value={'Was the pledge made'}onChange={(event) =>handleprerequisites('check_which_ones_the_gf_did_not_do', event)}/>           
     </FormGroup>
                 </Stack>
               </Stack>
               </Stack>
         </CardContent>   </Card>
        
     </CardContent>
         </Grid>:null}
        { ( assessmentType=='Vyapar Module 4' )? <Grid  backgroundColor={"#FFD580"}>
         
         <CardContent>
           <Card>
           <Card sx = {{backgroundColor:'#ff7424'}} mt={2}>
           <CardContent>
           <Typography variant = 'h5'>Vyapar Training 4</Typography>
           </CardContent>
         </Card>
         <CardContent>
         <Stack mt={2}>
         <Stack>
                 <Typography variant="body1">
                 Check which ones the Field Associates did not do
                 {check_which_ones_the_gf_did_not_doError ? (
                          <FormHelperText style={{ color: 'red' }}>{helperText}</FormHelperText>
                        ) : null}{' '}
                 </Typography>
                 <Stack mt={2}>
                 <FormGroup>
             <FormControlLabel control={<Checkbox  />} label="Welcome" value={'Welcome'}onChange={(event) =>handleprerequisites('check_which_ones_the_gf_did_not_do', event)}/>
             <FormControlLabel control={<Checkbox  />} label="Recap of the 3rd Vyapar training" value={'Recap of the 3rd Vyapar training'}onChange={(event) =>handleprerequisites('check_which_ones_the_gf_did_not_do', event)}/>
             <FormControlLabel control={<Checkbox  />} label="Visualization their business and sharing the experience" value={'Visualization their business and sharing the experience'}onChange={(event) =>handleprerequisites('check_which_ones_the_gf_did_not_do', event)}/>
             <FormControlLabel control={<Checkbox  />} label="What is goal?" value={'What is goal'}onChange={(event) =>handleprerequisites('check_which_ones_the_gf_did_not_do', event)}/>
             <FormControlLabel control={<Checkbox  />} label="How should be the goal?"value={'How should be the goal'}onChange={(event) =>handleprerequisites('check_which_ones_the_gf_did_not_do', event)} />
             <FormControlLabel control={<Checkbox  />} label="SMART  Explanation"value={'SMART  Explanation'}onChange={(event) =>handleprerequisites('check_which_ones_the_gf_did_not_do', event)} />
             <FormControlLabel control={<Checkbox  />} label="Writing their business goals based on SMART"value={'Writing their business goals based on SMART'}onChange={(event) =>handleprerequisites('check_which_ones_the_gf_did_not_do', event)} />
             <FormControlLabel control={<Checkbox  />} label="List of steps to achieve the goals" value={'List of steps to achieve the goals'}onChange={(event) =>handleprerequisites('check_which_ones_the_gf_did_not_do', event)}/>
             <FormControlLabel control={<Checkbox  />} label="Types of loans"value={'Types of loans'}onChange={(event) =>handleprerequisites('check_which_ones_the_gf_did_not_do', event)} />
             <FormControlLabel control={<Checkbox  />} label="Formula of the Profit"value={'Formula of the Profit'}onChange={(event) =>handleprerequisites('check_which_ones_the_gf_did_not_do', event)} />
             <FormControlLabel control={<Checkbox  />} label="Debrief from the GF" value={'Debrief from the GF'}onChange={(event) =>handleprerequisites('check_which_ones_the_gf_did_not_do', event)}/>
             <FormControlLabel control={<Checkbox  />} label="Given name for Vyapar-4" value={'Given name for Vyapar-4'}onChange={(event) =>handleprerequisites('check_which_ones_the_gf_did_not_do', event)}/>
             <FormControlLabel control={<Checkbox  />} label="Feedback"value={'Feedback'}onChange={(event) =>handleprerequisites('check_which_ones_the_gf_did_not_do', event)} />
             <FormControlLabel control={<Checkbox  />} label="Homework"value={'Homework'}onChange={(event) =>handleprerequisites('check_which_ones_the_gf_did_not_do', event)} />
             <FormControlLabel control={<Checkbox  />} label="Was the pledge made?" value={'Was the pledge made'}onChange={(event) =>handleprerequisites('check_which_ones_the_gf_did_not_do', event)}/>           
     </FormGroup>
                 </Stack>
               </Stack>
               </Stack>
         </CardContent>   </Card>
        
     </CardContent>
         </Grid>:null}
       { ( assessmentType=='Vyapar Module 5' )?  <Grid  backgroundColor={"#FFD580"}>
         
         <CardContent>
           <Card>
           <Card sx = {{backgroundColor:'#ff7424'}} mt={2}>
           <CardContent>
           <Typography variant = 'h5'>Vyapar Training 5</Typography>
           </CardContent>
         </Card>
         <CardContent>
         <Stack mt={2}>
         <Stack>
                 <Typography variant="body1">
                 Check which ones the Field Associates did not do
                 {check_which_ones_the_gf_did_not_doError ? (
                          <FormHelperText style={{ color: 'red' }}>{helperText}</FormHelperText>
                        ) : null}{' '}
                 </Typography>
                 <Stack mt={2}>
                 <FormGroup>
             <FormControlLabel control={<Checkbox  />} label="Welcome" value={'Welcome'}onChange={(event) =>handleprerequisites('check_which_ones_the_gf_did_not_do', event)}/>
             <FormControlLabel control={<Checkbox  />} label="Recap of the 4th Vyapar training" value={'Recap of the 4th Vyapar training'}onChange={(event) =>handleprerequisites('check_which_ones_the_gf_did_not_do', event)}/>
             <FormControlLabel control={<Checkbox  />} label="List out the different aspects of business" value={'List out the different aspects of business'}onChange={(event) =>handleprerequisites('check_which_ones_the_gf_did_not_do', event)}/>
             <FormControlLabel control={<Checkbox  />} label="Explanation about the SWOT" value={'Explanation about the SWOT'}onChange={(event) =>handleprerequisites('check_which_ones_the_gf_did_not_do', event)}/>
             <FormControlLabel control={<Checkbox  />} label="List down their business strengths" value={'List down their business strengths'}onChange={(event) =>handleprerequisites('check_which_ones_the_gf_did_not_do', event)}/>
             <FormControlLabel control={<Checkbox  />} label="List down their business weakness" value={'List down their business weakness'}onChange={(event) =>handleprerequisites('check_which_ones_the_gf_did_not_do', event)}/>
             <FormControlLabel control={<Checkbox  />} label="List down their business opportunity" value={'List down their business opportunity'}onChange={(event) =>handleprerequisites('check_which_ones_the_gf_did_not_do', event)}/>
             <FormControlLabel control={<Checkbox  />} label="List down their business threats" value={'List down their business threats'}onChange={(event) =>handleprerequisites('check_which_ones_the_gf_did_not_do', event)}/>
             <FormControlLabel control={<Checkbox  />} label="Evaluation of their business skills" value={'Evaluation of their business skills'}onChange={(event) =>handleprerequisites('check_which_ones_the_gf_did_not_do', event)}/>
             <FormControlLabel control={<Checkbox  />} label="Given the grade for their skills" value={'Given the grade for their skills'}onChange={(event) =>handleprerequisites('check_which_ones_the_gf_did_not_do', event)}/>
             <FormControlLabel control={<Checkbox  />} label="Sharing their grade in the pair" value={'Sharing their grade in the pair'}onChange={(event) =>handleprerequisites('check_which_ones_the_gf_did_not_do', event)}/>
             <FormControlLabel control={<Checkbox  />} label="Debrief from the GF" value={'Debrief from the GF'}onChange={(event) =>handleprerequisites('check_which_ones_the_gf_did_not_do', event)}/>
             <FormControlLabel control={<Checkbox  />} label="Given name for Vyapar-5" value={'Given name for Vyapar-5'}onChange={(event) =>handleprerequisites('check_which_ones_the_gf_did_not_do', event)}/>
             <FormControlLabel control={<Checkbox  />} label="Feedback" value={'Feedback'}onChange={(event) =>handleprerequisites('check_which_ones_the_gf_did_not_do', event)}/>
             <FormControlLabel control={<Checkbox  />} label="Homework" value={'Homework'}onChange={(event) =>handleprerequisites('check_which_ones_the_gf_did_not_do', event)}/>
             <FormControlLabel control={<Checkbox  />} label="Was the pledge made?" value={'Was the pledge made'}onChange={(event) =>handleprerequisites('check_which_ones_the_gf_did_not_do', event)}/>           
     </FormGroup>
                 </Stack>
               </Stack>
               </Stack>
         </CardContent>   </Card>
        
     </CardContent>
         </Grid>:null}
           {/* 10  common*/}
    {  ( programAssessment==2 )?  <Grid  backgroundColor={"#FFD580"}>
          {/* page-10 */}
        <CardContent>
          <Card>
          <Card sx = {{backgroundColor:'#ff7424'}} mt={2}>
          <CardContent>
          <Typography variant = 'h5'>Attendance</Typography>
          </CardContent>
        </Card>
        <Card sx={{ marginTop:"20px"}}>
        <CardContent>
        <Stack >
                <Typography>
                
                <Typography >The purpose of the section is to collect quantitative data around participation, excitement, preparedness and the maintenance of interest level of the participants during the training.</Typography>
                </Typography>
                
                <Stack>
 
                </Stack>
              </Stack>
        </CardContent>
 </Card>
 </Card>
        <Card  sx={{ marginTop:"20px"}}>
        <CardContent>
            <Typography>Number Of Enrolled Galathis in the circle ?
 
          </Typography>
                <Stack mt={2} mb={2}>
                        <TextField  required inputProps={{ required: true }} type="number" label="Your Answer" variant="outlined" color="common" onChange={(e) => setSendForm({ ...sendForm, number_of_enrolled_gelathis_in_the_circle:e.target.value})} value={sendForm?.number_of_enrolled_gelathis_in_the_circle}/>
                    </Stack> 
            <Typography>Number of attended Gelathis?
 
          </Typography>
                <Stack mt={2} mb={2}>
                        <TextField required inputProps={{ required: true }}  type="number" label="Your Answer" variant="outlined" color="common" onChange={(e) => setSendForm({ ...sendForm, no_of_attended_gelathis:e.target.value})} value={sendForm?.no_of_attended_gelathis}/>
                    </Stack> 
            {/* <Typography>How many women attended the training session?
 
          </Typography>
                <Stack mt={2} mb={2}>
                        <TextField   label="Your Answer" variant="outlined" color="common" onChange={(e) => setSendForm({ ...sendForm, how_many_women_attended_the_training_session:e.target.value})} value={sendForm?.how_many_women_attended_the_training_session}/>
                    </Stack>  */}
        </CardContent>
          </Card>
         
          
 <Card sx={{marginTop:2}}>
          <CardContent>
          <Typography mb={2} >
          Level of participation (1 is poor and 5 is excellent)
          {levelError ? (
                          <FormHelperText style={{ color: 'red' }}>{helperText}</FormHelperText>
                        ) : null}{' '}
          </Typography>
            <Card sx={{display: 'flex',flexDirection:"column"}} >
              <CardContent sx={{display: 'flex',flexDirection:"row"}}>
                <CardContent sx={{width:'30%'}}></CardContent>
                <CardContent sx={{width:'70%',display:'flex',flexDirection:'row',justifyContent: 'space-between' }}>
                 <Typography>1</Typography>
                 <Typography>2</Typography>
                 <Typography>3</Typography>
                 <Typography>4</Typography>
                 <Typography>5</Typography>
                  
                </CardContent>
              </CardContent>
            {/* </Card>
            <Card sx={{display: 'flex',flexDirection:"row"}}> */}
            <CardContent sx={{display: 'flex',flexDirection:"row"}}>
                <CardContent sx={{width:'30%'}}>Reached the venue on or before time</CardContent>
                
                <CardContent sx={{width:'70%' }}>
                  <RadioGroup 
                      value={level1}
                   onChange={handlelevel1}
                    style={{display:'flex',flexDirection:'row',justifyContent: 'space-between'}} >
                 
                    <FormControlLabel value="1" control={<Radio />}  />
                    <FormControlLabel value="2" control={<Radio />}  />
                    <FormControlLabel value="3" control={<Radio />} />
                    <FormControlLabel value="4" control={<Radio />} />
                    <FormControlLabel value="5" control={<Radio />} /> 
                </RadioGroup>
                  
                </CardContent>
            </CardContent>
            <CardContent sx={{display: 'flex',flexDirection:"row"}}>
                <CardContent sx={{width:'30%'}}>Present for the entire session</CardContent>
                <CardContent sx={{width:'70%',display:'flex',flexDirection:'row',justifyContent: 'space-between',alignItems:'center' }}>
                   <RadioGroup
                   value={level2}
                   onChange={handlelevel2}
                    sx={{width:'100%',display:'flex',flexDirection:'row',justifyContent: 'space-between'}}>
                <FormControlLabel value="1" control={<Radio />}  />
                <FormControlLabel value="2" control={<Radio />}  />
                <FormControlLabel value="3" control={<Radio />} />
                <FormControlLabel value="4" control={<Radio />} />
                <FormControlLabel value="5" control={<Radio />} />
                  </RadioGroup>
                </CardContent>
            </CardContent>
            <CardContent sx={{display: 'flex',flexDirection:"row"}}>
                <CardContent sx={{width:'30%'}}>Leave in the meeting/ training in between?</CardContent>
                <CardContent sx={{width:'70%',display:'flex',flexDirection:'row',justifyContent: 'space-between' }}>
                <RadioGroup
                   value={level3}
                   onChange={handlelevel3}
                    sx={{width:'100%',display:'flex',flexDirection:'row',justifyContent: 'space-between'}}>
                <FormControlLabel value="1" control={<Radio />}  />
                <FormControlLabel value="2" control={<Radio />}  />
                <FormControlLabel value="3" control={<Radio />} />
                <FormControlLabel value="4" control={<Radio />} />
                <FormControlLabel value="5" control={<Radio />} />
                </RadioGroup>
                  
                </CardContent>
            </CardContent>
            <CardContent sx={{display: 'flex',flexDirection:"row"}}>
                <CardContent sx={{width:'30%'}}>Signed the ledger/meeting minute</CardContent>
                <CardContent sx={{width:'70%',display:'flex',flexDirection:'row',justifyContent: 'space-between' }}>
                <RadioGroup
                   value={level4}
                   onChange={handlelevel4}
                    sx={{width:'100%',display:'flex',flexDirection:'row',justifyContent: 'space-between'}}>
                <FormControlLabel value="1" control={<Radio />}  />
                <FormControlLabel value="2" control={<Radio />}  />
                <FormControlLabel value="3" control={<Radio />} />
                <FormControlLabel value="4" control={<Radio />} />
                <FormControlLabel value="5" control={<Radio />} />
                  </RadioGroup>
                </CardContent>
            </CardContent>
            <CardContent sx={{display: 'flex',flexDirection:"row"}}>
                <CardContent sx={{width:'30%'}}>Brought the books / pens to take down notes?</CardContent>
                <CardContent sx={{width:'70%',display:'flex',flexDirection:'row',justifyContent: 'space-between' }}>
                <RadioGroup
                   value={level5}
                   onChange={handlelevel5}
                    sx={{width:'100%',display:'flex',flexDirection:'row',justifyContent: 'space-between'}}>
                <FormControlLabel value="1" control={<Radio />}  />
                <FormControlLabel value="2" control={<Radio />}  />
                <FormControlLabel value="3" control={<Radio />} />
                <FormControlLabel value="4" control={<Radio />} />
                <FormControlLabel value="5" control={<Radio />} />
                  </RadioGroup>
                </CardContent>
              </CardContent>
              
            </Card>
              </CardContent>
          </Card>
      
        </CardContent>
        </Grid>:null}
           {/* 12 common */}
    { ( programAssessment==2 )? 
  <div>
       <Grid  backgroundColor={"#FFD580"}>
          {/* page-50 */}
        <CardContent>
          <Card>
          <Card sx = {{backgroundColor:'#ff7424'}} mt={2}>
          <CardContent>
          <Typography>
                  Feedback to Field Associate
                </Typography>
          </CardContent>
        </Card>
        <Card sx={{ marginTop:"20px"}}>
        <CardContent>
        <Stack >
                <Typography>
                
The purpose of this sector is to help Gelathis learn to improves their skill sets around facilitation of the training.
                </Typography>
                
                <Stack>
 
                </Stack>
              </Stack>
        </CardContent>
 </Card>
          </Card>
      <Card sx={{marginTop:2}}>
      <CardContent>
        <FormGroup>
        The Field Associate competently covered the following things in the training delivered
        {the_gf_competently_covered_folowing_things_in_training_deliveredError ? (
                          <FormHelperText style={{ color: 'red' }}>{helperText}</FormHelperText>
                        ) : null}{' '}
          <FormControlLabel control={<Checkbox  />} label="           Covered all the contents" value={'Covered all the contents'} onChange={(event) =>handleprerequisites('the_gf_competently_covered_folowing_things_in_training_delivered', event)}/>
          <FormControlLabel control={<Checkbox  />} label="Conducted all activities specified in the guideline/ module"value={'Conducted all activities specified in the guideline/ module'}onChange={(event) =>handleprerequisites('the_gf_competently_covered_folowing_things_in_training_delivered', event)} />
          <FormControlLabel control={<Checkbox  />} label="Good Communication Skills" value={'Good Communication Skills'}onChange={(event) =>handleprerequisites('the_gf_competently_covered_folowing_things_in_training_delivered', event)}/>
          <FormControlLabel control={<Checkbox  />} label="Dressing Sense (Appearance)"value={'Dressing Sense (Appearance)'} onChange={(event) =>handleprerequisites('the_gf_competently_covered_folowing_things_in_training_delivered', event)}/>
          <FormControlLabel control={<Checkbox  />} label="Facilitation Skills (Concept Delivery, Voice, Involving participants)"value={'Facilitation Skills (Concept Delivery, Voice, Involving participants)'} onChange={(event) =>handleprerequisites('the_gf_competently_covered_folowing_things_in_training_delivered', event)}/>
    </FormGroup>
        </CardContent>
      </Card>
      <Card sx={{marginTop:2}}>
          <CardContent>
          <Typography mb={2} >
          Rate The Field Associate
          {rateError ? (
                          <FormHelperText style={{ color: 'red' }}>{helperText}</FormHelperText>
                        ) : null}{' '}
          </Typography>
            <Card sx={{display: 'flex',flexDirection:"column"}} >
              <CardContent sx={{display: 'flex',flexDirection:"row"}}>
                <CardContent sx={{width:'30%'}}></CardContent>
                <CardContent sx={{width:'70%',display:'flex',flexDirection:'row',justifyContent: 'space-between' }}>
                 <Typography>Very Poor</Typography>
                 <Typography>poor</Typography>
                 <Typography>Average</Typography>
                 <Typography>Good</Typography>
                 <Typography>Very Good</Typography>
                  
                </CardContent>
              </CardContent>
            {/* </Card>
            <Card sx={{display: 'flex',flexDirection:"row"}}> */}
            <CardContent sx={{display: 'flex',flexDirection:"row"}}>
                <CardContent sx={{width:'30%'}}>Prior preparedness and planning for the session
</CardContent>
                
                <CardContent sx={{width:'70%' }}>
                  <RadioGroup
                  value={rate1}
                  onChange={handleRate1}
                   style={{display:'flex',flexDirection:'row',justifyContent: 'space-between'}} >
                 
                    <FormControlLabel value="1" control={<Radio />}  />
                    <FormControlLabel value="2" control={<Radio />}  />
                    <FormControlLabel value="3" control={<Radio />} />
                    <FormControlLabel value="4" control={<Radio />} />
                    <FormControlLabel value="5" control={<Radio />} /> 
                </RadioGroup>
                  
                </CardContent>
            </CardContent>
            <CardContent sx={{display: 'flex',flexDirection:"row"}}>
                <CardContent sx={{width:'30%'}}>Venue</CardContent>
                <CardContent sx={{width:'70%',display:'flex',flexDirection:'row',justifyContent: 'space-between',alignItems:'center' }}>
                   <RadioGroup
                    value={rate2}
                    onChange={handleRate2}
                   sx={{width:'100%',display:'flex',flexDirection:'row',justifyContent: 'space-between'}}>
                <FormControlLabel value="1" control={<Radio />}  />
                <FormControlLabel value="2" control={<Radio />}  />
                <FormControlLabel value="3" control={<Radio />} />
                <FormControlLabel value="4" control={<Radio />} />
                <FormControlLabel value="5" control={<Radio />} />
                  </RadioGroup>
                </CardContent>
            </CardContent>
            <CardContent sx={{display: 'flex',flexDirection:"row"}}>
                <CardContent sx={{width:'30%'}}>Report of GF with Gelathis</CardContent>
                <CardContent sx={{width:'70%',display:'flex',flexDirection:'row',justifyContent: 'space-between' }}>
                <RadioGroup
                  value={rate3}
                  sx={{width:'100%',display:'flex',flexDirection:'row',justifyContent: 'space-between'}}
                  onChange={handleRate3}
                   style={{display:'flex',flexDirection:'row',justifyContent: 'space-between'}} >
                <FormControlLabel value="1" control={<Radio />}  />
                <FormControlLabel value="2" control={<Radio />}  />
                <FormControlLabel value="3" control={<Radio />} />
                <FormControlLabel value="4" control={<Radio />} />
                <FormControlLabel value="5" control={<Radio />} />
                  </RadioGroup>
                </CardContent>
            </CardContent>
            <CardContent sx={{display: 'flex',flexDirection:"row"}}>
                <CardContent sx={{width:'30%'}}>Body language during the training</CardContent>
                <CardContent sx={{width:'70%',display:'flex',flexDirection:'row',justifyContent: 'space-between' }}>
                <RadioGroup
                 sx={{width:'100%',display:'flex',flexDirection:'row',justifyContent: 'space-between'}}
                  value={rate4}
                  onChange={handleRate4}
                   style={{display:'flex',flexDirection:'row',justifyContent: 'space-between'}} >
                <FormControlLabel value="1" control={<Radio />}  />
                <FormControlLabel value="2" control={<Radio />}  />
                <FormControlLabel value="3" control={<Radio />} />
                <FormControlLabel value="4" control={<Radio />} />
                <FormControlLabel value="5" control={<Radio />} />
                  </RadioGroup>
                </CardContent>
            </CardContent>
            <CardContent sx={{display: 'flex',flexDirection:"row"}}>
                <CardContent sx={{width:'30%'}}>Making session interactive and fun</CardContent>
                <CardContent sx={{width:'70%',display:'flex',flexDirection:'row',justifyContent: 'space-between' }}>
                <RadioGroup
                 sx={{width:'100%',display:'flex',flexDirection:'row',justifyContent: 'space-between'}}
                  value={rate5}
                  onChange={handleRate5}
                   style={{display:'flex',flexDirection:'row',justifyContent: 'space-between'}} >
                <FormControlLabel value="1" control={<Radio />}  />
                <FormControlLabel value="2" control={<Radio />}  />
                <FormControlLabel value="3" control={<Radio />} />
                <FormControlLabel value="4" control={<Radio />} />
                <FormControlLabel value="5" control={<Radio />} />
                  </RadioGroup>
                </CardContent>
              </CardContent>
              
            <CardContent sx={{display: 'flex',flexDirection:"row"}}>
                <CardContent sx={{width:'30%'}}>Knowledge of the content of the training</CardContent>
                <CardContent sx={{width:'70%',display:'flex',flexDirection:'row',justifyContent: 'space-between' }}>
                <RadioGroup
                 sx={{width:'100%',display:'flex',flexDirection:'row',justifyContent: 'space-between'}}
                  value={rate6}
                  onChange={handleRate6}
                   style={{display:'flex',flexDirection:'row',justifyContent: 'space-between'}} >
                <FormControlLabel value="1" control={<Radio />}  />
                <FormControlLabel value="2" control={<Radio />}  />
                <FormControlLabel value="3" control={<Radio />} />
                <FormControlLabel value="4" control={<Radio />} />
                <FormControlLabel value="5" control={<Radio />} />
                  </RadioGroup>
                </CardContent>
              </CardContent>
            <CardContent sx={{display: 'flex',flexDirection:"row"}}>
                <CardContent sx={{width:'30%'}}>Ability to clear doubts</CardContent>
                <CardContent sx={{width:'70%',display:'flex',flexDirection:'row',justifyContent: 'space-between' }}>
                <RadioGroup
                 sx={{width:'100%',display:'flex',flexDirection:'row',justifyContent: 'space-between'}}
                  value={rate7}
                  onChange={handleRate7}
                   style={{display:'flex',flexDirection:'row',justifyContent: 'space-between'}} >
                <FormControlLabel value="1" control={<Radio />}  />
                <FormControlLabel value="2" control={<Radio />}  />
                <FormControlLabel value="3" control={<Radio />} />
                <FormControlLabel value="4" control={<Radio />} />
                <FormControlLabel value="5" control={<Radio />} />
                  </RadioGroup>
                </CardContent>
              </CardContent>
            <CardContent sx={{display: 'flex',flexDirection:"row"}}>
                <CardContent sx={{width:'30%'}}>Ability to inspire the Gelathi's</CardContent>
                <CardContent sx={{width:'70%',display:'flex',flexDirection:'row',justifyContent: 'space-between' }}>
                <RadioGroup
                 sx={{width:'100%',display:'flex',flexDirection:'row',justifyContent: 'space-between'}}
                  value={rate8}
                  onChange={handleRate8}
                   style={{display:'flex',flexDirection:'row',justifyContent: 'space-between'}} >
                <FormControlLabel value="1" control={<Radio />}  />
                <FormControlLabel value="2" control={<Radio />}  />
                <FormControlLabel value="3" control={<Radio />} />
                <FormControlLabel value="4" control={<Radio />} />
                <FormControlLabel value="5" control={<Radio />} />
                  </RadioGroup>
                </CardContent>
              </CardContent>
            <CardContent sx={{display: 'flex',flexDirection:"row"}}>
                <CardContent sx={{width:'30%'}}>Ability to give clear link between the activity and the  content</CardContent>
                <CardContent sx={{width:'70%',display:'flex',flexDirection:'row',justifyContent: 'space-between' }}>
                <RadioGroup
                 sx={{width:'100%',display:'flex',flexDirection:'row',justifyContent: 'space-between'}}
                  value={rate9}
                  onChange={handleRate9}
                   style={{display:'flex',flexDirection:'row',justifyContent: 'space-between'}} >
                <FormControlLabel value="1" control={<Radio />}  />
                <FormControlLabel value="2" control={<Radio />}  />
                <FormControlLabel value="3" control={<Radio />} />
                <FormControlLabel value="4" control={<Radio />} />
                <FormControlLabel value="5" control={<Radio />} />
                  </RadioGroup>
                </CardContent>
              </CardContent>
            <CardContent sx={{display: 'flex',flexDirection:"row"}}>
                <CardContent sx={{width:'30%'}}>Vulnerable and honest</CardContent>
                <CardContent sx={{width:'70%',display:'flex',flexDirection:'row',justifyContent: 'space-between' }}>
                <RadioGroup
                 sx={{width:'100%',display:'flex',flexDirection:'row',justifyContent: 'space-between'}}
                  value={rate10}
                  onChange={handleRate10}
                   style={{display:'flex',flexDirection:'row',justifyContent: 'space-between'}} >
                <FormControlLabel value="1" control={<Radio />}  />
                <FormControlLabel value="2" control={<Radio />}  />
                <FormControlLabel value="3" control={<Radio />} />
                <FormControlLabel value="4" control={<Radio />} />
                <FormControlLabel value="5" control={<Radio />} />
                  </RadioGroup>
                </CardContent>
              </CardContent>
              
            </Card>
              </CardContent>
          </Card>
          <Card  sx={{ marginTop:"20px"}}>
        <CardContent>
            <Typography>What worked in the training?
 
          </Typography>
                <Stack mt={2} mb={2}>
                        <TextField required inputProps={{ required: true }}  type="text" label="Your Answer" variant="outlined" color="common" onChange={(e) => setSendForm({ ...sendForm, what_worked_in_the_training:e.target.value})} value={sendForm?.what_worked_in_the_training}/>
                    </Stack> 
  
        </CardContent>
          </Card>
          <Card  sx={{ marginTop:"20px"}}>
        <CardContent>
            <Typography>What can be better next time?
 
          </Typography>
                <Stack mt={2} mb={2}>
                        <TextField required inputProps={{ required: true }}  type="text" label="Your Answer" variant="outlined" color="common" onChange={(e) => setSendForm({ ...sendForm, what_can_be_better_next_time:e.target.value})} value={sendForm?.what_can_be_better_next_time}/>
                    </Stack> 
  
        </CardContent>
          </Card>
          <Card sx={{ marginTop:"20px"}}>
        <CardContent>
          <Typography >
          Any further training and understanding required by the Field Associate of any of the training modules delivered
          {any_futher_training_and_understding_reqired_by_gf_traing_moduleError ? (
                          <FormHelperText style={{ color: 'red' }}>{helperText}</FormHelperText>
                        ) : null}{' '}
          </Typography>
          <FormGroup>
            <FormControlLabel control={<Checkbox  />} label="Facilitation Skills" value="Facilitation Skills" onChange={(event) =>handleprerequisites('any_futher_training_and_understding_reqired_by_gf_traing_module', event)}/>
            <FormControlLabel control={<Checkbox  />} label="Reorientation" value="Reorientation"  onChange={(event) =>handleprerequisites('any_futher_training_and_understding_reqired_by_gf_traing_module', event)}/>
            <FormControlLabel control={<Checkbox  />} label="None" value="None" onChange={(event) =>handleprerequisites('any_futher_training_and_understding_reqired_by_gf_traing_module', event)}/>
   
    </FormGroup>
        </CardContent>
        </Card>
        <Card  sx={{ marginTop:"20px"}}>
        <CardContent>
            <Typography>Did you find anything in the training/ Field Associate that needs to be worked on priority?
 
          </Typography>
                <Stack mt={2} mb={2}>
                        <TextField  required inputProps={{ required: true }}  type="text" label="Your Answer" variant="outlined" color="common" onChange={(e) => setSendForm({ ...sendForm, did_you_find_anything_traiing_or_gf_that_neds_to_worked_priority:e.target.value})} value={sendForm?.did_you_find_anything_traiing_or_gf_that_neds_to_worked_priority}/>
                    </Stack> 
  
        </CardContent>
          </Card>
        <Card  sx={{ marginTop:"20px"}}>
        <CardContent>
            <Typography>Details of success stories to be collected from Gelathis by GF
 
          </Typography>
                <Stack mt={2} mb={2}>
                        <TextField required inputProps={{ required: true }}  type="text" label="Your Answer" variant="outlined" color="common" onChange={(e) => setSendForm({ ...sendForm, details_of_success_stories_to_be_collected_from_gelathis_by_gf:e.target.value})} value={sendForm?.details_of_success_stories_to_be_collected_from_gelathis_by_gf}/>
                    </Stack> 
  
        </CardContent>
          </Card>
        <Card  sx={{ marginTop:"20px"}}>
        <CardContent>
            <Typography>Deadline to collect the stories
          </Typography>
                <Stack mt={2} mb={2}>
                        <TextField  required inputProps={{ required: true }} type="date" label="Your Answer" variant="outlined" color="common" onChange={(e) => setSendForm({ ...sendForm, deadline_to_collect_the_stories:e.target.value})} value={sendForm?.deadline_to_collect_the_stories}/>
                    </Stack> 
        </CardContent>
          </Card>
        <Card  sx={{ marginTop:"20px"}}>
        <CardContent>
            <Typography>End time of the training
          </Typography>
                <Stack mt={2} mb={2}>
                        <TextField  inputProps={{ required: true }}type="time" placeholder="Your Answer" variant="outlined" color="common" onChange={(e) => setSendForm({ ...sendForm, end_time_of_the_training:e.target.value})} value={sendForm?.end_time_of_the_training}/>
                    </Stack> 
        </CardContent>
          </Card>
          
        <Card  sx={{ marginTop:"20px"}}>
        <CardContent>
            <Typography>No of participants at end of the session
          </Typography>
                <Stack mt={2} mb={2}>
                        <TextField inputProps={{ required: true }} required  type="number" label="Your Answer" variant="outlined" color="common" onChange={(e) => setSendForm({ ...sendForm, no_of_participants_at_end_of_the_session:e.target.value})} value={sendForm?.no_of_participants_at_end_of_the_session}/>
                    </Stack> 
        </CardContent>
          </Card>
        <Card  sx={{ marginTop:"20px"}}>
        <CardContent>
            <Typography>Any other comments about the Field Associate
          </Typography>
                <Stack mt={2} mb={2}>
                        <TextField required inputProps={{ required: true }}  type="text" label="Your Answer" variant="outlined" color="common" onChange={(e) => setSendForm({ ...sendForm, any_other_comments_about_the_gelathi_facilitator:e.target.value})} value={sendForm?.any_other_comments_about_the_gelathi_facilitator}/>
                    </Stack> 
        </CardContent>
          </Card>
        </CardContent>
        </Grid>
          <br/>
  </div>
        :null}
      
   {  ( programAssessment==1 )? 
     <Grid  backgroundColor={"#FFD580"}>
          {/* page-12 */}
        <CardContent>
          <Card>
          <Card sx = {{backgroundColor:'#ff7424'}} mt={2}>
          <CardContent>
          <Typography variant = 'h5'>
                  Self-Shakti 
                </Typography>
                <Typography>
                 Training Quality assessment
                </Typography>
          </CardContent>
        </Card>
        <Card sx={{ marginTop:"20px"}}>
        <CardContent>
        <Stack >
                <Typography>
                  Day1 or Day 2
                  {day1_or_day2Error ? (
                          <FormHelperText style={{ color: 'red' }}>{helperText}</FormHelperText>
                        ) : null}{' '}
                </Typography>
                
                <Stack>
                  <RadioGroup
                  value={day1Day2}
                  onChange={handleDay1daay2}
                  >
                    <FormControlLabel value="Day 1"  control={<Radio />} label="Day 1" />
                    <FormControlLabel value="Day 2" control={<Radio />} label="Day 2" />
                    
                  </RadioGroup>
                </Stack>
              </Stack>
        </CardContent>
 </Card>
          </Card>
      
        </CardContent>
        </Grid>
         :null}  
       
         
         {/* 13 */}
 {  ( day1Day2== 'Day 1')? 
     <div>
       <Grid  backgroundColor={"#FFD580"}>
          {/* page-13 */}
        <CardContent>
          <Card zindex={1}>
          <Card sx = {{backgroundColor:'#ff7424'}}  mt={2}>
          <CardContent>
          <Typography variant = 'h5'>Day-1</Typography>
          </CardContent>
        </Card>
        <CardContent>
        <Stack mt={2}  >
                <Typography>
                Name of the trainer being evaluated
                {name_of_the_trainer_being_evaluatedError ? (
                          <FormHelperText style={{ color: 'red' }} >{helperText}</FormHelperText>
                        ) : null}{' '}
                </Typography>
            
    <Box>
      <Autocomplete
      disablePortal
      
      id="combo-box-demo"
      options={trainers}
      filterOptions={filterOptions}
      getOptionLabel={(option) =>  option.first_name }
      sx={{ width: '100%'}}
      
      componentsProps={{
        paper: {
          sx: {
            height: 100,
            zIndex: 9999,
            position: 'relative',
            
          }
        }
      }}
     onChange={(event, value) => {
  setSendForm({ ...sendForm, name_of_the_trainer_being_evaluated: value.first_name });
}}
renderOption={(props, option) => (
  <Box  component="li" sx={{ '& > img': { mr: 2, flexShrink: 0 } }} {...props} key={option.id}>
    {option.first_name}
  </Box>
)}
      renderInput={(params) => <TextField  fullWidth {...params} label="Trainer"       
       />}     
    />
    </Box>
              </Stack>
        </CardContent>
          </Card>
          
        </CardContent>
        </Grid>
          <br/>
     </div>
     :null }
        
      
          {/* 14 */}
      {( day1Day2=='Day 1')? 
        <div>
          <Grid  backgroundColor={"#FFD580"}>
            {/* page-14 */}
          <CardContent>
            <Card>
            <Card sx = {{backgroundColor:'#ff7424'}} mt={2}>
            <CardContent>
            <Typography variant = 'h5'>Before the training starts on Day 1</Typography>
            </CardContent>
          </Card>
          <CardContent>
            <Typography >
            Check which ones the Trainer did NOT do
            {check_which_ones_the_trainer_did_not_doError ? (
                            <FormHelperText style={{ color: 'red' }}>{helperText}</FormHelperText>
                          ) : null}{' '}
            </Typography>
            <FormGroup>
            
            <FormControlLabel control={<Checkbox  />} value={'Arrange the tent and the chairs in ‘u’ form'} label=" Arrange the tent and the chairs in ‘u’ form" onChange={(event) =>handleprerequisites('check_which_ones_the_trainer_did_not_do', event)} />
            <FormControlLabel control={<Checkbox  />}value={'Play the video while the participants were entering'} label="Play the video while the participants were entering" onChange={(event) =>handleprerequisites('check_which_ones_the_trainer_did_not_do', event)}/>
            <FormControlLabel control={<Checkbox  />}value={'Take the signature needed for the consent'} label="Take the signature needed for the consent" onChange={(event) =>handleprerequisites('check_which_ones_the_trainer_did_not_do', event)}/>
            <FormControlLabel control={<Checkbox  />}value={'Collect information for the primary Baseline Data Ledger'} label="Collect information for the primary Baseline Data Ledger" onChange={(event) =>handleprerequisites('check_which_ones_the_trainer_did_not_do', event)}/>
            <FormControlLabel control={<Checkbox  />}value={'Read the consent form loudly'} label="Read the consent form loudly" onChange={(event) =>handleprerequisites('check_which_ones_the_trainer_did_not_do', event)}/>
            <FormControlLabel control={<Checkbox  />}value={'Distribute the books and pencils to the participants with respect'} label="Distribute the books and pencils to the participants with respect" onChange={(event) =>handleprerequisites('check_which_ones_the_trainer_did_not_do', event)}/>
            <FormControlLabel control={<Checkbox  />}value={'Express gratitude towards the Anganwadi teacher for her efforts'} label="Express gratitude towards the Anganwadi teacher for her efforts" onChange={(event) =>handleprerequisites('check_which_ones_the_trainer_did_not_do', event)}/>
            <FormControlLabel control={<Checkbox  />}value={'Explain the training schedule and intended outcomes of the training to them'} label="Explain the training schedule and intended outcomes of the training to them" onChange={(event) =>handleprerequisites('check_which_ones_the_trainer_did_not_do', event)}/>
      </FormGroup>
          </CardContent>
            </Card>
        
          </CardContent>
          </Grid>
          <br/>
        </div>
        :null} 
        
        {/* 15 */}
        {( day1Day2=='Day 1')? 
        <div>
          <Grid  backgroundColor={"#FFD580"}>
          {/* page-15 */}
        <CardContent>
          <Card>
          <Card sx = {{backgroundColor:'#ff7424'}} mt={2}>
          <CardContent>
          <Typography variant = 'h5'>Module 1 (M1) Introduction of Buzz:</Typography>
          </CardContent>
        </Card>
        <Card  >
        <CardContent>
            <Typography> How many women attended the training session?
            {how_many_women_attended_the_training_sessionError ? (
                          <FormHelperText style={{ color: 'red' }}>{helperText}</FormHelperText>
                        ) : null}{' '}
       </Typography>
            <Stack mt={2} mb={2}>
                    <TextField  type='number'  required inputProps={{ required: true }} label="Your Answer" variant="outlined" color="common" onChange={(e) => setSendForm({ ...sendForm, how_many_women_attended_the_training_session:e.target.value})} value={sendForm?.how_many_women_attended_the_training_session} />
                </Stack> 
        </CardContent>
     </Card>
          </Card>
      
          <Card sx={{marginTop:2}}>
              <CardContent>
                        <Typography >
                        Check which ones the trainer did not do
                        {check_which_ones_the_trainer_did_not_do_1Error ? (
                          <FormHelperText style={{ color: 'red' }}>{helperText}</FormHelperText>
                        ) : null}{' '}
                        </Typography>
                        <FormGroup>
                        <FormControlLabel control={<Checkbox  />} value={'Set the ground rules'} label="Set the ground rules" onChange={(event) =>handleprerequisites('check_which_ones_the_trainer_did_not_do_1', event)}/>
                        <FormControlLabel control={<Checkbox  />}value={'Set the expectations of the participants'}  label="Set the expectations of the participants" onChange={(event) =>handleprerequisites('check_which_ones_the_trainer_did_not_do_1', event)}/>
                          <FormControlLabel control={<Checkbox  />}value={'Introduce Buzz India'}  label="Introduce Buzz India" onChange={(event) =>handleprerequisites('check_which_ones_the_trainer_did_not_do_1', event)}/>
                          <FormControlLabel control={<Checkbox  />}value={'Create a learning environment'}  label="Create a learning environment" onChange={(event) =>handleprerequisites('check_which_ones_the_trainer_did_not_do_1', event)}/>
                          <FormControlLabel control={<Checkbox  />}value={'Engaged with participants to build a rapport'}  label="Engaged with participants to build a rapport" onChange={(event) =>handleprerequisites('check_which_ones_the_trainer_did_not_do_1', event)}/>
                          <FormControlLabel control={<Checkbox  />}value={'Promote trust and confidence in Buzz among participants'}  label="Promote trust and confidence in Buzz among participants" onChange={(event) =>handleprerequisites('check_which_ones_the_trainer_did_not_do_1', event)}/>
                          <FormControlLabel control={<Checkbox  />}value={'Introduce himself/herself'}  label="Introduce himself/herself" onChange={(event) =>handleprerequisites('check_which_ones_the_trainer_did_not_do_1', event)}/>
                          <FormControlLabel control={<Checkbox  />}value={'Ask the women to introduce themselves'}  label="Ask the women to introduce themselves" onChange={(event) =>handleprerequisites('check_which_ones_the_trainer_did_not_do_1', event)}/>
                          <FormControlLabel control={<Checkbox  />}value={'Play the Buzz India video'}  label="Play the Buzz India video" onChange={(event) =>handleprerequisites('check_which_ones_the_trainer_did_not_do_1', event)}/>
                          <FormControlLabel control={<Checkbox  />}value={'Tell the participants that this training is for everyone, and that we have multiple processes of learning there’s verbal, texts, videos, pictures, songs'}  label="Tell the participants that this training is for everyone, and that we have multiple processes of learning there’s verbal, texts, videos, pictures, songs" onChange={(event) =>handleprerequisites('check_which_ones_the_trainer_did_not_do_1', event)}/>
                          <FormControlLabel control={<Checkbox  />}value={'Mention life learning is more important and it is a lifelong process and implied that this is a learning environment'}  label="Mention life learning is more important and it is a lifelong process and implied that this is a learning environment" onChange={(event) =>handleprerequisites('check_which_ones_the_trainer_did_not_do_1', event)}/>
                          <FormControlLabel control={<Checkbox  />}value={'Sing the Buzz song along with the participants'}  label="Sing the Buzz song along with the participants" onChange={(event) =>handleprerequisites('check_which_ones_the_trainer_did_not_do_1', event)}/>
                          <FormControlLabel control={<Checkbox  />} value={'Use the opening pitch during the introduction'} label="Use the opening pitch during the introduction" onChange={(event) =>handleprerequisites('check_which_ones_the_trainer_did_not_do_1', event)}/>
                          <FormControlLabel control={<Checkbox  />}value={'Explain why the Buzz India training is only for women and not men'}  label="Explain why the Buzz India training is only for women and not men" onChange={(event) =>handleprerequisites('check_which_ones_the_trainer_did_not_do_1', event)}/>
                          <FormControlLabel control={<Checkbox  />} value={'Explain the methodology and the training content well'} label="Explain the methodology and the training content well" onChange={(event) =>handleprerequisites('check_which_ones_the_trainer_did_not_do_1', event)}/>
                          <FormControlLabel control={<Checkbox  />}value={'Inform the importance of the book'}  label="Inform the importance of the book" onChange={(event) =>handleprerequisites('check_which_ones_the_trainer_did_not_do_1', event)}/>
                  </FormGroup>
              </CardContent>
          </Card>
          <Card sx={{ marginTop:"20px"}}>
        <CardContent>
        <Stack mt={2}>
                <Typography>
                Were the women interactive?
                {intractError ? (
                          <FormHelperText style={{ color: 'red' }}>{helperText}</FormHelperText>
                        ) : null}{' '}
                </Typography>
                <Stack mt={2}>
                  <RadioGroup
                    value={intract}
                    onChange={handleIntract}
                  >
                  <FormGroup>
                    <FormControlLabel value="Yes"  control={<Radio />} label="Yes" />
                    <FormControlLabel value="No" control={<Radio />} label="No" />
                  </FormGroup>
                    </RadioGroup>
                </Stack>
              </Stack>
        </CardContent>
           </Card>
           <Card sx={{ marginTop:"20px"}}>
        <CardContent>
        <Stack mt={2}>
                <Typography>
                Did any women leave the training session during or after the first module?
                {did_any_women_leave_tring_session_dring_or_after_1st_moduleError ? (
                          <FormHelperText style={{ color: 'red' }}>{helperText}</FormHelperText>
                        ) : null}{' '}
                </Typography>
                <Stack mt={2}>
                  <FormGroup>
                    <RadioGroup
                      onChange={(e) => setSendForm({ ...sendForm, did_any_women_leave_tring_session_dring_or_after_1st_module:e.target.value})} value={sendForm?.did_any_women_leave_tring_session_dring_or_after_1st_module}   
                    >
                    <FormControlLabel value="Yes"  control={<Radio />} label="Yes" />
                    <FormControlLabel value="No" control={<Radio />} label="No" />
                    </RadioGroup>
                  </FormGroup>
                </Stack>
              </Stack>
        </CardContent>
           </Card>
       { (sendForm?.did_any_women_leave_tring_session_dring_or_after_1st_module=='Yes' )?  <Card  sx={{ marginTop:"20px"}}>
              <CardContent>
                  <Typography>If so, how many?
            </Typography>
                  <Stack mt={2} mb={2}>
                          <TextField type='number' required inputProps={{ required: true }}  label="Your Answer" variant="outlined" color="common" onChange={(e) => setSendForm({ ...sendForm, if_so_how_many:e.target.value})} value={sendForm?.if_so_how_many}/>
                      </Stack> 
              </CardContent>
        </Card> : null}
        <Card sx={{ marginTop:"20px"}}>
        <CardContent>
        <Stack mt={2}>
                <Typography>
                Did this module take 20 minutes as allotted?
                {moduleError ? (
                          <FormHelperText style={{ color: 'red' }}>{helperText}</FormHelperText>
                        ) : null}{' '}
                </Typography>
                <Stack mt={2}>
                  <RadioGroup
                    value={module}
                    onChange={handleModule}
                  >
                  <FormGroup>
                    <FormControlLabel value="Yes"  control={<Radio />} label="Yes" />
                    <FormControlLabel value="No" control={<Radio />} label="No" />
                  </FormGroup>
                    </RadioGroup>
                </Stack>
              </Stack>
        </CardContent>
           </Card>
        </CardContent>
          
        </Grid>
        <br/>
        </div>
        :null} 
        
     
     {( day1Day2=='Day 1')? 
    <div>
       <Grid style={{backgroundColor:"#FFD580"}}>
            <Typography>
              {/* PAGE 16  */}
              </Typography>
       
        
        <Card sx={{mt:4, margin:"20px", backgroundColor:'#ff7424'}}>
        <CardContent>
        <Stack>
                <Typography  style={{fontWeight:700}} color="primary">
                Module 2 (M2) Basics of an Enterprise: <br />
                </Typography>
              </Stack>
                </CardContent>
                <Card sx={{mt:2,}} >
        <CardContent>
        <Stack mt={2}>
                <Typography variant="body2">Did any new women attend the training session during this module?/ಈ ಮಾಡ್ಯೂಲ್ ನಲ್ಲಿ ಯಾವುದೇ ಹೊಸ ಮಹಿಳೆಯರು ತರಬೇತಿ ಸೆಷನ್ ಗೆ ಹಾಜರಾಗಿದ್ದಾರೆಯೇ?
                {did_any_new_women_attend_the_training_session_during_moduleError ? (
                          <FormHelperText style={{ color: 'red' }}>{helperText}</FormHelperText>
                        ) : null}{' '}
                </Typography>
                <Stack mt={2}>
                <RadioGroup
                      aria-labelledby="demo-radio-buttons-group-label"
                     
                      name="radio-buttons-group"
                      onChange={(e) => setSendForm({ ...sendForm, did_any_new_women_attend_the_training_session_during_module:e.target.value})} value={sendForm?.did_any_new_women_attend_the_training_session_during_module}
                  
                    >
                    <div style={{display:"flex"}}>
                      <FormControlLabel value="No" control={<Radio style={{color:"#595959"}} />} label="No" />
                      <FormControlLabel value="Yes" control={<Radio style={{color:"#595959"}}  />} label="Yes" />
                      </div>
                    </RadioGroup>
                </Stack>
              </Stack>
       
             
        </CardContent>
     </Card>
        </Card>
  { (sendForm?.did_any_new_women_attend_the_training_session_during_module=='Yes')?  <Card sx={{ margin:"20px"}}>
        <CardContent>
        <Stack>
                <Typography variant="body1">
                  If so, How many?/ಹಾಗಿದ್ದರೆ ಎಷ್ಟು?
                </Typography>
                <Stack mt={3}>
                  <TextField type='number' required inputProps={{ required: true }} id="Correct Answer" label="Correct Answer" variant="outlined" onChange={(e) => { setSendForm({ ...sendForm, if_so_how_many_1: e.target.value }) }} value={sendForm?.if_so_how_many_1}/>
                </Stack>
              </Stack>
        
        
        </CardContent>
     </Card>: null}
     <Card sx={{ margin:"20px"}}>
        <CardContent>
        <Stack mt={2}>
                <Typography>
                   Check which ones the trainer did not do/ತರಬೇತುದಾರನು ಯಾವುದನ್ನು ಮಾಡಲಿಲ್ಲ ಎಂಬುದನ್ನು ಪರಿಶೀಲಿಸಿ
                   {check_which_ones_the_trainer_did_not_do_2Error ? (
                          <FormHelperText style={{ color: 'red' }}>{helperText}</FormHelperText>
                        ) : null}{' '}
                </Typography>
                <Stack mt={2}>
                  <FormGroup>
                    <FormControlLabel value="Ask how many businesswomen and how many housewives there were among the participants?"  control={<Checkbox />} label="Ask how many businesswomen and how many housewives there were among the participants?" onChange={(event) =>handleprerequisites('check_which_ones_the_trainer_did_not_do_2', event)}/>
                    <FormControlLabel value="Ask business women what constitutes business income capital, profit, and  expenditure?" control={<Checkbox />} label="Ask business women what constitutes business income capital, profit, and  expenditure?" onChange={(event) =>handleprerequisites('check_which_ones_the_trainer_did_not_do_2', event)}/>
                    <FormControlLabel value="Make a note of the answers on the white board" control={<Checkbox />} label="Make a note of the answers on the white board" onChange={(event) =>handleprerequisites('check_which_ones_the_trainer_did_not_do_2', event)}/>
                    <FormControlLabel value="Ask housewives what constitutes household income, savings, and expenditure" control={<Checkbox />} label="Ask housewives what constitutes household income, savings, and expenditure" onChange={(event) =>handleprerequisites('check_which_ones_the_trainer_did_not_do_2', event)}/>
                    <FormControlLabel value="Explain the concepts of capital, expense, profit/loss and income while using an example" control={<Checkbox />} label="Explain the concepts of capital, expense, profit/loss and income while using an example" onChange={(event) =>handleprerequisites('check_which_ones_the_trainer_did_not_do_2', event)}/>
                    <FormControlLabel value="Give the formula for calculating income"  control={<Checkbox />} label="Give the formula for calculating income" onChange={(event) =>handleprerequisites('check_which_ones_the_trainer_did_not_do_2', event)}/>
                    <FormControlLabel value="Acknowledge/ congratulate/ reward those who responded correctly" control={<Checkbox />} label="Acknowledge/ congratulate/ reward those who responded correctly" onChange={(event) =>handleprerequisites('check_which_ones_the_trainer_did_not_do_2', event)}/>
                    <FormControlLabel value="Ask a participant to come to the board to give an example of her own" control={<Checkbox />} label="Ask a participant to come to the board to give an example of her own" onChange={(event) =>handleprerequisites('check_which_ones_the_trainer_did_not_do_2', event)}/>
                    <FormControlLabel value="Use the chart to explain the receipts of an enterprise?" control={<Checkbox />} label="Use the chart to explain the receipts of an enterprise?" onChange={(event) =>handleprerequisites('check_which_ones_the_trainer_did_not_do_2', event)}/>
                    <FormControlLabel value="Use the chart that was relevant for the business women in the group (if milk business is more then use milk chart if other business then use that)" control={<Checkbox />} label="Use the chart that was relevant for the business women in the group (if milk business is more then use milk chart if other business then use that)" onChange={(event) =>handleprerequisites('check_which_ones_the_trainer_did_not_do_2', event)}/>
                  </FormGroup>
                </Stack>
              </Stack>
       
        </CardContent>
     </Card>
     <Card sx={{ margin:"20px"}}>
        <CardContent>
        <Stack mt={2}>
                <Typography>
                   During the debrief the trainer did: /ಡಿಬ್ರೀಫ್ ಸಮಯದಲ್ಲಿ ತರಬೇತುದಾರನು ಹೀಗೆ ಮಾಡಿದನು( check the ones he/she did)
                   {during_the_debrief_the_trainer_didError ? (
                          <FormHelperText style={{ color: 'red' }}>{helperText}</FormHelperText>
                        ) : null}{' '}
                </Typography>
                <Stack mt={2}>
                  <FormGroup>
                    <FormControlLabel value="Ask why is this important to learn?"  control={<Checkbox />} label="Ask why is this important to learn?" onChange={(event) =>handleprerequisites('during_the_debrief_the_trainer_did', event)}/>
                    <FormControlLabel value="Ask which are the places/situations where income, profit, savings could be asked?" control={<Checkbox />} label="Ask which are the places/situations where income, profit, savings could be asked?" onChange={(event) =>handleprerequisites('during_the_debrief_the_trainer_did', event)}/>
                    <FormControlLabel value="Clarify why this is important even if someone said that their business is already running well?" control={<Checkbox />} label="Clarify why this is important even if someone said that their business is already running well?" onChange={(event) =>handleprerequisites('during_the_debrief_the_trainer_did', event)}/>
                  </FormGroup>
                </Stack>
              </Stack>
       
        </CardContent>
     </Card>
     <Card sx={{ margin:"20px"}}>
        <CardContent>
        <Stack mt={2}> 
                <Typography> Did any women leave the training session during or after the first module?/ಮೊದಲ ಮಾಡ್ಯೂಲ್ ಸಮಯದಲ್ಲಿ ಅಥವಾ ನಂತರ ಯಾವುದೇ ಮಹಿಳೆಯರು ಸೆಷನ್ ಅನ್ನು ತೊರೆದಿದ್ದಾರೆಯೇ?
                {did_any_women_leve_training_session_during_or_after_1st_module_1Error ? (
                          <FormHelperText style={{ color: 'red' }}>{helperText}</FormHelperText>
                        ) : null}{' '}
                </Typography>
                <Stack mt={2}>
                <RadioGroup
                      aria-labelledby="demo-radio-buttons-group-label"
                      name="radio-buttons-group"
                      onChange={(e) => setSendForm({ ...sendForm, did_any_women_leve_training_session_during_or_after_1st_module_1:e.target.value})} value={sendForm?.did_any_women_leve_training_session_during_or_after_1st_module_1}   
                  
                    >
                    <div style={{display:"flex"}}>
                      <FormControlLabel value="No" control={<Radio style={{color:"#595959"}} />} label="No" />
                      <FormControlLabel value="Yes" control={<Radio style={{color:"#595959"}}  />} label="Yes" />
                      </div>
                    </RadioGroup>
                </Stack>
              </Stack>
        
        
       
        </CardContent>
     </Card>
   { (sendForm?.did_any_women_leve_training_session_during_or_after_1st_module_1=="Yes")?  <Card sx={{ margin:"20px"}}>
        <CardContent>
        <Stack>
                <Typography variant="body1">
                  If so, How many?/ಹಾಗಿದ್ದರೆ ಎಷ್ಟು?
                </Typography>
                <Stack mt={3}>
                  <TextField type='number' required inputProps={{ required: true }} id="Correct Answer" label="Correct Answer" variant="outlined" onChange={(e) => { setSendForm({ ...sendForm, if_so_how_many_2: e.target.value }) }} value={sendForm?.if_so_how_many_2}/>
                </Stack>
              </Stack>
       
        
            
       
        </CardContent>
     </Card>: null}
     
     <Card sx={{ margin:"20px"}}>
        <CardContent>
        <Stack mt={2}>
                <Typography>Did this module take 20 minutes as allotted?/ಈ ಮಾಡ್ಯೂಲ್  {module1Error ? (
                          <FormHelperText style={{ color: 'red' }}>{helperText}</FormHelperText>
                        ) : null}{' '} ನಿಗದಿಪಡಿಸಿದಂತೆ 20 ನಿಮಿಷಗಳನ್ನು ತೆಗೆದುಕೊಂಡಿದೆಯೇ?
                </Typography>
                <Stack mt={2}>
                <RadioGroup
                      aria-labelledby="demo-radio-buttons-group-label"
                      name="radio-buttons-group"
                      value={module1}
                      onChange={handleModule1}
                  
                    >
                    <div style={{display:"flex"}}>
                      <FormControlLabel value="No" control={<Radio style={{color:"#595959"}} />} label="No" />
                      <FormControlLabel value="Yes" control={<Radio style={{color:"#595959"}}  />} label="Yes" />
                      </div>
                    </RadioGroup>
                </Stack>
              </Stack>
       
        
            
       
        </CardContent>
     </Card>
     
     </Grid>
     <br/>
    </div>
     :null}
     
     {( day1Day2=='Day 1')? 
     <Grid style={{backgroundColor:"#FFD580"}}>
            <Typography>
              {/* PAGE 17 buzz m3 */}
              </Typography>
   <CardContent>
    
   
       
        
        <Card sx={{mt:2, margin:"20px 0px 0px", backgroundColor:'#ff7424'}}>
        <CardContent>
        <Stack >
          
                <Typography   style={{fontWeight:700}} color="primary">
                  Module 3 (M3) Building Relationships
                </Typography>
               
              </Stack>
              
                </CardContent>
          
                <Card sx={{mt:2}} >
        <CardContent>
        <Stack mt={2}>
                <Typography variant="body2">
                  Did any new women attend the training session during this module  
                {attendError ? (
                          <FormHelperText style={{ color: 'red' }}>{helperText}</FormHelperText>
                        ) : null}{' '}</Typography>
                <Stack mt={2}>
                <RadioGroup
                      aria-labelledby="demo-radio-buttons-group-label"
                     
                      name="radio-buttons-group"
                      
                      value={attend}
                      onChange={handleAttend}
                    >
                    <div style={{display:"flex"}}>
                      <FormControlLabel value="No" control={<Radio style={{color:"#595959"}} />} label="No" />
                      <FormControlLabel value="Yes" control={<Radio style={{color:"#595959"}}  />} label="Yes" />
                      </div>
                    </RadioGroup>
                </Stack>
              </Stack>
        
             
        </CardContent>
    
        </Card>
        </Card>
        
        
    { (attend=="Yes")? <Card sx={{ margin:"20px 0px 0px",}}>
        <CardContent>
        <Stack>
                <Typography variant="body1">
                  If so, How many?
                </Typography>
                <Stack mt={3}>
                  <TextField type='number' required inputProps={{ required: true }} id="Correct Answer" label="Correct Answer" variant="outlined" onChange={(e) => { setSendForm({ ...sendForm, if_so_how_many_3: e.target.value }) }} value={sendForm?.if_so_how_many_3}/>
                </Stack>
              </Stack>
        
        
        </CardContent>
         </Card>: null}
     
     <Card sx={{ margin:"20px 0px 0px",}}>
        <CardContent>
        <Stack mt={2}>
                <Typography>
                   Check which ones the trainer did not do
                   {check_which_ones_the_trainer_did_not_do_3Error ? (
                          <FormHelperText style={{ color: 'red' }}>{helperText}</FormHelperText>
                        ) : null}{' '}
                </Typography>
                <Stack mt={2}>
                  <FormGroup>
                    <FormControlLabel value="Ask what are some of the elements needed, apart from money, to either become more profitable at business or to become more adept at saving or to increase your income?"  control={<Checkbox />} label="Ask what are some of the elements needed, apart from money, to either become more profitable at business or to become more adept at saving or to increase your income?" onChange={(event) =>handleprerequisites('check_which_ones_the_trainer_did_not_do_3', event)}/>
                    <FormControlLabel value="Ask what needs to be done to run a business more successfully or even run your life successfully?" control={<Checkbox />} label="Ask what needs to be done to run a business more successfully or even run your life successfully?" onChange={(event) =>handleprerequisites('check_which_ones_the_trainer_did_not_do_3', event)}/>
                    <FormControlLabel value="Record the answers to the questions he asked them and the discussion points" control={<Checkbox />} label="Record the answers to the questions he asked them and the discussion points" onChange={(event) =>handleprerequisites('check_which_ones_the_trainer_did_not_do_3', event)}/>
                    <FormControlLabel value="Reward those who answered" control={<Checkbox />} label="Reward those who answered" onChange={(event) =>handleprerequisites('check_which_ones_the_trainer_did_not_do_3', event)}/>
                    <FormControlLabel value="Ask why is it necessary to communicate clearly, politely and effectively?" control={<Checkbox />} label="Ask why is it necessary to communicate clearly, politely and effectively?" onChange={(event) =>handleprerequisites('check_which_ones_the_trainer_did_not_do_3', event)}/>
                   
                    
                  </FormGroup>
                </Stack>
              </Stack>
        
       
        </CardContent>
     </Card>
     <Card sx={{margin:"20px 0px 0px",}}>
        <CardContent>
        <Stack mt={2}>
                <Typography>
                   During the debriefs for role plays the trainer did not ask:
                    ( check the ones he/she did)
                    {during_the_debriefs_for_role_plays_the_trainer_did_not_askError ? (
                          <FormHelperText style={{ color: 'red' }}>{helperText}</FormHelperText>
                        ) : null}{' '}
                </Typography>
                <Stack mt={2}>
                  <FormGroup>
                    <FormControlLabel value="What was the role play about?"  control={<Checkbox />} label="What was the role play about?" onChange={(event) =>handleprerequisites('during_the_debriefs_for_role_plays_the_trainer_did_not_ask', event)}/>
                    <FormControlLabel value="How did the protagonists behave?" control={<Checkbox />} label="How did the protagonists behave?" onChange={(event) =>handleprerequisites('during_the_debriefs_for_role_plays_the_trainer_did_not_ask', event)}/>
                    <FormControlLabel value="What was the impact on customers & business/ family member?" control={<Checkbox />} label="What was the impact on customers & business/ family member?" onChange={(event) =>handleprerequisites('during_the_debriefs_for_role_plays_the_trainer_did_not_ask', event)}/>
                  
                    <FormControlLabel value="What was done well"  control={<Checkbox />} label="What was done well" onChange={(event) =>handleprerequisites('during_the_debriefs_for_role_plays_the_trainer_did_not_ask', event)}/>
                    <FormControlLabel value="What do you feel after seeing all the role plays?"  control={<Checkbox />} label="What do you feel after seeing all the role plays?" onChange={(event) =>handleprerequisites('during_the_debriefs_for_role_plays_the_trainer_did_not_ask', event)}/>
                    <FormControlLabel value="Do you notice that in all four role plays there are possibilities?"  control={<Checkbox />} label="Do you notice that in all four role plays there are possibilities?" onChange={(event) =>handleprerequisites('during_the_debriefs_for_role_plays_the_trainer_did_not_ask', event)}/>
                    <FormControlLabel value="Where do you think change begins?"  control={<Checkbox />} label="Where do you think change begins?" onChange={(event) =>handleprerequisites('during_the_debriefs_for_role_plays_the_trainer_did_not_ask', event)}/>
                    <FormControlLabel value="Reflect whether these communication and relationship building aspects can be effectively used in personal life as well. How? What situations in real life could they be useful in?"  control={<Checkbox />} label="Reflect whether these communication and relationship building aspects can be effectively used in personal life as well. How? What situations in real life could they be useful in?" onChange={(event) =>handleprerequisites('during_the_debriefs_for_role_plays_the_trainer_did_not_ask', event)}/>
                    <FormControlLabel value="Can you share incidents where good and bad communication affected your relationships"  control={<Checkbox />} label="Can you share incidents where good and bad communication affected your relationships" onChange={(event) =>handleprerequisites('during_the_debriefs_for_role_plays_the_trainer_did_not_ask', event)}/>
                    <FormControlLabel value="Do you believe effective communication or relationship building has an influence on your personal life and your business? How?"  control={<Checkbox />} label="Do you believe effective communication or relationship building has an influence on your personal life and your business? How?" onChange={(event) =>handleprerequisites('during_the_debriefs_for_role_plays_the_trainer_did_not_ask', event)}/>
                    <FormControlLabel value="Record all answers"  control={<Checkbox />} label="Record all answers" onChange={(event) =>handleprerequisites('during_the_debriefs_for_role_plays_the_trainer_did_not_ask', event)}/>
                  
                  
                  </FormGroup>
                </Stack>
              </Stack>
        
        </CardContent>
     </Card>
     <Card sx={{ margin:"20px 0px 0px",}}>
        <CardContent>
        <Stack mt={2}> 
                <Typography> Did the trainer leave the women to read the role play card themselves?
                {leave2Error ? (
                          <FormHelperText style={{ color: 'red' }}>{helperText}</FormHelperText>
                        ) : null}{' '}
                    </Typography>
                <Stack mt={2}>
                <RadioGroup
                      aria-labelledby="demo-radio-buttons-group-label"
                      name="radio-buttons-group"
                      value={leave2}
                      onChange={handleLeave2}
                  
                    >
                    <div style={{display:"flex"}}>
                      <FormControlLabel value="No" control={<Radio style={{color:"#595959"}} />} label="No" />
                      <FormControlLabel value="Yes" control={<Radio style={{color:"#595959"}}  />} label="Yes" />
                      </div>
                    </RadioGroup>
                </Stack>
              </Stack>
       
        
       
        </CardContent>
     </Card>
     <Card sx={{ margin:"20px 0px 0px",}}>
        <CardContent>
        <Stack mt={2}> 
                <Typography> Did the groups engage and interact among themselves well?
                {engageError ? (
                          <FormHelperText style={{ color: 'red' }}>{helperText}</FormHelperText>
                        ) : null}{' '}
                    </Typography>
                <Stack mt={2}>
                <RadioGroup
                      aria-labelledby="demo-radio-buttons-group-label"
                      name="radio-buttons-group"
                      value={engage}
                      onChange={handleEngage}
                    
                  
                    >
                    <div style={{display:"flex"}}>
                      <FormControlLabel value="No" control={<Radio style={{color:"#595959"}} />} label="No" />
                      <FormControlLabel value="Yes" control={<Radio style={{color:"#595959"}}  />} label="Yes" />
                      </div>
                    </RadioGroup>
                </Stack>
              </Stack>
        
        
            
       
        </CardContent>
     </Card>
     <Card sx={{ margin:"20px 0px 0px",}}>
        <CardContent>
        <Stack mt={2}> 
                <Typography>Were the participants responsive during the debriefing?
                {participantError ? (
                          <FormHelperText style={{ color: 'red' }}>{helperText}</FormHelperText>
                        ) : null}{' '}
                    </Typography>
                <Stack mt={2}>
                <RadioGroup
                      aria-labelledby="demo-radio-buttons-group-label"
                      name="radio-buttons-group"
                      value={participant}
                      onChange={handleParticipant}
                     
                  
                    >
                    <div style={{display:"flex"}}>
                      <FormControlLabel value="No" control={<Radio style={{color:"#595959"}} />} label="No" />
                      <FormControlLabel value="Yes" control={<Radio style={{color:"#595959"}}  />} label="Yes" />
                      </div>
                    </RadioGroup>
                </Stack>
              </Stack>
        
        
            
       
        </CardContent>
     </Card>
     <Card sx={{margin:"20px 0px 0px",}}>
        <CardContent>
        <Stack mt={2}> 
                <Typography>Did any women leave the training session during or after this module?
                {did_any_wmen_leave_the_trning_sesion_during_or_aftr_tis_modle_1Error ? (
                          <FormHelperText style={{ color: 'red' }}>{helperText}</FormHelperText>
                        ) : null}{' '}
                    </Typography>
                <Stack mt={2}>
                <RadioGroup
                      aria-labelledby="demo-radio-buttons-group-label"
                      name="radio-buttons-group"
                     
                      onChange={(e) => setSendForm({ ...sendForm, did_any_wmen_leave_the_trning_sesion_during_or_aftr_tis_modle_1:e.target.value})} value={sendForm?.did_any_wmen_leave_the_trning_sesion_during_or_aftr_tis_modle_1}   
                    >
                    <div style={{display:"flex"}}>
                      <FormControlLabel value="No" control={<Radio style={{color:"#595959"}} />} label="No" />
                      <FormControlLabel value="Yes" control={<Radio style={{color:"#595959"}}  />} label="Yes" />
                      </div>
                    </RadioGroup>
                </Stack>
              </Stack>
        
        
            
       
        </CardContent>
     </Card>
     {(sendForm?.did_any_wmen_leave_the_trning_sesion_during_or_aftr_tis_modle_1=='Yes')? <Card sx={{ margin:"20px 0px 0px",}}>
        <CardContent>
        <Stack>
                <Typography variant="body1">
                   If so, How many?
                </Typography>
                <Stack mt={3}>
                  <TextField type='number' required inputProps={{ required: true }} id="Correct Answer" label="Correct Answer" variant="outlined" onChange={(e) => { setSendForm({ ...sendForm, if_so_how_many_4: e.target.value }) }} value={sendForm?.if_so_how_many_4}/>
                </Stack>
              </Stack>
       
        </CardContent>
     </Card>: null}
     <Card sx={{ margin:"20px 0px 0px",}}>
        <CardContent>
        <Stack mt={2}>
                <Typography> Did this module take 30 minutes as allotted?
                {did_this_module_take_30_minutes_as_allottedError ? (
                          <FormHelperText style={{ color: 'red' }}>{helperText}</FormHelperText>
                        ) : null}{' '}
                </Typography>
                <Stack mt={2}>
                <RadioGroup
                      aria-labelledby="demo-radio-buttons-group-label"
                      name="radio-buttons-group"
                      onChange={(e) => setSendForm({ ...sendForm, did_this_module_take_30_minutes_as_allotted:e.target.value})} value={sendForm?.did_this_module_take_30_minutes_as_allotted}   
                  
                    >
                    <div style={{display:"flex"}}>
                      <FormControlLabel value="No" control={<Radio style={{color:"#595959"}} />} label="No" />
                      <FormControlLabel value="Yes" control={<Radio style={{color:"#595959"}}  />} label="Yes" />
                      </div>
                    </RadioGroup>
                </Stack>
              </Stack>
       
        </CardContent>
     </Card>
     
   </CardContent>
     
     
     
     </Grid>
     :null}
     {( day1Day2=='Day 1')? 
       <Grid  backgroundColor={"#FFD580"}>
          {/* page-18 */}
        <CardContent>
          <Card>
          <Card sx = {{backgroundColor:'#ff7424'}} mt={2}>
          <CardContent>
          <Typography variant = 'h5'>Module 4 (M4) Daily Money Management:</Typography>
          </CardContent>
        </Card>
        <CardContent>
        <Stack mt={2}> 
                <Typography>Did any new women attend the training session during this this module?
                {did_any_new_women_attend_training_session_during_this_module_2Error ? (
                          <FormHelperText style={{ color: 'red' }}>{helperText}</FormHelperText>
                        ) : null}{' '}
                    </Typography>
                <Stack mt={2}>
                <RadioGroup
                      aria-labelledby="demo-radio-buttons-group-label"
                      name="radio-buttons-group"
                      onChange={(e) => setSendForm({ ...sendForm, did_any_new_women_attend_training_session_during_this_module_2:e.target.value})} value={sendForm?.did_any_new_women_attend_training_session_during_this_module_2}
                    >
                    <div style={{display:"flex"}}>
                      <FormControlLabel value="No" control={<Radio style={{color:"#595959"}} />} label="No" />
                      <FormControlLabel value="Yes" control={<Radio style={{color:"#595959"}}  />} label="Yes" />
                      </div>
                    </RadioGroup>
                </Stack>
              </Stack>
        
        
            
       
        </CardContent>
       
          </Card>
    {  (sendForm?.did_any_new_women_attend_training_session_during_this_module_2=='Yes')?    <Card sx={{ margin:'20px 0 0 0' }}>
        <CardContent>
        <Stack>
                <Typography variant="body1">
                   If so, How many?
                </Typography>
                <Stack  mt={2}>
                  <TextField type='number' required inputProps={{ required: true }} id="Correct Answer" label="Correct Answer" variant="outlined" onChange={(e) => { setSendForm({ ...sendForm, if_so_how_many_5: e.target.value }) }} value={sendForm?.if_so_how_many_5}/>
                </Stack>
              </Stack>
       
        </CardContent>
     </Card>: null}
     <Card sx={{marginTop:2}}>
        <CardContent>
        <Stack mt={2}>
                <Typography>
                Check which ones the trainer did not do
                {check_which_ones_the_trainer_did_not_do_4Error ? (
                          <FormHelperText style={{ color: 'red' }}>{helperText}</FormHelperText>
                        ) : null}{' '}
                </Typography>
                <Stack mt={2}>
                  <FormGroup>
                    
                    
                    <FormControlLabel value="Show the participants the video about Saraswathi and Lakshmi" control={<Checkbox />} label="Show the participants the video about Saraswathi and Lakshmi" onChange={(event) =>handleprerequisites('check_which_ones_the_trainer_did_not_do_4', event)}/>
                    <FormControlLabel value="Ask whose life did you like?" control={<Checkbox />} label="Ask whose life did you like?" onChange={(event) =>handleprerequisites('check_which_ones_the_trainer_did_not_do_4', event)}/>
                    <FormControlLabel value="Ask why is saving necessary?" control={<Checkbox />} label="Ask why is saving necessary?" onChange={(event) =>handleprerequisites('check_which_ones_the_trainer_did_not_do_4', event)}/>
                    <FormControlLabel value="Ask why is it important to think of the future if you have a good professional relationship with the moneylender and have been prompt in repaying loans?" control={<Checkbox />} label="Ask why is it important to think of the future if you have a good professional relationship with the moneylender and have been prompt in repaying loans?" onChange={(event) =>handleprerequisites('check_which_ones_the_trainer_did_not_do_4', event)}/>
                    <FormControlLabel value="Ask what is wrong with borrowing money from the moneylender for interest?" control={<Checkbox />} label="Ask what is wrong with borrowing money from the moneylender for interest?" onChange={(event) =>handleprerequisites('check_which_ones_the_trainer_did_not_do_4', event)}/>
                    <FormControlLabel value="Ask what’s wrong with celebrating festivals with joy and vigour, dressing well, eating well?" control={<Checkbox />} label="Ask what’s wrong with celebrating festivals with joy and vigour, dressing well, eating well?" onChange={(event) =>handleprerequisites('check_which_ones_the_trainer_did_not_do_4', event)}/>
                    <FormControlLabel value="Ask under what circumstances would Saraswathi not get a loan?" control={<Checkbox />} label="Ask under what circumstances would Saraswathi not get a loan?" onChange={(event) =>handleprerequisites('check_which_ones_the_trainer_did_not_do_4', event)}/>
                    <FormControlLabel value="Ask what are some of the reasons why a woman may not be able to earn?" control={<Checkbox />} label="Ask what are some of the reasons why a woman may not be able to earn?" onChange={(event) =>handleprerequisites('check_which_ones_the_trainer_did_not_do_4', event)}/>
                    <FormControlLabel value="Ask what did Lakshmi take a loan for and what did Saraswathi take it for?" control={<Checkbox />} label="Ask what did Lakshmi take a loan for and what did Saraswathi take it for?" onChange={(event) =>handleprerequisites('check_which_ones_the_trainer_did_not_do_4', event)}/>
                    <FormControlLabel value="Ask Is it bad to take loan? Lakshmi also took a loan, isn’t it?" control={<Checkbox />} label="Ask Is it bad to take loan? Lakshmi also took a loan, isn’t it?" onChange={(event) =>handleprerequisites('check_which_ones_the_trainer_did_not_do_4', event)}/>
                    <FormControlLabel value="Ask what kinds of loans are bad to take?" control={<Checkbox />} label="Ask what kinds of loans are bad to take?" onChange={(event) =>handleprerequisites('check_which_ones_the_trainer_did_not_do_4', event)}/>
                    <FormControlLabel value="Ask why should we save in formal financial institutions?" control={<Checkbox />} label="Ask why should we save in formal financial institutions?" onChange={(event) =>handleprerequisites('check_which_ones_the_trainer_did_not_do_4', event)}/>
                    <FormControlLabel value="Ask why do we need to plan/track expenses?" control={<Checkbox />} label="Ask why do we need to plan/track expenses?" onChange={(event) =>handleprerequisites('check_which_ones_the_trainer_did_not_do_4', event)}/>
                    <FormControlLabel value="Ask how is the story relevant to you? Why was it narrated?" control={<Checkbox />} label="Ask how is the story relevant to you? Why was it narrated?" onChange={(event) =>handleprerequisites('check_which_ones_the_trainer_did_not_do_4', event)}/>
                    <FormControlLabel value="Ask how many women had bank accounts in their name?" control={<Checkbox />} label="Ask how many women had bank accounts in their name?" onChange={(event) =>handleprerequisites('check_which_ones_the_trainer_did_not_do_4', event)}/>
                    <FormControlLabel value="Ask how many of those accounts were still active and operating?" control={<Checkbox />} label="Ask how many of those accounts were still active and operating?" onChange={(event) =>handleprerequisites('check_which_ones_the_trainer_did_not_do_4', event)}/>
                    <FormControlLabel value="Ask the women whose life seems better and why?" control={<Checkbox />} label="Ask the women whose life seems better and why?" onChange={(event) =>handleprerequisites('check_which_ones_the_trainer_did_not_do_4', event)}/>
                    
                    <FormControlLabel value="Facilitate and encourage debate" control={<Checkbox />} label="Facilitate and encourage debate" onChange={(event) =>handleprerequisites('check_which_ones_the_trainer_did_not_do_4', event)}/>
                    <FormControlLabel value="Encourage the participants to look at the women objectively" control={<Checkbox />} label="Encourage the participants to look at the women objectively" onChange={(event) =>handleprerequisites('check_which_ones_the_trainer_did_not_do_4', event)}/>
                    <FormControlLabel value="Use the family budgeting receipts charts to explain" control={<Checkbox />} label="Use the family budgeting receipts charts to explain" onChange={(event) =>handleprerequisites('check_which_ones_the_trainer_did_not_do_4', event)}/>
                    <FormControlLabel value="Ask one woman to come volunteer" control={<Checkbox />} label="Ask one woman to come volunteer" onChange={(event) =>handleprerequisites('check_which_ones_the_trainer_did_not_do_4', event)}/>
                    <FormControlLabel value="Use Laxmi’s life as an example, if no one volunteers" control={<Checkbox />} label="Use Laxmi’s life as an example, if no one volunteers" onChange={(event) =>handleprerequisites('check_which_ones_the_trainer_did_not_do_4', event)}/>
                    <FormControlLabel value="Encourage women to fill this chart in their books before the next week’s training" control={<Checkbox />} label="Encourage women to fill this chart in their books before the next week’s training" onChange={(event) =>handleprerequisites('check_which_ones_the_trainer_did_not_do_4', event)}/>
                    <FormControlLabel value="Ask them to use the help of their family members to fill it if they do not know the numbers themselves" control={<Checkbox />} label="Ask them to use the help of their family members to fill it if they do not know the numbers themselves" onChange={(event) =>handleprerequisites('check_which_ones_the_trainer_did_not_do_4', event)}/>
                    <FormControlLabel value="Feed emotional words and see how the group was respononChange={(event) =>handleprerequisites('check_which_ones_the_trainer_did_not_do_4', event)}ding to the questions asked during debrief" control={<Checkbox />} label="Feed emotional words and see how the group was responding to the questions asked during debrief" onChange={(event) =>handleprerequisites('check_which_ones_the_trainer_did_not_do_4', event)}/>
                    <FormControlLabel value="Ask specific questions as mentioned in the guide on the video shown" control={<Checkbox />} label="Ask specific questions as mentioned in the guide on the video shown" onChange={(event) =>handleprerequisites('check_which_ones_the_trainer_did_not_do_4', event)}/>
                    <FormControlLabel value="Ask -  Do you feel there is a change in household income and expenses from past to present? How has it changed and what has contributed to it?" control={<Checkbox />} label="Ask -  Do you feel there is a change in household income and expenses from past to present? How has it changed and what has contributed to it?" onChange={(event) =>handleprerequisites('check_which_ones_the_trainer_did_not_do_4', event)}/>
                    <FormControlLabel value="Encourage to look at expenses of fruits and vegetables" control={<Checkbox />} label="Encourage to look at expenses of fruits and vegetables" onChange={(event) =>handleprerequisites('check_which_ones_the_trainer_did_not_do_4', event)}/>
                    <FormControlLabel value="Ask - Don’t you think the increasing heat and varying rainfall has contributed to these changes?" control={<Checkbox />} label="Ask - Don’t you think the increasing heat and varying rainfall has contributed to these changes?" onChange={(event) =>handleprerequisites('check_which_ones_the_trainer_did_not_do_4', event)}/>
                    <FormControlLabel value="Encourage the woman to connect their responses on both household food and health to increasing heat, changing rainfall and varying climate." control={<Checkbox />} label="Encourage the woman to connect their responses on both household food and health to increasing heat, changing rainfall and varying climate." onChange={(event) =>handleprerequisites('check_which_ones_the_trainer_did_not_do_4', event)}/>
                   
                   
                    
                  </FormGroup>
                </Stack>
              </Stack>
        
       
        </CardContent>
     </Card>
     <Card sx={{marginTop:2}}>
        <CardContent>
        <Stack>
                <Typography variant="body1">
                How many women remained by the end of this training session?
                
                </Typography>
                <Stack mt={3}>
                  <TextField type='number' required inputProps={{ required: true }} id="Correct Answer" label="Correct Answer" variant="outlined" onChange={(e) => { setSendForm({ ...sendForm, how_many_women_remained_by_the_end_of_this_training_session: e.target.value }) }} value={sendForm?.how_many_women_remained_by_the_end_of_this_training_session}/>
                </Stack>
              </Stack>
       
        </CardContent>
     </Card>
     <Card sx={{marginTop:2}}>
        <CardContent>
        <Stack>
                <Typography variant="body1">
                How many are likely to come back?
                </Typography>
                <Stack mt={3}>
                  <TextField required inputProps={{ required: true }} id="Correct Answer" label="Correct Answer" variant="outlined" onChange={(e) => { setSendForm({ ...sendForm, how_many_are_likely_to_come_back: e.target.value }) }} value={sendForm?.how_many_are_likely_to_come_back}/>
                </Stack>
              </Stack>
       
        </CardContent>
     </Card>
     <Card sx={{marginTop:2}}>
        <CardContent>
        <Stack mt={2}>
                <Typography> Did this module take 30 minutes as allotted?
                {did_this_module_take_30_minutes_as_allotted_1Error ? (
                          <FormHelperText style={{ color: 'red' }}>{helperText}</FormHelperText>
                        ) : null}{' '}
                </Typography>
                <Stack mt={2}>
                <RadioGroup
                      aria-labelledby="demo-radio-buttons-group-label"
                      name="radio-buttons-group"
                      onChange={(e) => setSendForm({ ...sendForm, did_this_module_take_30_minutes_as_allotted_1:e.target.value})} value={sendForm?.did_this_module_take_30_minutes_as_allotted_1}
                  
                    >
                    <div style={{display:"flex"}}>
                      <FormControlLabel value="No" control={<Radio style={{color:"#595959"}} />} label="No" />
                      <FormControlLabel value="Yes" control={<Radio style={{color:"#595959"}}  />} label="Yes" />
                      </div>
                    </RadioGroup>
                </Stack>
              </Stack>
        
       
        </CardContent>
     </Card>
         
        </CardContent>
        </Grid>
           :null}
{( day1Day2=='Day 1')? 
        <Grid  backgroundColor={"#FFD580"}>
          {/* page-19 */}
        <CardContent>
          <Card>
          <Card sx = {{backgroundColor:'#ff7424'}} mt={2}>
          <CardContent>
          <Typography variant = 'h5'>Post - training on Day 1:</Typography>
          </CardContent>
        </Card>
        <Card sx={{marginTop:2}}>
        <CardContent>
        <Stack mt={2}>
                <Typography>
                Check which ones the trainer did not do
                {check_which_ones_the_trainer_did_not_do_5Error ? (
                          <FormHelperText style={{ color: 'red' }}>{helperText}</FormHelperText>
                        ) : null}{' '}
                </Typography>
                <Stack mt={2}>
                  <FormGroup>
                    
                    
                    
                    
                    <FormControlLabel value="Ask how was it for you?" control={<Checkbox />} label="Ask how Is Climate Now?" onChange={(event) =>handleprerequisites('check_which_ones_the_trainer_did_not_do_5', event)}/>
                    <FormControlLabel value="Ask what did you learn new today?" control={<Checkbox />} label="Ask what did you learn new today?" onChange={(event) =>handleprerequisites('check_which_ones_the_trainer_did_not_do_5', event)}/>
                    <FormControlLabel value="Ask do you have any feedback for me as a trainer or for our organisation so that we can deliver the best experience for you?" control={<Checkbox />} label="Ask do you have any feedback for me as a trainer or for our organisation so that we can deliver the best experience for you?" onChange={(event) =>handleprerequisites('check_which_ones_the_trainer_did_not_do_5', event)}/>
                    <FormControlLabel value="Ask the women that if they have any doubts/questions they can ask right now in the group or ask in person?" control={<Checkbox />} label="Ask the women that if they have any doubts/questions they can ask right now in the group or ask in person?" onChange={(event) =>handleprerequisites('check_which_ones_the_trainer_did_not_do_5', event)}/>
                    <FormControlLabel value="Tell the women what will be covered in the next training session" control={<Checkbox />} label="Tell the women what will be covered in the next training session" onChange={(event) =>handleprerequisites('check_which_ones_the_trainer_did_not_do_5', event)}/>
                    <FormControlLabel value="Ask them to share with their family what they have learnt?" control={<Checkbox />} label="Ask them to share with their family what they have learnt?" onChange={(event) =>handleprerequisites('check_which_ones_the_trainer_did_not_do_5', event)}/>
                    <FormControlLabel value="Create excitement/curiosity among the participants about the next training session" control={<Checkbox />} label="Create excitement/curiosity among the participants about the next training session" onChange={(event) =>handleprerequisites('check_which_ones_the_trainer_did_not_do_5', event)}/>
                    <FormControlLabel value="Tell them that Buzz India will be following up on them for the next three years through a Buzz Gelathi" control={<Checkbox />} label="Tell them that Buzz India will be following up on them for the next three years through a Buzz Gelathi" onChange={(event) =>handleprerequisites('check_which_ones_the_trainer_did_not_do_5', event)}/>
                    <FormControlLabel value="Explain the concept and functions of the Buzz Gelathi" control={<Checkbox />} label="Explain the concept and functions of the Buzz Gelathi" onChange={(event) =>handleprerequisites('check_which_ones_the_trainer_did_not_do_5', event)}/>
                    <FormControlLabel value="Appreciate the Anganwadi teacher" control={<Checkbox />} label="Appreciate the Anganwadi teacher" onChange={(event) =>handleprerequisites('check_which_ones_the_trainer_did_not_do_5', event)}/>
                    {/* <FormControlLabel value="Survey of 3 green motivators" control={<Checkbox />} label="Survey of 3 green motivators" onChange={(event) =>handleprerequisites('check_which_ones_the_trainer_did_not_do_5', event)}/> */}
 
                  </FormGroup>
                </Stack>
              </Stack>
        
       
        </CardContent>
     </Card>
       
          </Card>
      
         
        </CardContent>
        </Grid>
        :null}
      
        {day1Day2 &&(day1Day2=='Day 2')? <Grid  backgroundColor={"#FFD580"}>
          {/* page-20 */}
        <CardContent>
          <Card>
          <Card sx = {{backgroundColor:'#ff7424'}} mt={2}>
          <CardContent>
          <Typography variant = 'h5'>Day-2</Typography>
          </CardContent>
          
        </Card>
       
        <CardContent>
        <Stack mt={2}>
                <Typography>
                Name of the trainer being evaluated
                {name_of_the_trainer_being_evaluatedError ? (
                          <FormHelperText style={{ color: 'red' }}>{helperText}</FormHelperText>
                        ) : null}{' '}
                </Typography>
 
      <Box>
      <Autocomplete
      disablePortal
      
      id="combo-box-demo"
      options={trainers}
      filterOptions={filterOptions}
      getOptionLabel={(option) => option.first_name }
      sx={{ width: '100%'}}
      
      componentsProps={{
        paper: {
          sx: {
            height: 100,
            zIndex: 9999,
            position: 'relative',
            
          }
        }
      }}
     onChange={(event, value) => {
  setSendForm({ ...sendForm, name_of_the_trainer_being_evaluated: value.first_name });
}}
renderOption={(props, option) => (
  <Box  component="li" sx={{ '& > img': { mr: 2, flexShrink: 0 } }} {...props} key={option.id}>
    {option.first_name}
  </Box>
)}
      renderInput={(params) => <TextField  fullWidth {...params} label="Trainer"       
       />}     
    />
    </Box>
              </Stack>
        </CardContent>
          </Card>
         
   <Card sx={{marginTop:2}}>
        <CardContent>
        <Stack>
                <Typography variant="body1">
                How many women attended the training session?
                </Typography>
                <Stack mt={3}>
                  <TextField type='number' required inputProps={{ required: true }} id="Correct Answer" label="Correct Answer" variant="outlined"  onChange={(e) => setSendForm({ ...sendForm, how_many_women_attended_the_training_session:e.target.value})} value={sendForm?.how_many_women_attended_the_training_session}/>
                </Stack>
              </Stack>
       
        </CardContent>
     </Card>
          
     
     <Card sx={{marginTop:2}}>
        <CardContent>
        <Stack mt={2}>
                <Typography>
                Check which ones the trainer did not do
                {check_which_ones_the_trainer_did_not_doError ? (
                          <FormHelperText style={{ color: 'red' }}>{helperText}</FormHelperText>
                        ) : null}{' '}
                </Typography>
                <Stack mt={2}>
                  <FormGroup>
                    
                    
                    <FormControlLabel value="One day before the training, follow up with the Anganwadi teacher. Request her to remind the participants who did not furnish their Voter ID cards on Day 1 to bring them on Day 2." control={<Checkbox />} label="One day before the training, follow up with the Anganwadi teacher. Request her to remind the participants who did not furnish their Voter ID cards on Day 1 to bring them on Day 2." onChange={(event) =>handleprerequisites('check_which_ones_the_trainer_did_not_do', event)}/>
                    <FormControlLabel value="As the women walk into the training space, check the completed book keeping activity in the financial book of the women and fill the register with answers required for the baseline data against each woman’s name" control={<Checkbox />} label="As the women walk into the training space, check the completed book keeping activity in the financial book of the women and fill the register with answers required for the baseline data against each woman’s name" onChange={(event) =>handleprerequisites('check_which_ones_the_trainer_did_not_do', event)}/>
                    <FormControlLabel value="Ask the women to sign the register before beginning the training" control={<Checkbox />} label="Ask the women to sign the register before beginning the training" onChange={(event) =>handleprerequisites('check_which_ones_the_trainer_did_not_do', event)}/>
                    
                    <FormControlLabel value="Make sure all the required columns in the register are fully filled" control={<Checkbox />} label="Make sure all the required columns in the register are fully filled" onChange={(event) =>handleprerequisites('check_which_ones_the_trainer_did_not_do', event)}/>
                    
                    
                    
                   
                   
                    
                  </FormGroup>
                </Stack>
              </Stack>
        
       
        </CardContent>
     </Card>
     <Card sx={{marginTop:2}}>
        <CardContent>
        <Stack mt={2}> 
                <Typography>Was the recap done?
                {was_the_recap_doneError ? (
                          <FormHelperText style={{ color: 'red' }}>{helperText}</FormHelperText>
                        ) : null}{' '}
                    </Typography>
                <Stack mt={2}>
                <RadioGroup
                      aria-labelledby="demo-radio-buttons-group-label"
                      name="radio-buttons-group"
                      onChange={(e) => setSendForm({ ...sendForm, was_the_recap_done:e.target.value})} value={sendForm?.was_the_recap_done}
                  
                    >
                    <div style={{display:"flex"}}>
                      <FormControlLabel value="No" control={<Radio style={{color:"#595959"}} />} label="No" />
                      <FormControlLabel value="Yes" control={<Radio style={{color:"#595959"}}  />} label="Yes" />
                      </div>
                    </RadioGroup>
                </Stack>
              </Stack>
        
        
            
       
        </CardContent>
     </Card>
     <Card sx={{marginTop:2}}>
        <CardContent>
        <Stack mt={2}> 
                <Typography>Did the recap take 15 minutes as allotted?
                {did_the_recap_take_15_minutes_as_allottedError ? (
                          <FormHelperText style={{ color: 'red' }}>{helperText}</FormHelperText>
                        ) : null}{' '}
                    </Typography>
                <Stack mt={2}>
                <RadioGroup
                      aria-labelledby="demo-radio-buttons-group-label"
                      name="radio-buttons-group"
                      onChange={(e) => setSendForm({ ...sendForm, did_the_recap_take_15_minutes_as_allotted:e.target.value})} value={sendForm?.did_the_recap_take_15_minutes_as_allotted}
                  
                    >
                    <div style={{display:"flex"}}>
                      <FormControlLabel value="No" control={<Radio style={{color:"#595959"}} />} label="No" />
                      <FormControlLabel value="Yes" control={<Radio style={{color:"#595959"}}  />} label="Yes" />
                      </div>
                    </RadioGroup>
                </Stack>
              </Stack>
        
        
            
       
        </CardContent>
     </Card>
     <Card sx={{marginTop:2}}>
        <CardContent>
        <Stack mt={2}>
                <Typography>
                Check which ones the trainer did not do
                {check_which_ones_the_trainer_did_not_do_1Error ? (
                          <FormHelperText style={{ color: 'red' }}>{helperText}</FormHelperText>
                        ) : null}{' '}
                </Typography>
                <Stack mt={2}>
                  <FormGroup>
                    
                    
                    
                    
                    <FormControlLabel value="Ask what did they learn last week?" control={<Checkbox />} label="Ask what did they learn last week?" onChange={(event) =>handleprerequisites('check_which_ones_the_trainer_did_not_do_1', event)}/>
                    <FormControlLabel value="Ask what did we do first? What did we do next?" control={<Checkbox />} label="Ask what did we do first? What did we do next?" onChange={(event) =>handleprerequisites('check_which_ones_the_trainer_did_not_do_1', event)}/>
                    <FormControlLabel value="Ask what did they learn from the story?" control={<Checkbox />} label="Ask what did they learn from the story?" onChange={(event) =>handleprerequisites('check_which_ones_the_trainer_did_not_do_1', event)}/>
                    <FormControlLabel value="Do you remember the drama/skit you all enacted?" control={<Checkbox />} label="Do you remember the drama/skit you all enacted?" onChange={(event) =>handleprerequisites('check_which_ones_the_trainer_did_not_do_1', event)}/>
                    <FormControlLabel value="Ask why is it important for them to plan their expenses and save?" control={<Checkbox />} label="Ask why is it important for them to plan their expenses and save?" onChange={(event) =>handleprerequisites('check_which_ones_the_trainer_did_not_do_1', event)}/>
                    <FormControlLabel value="Ask what challenges did they face in book-keeping?" control={<Checkbox />} label="Ask what challenges did they face in book-keeping?" onChange={(event) =>handleprerequisites('check_which_ones_the_trainer_did_not_do_1', event)}/>
                    <FormControlLabel value="Are there any success stories and challenges in implementing last week’s learning?" control={<Checkbox />} label="Are there any success stories and challenges in implementing last week’s learning?" onChange={(event) =>handleprerequisites('check_which_ones_the_trainer_did_not_do_1', event)}/>
                    <FormControlLabel value="Ask what did their children or family members say about this training when they shared?" control={<Checkbox />} label="Ask what did their children or family members say about this training when they shared?" onChange={(event) =>handleprerequisites('check_which_ones_the_trainer_did_not_do_1', event)}/>
                    
                    
                    
                    
                   
                   
                    
                  </FormGroup>
                </Stack>
              </Stack>
        
       
        </CardContent>
     </Card>
     
     
    
   
         
        </CardContent>
        </Grid>:null}
  
       { (day1Day2=='Day 2')?<Grid  backgroundColor={"#FFD580"}>
         
        <CardContent>
          <Card>
          <Card sx = {{backgroundColor:'#ff7424'}} mt={2}>
          <CardContent>
          <Typography variant = 'h5'>Module 5 (M5) Assets & Liabilities:</Typography>
          </CardContent>
        </Card>
        <CardContent>
        <Stack mt={2}>
        <Stack>
                <Typography variant="body1">
                How many women attended the training session?
                
                </Typography>
                <Stack mt={3}>
                  <TextField required inputProps={{ required: true }}  id="Correct Answer" label="Correct Answer" variant="outlined" 
                      onChange={(e) => setSendForm({ ...sendForm, how_many_women_attended_the_training_session_1:e.target.value})} value={sendForm?.how_many_women_attended_the_training_session_1}
                      />
                </Stack>
              </Stack>
              </Stack>
        </CardContent>
          </Card>
          <Card sx={{ marginTop:"20px"}}>
        <CardContent>
        <Stack mt={2}>
                <Typography>
                Check which ones the trainer did not do:
                {check_which_ones_the_trainer_did_not_do_2Error ? (
                          <FormHelperText style={{ color: 'red' }}>{helperText}</FormHelperText>
                        ) : null}{' '}
                </Typography>
                <Stack mt={2}>
                <FormGroup>
                <FormControlLabel control={<Checkbox  />}value='Ask what do you need to achieve your dreams and goals' label="Ask what do you need to achieve your dreams and goals?" onChange={(event) =>handleprerequisites('check_which_ones_the_trainer_did_not_do_2', event)}/>
            <FormControlLabel control={<Checkbox  />} value='Record the answer when asking - “My goal is to reach your village. If I want to come to your village, and I call and ask you how I can get here, what will you say'label="Record the answer when asking - “My goal is to reach your village. If I want to come to your village, and I call and ask you how I can get here, what will you say?”" onChange={(event) =>handleprerequisites('check_which_ones_the_trainer_did_not_do_2', event)}/>
            <FormControlLabel control={<Checkbox  />}value='Give out the correct answer if the women are not able to answer' label="Give out the correct answer if the women are not able to answer?" onChange={(event) =>handleprerequisites('check_which_ones_the_trainer_did_not_do_2', event)}/>
            <FormControlLabel control={<Checkbox  />}value='Make the connection to their own financial status and how it shows their financial health' label="Make the connection to their own financial status and how it shows their financial health?      " onChange={(event) =>handleprerequisites('check_which_ones_the_trainer_did_not_do_2', event)}/>
            <FormControlLabel control={<Checkbox  />}value='Use the chart to give an example of assets and liabilities' label="Use the chart to give an example of assets and liabilities?" onChange={(event) =>handleprerequisites('check_which_ones_the_trainer_did_not_do_2', event)}/>
            <FormControlLabel control={<Checkbox  />} value='Ask one of the women to come up to give the example of their own assets and liabilities'label="Ask one of the women to come up to give the example of their own assets and liabilities?" onChange={(event) =>handleprerequisites('check_which_ones_the_trainer_did_not_do_2', event)}/>
            <FormControlLabel control={<Checkbox  />}value='Talk about natural assets and liabilites' label="Talk about natural assets and liabilites" onChange={(event) =>handleprerequisites('check_which_ones_the_trainer_did_not_do_2', event)}/>
            <FormControlLabel control={<Checkbox  />}value='Was the debrief done' label="Was the debrief done? " onChange={(event) =>handleprerequisites('check_which_ones_the_trainer_did_not_do_2', event)} />
    </FormGroup>
                </Stack>
              </Stack>
        </CardContent>
          </Card>
          <Card sx={{ marginTop:"20px"}}>
        <CardContent>
        <Stack mt={2}>
                <Typography>
                During the debrief did the trainer not do the following:
                {during_the_debrief_did_the_trainer_did_not_do_the_followingError ? (
                          <FormHelperText style={{ color: 'red' }}>{helperText}</FormHelperText>
                        ) : null}{' '}
                </Typography>
                <Stack mt={2}>
                <FormGroup>
                <FormControlLabel control={<Checkbox  />} value='Ask one of the women to come and volunteer to explain her own assets and liabilities' label="Ask one of the women to come and volunteer to explain her own assets and liabilities?" onChange={(event) =>handleprerequisites('during_the_debrief_did_the_trainer_did_not_do_the_following', event)}/>
            <FormControlLabel control={<Checkbox  />} value='If no woman volunteers, use an imaginary example of Lakshmi' label="If no woman volunteers, use an imaginary example of Lakshmi" onChange={(event) =>handleprerequisites('during_the_debrief_did_the_trainer_did_not_do_the_following', event)}/>
            <FormControlLabel control={<Checkbox  />} value='Ask the women what they feel looking at their assets and liabilities' label="Ask the women what they feel looking at their assets and liabilities" onChange={(event) =>handleprerequisites('during_the_debrief_did_the_trainer_did_not_do_the_following', event)}/>
            <FormControlLabel control={<Checkbox  />} value='Clarified doubts of the women on the topic'label="Clarified doubts of the women on the topic? " onChange={(event) =>handleprerequisites('during_the_debrief_did_the_trainer_did_not_do_the_following', event)}/>
            <FormControlLabel control={<Checkbox  />} value='Reassured women (if distressed)' label="Reassured women (if distressed)" onChange={(event) =>handleprerequisites('during_the_debrief_did_the_trainer_did_not_do_the_following', event)}/>
            <FormControlLabel control={<Checkbox  />} value='Congratulate those in a good position' label="Congratulate those in a good position?" onChange={(event) =>handleprerequisites('during_the_debrief_did_the_trainer_did_not_do_the_following', event)}/>
            <FormControlLabel control={<Checkbox  />} value='Make them aware of different interest rates from different lenders' label="Make them aware of different interest rates from different lenders" onChange={(event) =>handleprerequisites('during_the_debrief_did_the_trainer_did_not_do_the_following', event)}/>
            <FormControlLabel control={<Checkbox  />} value='Ask the women if they feel they are using assets now to the fullest or are they remaining dormant' label="Ask the women if they feel they are using assets now to the fullest or are they remaining dormant? (More of a reflection question and need not be answered by the women)" onChange={(event) =>handleprerequisites('during_the_debrief_did_the_trainer_did_not_do_the_following', event)}/>
            <FormControlLabel control={<Checkbox  />} value='Re-emphasize why it is necessary to know this: in order to set realistic and achievable goals' label="Re-emphasize why it is necessary to know this: in order to set realistic and achievable goals." onChange={(event) =>handleprerequisites('during_the_debrief_did_the_trainer_did_not_do_the_following', event)}/>
    </FormGroup>
                </Stack>
              </Stack>
        </CardContent>
          </Card>
          <Card sx={{ marginTop:"20px"}}>
        <CardContent>
        <Stack mt={2}>
                <Typography>Were the participants responsive during the debriefing?
               { participantError ? (
                          <FormHelperText style={{ color: 'red' }}>{helperText}</FormHelperText>
                        ) : null}{' '}
                </Typography>
                <Stack mt={2}>
                <RadioGroup
                      aria-labelledby="demo-radio-buttons-group-label"
                      name="radio-buttons-group"
                      value={participant}
                      onChange={handleParticipant}
                    >
                    <div style={{display:"flex"}}>
                      <FormControlLabel value="No" control={<Radio style={{color:"#595959"}} />} label="No" />
                      <FormControlLabel value="Yes" control={<Radio style={{color:"#595959"}}  />} label="Yes" />
                      </div>
                    </RadioGroup>
                </Stack>
              </Stack>
       
        </CardContent>
     </Card> <Card sx={{ marginTop:"20px"}}>
        <CardContent>
        <Stack mt={2}>
                <Typography>Did any women leave the training session during or after this module?
                {did_any_women_leave_tring_session_dring_or_after_1st_moduleError ? (
                          <FormHelperText style={{ color: 'red' }}>{helperText}</FormHelperText>
                        ) : null}{' '}
                </Typography>
                <Stack mt={2}>
                <RadioGroup
                      aria-labelledby="demo-radio-buttons-group-label"
                      name="radio-buttons-group"
                      onChange={(e) => setSendForm({ ...sendForm, did_any_women_leave_tring_session_dring_or_after_1st_module:e.target.value})} value={sendForm?.did_any_women_leave_tring_session_dring_or_after_1st_module}   
                    >
                    <div style={{display:"flex"}}>
                      <FormControlLabel value="No" control={<Radio style={{color:"#595959"}} />} label="No" />
                      <FormControlLabel value="Yes" control={<Radio style={{color:"#595959"}}  />} label="Yes" />
                      </div>
                    </RadioGroup>
                </Stack>
              </Stack>
       
        </CardContent>
     </Card>
     {(sendForm?.did_any_women_leave_tring_session_dring_or_after_1st_module=="Yes")? <Card sx={{ marginTop:"20px"}}>
     <CardContent>
        <Stack mt={2}>
        <Stack>
                <Typography variant="body1">
                If so, how many?
                </Typography>
                <Stack mt={3}>
                  <TextField type='number'required inputProps={{ required: true }} id="Correct Answer" label="Correct Answer" variant="outlined" 
   onChange={(e) => setSendForm({ ...sendForm, if_so_how_many:e.target.value})} value={sendForm?.if_so_how_many}                  />
                </Stack>
              </Stack>
              </Stack>
        </CardContent>
        </Card>: null}
          <Card sx={{ marginTop:"20px"}}>
        <CardContent>
        <Stack mt={2}>
                <Typography>Did this module take 30 minutes as allotted?
               { did_this_module_take_30_minutes_as_allottedError ? (
                          <FormHelperText style={{ color: 'red' }}>{helperText}</FormHelperText>
                        ) : null}{' '}
                </Typography>
                <Stack mt={2}>
                <RadioGroup
                      aria-labelledby="demo-radio-buttons-group-label"
                      name="radio-buttons-group"
                      onChange={(e) => setSendForm({ ...sendForm, did_this_module_take_30_minutes_as_allotted:e.target.value})} value={sendForm?.did_this_module_take_30_minutes_as_allotted}   
                  
                    >
                    <div style={{display:"flex"}}>
                      <FormControlLabel value="No" control={<Radio style={{color:"#595959"}} />} label="No" />
                      <FormControlLabel value="Yes" control={<Radio style={{color:"#595959"}}  />} label="Yes" />
                      </div>
                    </RadioGroup>
                </Stack>
              </Stack>
       
        </CardContent>
     </Card>
        </CardContent>
        </Grid>
                :null}
       {(day1Day2=='Day 2')? <Grid  backgroundColor={"#FFD580"}>
         
        <CardContent>
          <Card>
          <Card sx = {{backgroundColor:'#ff7424'}} mt={2}>
          <CardContent>
          <Typography variant = 'h5'>Module 6 (M6): Goal setting game</Typography>
          </CardContent>
        </Card>
        <CardContent>
        <Stack mt={2}>
        <Stack>
                <Typography variant="body1">
                How many women attended the training session?
                </Typography>
                <Stack mt={3}>
                  <TextField type='number' required inputProps={{ required: true }} id="Correct Answer" label="Correct Answer" variant="outlined"
                      onChange={(e) => setSendForm({ ...sendForm, how_many_women_attended_the_training_session_2:e.target.value})} value={sendForm?.how_many_women_attended_the_training_session_2}
                      />
                </Stack>
              </Stack>
              </Stack>
        </CardContent>
          </Card>
          <Card sx={{ marginTop:"20px"}}>
        <CardContent>
        <Stack mt={2}>
                <Typography>
                Check which ones the trainer did not do:
                {check_which_ones_the_trainer_did_not_do_3Error ? (
                          <FormHelperText style={{ color: 'red' }}>{helperText}</FormHelperText>
                        ) : null}{' '}
                </Typography>
                <Stack mt={2}>
                <FormGroup>
                <FormControlLabel control={<Checkbox  />} label="Ask two or three participants to volunteer to play the game." value={'Ask two or three participants to volunteer to play the game'}onChange={(event) =>handleprerequisites('check_which_ones_the_trainer_did_not_do_3', event)}/>
            <FormControlLabel control={<Checkbox  />} label="Ensure the volunteer who is not playing the game, is out of earshot when relaying instructions to the volunteer who is playing first."value={'Ensure the volunteer who is not playing the game, is out of earshot when relaying instructions to the volunteer who is playing first'}onChange={(event) =>handleprerequisites('check_which_ones_the_trainer_did_not_do_3', event)} />
            <FormControlLabel control={<Checkbox  />} label="Give instructions step by step with all constraints added, to the first volunteer, records her goal (for the blocks) and blindfolds her before she begins." value={'Give instructions step by step with all constraints added, to the first volunteer, records her goal (for the blocks) and blindfolds her before she begins'}onChange={(event) =>handleprerequisites('check_which_ones_the_trainer_did_not_do_3', event)}/>
    </FormGroup>
                </Stack>
              </Stack>
        </CardContent>
          </Card>
          <Card sx={{ marginTop:"20px"}}>
        <CardContent>
        <Stack mt={2}>
                <Typography>
                Check which instructions the trainer did not do
                {check_which_instructions_the_trainer_did_not_doError ? (
                          <FormHelperText style={{ color: 'red' }}>{helperText}</FormHelperText>
                        ) : null}{' '}
                </Typography>
                <Stack mt={2}>
                <FormGroup>
                <FormControlLabel control={<Checkbox  />} label="Make the women understand how to arrange the wooden blocks" value={'Make the women understand how to arrange the wooden blocks'}onChange={(event) =>handleprerequisites('check_which_instructions_the_trainer_did_not_do', event)}/>
            <FormControlLabel control={<Checkbox  />} label="Instruct the women on which hand can they use" value={'Instruct the women on which hand can they use'}onChange={(event) =>handleprerequisites('check_which_instructions_the_trainer_did_not_do', event)}/>
            <FormControlLabel control={<Checkbox  />} label="Introduce them to a constraint – of them not being able to use the hand they said they will" value={'Introduce them to a constraint – of them not being able to use the hand they said they will'}onChange={(event) =>handleprerequisites('check_which_instructions_the_trainer_did_not_do', event)}/>
            <FormControlLabel control={<Checkbox  />} label="Introduce them to  another constraint – blindfold" value={'Introduce them to  another constraint – blindfold'}onChange={(event) =>handleprerequisites('check_which_instructions_the_trainer_did_not_do', event)}/>
            <FormControlLabel control={<Checkbox  />} label="Introduce to the idea - If you pick one block you have place it on top of what you have already arranged, you cannot put it back in the bowl" value={'Introduce to the idea - If you pick one block you have place it on top of what you have already arranged, you cannot put it back in the bowl'}onChange={(event) =>handleprerequisites('check_which_instructions_the_trainer_did_not_do', event)}/>
            <FormControlLabel control={<Checkbox  />} label="Ask the woman to state the number of blocks they will arrange and record it" value={'Ask the woman to state the number of blocks they will arrange and record it'}onChange={(event) =>handleprerequisites('check_which_instructions_the_trainer_did_not_do', event)}/>
    </FormGroup>
                </Stack>
              </Stack>
        </CardContent>
          </Card>
          <Card sx={{ marginTop:"20px"}}>
        <CardContent>
        <Stack mt={2}>
                <Typography>Repeat the activity with the second volunteer?
                {repeat_the_activity_with_the_second_volunteerError ? (
                          <FormHelperText style={{ color: 'red' }}>{helperText}</FormHelperText>
                        ) : null}{' '}
                </Typography>
                <Stack mt={2}>
                <RadioGroup
                      aria-labelledby="demo-radio-buttons-group-label"
                      name="radio-buttons-group"
                      onChange={(e) => setSendForm({ ...sendForm, repeat_the_activity_with_the_second_volunteer:e.target.value})} value={sendForm?.repeat_the_activity_with_the_second_volunteer}
                  
                    >
                    <div style={{display:"flex"}}>
                      <FormControlLabel value="No" control={<Radio style={{color:"#595959"}} />} label="No" />
                      <FormControlLabel value="Yes" control={<Radio style={{color:"#595959"}}  />} label="Yes" />
                      </div>
                    </RadioGroup>
                </Stack>
              </Stack>
       
        </CardContent>
     </Card>
          <Card sx={{ marginTop:"20px"}}>
        <CardContent>
        <Stack mt={2}>
                <Typography>
                During the debrief did the trainer not ask:
                {check_which_ones_the_trainer_did_not_do_2Error ? (
                          <FormHelperText style={{ color: 'red' }}>{helperText}</FormHelperText>
                        ) : null}{' '}
                </Typography>
                <Stack mt={2}>
                <FormGroup>
                <FormControlLabel control={<Checkbox  />} label="What did you see here?" value={'What did you see here'}onChange={(event) =>handleprerequisites('check_which_ones_the_trainer_did_not_do_2', event)}/>
            <FormControlLabel control={<Checkbox  />} label="Why was it important for A/B to set a goal (to arrange blocks)?" value={'Why was it important for A/B to set a goal (to arrange blocks)?'}onChange={(event) =>handleprerequisites('during_the_debrief_did_the_trainer_not_ask', event)}/>
            <FormControlLabel control={<Checkbox  />} label="Why do you think A/B reached her goal/did not reach her goal?"value={'Why do you think A/B reached her goal/did not reach her goal?'}onChange={(event) =>handleprerequisites('during_the_debrief_did_the_trainer_not_ask', event)} />
            <FormControlLabel control={<Checkbox  />} label="What external challenges did A/B face while playing the game?" value={'What external challenges did A/B face while playing the game?'}onChange={(event) =>handleprerequisites('during_the_debrief_did_the_trainer_not_ask', event)}/>
            <FormControlLabel control={<Checkbox  />} label="What kind of external challenges will you face in real life while setting goals?" value={'What kind of external challenges will you face in real life while setting goals?'}onChange={(event) =>handleprerequisites('during_the_debrief_did_the_trainer_not_ask', event)}/>
            <FormControlLabel control={<Checkbox  />} label="Isn’t life like this game? There are constraints in life as well. What will you do?"value={'Isn’t life like this game? There are constraints in life as well. What will you do?'}onChange={(event) =>handleprerequisites('during_the_debrief_did_the_trainer_not_ask', event)} />
            <FormControlLabel control={<Checkbox  />} label="What qualities and skills do you need to reach your goals?" value={'What qualities and skills do you need to reach your goals'}onChange={(event) =>handleprerequisites('during_the_debrief_did_the_trainer_not_ask', event)}/>
            <FormControlLabel control={<Checkbox  />} label="Confidence (overconfidence, under confidence), decision making, planning (Always give a number to the goal)"value={'Confidence (overconfidence, under confidence), decision making, planning (Always give a number to the goal)'}onChange={(event) =>handleprerequisites('during_the_debrief_did_the_trainer_not_ask', event)} />
            <FormControlLabel control={<Checkbox  />} label="Creating self-awareness about your own thinking/behavioural patterns"value={'Creating self-awareness about your own thinking/behavioural patterns'}onChange={(event) =>handleprerequisites('during_the_debrief_did_the_trainer_not_ask', event)} />
            <FormControlLabel control={<Checkbox  />} label="Did you see how goals shift with different constraints in life"value={'Did you see how goals shift with different constraints in life'}onChange={(event) =>handleprerequisites('during_the_debrief_did_the_trainer_not_ask', event)} />
            <FormControlLabel control={<Checkbox  />} label="There is support even if you have constraints, are you aware of that? Can you seek it?" value={'There is support even if you have constraints, are you aware of that? Can you seek it?'}onChange={(event) =>handleprerequisites('during_the_debrief_did_the_trainer_not_ask', event)}/> 
    </FormGroup>
                </Stack>
              </Stack>
        </CardContent>
          </Card>
          <Card sx={{ marginTop:"20px"}}>
        <CardContent>
        <Stack mt={2}>
                <Typography>Were the participants responsive during the debriefing?
                {were_the_participants_responsive_during_the_debriefing_1Error ? (
                          <FormHelperText style={{ color: 'red' }}>{helperText}</FormHelperText>
                        ) : null}{' '}
                </Typography>
                <Stack mt={2}>
                <RadioGroup
                      aria-labelledby="demo-radio-buttons-group-label"
                      name="radio-buttons-group"
                      onChange={(e) => setSendForm({ ...sendForm, were_the_participants_responsive_during_the_debriefing_1:e.target.value})} value={sendForm?.were_the_participants_responsive_during_the_debriefing_1}   
                  
                    >
                    <div style={{display:"flex"}}>
                      <FormControlLabel value="No" control={<Radio style={{color:"#595959"}} />} label="No" />
                      <FormControlLabel value="Yes" control={<Radio style={{color:"#595959"}}  />} label="Yes" />
                      </div>
                    </RadioGroup>
                </Stack>
              </Stack>
       
        </CardContent>
     </Card> <Card sx={{ marginTop:"20px"}}>
        <CardContent>
        <Stack mt={2}>
                <Typography>Did any women leave the training session during or after this module?
                {did_any_wmen_leave_the_trning_sesion_during_or_aftr_tis_modle_1Error ? (
                          <FormHelperText style={{ color: 'red' }}>{helperText}</FormHelperText>
                        ) : null}{' '}
                </Typography>
                <Stack mt={2}>
                <RadioGroup
                      aria-labelledby="demo-radio-buttons-group-label"
                      name="radio-buttons-group"
                      onChange={(e) => setSendForm({ ...sendForm, did_any_wmen_leave_the_trning_sesion_during_or_aftr_tis_modle_1:e.target.value})} value={sendForm?.did_any_wmen_leave_the_trning_sesion_during_or_aftr_tis_modle_1}
                  
                    >
                    <div style={{display:"flex"}}>
                      <FormControlLabel value="No" control={<Radio style={{color:"#595959"}} />} label="No" />
                      <FormControlLabel value="Yes" control={<Radio style={{color:"#595959"}}  />} label="Yes" />
                      </div>
                    </RadioGroup>
                </Stack>
              </Stack>
       
        </CardContent>
     </Card>
     
     {(sendForm?.did_any_wmen_leave_the_trning_sesion_during_or_aftr_tis_modle_1=='Yes')? <Card sx={{ marginTop:"20px"}}>
     <CardContent>
        <Stack mt={2}>
        <Stack>
                <Typography variant="body1">
                If so, how many?
                </Typography>
                <Stack mt={3}>
                  <TextField type='number'required inputProps={{ required: true }} id="Correct Answer" label="Correct Answer" variant="outlined"
   onChange={(e) => setSendForm({ ...sendForm, if_so_how_many_1:e.target.value})} value={sendForm?.if_so_how_many_1}                 
   />
                </Stack>
              </Stack>
              </Stack>
        </CardContent>
        </Card>: null}
          <Card sx={{ marginTop:"20px"}}>
        <CardContent>
        <Stack mt={2}>
                <Typography>Did this module take 30 minutes as allotted?
                {did_this_module_take_30_minutes_as_allotted_1Error ? (
                          <FormHelperText style={{ color: 'red' }}>{helperText}</FormHelperText>
                        ) : null}{' '}
                </Typography>
                <Stack mt={2}>
                <RadioGroup
                      aria-labelledby="demo-radio-buttons-group-label"
                      name="radio-buttons-group"
                      onChange={(e) => setSendForm({ ...sendForm, did_this_module_take_30_minutes_as_allotted_1:e.target.value})} value={sendForm?.did_this_module_take_30_minutes_as_allotted_1}                  
                    >
                    <div style={{display:"flex"}}>
                      <FormControlLabel value="No" control={<Radio style={{color:"#595959"}} />} label="No" />
                      <FormControlLabel value="Yes" control={<Radio style={{color:"#595959"}}  />} label="Yes" />
                      </div>
                    </RadioGroup>
                </Stack>
              </Stack>
       
        </CardContent>
     </Card>
        </CardContent>
        </Grid>:null}
        
       {(day1Day2=='Day 2')? <Grid  backgroundColor={"#FFD580"}>
         
        <CardContent>
          <Card>
          <Card sx = {{backgroundColor:'#ff7424'}} mt={2}>
          <CardContent>
          <Typography variant = 'h5'>Module-7 (M7) Financial goals</Typography>
          </CardContent>
        </Card>
        <CardContent>
        <Stack mt={2}>
        <Stack>
                <Typography variant="body1">
                How many women attended the training session?
                </Typography>
                <Stack mt={3}>
                  <TextField type='number' required inputProps={{ required: true }} id="Correct Answer" label="Correct Answer" variant="outlined"
                      onChange={(e) => setSendForm({ ...sendForm, how_many_women_attended_the_training_session_3:e.target.value})} value={sendForm?.how_many_women_attended_the_training_session_3}
                      />
                </Stack>
              </Stack>
              </Stack>
        </CardContent>
          </Card>
          <Card sx={{ marginTop:"20px"}}>
        <CardContent>
        <Stack mt={2}>
                <Typography>
                Check which ones the trainer did not do:
                {check_which_ones_the_trainer_did_not_do_4Error ? (
                          <FormHelperText style={{ color: 'red' }}>{helperText}</FormHelperText>
                        ) : null}{' '}
                </Typography>
                <Stack mt={2}>
                <FormGroup>
                <FormControlLabel control={<Checkbox  />} label="Ask what the difference between a dream and a goal is?" value={'Ask what the difference between a dream and a goal is'}onChange={(event) =>handleprerequisites('check_which_ones_the_trainer_did_not_do_4', event)} />
            <FormControlLabel control={<Checkbox  />} label="Record the answer" value={'Record the answer'}onChange={(event) =>handleprerequisites('check_which_ones_the_trainer_did_not_do_4', event)} />
            <FormControlLabel control={<Checkbox  />} label="Give an example" value={'Give an example'}onChange={(event) =>handleprerequisites('check_which_ones_the_trainer_did_not_do_4', event)} />
            <FormControlLabel control={<Checkbox  />} label="Tell the participants the difference between dream and goal"value={'Tell the participants the difference between dream and goal'}onChange={(event) =>handleprerequisites('check_which_ones_the_trainer_did_not_do_4', event)}  />
            <FormControlLabel control={<Checkbox  />} label="Ask how a dream can be converted into a goal?" value={'Ask how a dream can be converted into a goal'}onChange={(event) =>handleprerequisites('check_which_ones_the_trainer_did_not_do_4', event)} />
            <FormControlLabel control={<Checkbox  />} label="Ask for one volunteer who is willing to come forward and ask them to chart their financial goal on the board?" value={'Ask for one volunteer who is willing to come forward and ask them to chart their financial goal on the board'}onChange={(event) =>handleprerequisites('check_which_ones_the_trainer_did_not_do_4', event)} />
            <FormControlLabel control={<Checkbox  />} label="If no volunteer comes up use Lakshmi’s goal of buying a push cart for her vegetable business as an example?" value={'If no volunteer comes up use Lakshmi’s goal of buying a push cart for her vegetable business as an example'}onChange={(event) =>handleprerequisites('check_which_ones_the_trainer_did_not_do_4', event)} />
            <FormControlLabel control={<Checkbox  />} label="Use the chart given to explain"value={'Use the chart given to explain'}onChange={(event) =>handleprerequisites('check_which_ones_the_trainer_did_not_do_4', event)}  />    </FormGroup>
                </Stack>
              </Stack>
        </CardContent>
          </Card>
          <Card sx={{ marginTop:"20px"}}>
        <CardContent>
        <Stack mt={2}>
                <Typography>
                The trainer did not ask
                {the_trainer_did_not_askError ? (
                          <FormHelperText style={{ color: 'red' }}>{helperText}</FormHelperText>
                        ) : null}{' '}
                </Typography>
                <Stack mt={2}>
                <FormGroup>
                <FormControlLabel control={<Checkbox  />} label="How much will it cost?"value={'How much will it cost'}onChange={(event) =>handleprerequisites('the_trainer_did_not_ask', event)} />
            <FormControlLabel control={<Checkbox  />} label="In how many years do you want to achieve this goal?" value={'In how many years do you want to achieve this goal'}onChange={(event) =>handleprerequisites('the_trainer_did_not_ask', event)}/>
            <FormControlLabel control={<Checkbox  />} label="How much loan do you want to take for it?" value={'How much loan do you want to take for it'}onChange={(event) =>handleprerequisites('the_trainer_did_not_ask', event)}/>
            <FormControlLabel control={<Checkbox  />} label="Do you know where you will take a loan from?" value={'Do you know where you will take a loan from'}onChange={(event) =>handleprerequisites('the_trainer_did_not_ask', event)}/>
            <FormControlLabel control={<Checkbox  />} label="What is your goal?" value={'What is your goal'}onChange={(event) =>handleprerequisites('the_trainer_did_not_ask', event)}/>
            <FormControlLabel control={<Checkbox  />} label="How much will you save for the goal?" value={'How much will you save for the goal'}onChange={(event) =>handleprerequisites('the_trainer_did_not_ask', event)}/>    </FormGroup>
                </Stack>
              </Stack>
        </CardContent>
          </Card>
          <Card sx={{ marginTop:"20px"}}>
        <CardContent>
        <Stack mt={2}>
                <Typography>
                What did the trainer not do
                {what_did_the_trainer_not_doError ? (
                          <FormHelperText style={{ color: 'red' }}>{helperText}</FormHelperText>
                        ) : null}{' '}
                </Typography>
                <Stack mt={2}>
                <FormGroup>
                <FormControlLabel control={<Checkbox  />} label="Made sure that this was done in the books given to the participants and they write it in the book themselves or with the help of someone else " value={'Made sure that this was done in the books given to the participants and they write it in the book themselves or with the help of someone else'}onChange={(event) =>handleprerequisites('what_did_the_trainer_not_do', event)}/>
            <FormControlLabel control={<Checkbox  />} label="Break down financial goal into yearly, monthly, weekly, daily money-saving goals?" value={'Break down financial goal into yearly, monthly, weekly, daily money-saving goals'}onChange={(event) =>handleprerequisites('what_did_the_trainer_not_do', event)}/>
            <FormControlLabel control={<Checkbox  />} label="Ask do you think you will be able to save this much for this particular goal apart from your daily expenses and other obligations?" value={'Ask do you think you will be able to save this much for this particular goal apart from your daily expenses and other obligations'}onChange={(event) =>handleprerequisites('what_did_the_trainer_not_do', event)}/>
            <FormControlLabel control={<Checkbox  />} label="If women respond yes to above, congratulate the women for setting their goals and motivate her to start the process?" value={'If women respond yes to above, congratulate the women for setting their goals and motivate her to start the process'}onChange={(event) =>handleprerequisites('what_did_the_trainer_not_do', event)}/>
            <FormControlLabel control={<Checkbox  />} label="If no, ask can you increase the number of years in which you want to achieve this goal or can you increase your income to be able to save more or can you take more of the loan for the goal?" value={'If no, ask can you increase the number of years in which you want to achieve this goal or can you increase your income to be able to save more or can you take more of the loan for the goal'}onChange={(event) =>handleprerequisites('what_did_the_trainer_not_do', event)}/>
            <FormControlLabel control={<Checkbox  />} label="Go around the group and help all participants set a financial goal. Goal = time + money + financial plan?" value={'Go around the group and help all participants set a financial goal. Goal = time + money + financial plan'}onChange={(event) =>handleprerequisites('what_did_the_trainer_not_do', event)}/>
    </FormGroup>
                </Stack>
              </Stack>
        </CardContent>
          </Card>
         
          <Card sx={{ marginTop:"20px"}}>
        <CardContent>
        <Stack mt={2}>
                <Typography>
                During the debrief did the trainer not ask:
                {during_the_debrief_did_the_trainer_not_ask_1Error ? (
                          <FormHelperText style={{ color: 'red' }}>{helperText}</FormHelperText>
                        ) : null}{' '}
                </Typography>
                <Stack mt={2}>
                <FormGroup>
                <FormControlLabel control={<Checkbox  />} label="Does your goal look realistic to you?" value={'Does your goal look realistic to you'}onChange={(event) =>handleprerequisites('during_the_debrief_did_the_trainer_not_ask_1', event)}/>
                <FormControlLabel control={<Checkbox  />} label="Does your goal look realistic to you?" value={'Does your goal look realistic to you'}onChange={(event) =>handleprerequisites('during_the_debrief_did_the_trainer_not_ask_1', event)}/>
            <FormControlLabel control={<Checkbox  />} label="Do you have more than one goal to achieve? Are they of equal priority or can you postpone one to achieve the other?" value={'Do you have more than one goal to achieve? Are they of equal priority or can you postpone one to achieve the other'}onChange={(event) =>handleprerequisites('during_the_debrief_did_the_trainer_not_ask_1', event)}/>
            <FormControlLabel control={<Checkbox  />} label="What can you do if both goals are priority for you?" value={'What can you do if both goals are priority for you'}onChange={(event) =>handleprerequisites('during_the_debrief_did_the_trainer_not_ask_1', event)}/>
            <FormControlLabel control={<Checkbox  />} label="Can you increase your savings or your income??"value={''}onChange={(event) =>handleprerequisites('during_the_debrief_did_the_trainer_not_ask_1', event)} />
            <FormControlLabel control={<Checkbox  />} label="Can you increase the time frame to reach the goal?" value={'Can you increase the time frame to reach the goal'}onChange={(event) =>handleprerequisites('during_the_debrief_did_the_trainer_not_ask_1', event)}/>
    </FormGroup>
                </Stack>
              </Stack>
        </CardContent>
          </Card>
          <Card sx={{ marginTop:"20px"}}>
        <CardContent>
        <Stack mt={2}>
                <Typography>Were the participants responsive during the debriefing?
                {were_the_participants_responsive_during_the_debriefing_2Error ? (
                          <FormHelperText style={{ color: 'red' }}>{helperText}</FormHelperText>
                        ) : null}{' '}
                </Typography>
                <Stack mt={2}>
                <RadioGroup
                      aria-labelledby="demo-radio-buttons-group-label"
                      name="radio-buttons-group"
                      onChange={(e) => setSendForm({ ...sendForm, were_the_participants_responsive_during_the_debriefing_2:e.target.value})} value={sendForm?.were_the_participants_responsive_during_the_debriefing_2}                  
                    >
                    <div style={{display:"flex"}}>
                      <FormControlLabel value="No" control={<Radio style={{color:"#595959"}} />} label="No" />
                      <FormControlLabel value="Yes" control={<Radio style={{color:"#595959"}}  />} label="Yes" />
                      </div>
                    </RadioGroup>
                </Stack>
              </Stack>
       
        </CardContent>
     </Card> <Card sx={{ marginTop:"20px"}}>
        <CardContent>
        <Stack mt={2}>
                <Typography>Did any women leave the training session during or after this module?
                {did_any_wmen_leave_the_trning_sesion_during_or_aftr_tis_modle_2Error ? (
                          <FormHelperText style={{ color: 'red' }}>{helperText}</FormHelperText>
                        ) : null}{' '}
                </Typography>
                <Stack mt={2}>
                <RadioGroup
                      aria-labelledby="demo-radio-buttons-group-label"
                      name="radio-buttons-group"
                      onChange={(e) => setSendForm({ ...sendForm, did_any_wmen_leave_the_trning_sesion_during_or_aftr_tis_modle_2:e.target.value})} value={sendForm?.did_any_wmen_leave_the_trning_sesion_during_or_aftr_tis_modle_2}                  
                    >
                    <div style={{display:"flex"}}>
                      <FormControlLabel value="No" control={<Radio style={{color:"#595959"}} />} label="No" />
                      <FormControlLabel value="Yes" control={<Radio style={{color:"#595959"}}  />} label="Yes" />
                      </div>
                    </RadioGroup>
                </Stack>
              </Stack>
       
        </CardContent>
     </Card>
    {(sendForm?.did_any_wmen_leave_the_trning_sesion_during_or_aftr_tis_modle_2=='Yes')? <Card sx={{ marginTop:"20px"}}>
     <CardContent>
        <Stack mt={2}>
        <Stack>
                <Typography variant="body1">
                If so, how many?
                </Typography>
                <Stack mt={3}>
                  <TextField type='number' required inputProps={{ required: true }} id="Correct Answer" label="Correct Answer" variant="outlined" 
                  onChange={(e) => setSendForm({ ...sendForm, if_so_how_many_2:e.target.value})} value={sendForm?.if_so_how_many_2} 
                  />
                </Stack>
              </Stack>
              </Stack>
        </CardContent>
        </Card>: null}
          <Card sx={{ marginTop:"20px"}}>
        <CardContent>
        <Stack mt={2}>
                <Typography>Did this module take 30 minutes as allotted?
                {did_this_module_take_30_minutes_as_allotted_3Error ? (
                          <FormHelperText style={{ color: 'red' }}>{helperText}</FormHelperText>
                        ) : null}{' '}
                </Typography>
                <Stack mt={2}>
                <RadioGroup
                      aria-labelledby="demo-radio-buttons-group-label"
                      name="radio-buttons-group"
                      onChange={(e) => setSendForm({ ...sendForm, did_this_module_take_30_minutes_as_allotted_3:e.target.value})} value={sendForm?.did_this_module_take_30_minutes_as_allotted_3}                  
                    >
                    <div style={{display:"flex"}}>
                      <FormControlLabel value="No" control={<Radio style={{color:"#595959"}} />} label="No" />
                      <FormControlLabel value="Yes" control={<Radio style={{color:"#595959"}}  />} label="Yes" />
                      </div>
                    </RadioGroup>
                </Stack>
              </Stack>
       
        </CardContent>
     </Card>
        </CardContent>
        </Grid> :null}
      
     
       { (day1Day2=='Day 2')?<Grid  backgroundColor={"#FFD580"}>
         
        <CardContent>
          <Card>
          <Card sx = {{backgroundColor:'#ff7424'}} mt={2}>
          <CardContent>
          <Typography variant = 'h5'>Module 8 (M8): Loans - group discussion of case studies</Typography>
          </CardContent>
        </Card>
        <CardContent>
        <Stack mt={2}>
        <Stack>
                <Typography variant="body1">
                How many women attended the training session?
                </Typography>
                <Stack mt={3}>
                  <TextField type='number' required inputProps={{ required: true }} id="Correct Answer" label="Correct Answer" variant="outlined"
                      onChange={(e) => setSendForm({ ...sendForm, how_many_women_attended_the_training_session_4:e.target.value})} value={sendForm?.how_many_women_attended_the_training_session_4}
                      />
                </Stack>
              </Stack>
              </Stack>
        </CardContent>
          </Card>
          <Card sx={{ marginTop:"20px"}}>
        <CardContent>
        <Stack mt={2}>
                <Typography>
                Check which ones the trainer did not do:
                {check_which_ones_the_trainer_did_not_do_5Error ? (
                          <FormHelperText style={{ color: 'red' }}>{helperText}</FormHelperText>
                        ) : null}{' '}
                </Typography>
                <Stack mt={2}>
                <FormGroup>
            <FormControlLabel control={<Checkbox  />} label="Make 4 groups from the entire cohort of participants "value={'Make 4 groups from the entire cohort of participants'}onChange={(event) =>handleprerequisites('check_which_ones_the_trainer_did_not_do_5', event)} />
            <FormControlLabel control={<Checkbox  />} label="Give a case study to each group" value={'Give a case study to each group'}onChange={(event) =>handleprerequisites('check_which_ones_the_trainer_did_not_do_5', event)}/>
            <FormControlLabel control={<Checkbox  />} label="Instruct groups to read the case study among themselves and come up with solutions in 3-5 minutes." value={'Instruct groups to read the case study among themselves and come up with solutions in 3-5 minutes'}onChange={(event) =>handleprerequisites('check_which_ones_the_trainer_did_not_do_5', event)}/>
            <FormControlLabel control={<Checkbox  />} label="Made sure that the impression given was not of that loans are not necessary. They are important but to know the source of the loan, own credibility, credit worthiness, credit utilization and repayment strategy." value={'Made sure that the impression given was not of that loans are not necessary. They are important but to know the source of the loan, own credibility, credit worthiness, credit utilization and repayment strategy'}onChange={(event) =>handleprerequisites('check_which_ones_the_trainer_did_not_do_5', event)}/>
    </FormGroup>
                </Stack>
              </Stack>
        </CardContent>
          </Card>
          <Card sx={{ marginTop:"20px"}}>
        <CardContent>
        <Stack mt={2}>
                <Typography>
                During the debrief did the trainer not ask:
                {during_the_debrief_did_the_trainer_not_ask_2Error ? (
                          <FormHelperText style={{ color: 'red' }}>{helperText}</FormHelperText>
                        ) : null}{' '}
                </Typography>
                <Stack mt={2}>
                <FormGroup>
            <FormControlLabel control={<Checkbox  />} label="What was your group’s story or case study about?" value={'What was your group’s story or case study about'}onChange={(event) =>handleprerequisites('during_the_debrief_did_the_trainer_not_ask_2', event)}/>
            <FormControlLabel control={<Checkbox  />} label="How much does that person need?" value={'How much does that person need'}onChange={(event) =>handleprerequisites('during_the_debrief_did_the_trainer_not_ask_2', event)}/>
            <FormControlLabel control={<Checkbox  />} label="How much do they have in their hand as saving or earning?" value={'How much do they have in their hand as saving or earning'}onChange={(event) =>handleprerequisites('during_the_debrief_did_the_trainer_not_ask_2', event)}/>
            <FormControlLabel control={<Checkbox  />} label="What advice would you give that person?" value={'What advice would you give that person'}onChange={(event) =>handleprerequisites('during_the_debrief_did_the_trainer_not_ask_2', event)}/>
            <FormControlLabel control={<Checkbox  />} label="When can you save and reach a goal? When will you need to take a loan to reach it?" value={'When can you save and reach a goal? When will you need to take a loan to reach it'}onChange={(event) =>handleprerequisites('during_the_debrief_did_the_trainer_not_ask_2', event)}/>
            <FormControlLabel control={<Checkbox  />} label="Where can you get loans with minimum or no interest?" value={'Where can you get loans with minimum or no interest'}onChange={(event) =>handleprerequisites('during_the_debrief_did_the_trainer_not_ask_2', event)}/>
            <FormControlLabel control={<Checkbox  />} label="What are productive loans? What are consumption loans?" value={'What are productive loans? What are consumption loans'}onChange={(event) =>handleprerequisites('during_the_debrief_did_the_trainer_not_ask_2', event)}/>
    </FormGroup>
                </Stack>
              </Stack>
        </CardContent>
          </Card>
          <Card sx={{ marginTop:"20px"}}>
        <CardContent>
        <Stack mt={2}>
                <Typography>Were the participants responsive during the debriefing?
                {were_the_participants_responsive_during_the_debriefing_3Error ? (
                          <FormHelperText style={{ color: 'red' }}>{helperText}</FormHelperText>
                        ) : null}{' '}
                </Typography>
                <Stack mt={2}>
                <RadioGroup
                      aria-labelledby="demo-radio-buttons-group-label"
                      name="radio-buttons-group"
                      onChange={(e) => setSendForm({ ...sendForm, were_the_participants_responsive_during_the_debriefing_3:e.target.value})} value={sendForm?.were_the_participants_responsive_during_the_debriefing_3}                  
                    >
                    <div style={{display:"flex"}}>
                      <FormControlLabel value="No" control={<Radio style={{color:"#595959"}} />} label="No" />
                      <FormControlLabel value="Yes" control={<Radio style={{color:"#595959"}}  />} label="Yes" />
                      </div>
                    </RadioGroup>
                </Stack>
              </Stack>
       
        </CardContent>
     </Card> <Card sx={{ marginTop:"20px"}}>
        <CardContent>
        <Stack mt={2}>
                <Typography>Did any women leave the training session during or after this module?
                {did_any_wmen_leave_the_trning_sesion_during_or_aftr_tis_modle_3Error ? (
                          <FormHelperText style={{ color: 'red' }}>{helperText}</FormHelperText>
                        ) : null}{' '}
                </Typography>
                <Stack mt={2}>
                <RadioGroup
                      aria-labelledby="demo-radio-buttons-group-label"
                      name="radio-buttons-group"
                      onChange={(e) => setSendForm({ ...sendForm, did_any_wmen_leave_the_trning_sesion_during_or_aftr_tis_modle_3:e.target.value})} value={sendForm?.did_any_wmen_leave_the_trning_sesion_during_or_aftr_tis_modle_3}                  
                    >
                    <div style={{display:"flex"}}>
                      <FormControlLabel value="No" control={<Radio style={{color:"#595959"}} />} label="No" />
                      <FormControlLabel value="Yes" control={<Radio style={{color:"#595959"}}  />} label="Yes" />
                      </div>
                    </RadioGroup>
                </Stack>
              </Stack>
       
        </CardContent>
     </Card>
    {(sendForm?.did_any_wmen_leave_the_trning_sesion_during_or_aftr_tis_modle_3=='Yes')? <Card sx={{ marginTop:"20px"}}>
     <CardContent>
        <Stack mt={2}>
        <Stack>
                <Typography variant="body1">
                If so, how many?
                </Typography>
                <Stack mt={3}>
                  <TextField type='number' required inputProps={{ required: true }} id="Correct Answer" label="Correct Answer" variant="outlined" 
 onChange={(e) => setSendForm({ ...sendForm, if_so_how_many_3:e.target.value})} value={sendForm?.if_so_how_many_3}                   />
                </Stack>
              </Stack>
              </Stack>
        </CardContent>
        </Card>: null}
          <Card sx={{ marginTop:"20px"}}>
        <CardContent>
        <Stack mt={2}>
                <Typography>Did this module take 30 minutes as allotted?
                {did_this_module_take_30_minutes_as_allotted_2Error ? (
                          <FormHelperText style={{ color: 'red' }}>{helperText}</FormHelperText>
                        ) : null}{' '}
                </Typography>
                <Stack mt={2}>
                <RadioGroup
                      aria-labelledby="demo-radio-buttons-group-label"
                      name="radio-buttons-group"
                      onChange={(e) => setSendForm({ ...sendForm, did_this_module_take_30_minutes_as_allotted_2:e.target.value})} value={sendForm?.did_this_module_take_30_minutes_as_allotted_2}                  
                    >
                    <div style={{display:"flex"}}>
                      <FormControlLabel value="No" control={<Radio style={{color:"#595959"}} />} label="No" />
                      <FormControlLabel value="Yes" control={<Radio style={{color:"#595959"}}  />} label="Yes" />
                      </div>
                    </RadioGroup>
                </Stack>
              </Stack>
       
        </CardContent>
     </Card>
        </CardContent>
        </Grid>:null}
       { (day1Day2=='Day 2')?<Grid  backgroundColor={"#FFD580"}>
        <CardContent>
          <Card>
          <Card sx = {{backgroundColor:'#ff7424'}} mt={2}>
          <CardContent>
          <Typography variant = 'h5'>Post training on Day 2  </Typography>
          </CardContent>
        </Card>
        <CardContent>
        <Stack mt={2}>
                <Typography>
                Check which ones the trainer did not do:
                {check_which_ones_the_trainer_did_not_do_6Error ? (
                          <FormHelperText style={{ color: 'red' }}>{helperText}</FormHelperText>
                        ) : null}{' '}
                </Typography>
                <Stack mt={2}>
                <FormGroup>
            <FormControlLabel control={<Checkbox  />} label="Tell Buzz India wants to keep in touch with the community through the Buzz Gelathi for a continuous learning process and sustainable change" value={'Tell Buzz India wants to keep in touch with the community through the Buzz Gelathi for a continuous learning process and sustainable change'}onChange={(event) =>handleprerequisites('check_which_ones_the_trainer_did_not_do_6', event)}/>
            <FormControlLabel control={<Checkbox  />} label="Ask for nomination of the Buzz Gelathi amongst the group." value={'Ask for nomination of the Buzz Gelathi amongst the group.'}onChange={(event) =>handleprerequisites('check_which_ones_the_trainer_did_not_do_6', event)}/>
            <FormControlLabel control={<Checkbox  />} label="Made clear that a woman can nominate herself too" value={'Made clear that a woman can nominate herself too'}onChange={(event) =>handleprerequisites('check_which_ones_the_trainer_did_not_do_6', event)}/>
            <FormControlLabel control={<Checkbox  />} label="Respect a woman’s decision to not be a Gelathi"value={'Respect a woman’s decision to not be a Gelathi'}onChange={(event) =>handleprerequisites('check_which_ones_the_trainer_did_not_do_6', event)} />
            <FormControlLabel control={<Checkbox  />} label="Thank the group for being a wonderful audience." value={'Thank the group for being a wonderful audience.'}onChange={(event) =>handleprerequisites('check_which_ones_the_trainer_did_not_do_6', event)}/>
            <FormControlLabel control={<Checkbox  />} label="Trainer celebrate the certificate distribution." value={'Trainer celebrate the certificate distribution.'}onChange={(event) =>handleprerequisites('check_which_ones_the_trainer_did_not_do_6', event)}/>
    </FormGroup>
                </Stack>
              </Stack>
        </CardContent>
          </Card>
        </CardContent>
        </Grid> :null}
       {( programAssessment==3 )?  <Grid  backgroundColor={"#FFD580"}>
        <CardContent>
          <Card>
          <Card sx = {{backgroundColor:'#ff7424'}} mt={2}>
          <CardContent>
          <Typography variant = 'h5'>Self Shakti by Gelathi  </Typography>
          </CardContent>
        </Card>
        <CardContent><Stack mt={2}> <Stack>
                <Typography variant="body1">
                Training Quality assessment
                </Typography>
              
              </Stack></Stack></CardContent>
        </Card>
        <Card sx={{ marginTop:"20px"}}>
        <CardContent><Stack mt={2}> <Stack>
                <Typography variant="body1">
                Name of the Gelathi being evaluated
                </Typography>
                <Stack mt={3}>
                  <TextField required inputProps={{ required: true }} id="Correct Answer" label="Correct Answer" variant="outlined" 
                                        onChange={(e) => setSendForm({ ...sendForm, name_of_the_gelathi_being_evaluated:e.target.value})} value={sendForm?.name_of_the_gelathi_being_evaluated}
                  />
                </Stack>
              </Stack></Stack></CardContent>
        </Card>
              <Stack mt={2}>
<Card>
              <CardContent>
        <Stack mt={2}>
                <Typography>
               Days/ Modules
               {days_modules2Error ? (
                          <FormHelperText style={{ color: 'red' }}>{helperText}</FormHelperText>
                        ) : null}{' '}
                </Typography>
                <Stack mt={2}>
            
    <RadioGroup 
                     name="radio-buttons-group"
                     onChange={(e) => setSendForm({ ...sendForm, days_modules:e.target.value})} value={sendForm?.days_modules}
                   >
                    
                    <FormControlLabel control={<Radio  />} label="Session-1  Introduction" value="Session-1 _ Introduction"/>
                    <FormControlLabel control={<Radio  />} label="Session-2  Financial Management" value="Session-2 _ Financial Management" />
                        <FormControlLabel control={<Radio  />} label="Session-3 Basics of an enterprise" value="Session-3 _Basics of an enterprise"/>
                        <FormControlLabel control={<Radio  />} label="Session-4 Building Relationship" value="Session-4 _Building Relationship"/>
                        <FormControlLabel control={<Radio  />} label="Session-5 Assets and Liabilities" value="Session-5 _Assets and Liabilities"/>
                        <FormControlLabel control={<Radio  />} label="Session-6 Goal setting game" value="Session-6 _Goal setting game"/>
                        <FormControlLabel control={<Radio  />} label="Session-7 Financial Goals" value="Session-7 _Financial Goals"/>
                        <FormControlLabel control={<Radio  />} label="Session-8 Loans-Group discussion of Case Studies" value="Session-8 _Loans-Group discussion of Case Studies"/>
                   
                  </RadioGroup>
                </Stack>
              </Stack>
        </CardContent></Card></Stack>
         
        </CardContent>
        </Grid>:null}
        {( sendForm?.days_modules=='Session-1 _ Introduction' )? <Grid  backgroundColor={"#FFD580"}>
         
         <CardContent>
           <Card>
           <Card sx = {{backgroundColor:'#ff7424'}} mt={2}>
           <CardContent>
           <Typography variant = 'h5'>Session-1 _ Introduction</Typography>
           <Typography variant='h6'>Before the training starts on Session 1</Typography>
           </CardContent>
         </Card>
         <CardContent>
         <Stack mt={2}>
         <Stack>
                 <Typography variant="body1">
                 Check which ones the Gelathi did not do
                 {check_which_ones_the_gelathi_did_not_doError ? (
                          <FormHelperText style={{ color: 'red' }}>{helperText}</FormHelperText>
                        ) : null}{' '}
                 </Typography>
                 <Stack mt={2}>
                 <FormGroup>
             <FormControlLabel control={<Checkbox  />} value={'Distribute the books and pencils to the participants with respect'} label="Distribute the books and pencils to the participants with respect"
             onChange={(event) =>handleprerequisites('check_which_ones_the_gelathi_did_not_do', event)}/>
           
     </FormGroup>
                 </Stack>
               </Stack>
               </Stack>
         </CardContent>   </Card>
         
         <Card sx={{ marginTop:"20px"}}>
      <CardContent>
         <Stack mt={2}>
         <Stack>
                 <Typography variant="body1">
                 How many women attended the training session? 
                 </Typography>
                 <Stack mt={3}>
                   <TextField type='number' required inputProps={{ required: true }} id="Correct Answer" label="Correct Answer" variant="outlined"
                        onChange={(e) => setSendForm({ ...sendForm, how_many_women_attended_the_training_session:e.target.value})} value={sendForm?.how_many_women_attended_the_training_session}                  
                        />
                 </Stack>
               </Stack>
               </Stack>
         </CardContent>
         </Card> 
 
        
          
           <Card sx={{ marginTop:"20px"}}>
         <CardContent>
         <Stack mt={2}>
                 <Typography>
                 Check which ones the Gelathi did not do
                 {check_which_ones_the_gelathi_did_not_do_1Error ? (
                          <FormHelperText style={{ color: 'red' }}>{helperText}</FormHelperText>
                        ) : null}{' '}
                 </Typography>
               
                 <FormGroup>
             <FormControlLabel control={<Checkbox  />}value={'Introduce Buzz India'} label="Introduce Buzz India" onChange={(event) =>handleprerequisites('check_which_ones_the_gelathi_did_not_do_1', event)}/>
             <FormControlLabel control={<Checkbox  />}value={'Introduce herself'} label="Introduce herself" onChange={(event) =>handleprerequisites('check_which_ones_the_gelathi_did_not_do_1', event)} />
             <FormControlLabel control={<Checkbox  />}value={'Ask the women to introduce themselves'} label="Ask the women to introduce themselves"onChange={(event) =>handleprerequisites('check_which_ones_the_gelathi_did_not_do_1', event)}  />
             <FormControlLabel control={<Checkbox  />}value={'Sing the Buzz song along with the participants'} label="Sing the Buzz song along with the participants" onChange={(event) =>handleprerequisites('check_which_ones_the_gelathi_did_not_do_1', event)} />
             <FormControlLabel control={<Checkbox  />}value={'Explain why the Buzz India training is only for women and not men'} label="Explain why the Buzz India training is only for women and not men" onChange={(event) =>handleprerequisites('check_which_ones_the_gelathi_did_not_do_1', event)} />
          
     </FormGroup>
                 </Stack>
              
         </CardContent>
           </Card>
 
          
        
     </CardContent>
         </Grid>:null}
         
         {( sendForm?.days_modules=='Session-1 _ Introduction' )? <Grid  backgroundColor={"#FFD580"}>
         
         <CardContent>
           <Card>
           <Card sx = {{backgroundColor:'#ff7424'}} mt={2}>
           <CardContent>
           <Typography variant = 'h5'>Post - Session:</Typography>
           </CardContent>
         </Card>
         <CardContent>
         <Stack mt={2}>
         <Stack>
                 <Typography variant="body1">
                 Check which ones the Gelathi did not do
                 {check_which_ones_the_gelathi_did_not_do_2Error ? (
                          <FormHelperText style={{ color: 'red' }}>{helperText}</FormHelperText>
                        ) : null}{' '}
                 </Typography>
                 <Stack mt={2}>
                 <FormGroup>
             <FormControlLabel value={'Did express Gelathis opinion and participants feedback about the training'} control={<Checkbox  />} label="Did express Gelathi's opinion and participants feedback about the training" onChange={(event) =>handleprerequisites('check_which_ones_the_gelathi_did_not_do_2', event)}/>
             <FormControlLabel value={'Tell the women what will be covered in the next training session'}  control={<Checkbox  />} label="Tell the women what will be covered in the next training session?" onChange={(event) =>handleprerequisites('check_which_ones_the_gelathi_did_not_do_2', event)}/>
             <FormControlLabel value={'Ask them to share with their family what they have learnt'}  control={<Checkbox  />} label="Ask them to share with their family what they have learnt?" onChange={(event) =>handleprerequisites('check_which_ones_the_gelathi_did_not_do_2', event)}/>
           
     </FormGroup>
                 </Stack>
               </Stack>
               </Stack>
         </CardContent>   </Card>
        
     </CardContent>
         </Grid>:null}
 
       {  ( sendForm?.days_modules=='Session-2 _ Financial Management' )?<Grid  backgroundColor={"#FFD580"}>
         
         <CardContent>
           <Card>
           <Card sx = {{backgroundColor:'#ff7424'}} mt={2}>
           <CardContent>
           <Typography variant = 'h5'>Session-2 Financial Management</Typography>
           </CardContent>
         </Card>
         <CardContent>
         <Stack mt={2}>
         <Stack>
                 <Typography variant="body1">
                 Check which ones the Gelathi did not do
                 {check_which_ones_the_gelathi_did_not_doError ? (
                          <FormHelperText style={{ color: 'red' }}>{helperText}</FormHelperText>
                        ) : null}{' '}
                 </Typography>
                 <Stack mt={2}>
                 <FormGroup>
             <FormControlLabel control={<Checkbox  />}value={'Show the participants the video about Saraswathi and Lakshmi?'} label="Show the participants the video about Saraswathi and Lakshmi?"  onChange={(event) =>handleprerequisites('check_which_ones_the_gelathi_did_not_do', event)}/>
             <FormControlLabel control={<Checkbox  />}value={'Ask why is saving necessary?'} label="Ask why is saving necessary?" onChange={(event) =>handleprerequisites('check_which_ones_the_gelathi_did_not_do', event)}/>
             <FormControlLabel control={<Checkbox  />}value={'Ask what’s wrong with celebrating festivals with joy and vigour, dressing well, eating well?'} label="Ask what’s wrong with celebrating festivals with joy and vigour, dressing well, eating well?" onChange={(event) =>handleprerequisites('check_which_ones_the_gelathi_did_not_do', event)}/>
             <FormControlLabel control={<Checkbox  />} value={'Ask under what circumstances would Saraswathi not get a loan?'}label="Ask under what circumstances would Saraswathi not get a loan?" onChange={(event) =>handleprerequisites('check_which_ones_the_gelathi_did_not_do', event)}/>
             <FormControlLabel control={<Checkbox  />}value={'Ask what did Lakshmi take a loan for and what did Saraswathi take it for?'} label="Ask what did Lakshmi take a loan for and what did Saraswathi take it for?" onChange={(event) =>handleprerequisites('check_which_ones_the_gelathi_did_not_do', event)}/>
             <FormControlLabel control={<Checkbox  />} value={'Ask Is it bad to take loan? Lakshmi also took a loan, isn’t it?'}label="Ask Is it bad to take loan? Lakshmi also took a loan, isn’t it?"onChange={(event) =>handleprerequisites('check_which_ones_the_gelathi_did_not_do', event)} />
             <FormControlLabel control={<Checkbox  />}value={'Ask why should we save in formal financial institutions?'} label="Ask why should we save in formal financial institutions?"onChange={(event) =>handleprerequisites('check_which_ones_the_gelathi_did_not_do', event)} />
             <FormControlLabel control={<Checkbox  />}value={'Ask why do we need to plan/track expenses?'} label="Ask why do we need to plan/track expenses?"onChange={(event) =>handleprerequisites('check_which_ones_the_gelathi_did_not_do', event)} />
             <FormControlLabel control={<Checkbox  />}value={'Ask how is the story relevant to you? Why was it narrated?'} label="Ask how is the story relevant to you? Why was it narrated?" onChange={(event) =>handleprerequisites('check_which_ones_the_gelathi_did_not_do', event)}/>
             <FormControlLabel control={<Checkbox  />}value={'Ask how many women had bank accounts in their name and active?'} label="Ask how many women had bank accounts in their name and active?" onChange={(event) =>handleprerequisites('check_which_ones_the_gelathi_did_not_do', event)}/>
             <FormControlLabel control={<Checkbox  />}value={'Ask the women whose life seems better and why?'} label="Ask the women whose life seems better and why?" onChange={(event) =>handleprerequisites('check_which_ones_the_gelathi_did_not_do', event)}/>
             <FormControlLabel control={<Checkbox  />} value={'Use the family budgeting receipts charts to explain?'}label="Use the family budgeting receipts charts to explain?" onChange={(event) =>handleprerequisites('check_which_ones_the_gelathi_did_not_do', event)}/>
             <FormControlLabel control={<Checkbox  />}value={'Encourage women to fill this chart in their books before the next week’s training?'} label="Encourage women to fill this chart in their books before the next week’s training?" onChange={(event) =>handleprerequisites('check_which_ones_the_gelathi_did_not_do', event)}/>
             <FormControlLabel control={<Checkbox  />}value={'Ask - Don’t you think the increasing heat and varying rainfall has contributed to these changes?'} label="Ask - Don’t you think the increasing heat and varying rainfall has contributed to these changes?" onChange={(event) =>handleprerequisites('check_which_ones_the_gelathi_did_not_do', event)}/>
           
     </FormGroup>
                 </Stack>
               </Stack>
               </Stack>
         </CardContent>   </Card>
         
         <Card sx={{ marginTop:"20px"}}>
      <CardContent>
         <Stack mt={2}>
         <Stack>
                 <Typography variant="body1">
                 How many women attended the training session?
                 </Typography>
                 <Stack mt={3}>
                   <TextField type='number'required inputProps={{ required: true }} id="Correct Answer" label="Correct Answer" variant="outlined"
 onChange={(e) => setSendForm({ ...sendForm, how_many_women_attended_the_training_session:e.target.value})} value={sendForm?.how_many_women_attended_the_training_session}                     />
                 </Stack>
               </Stack>
               </Stack>
         </CardContent>
         </Card> 
           <Card sx={{ marginTop:"20px"}}>
         <CardContent>
         <Stack mt={2}>
                 <Typography>
                 Was the recap done?
                 {was_the_recap_doneError ? (
                          <FormHelperText style={{ color: 'red' }}>{helperText}</FormHelperText>
                        ) : null}{' '}
                 </Typography>
                 <Stack mt={3}>
               
                 <RadioGroup
                      aria-labelledby="demo-radio-buttons-group-label"
                      name="radio-buttons-group"
                      onChange={(e) => setSendForm({ ...sendForm, was_the_recap_done:e.target.value})} value={sendForm?.was_the_recap_done}                  
                    >
                    <div style={{display:"flex"}}>
                      <FormControlLabel value="No" control={<Radio style={{color:"#595959"}} />} label="No" />
                      <FormControlLabel value="Yes" control={<Radio style={{color:"#595959"}}  />} label="Yes" />
                      </div>
                    </RadioGroup></Stack>
                 </Stack>
              
         </CardContent>
           </Card>
 
          
        
     </CardContent>
         </Grid>:null}
        { ( sendForm?.days_modules=='Session-2 _ Financial Management' )?<Grid  backgroundColor={"#FFD580"}>
         
         <CardContent>
           <Card>
           <Card sx = {{backgroundColor:'#ff7424'}} mt={2}>
           <CardContent>
           <Typography variant = 'h5'>Post - Session:</Typography>
           </CardContent>
         </Card>
         <CardContent>
         <Stack mt={2}>
         <Stack>
                 <Typography variant="body1">
                 Check which ones the Gelathi did not do
                 {check_which_ones_the_gelathi_did_not_do_1Error ? (
                          <FormHelperText style={{ color: 'red' }}>{helperText}</FormHelperText>
                        ) : null}{' '}
                 </Typography>
                 <Stack mt={2}>
                 <FormGroup>
             <FormControlLabel control={<Checkbox  />} value={'Did express Gelathis opinion and participants feedback about the training'} label="Did express Gelathi's opinion and participants feedback about the training" onChange={(event) =>handleprerequisites('check_which_ones_the_gelathi_did_not_do_1', event)}/>
             <FormControlLabel control={<Checkbox  />} value={'Tell the women what will be covered in the next training session'} label="Tell the women what will be covered in the next training session?" onChange={(event) =>handleprerequisites('check_which_ones_the_gelathi_did_not_do_1', event)}/>
             <FormControlLabel control={<Checkbox  />} value={'Ask them to share with their family what they have learnt'} label="Ask them to share with their family what they have learnt?" onChange={(event) =>handleprerequisites('check_which_ones_the_gelathi_did_not_do_1', event)}/>
           <div style={{display:'flex'}}>  <FormControlLabel control={<Checkbox  />} label="Others" value={others}onChange={(event) =>handleprerequisites('check_which_ones_the_gelathi_did_not_do_1', event)}  /><TextField   id="standard-basic" onChange={handlother}/></div>
           
     </FormGroup>
                 </Stack>
               </Stack>
               </Stack>
         </CardContent>   </Card>
        
     </CardContent>
         </Grid>:null}
       { ( sendForm?.days_modules=='Session-3 _Basics of an enterprise' )? <Grid  backgroundColor={"#FFD580"}>
          {/* page-31 */}
        <CardContent>
          <Card>
          <Card sx = {{backgroundColor:'#ff7424'}} mt={2}>
          <CardContent>
          <Typography variant = 'h5'>Session-3 Basics of an Enterprises</Typography>
          </CardContent>
        </Card>
        <Card sx={{marginTop:2}}>
        <CardContent>
        <Stack mt={2}>
                <Typography>
                Check which ones the Gelathi did not do
                {check_which_ones_the_gelathi_did_not_doError ? (
                          <FormHelperText style={{ color: 'red' }}>{helperText}</FormHelperText>
                        ) : null}{' '}
                </Typography>
                <Stack mt={2}>
                  <FormGroup>
                    <FormControlLabel value="Ask how many businesswomen and how many housewives there were among the participants?" control={<Checkbox />} label="Ask how many businesswomen and how many housewives there were among the participants?" onChange={(event) =>handleprerequisites('check_which_ones_the_gelathi_did_not_do', event)}/>
                    <FormControlLabel value="Ask business women what constitutes business income capital, profit, and  expenditure?" control={<Checkbox />} label="Ask business women what constitutes business income capital, profit, and  expenditure?" onChange={(event) =>handleprerequisites('check_which_ones_the_gelathi_did_not_do', event)}/>
                    <FormControlLabel value="Ask housewives what constitutes household income, savings, and expenditure" control={<Checkbox />} label="Ask housewives what constitutes household income, savings, and expenditure" onChange={(event) =>handleprerequisites('check_which_ones_the_gelathi_did_not_do', event)}/>
                    <FormControlLabel value="Give the formula for calculating income" control={<Checkbox />} label="Give the formula for calculating income" onChange={(event) =>handleprerequisites('check_which_ones_the_gelathi_did_not_do', event)}/>
                    <FormControlLabel value="Use the chart to explain the receipts of an enterprise?" control={<Checkbox />} label="Use the chart to explain the receipts of an enterprise?" onChange={(event) =>handleprerequisites('check_which_ones_the_gelathi_did_not_do', event)}/>
                    <FormControlLabel value="Use the chart that was relevant for the business women in the group (if milk business is more then use milk chart if other business then use that)" control={<Checkbox />} label="Use the chart that was relevant for the business women in the group (if milk business is more then use milk chart if other business then use that)" onChange={(event) =>handleprerequisites('check_which_ones_the_gelathi_did_not_do', event)}/>
   
                  </FormGroup>
                </Stack>
              </Stack>
        
       
        </CardContent>
     </Card>
        
       
          </Card>
        
    
     <Card sx={{marginTop:2}}>
        <CardContent>
        <Stack mt={2}>
                <Typography>
                During the debrief did the Gelathi:
                {during_the_debrief_did_the_gelathiError ? (
                          <FormHelperText style={{ color: 'red' }}>{helperText}</FormHelperText>
                        ) : null}{' '}
                </Typography>
                <Stack mt={2}>
                  <FormGroup>
 
                    <FormControlLabel value="Ask why is this important to maintain account?" control={<Checkbox />} label="Ask why is this important to maintain account?" onChange={(event) =>handleprerequisites('during_the_debrief_did_the_gelathi', event)}/>
                    <FormControlLabel value="Ask which are the places/situations where income, profit, savings could be asked?" control={<Checkbox />} label="Ask which are the places/situations where income, profit, savings could be asked?" onChange={(event) =>handleprerequisites('during_the_debrief_did_the_gelathi', event)}/>
                  </FormGroup>
                </Stack>
              </Stack>
        
       
        </CardContent>
     </Card>
    
         
        </CardContent>
        </Grid>:null}
       
   {  ( sendForm?.days_modules=='Session-3 _Basics of an enterprise' )?    <Grid  backgroundColor={"#FFD580"}>
          {/* page-32 */}
        <CardContent>
          <Card>
          <Card sx = {{backgroundColor:'#ff7424'}} mt={2}>
          <CardContent>
          <Typography variant = 'h5'>Post - Session:</Typography>
          </CardContent>
        </Card>
        
        <Card sx={{marginTop:2}}>
        <CardContent>
        <Stack mt={2}>
                <Typography>
                Check which ones the Gelathi did not do
                {check_which_ones_the_gelathi_did_not_do_1Error ? (
                          <FormHelperText style={{ color: 'red' }}>{helperText}</FormHelperText>
                        ) : null}{' '}
                </Typography>
                <Stack mt={2}>
                  <FormGroup>
                    
                    
                    
                    
                    <FormControlLabel value="Did express Gelathi's opinion and participants feedback about the training" control={<Checkbox />} label="Did express Gelathi's opinion and participants feedback about the training" onChange={(event) =>handleprerequisites('check_which_ones_the_gelathi_did_not_do_1', event)}/>
                    <FormControlLabel value="Tell the women what will be covered in the next training session?" control={<Checkbox />} label="Tell the women what will be covered in the next training session?" onChange={(event) =>handleprerequisites('check_which_ones_the_gelathi_did_not_do_1', event)}/>
                    <FormControlLabel value="Ask them to share with their family what they have learnt?" control={<Checkbox />} label="Ask them to share with their family what they have learnt?" onChange={(event) =>handleprerequisites('check_which_ones_the_gelathi_did_not_do_1', event)}/>
                   
                    
                    
                   
                   
                    
                  </FormGroup>
                </Stack>
              </Stack>
        
       
        </CardContent>
     </Card>
       
          </Card>
        
     
    
    
         
        </CardContent>
        </Grid> :null}
        
  {  ( sendForm?.days_modules=='Session-4 _Building Relationship' )?  <Grid  backgroundColor={"#FFD580"}>
          {/* page-33 */}
        <CardContent>
          <Card>
          <Card sx = {{backgroundColor:'#ff7424'}} mt={2}>
          <CardContent>
          <Typography variant = 'h5'>Session-4  Building Relationships:</Typography>
          </CardContent>
        </Card>
        <Card sx={{marginTop:2}}>
        <CardContent>
        <Stack mt={2}>
                <Typography>
                Check which ones the Gelathi did not do
                {check_which_ones_the_gelathi_did_not_doError ? (
                          <FormHelperText style={{ color: 'red' }}>{helperText}</FormHelperText>
                        ) : null}{' '}
                </Typography>
                <Stack mt={2}>
                  <FormGroup>
                    
                    
                    
                    
                    <FormControlLabel value="Ask what are some of the elements needed, apart from money, to either become more profitable at business or to become more adept at saving or to increase your income?" control={<Checkbox />} label="Ask what are some of the elements needed, apart from money, to either become more profitable at business or to become more adept at saving or to increase your income?" onChange={(event) =>handleprerequisites('check_which_ones_the_gelathi_did_not_do', event)}/>
                    <FormControlLabel value="Ask what needs to be done to run a business more successfully or even run your life successfully?" control={<Checkbox />} label="Ask what needs to be done to run a business more successfully or even run your life successfully?" onChange={(event) =>handleprerequisites('check_which_ones_the_gelathi_did_not_do', event)}/>
                    <FormControlLabel value="Ask why is it necessary to communicate clearly, politely and effectively?" control={<Checkbox />} label="Ask why is it necessary to communicate clearly, politely and effectively?" onChange={(event) =>handleprerequisites('check_which_ones_the_gelathi_did_not_do', event)}/>
                    
                    
                    
                   
                   
                    
                  </FormGroup>
                </Stack>
              </Stack>
        
       
        </CardContent>
     </Card>
        
       
          </Card>
        
    
     <Card sx={{marginTop:2}}>
        <CardContent>
        <Stack mt={2}>
                <Typography>
                During the debriefs for role plays the Gelathi did not ask:
                {during_the_debriefs_for_role_plays_the_gelathi_did_not_askError ? (
                          <FormHelperText style={{ color: 'red' }}>{helperText}</FormHelperText>
                        ) : null}{' '}
                </Typography>
                <Stack mt={2}>
                  <FormGroup>
                    
                    
                    
                    
                    <FormControlLabel value="What was the role play about?" control={<Checkbox />} label="What was the role play about?" onChange={(event) =>handleprerequisites('during_the_debriefs_for_role_plays_the_gelathi_did_not_ask', event)}/>
                    <FormControlLabel value="How did the protagonists behave?" control={<Checkbox />} label="How did the protagonists behave?" onChange={(event) =>handleprerequisites('during_the_debriefs_for_role_plays_the_gelathi_did_not_ask', event)}/>
                    <FormControlLabel value="What was the impact on customers & business/ family member?" control={<Checkbox />} label="What was the impact on customers & business/ family member?" onChange={(event) =>handleprerequisites('during_the_debriefs_for_role_plays_the_gelathi_did_not_ask', event)}/>
                    <FormControlLabel value="What was done well?" control={<Checkbox />} label="What was done well?" onChange={(event) =>handleprerequisites('during_the_debriefs_for_role_plays_the_gelathi_did_not_ask', event)}/>
                    <FormControlLabel value="What do you feel after seeing all the role plays?" control={<Checkbox />} label="What do you feel after seeing all the role plays?" onChange={(event) =>handleprerequisites('during_the_debriefs_for_role_plays_the_gelathi_did_not_ask', event)}/>
                    <FormControlLabel value="Do you notice that in all four role plays there are possibilities?" control={<Checkbox />} label="Do you notice that in all four role plays there are possibilities?" onChange={(event) =>handleprerequisites('during_the_debriefs_for_role_plays_the_gelathi_did_not_ask', event)}/>
                    <FormControlLabel value="Where do you think change begins?" control={<Checkbox />} label="Where do you think change begins?" onChange={(event) =>handleprerequisites('during_the_debriefs_for_role_plays_the_gelathi_did_not_ask', event)}/>
                    <FormControlLabel value="Reflect whether these communication and relationship building aspects can be effectively used in personal life as well. How? What situations in real life could they be useful in?" control={<Checkbox />} label="Reflect whether these communication and relationship building aspects can be effectively used in personal life as well. How? What situations in real life could they be useful in?" onChange={(event) =>handleprerequisites('during_the_debriefs_for_role_plays_the_gelathi_did_not_ask', event)}/>
                    
                    
                    
                   
                   
                    
                  </FormGroup>
                </Stack>
              </Stack>
        
       
        </CardContent>
     </Card>
     
    
         
        </CardContent>
        </Grid>:null}
      
   {  ( sendForm?.days_modules=='Session-4 _Building Relationship' )?  <Grid  backgroundColor={"#FFD580"}>
          {/* page-34 */}
        <CardContent>
          <Card>
          <Card sx = {{backgroundColor:'#ff7424'}} mt={2}>
          <CardContent>
          <Typography variant = 'h5'>Post-training</Typography>
          </CardContent>
        </Card>
        <Card sx={{marginTop:2}}>
        <CardContent>
        <Stack mt={2}>
                <Typography>
                Check which ones the Gelathi did not do
                {check_which_ones_the_gelathi_did_not_do_1Error ? (
                          <FormHelperText style={{ color: 'red' }}>{helperText}</FormHelperText>
                        ) : null}{' '}
                </Typography>
                <Stack mt={2}>
                  <FormGroup>
                    
                    
                    
                    
                    
                    <FormControlLabel value="Ask how was it for you?" control={<Checkbox />} label="Ask how was it for you?" onChange={(event) =>handleprerequisites('check_which_ones_the_gelathi_did_not_do_1', event)}/>
                    <FormControlLabel value="Ask what did you learn new today?" control={<Checkbox />} label="Ask what did you learn new today?" onChange={(event) =>handleprerequisites('check_which_ones_the_gelathi_did_not_do_1', event)}/>
                    <FormControlLabel value="Ask do you have any feedback for me as a trainer or for our organisation so that we can deliver the best experience for you?" control={<Checkbox />} label="Ask do you have any feedback for me as a trainer or for our organisation so that we can deliver the best experience for you?" onChange={(event) =>handleprerequisites('check_which_ones_the_gelathi_did_not_do_1', event)}/>
                    <FormControlLabel value="Ask the women that if they have any doubts/questions they can ask right now in the group or ask in person?" control={<Checkbox />} label="Ask the women that if they have any doubts/questions they can ask right now in the group or ask in person?" onChange={(event) =>handleprerequisites('check_which_ones_the_gelathi_did_not_do_1', event)}/>
                    <FormControlLabel value="Tell the women what will be covered in the next training session?" control={<Checkbox />} label="Tell the women what will be covered in the next training session?" onChange={(event) =>handleprerequisites('check_which_ones_the_gelathi_did_not_do_1', event)}/>
                    <FormControlLabel value="Ask them to share with their family what they have learnt?" control={<Checkbox />} label="Ask them to share with their family what they have learnt?" onChange={(event) =>handleprerequisites('check_which_ones_the_gelathi_did_not_do_1', event)}/>
                    <FormControlLabel value="Create excitement/curiosity among the participants about the next training session?" control={<Checkbox />} label="Create excitement/curiosity among the participants about the next training session?" onChange={(event) =>handleprerequisites('check_which_ones_the_gelathi_did_not_do_1', event)}/>
                    <FormControlLabel value="Tell them that Buzz India will be following up on them for the next three years through a Buzz Gelathi?" control={<Checkbox />} label="Tell them that Buzz India will be following up on them for the next three years through a Buzz Gelathi?" onChange={(event) =>handleprerequisites('check_which_ones_the_gelathi_did_not_do_1', event)}/>
                    
                    
                    
                    
                   
                   
                    
                  </FormGroup>
                </Stack>
              </Stack>
        
       
        </CardContent>
     </Card>
       
          </Card>
        
     
    
     
    
         
        </CardContent>
        </Grid>:null}
       
     { ( sendForm?.days_modules=='Session-5 _Assets and Liabilities' )? <Grid  backgroundColor={"#FFD580"}>
          {/* page-35 */}
        <CardContent>
          <Card>
          <Card sx = {{backgroundColor:'#ff7424'}} mt={2}>
          <CardContent>
          <Typography variant = 'h5'>Session 5:  Assets & Liabilities: </Typography>
          </CardContent>
        </Card>
          
        <Card sx={{marginTop:2}}>
        <CardContent>
        <Stack>
                <Typography variant="body1">
                Name of the Gelathi being evaluated
                </Typography>
                <Stack mt={3}>
                  <TextField required inputProps={{ required: true }} id="Correct Answer" label="Correct Answer" variant="outlined" 
                                        onChange={(e) => setSendForm({ ...sendForm, name_of_the_gelathi_being_evaluated_1:e.target.value})} value={sendForm?.name_of_the_gelathi_being_evaluated_1}
                  />
                </Stack>
              </Stack>
       
        </CardContent>
     </Card>
       
        
       
          </Card>
     <Card sx={{marginTop:2}}>
        <CardContent>
        <Stack>
                <Typography variant="body1">
                How many women attended the training session?
                </Typography>
                <Stack mt={3}>
                  <TextField type='number' required inputProps={{ required: true }}id="Correct Answer" label="Correct Answer" variant="outlined"
 onChange={(e) => setSendForm({ ...sendForm, how_many_women_attended_the_training_session:e.target.value})} value={sendForm?.how_many_women_attended_the_training_session}                    />
                </Stack>
              </Stack>
       
        </CardContent>
     </Card>
     <Card sx={{marginTop:2}}>
        <CardContent>
        <Stack mt={2}> 
                <Typography>Was the recap done?
        {was_the_recap_done_1Error ? (
                          <FormHelperText style={{ color: 'red' }}>{helperText}</FormHelperText>
                        ) : null}{' '}
                    </Typography>
                <Stack mt={2}>
                <RadioGroup
                      aria-labelledby="demo-radio-buttons-group-label"
                      name="radio-buttons-group"
                      onChange={(e) => setSendForm({ ...sendForm, was_the_recap_done_1:e.target.value})} value={sendForm?.was_the_recap_done_1}                  
                  
                    >
                    <div style={{display:"flex"}}>
                      <FormControlLabel value="No" control={<Radio style={{color:"#595959"}} />} label="No" />
                      <FormControlLabel value="Yes" control={<Radio style={{color:"#595959"}}  />} label="Yes" />
                      </div>
                    </RadioGroup>
                </Stack>
              </Stack>
        
        
            
       
        </CardContent>
     </Card>
        
     <Card sx={{marginTop:2}}>
        <CardContent>
        <Stack mt={2}>
                <Typography>
                Check which ones the trainer did not do
                {check_which_ones_the_trainer_did_not_doError ? (
                          <FormHelperText style={{ color: 'red' }}>{helperText}</FormHelperText>
                        ) : null}{' '}
                </Typography>
                <Stack mt={2}>
                  <FormGroup>
                    
                    
                    
                    
                    
                    <FormControlLabel value="Ask what do you need to achieve your dreams and goals?" control={<Checkbox />} label="Ask what do you need to achieve your dreams and goals?" onChange={(event) =>handleprerequisites('check_which_ones_the_trainer_did_not_do', event)}/>
                    <FormControlLabel value="Record the answer when asking - “My goal is to reach your village. If I want to come to your village, and I call and ask you how I can get here, what will you say?”" control={<Checkbox />} label="Record the answer when asking - “My goal is to reach your village. If I want to come to your village, and I call and ask you how I can get here, what will you say?”" onChange={(event) =>handleprerequisites('check_which_ones_the_trainer_did_not_do', event)}/>
                    <FormControlLabel value="Use the chart to give an example of assets and liabilities?" control={<Checkbox />} label="Use the chart to give an example of assets and liabilities?" onChange={(event) =>handleprerequisites('check_which_ones_the_trainer_did_not_do', event)}/>
                    <FormControlLabel value="Ask one of the women to come up to give the example of their own assets and liabilities?" control={<Checkbox />} label="Ask one of the women to come up to give the example of their own assets and liabilities?" onChange={(event) =>handleprerequisites('check_which_ones_the_trainer_did_not_do', event)}/>
                    <FormControlLabel value="Was the debrief done?" control={<Checkbox />} label="Was the debrief done?" onChange={(event) =>handleprerequisites('check_which_ones_the_trainer_did_not_do', event)}/>
                    
                    
                    
                    
                    
                   
                   
                    
                  </FormGroup>
                </Stack>
              </Stack>
        
       
        </CardContent>
     </Card>
    
     
    
         
        </CardContent>
        </Grid>:null}
       
     { ( sendForm?.days_modules=='Session-6 _Goal setting game' )? <Grid  backgroundColor={"#FFD580"}>
          {/* page-36 */}
        <CardContent>
          <Card>
          <Card sx = {{backgroundColor:'#ff7424'}} mt={2}>
          <CardContent>
          <Typography variant = 'h5'>Session 6: Goal setting game </Typography>
          </CardContent>
           </Card>
           <Card sx={{marginTop:2}}>
        <CardContent>
        <Stack>
                <Typography variant="body1">
                How many women attended the training session?
                </Typography>
                <Stack mt={3}>
                  <TextField type='number' required inputProps={{ required: true }} id="Correct Answer" label="Correct Answer" variant="outlined" 
 onChange={(e) => setSendForm({ ...sendForm, how_many_women_attended_the_training_session:e.target.value})} value={sendForm?.how_many_women_attended_the_training_session }                   />
                </Stack>
              </Stack>
       
        </CardContent>
     </Card>
       
        
       
          </Card>
   
     <Card sx={{marginTop:2}}>
        <CardContent>
        <Stack mt={2}>
                <Typography>
                Check which ones the Galati did not do
                {check_which_ones_the_gelathi_did_not_doError ? (
                          <FormHelperText style={{ color: 'red' }}>{helperText}</FormHelperText>
                        ) : null}{' '}
                </Typography>
                <Stack mt={2}>
                  <FormGroup>
                    <FormControlLabel value="Ask two or three participants to volunteer to play the game." control={<Checkbox />} label="Ask two or three participants to volunteer to play the game." onChange={(event) =>handleprerequisites('check_which_ones_the_gelathi_did_not_do', event)}/>
                    <FormControlLabel value="Ensure the volunteer who is not playing the game, is out of earshot when relaying instructions to the volunteer who is playing first." control={<Checkbox />} label="Ensure the volunteer who is not playing the game, is out of earshot when relaying instructions to the volunteer who is playing first." onChange={(event) =>handleprerequisites('check_which_ones_the_gelathi_did_not_do', event)}/>
                    <FormControlLabel value="Give instructions step by step with all constraints added, to the first volunteer, records her goal (for the blocks) and blindfolds her before she begins." control={<Checkbox />} label="Give instructions step by step with all constraints added, to the first volunteer, records her goal (for the blocks) and blindfolds her before she begins." onChange={(event) =>handleprerequisites('check_which_ones_the_gelathi_did_not_do', event)}/>
                    
                  </FormGroup>
                </Stack>
              </Stack>
        </CardContent>
     </Card>
     <Card sx={{marginTop:2}}>
        <CardContent>
        <Stack mt={2}>
                <Typography>
                Check which instructions the Gelathi did not do
                {check_which_instructions_the_gelathi_did_not_doError ? (
                          <FormHelperText style={{ color: 'red' }}>{helperText}</FormHelperText>
                        ) : null}{' '}
                </Typography>
                <Stack mt={2}>
                  <FormGroup>
                    
                    
                    
                    
                    
                    
                    <FormControlLabel value="Here are wooden blocks. You have to arrange them on top of each other" control={<Checkbox />} label="Here are wooden blocks. You have to arrange them on top of each other"onChange={(event) =>handleprerequisites('check_which_instructions_the_gelathi_did_not_do', event)}/>
                    <FormControlLabel value="How many blocks will you arrange? You have to give a specific number. " control={<Checkbox />} label="How many blocks will you arrange? You have to give a specific number."onChange={(event) =>handleprerequisites('check_which_instructions_the_gelathi_did_not_do', event)}/>
                    <FormControlLabel value="Which hand will you use?" control={<Checkbox />} label="Which hand will you use?"onChange={(event) =>handleprerequisites('check_which_instructions_the_gelathi_did_not_do', event)}/>
                    <FormControlLabel value="All the steps of instructions given" control={<Checkbox />} label="All the steps of instructions given"onChange={(event) =>handleprerequisites('check_which_instructions_the_gelathi_did_not_do', event)}/>
                    
                    
                    
                    
                    
                   
                   
                    
                  </FormGroup>
                </Stack>
              </Stack>
        
       
        </CardContent>
     </Card>
     <Card sx={{marginTop:2}}>
        <CardContent>
        <Stack mt={2}> 
                <Typography>Repeat the activity with the second volunteer?
                {repeat_the_activity_with_the_second_volunteerError ? (
                          <FormHelperText style={{ color: 'red' }}>{helperText}</FormHelperText>
                        ) : null}{' '}
                    </Typography>
                <Stack mt={2}>
                <RadioGroup
                      aria-labelledby="demo-radio-buttons-group-label"
                      name="radio-buttons-group"
                      onChange={(e) => setSendForm({ ...sendForm, repeat_the_activity_with_the_second_volunteer:e.target.value})} value={sendForm?.repeat_the_activity_with_the_second_volunteer}
                  
                    >
                    <div style={{display:"flex"}}>
                      <FormControlLabel value="No" control={<Radio style={{color:"#595959"}} />} label="No" />
                      <FormControlLabel value="Yes" control={<Radio style={{color:"#595959"}}  />} label="Yes" />
                      </div>
                    </RadioGroup>
                </Stack>
              </Stack>
        
        
            
       
        </CardContent>
     </Card>
     <Card sx={{marginTop:2}}>
        <CardContent>
        <Stack mt={2}> 
                <Typography>Did the debrief done by Gelathi?
                {did_the_debrief_done_by_gelathiError ? (
                          <FormHelperText style={{ color: 'red' }}>{helperText}</FormHelperText>
                        ) : null}{' '}
                    </Typography>
                <Stack mt={2}>
                <RadioGroup
                      aria-labelledby="demo-radio-buttons-group-label"
                      name="radio-buttons-group"
                      onChange={(e) => setSendForm({ ...sendForm, did_the_debrief_done_by_gelathi:e.target.value})} value={sendForm?.did_the_debrief_done_by_gelathi}
                    >
                    <div style={{display:"flex"}}>
                      <FormControlLabel value="No" control={<Radio style={{color:"#595959"}} />} label="No" />
                      <FormControlLabel value="Yes" control={<Radio style={{color:"#595959"}}  />} label="Yes" />
                      </div>
                    </RadioGroup>
                </Stack>
              </Stack>
        
        
            
       
        </CardContent>
     </Card>
    
     
    
         
        </CardContent>
        </Grid>:null}
         {/* 37 */}
       { ( sendForm?.days_modules=='Session-7 _Financial Goals' )?  <Grid  backgroundColor={"#FFD580"}>
          {/* page-37 */}
        <CardContent>
          <Card>
          <Card sx = {{backgroundColor:'#ff7424'}} mt={2}>
          <CardContent>
          <Typography variant = 'h5'>Session-7 Financial goals</Typography>
          </CardContent>
        </Card>
        <Card  sx={{ marginTop:"20px"}}>
        <CardContent>
            <Typography>How many women attended the training session?
 
          </Typography>
                <Stack mt={2} mb={2}>
                        <TextField type='number' required inputProps={{ required: true }} label="Your Answer" variant="outlined" color="common"
                        onChange={(e) => setSendForm({ ...sendForm, how_many_women_attended_the_training_session:e.target.value})} value={sendForm?.how_many_women_attended_the_training_session}                  
                         />
                    </Stack> 
        </CardContent>
          </Card>
          </Card>
          <Card sx={{marginTop:2}}>
          <CardContent>
          <Typography >
          Check which ones the Gelathi did not do
          {check_which_ones_the_gelathi_did_not_doError ? (
                          <FormHelperText style={{ color: 'red' }}>{helperText}</FormHelperText>
                        ) : null}{' '}
          </Typography>
          <FormGroup>
          <FormControlLabel control={<Checkbox  />}value={'Ask what the difference between a dream and a goal is'} label="Ask what the difference between a dream and a goal is?" onChange={(event) =>handleprerequisites('check_which_ones_the_gelathi_did_not_do', event)}/>
          <FormControlLabel control={<Checkbox  />}value={'Tell the participants the difference between dream and goal'} label="Tell the participants the difference between dream and goal?" onChange={(event) =>handleprerequisites('check_which_ones_the_gelathi_did_not_do', event)}/>
          <FormControlLabel control={<Checkbox  />}value={'Ask for one volunteer who is willing to come forward and ask them to chart their financial goal on the board'} label="Ask for one volunteer who is willing to come forward and ask them to chart their financial goal on the board?" onChange={(event) =>handleprerequisites('check_which_ones_the_gelathi_did_not_do', event)}/>
    </FormGroup>
 </CardContent>
          </Card>
          <Card sx={{marginTop:2}}>
          <CardContent>
          <Typography >
          The Gelathi did not ask
          {the_gelathi_did_not_ask_1Error ? (
                          <FormHelperText style={{ color: 'red' }}>{helperText}</FormHelperText>
                        ) : null}{' '}
          </Typography>
          <FormGroup>
          <FormControlLabel control={<Checkbox  />} label="What is your goal?"value={'What is your goal'}onChange={(event) =>handleprerequisites('the_gelathi_did_not_ask_1', event)} />
          <FormControlLabel control={<Checkbox  />} label="How much will it cost?" value={'How much will it cost'} onChange={(event) =>handleprerequisites('the_gelathi_did_not_ask_1', event)}/>
          <FormControlLabel control={<Checkbox  />} label="In how many years do you want to achieve this goal?"value={'In how many years do you want to achieve this goal'} onChange={(event) =>handleprerequisites('the_gelathi_did_not_ask_1', event)} />
          <FormControlLabel control={<Checkbox  />} label="How much loan do you want to take for it?" value={'How much loan do you want to take for it'}onChange={(event) =>handleprerequisites('the_gelathi_did_not_ask_1', event)} />
          <FormControlLabel control={<Checkbox  />} label="Do you know where you will take a loan from?" value={'Do you know where you will take a loan from'} onChange={(event) =>handleprerequisites('the_gelathi_did_not_ask_1', event)}/>
          <FormControlLabel control={<Checkbox  />} label="How much will you save for the goal?" value={'How much will you save for the goa'}onChange={(event) =>handleprerequisites('the_gelathi_did_not_ask_1', event)} />
    </FormGroup>
 </CardContent>
          </Card>
          <Card sx={{marginTop:2}}>
          <CardContent>
          <Typography >
          During the debrief did the Gelathi not ask:
          {during_the_debrief_did_the_gelathi_not_askError ? (
                          <FormHelperText style={{ color: 'red' }}>{helperText}</FormHelperText>
                        ) : null}{' '}
          </Typography>
          <FormGroup>
          <FormControlLabel control={<Checkbox  />} label="Does your goal look realistic to you?" value={'Does your goal look realistic to you'} onChange={(event) =>handleprerequisites('during_the_debrief_did_the_gelathi_not_ask', event)}/>
          <FormControlLabel control={<Checkbox  />} label="Can you increase your savings or your income?"  value={'Can you increase your savings or your income'} onChange={(event) =>handleprerequisites('during_the_debrief_did_the_gelathi_not_ask', event)}/>
          <FormControlLabel control={<Checkbox  />} label="Can you increase the time frame to reach the goal?"  value={'Can you increase the time frame to reach the goal'} onChange={(event) =>handleprerequisites('during_the_debrief_did_the_gelathi_not_ask', event)}/>

    </FormGroup>
 </CardContent>
          </Card>
        </CardContent>
        </Grid>:null}
        
        {/* 38 */}
    { ( sendForm?.days_modules=='Session-8 _Loans-Group discussion of Case Studies' )?    <Grid  backgroundColor={"#FFD580"}>
          {/* page-38 */}
        <CardContent>
          <Card>
          <Card sx = {{backgroundColor:'#ff7424'}} mt={2}>
          <CardContent>
          <Typography variant = 'h5'>Session 8: Loans - group discussion of case studies</Typography>
          </CardContent>
        </Card>
        <Card  sx={{ marginTop:"20px"}}>
        <CardContent>
            <Typography>How many women attended the training session?
 
          </Typography>
                <Stack mt={2} mb={2}>
                        <TextField type='number' required inputProps={{ required: true }} label="Your Answer" variant="outlined" color="common"
                                                onChange={(e) => setSendForm({ ...sendForm, how_many_women_attended_the_training_session:e.target.value})} value={sendForm?.how_many_women_attended_the_training_session}                  
                         />
                    </Stack> 
        </CardContent>
          </Card>
          </Card>
          <Card sx={{marginTop:2}}>
          <CardContent>
          <Typography >
          Check which ones the Gelathi did not do:
          {check_which_ones_the_gelathi_did_not_doError ? (
                          <FormHelperText style={{ color: 'red' }}>{helperText}</FormHelperText>
                        ) : null}{' '}
          </Typography>
          <FormGroup>
          <FormControlLabel control={<Checkbox  />} value={'Make 4 groups from all the participants'} label="Make 4 groups from all the participants" onChange={(event) =>handleprerequisites('check_which_ones_the_gelathi_did_not_do', event)}/>
          <FormControlLabel control={<Checkbox  />}value={'Give a case study to each group'} label="Give a case study to each group" onChange={(event) =>handleprerequisites('check_which_ones_the_gelathi_did_not_do', event)}/>
          <FormControlLabel control={<Checkbox  />}value={'Made sure that the impression given was not of that loans are not necessary. They are important but to know the source of the loan, own credibility, credit worthiness, credit utilization and repayment strateg'} label="Made sure that the impression given was not of that loans are not necessary. They are important but to know the source of the loan, own credibility, credit worthiness, credit utilization and repayment strategy" onChange={(event) =>handleprerequisites('check_which_ones_the_gelathi_did_not_do', event)}/>
          </FormGroup>
 </CardContent>
          </Card>
          <Card sx={{marginTop:2}}>
          <CardContent>
          <Typography >
          During the debrief did the Gelathi not ask:
          {during_the_debrief_did_the_gelathi_not_askError ? (
                          <FormHelperText style={{ color: 'red' }}>{helperText}</FormHelperText>
                        ) : null}{' '}
          </Typography>
          <FormGroup>
          <FormControlLabel control={<Checkbox  />} label="What was your group’s story or case study about?" value={'What was your group’s story or case study about'} onChange={(event) =>handleprerequisites('during_the_debrief_did_the_gelathi_not_ask', event)}/>
          <FormControlLabel control={<Checkbox  />} label="How much does that person need?" value={'How much does that person need'}onChange={(event) =>handleprerequisites('during_the_debrief_did_the_gelathi_not_ask', event)}/>
            <FormControlLabel control={<Checkbox  />} label="How much do they have in their hand as saving or earning?" value={'How much do they have in their hand as saving or earning'}onChange={(event) =>handleprerequisites('during_the_debrief_did_the_gelathi_not_ask', event)} />
            <FormControlLabel control={<Checkbox  />} label="What advice would you give that person?" value={'What advice would you give that person'}onChange={(event) =>handleprerequisites('during_the_debrief_did_the_gelathi_not_ask', event)}/>
            <FormControlLabel control={<Checkbox  />} label="When can you save and reach a goal? When will you need to take a loan to reach it?" value={'When can you save and reach a goal? When will you need to take a loan to reach it'}onChange={(event) =>handleprerequisites('during_the_debrief_did_the_gelathi_not_ask', event)}/>
            <FormControlLabel control={<Checkbox  />} label="Where can you get loans with minimum or no interest?" value={'Where can you get loans with minimum or no interest'}onChange={(event) =>handleprerequisites('during_the_debrief_did_the_gelathi_not_ask', event)}/>
            <FormControlLabel control={<Checkbox  />} label="What are productive loans? What are consumption loans?" value={'What are productive loans? What are consumption loans'}onChange={(event) =>handleprerequisites('during_the_debrief_did_the_gelathi_not_ask', event)}/>
    </FormGroup>
 </CardContent>
          </Card>
          
        </CardContent>
        </Grid>:null}
         
          {/* 39 */}
    { ( sendForm?.days_modules=='Session-8 _Loans-Group discussion of Case Studies' )?    <Grid  backgroundColor={"#FFD580"}>
          {/* page-39 */}
        <CardContent>
          <Card>
          <Card sx = {{backgroundColor:'#ff7424'}} mt={2}>
          <CardContent>
          <Typography variant = 'h5'>Post training </Typography>
          </CardContent>
        </Card>
        <CardContent>
          <Typography >
          Check which one Gelati Did NOT do
          {check_which_ones_the_gelathi_did_not_do_1Error ? (
                          <FormHelperText style={{ color: 'red' }}>{helperText}</FormHelperText>
                        ) : null}{' '}
          </Typography>
          <FormGroup>
           
            <FormControlLabel control={<Checkbox  />} value={'Thank the group for being a wonderful audience'} label="Thank the group for being a wonderful audience" onChange={(event) =>handleprerequisites('check_which_ones_the_gelathi_did_not_do_1', event)}/>
            <FormControlLabel control={<Checkbox  />}value={'Gelati celebrate the certificate distribution'} label="Gelati celebrate the certificate distribution" onChange={(event) =>handleprerequisites('check_which_ones_the_gelathi_did_not_do_1', event)}/>
            
    </FormGroup>
        </CardContent>
          </Card>
      
        </CardContent>
        </Grid>:null}
     
        </form>
    
    
     
 
      </Dialog>
    
    </>
  );
}