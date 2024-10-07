package Getviewform

import (
	"database/sql"
	"encoding/json"
	"fmt"
	"log"
	"net/http"
	"os"
	"strings"
	"time"
)

type BuzzVyaparProgramBaseline struct {
	ID                                  int64    `json:"id"`
	ParticipantID                       int64    `json:"participant_id"`
	GfID                                int64    `json:"gf_id"`
	EntryDate                           string   `json:"entry_date"`
	WhenWasSurveyDone                   string   `json:"when_was_survey_done"`
	NameOfTheVyapari                    string   `json:"name_of_the_vyapari"`
	Age                                 int      `json:"age"`
	ContactNumber                       string   `json:"contact_number"`
	VillageID                           string   `json:"village_id"`
	LocationCircle                      string   `json:"location_circle"`
	HigherEducation                     string   `json:"higher_education"`
	MaritalStatus                       string   `json:"marital_status"`
	NumberOfPeopleInTheHousehold        int      `json:"number_of_people_in_the_household"`
	DoYouOwnASmartPhone                 string   `json:"do_you_own_a_smart_phone"`
	DoYouHaveInternetConnectionOnPhone  string   `json:"do_you_have_internet_connection_on_your_smart_phone"`
	SectorTypeOfBusiness                string   `json:"sector_type_of_business"`
	AreYouProficientWithNumbers         string   `json:"are_you_proficient_with_numbers"`
	AreYouProficientWithWrittenLanguage string   `json:"are_you_proficient_with_written_language"`
	HouseholdIncomeMonthly              float64  `json:"household_income_monthly"`
	LastMonthAverageIncome              float64  `json:"over_the_last_month_your_average_income"`
	BusinessProfitLastMonth             float64  `json:"your_business_profit_last_month"`
	DesiredMonthlyIncome                float64  `json:"how_much_monthly_income_would_you_like_to_ideally_earn"`
	InitialBusinessInvestment           float64  `json:"amount_invested_when_the_business_started"`
	YearsInBusiness                     string   `json:"number_of_years_the_business_has_been_operating"`
	WhyDoYouDoBusiness                  string   `json:"why_do_you_do_business"`
	EntrepreneurQualities               string   `json:"tell_us_three_things_about_you_as_an_entrepreneur"`
	WomanRoleAtHome                     string   `json:"tell_us_three_things_about_your_role_as_a_woman_at_home"`
	BusinessChallenges                  string   `json:"what_are_your_challenges_in_running_and_growing_your_business"`
	PlanToOvercomeChallenges            string   `json:"what_is_your_plan_to_overcome_these_challenges"`
	Skills                              string   `json:"what_are_your_skills"`
	AvailableBusinessResources          string   `json:"what_are_the_resources_available_with_you_for_your_business"`
	CustomerDescription                 string   `json:"who_is_your_customer_describe_them_to_us"`
	BusinessComponents                  string   `json:"please_list_down_the_various_components_of_business"`
	BusinessState                       string   `json:"i_know_the_current_state_of_my_business_in_profit_loss_revenue"`
	AccountBooks                        string   `json:"what_kind_of_books_of_accounts_do_you_maintain"`
	BusinessProblemSolving              string   `json:"i_can_generate_ideas_to_solve_my_business_problems"`
	ExampleOfBusinessProblem            string   `json:"tell_us_about_one_business_problem"`
	BusinessGoal                        string   `json:"what_is_your_business_goal_business_impurumenet_madodu"`
	HasBusinessPlan                     string   `json:"do_you_have_a_business_plan_to_reach_that_goal"`
	CanSubmitBusinessPlan               string   `json:"can_you_submit_a_business_plan_for_your_goal_to_us_right_now"`
	BusinessStrengths                   string   `json:"what_are_the_strengths_of_your_business"`
	BusinessWeaknesses                  string   `json:"what_are_the_weaknesses_of_your_business"`
	BusinessOpportunities               string   `json:"what_are_the_opportunities_for_your_business"`
	CanRaiseFinance                     string   `json:"are_you_able_to_raise_the_required_finance"`
	LoanFrom                            string   `json:"i_have_taken_a_loan_from"`
	LoanAccessIssues                    string   `json:"i_have_trouble_accessing_loan_for_my_business"`
	LoanAccessPrerequisites             string   `json:"what_are_the_prerequisites_to_access_a_loan"`
	TalukDistrict                       string   `json:"taluk_district"`
	CohortName                          string   `json:"name_of_the_cohort"`
	StoppedBusiness                     string   `json:"you_stopped_hold_your_business"`
	HoursEngagedInBusiness              int      `json:"no_hours_engaged_business"`
	BusinessLicense                     string   `json:"license_for_existing_business"`
	HomeBasedShopWork                   string   `json:"home_based_work_from_shop"`
	LoanCurrentlyAvailed                string   `json:"loan_currently_availed"`
	LoanRelation                        string   `json:"relation_who_borrowed"`
	LoanTotalAmount                     float64  `json:"loan_total_amount"`
	LoanSource                          string   `json:"loan_source"`
	LoanRepaymentTillDate               float64  `json:"loan_repayment_till_date"`
	AdditionalSkillsNeeded              string   `json:"need_additional_skills_business"`
	AdditionalSkillsDetails             string   `json:"skills_what_are_those"`
	Module1                             string   `json:"module1"`
	Module2                             string   `json:"module2"`
	Module3                             string   `json:"module3"`
	Module4                             string   `json:"module4"`
	Module5                             string   `json:"module5"`
	District                            string   `json:"district"`
	Taluk                               string   `json:"taluk"`
	GramPanchayat                       string   `json:"gram_panchayat"`
	NumberOfBeehivesParticipated        int      `json:"number_of_beehives_participated"`
	TotalHouseholdMembers               int      `json:"total_household_members"`
	House                               string   `json:"house"`
	RationCard                          string   `json:"ration_card"`
	Cast                                string   `json:"cast"`
	DOB                                 string   `json:"dob"`
	Education                           string   `json:"education"`
	PrimaryOccupationHousehold          string   `json:"primary_occupation_household"`
	SecondaryOccupationHousehold        string   `json:"secondary_occupation_household"`
	WomensOccupation                    string   `json:"womens_occupation"`
	MonthlyExpenditure                  float64  `json:"monthly_expenditure"`
	MobileType                          string   `json:"mobile_type"`
	PersonalSmartphone                  string   `json:"personal_smartphone"`
	ReasonForNotHavingSmartphone        string   `json:"reason_for_not_having_smartphone"`
	HasBankAccount                      string   `json:"has_bank_account"`
	UsesUPI                             string   `json:"uses_upi"`
	UndergoneSkillDevelopmentProgram    string   `json:"underwent_skill_development_program"`
	SkillsGainedFromProgram             string   `json:"skills_gained_from_program"`
	EnterpriseStatus                    string   `json:"enterprise_status"`
	RunEnterpriseIndependently          string   `json:"run_enterprise_independently"`
	AverageMonthlyIncomeEnterprise      float64  `json:"average_monthly_income_enterprise"`
	AverageMonthlyProfitEnterprise      float64  `json:"average_monthly_profit_enterprise"`
	DesiredMonthlyIncomeEnterprise      float64  `json:"desired_monthly_income"`
	InitialInvestmentAmount             float64  `json:"initial_investment_amount"`
	InvestmentSource                    string   `json:"investment_source"`
	YearsInOperation                    int      `json:"years_in_operation"`
	HasHiredEmployees                   string   `json:"has_hired_employees"`
	NumberOfPaidWorkers                 string   `json:"number_of_paid_workers"`
	ReasonForDoingBusiness              string   `json:"reason_for_doing_business"`
	EntrepreneurialAspirations          []string `json:"entrepreneurial_aspirations"`
	MaintainDailyFinancialBooks         string   `json:"maintain_daily_financial_books"`
	FrequencyOfRecordingFinancialBooks  string   `json:"frequency_of_recording_financial_books"`
	MethodOfKeepingAccounts             []string `json:"method_of_keeping_accounts"`
	ReasonForNotBookkeeping             string   `json:"reason_for_not_bookkeeping"`
	HasBusinessGoalOrPlan               string   `json:"has_business_goal_or_plan"`
	MaintainDetailedBusinessPlan        string   `json:"maintain_detailed_business_plan"`
	ShortTermGoal                       string   `json:"short_term_goal"`
	LoanTaken                           string   `json:"loan_taken"`
	InterestRate                        float64  `json:"interest_rate"`
	LoanPurpose                         string   `json:"loan_purpose"`
	RunGrowthChallenges                 string   `json:"run_growth_challenges"`
	CoreStrength                        string   `json:"core_strength"`
	CoreWeakness                        string   `json:"core_weakness"`
	CoreOpportunity                     string   `json:"core_opportunity"`
	CoreThreat                          string   `json:"core_threat"`
	TargetCustomer                      string   `json:"target_customer"`
	OwnAccountWork                      string   `json:"own_account_work"`
	IdeaStatus                          string   `json:"idea_status"`
	IdeaStart                           string   `json:"idea_start"`
	IdeaCategory                        string   `json:"idea_category"`
	MonthlyIncome                       float64  `json:"monthly_income"`
	MoneyManagement                     string   `json:"money_management"`
	DoBookkeeping                       string   `json:"do_bookkeeping"`
	LoanExists                          string   `json:"loan_exists"`
	SavingsAvailable                    string   `json:"savings_available"`
	LoanStartup                         string   `json:"loan_startup"`
	TypeOfEnterpriseRunning             string   `json:"type_of_enterprise_running"`
	MonthlyHouseholdIncome              string   `json:"monthly_household_income"`
}

