import * as React from 'react';
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
  CardContent,Icon,RadioGroup,
} from '@mui/material';
import Dialog from '@mui/material/Dialog';
import { useEffect } from 'react';
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
import Iconify from 'src/components/Iconify';
import FormHelperText from '@mui/material/FormHelperText';
import axios from 'axios';
import Swal from 'sweetalert2';
import  { useRef } from 'react';
import { baseURL} from 'src/utils/api';
import { ConnectingAirportsOutlined } from '@mui/icons-material';
import { useState } from 'react';
import { useAuth } from 'src/AuthContext';
const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

export default function ShaktiForm({itm ,reloadFUnction}) {
  console.log(itm ,"itm")
  const { apikey } = useAuth();
  const [open, setOpen] = React.useState(false);
  const [solution,setsolution]= React.useState(false);
  const [livelihoodvalue,setlivelihoodvalue] = React.useState(false);
  const [creditaccess,setcreditaccess] = React.useState(false);
  const [healthcareaccess,sethealthcareaccess] = React.useState(false)
  const [savingfrequency,setsavingfrequency] = React.useState(false);
  const [problemsdisheartened, setproblemsdisheartened] = React.useState(false);
  const [problemsolutions, setproblemsolutions] = React.useState(false);
  const [plan, setplan] = React.useState(false);
  const [shaktidata,setshaktidata]=React.useState('');
  const [worthperson,setworthperson] = React.useState(false);
  const[qualitiesgood,setqualitiesgood]=React.useState(false);
  const [failureperson,setfailureperson]=React.useState(false);
  const [expenditure, setexpenditure] = React.useState(false);
  const [moneysave, setmoneysave] = React.useState(false);
  const [savemoney, setsavemoney] = React.useState(false);
  const [education, seteducation] = React.useState(false);
  const [purchase, setpurchase] = React.useState(false);
  const [sharelearning, setsharelearning] = React.useState(false);
  const [shareproblems, setshareproblems] = React.useState(false);
  const [localFormPresent, setlocalFormPresent] = React.useState(new Map());
  const [isFormPresentLocally ,setIsFormPresentLocally] =React.useState(false)
  const [talukOptions ,setTalukOptions] = useState([])
  const [districtOptions ,setDistrictOptions] = useState([])
  //validation
  const [helperText, setHelperText] = React.useState('');
  const [implementationPlanError, SetImplementationPlanError] = useState(false);
  const [qualitiesgoodError, SetQualitiesgoodError] = useState(false);
  const [accessToHealtcareError, SetAccessToHealtcareError] = useState(false);
  const [creditaccessError, SetCreditaccessError] = useState(false);
  const [household_books_accountsError, SetHousehold_books_accountsError] = useState(false);
  const [saveRegularlyError, SetsaveRegularlyError] = useState(false);
  const [specificGoalForSavingsError, SetspecificGoalForSavingsError] = useState(false);
  const [problemsolutionsError, SetproblemsolutionsError] = useState(false);
  const [worthpersonError, SetworthpersonError] = useState(false);
  const [loanborrowError, SetloanborrowError] = useState(false);
  const [borrowedmoneyError, SetborrowedmoneyError] = useState(false);
  const [ownAssetError, SetownAssetError] = useState(false);
  const [separateFinancialAssetError, SetseparateFinancialAssetError] = useState(false);
  const [partOfCollectiveError, SetpartOfCollectiveError] = useState(false);
  const [moneysaveError, SetmoneysaveError] = useState(false);
  const [haveLoanError, SethaveLoanError] = useState(false);
  const [shareproblemsError, SetshareproblemsError] = useState(false);
  const [spendMoneyError, SetspendMoneyError] = useState(false);
  const [savingfrequencyError, SetsavingfrequencyError] = useState(false);
  const [loanOnWhoseNameError, SetloanOnWhoseNameError] = useState(false);
  const [haveGoalError, SethaveGoalError] = useState(false);
  const [pathwayToGoalError, SetpathwayToGoalError] = useState(false);
  const [educationError, SeteducationError] = useState(false);
  const [solutionError, SetsolutionError] = useState(false);
  const [livelihoodvalueError, SetlivelihoodvalueError] = useState(false);
  const [sharelearningError, SetsharelearningError] = useState(false);
  const [problemsdisheartenedError, SetproblemsdisheartenedError] = useState(false);
  const [failurepersonError, SetfailurepersonError] = useState(false);
  const [expenditureError, SetexpenditureError] = useState(false);
  const [accounts_for_Self_EnterprisesError, Setaccounts_for_Self_EnterprisesError] = useState(false);
  const [savemoneyError, SetsavemoneyError] = useState(false);
  const [purchaseError, SetpurchaseError] = useState(false);
  const [vyaapar, setVyaapar] = useState('');
  const [goladAchicedError, setGoladAchicedError] = useState(false);
  const [goladAchicedValue, setGoladAchiced] = React.useState('');
  const label = { inputProps: { 'aria-label': 'Checkbox demo' } };
  const [checked, setChecked] = React.useState({
    loanborrow: [],
    borrowedmoney: [],
  });

  const workOptions = [
    { id: 1, name: "My work" },
    { id: 2, name: "Savings from household expenditure" },
    { id: 3, name: "My husband" },
    { id: 4, name: "Others…/ಇತರೆ…"}
  ]
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
  const houseOptions = [
    { id: 1, name: "Owned/ಸ್ವಂತ" },
    { id: 2, name: "Rented/ಬಾಡಿಗೆ" },
    { id: 3, name: "Others…/ಇತರೆ…"}
  ]
  const RoofOptions = [
    { id: 1, name: "Thatched/ಹುಲ್ಲಿನ" },
    { id: 2, name: "Tile/ಹಂಚಿನ " },
    { id: 3, name: "Sheet/ಶೀಟ್"},
    { id: 4, name: "Concrete/ತಾರಸಿ"},
    { id: 5, name: "Others……/ಇತರೆ......  "}
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

  const handlecheckedata = (label, event) => {
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
  const handleClickOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
    setIsFormPresentLocally(false)
   
  };

  const saveDataLocally = (key, data) => {
    const existingData = localStorage.getItem('shaktiform');
    const parsedData = existingData ? JSON.parse(existingData) : [];
    const newData = { ...data}; // Replace with your own data object
    parsedData.push(newData);
    const updatedData = JSON.stringify(parsedData);
    localStorage.setItem('shaktiform', updatedData);
};


  useEffect(()=>{
    const existingData = localStorage.getItem('shaktiform');
        const parsedData = existingData ? JSON.parse(existingData) : [];
        if(parsedData?.length){
          parsedData.map(item=>{
            if(item?.participantId===itm?.participant_id){
              setSendData(item);
              setIsFormPresentLocally(true)
            }
          })
        }
    },[])


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
  const handleSoleEarning = (event) => {
    setSendData( {...sendData, sole_earner_family: event.target.value })
    setGoladAchiced(event.target.value);
    setGoladAchicedError(false);
  };

  const handledClose = () => {
    setOpen(false);
    setworthperson(false);
    setqualitiesgood(false);
    setfailureperson(false);
    setproblemsdisheartened(false);
    setproblemsolutions(false);
    setplan(false);
    setsolution(false);
    setmoneysave(false);
    setsavingfrequency(false);
    seteducation(false);
    sethealthcareaccess(false);
    setcreditaccess(false);
    setsavemoney(false);
    setpurchase(false);
    setexpenditure(false);
    setlivelihoodvalue(false);
    setshareproblems(false);
    setsharelearning(false);
  };
  const handleworthperson = (event) => {
    setworthperson(event.target.value);
    SetworthpersonError(false)
  };
  const handlequalitiesgood = (event) => {
    setqualitiesgood(event.target.value);
    SetQualitiesgoodError(false)
  };
  const handlefailureperson = (event) => {
    setfailureperson(event.target.value);
    SetfailurepersonError(false);
  };
  const handleproblemsdisheartened = (event) => {
    setproblemsdisheartened(event.target.value);
    SetproblemsdisheartenedError(false);
  };
  const handleproblemsolutions = (event) => {
    setproblemsolutions(event.target.value);
    SetproblemsolutionsError(false);
  };
  const handleplan = (event) => {
    setplan(event.target.value);
    SetImplementationPlanError(false);
  };
  const handlesolution = (event) => {
    setsolution(event.target.value);
    SetsolutionError(false);
  };
  const handlemoneysave = (event) => {
    setmoneysave(event.target.value);
    SetmoneysaveError(false);
  };
  const handlesavingfrequency = (event) => {
    setsavingfrequency(event.target.value);
    SetsavingfrequencyError(false);
  };
  const handleducation = (event) => {
    seteducation(event.target.value);
    SeteducationError(false)
  };
  const handlehealthcareaccess = (event) => {
    sethealthcareaccess(event.target.value);
    SetAccessToHealtcareError(false)
  };
  const handlecreditaccess = (event) => {
    setcreditaccess(event.target.value);
    SetCreditaccessError(false);
  };
  const handlesavemoney = (event) => {
    setsavemoney(event.target.value);
    SetsavemoneyError(false);
  };
  const handlepurchase = (event) => {
    setpurchase(event.target.value);
    SetpurchaseError(false)
  };
  const handlexpenditure = (event) => {
    setexpenditure(event.target.value);
    SetexpenditureError(false);
  };
  const handlelivelihood = (event) => {
    setlivelihoodvalue(event.target.value);
    SetlivelihoodvalueError(false);
  };
  const handleshareproblems = (event) => {
    setshareproblems(event.target.value);
    SetshareproblemsError(false);
  };
  const handlesharelearning = (event) => {
    setsharelearning(event.target.value);
    SetsharelearningError(false);
  };
  const [sendData, setSendData] = React.useState({
    "id": itm.participantId,
    "district": "Your District",
    "taluk": "Your Taluk",
    "gram_panchayat": "Your Gram Panchayat",
    "village_name": "Your Village Name",
    "house": "Your House",
    "roof": "Your Roof Type",
    "ration_card": "Ration Card Number",
    "religion":"hindu",
    "education_level":"higer level ediuucation ",
    "caste": "4",
    "sub_cast_name": "Sub-caste Name",
    "religion": "Your Religion",
    "marital_status": "Your Marital Status",
    "primary_occupation": "Your Primary Occupation",
    "monthly_household_expenditure": 2000.0,
    "monthly_household_income": 5000.0,
    "sole_earner_family": "Yes",
    "source": "N/A",
    "secondary_occupation_of_the_household" :"secondary_occupation_of_the_household",
     
            "primary_occupation_of_the_household": "None",
            "womens_occupation": "No Data",
            "monthly_women_income": 0,
            "source_of_this_income": "Unknown",
            "religion":"hindu",
            "education_level":"higer level ediuucation ",
            
    "education_level": "Highest Level of Education Completed",
      
    "womens_occupation_name":"",
    "ration_card_name":"",
    "source_of_this_income_name":"",
      "primary_occupation_name":"",
      "material_status_name":"",
  });


console.log(sendData , "senDatasenData" )
  const shakthiformdata = async () => {
   var data ={}
    data = JSON.stringify({
    "id": parseInt(itm?.participant_id),
    "district": sendData.distric_namet,
    "taluk": sendData.taluk_name,
    "gram_panchayat": sendData.gram_panchayat,
    "village_name": sendData.village_name,
    "house": sendData.house_name,
    "roof": sendData.roof_name,
    "ration_card": sendData.ration_card_name,
    "caste": sendData.cast_category_name,
    "sub_cast_name": sendData.sub_cast_name,
    "religion": sendData.religion_name,
    "marital_status":sendData.material_status_name,
    "education_level": sendData.education_name,
    "primary_occupation": sendData.primary_occupation_of_the_household_name,
    "monthly_household_expenditure":parseFloat(sendData.monthly_household_expenditure) ,
    "monthly_household_income": parseFloat(sendData.monthly_household_income),
    "sole_earner_family": sendData.sole_earner_family,
    "source": sendData.source_of_this_income_name,
    "secondary_occupation_of_the_household":sendData?.secondary_occupation_of_the_household_name,
    "primary_occupation_of_the_household": sendData.primary_occupation_of_the_household_name,
    "womens_occupation": sendData.womens_occupation_name,
    "monthly_women_income": parseFloat(sendData.monthly_women_income),
    "source_of_this_income":sendData.source_of_this_income_name,
    "religion":sendData.religion_name,
    "education_level":sendData.education_name,
    

      
    });

    const values = Object.values(data);
    const hasEmptyFields = values.some((value) => value === "");
    
console.log(data ,"data")
   if(isOnline() && networkAccess()){
    // if(plan == ''){
    //   SetImplementationPlanError(true);
    //   setHelperText('please select the option')
    // }
    // if(qualitiesgood == ''){
    //   SetQualitiesgoodError(true);
    //   setHelperText('please select the option')
    // }
    // if(healthcareaccess == ''){
    //   SetAccessToHealtcareError(true);
    //   setHelperText('please select the option')
    // }
    // if(creditaccess == ''){
    //   SetCreditaccessError(true);
    //   setHelperText('please select the option')
    // }
    // if(sendData?.household_books_accounts == ''){
    //   SetHousehold_books_accountsError(true);
    //   setHelperText('please select the option')
    // }
    // if(sendData?.saveRegularly == ''){
    //   SetsaveRegularlyError(true);
    //   setHelperText('please select the option')
    // }
    // if(sendData?.specificGoalForSavings == ''){
    //   SetspecificGoalForSavingsError(true);
    //   setHelperText('please select the option')
    // }
    // if(problemsolutions == ''){
    //   SetproblemsolutionsError(true);
    //   setHelperText('please select the option')
    // }
    // if(worthperson == ''){
    //   SetworthpersonError(true);
    //   setHelperText('please select the option')
    // }
    // if(sendData?.ownAsset == ''){
    //   SetownAssetError(true);
    //   setHelperText('please select the option')
    // }
    // if(sendData?.separateFinancialAsset == ''){
    //   SetseparateFinancialAssetError(true);
    //   setHelperText('please select the option')
    // }
    // if(sendData?.partOfCollective == ''){
    //   SetpartOfCollectiveError(true);
    //   setHelperText('please select the option')
    // }
    // if(moneysave == ''){
    //   SetmoneysaveError(true);
    //   setHelperText('please select the option')
    // }
    // if(sendData?.haveLoan == ''){
    //   SethaveLoanError(true);
    //   setHelperText('please select the option')
    // }
    // if(shareproblems == ''){
    //   SetshareproblemsError(true);
    //   setHelperText('please select the option')
    // }
    // if(sendData?.spendMoney == ''){
    //   SetspendMoneyError(true);
    //   setHelperText('please select the option')
    // }
    // if(savingfrequency == ''){
    //   SetsavingfrequencyError(true);
    //   setHelperText('please select the option')
    // }
    // if(sendData?.loanOnWhoseName == ''){
    //   SetloanOnWhoseNameError(true);
    //   setHelperText('please select the option')
    // }
    // if(sendData?.haveGoal == ''){
    //   SethaveGoalError(true);
    //   setHelperText('please select the option')
    // }
    // if(sendData?.pathwayToGoal == ''){
    //   SetpathwayToGoalError(true);
    //   setHelperText('please select the option')
    // }
    // if(education == ''){
    //   SeteducationError(true);
    //   setHelperText('please select the option')
    // }
    // if(solution == ''){
    //   SetsolutionError(true);
    //   setHelperText('please select the option')
    // }
    // if(livelihoodvalue == ''){
    //   SetlivelihoodvalueError(true);
    //   setHelperText('please select the option')
    // }
    // if(sharelearning == ''){
    //   SetsharelearningError(true);
    //   setHelperText('please select the option')
    // }
    // if(problemsdisheartened == ''){
    //   SetproblemsdisheartenedError(true);
    //   setHelperText('please select the option')
    // }
    // if(failureperson == ''){
    //   SetfailurepersonError(true);
    //   setHelperText('please select the option')
    // }
    // if(expenditure == ''){
    //   SetexpenditureError(true);
    //   setHelperText('please select the option')
    // }
    // if(sendData?.accounts_for_Self_Enterprises == ''){
    //   Setaccounts_for_Self_EnterprisesError(true);
    //   setHelperText('please select the option')
    // }
    // if(savemoney == ''){
    //   SetsavemoneyError(true);
    //   setHelperText('please select the option')
    // }
    // if(purchase == ''){
    //   SetpurchaseError(true);
    //   setHelperText('please select the option')
    // }
    // if(checked['loanborrow'] == 0){
    //   SetloanborrowError(true);
    //   setHelperText('please select the option')
    // }
    // if(checked['borrowedmoney'] == 0){
    //   SetborrowedmoneyError(true);
    //   setHelperText('please select the option')
    // }\

    console.log(hasEmptyFields , !hasEmptyFields)
    if(!hasEmptyFields){
    if(localStorage.getItem('shaktiform')){
      data = setshaktidata(saveDataLocally('shaktiform',JSON.parse(data)))
      setshaktidata(data);
    }

   
   else{
    data = JSON.stringify({
      "id": parseInt(itm?.participant_id),
      "district": sendData.distric_namet,
      "taluk": sendData.taluk_name,
      "gram_panchayat": sendData.gram_panchayat,
      "village_name": sendData.village_name,
      "house": sendData.house_name,
      "roof": sendData.roof_name,
      "ration_card": sendData.ration_card_name,
      "caste": sendData.cast_category_name,
      "sub_cast_name": sendData.sub_cast_name,
      "religion": sendData.religion_name,
      "marital_status":sendData.material_status_name,
      "education_level": sendData.education_name,
      "primary_occupation": sendData.primary_occupation_name,
      "monthly_household_expenditure":parseFloat(sendData.monthly_household_expenditure) ,
      "monthly_household_income": parseFloat(sendData.monthly_household_income),
      "sole_earner_family": sendData.sole_earner_family,
      "source": sendData.source_of_this_income_name,
      "secondary_occupation_of_the_household":sendData.secondary_occupation_of_the_household_name,
      "primary_occupation_of_the_household": sendData.primary_occupation_of_the_household_name,
      "womens_occupation": sendData.womens_occupation_name,
      "monthly_women_income": parseFloat(sendData.monthly_women_income),
      "source_of_this_income":sendData.source_of_this_income_name,
      "religion":sendData.religion_name,
      "education_level":sendData.education_name,
      
  
        
      });
  
      const values = Object.values(data);
      const hasEmptyFields = values.some((value) => value === "");
      
   }
    var config = {
      method: 'post',
      url: baseURL + 'addselfshakti',
      headers: {
        'Content-Type': 'application/json',
         'Authorization': `${apikey}`
      },
      data: data,
    };
  
    axios(config)
      .then(function (response) {
        reloadFUnction()
        alert(response.data.message);
        Swal.fire({
          icon: 'error',
          title: 'Error',
          text: response.data.message,
          confirmButtonText: 'Ok',
          timer: 2000,
        });
        setshaktidata(response?.data);
      })
      .catch(function (error) {
        Swal.fire({
          icon: 'error',
          title: 'Error',
          text: response.data.message,
          confirmButtonText: 'Ok',
          timer: 2000,
        });
      });
      handleClose();
   }
  else{
    alert('PLease Fill All The Field ');
  }
}
   else{
    // if(plan == ''){
    //   SetImplementationPlanError(true);
    //   setHelperText('please select the option')
    // }
    // if(qualitiesgood == ''){
    //   SetQualitiesgoodError(true);
    //   setHelperText('please select the option')
    // }
    // if(healthcareaccess == ''){
    //   SetAccessToHealtcareError(true);
    //   setHelperText('please select the option')
    // }
    // if(creditaccess == ''){
    //   SetCreditaccessError(true);
    //   setHelperText('please select the option')
    // }
    // if(sendData?.household_books_accounts == ''){
    //   SetHousehold_books_accountsError(true);
    //   setHelperText('please select the option')
    // }
    // if(sendData?.saveRegularly == ''){
    //   SetsaveRegularlyError(true);
    //   setHelperText('please select the option')
    // }
    // if(sendData?.specificGoalForSavings == ''){
    //   SetspecificGoalForSavingsError(true);
    //   setHelperText('please select the option')
    // }
    // if(problemsolutions == ''){
    //   SetproblemsolutionsError(true);
    //   setHelperText('please select the option')
    // }
    // if(worthperson == ''){
    //   SetworthpersonError(true);
    //   setHelperText('please select the option')
    // }
    // if(sendData?.ownAsset == ''){
    //   SetownAssetError(true);
    //   setHelperText('please select the option')
    // }
    // if(sendData?.separateFinancialAsset == ''){
    //   SetseparateFinancialAssetError(true);
    //   setHelperText('please select the option')
    // }
    // if(sendData?.partOfCollective == ''){
    //   SetpartOfCollectiveError(true);
    //   setHelperText('please select the option')
    // }
    // if(moneysave == ''){
    //   SetmoneysaveError(true);
    //   setHelperText('please select the option')
    // }
    // if(sendData?.haveLoan == ''){
    //   SethaveLoanError(true);
    //   setHelperText('please select the option')
    // }
    // if(shareproblems == ''){
    //   SetshareproblemsError(true);
    //   setHelperText('please select the option')
    // }
    // if(sendData?.spendMoney == ''){
    //   SetspendMoneyError(true);
    //   setHelperText('please select the option')
    // }
    // if(savingfrequency == ''){
    //   SetsavingfrequencyError(true);
    //   setHelperText('please select the option')
    // }
    // if(sendData?.loanOnWhoseName == ''){
    //   SetloanOnWhoseNameError(true);
    //   setHelperText('please select the option')
    // }
    // if(sendData?.haveGoal == ''){
    //   SethaveGoalError(true);
    //   setHelperText('please select the option')
    // }
    // if(sendData?.pathwayToGoal == ''){
    //   SetpathwayToGoalError(true);
    //   setHelperText('please select the option')
    // }
    // if(education == ''){
    //   SeteducationError(true);
    //   setHelperText('please select the option')
    // }
    // if(solution == ''){
    //   SetsolutionError(true);
    //   setHelperText('please select the option')
    // }
    // if(livelihoodvalue == ''){
    //   SetlivelihoodvalueError(true);
    //   setHelperText('please select the option')
    // }
    // if(sharelearning == ''){
    //   SetsharelearningError(true);
    //   setHelperText('please select the option')
    // }
    // if(problemsdisheartened == ''){
    //   SetproblemsdisheartenedError(true);
    //   setHelperText('please select the option')
    // }
    // if(failureperson == ''){
    //   SetfailurepersonError(true);
    //   setHelperText('please select the option')
    // }
    // if(expenditure == ''){
    //   SetexpenditureError(true);
    //   setHelperText('please select the option')
    // }
    // if(sendData?.accounts_for_Self_Enterprises == ''){
    //   Setaccounts_for_Self_EnterprisesError(true);
    //   setHelperText('please select the option')
    // }
    // if(savemoney == ''){
    //   SetsavemoneyError(true);
    //   setHelperText('please select the option')
    // }
    // if(purchase == ''){
    //   SetpurchaseError(true);
    //   setHelperText('please select the option')
    // }
    // if(checked['loanborrow'] == 0){
    //   SetloanborrowError(true);
    //   setHelperText('please select the option')
    // }
    // if(checked['borrowedmoney'] == 0){
    //   SetborrowedmoneyError(true);
    //   setHelperText('please select the option')
    // }
    if(!hasEmptyFields){
    setshaktidata(saveDataLocally('shaktiform',JSON.parse(data)));
     handleClose(); 
    }else{
      alert("please select all the fields")
    }
}
   
  };
  useEffect(() => {
    let localFormPresent1 = new Map();
    let existingData;
    existingData = localStorage.getItem('shaktiform');
    let parsedData = JSON.parse(existingData);
    parsedData?.map((item) => {
      localFormPresent1.set(item?.participantId, 'true');
    });
      setlocalFormPresent(localFormPresent1);
    },[localStorage?.getItem("shaktiform")]);
  
  useEffect(()=>{
  },[localFormPresent])
    const handleSurveyform = ()=>{
      alert("This form was Filled!!")
    }

const handlesurvey=()=>{
  alert('Form is already filled')
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
useEffect(()=>{
  getDistrict()
},[])
useEffect(() => {
  gelathinamelist();
 
}, []);
  return (
    <>
      {/* <Button variant="outlined" onClick={handleClickOpen}>
     Survey form
      </Button> */}
      <div style={{ position: 'absolute', right: 0, float: 'right' }}>
        {
        (itm?.isSurveyDone=='0' && !(localFormPresent?.has(itm?.participant_id)))?
        <IconButton onClick={handleClickOpen}>
          <Iconify icon="clarity:form-line" width={20} height={20} color="#ff7424" /> 
        </IconButton>
              
        :( itm?.isSurveyDone=='0' && (localFormPresent?.has(itm?.participant_id)))?

     <>
       <IconButton onClick={handleSurveyform}>
                
       <span style={{color:"black"}}>📄</span>
                   </IconButton></> :<IconButton onClick={handlesurvey}>
          <Iconify icon="charm:notes-tick" width={20} height={20} color="green" />
        </IconButton>}
      </div>
      <Dialog fullScreen open={open} onClose={handleClose} TransitionComponent={Transition}>
        <form
          // ref={formRef}
          onSubmit={(e) => {
            e.preventDefault();
            shakthiformdata();
          }}
        >
          <AppBar sx={{ position: 'fixed', bgcolor: '#ff7424' }}>
            <Toolbar>
              <IconButton edge="start" color="inherit" onClick={handledClose} aria-label="close">
                <CloseIcon />
              </IconButton>
              <Typography sx={{ ml: 2, flex: 1, color: 'white' }} variant="h6" component="div">
                Survey Form
              </Typography>
              <Button autoFocus color="inherit" type="submit">
                save
              </Button>
            </Toolbar>
          </AppBar>
          <Grid style={{marginTop:20}}>

          <Card mt={1} style={{ marginTop: 50, borderRadius: 20 }}>
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
                    Roof/ಛಾವಣಿ: 
 

                    </Typography>
                    <Stack mt={2} mb={2}>
                      <Select
                        color="common"
                        label="Choose  Ration card/ಪಡಿತರ ಚೀಟಿ:"
                        variant="standard"
                        required
                        onChange={(e) => {
                          const selectedOption = RoofOptions.find(option => option.id === e.target.value);
                         setSendData({ ...sendData, roof: selectedOption.id, roof_name: selectedOption?.name  });
                      
                         console.log(selectedOption); }}
                        value={sendData?.roof}
                      >
                       {RoofOptions.map((itm) => (
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
<Card style={{ marginTop: 10, borderRadius: 20 }}>
                  <CardContent>
                    <Typography variant="subtitle2" style={{ color: '#ff7424' }}>
                    Sub-caste name/ಉಪಜಾತಿ ಹೆಸರು

                    </Typography>
                    <Stack mt={2} mb={2}>
                      <TextField
                        id="grampanchayath"
                        label="Your Answer"
                        required
                        onChange={(e) => {
                          setSendData({ ...sendData, sub_cast_name: e?.target?.value });
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
<Card mt={1} style={{ marginTop: 10, borderRadius: 20 }}>
  <CardContent>
    <Typography variant="subtitle2" style={{ color: '#ff7424' }}>
    Highest level of education completed  
ಉನ್ನತ ಮಟ್ಟದ ಶಿಕ್ಷಣವನ್ನು ಪೂರ್ಣಗೊಳಿಸಲಾಗಿದೆ 
:
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
<Card mt={1} style={{ marginTop: 10, borderRadius: 20 }}>
                  <CardContent>
                    <Typography variant="subtitle2" style={{ color: '#ff7424' }}>
                    Primary occupation (the work that you engage in for more than 6 months in a year)
ಪ್ರಾಥಮಿಕ ಉದ್ಯೋಗ (ಒಂದು ವರ್ಷದಲ್ಲಿ 6 ತಿಂಗಳಿಗಿಂತ ಹೆಚ್ಚು ಕಾಲ ನೀವು ತೊಡಗಿಸಿಕೊಂಡಿರುವ ಕೆಲಸ)



                    </Typography>
                    <Stack mt={2} mb={2}>
                      <Select
                        color="common"
                        label="Choose Current Economic Activity"
                        variant="standard"
                        required
                        onChange={(e) => {
                          const selectedOption = occupationOptions.find(option => option.id === e.target.value);
                         setSendData({ ...sendData, primary_occupation_of_the_household: selectedOption.id, primary_occupation_of_the_household_name: selectedOption?.name  });
                      
                         console.log(selectedOption); }} value={sendData?.primary_occupation_of_the_household}
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
                         setSendData({ ...sendData, secondary_occupation_of_the_household: selectedOption.id, secondary_occupation_household_name: selectedOption?.name  });
                      
                         console.log(selectedOption); }}
                         
                         value={sendData?.secondary_occupation_of_the_household}
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
                <Card mt={1} style={{ marginTop: 50, borderRadius: 20 }}>
                  <CardContent>
                    <Typography variant="subtitle2" style={{ color: '#ff7424' }}>
                    Monthly Women's income
                    *
                    </Typography>
                    <Stack mt={2} mb={2}>
                      <TextField
                        id="Email"
                        required
                        label="Your answer"
                        onChange={(e) => {
                          setSendData({ ...sendData, monthly_women_income: e?.target?.value });
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
                    What is the source of this income?

                    </Typography>
                    <Stack mt={2} mb={2}>
                      <Select
                        color="common"
                        label="Choose Women's Occupation/ಮಹಿಳಾ ಉದ್ಯೋಗ"
                        variant="standard"
                        required
                        onChange={(e) => {
                          const selectedOption = workOptions.find(option => option.id === e.target.value);
                         setSendData({ ...sendData, source_of_this_income: selectedOption.id, source_of_this_income_name: selectedOption?.name  });
                      
                         console.log(selectedOption); }}
                        
                        value={sendData?.source_of_this_income}
                      >
                       {workOptions.map((itm) => (
          <MenuItem key={itm.id} value={itm.id}>
            {itm.name}
          </MenuItem>
        ))}
                      </Select>
                    </Stack>
                  </CardContent>
                </Card>
                <Card mt={1} style={{ marginTop: 50, borderRadius: 20 }}>
                  <CardContent>
                    <Typography variant="subtitle2" style={{ color: '#ff7424' }}>

 	
                    Monthly household expenditure (in Rs)   
ಮಾಸಿಕ ಮನೆಯ ಖರ್ಚು (ರೂ.ಗಳಲ್ಲಿ)
                    *
                    </Typography>
                    <Stack mt={2} mb={2}>
                      <TextField
                        id="Email"
                        required
                        label="Your answer"
                        onChange={(e) => {
                          setSendData({ ...sendData, monthly_household_expenditure: e?.target?.value });
                        }}
                        variant="outlined"
                        color="common"
                      />
                    </Stack>
                  </CardContent>
                </Card>
                <Card mt={1} style={{ marginTop: 50, borderRadius: 20 }}>
                  <CardContent>
                    <Typography variant="subtitle2" style={{ color: '#ff7424' }}>

 	
                    Monthly household income(in Rs.)   
                    ಮಾಸಿಕ ಮನೆಯ ಆದಾಯ(ರೂ.ಗಳಲ್ಲಿ)
                    *
                    </Typography>
                    <Stack mt={2} mb={2}>
                      <TextField
                        id="Email"
                        required
                        label="Your answer"
                        onChange={(e) => {
                          setSendData({ ...sendData, monthly_household_income: e?.target?.value });
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
                      Are you the sole earning member of your family?   (Yes/No)
                      /ನಿಮ್ಮ ಕುಟುಂಬದ ಏಕೈಕ ಗಳಿಕೆಯ ಸದಸ್ಯರಾಗಿದ್ದೀರಾ? (ಹೌದು/ಇಲ್ಲ)
                        {goladAchicedError ? (
                          <FormHelperText style={{ color: 'red' }}>{helperText}</FormHelperText>
                        ) : null}{' '}
                      </Typography>
                      <RadioGroup
                        aria-labelledby="demo-radio-buttons-group-label"
                        name="radio-buttons-group"
                        value={goladAchicedValue}
                        onChange={handleSoleEarning}
                      >
                        <FormControlLabel value="Yes" control={<Radio style={{ color: '#595959' }} />} label="Yes" />
                        <FormControlLabel value="No" control={<Radio style={{ color: '#595959' }} />} label="No" />
                      </RadioGroup>
                    </Stack>
                  </CardContent>
                </Card>
            <Card >
              {/* <CardContent>
                <Stack>
                  <Typography mt={3} variant="h6" color="primary">
                    % of Women With increased Self Esteem{' '}
                  </Typography>
                </Stack>
                <Stack>
                  <Typography mt={2} variant="body2">
                    1. I feel That I am Person of worth
                  </Typography>
                  {worthpersonError ? (
                          <FormHelperText style={{ color: 'red' }}>{helperText}</FormHelperText>
                        ) : null}{' '}
                  <Stack mt={2}>
                    <InputLabel variant="standard" id="demo-simple-select-standard-label" required>
                      Answer
                    </InputLabel>
                    <Select
                      
                      required // add the required attribute
                      fullWidth
                      variant="standard"
                      color="common"
                      labelId="demo-simple-select-standard-label"
                      id="demo-simple-select-standard"
                      value={worthperson}
                      helpertext="Incorrect entry."
                      onChange={handleworthperson}
                    >
                      <MenuItem value="" style={{ backgroundColor: 'gray' }}>
                        <em>Select Answer </em>
                      </MenuItem>
                      <MenuItem value="Strongly Agree">Strongly Agree</MenuItem>
                      <MenuItem value="Agree">Agree</MenuItem>
                      <MenuItem value="Disagree">Disagree</MenuItem>
                      <MenuItem value="Strongly Disagree">Strongly Disagree</MenuItem>
                    </Select>
                  </Stack>
                </Stack>
                <br />
                <Stack>
                  <Typography variant="body2">2. I feel That I have Several good Qualities</Typography>
                  {qualitiesgoodError ? (
                          <FormHelperText style={{ color: 'red' }}>{helperText}</FormHelperText>
                        ) : null}{' '}
                  <Stack mt={2}>
                    <InputLabel variant="standard" id="demo-simple-select-standard-label">
                      Answer
                    </InputLabel>
                    <Select
                      variant="standard"
                      color="common"
                      fullWidth
                      labelId="demo-simple-select-standard-label"
                      id="demo-simple-select-standard"
                      value={qualitiesgood}
                      onChange={handlequalitiesgood}
                    >
                      <MenuItem value="" style={{ backgroundColor: 'gray' }}>
                        <em>Select Answer</em>
                      </MenuItem>
                      <MenuItem value="Strongly Agree">Strongly Agree</MenuItem>
                      <MenuItem value="Agree">Agree</MenuItem>
                      <MenuItem value="Disagree">Disagree</MenuItem>
                      <MenuItem value="Strongly Disagree">Strongly Disagree</MenuItem>
                    </Select>
                  </Stack>
                </Stack>
                <br />
                <Stack>
                  <Typography variant="body2">3. Sometimes I feel I am a Failure Person</Typography>
                  {failurepersonError ? (
                          <FormHelperText style={{ color: 'red' }}>{helperText}</FormHelperText>
                        ) : null}{' '}
                  <Stack mt={2}>
                    <InputLabel variant="standard" id="demo-simple-select-standard-label">
                      Answer
                    </InputLabel>
                    <Select
                      variant="standard"
                      color="common"
                      fullWidth
                      labelId="demo-simple-select-standard-label"
                      id="demo-simple-select-standard"
                      value={failureperson}
                      onChange={handlefailureperson}
                    >
                      <MenuItem value="" style={{ backgroundColor: 'gray' }}>
                        <em>Select Answer</em>
                      </MenuItem>
                      <MenuItem value="Strongly Agree">Strongly Agree</MenuItem>
                      <MenuItem value="Agree">Agree</MenuItem>
                      <MenuItem value="Disagree">Disagree</MenuItem>
                      <MenuItem value="Strongly Disagree">Strongly Disagree</MenuItem>
                    </Select>
                  </Stack>
                </Stack>
                &nbsp;
                <Stack>
                  <Typography style={{ fontWeight: 500 }} color="primary">
                    Number of Women Work Toward Their Goal and Continuosly Track It Using The Buzz Self Assessment Tools
                    Women Who Have Goal
                  </Typography>
                </Stack>
                <Stack>
                  <Typography variant="body2">1. Do you have a goal? what is it ?</Typography>
                  {haveGoalError ? (
                          <FormHelperText style={{ color: 'red' }}>{helperText}</FormHelperText>
                        ) : null}{' '}
                  <Stack mt={2}>
                    <RadioGroup
                      aria-labelledby="demo-radio-buttons-group-label"
                      // defaultValue="Yes"
                      name="radio-buttons-group"
                      onChange={(e, value) => {
                        setSendData({ ...sendData, haveGoal: value });
                      }}
                    >
                      <div style={{ display: 'flex' }}>
                        <FormControlLabel value="No" control={<Radio style={{ color: '#595959' }} />} label="No" />
                        <FormControlLabel value="Yes" control={<Radio style={{ color: '#595959' }} />} label="Yes" />
                      </div>
                    </RadioGroup>
                  </Stack>
                </Stack>
              
                <Stack>
                  <Typography variant="body2">2. Is there a pathway to that goal ?</Typography>
                  {pathwayToGoalError ? (
                          <FormHelperText style={{ color: 'red' }}>{helperText}</FormHelperText>
                        ) : null}{' '}
                  <Stack mt={2}>
                    <RadioGroup
                      aria-labelledby="demo-radio-buttons-group-label"
                      // defaultValue="Yes"
                      name="radio-buttons-group"
                      onChange={(e, value) => {
                        setSendData({ ...sendData, pathwayToGoal: value });
                      }}
                    >
                      <div style={{ display: 'flex' }}>
                        <FormControlLabel value="No" control={<Radio style={{ color: '#595959' }} />} label="No" />
                        <FormControlLabel value="Yes" control={<Radio style={{ color: '#595959' }} />} label="Yes" />
                      </div>
                    </RadioGroup>
                  </Stack>
                </Stack>
                <hr />
                <Stack>
                  &nbsp;{' '}
                  <Typography style={{ fontWeight: 500 }} color="primary">
                    Number of women who believe they can find solutions through self initiative
                  </Typography>
                </Stack>
                <Stack>
                  <Typography variant="body2">1. I look at problems and get disheartened</Typography>
                  {problemsdisheartenedError ? (
                          <FormHelperText style={{ color: 'red' }}>{helperText}</FormHelperText>
                        ) : null}{' '}
                  <Stack mt={2}>
                    <InputLabel variant="standard" id="demo-simple-select-standard-label">
                      Answer
                    </InputLabel>
                    <Select
                      fullWidth
                      variant="standard"
                      color="common"
                      labelId="demo-simple-select-standard-label"
                      id="demo-simple-select-standard"
                      value={problemsdisheartened}
                      onChange={handleproblemsdisheartened}
                    >
                      <MenuItem value="" style={{ backgroundColor: 'gray' }}>
                        <em>Select Answer</em>
                      </MenuItem>
                      <MenuItem value="Strongly Agree">Strongly Agree</MenuItem>
                      <MenuItem value="Agree">Agree</MenuItem>
                      <MenuItem value="Disagree">Disagree</MenuItem>
                      <MenuItem value="Strongly Disagree">Strongly Disagree</MenuItem>
                    </Select>
                  </Stack>
                </Stack>
                <Stack>
                  &nbsp;{' '}
                  <Typography variant="body2">
                    2. I take problem and attempt to think about solutions for it ?
                  </Typography>
                  {problemsolutionsError ? (
                          <FormHelperText style={{ color: 'red' }}>{helperText}</FormHelperText>
                        ) : null}{' '}
                  <Stack mt={2}>
                    <InputLabel variant="standard" id="demo-simple-select-standard-label">
                      Answer
                    </InputLabel>
                    <Select
                      fullWidth
                      variant="standard"
                      color="common"
                      labelId="demo-simple-select-standard-label"
                      id="demo-simple-select-standard"
                      value={problemsolutions}
                      onChange={handleproblemsolutions}
                    >
                      <MenuItem value="" style={{ backgroundColor: 'gray' }}>
                        <em>Select Answer</em>
                      </MenuItem>
                      <MenuItem value="Strongly Agree">Strongly Agree</MenuItem>
                      <MenuItem value="Agree">Agree</MenuItem>
                      <MenuItem value="Disagree">Disagree</MenuItem>
                      <MenuItem value="Strongly Disagree">Strongly Disagree</MenuItem>
                    </Select>
                  </Stack>
                </Stack>
                <Stack>
                  &nbsp;{' '}
                  <Typography variant="body2">
                  {implementationPlanError ? (
                          <FormHelperText style={{ color: 'red' }}>{helperText}</FormHelperText>
                        ) : null}{' '}
                    3. Once I Choose A Solution I Make An Implementation Plan For It ?
                    <Stack mt={2}>
                      <InputLabel variant="standard" id="demo-simple-select-standard-label">
                        Answer
                      </InputLabel>
                      <Select
                        fullWidth
                        variant="standard"
                        color="common"
                        labelId="demo-simple-select-standard-label"
                        id="demo-simple-select-standard"
                        value={plan}
                        onChange={handleplan}
                      >
                        <MenuItem value="" style={{ backgroundColor: 'gray' }}>
                          <em>Select Answer</em>
                        </MenuItem>
                        <MenuItem value="Strongly Agree">Strongly Agree</MenuItem>
                        <MenuItem value="Agree">Agree</MenuItem>
                        <MenuItem value="Disagree">Disagree</MenuItem>
                        <MenuItem value="Strongly Disagree">Strongly Disagree</MenuItem>
                      </Select>
                    </Stack>
                  </Typography>
                  &nbsp;
                </Stack>
                <Stack>
                  <Typography variant="body2">4. I Look A Solution Since I Don't Have An Choice?</Typography>
                  {solutionError ? (
                          <FormHelperText style={{ color: 'red' }}>{helperText}</FormHelperText>
                        ) : null}{' '}
                  <Stack mt={2}>
                    <InputLabel variant="standard" id="demo-simple-select-standard-label">
                      Answer
                    </InputLabel>
                    <Select
                      fullWidth
                      variant="standard"
                      color="common"
                      labelId="demo-simple-select-standard-label"
                      id="demo-simple-select-standard"
                      value={solution}
                      onChange={handlesolution}
                    >
                      <MenuItem value="" style={{ backgroundColor: 'gray' }}>
                        <em>Select Answer</em>
                      </MenuItem>
                      <MenuItem value="Strongly Agree">Strongly Agree</MenuItem>
                      <MenuItem value="Agree">Agree</MenuItem>
                      <MenuItem value="Disagree">Disagree</MenuItem>
                      <MenuItem value="Strongly Disagree">Strongly Disagree</MenuItem>
                    </Select>
                  </Stack>
                </Stack>
                &nbsp; <hr />
                <Stack>
                  <Typography style={{ fontWeight: 700 }} color="primary">
                    Number of Women With Basic Financial Management Knowledge On Income Vs Expenditure , Book Keeping
                    etc
                  </Typography>
                </Stack>
                <Stack>
                  <Typography variant="body2">
                    1. If You Invest Rs 10,000 as Capital In Saree Buisness For 20 Saree . You Spend Rs 100 to Transport
                    the Saree from the Wholesale to your Village . If You Sell All The Saree In For Rs 12,000 , How Much
                    Profit You Have Made.
                  </Typography>
                  <Stack mt={3}>
                    <TextField
                      id="Correct Answer"
                      required
                      label="Correct Answer"
                      variant="outlined"
                      onChange={(e) => {
                        setSendData({ ...sendData, profitForSarees: e.target.value });
                      }}
                    />
                  </Stack>
                </Stack>
                <Stack>
                  <Typography variant="body2">
                    2. You Have Taken A Loan Of Rs 10,000 To be Paid Back In Equally Monthly Payments In One Year And
                    You Have To Pay Back Rs 1000 A Month. WHat Is The Annual Interest Rate ?
                  </Typography>
                  <Stack mt={3}>
                    <TextField
                      id="Correct Answer"
                      required
                      label="Correct Answer"
                      variant="outlined"
                      onChange={(e) => {
                        setSendData({ ...sendData, annualLoanInterest: e.target.value });
                      }}
                    />
                  </Stack>
                </Stack>
                &nbsp;
                <hr />
                <Stack>
                  <Typography style={{ fontWeight: 700 }} color="primary">
                    Number of Trained Women With Growing Savings (how much saved , frequency , regularities of savings)
                  </Typography>
                  {saveRegularlyError ? (
                          <FormHelperText style={{ color: 'red' }}>{helperText}</FormHelperText>
                        ) : null}{' '}
                  <Typography variant="body2">1. Do You Save Regularly ?</Typography>
                  <Stack mt={2}>
                    <RadioGroup
                      aria-labelledby="demo-radio-buttons-group-label"
                   
                      name="radio-buttons-group"
                      onChange={(e, value) => {
                        setSendData({ ...sendData, saveRegularly: value });
                      }}
                    >
                      <div style={{ display: 'flex' }}>
                        <FormControlLabel value="No" control={<Radio style={{ color: '#595959' }} />} label="No" />
                        <FormControlLabel value="Yes" control={<Radio style={{ color: '#595959' }} />} label="Yes" />
                      </div>
                    </RadioGroup>
                  </Stack>
                </Stack>
                <Stack>
                  <Typography variant="body1">2. Where Do You Save Up Money ? </Typography>
                  {moneysaveError ? (
                          <FormHelperText style={{ color: 'red' }}>{helperText}</FormHelperText>
                        ) : null}{' '}
                  <Stack mt={2}>
                    <InputLabel variant="standard" id="demo-simple-select-standard-label">
                      Answer
                    </InputLabel>
                    <Select
                      fullWidth
                      variant="standard"
                      color="common"
                      labelId="demo-simple-select-standard-label"
                      id="demo-simple-select-standard"
                      value={moneysave}
                      onChange={handlemoneysave}
                    >
                      <MenuItem value="" style={{ backgroundColor: 'gray' }}>
                        <em>Select Answer</em>
                      </MenuItem>
                      <MenuItem value="Bank">Bank</MenuItem>
                      <MenuItem value="MFI">MFI</MenuItem>
                      <MenuItem value="Post Office">Post Office</MenuItem>
                      <MenuItem value="None of the above">None of the above</MenuItem>
                      <MenuItem value="Others - specify">Others - specify</MenuItem>
                    </Select>
                  </Stack>
                </Stack>
                <Stack mt={2}>
                  <Typography variant="body1">3. What Is The Frequency Of Your Savings ? </Typography>
                  {savingfrequencyError ? (
                          <FormHelperText style={{ color: 'red' }}>{helperText}</FormHelperText>
                        ) : null}{' '}
                  <Stack mt={2}>
                    <InputLabel variant="standard" color="common" id="demo-simple-select-standard-label">
                      Age
                    </InputLabel>
                    <Select
                      variant="standard"
                      color="common"
                      fullWidth
                      labelId="demo-simple-select-standard-label"
                      id="demo-simple-select-standard"
                      value={savingfrequency}
                      onChange={handlesavingfrequency}
                    >
                      <MenuItem value="" style={{ backgroundColor: 'gray' }}>
                        <em>Select Answer</em>
                      </MenuItem>
                      <MenuItem value="Annually">Annually</MenuItem>
                      <MenuItem value="Half Yearly">Half Yearly</MenuItem>
                      <MenuItem value="Quaterly">Quaterly</MenuItem>
                      <MenuItem value="Monthly">Monthly</MenuItem>
                      <MenuItem value="Weekly">Weekly</MenuItem>
                      <MenuItem value="Daily">Daily</MenuItem>
                    </Select>
                  </Stack>
                </Stack>
                <Stack>
                  <Typography style={{ fontWeight: 700 }} color="primary">
                    Number Of Women Who Decide On How To Handle Their Personal Finances .
                  </Typography>
                </Stack>
                <Stack mt={2}>
                  <Typography variant="body2">1. Do You Own Assets In Your Name ?</Typography>
                  {ownAssetError ? (
                          <FormHelperText style={{ color: 'red' }}>{helperText}</FormHelperText>
                        ) : null}{' '}
                  <Stack mt={2}>
                    <RadioGroup
                      aria-labelledby="demo-radio-buttons-group-label"
                      name="radio-buttons-group"
                      onChange={(e, value) => {
                        setSendData({ ...sendData, ownAsset: value });
                      }}
                    >
                      <div style={{ display: 'flex' }}>
                        <FormControlLabel value="No" control={<Radio style={{ color: '#595959' }} />} label="No" />
                        <FormControlLabel value="Yes" control={<Radio style={{ color: '#595959' }} />} label="Yes" />
                      </div>
                    </RadioGroup>
                  </Stack>
                </Stack>
                <Stack mt={2}>
                  <Typography>2. Do You Seperate Financial Assets/Savings From That of Your Husbands ?</Typography>
                  {separateFinancialAssetError ? (
                          <FormHelperText style={{ color: 'red' }}>{helperText}</FormHelperText>
                        ) : null}{' '}
                  <Stack mt={2}>
                    <RadioGroup
                      aria-labelledby="demo-radio-buttons-group-label"
                  
                      name="radio-buttons-group"
                      onChange={(e, value) => {
                        setSendData({ ...sendData, separateFinancialAsset: value });
                      }}
                    >
                      <div style={{ display: 'flex' }}>
                        <FormControlLabel value="No" control={<Radio style={{ color: '#595959' }} />} label="No" />
                        <FormControlLabel value="Yes" control={<Radio style={{ color: '#595959' }} />} label="Yes" />
                      </div>
                    </RadioGroup>
                  </Stack>
                </Stack>
                <Stack mt={2}>
                  <Typography>3. Do You Spend The Money Earned By You As You Want To?</Typography>
                  {spendMoneyError ? (
                          <FormHelperText style={{ color: 'red' }}>{helperText}</FormHelperText>
                        ) : null}{' '}
                  <Stack mt={2}>
                    <RadioGroup
                      aria-labelledby="demo-radio-buttons-group-label"
                      
                      name="radio-buttons-group"
                      onChange={(e, value) => {
                        setSendData({ ...sendData, spendMoney: value });
                      }}
                    >
                      <div style={{ display: 'flex' }}>
                        <FormControlLabel value="No" control={<Radio style={{ color: '#595959' }} />} label="No" />
                        <FormControlLabel value="Yes" control={<Radio style={{ color: '#595959' }} />} label="Yes" />
                      </div>
                    </RadioGroup>
                  </Stack>
                </Stack>
                <Stack mt={2}>
                  <Typography>4. Do You Have A Loan?</Typography>
                  {haveLoanError ? (
                          <FormHelperText style={{ color: 'red' }}>{helperText}</FormHelperText>
                        ) : null}{' '}
                  <Stack mt={2}>
                    <RadioGroup
                      aria-labelledby="demo-radio-buttons-group-label"
                      // defaultValue="Yes"
                      name="radio-buttons-group"
                      onChange={(e, value) => {
                        setSendData({ ...sendData, haveLoan: value });
                      }}
                    >
                      <div style={{ display: 'flex' }}>
                        <FormControlLabel value="No" control={<Radio style={{ color: '#595959' }} />} label="No" />
                        <FormControlLabel value="Yes" control={<Radio style={{ color: '#595959' }} />} label="Yes" />
                      </div>
                    </RadioGroup>
                  </Stack>
                </Stack>
                <Stack mt={2}>
                  <Typography>5. In Whose Name Is the Loan ?</Typography>
                  {loanOnWhoseNameError ? (
                          <FormHelperText style={{ color: 'red' }}>{helperText}</FormHelperText>
                        ) : null}{' '}
                  <Stack mt={2}>
                    <RadioGroup
                      aria-labelledby="demo-radio-buttons-group-label"
            
                      name="radio-buttons-group"
                      onChange={(e, value) => {
                        setSendData({ ...sendData, loanOnWhoseName: value });
                      }}
                    >
                      <div style={{ display: 'flex' }}>
                        <FormControlLabel value="No" control={<Radio style={{ color: '#595959' }} />} label="No" />
                        <FormControlLabel value="Yes" control={<Radio style={{ color: '#595959' }} />} label="Yes" />
                      </div>
                    </RadioGroup>
                  </Stack>
                </Stack>
                <Stack mt={2}>
                  <Typography>
                    6. What Are All the Places That You Have Ever Borrowed Money Or Taken Out Loan From ?
                  </Typography>
                  {borrowedmoneyError ? (
                          <FormHelperText style={{ color: 'red' }}>{helperText}</FormHelperText>
                        ) : null}{' '}
                  <Stack mt={2}>
                    <FormGroup>
                      <FormControlLabel
                        value="Government Bank"
                        control={<Checkbox />}
                        label="Goverment Bank"
                        onChange={(event) => handlecheckedata('borrowedmoney', event)}
                      />
                      <FormControlLabel
                        value="Private Bank"
                        control={<Checkbox />}
                        label="Private Bank"
                        onChange={(event) => handlecheckedata('borrowedmoney', event)}
                      />
                      <FormControlLabel
                        value="Loacl MFI"
                        control={<Checkbox />}
                        label="Local MFI"
                        onChange={(event) => handlecheckedata('borrowedmoney', event)}
                      />
                      <FormControlLabel
                        value="SHG Group"
                        control={<Checkbox />}
                        label="SHG Group"
                        onChange={(event) => handlecheckedata('borrowedmoney', event)}
                      />
                      <FormControlLabel
                        value="Money Lender"
                        control={<Checkbox />}
                        label="Money Lender"
                        onChange={(event) => handlecheckedata('borrowedmoney', event)}
                      />
                      <FormControlLabel
                        value="Middleman / Trader"
                        control={<Checkbox />}
                        label="Middleman / Trader"
                        onChange={(event) => handlecheckedata('borrowedmoney', event)}
                      />
                      <FormControlLabel
                        value="Agro-Processors"
                        control={<Checkbox />}
                        label="Agro-Processors"
                        onChange={(event) => handlecheckedata('borrowedmoney', event)}
                      />
                      <FormControlLabel
                        value="Parents"
                        control={<Checkbox />}
                        label="Parents"
                        onChange={(event) => handlecheckedata('borrowedmoney', event)}
                      />
                      <FormControlLabel
                        value="Relatives"
                        control={<Checkbox />}
                        label="Relatives"
                        onChange={(event) => handlecheckedata('borrowedmoney', event)}
                      />
                      <FormControlLabel
                        value="Neighbours"
                        control={<Checkbox />}
                        label="Neighbours"
                        onChange={(event) => handlecheckedata('borrowedmoney', event)}
                      />
                      <FormControlLabel
                        value="Friends"
                        control={<Checkbox />}
                        label="Friends"
                        onChange={(event) => handlecheckedata('borrowedmoney', event)}
                      />
                      <FormControlLabel
                        value="Social Welfare Department"
                        control={<Checkbox />}
                        label="Social Welfare Department"
                        onChange={(event) => handlecheckedata('borrowedmoney', event)}
                      />
                      <FormControlLabel
                        value="Co-operatives"
                        control={<Checkbox />}
                        label="Co-operatives"
                        onChange={(event) => handlecheckedata('borrowedmoney', event)}
                      />
                      <FormControlLabel
                        value="Others"
                        control={<Checkbox />}
                        label="Others"
                        onChange={(event) => handlecheckedata('borrowedmoney', event)}
                      />
                    </FormGroup>
                  </Stack>
                </Stack>
                <Stack mt={2}>
                  <Typography>7. What Is The Reason To Borrow A Loan ?</Typography>
                  {loanborrowError ? (
                          <FormHelperText style={{ color: 'red' }}>{helperText}</FormHelperText>
                        ) : null}{' '}
                  <Stack mt={2}>
                    <FormGroup>
                      <FormControlLabel
                        value="Start/Expand Own Income Generation City"
                        control={<Checkbox />}
                        label="Start/Expand Own Income Generation City"
                        onChange={(event) => handlecheckedata('loanborrow', event)}
                      />
                      <FormControlLabel
                        value="Start/Expand Husband's Or His Family Income Generation Activity"
                        control={<Checkbox />}
                        label="Start/Expand Husband's Or His Family Income Generation Activity"
                        onChange={(event) => handlecheckedata('loanborrow', event)}
                      />
                      <FormControlLabel
                        value="Education (own)"
                        control={<Checkbox />}
                        label="Education (Own)"
                        onChange={(event) => handlecheckedata('loanborrow', event)}
                      />
                      <FormControlLabel
                        value="Pay for Future employment"
                        control={<Checkbox />}
                        label="Pay For Future Employment "
                        onChange={(event) => handlecheckedata('loanborrow', event)}
                      />
                      <FormControlLabel
                        value="Own Marriage"
                        control={<Checkbox />}
                        label="Own Marriage"
                        onChange={(event) => handlecheckedata('loanborrow', event)}
                      />
                      <FormControlLabel
                        value="Brother/Sister's marriage"
                        control={<Checkbox />}
                        label="Brother/Sister's  Marriage"
                        onChange={(event) => handlecheckedata('loanborrow', event)}
                      />
                      <FormControlLabel
                        value="Personal Expenses"
                        control={<Checkbox />}
                        label="Personal Expenses"
                        onChange={(event) => handlecheckedata('loanborrow', event)}
                      />
                      <FormControlLabel
                        value="Household use"
                        control={<Checkbox />}
                        label="Household Use"
                        onChange={(event) => handlecheckedata('loanborrow', event)}
                      />
                      <FormControlLabel
                        value="House Repair"
                        control={<Checkbox />}
                        label="House Repair"
                        onChange={(event) => handlecheckedata('loanborrow', event)}
                      />
                      <FormControlLabel
                        value="Medicine / Hospitalization"
                        control={<Checkbox />}
                        label="Medicine / Hospitalization"
                        onChange={(event) => handlecheckedata('loanborrow', event)}
                      />
                      <FormControlLabel
                        value="Festival"
                        control={<Checkbox />}
                        label="Festival"
                        onChange={(event) => handlecheckedata('loanborrow', event)}
                      />
                      <FormControlLabel
                        value="Others"
                        control={<Checkbox />}
                        label="Others"
                        onChange={(event) => handlecheckedata('loanborrow', event)}
                      />
                    </FormGroup>
                  </Stack>
                </Stack>
                <Stack>
                  <Typography style={{ fontWeight: 700 }} color="primary">
                    Number Of Women With A Financial Plan For Next 1 Year
                  </Typography>
                  {specificGoalForSavingsError ? (
                          <FormHelperText style={{ color: 'red' }}>{helperText}</FormHelperText>
                        ) : null}{' '}
                  <Typography variant="body2">1. Do You Have A Specific Goal That You Are Saving Up For ?</Typography>
                  <Stack mt={2}>
                    <RadioGroup
                      aria-labelledby="demo-radio-buttons-group-label"
                  
                      required
                      name="radio-buttons-group"
                      onChange={(e, value) => {
                        setSendData({ ...sendData, specificGoalForSavings: value });
                      }}
                    >
                      <div style={{ display: 'flex' }}>
                        <FormControlLabel value="No" control={<Radio style={{ color: '#595959' }} />} label="No" />
                        <FormControlLabel value="Yes" control={<Radio style={{ color: '#595959' }} />} label="Yes" />
                      </div>
                    </RadioGroup>
                  </Stack>
                  <Typography>2. How Much Do You Need To Save Up To Achieve This Goal ?</Typography>
                  <Stack mt={3}>
                    <TextField
                      id="Correct Answer"
                      required
                      label="Correct Answer"
                      variant="outlined"
                      onChange={(e) => {
                        setSendData({ ...sendData, howMuchSaveToAchieve: e.target.value });
                      }}
                    />
                  </Stack>
                </Stack>
                <Stack>
                  <Typography style={{ fontWeight: 700 }} color="primary">
                    Number Of Women Who Actively Participate In HouseHold Financial Decison Making{' '}
                  </Typography>
                </Stack>
                <Stack>
                  <Typography variant="body2">
                    {' '}
                    1. Who Takes the Majority of Decisons From the Following Household?
                  </Typography>
                  {educationError ? (
                          <FormHelperText style={{ color: 'red' }}>{helperText}</FormHelperText>
                        ) : null}{' '}
                </Stack>
                <Stack>
                  <Typography mt={2}> Education</Typography>
                  <Stack mt={2}>
                    <InputLabel variant="standard" id="demo-simple-select-standard-label">
                      Answer
                    </InputLabel>
                    <Select
                      variant="standard"
                      color="common"
                      fullWidth
                      labelId="demo-simple-select-standard-label"
                      id="demo-simple-select-standard"
                      value={education}
                      onChange={handleducation}
                    >
                      <MenuItem value="" style={{ backgroundColor: 'gray' }}>
                        <em>Select Answer</em>
                      </MenuItem>
                      <MenuItem value="Husband">Husband</MenuItem>
                      <MenuItem value="I">I</MenuItem>
                      <MenuItem value="Both">Both</MenuItem>
                    </Select>
                  </Stack>
                  <Typography mt={2}> Access To HealthCare </Typography>
                  {accessToHealtcareError ? (
                          <FormHelperText style={{ color: 'red' }}>{helperText}</FormHelperText>
                        ) : null}{' '}
                  <Stack mt={2}>
                    <InputLabel variant="standard" color="common" id="demo-simple-select-standard-label">
                      Answer
                    </InputLabel>
                    <Select
                      variant="standard"
                      color="common"
                      fullWidth
                      labelId="demo-simple-select-standard-label"
                      id="demo-simple-select-standard"
                      value={healthcareaccess}
                      onChange={handlehealthcareaccess}
                    >
                      <MenuItem value="" style={{ backgroundColor: 'gray' }}>
                        <em>Select Answer</em>
                      </MenuItem>
                      <MenuItem value="Husband">Husband</MenuItem>
                      <MenuItem value="I">I</MenuItem>
                      <MenuItem value="Both">Both</MenuItem>
                    </Select>
                  </Stack>
                  <Typography mt={2}> Access To Credit </Typography>
                  {creditaccessError ? (
                          <FormHelperText style={{ color: 'red' }}>{helperText}</FormHelperText>
                        ) : null}{' '}
                  <Stack mt={2}>
                    <InputLabel variant="standard" color="common" id="demo-simple-select-standard-label">
                      Answer
                    </InputLabel>
                    <Select
                      variant="standard"
                      color="common"
                      fullWidth
                      labelId="demo-simple-select-standard-label"
                      id="demo-simple-select-standard"
                      value={creditaccess}
                      onChange={handlecreditaccess}
                    >
                      <MenuItem value="" style={{ backgroundColor: 'gray' }}>
                        <em>Select Answer</em>
                      </MenuItem>
                      <MenuItem value="Husband">Husband</MenuItem>
                      <MenuItem value="I">I</MenuItem>
                      <MenuItem value="Both">Both</MenuItem>
                    </Select>
                  </Stack>
                  <Typography mt={2}> Saving Money </Typography>
                  {savemoneyError ? (
                          <FormHelperText style={{ color: 'red' }}>{helperText}</FormHelperText>
                        ) : null}{' '}
                  <Stack mt={2}>
                    <InputLabel variant="standard" color="common" id="demo-simple-select-standard-label">
                      Answer
                    </InputLabel>
                    <Select
                      variant="standard"
                      color="common"
                      fullWidth
                      labelId="demo-simple-select-standard-label"
                      id="demo-simple-select-standard"
                      value={savemoney}
                      onChange={handlesavemoney}
                    >
                      <MenuItem value="" style={{ backgroundColor: 'gray' }}>
                        <em>Select Answer</em>
                      </MenuItem>
                      <MenuItem value="Husband">Husband</MenuItem>
                      <MenuItem value="I">I</MenuItem>
                      <MenuItem value="Both">Both</MenuItem>
                    </Select>
                  </Stack>
                  <Typography mt={2}> Asset Purchase </Typography>
                  {purchaseError ? (
                          <FormHelperText style={{ color: 'red' }}>{helperText}</FormHelperText>
                        ) : null}{' '}
                  <Stack mt={2}>
                    <InputLabel variant="standard" color="common" id="demo-simple-select-standard-label">
                      Answer
                    </InputLabel>
                    <Select
                      variant="standard"
                      color="common"
                      fullWidth
                      labelId="demo-simple-select-standard-label"
                      id="demo-simple-select-standard"
                      value={purchase}
                      onChange={handlepurchase}
                    >
                      <MenuItem value="" style={{ backgroundColor: 'gray' }}>
                        <em>Select Answer</em>
                      </MenuItem>
                      <MenuItem value="Husband">Husband</MenuItem>
                      <MenuItem value="I">I</MenuItem>
                      <MenuItem value="Both">Both</MenuItem>
                    </Select>
                  </Stack>
                  <Typography mt={2}> Day To Day Expenditure </Typography>
                  {expenditureError ? (
                          <FormHelperText style={{ color: 'red' }}>{helperText}</FormHelperText>
                        ) : null}{' '}
                  <Stack mt={2}>
                    <InputLabel variant="standard" color="common" id="demo-simple-select-standard-label">
                      Answer
                    </InputLabel>
                    <Select
                      variant="standard"
                      color="common"
                      fullWidth
                      labelId="demo-simple-select-standard-label"
                      id="demo-simple-select-standard"
                      value={expenditure}
                      onChange={handlexpenditure}
                    >
                      <MenuItem value="" style={{ backgroundColor: 'gray' }}>
                        <em>Select Answer</em>
                      </MenuItem>
                      <MenuItem value="Husband">Husband</MenuItem>
                      <MenuItem value="I">I</MenuItem>
                      <MenuItem value="Both">Both</MenuItem>
                    </Select>
                  </Stack>
                  <Typography mt={2}> Livelihood </Typography>
                  {livelihoodvalueError ? (
                          <FormHelperText style={{ color: 'red' }}>{helperText}</FormHelperText>
                        ) : null}{' '}
                  <Stack mt={2}>
                    <InputLabel variant="standard" color="common" id="demo-simple-select-standard-label">
                      Answer
                    </InputLabel>
                    <Select
                      variant="standard"
                      color="common"
                      fullWidth
                      labelId="demo-simple-select-standard-label"
                      id="demo-simple-select-standard"
                      value={livelihoodvalue}
                      onChange={handlelivelihood}
                    >
                      <MenuItem value="" style={{ backgroundColor: 'gray' }}>
                        <em>Select Answer</em>
                      </MenuItem>
                      <MenuItem value="Husband">Husband</MenuItem>
                      <MenuItem value="I">I</MenuItem>
                      <MenuItem value="Both">Both</MenuItem>
                    </Select>
                  </Stack>
                </Stack>
                <Stack>
                  <Typography style={{ fontWeight: 700 }} color="primary">
                    Number Of Women Who Finds Solution In Beehive Sessions
                  </Typography>
                  <Typography variant="body2">1. Do You See yourself as a part of a community?</Typography>
                  {partOfCollectiveError ? (
                          <FormHelperText style={{ color: 'red' }}>{helperText}</FormHelperText>
                        ) : null}{' '}
                  <Stack mt={2}>
                    <RadioGroup
                      aria-labelledby="demo-radio-buttons-group-label"
                   
                      name="radio-buttons-group"
                      onChange={(e, value) => {
                        setSendData({ ...sendData, partOfCollective: value });
                      }}
                    >
                      <div style={{ display: 'flex' }}>
                        <FormControlLabel value="No" control={<Radio style={{ color: '#595959' }} />} label="No" />
                        <FormControlLabel value="Yes" control={<Radio style={{ color: '#595959' }} />} label="Yes" />
                      </div>
                    </RadioGroup>
                  </Stack>
                  &nbsp;
                  <hr />
                  <Stack mt={2}>
                    <Typography style={{ fontWeight: 700 }} color="primary">
                      Number of women who believe that she has a social capital in the community
                    </Typography>
                    <Typography>
                      {' '}
                      1. It Is Important For Woman To Come Together And Share Their Everyday Challenges And Problems{' '}
                    </Typography>
                    {shareproblemsError ? (
                          <FormHelperText style={{ color: 'red' }}>{helperText}</FormHelperText>
                        ) : null}{' '}
                    <Stack mt={2}>
                      <InputLabel variant="standard" color="common" id="demo-simple-select-standard-label">
                        Answer
                      </InputLabel>
                      <Select
                        variant="standard"
                        color="common"
                        fullWidth
                        labelId="demo-simple-select-standard-label"
                        id="demo-simple-select-standard"
                        value={shareproblems}
                        onChange={handleshareproblems}
                      >
                        <MenuItem value="" style={{ backgroundColor: 'gray' }}>
                          <em>Select Answer</em>
                        </MenuItem>
                        <MenuItem value="Strongly Agree">Strongly Agree</MenuItem>
                        <MenuItem value="Agree">Agree</MenuItem>
                        <MenuItem value="Disagree">Disagree</MenuItem>
                        <MenuItem value="Strongly_Disagree">Strongly Disagree</MenuItem>
                      </Select>
                    </Stack>
                  </Stack>
                  <Typography mt={2}>
                    2. I Have A Woman In My Community Whom I Share My Learnings And Problems , Solution With{' '}
                  </Typography>
                  {sharelearningError ? (
                          <FormHelperText style={{ color: 'red' }}>{helperText}</FormHelperText>
                        ) : null}{' '}
                  <Stack mt={2}>
                    <InputLabel variant="standard" color="common" id="demo-simple-select-standard-label">
                      Answer
                    </InputLabel>
                    <Select
                      variant="standard"
                      color="common"
                      fullWidth
                      labelId="demo-simple-select-standard-label"
                      id="demo-simple-select-standard"
                      value={sharelearning}
                      onChange={handlesharelearning}
                    >
                      <MenuItem value="" style={{ backgroundColor: 'gray' }}>
                        <em>Select Answer</em>
                      </MenuItem>
                      <MenuItem value="Strongly Agree">Strongly Agree</MenuItem>
                      <MenuItem value="Agree">Agree</MenuItem>
                      <MenuItem value="Disagree">Disagree</MenuItem>
                      <MenuItem value="Strongly_Disagree">Strongly Disagree</MenuItem>
                    </Select>
                  </Stack>
                </Stack>
                <Stack>
                  <Typography mt={2} style={{ fontWeight: 700 }} color="primary">
                    Other Requirements
                  </Typography>
                  <Typography mt={2} variant="body2">
                    Are You Maintaining the household Books Of Accounts
                    {household_books_accountsError ? (
                          <FormHelperText style={{ color: 'red' }}>{helperText}</FormHelperText>
                        ) : null}{' '}
                  </Typography>
                  <Stack mt={2}>
                    <RadioGroup
                      aria-labelledby="demo-radio-buttons-group-label"
                  
                      name="radio-buttons-group"
                      onChange={(e, value) => {
                        setSendData({ ...sendData, household_books_accounts: value });
                      }}
                    >
                      <div style={{ display: 'flex' }}>
                        <FormControlLabel value="No" control={<Radio style={{ color: '#595959' }} />} label="No" />
                        <FormControlLabel value="Yes" control={<Radio style={{ color: '#595959' }} />} label="Yes" />
                      </div>
                    </RadioGroup>
                  </Stack>
                  <Typography mt={2} variant="body2">
                    Are You Maintaining the Books Of Accounts For Self Enterprise
                  </Typography>
                  {accounts_for_Self_EnterprisesError ? (
                          <FormHelperText style={{ color: 'red' }}>{helperText}</FormHelperText>
                        ) : null}{' '}
                  <Stack mt={2} mb={5}>
                    
                    <RadioGroup
                      aria-labelledby="demo-radio-buttons-group-label"
                    
                      name="radio-buttons-group"
                      onChange={(e, value) => {
                        setSendData({ ...sendData, accounts_for_Self_Enterprises: value });
                      }}
                    >
                      <div style={{ display: 'flex' }}>
                        <FormControlLabel value="No" control={<Radio style={{ color: '#595959' }} />} label="No" />
                        <FormControlLabel value="Yes" control={<Radio style={{ color: '#595959' }} />} label="Yes" />
                      </div>
                    </RadioGroup>
                  </Stack>
                </Stack>
              </CardContent> */}
            </Card>
          </Grid>
        </form>
      </Dialog>
    </>
  );
}
