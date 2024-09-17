package Getviewform

import (
	"database/sql"
	"encoding/json"
	"fmt"
	"log"
	"net/http"
	"os"
)

// type GreenBaselineSurvey1 struct {
// 	Id                                             int64  `json:"id"`
// 	ParticipantID                                  int64  `json:"participant_id"`
// 	Email                                          string `json:"email"`
// 	NameOfTheSurveyor                              string `json:"name_of_the_surveyor"`
// 	NameOfTheRespondent                            string `json:"name_of_the_respondent"`
// 	VillageName                                    string `json:"village_name"`
// 	PhoneNumber                                    string `json:"phone_number"`
// 	NaturalResources                               string `json:"natural_resources"`
// 	NaturalResourcesImpactingYourLife              string `json:"natural_resources_impacting_your_life"`
// 	NaturalWealth                                  string `json:"natural_wealth"`
// 	ClimateChange                                  string `json:"climate_change"`
// 	WhatDoYouKnowAboutIt                           string `json:"what_do_you_know_about_it"`
// 	ChangeInTheWeatherClimate                      string `json:"change_in_the_weather_climate"`
// 	ChangesHappenedToTheClimate                    string `json:"changes_happened_to_the_climate"`
// 	ClimateChangeThreatensHealthSafety             string `json:"climate_change_threatens_personal_family_health_safety"`
// 	DoneToTackleClimateChange                      string `json:"done_to_tackle_climate_change"`
// 	DoSomethingToTackleClimateChange               string `json:"do_something_to_tackle_climate_change"`
// 	MainSourceOfWater                              string `json:"main_source_of_water"`
// 	AgreeWithStatements                            string `json:"shown_below_do_you_agree_with"`
// 	ConcernedLocalWaterQuality                     string `json:"how_concerned_local_water_quality"`
// 	PersonalActionsAffectWaterQuality              string `json:"personal_actions_can_affect_water_quality"`
// 	WaterConservationMeasures                      string `json:"take_water_conservation_measures"`
// 	IfYesWhatKindOfMeasures                        string `json:"if_yes_what_kind_of_measures"`
// 	ListDownImpactOfClimateChange                  string `json:"list_down_impact_of_climate_change"`
// 	GiftingLandToChildren                          string `json:"gifting_his_6_acres_land_to_children"`
// 	WhichOneIsRight                                string `json:"which_one_according_to_you_is_right"`
// 	BelieveConnectionBetweenFoodHealth             string `json:"believe_connection_between_the_food_health_climate"`
// 	EnvironmentallyFriendlyNativeFood              string `json:"native_food_you_believe_is_environmentally_friendly"`
// 	HouseholdPollutesNaturalResources              string `json:"household_activity_pollutes_natural_resources"`
// 	AlternativesHouseholdMaterialsPollute          string `json:"alternatives_household_materials_cause_pollution"`
// 	IfYesWhatAreThey                               string `json:"if_yes_what_are_they"`
// 	EcoFriendlyProductsActivities                  string `json:"eco_friendly_products_and_activities"`
// 	PayMoreForEcoFriendlyProducts                  string `json:"little_more_than_what_you_pay_for_the_chemicals"`
// 	SwitchToEcoFriendlyProducts                    string `json:"this_switch_to_eco_friendly_products"`
// 	ClimateChangeIsEffort                          string `json:"climate_change_is_a_lot_of_effort"`
// 	ActionOutOfConcernForClimateChange             string `json:"action_out_of_concern_for_climate_change"`
// 	IfYesWhatDidYouDo                              string `json:"if_yes_what_did_you_do_are_you_doing"`
// 	NaturalResourceAttentionMeasures               string `json:"natural_resource_community_immediate_attention_measures"`
// 	IfYesWhatResource                              string `json:"if_yes_what_is_that_resource"`
// 	AchieveWithRegardToNaturalResourceConservation string `json:"achieve_with_regard_to_natural_resource_conservation"`
// 	ConservationInitiative                         string `json:"initiative_to_conserve_the_environment"`
// 	CommunityConservationGoal                      string `json:"community_together_achieve_my_conservation_goal"`
// 	EntryDate                                      string `json:"entry_date"`
// 	DistrictName                                   string `json:"district_name"`
// 	TalukName                                      string `json:"taluk_name"`
// 	PanchayatName                                  string `json:"panchayat_name"`
// 	AdultMembers                                   int    `json:"adult_members"`
// 	ChildrenMembers                                int    `json:"children_members"`
// 	House                                          string `json:"house"`
// 	Roof                                           string `json:"roof"`
// 	RationCard                                     string `json:"ration_card"`
// 	Cast                                           string `json:"cast"`
// 	MotherTongue                                   string `json:"mother_tongue"`
// 	Religion                                       string `json:"religion"`
// 	Age                                            int    `json:"age"`
// 	MaritalStatus                                  string `json:"marital_status"`
// 	Education                                      string `json:"education"`
// 	PhoneType                                      string `json:"phone_type"`
// 	PrimaryOccupation                              string `json:"primary_occupation"`
// 	SecondaryOccupation                            string `json:"secondary_occupation"`
// 	WomenOccupation                                string `json:"womens_occupation"`
// 	HouseholdMigrationLastYear                     string `json:"household_migration_last_year"`
// 	MigrantSendsRemittances                        string `json:"migrant_sends_remittances"`
// 	HouseholdOwnsLand                              string `json:"household_owns_land"`
// 	LandAcres                                      int64  `json:"land_acres"`
// 	MonthlyExpenditure                             int64  `json:"monthly_expenditure"`
// 	MonthlyIncome                                  int64  `json:"monthly_income"`
// 	DailyClimateAction                             string `json:"daily_climate_action"`
// 	RunsEnterprise                                 string `json:"runs_enterprise"`
// 	EcoFriendlyPracticesEnterprise                 string `json:"eco_friendly_practices_enterprise"`
// 	EcoFriendlyPracticesDetails                    string `json:"eco_friendly_practices_details"`
// 	WasteSegregationAtHome                         string `json:"waste_segregation_at_home"`
// 	IsMenstruating                                 string `json:"is_menstruating"`
// 	MenstruationProductsUsed                       string `json:"menstruation_products_used"`
// 	SanitaryDisposalMethod                         string `json:"sanitary_disposal_method"`
// 	SoilChangesOverYears                           string `json:"soil_changes_over_years"`
// 	SoilObservationsIfNoChanges                    string `json:"soil_observations_if_no_changes"`
// 	EssentialCharacteristicsFertileSoil            string `json:"essential_characteristics_of_fertile_soil"`
// 	MainCropGrown                                  string `json:"main_crop_grown"`
// 	AccessToNutritionalFood                        string `json:"access_to_nutritional_food"`
// 	ReasonsForLackOfNutritionalFood                string `json:"reasons_for_lack_of_nutritional_food"`
// 	IdentifyTreesInCommunity                       string `json:"identify_trees_in_community"`
// 	TreeNamesInCommunity                           string `json:"tree_names_in_community"`
// 	FoodProduction                                 string `json:"food_production"`
// 	SellProduceLocalMarket                         string `json:"sell_produce_local_market"`
// 	UsePesticidesFertilizers                       string `json:"use_pesticides_fertilizers"`
// 	CommunityGovernmentEnvironment                 string `json:"community_government_environment_initiatives"`
// 	ConserveLocalSeeds                             string `json:"conserve_local_seeds"`
// 	NaturalResourceConservationGoal                string `json:"natural_resource_conservation_goal"`
// 	Goal                                           string `json:"goal"`
// 	MobilizedCommunityForConservation              string `json:"mobilized_community_for_conservation"`
// 	GreenActionInCommunity                         string `json:"green_action_in_community"`
// 	DetailsOfGreenAction                           string `json:"details_of_green_action"`
// 	MainProductsServicesUsed                       string `json:"main_products_services_used"`
// 	HouseholdWasteManagement                       string `json:"household_waste_management"`
// 	WasteCategoriesProduced                        string `json:"waste_categories_produced"`
// 	AccessToDailyLivingProducts                    string `json:"access_to_daily_living_products"`
// 	LocallyProducedProductsConsumed                string `json:"locally_produced_products_consumed"`
// }