func AddVyaparsurvey(w http.ResponseWriter, r *http.Request, DB *sql.DB) {
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

	var b BuzzVyaparProgramBaseline
	err1 := json.NewDecoder(r.Body).Decode(&b)

	if err1 != nil {
		fmt.Println("errrr", err1)
		log.Println(err1)
		w.WriteHeader(http.StatusBadRequest)
		json.NewEncoder(w).Encode(map[string]string{"Message": "Invalid Input Syntax", "Status Code": "400 ", "API": "Addnagarika"})
		return
	}

	checkStatement := "SELECT COUNT(*) FROM greenbaselinesurvey WHERE partcipantId = ?"
	var count int
	err = DB.QueryRow(checkStatement, b.ParticipantID).Scan(&count)
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
	if b.ParticipantID != 0 {
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

		sql := `
		INSERT INTO buzzvyaparprogrambaseline (
    partcipantId,
    gfId,
    entry_date,
    when_was_survey_done,
    name_of_the_vyapari,
    age,
    contact_number,
    village_id,
    location_circle,
    highter_education,
    marital_status,
    number_of_people_in_the_household,
    do_you_own_a_smart_phone,
    do_you_have_internet_connection_on_your_smart_phone,
    sector_type_of_business,
    are_you_proficient_with_numbers,
    are_you_proficient_with_written_language,
    household_income_monthly,
    over_the_last_month_your_average_income,
    your_business_profit_last_month,
    how_much_monthly_income_would_you_like_to_ideally_earn,
    amount_invested_when_the_business_started,
    number_of_years_the_business_has_been_operating,
    why_do_you_do_business,
    tell_us_three_things_about_you_as_an_entrepreneur,
    tell_us_three_things_about_your_role_as_a_woman_at_home,
    what_are_your_challenges_in_running_and_growing_your_business,
    what_is_your_plan_to_overcome_these_challenges,
    what_are_your_skills,
    what_are_the_resources_available_with_you_for_your_business,
    who_is_your_customer_Describe_them_to_us,
    please_list_down_the_various_components_of_business,
    I_know_the_current_state_of_my_business_in_profit_loss_revenue,
    what_kind_of_books_of_accounts_do_you_maintain,
    i_can_generate_ideas_to_solve_my_business_problems,
    tell_us_about_one_business_problem,
    what_is_your_business_goal_Business_impurumenet_madodu,
    do_you_have_a_business_plan_to_reach_that_goal,
    can_you_submit_a_business_plan_for_your_goal_to_us_right_now,
    what_are_the_strenghts_of_your_business,
    what_are_the_weaknesses_of_your_business,
    what_are_the_oppourtunities_for_your_business,
    are_you_able_to_raise_the_required_finance,
    i_have_taken_a_loan_from,
    i_have_trouble_accessing_loan_for_my_business,
    what_are_the_prerequisites_to_access_a_loan,
    taluk_district,
    name_of_the_cohort,
    you_stopped_hold_your_business,
    no_hours_engaged_business,
    license_for_existing_business,
    home_based_work_from_shop,
    loan_currently_availed,
    relation_who_borrowed,
    loan_total_amount,
    loan_source,
    loan_repayment_till_date,
    need_additional_skills_business,
    skils_what_are_those,
    district,
    taluk,
    gram_panchayat,
    number_of_beehives_participated,
    total_household_members,
    house,
    ration_card,
    cast,
    dob,
    education,
    primary_occupation_household,
    secondary_occupation_household,
    womens_occupation,
    monthly_expenditure,
    mobile_type,
    personal_smartphone,
    reason_for_not_having_smartphone,
    has_bank_account,
    uses_upi,
    underwent_skill_development_program,
    skills_gained_from_program,
    enterprise_status,
    run_enterprise_independently,
    average_monthly_income_enterprise,
    average_monthly_profit_enterprise,
    desired_monthly_income,
    initial_investment_amount,
    investment_source,
    years_in_operation,
    has_hired_employees,
    number_of_paid_workers,
    reason_for_doing_business,
    entrepreneurial_aspirations,
    maintain_daily_financial_books,
    frequency_of_recording_financial_books,
    method_of_keeping_accounts,
    reason_for_not_bookkeeping,
    has_business_goal_or_plan,
    maintain_detailed_business_plan,
    short_term_goal,
    loan_taken,
    interest_rate,
    loan_purpose,
    run_growth_challenges,
    core_strength,
    core_weakness,
    core_opportunity,
    core_threat,
    target_customer,
    own_account_work,
    idea_status,
    idea_start,
    idea_category,
    monthly_income,
    money_management,
    do_bookkeeping,
    loan_exists,
    savings_available,
    loan_startup,
	type_of_enterprise_running,
	monthly_household_income
) VALUES (
     ?, ?, ?, ?,?, ?,?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?,?, ?, ?, ?, ?, ?, ?,?
)
	`

		_, err := DB.Exec(sql,
			&b.ParticipantID,
			&b.GfID,
			date,
			&b.WhenWasSurveyDone,
			&b.NameOfTheVyapari,
			&b.Age,
			&b.ContactNumber,
			&b.VillageID,
			&b.LocationCircle,
			&b.HigherEducation, // Corrected from HighterEducation
			&b.MaritalStatus,
			&b.NumberOfPeopleInTheHousehold,
			&b.DoYouOwnASmartPhone,
			&b.DoYouHaveInternetConnectionOnPhone, // Corrected from DoYouHaveInternetConnectionOnYourSmartPhone
			&b.SectorTypeOfBusiness,
			&b.AreYouProficientWithNumbers,
			&b.AreYouProficientWithWrittenLanguage,
			&b.HouseholdIncomeMonthly,
			&b.LastMonthAverageIncome,    // Corrected from OverTheLastMonthYourAverageIncome
			&b.BusinessProfitLastMonth,   // Corrected from YourBusinessProfitLastMonth
			&b.DesiredMonthlyIncome,      // Corrected from HowMuchMonthlyIncomeWouldYouLikeToIdeallyEarn
			&b.InitialBusinessInvestment, // Corrected from AmountInvestedWhenTheBusinessStarted
			&b.YearsInBusiness,           // Corrected from NumberOfYearsTheBusinessHasBeenOperating
			&b.WhyDoYouDoBusiness,
			&b.EntrepreneurQualities,      // Corrected from TellUsThreeThingsAboutYouAsAnEntrepreneur
			&b.WomanRoleAtHome,            // Corrected from TellUsThreeThingsAboutYourRoleAsAWomanAtHome
			&b.BusinessChallenges,         // Corrected from WhatAreYourChallengesInRunningAndGrowingYourBusiness
			&b.PlanToOvercomeChallenges,   // Corrected from WhatIsYourPlanToOvercomeTheseChallenges
			&b.Skills,                     // Corrected from WhatAreYourSkills
			&b.AvailableBusinessResources, // Corrected from WhatAreTheResourcesAvailableWithYouForYourBusiness
			&b.CustomerDescription,        // Corrected from WhoIsYourCustomerDescribeThemToUs
			&b.BusinessComponents,         // Corrected from PleaseListDownTheVariousComponentsOfBusiness
			&b.BusinessState,              // Corrected from IKnowTheCurrentStateOfMyBusinessInProfitLossRevenue
			&b.AccountBooks,               // Corrected from WhatKindOfBooksOfAccountsDoYouMaintain
			&b.BusinessProblemSolving,     // Corrected from ICanGenerateIdeasToSolveMyBusinessProblems
			&b.ExampleOfBusinessProblem,   // Corrected from TellUsAboutOneBusinessProblem
			&b.BusinessGoal,               // Corrected from WhatIsYourBusinessGoalBusinessImpurumenetMadodu
			&b.HasBusinessPlan,            // Corrected from DoYouHaveABusinessPlanToReachThatGoal
			&b.CanSubmitBusinessPlan,      // Corrected from CanYouSubmitABusinessPlanForYourGoalToUsRightNow
			&b.BusinessStrengths,          // Corrected from WhatAreTheStrengthsOfYourBusiness
			&b.BusinessWeaknesses,         // Corrected from WhatAreTheWeaknessesOfYourBusiness
			&b.BusinessOpportunities,      // Corrected from WhatAreTheOpportunitiesForYourBusiness
			&b.CanRaiseFinance,            // Corrected from AreYouAbleToRaiseTheRequiredFinance
			&b.LoanFrom,                   // Corrected from IHaveTakenALoanFrom
			&b.LoanAccessIssues,           // Corrected from IHaveTroubleAccessingLoanForMyBusiness
			&b.LoanAccessPrerequisites,    // Corrected from WhatAreThePrerequisitesToAccessALoan
			&b.TalukDistrict,
			&b.CohortName,             // Corrected from NameOfTheCohort
			&b.StoppedBusiness,        // Corrected from YouStoppedHoldYourBusiness
			&b.HoursEngagedInBusiness, // Corrected from NoHoursEngagedBusiness
			&b.BusinessLicense,        // Corrected from LicenseForExistingBusiness
			&b.HomeBasedShopWork,      // Corrected from HomeBasedWorkFromShop
			&b.LoanCurrentlyAvailed,
			&b.LoanRelation, // Corrected from RelationWhoBorrowed
			&b.LoanTotalAmount,
			&b.LoanSource,
			&b.LoanRepaymentTillDate,
			&b.AdditionalSkillsNeeded,  // Corrected from NeedAdditionalSkillsBusiness
			&b.AdditionalSkillsDetails, // Corrected from SkilsWhatAreThose
			&b.District,
			&b.Taluk,
			&b.GramPanchayat,
			&b.NumberOfBeehivesParticipated,
			&b.TotalHouseholdMembers,
			&b.House,
			&b.RationCard,
			&b.Cast,
			&b.DOB, // Corrected from Dob
			&b.Education,
			&b.PrimaryOccupationHousehold,
			&b.SecondaryOccupationHousehold,
			&b.WomensOccupation,
			&b.MonthlyExpenditure,
			&b.MobileType,
			&b.PersonalSmartphone,
			&b.ReasonForNotHavingSmartphone,
			&b.HasBankAccount,
			&b.UsesUPI,                          // Corrected from UsesUpi
			&b.UndergoneSkillDevelopmentProgram, // Corrected from UnderwentSkillDevelopmentProgram
			&b.SkillsGainedFromProgram,
			&b.EnterpriseStatus,
			&b.RunEnterpriseIndependently,
			&b.AverageMonthlyIncomeEnterprise,
			&b.AverageMonthlyProfitEnterprise,
			&b.DesiredMonthlyIncomeEnterprise, // Corrected from DesiredMonthlyIncome
			&b.InitialInvestmentAmount,
			&b.InvestmentSource,
			&b.YearsInOperation,
			&b.HasHiredEmployees,
			&b.NumberOfPaidWorkers,
			&b.ReasonForDoingBusiness,
			strings.Join(b.EntrepreneurialAspirations, ", "),
			&b.MaintainDailyFinancialBooks,
			&b.FrequencyOfRecordingFinancialBooks,
			strings.Join(b.MethodOfKeepingAccounts, ", "),
			&b.ReasonForNotBookkeeping,
			&b.HasBusinessGoalOrPlan,
			&b.MaintainDetailedBusinessPlan,
			&b.ShortTermGoal,
			&b.LoanTaken,
			&b.InterestRate,
			&b.LoanPurpose,
			&b.RunGrowthChallenges,
			&b.CoreStrength,
			&b.CoreWeakness,
			&b.CoreOpportunity,
			&b.CoreThreat,
			&b.TargetCustomer,
			&b.OwnAccountWork,
			&b.IdeaStatus,
			&b.IdeaStart,
			&b.IdeaCategory,
			&b.MonthlyIncome,
			&b.MoneyManagement,
			&b.DoBookkeeping,
			&b.LoanExists,
			&b.SavingsAvailable,
			&b.LoanStartup,
			&b.TypeOfEnterpriseRunning,
			&b.MonthlyHouseholdIncome,
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
