package Getviewform

import (
	"database/sql"
	"encoding/json"
	"fmt"
	"io/ioutil"
	"net/http"
	"strings"
)

type TrainingParticipant struct {
	ID                                string   `json:"id"`
	FirstName                         string   `json:"firstName"`
	DOB                               string   `json:"dob"`
	Age                               string   `json:"age"`
	HusbandName                       string   `json:"husbandName"`
	Occupation                        string   `json:"occupation"`
	HusbandOccupation                 string   `json:"husbandOccupation"`
	SavingGoal                        string   `json:"saving_goal"`
	Caste                             string   `json:"caste"`
	NumOfChildren                     string   `json:"numOfChildren"`
	Income                            string   `json:"income"`
	Savings                           string   `json:"savings"`
	Education                         string   `json:"education"`
	ContactNo                         string   `json:"contact_no"`
	VoterID                           string   `json:"voter_id"`
	BusinessIncome                    string   `json:"business_income"`
	BusinessProfit                    string   `json:"business_profit"`
	SavingAmt                         string   `json:"saving_amt"`
	BankAcc                           string   `json:"bank_acc"`
	NameOfSHG                         string   `json:"nameOfSHG"`
	TypeOfEnterprise                  string   `json:"typeOfEnterprise"`
	WifeIncomeMonthly                 string   `json:"wifeIncomeMonthly"`
	WifeSavingsMonthly                string   `json:"wifeSavingsMonthly"`
	PersonOfWorth                     string   `json:"personOfWorth"`
	GoodQuality                       string   `json:"goodQuality"`
	AmFailure                         string   `json:"amFailure"`
	HaveGoal                          string   `json:"haveGoal"`
	Goal                              string   `json:"goal"`
	PathwayToGoal                     string   `json:"pathwayToGoal"`
	DisheartenedToProblems            string   `json:"disheartenedToProblems"`
	SolutionToProblems                string   `json:"solutionToProblems"`
	ImplementationPlan                string   `json:"implementationPlan"`
	NoChoiceForSolution               string   `json:"noChoiceForSolution"`
	ProfitForSarees                   string   `json:"profitForSarees"`
	AnnualLoanInterest                string   `json:"annualLoanInterest"`
	SaveRegularly                     string   `json:"saveRegularly"`
	WhereSaveMoney                    string   `json:"whereSaveMoney"`
	FrequencyOfSaving                 string   `json:"frequencyOfSaving"`
	OwnAsset                          string   `json:"ownAsset"`
	SeparateFinancialAsset            string   `json:"separateFinancialAsset"`
	SpendMoney                        string   `json:"spendMoney"`
	HaveLoan                          string   `json:"haveLoan"`
	LoanOnWhoseName                   string   `json:"loanOnWhoseName"`
	GovernmentBank                    string   `json:"governmentBank"`
	PrivateBank                       string   `json:"privateBank"`
	LocalMFI                          string   `json:"localMFI"`
	NGO                               string   `json:"ngo"`
	MoneyLender                       string   `json:"moneyLender"`
	Middleman                         string   `json:"middleman"`
	AgroProcessors                    string   `json:"agroProcessors"`
	Parents                           string   `json:"parents"`
	Relatives                         string   `json:"relatives"`
	Neighbours                        string   `json:"neighbours"`
	Friends                           string   `json:"friends"`
	SocialWelfareDepartments          string   `json:"socialWelfareDepartments"`
	Coorperatives                     string   `json:"cooperatives"`
	Others                            string   `json:"others"`
	OwnIncomeGeneration               string   `json:"ownIncomeGeneration"`
	FamilyIncomeGeneration            string   `json:"familyIncomeGeneration"`
	EducationReason                   string   `json:"educationReason"`
	FutureEmployment                  string   `json:"futureEmployment"`
	OwnMarriage                       string   `json:"ownMarriage"`
	BrotherMarriage                   string   `json:"brotherMarriage"`
	PersonalExpenses                  string   `json:"personalExpenses"`
	HouseholdUse                      string   `json:"householdUse"`
	HouseRepair                       string   `json:"houseRepair"`
	Medical                           string   `json:"medical"`
	Festival                          string   `json:"festival"`
	ReasonOthersToBorrowLoan          string   `json:"reasonOthersToBorrowLoan"`
	SpecificGoalForSavings            string   `json:"specificGoalForSavings"`
	HowMuchSaveToAchieve              string   `json:"howMuchSaveToAchieve"`
	EducationDecision                 string   `json:"educationDecision"`
	AccessToHealtcare                 string   `json:"accessToHealtcare"`
	AccessToCredit                    string   `json:"accessToCredit"`
	SavingMoney                       string   `json:"savingMoney"`
	AssetPurchase                     string   `json:"assetPurchase"`
	DayTodayExpenditure               string   `json:"dayTodayExpenditure"`
	Livelihood                        string   `json:"livelihood"`
	PartOfCollective                  string   `json:"partOfCollective"`
	ImportantToShareTheirProb         string   `json:"importantToShareTheirProb"`
	ShareLearningWithCommunity        string   `json:"shareLearningWithCommunity"`
	IsSurveyDone                      string   `json:"isSurveyDone"`
	HouseholdBooksAccounts            string   `json:"household_books_accounts"`
	AccountsForSelfEnterprises        string   `json:"accounts_for_Self_Enterprises"`
	AccountHousehold                  string   `json:"account_household"`
	AccountBusiness                   string   `json:"account_business"`
	District                          string   `json:"district"`
	Taluk                             string   `json:"taluk"`
	GramPanchayat                     string   `json:"gram_panchayat"`
	VillageName                       string   `json:"village_name"`
	House                             string   `json:"house"`
	Roof                              string   `json:"roof"`
	RationCard                        string   `json:"ration_card"`
	SubCastName                       string   `json:"sub_cast_name"`
	Religion                          string   `json:"religion"`
	MaritalStatus                     string   `json:"marital_status"`
	PrimaryOccupation                 string   `json:"primary_occupation"`
	SecondaryOccupation               string   `json:"secondary_occupation"`
	SoleEarnerFamily                  string   `json:"sole_earner_family"`
	MigrationProfile                  string   `json:"migration_profile"`
	HouseholdMigrationLastYear        string   `json:"household_migration_last_year"`
	MigrantSendsRemittance            string   `json:"migrant_sends_remittance"`
	FinancialLiteracy                 string   `json:"financial_literacy"`
	LiabilitiesOrAssets               []string `json:"liabilities_or_assets"`
	BookkeepingEntry                  []string `json:"bookkeeping_entry"`
	LoanType                          []string `json:"loan_type"`
	AnnualInterestRate                string   `json:"annual_interest_rate"`
	InterestPaymentDue                string   `json:"interest_payment_due"`
	ProfitMade                        string   `json:"profit_made"`
	PersonalAccount                   string   `json:"personal_account"`
	HasPersonalAccount                string   `json:"has_personal_account"`
	BankAccountUsageFrequency         []string `json:"bank_account_usage_frequency"`
	MoneyDecisionMaker                []string `json:"money_decision_maker"`
	MonthlyExpensePlan                string   `json:"monthly_expense_plan"`
	MonthlyExpenseAmount              string   `json:"monthly_expense_amount"`
	MaintainExpenseRecord             string   `json:"maintain_expense_record"`
	IndividualSavings                 string   `json:"individual_savings"`
	MonthlySavingsIndividual          string   `json:"monthly_savings_individual"`
	AnnualSavingsHousehold            string   `json:"annual_savings_household"`
	ConfidentSpendSavings             string   `json:"confident_spend_savings"`
	Loans                             string   `json:"loans"`
	LoanTakenBy                       []string `json:"loan_taken_by"`
	AmountBorrowed                    string   `json:"amount_borrowed"`
	PurposeOfLoan                     []string `json:"purpose_of_loan"`
	Source                            []string `json:"source"`
	RateOfInterest                    string   `json:"rate_of_interest"`
	ExpensesExceedIncomeLastYear      []string `json:"expenses_exceed_income_last_year"`
	IncomeLossDuration                []string `json:"income_loss_duration"`
	Goals                             string   `json:"goals"`
	FinancialGoalsSet                 string   `json:"financial_goals_set"`
	ShortTermGoal                     string   `json:"short_term_goal"`
	LongTermGoal                      string   `json:"long_term_goal"`
	Enterprise                        string   `json:"enterprise"`
	FamilyBusiness                    string   `json:"family_business"`
	WantToStartEnterprise             string   `json:"want_to_start_enterprise"`
	EnterpriseType                    []string `json:"enterprise_type"`
	NumEmployeesPaid                  string   `json:"num_employees_paid"`
	IndividualInvolvementNature       []string `json:"individual_involvement_nature"`
	EnterpriseMonthlyIncome           string   `json:"enterprise_monthly_income"`
	EnterpriseIsProfitable            string   `json:"enterprise_is_profitable"`
	MonthlyProfit                     string   `json:"monthly_profit"`
	DecisionMaking                    string   `json:"decision_making"`
	DecisionSay                       []string `json:"decision_say"`
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
}

