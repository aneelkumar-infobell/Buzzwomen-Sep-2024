// package Getviewform

// import (
// 	"database/sql"
// 	"encoding/json"
// 	"fmt"
// 	"io/ioutil"
// 	"net/http"
// 	"strings"
// )

// func GetVyaparBaselineSurvey(w http.ResponseWriter, r *http.Request, db *sql.DB) {
// 	type BuzzVyaparProgramBaseline struct {
// 		ID                                  int64    `json:"id"`
// 		ParticipantID                       int64    `json:"participant_id"`
// 		GfID                                int64    `json:"gf_id"`
// 		EntryDate                           string   `json:"entry_date"`
// 		WhenWasSurveyDone                   string   `json:"when_was_survey_done"`
// 		NameOfTheVyapari                    string   `json:"name_of_the_vyapari"`
// 		Age                                 int      `json:"age"`
// 		ContactNumber                       string   `json:"contact_number"`
// 		VillageID                           string   `json:"village_id"`
// 		LocationCircle                      string   `json:"location_circle"`
// 		HigherEducation                     string   `json:"higher_education"`
// 		MaritalStatus                       string   `json:"marital_status"`
// 		NumberOfPeopleInTheHousehold        int      `json:"number_of_people_in_the_household"`
// 		DoYouOwnASmartPhone                 string   `json:"do_you_own_a_smart_phone"`
// 		DoYouHaveInternetConnectionOnPhone  string   `json:"do_you_have_internet_connection_on_your_smart_phone"`
// 		SectorTypeOfBusiness                string   `json:"sector_type_of_business"`
// 		AreYouProficientWithNumbers         string   `json:"are_you_proficient_with_numbers"`
// 		AreYouProficientWithWrittenLanguage string   `json:"are_you_proficient_with_written_language"`
// 		HouseholdIncomeMonthly              float64  `json:"household_income_monthly"`
// 		LastMonthAverageIncome              float64  `json:"over_the_last_month_your_average_income"`
// 		BusinessProfitLastMonth             float64  `json:"your_business_profit_last_month"`
// 		DesiredMonthlyIncome                float64  `json:"how_much_monthly_income_would_you_like_to_ideally_earn"`
// 		InitialBusinessInvestment           float64  `json:"amount_invested_when_the_business_started"`
// 		YearsInBusiness                     string   `json:"number_of_years_the_business_has_been_operating"`
// 		WhyDoYouDoBusiness                  string   `json:"why_do_you_do_business"`
// 		EntrepreneurQualities               string   `json:"tell_us_three_things_about_you_as_an_entrepreneur"`
// 		WomanRoleAtHome                     string   `json:"tell_us_three_things_about_your_role_as_a_woman_at_home"`
// 		BusinessChallenges                  string   `json:"what_are_your_challenges_in_running_and_growing_your_business"`
// 		PlanToOvercomeChallenges            string   `json:"what_is_your_plan_to_overcome_these_challenges"`
// 		Skills                              string   `json:"what_are_your_skills"`
// 		AvailableBusinessResources          string   `json:"what_are_the_resources_available_with_you_for_your_business"`
// 		CustomerDescription                 string   `json:"who_is_your_customer_describe_them_to_us"`
// 		BusinessComponents                  string   `json:"please_list_down_the_various_components_of_business"`
// 		BusinessState                       string   `json:"i_know_the_current_state_of_my_business_in_profit_loss_revenue"`
// 		AccountBooks                        string   `json:"what_kind_of_books_of_accounts_do_you_maintain"`
// 		BusinessProblemSolving              string   `json:"i_can_generate_ideas_to_solve_my_business_problems"`
// 		ExampleOfBusinessProblem            string   `json:"tell_us_about_one_business_problem"`
// 		BusinessGoal                        string   `json:"what_is_your_business_goal_business_impurumenet_madodu"`
// 		HasBusinessPlan                     string   `json:"do_you_have_a_business_plan_to_reach_that_goal"`
// 		CanSubmitBusinessPlan               string   `json:"can_you_submit_a_business_plan_for_your_goal_to_us_right_now"`
// 		BusinessStrengths                   string   `json:"what_are_the_strengths_of_your_business"`
// 		BusinessWeaknesses                  string   `json:"what_are_the_weaknesses_of_your_business"`
// 		BusinessOpportunities               string   `json:"what_are_the_opportunities_for_your_business"`
// 		CanRaiseFinance                     string   `json:"are_you_able_to_raise_the_required_finance"`
// 		LoanFrom                            string   `json:"i_have_taken_a_loan_from"`
// 		LoanAccessIssues                    string   `json:"i_have_trouble_accessing_loan_for_my_business"`
// 		LoanAccessPrerequisites             string   `json:"what_are_the_prerequisites_to_access_a_loan"`
// 		TalukDistrict                       string   `json:"taluk_district"`
// 		CohortName                          string   `json:"name_of_the_cohort"`
// 		StoppedBusiness                     string   `json:"you_stopped_hold_your_business"`
// 		HoursEngagedInBusiness              int      `json:"no_hours_engaged_business"`
// 		BusinessLicense                     string   `json:"license_for_existing_business"`
// 		HomeBasedShopWork                   string   `json:"home_based_work_from_shop"`
// 		LoanCurrentlyAvailed                string   `json:"loan_currently_availed"`
// 		LoanRelation                        string   `json:"relation_who_borrowed"`
// 		LoanTotalAmount                     float64  `json:"loan_total_amount"`
// 		LoanSource                          string   `json:"loan_source"`
// 		LoanRepaymentTillDate               float64  `json:"loan_repayment_till_date"`
// 		AdditionalSkillsNeeded              string   `json:"need_additional_skills_business"`
// 		AdditionalSkillsDetails             string   `json:"skills_what_are_those"`
// 		Module1                             string   `json:"module1"`
// 		Module2                             string   `json:"module2"`
// 		Module3                             string   `json:"module3"`
// 		Module4                             string   `json:"module4"`
// 		Module5                             string   `json:"module5"`
// 		District                            string   `json:"district"`
// 		Taluk                               string   `json:"taluk"`
// 		GramPanchayat                       string   `json:"gram_panchayat"`
// 		NumberOfBeehivesParticipated        int      `json:"number_of_beehives_participated"`
// 		TotalHouseholdMembers               int      `json:"total_household_members"`
// 		House                               string   `json:"house"`
// 		RationCard                          string   `json:"ration_card"`
// 		Cast                                string   `json:"cast"`
// 		DOB                                 string   `json:"dob"`
// 		Education                           string   `json:"education"`
// 		PrimaryOccupationHousehold          string   `json:"primary_occupation_household"`
// 		SecondaryOccupationHousehold        string   `json:"secondary_occupation_household"`
// 		WomensOccupation                    string   `json:"womens_occupation"`
// 		MonthlyExpenditure                  float64  `json:"monthly_expenditure"`
// 		MobileType                          string   `json:"mobile_type"`
// 		PersonalSmartphone                  string   `json:"personal_smartphone"`
// 		ReasonForNotHavingSmartphone        string   `json:"reason_for_not_having_smartphone"`
// 		HasBankAccount                      string   `json:"has_bank_account"`
// 		UsesUPI                             string   `json:"uses_upi"`
// 		UndergoneSkillDevelopmentProgram    string   `json:"underwent_skill_development_program"`
// 		SkillsGainedFromProgram             string   `json:"skills_gained_from_program"`
// 		EnterpriseStatus                    string   `json:"enterprise_status"`
// 		RunEnterpriseIndependently          string   `json:"run_enterprise_independently"`
// 		AverageMonthlyIncomeEnterprise      float64  `json:"average_monthly_income_enterprise"`
// 		AverageMonthlyProfitEnterprise      float64  `json:"average_monthly_profit_enterprise"`
// 		DesiredMonthlyIncomeEnterprise      float64  `json:"desired_monthly_income"`
// 		InitialInvestmentAmount             float64  `json:"initial_investment_amount"`
// 		InvestmentSource                    string   `json:"investment_source"`
// 		YearsInOperation                    int      `json:"years_in_operation"`
// 		HasHiredEmployees                   string   `json:"has_hired_employees"`
// 		NumberOfPaidWorkers                 int      `json:"number_of_paid_workers"`
// 		ReasonForDoingBusiness              string   `json:"reason_for_doing_business"`
// 		EntrepreneurialAspirations          []string `json:"entrepreneurial_aspirations"`
// 		MaintainDailyFinancialBooks         string   `json:"maintain_daily_financial_books"`
// 		FrequencyOfRecordingFinancialBooks  string   `json:"frequency_of_recording_financial_books"`
// 		MethodOfKeepingAccounts             []string `json:"method_of_keeping_accounts"`
// 		ReasonForNotBookkeeping             string   `json:"reason_for_not_bookkeeping"`
// 		HasBusinessGoalOrPlan               string   `json:"has_business_goal_or_plan"`
// 		MaintainDetailedBusinessPlan        string   `json:"maintain_detailed_business_plan"`
// 		ShortTermGoal                       string   `json:"short_term_goal"`
// 		LoanTaken                           string   `json:"loan_taken"`
// 		InterestRate                        float64  `json:"interest_rate"`
// 		LoanPurpose                         string   `json:"loan_purpose"`
// 		RunGrowthChallenges                 string   `json:"run_growth_challenges"`
// 		CoreStrength                        string   `json:"core_strength"`
// 		CoreWeakness                        string   `json:"core_weakness"`
// 		CoreOpportunity                     string   `json:"core_opportunity"`
// 		CoreThreat                          string   `json:"core_threat"`
// 		TargetCustomer                      string   `json:"target_customer"`
// 		OwnAccountWork                      string   `json:"own_account_work"`
// 		IdeaStatus                          string   `json:"idea_status"`
// 		IdeaStart                           string   `json:"idea_start"`
// 		IdeaCategory                        string   `json:"idea_category"`
// 		MonthlyIncome                       float64  `json:"monthly_income"`
// 		MoneyManagement                     string   `json:"money_management"`
// 		DoBookkeeping                       string   `json:"do_bookkeeping"`
// 		LoanExists                          string   `json:"loan_exists"`
// 		SavingsAvailable                    float64  `json:"savings_available"`
// 		LoanStartup                         string   `json:"loan_startup"`
// 	}

