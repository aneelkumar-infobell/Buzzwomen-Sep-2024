package Getviewform

import (
	"database/sql"
	"encoding/json"
	"fmt"
	"net/http"
	"strings"
)

type Response struct {
	Code    int    `json:"code"`
	Message string `json:"message"`
	Success bool   `json:"success"`
}

// Participant struct represents the participant data
type Selfshekthi struct {
	ID                           int      `json:"id"`
	District                     string   `json:"district"`
	Taluk                        string   `json:"taluk"`
	GramPanchayat                string   `json:"gram_panchayat"`
	VillageName                  string   `json:"village_name"`
	House                        string   `json:"house"`
	Roof                         string   `json:"roof"`
	RationCard                   string   `json:"ration_card"`
	Caste                        int      `json:"caste"`
	SubCastName                  string   `json:"sub_cast_name"`
	Religion                     string   `json:"religion"`
	MaritalStatus                string   `json:"marital_status"`
	EducationLevel               string   `json:"education_level"` // Added field for education level
	PrimaryOccupation            string   `json:"primary_occupation"`
	SecondaryOccupation          string   `json:"secondary_occupation"`
	MonthlyHouseholdExpenditure  float64  `json:"monthly_household_expenditure"` // Added field for monthly expenditure
	MonthlyHouseholdIncome       float64  `json:"monthly_household_income"`      // Added field for monthly income
	SoleEarnerFamily             string   `json:"sole_earner_family"`
	MigrationProfile             string   `json:"migration_profile"`
	HouseholdMigrationLastYear   string   `json:"household_migration_last_year"`
	MigrantSendsRemittance       string   `json:"migrant_sends_remittance"`
	FinancialLiteracy            string   `json:"financial_literacy"`
	LiabilitiesOrAssets          []string `json:"liabilities_or_assets"`
	BookkeepingEntry             []string `json:"bookkeeping_entry"`
	LoanType                     []string `json:"loan_type"`
	AnnualInterestRate           float64  `json:"annual_interest_rate"`
	InterestPaymentDue           float64  `json:"interest_payment_due"`
	ProfitMade                   float64  `json:"profit_made"`
	PersonalAccount              string   `json:"personal_account"`
	HasPersonalAccount           string   `json:"has_personal_account"` // Changed to bool for better representation
	BankAccountUsageFrequency    []string `json:"bank_account_usage_frequency"`
	MoneyDecisionMaker           []string `json:"money_decision_maker"`
	MonthlyExpensePlan           string   `json:"monthly_expense_plan"`
	MonthlyExpenseAmount         float64  `json:"monthly_expense_amount"`
	MaintainExpenseRecord        string   `json:"maintain_expense_record"` // Changed to bool for better representation
	IndividualSavings            float64  `json:"individual_savings"`
	MonthlySavingsIndividual     float64  `json:"monthly_savings_individual"`
	AnnualSavingsHousehold       float64  `json:"annual_savings_household"`
	ConfidentSpendSavings        string   `json:"confident_spend_savings"`
	Loans                        string   `json:"loans"`
	LoanTakenBy                  []string `json:"loan_taken_by"`
	AmountBorrowed               float64  `json:"amount_borrowed"`
	PurposeOfLoan                []string `json:"purpose_of_loan"`
	Source                       []string `json:"source"`
	RateOfInterest               float64  `json:"rate_of_interest"`
	ExpensesExceedIncomeLastYear string   `json:"expenses_exceed_income_last_year"` // Changed to bool
	IncomeLossDuration           []string `json:"income_loss_duration"`
	Goals                        string   `json:"goals"`
	FinancialGoalsSet            string   `json:"financial_goals_set"` // Changed to bool
	ShortTermGoal                string   `json:"short_term_goal"`
	LongTermGoal                 string   `json:"long_term_goal"`
	Enterprise                   string   `json:"enterprise"`
	FamilyBusiness               string   `json:"family_business"`
	WantToStartEnterprise        string   `json:"want_to_start_enterprise"` // Changed to bool
	EnterpriseType               []string `json:"enterprise_type"`
	NumEmployeesPaid             int      `json:"num_employees_paid"`
	//IndividualInvolvementNature  []string `json:"individual_involvement_nature"`
	EnterpriseMonthlyIncome float64 `json:"enterprise_monthly_income"`
	EnterpriseIsProfitable  string  `json:"enterprise_is_profitable"` // Changed to bool
	MonthlyProfit           float64 `json:"monthly_profit"`
	DecisionMaking          string  `json:"decision_making"`
	//DecisionSay                       []string `json:"decision_say"`
	MenstrualHygieneEnv               string   `json:"menstrual_hygiene_env"`
	EnvFriendlyPractices              []string `json:"env_friendly_practices"`
	MenstrualProductUsed              []string `json:"menstrual_product_used"`
	MenstrualDisposalMethod           []string `json:"menstrual_disposal_method"`
	CookingFuelType                   []string `json:"cooking_fuel_type"`
	WomensOccupation                  string   `json:"womens_occupation"`
	MonthlyWomenIncome                float64  `json:"monthly_women_income"`
	SourceOfThisIncome                string   `json:"source_of_this_income"`
	SecondaryOccupationOfTheHousehold string   `json:"secondary_occupation_of_the_household"`
	PrimaryOccupationOfHousehold      string   `json:"primary_occupation_of_the_household"`
	WithdrawSavingsA                  string   `json:"withdraw_savings_a"`
	ReduceExpensesA                   string   `json:"reduce_expenses_a"`
	AssetSaleA                        string   `json:"asset_sale_a"`
	OvertimeHoursA                    string   `json:"overtime_hours_a"`
	MissedPaymentsA                   string   `json:"missed_payments_a"`
	BorrowedFromOthersA               string   `json:"borrowed_from_others_a"`
	BorrowedFromLenderA               string   `json:"borrowed_from_lender_a"`
	BorrowedFromShgA                  string   `json:"borrowed_from_shg_a"`
	PawnedItemA                       string   `json:"pawned_item_a"`
	BankLoanA                         string   `json:"bank_loan_a"`
	ChildrenEducationB                string   `json:"children_education_b"`
	HealthServicesAccessB             string   `json:"health_services_access_b"`
	TakingCreditB                     string   `json:"taking_credit_b"`
	SavingMoneyB                      string   `json:"saving_money_b"`
	AssetPurchaseB                    string   `json:"asset_purchase_b"`
	DailyExpenditureB                 string   `json:"daily_expenditure_b"`
	OperationalManagementB            string   `json:"operational_management_b"`
	InputProcuringB                   string   `json:"input_procuring_b"`
	SellingProduceB                   string   `json:"selling_produce_b"`
	GovSchemeBenefitB                 string   `json:"gov_scheme_benefit_b"`
	FinancialGoalsSetC                string   `json:"financial_goals_set_c"`
	CollaborateWithWorkersC           string   `json:"collaborate_with_workers_c"`
	DailyAffairsManagementC           string   `json:"daily_affairs_management_c"`
	FinancialDecisionMakerC           string   `json:"financial_decision_maker_c"`
	DailyAccountsBookC                string   `json:"daily_accounts_book_c"`
}

