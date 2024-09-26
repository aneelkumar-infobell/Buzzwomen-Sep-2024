import * as React from 'react';
import {
  According_to_you_whose_responsibility_is_it_to_tackle_climate_change,
  believe_connection_between_the_food_health_climate,
  Can_you_name_the_categories_of_waste_you_produce,
  casteCategory,
  changes_happened_to_the_climate,
  community_together_achieve_my_conservation_goal,
  currentEconomicActivity,
  dayToDayLifeCombatClimateChange,
  disposeYourSanitaryPad,
  districtsOptions,
  Do_you_think_the_water_you_consume_is_safe,
  education,
  gifting_his_6_acres_land_to_children,
  house,
  household_activity_pollutes_natural_resources,
  How_concerned_local_water_quality,
  How_do_you_manage_waste_in_your_household,
  How_is_the_change_in_state_of_natural_resources_impacting_your_life,
  How_is_the_change_in_state_of_natural_resources_impacting_your_life_oldQues,
  initiativesTakenToSaveTheEnvironmentInOurVillage,
  main_source_of_water,
  maritalStatus,
  menstruationFlow,
  motherTongue,
  Natural_Wealth,
  oneToTen,
  personal_actions_can_affect_water_quality,
  phoneType,
  rationCard,
  religion,
  roof,
  secondaryOccupationHousehold,
  segregateYourWasteAtHome,
  shown_below_do_you_agree_with,
  usePesticidesFertiliserToProduceThisFood,
  What_are_the_main_products_and_services_that_you_use_in_your_everyday_life,
  What_is_the_main_source_of_water_used_by_your_household_for_domestic_purposes,
  What_kind_of_change_to_climate_do_you_think_has_happened,
  whatAreTheReasons,
  whatAreThosePractices,
  whatHaveYouNoticed,
  Which_following_are_natural_resources,
  Which_following_are_natural_resourcesOld,
  Which_of_the_following_natural_resources_of_your_community_needs_immediate_attention_and_measures_of_conservation,
  Which_one_according_to_you_is_right,
  WhichMainCropDoYouGrow,
  WomensOccupation,
  yesNoMaybe,
  yesOrNo,
} from './GreenSurveySelectOptions';
import TextInput from 'src/components/TextInput';
import SelectInput from 'src/components/SelectInput';
import MultipleChoice from 'src/components/MultipleChoice';
import { Grid, Card, CardContent } from '@mui/material';
import Typography from '@mui/material/Typography';
const ViewOldQuestion = ({ sendData, handleInputChange, handleResources }) => {
  return (
    <Grid>
      <Card>
        <CardContent>
          <TextInput
            id="Email"
            name="Email"
            label="Email"
            required
            disabled
            placeholder="Your Answer"
            onChange={handleInputChange}
            value={sendData.email || ''}
          />
          <TextInput
            id="Name_of_the_surveyor"
            placeholder="Your Answer"
            label="Name of surveyor"
            required
            disabled
            name="Name_of_the_surveyor"
            onChange={handleInputChange}
            value={sendData?.name_of_the_surveyor}
          />
          <TextInput
            id="Name_of_the_respondent"
            placeholder="Your Answer"
            label="Name of respondent"
            required
            disabled
            name="Name_of_the_respondent"
            onChange={handleInputChange}
            value={sendData?.name_of_the_respondent}
          />
          <TextInput
            id="Village_Name"
            placeholder="Your Answer"
            label="Village Name"
            required
            disabled
            name="village_name"
            onChange={handleInputChange}
            value={sendData?.village_name}
          />
          <TextInput
            id="Phone_number"
            placeholder="Your Answer"
            label="Phone Number"
            required
            disabled
            name="Phone_number"
            onChange={handleInputChange}
            value={sendData?.phone_number}
          />
          <MultipleChoice
            label="Which of the following are natural resources?  "
            kannadaLabel="ಕೆಳಗಿನವುಗಳಲ್ಲಿ ಯಾವುದು ನೈಸರ್ಗಿಕ ಸಂಪನ್ಮೂಲಗಳು? "
            name="natural_resources"
            required
            disabled
            handleResources={handleResources}
            options={Which_following_are_natural_resourcesOld}
            selectedOption={sendData.natural_resources}
          />
          <MultipleChoice
            label="How is the change in state of natural resources impacting your life?"
            kannadaLabel="ನೈಸರ್ಗಿಕ ಸಂಪನ್ಮೂಲಗಳ ಸ್ಥಿತಿಯಲ್ಲಿನ ಬದಲಾವಣೆಯು ನಿಮ್ಮ ಜೀವನದ ಮೇಲೆ ಹೇಗೆ ಪರಿಣಾಮ ಬೀರುತ್ತದೆ?"
            name="natural_resources_impacting_your_life"
            required
            disabled
            handleResources={handleResources}
            options={How_is_the_change_in_state_of_natural_resources_impacting_your_life_oldQues}
            selectedOption={sendData.natural_resources_impacting_your_life}
          />
          <SelectInput
            label="Natural wealth for me is / ನನಗೆ ನೈಸರ್ಗಿಕ ಸಂಪತ್ತು *"
            name="Natural_Wealth"
            required
            disabled
            handleResources={handleResources}
            options={Natural_Wealth}
            selectedOption={sendData.natural_wealth}
          />
          <SelectInput
            id="climate_change"
            name="climate_change"
            label="Have you heard of “climate change”?   "
            kannadaLabel="ನೀವು “ಹವಾಮಾನ ಬದಲಾವಣೆ” ಬಗ್ಗೆ ಕೇಳಿದ್ದೀರಾ? "
            required
            disabled
            onChange={handleInputChange}
            value={sendData?.climate_change}
            options={yesNoMaybe}
          />

          <TextInput
            id="What_do_you_know_about_it"
            name="What_do_you_know_about_it"
            label="What do you know about it? / ಅದರ ಬಗ್ಗೆ ನಿನಗೇನು ಗೊತ್ತು "
            required
            disabled
            placeholder="Your Answer"
            onChange={handleInputChange}
            value={sendData.what_do_you_know_about_it}
          />
          <SelectInput
            id="change_in_the_weather_climate"
            name="change_in_the_weather_climate"
            label="Do you notice any change in the weather/climate in last 30 years? /ಕಳೆದ 30 ವರ್ಷಗಳಲ್ಲಿ
                ಹವಾಮಾನ/ಹವಾಮಾನದಲ್ಲಿ ಯಾವುದೇ ಬದಲಾವಣೆಯನ್ನು ನೀವು ಗಮನಿಸಿದ್ದೀರಾ?"
            required
            disabled
            onChange={handleInputChange}
            value={sendData?.change_in_the_weather_climate}
            options={yesNoMaybe}
          />
          <MultipleChoice
            label="What kind of changes happened to the climate? / ಹವಾಮಾನದಲ್ಲಿ ಯಾವ ರೀತಿಯ ಬದಲಾವಣೆಗಳು ಸಂಭವಿಸಿದವು? *"
            name="Natural_Wealth"
            required
            disabled
            handleResources={handleResources}
            options={changes_happened_to_the_climate}
            selectedOption={sendData.changes_happened_to_the_climate}
          />
          <SelectInput
            id="climate_change_threatens_personal_family_health_safety"
            name="climate_change_threatens_personal_family_health_safety"
            label=" On a scale of 1 to 10 please rate,how much do you think climate change threatens your personal and
                      family health and safety? / 1 ರಿಂದ 10 ರ ಪ್ರಮಾಣದಲ್ಲಿ ದಯವಿಟ್ಟು ರೇಟ್ ಮಾಡಿ, ಹವಾಮಾನ ಬದಲಾವಣೆಯು ನಿಮ್ಮ
                      ವೈಯಕ್ತಿಕ ಮತ್ತು ಕುಟುಂಬದ ಆರೋಗ್ಯ ಮತ್ತು ಸುರಕ್ಷತೆಗೆ ಎಷ್ಟು ಅಪಾಯವನ್ನುಂಟುಮಾಡುತ್ತದೆ ಎಂದು ನೀವು ಭಾವಿಸುತ್ತೀರಿ"
            required
            disabled
            onChange={handleInputChange}
            value={sendData?.climate_change_threatens_personal_family_health_safety}
            options={oneToTen}
          />
          <SelectInput
            id="done_to_tackle_climate_change"
            name="done_to_tackle_climate_change"
            label="Do you think anything can be tackle climate change? / ಹವಾಮಾನ ಬದಲಾವಣೆಯನ್ನು ಏನಾದರೂ ನಿಭಾಯಿಸಬಹುದು
                        ಎಂದು ನೀವು ಭಾವಿಸುತ್ತೀರಾ?"
            required
            disabled
            onChange={handleInputChange}
            value={sendData?.done_to_tackle_climate_change}
            options={yesNoMaybe}
          />
          <SelectInput
            id="do_something_to_tackle_climate_change"
            name="do_something_to_tackle_climate_change"
            label="Do you think you would do something to tackle climate change? / ಹವಾಮಾನ ಬದಲಾವಣೆಯನ್ನು ನಿಭಾಯಿಸಲು
                        ನೀವು ಏನಾದರೂ ಮಾಡುತ್ತೀರಿ ಎಂದು ನೀವು ಭಾವಿಸುತ್ತೀರಾ"
            required
            disabled
            onChange={handleInputChange}
            value={sendData?.do_something_to_tackle_climate_change}
            options={yesNoMaybe}
          />
          <MultipleChoice
            label="What is the main source of water used by your house-hold for other purposes,such as cooking and
                      hand washing? / ಅಡುಗೆ ಮತ್ತು ಕೈ ತೊಳೆಯುವಂತಹ ಇತರ ಉದ್ದೇಶಗಳಿಗಾಗಿ ನಿಮ್ಮ ಮನೆಯವರು ಬಳಸುವ ನೀರಿನ ಮುಖ್ಯ ಮೂಲ
                      ಯಾವುದು?"
            name="main_source_of_water"
            required
            disabled
            handleResources={handleResources}
            options={main_source_of_water}
            selectedOption={sendData.main_source_of_water}
          />
          <SelectInput
            id="shown_below_do_you_agree_with"
            name="shown_below_do_you_agree_with"
            label="Which Statement shown below do you agree with? / ಕೆಳಗೆ ತೋರಿಸಿರುವ ಯಾವ ಹೇಳಿಕೆಯನ್ನು ನೀವು
                        ಒಪ್ಪುತ್ತೀರಿ?"
            required
            disabled
            onChange={handleInputChange}
            value={sendData?.shown_below_do_you_agree_with}
            options={shown_below_do_you_agree_with}
          />
          <SelectInput
            id="How_concerned_local_water_quality"
            name="How_concerned_local_water_quality"
            label="How concerned are you about local water quality that you are consuming now in your village?/
                        ನಿಮ್ಮ ಗ್ರಾಮದಲ್ಲಿ ಈಗ ನೀವು ಸೇವಿಸುತ್ತಿರುವ ಸ್ಥಳೀಯ ನೀರಿನ ಗುಣಮಟ್ಟದ ಬಗ್ಗೆ ನಿಮಗೆ ಎಷ್ಟು ಕಾಳಜಿ ಇದೆ"
            required
            disabled
            onChange={handleInputChange}
            value={sendData?.how_concerned_local_water_quality}
            options={How_concerned_local_water_quality}
          />
          <SelectInput
            id="personal_actions_can_affect_water_quality"
            name="personal_actions_can_affect_water_quality"
            label="My personal actions can affect water quality in my village? / ನನ್ನ ವೈಯಕ್ತಿಕ ಕ್ರಿಯೆಗಳು ನನ್ನ
                        ಹಳ್ಳಿಯಲ್ಲಿ ನೀರಿನ ಗುಣಮಟ್ಟದ ಮೇಲೆ ಪರಿಣಾಮ ಬೀರಬಹುದೇ? "
            required
            disabled
            onChange={handleInputChange}
            value={sendData?.personal_actions_can_affect_water_quality}
            options={personal_actions_can_affect_water_quality}
          />
          <SelectInput
            id="take_water_conservation_measures"
            name="take_water_conservation_measures"
            label="Do you think you take water conservation measures in your everyday life? / ನಿಮ್ಮ ದೈನಂದಿನ
                        ಜೀವನದಲ್ಲಿ ನೀವು ನೀರಿನ ಸಂರಕ್ಷಣೆ ಕ್ರಮಗಳನ್ನು ತೆಗೆದುಕೊಳ್ಳುತ್ತೀರಿ ಎಂದು ನೀವು ಭಾವಿಸುತ್ತೀರಾ"
            required
            disabled
            onChange={handleInputChange}
            value={sendData?.take_water_conservation_measures}
            options={yesNoMaybe}
          />
          <TextInput
            id="If_yes_what_kind_of_measures"
            name="If_yes_what_kind_of_measures"
            label="If yes,what kind of measures have you taken in the past? / ಹೌದು ಎಂದಾದರೆ, ನೀವು ಹಿಂದೆ ಯಾವ ರೀತಿಯ
                        ಕ್ರಮಗಳನ್ನು ತೆಗೆದುಕೊಂಡಿದ್ದೀರಿ?"
            required
            disabled
            placeholder="Your Answer"
            onChange={handleInputChange}
            value={sendData.If_yes_what_kind_of_measures}
          />
          <TextInput
            id="list_down_impact_of_climate_change"
            name="list_down_impact_of_climate_change"
            label="Can you list down impact of climate change on your land?/ನಿಮ್ಮ ಭೂಮಿಯ ಮೇಲೆ ಹವಾಮಾನ ಬದಲಾವಣೆಯ
                      ಪರಿಣಾಮವನ್ನು ನೀವು ಪಟ್ಟಿ ಮಾಡಬಹುದೇ? "
            required
            disabled
            placeholder="Your Answer"
            onChange={handleInputChange}
            value={sendData.list_down_impact_of_climate_change}
          />
          <SelectInput
            id="gifting_his_6_acres_land_to_children"
            name="gifting_his_6_acres_land_to_children"
            label="Bhasker is gifting his 6 acres land to children Meena and Keshav.Out of 6 acres, 3 acres is in
                        P.Halli and another 3 acres is in K.Halli which are closeby. The 2 plots are situated in the
                        borders of K.Halli and P.Halli. K.Halli and P.Halli is separated by a forest in between. Meena
                        and Keshav plans to expand their land by clearing parts of the forest. Meena wants to build a
                        school and keshav wants to build a shopping complex in the forest land. what do you think should
                        be done here? / ಭಾಸ್ಕರ್ ಅವರು ತಮ್ಮ 6 ಎಕರೆ ಜಮೀನನ್ನು ಮಕ್ಕಳಾದ ಮೀನಾ ಮತ್ತು ಕೇಶವ್ ಅವರಿಗೆ ಉಡುಗೊರೆಯಾಗಿ
                        ನೀಡುತ್ತಿದ್ದಾರೆ. 6 ಎಕರೆಯಲ್ಲಿ 3 ಎಕರೆ ಪಿ.ಹಳ್ಳಿಯಲ್ಲಿ ಮತ್ತು ಇನ್ನೊಂದು 3 ಎಕರೆ ಹತ್ತಿರವಿರುವ
                        ಕೆ.ಹಳ್ಳಿಯಲ್ಲಿದೆ. 2 ಪ್ಲಾಟ್‌ಗಳು ಕೆ.ಹಳ್ಳಿ ಮತ್ತು ಪಿ.ಹಳ್ಳಿಯ ಗಡಿಯಲ್ಲಿವೆ. ಕೆ.ಹಳ್ಳಿ ಮತ್ತು ಪಿ.ಹಳ್ಳಿ ನಡುವೆ
                        ಕಾಡಿನಿಂದ ಬೇರ್ಪಟ್ಟಿದೆ. ಮೀನಾ ಮತ್ತು ಕೇಶವ್ ಕಾಡಿನ ಭಾಗಗಳನ್ನು ತೆರವುಗೊಳಿಸುವ ಮೂಲಕ ತಮ್ಮ ಭೂಮಿಯನ್ನು
                        ವಿಸ್ತರಿಸಲು ಯೋಜಿಸಿದ್ದಾರೆ. ಮೀನಾ ಅವರು ಶಾಲೆಯನ್ನು ನಿರ್ಮಿಸಲು ಬಯಸುತ್ತಾರೆ ಮತ್ತು ಕೇಶವ್ ಅವರು ಅರಣ್ಯ
                        ಭೂಮಿಯಲ್ಲಿ ಶಾಪಿಂಗ್ ಕಾಂಪ್ಲೆಕ್ಸ್ ನಿರ್ಮಿಸಲು ಬಯಸುತ್ತಾರೆ. ಇಲ್ಲಿ ಏನು ಮಾಡಬೇಕು ಎಂದು ನೀವು ಯೋಚಿಸುತ್ತೀರಿ?"
            required
            disabled
            onChange={handleInputChange}
            value={sendData?.gifting_his_6_acres_land_to_children}
            options={gifting_his_6_acres_land_to_children}
          />
          <SelectInput
            id="Which_one_according_to_you_is_right"
            name="Which_one_according_to_you_is_right"
            label="Which one according to you is right? / ನಿಮ್ಮ ಪ್ರಕಾರ ಯಾವುದು ಸರಿ "
            required
            disabled
            onChange={handleInputChange}
            value={sendData?.which_one_according_to_you_is_right}
            options={Which_one_according_to_you_is_right}
          />
          <SelectInput
            id="believe_connection_between_the_food_health_climate"
            name="believe_connection_between_the_food_health_climate"
            label="Do you believe there is a connection between the food we eat,our health and climate change? /
                        ನಾವು ತಿನ್ನುವ ಆಹಾರ, ನಮ್ಮ ಆರೋಗ್ಯ ಮತ್ತು ಹವಾಮಾನ ಬದಲಾವಣೆಯ ನಡುವೆ ಸಂಬಂಧವಿದೆ ಎಂದು ನೀವು ನಂಬುತ್ತೀರಾ?"
            required
            disabled
            onChange={handleInputChange}
            value={sendData?.believe_connection_between_the_food_health_climate}
            options={believe_connection_between_the_food_health_climate}
          />
          <TextInput
            id="native_food_you_believe_is_envionmentally_friendly"
            name="native_food_you_believe_is_envionmentally_friendly"
            label="Are there any native food you believe is environmentally friendly to plant and is good for
                      health?Name any two / ಸಸ್ಯಗಳಿಗೆ ಪರಿಸರ ಸ್ನೇಹಿ ಮತ್ತು ಆರೋಗ್ಯಕ್ಕೆ ಒಳ್ಳೆಯದು ಎಂದು ನೀವು ನಂಬುವ ಯಾವುದೇ
                      ಸ್ಥಳೀಯ ಆಹಾರವಿದೆಯೇ? ಯಾವುದಾದರೂ ಎರಡನ್ನು ಹೆಸರಿಸಿ "
            required
            disabled
            placeholder="Your Answer"
            onChange={handleInputChange}
            value={sendData.native_food_you_believe_is_envionmentally_friendly}
          />
          <SelectInput
            id="household_activity_pollutes_natural_resources"
            name="household_activity_pollutes_natural_resources"
            label="Which of the following household activity pollutes natural resources? / ಕೆಳಗಿನ ಯಾವ ಮನೆಯ
                        ಚಟುವಟಿಕೆಯು ನೈಸರ್ಗಿಕ ಸಂಪನ್ಮೂಲಗಳನ್ನು ಕಲುಷಿತಗೊಳಿಸುತ್ತದೆ? "
            required
            disabled
            onChange={handleInputChange}
            value={sendData?.household_activity_pollutes_natural_resources}
            options={household_activity_pollutes_natural_resources}
          />
          <SelectInput
            id="alternatives_household_materials_cause_pollution"
            name="alternatives_household_materials_cause_pollution"
            label="Do you think there are alternatives in the household for materials that cause pollution? /
                        ಮಾಲಿನ್ಯವನ್ನು ಉಂಟುಮಾಡುವ ವಸ್ತುಗಳಿಗೆ ಮನೆಯಲ್ಲಿ ಪರ್ಯಾಯಗಳಿವೆ ಎಂದು ನೀವು ಭಾವಿಸುತ್ತೀರಾ?"
            required
            disabled
            onChange={handleInputChange}
            value={sendData?.alternatives_household_materials_cause_pollution}
            options={yesNoMaybe}
          />
          <TextInput
            id="If_yes_what_are_they"
            name="If_yes_what_are_they"
            label=" If yes, what are they? / ಹೌದು ಎಂದಾದರೆ, ಅವು ಯಾವುವು?"
            required
            disabled
            placeholder="Your Answer"
            onChange={handleInputChange}
            value={sendData.If_yes_what_are_they}
          />
          <SelectInput
            id="this_switch_to_eco_friendly_products"
            name="this_switch_to_eco_friendly_products"
            label="Would you be willing to switch to these eco-friendly products and activities? / ಈ ಪರಿಸರ ಸ್ನೇಹಿ
                        ಉತ್ಪನ್ನಗಳು ಮತ್ತು ಚಟುವಟಿಕೆಗಳಿಗೆ ಬದಲಾಯಿಸಲು ನೀವು ಸಿದ್ಧರಿದ್ದೀರಾ? "
            required
            disabled
            onChange={handleInputChange}
            value={sendData?.this_switch_to_eco_friendly_products}
            options={yesNoMaybe}
          />
          <SelectInput
            id="little_more_than_what_you_pay_for_the_chemicals"
            name="little_more_than_what_you_pay_for_the_chemicals"
            label="Would you be willing to make this switch to eco-friendly even if you have a pay a little more
                        than what you pay for the chemicals? / ನೀವು ರಾಸಾಯನಿಕಗಳಿಗೆ ಪಾವತಿಸುವುದಕ್ಕಿಂತ ಸ್ವಲ್ಪ ಹೆಚ್ಚು
                        ವೇತನವನ್ನು ಹೊಂದಿದ್ದರೂ ಸಹ ಪರಿಸರ ಸ್ನೇಹಿಯಾಗಿ ಈ ಬದಲಾವಣೆಯನ್ನು ಮಾಡಲು ನೀವು ಸಿದ್ಧರಿದ್ದೀರಾ"
            required
            disabled
            onChange={handleInputChange}
            value={sendData?.little_more_than_what_you_pay_for_the_chemicals}
            options={yesNoMaybe}
          />
          <TextInput
            id="this_switch_to_eco_friendly_products"
            name="this_switch_to_eco_friendly_products"
            label=" What do you think we should make this switch to eco-friendlly products? / ಪರಿಸರ ಸ್ನೇಹಿ
                        ಉತ್ಪನ್ನಗಳಿಗೆ ನಾವು ಈ ಬದಲಾವಣೆಯನ್ನು ಮಾಡಬೇಕೆಂದು ನೀವು ಏನು ಯೋಚಿಸುತ್ತೀರಿ?"
            required
            disabled
            placeholder="Your Answer"
            onChange={handleInputChange}
            value={sendData.this_switch_to_eco_friendly_products}
          />
          <SelectInput
            id="climate_change_is_a_lot_of_effort"
            name="climate_change_is_a_lot_of_effort"
            label="Do you think developing simple-at-home solutions to climate change is a lot of effort? / ಹವಾಮಾನ
                        ಬದಲಾವಣೆಗೆ ಸರಳವಾದ ಮನೆಯಲ್ಲೇ ಪರಿಹಾರಗಳನ್ನು ಅಭಿವೃದ್ಧಿಪಡಿಸುವುದು ಬಹಳಷ್ಟು ಪ್ರಯತ್ನ ಎಂದು ನೀವು ಭಾವಿಸುತ್ತೀರಾ"
            required
            disabled
            onChange={handleInputChange}
            value={sendData?.climate_change_is_a_lot_of_effort}
            options={yesNoMaybe}
          />
          <SelectInput
            id="action_out_of_concern_for_climate_change"
            name="action_out_of_concern_for_climate_change"
            label="Have you ever taken, or do you regularly take,any action out of concern for climate change? /
                        ಹವಾಮಾನ ಬದಲಾವಣೆಯ ಕಾಳಜಿಯಿಂದ ನೀವು ಎಂದಾದರೂ ತೆಗೆದುಕೊಂಡಿದ್ದೀರಾ ಅಥವಾ ನಿಯಮಿತವಾಗಿ ತೆಗೆದುಕೊಳ್ಳುತ್ತೀರಾ?"
            required
            disabled
            onChange={handleInputChange}
            value={sendData?.action_out_of_concern_for_climate_change}
            options={yesNoMaybe}
          />
          <TextInput
            id="If_yes_what_did_you_do_are_you_doing"
            name="If_yes_what_did_you_do_are_you_doing"
            label="If yes,what did you do/are you doing?/ಹೌದು ಎಂದಾದರೆ, ನೀವು ಏನು ಮಾಡಿದ್ದೀರಿ/ನೀವು ಮಾಡುತ್ತಿದ್ದೀರಿ? "
            required
            disabled
            placeholder="Your Answer"
            onChange={handleInputChange}
            value={sendData.If_yes_what_did_you_do_are_you_doing}
          />
          <SelectInput
            id="natural_resource_community_immediate_attention_measures"
            name="natural_resource_community_immediate_attention_measures"
            label="Do you know what natural resource of your community needs immediate attention and measures of
                        conservation (forest,lake,pond,park etc)? / ನಿಮ್ಮ ಸಮುದಾಯದ ಯಾವ ನೈಸರ್ಗಿಕ ಸಂಪನ್ಮೂಲಕ್ಕೆ ತಕ್ಷಣದ ಗಮನ
                        ಮತ್ತು ಸಂರಕ್ಷಣೆಯ ಕ್ರಮಗಳ ಅಗತ್ಯವಿದೆ ಎಂದು ನಿಮಗೆ ತಿಳಿದಿದೆಯೇ (ಅರಣ್ಯ, ಸರೋವರ, ಕೊಳ, ಉದ್ಯಾನವನ ಇತ್ಯಾದಿ)"
            required
            disabled
            onChange={handleInputChange}
            value={sendData?.natural_resource_community_immediate_attention_measures}
            options={yesNoMaybe}
          />
          <TextInput
            id="If_yes_what_is_that_resource"
            name="If_yes_what_is_that_resource"
            label=" If yes,what is that resource? / ಹೌದು ಎಂದಾದರೆ, ಆ ಸಂಪನ್ಮೂಲ ಯಾವುದು?*"
            required
            disabled
            placeholder="Your Answer"
            onChange={handleInputChange}
            value={sendData.If_yes_what_is_that_resource}
          />
          <TextInput
            id="achieve_with_regard_to_natural_resource_conservation"
            name="achieve_with_regard_to_natural_resource_conservation"
            label="What is your goal you want to achieve with regard to natural resource conservation in your
                      village? / ನಿಮ್ಮ ಗ್ರಾಮದಲ್ಲಿ ನೈಸರ್ಗಿಕ ಸಂಪನ್ಮೂಲ ಸಂರಕ್ಷಣೆಗೆ ಸಂಬಂಧಿಸಿದಂತೆ ನೀವು ಸಾಧಿಸಲು ಬಯಸುವ ನಿಮ್ಮ
                      ಗುರಿ ಏನು?"
            required
            disabled
            placeholder="Your Answer"
            onChange={handleInputChange}
            value={sendData.achieve_with_regard_to_natural_resource_conservation}
          />
          <SelectInput
            id="initiative_to_conserve_the_environment"
            name="initiative_to_conserve_the_environment"
            label="Have you seen anyone in the village take a initiative to conserve the environment of your
                        village? / ನಿಮ್ಮ ಗ್ರಾಮದ ಪರಿಸರವನ್ನು ಸಂರಕ್ಷಿಸಲು ಗ್ರಾಮದಲ್ಲಿ ಯಾರಾದರೂ ಮುಂದಾಗಿರುವುದನ್ನು ನೀವು
                        ನೋಡಿದ್ದೀರಾ"
            required
            disabled
            onChange={handleInputChange}
            value={sendData?.initiative_to_conserve_the_environment}
            options={yesNoMaybe}
          />
          <SelectInput
            id="community_together_achieve_my_conservation_goal"
            name="community_together_achieve_my_conservation_goal"
            label="Have you seen anyone in the village take a initiative to conserve the environment of your
                        village? / ನಿಮ್ಮ ಗ್ರಾಮದ ಪರಿಸರವನ್ನು ಸಂರಕ್ಷಿಸಲು ಗ್ರಾಮದಲ್ಲಿ ಯಾರಾದರೂ ಮುಂದಾಗಿರುವುದನ್ನು ನೀವು
                        ನೋಡಿದ್ದೀರಾ?"
            required
            disabled
            onChange={handleInputChange}
            value={sendData?.community_together_achieve_my_conservation_goal}
            options={community_together_achieve_my_conservation_goal}
          />
        </CardContent>
      </Card>
    </Grid>
  );
};
export default ViewOldQuestion;