// 	w.Header().Set("Access-Control-Allow-Headers", "Accept, Content-Type, Content-Length, Accept-Encoding, X-CSRF-Token, Authorization,application/json,Token")
// 	w.Header().Set("Access-Control-Allow-Origin", "*")
// 	w.Header().Set("Access-Control-Allow-Methods", "POST, GET, OPTIONS, PUT, DELETE")
// 	w.Header().Set("Access-Control-Allow-Credentials", "true")

// 	data, err := ioutil.ReadAll(r.Body)
// 	if err != nil {
// 		json.NewEncoder(w).Encode(map[string]interface{}{"message": "Failed to read body", "success": false, "error": err.Error()})
// 		return
// 	}

// 	defer r.Body.Close()

// 	var req struct {
// 		ParticipantID int `json:"participantId"`
// 	}

// 	err = json.Unmarshal(data, &req)
// 	if err != nil {
// 		json.NewEncoder(w).Encode(map[string]interface{}{"code": http.StatusBadRequest, "message": "Failed to unmarshal", "success": false, "error": err.Error()})
// 		return
// 	}

// 	query := fmt.Sprintf(`
//     SELECT
// 	id,
//         COALESCE(partcipantId, 0) AS participant_id,
//     COALESCE(gfId, 0) AS gf_id,
//     COALESCE(entry_date, '') AS entry_date,
//     COALESCE(when_was_survey_done, '') AS when_was_survey_done,
//     COALESCE(name_of_the_vyapari, '') AS name_of_the_vyapari,
//     COALESCE(age, 0) AS age,
//     COALESCE(contact_number, '') AS contact_number,
//     COALESCE(village_id, 0) AS village_id,
//     COALESCE(location_circle, '') AS location_circle,
//     COALESCE(highter_education, '') AS highter_education,
//     COALESCE(marital_status, '') AS marital_status,
//     COALESCE(number_of_people_in_the_household, 0) AS number_of_people_in_the_household,
//     COALESCE(do_you_own_a_smart_phone, '') AS do_you_own_a_smart_phone,
//     COALESCE(do_you_have_internet_connection_on_your_smart_phone, '') AS do_you_have_internet_connection_on_your_smart_phone,
//     COALESCE(sector_type_of_business, '') AS sector_type_of_business,
//     COALESCE(are_you_proficient_with_numbers, '') AS are_you_proficient_with_numbers,
//     COALESCE(are_you_proficient_with_written_language, '') AS are_you_proficient_with_written_language,
//     COALESCE(household_income_monthly, 0.0) AS household_income_monthly,
//     COALESCE(over_the_last_month_your_average_income, 0.0) AS over_the_last_month_your_average_income,
//     COALESCE(your_business_profit_last_month, 0.0) AS your_business_profit_last_month,
//     COALESCE(how_much_monthly_income_would_you_like_to_ideally_earn, 0.0) AS how_much_monthly_income_would_you_like_to_ideally_earn,
//     COALESCE(amount_invested_when_the_business_started, 0.0) AS amount_invested_when_the_business_started,
//     COALESCE(number_of_years_the_business_has_been_operating, 0) AS number_of_years_the_business_has_been_operating,
//     COALESCE(why_do_you_do_business, '') AS why_do_you_do_business,
//     COALESCE(tell_us_three_things_about_you_as_an_entrepreneur, '') AS tell_us_three_things_about_you_as_an_entrepreneur,
//     COALESCE(tell_us_three_things_about_your_role_as_a_woman_at_home, '') AS tell_us_three_things_about_your_role_as_a_woman_at_home,
//     COALESCE(what_are_your_challenges_in_running_and_growing_your_business, '') AS what_are_your_challenges_in_running_and_growing_your_business,
//     COALESCE(what_is_your_plan_to_overcome_these_challenges, '') AS what_is_your_plan_to_overcome_these_challenges,
//     COALESCE(what_are_your_skills, '') AS what_are_your_skills,
//     COALESCE(what_are_the_resources_available_with_you_for_your_business, '') AS what_are_the_resources_available_with_you_for_your_business,
//     COALESCE(who_is_your_customer_describe_them_to_us, '') AS who_is_your_customer_describe_them_to_us,
//     COALESCE(please_list_down_the_various_components_of_business, '') AS please_list_down_the_various_components_of_business,
//     COALESCE(i_know_the_current_state_of_my_business_in_profit_loss_revenue, '') AS i_know_the_current_state_of_my_business_in_profit_loss_revenue,
//     COALESCE(what_kind_of_books_of_accounts_do_you_maintain, '') AS what_kind_of_books_of_accounts_do_you_maintain,
//     COALESCE(i_can_generate_ideas_to_solve_my_business_problems, '') AS i_can_generate_ideas_to_solve_my_business_problems,
//     COALESCE(tell_us_about_one_business_problem, '') AS tell_us_about_one_business_problem,
//     COALESCE(what_is_your_business_goal_business_impurumenet_madodu, '') AS what_is_your_business_goal_business_impurumenet_madodu,
//     COALESCE(do_you_have_a_business_plan_to_reach_that_goal, '') AS do_you_have_a_business_plan_to_reach_that_goal,
//     COALESCE(can_you_submit_a_business_plan_for_your_goal_to_us_right_now, '') AS can_you_submit_a_business_plan_for_your_goal_to_us_right_now,
//     COALESCE(what_are_the_strenghts_of_your_business, '') AS what_are_the_strenghts_of_your_business,
//     COALESCE(what_are_the_weaknesses_of_your_business, '') AS what_are_the_weaknesses_of_your_business,
//     COALESCE(what_are_the_oppourtunities_for_your_business, '') AS what_are_the_oppourtunities_for_your_business,
//     COALESCE(are_you_able_to_raise_the_required_finance, '') AS are_you_able_to_raise_the_required_finance,
//     COALESCE(i_have_taken_a_loan_from, '') AS i_have_taken_a_loan_from,
//     COALESCE(i_have_trouble_accessing_loan_for_my_business, '') AS i_have_trouble_accessing_loan_for_my_business,
//     COALESCE(what_are_the_prerequisites_to_access_a_loan, '') AS what_are_the_prerequisites_to_access_a_loan,
//     COALESCE(taluk_district, '') AS taluk_district,
//     COALESCE(name_of_the_cohort, '') AS name_of_the_cohort,
//     COALESCE(you_stopped_hold_your_business, '') AS you_stopped_hold_your_business,
//     COALESCE(no_hours_engaged_business, 0) AS no_hours_engaged_business,
//     COALESCE(license_for_existing_business, '') AS license_for_existing_business,
//     COALESCE(home_based_work_from_shop, '') AS home_based_work_from_shop,
//     COALESCE(loan_currently_availed, '') AS loan_currently_availed,
//     COALESCE(relation_who_borrowed, '') AS relation_who_borrowed,
//     COALESCE(loan_total_amount, 0.0) AS loan_total_amount,
//     COALESCE(loan_source, '') AS loan_source,
//     COALESCE(loan_repayment_till_date, 0.0) AS loan_repayment_till_date,
//     COALESCE(need_additional_skills_business, '') AS need_additional_skills_business,
//     COALESCE(skils_what_are_those, '') AS skils_what_are_those,
//     COALESCE(district, '') AS district,
//     COALESCE(taluk, '') AS taluk,
//     COALESCE(gram_panchayat, '') AS gram_panchayat,
//     COALESCE(number_of_beehives_participated, 0) AS number_of_beehives_participated,
//     COALESCE(total_household_members, 0) AS total_household_members,
//     COALESCE(house, '') AS house,
//     COALESCE(ration_card, '') AS ration_card,
//     COALESCE(cast, '') AS cast,
//     COALESCE(dob, '') AS dob,
//     COALESCE(education, '') AS education,
//     COALESCE(primary_occupation_household, '') AS primary_occupation_household,
//     COALESCE(secondary_occupation_household, '') AS secondary_occupation_household,
//     COALESCE(womens_occupation, '') AS womens_occupation,
//     COALESCE(monthly_expenditure, 0.0) AS monthly_expenditure,
//     COALESCE(mobile_type, '') AS mobile_type,
//     COALESCE(personal_smartphone, '') AS personal_smartphone,
//     COALESCE(reason_for_not_having_smartphone, '') AS reason_for_not_having_smartphone,
//     COALESCE(has_bank_account, '') AS has_bank_account,
//     COALESCE(uses_upi, '') AS uses_upi,
//     COALESCE(underwent_skill_development_program, '') AS underwent_skill_development_program,
//     COALESCE(skills_gained_from_program, '') AS skills_gained_from_program,
//     COALESCE(enterprise_status, '') AS enterprise_status,
//     COALESCE(run_enterprise_independently, '') AS run_enterprise_independently,
//     COALESCE(average_monthly_income_enterprise, 0.0) AS average_monthly_income_enterprise,
//     COALESCE(average_monthly_profit_enterprise, 0.0) AS average_monthly_profit_enterprise,
//     COALESCE(desired_monthly_income, 0.0) AS desired_monthly_income,
//     COALESCE(initial_investment_amount, 0.0) AS initial_investment_amount,
//     COALESCE(investment_source, '') AS investment_source,
//     COALESCE(years_in_operation, 0) AS years_in_operation,
//     COALESCE(has_hired_employees, '') AS has_hired_employees,
//     COALESCE(number_of_paid_workers, 0) AS number_of_paid_workers,
//     COALESCE(reason_for_doing_business, '') AS reason_for_doing_business,
//     COALESCE(entrepreneurial_aspirations, '') AS entrepreneurial_aspirations,
//     COALESCE(maintain_daily_financial_books, '') AS maintain_daily_financial_books,
//     COALESCE(frequency_of_recording_financial_books, '') AS frequency_of_recording_financial_books,
//     COALESCE(method_of_keeping_accounts, '') AS method_of_keeping_accounts,
//     COALESCE(reason_for_not_bookkeeping, '') AS reason_for_not_bookkeeping,
//     COALESCE(has_business_goal_or_plan, '') AS has_business_goal_or_plan,
//     COALESCE(maintain_detailed_business_plan, '') AS maintain_detailed_business_plan,
//     COALESCE(short_term_goal, '') AS short_term_goal,
//     COALESCE(loan_taken, '') AS loan_taken,
//     COALESCE(interest_rate, 0.0) AS interest_rate,
//     COALESCE(loan_purpose, '') AS loan_purpose,
//     COALESCE(run_growth_challenges, '') AS run_growth_challenges,
//     COALESCE(core_strength, '') AS core_strength,
//     COALESCE(core_weakness, '') AS core_weakness,
//     COALESCE(core_opportunity, '') AS core_opportunity,
//     COALESCE(core_threat, '') AS core_threat,
//     COALESCE(target_customer, '') AS target_customer,
//     COALESCE(own_account_work, '') AS own_account_work,
//     COALESCE(idea_status, '') AS idea_status,
//     COALESCE(idea_start, '') AS idea_start,
//     COALESCE(idea_category, '') AS idea_category,
//     COALESCE(monthly_income, 0.0) AS monthly_income,
//     COALESCE(money_management, '') AS money_management,
//     COALESCE(do_bookkeeping, '') AS do_bookkeeping,
//     COALESCE(loan_exists, '') AS loan_exists,
//     COALESCE(savings_available, '') AS savings_available,
//     COALESCE(loan_startup, '') AS loan_startup
//     FROM buzzvyaparprogrambaseline
//     WHERE partcipantId = %d
// `, req.ParticipantID)

