package Getviewform

import (
	"database/sql"
	"encoding/json"
	"fmt"
	"log"
	"net/http"
	"os"
	"time"
)

type NagarikaProgramQuestionnaire struct {
	Id                                                     int64  `json:"id"`
	ParticipantID                                          string `json:"participant_id"`
	GelathiID                                              string `json:"gelathi_id"`
	EntryDate                                              string `json:"entry_date"`
	ProfileOfTheWomen                                      string `json:"profile_of_the_women"`
	UniqueIdentificationNumberGivenAfterCompletionOfSS     string `json:"unique_identification_number_given_after_completion_of_ss"`
	SurveyorsName                                          string `json:"surveyors_name"`
	RespondentsName                                        string `json:"respondents_name"`
	DistrictTaluk                                          string `json:"district_taluk"`
	IfTumkur                                               string `json:"if_tumkur"`
	IfKolar                                                string `json:"if_kolar"`
	GramPanchayat                                          string `json:"gram_panchayat"`
	VillageName                                            string `json:"village_name"`
	TotalNumberOfMembersInYourHousehold                    string `json:"total_number_of_members_in_your_household"`
	House                                                  string `json:"house"`
	Roof                                                   string `json:"roof"`
	RationCard                                             string `json:"ration_card"`
	CasteCategory                                          string `json:"caste_category"`
	SubCasteName                                           string `json:"sub_caste_name"`
	Religion                                               string `json:"religion"`
	Age                                                    string `json:"age"`
	MaritalStatus                                          string `json:"marital_status"`
	HighestLevelOfEducationCompleted                       string `json:"highest_level_of_education_completed"`
	PrimaryOccupation                                      string `json:"primary_occupation"`
	SecondaryOccupation                                    string `json:"secondary_occupation"`
	MonthlyHouseholdExpenditure                            string `json:"monthly_household_expenditure"`
	MonthlyHouseholdIncome                                 string `json:"monthly_household_income"`
	AreYouTheSoleEarningMemberOfYourFamily                 string `json:"are_you_the_sole_earning_member_of_your_family"`
	MigrationProfile                                       string `json:"migration_profile"`
	HasAnyoneInYourHouseholdMigratedLast1YearForWork       string `json:"has_anyone_in_your_household_migrated_last_1_year_for_work"`
	DoesTheMigrantMemberSendRemittancesToTheHousehold      string `json:"does_the_migrant_member_send_remittances_to_the_household"`
	CivicMuscle                                            string `json:"civic_muscle"`
	AreYouPartOfAnSHG                                      string `json:"are_you_part_of_an_shg"`
	DoYouHaveAnyOfTheseIdentificationCards                 string `json:"do_you_have_any_of_these_identification_cards"`
	HowDidYouApplyForIt                                    string `json:"how_did_you_apply_for_it"`
	HaveYouPersonallyAppliedForAnyOfTheEntitlementSchemes  string `json:"have_you_personally_applied_for_any_of_the_entitlement_schemes"`
	WhatSchemeDidYouApplyFor                               string `json:"what_scheme_did_you_apply_for"`
	WereYouSuccessfulInGettingApprovalForTheScheme         string `json:"were_you_successful_in_getting_approval_for_the_scheme"`
	IfYouWereNotSuccessfulInApplyingForTheSchemeWhyNot     string `json:"if_you_were_not_successful_in_applying_for_the_scheme_why_not"`
	WillCooperateWithYourVillagePeopleToGetFacilityPutup   string `json:"will_cooperate_with_your_village_people_to_get_facility_putup"`
	CommunityEngagement                                    string `json:"community_engagement"`
	CanYouIdentifyTop3ProblemsInYourVillage                string `json:"can_you_identify_top_3_problems_in_your_village"`
	DoYouThinkYouCanHelpSolveTheseProblems                 string `json:"do_you_think_you_can_help_solve_these_problems"`
	IfYesHowDoYouThinkYouCanHelpSolveTheseProblems         string `json:"if_yes_how_do_you_think_you_can_help_solve_these_problems"`
	IfNoWhyDoYouThinkYouCannotHelpSolveTheseProblems       string `json:"if_no_why_do_you_think_you_cannot_help_solve_these_problems"`
	DoYouThinkEveryVillageHasSameOrSimilarIssues           string `json:"do_you_think_every_village_has_same_or_similar_issues"`
	DoYouVote                                              string `json:"do_you_vote"`
	WhyDoYouVote                                           string `json:"why_do_you_vote"`
	IfNoWhyDontYouVote                                     string `json:"if_no_why_dont_you_vote"`
	DoYouAttendGramSabhaRegularly                          string `json:"do_you_attend_gram_sabha_regularly"`
	WhenWasTheLastTimeYouAttendedGramSabha                 string `json:"when_was_the_last_time_you_attended_gram_sabha"`
	HowDoYouKnowWhenGramSabhaIsBeingOrganized              string `json:"how_do_you_know_when_gram_sabha_is_being_organized"`
	WhatDoYouDoInGramSabha                                 string `json:"what_do_you_do_in_gram_sabha"`
	WhyDontYouAttendGramSabha                              string `json:"why_dont_you_attend_gram_sabha"`
	DoYouKnowWhoYourPanchayatMembersAre                    string `json:"do_you_know_who_your_panchayat_members_are"`
	HowOftenDoYouApproachThemForResolvingAnIssue           string `json:"how_often_do_you_approach_them_for_resolving_an_issue"`
	IfTheyRarelyOrNeverApproachPanchayatMembersWhy         string `json:"if_they_rarely_or_never_approach_panchayat_members_why"`
	WhatIsTheTotalBudgetSpentInYourPanchayat               string `json:"what_is_the_total_budget_spent_in_your_panchayat"`
	AsACitizenIHaveRights                                  string `json:"as_a_citizen_i_have_rights"`
	AsACitizenIHaveDutiesToMakeGovernanceProcessBetter     string `json:"as_a_citizen_i_have_duties_to_make_governance_process_better"`
	MobilityConfidenceOfWomen                              string `json:"mobility_confidence_of_women"`
	HowFrequentlyDoYouDiscussPoliticsWithPeople            string `json:"how_frequently_do_you_discuss_politics_with_people"`
	IfNeverWhyDontYouDiscussPolitics                       string `json:"if_never_why_dont_you_discuss_politics"`
	DidYouTryToGetPeopleTogetherToSolveProblemInCommunity  string `json:"did_you_try_to_get_people_together_to_solve_problem_in_community"`
	CanYouGoToThesePlacesWithoutPermissionFromFamilyMember string `json:"can_you_go_to_these_places_without_permission_fromfamily_member"`
	CanYouGoToThesePlacesAlone                             string `json:"can_you_go_to_these_places_alone"`
	WhatAreYourMostImpSourcesForInformationAboutGovernment string `json:"what_are_your_most_imp_sources_for_information_about_government"`
	WhichOfTheFollowingStatementsDoYouAgreeWith            string `json:"which_of_the_following_statements_do_you_agree_with"`
}

