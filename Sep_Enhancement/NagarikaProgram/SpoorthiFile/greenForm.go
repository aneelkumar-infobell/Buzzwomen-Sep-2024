package spoorthifile

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
	CommunityAwarenessQuestions                        string `json:"community_awareness_questions"`
	MainProductsServicesUseEverydayLife                string `json:"main_products_services_use_everyday_life"`
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

	var query string
	if req.ParticipantID != 0 {
		query = fmt.Sprintf("SELECT * FROM GreenBaselineSurvey WHERE partcipantId = %d", req.ParticipantID)
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
				&queryData.CommunityAwarenessQuestions,
				&queryData.MainProductsServicesUseEverydayLife,
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
}