// 	rows, err := db.Query(query)

// 	if err != nil {
// 		json.NewEncoder(w).Encode(map[string]interface{}{"code": http.StatusInternalServerError, "message": "Database Query Error", "success": false, "error": err.Error()})
// 		return
// 	}
// 	defer rows.Close()

// 	var response []BuzzVyaparProgramBaseline

// 	for rows.Next() {
// 		var b BuzzVyaparProgramBaseline
// 		var entrepreneurialAspirations string
// 		var methodOfKeepingAccounts string

// 		err := rows.Scan(
// 			&b.ID,
// 			&b.ParticipantID,
// 			&b.GfID,
// 			&b.EntryDate,
// 			&b.WhenWasSurveyDone,
// 			&b.NameOfTheVyapari,
// 			&b.Age,
// 			&b.ContactNumber,
// 			&b.VillageID,
// 			&b.LocationCircle,
// 			&b.HigherEducation,
// 			&b.MaritalStatus,
// 			&b.NumberOfPeopleInTheHousehold,
// 			&b.DoYouOwnASmartPhone,
// 			&b.DoYouHaveInternetConnectionOnPhone,
// 			&b.SectorTypeOfBusiness,
// 			&b.AreYouProficientWithNumbers,
// 			&b.AreYouProficientWithWrittenLanguage,
// 			&b.HouseholdIncomeMonthly,
// 			&b.LastMonthAverageIncome,
// 			&b.BusinessProfitLastMonth,
// 			&b.DesiredMonthlyIncome,
// 			&b.InitialBusinessInvestment,
// 			&b.YearsInBusiness,
// 			&b.WhyDoYouDoBusiness,
// 			&b.EntrepreneurQualities,
// 			&b.WomanRoleAtHome,
// 			&b.BusinessChallenges,
// 			&b.PlanToOvercomeChallenges,
// 			&b.Skills,
// 			&b.AvailableBusinessResources,
// 			&b.CustomerDescription,
// 			&b.BusinessComponents,
// 			&b.BusinessState,
// 			&b.AccountBooks,
// 			&b.BusinessProblemSolving,
// 			&b.ExampleOfBusinessProblem,
// 			&b.BusinessGoal,
// 			&b.HasBusinessPlan,
// 			&b.CanSubmitBusinessPlan,
// 			&b.BusinessStrengths,
// 			&b.BusinessWeaknesses,
// 			&b.BusinessOpportunities,
// 			&b.CanRaiseFinance,
// 			&b.LoanFrom,
// 			&b.LoanAccessIssues,
// 			&b.LoanAccessPrerequisites,
// 			&b.TalukDistrict,
// 			&b.CohortName,
// 			&b.StoppedBusiness,
// 			&b.HoursEngagedInBusiness,
// 			&b.BusinessLicense,
// 			&b.HomeBasedShopWork,
// 			&b.LoanCurrentlyAvailed,
// 			&b.LoanRelation,
// 			&b.LoanTotalAmount,
// 			&b.LoanSource,
// 			&b.LoanRepaymentTillDate,
// 			&b.AdditionalSkillsNeeded,
// 			&b.AdditionalSkillsDetails,
// 			&b.District,
// 			&b.Taluk,
// 			&b.GramPanchayat,
// 			&b.NumberOfBeehivesParticipated,
// 			&b.TotalHouseholdMembers,
// 			&b.House,
// 			&b.RationCard,
// 			&b.Cast,
// 			&b.DOB,
// 			&b.Education,
// 			&b.PrimaryOccupationHousehold,
// 			&b.SecondaryOccupationHousehold,
// 			&b.WomensOccupation,
// 			&b.MonthlyExpenditure,
// 			&b.MobileType,
// 			&b.PersonalSmartphone,
// 			&b.ReasonForNotHavingSmartphone,
// 			&b.HasBankAccount,
// 			&b.UsesUPI,
// 			&b.UndergoneSkillDevelopmentProgram,
// 			&b.SkillsGainedFromProgram,
// 			&b.EnterpriseStatus,
// 			&b.RunEnterpriseIndependently,
// 			&b.AverageMonthlyIncomeEnterprise,
// 			&b.AverageMonthlyProfitEnterprise,
// 			&b.DesiredMonthlyIncomeEnterprise,
// 			&b.InitialInvestmentAmount,
// 			&b.InvestmentSource,
// 			&b.YearsInOperation,
// 			&b.HasHiredEmployees,
// 			&b.NumberOfPaidWorkers,
// 			&b.ReasonForDoingBusiness,
// 			&entrepreneurialAspirations,
// 			&b.MaintainDailyFinancialBooks,
// 			&b.FrequencyOfRecordingFinancialBooks,
// 			&methodOfKeepingAccounts,
// 			&b.ReasonForNotBookkeeping,
// 			&b.HasBusinessGoalOrPlan,
// 			&b.MaintainDetailedBusinessPlan,
// 			&b.ShortTermGoal,
// 			&b.LoanTaken,
// 			&b.InterestRate,
// 			&b.LoanPurpose,
// 			&b.RunGrowthChallenges,
// 			&b.CoreStrength,
// 			&b.CoreWeakness,
// 			&b.CoreOpportunity,
// 			&b.CoreThreat,
// 			&b.TargetCustomer,
// 			&b.OwnAccountWork,
// 			&b.IdeaStatus,
// 			&b.IdeaStart,
// 			&b.IdeaCategory,
// 			&b.MonthlyIncome,
// 			&b.MoneyManagement,
// 			&b.DoBookkeeping,
// 			&b.LoanExists,
// 			&b.SavingsAvailable,
// 			&b.LoanStartup,
// 		)
// 		b.EntrepreneurialAspirations = strings.Split(entrepreneurialAspirations, ",")
// 		b.MethodOfKeepingAccounts = strings.Split(methodOfKeepingAccounts, ",")

