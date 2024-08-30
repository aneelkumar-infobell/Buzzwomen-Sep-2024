package spoorthi

import (
	"database/sql"
	"fmt"
	"log"
	"strconv"
	"strings"

	_ "github.com/go-sql-driver/mysql"
)

func getAssociatedProjectList(db *sql.DB, projId int) ([]int, error) {
	projArray := []int{}
	if projId > 0 {
		getProjList := fmt.Sprintf("SELECT associatedProject FROM project_association WHERE projectId IN (%d)", projId)
		projArray = append(projArray, projId)
		rows, err := db.Query(getProjList)
		if err != nil {
			return nil, err
		}
		defer rows.Close()
		for rows.Next() {
			var associatedProject int
			err := rows.Scan(&associatedProject)
			if err != nil {
				return nil, err
			}
			projArray = append(projArray, associatedProject)
		}
		if err = rows.Err(); err != nil {
			return nil, err
		}
	}
	return projArray, nil
}

func getTarget(db *sql.DB, startDate string, endDate string, projectArray []int) int {
	var getTargetQuery string
	var target sql.NullInt64

	if len(projectArray) > 0 {
		getTargetQuery = fmt.Sprintf("SELECT COALESCE(sum(training_target), 0) as target from project p where id in (%s)", strings.Trim(strings.Replace(fmt.Sprint(projectArray), " ", ",", -1), "[]"))
	} else {
		getTargetQuery = fmt.Sprintf("SELECT sum(training_target) as target from project p where (startDate >= '%s' and endDate <= '%s')", startDate, endDate)
	}

	// ...

	err := db.QueryRow(getTargetQuery).Scan(&target)
	if err != nil {
		log.Println("ERROR>>", err)
	}

	if target.Valid {
		return int(target.Int64)
	} else {
		return 0
	}

}

// helper function to remove duplicates from an int slice
func uniqueIntSlice(slice []int) []int {
	keys := make(map[int]bool)
	var unique []int
	for _, val := range slice {
		if _, value := keys[val]; !value {
			keys[val] = true
			unique = append(unique, val)
		}
	}
	return unique
}

// helper function to convert an int slice to a string of comma-separated values
func intSliceToString(slice []int) string {
	var strSlice []string
	for _, val := range slice {
		strSlice = append(strSlice, strconv.Itoa(val))
	}
	return strings.Join(strSlice, ", ")
}
func getParticipantFilternoSpoorthirenroll(db *sql.DB, startDate string, endDate string, projectArray []int, filter string) int {
	var spoorthienroll string
	var noofspoorthienroll int

	for _, proj := range projectArray {
		projs, _ := getAssociatedProjectList(db, proj)
		if len(projs) > 1 {
			projectArray = append(projectArray, projs...)
		}
	}
	projectIDs := strings.Trim(strings.Replace(fmt.Sprint(projectArray), " ", ",", -1), "[]")
	if len(projectIDs) > 0 {
		spoorthienroll = fmt.Sprintf("SELECT COUNT(id) as spoorthi FROM training_participants WHERE enroll=1 and enroll_date BETWEEN '%s' AND '%s' AND project_id IN (%s) %s", startDate, endDate, strings.Trim(strings.Replace(fmt.Sprint(projectIDs), " ", ",", -1), "[]"), filter)
	} else {
		spoorthienroll = fmt.Sprintf("SELECT COUNT(id) as spoorthi FROM training_participants WHERE enroll=1 and enroll_date BETWEEN '%s' AND '%s' %s", startDate, endDate, filter)
	}

	err := db.QueryRow(spoorthienroll).Scan(&noofspoorthienroll)
	if err != nil {
		log.Println("noofspoorthienroll", err)
	}
	return noofspoorthienroll
}

