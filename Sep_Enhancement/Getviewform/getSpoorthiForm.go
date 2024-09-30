package Getviewform

import (
	"database/sql"
	"encoding/json"
	"fmt"
	"io/ioutil"
	"net/http"
	"strings"

	_ "github.com/go-sql-driver/mysql"
)

type BuzzSpoorthiProgramBaseline struct {
	PartcipantID int `json:"partcipantId"`
}

type ParticipantData struct {
	ID                                              string   `json:"id"`
	ParticipantID                                   int      `json:"participantId"`
	EmailAddress                                    string   `json:"email_address"`
	GelathiID                                       string   `json:"gelathiId"`
	EntryDate                                       string   `json:"entry_date"`
	SpoorthiSessionNumber                           string   `json:"spoorthi_session_number"`
	ListDownYourSkills                              string   `json:"list_down_your_skills"`
	SkillsToOvercomeMyChallenges                    string   `json:"skills_to_overcome_my_challenges"`
	UsedSkillsResourcesCombatChallenge              string   `json:"used_skills_resources_combat_challenge"`
	ListenParagraph                                 string   `json:"listen_paragraph"`
	SummarizeMainPointsParagraph                    string   `json:"summarize_main_points_paragraph"`
	AskTwoQuestionsHelpYouUnderstand                string   `json:"ask_two_questions_help_you_understand"`
	ThreeInfrastructureOfYourVillage                string   `json:"three_infrastructure_of_your_village"`
	KnowTheNeedOfMyCommunity                        string   `json:"know_the_need_of_my_community"`
	TogetherCommunityMembersCommunityInfrastructure string   `json:"together_community_members_community_infrastructure"`
	WithOtherCommunityInfrastructure                string   `json:"with_other_community_infrastructure"`
	BringSomeoneTogether                            string   `json:"bring_someone_together"`
	BroughtPeopleTogetherIncident                   string   `json:"brought_people_together_incident"`
	ConflictWithAnyoneAskPosition                   string   `json:"conflict_with_anyone_ask_position"`
	ConflictMattersInterestMine                     string   `json:"conflict_matters_interest_mine"`
	TherePujaAtMyHouse                              string   `json:"there_puja_at_my_house"`
	Module1                                         any      `json:"module1"`
	Module2                                         any      `json:"module2"`
	Module3                                         any      `json:"module3"`
	Module4                                         any      `json:"module4"`
	Module5                                         any      `json:"module5"`
	District                                        string   `json:"district"`
	Taluk                                           string   `json:"taluk"`
	GramPanchayat                                   string   `json:"gram_panchayat"`
	VillageName                                     string   `json:"village_name"`
	TotalAdultsNoOfMemberHousehold                  int      `json:"total_adults_no_of_member_household"`
	TotalChildrenNoOfMemberHousehold                int      `json:"total_children_no_of_member_household"`
	House                                           string   `json:"house"`
	RationCard                                      string   `json:"ration_card"`
	CastCategory                                    string   `json:"cast_category"`
	MotherTongue                                    string   `json:"mother_tongue"`
	Religion                                        string   `json:"religion"`
	Age                                             int      `json:"age"`
	MaterialStatus                                  string   `json:"material_status"`
	Education                                       string   `json:"education"`
	PhoneNumber                                     string   `json:"phone_number"`
	CurrentEconomicActivityPrimaryOccupation        string   `json:"current_economic_activity_primary_occupation"`
	SecondaryOccupationHousehold                    string   `json:"secondary_occupation_household"`
	WomensOccupation                                string   `json:"womens_occupation"`
	SkillsMotivation                                string   `json:"skills_motivation"`
	ThreeReasonsBecomeGelathi                       string   `json:"three_reasons_become_gelathi"`
	GoalsAchieveAsGelathi                           string   `json:"goals_achieve_as_gelathi"`
	GoalsAsLeaderNextYear                           string   `json:"goals_as_leader_next_year"`
	GoalsForTenYears                                string   `json:"goals_for_ten_years"`
	Community                                       string   `json:"community"`
	SupportFeelings                                 string   `json:"support_feelings"`
	MeetingsDayFeelings                             string   `json:"meetings_day_feelings"`
	DealWithAngrySituation                          []string `json:"deal_with_angry_situation"`
	ImpatientWithUnclearComm                        string   `json:"impatient_with_unclear_comm"`
	SayYesWhenUnsureOfInstructions                  string   `json:"say_yes_when_unsure_of_instructions"`
	Confidence                                      string   `json:"confidence"`
	PersistedWhenOthersQuit                         string   `json:"persisted_when_others_quit"`
	NarrateInstance                                 string   `json:"narrate_instance"`
	GoalPersistenceInstance                         string   `json:"goal_persistence_instance"`
	TaskResponse                                    string   `json:"task_response"`
	ChallengeReaction                               string   `json:"challenge_reaction"`
	ConflictManagement                              string   `json:"conflict_management"`
	ConflictHandling                                string   `json:"conflict_handling"`
	SolutionAgreeableToOthers                       string   `json:"solution_agreeable_to_others"`
	SenseOfSisterhood                               string   `json:"sense_of_sisterhood"`
	QualitiesOfGoodGelathi                          string   `json:"qualities_of_good_gelathi"`
	MembersEmotionalBond                            string   `json:"members_emotional_bond"`
	MembersDiscussPersonalIssues                    string   `json:"members_discuss_personal_issues"`
	CopingMechanismsWhenSad                         string   `json:"coping_mechanisms_when_sad"`
	PossessLeadershipSkills                         string   `json:"possess_leadership_skills"`
	LeadershipSkillsReasonYes                       []string `json:"leadership_skills_reason_yes"`
	LeadershipSkillsReasonNo                        string   `json:"leadership_skills_reason_no"`
	LeadershipSkills                                string   `json:"leadership_skills"`
	CommunityMembersTakesSeriously                  string   `json:"community_members_takes_seriously"`
	TakesFeedbackFromCommunityMembers               string   `json:"takes_feedback_from_community_members"`
	FeedbackFromCommunityMembers                    string   `json:"feedback_from_community_members"`
	GoalsAsGelathi                                  string   `json:"goals_as_gelathi"`
	WillingToTakePartLocalElections                 string   `json:"willing_to_take_part_local_elections"`
	CalmBeforeReactionD                             string   `json:"calm_before_reaction_d"`
	ShoutAtOthersD                                  string   `json:"shout_at_others_d"`
	WalkOutWithoutListeningD                        string   `json:"walk_out_without_listening_d"`
	AskToLeaveImmediatelyD                          string   `json:"ask_to_leave_immediately_d"`
	PatientlyListenUnderstandD                      string   `json:"patiently_listen_understand_d"`
	CalmDisagreementArticulationD                   string   `json:"calm_disagreement_articulation_d"`
	MonthlyHouseExpend                              int      `json:"monthly_house_expend"`
	MonthlyHouseIncome                              int      `json:"monthly_house_income"`
}