func GetSelfShaktiBaselineSurvey(w http.ResponseWriter, r *http.Request, db *sql.DB) {
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
    COALESCE(firstName, '') AS firstName,
    COALESCE(dob, '') AS dob,
    COALESCE(age, '') AS age,
    COALESCE(husbandName, '') AS husbandName,
    COALESCE(occupation, '') AS occupation,
    COALESCE(husbandOccupation, '') AS husbandOccupation,
    COALESCE(saving_goal, '') AS saving_goal,
    COALESCE(caste, '') AS caste,
    COALESCE(numOfChildren, '') AS numOfChildren,
    COALESCE(income, '') AS income,
    COALESCE(savings, '') AS savings,
    COALESCE(education, '') AS education,
    COALESCE(contact_no, '') AS contact_no,
    COALESCE(voter_id, '') AS voter_id,
    COALESCE(business_income, '') AS business_income,
    COALESCE(business_profit, '') AS business_profit,
    COALESCE(saving_amt, '') AS saving_amt,
    COALESCE(bank_acc, '') AS bank_acc,
    COALESCE(nameOfSHG, '') AS nameOfSHG,
    COALESCE(typeOfEnterprise, '') AS typeOfEnterprise,
    COALESCE(wifeIncomeMonthly, '') AS wifeIncomeMonthly,
    COALESCE(wifeSavingsMonthly, '') AS wifeSavingsMonthly,
    COALESCE(personOfWorth, '') AS personOfWorth,
    COALESCE(goodQuality, '') AS goodQuality,
    COALESCE(amFailure, '') AS amFailure,
    COALESCE(haveGoal, '') AS haveGoal,
    COALESCE(goal, '') AS goal,
    COALESCE(pathwayToGoal, '') AS pathwayToGoal,
    COALESCE(disheartenedToProblems, '') AS disheartenedToProblems,
    COALESCE(solutionToProblems, '') AS solutionToProblems,
    COALESCE(implementationPlan, '') AS implementationPlan,
    COALESCE(noChoiceForSolution, '') AS noChoiceForSolution,
    COALESCE(profitForSarees, '') AS profitForSarees,
    COALESCE(annualLoanInterest, '') AS annualLoanInterest,
    COALESCE(saveRegularly, '') AS saveRegularly,
    COALESCE(whereSaveMoney, '') AS whereSaveMoney,
    COALESCE(frequencyOfSaving, '') AS frequencyOfSaving,
    COALESCE(ownAsset, '') AS ownAsset,
    COALESCE(separateFinancialAsset, '') AS separateFinancialAsset,
    COALESCE(spendMoney, '') AS spendMoney,
    COALESCE(haveLoan, '') AS haveLoan,
    COALESCE(loanOnWhoseName, '') AS loanOnWhoseName,
    COALESCE(governmentBank, '') AS governmentBank,
    COALESCE(privateBank, '') AS privateBank,
    COALESCE(localMFI, '') AS localMFI,
    COALESCE(ngo, '') AS ngo,
    COALESCE(moneyLender, '') AS moneyLender,
    COALESCE(middleman, '') AS middleman,
    COALESCE(agroProcessors, '') AS agroProcessors,
    COALESCE(parents, '') AS parents,
    COALESCE(relatives, '') AS relatives,
    COALESCE(neighbours, '') AS neighbours,
    COALESCE(friends, '') AS friends,
    COALESCE(socialWelfareDepartments, '') AS socialWelfareDepartments,
    COALESCE(coorperatives, '') AS coorperatives,
    COALESCE(others, '') AS others,
    COALESCE(ownIncomeGeneration, '') AS ownIncomeGeneration,
    COALESCE(familyIncomeGeneration, '') AS familyIncomeGeneration,
    COALESCE(educationReason, '') AS educationReason,
    COALESCE(futureEmployment, '') AS futureEmployment,
    COALESCE(ownMarriage, '') AS ownMarriage,
    COALESCE(brotherMarriage, '') AS brotherMarriage,
    COALESCE(personalExpenses, '') AS personalExpenses,
    COALESCE(householdUse, '') AS householdUse,
    COALESCE(houseRepair, '') AS houseRepair,
    COALESCE(medical, '') AS medical,
    COALESCE(festival, '') AS festival,
    COALESCE(reasonOthersToBorrowLoan, '') AS reasonOthersToBorrowLoan,
    COALESCE(specificGoalForSavings, '') AS specificGoalForSavings,
    COALESCE(howMuchSaveToAchieve, '') AS howMuchSaveToAchieve,
    COALESCE(educationDecision, '') AS educationDecision,
    COALESCE(accessToHealtcare, '') AS accessToHealtcare,
    COALESCE(accessToCredit, '') AS accessToCredit,
    COALESCE(savingMoney, '') AS savingMoney,
    COALESCE(assetPurchase, '') AS assetPurchase,
    COALESCE(dayTodayExpenditure, '') AS dayTodayExpenditure,
    COALESCE(livelihood, '') AS livelihood,
    COALESCE(partOfCollective, '') AS partOfCollective,
    COALESCE(importantToShareTheirProb, '') AS importantToShareTheirProb,
    COALESCE(shareLearningWithCommunity, '') AS shareLearningWithCommunity,
COALESCE(isSurveyDone, 0) AS isSurveyDone,
    COALESCE(household_books_accounts, '') AS household_books_accounts,
    COALESCE(accounts_for_Self_Enterprises, '') AS accounts_for_Self_Enterprises,
    COALESCE(account_household, '') AS account_household,
    COALESCE(account_business, '') AS account_business,
    COALESCE(district, '') AS district,
    COALESCE(taluk, '') AS taluk,
    COALESCE(gram_panchayat, '') AS gram_panchayat,
    COALESCE(village_name, '') AS village_name,
    COALESCE(house, '') AS house,
    COALESCE(roof, '') AS roof,
    COALESCE(ration_card, '') AS ration_card,
    COALESCE(sub_cast_name, '') AS sub_cast_name,
    COALESCE(religion, '') AS religion,
    COALESCE(marital_status, '') AS marital_status,
    COALESCE(primary_occupation, '') AS primary_occupation,
    COALESCE(secondary_occupation, '') AS secondary_occupation,
    COALESCE(sole_earner_family, '') AS sole_earner_family,
    COALESCE(migration_profile, '') AS migration_profile,
    COALESCE(household_migration_last_yea, '') AS household_migration_last_yea,
    COALESCE(migrant_sends_remittance, '') AS migrant_sends_remittance,
    COALESCE(financial_literacy, '') AS financial_literacy,
    COALESCE(liabilities_or_assets, '') AS liabilities_or_assets,
    COALESCE(bookkeeping_entry, '') AS bookkeeping_entry,
    COALESCE(loan_type, '') AS loan_type,
    COALESCE(annual_interest_rate, '') AS annual_interest_rate,
    COALESCE(interest_payment_due, '') AS interest_payment_due,
    COALESCE(profit_made, '') AS profit_made,
    COALESCE(personal_account, '') AS personal_account,
    COALESCE(has_personal_account, '') AS has_personal_account,
    COALESCE(bank_account_usage_frequency, '') AS bank_account_usage_frequency,
    COALESCE(money_decision_maker, '') AS money_decision_maker,
    COALESCE(monthly_expense_plan, '') AS monthly_expense_plan,
    COALESCE(monthly_expense_amount, '') AS monthly_expense_amount,
    COALESCE(maintain_expense_record, '') AS maintain_expense_record,
    COALESCE(individual_savings, '') AS individual_savings,
    COALESCE(monthly_savings_individual, '') AS monthly_savings_individual,
    COALESCE(annual_savings_household, '') AS annual_savings_household,
    COALESCE(confident_spend_savings, '') AS confident_spend_savings,
    COALESCE(loans, '') AS loans,
    COALESCE(loan_taken_by, '') AS loan_taken_by,
    COALESCE(amount_borrowed, '') AS amount_borrowed,
    COALESCE(purpose_of_loan, '') AS purpose_of_loan,
    COALESCE(source, '') AS source,
    COALESCE(rate_of_interest, '') AS rate_of_interest,
    COALESCE(expenses_exceed_income_last_year, '') AS expenses_exceed_income_last_year,
    COALESCE(income_loss_duration, '') AS income_loss_duration,
    COALESCE(goals, '') AS goals,
    COALESCE(financial_goals_set, '') AS financial_goals_set,
    COALESCE(short_term_goal, '') AS short_term_goal,
    COALESCE(long_term_goal, '') AS long_term_goal,
    COALESCE(enterprise, '') AS enterprise,
    COALESCE(family_business, '') AS family_business,
    COALESCE(want_to_start_enterprise, '') AS want_to_start_enterprise,
    COALESCE(enterprise_type, '') AS enterprise_type,
    COALESCE(num_employees_paid, '') AS num_employees_paid,
    COALESCE(individual_involvement_nature, '') AS individual_involvement_nature,
    COALESCE(enterprise_monthly_income, '') AS enterprise_monthly_income,
    COALESCE(enterprise_is_profitable, '') AS enterprise_is_profitable,
    COALESCE(monthly_profit, '') AS monthly_profit,
    COALESCE(decision_making, '') AS decision_making,
    COALESCE(decision_say, '') AS decision_say,
    COALESCE(menstrual_hygiene_env, '') AS menstrual_hygiene_env,
    COALESCE(env_friendly_practices, '') AS env_friendly_practices,
    COALESCE(menstrual_product_used, '') AS menstrual_product_used,
    COALESCE(menstrual_disposal_method, '') AS menstrual_disposal_method,
    COALESCE(cooking_fuel_type, '') AS cooking_fuel_type,
	COALESCE(womens_occupation, 'No Data') AS womens_occupation,
    COALESCE(monthly_women_income, 0) AS monthly_women_income,
    COALESCE(source_of_this_income, 'Unknown') AS source_of_this_income,
    COALESCE(Secondary_Occupation_of_the_Household, 'None') AS Secondary_Occupation_of_the_Household,
    COALESCE(Primary_occupation_of_household, 'None') AS Primary_occupation_of_household
FROM 
    training_participants
    WHERE isSurveyDone= 0 and id = %d`, req.ParticipantID)

	rows, err := db.Query(query)

	if err != nil {
		json.NewEncoder(w).Encode(map[string]interface{}{"code": http.StatusInternalServerError, "message": "Database Query Error", "success": false, "error": err.Error()})
		return
	}
	defer rows.Close()

	var response []TrainingParticipant

	for rows.Next() {
		var participant TrainingParticipant
		var liabilitiesOrAssets, bookkeepingEntry, loanType, bankAccountUsageFrequency, moneyDecisionMaker, loanTakenBy, purposeOfLoan, source, expensesExceedIncomeLastYear, incomeLossDuration, enterpriseType, individualInvolvementNature, decisionSay, envFriendlyPractices, menstrualProductUsed, menstrualDisposalMethod, cookingFuelType string

		err := rows.Scan(
			&participant.ID,
			&participant.FirstName,
			&participant.DOB,
			&participant.Age,
			&participant.HusbandName,
			&participant.Occupation,
			&participant.HusbandOccupation,
			&participant.SavingGoal,
			&participant.Caste,
			&participant.NumOfChildren,
			&participant.Income,
			&participant.Savings,
			&participant.Education,
			&participant.ContactNo,
			&participant.VoterID,
			&participant.BusinessIncome,
			&participant.BusinessProfit,
			&participant.SavingAmt,
			&participant.BankAcc,
			&participant.NameOfSHG,
			&participant.TypeOfEnterprise,
			&participant.WifeIncomeMonthly,
			&participant.WifeSavingsMonthly,
			&participant.PersonOfWorth,
			&participant.GoodQuality,
			&participant.AmFailure,
			&participant.HaveGoal,
			&participant.Goal,
			&participant.PathwayToGoal,
			&participant.DisheartenedToProblems,
			&participant.SolutionToProblems,
			&participant.ImplementationPlan,
			&participant.NoChoiceForSolution,
			&participant.ProfitForSarees,
			&participant.AnnualLoanInterest,
			&participant.SaveRegularly,
			&participant.WhereSaveMoney,
			&participant.FrequencyOfSaving,
			&participant.OwnAsset,
			&participant.SeparateFinancialAsset,
			&participant.SpendMoney,
			&participant.HaveLoan,
			&participant.LoanOnWhoseName,
			&participant.GovernmentBank,
			&participant.PrivateBank,
			&participant.LocalMFI,
			&participant.NGO,
			&participant.MoneyLender,
			&participant.Middleman,
			&participant.AgroProcessors,
			&participant.Parents,
			&participant.Relatives,
			&participant.Neighbours,
			&participant.Friends,
			&participant.SocialWelfareDepartments,
			&participant.Coorperatives,
			&participant.Others,
			&participant.OwnIncomeGeneration,
			&participant.FamilyIncomeGeneration,
			&participant.EducationReason,
			&participant.FutureEmployment,
			&participant.OwnMarriage,
			&participant.BrotherMarriage,
			&participant.PersonalExpenses,
			&participant.HouseholdUse,
			&participant.HouseRepair,
			&participant.Medical,
			&participant.Festival,
			&participant.ReasonOthersToBorrowLoan,
			&participant.SpecificGoalForSavings,
			&participant.HowMuchSaveToAchieve,
			&participant.EducationDecision,
			&participant.AccessToHealtcare,
			&participant.AccessToCredit,
			&participant.SavingMoney,
			&participant.AssetPurchase,
			&participant.DayTodayExpenditure,
			&participant.Livelihood,
			&participant.PartOfCollective,
			&participant.ImportantToShareTheirProb,
			&participant.ShareLearningWithCommunity,
			&participant.IsSurveyDone,
			&participant.HouseholdBooksAccounts,
			&participant.AccountsForSelfEnterprises,
			&participant.AccountHousehold,
			&participant.AccountBusiness,
			&participant.District,
			&participant.Taluk,
			&participant.GramPanchayat,
			&participant.VillageName,
			&participant.House,
			&participant.Roof,
			&participant.RationCard,
			&participant.SubCastName,
			&participant.Religion,
			&participant.MaritalStatus,
			&participant.PrimaryOccupation,
			&participant.SecondaryOccupation,
			&participant.SoleEarnerFamily,
			&participant.MigrationProfile,
			&participant.HouseholdMigrationLastYear,
			&participant.MigrantSendsRemittance,
			&participant.FinancialLiteracy,
			&liabilitiesOrAssets, // Scan as a string
			&bookkeepingEntry,    // Scan as a string
			&loanType,            // Scan as a string
			&participant.AnnualInterestRate,
			&participant.InterestPaymentDue,
			&participant.ProfitMade,
			&participant.PersonalAccount,
			&participant.HasPersonalAccount,
			&bankAccountUsageFrequency, // Scan as a string
			&moneyDecisionMaker,        // Scan as a string
			&participant.MonthlyExpensePlan,
			&participant.MonthlyExpenseAmount,
			&participant.MaintainExpenseRecord,
			&participant.IndividualSavings,
			&participant.MonthlySavingsIndividual,
			&participant.AnnualSavingsHousehold,
			&participant.ConfidentSpendSavings,
			&participant.Loans,
			&loanTakenBy, // Scan as a string
			&participant.AmountBorrowed,
			&purposeOfLoan, // Scan as a string
			&source,        // Scan as a string
			&participant.RateOfInterest,
			&expensesExceedIncomeLastYear, // Scan as a string
			&incomeLossDuration,           // Scan as a string
			&participant.Goals,
			&participant.FinancialGoalsSet,
			&participant.ShortTermGoal,
			&participant.LongTermGoal,
			&participant.Enterprise,
			&participant.FamilyBusiness,
			&participant.WantToStartEnterprise,
			&enterpriseType, // Scan as a string
			&participant.NumEmployeesPaid,
			&individualInvolvementNature, // Scan as a string
			&participant.EnterpriseMonthlyIncome,
			&participant.EnterpriseIsProfitable,
			&participant.MonthlyProfit,
			&participant.DecisionMaking,
			&decisionSay, // Scan as a string
			&participant.MenstrualHygieneEnv,
			&envFriendlyPractices,    // Scan as a string
			&menstrualProductUsed,    // Scan as a string
			&menstrualDisposalMethod, // Scan as a string
			&cookingFuelType,         // Scan as a string
			&participant.WomensOccupation,
			&participant.MonthlyWomenIncome,
			&participant.SourceOfThisIncome,
			&participant.SecondaryOccupationOfTheHousehold,
			&participant.PrimaryOccupationOfHousehold,
		)

		if err != nil {
			json.NewEncoder(w).Encode(map[string]interface{}{"code": http.StatusInternalServerError, "message": "Database Scan Error", "success": false, "error": err.Error()})
			return
		}
		participant.LiabilitiesOrAssets = strings.Split(liabilitiesOrAssets, ",")
		participant.BookkeepingEntry = strings.Split(bookkeepingEntry, ",")
		participant.LoanType = strings.Split(loanType, ",")
		participant.BankAccountUsageFrequency = strings.Split(bankAccountUsageFrequency, ",")
		participant.MoneyDecisionMaker = strings.Split(moneyDecisionMaker, ",")
		participant.LoanTakenBy = strings.Split(loanTakenBy, ",")
		participant.PurposeOfLoan = strings.Split(purposeOfLoan, ",")
		participant.Source = strings.Split(source, ",")
		participant.ExpensesExceedIncomeLastYear = strings.Split(expensesExceedIncomeLastYear, ",")
		participant.IncomeLossDuration = strings.Split(incomeLossDuration, ",")
		participant.EnterpriseType = strings.Split(enterpriseType, ",")
		participant.IndividualInvolvementNature = strings.Split(individualInvolvementNature, ",")
		participant.DecisionSay = strings.Split(decisionSay, ",")
		participant.EnvFriendlyPractices = strings.Split(envFriendlyPractices, ",")
		participant.MenstrualProductUsed = strings.Split(menstrualProductUsed, ",")
		participant.MenstrualDisposalMethod = strings.Split(menstrualDisposalMethod, ",")
		participant.CookingFuelType = strings.Split(cookingFuelType, ",")

		response = append(response, participant)
	}

	w.Header().Set("Content-Type", "application/json")
	json.NewEncoder(w).Encode(map[string]interface{}{"data": response, "success": true, "message": "GetSelfShaktiBaselineSurvey"})
}