func getParticipantFilternoSpoorthimodule(db *sql.DB, startDate string, endDate string, projectArray []int, filter string) int {
	var spoorthimodule string
	var noofspoorthimodule int

	for _, proj := range projectArray {
		projs, _ := getAssociatedProjectList(db, proj)
		if len(projs) > 1 {
			projectArray = append(projectArray, projs...)
		}
	}
	projectIDs := strings.Trim(strings.Replace(fmt.Sprint(projectArray), " ", ",", -1), "[]")
	if len(projectIDs) > 0 {
		spoorthimodule = fmt.Sprintf("SELECT count(module1=1 and module2=1 and module3=1 and module4=1 and module5=1) as noofspoorthimodules FROM SpoorthiBaselineQuestionnaire sb JOIN training_participants t ON t.id=sb.partcipantId where sb.entry_date BETWEEN '%s' and '%s' and t.project_id IN (%s) %s", startDate, endDate, strings.Trim(strings.Replace(fmt.Sprint(projectIDs), " ", ",", -1), "[]"), filter)
	} else {
		spoorthimodule = fmt.Sprintf("SELECT count(module1=1 and module2=1 and module3=1 and module4=1 and module5=1) as noofspoorthimodules FROM SpoorthiBaselineQuestionnaire sb JOIN training_participants t ON t.id=sb.partcipantId where sb.entry_date BETWEEN '%s' AND '%s' %s", startDate, endDate, filter)
	}

	err := db.QueryRow(spoorthimodule).Scan(&noofspoorthimodule)
	if err != nil {
		log.Println("noofspoorthimodule", err)
	}
	return noofspoorthimodule
}

func getParticipantFilternoSpoorthisurvey(db *sql.DB, startDate string, endDate string, projectArray []int, filter string) int {
	var spoorthisurvey string
	var noofspoorthisurvey int

	for _, proj := range projectArray {
		projs, _ := getAssociatedProjectList(db, proj)
		if len(projs) > 1 {
			projectArray = append(projectArray, projs...)
		}
	}
	projectIDs := strings.Trim(strings.Replace(fmt.Sprint(projectArray), " ", ",", -1), "[]")
	if len(projectIDs) > 0 {
		spoorthisurvey = fmt.Sprintf("SELECT count(sb.id) as noofspoorthisurvey FROM SpoorthiBaselineQuestionnaire sb join training_participants t on t.id= sb.partcipantId where sb.entry_date BETWEEN '%s' and '%s' and t.project_id IN (%s) %s", startDate, endDate, strings.Trim(strings.Replace(fmt.Sprint(projectIDs), " ", ",", -1), "[]"), filter)
	} else {
		spoorthisurvey = fmt.Sprintf("SELECT count(sb.id) as noofspoorthisurvey FROM SpoorthiBaselineQuestionnaire sb join training_participants t on t.id= sb.partcipantId where sb.entry_date BETWEEN '%s' AND '%s' %s", startDate, endDate, filter)
	}

	err := db.QueryRow(spoorthisurvey).Scan(&noofspoorthisurvey)
	if err != nil {
		log.Println("noofspoorthisurvey", err)
	}
	return noofspoorthisurvey
}

func getParticipantFilternoSpoorthiCirclemeet(db *sql.DB, startDate string, endDate string, projectArray []int, filter string) int {
	var spoorthiCircle string
	var noofspoorthiCircle int

	for _, proj := range projectArray {
		projs, _ := getAssociatedProjectList(db, proj)
		if len(projs) > 1 {
			projectArray = append(projectArray, projs...)
		}
	}
	projectIDs := strings.Trim(strings.Replace(fmt.Sprint(projectArray), " ", ",", -1), "[]")
	if len(projectIDs) > 0 {
		spoorthiCircle = fmt.Sprintf("SELECT COUNT(tbl_poa.session_type) AS noofspoorthicircle FROM tbl_poa tbl_poa WHERE tbl_poa.type = 2 AND (tbl_poa.session_type IN (4, 5, 6, 7, 8, 9)) and tbl_poa.date BETWEEN '%s' and '%s' and tbl_poa.project_id IN (%s) %s", startDate, endDate, strings.Trim(strings.Replace(fmt.Sprint(projectIDs), " ", ",", -1), "[]"), filter)
	} else {
		spoorthiCircle = fmt.Sprintf("SELECT COUNT(tbl_poa.session_type) AS noofspoorthicircle FROM tbl_poa tbl_poa WHERE tbl_poa.type = 2 AND (tbl_poa.session_type IN (4, 5, 6, 7, 8, 9)) and tbl_poa.date BETWEEN '%s' AND '%s' %s", startDate, endDate, filter)
	}

	err := db.QueryRow(spoorthiCircle).Scan(&noofspoorthiCircle)
	if err != nil {
		log.Println("noofspoorthicircle", err)
	}
	return noofspoorthiCircle
}