// var data []Querydata

func GetBuzzSpoorthiProgramBaseline(w http.ResponseWriter, r *http.Request, db *sql.DB) {
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

	var req BuzzSpoorthiProgramBaseline
	err = json.Unmarshal(data, &req)
	if err != nil {
		json.NewEncoder(w).Encode(map[string]interface{}{"code": http.StatusBadRequest, "message": "Failed to unmarshal", "success": false, "error": err.Error()})
		return
	}
	fmt.Println("inside")

	//var query string
	var dealWithAngrySituation string
	var leadershipSkillsReasonYes string

	query := fmt.Sprintf(`SELECT 
        COALESCE(id, 0) AS id,
        COALESCE(partcipantId, 0) AS partcipantId,
        COALESCE(email_address, '') AS email_address,
        COALESCE(GelathiId, '') AS GelathiId,
        COALESCE(entry_date, '') AS entry_date,
        COALESCE(Spoorthi_Session_Number, '') AS Spoorthi_Session_Number,
        COALESCE(list_down_your_skills, '') AS list_down_your_skills,
        COALESCE(skills_to_overcome_my_challenges, '') AS skills_to_overcome_my_challenges,
        COALESCE(used_skills_resources_combat_challenge, '') AS used_skills_resources_combat_challenge,
        COALESCE(listen_paragraph, '') AS listen_paragraph,
        COALESCE(summarize_main_points_paragraph, '') AS summarize_main_points_paragraph,
        COALESCE(ask_two_questions_help_you_understand, '') AS ask_two_questions_help_you_understand,
        COALESCE(three_infrastructure_of_your_village, '') AS three_infrastructure_of_your_village,
        COALESCE(know_the_need_of_my_community, '') AS know_the_need_of_my_community,
        COALESCE(together_community_members_community_infrastructure, '') AS together_community_members_community_infrastructure,
        COALESCE(with_other_community_infrastructure, '') AS with_other_community_infrastructure,
        COALESCE(bring_someone_together, '') AS bring_someone_together,
        COALESCE(brought_people_together_incident, '') AS brought_people_together_incident,
        COALESCE(conflict_with_anyone_ask_position, '') AS conflict_with_anyone_ask_position,
        COALESCE(conflict_matters_interest_mine, '') AS conflict_matters_interest_mine,
        COALESCE(There_puja_at_my_house, '') AS There_puja_at_my_house,
        COALESCE(module1, '') AS module1,
        COALESCE(module2, '') AS module2,
        COALESCE(module3, '') AS module3,
        COALESCE(module4, '') AS module4,
        COALESCE(module5, '') AS module5,
        COALESCE(district, '') AS district,
        COALESCE(taluk, '') AS taluk,
        COALESCE(gram_panchayat, '') AS gram_panchayat,
        COALESCE(village_name, '') AS village_name,
        COALESCE(total_adults_no_of_member_household, 0) AS total_adults_no_of_member_household,
        COALESCE(total_childern_no_of_member_household, 0) AS total_childern_no_of_member_household,
        COALESCE(house, '') AS house,
        COALESCE(ration_card, '') AS ration_card,
        COALESCE(cast_category, '') AS cast_category,
        COALESCE(mother_tongue, '') AS mother_tongue,
        COALESCE(religion, '') AS religion,
        COALESCE(age, 0) AS age,
        COALESCE(material_status, '') AS material_status,
        COALESCE(education, '') AS education,
        COALESCE(phone_number, '') AS phone_number,
        COALESCE(current_economic_activity_primary_occupation, '') AS current_economic_activity_primary_occupation,
        COALESCE(secondary_occupation_household, '') AS secondary_occupation_household,
        COALESCE(womens_occupation, '') AS womens_occupation,
        COALESCE(skills_motivation, '') AS skills_motivation,
        COALESCE(three_reasons_become_gelathi, '') AS three_reasons_become_gelathi,
        COALESCE(goals_achieve_as_gelathi, '') AS goals_achieve_as_gelathi,
        COALESCE(goals_as_leader_next_year, '') AS goals_as_leader_next_year,
        COALESCE(goals_for_ten_years, '') AS goals_for_ten_years,
        COALESCE(community, '') AS community,
        COALESCE(support_feelings, '') AS support_feelings,
        COALESCE(meetings_day_feelings, '') AS meetings_day_feelings,
        COALESCE(deal_with_angry_situation, '') AS deal_with_angry_situation,
        COALESCE(impatient_with_unclear_comm, '') AS impatient_with_unclear_comm,
        COALESCE(say_yes_when_unsure_of_instructions, '') AS say_yes_when_unsure_of_instructions,
        COALESCE(confidence, '') AS confidence,
        COALESCE(persisted_when_others_quit, '') AS persisted_when_others_quit,
        COALESCE(narrate_instance, '') AS narrate_instance,
        COALESCE(goal_persistence_instance, '') AS goal_persistence_instance,
        COALESCE(task_response, '') AS task_response,
        COALESCE(challenge_reaction, '') AS challenge_reaction,
        COALESCE(conflict_management, '') AS conflict_management,
        COALESCE(conflict_handling, '') AS conflict_handling,
        COALESCE(solution_agreeable_to_others, '') AS solution_agreeable_to_others,
        COALESCE(sense_of_sisterhood, '') AS sense_of_sisterhood,
        COALESCE(qualities_of_good_gelathi, '') AS qualities_of_good_gelathi,
        COALESCE(members_emotional_bond, '') AS members_emotional_bond,
        COALESCE(members_discuss_personal_issues, '') AS members_discuss_personal_issues,
        COALESCE(coping_mechanisms_when_sad, '') AS coping_mechanisms_when_sad,
        COALESCE(possess_leadership_skills, '') AS possess_leadership_skills,
        COALESCE(leadership_skills_reason_yes, '') AS leadership_skills_reason_yes,
        COALESCE(leadership_skills_reason_no, '') AS leadership_skills_reason_no,
        COALESCE(leadership_skills, '') AS leadership_skills,
        COALESCE(community_members_takes_seriously, '') AS community_members_takes_seriously,
        COALESCE(takes_feedback_from_community_members, '') AS takes_feedback_from_community_members,
        COALESCE(feedback_from_community_members, '') AS feedback_from_community_members,
        COALESCE(goals_as_gelathi, '') AS goals_as_gelathi,
        COALESCE(willing_to_take_part_local_elections, '') AS willing_to_take_part_local_elections,
		COALESCE(calm_before_reaction_d, '') AS calm_before_reaction_d,
COALESCE(shout_at_others_d, '') AS shout_at_others_d,
COALESCE(walk_out_without_listening_d, '') AS walk_out_without_listening_d,
COALESCE(ask_to_leave_immediately_d, '') AS ask_to_leave_immediately_d,
COALESCE(patiently_listen_understand_d, '') AS patiently_listen_understand_d,
COALESCE(calm_disagreement_articulation_d, '') AS calm_disagreement_articulation_d,
COALESCE(monthly_house_expend, '') AS monthly_house_expend,
COALESCE(monthly_house_income, '') AS monthly_house_income


    FROM SpoorthiBaselineQuestionnaire
    WHERE partcipantId = %d`, req.PartcipantID)

	rows, err := db.Query(query)
	fmt.Println("printing", query)

	if err != nil {
		json.NewEncoder(w).Encode(map[string]interface{}{"code": http.StatusInternalServerError, "message": "Database Query Error", "success": false, "error": err.Error()})
		return
	}
	defer rows.Close()
	fmt.Println("inside1")

	//var response []ParticipantData
	var queryData ParticipantData
	for rows.Next() {

		err := rows.Scan(
			&queryData.ID,
			&queryData.ParticipantID,
			&queryData.EmailAddress,
			&queryData.GelathiID,
			&queryData.EntryDate,
			&queryData.SpoorthiSessionNumber,
			&queryData.ListDownYourSkills,
			&queryData.SkillsToOvercomeMyChallenges,
			&queryData.UsedSkillsResourcesCombatChallenge,
			&queryData.ListenParagraph,
			&queryData.SummarizeMainPointsParagraph,
			&queryData.AskTwoQuestionsHelpYouUnderstand,
			&queryData.ThreeInfrastructureOfYourVillage,
			&queryData.KnowTheNeedOfMyCommunity,
			&queryData.TogetherCommunityMembersCommunityInfrastructure,
			&queryData.WithOtherCommunityInfrastructure,
			&queryData.BringSomeoneTogether,
			&queryData.BroughtPeopleTogetherIncident,
			&queryData.ConflictWithAnyoneAskPosition,
			&queryData.ConflictMattersInterestMine,
			&queryData.TherePujaAtMyHouse,
			&queryData.Module1,
			&queryData.Module2,
			&queryData.Module3,
			&queryData.Module4,
			&queryData.Module5,
			&queryData.District,
			&queryData.Taluk,
			&queryData.GramPanchayat,
			&queryData.VillageName,
			&queryData.TotalAdultsNoOfMemberHousehold,
			&queryData.TotalChildrenNoOfMemberHousehold,
			&queryData.House,
			&queryData.RationCard,
			&queryData.CastCategory,
			&queryData.MotherTongue,
			&queryData.Religion,
			&queryData.Age,
			&queryData.MaterialStatus,
			&queryData.Education,
			&queryData.PhoneNumber,
			&queryData.CurrentEconomicActivityPrimaryOccupation,
			&queryData.SecondaryOccupationHousehold,
			&queryData.WomensOccupation,
			&queryData.SkillsMotivation,
			&queryData.ThreeReasonsBecomeGelathi,
			&queryData.GoalsAchieveAsGelathi,
			&queryData.GoalsAsLeaderNextYear,
			&queryData.GoalsForTenYears,
			&queryData.Community,
			&queryData.SupportFeelings,
			&queryData.MeetingsDayFeelings,
			&dealWithAngrySituation,
			&queryData.ImpatientWithUnclearComm,
			&queryData.SayYesWhenUnsureOfInstructions,
			&queryData.Confidence,
			&queryData.PersistedWhenOthersQuit,
			&queryData.NarrateInstance,
			&queryData.GoalPersistenceInstance,
			&queryData.TaskResponse,
			&queryData.ChallengeReaction,
			&queryData.ConflictManagement,
			&queryData.ConflictHandling,
			&queryData.SolutionAgreeableToOthers,
			&queryData.SenseOfSisterhood,
			&queryData.QualitiesOfGoodGelathi,
			&queryData.MembersEmotionalBond,
			&queryData.MembersDiscussPersonalIssues,
			&queryData.CopingMechanismsWhenSad,
			&queryData.PossessLeadershipSkills,
			&leadershipSkillsReasonYes,
			&queryData.LeadershipSkillsReasonNo,
			&queryData.LeadershipSkills,
			&queryData.CommunityMembersTakesSeriously,
			&queryData.TakesFeedbackFromCommunityMembers,
			&queryData.FeedbackFromCommunityMembers,
			&queryData.GoalsAsGelathi,
			&queryData.WillingToTakePartLocalElections,
			&queryData.CalmBeforeReactionD,
			&queryData.ShoutAtOthersD,
			&queryData.WalkOutWithoutListeningD,
			&queryData.AskToLeaveImmediatelyD,
			&queryData.PatientlyListenUnderstandD,
			&queryData.CalmDisagreementArticulationD,
			&queryData.MonthlyHouseExpend,
			&queryData.MonthlyHouseIncome,
		)
		queryData.LeadershipSkillsReasonYes = strings.Split(leadershipSkillsReasonYes, ",")
		queryData.DealWithAngrySituation = strings.Split(dealWithAngrySituation, ",")
		if err != nil {
			json.NewEncoder(w).Encode(map[string]interface{}{"code": http.StatusInternalServerError, "message": "Database Scan Error", "success": false, "error": err.Error()})
			return
		}

		//response = append(response, queryData)
	}

	w.Header().Set("Content-Type", "application/json")
	json.NewEncoder(w).Encode(map[string]interface{}{"data": queryData, "success": true, "message": "BuzzSpoorthiProgramBaseline"})
}
