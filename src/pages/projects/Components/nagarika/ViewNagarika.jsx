import * as React from 'react';
import {
  attended_gram_sabha,
  Can_you_go_to_these_places_alone,
  casteCategory,
  education,
  go_to_these_places_without_asking_permission_of_your_husband_or_a_senior_family_member,
  Gram_Samsad_is_being_organized,
  house,
  How_did_you_apply_for_it,
  How_frequently_do_you_discuss_politics_with_people_outside_of_your_family,
  How_often_do_you_approach_them_for_resolving_an_issue,
  identifications_cards,
  If_never_why_dont_you_discuss_politics,
  likelihoods,
  maritalStatus,
  most_important_sources_for_information_about_what_the_government_is_doing,
  never_approach_the_panchayat_members_What_are_the_reasons_for_that,
  Primary_occupations,
  rationCard,
  reasonsForVoting,
  religion,
  roof,
  Secondary_occupation,
  top_3_problems_in_your_village,
  What_do_you_do_in_Gram_Sabha,
  What_is_the_total_budget_spend_in_your_panchayat,
  Why_dont_you_attend_Gram_sabha,
  yesNoDontKnow,
  yesOrNo,
} from './nagarika/NagarikaSurveyOption';
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
import { Which_of_the_following_statements_do_you_agree_with } from './NagarikaSurveyOption';
const ViewNagarika = ({ sendData, handleInputChange, handleResources }) => {
  const { apikey } = useAuth();
  const [district, setDistrict] = useState([]);
  const [taluk, setTaluk] = useState([]);
  const [village, setVillage] = useState([]);
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
            id="profile_of_the_women"
            placeholder="Your Answer"
            label="Profile of the women    ಮಹಿಳೆಯರ ವಿವರ"
            kannadaLabel=""
            disabled
            name="profile_of_the_women"
            onChange={handleInputChange}
            value={sendData?.profile_of_the_women}
          />
          <TextInput
            id="surveyors_name"
            placeholder="Your Answer"
            label="Surveyor's Name    ಸಮೀಕ್ಷಕರ  ಹೆಸರು"
            kannadaLabel=""
            disabled
            name="surveyors_name"
            onChange={handleInputChange}
            value={sendData?.surveyors_name}
          />
          <TextInput
            id="respondents_name"
            placeholder="Your Answer"
            label="Respondent’s name ಪ್ರತಿಕ್ರಿಯಿಸಿದವರ ಹೆಸರು "
            kannadaLabel=""
            disabled
            name="respondents_name"
            onChange={handleInputChange}
            value={sendData?.respondents_name}
          />
          <TextInput
            id="district"
            name="district"
            label="Districts name"
            kannadaLabel="ಜಿಲ್ಲೆಗಳ ಹೆಸರು"
            disabled
            onChange={handleInputChange}
            value={sendData?.district}
            options={district}
          />
          <TextInput
            id="taluk"
            name="taluk"
            label="Taluks name"
            kannadaLabel="ತಾಲೂಕು ಹೆಸರು"
            disabled
            onChange={handleInputChange}
            value={sendData?.taluk}
            options={taluk}
          />
          <TextInput
            id="village_name"
            name="village_name"
            label="Village name"
            kannadaLabel="ಗ್ರಾಮದ ಹೆಸರು"
            disabled
            onChange={handleInputChange}
            value={sendData?.village_name}
            options={village}
          />
          <TextInput
            id="gram_panchayat"
            placeholder="Your Answer"
            label="Gram Panchayat"
            kannadaLabel="ಗ್ರಾಮ ಪಂಚಾಯತ"
            disabled
            name="gram_panchayat"
            onChange={handleInputChange}
            value={sendData?.gram_panchayat}
          />
          <TextInput
            id="total_number_of_members_in_your_household"
            name="total_number_of_members_in_your_household"
            label="Total number of members in your household ನಿಮ್ಮ ಮನೆಯ ಸದಸ್ಯರ ಒಟ್ಟು ಸಂಖ್ಯೆ"
            type="number"
            disabled
            placeholder="Your Answer"
            onChange={handleInputChange}
            value={sendData.total_number_of_members_in_your_household}
          />

          <TextInput
            id="house"
            name="house"
            label="House"
            kannadaLabel="ಮನೆ"
            disabled
            onChange={handleInputChange}
            value={sendData?.house}
            options={house}
          />
          <TextInput
            id="roof"
            name="roof"
            label="Roof:    ಛಾವಣಿ: "
            kannadaLabel=""
            disabled
            onChange={handleInputChange}
            value={sendData?.roof}
            options={roof}
          />
          <TextInput
            id="ration_card"
            name="ration_card"
            label="Ration card"
            kannadaLabel="ಪಡಿತರ ಚೀಟಿ"
            disabled
            onChange={handleInputChange}
            value={sendData?.ration_card}
            options={rationCard}
          />
          <TextInput
            id="caste_category"
            name="caste_category"
            label="Caste Category"
            kannadaLabel="ಜಾತಿ ವರ್ಗ"
            disabled
            onChange={handleInputChange}
            value={sendData?.caste_category}
            options={casteCategory}
          />
          <TextInput
            id="sub_caste_name"
            name="sub_caste_name"
            label="Sub-caste name   ಉಪಜಾತಿ ಹೆಸರು"
            disabled
            placeholder="Your Answer"
            onChange={handleInputChange}
            value={sendData.sub_caste_name}
          />
          <TextInput
            id="religion"
            name="religion"
            label="Religion   ಧರ್ಮ"
            kannadaLabel=""
            disabled
            onChange={handleInputChange}
            value={sendData?.religion}
            options={religion}
          />
          <TextInput
            id="age"
            name="age"
            label="Age  ವಯಸ್ಸು"
            type="number"
            disabled
            maxLength={2}
            placeholder="Your Answer"
            onChange={handleInputChange}
            value={sendData.age}
          />
          <TextInput
            id="marital_status"
            name="marital_status"
            label="Marital Status"
            kannadaLabel="ವೈವಾಹಿಕ ಸ್ಥಿತಿ"
            disabled
            onChange={handleInputChange}
            value={sendData?.marital_status}
            options={maritalStatus}
          />

          <TextInput
            id="highest_level_of_education_completed"
            name="highest_level_of_education_completed"
            label="Highest level of education completed  
ಉನ್ನತ ಮಟ್ಟದ ಶಿಕ್ಷಣವನ್ನು ಪೂರ್ಣಗೊಳಿಸಲಾಗಿದೆ "
            kannadaLabel=""
            disabled
            onChange={handleInputChange}
            value={sendData?.highest_level_of_education_completed}
            options={education}
          />

          <TextInput
            id="primary_occupation"
            name="primary_occupation"
            label="Primary occupation (the work that you engage in for more than 6 months in a year)
ಪ್ರಾಥಮಿಕ ಉದ್ಯೋಗ (ಒಂದು ವರ್ಷದಲ್ಲಿ 6 ತಿಂಗಳಿಗಿಂತ ಹೆಚ್ಚು ಕಾಲ ನೀವು ತೊಡಗಿಸಿಕೊಂಡಿರುವ ಕೆಲಸ)"
            kannadaLabel=""
            disabled
            onChange={handleInputChange}
            value={sendData?.primary_occupation}
            options={Primary_occupations}
          />
          <TextInput
            id="secondary_occupation"
            name="secondary_occupation"
            label="Secondary occupation
(the work that you engage in for extra income) ದ್ವಿತೀಯಕ ಉದ್ಯೋಗ
(ಹೆಚ್ಚುವರಿ ಆದಾಯಕ್ಕಾಗಿ ನೀವು ತೊಡಗಿಸಿಕೊಳ್ಳುವ ಕೆಲಸ)"
            kannadaLabel=""
            disabled
            onChange={handleInputChange}
            value={sendData?.secondary_occupation}
            options={Secondary_occupation}
          />

          <TextInput
            id="monthly_household_expenditure"
            name="monthly_household_expenditure"
            label="Monthly household expenditure (in Rs)   
ಮಾಸಿಕ ಮನೆಯ ಖರ್ಚು (ರೂ.ಗಳಲ್ಲಿ)"
            type="number"
            disabled
            placeholder="Your Answer"
            onChange={handleInputChange}
            value={sendData.monthly_household_expenditure}
          />
          <TextInput
            id="monthly_household_income"
            name="monthly_household_income"
            label="Monthly household income(in Rs.)   
ಮಾಸಿಕ ಮನೆಯ ಆದಾಯ(ರೂ.ಗಳಲ್ಲಿ)"
            type="number"
            disabled
            placeholder="Your Answer"
            onChange={handleInputChange}
            value={sendData.monthly_household_income}
          />

          <TextInput
            id="are_you_the_sole_earning_member_of_your_family"
            name="are_you_the_sole_earning_member_of_your_family"
            label="Are you the sole earning member of your family?   
ನಿಮ್ಮ ಕುಟುಂಬದ ಏಕೈಕ ಗಳಿಕೆಯ ಸದಸ್ಯರಾಗಿದ್ದೀರಾ? 
- ನೀವು ಕುಟುಂಬದಲ್ಲಿ ಗಳಿಸುವ ಏಕೈಕ ಸದಸ್ಯರೇ?"
            disabled
            onChange={handleInputChange}
            value={sendData?.are_you_the_sole_earning_member_of_your_family}
            options={yesOrNo}
          />
          <TextInput
            id="migration_profile"
            name="migration_profile"
            label="Migration profile   ವಲಸೆ ಪ್ರೊಫೈಲ್"
            disabled
            placeholder="Your Answer"
            onChange={handleInputChange}
            value={sendData.migration_profile}
          />

          <TextInput
            id="has_anyone_in_your_household_migrated_last_1_year_for_work"
            name="has_anyone_in_your_household_migrated_last_1_year_for_work"
            label="Has anyone in your household migrated in the last 1 year for work? 
ನಿಮ್ಮ ಮನೆಯಲ್ಲಿ ಯಾರಾದರೂ ಕೆಲಸಕ್ಕಾಗಿ ಕಳೆದ 1 ವರ್ಷದಲ್ಲಿ ವಲಸೆ ಹೋಗಿದ್ದಾರೆಯೇ? ಹೌದು ಅಲ್ಲ"
            disabled
            onChange={handleInputChange}
            value={sendData?.has_anyone_in_your_household_migrated_last_1_year_for_work}
            options={yesOrNo}
          />

          <TextInput
            id="does_the_migrant_member_send_remittances_to_the_household"
            name="does_the_migrant_member_send_remittances_to_the_household"
            label="Does the migrant member send remittances to the household? 
 ವಲಸಿಗ ಸದಸ್ಯರು ಮನೆಗೆ ಹಣ ಕಳುಹಿಸುತ್ತಾರೆಯೇ? ಹೌದು ಅಲ್ಲ"
            disabled
            onChange={handleInputChange}
            value={sendData?.does_the_migrant_member_send_remittances_to_the_household}
            options={yesOrNo}
          />
          <TextInput
            id="civic_muscle"
            name="civic_muscle"
            label="Civic Muscle   /  ಗ್ರಾಮಡಲಿತದ ಸಾಮರ್ಥ್ಯ "
            disabled
            placeholder="Your Answer"
            onChange={handleInputChange}
            value={sendData.civic_muscle}
          />

          <TextInput
            id="are_you_part_of_an_shg"
            name="are_you_part_of_an_shg"
            label="Are you part of an SHG?    ನೀವು SHG ಯ ಭಾಗವಾಗಿದ್ದೀರಾ?"
            disabled
            onChange={handleInputChange}
            value={sendData?.are_you_part_of_an_shg}
            options={yesOrNo}
          />
          <TextInput
            id="do_you_have_any_of_these_identification_cards"
            name="do_you_have_any_of_these_identification_cards"
            label=" Do you have any of these identification cards? 
ಈ ಗುರುತಿನ ಚೀಟಿಗಳಲ್ಲಿ ಯಾವುದಾದರೂ ನಿಮ್ಮ ಬಳಿ ಇದೆಯೇ? "
            disabled
            onChange={handleInputChange}
            value={sendData?.do_you_have_any_of_these_identification_cards}
            options={identifications_cards}
          />
          <TextInput
            id="how_did_you_apply_for_it"
            name="how_did_you_apply_for_it"
            label=" How did you apply for it - ನೀವು ಅದಕ್ಕೆ ಹೇಗೆ ಅರ್ಜಿ ಸಲ್ಲಿಸಿದ್ದೀರಿ  "
            disabled
            onChange={handleInputChange}
            value={sendData?.how_did_you_apply_for_it}
            options={How_did_you_apply_for_it}
          />

          <TextInput
            id="have_you_personally_applied_for_any_of_the_entitlement_schemes"
            name="have_you_personally_applied_for_any_of_the_entitlement_schemes"
            label=" Have you personally (yourself) applied for any of the entitlement schemes?
ನೀವು ವೈಯಕ್ತಿಕವಾಗಿ ಯಾವುದಾದರೂ ಅರ್ಹತಾ ಯೋಜನೆಗಳಿಗೆ ಅರ್ಜಿ ಸಲ್ಲಿಸಿದ್ದೀರಾ? "
            disabled
            onChange={handleInputChange}
            value={sendData?.have_you_personally_applied_for_any_of_the_entitlement_schemes}
            options={yesOrNo}
          />

          <TextInput
            id="what_scheme_did_you_apply_for"
            name="what_scheme_did_you_apply_for"
            label="
What scheme did you apply for?
  ನೀವು ಯಾವ ಯೋಜನೆಗೆ ಅರ್ಜಿ ಸಲ್ಲಿಸಿದ್ದೀರಿ?  "
            disabled
            onChange={handleInputChange}
            value={sendData?.what_scheme_did_you_apply_for}
          />
          <TextInput
            id="were_you_successful_in_getting_approval_for_the_scheme"
            name="were_you_successful_in_getting_approval_for_the_scheme"
            label="Where you successful in getting the approval for the scheme?
  ನೀವು ಯೋಜನೆಗೆ ಅನುಮೋದನೆ ಪಡೆಯುವಲ್ಲಿ ಯಶಸ್ವಿಯಾದಿರಾ?  "
            disabled
            onChange={handleInputChange}
            value={sendData?.were_you_successful_in_getting_approval_for_the_scheme}
            options={yesOrNo}
          />
          <TextInput
            id="if_you_were_not_successful_in_applying_for_the_scheme_why_not"
            name="if_you_were_not_successful_in_applying_for_the_scheme_why_not"
            label="If you were not successful in applying for the scheme. Why not?
ಯೋಜನೆಗೆ ಅರ್ಜಿ ಸಲ್ಲಿಸಲು ನೀವು ಯಶಸ್ವಿಯಾಗದಿದ್ದರೆ. ಏಕೆ ಇಲ್ಲ?  "
            disabled
            onChange={handleInputChange}
            value={sendData?.if_you_were_not_successful_in_applying_for_the_scheme_why_not}
          />
          <TextInput
            id="will_cooperate_with_your_village_people_to_get_facility_putup"
            name="will_cooperate_with_your_village_people_to_get_facility_putup"
            label="If there is something you all (you and people in your village) need, for example- a new school/water facility etc., how likely is it that you will cooperate with your village people to get the facility put up.
ನಿಮ್ಮೆಲ್ಲರಿಗೂ (ನಿಮಗೆ ಮತ್ತು ನಿಮ್ಮ ಹಳ್ಳಿಯಲ್ಲಿರುವ ಜನರಿಗೆ) ಏನಾದರೂ ಅಗತ್ಯವಿದ್ದರೆ, ಉದಾಹರಣೆಗೆ- ಹೊಸ ಶಾಲೆ/ನೀರಿನ ಸೌಲಭ್ಯ ಇತ್ಯಾದಿಗಳಿದ್ದರೆ, ಸೌಲಭ್ಯವನ್ನು ಪಡೆಯಲು ನಿಮ್ಮ ಹಳ್ಳಿಯ ಜನರೊಂದಿಗೆ ನೀವು ಸಹಕರಿಸುವ ಸಾಧ್ಯತೆ ಎಷ್ಟು. "
            disabled
            onChange={handleInputChange}
            value={sendData?.will_cooperate_with_your_village_people_to_get_facility_putup}
            options={likelihoods}
          />
          <TextInput
            id="community_engagement"
            name="community_engagement"
            label="
Community Engagement    ಸಮುದಾಯ ಸಹಭಾಗಿತ್ವ"
            disabled
            onChange={handleInputChange}
            value={sendData?.community_engagement}
          />
          <MultipleChoice
            id="can_you_identify_top_3_problems_in_your_village"
            name="can_you_identify_top_3_problems_in_your_village"
            label="Can you identify top 3 problems in your village
ನಿಮ್ಮ ಗ್ರಾಮದಲ್ಲಿರುವ ಪ್ರಮುಖ 3 ಸಮಸ್ಯೆಗಳನ್ನು ನೀವು ಗುರುತಿಸಬಹುದೇ?  "
            disabled
            selectedOption={sendData.can_you_identify_top_3_problems_in_your_village}
            handleResources={handleResources}
            options={top_3_problems_in_your_village}
          />
          <TextInput
            id="do_you_think_you_can_help_solve_these_problems"
            name="do_you_think_you_can_help_solve_these_problems"
            label="Do you think you can help solve these problems
ಈ ಸಮಸ್ಯೆಗಳನ್ನು ಪರಿಹರಿಸಲು ನೀವು ಸಹಾಯ ಮಾಡಬಹುದೆಂದು ನೀವು ಭಾವಿಸುತ್ತೀರಾ  "
            disabled
            onChange={handleInputChange}
            value={sendData?.do_you_think_you_can_help_solve_these_problems}
            options={yesOrNo}
          />
          <TextInput
            id="if_yes_how_do_you_think_you_can_help_solve_these_problems"
            name="if_yes_how_do_you_think_you_can_help_solve_these_problems"
            label="If, yes, how do you think you can help solve these problems?   
 ಹೌದು ಎಂದಾದರೆ, ಈ ಸಮಸ್ಯೆಗಳನ್ನು ಪರಿಹರಿಸಲು ನೀವು ಹೇಗೆ ಸಹಾಯ ಮಾಡಬಹುದು ಎಂದು ನೀವು ಭಾವಿಸುತ್ತೀರಿ?"
            disabled
            onChange={handleInputChange}
            value={sendData?.if_yes_how_do_you_think_you_can_help_solve_these_problems}
          />
          <TextInput
            id="if_no_why_do_you_think_you_cannot_help_solve_these_problems"
            name="if_no_why_do_you_think_you_cannot_help_solve_these_problems"
            label="If, no why do you think you cannot help solve these problems?    
ಇಲ್ಲದಿದ್ದರೆ, ಈ ಸಮಸ್ಯೆಗಳನ್ನು ಪರಿಹರಿಸಲು ನಿಮಗೆ ಸಹಾಯ ಮಾಡಲು ಸಾಧ್ಯವಿಲ್ಲ ಎಂದು ನೀವು ಏಕೆ ಭಾವಿಸುತ್ತೀರಿ?"
            disabled
            onChange={handleInputChange}
            value={sendData?.if_no_why_do_you_think_you_cannot_help_solve_these_problems}
          />
          <TextInput
            id="do_you_think_every_village_has_same_or_similar_issues"
            name="do_you_think_every_village_has_same_or_similar_issues"
            label="Do you think every village has same or similar issues?            ಪ್ರತಿಯೊಂದು ಹಳ್ಳಿಗೂ ಒಂದೇ ರೀತಿಯ ಸಮಸ್ಯೆಗಳಿವೆ ಎಂದು ನೀವು ಭಾವಿಸುತ್ತೀರಾ?        "
            disabled
            onChange={handleInputChange}
            value={sendData?.do_you_think_every_village_has_same_or_similar_issues}
            options={yesOrNo}
          />
          <TextInput
            id="do_you_vote"
            name="do_you_vote"
            label="Do you vote - ನೀವು ಮತ ​​ಹಾಕುತ್ತೀರಾ"
            disabled
            onChange={handleInputChange}
            value={sendData?.do_you_vote}
          />
          <TextInput
            id="why_do_you_vote"
            name="why_do_you_vote"
            label="Why do you vote? - ನೀವು ಯಾಕೆ ಮತ ಚಲಾಯಿಸುತ್ತೀರಿ?"
            disabled
            onChange={handleInputChange}
            value={sendData?.why_do_you_vote}
            options={reasonsForVoting}
          />
          <TextInput
            id="if_no_why_dont_you_vote"
            name="if_no_why_dont_you_vote"
            label="If no, why don't you vote?"
            disabled
            onChange={handleInputChange}
            value={sendData?.if_no_why_dont_you_vote}
          />
          <TextInput
            id="do_you_attend_gram_sabha_regularly"
            name="do_you_attend_gram_sabha_regularly"
            label="Do you attend Gram Sabha regularly?
ನೀವು ನಿಯಮಿತವಾಗಿ ಗ್ರಾಮ ಸಭೆಗೆ ಹಾಜರಾಗುತ್ತೀರಾ? "
            disabled
            onChange={handleInputChange}
            value={sendData?.do_you_attend_gram_sabha_regularly}
            options={yesOrNo}
          />
          <TextInput
            id="when_was_the_last_time_you_attended_gram_sabha"
            name="when_was_the_last_time_you_attended_gram_sabha"
            label="When was the last time you attended  gram sabha ?
ನೀವು ಕೊನೆಯ ಬಾರಿಗೆ ಗ್ರಾಮಸಭೆಗೆ ಹಾಜರಾಗಿದ್ದು ಯಾವಾಗ? "
            disabled
            onChange={handleInputChange}
            value={sendData?.when_was_the_last_time_you_attended_gram_sabha}
            options={attended_gram_sabha}
          />
          <TextInput
            id="how_do_you_know_when_gram_sabha_is_being_organized"
            name="how_do_you_know_when_gram_sabha_is_being_organized"
            label="
How do you know when the Gram Sabha/Gram Samsad is being organized?  
  ಗ್ರಾಮ ಸಭೆ/ಗ್ರಾಮ ಸಂಸದ್ ಯಾವಾಗ ಆಯೋಜಿಸಲಾಗುತ್ತಿದೆ ಎಂದು ನಿಮಗೆ ಹೇಗೆ ಗೊತ್ತು?"
            disabled
            onChange={handleInputChange}
            value={sendData?.how_do_you_know_when_gram_sabha_is_being_organized}
            options={Gram_Samsad_is_being_organized}
          />
          <MultipleChoice
            id="what_do_you_do_in_gram_sabha"
            name="what_do_you_do_in_gram_sabha"
            label=" What do you do in Gram Sabha?
ಗ್ರಾಮ ಸಭೆಯಲ್ಲಿ ನೀವು ಏನು ಮಾಡುತ್ತೀರಿ?  "
            disabled
            handleResources={handleResources}
            selectedOption={sendData.what_do_you_do_in_gram_sabha}
            options={What_do_you_do_in_Gram_Sabha}
          />
          <TextInput
            id="why_dont_you_attend_gram_sabha"
            name="why_dont_you_attend_gram_sabha"
            label="Why don't you attend Gram sabha ?
ನೀವು ಗ್ರಾಮ ಸಭೆಗೆ ಏಕೆ ಹಾಜರಾಗುವುದಿಲ್ಲ?  "
            disabled
            onChange={handleInputChange}
            value={sendData?.why_dont_you_attend_gram_sabha}
            options={Why_dont_you_attend_Gram_sabha}
          />
          <TextInput
            id="do_you_know_who_your_panchayat_members_are"
            name="do_you_know_who_your_panchayat_members_are"
            label="Do you know who your panchayat members are ?
ನಿಮ್ಮ ಪಂಚಾಯತ್ ಸದಸ್ಯರು ಯಾರು ಎಂದು ನಿಮಗೆ ತಿಳಿದಿದೆಯೇ?   "
            disabled
            onChange={handleInputChange}
            value={sendData?.do_you_know_who_your_panchayat_members_are}
            options={yesOrNo}
          />
          <TextInput
            id="how_often_do_you_approach_them_for_resolving_an_issue"
            name="how_often_do_you_approach_them_for_resolving_an_issue"
            label="How often do you approach them for resolving an issue?
ಸಮಸ್ಯೆಯೊಂದಕ್ಕೆ ನೀವು ಎಷ್ಟು ಬಾರಿ ಅವರನ್ನು ಸಂಪರ್ಕಿಸುತ್ತೀರಿ?   "
            disabled
            onChange={handleInputChange}
            value={sendData?.how_often_do_you_approach_them_for_resolving_an_issue}
            options={How_often_do_you_approach_them_for_resolving_an_issue}
          />
          <TextInput
            id="if_they_rarely_or_never_approach_panchayat_members_why"
            name="if_they_rarely_or_never_approach_panchayat_members_why"
            label="If you rarely or never approach the panchayat members, What are the reasons for that?
 ಅವರು ಪಂಚಾಯತ್ ಸದಸ್ಯರನ್ನು ಅಪರೂಪವಾಗಿ ಅಥವಾ ಎಂದಿಗೂ ಸಂಪರ್ಕಿಸದಿದ್ದರೆ, ಅದಕ್ಕೆ ಕಾರಣಗಳೇನು?     "
            disabled
            onChange={handleInputChange}
            value={sendData?.if_they_rarely_or_never_approach_panchayat_members_why}
            options={never_approach_the_panchayat_members_What_are_the_reasons_for_that}
          />
          <TextInput
            id="what_is_the_total_budget_spent_in_your_panchayat"
            name="what_is_the_total_budget_spent_in_your_panchayat"
            label="What is the total budget spend in your panchayat?    
ನಿಮ್ಮ ಪಂಚಾಯತ್‌ನಲ್ಲಿ ಒಟ್ಟು ಬಜೆಟ್ ವೆಚ್ಚ ಎಷ್ಟು?"
            disabled
            onChange={handleInputChange}
            value={sendData?.what_is_the_total_budget_spent_in_your_panchayat}
            options={What_is_the_total_budget_spend_in_your_panchayat}
          />
          <TextInput
            id="as_a_citizen_i_have_rights"
            name="as_a_citizen_i_have_rights"
            label="I believe that as a citizen I have rights    
ಒಬ್ಬ ನಾಗರಿಕನಾಗಿ ನನಗೆ ಹಕ್ಕುಗಳಿವೆ ಎಂದು ನಾನು ನಂಬುತ್ತೇನೆ"
            disabled
            onChange={handleInputChange}
            value={sendData?.as_a_citizen_i_have_rights}
            options={yesNoDontKnow}
          />
          <TextInput
            id="as_a_citizen_i_have_duties_to_make_governance_process_better"
            name="as_a_citizen_i_have_duties_to_make_governance_process_better"
            label="I believe that as a citizen I have duties to make the governance process better    
ಒಬ್ಬ ನಾಗರಿಕನಾಗಿ ಆಡಳಿತ ಪ್ರಕ್ರಿಯೆಯನ್ನು ಉತ್ತಮಗೊಳಿಸಲು ನಾನು ಕರ್ತವ್ಯಗಳನ್ನು ಹೊಂದಿದ್ದೇನೆ ಎಂದು ನಾನು ನಂಬುತ್ತೇನೆ"
            disabled
            onChange={handleInputChange}
            value={sendData?.as_a_citizen_i_have_duties_to_make_governance_process_better}
            options={yesNoDontKnow}
          />
          <TextInput
            id="mobility_confidence_of_women"
            name="mobility_confidence_of_women"
            label="Mobility/ Confidence of the women    ಮಹಿಳೆಯರ ಚಲನಶೀಲತೆ / ವಿಶ್ವಾಸ"
            disabled
            onChange={handleInputChange}
            value={sendData?.mobility_confidence_of_women}
          />
          <TextInput
            id="how_frequently_do_you_discuss_politics_with_people"
            name="how_frequently_do_you_discuss_politics_with_people"
            label="How frequently do you discuss politics with people outside of your family?    
ನಿಮ್ಮ ಕುಟುಂಬದ ಹೊರಗಿನ ಜನರೊಂದಿಗೆ ನೀವು ಎಷ್ಟು ಬಾರಿ ರಾಜಕೀಯವನ್ನು - ರಾಜಕೀಯದ ಬಗ್ಗೆ  ಚರ್ಚಿಸುತ್ತೀರಿ?"
            disabled
            onChange={handleInputChange}
            value={sendData?.how_frequently_do_you_discuss_politics_with_people}
            options={How_frequently_do_you_discuss_politics_with_people_outside_of_your_family}
          />
          <TextInput
            id="if_never_why_dont_you_discuss_politics"
            name="if_never_why_dont_you_discuss_politics"
            label="If never, why don't you discuss politics?    
ಎಂದಿಗೂ ಇಲ್ಲದಿದ್ದರೆ, ನೀವು ರಾಜಕೀಯವನ್ನು ಏಕೆ ಚರ್ಚಿಸಬಾರದು - ಚರ್ಚಿಸುವುದಿಲ್ಲ?"
            disabled
            onChange={handleInputChange}
            value={sendData?.if_never_why_dont_you_discuss_politics}
            options={If_never_why_dont_you_discuss_politics}
          />
          <TextInput
            id="did_you_try_to_get_people_together_to_solve_problem_in_community"
            name="did_you_try_to_get_people_together_to_solve_problem_in_community"
            label="In the past year, did you try to get people together to solve a problem in the community?   
 ಕಳೆದ ವರ್ಷದಲ್ಲಿ - ವರ್ಷಗಳಲ್ಲಿ, ಸಮುದಾಯದಲ್ಲಿನ ಸಮಸ್ಯೆಯನ್ನು ಪರಿಹರಿಸಲು ಜನರನ್ನು ಒಟ್ಟುಗೂಡಿಸಲು ನೀವು ಪ್ರಯತ್ನಿಸಿದ್ದೀರಾ?"
            disabled
            onChange={handleInputChange}
            value={sendData?.did_you_try_to_get_people_together_to_solve_problem_in_community}
            options={yesOrNo}
          />
          <MultipleChoice
            id="can_you_go_to_these_places_without_permission_fromfamily_member"
            name="can_you_go_to_these_places_without_permission_fromfamily_member"
            label="Can you go to these places without asking permission of your husband or a senior family member?    
 ನಿಮ್ಮ ಪತಿ ಅಥವಾ ಕುಟುಂಬದ ಹಿರಿಯ ಸದಸ್ಯರ ಅನುಮತಿಯನ್ನು ಕೇಳದೆ ನೀವು ಈ ಸ್ಥಳಗಳಿಗೆ ಹೋಗಬಹುದೇ?"
            disabled
            handleResources={handleResources}
            selectedOption={sendData.can_you_go_to_these_places_without_permission_fromfamily_member}
            options={go_to_these_places_without_asking_permission_of_your_husband_or_a_senior_family_member}
          />
          <MultipleChoice
            id="can_you_go_to_these_places_alone"
            name="can_you_go_to_these_places_alone"
            label="Can you go to these places alone?
    ನೀವು ಈ ಸ್ಥಳಗಳಿಗೆ ಒಬ್ಬರೇ ಹೋಗಬಹುದೇ?"
            disabled
            handleResources={handleResources}
            selectedOption={sendData.can_you_go_to_these_places_alone}
            options={Can_you_go_to_these_places_alone}
          />
          <MultipleChoice
            id="what_are_your_most_imp_sources_for_information_about_government"
            name="what_are_your_most_imp_sources_for_information_about_government"
            label="What are your most important sources for information about what the government is doing?  
  ಸರ್ಕಾರ ಏನು ಮಾಡುತ್ತಿದೆ ಎಂಬುದರ ಕುರಿತು ಮಾಹಿತಿಗಾಗಿ ನಿಮ್ಮ ಪ್ರಮುಖ ಮೂಲಗಳು ಯಾವುವು?"
            disabled
            handleResources={handleResources}
            selectedOption={sendData.what_are_your_most_imp_sources_for_information_about_government}
            options={most_important_sources_for_information_about_what_the_government_is_doing}
          />
          <TextInput
            id="which_of_the_following_statements_do_you_agree_with"
            name="which_of_the_following_statements_do_you_agree_with"
            label="Which of the following statements do you agree with?    
ಕೆಳಗಿನ ಯಾವ ಹೇಳಿಕೆಗಳನ್ನು ನೀವು ಒಪ್ಪುತ್ತೀರಿ?"
            disabled
            onChange={handleInputChange}
            value={sendData?.which_of_the_following_statements_do_you_agree_with}
            options={Which_of_the_following_statements_do_you_agree_with}
          />
        </CardContent>
      </Card>
    </Grid>
  );
};

export default ViewNagarika;