func getParticipantFilternoSpoorthiBeehives(db *sql.DB, startDate string, endDate string, projectArray []int, filter string) int {
	var spoorthiBeehives string
	var noofspoorthiBeehives int

	for _, proj := range projectArray {
		projs, _ := getAssociatedProjectList(db, proj)
		if len(projs) > 1 {
			projectArray = append(projectArray, projs...)
		}
	}
	projectIDs := strings.Trim(strings.Replace(fmt.Sprint(projectArray), " ", ",", -1), "[]")
	if len(projectIDs) > 0 {
		spoorthiBeehives = fmt.Sprintf("SELECT COUNT(tbl_poa.session_type) AS noofspoorthicircle FROM tbl_poa tbl_poa WHERE tbl_poa.type = 2 AND tbl_poa.session_type = 3 and tbl_poa.date BETWEEN '%s' and '%s' and tbl_poa.project_id IN (%s) %s", startDate, endDate, strings.Trim(strings.Replace(fmt.Sprint(projectIDs), " ", ",", -1), "[]"), filter)
	} else {
		spoorthiBeehives = fmt.Sprintf("SELECT COUNT(tbl_poa.session_type) AS noofspoorthicircle FROM tbl_poa tbl_poa WHERE tbl_poa.type = 2 AND tbl_poa.session_type = 3 and tbl_poa.date BETWEEN '%s' AND '%s' %s", startDate, endDate, filter)
	}

	err := db.QueryRow(spoorthiBeehives).Scan(&noofspoorthiBeehives)
	if err != nil {
		log.Println("noofspoorthibeehives", err)
	}
	return noofspoorthiBeehives
}

func TrainerVillageCount(db *sql.DB, startDate string, endDate string, projectArray []int, user_id string) int {
	var villageCount, subVillageCount int

	if len(projectArray) > 0 {
		// Build the project IDs string for the SQL query
		projectIDs := strings.Trim(strings.Join(strings.Fields(fmt.Sprint(projectArray)), ","), "[]")

		villageQuery := fmt.Sprintf("SELECT COUNT(DISTINCT location_id) as village FROM tbl_poa tp WHERE type = 1 AND added = 0 AND project_id IN (%s) AND user_id = %s", projectIDs, user_id)
		subVillageQuery := fmt.Sprintf("SELECT COUNT(DISTINCT sub_village) as subVillage FROM tbl_poa tp WHERE type = 1 AND added = 0 AND project_id IN (%s) AND user_id = %s", projectIDs, user_id)

		if startDate != "" && endDate != "" {
			villageQuery += fmt.Sprintf(" AND date BETWEEN '%s' AND '%s'", startDate, endDate)
			subVillageQuery += fmt.Sprintf(" AND date BETWEEN '%s' AND '%s'", startDate, endDate)
		}

		err := db.QueryRow(villageQuery).Scan(&villageCount)
		if err != nil {
			log.Println("TrainerVillageCount", err)
		}

		err = db.QueryRow(subVillageQuery).Scan(&subVillageCount)
		if err != nil {
			log.Println("TrainerVillageCount", err)
		}
	} else {
		villageQuery := fmt.Sprintf("SELECT COUNT(DISTINCT location_id) as village FROM tbl_poa tp WHERE type = 1 AND added = 0 AND startDate >= '%s' AND endDate <= '%s' AND user_id = %s", startDate, endDate, user_id)
		subVillageQuery := fmt.Sprintf("SELECT COUNT(DISTINCT sub_village) as subVillage FROM tbl_poa tp WHERE type = 1 AND added = 0 AND startDate >= '%s' AND endDate <= '%s' AND user_id = %s", startDate, endDate, user_id)

		err := db.QueryRow(villageQuery).Scan(&villageCount)
		if err != nil {
			log.Println("TrainerVillageCount", err)
		}

		err = db.QueryRow(subVillageQuery).Scan(&subVillageCount)
		if err != nil {
			log.Println("TrainerVillageCount", err)
		}
	}

	return villageCount + subVillageCount
}