func AddSelfshaktiday1day2data(w http.ResponseWriter, r *http.Request, DB *sql.DB) {
	w.Header().Set("Access-Control-Allow-Headers", "Accept, Content-Type, Content-Length, Accept-Encoding, X-CSRF-Token, Authorization,application/json,Token")
	w.Header().Set("Access-Control-Allow-Origin", "*")
	w.Header().Set("Access-Control-Allow-Methods", "POST, GET, OPTIONS, PUT, DELETE")
	w.Header().Set("Access-Control-Allow-Credentials", "true")

	if r.Method != http.MethodPost {
		w.WriteHeader(405) // Return 405 Method Not Allowed.
		json.NewEncoder(w).Encode(map[string]interface{}{"code": http.StatusNotFound, "message": "Method Not found", "success": false})
		return
	}

	var p Selfshekthi
	err := json.NewDecoder(r.Body).Decode(&p)
	if err != nil {
		fmt.Println("errrr", err)
		w.WriteHeader(http.StatusBadRequest)
		json.NewEncoder(w).Encode(map[string]interface{}{"code": http.StatusBadRequest, "message": "Failed to decode the request body", "success": false})
		return
	}

	updateQuery := `
		UPDATE training_participants SET
			district = ?,
			taluk = ?,
			gram_panchayat = ?,
			village_name = ?,
			house = ?,
			roof = ?,
			ration_card = ?,
			caste = ?,
			sub_cast_name = ?,
			religion = ?,
			marital_status = ?,
			education = ?,
			primary_occupation=?,
			secondary_occupation=?,
			monthly_household_expenditure = ?,
			monthly_household_income = ?,
			sole_earner_family = ?,
			migration_profile = ?,
			household_migration_last_yea = ?, 
			migrant_sends_remittance = ?,
			financial_literacy = ?,
			liabilities_or_assets = ?,
			bookkeeping_entry = ?,
			loan_type = ?,
			annual_interest_rate = ?,
			interest_payment_due = ?,
			profit_made = ?,
			has_personal_account = ?,
			bank_account_usage_frequency = ?,
			money_decision_maker = ?,
			monthly_expense_plan = ?,
			monthly_expense_amount = ?,
			maintain_expense_record = ?,
			individual_savings = ?,
			monthly_savings_individual = ?,
			annual_savings_household = ?,
			confident_spend_savings = ?,
			loans = ?,
			loan_taken_by = ?,
			amount_borrowed = ?,
			purpose_of_loan = ?,
			source = ?,
			rate_of_interest = ?,
			expenses_exceed_income_last_year = ?,
			income_loss_duration = ?,
			goals = ?,
			financial_goals_set = ?,
			short_term_goal = ?,
			long_term_goal = ?,
			enterprise = ?,
			family_business = ?,
			want_to_start_enterprise = ?,
			enterprise_type = ?,
			num_employees_paid = ?,
			enterprise_monthly_income = ?,
			enterprise_is_profitable = ?,
			monthly_profit = ?,
			decision_making = ?,
			menstrual_hygiene_env = ?,
			env_friendly_practices = ?,
			menstrual_product_used = ?,
			menstrual_disposal_method = ?,
			cooking_fuel_type = ?,
			womens_occupation=?,
			monthly_women_income=?,
			source_of_this_income=?,
			Secondary_Occupation_of_the_Household=?,
			Primary_occupation_of_household=?,
			withdraw_savings_a=?,
            reduce_expenses_a=?,
            asset_sale_a=?,
            overtime_hours_a=?,
            missed_payments_a=?,
			borrowed_from_others_a=?,
            borrowed_from_lender_a=?,
            borrowed_from_shg_a=?,
            pawned_item_a=?,
            bank_loan_a=?,
			children_education_b=?,
            health_services_access_b=?,
            taking_credit_b=?,
            saving_money_b=?,
            asset_purchase_b=?,
			daily_expenditure_b=?,
            operational_management_b=?,
            input_procuring_b=?,
            selling_produce_b=?,
            gov_scheme_benefit_b=?,
			financial_goals_set_c=?,
            collaborate_with_workers_c=?,
            daily_affairs_management_c=?,
            financial_decision_maker_c=?,
            daily_accounts_book_c=?

		WHERE id = ?
	`

	stmt, err := DB.Prepare(updateQuery)
	if err != nil {
		fmt.Println("err", err)
		res := Response{
			Code:    http.StatusInternalServerError,
			Message: "Failed to prepare update query",
			Success: false,
		}
		json.NewEncoder(w).Encode(res)
		return
	}
	defer stmt.Close()

	result, err := stmt.Exec(
		p.District,
		p.Taluk,
		p.GramPanchayat,
		p.VillageName,
		p.House,
		p.Roof,
		p.RationCard,
		p.Caste,
		p.SubCastName,
		p.Religion,
		p.MaritalStatus,
		p.EducationLevel,
		p.PrimaryOccupation,
		p.SecondaryOccupation,
		p.MonthlyHouseholdExpenditure,
		p.MonthlyHouseholdIncome,
		p.SoleEarnerFamily,
		p.MigrationProfile,
		p.HouseholdMigrationLastYear,
		p.MigrantSendsRemittance,
		p.FinancialLiteracy,
		strings.Join(p.LiabilitiesOrAssets, ", "),
		strings.Join(p.BookkeepingEntry, ", "),
		strings.Join(p.LoanType, ", "),
		p.AnnualInterestRate,
		p.InterestPaymentDue,
		p.ProfitMade,
		p.HasPersonalAccount,
		strings.Join(p.BankAccountUsageFrequency, ", "),
		strings.Join(p.MoneyDecisionMaker, ", "),
		p.MonthlyExpensePlan,
		p.MonthlyExpenseAmount,
		p.MaintainExpenseRecord,
		p.IndividualSavings,
		p.MonthlySavingsIndividual,
		p.AnnualSavingsHousehold,
		p.ConfidentSpendSavings,
		p.Loans,
		strings.Join(p.LoanTakenBy, ", "),
		p.AmountBorrowed,
		strings.Join(p.PurposeOfLoan, ", "),
		strings.Join(p.Source, ", "),
		p.RateOfInterest,
		p.ExpensesExceedIncomeLastYear,
		strings.Join(p.IncomeLossDuration, ", "),
		p.Goals,
		p.FinancialGoalsSet,
		p.ShortTermGoal,
		p.LongTermGoal,
		p.Enterprise,
		p.FamilyBusiness,
		p.WantToStartEnterprise,
		strings.Join(p.EnterpriseType, ", "),
		p.NumEmployeesPaid,
		//strings.Join(p.IndividualInvolvementNature, ", "),
		p.EnterpriseMonthlyIncome,
		p.EnterpriseIsProfitable,
		p.MonthlyProfit,
		p.DecisionMaking,
		//strings.Join(p.DecisionSay, ", "),
		p.MenstrualHygieneEnv,
		strings.Join(p.EnvFriendlyPractices, ", "),
		strings.Join(p.MenstrualProductUsed, ", "),
		strings.Join(p.MenstrualDisposalMethod, ", "),
		strings.Join(p.CookingFuelType, ", "),
		p.WomensOccupation,
		p.MonthlyWomenIncome,
		p.SourceOfThisIncome,
		p.SecondaryOccupationOfTheHousehold,
		p.PrimaryOccupationOfHousehold,
		p.WithdrawSavingsA,
		p.ReduceExpensesA,
		p.AssetSaleA,
		p.OvertimeHoursA,
		p.MissedPaymentsA,
		p.BorrowedFromOthersA,
		p.BorrowedFromLenderA,
		p.BorrowedFromShgA,
		p.PawnedItemA,
		p.BankLoanA,
		p.ChildrenEducationB,
		p.HealthServicesAccessB,
		p.TakingCreditB,
		p.SavingMoneyB,
		p.AssetPurchaseB,
		p.DailyExpenditureB,
		p.OperationalManagementB,
		p.InputProcuringB,
		p.SellingProduceB,
		p.GovSchemeBenefitB,
		p.FinancialGoalsSetC,
		p.CollaborateWithWorkersC,
		p.DailyAffairsManagementC,
		p.FinancialDecisionMakerC,
		p.DailyAccountsBookC,
		p.ID,
	)
	fmt.Println("District:", p.District)
	fmt.Println("LiabilitiesOrAssets:", strings.Join(p.LiabilitiesOrAssets, ", "))
	fmt.Println("LoanType:", strings.Join(p.LoanType, ", "))
	fmt.Println("MoneyDecisionMaker:", strings.Join(p.MoneyDecisionMaker, ", "))
	// (Log other relevant fields, especially those with []string)
	if err != nil {
		fmt.Println("errr", err)
		res := Response{

			Code:    http.StatusInternalServerError,
			Message: "Failed to update survey data",
			Success: false,
		}
		json.NewEncoder(w).Encode(res)
		return
	}
	rowsAffected, err := result.RowsAffected()
	if err != nil {
		// Handle the error
		fmt.Println("errrrr", err)
		res := Response{
			Code:    http.StatusInternalServerError,
			Message: "Failed to retrieve rows affected",
			Success: false,
		}
		json.NewEncoder(w).Encode(res)
		return
	}

	if rowsAffected > 0 {
		updateSurveyDone := fmt.Sprintf("UPDATE training_participants SET isSurveyDone = 1 WHERE id = %d", p.ID)
		_, err := DB.Exec(updateSurveyDone)
		if err != nil {
			// Handle the error
			res := Response{
				Code:    http.StatusInternalServerError,
				Message: "Failed to update survey status",
				Success: false,
			}
			json.NewEncoder(w).Encode(res)
			return
		}

		res := Response{
			Code:    http.StatusOK,
			Message: "Survey data added successfully",
			Success: true,
		}
		json.NewEncoder(w).Encode(res)
		return
	} else {
		res := Response{
			Code:    http.StatusOK,
			Message: "already data saved",
			Success: true,
		}
		json.NewEncoder(w).Encode(res)
	}
}
