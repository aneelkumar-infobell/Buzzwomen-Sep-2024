package Getviewform

import (
	"database/sql"
	"encoding/json"
	"fmt"
	"io/ioutil"
	"net/http"
)

type GreenBaselineSurvey struct {
	ID                                                 string `json:"id"`
	ParticipantID                                      int    `json:"participantId"`
	Email                                              string `json:"email"`
	NameOfTheSurveyor                                  string `json:"name_of_the_surveyor"`
	NameOfTheRespondent                                string `json:"name_of_the_respondent"`
	VillageName                                        string `json:"village_name"`
	PhoneNumber                                        string `json:"phone_number"`
	NaturalResources                                   string `json:"natural_resources"`
	NaturalResourcesImpactingYourLife                  string `json:"natural_resources_impacting_your_life"`
	NaturalWealth                                      string `json:"natural_wealth"`
	ClimateChange                                      string `json:"climate_change"`
	WhatDoYouKnowAboutIt                               string `json:"what_do_you_know_about_it"`
	ChangeInTheWeatherClimate                          string `json:"change_in_the_weather_climate"`
	ChangesHappenedToTheClimate                        string `json:"changes_happened_to_the_climate"`
	ClimateChangeThreatensPersonalFamilyHealthSafety   string `json:"climate_change_threatens_personal_family_health_safety"`
	DoneToTackleClimateChange                          string `json:"done_to_tackle_climate_change"`
	DoSomethingToTackleClimateChange                   string `json:"do_something_to_tackle_climate_change"`
	MainSourceOfWater                                  string `json:"main_source_of_water"`
	ShownBelowDoYouAgreeWith                           string `json:"shown_below_do_you_agree_with"`
	HowConcernedLocalWaterQuality                      string `json:"how_concerned_local_water_quality"`
	PersonalActionsCanAffectWaterQuality               string `json:"personal_actions_can_affect_water_quality"`
	TakeWaterConservationMeasures                      string `json:"take_water_conservation_measures"`
	IfYesWhatKindOfMeasures                            string `json:"if_yes_what_kind_of_measures"`
	ListDownImpactOfClimateChange                      string `json:"list_down_impact_of_climate_change"`
	GiftingHis6AcresLandToChildren                     string `json:"gifting_his_6_acres_land_to_children"`
	WhichOneAccordingToYouIsRight                      string `json:"which_one_according_to_you_is_right"`
	BelieveConnectionBetweenTheFoodHealthClimate       string `json:"believe_connection_between_the_food_health_climate"`
	NativeFoodYouBelieveIsEnvironmentallyFriendly      string `json:"native_food_you_believe_is_envionmentally_friendly"`
	HouseholdActivityPollutesNaturalResources          string `json:"household_activity_pollutes_natural_resources"`
	AlternativesHouseholdMaterialsCausePollution       string `json:"alternatives_household_materials_cause_pollution"`
	IfYesWhatAreThey                                   string `json:"if_yes_what_are_they"`
	EcoFriendlyProductsAndActivities                   string `json:"eco_friendly_products_and_activities"`
	LittleMoreThanWhatYouPayForTheChemicals            string `json:"little_more_than_what_you_pay_for_the_chemicals"`
	ThisSwitchToEcoFriendlyProducts                    string `json:"this_switch_to_eco_friendly_products"`
	ClimateChangeIsALotOfEffort                        string `json:"climate_change_is_a_lot_of_effort"`
	ActionOutOfConcernForClimateChange                 string `json:"action_out_of_concern_for_climate_change"`
	IfYesWhatDidYouDoAreYouDoing                       string `json:"if_yes_what_did_you_do_are_you_doing"`
	NaturalResourceCommunityImmediateAttentionMeasures string `json:"natural_resource_community_immediate_attention_measures"`
	IfYesWhatIsThatResource                            string `json:"if_yes_what_is_that_resource"`
	AchieveWithRegardToNaturalResourceConservation     string `json:"achieve_with_regard_to_natural_resource_conservation"`
	InitiativeToConserveTheEnvironment                 string `json:"initiative_to_conserve_the_environment"`
	CommunityTogetherAchieveMyConservationGoal         string `json:"community_together_achieve_my_conservation_goal"`
	EntryDate                                          string `json:"entry_date"`
	Module1                                            any    `json:"module1"`
	Module2                                            any    `json:"module2"`
	Module3                                            any    `json:"module3"`
	Module4                                            any    `json:"module4"`
	Module5                                            any    `json:"module5"`
	DistrictName                                       string `json:"district_name"`
	TalukName                                          string `json:"taluk_name"`
	PanchayatName                                      string `json:"panchayat_name"`
	AdultMembers                                       int    `json:"adult_members"`
	ChildrenMembers                                    int    `json:"children_members"`
	House                                              string `json:"house"`
	Roof                                               string `json:"roof"`
	RationCard                                         string `json:"ration_card"`
	Cast                                               string `json:"cast"`
	MotherTongue                                       string `json:"mother_tongue"`
	Religion                                           string `json:"religion"`
	Age                                                int    `json:"age"`
	MaritalStatus                                      string `json:"marital_status"`
	Education                                          string `json:"education"`
	PhoneType                                          string `json:"phone_type"`
	PrimaryOccupation                                  string `json:"primary_occupation"`
	SecondaryOccupation                                string `json:"secondary_occupation"`
	WomenOccupation                                    string `json:"womens_occupation"`
	HouseholdMigrationLastYear                         string `json:"household_migration_last_year"`
	MigrantSendsRemittances                            string `json:"migrant_sends_remittances"`
	HouseholdOwnsLand                                  string `json:"household_owns_land"`
	LandAcres                                          string `json:"land_acres"`
	MonthlyExpenditure                                 string `json:"monthly_expenditure"`
	MonthlyIncome                                      string `json:"monthly_income"`
	DailyClimateAction                                 string `json:"daily_climate_action"`
	RunsEnterprise                                     string `json:"runs_enterprise"`
	EcoFriendlyPracticesEnterprise                     string `json:"eco_friendly_practices_enterprise"`
	EcoFriendlyPracticesDetails                        string `json:"eco_friendly_practices_details"`
	WasteSegregationAtHome                             string `json:"waste_segregation_at_home"`
	IsMenstruating                                     string `json:"is_menstruating"`
	MenstruationProductsUsed                           string `json:"menstruation_products_used"`
	SanitaryDisposalMethod                             string `json:"sanitary_disposal_method"`
	SoilChangesOverYears                               string `json:"soil_changes_over_years"`
	SoilObservationsIfNoChanges                        string `json:"soil_observations_if_no_changes"`
	EssentialCharacteristicsFertileSoil                string `json:"essential_characteristics_of_fertile_soil"`
	MainCropGrown                                      string `json:"main_crop_grown"`
	AccessToNutritionalFood                            string `json:"access_to_nutritional_food"`
	ReasonsForLackOfNutritionalFood                    string `json:"reasons_for_lack_of_nutritional_food"`
	IdentifyTreesInCommunity                           string `json:"identify_trees_in_community"`
	TreeNamesInCommunity                               string `json:"tree_names_in_community"`
	FoodProduction                                     string `json:"food_production"`
	SellProduceLocalMarket                             string `json:"sell_produce_local_market"`
	UsePesticidesFertilizers                           string `json:"use_pesticides_fertilizers"`
	CommunityGovernmentEnvironment                     string `json:"community_government_environment_initiatives"`
	ConserveLocalSeeds                                 string `json:"conserve_local_seeds"`
	NaturalResourceConservationGoal                    string `json:"natural_resource_conservation_goal"`
	Goal                                               string `json:"goal"`
	MobilizedCommunityForConservation                  string `json:"mobilized_community_for_conservation"`
	GreenActionInCommunity                             string `json:"green_action_in_community"`
	DetailsOfGreenAction                               string `json:"details_of_green_action"`
	MainProductsServicesUsed                           string `json:"main_products_services_used"`
	HouseholdWasteManagement                           string `json:"household_waste_management"`
	WasteCategoriesProduced                            string `json:"waste_categories_produced"`
	AccessToDailyLivingProducts                        string `json:"access_to_daily_living_products"`
	LocallyProducedProductsConsumed                    string `json:"locally_produced_products_consumed"`
}