func getParticipantFilterspoorthiGfBatchesNew(db *sql.DB, startDate string, endDate string, projectArray []int, filter string, gfid int) int {

	for _, proj := range projectArray {
		projs, _ := getAssociatedProjectList(db, proj)
		if len(projs) > 1 {
			projectArray = append(projectArray, projs...)
		}
	}
	if gfid > 0 {
		filter = " and tp.user_id = " + strconv.Itoa(gfid)
	}
	var villageQuery, subVillageQuery string
	if len(projectArray) > 0 {
		villageQuery = "select COUNT(DISTINCT location_id) from tbl_poa tp join training_participants t on t.project_id =tp.project_id where t.enroll=1 and tp.date >= '" + startDate + "' and tp.date <= '" + endDate + " 23:59:59' AND tp.project_id in (" + strings.Trim(strings.Join(strings.Fields(fmt.Sprint(projectArray)), ","), "[]") + ")" + filter
		subVillageQuery = "SELECT COUNT(DISTINCT sub_village) as 'subVillage' FROM tbl_poa tp join training_participants t on t.project_id =tp.project_id WHERE t.enroll=1 and tp.date >= '" + startDate + "' and tp.date <= '" + endDate + " 23:59:59' AND tp.project_id in (" + strings.Trim(strings.Join(strings.Fields(fmt.Sprint(projectArray)), ","), "[]") + ")" + filter
	} else {
		villageQuery = "select COUNT(DISTINCT location_id) from tbl_poa tp  INNER JOIN project p ON p.id = tp.project_id join training_participants t on t.project_id =tp.project_id where t.enroll=1 and tp.date >= '" + startDate + "' and tp.date <= '" + endDate + "'" + filter
		subVillageQuery = "SELECT COUNT(DISTINCT sub_village) as 'subVillage' FROM tbl_poa tp INNER JOIN project p ON p.id = tp.project_id join training_participants t on t.project_id =tp.project_id WHERE t.enroll=1 and tp.date >= '" + startDate + "' and tp.date <= '" + endDate + "'" + filter
	}
	villageResult, err := db.Query(villageQuery)
	if err != nil {
		panic(err.Error())
	}
	subVillageResult, err := db.Query(subVillageQuery)
	if err != nil {
		panic(err.Error())
	}
	var village, subVillage int
	for villageResult.Next() {
		err := villageResult.Scan(&village)
		if err != nil {
			panic(err.Error())
		}
	}
	for subVillageResult.Next() {
		err := subVillageResult.Scan(&subVillage)
		if err != nil {
			panic(err.Error())
		}
	}
	return village + subVillage
}

func intsToString(ints []int) string {
	var stringSlice []string
	for _, i := range ints {
		stringSlice = append(stringSlice, strconv.Itoa(i))
	}
	return strings.Join(stringSlice, ",")
}

func getOpsManagers(db *sql.DB, empId int) []int {
	getOpsIds := fmt.Sprintf("SELECT id FROM employee WHERE supervisorId = %d AND empRole = 4", empId)
	ids := make([]int, 0)
	res, err := db.Query(getOpsIds)
	if err != nil {
		log.Println("ERROR>>", err)
	}
	defer res.Close()

	for res.Next() {
		var id int
		if err := res.Scan(&id); err != nil {
			log.Println("ERROR>>", err)
		}
		ids = append(ids, id)
	}
	return ids
}

func getReportingOpsManagers(db *sql.DB, empId int) []int {
	ids := []int{}

	getOpsIds := "SELECT id FROM employee WHERE supervisorId = ? AND empRole = 4"
	res, err := db.Query(getOpsIds, empId)
	if err != nil {
		log.Println("ERROR>>", err)
	}
	defer res.Close()

	for res.Next() {
		var id int
		err := res.Scan(&id)
		if err != nil {
			log.Println("ERROR>>", err)
		}
		ids = append(ids, id)
	}

	getOpsIds = "SELECT id FROM employee WHERE supervisorId = ? AND empRole = 12"
	res, err = db.Query(getOpsIds, empId)
	if err != nil {
		log.Println("ERROR>>", err)
	}
	defer res.Close()

	for res.Next() {
		var id int
		err := res.Scan(&id)
		if err != nil {
			log.Println("ERROR>>", err)
		}
		ids = append(ids, id)
		som := id
		getOpsIds = "SELECT id FROM employee WHERE supervisorId = ? AND empRole = 4"
		res, err = db.Query(getOpsIds, som)
		if err != nil {
			log.Println("ERROR>>", err)
		}
		defer res.Close()

		for res.Next() {
			var id int
			err := res.Scan(&id)
			if err != nil {
				log.Println("ERROR>>", err)
			}
			ids = append(ids, id)
		}
	}

	return ids
}