func Addnagarikasurvey(w http.ResponseWriter, r *http.Request, DB *sql.DB) {
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

	var a NagarikaProgramQuestionnaire
	err1 := json.NewDecoder(r.Body).Decode(&a)

	if err1 != nil {
		fmt.Println("errrr", err1)
		log.Println(err1)
		w.WriteHeader(http.StatusBadRequest)
		json.NewEncoder(w).Encode(map[string]string{"Message": "Invalid Input Syntax", "Status Code": "400 ", "API": "Addnagarika"})
		return
	}

	checkStatement := "SELECT COUNT(*) FROM nagarikaprogramquestionnaire WHERE partcipantId = ?"
	var count int
	err = DB.QueryRow(checkStatement, a.ParticipantID).Scan(&count)
	if err != nil {
		fmt.Println("errr", err)
		w.WriteHeader(http.StatusInternalServerError)
		log.Println("Error checking participant ID:", err)
		json.NewEncoder(w).Encode(map[string]interface{}{"Message": "Internal Server Error", "Status Code": "500 ", "API": "Addnagarika"})
		return
	}
	if count > 0 {
		w.WriteHeader(http.StatusBadRequest)
		log.Println("Participant ID already present")
		json.NewEncoder(w).Encode(map[string]interface{}{"Message": "Participant ID already present", "Status Code": "400 ", "API": "Addnagarika"})
		return
	}

	var name string
	var date time.Time
	DB.QueryRow("SELECT name from location where id=1").Scan(&name)
	switch {
	case name == "India":
		date = time.Now().Add(5*time.Hour + 30*time.Minute)
	case name == "Gambia":
		date = time.Now().Add(3 * time.Hour)
	case name == "Tanzania":
		date = time.Now().Add(3 * time.Hour)
	}

	if a.ParticipantID != "" && a.GelathiID != "" {
		sql := `
		INSERT INTO nagarikaprogramquestionnaire (
    partcipantId,
    GelathiId,
    entrydate,
    profile_of_the_women,
    unique_identification_number_given_after_completion_of_ss,
    surveyors_name,
    respondents_name,
    district_taluk,
    if_tumkur,
    if_kolar,
    gram_panchayat,
    village_name,
    total_number_of_members_in_your_household,
    house,
    roof,
    ration_card,
    caste_category,
    sub_caste_name,
    religion,
    age,
    marital_status,
    highest_level_of_education_completed,
    primary_occupation,
    secondary_occupation,
    monthly_household_expenditure,
    monthly_household_income,
    are_you_the_sole_earning_member_of_your_family,
    migration_profile,
    has_anyone_in_your_household_migrated_last_1_year_for_work,
    does_the_migrant_member_send_remittances_to_the_household,
    civic_muscle,
    are_you_part_of_an_shg,
    do_you_have_any_of_these_identification_cards,
    how_did_you_apply_for_it,
    have_you_personally_applied_for_any_of_the_entitlement_schemes,
    what_scheme_did_you_apply_for,
    were_you_successful_in_getting_approval_for_the_scheme,
    if_you_were_not_successful_in_applying_for_the_scheme_why_not,
    will_cooperate_with_your_village_people_to_get_facility_putup,
    community_engagement,
    can_you_identify_top_3_problems_in_your_village,
    do_you_think_you_can_help_solve_these_problems,
    if_yes_how_do_you_think_you_can_help_solve_these_problems,
    if_no_why_do_you_think_you_cannot_help_solve_these_problems,
    do_you_think_every_village_has_same_or_similar_issues,
    do_you_vote,
    why_do_you_vote,
    if_no_why_dont_you_vote,
    do_you_attend_gram_sabha_regularly,
    when_was_the_last_time_you_attended_gram_sabha,
    how_do_you_know_when_gram_sabha_is_being_organized,
    what_do_you_do_in_gram_sabha,
    why_dont_you_attend_gram_sabha,
    do_you_know_who_your_panchayat_members_are,
    how_often_do_you_approach_them_for_resolving_an_issue,
    if_they_rarely_or_never_approach_panchayat_members_why,
    what_is_the_total_budget_spent_in_your_panchayat,
    as_a_citizen_i_have_rights,
    as_a_citizen_i_have_duties_to_make_governance_process_better,
    mobility_confidence_of_women,
    how_frequently_do_you_discuss_politics_with_people,
    if_never_why_dont_you_discuss_politics,
    did_you_try_to_get_people_together_to_solve_problem_in_community,
    can_you_go_to_these_places_without_permission_fromfamily_member,
    can_you_go_to_these_places_alone,
    what_are_your_most_imp_sources_for_information_about_government,
    which_of_the_following_statements_do_you_agree_with
) VALUES (
    ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?
)
	`

		_, err := DB.Exec(sql,
			a.ParticipantID,
			a.GelathiID,
			date,
			a.ProfileOfTheWomen,
			a.UniqueIdentificationNumberGivenAfterCompletionOfSS,
			a.SurveyorsName,
			a.RespondentsName,
			a.DistrictTaluk,
			a.IfTumkur,
			a.IfKolar,
			a.GramPanchayat,
			a.VillageName,
			a.TotalNumberOfMembersInYourHousehold,
			a.House,
			a.Roof,
			a.RationCard,
			a.CasteCategory,
			a.SubCasteName,
			a.Religion,
			a.Age,
			a.MaritalStatus,
			a.HighestLevelOfEducationCompleted,
			a.PrimaryOccupation,
			a.SecondaryOccupation,
			a.MonthlyHouseholdExpenditure,
			a.MonthlyHouseholdIncome,
			a.AreYouTheSoleEarningMemberOfYourFamily,
			a.MigrationProfile,
			a.HasAnyoneInYourHouseholdMigratedLast1YearForWork,
			a.DoesTheMigrantMemberSendRemittancesToTheHousehold,
			a.CivicMuscle,
			a.AreYouPartOfAnSHG,
			a.DoYouHaveAnyOfTheseIdentificationCards,
			a.HowDidYouApplyForIt,
			a.HaveYouPersonallyAppliedForAnyOfTheEntitlementSchemes,
			a.WhatSchemeDidYouApplyFor,
			a.WereYouSuccessfulInGettingApprovalForTheScheme,
			a.IfYouWereNotSuccessfulInApplyingForTheSchemeWhyNot,
			a.WillCooperateWithYourVillagePeopleToGetFacilityPutup,
			a.CommunityEngagement,
			a.CanYouIdentifyTop3ProblemsInYourVillage,
			a.DoYouThinkYouCanHelpSolveTheseProblems,
			a.IfYesHowDoYouThinkYouCanHelpSolveTheseProblems,
			a.IfNoWhyDoYouThinkYouCannotHelpSolveTheseProblems,
			a.DoYouThinkEveryVillageHasSameOrSimilarIssues,
			a.DoYouVote,
			a.WhyDoYouVote,
			a.IfNoWhyDontYouVote,
			a.DoYouAttendGramSabhaRegularly,
			a.WhenWasTheLastTimeYouAttendedGramSabha,
			a.HowDoYouKnowWhenGramSabhaIsBeingOrganized,
			a.WhatDoYouDoInGramSabha,
			a.WhyDontYouAttendGramSabha,
			a.DoYouKnowWhoYourPanchayatMembersAre,
			a.HowOftenDoYouApproachThemForResolvingAnIssue,
			a.IfTheyRarelyOrNeverApproachPanchayatMembersWhy,
			a.WhatIsTheTotalBudgetSpentInYourPanchayat,
			a.AsACitizenIHaveRights,
			a.AsACitizenIHaveDutiesToMakeGovernanceProcessBetter,
			a.MobilityConfidenceOfWomen,
			a.HowFrequentlyDoYouDiscussPoliticsWithPeople,
			a.IfNeverWhyDontYouDiscussPolitics,
			a.DidYouTryToGetPeopleTogetherToSolveProblemInCommunity,
			a.CanYouGoToThesePlacesWithoutPermissionFromFamilyMember,
			a.CanYouGoToThesePlacesAlone,
			a.WhatAreYourMostImpSourcesForInformationAboutGovernment,
			a.WhichOfTheFollowingStatementsDoYouAgreeWith,
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
		json.NewEncoder(w).Encode(map[string]interface{}{"Status Code": "200 OK", "Message": "Paricipantid and GFId is missing "})
	}
}
