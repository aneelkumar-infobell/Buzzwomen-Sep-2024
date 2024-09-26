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
} from './GreenSurveySelectOptions';
import TextInput from 'src/components/TextInput';
import SelectInput from 'src/components/SelectInput';
import MultipleChoice from 'src/components/MultipleChoice';
import { Grid, Card, CardContent } from '@mui/material';
import Typography from '@mui/material/Typography';
const ViewNewQuestion = ({ sendData, handleInputChange, handleResources }) => {
  return (
    <Grid>
      <Card>
        <CardContent>
          <TextInput
            id="name_of_the_respondent"
            name="name_of_the_respondent"
            label="Name of the respondent"
            required
            disabled
            placeholder="Your Answer"
            onChange={handleInputChange}
            value={sendData.name_of_the_respondent || ''}
          />
          <TextInput
            id="name_of_the_surveyor"
            placeholder="Your Answer"
            label="Green Motivator name"
            kannadaLabel="ಹಸಿರು ಪ್ರೇರಕಿಯ ಹೆಸರು"
            required
            disabled
            type="email"
            name="name_of_the_surveyor"
            onChange={handleInputChange}
            value={sendData?.name_of_the_surveyor}
          />
          <SelectInput
            id="district_name"
            name="district_name"
            label="Districts name"
            kannadaLabel="ಜಿಲ್ಲೆಗಳ ಹೆಸರು"
            required
            disabled
            onChange={handleInputChange}
            value={sendData?.district_name}
            options={districtsOptions}
          />
          <SelectInput
            id="taluk_name"
            name="taluk_name"
            label="Taluks name"
            kannadaLabel="ತಾಲೂಕು ಹೆಸರು"
            required
            disabled
            onChange={handleInputChange}
            value={sendData?.taluk_name}
            options={districtsOptions}
          />
          <SelectInput
            id="panchayat_name"
            name="panchayat_name"
            label="Panchayat name"
            kannadaLabel="ಪಂಚಾಯತ್ ಹೆಸರು"
            required
            disabled
            onChange={handleInputChange}
            value={sendData?.panchayat_name}
            options={districtsOptions}
          />
          <SelectInput
            id="village_name"
            name="village_name"
            label="Village name"
            kannadaLabel="ಗ್ರಾಮದ ಹೆಸರು"
            required
            disabled
            onChange={handleInputChange}
            value={sendData?.village_name}
            options={districtsOptions}
          />

          <TextInput
            id="adult_members"
            name="adult_members"
            label="Total number of members in your household (adult)"
            kannadaLabel="ನಿಮ್ಮ ಮನೆಯ ಸದಸ್ಯರ ಒಟ್ಟು ಸಂಖ್ಯೆ"
            type="number"
            required
            disabled
            inputProps={{ inputMode: 'numeric', pattern: '[0-9]*', maxLength: 2 }}
            placeholder="Your Answer"
            onChange={handleInputChange}
            value={sendData.adult_members}
          />
          <TextInput
            id="children_members"
            name="children_members"
            label="Total number of members in your household (children)"
            type="number"
            required
            disabled
            inputProps={{ inputMode: 'numeric', pattern: '[0-9]*', maxLength: 2 }}
            placeholder="Your Answer"
            onChange={handleInputChange}
            value={sendData.children_members}
          />

          <SelectInput
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
          <SelectInput
            id="roof"
            name="roof"
            label="Roof"
            kannadaLabel="ಛಾವಣಿ"
            required
            disabled
            onChange={handleInputChange}
            value={sendData?.roof}
            options={roof}
          />
          <SelectInput
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
          <SelectInput
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
          <SelectInput
            id="mother_tongue"
            name="mother_tongue"
            label="Mother Tongue"
            kannadaLabel="ಮಾತೃ ಭಾಷೆ"
            required
            disabled
            onChange={handleInputChange}
            value={sendData?.mother_tongue}
            options={motherTongue}
          />
          <SelectInput
            id="religion"
            name="religion"
            label="religion"
            kannadaLabel="ಧರ್ಮ"
            required
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
            required
            disabled
            inputProps={{ inputMode: 'numeric', pattern: '[0-9]*', maxLength: 2 }}
            placeholder="Your Answer"
            onChange={handleInputChange}
            value={sendData.age}
          />

          <SelectInput
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
          <SelectInput
            id="education"
            name="education"
            label="Education"
            kannadaLabel="ಶಿಕ್ಷಣ"
            required
            disabled
            onChange={handleInputChange}
            value={sendData?.education}
            options={education}
          />
          <SelectInput
            id="phone_type"
            name="phone_type"
            label="Phone type"
            kannadaLabel="ಫೋನ್ ಪ್ರಕಾರ"
            required
            disabled
            onChange={handleInputChange}
            value={sendData?.phone_type}
            options={phoneType}
          />

          <TextInput
            id="phone_number"
            name="phone_number"
            label="Phone Number  ದೂರವಾಣಿ ಸಂಖ್ಯೆ"
            type="number"
            required
            disabled
            inputProps={{ inputMode: 'numeric', pattern: '[0-9]*', maxLength: 2 }}
            placeholder="Your Answer"
            onChange={handleInputChange}
            value={sendData.phone_number}
          />

          <MultipleChoice
            id="primary_occupation"
            name="primary_occupation"
            label="Current Economic Activity - Primary Occupation of the Household"
            kannadaLabel="ಪ್ರಸ್ತುತ ಆರ್ಥಿಕ ಚಟುವಟಿಕೆ - ಕುಟುಂಬದ ಪ್ರಾಥಮಿಕ ಉದ್ಯೋಗ"
            required
            disabled
            selectedOption={sendData.primary_occupation}
            handleResources={handleResources}
            options={currentEconomicActivity}
          />
          <MultipleChoice
            id="secondary_occupation"
            name="secondary_occupation"
            label="Secondary Occupation of the Household "
            kannadaLabel="ಕುಟುಂಬದ ದ್ವಿತೀಯಕ ಉದ್ಯೋಗ"
            required
            disabled
            handleResources={handleResources}
            options={secondaryOccupationHousehold}
            selectedOption={sendData.secondary_occupation}
          />
          <SelectInput
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
          <SelectInput
            id="household_migration_last_year"
            name="household_migration_last_year"
            label="Has anyone in your household migrated in the last 1 year for work?  "
            kannadaLabel="ನಿಮ್ಮ ಮನೆಯಲ್ಲಿ ಯಾರಾದರೂ ಕೆಲಸಕ್ಕಾಗಿ ಕಳೆದ 1 ವರ್ಷದಲ್ಲಿ ವಲಸೆ ಹೋಗಿದ್ದಾರೆಯೇ? "
            required
            disabled
            onChange={handleInputChange}
            value={sendData?.household_migration_last_year}
            options={yesOrNo}
          />
          <SelectInput
            id="migrant_sends_remittances"
            name="migrant_sends_remittances"
            label="Does the migrant member send remittances to the household? Y/N "
            kannadaLabel="ವಲಸಿಗ ಸದಸ್ಯರು ಮನೆಗೆ ಹಣ ಕಳುಹಿಸುತ್ತಾರೆಯೇ? ಹೌದು ಅಲ್ಲ"
            required
            disabled
            onChange={handleInputChange}
            value={sendData?.migrant_sends_remittances}
            options={yesOrNo}
          />
          <SelectInput
            id="household_owns_land"
            name="household_owns_land"
            label="Does your household have a land?"
            kannadaLabel=""
            required
            disabled
            onChange={handleInputChange}
            value={sendData?.household_owns_land}
            options={yesOrNo}
          />

          <TextInput
            id="land_acres"
            name="land_acres"
            label="How much land do you have ( in acres)?"
            type="number"
            required
            disabled
            inputProps={{ inputMode: 'numeric', maxLength: 100 }}
            placeholder="Your Answer"
            onChange={handleInputChange}
            value={sendData.land_acres}
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
            id="monthly_income"
            name="monthly_income"
            label="Monthly household income(in Rs.)  ಮಾಸಿಕ ಮನೆಯ ಆದಾಯ(ರೂ.ಗಳಲ್ಲಿ)"
            type="number"
            required
            disabled
            inputProps={{ inputMode: 'numeric', maxLength: 100 }}
            placeholder="Your Answer"
            onChange={handleInputChange}
            value={sendData.monthly_income}
          />

          <Card style={{ marginTop: 40, backgroundColor: '#F6F8FB', borderRadius: 20 }}>
            <CardContent>
              <Typography style={{ color: '#ff7424' }}>l.Behaviour and Skills l.ನಡವಳಿಕೆ ಮತ್ತು ಕೌಶಲ್ಯಗಳು</Typography>

              <MultipleChoice
                card={false}
                label="1.What are small changes you have made in your day-to-day life to combat climate change ?  
                          1.ಹವಾಮಾನ ಬದಲಾವಣೆಯನ್ನು ಎದುರಿಸಲು ನಿಮ್ಮ ದಿನನಿತ್ಯದ ಜೀವನದಲ್ಲಿ ನೀವು ಮಾಡಿದ ಸಣ್ಣ ಬದಲಾವಣೆಗಳು ಯಾವುವು?"
                name="daily_climate_action"
                required
                disabled
                handleResources={handleResources}
                options={dayToDayLifeCombatClimateChange}
                selectedOption={sendData.daily_climate_action}
              />
              <SelectInput
                card={false}
                id="runs_enterprise"
                name="runs_enterprise"
                label="2. Does your family or you run an enterprise?   "
                kannadaLabel="2. ನಿಮ್ಮ ಕುಟುಂಬ ಅಥವಾ ನೀವು ಉದ್ಯಮವನ್ನು ನಡೆಸುತ್ತೀರಾ? "
                required
                disabled
                onChange={handleInputChange}
                value={sendData?.runs_enterprise}
                options={yesOrNo}
              />
              <SelectInput
                card={false}
                id="eco_friendly_practices_enterprise"
                name="eco_friendly_practices_enterprise"
                label="3. If running an enterprise, have you brought in eco-friendly practices in your enterprise?   "
                kannadaLabel="3. ಉದ್ಯಮವನ್ನು ನಡೆಸುತ್ತಿದ್ದರೆ, ನಿಮ್ಮ ಉದ್ಯಮದಲ್ಲಿ ನೀವು ಪರಿಸರ ಸ್ನೇಹಿ ಅಭ್ಯಾಸಗಳನ್ನು ತಂದಿದ್ದೀರಾ? "
                required
                disabled
                onChange={handleInputChange}
                value={sendData?.eco_friendly_practices_enterprise}
                options={yesOrNo}
              />
              <MultipleChoice
                card={false}
                label="4. If yes, what are those practices?"
                kannadaLabel="4. ಹೌದು ಎಂದಾದರೆ, ಆ ಅಭ್ಯಾಸಗಳು ಯಾವುವು?"
                name="eco_friendly_practices_details"
                required
                disabled
                handleResources={handleResources}
                options={whatAreThosePractices}
                selectedOption={sendData.eco_friendly_practices_details}
              />

              <SelectInput
                card={false}
                id="waste_segregation_at_home"
                name="waste_segregation_at_home"
                label="5. Do you segregate your waste at home? "
                kannadaLabel="5. ನೀವು  ನಿಮ್ಮ  ಮನೆಯಲ್ಲಿ ಬರುವ  ತ್ಯಾಜ್ಯವನ್ನು ಪ್ರತ್ಯೇಕಿಸುತ್ತೀರಾ?"
                required
                disabled
                onChange={handleInputChange}
                value={sendData?.waste_segregation_at_home}
                options={segregateYourWasteAtHome}
              />
              <SelectInput
                card={false}
                id="is_menstruating"
                name="is_menstruating"
                label="6. Are you a menstruating woman?"
                kannadaLabel="6. ನೀವು ಮುಟ್ಟಿನ ಮಹಿಳೆಯೇ? "
                required
                disabled
                onChange={handleInputChange}
                value={sendData?.is_menstruating}
                options={segregateYourWasteAtHome}
              />

              <MultipleChoice
                card={false}
                label="7. If yes, what do you use for your menstruation flow? "
                kannadaLabel="7. ಹೌದು ಎಂದಾದರೆ, ನಿಮ್ಮ ಮುಟ್ಟಿನ ಸಂಧರ್ಭದಲ್ಲಿ ನೀವು ಏನು ಬಳಸುತ್ತೀರಿ?"
                name="menstruation_products_used"
                required
                disabled
                handleResources={handleResources}
                options={menstruationFlow}
                selectedOption={sendData.menstruation_products_used}
              />

              <SelectInput
                card={false}
                id="sanitary_disposal_method"
                name="sanitary_disposal_method"
                label="8.How do you dispose of your sanitary pad/ tampons/ clothes?  "
                kannadaLabel="8. ನಿಮ್ಮ ಸ್ಯಾನಿಟರಿ ಪ್ಯಾಡ್ / ಟ್ಯಾಂಪೂನ್ / ಬಟ್ಟೆಗಳನ್ನು ನೀವು ಹೇಗೆ ವಿಲೇವಾರಿ ಮಾಡುತ್ತೀರಿ?"
                required
                disabled
                onChange={handleInputChange}
                value={sendData?.sanitary_disposal_method}
                options={disposeYourSanitaryPad}
              />
              <SelectInput
                card={false}
                id="soil_changes_over_years"
                name="soil_changes_over_years"
                label="9. Is there any differences you notices in the soil for years"
                kannadaLabel="9. ಕಳೆದ ಕೆಲವು  ವರ್ಷಗಳಲ್ಲಿ ಮಣ್ಣಿನಲ್ಲಿ ಏನಾದರೂ ಬದಲಾವಣೆ ಗುರುತಿಸಿದ್ಧಿರ ?"
                required
                disabled
                onChange={handleInputChange}
                value={sendData?.soil_changes_over_years}
                options={yesOrNo}
              />

              <MultipleChoice
                card={false}
                label="10.If no , what have you noticed "
                kannadaLabel="10. ಇಲ್ಲದಿದ್ದರೆ, ನೀವು ಏನು ಗಮನಿಸಿದ್ದೀರಿ"
                name="soil_observations_if_no_changes"
                required
                disabled
                handleResources={handleResources}
                options={whatHaveYouNoticed}
                selectedOption={sendData.soil_observations_if_no_changes}
              />

              <SelectInput
                card={false}
                id="essential_characteristics_of_fertile_soil"
                name="essential_characteristics_of_fertile_soil"
                label="11.According to you, what are the essential characteristics of fertile soil?"
                kannadaLabel="11.ನಿಮ್ಮ ಪ್ರಕಾರ, ಫಲವತ್ತಾದ ಮಣ್ಣಿನ ಅಗತ್ಯ ಗುಣಲಕ್ಷಣಗಳು ಯಾವುವು?"
                required
                disabled
                onChange={handleInputChange}
                value={sendData?.essential_characteristics_of_fertile_soil}
                options={yesOrNo}
              />
              <SelectInput
                card={false}
                id="main_crop_grown"
                name="main_crop_grown"
                label="12.Which main crop do you grow?  "
                kannadaLabel="12.ನೀವು ಯಾವ ಮುಖ್ಯ ಬೆಳೆ ಬೆಳೆಯುತ್ತೀರಿ?"
                required
                disabled
                onChange={handleInputChange}
                value={sendData?.main_crop_grown}
                options={WhichMainCropDoYouGrow}
              />
              <SelectInput
                card={false}
                id="access_to_nutritional_food"
                name="access_to_nutritional_food"
                label="13.Are you able to access nutritional food at your place?  "
                kannadaLabel="13. ನಿಮ್ಮ ಸ್ಥಳದಲ್ಲಿ ಪೌಷ್ಠಿಕಾಂಶದ ಆಹಾರವನ್ನು ಕೊಂಡುಕೊಳ್ಳಲು ನಿಮಗೆ ಸಾಧ್ಯವೇ?"
                required
                disabled
                onChange={handleInputChange}
                value={sendData?.access_to_nutritional_food}
                options={yesOrNo}
              />
              <MultipleChoice
                card={false}
                label="14.If no , what are the reasons "
                kannadaLabel="14.ಇಲ್ಲದಿದ್ದರೆ, ಕಾರಣಗಳೇನು "
                name="reasons_for_lack_of_nutritional_food"
                required
                disabled
                handleResources={handleResources}
                options={whatAreTheReasons}
                selectedOption={sendData.reasons_for_lack_of_nutritional_food}
              />
            </CardContent>
          </Card>
          <Card style={{ marginTop: 40, backgroundColor: '#F6F8FB', borderRadius: 20 }}>
            <CardContent>
              <Typography style={{ color: '#ff7424' }}>
                II. Community Awareness Questions II. ಸಮುದಾಯ ಜಾಗೃತಿ ಪ್ರಶ್ನೆಗಳು
              </Typography>

              <SelectInput
                card={false}
                id="identify_trees_in_community"
                name="identify_trees_in_community"
                label="1.Would you be able to identify the kind of trees you have in your community?   "
                kannadaLabel="1.ನಿಮ್ಮ ಸಮುದಾಯದಲ್ಲಿ ನೀವು ಹೊಂದಿರುವ ಮರಗಳನ್ನು ಗುರುತಿಸಲು ನಿಮಗೆ ಸಾಧ್ಯವಾಗುತ್ತದೆಯೇ? "
                required
                disabled
                onChange={handleInputChange}
                value={sendData?.identify_trees_in_community}
                options={yesOrNo}
              />

              <TextInput
                card={false}
                id="tree_names_in_community"
                name="tree_names_in_community"
                label="2.Name any two of them? "
                kannadaLabel="2.ಅವುಗಳಲ್ಲಿ ಯಾವುದಾದರೂ ಎರಡನ್ನು ಹೆಸರಿಸಿ?"
                type="text"
                required
                disabled
                placeholder="Your Answer"
                onChange={handleInputChange}
                value={sendData.tree_names_in_community}
              />
              <SelectInput
                card={false}
                id="food_production"
                name="food_production"
                label="3.Do you produce any food? "
                kannadaLabel="3.ನೀವು ಯಾವುದೇ ಆಹಾರವನ್ನು ಬೆಳೆಯುತ್ತೀರಾ? "
                required
                disabled
                onChange={handleInputChange}
                value={sendData?.food_production}
                options={yesOrNo}
              />
              <SelectInput
                card={false}
                id="sell_produce_local_market"
                name="sell_produce_local_market"
                label="4.Do you sell your produce in the local market? "
                kannadaLabel="4.ನಿಮ್ಮ ಉತ್ಪನ್ನಗಳನ್ನು ಸ್ಥಳೀಯ ಮಾರುಕಟ್ಟೆಯಲ್ಲಿ ಮಾರಾಟ ಮಾಡುತ್ತೀರಾ? "
                required
                disabled
                onChange={handleInputChange}
                value={sendData?.sell_produce_local_market}
                options={yesOrNo}
              />
              <SelectInput
                card={false}
                id="this_switch_to_eco_friendly_products"
                name="this_switch_to_eco_friendly_products"
                label="Would you be willing to switch to these eco-friendly products and activities? "
                kannadaLabel="ಈ ಪರಿಸರ ಸ್ನೇಹಿ ಉತ್ಪನ್ನಗಳಿಗೆ ಮತ್ತು ಚಟುವಟಿಕೆಗಳಿಗೆ ಬದಲಾಯಿಸಲು ನೀವು ಸಿದ್ಧರಿದ್ದೀರಾ?"
                required
                disabled
                onChange={handleInputChange}
                value={sendData?.this_switch_to_eco_friendly_products}
                options={yesNoMaybe}
              />
              <MultipleChoice
                card={false}
                label="5.Do you use pesticides & fertiliser to produce this food?  "
                kannadaLabel="5.ಈ ಆಹಾರವನ್ನು ಬೆಳೆಯಲು ನೀವು ಕೀಟನಾಶಕಗಳು ಮತ್ತು ರಸಗೊಬ್ಬರಗಳನ್ನು ಬಳಸುತ್ತೀರಾ?"
                name="use_pesticides_fertilizers"
                required
                disabled
                handleResources={handleResources}
                options={usePesticidesFertiliserToProduceThisFood}
                selectedOption={sendData.use_pesticides_fertilizers}
              />
              <MultipleChoice
                card={false}
                label="6.Initiatives taken by your community/government to save the environment in our village  "
                kannadaLabel="6.ನಮ್ಮ ಗ್ರಾಮದಲ್ಲಿ ಪರಿಸರವನ್ನು ಉಳಿಸಲು ನಿಮ್ಮ ಸಮುದಾಯ/ಸರ್ಕಾರ ಕೈಗೊಂಡ ಉಪಕ್ರಮಗಳು"
                name="community_government_environment_initiatives"
                required
                disabled
                handleResources={handleResources}
                options={initiativesTakenToSaveTheEnvironmentInOurVillage}
                selectedOption={sendData.community_government_environment_initiatives}
              />
            </CardContent>
          </Card>
          <Card style={{ marginTop: 40, backgroundColor: '#F6F8FB', borderRadius: 20 }}>
            <CardContent>
              <Typography style={{ color: '#ff7424' }}>
                III.Knowledge related questions from the curriculum III. ಪಠ್ಯಕ್ರಮದಿಂದ ಜ್ಞಾನ ಸಂಬಂಧಿತ ಪ್ರಶ್ನೆಗಳು
              </Typography>

              <MultipleChoice
                card={false}
                label="1.Which of the following are natural resources?  "
                kannadaLabel="1. ಕೆಳಗಿನವುಗಳಲ್ಲಿ ಯಾವುದು ನೈಸರ್ಗಿಕ ಸಂಪನ್ಮೂಲಗಳು? "
                name="natural_resources"
                required
                disabled
                handleResources={handleResources}
                options={Which_following_are_natural_resources}
                selectedOption={sendData.natural_resources}
              />
              <SelectInput
                card={false}
                id="climate_change"
                name="climate_change"
                label="2.Have you heard of “climate change”?   "
                kannadaLabel="2.ನೀವು “ಹವಾಮಾನ ಬದಲಾವಣೆ” ಬಗ್ಗೆ ಕೇಳಿದ್ದೀರಾ? "
                required
                disabled
                onChange={handleInputChange}
                value={sendData?.climate_change}
                options={yesOrNo}
              />
              <MultipleChoice
                card={false}
                label="3.What kind of change to climate do you think has happened? "
                kannadaLabel="3.ಹವಾಮಾನದಲ್ಲಿ ಯಾವ ರೀತಿಯ ಬದಲಾವಣೆ ಸಂಭವಿಸಿದೆ ಎಂದು ನೀವು ಭಾವಿಸುತ್ತೀರಿ?"
                name="changes_happened_to_the_climate"
                required
                disabled
                handleResources={handleResources}
                options={What_kind_of_change_to_climate_do_you_think_has_happened}
                selectedOption={sendData.changes_happened_to_the_climate}
              />
              <MultipleChoice
                card={false}
                label="4.How is the change in state of natural resources impacting your life?"
                kannadaLabel="4.ನೈಸರ್ಗಿಕ ಸಂಪನ್ಮೂಲಗಳ ಸ್ಥಿತಿಯಲ್ಲಿನ ಬದಲಾವಣೆಯು ನಿಮ್ಮ ಜೀವನದ ಮೇಲೆ ಹೇಗೆ ಪರಿಣಾಮ ಬೀರುತ್ತದೆ?"
                name="climate_change_threatens_personal_family_health_safety"
                required
                disabled
                handleResources={handleResources}
                options={How_is_the_change_in_state_of_natural_resources_impacting_your_life}
                selectedOption={sendData.climate_change_threatens_personal_family_health_safety}
              />
              <SelectInput
                card={false}
                id="done_to_tackle_climate_change"
                name="done_to_tackle_climate_change"
                label="5.Do you think anything can be done to tackle climate change?"
                kannadaLabel="5.ಹವಾಮಾನ ಬದಲಾವಣೆಯನ್ನು ನಿಭಾಯಿಸಲು ಏನಾದರೂ ಮಾಡಬಹುದು ಎಂದು ನೀವು ಭಾವಿಸುತ್ತೀರಾ?"
                required
                disabled
                onChange={handleInputChange}
                value={sendData?.done_to_tackle_climate_change}
                options={yesOrNo}
              />
              <MultipleChoice
                card={false}
                label="6.According to you, whose responsibility is it to tackle climate change? "
                kannadaLabel="6.ನಿಮ್ಮ ಪ್ರಕಾರ, ಹವಾಮಾನ ಬದಲಾವಣೆಯನ್ನು ನಿಭಾಯಿಸುವುದು ಯಾರ ಜವಾಬ್ದಾರಿ?"
                name="do_something_to_tackle_climate_change"
                required
                disabled
                handleResources={handleResources}
                options={According_to_you_whose_responsibility_is_it_to_tackle_climate_change}
                selectedOption={sendData.do_something_to_tackle_climate_change}
              />
              <MultipleChoice
                card={false}
                label="7.What is the main source of water used by your household for domestic purposes, such as drinking, cooking and hand washing?  "
                kannadaLabel="7.ಕುಡಿಯುವುದು, ಅಡುಗೆ ಮಾಡುವುದು ಮತ್ತು ಕೈ ತೊಳೆಯುವುದು ಮುಂತಾದ ಗೃಹ ಉದ್ದೇಶಗಳಿಗಾಗಿ ನಿಮ್ಮ ಮನೆಯವರು ಬಳಸುವ ನೀರಿನ ಮುಖ್ಯ ಮೂಲ ಯಾವುದು?"
                name="main_source_of_water"
                required
                disabled
                handleResources={handleResources}
                options={What_is_the_main_source_of_water_used_by_your_household_for_domestic_purposes}
                selectedOption={sendData.main_source_of_water}
              />
              <SelectInput
                card={false}
                id="water_you_consume_safe"
                name="water_you_consume_safe"
                label="8.Do you think the water you consume is safe?  "
                kannadaLabel="8.ನೀವು ಸೇವಿಸುವ ನೀರು ಸುರಕ್ಷಿತವಾಗಿದೆ ಎಂದು ನೀವು ಭಾವಿಸುತ್ತೀರಾ?"
                required
                disabled
                onChange={handleInputChange}
                value={sendData?.water_you_consume_safe}
                options={Do_you_think_the_water_you_consume_is_safe}
              />
              <SelectInput
                card={false}
                id="eco_friendly_products_and_activities"
                name="eco_friendly_products_and_activities"
                label="9.Would you be willing to switch to the eco-friendly products and activities in your daily household activities?   "
                kannadaLabel="9.ನಿಮ್ಮ ದೈನಂದಿನ ಮನೆಯ ಚಟುವಟಿಕೆಗಳಲ್ಲಿ ಪರಿಸರ ಸ್ನೇಹಿ ಉತ್ಪನ್ನಗಳು ಮತ್ತು ಚಟುವಟಿಕೆಗಳಿಗೆ ಬದಲಾಯಿಸಲು ನೀವು ಸಿದ್ಧರಿದ್ದೀರಾ? "
                required
                disabled
                onChange={handleInputChange}
                value={sendData?.eco_friendly_products_and_activities}
                options={yesOrNo}
              />
              <SelectInput
                card={false}
                id="little_more_than_what_you_pay_for_the_chemicals"
                name="little_more_than_what_you_pay_for_the_chemicals"
                label="10.Would you be willing to make this switch to eco-friendly products even if you have to pay a little more than what you pay for the chemical products?   "
                kannadaLabel="10. ರಾಸಾಯನಿಕ ಉತ್ಪನ್ನಗಳಿಗೆ ನೀವು ಪಾವತಿಸುವುದಕ್ಕಿಂತ ಸ್ವಲ್ಪ ಹೆಚ್ಚು ಪಾವತಿಸಬೇಕಾದರೂ ಸಹ ಪರಿಸರ ಸ್ನೇಹಿ ಉತ್ಪನ್ನಗಳಿಗೆ ಈ ಬದಲಾವಣೆಯನ್ನು ಮಾಡಲು ನೀವು ಸಿದ್ಧರಿದ್ದೀರಾ? "
                required
                disabled
                onChange={handleInputChange}
                value={sendData?.little_more_than_what_you_pay_for_the_chemicals}
                options={yesOrNo}
              />
              <SelectInput
                card={false}
                id="conserve_local_seeds"
                name="conserve_local_seeds"
                label="11.Are you taking any steps to conserve local seeds in your community? "
                kannadaLabel="11.ನಿಮ್ಮ ಸಮುದಾಯದಲ್ಲಿ ಸ್ಥಳೀಯ ಬೀಜಗಳನ್ನು ಸಂರಕ್ಷಿಸಲು ನೀವು ಯಾವುದೇ ಕ್ರಮಗಳನ್ನು ತೆಗೆದುಕೊಳ್ಳುತ್ತಿರುವಿರಾ?"
                required
                disabled
                onChange={handleInputChange}
                value={sendData?.conserve_local_seeds}
                options={yesOrNo}
              />
            </CardContent>
          </Card>
          <Card style={{ marginTop: 40, backgroundColor: '#F6F8FB', borderRadius: 20 }}>
            <CardContent>
              <Typography style={{ color: '#ff7424' }}>IV. Green Village IV. ಹಸಿರು ಗ್ರಾಮ</Typography>

              <MultipleChoice
                card={false}
                label="1.Which of the following natural resources of your community needs immediate attention and measures of conservation? "
                kannadaLabel="1.ನಿಮ್ಮ ಸಮುದಾಯದ ಕೆಳಗಿನ ಯಾವ ನೈಸರ್ಗಿಕ ಸಂಪನ್ಮೂಲಗಳಿಗೆ ತಕ್ಷಣದ ಗಮನ ಮತ್ತು ಸಂರಕ್ಷಣೆಯ ಕ್ರಮಗಳ ಅಗತ್ಯವಿದೆ?"
                name="achieve_with_regard_to_natural_resource_conservation"
                required
                disabled
                handleResources={handleResources}
                options={
                  Which_of_the_following_natural_resources_of_your_community_needs_immediate_attention_and_measures_of_conservation
                }
                selectedOption={sendData.achieve_with_regard_to_natural_resource_conservation}
              />
              <SelectInput
                card={false}
                id="natural_resource_conservation_goal"
                name="natural_resource_conservation_goal"
                label="2.Do you have a goal with regard to natural resource conservation in your village?  "
                kannadaLabel="2.ನಿಮ್ಮ ಗ್ರಾಮದಲ್ಲಿ ನೈಸರ್ಗಿಕ ಸಂಪನ್ಮೂಲ ಸಂರಕ್ಷಣೆಗೆ ಸಂಬಂಧಿಸಿದಂತೆ ನೀವು ಗುರಿ ಹೊಂದಿದ್ದೀರಾ?"
                required
                disabled
                onChange={handleInputChange}
                value={sendData?.natural_resource_conservation_goal}
                options={yesOrNo}
              />
              <TextInput
                card={false}
                id="goal"
                name="goal"
                label="3. What is this goal? "
                kannadaLabel="3. ಈ ಗುರಿ ಏನು?"
                type="text"
                required
                disabled
                placeholder="Your Answer"
                onChange={handleInputChange}
                value={sendData.goal}
              />
              <SelectInput
                card={false}
                id="mobilized_community_for_conservation"
                name="mobilized_community_for_conservation"
                label="4. Have you mobilised people in your community together to achieve your natural resource conservation goal?   "
                kannadaLabel="4. ನಿಮ್ಮ ನೈಸರ್ಗಿಕ ಸಂಪನ್ಮೂಲ ಸಂರಕ್ಷಣೆ ಗುರಿಯನ್ನು ಸಾಧಿಸಲು ನಿಮ್ಮ ಸಮುದಾಯದ ಜನರನ್ನು ನೀವು ಒಟ್ಟಾಗಿ ಸಜ್ಜುಗೊಳಿಸಿದ್ದೀರಾ? "
                required
                disabled
                onChange={handleInputChange}
                value={sendData?.mobilized_community_for_conservation}
                options={yesOrNo}
              />
              <SelectInput
                card={false}
                id="green_action_in_community"
                name="green_action_in_community"
                label="Have you taken a green action in your community?"
                required
                disabled
                onChange={handleInputChange}
                value={sendData?.green_action_in_community}
                options={yesOrNo}
              />
              <TextInput
                card={false}
                id="details_of_green_action"
                name="details_of_green_action"
                label="What is that green action?"
                type="text"
                required
                disabled
                placeholder="Your Answer"
                onChange={handleInputChange}
                value={sendData.details_of_green_action}
              />
              <MultipleChoice
                card={false}
                label="What are the main products and services that you use in your everyday life?"
                kannadaLabel="ನಿಮ್ಮ ದೈನಂದಿನ ಜೀವನದಲ್ಲಿ ನೀವು ಬಳಸುವ ಮುಖ್ಯ ಉತ್ಪನ್ನಗಳು ಮತ್ತು ಸೇವೆಗಳು ಯಾವುವು? "
                name="main_products_services_used"
                required
                disabled
                handleResources={handleResources}
                options={What_are_the_main_products_and_services_that_you_use_in_your_everyday_life}
                selectedOption={sendData.main_products_services_used}
              />
              <SelectInput
                card={false}
                id="household_waste_management"
                name="household_waste_management"
                label="How do you manage waste in your household? "
                kannadaLabel="ನಿಮ್ಮ ಮನೆಯ ತ್ಯಾಜ್ಯವನ್ನು ನೀವು ಹೇಗೆ ನಿರ್ವಹಿಸುತ್ತೀರಿ?"
                required
                disabled
                onChange={handleInputChange}
                value={sendData?.household_waste_management}
                options={How_do_you_manage_waste_in_your_household}
              />
              <SelectInput
                card={false}
                id="waste_categories_produced"
                name="waste_categories_produced"
                label="Can you name the categories of waste you produce?  "
                kannadaLabel=" ನೀವು ಉತ್ಪಾದಿಸುವ ತ್ಯಾಜ್ಯದ ವರ್ಗಗಳನ್ನು ನೀವು ಹೆಸರಿಸಬಹುದೇ?"
                required
                disabled
                onChange={handleInputChange}
                value={sendData?.waste_categories_produced}
                options={Can_you_name_the_categories_of_waste_you_produce}
              />
              <SelectInput
                card={false}
                id="access_to_daily_living_products"
                name="access_to_daily_living_products"
                label="Do you have access to daily living products locally?"
                kannadaLabel=" ನೀವು ದೈನಂದಿನ  ವಸ್ತುಗಳನ್ನು ಸ್ಥಳೀಯವಾಗಿ   ಪಡೆಯುತ್ತಿದ್ದೀರಾ?"
                required
                disabled
                onChange={handleInputChange}
                value={sendData?.access_to_daily_living_products}
                options={yesOrNo}
              />
              <TextInput
                card={false}
                id="locally_produced_products_consumed"
                name="locally_produced_products_consumed"
                label="If yes, what products do you consume that are produced locally?"
                kannadaLabel="ಹೌದು ಎಂದಾದರೆ, ಸ್ಥಳೀಯವಾಗಿ ಉತ್ಪಾದಿಸುವ ಯಾವ ಉತ್ಪನ್ನಗಳನ್ನು ನೀವು ಬಳಸುತ್ತೀರಿ?"
                type="text"
                required
                disabled
                placeholder="Your Answer"
                onChange={handleInputChange}
                value={sendData.locally_produced_products_consumed}
              />
            </CardContent>
          </Card>
        </CardContent>
      </Card>
    </Grid>
  );
};

export default ViewNewQuestion;