func getTrainerTarget(db *sql.DB, empId int, projectArray []int) int {
	targetQuery := fmt.Sprintf("SELECT sum(target) as total from project_emps pe where emp_id = %d and project_id in (%s)",
		empId, strings.Trim(strings.Replace(fmt.Sprint(projectArray), " ", ",", -1), "[]"))
	var total sql.NullInt64
	err := db.QueryRow(targetQuery).Scan(&total)
	if err != nil {
		log.Println("ERROR>>", err)
	}
	if !total.Valid {
		return 0
	}
	return int(total.Int64)
}

func GfSpoorthiVillageCount(db *sql.DB, startDate string, endDate string, projectArray []int, user_id string) int {
	var villageCount, subVillageCount int
	for _, proj := range projectArray {
		projs, _ := getAssociatedProjectList(db, proj)
		if len(projs) > 1 {
			projectArray = append(projectArray, projs...)
		}
	}

	if len(projectArray) > 0 {
		// Build the project IDs string for the SQL query
		projectIDs := strings.Trim(strings.Join(strings.Fields(fmt.Sprint(projectArray)), ","), "[]")

		villageQuery := fmt.Sprintf("select COUNT(DISTINCT location_id) from tbl_poa tp join training_participants t on t.project_id =tp.project_id where t.enroll=1  and t.project_id IN (%s) AND tp.user_id = %s", projectIDs, user_id)
		subVillageQuery := fmt.Sprintf("SELECT COUNT(DISTINCT sub_village) as 'subVillage' FROM tbl_poa tp join training_participants t on t.project_id =tp.project_id WHERE t.enroll=1  t.project_id IN (%s) AND tp.user_id = %s", projectIDs, user_id)

		if startDate != "" && endDate != "" {
			villageQuery += fmt.Sprintf(" AND tp.date BETWEEN '%s' AND '%s'", startDate, endDate)
			subVillageQuery += fmt.Sprintf(" AND tp.date BETWEEN '%s' AND '%s'", startDate, endDate)
		}

		err := db.QueryRow(villageQuery).Scan(&villageCount)
		if err != nil {
			// Handle the error, e.g., log or return an error
		}

		err = db.QueryRow(subVillageQuery).Scan(&subVillageCount)
		if err != nil {
			// Handle the error, e.g., log or return an error
		}
	} else {
		villageQuery := fmt.Sprintf("select COUNT(DISTINCT location_id) from tbl_poa tp  INNER JOIN project p ON p.id = tp.project_id join training_participants t on t.project_id =tp.project_id where t.enroll=1  AND p.startDate >= '%s' AND p.endDate <= '%s' AND tp.user_id = %s", startDate, endDate, user_id)
		subVillageQuery := fmt.Sprintf("SELECT COUNT(DISTINCT sub_village) as 'subVillage' FROM tbl_poa tp INNER JOIN project p ON p.id = tp.project_id join training_participants t on t.project_id =tp.project_id WHERE t.enroll=1  AND p.startDate >= '%s' AND p.endDate <= '%s' AND tp.user_id = %s", startDate, endDate, user_id)
		err := db.QueryRow(villageQuery).Scan(&villageCount)
		if err != nil {
			// Handle the error, e.g., log or return an error
		}

		err = db.QueryRow(subVillageQuery).Scan(&subVillageCount)
		if err != nil {
			// Handle the error, e.g., log or return an error
		}
	}

	return villageCount + subVillageCount
}

func getEmployeeIDsBySupervisorID(db *sql.DB, supervisorID int) ([]int, error) {
	var employeeIDs []int

	query := fmt.Sprintf("SELECT id FROM employee WHERE supervisorId = %d", supervisorID)

	rows, err := db.Query(query)
	if err != nil {
		return nil, err
	}
	defer rows.Close()

	for rows.Next() {
		var employeeID int
		if err := rows.Scan(&employeeID); err != nil {
			return nil, err
		}
		employeeIDs = append(employeeIDs, employeeID)
	}

	if err := rows.Err(); err != nil {
		return nil, err
	}

	return employeeIDs, nil
}