// 		if err != nil {
// 			fmt.Println("err", err)
// 			json.NewEncoder(w).Encode(map[string]interface{}{"code": http.StatusInternalServerError, "message": "Database Scan Error", "success": false, "error": err.Error()})
// 			return
// 		}

// 		response = append(response, b)
// 	}

// 	w.Header().Set("Content-Type", "application/json")
// 	json.NewEncoder(w).Encode(map[string]interface{}{"data": response, "success": true, "message": "VyaparBaselineSurvey"})
// }

package Getviewform

import (
	"database/sql"
	"encoding/json"
	"fmt"
	"io/ioutil"
	"net/http"
	"strings"
)

func GetVyaparBaselineSurvey(w http.ResponseWriter, r *http.Request, db *sql.DB) {
	type BuzzVyaparProgramBaseline struct {
		ID                                  int64    `json:"id"`
		ParticipantID                       int64    `json:"participant_id"`
		GfID                                int64    `json:"gf_id"`
		GelathiName                         string   `json:"gelathi_name"`
		ParticipantName                     string   `json:"participant_name"`
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
		//  MaintainDetailedBusinessPlan        string   `json:"maintain_detailed_business_plan"`
		ShortTermGoal           string  `json:"short_term_goal"`
		LoanTaken               string  `json:"loan_taken"`
		InterestRate            float64 `json:"interest_rate"`
		LoanPurpose             string  `json:"loan_purpose"`
		RunGrowthChallenges     string  `json:"run_growth_challenges"`
		CoreStrength            string  `json:"core_strength"`
		CoreWeakness            string  `json:"core_weakness"`
		CoreOpportunity         string  `json:"core_opportunity"`
		CoreThreat              string  `json:"core_threat"`
		TargetCustomer          string  `json:"target_customer"`
		OwnAccountWork          string  `json:"own_account_work"`
		IdeaStatus              string  `json:"idea_status"`
		IdeaStart               string  `json:"idea_start"`
		IdeaCategory            string  `json:"idea_category"`
		MonthlyIncome           float64 `json:"monthly_income"`
		MoneyManagement         string  `json:"money_management"`
		DoBookkeeping           string  `json:"do_bookkeeping"`
		LoanExists              string  `json:"loan_exists"`
		SavingsAvailable        string  `json:"savings_available"`
		LoanStartup             string  `json:"loan_startup"`
		TypeOfEnterpriseRunning string  `json:"type_of_enterprise_running"`
		MonthlyHouseholdIncome  string  `json:"monthly_household_income"`
	}

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
    id,
        COALESCE(partcipantId, 0) AS participant_id,
    COALESCE(gfId, 0) AS gf_id,
    COALESCE(entry_date, '') AS entry_date,
    COALESCE(when_was_survey_done, '') AS when_was_survey_done,
    COALESCE(name_of_the_vyapari, '') AS name_of_the_vyapari,
    COALESCE(age, 0) AS age,
    COALESCE(contact_number, '') AS contact_number,
    COALESCE(village_id, 0) AS village_id,
    COALESCE(location_circle, '') AS location_circle,
    COALESCE(highter_education, '') AS highter_education,
    COALESCE(marital_status, '') AS marital_status,
    COALESCE(number_of_people_in_the_household, 0) AS number_of_people_in_the_household,
    COALESCE(do_you_own_a_smart_phone, '') AS do_you_own_a_smart_phone,
    COALESCE(do_you_have_internet_connection_on_your_smart_phone, '') AS do_you_have_internet_connection_on_your_smart_phone,
    COALESCE(sector_type_of_business, '') AS sector_type_of_business,
    COALESCE(are_you_proficient_with_numbers, '') AS are_you_proficient_with_numbers,
    COALESCE(are_you_proficient_with_written_language, '') AS are_you_proficient_with_written_language,
    COALESCE(household_income_monthly, 0.0) AS household_income_monthly,
    COALESCE(over_the_last_month_your_average_income, 0.0) AS over_the_last_month_your_average_income,
    COALESCE(your_business_profit_last_month, 0.0) AS your_business_profit_last_month,
    COALESCE(how_much_monthly_income_would_you_like_to_ideally_earn, 0.0) AS how_much_monthly_income_would_you_like_to_ideally_earn,
    COALESCE(amount_invested_when_the_business_started, 0.0) AS amount_invested_when_the_business_started,
    COALESCE(number_of_years_the_business_has_been_operating, 0) AS number_of_years_the_business_has_been_operating,
    COALESCE(why_do_you_do_business, '') AS why_do_you_do_business,
    COALESCE(tell_us_three_things_about_you_as_an_entrepreneur, '') AS tell_us_three_things_about_you_as_an_entrepreneur,
    COALESCE(tell_us_three_things_about_your_role_as_a_woman_at_home, '') AS tell_us_three_things_about_your_role_as_a_woman_at_home,
    COALESCE(what_are_your_challenges_in_running_and_growing_your_business, '') AS what_are_your_challenges_in_running_and_growing_your_business,
    COALESCE(what_is_your_plan_to_overcome_these_challenges, '') AS what_is_your_plan_to_overcome_these_challenges,
    COALESCE(what_are_your_skills, '') AS what_are_your_skills,
    COALESCE(what_are_the_resources_available_with_you_for_your_business, '') AS what_are_the_resources_available_with_you_for_your_business,
    COALESCE(who_is_your_customer_describe_them_to_us, '') AS who_is_your_customer_describe_them_to_us,
    COALESCE(please_list_down_the_various_components_of_business, '') AS please_list_down_the_various_components_of_business,
    COALESCE(i_know_the_current_state_of_my_business_in_profit_loss_revenue, '') AS i_know_the_current_state_of_my_business_in_profit_loss_revenue,
    COALESCE(what_kind_of_books_of_accounts_do_you_maintain, '') AS what_kind_of_books_of_accounts_do_you_maintain,
    COALESCE(i_can_generate_ideas_to_solve_my_business_problems, '') AS i_can_generate_ideas_to_solve_my_business_problems,
    COALESCE(tell_us_about_one_business_problem, '') AS tell_us_about_one_business_problem,
    COALESCE(what_is_your_business_goal_business_impurumenet_madodu, '') AS what_is_your_business_goal_business_impurumenet_madodu,
    COALESCE(do_you_have_a_business_plan_to_reach_that_goal, '') AS do_you_have_a_business_plan_to_reach_that_goal,
    COALESCE(can_you_submit_a_business_plan_for_your_goal_to_us_right_now, '') AS can_you_submit_a_business_plan_for_your_goal_to_us_right_now,
    COALESCE(what_are_the_strenghts_of_your_business, '') AS what_are_the_strenghts_of_your_business,
    COALESCE(what_are_the_weaknesses_of_your_business, '') AS what_are_the_weaknesses_of_your_business,
    COALESCE(what_are_the_oppourtunities_for_your_business, '') AS what_are_the_oppourtunities_for_your_business,
    COALESCE(are_you_able_to_raise_the_required_finance, '') AS are_you_able_to_raise_the_required_finance,
    COALESCE(i_have_taken_a_loan_from, '') AS i_have_taken_a_loan_from,
    COALESCE(i_have_trouble_accessing_loan_for_my_business, '') AS i_have_trouble_accessing_loan_for_my_business,
    COALESCE(what_are_the_prerequisites_to_access_a_loan, '') AS what_are_the_prerequisites_to_access_a_loan,
    COALESCE(taluk_district, '') AS taluk_district,
    COALESCE(name_of_the_cohort, '') AS name_of_the_cohort,
    COALESCE(you_stopped_hold_your_business, '') AS you_stopped_hold_your_business,
    COALESCE(no_hours_engaged_business, 0) AS no_hours_engaged_business,
    COALESCE(license_for_existing_business, '') AS license_for_existing_business,
    COALESCE(home_based_work_from_shop, '') AS home_based_work_from_shop,
    COALESCE(loan_currently_availed, '') AS loan_currently_availed,
    COALESCE(relation_who_borrowed, '') AS relation_who_borrowed,
    COALESCE(loan_total_amount, 0.0) AS loan_total_amount,
    COALESCE(loan_source, '') AS loan_source,
    COALESCE(loan_repayment_till_date, 0.0) AS loan_repayment_till_date,
    COALESCE(need_additional_skills_business, '') AS need_additional_skills_business,
    COALESCE(skils_what_are_those, '') AS skils_what_are_those,
    COALESCE(district, '') AS district,
    COALESCE(taluk, '') AS taluk,
    COALESCE(gram_panchayat, '') AS gram_panchayat,
    COALESCE(number_of_beehives_participated, 0) AS number_of_beehives_participated,
    COALESCE(total_household_members, 0) AS total_household_members,
    COALESCE(house, '') AS house,
    COALESCE(ration_card, '') AS ration_card,
    COALESCE(cast, '') AS cast,
    COALESCE(dob, '') AS dob,
    COALESCE(education, '') AS education,
    COALESCE(primary_occupation_household, '') AS primary_occupation_household,
    COALESCE(secondary_occupation_household, '') AS secondary_occupation_household,
    COALESCE(womens_occupation, '') AS womens_occupation,
    COALESCE(monthly_expenditure, 0.0) AS monthly_expenditure,
    COALESCE(mobile_type, '') AS mobile_type,
    COALESCE(personal_smartphone, '') AS personal_smartphone,
    COALESCE(reason_for_not_having_smartphone, '') AS reason_for_not_having_smartphone,
    COALESCE(has_bank_account, '') AS has_bank_account,
    COALESCE(uses_upi, '') AS uses_upi,
    COALESCE(underwent_skill_development_program, '') AS underwent_skill_development_program,
    COALESCE(skills_gained_from_program, '') AS skills_gained_from_program,
    COALESCE(enterprise_status, '') AS enterprise_status,
    COALESCE(run_enterprise_independently, '') AS run_enterprise_independently,
    COALESCE(average_monthly_income_enterprise, 0.0) AS average_monthly_income_enterprise,
    COALESCE(average_monthly_profit_enterprise, 0.0) AS average_monthly_profit_enterprise,
    COALESCE(desired_monthly_income, 0.0) AS desired_monthly_income,
    COALESCE(initial_investment_amount, 0.0) AS initial_investment_amount,
    COALESCE(investment_source, '') AS investment_source,
    COALESCE(years_in_operation, 0) AS years_in_operation,
    COALESCE(has_hired_employees, '') AS has_hired_employees,
    COALESCE(number_of_paid_workers, '') AS number_of_paid_workers,
    COALESCE(reason_for_doing_business, '') AS reason_for_doing_business,
    COALESCE(entrepreneurial_aspirations, '') AS entrepreneurial_aspirations,
    COALESCE(maintain_daily_financial_books, '') AS maintain_daily_financial_books,
    COALESCE(frequency_of_recording_financial_books, '') AS frequency_of_recording_financial_books,
    COALESCE(method_of_keeping_accounts, '') AS method_of_keeping_accounts,
    COALESCE(reason_for_not_bookkeeping, '') AS reason_for_not_bookkeeping,
    COALESCE(has_business_goal_or_plan, '') AS has_business_goal_or_plan,
    COALESCE(short_term_goal, '') AS short_term_goal,
    COALESCE(loan_taken, '') AS loan_taken,
    COALESCE(interest_rate, 0.0) AS interest_rate,
    COALESCE(loan_purpose, '') AS loan_purpose,
    COALESCE(run_growth_challenges, '') AS run_growth_challenges,
    COALESCE(core_strength, '') AS core_strength,
    COALESCE(core_weakness, '') AS core_weakness,
    COALESCE(core_opportunity, '') AS core_opportunity,
    COALESCE(core_threat, '') AS core_threat,
    COALESCE(target_customer, '') AS target_customer,
    COALESCE(own_account_work, '') AS own_account_work,
    COALESCE(idea_status, '') AS idea_status,
    COALESCE(idea_start, '') AS idea_start,
    COALESCE(idea_category, '') AS idea_category,
    COALESCE(monthly_income, 0.0) AS monthly_income,
    COALESCE(money_management, '') AS money_management,
    COALESCE(do_bookkeeping, '') AS do_bookkeeping,
    COALESCE(loan_exists, '') AS loan_exists,
    COALESCE(savings_available, '') AS savings_available,
    COALESCE(loan_startup, '') AS loan_startup,
	COALESCE(type_of_enterprise_running,  '') AS type_of_enterprise_running,
	COALESCE(monthly_household_income, '') AS monthly_household_income
    FROM  BuzzVyaparProgramBaseline
    WHERE partcipantId = %d
`, req.ParticipantID)

	rows, err := db.Query(query)
	fmt.Println("ggg", query)

	if err != nil {
		json.NewEncoder(w).Encode(map[string]interface{}{"code": http.StatusInternalServerError, "message": "Database Query Error", "success": false, "error": err.Error()})
		return
	}
	defer rows.Close()

	var response []BuzzVyaparProgramBaseline

	for rows.Next() {
		var b BuzzVyaparProgramBaseline
		var entrepreneurialAspirations string
		var methodOfKeepingAccounts string

		err := rows.Scan(
			&b.ID,
			&b.ParticipantID,
			&b.GfID,
			&b.EntryDate,
			&b.WhenWasSurveyDone,
			&b.NameOfTheVyapari,
			&b.Age,
			&b.ContactNumber,
			&b.VillageID,
			&b.LocationCircle,
			&b.HigherEducation,
			&b.MaritalStatus,
			&b.NumberOfPeopleInTheHousehold,
			&b.DoYouOwnASmartPhone,
			&b.DoYouHaveInternetConnectionOnPhone,
			&b.SectorTypeOfBusiness,
			&b.AreYouProficientWithNumbers,
			&b.AreYouProficientWithWrittenLanguage,
			&b.HouseholdIncomeMonthly,
			&b.LastMonthAverageIncome,
			&b.BusinessProfitLastMonth,
			&b.DesiredMonthlyIncome,
			&b.InitialBusinessInvestment,
			&b.YearsInBusiness,
			&b.WhyDoYouDoBusiness,
			&b.EntrepreneurQualities,
			&b.WomanRoleAtHome,
			&b.BusinessChallenges,
			&b.PlanToOvercomeChallenges,
			&b.Skills,
			&b.AvailableBusinessResources,
			&b.CustomerDescription,
			&b.BusinessComponents,
			&b.BusinessState,
			&b.AccountBooks,
			&b.BusinessProblemSolving,
			&b.ExampleOfBusinessProblem,
			&b.BusinessGoal,
			&b.HasBusinessPlan,
			&b.CanSubmitBusinessPlan,
			&b.BusinessStrengths,
			&b.BusinessWeaknesses,
			&b.BusinessOpportunities,
			&b.CanRaiseFinance,
			&b.LoanFrom,
			&b.LoanAccessIssues,
			&b.LoanAccessPrerequisites,
			&b.TalukDistrict,
			&b.CohortName,
			&b.StoppedBusiness,
			&b.HoursEngagedInBusiness,
			&b.BusinessLicense,
			&b.HomeBasedShopWork,
			&b.LoanCurrentlyAvailed,
			&b.LoanRelation,
			&b.LoanTotalAmount,
			&b.LoanSource,
			&b.LoanRepaymentTillDate,
			&b.AdditionalSkillsNeeded,
			&b.AdditionalSkillsDetails,
			&b.District,
			&b.Taluk,
			&b.GramPanchayat,
			&b.NumberOfBeehivesParticipated,
			&b.TotalHouseholdMembers,
			&b.House,
			&b.RationCard,
			&b.Cast,
			&b.DOB,
			&b.Education,
			&b.PrimaryOccupationHousehold,
			&b.SecondaryOccupationHousehold,
			&b.WomensOccupation,
			&b.MonthlyExpenditure,
			&b.MobileType,
			&b.PersonalSmartphone,
			&b.ReasonForNotHavingSmartphone,
			&b.HasBankAccount,
			&b.UsesUPI,
			&b.UndergoneSkillDevelopmentProgram,
			&b.SkillsGainedFromProgram,
			&b.EnterpriseStatus,
			&b.RunEnterpriseIndependently,
			&b.AverageMonthlyIncomeEnterprise,
			&b.AverageMonthlyProfitEnterprise,
			&b.DesiredMonthlyIncomeEnterprise,
			&b.InitialInvestmentAmount,
			&b.InvestmentSource,
			&b.YearsInOperation,
			&b.HasHiredEmployees,
			&b.NumberOfPaidWorkers,
			&b.ReasonForDoingBusiness,
			&entrepreneurialAspirations,
			&b.MaintainDailyFinancialBooks,
			&b.FrequencyOfRecordingFinancialBooks,
			&methodOfKeepingAccounts,
			&b.ReasonForNotBookkeeping,
			&b.HasBusinessGoalOrPlan,
			//&b.MaintainDetailedBusinessPlan,
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

		b.EntrepreneurialAspirations = strings.Split(entrepreneurialAspirations, ",")
		b.MethodOfKeepingAccounts = strings.Split(methodOfKeepingAccounts, ",")

		if err != nil {
			fmt.Println("err", err)
			json.NewEncoder(w).Encode(map[string]interface{}{"code": http.StatusInternalServerError, "message": "Database Scan Error", "success": false, "error": err.Error()})
			return
		}
		var firstName, lastName string
		query := fmt.Sprintf("SELECT first_name,last_name  FROM employee WHERE id  = %d", b.GfID)
		rows, err := db.Query(query)

		if rows.Next() {
			err := rows.Scan(&firstName, &lastName)
			if err != nil {
				json.NewEncoder(w).Encode(map[string]interface{}{
					"code":    http.StatusInternalServerError,
					"message": "Error scanning row",
					"success": false,
					"error":   err.Error(),
				})
				return
			}
		}

		fullName := firstName + " " + lastName

		// Append the result to the response slice
		b.GelathiName = fullName

		var firstName1 string
		query = fmt.Sprintf("SELECT firstName FROM training_participants WHERE id  = %d", b.ParticipantID)
		rows, err = db.Query(query)

		if rows.Next() {
			err = rows.Scan(&firstName1)
			if err != nil {
				json.NewEncoder(w).Encode(map[string]interface{}{
					"code":    http.StatusInternalServerError,
					"message": "Error scanning row",
					"success": false,
					"error":   err.Error(),
				})
				return
			}
		}
		b.ParticipantName = firstName1

		response = append(response, b)
	}

	w.Header().Set("Content-Type", "application/json")
	json.NewEncoder(w).Encode(map[string]interface{}{"data": response, "success": true, "message": "VyaparBaselineSurvey"})
}