func AddGreensurvey(w http.ResponseWriter, r *http.Request, DB *sql.DB) {
	w.Header().Set("Access-Control-Allow-Headers", "Accept, Content-Type, Content-Length, Accept-Encoding, X-CSRF-Token, Authorization, application/json,Token")
	w.Header().Set("Access-Control-Allow-Origin", "*")
	w.Header().Set("Access-Control-Allow-Methods", "POST, GET, OPTIONS, PUT, DELETE")
	file, err := os.OpenFile("./logfile", os.O_APPEND|os.O_WRONLY|os.O_CREATE, 0644)
	if err != nil {
		log.Println("nagarika", err)
		w.WriteHeader(http.StatusBadRequest)
		json.NewEncoder(w).Encode(map[string]interface{}{"Message": err, "Status Code": "400 ", "API": "Addnagarika"})
		return
	}

	log.SetOutput(file)

	var queryData GreenBaselineSurvey
	err1 := json.NewDecoder(r.Body).Decode(&queryData)

	if err1 != nil {
		fmt.Println("errrr", err1)
		log.Println(err1)
		w.WriteHeader(http.StatusBadRequest)
		json.NewEncoder(w).Encode(map[string]string{"Message": "Invalid Input Syntax", "Status Code": "400 ", "API": "Addnagarika"})
		return
	}

	// checkStatement := "SELECT COUNT(*) FROM GreenBaselineSurvey WHERE participantid = ?"
	// var count int
	// err = DB.QueryRow(checkStatement, survey.ParticipantID).Scan(&count)
	// if err != nil {
	// 	fmt.Println("errr", err)
	// 	w.WriteHeader(http.StatusInternalServerError)
	// 	log.Println("Error checking participant ID:", err)
	// 	json.NewEncoder(w).Encode(map[string]interface{}{"Message": "Internal Server Error", "Status Code": "500 ", "API": "Addnagarika"})
	// 	return
	// }
	// if count > 0 {
	// 	w.WriteHeader(http.StatusBadRequest)
	// 	log.Println("Participant ID already present")
	// 	json.NewEncoder(w).Encode(map[string]interface{}{"Message": "Participant ID already present", "Status Code": "400 ", "API": "Addnagarika"})
	// 	return
	// }

	// var name string
	// var date time.Time
	// DB.QueryRow("SELECT name from location where id=1").Scan(&name)
	// switch {
	// case name == "India":
	// 	date = time.Now().Add(5*time.Hour + 30*time.Minute)
	// case name == "Gambia":
	// 	date = time.Now().Add(3 * time.Hour)
	// case name == "Tanzania":
	// 	date = time.Now().Add(3 * time.Hour)
	// }
	if queryData.ParticipantID != 0 {
		sql := `
		INSERT INTO GreenBaselineSurvey (
			partcipantId,
			Email,
			name_of_the_surveyor,
			name_of_the_respondent,
			village_name,
			phone_number,
			natural_resources,
			natural_resources_impacting_your_life,
			natural_wealth,
			climate_change,
			what_do_you_know_about_it,
			change_in_the_weather_climate,
			changes_happened_to_the_climate,
			climate_change_threatens_personal_family_health_safety,
			done_to_tackle_climate_change,
			do_something_to_tackle_climate_change,
			main_source_of_water,
			shown_below_do_you_agree_with,
			how_concerned_local_water_quality,
			personal_actions_can_affect_water_quality,
			take_water_conservation_measures,
			if_yes_what_kind_of_measures,
			list_down_impact_of_climate_change,
			gifting_his_6_acres_land_to_children,
			which_one_according_to_you_is_right,
			believe_connection_between_the_food_health_climate,
			native_food_you_believe_is_envionmentally_friendly,
			household_activity_pollutes_natural_resources,
			alternatives_household_materials_cause_pollution,
			if_yes_what_are_they,
			eco_friendly_products_and_activities,
			little_more_than_what_you_pay_for_the_chemicals,
			this_switch_to_eco_friendly_products,
			climate_change_is_a_lot_of_effort,
			action_out_of_concern_for_climate_change,
			if_yes_what_did_you_do_are_you_doing,
			natural_resource_community_immediate_attention_measures,
			if_yes_what_is_that_resource,
			achieve_with_regard_to_natural_resource_conservation,
			initiative_to_conserve_the_environment,
			community_together_achieve_my_conservation_goal,
			entry_date,
			district_name,
			taluk_name,
			panchayat_name,
			adult_members,
			children_members,
			house,
			roof,
			ration_card,
			cast,
			mother_tongue,
			religion,
			age,
			marital_status,
			education,
			phone_type,
			primary_occupation,
			secondary_occupation,
			womens_occupation,
			household_migration_last_year,
			migrant_sends_remittances,
			household_owns_land,
			land_acres,
			monthly_expenditure,
			monthly_income,
			daily_climate_action,
			runs_enterprise,
			eco_friendly_practices_enterprise,
			eco_friendly_practices_details,
			waste_segregation_at_home,
			is_menstruating,
			menstruation_products_used,
			sanitary_disposal_method,
			soil_changes_over_years,
			soil_observations_if_no_changes,
			essential_characteristics_of_fertile_soil,
			main_crop_grown,
			access_to_nutritional_food,
			reasons_for_lack_of_nutritional_food,
			identify_trees_in_community,
			tree_names_in_community,
			food_production,
			sell_produce_local_market,
			use_pesticides_fertilizers,
			community_government_environment_initiatives,
			conserve_local_seeds,
			natural_resource_conservation_goal,
			goal,
			mobilized_community_for_conservation,
			green_action_in_community,
			details_of_green_action,
			main_products_services_used,
			household_waste_management,
			waste_categories_produced,
			access_to_daily_living_products,
			locally_produced_products_consumed
		) VALUES (
			?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?,?,?,?,?
		)`

		_, err := DB.Exec(sql,
			queryData.ParticipantID,
			queryData.Email,
			queryData.NameOfTheSurveyor,
			queryData.NameOfTheRespondent,
			queryData.VillageName,
			queryData.PhoneNumber,
			queryData.NaturalResources,
			queryData.NaturalResourcesImpactingYourLife,
			queryData.NaturalWealth,
			queryData.ClimateChange,
			queryData.WhatDoYouKnowAboutIt,
			queryData.ChangeInTheWeatherClimate,
			queryData.ChangesHappenedToTheClimate,
			queryData.ClimateChangeThreatensPersonalFamilyHealthSafety,
			queryData.DoneToTackleClimateChange,
			queryData.DoSomethingToTackleClimateChange,
			queryData.MainSourceOfWater,
			queryData.ShownBelowDoYouAgreeWith,
			queryData.HowConcernedLocalWaterQuality,
			queryData.PersonalActionsCanAffectWaterQuality,
			queryData.TakeWaterConservationMeasures,
			queryData.IfYesWhatKindOfMeasures,
			queryData.ListDownImpactOfClimateChange,
			queryData.GiftingHis6AcresLandToChildren,
			queryData.WhichOneAccordingToYouIsRight,
			queryData.BelieveConnectionBetweenTheFoodHealthClimate,
			queryData.NativeFoodYouBelieveIsEnvironmentallyFriendly,
			queryData.HouseholdActivityPollutesNaturalResources,
			queryData.AlternativesHouseholdMaterialsCausePollution,
			queryData.IfYesWhatAreThey,
			queryData.EcoFriendlyProductsAndActivities,
			queryData.LittleMoreThanWhatYouPayForTheChemicals,
			queryData.ThisSwitchToEcoFriendlyProducts,
			queryData.ClimateChangeIsALotOfEffort,
			queryData.ActionOutOfConcernForClimateChange,
			queryData.IfYesWhatDidYouDoAreYouDoing,
			queryData.NaturalResourceCommunityImmediateAttentionMeasures,
			queryData.IfYesWhatIsThatResource,
			queryData.AchieveWithRegardToNaturalResourceConservation,
			queryData.InitiativeToConserveTheEnvironment,
			queryData.CommunityTogetherAchieveMyConservationGoal,
			queryData.EntryDate,
			queryData.DistrictName,
			queryData.TalukName,
			queryData.PanchayatName,
			queryData.AdultMembers,
			queryData.ChildrenMembers,
			queryData.House,
			queryData.Roof,
			queryData.RationCard,
			queryData.Cast,
			queryData.MotherTongue,
			queryData.Religion,
			queryData.Age,
			queryData.MaritalStatus,
			queryData.Education,
			queryData.PhoneType,
			queryData.PrimaryOccupation,
			queryData.SecondaryOccupation,
			queryData.WomenOccupation,
			queryData.HouseholdMigrationLastYear,
			queryData.MigrantSendsRemittances,
			queryData.HouseholdOwnsLand,
			queryData.LandAcres,
			queryData.MonthlyExpenditure,
			queryData.MonthlyIncome,
			queryData.DailyClimateAction,
			queryData.RunsEnterprise,
			queryData.EcoFriendlyPracticesEnterprise,
			queryData.EcoFriendlyPracticesDetails,
			queryData.WasteSegregationAtHome,
			queryData.IsMenstruating,
			queryData.MenstruationProductsUsed,
			queryData.SanitaryDisposalMethod,
			queryData.SoilChangesOverYears,
			queryData.SoilObservationsIfNoChanges,
			queryData.EssentialCharacteristicsFertileSoil,
			queryData.MainCropGrown,
			queryData.AccessToNutritionalFood,
			queryData.ReasonsForLackOfNutritionalFood,
			queryData.IdentifyTreesInCommunity,
			queryData.TreeNamesInCommunity,
			queryData.FoodProduction,
			queryData.SellProduceLocalMarket,
			queryData.UsePesticidesFertilizers,
			queryData.CommunityGovernmentEnvironment,
			queryData.ConserveLocalSeeds,
			queryData.NaturalResourceConservationGoal,
			queryData.Goal,
			queryData.MobilizedCommunityForConservation,
			queryData.GreenActionInCommunity,
			queryData.DetailsOfGreenAction,
			queryData.MainProductsServicesUsed,
			queryData.HouseholdWasteManagement,
			queryData.WasteCategoriesProduced,
			queryData.AccessToDailyLivingProducts,
			queryData.LocallyProducedProductsConsumed,
		)

		if err != nil {
			fmt.Println("err", err)
			w.WriteHeader(http.StatusBadRequest)
			log.Println(err)
			json.NewEncoder(w).Encode(map[string]interface{}{"Message": "Invalid input syntax for IP ", "Status Code": "400 ", "Error": err, "API": "Addnagarika"})
			return
		}

		w.WriteHeader(http.StatusOK)
		log.Println("Recorded sucessfully")
		json.NewEncoder(w).Encode(map[string]interface{}{"Status Code": "200 OK", "Message": "Recorded sucessfully"})
	} else {
		w.WriteHeader(http.StatusOK)
		log.Println("Paricipantid and GFId is missing")
		json.NewEncoder(w).Encode(map[string]interface{}{"Status Code": "200 OK", "Message": "Paricipantid is missing "})
	}
}