func GflParticipantFilternoSpoorthirenroll(db *sql.DB, startDate string, endDate string, projectArray []int, gflid int, filter string) int {
	var spoorthienroll string
	var noofspoorthienroll int
	gfid, err := getEmployeeIDsBySupervisorID(db, gflid)
	if err != nil {
		log.Println("Error retrieving employee IDs:", err)
		return 0
	}

	for _, proj := range projectArray {
		projs, _ := getAssociatedProjectList(db, proj)
		if len(projs) > 1 {
			projectArray = append(projectArray, projs...)
		}
	}
	projectIDs := strings.Trim(strings.Replace(fmt.Sprint(projectArray), " ", ",", -1), "[]")
	if len(projectIDs) > 0 {
		spoorthienroll = fmt.Sprintf("SELECT COUNT(id) as spoorthi FROM training_participants WHERE enroll=1 and enroll_date BETWEEN '%s' AND '%s' AND project_id IN (%s) and gelathi_id IN (%s) %s", startDate, endDate, strings.Trim(strings.Replace(fmt.Sprint(projectIDs), " ", ",", -1), "[]"), strings.Trim(strings.Replace(fmt.Sprint(gfid), " ", ",", -1), "[]"), filter)
	} else {
		spoorthienroll = fmt.Sprintf("SELECT COUNT(id) as spoorthi FROM training_participants WHERE enroll=1 and enroll_date BETWEEN '%s' AND '%s' %s", startDate, endDate, filter)
	}

	err = db.QueryRow(spoorthienroll).Scan(&noofspoorthienroll)
	if err != nil {
		log.Println("noofspoorthienroll", err)
	}
	return noofspoorthienroll
}

func GflParticipantFilternoSpoorthimodule(db *sql.DB, startDate string, endDate string, projectArray []int, gflid int, filter string) int {
	var spoorthimodule string
	var noofspoorthimodule int
	gfid, err := getEmployeeIDsBySupervisorID(db, gflid)
	if err != nil {
		log.Println("Error retrieving employee IDs:", err)
		return 0
	}

	for _, proj := range projectArray {
		projs, _ := getAssociatedProjectList(db, proj)
		if len(projs) > 1 {
			projectArray = append(projectArray, projs...)
		}
	}
	projectIDs := strings.Trim(strings.Replace(fmt.Sprint(projectArray), " ", ",", -1), "[]")
	if len(projectIDs) > 0 {
		spoorthimodule = fmt.Sprintf("SELECT count(module1=1 and module2=1 and module3=1 and module4=1 and module5=1) as noofspoorthimodules FROM SpoorthiBaselineQuestionnaire sb JOIN training_participants t ON t.id=sb.partcipantId where sb.entry_date BETWEEN '%s' and '%s' and t.project_id IN (%s) and sb.GelathiId IN (%s) %s", startDate, endDate, strings.Trim(strings.Replace(fmt.Sprint(projectIDs), " ", ",", -1), "[]"), strings.Trim(strings.Replace(fmt.Sprint(gfid), " ", ",", -1), "[]"), filter)
	} else {
		spoorthimodule = fmt.Sprintf("SELECT count(module1=1 and module2=1 and module3=1 and module4=1 and module5=1) as noofspoorthimodules FROM SpoorthiBaselineQuestionnaire sb JOIN training_participants t ON t.id=sb.partcipantId where sb.entry_date BETWEEN '%s' AND '%s' %s", startDate, endDate, filter)
	}

	err = db.QueryRow(spoorthimodule).Scan(&noofspoorthimodule)
	if err != nil {
		log.Println("noofspoorthimodule", err)
	}
	return noofspoorthimodule
}

