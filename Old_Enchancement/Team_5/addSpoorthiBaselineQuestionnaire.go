package Team_5

import (
	"database/sql"
	"encoding/json"
	"fmt"
	"log"
	"net/http"
	"strings"
	"time"

	_ "github.com/go-sql-driver/mysql"
)

type addSpoorthiBaselineQuestionnaire struct {
	ParticipantID                          string `json:"partcipantId"`
	GelathiID                              string `json:"GelathiId"`
	Email                                  string `json:"email_address"`
	EntryDate                              string `json:"entry_date"`
	SpoorthiSessionNumber                  string `json:"Spoorthi_Session_Number"`
	ListDownYourSkills                     string `json:"list_down_your_skills"`
	SkillsToOvercomeMyChallenges           string `json:"skills_to_overcome_my_challenges"`
	UsedSkillsResourcesCombatChallenge     string `json:"used_skills_resources_combat_challenge"`
	ListenParagraph                        string `json:"listen_paragraph"`
	SummarizeMainPointsParagraph           string `json:"summarize_main_points_paragraph"`
	AskTwoQuestionsHelpYouUnderstand       string `json:"ask_two_questions_help_you_understand"`
	ThreeInfrastructureOfYourVillage       string `json:"three_infrastructure_of_your_village"`
	KnowTheNeedOfMyCommunity               string `json:"know_the_need_of_my_community"`
	TogetherCommunityMembersCommunityInfra string `json:"together_community_members_community_infrastructure"`
	WithOtherCommunityInfrastructure       string `json:"with_other_community_infrastructure"`
	BringSomeoneTogether                   string `json:"bring_someone_together"`
	BroughtPeopleTogetherIncident          string `json:"brought_people_together_incident"`
	ConflictWithAnyoneAskPosition          string `json:"conflict_with_anyone_ask_position"`
	ConflictMattersInterestMine            string `json:"conflict_matters_interest_mine"`
	TherePujaAtMyHouse                     string `json:"There_puja_at_my_house"`

	District                                 string   `json:"district"`
	Taluk                                    string   `json:"taluk"`
	GramPanchayat                            string   `json:"gram_panchayat"`
	VillageName                              string   `json:"village_name"`
	TotalAdultsNoOfMemberHousehold           string   `json:"total_adults_no_of_member_household"`
	TotalChildrenNoOfMemberHousehold         string   `json:"total_children_no_of_member_household"`
	House                                    string   `json:"house"`
	RationCard                               string   `json:"ration_card"`
	CastCategory                             string   `json:"cast_category"`
	MotherTongue                             string   `json:"mother_tongue"`
	Religion                                 string   `json:"religion"`
	Age                                      string   `json:"age"`
	MaterialStatus                           string   `json:"material_status"`
	Education                                string   `json:"education"`
	PhoneNumber                              string   `json:"phone_number"`
	CurrentEconomicActivityPrimaryOccupation string   `json:"current_economic_activity_primary_occupation"`
	SecondaryOccupationHousehold             string   `json:"secondary_occupation_household"`
	WomensOccupation                         string   `json:"womens_occupation"`
	SkillsMotivation                         string   `json:"skills_motivation"`
	ThreeReasonsBecomeGelathi                string   `json:"three_reasons_become_gelathi"`
	GoalsAchieveAsGelathi                    string   `json:"goals_achieve_as_gelathi"`
	GoalsAsLeaderNextYear                    string   `json:"goals_as_leader_next_year"`
	GoalsForTenYears                         string   `json:"goals_for_ten_years"`
	Community                                string   `json:"community"`
	SupportFeelings                          string   `json:"support_feelings"`
	MeetingsDayFeelings                      string   `json:"meetings_day_feelings"`
	DealWithAngrySituation                   []string `json:"deal_with_angry_situation"`
	ImpatientWithUnclearComm                 string   `json:"impatient_with_unclear_comm"`
	SayYesWhenUnsureOfInstructions           string   `json:"say_yes_when_unsure_of_instructions"`
	Confidence                               string   `json:"confidence"`
	PersistedWhenOthersQuit                  string   `json:"persisted_when_others_quit"`
	NarrateInstance                          string   `json:"narrate_instance"`
	GoalPersistenceInstance                  string   `json:"goal_persistence_instance"`
	TaskResponse                             string   `json:"task_response"`
	ChallengeReaction                        string   `json:"challenge_reaction"`
	ConflictManagement                       string   `json:"conflict_management"`
	ConflictHandling                         string   `json:"conflict_handling"`
	SolutionAgreeableToOthers                string   `json:"solution_agreeable_to_others"`
	SenseOfSisterhood                        string   `json:"sense_of_sisterhood"`
	QualitiesOfGoodGelathi                   string   `json:"qualities_of_good_gelathi"`
	MembersEmotionalBond                     string   `json:"members_emotional_bond"`
	MembersDiscussPersonalIssues             string   `json:"members_discuss_personal_issues"`
	CopingMechanismsWhenSad                  string   `json:"coping_mechanisms_when_sad"`
	PossessLeadershipSkills                  string   `json:"possess_leadership_skills"`
	LeadershipSkillsReasonYes                []string `json:"leadership_skills_reason_yes"`
	LeadershipSkillsReasonNo                 string   `json:"leadership_skills_reason_no"`
	LeadershipSkills                         string   `json:"leadership_skills"`
	CommunityMembersTakesSeriously           string   `json:"community_members_takes_seriously"`
	TakesFeedbackFromCommunityMembers        string   `json:"takes_feedback_from_community_members"`
	FeedbackFromCommunityMembers             string   `json:"feedback_from_community_members"`
	GoalsAsGelathi                           string   `json:"goals_as_gelathi"`
	WillingToTakePartLocalElections          string   `json:"willing_to_take_part_local_elections"`
	CalmBeforeReactionD                      string   `json:"calm_before_reaction_d"`
	ShoutAtOthersD                           string   `json:"shout_at_others_d"`
	WalkOutWithoutListeningD                 string   `json:"walk_out_without_listening_d"`
	AskToLeaveImmediatelyD                   string   `json:"ask_to_leave_immediately_d"`
	PatientlyListenUnderstandD               string   `json:"patiently_listen_understand_d"`
	CalmDisagreementArticulationD            string   `json:"calm_disagreement_articulation_d"`
}

