package Getviewform

import (
	"database/sql"
	"encoding/json"
	"fmt"
	"io/ioutil"
	"net/http"
	"strings"
)

type GetNagarikaProgramQuestionnaire1 struct {
	PartcipantID string `json:"partcipantId"`
}

func GetNagarikaProgramQuestionnaire(w http.ResponseWriter, r *http.Request, db *sql.DB) {
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

	var req GetNagarikaProgramQuestionnaire1
	err = json.Unmarshal(data, &req)
	if err != nil {
		json.NewEncoder(w).Encode(map[string]interface{}{"code": http.StatusBadRequest, "message": "Failed to unmarshal", "success": false, "error": err.Error()})
		return
	}

	//var query string

	query := fmt.Sprintf(`SELECT 
    id,
    COALESCE(partcipantId, '') AS participant_id,
    COALESCE(GelathiId, '') AS gelathi_id,
    COALESCE(entrydate, '') AS entry_date,
    COALESCE(profile_of_the_women, '') AS profile_of_the_women,
    COALESCE(unique_identification_number_given_after_completion_of_ss, '') AS unique_identification_number_given_after_completion_of_ss,
    COALESCE(surveyors_name, '') AS surveyors_name,
    COALESCE(respondents_name, '') AS respondents_name,
    COALESCE(district, '') AS district,
    COALESCE(taluk, '') AS taluk,
    COALESCE(if_kolar, '') AS if_kolar,
    COALESCE(gram_panchayat, '') AS gram_panchayat,
    COALESCE(village_name, '') AS village_name,
    COALESCE(total_number_of_members_in_your_household, '') AS total_number_of_members_in_your_household,
    COALESCE(house, '') AS house,
    COALESCE(roof, '') AS roof,
    COALESCE(ration_card, '') AS ration_card,
    COALESCE(caste_category, '') AS caste_category,
    COALESCE(sub_caste_name, '') AS sub_caste_name,
    COALESCE(religion, '') AS religion,
    COALESCE(age, '') AS age,
    COALESCE(marital_status, '') AS marital_status,
    COALESCE(highest_level_of_education_completed, '') AS highest_level_of_education_completed,
    COALESCE(primary_occupation, '') AS primary_occupation,
    COALESCE(secondary_occupation, '') AS secondary_occupation,
    COALESCE(monthly_household_expenditure, '') AS monthly_household_expenditure,
    COALESCE(monthly_household_income, '') AS monthly_household_income,
    COALESCE(are_you_the_sole_earning_member_of_your_family, '') AS are_you_the_sole_earning_member_of_your_family,
    COALESCE(migration_profile, '') AS migration_profile,
    COALESCE(has_anyone_in_your_household_migrated_last_1_year_for_work, '') AS has_anyone_in_your_household_migrated_last_1_year_for_work,
    COALESCE(does_the_migrant_member_send_remittances_to_the_household, '') AS does_the_migrant_member_send_remittances_to_the_household,
    COALESCE(civic_muscle, '') AS civic_muscle,
    COALESCE(are_you_part_of_an_shg, '') AS are_you_part_of_an_shg,
    COALESCE(do_you_have_any_of_these_identification_cards, '') AS do_you_have_any_of_these_identification_cards,
    COALESCE(how_did_you_apply_for_it, '') AS how_did_you_apply_for_it,
    COALESCE(have_you_personally_applied_for_any_of_the_entitlement_schemes, '') AS have_you_personally_applied_for_any_of_the_entitlement_schemes,
    COALESCE(what_scheme_did_you_apply_for, '') AS what_scheme_did_you_apply_for,
    COALESCE(were_you_successful_in_getting_approval_for_the_scheme, '') AS were_you_successful_in_getting_approval_for_the_scheme,
    COALESCE(if_you_were_not_successful_in_applying_for_the_scheme_why_not, '') AS if_you_were_not_successful_in_applying_for_the_scheme_why_not,
    COALESCE(will_cooperate_with_your_village_people_to_get_facility_putup, '') AS will_cooperate_with_your_village_people_to_get_facility_putup,
    COALESCE(community_engagement, '') AS community_engagement,
    COALESCE(can_you_identify_top_3_problems_in_your_village, '') AS can_you_identify_top_3_problems_in_your_village,
    COALESCE(do_you_think_you_can_help_solve_these_problems, '') AS do_you_think_you_can_help_solve_these_problems,
    COALESCE(if_yes_how_do_you_think_you_can_help_solve_these_problems, '') AS if_yes_how_do_you_think_you_can_help_solve_these_problems,
    COALESCE(if_no_why_do_you_think_you_cannot_help_solve_these_problems, '') AS if_no_why_do_you_think_you_cannot_help_solve_these_problems,
    COALESCE(do_you_think_every_village_has_same_or_similar_issues, '') AS do_you_think_every_village_has_same_or_similar_issues,
    COALESCE(do_you_vote, '') AS do_you_vote,
    COALESCE(why_do_you_vote, '') AS why_do_you_vote,
    COALESCE(if_no_why_dont_you_vote, '') AS if_no_why_dont_you_vote,
    COALESCE(do_you_attend_gram_sabha_regularly, '') AS do_you_attend_gram_sabha_regularly,
    COALESCE(when_was_the_last_time_you_attended_gram_sabha, '') AS when_was_the_last_time_you_attended_gram_sabha,
    COALESCE(how_do_you_know_when_gram_sabha_is_being_organized, '') AS how_do_you_know_when_gram_sabha_is_being_organized,
    COALESCE(what_do_you_do_in_gram_sabha, '') AS what_do_you_do_in_gram_sabha,
    COALESCE(why_dont_you_attend_gram_sabha, '') AS why_dont_you_attend_gram_sabha,
    COALESCE(do_you_know_who_your_panchayat_members_are, '') AS do_you_know_who_your_panchayat_members_are,
    COALESCE(how_often_do_you_approach_them_for_resolving_an_issue, '') AS how_often_do_you_approach_them_for_resolving_an_issue,
    COALESCE(if_they_rarely_or_never_approach_panchayat_members_why, '') AS if_they_rarely_or_never_approach_panchayat_members_why,
    COALESCE(what_is_the_total_budget_spent_in_your_panchayat, '') AS what_is_the_total_budget_spent_in_your_panchayat,
    COALESCE(as_a_citizen_i_have_rights, '') AS as_a_citizen_i_have_rights,
    COALESCE(as_a_citizen_i_have_duties_to_make_governance_process_better, '') AS as_a_citizen_i_have_duties_to_make_governance_process_better,
    COALESCE(mobility_confidence_of_women, '') AS mobility_confidence_of_women,
    COALESCE(how_frequently_do_you_discuss_politics_with_people, '') AS how_frequently_do_you_discuss_politics_with_people,
    COALESCE(if_never_why_dont_you_discuss_politics, '') AS if_never_why_dont_you_discuss_politics,
    COALESCE(did_you_try_to_get_people_together_to_solve_problem_in_community, '') AS did_you_try_to_get_people_together_to_solve_problem_in_community,
    COALESCE(can_you_go_to_these_places_without_permission_fromfamily_member, '') AS can_you_go_to_these_places_without_permission_fromfamily_member,
    COALESCE(can_you_go_to_these_places_alone, '') AS can_you_go_to_these_places_alone,
    COALESCE(what_are_your_most_imp_sources_for_information_about_government, '') AS what_are_your_most_imp_sources_for_information_about_government,
    COALESCE(which_of_the_following_statements_do_you_agree_with, '') AS which_of_the_following_statements_do_you_agree_with
    FROM nagarikaprogramquestionnaire
    WHERE partcipantId = '%s'`, req.PartcipantID)

	rows, err := db.Query(query)

	if err != nil {
		json.NewEncoder(w).Encode(map[string]interface{}{"code": http.StatusInternalServerError, "message": "Database Query Error", "success": false, "error": err.Error()})
		return
	}
	defer rows.Close()

	var response []NagarikaProgramQuestionnaire
	var ptid, ptname, gfid, gfname string
	var top3, top4, top5, top6, top7 string
	var npq NagarikaProgramQuestionnaire
	for rows.Next() {

		err := rows.Scan(
			&npq.Id,
			&ptid,
			&gfid,
			&npq.EntryDate,
			&npq.ProfileOfTheWomen,
			&npq.UniqueIdentificationNumberGivenAfterCompletionOfSS,
			&npq.SurveyorsName,
			&npq.RespondentsName,
			&npq.DistrictTaluk,
			&npq.IfTumkur,
			&npq.IfKolar,
			&npq.GramPanchayat,
			&npq.VillageName,
			&npq.TotalNumberOfMembersInYourHousehold,
			&npq.House,
			&npq.Roof,
			&npq.RationCard,
			&npq.CasteCategory,
			&npq.SubCasteName,
			&npq.Religion,
			&npq.Age,
			&npq.MaritalStatus,
			&npq.HighestLevelOfEducationCompleted,
			&npq.PrimaryOccupation,
			&npq.SecondaryOccupation,
			&npq.MonthlyHouseholdExpenditure,
			&npq.MonthlyHouseholdIncome,
			&npq.AreYouTheSoleEarningMemberOfYourFamily,
			&npq.MigrationProfile,
			&npq.HasAnyoneInYourHouseholdMigratedLast1YearForWork,
			&npq.DoesTheMigrantMemberSendRemittancesToTheHousehold,
			&npq.CivicMuscle,
			&npq.AreYouPartOfAnSHG,
			&npq.DoYouHaveAnyOfTheseIdentificationCards,
			&npq.HowDidYouApplyForIt,
			&npq.HaveYouPersonallyAppliedForAnyOfTheEntitlementSchemes,
			&npq.WhatSchemeDidYouApplyFor,
			&npq.WereYouSuccessfulInGettingApprovalForTheScheme,
			&npq.IfYouWereNotSuccessfulInApplyingForTheSchemeWhyNot,
			&npq.WillCooperateWithYourVillagePeopleToGetFacilityPutup,
			&npq.CommunityEngagement,
			&top3,
			&npq.DoYouThinkYouCanHelpSolveTheseProblems,
			&npq.IfYesHowDoYouThinkYouCanHelpSolveTheseProblems,
			&npq.IfNoWhyDoYouThinkYouCannotHelpSolveTheseProblems,
			&npq.DoYouThinkEveryVillageHasSameOrSimilarIssues,
			&npq.DoYouVote,
			&npq.WhyDoYouVote,
			&npq.IfNoWhyDontYouVote,
			&npq.DoYouAttendGramSabhaRegularly,
			&npq.WhenWasTheLastTimeYouAttendedGramSabha,
			&npq.HowDoYouKnowWhenGramSabhaIsBeingOrganized,
			&top4,
			&npq.WhyDontYouAttendGramSabha,
			&npq.DoYouKnowWhoYourPanchayatMembersAre,
			&npq.HowOftenDoYouApproachThemForResolvingAnIssue,
			&npq.IfTheyRarelyOrNeverApproachPanchayatMembersWhy,
			&npq.WhatIsTheTotalBudgetSpentInYourPanchayat,
			&npq.AsACitizenIHaveRights,
			&npq.AsACitizenIHaveDutiesToMakeGovernanceProcessBetter,
			&npq.MobilityConfidenceOfWomen,
			&npq.HowFrequentlyDoYouDiscussPoliticsWithPeople,
			&npq.IfNeverWhyDontYouDiscussPolitics,
			&npq.DidYouTryToGetPeopleTogetherToSolveProblemInCommunity,
			&top5,
			&top6,
			&top7,
			&npq.WhichOfTheFollowingStatementsDoYouAgreeWith,
		)

		npq.CanYouIdentifyTop3ProblemsInYourVillage = strings.Split(top3, ",")
		npq.WhatDoYouDoInGramSabha = strings.Split(top4, ",")
		npq.CanYouGoToThesePlacesWithoutPermissionFromFamilyMember = strings.Split(top5, ",")
		npq.CanYouGoToThesePlacesAlone = strings.Split(top6, ",")
		npq.WhatAreYourMostImpSourcesForInformationAboutGovernment = strings.Split(top7, ",")
		if err != nil {
			fmt.Println("err196", err)
			json.NewEncoder(w).Encode(map[string]interface{}{"code": http.StatusInternalServerError, "message": "Database Scan Error", "success": false, "error": err.Error()})
			return
		}

		//=====================================================
		err1 := db.QueryRow("SELECT concat(first_name,' ',last_name) AS full_name FROM bdms_staff.employee WHERE id = ?", gfid).Scan(&gfname)
		if err1 != nil {
			fmt.Println("err192986", err1)
			json.NewEncoder(w).Encode(map[string]interface{}{"code": http.StatusInternalServerError, "message": "Database Scan Error in fetching gf name", "success": false, "error": err1.Error()})
			return
		}

		err2 := db.QueryRow("SELECT firstName FROM bdms_staff.training_participants where id = ?", ptid).Scan(&ptname)
		if err2 != nil {
			fmt.Println("err192uy986", err2)
			json.NewEncoder(w).Encode(map[string]interface{}{"code": http.StatusInternalServerError, "message": "Database Scan Error in fetching participant  name", "success": false, "error": err2.Error()})
			return
		}
		//response = append(response, queryData)
		npq.GelathiID = gfname
		npq.ParticipantID = ptname
		//=========================================================

		response = append(response, npq)
	}

	w.Header().Set("Content-Type", "application/json")
	json.NewEncoder(w).Encode(map[string]interface{}{"data": response, "success": true, "message": "NagarikaProgram"})
}