func GetGreenBaselineSurvey(w http.ResponseWriter, r *http.Request, db *sql.DB) {
	w.Header().Set("Access-Control-Allow-Headers", "Accept, Content-Type, Content-Length, Accept-Encoding, X-CSRF-Token, Authorization,application/json,Token")
	w.Header().Set("Access-Control-Allow-Origin", "*")
	w.Header().Set("Access-Control-Allow-Methods", "POST, GET, OPTIONS, PUT, DELETE")
	w.Header().Set("Access-Control-Allow-Credentials", "true")

	data, err := ioutil.ReadAll(r.Body)
	if err != nil {
		json.NewEncoder(w).Encode(map[string]interface{}{"message": "Failed to read body", "success": false, "error": err.Error()})
		return
	}

	defer r.Body.Close()

	var req struct {
		ParticipantID int `json:"participantId"`
	}

	err = json.Unmarshal(data, &req)
	if err != nil {
		json.NewEncoder(w).Encode(map[string]interface{}{"code": http.StatusBadRequest, "message": "Failed to unmarshal", "success": false, "error": err.Error()})
		return
	}

	query := fmt.Sprintf(`
    SELECT 
        COALESCE(id, '') AS id,
        COALESCE(partcipantId, 0) AS partcipantId,
        COALESCE(Email, '') AS Email,
        COALESCE(Name_of_the_surveyor, '') AS Name_of_the_surveyor,
        COALESCE(Name_of_the_respondent, '') AS Name_of_the_respondent,
        COALESCE(Village_Name, '') AS Village_Name,
        COALESCE(Phone_number, '') AS Phone_number,
        COALESCE(natural_resources, '') AS natural_resources,
        COALESCE(natural_resources_impacting_your_life, '') AS natural_resources_impacting_your_life,
        COALESCE(Natural_Wealth, '') AS Natural_Wealth,
        COALESCE(climate_change, '') AS climate_change,
        COALESCE(What_do_you_know_about_it, '') AS What_do_you_know_about_it,
        COALESCE(change_in_the_weather_climate, '') AS change_in_the_weather_climate,
        COALESCE(changes_happened_to_the_climate, '') AS changes_happened_to_the_climate,
        COALESCE(climate_change_threatens_personal_family_health_safety, '') AS climate_change_threatens_personal_family_health_safety,
        COALESCE(done_to_tackle_climate_change, '') AS done_to_tackle_climate_change,
        COALESCE(do_something_to_tackle_climate_change, '') AS do_something_to_tackle_climate_change,
        COALESCE(main_source_of_water, '') AS main_source_of_water,
        COALESCE(shown_below_do_you_agree_with, '') AS shown_below_do_you_agree_with,
        COALESCE(How_concerned_local_water_quality, '') AS How_concerned_local_water_quality,
        COALESCE(personal_actions_can_affect_water_quality, '') AS personal_actions_can_affect_water_quality,
        COALESCE(take_water_conservation_measures, '') AS take_water_conservation_measures,
        COALESCE(If_yes_what_kind_of_measures, '') AS If_yes_what_kind_of_measures,
        COALESCE(list_down_impact_of_climate_change, '') AS list_down_impact_of_climate_change,
        COALESCE(gifting_his_6_acres_land_to_children, '') AS gifting_his_6_acres_land_to_children,
        COALESCE(Which_one_according_to_you_is_right, '') AS Which_one_according_to_you_is_right,
        COALESCE(believe_connection_between_the_food_health_climate, '') AS believe_connection_between_the_food_health_climate,
        COALESCE(native_food_you_believe_is_envionmentally_friendly, '') AS native_food_you_believe_is_envionmentally_friendly,
        COALESCE(household_activity_pollutes_natural_resources, '') AS household_activity_pollutes_natural_resources,
        COALESCE(alternatives_household_materials_cause_pollution, '') AS alternatives_household_materials_cause_pollution,
        COALESCE(If_yes_what_are_they, '') AS If_yes_what_are_they,
        COALESCE(eco_friendly_products_and_activities, '') AS eco_friendly_products_and_activities,
        COALESCE(little_more_than_what_you_pay_for_the_chemicals, '') AS little_more_than_what_you_pay_for_the_chemicals,
        COALESCE(this_switch_to_eco_friendly_products, '') AS this_switch_to_eco_friendly_products,
        COALESCE(climate_change_is_a_lot_of_effort, '') AS climate_change_is_a_lot_of_effort,
        COALESCE(action_out_of_concern_for_climate_change, '') AS action_out_of_concern_for_climate_change,
        COALESCE(If_yes_what_did_you_do_are_you_doing, '') AS If_yes_what_did_you_do_are_you_doing,
        COALESCE(natural_resource_community_immediate_attention_measures, '') AS natural_resource_community_immediate_attention_measures,
        COALESCE(If_yes_what_is_that_resource, '') AS If_yes_what_is_that_resource,
        COALESCE(achieve_with_regard_to_natural_resource_conservation, '') AS achieve_with_regard_to_natural_resource_conservation,
        COALESCE(initiative_to_conserve_the_environment, '') AS initiative_to_conserve_the_environment,
        COALESCE(community_together_achieve_my_conservation_goal, '') AS community_together_achieve_my_conservation_goal,
        COALESCE(entry_date, '') AS entry_date,
        COALESCE(module1, '') AS module1,
        COALESCE(module2, '') AS module2,
        COALESCE(module3, '') AS module3,
        COALESCE(module4, '') AS module4,
        COALESCE(module5, '') AS module5,
       COALESCE(district_name, '') AS district_name,
  COALESCE(taluk_name, '') AS taluk_name,
  COALESCE(panchayat_name, '') AS panchayat_name,
  COALESCE(adult_members, 0) AS adult_members,
  COALESCE(children_members, 0) AS children_members,
  COALESCE(house, '') AS house,
  COALESCE(roof, '') AS roof,
  COALESCE(ration_card, '') AS ration_card,
  COALESCE(cast, '') AS cast,
  COALESCE(mother_tongue, '') AS mother_tongue,
  COALESCE(religion, '') AS religion,
  COALESCE(age, 0) AS age,
  COALESCE(marital_status, '') AS marital_status,
  COALESCE(education, '') AS education,
  COALESCE(phone_type, '') AS phone_type,
  COALESCE(primary_occupation, '') AS primary_occupation,
  COALESCE(secondary_occupation, '') AS secondary_occupation,
  COALESCE(womens_occupation, '') AS womens_occupation,
  COALESCE(household_migration_last_year, '') AS household_migration_last_year,
  COALESCE(migrant_sends_remittances, '') AS migrant_sends_remittances,
  COALESCE(household_owns_land, '') AS household_owns_land,
  COALESCE(land_acres, 0) AS land_acres,
  COALESCE(monthly_expenditure, 0) AS monthly_expenditure,
  COALESCE(monthly_income, 0) AS monthly_income,
  COALESCE(daily_climate_action, '') AS daily_climate_action,
  COALESCE(runs_enterprise, '') AS runs_enterprise,
  COALESCE(eco_friendly_practices_enterprise, '') AS eco_friendly_practices_enterprise,
  COALESCE(eco_friendly_practices_details, '') AS eco_friendly_practices_details,
  COALESCE(waste_segregation_at_home, '') AS waste_segregation_at_home,
  COALESCE(is_menstruating, '') AS is_menstruating,
  COALESCE(menstruation_products_used, '') AS menstruation_products_used,
  COALESCE(sanitary_disposal_method, '') AS sanitary_disposal_method,
  COALESCE(soil_changes_over_years, '') AS soil_changes_over_years,
  COALESCE(soil_observations_if_no_changes, '') AS soil_observations_if_no_changes,
  COALESCE(essential_characteristics_of_fertile_soil, '') AS essential_characteristics_of_fertile_soil,
  COALESCE(main_crop_grown, '') AS main_crop_grown,
  COALESCE(access_to_nutritional_food, '') AS access_to_nutritional_food,
  COALESCE(reasons_for_lack_of_nutritional_food, '') AS reasons_for_lack_of_nutritional_food,
  COALESCE(identify_trees_in_community, '') AS identify_trees_in_community,
  COALESCE(tree_names_in_community, '') AS tree_names_in_community,
  COALESCE(food_production, '') AS food_production,
  COALESCE(sell_produce_local_market, '') AS sell_produce_local_market,
  COALESCE(use_pesticides_fertilizers, '') AS use_pesticides_fertilizers,
  COALESCE(community_government_environment_initiatives, '') AS community_government_environment_initiatives,
  COALESCE(conserve_local_seeds, '') AS conserve_local_seeds,
  COALESCE(natural_resource_conservation_goal, '') AS natural_resource_conservation_goal,
  COALESCE(goal, '') AS goal,
  COALESCE(mobilized_community_for_conservation, '') AS mobilized_community_for_conservation,
  COALESCE(green_action_in_community, '') AS green_action_in_community,
  COALESCE(details_of_green_action, '') AS details_of_green_action,
  COALESCE(main_products_services_used, '') AS main_products_services_used,
  COALESCE(household_waste_management, '') AS household_waste_management,
  COALESCE(waste_categories_produced, '') AS waste_categories_produced,
  COALESCE(access_to_daily_living_products, '') AS access_to_daily_living_products,
  COALESCE(locally_produced_products_consumed, '') AS locally_produced_products_consumed
    FROM GreenBaselineSurvey 
    WHERE partcipantId = %d
`, req.ParticipantID)

	rows, err := db.Query(query)

	if err != nil {
		json.NewEncoder(w).Encode(map[string]interface{}{"code": http.StatusInternalServerError, "message": "Database Query Error", "success": false, "error": err.Error()})
		return
	}
	defer rows.Close()

	var response []GreenBaselineSurvey

	for rows.Next() {
		var queryData GreenBaselineSurvey

		err := rows.Scan(
			&queryData.ID,
			&queryData.ParticipantID,
			&queryData.Email,
			&queryData.NameOfTheSurveyor,
			&queryData.NameOfTheRespondent,
			&queryData.VillageName,
			&queryData.PhoneNumber,
			&queryData.NaturalResources,
			&queryData.NaturalResourcesImpactingYourLife,
			&queryData.NaturalWealth,
			&queryData.ClimateChange,
			&queryData.WhatDoYouKnowAboutIt,
			&queryData.ChangeInTheWeatherClimate,
			&queryData.ChangesHappenedToTheClimate,
			&queryData.ClimateChangeThreatensPersonalFamilyHealthSafety,
			&queryData.DoneToTackleClimateChange,
			&queryData.DoSomethingToTackleClimateChange,
			&queryData.MainSourceOfWater,
			&queryData.ShownBelowDoYouAgreeWith,
			&queryData.HowConcernedLocalWaterQuality,
			&queryData.PersonalActionsCanAffectWaterQuality,
			&queryData.TakeWaterConservationMeasures,
			&queryData.IfYesWhatKindOfMeasures,
			&queryData.ListDownImpactOfClimateChange,
			&queryData.GiftingHis6AcresLandToChildren,
			&queryData.WhichOneAccordingToYouIsRight,
			&queryData.BelieveConnectionBetweenTheFoodHealthClimate,
			&queryData.NativeFoodYouBelieveIsEnvironmentallyFriendly,
			&queryData.HouseholdActivityPollutesNaturalResources,
			&queryData.AlternativesHouseholdMaterialsCausePollution,
			&queryData.IfYesWhatAreThey,
			&queryData.EcoFriendlyProductsAndActivities,
			&queryData.LittleMoreThanWhatYouPayForTheChemicals,
			&queryData.ThisSwitchToEcoFriendlyProducts,
			&queryData.ClimateChangeIsALotOfEffort,
			&queryData.ActionOutOfConcernForClimateChange,
			&queryData.IfYesWhatDidYouDoAreYouDoing,
			&queryData.NaturalResourceCommunityImmediateAttentionMeasures,
			&queryData.IfYesWhatIsThatResource,
			&queryData.AchieveWithRegardToNaturalResourceConservation,
			&queryData.InitiativeToConserveTheEnvironment,
			&queryData.CommunityTogetherAchieveMyConservationGoal,
			&queryData.EntryDate,
			&queryData.Module1,
			&queryData.Module2,
			&queryData.Module3,
			&queryData.Module4,
			&queryData.Module5,
			&queryData.DistrictName,
			&queryData.TalukName,
			&queryData.PanchayatName,
			&queryData.AdultMembers,
			&queryData.ChildrenMembers,
			&queryData.House,
			&queryData.Roof,
			&queryData.RationCard,
			&queryData.Cast,
			&queryData.MotherTongue,
			&queryData.Religion,
			&queryData.Age,
			&queryData.MaritalStatus,
			&queryData.Education,
			&queryData.PhoneType,
			&queryData.PrimaryOccupation,
			&queryData.SecondaryOccupation,
			&queryData.WomenOccupation,
			&queryData.HouseholdMigrationLastYear,
			&queryData.MigrantSendsRemittances,
			&queryData.HouseholdOwnsLand,
			&queryData.LandAcres,
			&queryData.MonthlyExpenditure,
			&queryData.MonthlyIncome,
			&queryData.DailyClimateAction,
			&queryData.RunsEnterprise,
			&queryData.EcoFriendlyPracticesEnterprise,
			&queryData.EcoFriendlyPracticesDetails,
			&queryData.WasteSegregationAtHome,
			&queryData.IsMenstruating,
			&queryData.MenstruationProductsUsed,
			&queryData.SanitaryDisposalMethod,
			&queryData.SoilChangesOverYears,
			&queryData.SoilObservationsIfNoChanges,
			&queryData.EssentialCharacteristicsFertileSoil,
			&queryData.MainCropGrown,
			&queryData.AccessToNutritionalFood,
			&queryData.ReasonsForLackOfNutritionalFood,
			&queryData.IdentifyTreesInCommunity,
			&queryData.TreeNamesInCommunity,
			&queryData.FoodProduction,
			&queryData.SellProduceLocalMarket,
			&queryData.UsePesticidesFertilizers,
			&queryData.CommunityGovernmentEnvironment,
			&queryData.ConserveLocalSeeds,
			&queryData.NaturalResourceConservationGoal,
			&queryData.Goal,
			&queryData.MobilizedCommunityForConservation,
			&queryData.GreenActionInCommunity,
			&queryData.DetailsOfGreenAction,
			&queryData.MainProductsServicesUsed,
			&queryData.HouseholdWasteManagement,
			&queryData.WasteCategoriesProduced,
			&queryData.AccessToDailyLivingProducts,
			&queryData.LocallyProducedProductsConsumed,
		)
		if err != nil {
			json.NewEncoder(w).Encode(map[string]interface{}{"code": http.StatusInternalServerError, "message": "Database Scan Error", "success": false, "error": err.Error()})
			return
		}

		response = append(response, queryData)
	}

	w.Header().Set("Content-Type", "application/json")
	json.NewEncoder(w).Encode(map[string]interface{}{"data": response, "success": true, "message": "GreenBaselineSurvey"})
}