type Response3 struct {
	Success bool   `json:"success"`
	Message string `json:"message"`
}

func AddSpoorthiBaselineQuestionnaire(w http.ResponseWriter, r *http.Request, DB *sql.DB) {
	// Set response headers
	w.Header().Set("Access-Control-Allow-Headers", "Accept, Content-Type, Content-Length, Accept-Encoding, X-CSRF-Token, Authorization,application/json,Token")
	w.Header().Set("Access-Control-Allow-Origin", "*")
	w.Header().Set("Access-Control-Allow-Methods", "POST, GET, OPTIONS, PUT, DELETE")
	w.Header().Set("Access-Control-Allow-Credentials", "true")

	if r.Method != http.MethodPost {
		w.WriteHeader(http.StatusMethodNotAllowed)
		response := Response3{Success: false, Message: "Method Not Allowed"}
		json.NewEncoder(w).Encode(response)
		return
	}

	var request addSpoorthiBaselineQuestionnaire
	err := json.NewDecoder(r.Body).Decode(&request)
	if err != nil {
		w.WriteHeader(http.StatusBadRequest)
		fmt.Println(err)
		response := Response3{Success: false, Message: "Invalid request body"}
		json.NewEncoder(w).Encode(response)
		return
	}
	defer r.Body.Close()
	checkStatement := "SELECT COUNT(*) FROM SpoorthiBaselineQuestionnaire WHERE partcipantId = ?"
	var count int
	err = DB.QueryRow(checkStatement, request.ParticipantID).Scan(&count)
	if err != nil {
		w.WriteHeader(http.StatusInternalServerError)
		log.Println("Error checking participant ID:", err)
		json.NewEncoder(w).Encode(map[string]interface{}{"Message": "Internal Server Error", "Status Code": "500 ", "API": "Addbuzzvyapar"})
		return
	}

	if count > 0 {
		w.WriteHeader(http.StatusBadRequest)
		log.Println("Participant ID already present")
		json.NewEncoder(w).Encode(map[string]interface{}{"Message": "Participant ID already present", "Status Code": "400 ", "API": "Addbuzzvyapar"})
		return
	}

	if request.ParticipantID != "" && request.GelathiID != "" {
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

		addStatement := `INSERT INTO SpoorthiBaselineQuestionnaire (
partcipantId,
email_address,
GelathiId,
entry_date,
Spoorthi_Session_Number,
list_down_your_skills,
skills_to_overcome_my_challenges,
used_skills_resources_combat_challenge,
listen_paragraph,
summarize_main_points_paragraph,
ask_two_questions_help_you_understand,
three_infrastructure_of_your_village,
know_the_need_of_my_community,
together_community_members_community_infrastructure,
with_other_community_infrastructure,
bring_someone_together,
brought_people_together_incident,
conflict_with_anyone_ask_position,
conflict_matters_interest_mine,
There_puja_at_my_house,
district,
taluk,
gram_panchayat,
village_name,
total_adults_no_of_member_household,
total_childern_no_of_member_household,
house,
ration_card,
cast_category,
mother_tongue,
religion,
age,
material_status,
education,
phone_number,
current_economic_activity_primary_occupation,
secondary_occupation_household,
womens_occupation,
skills_motivation,
three_reasons_become_gelathi,
goals_achieve_as_gelathi,
goals_as_leader_next_year,
goals_for_ten_years,
community,
support_feelings,
meetings_day_feelings,
deal_with_angry_situation,
impatient_with_unclear_comm,
say_yes_when_unsure_of_instructions,
confidence,
persisted_when_others_quit,
narrate_instance,
goal_persistence_instance,
task_response,
challenge_reaction,
conflict_management,
conflict_handling,
solution_agreeable_to_others,
sense_of_sisterhood,
qualities_of_good_gelathi,
members_emotional_bond,
members_discuss_personal_issues,
coping_mechanisms_when_sad,
possess_leadership_skills,
leadership_skills_reason_yes,
leadership_skills_reason_no,
leadership_skills,
community_members_takes_seriously,
takes_feedback_from_community_members,
feedback_from_community_members,
goals_as_gelathi,
willing_to_take_part_local_elections,
calm_before_reaction_d ,
    shout_at_others_d ,
    walk_out_without_listening_d ,
    ask_to_leave_immediately_d ,
    patiently_listen_understand_d ,
    calm_disagreement_articulation_d
)
VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)`

		_, err := DB.Exec(addStatement,
			request.ParticipantID,
			request.Email,
			request.GelathiID,
			date,
			request.SpoorthiSessionNumber,
			request.ListDownYourSkills,
			request.SkillsToOvercomeMyChallenges,
			request.UsedSkillsResourcesCombatChallenge,
			request.ListenParagraph,
			request.SummarizeMainPointsParagraph,
			request.AskTwoQuestionsHelpYouUnderstand,
			request.ThreeInfrastructureOfYourVillage,
			request.KnowTheNeedOfMyCommunity,
			request.TogetherCommunityMembersCommunityInfra,
			request.WithOtherCommunityInfrastructure,
			request.BringSomeoneTogether,
			request.BroughtPeopleTogetherIncident,
			request.ConflictWithAnyoneAskPosition,
			request.ConflictMattersInterestMine,
			request.TherePujaAtMyHouse,
			request.District,
			request.Taluk,
			request.GramPanchayat,
			request.VillageName,
			request.TotalAdultsNoOfMemberHousehold,
			request.TotalChildrenNoOfMemberHousehold,
			request.House,
			request.RationCard,
			request.CastCategory,
			request.MotherTongue,
			request.Religion,
			request.Age,
			request.MaterialStatus,
			request.Education,
			request.PhoneNumber,
			request.CurrentEconomicActivityPrimaryOccupation,
			request.SecondaryOccupationHousehold,
			request.WomensOccupation,
			request.SkillsMotivation,
			request.ThreeReasonsBecomeGelathi,
			request.GoalsAchieveAsGelathi,
			request.GoalsAsLeaderNextYear,
			request.GoalsForTenYears,
			request.Community,
			request.SupportFeelings,
			request.MeetingsDayFeelings,
			strings.Join(request.DealWithAngrySituation, ", "),
			request.ImpatientWithUnclearComm,
			request.SayYesWhenUnsureOfInstructions,
			request.Confidence,
			request.PersistedWhenOthersQuit,
			request.NarrateInstance,
			request.GoalPersistenceInstance,
			request.TaskResponse,
			request.ChallengeReaction,
			request.ConflictManagement,
			request.ConflictHandling,
			request.SolutionAgreeableToOthers,
			request.SenseOfSisterhood,
			request.QualitiesOfGoodGelathi,
			request.MembersEmotionalBond,
			request.MembersDiscussPersonalIssues,
			request.CopingMechanismsWhenSad,
			request.PossessLeadershipSkills,
			strings.Join(request.LeadershipSkillsReasonYes, ", "),
			request.LeadershipSkillsReasonNo,
			request.LeadershipSkills,
			request.CommunityMembersTakesSeriously,
			request.TakesFeedbackFromCommunityMembers,
			request.FeedbackFromCommunityMembers,
			request.GoalsAsGelathi,
			request.WillingToTakePartLocalElections,
			request.CalmBeforeReactionD,
			request.ShoutAtOthersD,
			request.WalkOutWithoutListeningD,
			request.AskToLeaveImmediatelyD,
			request.PatientlyListenUnderstandD,
			request.CalmDisagreementArticulationD,
		)

		if err != nil {
			log.Println(err)
			w.WriteHeader(http.StatusInternalServerError)
			response := Response3{Success: false, Message: "Failed to add questionnaire"}
			json.NewEncoder(w).Encode(response)
			return
		}

		response := Response3{Success: true, Message: "Added Successfully"}
		json.NewEncoder(w).Encode(response)
	} else {
		response := Response3{Success: false, Message: "Send Required Parameters"}
		json.NewEncoder(w).Encode(response)
	}
}
