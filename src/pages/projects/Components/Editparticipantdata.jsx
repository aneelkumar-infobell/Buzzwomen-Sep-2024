import { useState, useEffect } from 'react';
import React from 'react'
import { Button, Card, CardActions, CardContent, Stack, TextField, Radio, DialogContent, DialogContentText, FormControlLabel, FormHelperText, FormGroup, Checkbox } from '@mui/material';
import Dialog from '@mui/material/Dialog';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import CloseIcon from '@mui/icons-material/Close';
import Slide from '@mui/material/Slide';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DateTimePicker } from '@mui/x-date-pickers/DateTimePicker';
import axios from 'axios';
import moment from 'moment';
import Select from '@mui/material/Select';
import FormControl from '@mui/material/FormControl';
import Switch from '@mui/material/Switch';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import RadioGroup from '@mui/material/RadioGroup';
import { baseURL } from 'src/utils/api';
import { useAuth } from 'src/AuthContext';

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

const label = { inputProps: { 'aria-label': 'Switch demo' } };
export default function EditParticipantdata({ editSession, setEditsession, Trainingdata, changeState, participantdata, cvalue }) {
  const { apikey } = useAuth();
 const participantId = participantdata?.id ? parseInt(participantdata?.id, 10) : null; // Ensure participantId is valid or null
console.log(participantId); // This will be undefined if participantdata is undefined
  console.log(participantId);
  console.log( changeState,"participantdata" , participantdata,  "participantdata")
  const [openFilter, setOpenFilter] = useState(false);
  const [showDate, setShowDate] = useState(false)


  const [sendData, setSendData] = useState(
    {
    
      "id": participantId,
  "financial_goals_set_c":"",
      "migration_profile": "",
      "household_migration_last_year": "",
      "migrant_sends_remittance": "",
      "financial_literacy": "",
      "liabilities_or_assets": [],
      "bookkeeping_entry": [],
      "loan_type": [],
      "annual_interest_rate": null,
      "interest_payment_due": null,
      "profit_made": null,
      "personal_account": "",
      "has_personal_account": "",
      "bank_account_usage_frequency": [],
      "money_decision_maker": [],
      "monthly_expense_plan": "",
      "monthly_expense_amount": null,
      "maintain_expense_record": "",
      "individual_savings": null,
      "monthly_savings_individual": null,
      "annual_savings_household": null,
      "confident_spend_savings": "",
      "loans": "",
      "loan_taken_by": [],
      "amount_borrowed": null,
      "purpose_of_loan": [],
      "source": [],
      "rate_of_interest": null,
      "expenses_exceed_income_last_year": "",
      "income_loss_duration": [],
      "goals": "",
      "financial_goals_set": "",
      "short_term_goal": "",
      "long_term_goal": "",
      "enterprise": "",
      "family_business": "",
      "want_to_start_enterprise": "",
      "enterprise_type": [],
      "num_employees_paid": null,
      "individual_involvement_nature": [],
      "enterprise_monthly_income": null,
      "enterprise_is_profitable": "",
      "monthly_profit": null,
      "decision_making": "",
      "decision_say": [],
      "menstrual_hygiene_env": "",
      "env_friendly_practices": [],
      "menstrual_product_used": [],
      "menstrual_disposal_method": [],
      "cooking_fuel_type": [],
      // "womens_occupation": "",
      // "monthly_women_income": 5000.00,
      // "source_of_this_income": "",
      // "secondary_occupation_of_the_household": "",
      // "primary_occupation_of_household": ""
      "withdraw_savings_a": "",
      "reduce_expenses_a": "",
      "asset_sale_a": "",
      "overtime_hours_a": "",
      "missed_payments_a": "",
      "borrowed_from_others_a": "",
      "borrowed_from_lender_a": "",
      "borrowed_from_shg_a": "",
      "pawned_item_a": "",
      "bank_loan_a": "",
      "children_education_b": "",
      "health_services_access_b": "",
      "taking_credit_b": "",
      "saving_money_b": "",
      "asset_purchase_b": "",
      "daily_expenditure_b": "",
      "operational_management_b": "",
      "input_procuring_b": "",
      "selling_produce_b": "",
      "gov_scheme_benefit_b": "",
      "financial_goals_set_c": "",
      "collaborate_with_workers_c": "",
      "daily_affairs_management_c": "",
      "financial_decision_maker_c": "",
      "daily_accounts_book_c": ""
  
  });

  const [helperText, setHelperText] = useState('');
  const [open, setOpen] = React.useState(false);
  const [date, setDate] = useState(new Date());
  const [occupationdata, setOccupationdata] = React.useState('');
  const [HusbandOccupationError, setHusbandOccupationError] = useState(false);
  const [OccupationError, setOccupationError] = useState(false);
  const [BankError, setBankError] = useState(false);
  const assestsOwned = [
    { id: 1, name: "Property owned (Asset) / ಆಸ್ತಿ ಮಾಲೀಕತ್ವ (ಆಸ್ತಿ) " },
    { id: 2, name: "Bank Loan (Liability) /  ಬ್ಯಾಂಕ್ ಸಾಲ (ಬಾಧ್ಯತೆ) " },
    { id: 3, name: "Gold (Asset) / ಚಿನ್ನ (ಆಸ್ತಿ)" },
    { id: 4, name: "Mortgage (Liability) /  ಅಡಮಾನ (ಬಾಧ್ಯತೆ) " },
    { id: 5, name: "Vehicle 2 wheeler / ವಾಹನ 2 ಚಕ್ರ " },
    { id: 6, name: "4 wheeler (Asset) / 4 ಚಕ್ರ ವಾಹನ (ಆಸ್ತಿ)" },

  ]
  const newBookkeepingEntries = [
    { id: 1, name: "Lending Rs. 500 for a neighbour for one day / ಸಾಲ ನೀಡುವುದು ರೂ. ಒಂದು ದಿನಕ್ಕೆ ನೆರೆಯವರಿಗೆ 500" },
    { id: 2, name: "Profit from the enterprise / ಉದ್ಯಮದಿಂದ ಲಾಭ" },
    { id: 3, name: "Spending Rs. 50 for transport / ಖರ್ಚು ರೂ. ಸಾರಿಗೆಗಾಗಿ 50" },
    { id: 4, name: "Loan taken from bank / ಬ್ಯಾಂಕ್‌ನಿಂದ ಪಡೆದ ಸಾಲ" },
    { id: 5, name: "Money withdrawn from bank, ATM and kept at home / ಬ್ಯಾಂಕ್, ಎಟಿಎಂನಿಂದ ಹಿಂತೆಗೆದುಕೊಂಡ ಹಣ ಮತ್ತು ಮನೆಯಲ್ಲಿ ಇಡಲಾಗಿದೆ" },
    { id: 6, name: "None / ಯಾವುದು ಇಲ್ಲ" }
  ];
  const purposesForMoney = [
    { id: 1, name: "To buy an asset (Productive) / ಆಸ್ತಿಯನ್ನು ಖರೀದಿಸಲು (ಉತ್ಪಾದಕ)" },
    { id: 2, name: "To start a business (Productive) / ವ್ಯವಹಾರವನ್ನು ಪ್ರಾರಂಭಿಸಲು (ಉತ್ಪಾದಕ)" },
    { id: 3, name: "To buy a new saree for a wedding (Consumptive) / ಮದುವೆಗೆ ಹೊಸ ಸೀರೆ ಖರೀದಿಸಲು (ಉಪಯೋಗ)" },
    { id: 4, name: "For festival celebrations (Consumptive) / ಹಬ್ಬದ ಆಚರಣೆಗಳಿಗಾಗಿ (ಉಪಯೋಗ)" },
    { id: 5, name: "Children's education (Productive) / ಮಕ್ಕಳ ಶಿಕ್ಷಣ (ಉತ್ಪಾದಕ)" },
    { id: 6, name: "For bigger TV (Consumptive) / ದೊಡ್ಡ ಟಿವಿಗಾಗಿ (ಉಪಯೋಗ)" },
    { id: 7, name: "For a fancy phone (Consumptive) / ಅಲಂಕಾರಿಕ ಫೋನ್‌ಗಾಗಿ (ಸೇವಕ)" }
  ];
  const timeFrequencies = [
    { id: 1, name: "Monthly / ಮಾಸಿಕ" },
    { id: 2, name: "Once in two months / ಎರಡು ತಿಂಗಳಿಗೊಮ್ಮೆ" },
    { id: 3, name: "Once in 6 months / 6 ತಿಂಗಳಿಗೊಮ್ಮೆ" },
    { id: 4, name: "Once in a year / ವರ್ಷಕ್ಕೊಮ್ಮೆ" }
  ];
  const personalRelationships = [
    { id: 1, name: "I am / ನಾನು" },
    { id: 2, name: "My husband is / ನನ್ನ ಪತಿ" },
    { id: 3, name: "Both my husband and I / ನನ್ನ ಪತಿ ಮತ್ತು ನಾನು ಇಬ್ಬರೂ" },
    { id: 4, name: "The elders like my father-in-law / ನನ್ನ ಮಾವನಂತೆ ಹಿರಿಯರು" },
    { id: 5, name: "Other—------------ / ಇತರೆ------------" }
  ];
  const familyRoles = [
    { id: 1, name: "Self / ಸ್ವಯಂ" },
    { id: 2, name: "Other family members / ಇತರ ಕುಟುಂಬ ಸದಸ್ಯರು" }
  ];

  const loanPurposes = [
    { id: 1, name: "Land related / ಭೂಮಿಗೆ ಸಂಬಂಧಿಸಿದ" },
    { id: 2, name: "Business or enterprise / ವ್ಯಾಪಾರ ಅಥವಾ ಉದ್ಯಮ" },
    { id: 3, name: "Livelihoods related / ಜೀವನೋಪಾಯಕ್ಕೆ ಸಂಬಂಧಿಸಿದ" },
    { id: 4, name: "Health / ಆರೋಗ್ಯ" },
    { id: 5, name: "Rations or daily household needs / ಪಡಿತರ ಅಥವಾ ದೈನಂದಿನ ಮನೆಯ ಅಗತ್ಯಗಳು" },
    { id: 6, name: "Education / ಶಿಕ್ಷಣ" },
    { id: 7, name: "Social ceremonies / ಸಾಮಾಜಿಕ ಸಮಾರಂಭಗಳು" },
    { id: 8, name: "Other / ಇತರೆ" },
    { id: 9, name: "No loans taken / ಯಾವುದೇ ಸಾಲವನ್ನು ತೆಗೆದುಕೊಳ್ಳುವುದಿಲ್ಲ" }
  ];
  const loanSources = [
    { id: 1, name: "Bank / ಬ್ಯಾಂಕ್" },
    { id: 2, name: "MFI / ಕಿರುಬಂಡವಾಳ ಸಂಸ್ಥೆಗಳು" },
    { id: 3, name: "Money lender / ಸಾಲ ನೀಡುವವನು" },
    { id: 4, name: "Friends, Family, Neighbour / ಸ್ನೇಹಿತರು, ಕುಟುಂಬ, ನೆರೆಹೊರೆಯವರು" },
    { id: 5, name: "SHGs / ಸ್ವ ಸಹಾಯ ಸಂಘಗಳು" },
    { id: 6, name: "Chit funds / ಚೀಟಿ ವ್ಯವಹಾರ" },
    { id: 7, name: "Other / ಇತರೆ" },
    { id: 8, name: "NA / ಯಾವುದು ಅಲ್ಲ" }
  ];
  const timeDurations = [
    { id: 1, name: "Not even a day / ಒಂದು ದಿನವೂ ಆಗುವುದಿಲ್ಲ" },
    { id: 2, name: "Less than a week / ಒಂದು ವಾರಕ್ಕಿಂತ ಕಡಿಮೆ" },
    { id: 3, name: "At least a week but not a month / ಕನಿಷ್ಠ ಒಂದು ವಾರ ಆದರೆ ಒಂದು ತಿಂಗಳಲ್ಲ" },
    { id: 4, name: "At least 3 months / ಕನಿಷ್ಠ 3 ತಿಂಗಳು" },
    { id: 5, name: "At least 6 months / ಕನಿಷ್ಠ 6 ತಿಂಗಳು" },
    { id: 6, name: "More than 6 months / 6 ತಿಂಗಳಿಗಿಂತ ಹೆಚ್ಚು" },
    { id: 7, name: "I don't know / ನನಗೆ ಗೊತ್ತಿಲ್ಲ" }
  ];
  const businessTypes = [
    { id: 1, name: "Kirana shop / ಕಿರಣ ಅಂಗಡಿ" },
    { id: 2, name: "Tailoring / ಟೈಲರಿಂಗ್" },
    { id: 3, name: "Printing or Xerox / ಪ್ರಿಂಟಿಂಗ್ ಅಥವಾ ಜೆರಾಕ್ಸ್" },
    { id: 4, name: "Beauty parlour / ಬ್ಯೂಟಿ ಪಾರ್ಲರ್" },
    { id: 5, name: "Vegetable vendor / ತರಕಾರಿ ಮಾರಾಟಗಾರ" },
    { id: 6, name: "Handloom / ಕೈಮಗ್ಗ" },
    { id: 7, name: "Small shop (beedi/fruits/flowers/coconut) / ಸಣ್ಣ ಅಂಗಡಿ (ಬೀಡಿ / ಹಣ್ಣುಗಳು / ಹೂವುಗಳು / ತೆಂಗಿನಕಾಯಿ)" },
    { id: 8, name: "Animal husbandry (livestock) / ಪಶುಸಂಗೋಪನೆ (ಜಾನುವಾರು)" },
    { id: 9, name: "Cloth business from home / ಮನೆಯಿಂದ ಬಟ್ಟೆ ವ್ಯಾಪಾರ" },
    { id: 10, name: "Agro processing / ಕೃಷಿ ಸಂಸ್ಕರಣೆ" },
    { id: 11, name: "Eatery or hotel / ತಿನಿಸು ಅಥವಾ ಹೋಟೆಲ್" },
    { id: 12, name: "Others specify………………………. / ಇತರೆ ನಿರ್ದಿಷ್ಟಪಡಿಸಿ... ……………………." }
  ];
  const environmentalPractices = [
    { id: 1, name: "Rain harvesting (Environment friendly // hazardous to the environment) / ಮಳೆ ಕೊಯ್ಲು (ಪರಿಸರ ಸ್ನೇಹಿ // ಪರಿಸರಕ್ಕೆ ಅಪಾಯಕಾರಿ)" },
    { id: 2, name: "Putting both wet and dry waste together? (Environment friendly // hazardous to the environment) / ಒದ್ದೆ ಮತ್ತು ಒಣ ತ್ಯಾಜ್ಯ ಎರಡನ್ನೂ ಒಟ್ಟಿಗೆ ಸೇರಿಸುವುದೇ? (ಪರಿಸರ ಸ್ನೇಹಿ // ಪರಿಸರಕ್ಕೆ ಅಪಾಯಕಾರಿ)" },
    { id: 3, name: "Burning of household waste (Environment friendly // hazardous to the environment) / ಮನೆಯ ತ್ಯಾಜ್ಯವನ್ನು ಸುಡುವುದು (ಪರಿಸರ ಸ್ನೇಹಿ // ಪರಿಸರಕ್ಕೆ ಅಪಾಯಕಾರಿ)" },
    { id: 4, name: "Using organic fertilizers in agriculture (Environment friendly // hazardous to the environment) / ಕೃಷಿಯಲ್ಲಿ ಸಾವಯವ ಗೊಬ್ಬರಗಳ ಬಳಕೆ (ಪರಿಸರ ಸ್ನೇಹಿ // ಪರಿಸರಕ್ಕೆ ಅಪಾಯಕಾರಿ)" },
    { id: 5, name: "Increased use of plastic (Environment friendly // hazardous to the environment) / ಹೆಚ್ಚಿದ ಪ್ಲಾಸ್ಟಿಕ್ ಬಳಕೆ (ಪರಿಸರ ಸ್ನೇಹಿ // ಪರಿಸರಕ್ಕೆ ಅಪಾಯಕಾರಿ)" },
    { id: 6, name: "Throwing household waste into river/canals/or other water bodies (Environment friendly // hazardous to the environment) / ಮನೆಯ ತ್ಯಾಜ್ಯವನ್ನು ನದಿ/ಕಾಲುವೆ/ಅಥವಾ ಇತರ ಜಲಮೂಲಗಳಿಗೆ ಎಸೆಯುವುದು (ಪರಿಸರ ಸ್ನೇಹಿ // ಪರಿಸರಕ್ಕೆ ಅಪಾಯಕಾರಿ)" }
  ];
  const hygieneProducts = [
    { id: 1, name: "Cloth / ಬಟ್ಟೆ" },
    { id: 2, name: "Sanitary napkins / ಸ್ಯಾನಿಟರಿ ನ್ಯಾಪ್‌ಕಿನ್‌ಗಳು" },
    { id: 3, name: "Tampons / ಟ್ಯಾಂಪೂನ್‌ಗಳು" },
    { id: 4, name: "Menstrual Cups / ಮುಟ್ಟಿನ ಕಪ್‌ಗಳು" }
  ];
  const actions = [
    { id: 1, name: "Wash / ತೊಳೆದು" },
    { id: 2, name: "Burn / ಸುಟ್ಟು" },
    { id: 3, name: "Throw it away / ದೂರ ಎಸೆಯಿರಿ" },
    { id: 4, name: "Flush it down the closet / ಕ್ಲೋಸೆಟ್ ಕೆಳಗೆ ಫ್ಲಶ್ ಮಾಡಿ" }
  ];
  const cookingMethods = [
    { id: 1, name: "Choolha using firewood / ಸೌದೆ ಓಲೆ" },
    { id: 2, name: "Biogas / ಬಯೋಗ್ಯಾಸ್ ಸ್ಟೌ" },
    { id: 3, name: "Stove / ಸ್ಟೋವ್" },
    { id: 4, name: "LPG / ಎಲ್‌ಪಿಜಿ" },
    { id: 5, name: "Electric or induction stove / ಎಲೆಕ್ಟ್ರಿಕ್ ಅಥವಾ ಇಂಡಕ್ಷನ್ ಸ್ಟವ್" }
  ];

  React.useEffect(() => {
    //setShown(shown)
    setOpen(editSession)

  }, [editSession])
  React.useEffect(() => {
    Occupation();
  }, [])
  const handleClickOpen = () => {
    setEditsession(true)
    setOpen(true);
  };
  const handleClose = () => {
    setEditsession(false)
    setOpen(false);
    changeState();
  };
  const Occupation = () => {
    var config = {
      method: 'post',
      url: baseURL + 'getOccupations',
      headers: {
        'Authorization': `${apikey}`
      }
    };
    axios(config)
      .then(function (response) {
        setOccupationdata(response.data)
      })
      .catch(function (error) {
        // console.log(error);
      });

  }

  const SendData = async => {
  //   var data = JSON.stringify(
  //     {
    
  //       "id": parseInt(participantId),
  //       // "district": "Puneee",
  //       // "taluk": "Mulshi",
  //       // "gram_panchayat": "Hinjawadi",
  //       // "village_name": "Maan",
  //       // "house": "Own",
  //       // "roof": "Concrete",
  //       // "ration_card": "APL",
  //       // "caste": 1,
  //       // "sub_cast_name": "None",
  //       // "religion": "Hindu",
  //       // "marital_status": "Married",
  //       // "education_level": "Graduate",
  //       // "primary_occupation": "Farmer",
  //       // "secondary_occupation": "Handicrafts",
  //       // "monthly_household_expenditure": 15000.50,
  //       // "monthly_household_income": 25000.75,
  //       // "sole_earner_family": "Yes",
  //       "migration_profile": "Seasonal",
  //       "household_migration_last_year": "No",
  //       "migrant_sends_remittance": "Yes",
  //       "financial_literacy": "Good",
  //       //above pending
  //       "liabilities_or_assets": ["House Loan", "Motorbike"],
  //       "bookkeeping_entry": ["Income", "Expenses"],
  //       "loan_type": ["Bank Loan", "Cooperative Society Loan"],
  //       "annual_interest_rate": 7.5,
  //       "interest_payment_due": 2000.25,
  //       "profit_made": 5000.75,
  //       "personal_account": "Yes",
  //       "has_personal_account": "true",
  //       "bank_account_usage_frequency": ["Monthly", "For Savings"],
  //       "money_decision_maker": ["Self", "Husband"],
  //       "monthly_expense_plan": "Yes",
  //       "monthly_expense_amount": 10000.00,
  //       "maintain_expense_record": true,
  //       "individual_savings": 10000.50,
  //       "monthly_savings_individual": 2000.25,
  //       "annual_savings_household": 24000.00,
  //       "confident_spend_savings": "Yes",
  //       "loans": "Yes",
  //       "loan_taken_by": ["Self", "Family"],
  //       "amount_borrowed": 150000.00,
  //       "purpose_of_loan": ["House Construction", "Education"],
  //       "source": ["Bank", "Microfinance"],
  //       "rate_of_interest": 6.5,
  //       "expenses_exceed_income_last_year": ["Yes", "No"],
  //       "income_loss_duration": ["6 months"],
  //       "goals": "Improve family income",
  //       "financial_goals_set": true,
  //       "short_term_goal": "Buy new land",
  //       "long_term_goal": "Expand farming",
  //       "enterprise": "Yes",
  //       "family_business": "Agriculture",
  //       "want_to_start_enterprise": true,
  //       "enterprise_type": ["Farming", "Handicrafts"],
  //       "num_employees_paid": 5,
  //       "individual_involvement_nature": ["Management", "Operations"],
  //       "enterprise_monthly_income": 30000.00,
  //       "enterprise_is_profitable": true,
  //       "monthly_profit": 5000.00,
  //       "decision_making": "Joint",
  //       "decision_say": ["Self", "Husband"],
  //       "menstrual_hygiene_env": "Clean",
  //       "env_friendly_practices": ["Recycling", "Waste Management"],
  //       "menstrual_product_used": ["Pads", "Cloth"],
  //       "menstrual_disposal_method": ["Burning", "Compost"],
  //       "cooking_fuel_type": ["LPG", "Firewood"],
  //       "womens_occupation": "Tailoring",
  //       "monthly_women_income": 5000.00,
  //       "source_of_this_income": "Self-employment",
  //       "secondary_occupation_of_the_household": "Handicrafts",
  //       "primary_occupation_of_household": "Farming"
    
  //   }
  // );

  var data = sendData
    // if (sendData?.husbandOccupation == '') {
    //   setHusbandOccupationError(true);
    //   setHelperText('Please Select The Option');
    // }
    // if (sendData?.occupation == '') {
    //   setOccupationError(true);
    //   setHelperText('Please Select The Option');
    // }
    // if (sendData?.bank_acc == '') {
    //   setBankError(true);
    //   setHelperText('Please Select The Option');
    // }
    // if (sendData?.husbandOccupation == '' || sendData?.occupation == '') {
    //   alert("Please Select The Option'");
    // }
    // else {
      var config = {
        method: 'post',
        url: baseURL + 'addselfshakti',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `${apikey}`
        },
        data: data
      };
      axios(config)
        .then(function (response) {
          setSendData({
            
    
              "id": parseInt(participantId),
          
              "migration_profile": "",
              "household_migration_last_year": "",
              "migrant_sends_remittance": "",
              "financial_literacy": "",
              "liabilities_or_assets": [],
              "bookkeeping_entry": [],
              "loan_type": [],
              "annual_interest_rate": null,
              "interest_payment_due": null,
              "profit_made": null,
              "personal_account": "",
              "has_personal_account": "",
              "bank_account_usage_frequency": [],
              "money_decision_maker": [],
              "monthly_expense_plan": "",
              "monthly_expense_amount": null,
              "maintain_expense_record": "",
              "individual_savings": null,
              "monthly_savings_individual": null,
              "annual_savings_household": null,
              "confident_spend_savings": "",
              "loans": "",
              "loan_taken_by": [],
              "amount_borrowed": null,
              "purpose_of_loan": [],
              "source": [],
              "rate_of_interest": null,
              "expenses_exceed_income_last_year": "",
              "income_loss_duration": [],
              "goals": "",
              "financial_goals_set": "",
              "short_term_goal": "",
              "long_term_goal": "",
              "enterprise": "",
              "family_business": "",
              "want_to_start_enterprise": "Yes",
              "enterprise_type": [],
              "num_employees_paid": null,
              "individual_involvement_nature": [],
              "enterprise_monthly_income": null,
              "enterprise_is_profitable": "Yes",
              "monthly_profit": null,
              "decision_making": "",
              "decision_say": [],
              "menstrual_hygiene_env": "",
              "env_friendly_practices": [],
              "menstrual_product_used": [],
              "menstrual_disposal_method": [],
              "cooking_fuel_type": [],
              // "womens_occupation": "",
              // "monthly_women_income": 5000.00,
              // "source_of_this_income": "",
              // "secondary_occupation_of_the_household": "",
              // "primary_occupation_of_household": ""
          "withdraw_savings_a": "",
      "reduce_expenses_a": "",
      "asset_sale_a": "",
      "overtime_hours_a": "",
      "missed_payments_a": "",
      "borrowed_from_others_a": "",
      "borrowed_from_lender_a": "",
      "borrowed_from_shg_a": "",
      "pawned_item_a": "",
      "bank_loan_a": "",
      "children_education_b": "",
      "health_services_access_b": "",
      "taking_credit_b": "",
      "saving_money_b": "",
      "asset_purchase_b": "",
      "daily_expenditure_b": "",
      "operational_management_b": "",
      "input_procuring_b": "",
      "selling_produce_b": "",
      "gov_scheme_benefit_b": "",
      "financial_goals_set_c": "",
      "collaborate_with_workers_c": "",
      "daily_affairs_management_c": "",
      "financial_decision_maker_c": "",
      "daily_accounts_book_c": ""
        

          })
          handleClose()
          changeState();
        })
        .catch(function (error) {
          // console.log(error);
        });
    // }
  }

  useEffect(() => {
    if (participantId) {
      setSendData(prevData => ({
        ...prevData,
        id: participantId
      }));
    }
  }, [participantId]);
  
  console.log(sendData ,"sendData")
  return (
    <div>
      <Dialog fullScreen open={open} onClose={handleClose}
        aria-labelledby="scroll-dialog-title"
        aria-describedby="scroll-dialog-description">
        <form
          onSubmit={(e) => {
            e.preventDefault();
            SendData();
          }}
        >
          <Toolbar sx={{ bgcolor: '#ed6c02', color: 'white' }} >
            <IconButton edge="start" sx={{ color: "inherit" }} onClick={handleClose} aria-label="close">
              <CloseIcon />
            </IconButton>
            <Typography sx={{ ml: 2, flex: 1, color: "inherit" }} variant="h6" component="div" >
              Update Participant Detail 
            </Typography>

            <Button autoFocus color="inherit"
              type='submit'
            // onClick={() => SendData()}
            >
              save
            </Button>
          </Toolbar>

          <DialogContent dividers={scroll === 'paper'} sx={{ background: "#f9fafb" }}>
            <DialogContentText
              id="scroll-dialog-description"
              tabIndex={-1}
            >
              {/* <FormControl fullWidth >
                {OccupationError ? <FormHelperText style={{ color: 'red' }}>{helperText}</FormHelperText> : null}{' '}
                <InputLabel id="demo-simple-select-label" style={{ flexDirection: 'row', color: '#ed6c02', fontWeight: 700, marginTop: 20 }}>
                  {sendData?.occupation == "" ? "Select wife's occupation" : "Wife occupation"}</InputLabel>  <br /><br />
                <Select labelId="Select Wife's Occupation" id="demo-simple-select" value={sendData?.occupation} label="Wife Occupation" onChange={(e) => setSendData({ ...sendData, occupation: e?.target?.value })} variant="standard" color="common">
                  {occupationdata?.list?.map(itm => {
                    return (<MenuItem value={itm?.id}>{itm?.name}</MenuItem>)
                  })}

                </Select>
              </FormControl>
              <FormControl fullWidth >
                {HusbandOccupationError ? <FormHelperText style={{ color: 'red' }}>{helperText}</FormHelperText> : null}{' '}
                <InputLabel id="demo-simple-select-label" style={{ flexDirection: 'row', color: '#ed6c02', fontWeight: 700, marginTop: 30 }}>
                  {sendData?.husbandOccupation == "" ? "Select Husband's occupation" : "Husband occupation"}</InputLabel>  <br /><br /><br />
                <Select labelId="Select Wife's Occupation" id="demo-simple-select" value={sendData?.husbandOccupation} label="Husband Occupation" onChange={(e) => setSendData({ ...sendData, husbandOccupation: e?.target?.value })} variant="standard" color="common">
                  {occupationdata?.list?.map(itm => {
                    return (<MenuItem value={itm?.id}>{itm?.name}</MenuItem>)
                  })}

                </Select>
              </FormControl>
              <Stack style={{ marginTop: 20 }}>
                <TextField required id="Monthly-income" onChange={(e) => { setSendData({ ...sendData, wifeIncomeMonthly: e?.target?.value }) }} label="Monthly Wife's income" variant="outlined" color="common" />
              </Stack>
              <Stack style={{ marginTop: 20 }}>
                <TextField required id="Monthly-savings" onChange={(e) => { setSendData({ ...sendData, wifeSavingsMonthly: e?.target?.value }) }} label="Monthly Wife's Savings" variant="outlined" color="common" />
              </Stack>
              <Stack style={{ marginTop: 20 }}>
                <TextField required id="goal" onChange={(e) => { setSendData({ ...sendData, saving_goal: e?.target?.value }) }} label="What is your goal" variant="outlined" color="common" />
              </Stack>
              <Stack style={{ marginTop: 20 }}>
                <TextField required id="Monthly family income" onChange={(e) => { setSendData({ ...sendData, income: e?.target?.value }) }} label="Monthly Family Income" variant="outlined" color="common" />
              </Stack>
              <Stack style={{ marginTop: 20 }}>
                <TextField required id="Monthly _family_savings" onChange={(e) => { setSendData({ ...sendData, saving_amt: e?.target?.value }) }} label="Monthly Family Savings" variant="outlined" color="common" />
              </Stack>
              <Stack style={{ marginTop: 20 }}>
                <TextField required id="type_of_enterprise" onChange={(e) => { setSendData({ ...sendData, typeOfEnterprise: e?.target?.value }) }} label="Type of Enterprise" variant="outlined" color="common" />
              </Stack>
              <Stack style={{ marginTop: 20 }}>
                <TextField required id="contact_no" onChange={(e) => { setSendData({ ...sendData, contact_no: e?.target?.value }) }} label="Contact Number" variant="outlined" color="common" />
              </Stack>
              <Stack style={{ marginTop: 20 }}>
                <TextField required id="husbandName" onChange={(e) => { setSendData({ ...sendData, husbandName: e?.target?.value }) }} label="Husband Name" variant="outlined" color="common" />
              </Stack>
              <Stack mt={1}>
                 <Typography variant="subtitle2" style={{ color: '#ff7424' }}>Bank Account *</Typography>
                <Typography>

                  {BankError ? <FormHelperText style={{ color: 'red' }}>{helperText}</FormHelperText> : null}{' '}
                </Typography>
                <RadioGroup
                  aria-labelledby="demo-radio-buttons-group-label"
                  name="radio-buttons-group"
                  onChange={(e, value) => { setSendData({ ...sendData, bank_acc: value }) }}

                >
                  <div style={{ display: "flex" }}>
                    <FormControlLabel value={0} control={<Radio style={{ color: "#595959" }} />} label="No" />
                    <FormControlLabel value={1} control={<Radio style={{ color: "#595959" }} />} label="Yes" />
                  </div>
                </RadioGroup>
              </Stack>
              <Stack id="create-poa-stack" direction={'row'}>
                <Typography id="all-day">Suggested Gelathi</Typography><br />
                <Switch id="switch-suggested-gelathi" value={sendData?.gelathiRecomm}
                  onChange={(e) => {
                    setSendData({ ...sendData, gelathiRecomm: sendData?.gelathiRecomm === 1 ? 0 : 1 })
                  }} />
              </Stack> */}
              {/* new code ----------------------------------------------------------------------- */}
              <Card style={{ marginTop: 10, borderRadius: 20 }}>
                <CardContent>

                  
                <Stack mt={1}>
                <Typography variant="subtitle2" style={{ color: '#ff7424' }}>  
                      Has anyone in your household migrated in the last 1 year for work? Y/N/ನಿಮ್ಮ ಮನೆಯಲ್ಲಿ ಯಾರಾದರೂ ಕೆಲಸಕ್ಕಾಗಿ ಕಳೆದ 1 ವರ್ಷದಲ್ಲಿ ವಲಸೆ ಹೋಗಿದ್ದಾರೆಯೇ? ಹೌದು /ಇಲ್ಲ</Typography>
               

                <Select
            value={sendData.household_migration_last_year}
            onChange={(event) => setSendData((prevData) => ({
              ...prevData,
              household_migration_last_year: event.target.value,
            }))}
               variant="standard"
            style={{ marginTop: 10 }}
          >
           
            <MenuItem value="Yes">Yes</MenuItem>
            <MenuItem value="No">No</MenuItem>
          </Select>
               
              </Stack>
               
                </CardContent>
              </Card>
              <Card style={{ marginTop: 10, borderRadius: 20 }}>
              <CardContent>
              <Stack mt={1}>
                 <Typography variant="subtitle2" style={{ color: '#ff7424' }}>
                  Does the migrant member send remittances to the household? Y/N
                  /ವಲಸಿಗ ಸದಸ್ಯರು ಮನೆಗೆ ಹಣ ಕಳುಹಿಸುತ್ತಾರೆಯೇ? ಹೌದು /ಇಲ್ಲ</Typography>
                  <Select
            value={sendData.migrant_sends_remittance}
            onChange={(event) => setSendData((prevData) => ({
              ...prevData,
              migrant_sends_remittance: event.target.value,
            }))}
               variant="standard"
            style={{ marginTop: 10 }}
          >
            <MenuItem value="">
            
            </MenuItem>
            <MenuItem value="Yes">Yes</MenuItem>
            <MenuItem value="No">No</MenuItem>
          </Select>
               
              </Stack>
              </CardContent>
              </Card>

              <Card mt={1} style={{ marginTop: 10, borderRadius: 20 }}>
              <CardContent>
  <Typography variant="subtitle2" style={{ color: '#ff7424', textAlign:"center" }}>
  Financial Literacy/ಹಣಕಾಸಿನ ಸಾಕ್ಷಾರತೆ
  </Typography>

  </CardContent>
  </Card>
              <Card mt={1} style={{ marginTop: 10, borderRadius: 20 }}>
              <CardContent>
  <Typography variant="subtitle2" style={{ color: '#ff7424' }}>
    Are the following liabilities or assets? / ಈ ಕೆಳಗಿನ ಹೊಣೆಗಾರಿಕೆಗಳು ಅಥವಾ ಸ್ವತ್ತುಗಳು?
  </Typography>
  <Stack mt={2} mb={2}>
    <FormGroup>
      {assestsOwned.map((item) => (
        <FormControlLabel
          key={item.id}
          control={
            <Checkbox
              color="primary"
              // Use optional chaining and fallback to an empty array
              checked={sendData.liabilities_or_assets?.includes(item.name) || false}
              onChange={(e) => {
                const isChecked = e.target.checked;
                // Ensure sendData.liabilities_or_assets is an array
                const updatedSelections = isChecked
                  ? [...(sendData.liabilities_or_assets || []), item.name] // Use fallback to an empty array
                  : (sendData.liabilities_or_assets || []).filter((asset) => asset !== item.name); // Use fallback to an empty array

                setSendData({
                  ...sendData,
                  liabilities_or_assets: updatedSelections,
                });

                console.log(updatedSelections); // To check the updated selections
              }}
            />
          }
          label={item.name}
        />
      ))}
    </FormGroup>
  </Stack>
</CardContent>

</Card>
           
<Card mt={1} style={{ marginTop: 10, borderRadius: 20 }}>
  <CardContent>
    <Typography variant="subtitle2" style={{ color: '#ff7424' }}>
      Which of the following would you record as a bookkeeping entry? <br />
      ಕೆಳಗಿನವುಗಳಲ್ಲಿ ಯಾವುದನ್ನು ನೀವು ಬುಕ್‌ಕೀಪಿಂಗ್ ನಮೂದು ಎಂದು ರೆಕಾರ್ಡ್ ಮಾಡುತ್ತೀರಿ?
    </Typography>
    <Stack mt={2} mb={2}>
      <FormGroup>
        {newBookkeepingEntries.map((item) => (
          <FormControlLabel
            key={item.id}
            control={
              <Checkbox
                color="primary"
                checked={sendData.bookkeeping_entry?.includes(item.name) || false} 
                onChange={(e) => {
                  const isChecked = e.target.checked;
                  const updatedSelections = isChecked
                    ? [...sendData.bookkeeping_entry, item.name]
                    : sendData.bookkeeping_entry.filter((entry) => entry !== item.name);

                  setSendData({
                    ...sendData,
                    bookkeeping_entry: updatedSelections,
                  });

                  console.log(updatedSelections); // To check the updated selections
                }}
              />
            }
            label={item.name}
          />
        ))}
      </FormGroup>
    </Stack>
  </CardContent>
</Card>
           
<Card mt={1} style={{ marginTop: 10, borderRadius: 20 }}>
  <CardContent>
    <Typography variant="subtitle2" style={{ color: '#ff7424' }}>
      Please tell me if the following loans are productive or consumptive? <br />
      ಈ ಕೆಳಗಿನ ಸಾಲಗಳು ಉತ್ಪಾದಕವೇ ಅಥವಾ ಉಪಭೋಗಕಾರಿಯೇ ಎಂದು ದಯವಿಟ್ಟು ನನಗೆ ತಿಳಿಸಿ?
    </Typography>
    <Stack mt={2} mb={2}>
      <FormGroup>
        {purposesForMoney.map((item) => (
          <FormControlLabel
            key={item.id}
            control={
              <Checkbox
                color="primary"
                checked={sendData.loan_type.includes(item.name)}
                onChange={(e) => {
                  const isChecked = e.target.checked;
                  const updatedSelections = isChecked
                    ? [...sendData.loan_type, item.name]
                    : sendData.loan_type.filter((entry) => entry !== item.name);

                  setSendData({
                    ...sendData,
                    loan_type: updatedSelections,
                  });

                  console.log(updatedSelections); // To check the updated selections
                }}
              />
            }
            label={item.name}
          />
        ))}
      </FormGroup>
    </Stack>
  </CardContent>
</Card>

              <Card style={{ marginTop: 10, borderRadius: 20 }}>
                <CardContent>
                  <Typography variant="subtitle2" style={{ color: '#ff7424' }}>
                    You have taken a loan of Rs. 20,000 to be paid back in equal monthly payments in one year and you have to pay back Rs. 2000 a month. What is the annual interest rate?
                    20000ರೂ ಗಳನ್ನೂ ಸಾಲ ಮಾಡಿದ್ಧಿರ , ಒಂದು ವರ್ಷದಲ್ಲಿ ಸಮಾನ ಮಾಸಿಕ ಪಾವತಿಗಳಲ್ಲಿ 2000 ರೂ  ಮರುಪಾವತಿಸಿದರೆ ಮತ್ತು  ವಾರ್ಷಿಕ ಬಡ್ಡಿ ದರ ಎಷ್ಟು?
                  </Typography>
                  <Stack mt={2} mb={2}>
                    <TextField
                      id="twoquestions"
                      label="Your Answer"
                      type="number"
                      onChange={(e) => {
                        setSendData({ ...sendData, annual_interest_rate:parseInt(e?.target?.value ) });
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
                    You lend Rs.1000 to a friend one evening and she gives you Rs. 1000 back the next day. If the interest is 2% per day, how much should he pay back in total tomorrow?
                    ನೀವು ಸ್ನೇಹಿತರಿಗೆ ಒಂದು ಸಂಜೆ 1000 ರೂ ಸಾಲ ನೀಡುತ್ತೀರಿ ಮತ್ತು ಅವಳು ಮರುದಿನ 1000 ರೂ ಮರು ಪಾವತಿ ಮಾಡುತ್ತಾರೆ ,ಒಂದು ದಿನಕ್ಕೆ ಬಡ್ಡಿ 2 % ಆದರೆ , ನಾಳೆ  ಅವರು ಒಟ್ಟು ಎಷ್ಟು ಮರುಪಾವತಿಸಬೇಕು?"</Typography>
                  <Stack mt={2} mb={2}>
                    <TextField
                      id="twoquestions"
                      label="Your Answer"
                      type="number"
                      onChange={(e) => {
                        setSendData({ ...sendData, interest_payment_due:parseInt(e?.target?.value ) });
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
                    Assume you invest Rs.15,000 as capital in a saree business for 30 sarees. You spend Rs.200 to transport the sarees from the wholesaler to your village. If you sell all the sarees for 21,000, how much profit have you made?
                    ನೀವು 30 ಸೀರೆಗಳಿಗೆ ಸೀರೆ ವ್ಯಾಪಾರದಲ್ಲಿ ರೂ.15,000 ಬಂಡವಾಳವಾಗಿ ಹೂಡಿಕೆ ಮಾಡುತ್ತೀರಿ ಎಂದು ಭಾವಿಸಿ. ಸಗಟು ವ್ಯಾಪಾರಿಯಿಂದ ನಿಮ್ಮ ಗ್ರಾಮಕ್ಕೆ ಸೀರೆಗಳನ್ನು ಸಾಗಿಸಲು ನೀವು 200 ರೂ. ಎಲ್ಲಾ ಸೀರೆಗಳನ್ನು 21,000ಕ್ಕೆ ಮಾರಿದರೆ ಎಷ್ಟು ಲಾಭಸಿಗುತ್ತದೆ ?
                  </Typography>
                  <Stack mt={2} mb={2}>

                    <TextField
                      id="twoquestions"
                      label="Your Answer"
                      type="number"
                      onChange={(e) => {
                        setSendData({ ...sendData, profit_made:parseInt( e?.target?.value )});
                      }}
                      variant="outlined"
                      color="common"
                    />
                  </Stack>
                </CardContent>
              </Card>
              <Card mt={1} style={{ marginTop: 10, borderRadius: 20 }}>
              <CardContent> 
              <Stack mt={1}>
                <Typography variant="subtitle2" style={{ color: '#ff7424' }}>Personal Account/ವೈಯಕ್ತಿಕ ಖಾತೆ
                  </Typography>
                  <Select
            value={sendData.personal_account}
            onChange={(event) => setSendData((prevData) => ({
              ...prevData,
              personal_account: event.target.value,
            }))}
               variant="standard"
            style={{ marginTop: 10 }}
          >
            <MenuItem value="">
            
            </MenuItem>
            <MenuItem value="Yes">Yes</MenuItem>
            <MenuItem value="No">No</MenuItem>
          </Select>
              
              </Stack>
              </CardContent>
              </Card>
              <Card mt={1} style={{ marginTop: 10, borderRadius: 20 }}>
              <CardContent> 
              <Stack mt={1}>
                 <Typography variant="subtitle2" style={{ color: '#ff7424' }}>Do you have a personal bank account? (Y/N)/ನೀವು ವೈಯಕ್ತಿಕ ಬ್ಯಾಂಕ್ ಖಾತೆಯನ್ನು ಹೊಂದಿದ್ದೀರಾ? (ಹೌದು/ಇಲ್ಲ)</Typography>
                 
                 <Select
            value={sendData.has_personal_account}
            onChange={(event) => setSendData((prevData) => ({
              ...prevData,
              has_personal_account: event.target.value,
            }))}
               variant="standard"
            style={{ marginTop: 10 }}
          >
            <MenuItem value="">
            
            </MenuItem>
            <MenuItem value="Yes">Yes</MenuItem>
            <MenuItem value="No">No</MenuItem>
          </Select>
              
              </Stack>
              </CardContent>
              </Card>
             
<Card mt={1} style={{ marginTop: 10, borderRadius: 20 }}>
  <CardContent>
    <Typography variant="subtitle2" style={{ color: '#ff7424' }}>
      How often do you operate your bank account? <br />
      ನಿಮ್ಮ ಬ್ಯಾಂಕ್ ಖಾತೆಯನ್ನು ನೀವು ಎಷ್ಟು ಬಾರಿ ನಿರ್ವಹಿಸುತ್ತೀರಿ?
    </Typography>
    <Stack mt={2} mb={2}>
      <FormGroup>
        {timeFrequencies.map((item) => (
          <FormControlLabel
            key={item.id}
            control={
              <Checkbox
                color="primary"
                checked={sendData.bank_account_usage_frequency.includes(item.name)}
                onChange={(e) => {
                  const isChecked = e.target.checked;
                  const updatedSelections = isChecked
                    ? [...sendData.bank_account_usage_frequency, item.name]
                    : sendData.bank_account_usage_frequency.filter((entry) => entry !== item.name);

                  setSendData({
                    ...sendData,
                    bank_account_usage_frequency: updatedSelections,
                  });

                  console.log(updatedSelections); // To check the updated selections
                }}
              />
            }
            label={item.name}
          />
        ))}
      </FormGroup>
    </Stack>
  </CardContent>
</Card>

          
<Card mt={1} style={{ marginTop: 10, borderRadius: 20 }}>
  <CardContent>
    <Typography variant="subtitle2" style={{ color: '#ff7424' }}>
      Who is responsible for day-to-day decisions about money in your household? <br />
      ನಿಮ್ಮ ಮನೆಯಲ್ಲಿ ಹಣದ ಬಗ್ಗೆ ದಿನನಿತ್ಯದ ನಿರ್ಧಾರಗಳಿಗೆ ಯಾರು ಜವಾಬ್ದಾರರು?
    </Typography>
    <Stack mt={2} mb={2}>
      <FormGroup>
        {personalRelationships.map((item) => (
          <FormControlLabel
            key={item.id}
            control={
              <Checkbox
                color="primary"
                checked={sendData.money_decision_maker.includes(item.name)}
                onChange={(e) => {
                  const isChecked = e.target.checked;
                  const updatedSelections = isChecked
                    ? [...sendData.money_decision_maker, item.name]
                    : sendData.money_decision_maker.filter((entry) => entry !== item.name);

                  setSendData({
                    ...sendData,
                    money_decision_maker: updatedSelections,
                  });

                  console.log(updatedSelections); // To check the updated selections
                }}
              />
            }
            label={item.name}
          />
        ))}
      </FormGroup>
    </Stack>
  </CardContent>
</Card>
<Card style={{ marginTop: 10, borderRadius: 20 }}>
<CardContent>
              <Stack mt={1}>
                 <Typography variant="subtitle2" style={{ color: '#ff7424' }}>Do you have a plan for monthly household expenses? Yes/No/Don't know
                  ಮಾಸಿಕ ಮನೆಯ ವೆಚ್ಚಗಳಿಗಾಗಿ ನೀವು ಯೋಜನೆಯನ್ನು ಹೊಂದಿದ್ದೀರಾ? ಹೌದು /ಇಲ್ಲ/ಗೊತ್ತಿಲ್ಲ</Typography>
                  <Select
            value={sendData.monthly_expense_plan}
            onChange={(event) => setSendData((prevData) => ({
              ...prevData,
              monthly_expense_plan: event.target.value,
            }))}
               variant="standard"
            style={{ marginTop: 10 }}
          >
            <MenuItem value="">
            
            </MenuItem>
            <MenuItem value="Yes">Yes</MenuItem>
            <MenuItem value="No">No</MenuItem>
          </Select>
              
              </Stack>
              </CardContent>
              </Card>
              <Card style={{ marginTop: 10, borderRadius: 20 }}>
                <CardContent>
                  <Typography variant="subtitle2" style={{ color: '#ff7424' }}>
                    How much does your monthly household expense plan come up to?
                    ನಿಮ್ಮ ಮಾಸಿಕ ಮನೆಯ ವೆಚ್ಚದ ಯೋಜನೆ ಎಷ್ಟು ಬರುತ್ತದೆ?

                  </Typography>
                  <Stack mt={2} mb={2}>
                    <TextField
                      id="twoquestions"
                      label="Your Answer"
                      type="number"
                      onChange={(e) => {
                        setSendData({ ...sendData, monthly_expense_amount: parseInt(e?.target?.value) });
                      }}
                      variant="outlined"
                      color="common"
                    />
                  </Stack>
                </CardContent>
              </Card>
              <Card style={{ marginTop: 10, borderRadius: 20 }}>
              <CardContent>
              <Stack mt={1}>
                 <Typography variant="subtitle2" style={{ color: '#ff7424' }}>Do you maintain a record of the daily household expenses by maintaining a book of accounts (Y/N)
                  ಖಾತೆಗಳ ಪುಸ್ತಕವನ್ನು (ಹೌದು /ಇಲ್ಲ) ನಿರ್ವಹಿಸುವ ಮೂಲಕ ನೀವು ದೈನಂದಿನ ಮನೆಯ ಖರ್ಚುಗಳ ದಾಖಲೆಯನ್ನು ನಿರ್ವಹಿಸುತ್ತೀರಾ
                </Typography>
                <Select
            value={sendData.maintain_expense_record}
            onChange={(event) => setSendData((prevData) => ({
              ...prevData,
              maintain_expense_record: event.target.value,
            }))}
               variant="standard"
            style={{ marginTop: 10 }}
          >
            <MenuItem value="">
            
            </MenuItem>
            <MenuItem value="Yes">Yes</MenuItem>
            <MenuItem value="No">No</MenuItem>
          </Select>
           
              </Stack>
              </CardContent>
              </Card>
              <Card style={{ marginTop: 10, borderRadius: 20 }}>
                <CardContent>
                  <Typography variant="subtitle2" style={{ color: '#ff7424' ,textAlign:"center" }}>
                    Savings/ಉಳಿತಾಯ

                  </Typography>
                
                </CardContent>
              </Card>
              <Card style={{ marginTop: 10, borderRadius: 20 }}>
                <CardContent>
                  <Typography variant="subtitle2" style={{ color: '#ff7424' }}>
                    Do you have individual savings?
                    ನೀವು ವೈಯಕ್ತಿಕ ಉಳಿತಾಯವನ್ನು ಹೊಂದಿದ್ದೀರಾ?

                  </Typography>
                  <Stack mt={2} mb={2}>

                  <Select
            value={sendData.individual_savings}
            onChange={(event) => setSendData((prevData) => ({
              ...prevData,
              individual_savings: event.target.value,
            }))}
               variant="standard"
            style={{ marginTop: 10 }}
          >
            
            <MenuItem value="Yes">Yes</MenuItem>
            <MenuItem value="No">No</MenuItem>
          </Select>
                    
                  </Stack>
                </CardContent>
              </Card>
              <Card style={{ marginTop: 10, borderRadius: 20 }}>
                <CardContent>
                  <Typography variant="subtitle2" style={{ color: '#ff7424' }}>
                    How much do you save in a month as an individual?
                    ಒಬ್ಬ ವ್ಯಕ್ತಿಯಾಗಿ ನೀವು ತಿಂಗಳಿಗೆ ಎಷ್ಟು ಉಳಿತಾಯ ಮಾಡುತ್ತೀರಿ?

                  </Typography>
                  <Stack mt={2} mb={2}>
                    <TextField
                      id="twoquestions"
                      label="Your Answer"
                      type="number"
                      onChange={(e) => {
                        setSendData({ ...sendData, monthly_savings_individual:parseInt(e?.target?.value ) });
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
                    What is your household annual savings?
                    ನಿಮ್ಮ ಮನೆಯ ವಾರ್ಷಿಕ ಉಳಿತಾಯ ಎಷ್ಟು?

                  </Typography>
                  <Stack mt={2} mb={2}>
                    <TextField
                      id="twoquestions"
                      label="Your Answer"
                      type="number"
                      onChange={(e) => {
                        setSendData({ ...sendData, annual_savings_household:parseInt(e?.target?.value)  });
                      }}
                      variant="outlined"
                      color="common"
                    />
                  </Stack>
                </CardContent>
              </Card>
              <Card style={{ marginTop: 10, borderRadius: 20 }}>
              <CardContent>
              <Stack mt={1}>
                 <Typography variant="subtitle2" style={{ color: '#ff7424' }}>Are you confident to spend your savings and income as you would like?
                  ನಿಮ್ಮ ಉಳಿತಾಯ ಮತ್ತು ಆದಾಯವನ್ನು ನೀವು ಬಯಸಿದಂತೆ ಖರ್ಚು ಮಾಡುವ ವಿಶ್ವಾಸವಿದೆಯೇ?
                </Typography>
                <Select
            value={sendData.confident_spend_savings}
            onChange={(event) => setSendData((prevData) => ({
              ...prevData,
              confident_spend_savings: event.target.value,
            }))}
               variant="standard"
            style={{ marginTop: 10 }}
          >
            <MenuItem value="">
            
            </MenuItem>
            <MenuItem value="Yes">Yes</MenuItem>
            <MenuItem value="No">No</MenuItem>
          </Select>
             
              </Stack>
              </CardContent>
              </Card>

              <Card style={{ marginTop: 10, borderRadius: 20 }}>
              <CardContent>
              <Stack mt={1}>
                <Typography variant="subtitle2" style={{ color: '#ff7424' ,textAlign:"center" }}> Loans/ಸಾಲಗಳು
                </Typography>
               
              </Stack>
              </CardContent>
              </Card>
           
           
<Card mt={1} style={{ marginTop: 10, borderRadius: 20 }}>
  <CardContent>
    <Typography variant="subtitle2" style={{ color: '#ff7424' }}>
      Who took the loan? <br />
      ಯಾರು ಸಾಲ ತೆಗೆದುಕೊಂಡರು?
    </Typography>
    <Stack mt={2} mb={2}>
      <FormGroup>
        {familyRoles.map((item) => (
          <FormControlLabel
            key={item.id}
            control={
              <Checkbox
                color="primary"
                checked={sendData.loan_taken_by.includes(item.name)}
                onChange={(e) => {
                  const isChecked = e.target.checked;
                  const updatedSelections = isChecked
                    ? [...sendData.loan_taken_by, item.name]
                    : sendData.loan_taken_by.filter((entry) => entry !== item.name);

                  setSendData({
                    ...sendData,
                    loan_taken_by: updatedSelections,
                  });

                  console.log(updatedSelections); // To check the updated selections
                }}
              />
            }
            label={item.name}
          />
        ))}
      </FormGroup>
    </Stack>
  </CardContent>
</Card>

              <Card style={{ marginTop: 10, borderRadius: 20 }}>
                <CardContent>
                  <Typography variant="subtitle2" style={{ color: '#ff7424' }}>
                    Amount borrowed/ಸಾಲ ಪಡೆದ ಮೊತ್ತ
                  </Typography>
                  <Stack mt={2} mb={2}>
                    <TextField
                      id="twoquestions"
                      label="Your Answer"
                      type="number"
                      onChange={(e) => {
                        setSendData({ ...sendData, amount_borrowed:parseInt(e?.target?.value) });
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
      Purpose of loan / ಸಾಲದ ಉದ್ದೇಶ
    </Typography>
    <Stack mt={2} mb={2}>
      <FormGroup>
        {loanPurposes.map((item) => (
          <FormControlLabel
            key={item.id}
            control={
              <Checkbox
                color="primary"
                checked={sendData.purpose_of_loan.includes(item.name)}
                onChange={(e) => {
                  const isChecked = e.target.checked;
                  const updatedSelections = isChecked
                    ? [...sendData.purpose_of_loan, item.name]
                    : sendData.purpose_of_loan.filter((entry) => entry !== item.name);

                  setSendData({
                    ...sendData,
                    purpose_of_loan: updatedSelections,
                  });

                  console.log(updatedSelections); // To check the updated selections
                }}
              />
            }
            label={item.name}
          />
        ))}
      </FormGroup>
    </Stack>
  </CardContent>
</Card>
             
<Card mt={1} style={{ marginTop: 10, borderRadius: 20 }}>
  <CardContent>
    <Typography variant="subtitle2" style={{ color: '#ff7424' }}>
      Source / ಮೂಲ
    </Typography>
    <Stack mt={2} mb={2}>
      <FormGroup>
        {loanSources.map((item) => (
          <FormControlLabel
            key={item.id}
            control={
              <Checkbox
                color="primary"
                checked={sendData.source.includes(item.name)}
                onChange={(e) => {
                  const isChecked = e.target.checked;
                  const updatedSelections = isChecked
                    ? [...sendData.source, item.name]
                    : sendData.source.filter((entry) => entry !== item.name);

                  setSendData({
                    ...sendData,
                    source: updatedSelections,
                  });

                  console.log(updatedSelections); // To check the updated selections
                }}
              />
            }
            label={item.name}
          />
        ))}
      </FormGroup>
    </Stack>
  </CardContent>
</Card>
<Card style={{ marginTop: 10, borderRadius: 20 }}>
  <CardContent>
    <Typography variant="subtitle2" style={{ color: '#ff7424' }}>
      Rate of Interest/ಬಡ್ಡಿ ದರ
    </Typography>
    <Stack mt={2} mb={2}>
      <TextField
        id="twoquestions"
        label="Your Answer"
        type="text" // Keep as text for finer control over input
        onChange={(e) => {
          let value = e?.target?.value;

          // Allow only up to 2 digits (either integer or float with 2 decimals)
          const validValue = value.match(/^\d{0,2}(\.\d{0,2})?$/);

          // If the value is valid, update the state
          if (validValue) {
            setSendData({ ...sendData, rate_of_interest:parseFloat(value)  });
          }
        }}
        inputProps={{ maxLength: 5 }} // Restrict max length (2 digits + '.' + 2 decimals)
        variant="outlined"
        color="common"
      />
    </Stack>
  </CardContent>
</Card>


              <Card style={{ marginTop: 10, borderRadius: 20 }}>
              <CardContent>
              <Stack mt={1}>
                 <Typography variant="subtitle2" style={{ color: '#ff7424' }}>Sometimes, it may so happen that our living expenses go beyond our income? Has this happened in your household in the last one year?
                  ಕೆಲವೊಮ್ಮೆ, ನಮ್ಮ ಜೀವನ ವೆಚ್ಚಗಳು ನಮ್ಮ ಆದಾಯವನ್ನು ಮೀರಿ ಹೋಗಬಹುದು? ಕಳೆದ ಒಂದು ವರ್ಷದಲ್ಲಿ ಇದು ನಿಮ್ಮ ಮನೆಯಲ್ಲಿ ನಡೆದಿದೆಯೇ?
                </Typography>
                <Select
            value={sendData.expenses_exceed_income_last_year}
            onChange={(event) => setSendData((prevData) => ({
              ...prevData,
              expenses_exceed_income_last_year: event.target.value,
            }))}
               variant="standard"
            style={{ marginTop: 10 }}
          >
            <MenuItem value="">
            
            </MenuItem>
            <MenuItem value="Yes">Yes</MenuItem>
            <MenuItem value="No">No</MenuItem>
            <MenuItem value="No">Don't Know</MenuItem>
          </Select>
            
              </Stack>
              </CardContent>
              </Card>
              <Card style={{ marginTop: 10, borderRadius: 20 }}>
                <CardContent>
                  <Typography variant="subtitle2" style={{ color: '#ff7424' }}>
                    How did you meet these unexpected expenses?
                    ನೀವು  ಈ ಅನಿರೀಕ್ಷಿತ ವೆಚ್ಚಗಳನ್ನು  ಹೇಗೆ ಪೂರೈಸಿದ್ದೀರಿ?


                  </Typography>

                  <Stack mt={1}>
                     <Typography variant="subtitle2" style={{ color: '#ff7424' }}>
                     Draw money out of savings (Yes/No)
ಉಳಿತಾಯದಿಂದ ಹಣವನ್ನು ಡ್ರಾ ಮಾಡಿ (ಹೌದು / ಇಲ್ಲ)
</Typography>
                    <Typography>

                      {BankError ? <FormHelperText style={{ color: 'red' }}>{helperText}</FormHelperText> : null}{' '}
                    </Typography>
                    <RadioGroup
                      aria-labelledby="demo-radio-buttons-group-label"
                      name="radio-buttons-group"
                      value={sendData.withdraw_savings_a}
                      onChange={(e) => {const value = e.target.value;  setSendData({ ...sendData, withdraw_savings_a: value }) }}

                    >
                      <div style={{ display: "flex" }}>
                      <FormControlLabel
            value="No"
            control={<Radio style={{ color: "#595959" }} />}
            label="No"
          />
          <FormControlLabel
            value="Yes"
            control={<Radio style={{ color: "#595959" }} />}
            label="Yes"/>

                      </div>
                    </RadioGroup>
                  </Stack>
                  <Stack mt={1}>
                     <Typography variant="subtitle2" style={{ color: '#ff7424' }}>
                      Borrowed money from money lender (Yes/No)
                      ಸಾಲಗಾರರಿಂದ ಹಣವನ್ನು ಎರವಲು ಪಡೆಯಲಾಗಿದೆ  (ಹೌದು / ಇಲ್ಲ)</Typography>
                    <Typography>

                      {BankError ? <FormHelperText style={{ color: 'red' }}>{helperText}</FormHelperText> : null}{' '}
                    </Typography>
                    <RadioGroup
                      aria-labelledby="demo-radio-buttons-group-label"
                      name="radio-buttons-group"
                      value={sendData.borrowed_from_lender_a}
                      onChange={(e) => {const value = e.target.value;  setSendData({ ...sendData, borrowed_from_lender_a: value }) }}

                    >
                      <div style={{ display: "flex" }}>
                      <FormControlLabel
            value="No"
            control={<Radio style={{ color: "#595959" }} />}
            label="No"
          />
          <FormControlLabel
            value="Yes"
            control={<Radio style={{ color: "#595959" }} />}
            label="Yes"/>

                      </div>
                    </RadioGroup>
                  </Stack>
                  <Stack mt={1}>
                     <Typography variant="subtitle2" style={{ color: '#ff7424' }}>
                      Cut back expenses (Yes/No)
                      ವೆಚ್ಚಗಳನ್ನು ಕಡಿತಗೊಳಿಸಿ (ಹೌದು / ಇಲ್ಲ)
                    </Typography>
                    <Typography>

                      {BankError ? <FormHelperText style={{ color: 'red' }}>{helperText}</FormHelperText> : null}{' '}
                    </Typography>
                    <RadioGroup
                      aria-labelledby="demo-radio-buttons-group-label"
                      name="radio-buttons-group"
                      value={sendData.reduce_expenses_a}
                      onChange={(e) => {const value = e.target.value;  setSendData({ ...sendData, reduce_expenses_a: value }) }}

                    >
                      <div style={{ display: "flex" }}>
                      <FormControlLabel
            value="No"
            control={<Radio style={{ color: "#595959" }} />}
            label="No"
          />
          <FormControlLabel
            value="Yes"
            control={<Radio style={{ color: "#595959" }} />}
            label="Yes"/>

                      </div>
                    </RadioGroup>
                  </Stack>

                  <Stack mt={1}>
                     <Typography variant="subtitle2" style={{ color: '#ff7424' }}>
                      Sell an asset (Yes/No)
                      ಆಸ್ತಿಯನ್ನು ಮಾರಾಟ ಮಾಡಿ (ಹೌದು / ಇಲ್ಲ)
                    </Typography>
                    <Typography>

                      {BankError ? <FormHelperText style={{ color: 'red' }}>{helperText}</FormHelperText> : null}{' '}
                    </Typography>
                    <RadioGroup
                      aria-labelledby="demo-radio-buttons-group-label"
                      name="radio-buttons-group"
                      value={sendData.asset_sale_a}
                      onChange={(e) => {
                        const value = e.target.value; 
                         setSendData({ ...sendData, asset_sale_a: value }) }}

                    >
                      <div style={{ display: "flex" }}>
                      <FormControlLabel
            value="No"
            control={<Radio style={{ color: "#595959" }} />}
            label="No"
          />
          <FormControlLabel
            value="Yes"
            control={<Radio style={{ color: "#595959" }} />}
            label="Yes"/>

                      </div>
                    </RadioGroup>
                  </Stack>
                  <Stack mt={1}>
                     <Typography variant="subtitle2" style={{ color: '#ff7424' }}>
                      Worked over time (Yes/No)
                      ಹೆಚ್ಚು  ಕಾಲ ಕೆಲಸ ಮಾಡಿ(ಹೌದು / ಇಲ್ಲ)

                    </Typography>
                    <Typography>

                      {BankError ? <FormHelperText style={{ color: 'red' }}>{helperText}</FormHelperText> : null}{' '}
                    </Typography>
                    <RadioGroup
                      aria-labelledby="demo-radio-buttons-group-label"
                      name="radio-buttons-group"
                      value={sendData.overtime_hours_a

                      }
                      onChange={(e) => {const value = e.target.value;  setSendData({ ...sendData, overtime_hours_a: value }) }}

                    >
                      <div style={{ display: "flex" }}>
                      <FormControlLabel
            value="No"
            control={<Radio style={{ color: "#595959" }} />}
            label="No"
          />
          <FormControlLabel
            value="Yes"
            control={<Radio style={{ color: "#595959" }} />}
            label="Yes"/>

                      </div>
                    </RadioGroup>
                  </Stack>
                  <Stack mt={1}>
                     <Typography variant="subtitle2" style={{ color: '#ff7424' }}>
                      Pay my bills late/ did not pay my bills (Yes/No)
                      ನನ್ನ ಬಿಲ್‌ಗಳನ್ನು ತಡವಾಗಿ ಪಾವತಿಸಿ/ ನನ್ನ ಬಿಲ್‌ಗಳನ್ನು ಪಾವತಿಸಿಲ್ಲ (ಹೌದು / ಇಲ್ಲ)

                    </Typography>
                    <Typography>

                      {BankError ? <FormHelperText style={{ color: 'red' }}>{helperText}</FormHelperText> : null}{' '}
                    </Typography>
                    <RadioGroup
                      aria-labelledby="demo-radio-buttons-group-label"
                      name="radio-buttons-group"
                      value={sendData.missed_payments_a}
                      onChange={(e) => {
                        const value = e.target.value;  setSendData({ ...sendData, missed_payments_a: value }) }}

                    >
                      <div style={{ display: "flex" }}>
                      <FormControlLabel
            value="No"
            control={<Radio style={{ color: "#595959" }} />}
            label="No"
          />
          <FormControlLabel
            value="Yes"
            control={<Radio style={{ color: "#595959" }} />}
            label="Yes"/>

                      </div>
                    </RadioGroup>
                  </Stack>
                  <Stack mt={1}>
                     <Typography variant="subtitle2" style={{ color: '#ff7424' }}>
                      Borrowed money from friends/relatives/neighbours (Yes/No)
                      ಸ್ನೇಹಿತರು/ಬಂಧುಗಳು/ನೆರೆಹೊರೆಯವರಿಂದ ಹಣವನ್ನು ಎರವಲು ಪಡೆಯಲಾಗಿದೆ  ಪಡೆಯಲಾಗಿದೆ (ಹೌದು / ಇಲ್ಲ)

                    </Typography>
                    <Typography>

                      {BankError ? <FormHelperText style={{ color: 'red' }}>{helperText}</FormHelperText> : null}{' '}
                    </Typography>
                    <RadioGroup
                      aria-labelledby="demo-radio-buttons-group-label"
                      name="radio-buttons-group"
                      value={sendData.borrowed_from_others_a}
                      onChange={(e) => {
                        const value = e.target.value;  setSendData({ ...sendData, borrowed_from_others_a: value }) }}

                    >
                      <div style={{ display: "flex" }}>
                      <FormControlLabel
            value="No"
            control={<Radio style={{ color: "#595959" }} />}
            label="No"
          />
          <FormControlLabel
            value="Yes"
            control={<Radio style={{ color: "#595959" }} />}
            label="Yes"/>

                      </div>
                    </RadioGroup>
                  </Stack>
                 

                  <Stack mt={1}>
                     <Typography variant="subtitle2" style={{ color: '#ff7424' }}>
                      Borrowed from my SHG (Yes/No)
                      ನನ್ನ ಸ್ವ ಸಹಾಯ ಸಂಘದಿಂದ ಎರವಲು ಪಡೆಯಲಾಗಿದೆ (ಹೌದು / ಇಲ್ಲ)



                    </Typography>
                    <Typography>

                      {BankError ? <FormHelperText style={{ color: 'red' }}>{helperText}</FormHelperText> : null}{' '}
                    </Typography>
                    <RadioGroup
                     value={sendData.borrowed_from_shg_a}
                      aria-labelledby="demo-radio-buttons-group-label"
                      name="radio-buttons-group"
                      onChange={(e) => {
                        const value = e.target.value;  setSendData({ ...sendData, borrowed_from_shg_a: value }) }}

                    >
                      <div style={{ display: "flex" }}>
                      <FormControlLabel
            value="No"
            control={<Radio style={{ color: "#595959" }} />}
            label="No"
          />
          <FormControlLabel
            value="Yes"
            control={<Radio style={{ color: "#595959" }} />}
            label="Yes"/>

                      </div>
                    </RadioGroup>
                  </Stack>

                  <Stack mt={1}>
                     <Typography variant="subtitle2" style={{ color: '#ff7424' }}>
                      Pawn something that I own (Yes/No)
                      ನಾನು ಹೊಂದಿರುವ ಯಾವುದನ್ನಾದರೂ ಗಿರವಿ ಇಡುತ್ತೇನೆ (Y/N)




                    </Typography>
                    <Typography>

                      {BankError ? <FormHelperText style={{ color: 'red' }}>{helperText}</FormHelperText> : null}{' '}
                    </Typography>
                    <RadioGroup
                      aria-labelledby="demo-radio-buttons-group-label"
                      name="radio-buttons-group"
                      value={sendData.pawned_item_a}
                      onChange={(e) => {const value = e.target.value;  setSendData({ ...sendData, pawned_item_a: value }) }}

                    >
                      <div style={{ display: "flex" }}>
                      <FormControlLabel
            value="No"
            control={<Radio style={{ color: "#595959" }} />}
            label="No"
          />
          <FormControlLabel
            value="Yes"
            control={<Radio style={{ color: "#595959" }} />}
            label="Yes"/>

                      </div>
                    </RadioGroup>
                  </Stack>

                  <Stack mt={1}>
                     <Typography variant="subtitle2" style={{ color: '#ff7424' }}>

                      Took a loan from the bank (Yes/No)
                      ಬ್ಯಾಂಕಿನಿಂದ ಸಾಲವನ್ನು ತೆಗೆದುಕೊಂಡಿದ್ದಾರೆ (Y/N)



                    </Typography>
                    <Typography>

                      {BankError ? <FormHelperText style={{ color: 'red' }}>{helperText}</FormHelperText> : null}{' '}
                    </Typography>
                    <RadioGroup
                      aria-labelledby="demo-radio-buttons-group-label"
                      name="radio-buttons-group"
                      value={sendData.bank_loan_a}
                      onChange={(e) => { const value = e.target.value; setSendData({ ...sendData, bank_loan_a: value }) }}

                    >
                      <div style={{ display: "flex" }}>
                      <FormControlLabel
            value="No"
            control={<Radio style={{ color: "#595959" }} />}
            label="No"
          />
          <FormControlLabel
            value="Yes"
            control={<Radio style={{ color: "#595959" }} />}
            label="Yes"/>
                      </div>
                    </RadioGroup>
                  </Stack>
                </CardContent>
              </Card>
             
<Card mt={1} style={{ marginTop: 10, borderRadius: 20 }}>
  <CardContent>
    <Typography variant="subtitle2" style={{ color: '#ff7424' }}>
      If you lost your income, how long could you manage without borrowing money? <br />
      ನೀವು ನಿಮ್ಮ ಆದಾಯವನ್ನು ಕಳೆದುಕೊಂಡರೆ, ಹಣವನ್ನು ಎರವಲು ಪಡೆಯದೆ ನೀವು ಎಷ್ಟು ದಿನ ನಿರ್ವಹಿಸಬಹುದು?
    </Typography>
    <Stack mt={2} mb={2}>
      <FormGroup>
        {timeDurations.map((item) => (
          <FormControlLabel
            key={item.id}
            control={
              <Checkbox
                color="primary"
                checked={sendData.income_loss_duration.includes(item.name)}
                onChange={(e) => {
                  const isChecked = e.target.checked;
                  const updatedSelections = isChecked
                    ? [...sendData.income_loss_duration, item.name]
                    : sendData.income_loss_duration.filter((entry) => entry !== item.name);

                  setSendData({
                    ...sendData,
                    income_loss_duration: updatedSelections,
                  });

                  console.log(updatedSelections); // To check the updated selections
                }}
              />
            }
            label={item.name}
          />
        ))}
      </FormGroup>
    </Stack>
  </CardContent>
</Card>
         
              <Card style={{ marginTop: 10, borderRadius: 20 }}>
                <CardContent>
                  <Typography variant="subtitle2" style={{ color: '#ff7424' }}>
                    Goals/ಗುರಿಗಳು
                  </Typography>
                  <Stack mt={2} mb={2}>
                    <TextField
                      id="twoquestions"
                      label="Your Answer"
                      onChange={(e) => {
                        setSendData({ ...sendData, goals: e?.target?.value });
                      }}
                      variant="outlined"
                      color="common"
                    />
                  </Stack>
                </CardContent>
              </Card>
              <Card style={{ marginTop: 10, borderRadius: 20 }}>
              <CardContent>
              <Stack mt={1}>
                 <Typography variant="subtitle2" style={{ color: '#ff7424' }}>Do you set short term and long-term financial goals and try to achieve them (Yes/No)
                  ನೀವು ಅಲ್ಪಾವಧಿಯ ಮತ್ತು ದೀರ್ಘಾವಧಿಯ ಹಣಕಾಸಿನ ಗುರಿಗಳನ್ನು ಹೊಂದುತ್ತೀರಾ ಮತ್ತು ಅವುಗಳನ್ನು ಸಾಧಿಸಲು ಪ್ರಯತ್ನಿಸುತ್ತೀರಾ (ಹೌದು /ಇಲ್ಲ)


                </Typography>
                <Select
            value={sendData.financial_goals_set}
            onChange={(event) => setSendData((prevData) => ({
              ...prevData,
              financial_goals_set: event.target.value,
            }))}
               variant="standard"
            style={{ marginTop: 10 }}
          >
            <MenuItem value="">
            
            </MenuItem>
            <MenuItem value="Yes">Yes</MenuItem>
            <MenuItem value="No">No</MenuItem>
          </Select>
             
              </Stack>
              </CardContent>
              </Card>
              <Card style={{ marginTop: 10, borderRadius: 20 }}>
                <CardContent>
                  <Typography variant="subtitle2" style={{ color: '#ff7424' }}>
                    Could you share a short-term goal that you have set for yourself? ………………………………………
                    ನೀವು  ನಿಮಗಾಗಿ  ಹೊಂದಿಸಿರುವ ಅಲ್ಪಾವಧಿಯ ಗುರಿಯನ್ನು ನೀವು ಹಂಚಿಕೊಳ್ಳಬಹುದೇ? ……………………………………………
                  </Typography>
                  <Stack mt={2} mb={2}>
                    <TextField
                      id="twoquestions"
                      label="Your Answer"
                      onChange={(e) => {
                        setSendData({ ...sendData, short_term_goal: e?.target?.value });
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
                    Could you share one long term goal that you have set for yourself? ……………………………………..
                    ನೀವು  ನಿಮಗಾಗಿ  ಹೊಂದಿಸಿದ ಒಂದು ದೀರ್ಘಾವಧಿಯ ಗುರಿಯನ್ನು ನೀವು ಹಂಚಿಕೊಳ್ಳಬಹುದೇ? ………………………………………….
                  </Typography>
                  <Stack mt={2} mb={2}>
                    <TextField
                      id="twoquestions"
                      label="Your Answer"
                      onChange={(e) => {
                        setSendData({ ...sendData, long_term_goal: e?.target?.value });
                      }}
                      variant="outlined"
                      color="common"
                    />
                  </Stack>
                </CardContent>
              </Card>

              <Card style={{ marginTop: 10, borderRadius: 20 }}>
                <CardContent>
                  <Typography variant="subtitle2" style={{ color: '#ff7424' ,textAlign:"center"  }}>
                    Enterprise/ಉದ್ಯಮ
                  </Typography>

                </CardContent>
              </Card>
              <Card mt={1} style={{ marginTop: 10, borderRadius: 20 }}>
  <CardContent>
              <Stack mt={1}>
                 <Typography variant="subtitle2" style={{ color: '#ff7424' }}>Does your family own/run a business or an enterprise?
                  ನಿಮ್ಮ ಕುಟುಂಬವು ವ್ಯಾಪಾರ ಅಥವಾ ಉದ್ಯಮವನ್ನು ಹೊಂದಿದೆಯೇ / ನಡೆಸುತ್ತಿದೆಯೇ?

                </Typography>
                <Select
            value={sendData.family_business}
            onChange={(event) => setSendData((prevData) => ({
              ...prevData,
              family_business: event.target.value,
            }))}
               variant="standard"
            style={{ marginTop: 10 }}
          >
            <MenuItem value="">
            
            </MenuItem>
            <MenuItem value="Yes">Yes</MenuItem>
            <MenuItem value="No">No</MenuItem>
    
          </Select>
             
              </Stack>
              </CardContent>
              </Card>

              {(sendData?.family_business =="No")?
               <Card mt={1} style={{ marginTop: 10, borderRadius: 20 }}>
               <CardContent>
                           <Stack mt={1}>
                              <Typography variant="subtitle2" style={{ color: '#ff7424' }}>If no, would you want to start an enterprise of your own?
                               ಇಲ್ಲದಿದ್ದರೆ, ನಿಮ್ಮದೇ ಆದ ಉದ್ಯಮವನ್ನು ಪ್ರಾರಂಭಿಸಲು ನೀವು ಬಯಸುವಿರಾ?
                             </Typography>
                             <Typography>
             
                               {BankError ? <FormHelperText style={{ color: 'red' }}>{helperText}</FormHelperText> : null}{' '}
                             </Typography>
                             <RadioGroup
                               aria-labelledby="demo-radio-buttons-group-label"
                               name="radio-buttons-group"
                               value={sendData.want_to_start_enterprise}
                               onChange={(e) => {const value = e.target.value;  setSendData({ ...sendData, want_to_start_enterprise: value }) }}
             
                             >
                               <div style={{ display: "flex" }}>
                               <FormControlLabel
                         value="No"
                         control={<Radio style={{ color: "#595959" }} />}
                         label="No"
                       />
                       <FormControlLabel
                         value="Yes"
                         control={<Radio style={{ color: "#595959" }} />}
                         label="Yes"/>
                               </div>
                             </RadioGroup>
                           </Stack>
                           </CardContent>
                           </Card>
                           :
                           null
            }
             
             {
(sendData?.family_business =="Yes")?
<>
<Card mt={1} style={{ marginTop: 10, borderRadius: 20 }}>
  
  <CardContent>
    <Typography variant="subtitle2" style={{ color: '#ff7424' }}>
      What is the type of the enterprise? <br />
      ಉದ್ಯಮದ ಪ್ರಕಾರ ಯಾವುದು?
    </Typography>
    <Stack mt={2} mb={2}>
      <FormGroup>
        {businessTypes.map((item) => (
          <FormControlLabel
            key={item.id}
            control={
              <Checkbox
                color="primary"
                checked={sendData.enterprise_type.includes(item.name)}
                onChange={(e) => {
                  const isChecked = e.target.checked;
                  const updatedSelections = isChecked
                    ? [...sendData.enterprise_type, item.name]
                    : sendData.enterprise_type.filter((entry) => entry !== item.name);

                  setSendData({
                    ...sendData,
                    enterprise_type: updatedSelections,
                  });

                  console.log(updatedSelections); // To check the updated selections
                }}
              />
            }
            label={item.name}
          />
        ))}
      </FormGroup>
    </Stack>
  </CardContent>
</Card>
<>

              
<Card style={{ marginTop: 10, borderRadius: 20 }}>
                <CardContent>
                  <Typography variant="subtitle2" style={{ color: '#ff7424' }}>
                    How many people are employed in the enterprise (paid workers) ………………..
                    ಎಂಟರ್‌ಪ್ರೈಸ್‌ನಲ್ಲಿ ಎಷ್ಟು ಜನರು ಕೆಲಸ ಮಾಡುತ್ತಿದ್ದಾರೆ (ಪಾವತಿಸಿದ ಕೆಲಸಗಾರರು) …………………….
                  </Typography>
                  <Stack mt={2} mb={2}>
                    <TextField
                      id="twoquestions"
                      label="Your Answer"
                      type="number"
                      onChange={(e) => {
                        setSendData({ ...sendData, num_employees_paid:parseInt(e?.target?.value)  });
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
                    What is the nature of your individual involvement in the enterprise/business?
                    ಉದ್ಯಮ/ವ್ಯವಹಾರದಲ್ಲಿ ನಿಮ್ಮ ವೈಯಕ್ತಿಕ ಒಳಗೊಳ್ಳುವಿಕೆಯ ಸ್ವರೂಪವೇನು?

                    <Card style={{ marginTop: 10, borderRadius: 20 }}>
                      <CardContent>
                        <Typography variant="subtitle2" style={{ color: '#ff7424' }}>
                        Are you named officially as one of the owners of the enterprise?
                        ನಿಮ್ಮ ಹೆಸರನ್ನು  ಯಾವುದಾದರೂ ಉದ್ಯಮದಲ್ಲಿ ಗುರುತಿಸಿ ಕೊಂಡಿದ್ದೀರಾ?

                        </Typography>
                        <Stack mt={2} mb={2}>
                          <TextField
                            id="twoquestions"
                            label="Your Answer"
                            onChange={(e) => {
                              setSendData({ ...sendData, financial_goals_set_c: e?.target?.value });
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
                          Do you work along with other paid workers in the enterprise?
                          ನಿಮ್ಮ ಉದ್ಯಮದ ಜೊತೆ ದಿನಗೂಲಿ ನೌಕರರ ಜೊತೆ ಕಾರ್ಯ ನಿರ್ವಹಿಸುತ್ತಿದ್ಧೀರ?

                        </Typography>
                        <Stack mt={2} mb={2}>
                          <TextField
                            id="twoquestions"
                            label="Your Answer"
                            onChange={(e) => {
                              setSendData({ ...sendData, collaborate_with_workers_c: e?.target?.value });
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
                          Are you responsible for managing the daily affairs of the enterprise?
                          ನೀವು ಉದ್ಯಮದ  ದೈನಂದಿನ ವ್ಯವಹಾರಗಳನ್ನು ನಿರ್ವಹಿಸಲು  ಜವಾಬ್ದಾರರಾಗಿದ್ದೀರಾ?
                        </Typography>
                        <Stack mt={2} mb={2}>
                          <TextField
                            id="twoquestions"
                            label="Your Answer"
                            onChange={(e) => {
                              setSendData({ ...sendData, daily_affairs_management_c: e?.target?.value });
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
                          Do you take important financial decisions?
                          ನೀವು ಪ್ರಮುಖ ಹಣಕಾಸಿನ ನಿರ್ಧಾರಗಳನ್ನು ತೆಗೆದುಕೊಳ್ಳುತ್ತೀರಾ?

                        </Typography>
                        <Stack mt={2} mb={2}>
                          <TextField
                            id="twoquestions"
                            label="Your Answer"
                            onChange={(e) => {
                              setSendData({ ...sendData, financial_decision_maker_c: e?.target?.value });
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

                          Do you maintain a daily book of accounts?
                          ನೀವು ದೈನಂದಿನ ಹಣಕಾಸಿನ ಖಾತೆಗಳ ಪುಸ್ತಕವನ್ನು ನಿರ್ವಹಿಸುತ್ತೀರಾ?
                        </Typography>
                        <Stack mt={2} mb={2}>
                          <TextField
                            id="twoquestions"
                            label="Your Answer"
                            onChange={(e) => {
                              setSendData({ ...sendData, daily_accounts_book_c: e?.target?.value });
                            }}
                            variant="outlined"
                            color="common"
                          />
                        </Stack>
                      </CardContent>
                    </Card>
                  </Typography>

                </CardContent>
              </Card>
              <Card style={{ marginTop: 10, borderRadius: 20 }}>
                <CardContent>
                  <Typography variant="subtitle2" style={{ color: '#ff7424' }}>
                    What is the monthly income of the enterprise?  ಉದ್ಯಮದ ಮಾಸಿಕ ಆದಾಯ ಎಷ್ಟು?
                  </Typography>
                  <Stack mt={2} mb={2}>
                    <TextField
                      id="twoquestions"
                      label="Your Answer"
                      type="number"
                      onChange={(e) => {
                        setSendData({ ...sendData, enterprise_monthly_income: parseInt(e?.target?.value) });
                      }}
                      variant="outlined"
                      color="common"
                    />
                  </Stack>
                </CardContent>
              </Card>
              <Card mt={1} style={{ marginTop: 10, borderRadius: 20 }}>
  <CardContent>
              <Stack mt={1}>
                <Typography variant="subtitle2" style={{ color: '#ff7424' }}>  Is the enterprise currently making profits?  ಉದ್ಯಮವು ಪ್ರಸ್ತುತ ಲಾಭ ಗಳಿಸುತ್ತಿದೆಯೇ?
                 

                </Typography>
                <Select
            value={sendData.enterprise_is_profitable}
            onChange={(event) => setSendData((prevData) => ({
              ...prevData,
              enterprise_is_profitable: event.target.value,
            }))}
               variant="standard"
            style={{ marginTop: 10 }}
          >
            <MenuItem value="">
            
            </MenuItem>
            <MenuItem value="Yes">Yes</MenuItem>
            <MenuItem value="No">No</MenuItem>
          </Select>
              
              </Stack>
              </CardContent>
              </Card>
              <Card style={{ marginTop: 10, borderRadius: 20 }}>
                <CardContent>
                  <Typography variant="subtitle2" style={{ color: '#ff7424' }}>
                    What is your profit per month?  ತಿಂಗಳಿಗೆ ನಿಮ್ಮ ಲಾಭ ಎಷ್ಟು?
                  </Typography>
                  <Stack mt={2} mb={2}>
                    <TextField
                      id="twoquestions"
                      label="Your Answer"
                      type="number"
                      onChange={(e) => {
                        setSendData({ ...sendData, monthly_profit: parseInt(e?.target?.value) });
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
                    Do you want start an enterprise of your own?  ನಿಮ್ಮ ಸ್ವಂತ ಉದ್ಯಮವನ್ನು ಪ್ರಾರಂಭಿಸಲು ನೀವು ಬಯಸುವಿರಾ?
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
              </Card> */}
             
              </>

</>
:null
             }


             {

(sendData?.want_to_start_enterprise =="No")?

<>
<Card style={{ marginTop: 10, borderRadius: 20 }}>
                <CardContent>
                  <Typography variant="subtitle2" style={{ color: '#ff7424' }}>
                    Do you have a say in making decisions on:  ನಿರ್ಧಾರಗಳನ್ನು ತೆಗೆದುಕೊಳ್ಳುವಲ್ಲಿ ನಿಮ್ಮ ಅಭಿಪ್ರಾಯವಿದೆಯೇ:
                  </Typography>
                  <Stack mt={1}>
                     <Typography variant="subtitle2" style={{ color: '#ff7424' }}>Education of children (Yes/No)  ಮಕ್ಕಳ ಶಿಕ್ಷಣ (ಹೌದು/ಇಲ್ಲ)
                    </Typography>
                    <Typography>

                      {BankError ? <FormHelperText style={{ color: 'red' }}>{helperText}</FormHelperText> : null}{' '}
                    </Typography>
                    <RadioGroup
                      aria-labelledby="demo-radio-buttons-group-label"
                      name="radio-buttons-group"
                      value={sendData.children_education_b}
                      onChange={(e) => {const value = e.target.value;  setSendData({ ...sendData, children_education_b: value }) }}

                    >
                      <div style={{ display: "flex" }}>
                      <FormControlLabel
            value="No"
            control={<Radio style={{ color: "#595959" }} />}
            label="No"
          />
          <FormControlLabel
            value="Yes"
            control={<Radio style={{ color: "#595959" }} />}
            label="Yes"/>
                      </div>
                    </RadioGroup>
                  </Stack>
                  <Stack mt={1}>
                     <Typography variant="subtitle2" style={{ color: '#ff7424' }}>Access to health services (Yes/No)   ಆರೋಗ್ಯ ಸೇವೆಗಳಿಗೆ ಪ್ರವೇಶ (ಹೌದು/ಇಲ್ಲ)
                    </Typography>
                    <Typography>

                      {BankError ? <FormHelperText style={{ color: 'red' }}>{helperText}</FormHelperText> : null}{' '}
                    </Typography>
                    <RadioGroup
                      aria-labelledby="demo-radio-buttons-group-label"
                      name="radio-buttons-group"
                      value={sendData.health_services_access_b}
                      onChange={(e) => { const value = e.target.value; setSendData({ ...sendData, health_services_access_b: value }) }}

                    >
                      <div style={{ display: "flex" }}>
                      <FormControlLabel
            value="No"
            control={<Radio style={{ color: "#595959" }} />}
            label="No"
          />
          <FormControlLabel
            value="Yes"
            control={<Radio style={{ color: "#595959" }} />}
            label="Yes"/>
                      </div>
                    </RadioGroup>
                  </Stack>
                  <Stack mt={1}>
                     <Typography variant="subtitle2" style={{ color: '#ff7424' }}>Taking credit (Yes/No)     ಸಾಲ ತೆಗೆದುಕೊಳ್ಳುವುದು (ಹೌದು/ಇಲ್ಲ)

                    </Typography>
                    <Typography>

                      {BankError ? <FormHelperText style={{ color: 'red' }}>{helperText}</FormHelperText> : null}{' '}
                    </Typography>
                    <RadioGroup
                      aria-labelledby="demo-radio-buttons-group-label"
                      name="radio-buttons-group"
                      value={sendData.taking_credit_b}
                      onChange={(e) => {const value = e.target.value;  setSendData({ ...sendData, taking_credit_b: value }) }}

                    >
                      <div style={{ display: "flex" }}>
                      <FormControlLabel
            value="No"
            control={<Radio style={{ color: "#595959" }} />}
            label="No"
          />
          <FormControlLabel
            value="Yes"
            control={<Radio style={{ color: "#595959" }} />}
            label="Yes"/>
                      </div>
                    </RadioGroup>
                  </Stack>
                  <Stack mt={1}>
                     <Typography variant="subtitle2" style={{ color: '#ff7424' }}>Saving money (Yes/No)   ಹಣ ಉಳಿತಾಯ (ಹೌದು/ಇಲ್ಲ)
                    </Typography>
                    <Typography>

                      {BankError ? <FormHelperText style={{ color: 'red' }}>{helperText}</FormHelperText> : null}{' '}
                    </Typography>
                    <RadioGroup
                      aria-labelledby="demo-radio-buttons-group-label"
                      name="radio-buttons-group"
                      value={sendData.saving_money_b}
                      onChange={(e) => {const value = e.target.value;  setSendData({ ...sendData, saving_money_b: value }) }}

                    >
                      <div style={{ display: "flex" }}>
                      <FormControlLabel
            value="No"
            control={<Radio style={{ color: "#595959" }} />}
            label="No"
          />
          <FormControlLabel
            value="Yes"
            control={<Radio style={{ color: "#595959" }} />}
            label="Yes"/>
                      </div>
                    </RadioGroup>
                  </Stack>
                  <Stack mt={1}>
      <Typography style={{ fontWeight: 500 }}>
        Asset purchase (Yes/No) ಆಸ್ತಿ ಖರೀದಿ (ಹೌದು/ಇಲ್ಲ)
      </Typography>
      <Typography>
        {BankError ? <FormHelperText style={{ color: 'red' }}>{helperText}</FormHelperText> : null}{' '}
      </Typography>
      <RadioGroup
        aria-labelledby="demo-radio-buttons-group-label"
        name="radio-buttons-group"
        value={sendData.asset_purchase_b} // Bind the value to "Yes" or "No"
        onChange={(e) => { 
          const value = e.target.value; 
          setSendData({ ...sendData, asset_purchase_b: value });
        }}
      >
        <div style={{ display: "flex" }}>
          <FormControlLabel
            value="No"
            control={<Radio style={{ color: "#595959" }} />}
            label="No"
          />
          <FormControlLabel
            value="Yes"
            control={<Radio style={{ color: "#595959" }} />}
            label="Yes"
          />
        </div>
      </RadioGroup>
    </Stack>
                  <Stack mt={1}>
                     <Typography variant="subtitle2" style={{ color: '#ff7424' }}>
                      Day-to-day expenditure (Yes/No)    ದಿನನಿತ್ಯದ ಖರ್ಚು (ಹೌದು/ಇಲ್ಲ)
                    </Typography>
                    <Typography>

                      {BankError ? <FormHelperText style={{ color: 'red' }}>{helperText}</FormHelperText> : null}{' '}
                    </Typography>
                    <RadioGroup
                      aria-labelledby="demo-radio-buttons-group-label"
                      name="radio-buttons-group"
                      value={sendData.daily_expenditure_b}
                      onChange={(e) => {const value = e.target.value;  setSendData({ ...sendData, daily_expenditure_b: value }) }}

                    >
                      <div style={{ display: "flex" }}>
                      <FormControlLabel
            value="No"
            control={<Radio style={{ color: "#595959" }} />}
            label="No"
          />
          <FormControlLabel
            value="Yes"
            control={<Radio style={{ color: "#595959" }} />}
            label="Yes"/>
                      </div>
                    </RadioGroup>
                  </Stack>
                  <Stack mt={1}>
                     <Typography variant="subtitle2" style={{ color: '#ff7424' }}>Day-to-day running an enterprise (Yes/No)    ದಿನದಿಂದ ದಿನಕ್ಕೆ ಉದ್ಯಮವನ್ನು ನಡೆಸುವುದು (ಹೌದು/ಇಲ್ಲ)
                    </Typography>
                    <Typography>

                      {BankError ? <FormHelperText style={{ color: 'red' }}>{helperText}</FormHelperText> : null}{' '}
                    </Typography>
                    <RadioGroup
                      aria-labelledby="demo-radio-buttons-group-label"
                      name="radio-buttons-group"
                      value={sendData.operational_management_b}
                      onChange={(e) => { const value = e.target.value; setSendData({ ...sendData, operational_management_b: value }) }}

                    >
                      <div style={{ display: "flex" }}>
                      <FormControlLabel
            value="No"
            control={<Radio style={{ color: "#595959" }} />}
            label="No"
          />
          <FormControlLabel
            value="Yes"
            control={<Radio style={{ color: "#595959" }} />}
            label="Yes"/>
                      </div>
                    </RadioGroup>
                  </Stack>
                  <Stack mt={1}>
                     <Typography variant="subtitle2" style={{ color: '#ff7424' }}>Procuring inputs for livelihood activity (Yes/No)
                      ಜೀವನೋಪಾಯದ ಚಟುವಟಿಕೆಗಾಗಿ ಒಳಹರಿವು (ಹೌದು/ಇಲ್ಲ)
                    </Typography>
                    <Typography>

                      {BankError ? <FormHelperText style={{ color: 'red' }}>{helperText}</FormHelperText> : null}{' '}
                    </Typography>
                    <RadioGroup
                      aria-labelledby="demo-radio-buttons-group-label"
                      name="radio-buttons-group"
                      value={sendData.input_procuring_b}
                      onChange={(e) => { const value = e.target.value; setSendData({ ...sendData, input_procuring_b: value }) }}

                    >
                      <div style={{ display: "flex" }}>
                      <FormControlLabel
            value="No"
            control={<Radio style={{ color: "#595959" }} />}
            label="No"
          />
          <FormControlLabel
            value="Yes"
            control={<Radio style={{ color: "#595959" }} />}
            label="Yes"/>
                      </div>
                    </RadioGroup>
                  </Stack>
                  <Stack mt={1}>
                     <Typography variant="subtitle2" style={{ color: '#ff7424' }}>Selling produce from livelihood activity (Yes/No)
                      ಜೀವನೋಪಾಯದ ಚಟುವಟಿಕೆಯಿಂದ ಉತ್ಪನ್ನಗಳನ್ನು ಮಾರಾಟ ಮಾಡುವುದು (ಹೌದು/ಇಲ್ಲ)
                    </Typography>
                    <Typography>

                      {BankError ? <FormHelperText style={{ color: 'red' }}>{helperText}</FormHelperText> : null}{' '}
                    </Typography>
                    <RadioGroup
                      aria-labelledby="demo-radio-buttons-group-label"
                      name="radio-buttons-group"
                      value={sendData.selling_produce_b}
                      onChange={(e) => {const value = e.target.value;  setSendData({ ...sendData, selling_produce_b: value }) }}

                    >
                      <div style={{ display: "flex" }}>
                      <FormControlLabel
            value="No"
            control={<Radio style={{ color: "#595959" }} />}
            label="No"
          />
          <FormControlLabel
            value="Yes"
            control={<Radio style={{ color: "#595959" }} />}
            label="Yes"/>
                      </div>
                    </RadioGroup>
                  </Stack>
                  <Stack mt={1}>
                     <Typography variant="subtitle2" style={{ color: '#ff7424' }}>Taking benefit of government schemes (Yes/No)
                      ಸರ್ಕಾರಿ ಯೋಜನೆಗಳ ಲಾಭವನ್ನು ಪಡೆದುಕೊಳ್ಳುವುದು (ಹೌದು/ಇಲ್ಲ)
                    </Typography>
                    <Typography>

                      {BankError ? <FormHelperText style={{ color: 'red' }}>{helperText}</FormHelperText> : null}{' '}
                    </Typography>
                    <RadioGroup
                      aria-labelledby="demo-radio-buttons-group-label"
                      name="radio-buttons-group"
                      value={sendData.gov_scheme_benefit_b}
                      onChange={(e) => { const value = e.target.value; setSendData({ ...sendData, gov_scheme_benefit_b: value }) }}

                    >
                      <div style={{ display: "flex" }}>
                      <FormControlLabel
            value="No"
            control={<Radio style={{ color: "#595959" }} />}
            label="No"
          />
          <FormControlLabel
            value="Yes"
            control={<Radio style={{ color: "#595959" }} />}
            label="Yes"/>
                      </div>
                    </RadioGroup>
                  </Stack>
                </CardContent>
              </Card>
              <Card style={{ marginTop: 10, borderRadius: 20 }}>
                <CardContent>
                  <Typography variant="subtitle2" style={{ color: '#ff7424' }}>

                    Menstrual Hygiene and Environment  ಮುಟ್ಟಿನ ನೈರ್ಮಲ್ಯ ಮತ್ತು ಪರಿಸರ
                  </Typography>
                  <Stack mt={2} mb={2}>
                    <TextField
                      id="twoquestions"
                      label="Your Answer"
                      onChange={(e) => {
                        setSendData({ ...sendData, menstrual_hygiene_env: e?.target?.value });
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
      According to you, state whether the following practices are environment friendly or not? <br />
      ನಿಮ್ಮ ಪ್ರಕಾರ, ಈ ಕೆಳಗಿನ ಅಭ್ಯಾಸಗಳು ಪರಿಸರ ಸ್ನೇಹಿ ಅಥವಾ ಇಲ್ಲವೇ ಎಂಬುದನ್ನು ತಿಳಿಸಿ?
    </Typography>
    <Stack mt={2} mb={2}>
      <FormGroup>
        {environmentalPractices.map((item) => (
          <FormControlLabel
            key={item.id}
            control={
              <Checkbox
                color="primary"
                checked={sendData.env_friendly_practices.includes(item.name)}
                onChange={(e) => {
                  const isChecked = e.target.checked;
                  const updatedSelections = isChecked
                    ? [...sendData.env_friendly_practices, item.name]
                    : sendData.env_friendly_practices.filter((entry) => entry !== item.name);

                  setSendData({
                    ...sendData,
                    env_friendly_practices: updatedSelections,
                  });

                  console.log(updatedSelections); // To check the updated selections
                }}
              />
            }
            label={item.name}
          />
        ))}
      </FormGroup>
    </Stack>
  </CardContent>
</Card>

<Card mt={1} style={{ marginTop: 10, borderRadius: 20 }}>
  <CardContent>
    <Typography variant="subtitle2" style={{ color: '#ff7424' }}>
      What menstrual product do you use? <br />
      ನೀವು ಯಾವ ಮುಟ್ಟಿನ ಉತ್ಪನ್ನವನ್ನು ಬಳಸುತ್ತೀರಿ?
    </Typography>
    <Stack mt={2} mb={2}>
      <FormGroup>
        {hygieneProducts.map((item) => (
          <FormControlLabel
            key={item.id}
            control={
              <Checkbox
                color="primary"
                checked={sendData.menstrual_product_used.includes(item.name)}
                onChange={(e) => {
                  const isChecked = e.target.checked;
                  const updatedSelections = isChecked
                    ? [...sendData.menstrual_product_used, item.name]
                    : sendData.menstrual_product_used.filter((entry) => entry !== item.name);

                  setSendData({
                    ...sendData,
                    menstrual_product_used: updatedSelections,
                  });

                  console.log(updatedSelections); // To check the updated selections
                }}
              />
            }
            label={item.name}
          />
        ))}
      </FormGroup>
    </Stack>
  </CardContent>
</Card>

          
<Card mt={1} style={{ marginTop: 10, borderRadius: 20 }}>
  <CardContent>
    <Typography variant="subtitle2" style={{ color: '#ff7424' }}>
      How do you dispose of your menstrual product? <br />
      ನೀವು ನಿಮ್ಮ ಮುಟ್ಟಿನ ಉತ್ಪನ್ನವನ್ನು ಹೇಗೆ ವಿಲೇವಾರಿ ಮಾಡುತ್ತೀರಿ?
    </Typography>
    <Stack mt={2} mb={2}>
      <FormGroup>
        {actions.map((item) => (
          <FormControlLabel
            key={item.id}
            control={
              <Checkbox
                color="primary"
                checked={sendData.menstrual_disposal_method.includes(item.name)}
                onChange={(e) => {
                  const isChecked = e.target.checked;
                  const updatedSelections = isChecked
                    ? [...sendData.menstrual_disposal_method, item.name]
                    : sendData.menstrual_disposal_method.filter((entry) => entry !== item.name);

                  setSendData({
                    ...sendData,
                    menstrual_disposal_method: updatedSelections,
                  });

                  console.log(updatedSelections); // To check the updated selections
                }}
              />
            }
            label={item.name}
          />
        ))}
      </FormGroup>
    </Stack>
  </CardContent>
</Card>
            
<Card mt={1} style={{ marginTop: 10, borderRadius: 20 }}>
  <CardContent>
    <Typography variant="subtitle2" style={{ color: '#ff7424' }}>
      What cooking fuel do you use at home? <br />
      ನೀವು ಮನೆಯಲ್ಲಿ ಯಾವ ಅಡುಗೆ ಇಂಧನವನ್ನು ಬಳಸುತ್ತೀರಿ?
    </Typography>
    <Stack mt={2} mb={2}>
      <FormGroup>
        {cookingMethods.map((item) => (
          <FormControlLabel
            key={item.id}
            control={
              <Checkbox
                color="primary"
                checked={sendData.cooking_fuel_type.includes(item.name)}
                onChange={(e) => {
                  const isChecked = e.target.checked;
                  const updatedSelections = isChecked
                    ? [...sendData.cooking_fuel_type, item.name]
                    : sendData.cooking_fuel_type.filter((entry) => entry !== item.name);

                  setSendData({
                    ...sendData,
                    cooking_fuel_type: updatedSelections,
                  });

                  console.log(updatedSelections); // To check the updated selections
                }}
              />
            }
            label={item.name}
          />
        ))}
      </FormGroup>
    </Stack>
  </CardContent>
</Card>
</>
:
null
             }

             {/* {
              (sendData?.want_to_start_enterprise =="Yes")?
             
              :
              null
             } */}

            </DialogContentText></DialogContent>
        </form>
      </Dialog>
    </div>
  );
}