func GflParticipantFilternoSpoorthisurvey(db *sql.DB, startDate string, endDate string, projectArray []int, gflid int, filter string) int {
	var spoorthisurvey string
	var noofspoorthisurvey int
	gfid, err := getEmployeeIDsBySupervisorID(db, gflid)
	if err != nil {
		log.Println("Error retrieving employee IDs:", err)
		return 0
	}

	for _, proj := range projectArray {
		projs, _ := getAssociatedProjectList(db, proj)
		if len(projs) > 1 {
			projectArray = append(projectArray, projs...)
		}
	}
	projectIDs := strings.Trim(strings.Replace(fmt.Sprint(projectArray), " ", ",", -1), "[]")
	if len(projectIDs) > 0 {
		spoorthisurvey = fmt.Sprintf("SELECT count(sb.id) as noofspoorthisurvey FROM SpoorthiBaselineQuestionnaire sb join training_participants t on t.id= sb.partcipantId where sb.entry_date BETWEEN '%s' and '%s' and t.project_id IN (%s) and sb.GelathiId IN (%s) %s", startDate, endDate, strings.Trim(strings.Replace(fmt.Sprint(projectIDs), " ", ",", -1), "[]"), strings.Trim(strings.Replace(fmt.Sprint(gfid), " ", ",", -1), "[]"), filter)
	} else {
		spoorthisurvey = fmt.Sprintf("SELECT count(sb.id) as noofspoorthisurvey FROM SpoorthiBaselineQuestionnaire sb join training_participants t on t.id= sb.partcipantId where sb.entry_date BETWEEN '%s' AND '%s' %s", startDate, endDate, filter)
	}

	err = db.QueryRow(spoorthisurvey).Scan(&noofspoorthisurvey)
	if err != nil {
		log.Println("noofspoorthisurvey", err)
	}
	return noofspoorthisurvey
}

func GflParticipantFilternoSpoorthiCirclemeet(db *sql.DB, startDate string, endDate string, projectArray []int, gflid int, filter string) int {
	var spoorthiCircle string
	var noofspoorthiCircle int

	gfid, err := getEmployeeIDsBySupervisorID(db, gflid)
	if err != nil {
		log.Println("Error retrieving employee IDs:", err)
		return 0
	}

	for _, proj := range projectArray {
		projs, _ := getAssociatedProjectList(db, proj)
		if len(projs) > 1 {
			projectArray = append(projectArray, projs...)
		}
	}
	projectIDs := strings.Trim(strings.Replace(fmt.Sprint(projectArray), " ", ",", -1), "[]")
	if len(projectIDs) > 0 {
		spoorthiCircle = fmt.Sprintf("SELECT COUNT(tbl_poa.session_type) AS noofspoorthicircle FROM tbl_poa tbl_poa WHERE tbl_poa.type = 2 AND (tbl_poa.session_type IN (4, 5, 6, 7, 8, 9)) and tbl_poa.date BETWEEN '%s' and '%s' and tbl_poa.project_id IN (%s) and tbl_poa.user_id IN (%s) %s", startDate, endDate, strings.Trim(strings.Replace(fmt.Sprint(projectIDs), " ", ",", -1), "[]"), strings.Trim(strings.Replace(fmt.Sprint(gfid), " ", ",", -1), "[]"), filter)
	} else {
		spoorthiCircle = fmt.Sprintf("SELECT COUNT(tbl_poa.session_type) AS noofspoorthicircle FROM tbl_poa tbl_poa WHERE tbl_poa.type = 2 AND (tbl_poa.session_type IN (4, 5, 6, 7, 8, 9)) and tbl_poa.date BETWEEN '%s' AND '%s' %s", startDate, endDate, filter)
	}

	err = db.QueryRow(spoorthiCircle).Scan(&noofspoorthiCircle)
	if err != nil {
		log.Println("noofspoorthicircle", err)
	}
	return noofspoorthiCircle
}

