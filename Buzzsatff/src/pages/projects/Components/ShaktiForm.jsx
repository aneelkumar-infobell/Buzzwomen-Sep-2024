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

  const label = { inputProps: { 'aria-label': 'Checkbox demo' } };
  const [checked, setChecked] = React.useState({
    loanborrow: [],
    borrowedmoney: [],
  });
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
    implementationPlan: '',
    medical: '',
    goodQuality: '',
    socialWelfareDepartments: '',
    personalExpenses: '',
    accessToHealtcare: '',
    moneyLender: '',
    accessToCredit: '',
    household_books_accounts: '',
    educationReason: '',
    saveRegularly: '',
    middleman: '',
    specificGoalForSavings: '',
    solutionToProblems: '',
    others: '',
    familyIncomeGeneration: '',
    goal: '',
    privateBank: '',
    householdUse: '',
    personOfWorth: '',
    festival: '',
    reasonOthersToBorrowLoan: '',
    relatives: '',
    ownAsset: '',
    friends: '',
    separateFinancialAsset: '',
    NGO: '',
    partOfCollective: '',
    whereSaveMoney: '',
    annualLoanInterest: '',
    haveLoan: '',
    parents: '',
    importantToShareTheirProb: '',
    account_household: '',
    profitForSarees: '',
    brotherMarriage: '',
    spendMoney: '',
    coorperatives: '',
    ownIncomeGeneration: '',
    localMFI: '',
    frequencyOfSaving: '',
    loanOnWhoseName: '',
    haveGoal: '',
    pathwayToGoal: '',
    ownMarriage: '',
    agroProcessors: '',
    howMuchSaveToAchieve: '',
    account_business: '',
    neighbours: '',
    educationDecision: '',
    noChoiceForSolution: '',
    livelihood: '',
    futureEmployment: '',
    houseRepair: '',
    shareLearningWithCommunity: '',
    disheartenedToProblems: '',
    amFailure: '',
    governmentBank: '',
    dayTodayExpenditure: '',
    accounts_for_Self_Enterprises: '',
    savingMoney: '',
    assetPurchase: '',
    moneyborrowed: '',
  });
  const shakthiformdata = async () => {

    var data ={}
    data = JSON.stringify({
    participantId: itm?.participant_id,
    implementationPlan: plan,
    goodQuality: qualitiesgood,
    accessToHealtcare: healthcareaccess,
    accessToCredit: creditaccess,
    household_books_accounts: sendData?.household_books_accounts,
    saveRegularly: sendData?.saveRegularly,
    middleman: null,
    specificGoalForSavings: sendData?.specificGoalForSavings,
    solutionToProblems: problemsolutions,
    others: null,
    familyIncomeGeneration: "1",
    goal: "100",
    householdUse: null,
    personOfWorth: worthperson,
    reasonOthersToBorrowLoan: checked['loanborrow'],
    moneyborrowed: checked['borrowedmoney'],
    ownAsset: sendData?.ownAsset,
    separateFinancialAsset: sendData?.separateFinancialAsset,
    partOfCollective: sendData?.partOfCollective,
    whereSaveMoney: moneysave,
    annualLoanInterest: sendData?.annualLoanInterest,
    haveLoan: sendData?.haveLoan,
    importantToShareTheirProb: shareproblems,
    profitForSarees: sendData?.profitForSarees,
    spendMoney: sendData?.spendMoney,
    frequencyOfSaving: savingfrequency,
    loanOnWhoseName: sendData?.loanOnWhoseName,
    haveGoal: sendData?.haveGoal,
    pathwayToGoal: sendData?.pathwayToGoal,
    howMuchSaveToAchieve: sendData?.howMuchSaveToAchieve,
    educationDecision: education,
    noChoiceForSolution: solution,
    livelihood: livelihoodvalue,
    shareLearningWithCommunity: sharelearning,
    disheartenedToProblems: problemsdisheartened,
    amFailure: failureperson,
    dayTodayExpenditure: expenditure,
    accounts_for_Self_Enterprises: sendData?.accounts_for_Self_Enterprises,
    savingMoney: savemoney,
    assetPurchase: purchase,
    });

   if(isOnline() && networkAccess()){
    if(plan == ''){
      SetImplementationPlanError(true);
      setHelperText('please select the option')
    }
    if(qualitiesgood == ''){
      SetQualitiesgoodError(true);
      setHelperText('please select the option')
    }
    if(healthcareaccess == ''){
      SetAccessToHealtcareError(true);
      setHelperText('please select the option')
    }
    if(creditaccess == ''){
      SetCreditaccessError(true);
      setHelperText('please select the option')
    }
    if(sendData?.household_books_accounts == ''){
      SetHousehold_books_accountsError(true);
      setHelperText('please select the option')
    }
    if(sendData?.saveRegularly == ''){
      SetsaveRegularlyError(true);
      setHelperText('please select the option')
    }
    if(sendData?.specificGoalForSavings == ''){
      SetspecificGoalForSavingsError(true);
      setHelperText('please select the option')
    }
    if(problemsolutions == ''){
      SetproblemsolutionsError(true);
      setHelperText('please select the option')
    }
    if(worthperson == ''){
      SetworthpersonError(true);
      setHelperText('please select the option')
    }
    if(sendData?.ownAsset == ''){
      SetownAssetError(true);
      setHelperText('please select the option')
    }
    if(sendData?.separateFinancialAsset == ''){
      SetseparateFinancialAssetError(true);
      setHelperText('please select the option')
    }
    if(sendData?.partOfCollective == ''){
      SetpartOfCollectiveError(true);
      setHelperText('please select the option')
    }
    if(moneysave == ''){
      SetmoneysaveError(true);
      setHelperText('please select the option')
    }
    if(sendData?.haveLoan == ''){
      SethaveLoanError(true);
      setHelperText('please select the option')
    }
    if(shareproblems == ''){
      SetshareproblemsError(true);
      setHelperText('please select the option')
    }
    if(sendData?.spendMoney == ''){
      SetspendMoneyError(true);
      setHelperText('please select the option')
    }
    if(savingfrequency == ''){
      SetsavingfrequencyError(true);
      setHelperText('please select the option')
    }
    if(sendData?.loanOnWhoseName == ''){
      SetloanOnWhoseNameError(true);
      setHelperText('please select the option')
    }
    if(sendData?.haveGoal == ''){
      SethaveGoalError(true);
      setHelperText('please select the option')
    }
    if(sendData?.pathwayToGoal == ''){
      SetpathwayToGoalError(true);
      setHelperText('please select the option')
    }
    if(education == ''){
      SeteducationError(true);
      setHelperText('please select the option')
    }
    if(solution == ''){
      SetsolutionError(true);
      setHelperText('please select the option')
    }
    if(livelihoodvalue == ''){
      SetlivelihoodvalueError(true);
      setHelperText('please select the option')
    }
    if(sharelearning == ''){
      SetsharelearningError(true);
      setHelperText('please select the option')
    }
    if(problemsdisheartened == ''){
      SetproblemsdisheartenedError(true);
      setHelperText('please select the option')
    }
    if(failureperson == ''){
      SetfailurepersonError(true);
      setHelperText('please select the option')
    }
    if(expenditure == ''){
      SetexpenditureError(true);
      setHelperText('please select the option')
    }
    if(sendData?.accounts_for_Self_Enterprises == ''){
      Setaccounts_for_Self_EnterprisesError(true);
      setHelperText('please select the option')
    }
    if(savemoney == ''){
      SetsavemoneyError(true);
      setHelperText('please select the option')
    }
    if(purchase == ''){
      SetpurchaseError(true);
      setHelperText('please select the option')
    }
    if(checked['loanborrow'] == 0){
      SetloanborrowError(true);
      setHelperText('please select the option')
    }
    if(checked['borrowedmoney'] == 0){
      SetborrowedmoneyError(true);
      setHelperText('please select the option')
    }
    if(
       plan != '' && 
       healthcareaccess != '' && 
       creditaccess != '' && 
       sendData?.household_books_accounts != '' && 
       sendData?.saveRegularly != '' && 
       sendData?.specificGoalForSavings!= '' && 
       problemsolutions!= '' && 
       worthperson!= '' && 
       moneysave!= '' && 
       sendData?.haveLoan!= '' && 
       sendData?.separateFinancialAsset!= '' && 
       sendData?.partOfCollective!= '' && 
       sendData?.ownAsset!= '' && 
       shareproblems!= '' && 
       sendData?.spendMoney!= '' && 
       savingfrequency!= '' && 
       sendData?.loanOnWhoseName!= '' && 
       sendData?.haveGoal!= '' && 
       sendData?.pathwayToGoal!= '' && 
       education!= '' && 
       solution!= '' && 
       livelihoodvalue!= '' && 
       sharelearning!= '' && 
       failureperson!= '' && 
       problemsdisheartened!= '' && 
       expenditure!= '' && 
       sendData?.accounts_for_Self_Enterprises!= '' && 
       savemoney!= '' && 
       purchase!= '' && 
       checked['loanborrow']!= 0 && 
       checked['borrowedmoney']!= 0 && 
    qualitiesgood!= ''){
    if(localStorage.getItem('shaktiform')){
      data = setshaktidata(saveDataLocally('shaktiform',JSON.parse(data)))
      setshaktidata(data);
    }

   
   else{
    var data = JSON.stringify({
      participantId: itm?.participant_id,
      implementationPlan: plan,
      goodQuality: qualitiesgood,
      accessToHealtcare: healthcareaccess,
      accessToCredit: creditaccess,
      household_books_accounts: sendData?.household_books_accounts,
      saveRegularly: sendData?.saveRegularly,
      middleman: null,
      specificGoalForSavings: sendData?.specificGoalForSavings,
      solutionToProblems: problemsolutions,
      others: null,
      familyIncomeGeneration: "1",
      goal: "100",
      householdUse: null,
      personOfWorth: worthperson,
      reasonOthersToBorrowLoan: checked['loanborrow'],
      moneyborrowed: checked['borrowedmoney'],
      ownAsset: sendData?.ownAsset,
      separateFinancialAsset: sendData?.separateFinancialAsset,
      partOfCollective: sendData?.partOfCollective,
      whereSaveMoney: moneysave,
      annualLoanInterest: sendData?.annualLoanInterest,
      haveLoan: sendData?.haveLoan,
      importantToShareTheirProb: shareproblems,
      profitForSarees: sendData?.profitForSarees,
      spendMoney: sendData?.spendMoney,
      frequencyOfSaving: savingfrequency,
      loanOnWhoseName: sendData?.loanOnWhoseName,
      haveGoal: sendData?.haveGoal,
      pathwayToGoal: sendData?.pathwayToGoal,
      howMuchSaveToAchieve: sendData?.howMuchSaveToAchieve,
      educationDecision: education,
      noChoiceForSolution: solution,
      livelihood: livelihoodvalue,
      shareLearningWithCommunity: sharelearning,
      disheartenedToProblems: problemsdisheartened,
      amFailure: failureperson,
      dayTodayExpenditure: expenditure,
      accounts_for_Self_Enterprises: sendData?.accounts_for_Self_Enterprises,
      savingMoney: savemoney,
      assetPurchase: purchase,
    });
   }
    var config = {
      method: 'post',
      url: baseURL + 'addSurveyData',
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
    if(plan == ''){
      SetImplementationPlanError(true);
      setHelperText('please select the option')
    }
    if(qualitiesgood == ''){
      SetQualitiesgoodError(true);
      setHelperText('please select the option')
    }
    if(healthcareaccess == ''){
      SetAccessToHealtcareError(true);
      setHelperText('please select the option')
    }
    if(creditaccess == ''){
      SetCreditaccessError(true);
      setHelperText('please select the option')
    }
    if(sendData?.household_books_accounts == ''){
      SetHousehold_books_accountsError(true);
      setHelperText('please select the option')
    }
    if(sendData?.saveRegularly == ''){
      SetsaveRegularlyError(true);
      setHelperText('please select the option')
    }
    if(sendData?.specificGoalForSavings == ''){
      SetspecificGoalForSavingsError(true);
      setHelperText('please select the option')
    }
    if(problemsolutions == ''){
      SetproblemsolutionsError(true);
      setHelperText('please select the option')
    }
    if(worthperson == ''){
      SetworthpersonError(true);
      setHelperText('please select the option')
    }
    if(sendData?.ownAsset == ''){
      SetownAssetError(true);
      setHelperText('please select the option')
    }
    if(sendData?.separateFinancialAsset == ''){
      SetseparateFinancialAssetError(true);
      setHelperText('please select the option')
    }
    if(sendData?.partOfCollective == ''){
      SetpartOfCollectiveError(true);
      setHelperText('please select the option')
    }
    if(moneysave == ''){
      SetmoneysaveError(true);
      setHelperText('please select the option')
    }
    if(sendData?.haveLoan == ''){
      SethaveLoanError(true);
      setHelperText('please select the option')
    }
    if(shareproblems == ''){
      SetshareproblemsError(true);
      setHelperText('please select the option')
    }
    if(sendData?.spendMoney == ''){
      SetspendMoneyError(true);
      setHelperText('please select the option')
    }
    if(savingfrequency == ''){
      SetsavingfrequencyError(true);
      setHelperText('please select the option')
    }
    if(sendData?.loanOnWhoseName == ''){
      SetloanOnWhoseNameError(true);
      setHelperText('please select the option')
    }
    if(sendData?.haveGoal == ''){
      SethaveGoalError(true);
      setHelperText('please select the option')
    }
    if(sendData?.pathwayToGoal == ''){
      SetpathwayToGoalError(true);
      setHelperText('please select the option')
    }
    if(education == ''){
      SeteducationError(true);
      setHelperText('please select the option')
    }
    if(solution == ''){
      SetsolutionError(true);
      setHelperText('please select the option')
    }
    if(livelihoodvalue == ''){
      SetlivelihoodvalueError(true);
      setHelperText('please select the option')
    }
    if(sharelearning == ''){
      SetsharelearningError(true);
      setHelperText('please select the option')
    }
    if(problemsdisheartened == ''){
      SetproblemsdisheartenedError(true);
      setHelperText('please select the option')
    }
    if(failureperson == ''){
      SetfailurepersonError(true);
      setHelperText('please select the option')
    }
    if(expenditure == ''){
      SetexpenditureError(true);
      setHelperText('please select the option')
    }
    if(sendData?.accounts_for_Self_Enterprises == ''){
      Setaccounts_for_Self_EnterprisesError(true);
      setHelperText('please select the option')
    }
    if(savemoney == ''){
      SetsavemoneyError(true);
      setHelperText('please select the option')
    }
    if(purchase == ''){
      SetpurchaseError(true);
      setHelperText('please select the option')
    }
    if(checked['loanborrow'] == 0){
      SetloanborrowError(true);
      setHelperText('please select the option')
    }
    if(checked['borrowedmoney'] == 0){
      SetborrowedmoneyError(true);
      setHelperText('please select the option')
    }
    if(
       plan != '' && 
       healthcareaccess != '' && 
       creditaccess != '' && 
       sendData?.household_books_accounts != '' && 
       sendData?.saveRegularly != '' && 
       sendData?.specificGoalForSavings!= '' && 
       problemsolutions!= '' && 
       worthperson!= '' && 
       moneysave!= '' && 
       sendData?.haveLoan!= '' && 
       sendData?.separateFinancialAsset!= '' && 
       sendData?.partOfCollective!= '' && 
       sendData?.ownAsset!= '' && 
       shareproblems!= '' && 
       sendData?.spendMoney!= '' && 
       savingfrequency!= '' && 
       sendData?.loanOnWhoseName!= '' && 
       sendData?.haveGoal!= '' && 
       sendData?.pathwayToGoal!= '' && 
       education!= '' && 
       solution!= '' && 
       livelihoodvalue!= '' && 
       sharelearning!= '' && 
       failureperson!= '' && 
       problemsdisheartened!= '' && 
       expenditure!= '' && 
       sendData?.accounts_for_Self_Enterprises!= '' && 
       savemoney!= '' && 
       purchase!= '' && 
       checked['loanborrow']!= 0 && 
       checked['borrowedmoney']!= 0 && 
    qualitiesgood!= ''){
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
            <Card >
              <CardContent>
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
                {/* <Stack mt={2} mb={2}>
                <TextField id="Correct Answer" label="Correct Answer" variant="outlined" />
              </Stack> */}
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
                      // defaultValue="Yes"
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
                      // defaultValue="Yes"
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
                      // defaultValue="Yes"
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
                      // defaultValue="Yes"
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
                      // defaultValue="Yes"
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
                      // defaultValue="Yes"
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
                      // defaultValue="Yes"
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
                    {/* <div>
                    <Radio
                      checked={selectedValue === 'Yes'}
                      onChange={handleChange}
                      value="Yes"
                      name="radio-buttons"
                      label="Yes"
                      inputProps={{ 'aria-label': 'Yes' }}
                    />
                    <Radio
                      checked={selectedValue === 'No'}
                      onChange={handleChange}
                      value="No"
                      name="radio-buttons"
                      label="No"
                      inputProps={{ 'aria-label': 'No' }}
                    />
                  </div> */}
                    <RadioGroup
                      aria-labelledby="demo-radio-buttons-group-label"
                      // defaultValue="Yes"
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
              </CardContent>
            </Card>
          </Grid>
        </form>
      </Dialog>
    </>
  );
}
