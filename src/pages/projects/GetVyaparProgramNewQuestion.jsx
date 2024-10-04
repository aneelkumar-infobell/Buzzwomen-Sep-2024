import * as React from 'react';
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
} from '../projects/Components/green/GreenSurveySelectOptions';
import TextInput from 'src/components/TextInput';
import SelectInput from 'src/components/SelectInput';
import MultipleChoice from 'src/components/MultipleChoice';
import { Grid, Card, CardContent } from '@mui/material';
import Typography from '@mui/material/Typography';
import { useState } from 'react';
import { useEffect } from 'react';
import { baseURL } from 'src/utils/api';
import { useAuth } from 'src/AuthContext';

import axios from 'axios';
const GetVyaparProgramNewQuestion = ({ sendData, handleInputChange, handleResources }) => {
    const { apikey } = useAuth();
    const [district, setDistrict] = useState([]);
    const [taluk, setTaluk] = useState([]);
    const [village, setVillage] = useState([]);
    const [loader, setLoader] = useState(true);
  
    useEffect(() => {
        getState();
    }, []);
    const getState = async (id) => {
        var data = JSON.stringify({
            country_id: '1',
            state_id: JSON.stringify(3),
        });
        var config = {
            method: 'post',
            url: baseURL + 'getLocation',
            headers: {
                'Content-Type': 'application/json',
                Authorization: `${apikey}`,
            },
            data: data,
        };
        axios(config)
            .then(function (response) {
                setDistrict(response.data.list);
            })
            .catch(function (error) {
                // console.log(error);
            });
    };
    const getDistrict = async (district, districtId) => {
        var data = JSON.stringify({
            country_id: '1',
            state_id: JSON.stringify(3),
            district_id: JSON.stringify(districtId),
            district_name: district,
        });
        var config = {
            method: 'post',
            url: baseURL + 'getLocation',
            headers: {
                'Content-Type': 'application/json',
                Authorization: `${apikey}`,
            },
            data: data,
        };
        axios(config)
            .then(function (response) {
                setTaluk(response.data.list);
            })
            .catch(function (error) {
                //  console.log(error);
            });
    };
    const villageList = async (taluk_id) => {
        var data = JSON.stringify({
            taluk_id: parseInt(taluk_id),
            search: '',
        });
        var config = {
            method: 'post',
            url: baseURL + 'getVillageList',
            headers: {
                'Content-Type': 'application/json',
                Authorization: `${apikey}`,
            },
            data: data,
        };
        axios(config)
            .then(function (response) {
                setVillage(response.data.list);
            })
            .catch(function (error) {
                // console.log(error);
            });
    };
    return (
        <Grid>
            <Card>
                <CardContent>
                    <TextInput
                        id="gf_id"
                        placeholder="Your Answer"
                        label="Field associate Name ಕ್ಷೇತ್ರದ ಸಹವರ್ತಿ ಹೆಸರು
"
                        required
                        disabled
                        type="text"
                        name="gf_id"
                        onChange={handleInputChange}
                        value={sendData?.gf_id}
                    />
                   
                    <TextInput
                        id="name_of_the_vyapari"
                        placeholder="Your Answer"
                        label="Green Motivator name"
                        kannadaLabel="ಹಸಿರು ಪ್ರೇರಕಿಯ ಹೆಸರು"
                        required
                        disabled
                        type="email"
                        name="name_of_the_vyapari"
                        onChange={handleInputChange}
                        value={sendData?.name_of_the_vyapari}
                    />
                    <TextInput
                    //not done 
                        id="district"
                        name="district"
                        label="Districts name"
                        kannadaLabel="ಜಿಲ್ಲೆಗಳ ಹೆಸರು"
                        required
                        disabled
                        onChange={handleInputChange}
                        value={sendData?.district}
                    />
                    <TextInput
                        id="taluk"
                        name="taluk"
                        label="Taluks name"
                        kannadaLabel="ತಾಲೂಕು ಹೆಸರು"
                        required
                        disabled
                        onChange={handleInputChange}
                        value={sendData?.taluk}
                    />

                    <TextInput
                        id="village_id"
                        name="village_id"
                        label="Village name"
                        kannadaLabel="ಗ್ರಾಮದ ಹೆಸರು"
                        required
                        disabled
                        onChange={handleInputChange}
                        value={sendData?.village_id}
                    />
                    <TextInput
                        id="gram_panchayat"
                        name="gram_panchayat"
                        label="Gram Panchayat name"
                        kannadaLabel="ಗ್ರಾಮ ಪಂಚಾಯತ ಹೆಸರು"
                        required
                        disabled
                        onChange={handleInputChange}
                        value={sendData?.gram_panchayat}
                    />
                    <TextInput
                        id="contact_number"
                        name="contact_number"
                        label="Contact numbe"
                        kannadaLabel="ಸಂಪರ್ಕ ಸಂಖ್ಯೆ"
                        type="number"
                        required
                        disabled
                        inputProps={{ inputMode: 'numeric', pattern: '[0-9]*', maxLength: 2 }}
                        placeholder="Your Answer"
                        onChange={handleInputChange}
                        value={sendData.contact_number}
                    />
                    <TextInput
                        id="number_of_beehives_participated"
                        name="number_of_beehives_participated"
                        label="How many beehives have you participated in? "
                        kannadaLabel="ನೀವು ಎಷ್ಟು ಜೇನುಗೂಡು ಸಭೆಗಳಲ್ಲಿ ಭಾಗವಹಿಸಿದ್ದೀರಿ?"
                        type="number"
                        required
                        disabled
                        inputProps={{ inputMode: 'numeric', pattern: '[0-9]*', maxLength: 5 }}
                        placeholder="Your Answer"
                        onChange={handleInputChange}
                        value={sendData.number_of_beehives_participated}
                    />
                    <TextInput
                        id="total_household_members"
                        name="total_household_members"
                        label="Total number of members in your household"
                        kannadaLabel="ನಿಮ್ಮ ಮನೆಯ ಸದಸ್ಯರ ಒಟ್ಟು ಸಂಖ್ಯೆ"
                        type="number"
                        required
                        disabled
                        inputProps={{ inputMode: 'numeric', pattern: '[0-9]*', maxLength: 2 }}
                        placeholder="Your Answer"
                        onChange={handleInputChange}
                        value={sendData.total_household_members}
                    />

                    <TextInput
                        id="house"
                        name="house"
                        label="House"
                        kannadaLabel="ಮನೆ"
                        required
                        disabled
                        onChange={handleInputChange}
                        value={sendData?.house}
                        options={house}
                    />
               
                    <TextInput
                        id="ration_card"
                        name="ration_card"
                        label="Ration card"
                        kannadaLabel="ಪಡಿತರ ಚೀಟಿ"
                        required
                        disabled
                        onChange={handleInputChange}
                        value={sendData?.ration_card}
                        options={rationCard}
                    />
                    <TextInput
                        id="cast"
                        name="cast"
                        label="Caste Category"
                        kannadaLabel="ಜಾತಿ ವರ್ಗ"
                        required
                        disabled
                        onChange={handleInputChange}
                        value={sendData?.cast}
                        options={casteCategory}
                    />
                    <TextInput
                        id="age"
                        name="age"
                        label="Age  ವಯಸ್ಸು"
                        type="number"
                        required
                        disabled
                        inputProps={{ inputMode: 'numeric', pattern: '[0-9]*', maxLength: 2 }}
                        placeholder="Your Answer"
                        onChange={handleInputChange}
                        value={sendData.age}
                    />
                    <TextInput
                        id="education"
                        name="education"
                        label="Education"
                        kannadaLabel="ಶಿಕ್ಷಣ"
                        required
                        disabled
                        onChange={handleInputChange}
                        value={sendData?.education}
                    // options={education}
                    />
            



                    <TextInput
                        id="marital_status"
                        name="marital_status"
                        label="Marital Status"
                        kannadaLabel="ವೈವಾಹಿಕ ಸ್ಥಿತಿ"
                        required
                        disabled
                        onChange={handleInputChange}
                        value={sendData?.marital_status}
                        options={maritalStatus}
                    />
                    <TextInput
                        id="primary_occupation"
                        name="primary_occupation"
                        label="Current Economic Activity - Primary Occupation of the Household
ಪ್ರಸ್ತು"
                        type="text"
                        required
                        disabled
                        placeholder="Your Answer"
                        onChange={handleInputChange}
                        value={sendData.primary_occupation_household}
                    />
                    <TextInput
                        id="secondary_occupation"
                        name="secondary_occupation"
                        label="Secondary Occupation of the Household
ಕುಟುಂಬದ ದ್ವಿತೀಯ ಉದ್ಯೋಗ"
                        type="text"
                        required
                        disabled
                        placeholder="Your Answer"
                        onChange={handleInputChange}
                        value={sendData.secondary_occupation_household}
                    />

                  
                    <TextInput
                        id="womens_occupation"
                        name="womens_occupation"
                        label="Women's Occupation"
                        kannadaLabel="ಮಹಿಳಾ ಉದ್ಯೋಗ"
                        required
                        disabled
                        onChange={handleInputChange}
                        value={sendData?.womens_occupation}
                        options={WomensOccupation}
                    />
                    <TextInput
                        id="monthly_expenditure"
                        name="monthly_expenditure"
                        label="Monthly household expenditure (in Rs) ಮಾಸಿಕ ಮನೆಯ ಖರ್ಚು (ರೂ.ಗಳಲ್ಲಿ)"
                        type="number"
                        required
                        disabled
                        inputProps={{ inputMode: 'numeric', maxLength: 100 }}
                        placeholder="Your Answer"
                        onChange={handleInputChange}
                        value={sendData.monthly_expenditure}
                    />
                    <TextInput
                        id="mobile_type"
                        name="mobile_type"
                        label="Phone type"
                        kannadaLabel="ಫೋನ್ ಪ್ರಕಾರ"
                        required
                        disabled
                        onChange={handleInputChange}
                        value={sendData?.mobile_type}
                        options={phoneType}
                    />
                    <TextInput
                        id="personal_smartphone"
                        name="personal_smartphone"
                        label="Do you have a smartphone that you individually use and not share with others?
ನೀವು ಪ್ರತ್ಯೇಕವಾಗಿ ಬಳಸುವ ಮತ್ತು ಇತರರೊಂದಿಗೆ ಹಂಚಿಕೊಳ್ಳದ ಸ್ಮಾರ್ಟ್ ಫೋನ್ ಅನ್ನು ನೀವು ಹೊಂದಿದ್ದೀರಾ?"

                        required
                        disabled
                        onChange={handleInputChange}
                        value={sendData?.personal_smartphone}
                    // options={phoneType}
                    />

                    <TextInput
                        id="reason_for_not_having_smartphone"
                        name="reason_for_not_having_smartphone"
                        label="If no , Reason for not having a smartphone
ಇಲ್ಲದಿದ್ದರೆ, ಸ್ಮಾರ್ಟ್ ಫೋನ್ ಇಲ್ಲದಿರುವುದಕ್ಕೆ ಕಾರಣ"
                        type="number"
                        required
                        disabled
                        placeholder="Your Answer"
                        onChange={handleInputChange}
                        value={sendData.reason_for_not_having_smartphone}
                    />
                    <TextInput
                        id="has_bank_account"
                        name="has_bank_account"
                        label="Do you have bank account ನೀವು ಬ್ಯಾಂಕ್ ಖಾತೆ ಹೊಂದಿದ್ದೀರಾ"
                        type="number"
                        required
                        disabled
                        placeholder="Your Answer"
                        onChange={handleInputChange}
                        value={sendData.has_bank_account}
                    />
                    <TextInput
                        id="uses_upi"
                        name="uses_upi"
                        label="Do you use UPI ನೀವು UPI ಬಳಸುತ್ತೀರಾ
" type="number"
                        required
                        disabled
                        placeholder="Your Answer"
                        onChange={handleInputChange}
                        value={sendData.uses_upi}
                    />

                    <TextInput
                        id="underwent_skill_development_program"
                        name="underwent_skill_development_program"
                        label="Have you undergone any skill development program?
ನೀವು ಯಾವುದಾದರೂ ಕೌಶಲ್ಯ ಅಭಿವೃದ್ಧಿ ಕಾರ್ಯಕ್ರಮಕ್ಕೆ ಭಾವವಾಹಿಸಿದ್ಧಿರ ?" type="number"
                        required
                        disabled
                        placeholder="Your Answer"
                        onChange={handleInputChange}
                        value={sendData.underwent_skill_development_program}
                    />

                    <TextInput
                        id="skills_gained_from_program"
                        name="skills_gained_from_program"
                        label="if Yes, what skills have you gained?
ಹೌದು ಎಂದಾದರೆ, ನೀವು ಯಾವ ಕೌಶಲ್ಯಗಳನ್ನು ಗಳಿಸಿದ್ದೀರಿ?" type="number"
                        required
                        disabled
                        placeholder="Your Answer"
                        onChange={handleInputChange}
                        value={sendData.skills_gained_from_program}
                    />

                    <TextInput
                        id="enterprise_status"
                        name="enterprise_status"
                        label=" 
 	
What is the status of your enterprise? ನಿಮ್ಮ ಉದ್ಯಮದ ಸ್ಥಿತಿ ಏನು?"
                        type="number"
                        required
                        disabled
                        placeholder="Your Answer"
                        onChange={handleInputChange}
                        value={sendData.enterprise_status}
                    />

                    <TextInput

                    //doubt
                        id="enterprise_status"
                        name="enterprise_status"
                        label=" 
 	
What kind of enterprise do you run?
ನೀವು ಯಾವ ರೀತಿಯ ಉದ್ಯಮವನ್ನು ನಡೆಸುತ್ತೀರಿ? " type="number"
                        required
                        disabled
                        placeholder="Your Answer"
                        onChange={handleInputChange}
                        value={sendData.enterprise_status}
                    />

                    <TextInput
                        id="run_enterprise_independently"
                        name="run_enterprise_independently"
                        label="Are you running the enterprise on your own?
ನೀವು ಸ್ವಂತವಾಗಿ ಉದ್ಯಮವನ್ನು ನಡೆಸುತ್ತಿದ್ದೀರಾ?" type="number"
                        required
                        disabled
                        placeholder="Your Answer"
                        onChange={handleInputChange}
                        value={sendData.run_enterprise_independently}
                    />

                    <TextInput
                        id="average_monthly_income_enterprise"
                        name="average_monthly_income_enterprise"
                        label="What is the average monthly income of your enterprise? (Rs)
ನಿಮ್ಮ ಉದ್ಯಮದ ಸರಾಸರಿ ಮಾಸಿಕ ಆದಾಯ ಎಷ್ಟು? (ರೂ)" type="number"
                        required
                        disabled
                        placeholder="Your Answer"
                        onChange={handleInputChange}
                        value={sendData.average_monthly_income_enterprise}
                    />


                    <TextInput
                        id="average_monthly_profit_enterprise"
                        name="average_monthly_profit_enterprise"
                        label=" 
 	
What is the average monthly profit of your enterprise? (Rs)
ನಿಮ್ಮ ಉದ್ಯಮದ ಸರಾಸರಿ ಮಾಸಿಕ ಲಾಭ ಎಷ್ಟು? (ರೂ)" type="number"
                        required
                        disabled
                        placeholder="Your Answer"
                        onChange={handleInputChange}
                        value={sendData.average_monthly_profit_enterprise}
                    />


                    <TextInput
                        id="desired_monthly_income"
                        name="desired_monthly_income"
                        label="How much monthly income would you like to ideally earn?
ನೀವು ಆದರ್ಶಪ್ರಾಯವಾಗಿ ಎಷ್ಟು ಮಾಸಿಕ ಆದಾಯವನ್ನುಗಳಿಸಲು ಬಯಸುತ್ತೀರಿ?" type="number"
                        required
                        disabled
                        placeholder="Your Answer"
                        onChange={handleInputChange}
                        value={sendData.desired_monthly_income}
                    />

                    <TextInput
                        id="initial_investment_amount"
                        name="initial_investment_amount"
                        label="Amount invested when the business started (approximately if they know)
ವ್ಯಾಪಾರ ಪ್ರಾರಂಭವಾದಾಗ ಹೂಡಿಕೆ ಮಾಡಿದ ಮೊತ್ತ (ಅಂದಾಜು ಅವರು ತಿಳಿದಿದ್ದರೆ)" type="number"
                        required
                        disabled
                        placeholder="Your Answer"
                        onChange={handleInputChange}
                        value={sendData.initial_investment_amount}
                    />
                    <TextInput
                        id="investment_source"
                        name="investment_source"
                        label="Where did you get the investment to start your business?
ನಿಮ್ಮ ವ್ಯಾಪಾರವನ್ನು ಪ್ರಾರಂಭಿಸಲು ನೀವು ಹೂಡಿಕೆಯನ್ನು ಎಲ್ಲಿ ಪಡೆದುಕೊಂಡಿದ್ದೀರಿ?" type="number"
                        required
                        disabled
                        placeholder="Your Answer"
                        onChange={handleInputChange}
                        value={sendData.investment_source}
                    />

                    <TextInput
                        id="years_in_operation"
                        name="years_in_operation"
                        label="Number of years the business has been operating
ಎಷ್ಟು ವರ್ಷದಿಂದ ವ್ಯಾಪಾರವನ್ನು ನಿರ್ವಹಿಸುತಿದ್ಧಿರ" type="number"
                        required
                        disabled
                        placeholder="Your Answer"
                        onChange={handleInputChange}
                        value={sendData.years_in_operation}
                    />

                    <TextInput
                        id="has_hired_employees"
                        name="has_hired_employees"
                        label="If you are currently running a business, do you have employees you have hired?
ನೀವು ಪ್ರಸ್ತುತ ವ್ಯಾಪಾರವನ್ನು ನಡೆಸುತ್ತಿದ್ದರೆ,ವ್ಯಾಪಾರ ನಿರ್ವಹಣೆ ಮಾಡಲು ನೌಕರರನ್ನು ಹೊಂದಿದ್ಧೀರ?" type="number"
                        required
                        disabled
                        placeholder="Your Answer"
                        onChange={handleInputChange}
                        value={sendData.has_hired_employees}
                    />



                    <TextInput
                        id="number_of_paid_workers"
                        name="number_of_paid_workers"
                        label=" 
 	
How many paid workers do you have?
ನಿಮ್ಮಲ್ಲಿ ಎಷ್ಟು ಸಂಬಳದ ಕೆಲಸಗಾರರಿದ್ದಾರೆ?" type="number"
                        required
                        disabled
                        placeholder="Your Answer"
                        onChange={handleInputChange}
                        value={sendData.number_of_paid_workers}
                    />


                    <TextInput
                        id="reason_for_doing_business"
                        name="reason_for_doing_business"
                        label=" Why do you do business?
ನೀವು ಯಾಕೆ ವ್ಯಾಪಾರ ಮಾಡುತ್ತೀರಿ?" type="number"
                        required
                        disabled
                        placeholder="Your Answer"
                        onChange={handleInputChange}
                        value={sendData.reason_for_doing_business}
                    />

                    <MultipleChoice
                        id="entrepreneurial_aspirations"
                        name="entrepreneurial_aspirations"
                        label="What are your aspirations as an entrepreneur?
ಉದ್ಯಮಿಯಾಗಿ ನಿಮ್ಮ ಆಕಾಂಕ್ಷೆಗಳೇನು?
 "
//doubt with anas
                        required
                        disabled
                        handleResources={handleResources}
                        options={secondaryOccupationHousehold}
                        selectedOption={sendData.entrepreneurial_aspirations}
                    />

                    <TextInput
                        id="maintain_daily_financial_books"
                        name="maintain_daily_financial_books"
                        label=" Do you maintain daily financial books post training ?
ತರಬೇತಿಯ ನಂತರ ನೀವು ದೈನಂದಿನ ಹಣಕಾಸು ಪುಸ್ತಕಗಳನ್ನು ನಿರ್ವಹಿಸುತ್ತೀರಾ?" type="number"
                        required
                        disabled
                        placeholder="Your Answer"
                        onChange={handleInputChange}
                        value={sendData.maintain_daily_financial_books}
                    />


                    <TextInput
                        id="frequency_of_recording_financial_books"
                        name="frequency_of_recording_financial_books"
                        label=" If yes,How often do you write these records?
ಹೌದು ಎಂದಾದರೆ, ಈ ದಾಖಲೆಗಳನ್ನು ನೀವು ಎಷ್ಟು ಬಾರಿ ಬರೆಯುತ್ತೀರಿ?" type="number"
                        required
                        disabled
                        
                        placeholder="Your Answer"
                        onChange={handleInputChange}
                        value={sendData.frequency_of_recording_financial_books}
                    />

                    <MultipleChoice
                        id="method_of_keeping_accounts"
                        name="method_of_keeping_accounts"
                        label="How do you keep these accounts?
ಈ ಖಾತೆಗಳನ್ನು ನೀವು ಹೇಗೆ ಇಟ್ಟುಕೊಳ್ಳುತ್ತೀರಿ?"
                        required
                        //doubt with anas
                        disabled
                        handleResources={handleResources}
                        options={secondaryOccupationHousehold}
                        selectedOption={sendData.method_of_keeping_accounts}
                    />


                    <TextInput
                        id="reason_for_not_bookkeeping"
                        name="reason_for_not_bookkeeping"
                        label=" If not, what is the reason for not bookkeeping?
ಇಲ್ಲದಿದ್ದರೆ, ಪುಸ್ತಕ ನಿರ್ವಹಣೆ ಮಾಡದಿರಲು ಕಾರಣವೇನು? "
                        type="number"
                        required
                        disabled
                        placeholder="Your Answer"
                        onChange={handleInputChange}
                        value={sendData.reason_for_not_bookkeeping}
                    />
                    <TextInput
                        id="househhas_business_goal_or_planold_migration_last_year"
                        name="has_business_goal_or_plan"
                        label=" 
 	
Do you have a business goal/ plan?
ನೀವು ವ್ಯಾಪಾರದ ಗುರಿ/ಯೋಜನೆಯನ್ನು ಹೊಂದಿದ್ದೀರಾ?"  required
                        disabled
                        onChange={handleInputChange}
                        value={sendData?.has_business_goal_or_plan}
                        options={yesOrNo}
                    />
                    <TextInput
                        id="has_business_goal_or_plan"
                        name="household_migration_last_year"
                     	//doubt
                           label="  
 
Do you maintain a detailed business plan for your business ?
ನಿಮ್ಮ ವ್ಯಾಪಾರಕ್ಕಾಗಿ ನೀವು ವಿವರವಾದ ವ್ಯಾಪಾರ ಯೋಜನೆಯನ್ನು ನಿರ್ವಹಿಸುತ್ತೀರಾ?"  required
                        disabled
                        onChange={handleInputChange}
                        value={sendData?.household_migration_last_year}
                        options={yesOrNo}
                    />

                    <TextInput
                        id="short_term_goal"
                        name="short_term_goal"
                        label=" What is your short term goal for your business?
ನಿಮ್ಮ ವ್ಯಾಪಾರಕ್ಕಾಗಿ ನಿಮ್ಮ ಅಲ್ಪಾವಧಿಯ ಗುರಿ ಏನು?"
                        required
                        disabled
                        onChange={handleInputChange}
                        value={sendData?.short_term_goal}
                        options={yesOrNo}
                    />


                    <TextInput
                        id="loan_taken"
                        name="loan_taken"
                        label="Have you taken any loans for business?
ನೀವು ವ್ಯಾಪಾರಕ್ಕಾಗಿ ಯಾವುದಾದರೂ ಸಾಲವನ್ನು ತೆಗೆದುಕೊಂಡಿದ್ದೀರಾ?"
                        required
                        disabled
                        onChange={handleInputChange}
                        value={sendData?.loan_taken}
                        options={yesOrNo}
                    />


                    <TextInput
                        id="household_migration_last_year"
                        name="household_migration_last_year"
                        label="If yes, From where have you taken it? What is the interest rate?
ಹೌದು ಎಂದಾದರೆ, ನೀವು ಸಾಲವನ್ನು ಎಲ್ಲಿಂದ ತೆಗೆದುಕೊಂಡಿದ್ದೀರಿ? ಬಡ್ಡಿ ದರ ಎಷ್ಟು?"
//doubt                       
required
                        disabled
                        onChange={handleInputChange}
                        value={sendData?.household_migration_last_year}
                        options={yesOrNo}
                    />



                    <TextInput
                        id="interest_rate"
                        name="interest_rate"
                        label=" What is the interest rate? ಬಡ್ಡಿ ದರ ಎಷ್ಟು?
"
                        required
                        disabled
                        onChange={handleInputChange}
                        value={sendData?.interest_rate}
                        options={yesOrNo}
                    />
                    <TextInput
                        id="loan_purpose"
                        name="loan_purpose"
                        label=" If yes,what is the purpose of bank loans ಹೌದು ಎಂದಾದರೆ, ಬ್ಯಾಂಕ್ ಸಾಲದ ಉದ್ದೇಶವೇನು"
                        required
                        disabled
                        onChange={handleInputChange}
                        value={sendData?.loan_purpose}
                        options={yesOrNo}
                    />

                    <TextInput
                        id="run_growth_challenges"
                        name="run_growth_challenges"
                        label="What are your challenges in running and growing your business ?
ನಿಮ್ಮ ವ್ಯಾಪಾರವನ್ನು ನಡೆಸುವಲ್ಲಿ ಮತ್ತು ಬೆಳೆಸುವಲ್ಲಿ ನಿಮ್ಮ ಸವಾಲುಗಳೇನು?"
                        required
                        disabled
                        onChange={handleInputChange}
                        value={sendData?.run_growth_challenges}
                        options={yesOrNo}
                    />

                    <TextInput
                        id="core_strength"
                        name="core_strength"
                        label="State one strength of your business ನಿಮ್ಮ ವ್ಯಾಪಾರದ ಒಂದು ಬಲವನ್ನು ತಿಳಿಸಿ"
                        required
                        disabled
                        onChange={handleInputChange}
                        value={sendData?.core_strength}
                        options={yesOrNo}
                    />
                    <TextInput
                        id="core_weakness"
                        name="core_weakness"
                        label=" State one weakness of the business ವ್ಯಾಪಾರದ ಒಂದು ದೌರ್ಬಲ್ಯವನ್ನು ತಿಳಿಸಿ
"
                        required
                        disabled
                        onChange={handleInputChange}
                        value={sendData?.core_weakness}
                        options={yesOrNo}
                    />
                    <TextInput
                        id="core_opportunity"
                        name="core_opportunity"
                        label="State one opportunity for your business ನಿಮ್ಮ ವ್ಯಾಪಾರದ ಒಂದು ಅವಕಾಶವನ್ನು ತಿಳಿಸಿ
"
                        required
                        disabled
                        onChange={handleInputChange}
                        value={sendData?.core_opportunity}
                        options={yesOrNo}
                    />

                    <TextInput
                        id="core_threat"
                        name="core_threat"
                        label=" State one threat for your business ನಿಮ್ಮ ವ್ಯಾಪಾರಕ್ಕೆ ಒಂದು ಬೆದರಿಕೆಯನ್ನು ತಿಳಿಸಿ
"
                        required
                        disabled
                        onChange={handleInputChange}
                        value={sendData?.core_threat}
                        options={yesOrNo}
                    />

                    <TextInput
                        id="target_customer"
                        name="target_customer"
                        label="Who is your target customer? Describe ನಿಮ್ಮ ಗುರಿಯಲ್ಲಿರುವ ಗ್ರಾಹಕ ಯಾರು? ವಿವರಿಸಿ
"
                        required
                        disabled
                        onChange={handleInputChange}
                        value={sendData?.target_customer}
                        options={yesOrNo}
                    />
                    <TextInput
                        id="household_migration_last_year"
                        name="household_migration_last_year"
                        label=" 
 	
If the answer is I am planning to start an enterprise
ಉತ್ತರವಾದರೆ, ನಾನು ಉದ್ಯಮವನ್ನು ಪ್ರಾರಂಭಿಸಲು ಯೋಜಿಸುತ್ತಿದ್ದೇನೆ"
                        required
                        disabled
                        //doubt
                        onChange={handleInputChange}
                        value={sendData?.household_migration_last_year}
                        options={yesOrNo}
                    />



                    <TextInput
                        id="own_account_work"
                        name="own_account_work"
                        label="During the last 1 year, have you worked on your own account or in a business enterprise belonging to you for example, trader, shopkeeper, tailoring, etc. at least for two hours in any day?
ಕಳೆದ 1 ವರ್ಷದಲ್ಲಿ, ನೀವು ನಿಮ್ಮ ಸ್ವಂತ ಖಾತೆಯಲ್ಲಿ ಅಥವಾ ನಿಮಗೆ ಸೇರಿದ ವ್ಯಾಪಾರ ಉದ್ಯಮದಲ್ಲಿ ಉದಾಹರಣೆಗೆ, ವ್ಯಾಪಾರಿ, ಅಂಗಡಿಯವನು, ಟೈಲರಿಂಗ್, ಇತ್ಯಾದಿ. ಯಾವುದೇ ದಿನದಲ್ಲಿ ಕನಿಷ್ಠ ಎರಡು ಗಂಟೆಗಳ ಕಾಲ ಕೆಲಸ ಮಾಡಿದ್ದೀರಾ?"
                        required
                        disabled
                        onChange={handleInputChange}
                        value={sendData?.own_account_work}
                        options={yesOrNo}
                    />


                    <TextInput
                        id="idea_status"
                        name="idea_status"
                        label="Do you have a business idea you want to work on?
ನೀವು ಕೆಲಸ ಮಾಡಲು ಬಯಸುವ ವ್ಯಾಪಾರ ಕಲ್ಪನೆಯನ್ನು ನೀವು ಹೊಂದಿದ್ದೀರಾ?"
                        required
                        disabled
                        onChange={handleInputChange}
                        value={sendData?.idea_status}
                        options={yesOrNo}
                    />


                    <TextInput
                        id="idea_start"
                        name="idea_start"
                        label=" 
 	
Since when have you had the idea of starting business ? ವ್ಯಾಪಾರ ಆರಂಭಿಸುವ ಯೋಚನೆ ಯಾವಾಗಿನಿಂದ ಬಂತು?"
                        required
                        disabled
                        onChange={handleInputChange}
                        value={sendData?.idea_start}
                        options={yesOrNo}
                    />


                    <TextInput
                        id="idea_category"
                        name="idea_category"
                        label="What category does your business idea fall in? ನಿಮ್ಮ ವ್ಯಾಪಾರ ಕಲ್ಪನೆಯು ಯಾವ ವರ್ಗಕ್ಕೆ ಸೇರುತ್ತದೆ?"
                        required
                        disabled
                        onChange={handleInputChange}
                        value={sendData?.idea_category}
                        options={yesOrNo}
                    />


                    <TextInput
                        id="monthly_income"
                        name="monthly_income"
                        label="How much monthly income would you like to ideally earn?
ನೀವು ಆದರ್ಶಪ್ರಾಯವಾಗಿ ಎಷ್ಟು ಮಾಸಿಕ ಆದಾಯವನ್ನು ಗಳಿಸಲು ಬಯಸುತ್ತೀರಿ?"
                        required
                        disabled
                        onChange={handleInputChange}
                        value={sendData?.monthly_income}
                        options={yesOrNo}
                    />


                    <TextInput
                        id="money_management"
                        name="money_management"
                        label="Do you like to manage money and keep track of incomes and expenses?
ನೀವು ಹಣವನ್ನು ನಿರ್ವಹಿಸಲು ಹಾಗೂ ಆದಾಯ ಮತ್ತು ವೆಚ್ಚಗಳನ್ನು ಟ್ರ್ಯಾಕ್ ಮಾಡಲು ಇಷ್ಟಪಡುತ್ತೀರಾ?"
                        required
                        disabled
                        onChange={handleInputChange}
                        value={sendData?.money_management}
                        options={yesOrNo}
                    />


                    <TextInput
                        id="do_bookkeeping"
                        name="do_bookkeeping"
                        label="Do you practice book keeping?
ನೀವು ಪುಸ್ತಕ ನಿರ್ವಹಣೆ ಮಾಡುವ ಅಭ್ಯಾಸ ಇದೆಯೇ?"
                        required
                        disabled
                        onChange={handleInputChange}
                        value={sendData?.do_bookkeeping}
                        options={yesOrNo}
                    />
                    <TextInput
                        id="loan_exists"
                        name="loan_exists"
                        label="Do you have any existing loan in your name?
ನಿಮ್ಮ ಹೆಸರಿನಲ್ಲಿ ಯಾವುದಾದರೂ ಸಾಲ ಅಸ್ತಿತ್ವದಲ್ಲಿದೆಯೇ ?"
                        kannadaLabel=""
                        required
                        disabled
                        onChange={handleInputChange}
                        value={sendData?.loan_exists}
                        options={yesOrNo}
                    />

                    <TextInput
                        id="savings_available"
                        name="savings_available"
                        label="Do you currently have personal savings that you could invest into a new enterprise now?
ನೀವು ಈಗ ಹೊಸ ಉದ್ಯಮದಲ್ಲಿ ಹೂಡಿಕೆ ಮಾಡಲು ,ಪ್ರಸ್ತುತ ವೈಯಕ್ತಿಕ ಉಳಿತಾಯವನ್ನು ಹೊಂದಿದ್ದೀರಾ?"
                        type="number"
                        required
                        disabled
                        inputProps={{ inputMode: 'numeric', maxLength: 100 }}
                        placeholder="Your Answer"
                        onChange={handleInputChange}
                        value={sendData.savings_available}
                    />
                 
                    <TextInput
                        id="loan_startup"
                        name="loan_startup"
                        label=" 
 	
Are you willing to take a loan to start a new business?
ನೀವು ಹೊಸ ವ್ಯಾಪಾರವನ್ನು ಪ್ರಾರಂಭಿಸಲು ಸಾಲವನ್ನು ತೆಗೆದುಕೊಳ್ಳಲು ಸಿದ್ಧರಿದ್ದೀರಾ?"
                        type="number"
                        required
                        disabled
                        inputProps={{ inputMode: 'numeric', maxLength: 100 }}
                        placeholder="Your Answer"
                        onChange={handleInputChange}
                        value={sendData.loan_startup}
                    />


                </CardContent>
            </Card>
        </Grid>
    );
};

export default GetVyaparProgramNewQuestion;