func GflParticipantFilternoSpoorthiBeehives(db *sql.DB, startDate string, endDate string, projectArray []int, gflid int, filter string) int {
	var spoorthiBeehives string
	var noofspoorthiBeehives int
	gfid, err := getEmployeeIDsBySupervisorID(db, gflid)
	if err != nil {
		log.Println("Error retrieving employee IDs:", err)
		return 0
	}

	for _, proj := range projectArray {
		projs, _ := getAssociatedProjectList(db, proj)
		if len(projs) > 1 {
			projectArray = append(projectArray, projs...)
		}
	}
	projectIDs := strings.Trim(strings.Replace(fmt.Sprint(projectArray), " ", ",", -1), "[]")
	if len(projectIDs) > 0 {
		spoorthiBeehives = fmt.Sprintf("SELECT COUNT(tbl_poa.session_type) AS noofspoorthicircle FROM tbl_poa tbl_poa WHERE tbl_poa.type = 2 AND tbl_poa.session_type = 3 and tbl_poa.date BETWEEN '%s' and '%s' and tbl_poa.project_id IN (%s) and tbl_poa.user_id IN (%s) %s", startDate, endDate, strings.Trim(strings.Replace(fmt.Sprint(projectIDs), " ", ",", -1), "[]"), strings.Trim(strings.Replace(fmt.Sprint(gfid), " ", ",", -1), "[]"), filter)
	} else {
		spoorthiBeehives = fmt.Sprintf("SELECT COUNT(tbl_poa.session_type) AS noofspoorthicircle FROM tbl_poa tbl_poa WHERE tbl_poa.type = 2 AND tbl_poa.session_type = 3 and tbl_poa.date BETWEEN '%s' AND '%s' %s", startDate, endDate, filter)
	}

	err = db.QueryRow(spoorthiBeehives).Scan(&noofspoorthiBeehives)
	if err != nil {
		log.Println("noofspoorthibeehives", err)
	}
	return noofspoorthiBeehives
}

func intArrayToString(arr []int) string {
	strArr := make([]string, len(arr))
	for i, val := range arr {
		strArr[i] = fmt.Sprint(val)
	}
	return strings.Join(strArr, ", ")
}

func GflSpoorthinewVillageCount(db *sql.DB, startDate, endDate string, projectArray []int, gflid int, filter string) int {
	gfid, err := getEmployeeIDsBySupervisorID(db, gflid)
	if err != nil {
		log.Println("Error retrieving employee IDs:", err)
		return 0
	}

	for _, proj := range projectArray {
		projs, _ := getAssociatedProjectList(db, proj)
		if len(projs) > 1 {
			projectArray = append(projectArray, projs...)
		}
	}
	// Remove duplicates from projectArray

	projectArray = uniqueIntSlice(projectArray)

	var villageQuery, subVillageQuery string

	if len(projectArray) > 0 {
		villageQuery = fmt.Sprintf("select COUNT(DISTINCT location_id) from tbl_poa tp join training_participants t on t.project_id =tp.project_id join project p on p.id=t.project_id where t.enroll=1  and tp.date BETWEEN '%s' AND '%s' and t.project_id IN (%s) and tp.user_id IN (%s) %s", startDate, endDate, intArrayToString(projectArray), strings.Trim(strings.Replace(fmt.Sprint(gfid), " ", ",", -1), "[]"), filter)
		subVillageQuery = fmt.Sprintf("SELECT COUNT(DISTINCT sub_village) as 'subVillage' FROM tbl_poa tp join training_participants t on t.project_id =tp.project_id join project p on p.id=t.project_id WHERE t.enroll=1  and tp.date BETWEEN '%s' AND '%s' and t.project_id IN (%s) and tp.user_id IN (%s) %s", startDate, endDate, intArrayToString(projectArray), strings.Trim(strings.Replace(fmt.Sprint(gfid), " ", ",", -1), "[]"), filter)

	} else {
		villageQuery = fmt.Sprintf("select COUNT(DISTINCT location_id) from tbl_poa tp join training_participants t on t.project_id =tp.project_id join project p on p.id=t.project_id where t.enroll=1  and tp.date BETWEEN '%s' AND '%s' %s", startDate, endDate, filter)
		subVillageQuery = fmt.Sprintf("SELECT COUNT(DISTINCT sub_village) as 'subVillage' FROM tbl_poa tp join training_participants t on t.project_id =tp.project_id join project p on p.id=t.project_id WHERE t.enroll=1  and tp.date BETWEEN '%s' AND '%s' %s", startDate, endDate, filter)
	}

	villageResult, err := db.Query(villageQuery)
	if err != nil {
		return 0
	}
	defer villageResult.Close()

	var villageCount int
	for villageResult.Next() {
		if err := villageResult.Scan(&villageCount); err != nil {
			return 0
		}
	}

	subVillageResult, err := db.Query(subVillageQuery)
	if err != nil {
		return 0
	}
	defer subVillageResult.Close()

	var subVillageCount int
	for subVillageResult.Next() {
		if err := subVillageResult.Scan(&subVillageCount); err != nil {
			return 0
		}
	}

	return villageCount + subVillageCount
}
