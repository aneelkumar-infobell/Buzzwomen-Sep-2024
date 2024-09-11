package spoorthi

import (
	"database/sql"
	"fmt"
	"log"
	"strconv"
	"strings"

	_ "github.com/go-sql-driver/mysql"
)

func getAssociatedProjectList(con *sql.DB, projID int) ([]int, error) {
	projArray := []int{}
	if projID != 0 {
		getProjList := fmt.Sprintf("SELECT associatedProject FROM project_association WHERE projectId IN (%d)", projID)
		projArray = append(projArray, projID)
		res, err := con.Query(getProjList)
		if err != nil {
			return nil, err
		}
		defer res.Close()

		for res.Next() {
			var associatedProject int
			if err := res.Scan(&associatedProject); err != nil {
				return nil, err
			}
			projArray = append(projArray, associatedProject)
		}
	}

	return projArray, nil
}

func nagarikaEnrolled(db *sql.DB, startDate string, endDate string, projectArray []int, filter string) int {
	var spoorthienroll string
	var noofspoorthienroll int
	for _, proj := range projectArray {
		projs, _ := getAssociatedProjectList(db, proj)
		if len(projs) > 1 {
			projectArray = append(projectArray, projs...)
		}
	}
	// Remove duplicates from projectArray
	projectArray = removeDuplicates(projectArray)

	if len(projectArray) > 0 {
		if startDate != "" && endDate != "" {
			spoorthienroll = fmt.Sprintf("SELECT COUNT(id) as spoorthi FROM training_participants WHERE nagarikaenrollment=1 and nagarikaenrollmentdate BETWEEN '%s' and '%s' and project_id IN (%s) %s", startDate, endDate, strings.Trim(strings.Replace(fmt.Sprint(projectArray), " ", ",", -1), "[]"), filter)
		} else {
			spoorthienroll = fmt.Sprintf("SELECT COUNT(id) as spoorthi FROM training_participants WHERE nagarikaenrollment=1 and project_id IN (%s) %s", strings.Trim(strings.Replace(fmt.Sprint(projectArray), " ", ",", -1), "[]"), filter)
		}
	} else {
		spoorthienroll = fmt.Sprintf("SELECT COUNT(id) as spoorthi FROM training_participants WHERE nagarikaenrollment=1 and nagarikaenrollmentdate BETWEEN '%s' and '%s'", startDate, endDate)
	}

	fmt.Println("nagarikaenroll", spoorthienroll)
	err := db.QueryRow(spoorthienroll).Scan(&noofspoorthienroll)
	if err != nil {
		log.Println("noofspoorthienroll", err)
	}
	return noofspoorthienroll
}

func spoorthiModule(db *sql.DB, startDate string, endDate string, projectArray []int, filter string) int {
	var spoorthimodule string
	var noofspoorthimodule int
	for _, proj := range projectArray {
		projs, _ := getAssociatedProjectList(db, proj)
		if len(projs) > 1 {
			projectArray = append(projectArray, projs...)
		}
	}
	// Remove duplicates from projectArray
	projectArray = removeDuplicates(projectArray)

	if len(projectArray) > 0 {
		if startDate != "" && endDate != "" {
			spoorthimodule = fmt.Sprintf("SELECT count(module1=1 and module2=1 and module3=1 and module4=1 and module5=1 and module6=1) as noofspoorthimodules FROM nagarikaprogramquestionnaire sb JOIN training_participants t ON t.id=sb.partcipantId where sb.entrydate BETWEEN '%s' and '%s' and t.project_id IN (%s) %s", startDate, endDate, strings.Trim(strings.Replace(fmt.Sprint(projectArray), " ", ",", -1), "[]"), filter)
		} else {
			spoorthimodule = fmt.Sprintf("SELECT count(module1=1 and module2=1 and module3=1 and module4=1 and module5=1 and module6=1) as noofspoorthimodules FROM nagarikaprogramquestionnaire sb JOIN training_participants t ON t.id=sb.partcipantId where t.project_id IN (%s) %s", strings.Trim(strings.Replace(fmt.Sprint(projectArray), " ", ",", -1), "[]"), filter)
		}
	} else {
		spoorthimodule = fmt.Sprintf("SELECT count(module1=1 and module2=1 and module3=1 and module4=1 and module5=1 and module6=1) as noofspoorthimodules FROM nagarikaprogramquestionnaire sb JOIN training_participants t ON t.id=sb.partcipantId where sb.entrydate BETWEEN '%s' and '%s'", startDate, endDate)
	}

	err := db.QueryRow(spoorthimodule).Scan(&noofspoorthimodule)
	if err != nil {
		log.Println("noofnagarikamodule", err)
	}
	return noofspoorthimodule
}

func spoorthiSurvey(db *sql.DB, startDate string, endDate string, projectArray []int, filter string) int {
	var spoorthisurvey string
	var noofspoorthisurvey int
	for _, proj := range projectArray {
		projs, _ := getAssociatedProjectList(db, proj)
		if len(projs) > 1 {
			projectArray = append(projectArray, projs...)
		}
	}

	if len(projectArray) > 0 {
		if startDate != "" && endDate != "" {
			spoorthisurvey = fmt.Sprintf("SELECT count(sb.id) as noofspoorthisurvey FROM nagarikaprogramquestionnaire sb join training_participants t on t.id= sb.partcipantId where sb.entrydate BETWEEN '%s' and '%s' and t.project_id IN (%s) %s", startDate, endDate, strings.Trim(strings.Replace(fmt.Sprint(projectArray), " ", ",", -1), "[]"), filter)
		} else {
			spoorthisurvey = fmt.Sprintf("SELECT count(sb.id) as noofspoorthisurvey FROM nagarikaprogramquestionnaire sb join training_participants t on t.id= sb.partcipantId where t.project_id IN (%s) %s", strings.Trim(strings.Replace(fmt.Sprint(projectArray), " ", ",", -1), "[]"), filter)
		}
	} else {
		spoorthisurvey = fmt.Sprintf("SELECT count(sb.id) as noofspoorthisurvey FROM nagarikaprogramquestionnaire sb join training_participants t on t.id= sb.partcipantId where sb.entrydate BETWEEN '%s' and '%s'", startDate, endDate)
	}

	err := db.QueryRow(spoorthisurvey).Scan(&noofspoorthisurvey)
	if err != nil {
		log.Println("nagariksurvey", err)
	}
	return noofspoorthisurvey
}

func noofCircleMeeting(db *sql.DB, startDate string, endDate string, projectArray []int, filter string) int {
	var noofcirclemeeting string
	var noofcirclemeet int
	for _, proj := range projectArray {
		projs, _ := getAssociatedProjectList(db, proj)
		if len(projs) > 1 {
			projectArray = append(projectArray, projs...)
		}
	}
	// Remove duplicates from projectArray
	projectArray = removeDuplicates(projectArray)

	if len(projectArray) > 0 {
		if startDate != "" && endDate != "" {
			noofcirclemeeting = fmt.Sprintf("SELECT COUNT(tbl_poa.session_type) AS noofspoorthicircle FROM tbl_poa tbl_poa WHERE tbl_poa.type = 2 AND (tbl_poa.session_type IN (22, 23, 24, 25, 26, 27,28)) and tbl_poa.date BETWEEN '%s' and '%s' and tbl_poa.project_id IN (%s) %s", startDate, endDate, strings.Trim(strings.Replace(fmt.Sprint(projectArray), " ", ",", -1), "[]"), filter)
		} else {
			noofcirclemeeting = fmt.Sprintf("SELECT COUNT(tbl_poa.session_type) AS noofspoorthicircle FROM tbl_poa tbl_poa WHERE tbl_poa.type = 2 AND (tbl_poa.session_type IN (22, 23, 24, 25, 26, 27,28)) and tbl_poa.project_id IN (%s) %s", strings.Trim(strings.Replace(fmt.Sprint(projectArray), " ", ",", -1), "[]"), filter)
		}
	} else {
		noofcirclemeeting = fmt.Sprintf("SELECT COUNT(tbl_poa.session_type) AS noofspoorthicircle FROM tbl_poa tbl_poa WHERE tbl_poa.type = 2 AND (tbl_poa.session_type IN (22, 23, 24, 25, 26, 27,28)) and tbl_poa.date BETWEEN '%s' and '%s'", startDate, endDate)
	}

	err := db.QueryRow(noofcirclemeeting).Scan(&noofcirclemeet)
	if err != nil {
		log.Println("nagarikacirclemeeting", err)
	}
	return noofcirclemeet
}

func noofBeehives(db *sql.DB, startDate string, endDate string, projectArray []int, filter string) int {
	var beehives string
	var noofbeehives int
	for _, proj := range projectArray {
		projs, _ := getAssociatedProjectList(db, proj)
		if len(projs) > 1 {
			projectArray = append(projectArray, projs...)
		}
	}
	// Remove duplicates from projectArray
	projectArray = removeDuplicates(projectArray)

	if len(projectArray) > 0 {
		if startDate != "" && endDate != "" {
			beehives = fmt.Sprintf("SELECT COUNT(tbl_poa.session_type) AS noofspoorthicircle FROM tbl_poa tbl_poa WHERE tbl_poa.type = 2 AND tbl_poa.session_type = 3 and tbl_poa.date BETWEEN '%s' and '%s' and tbl_poa.project_id IN (%s) %s", startDate, endDate, strings.Trim(strings.Replace(fmt.Sprint(projectArray), " ", ",", -1), "[]"), filter)
		} else {
			beehives = fmt.Sprintf("SELECT COUNT(tbl_poa.session_type) AS noofspoorthicircle FROM tbl_poa tbl_poa WHERE tbl_poa.type = 2 AND tbl_poa.session_type = 3 and tbl_poa.project_id IN (%s) %s", strings.Trim(strings.Replace(fmt.Sprint(projectArray), " ", ",", -1), "[]"), filter)
		}
	} else {
		beehives = fmt.Sprintf("SELECT COUNT(tbl_poa.session_type) AS noofspoorthicircle FROM tbl_poa tbl_poa WHERE tbl_poa.type = 2 AND tbl_poa.session_type = 3 and tbl_poa.date BETWEEN '%s' and '%s'", startDate, endDate)
	}

	err := db.QueryRow(beehives).Scan(&noofbeehives)
	if err != nil {
		log.Println("noofbeehives", err)
	}
	return noofbeehives
}

func newVillageCount(db *sql.DB, startDate string, endDate string, gfID string, projectArray []int, empid string) int {

	var villageQuery, subVillageQuery string
	var villageCount, subVillageCount int

	for _, proj := range projectArray {
		projs, _ := getAssociatedProjectList(db, proj)
		if len(projs) > 1 {
			projectArray = append(projectArray, projs...)
		}
	}

	// Remove duplicates from projectArray
	projectArray = removeDuplicates(projectArray)

	if len(projectArray) > 0 {
		if startDate != "" && endDate != "" {
			villageQuery = fmt.Sprintf("SELECT COUNT(distinct tp.location_id) as villages FROM tbl_poa tp INNER JOIN training_participants tr on tr.tb_id=tp.tb_id join project p on p.id=tr.project_id where (enroll=1) and tr.project_id in (%s) and tp.date between %s and %s ;", strings.Trim(strings.Replace(fmt.Sprint(projectArray), " ", ",", -1), "[]"), startDate, endDate)
			subVillageQuery = fmt.Sprintf("SELECT COUNT(distinct tp.sub_village) as sub_villages FROM tbl_poa tp INNER JOIN training_participants tr on tr.tb_id=tp.tb_id join project p on p.id=tr.project_id where (enroll=1) and tr.project_id in (%s) and tp.date between %s and %s", strings.Trim(strings.Replace(fmt.Sprint(projectArray), " ", ",", -1), "[]"), startDate, endDate)
		} else if len(projectArray) > 0 {
			villageQuery = fmt.Sprintf("SELECT COUNT(distinct tp.location_id) as villages FROM tbl_poa tp INNER JOIN training_participants tr on tr.tb_id=tp.tb_id join project p on p.id=tr.project_id where (enroll=1) and tr.project_id in (%s) and tp.user_id = %s", strings.Trim(strings.Replace(fmt.Sprint(projectArray), " ", ",", -1), "[]"), empid)
			subVillageQuery = fmt.Sprintf("SELECT COUNT(distinct tp.sub_village) as sub_villages FROM tbl_poa tp INNER JOIN training_participants tr on tr.tb_id=tp.tb_id join project p on p.id=tr.project_id where (enroll=1) and tr.project_id in (%s) and tp.user_id = %s", strings.Trim(strings.Replace(fmt.Sprint(projectArray), " ", ",", -1), "[]"), empid)
		} else if gfID != "" && len(projectArray) > 0 {
			villageQuery = fmt.Sprintf("SELECT COUNT(distinct tp.location_id) as villages FROM tbl_poa tp INNER JOIN training_participants tr on tr.tb_id=tp.tb_id join project p on p.id=tr.project_id where (enroll=1) and tr.project_id in (%s)  and tp.user_id = %s", strings.Trim(strings.Replace(fmt.Sprint(projectArray), " ", ",", -1), "[]"), gfID)
			subVillageQuery = fmt.Sprintf("SELECT COUNT(distinct tp.sub_village) as sub_villages FROM tbl_poa tp INNER JOIN training_participants tr on tr.tb_id=tp.tb_id join project p on p.id=tr.project_id where (enroll=1) and tr.project_id in (%s) and tp.user_id = %s", strings.Trim(strings.Replace(fmt.Sprint(projectArray), " ", ",", -1), "[]"), gfID)
		}
		// } else {
		// 	villageQuery = fmt.Sprintf("SELECT COUNT(distinct tp.location_id) as villages FROM tbl_poa tp INNER JOIN training_participants tr on tr.tb_id=tp.tb_id join project p on p.id=tr.project_id where (enroll=1) ")
		// 	subVillageQuery = fmt.Sprintf("SELECT COUNT(distinct tp.sub_village) as sub_villages FROM tbl_poa tp INNER JOIN training_participants tr on tr.tb_id=tp.tb_id join project p on p.id=tr.project_id where (enroll=1) ")

	}
	row := db.QueryRow(villageQuery)
	row.Scan(&villageCount)
	row = db.QueryRow(subVillageQuery)
	row.Scan(&subVillageCount)
	return villageCount + subVillageCount
}

func GetNoOfspoorthibevee(db *sql.DB, startDate string, endDate string, projectArray []int, gfId string, empid string) int {

	var getActualsQuery string
	var noofspoorthisurvey int

	for _, proj := range projectArray {
		projs, _ := getAssociatedProjectList(db, proj)
		if len(projs) > 1 {
			projectArray = append(projectArray, projs...)
		}
	}

	// Remove duplicates from projectArray
	projectArray = removeDuplicates(projectArray)

	if len(projectArray) > 0 {
		if startDate != "" && endDate != "" {
			getActualsQuery = fmt.Sprintf("SELECT count(tbl_poa.id) as noofbeehvees FROM tbl_poa INNER JOIN project on project.id=tbl_poa.project_id   where tbl_poa.type = 2 AND tbl_poa.session_type = 3 and tbl_poa.project_id in (%s) and project.startDate between %s and %s", strings.Trim(strings.Replace(fmt.Sprint(projectArray), " ", ",", -1), "[]"), startDate, endDate)
		} else if len(projectArray) > 0 {
			getActualsQuery = fmt.Sprintf("SELECT count(tbl_poa.id) as noofbeehvees FROM tbl_poa INNER JOIN project on project.id=tbl_poa.project_id   where tbl_poa.type = 2 AND tbl_poa.session_type = 3 and tbl_poa.project_id in (%s) and tbl_poa.user_id=%s", strings.Trim(strings.Replace(fmt.Sprint(projectArray), " ", ",", -1), "[]"), empid)
		} else if gfId != "" && len(projectArray) > 0 {
			getActualsQuery = fmt.Sprintf("SELECT count(tbl_poa.id) as noofbeehvees FROM tbl_poa INNER JOIN project on project.id=tbl_poa.project_id   where tbl_poa.type = 2 AND tbl_poa.session_type = 3 and tbl_poa.project_id in (%s) and tbl_poa.user_id=%s", strings.Trim(strings.Replace(fmt.Sprint(projectArray), " ", ",", -1), "[]"), gfId)
		}
	} else {
		getActualsQuery = ("SELECT count(tbl_poa.id) as noofbeehvees FROM tbl_poa INNER JOIN project on project.id=tbl_poa.project_id   where tbl_poa.type = 2 AND tbl_poa.session_type = 3")
	}

	err := db.QueryRow(getActualsQuery).Scan(&noofspoorthisurvey)
	if err != nil {
		log.Println("GetNoOfspoorthiSurvey", err)
	}
	return noofspoorthisurvey
}

func removeDuplicates(arr []int) []int {
	encountered := map[int]bool{}
	result := []int{}

	for _, item := range arr {
		if !encountered[item] {
			encountered[item] = true
			result = append(result, item)
		}
	}

	return result
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
		log.Println("getTarget", err)
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

func intsToString(ints []int) string {
	var stringSlice []string
	for _, i := range ints {
		stringSlice = append(stringSlice, strconv.Itoa(i))
	}
	return strings.Join(stringSlice, ",")
}

func GetOpsManagers(db *sql.DB, empId int) []int {
	getOpsIds := fmt.Sprintf("SELECT id FROM employee WHERE supervisorId = %d AND empRole = 4", empId)
	ids := make([]int, 0)
	res, err := db.Query(getOpsIds)
	if err != nil {
		log.Println("getOpsManagers", err)
	}
	defer res.Close()

	for res.Next() {
		var id int
		if err := res.Scan(&id); err != nil {
			log.Println("getOpsManagers", err)
		}
		ids = append(ids, id)
	}
	return ids
}

func getSupervisor(db *sql.DB, empId int) []int {
	getOpsIds := fmt.Sprintf("SELECT supervisorId FROM employee WHERE id = %d", empId)
	ids := make([]int, 0)
	res, err := db.Query(getOpsIds)
	if err != nil {
		log.Println("getSupervisor", err)
	}
	defer res.Close()

	for res.Next() {
		var supervisorId int
		if err := res.Scan(&supervisorId); err != nil {
			log.Println("getSupervisor", err)
		}
		ids = append(ids, supervisorId)
	}
	return ids
}

func getReportingOpsManagers(db *sql.DB, empId int) []int {
	ids := []int{}

	getOpsIds := "SELECT id FROM employee WHERE supervisorId = ? AND empRole = 4"
	res, err := db.Query(getOpsIds, empId)
	if err != nil {
		log.Println("getReportingOpsManagers", err)
	}
	defer res.Close()

	for res.Next() {
		var id int
		err := res.Scan(&id)
		if err != nil {
			log.Println("getReportingOpsManagers", err)
		}
		ids = append(ids, id)
	}

	getOpsIds = "SELECT id FROM employee WHERE supervisorId = ? AND empRole = 12"
	res, err = db.Query(getOpsIds, empId)
	if err != nil {
		log.Println("getReportingOpsManagers", err)
	}
	defer res.Close()

	for res.Next() {
		var id int
		err := res.Scan(&id)
		if err != nil {
			log.Println("getReportingOpsManagers", err)
		}
		ids = append(ids, id)
		som := id
		getOpsIds = "SELECT id FROM employee WHERE supervisorId = ? AND empRole = 4"
		res, err = db.Query(getOpsIds, som)
		if err != nil {
			log.Println("getReportingOpsManagers", err)
		}
		defer res.Close()

		for res.Next() {
			var id int
			err := res.Scan(&id)
			if err != nil {
				log.Println("getReportingOpsManagers", err)
			}
			ids = append(ids, id)
		}
	}

	return ids
}

func getOpProjects(db *sql.DB, empID int) []int {
	// var projectId int
	// getProjIds := fmt.Sprintf("SELECT DISTINCT tr.project_id, prj.endDate FROM project prj INNER JOIN training_participants tr ON tr.project_id = prj.id WHERE prj.operations_manager = %d AND tr.VyaparEnrollment = 1", empID)

	// getProjIds := fmt.Sprintf("SELECT distinct(tr.project_id) FROM project prj,training_participants tr WHERE prj.operations_manager = %d and tr.VyaparEnrollment=1 and tr.project_id=prj.id", empID)

	getProjIds := fmt.Sprintf("SELECT id FROM project WHERE operations_manager = %d GROUP BY id", empID)
	rows, err := db.Query(getProjIds)
	if err != nil {
		log.Println("getOpProjects", err)
	}
	defer rows.Close()

	var ids []int
	for rows.Next() {
		var id int
		if err := rows.Scan(&id); err != nil {
			log.Println("getOpProjects", err)
		}
		ids = append(ids, id)
	}
	if err := rows.Err(); err != nil {
		log.Println("getOpProjects", err)
	}

	return ids
}

func getTrainerTarget(db *sql.DB, empId int, projectArray []int) int {
	targetQuery := fmt.Sprintf("SELECT sum(target) as total from project_emps pe where emp_id = %d and project_id in (%s)",
		empId, strings.Trim(strings.Replace(fmt.Sprint(projectArray), " ", ",", -1), "[]"))
	var total sql.NullInt64
	err := db.QueryRow(targetQuery).Scan(&total)
	if err != nil {
		log.Println("getTrainerTarget", err)
	}
	if !total.Valid {
		return 0
	}
	return int(total.Int64)
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

func intArrayToString(arr []int) string {
	strArr := make([]string, len(arr))
	for i, val := range arr {
		strArr[i] = fmt.Sprint(val)
	}
	return strings.Join(strArr, ", ")
}

func SpoorthinewVillageCount(con *sql.DB, startDate, endDate string, projectArray []int, filter string) (int, error) {
	for _, proj := range projectArray {
		projs, _ := getAssociatedProjectList(con, proj)
		if len(projs) > 1 {
			projectArray = append(projectArray, projs...)
		}
	}
	// Remove duplicates from projectArray
	projectArray = removeDuplicates(projectArray)

	projectArray = uniqueIntSlice(projectArray)

	var villageQuery, subVillageQuery string

	if len(projectArray) > 0 {
		villageQuery = fmt.Sprintf("select COUNT(DISTINCT location_id) from tbl_poa tp join training_participants t on t.project_id =tp.project_id where t.nagarikaenrollment = 1 and t.project_id IN (%s)", intArrayToString(projectArray))
		subVillageQuery = fmt.Sprintf("SELECT COUNT(DISTINCT sub_village) as 'subVillage' FROM tbl_poa tp join training_participants t on t.project_id =tp.project_id WHERE t.nagarikaenrollment = 1 and t.project_id IN (%s)", intArrayToString(projectArray))

		if startDate != "" && endDate != "" {
			villageQuery += fmt.Sprintf(" AND tp.date BETWEEN '%s' AND '%s'", startDate, endDate)
			subVillageQuery += fmt.Sprintf(" AND tp.date BETWEEN '%s' AND '%s'", startDate, endDate)
		}
	} else {
		villageQuery = fmt.Sprintf("select COUNT(DISTINCT location_id) from tbl_poa tp  INNER JOIN project p ON p.id = tp.project_id join training_participants t on t.project_id =tp.project_id where t.nagarikaenrollment = 1 AND p.startDate >= '%s' AND p.endDate <= '%s' %s", startDate, endDate, filter)
		subVillageQuery = fmt.Sprintf("SELECT COUNT(DISTINCT sub_village) as 'subVillage' FROM tbl_poa tp INNER JOIN project p ON p.id = tp.project_id join training_participants t on t.project_id =tp.project_id WHERE t.nagarikaenrollment = 1 AND p.startDate >= '%s' AND p.endDate <= '%s' %s", startDate, endDate, filter)
	}

	villageResult, err := con.Query(villageQuery)
	if err != nil {
		return 0, err
	}
	defer villageResult.Close()

	var villageCount int
	for villageResult.Next() {
		if err := villageResult.Scan(&villageCount); err != nil {
			return 0, err
		}
	}

	subVillageResult, err := con.Query(subVillageQuery)
	if err != nil {
		return 0, err
	}
	defer subVillageResult.Close()

	var subVillageCount int
	for subVillageResult.Next() {
		if err := subVillageResult.Scan(&subVillageCount); err != nil {
			return 0, err
		}
	}

	return villageCount + subVillageCount, nil
}
func GfSpoorthiVillageCount(db *sql.DB, startDate string, endDate string, projectArray []int, user_id string) int {
	var villageCount, subVillageCount int
	for _, proj := range projectArray {
		projs, _ := getAssociatedProjectList(db, proj)
		if len(projs) > 1 {
			projectArray = append(projectArray, projs...)
		}
	}
	// Remove duplicates from projectArray
	projectArray = removeDuplicates(projectArray)

	if len(projectArray) > 0 {
		// Build the project IDs string for the SQL query
		projectIDs := strings.Trim(strings.Join(strings.Fields(fmt.Sprint(projectArray)), ","), "[]")

		villageQuery := fmt.Sprintf("select COUNT(DISTINCT location_id) from tbl_poa tp join training_participants t on t.project_id =tp.project_id where t.nagarikaenrollment = 1 and t.project_id IN (%s) AND tp.user_id = %s", projectIDs, user_id)
		subVillageQuery := fmt.Sprintf("SELECT COUNT(DISTINCT sub_village) as 'subVillage' FROM tbl_poa tp join training_participants t on t.project_id =tp.project_id WHERE t.nagarikaenrollment = 1 and t.project_id IN (%s) AND tp.user_id = %s", projectIDs, user_id)

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
		villageQuery := fmt.Sprintf("select COUNT(DISTINCT location_id) from tbl_poa tp  INNER JOIN project p ON p.id = tp.project_id join training_participants t on t.project_id =tp.project_id where t.nagarikaenrollment = 1 AND p.startDate >= '%s' AND p.endDate <= '%s' AND tp.user_id = %s", startDate, endDate, user_id)
		subVillageQuery := fmt.Sprintf("SELECT COUNT(DISTINCT sub_village) as 'subVillage' FROM tbl_poa tp INNER JOIN project p ON p.id = tp.project_id join training_participants t on t.project_id =tp.project_id WHERE t.nagarikaenrollment = 1 AND p.startDate >= '%s' AND p.endDate <= '%s' AND tp.user_id = %s", startDate, endDate, user_id)

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

func GflspoorthiEnrolled(db *sql.DB, startDate string, endDate string, projectArray []int, gflid int, filter string) int {
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
	// Remove duplicates from projectArray
	projectArray = removeDuplicates(projectArray)

	if len(projectArray) > 0 {
		if startDate != "" && endDate != "" {
			spoorthienroll = fmt.Sprintf("SELECT COUNT(id) as spoorthi FROM training_participants WHERE nagarikaenrollment=1 and nagarikaenrollmentdate BETWEEN '%s' and '%s' and project_id IN (%s) and gelathi_id IN (%s) %s", startDate, endDate, strings.Trim(strings.Replace(fmt.Sprint(projectArray), " ", ",", -1), "[]"), strings.Trim(strings.Replace(fmt.Sprint(gfid), " ", ",", -1), "[]"), filter)
		} else {
			spoorthienroll = fmt.Sprintf("SELECT COUNT(id) as spoorthi FROM training_participants WHERE nagarikaenrollment=1 and project_id IN (%s) and gelathi_id IN (%s) %s", strings.Trim(strings.Replace(fmt.Sprint(projectArray), " ", ",", -1), "[]"), strings.Trim(strings.Replace(fmt.Sprint(gfid), " ", ",", -1), "[]"), filter)
		}
	} else {
		spoorthienroll = fmt.Sprintf("SELECT COUNT(id) as spoorthi FROM training_participants WHERE nagarikaenrollment=1 and nagarikaenrollmentdate BETWEEN '%s' and '%s'", startDate, endDate)
	}

	err = db.QueryRow(spoorthienroll).Scan(&noofspoorthienroll)
	if err != nil {
		log.Println("noofspoorthienroll", err)
	}
	return noofspoorthienroll
}

func GflspoorthiModule(db *sql.DB, startDate string, endDate string, projectArray []int, gflid int, filter string) int {
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
	// Remove duplicates from projectArray
	projectArray = removeDuplicates(projectArray)

	if len(projectArray) > 0 {
		if startDate != "" && endDate != "" {
			spoorthimodule = fmt.Sprintf("SELECT count(module1=1 and module2=1 and module3=1 and module4=1 and module5=1 and module6=1) as noofspoorthimodules FROM nagarikaprogramquestionnaire sb JOIN training_participants t ON t.id=sb.partcipantId where sb.entrydate BETWEEN '%s' and '%s' and t.project_id IN (%s) and sb.GelathiId IN (%s) %s", startDate, endDate, strings.Trim(strings.Replace(fmt.Sprint(projectArray), " ", ",", -1), "[]"), strings.Trim(strings.Replace(fmt.Sprint(gfid), " ", ",", -1), "[]"), filter)
		} else {
			spoorthimodule = fmt.Sprintf("SELECT count(module1=1 and module2=1 and module3=1 and module4=1 and module5=1 and module6=1) as noofspoorthimodules FROM nagarikaprogramquestionnaire sb JOIN training_participants t ON t.id=sb.partcipantId where t.project_id IN (%s) and sb.GelathiId IN (%s) %s", strings.Trim(strings.Replace(fmt.Sprint(projectArray), " ", ",", -1), "[]"), strings.Trim(strings.Replace(fmt.Sprint(gfid), " ", ",", -1), "[]"), filter)
		}
	} else {
		spoorthimodule = fmt.Sprintf("SELECT count(module1=1 and module2=1 and module3=1 and module4=1 and module5=1 and module6=1) as noofspoorthimodules FROM nagarikaprogramquestionnaire sb JOIN training_participants t ON t.id=sb.partcipantId where sb.entrydate BETWEEN '%s' and '%s'", startDate, endDate)
	}

	err = db.QueryRow(spoorthimodule).Scan(&noofspoorthimodule)
	if err != nil {
		log.Println("noofspoorthimodule", err)
	}
	return noofspoorthimodule
}

func GflspoorthiSurvey(db *sql.DB, startDate string, endDate string, projectArray []int, gflid int, filter string) int {
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
	// Remove duplicates from projectArray
	projectArray = removeDuplicates(projectArray)

	if len(projectArray) > 0 {
		if startDate != "" && endDate != "" {
			spoorthisurvey = fmt.Sprintf("SELECT count(sb.id) as noofspoorthisurvey FROM nagarikaprogramquestionnaire sb join training_participants t on t.id= sb.partcipantId where sb.entrydate BETWEEN '%s' and '%s' and t.project_id IN (%s) and sb.GelathiId IN (%s) %s", startDate, endDate, strings.Trim(strings.Replace(fmt.Sprint(projectArray), " ", ",", -1), "[]"), strings.Trim(strings.Replace(fmt.Sprint(gfid), " ", ",", -1), "[]"), filter)
		} else {
			spoorthisurvey = fmt.Sprintf("SELECT count(sb.id) as noofspoorthisurvey FROM nagarikaprogramquestionnaire sb join training_participants t on t.id= sb.partcipantId where t.project_id IN (%s) and sb.GelathiId IN (%s) %s", strings.Trim(strings.Replace(fmt.Sprint(projectArray), " ", ",", -1), "[]"), strings.Trim(strings.Replace(fmt.Sprint(gfid), " ", ",", -1), "[]"), filter)
		}
	} else {
		spoorthisurvey = fmt.Sprintf("SELECT count(sb.id) as noofspoorthisurvey FROM nagarikaprogramquestionnaire sb join training_participants t on t.id= sb.partcipantId where sb.entrydate BETWEEN '%s' and '%s'", startDate, endDate)
	}

	err = db.QueryRow(spoorthisurvey).Scan(&noofspoorthisurvey)
	if err != nil {
		log.Println("noofspoorthisurvey", err)
	}
	return noofspoorthisurvey
}

func GflnoofCircleMeeting(db *sql.DB, startDate string, endDate string, projectArray []int, gflid int, filter string) int {
	var noofcirclemeeting string
	var noofcirclemeet int
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
	projectArray = removeDuplicates(projectArray)

	if len(projectArray) > 0 {
		if startDate != "" && endDate != "" {
			noofcirclemeeting = fmt.Sprintf("SELECT COUNT(tbl_poa.session_type) AS noofspoorthicircle FROM tbl_poa tbl_poa WHERE tbl_poa.type = 2 AND (tbl_poa.session_type IN (22,23,24,25,26,27,28)) and tbl_poa.date BETWEEN '%s' and '%s' and tbl_poa.project_id IN (%s) and tbl_poa.user_id IN (%s) %s", startDate, endDate, strings.Trim(strings.Replace(fmt.Sprint(projectArray), " ", ",", -1), "[]"), strings.Trim(strings.Replace(fmt.Sprint(gfid), " ", ",", -1), "[]"), filter)
		} else {
			noofcirclemeeting = fmt.Sprintf("SELECT COUNT(tbl_poa.session_type) AS noofspoorthicircle FROM tbl_poa tbl_poa WHERE tbl_poa.type = 2 AND (tbl_poa.session_type IN (22,23,24,25,26,27,28)) and tbl_poa.project_id IN (%s) and tbl_poa.user_id IN (%s) %s", strings.Trim(strings.Replace(fmt.Sprint(projectArray), " ", ",", -1), "[]"), strings.Trim(strings.Replace(fmt.Sprint(gfid), " ", ",", -1), "[]"), filter)
		}
	} else {
		noofcirclemeeting = fmt.Sprintf("SELECT COUNT(tbl_poa.session_type) AS noofspoorthicircle FROM tbl_poa tbl_poa WHERE tbl_poa.type = 2 AND (tbl_poa.session_type IN (22,23,24,25,26,27,28)) and tbl_poa.date BETWEEN '%s' and '%s'", startDate, endDate)
	}

	err = db.QueryRow(noofcirclemeeting).Scan(&noofcirclemeet)
	if err != nil {
		log.Println("noofcirclemeeting", err)
	}
	return noofcirclemeet
}

func GflnoofBeehives(db *sql.DB, startDate string, endDate string, projectArray []int, gflid int, filter string) int {
	var beehives string
	var noofbeehives int
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
	projectArray = removeDuplicates(projectArray)

	if len(projectArray) > 0 {
		if startDate != "" && endDate != "" {
			beehives = fmt.Sprintf("SELECT COUNT(tbl_poa.session_type) AS noofspoorthicircle FROM tbl_poa tbl_poa WHERE tbl_poa.type = 2 AND tbl_poa.session_type = 3 and tbl_poa.date BETWEEN '%s' and '%s' and tbl_poa.project_id IN (%s) and tbl_poa.user_id IN (%s) %s", startDate, endDate, strings.Trim(strings.Replace(fmt.Sprint(projectArray), " ", ",", -1), "[]"), strings.Trim(strings.Replace(fmt.Sprint(gfid), " ", ",", -1), "[]"), filter)
		} else {
			beehives = fmt.Sprintf("SELECT COUNT(tbl_poa.session_type) AS noofspoorthicircle FROM tbl_poa tbl_poa WHERE tbl_poa.type = 2 AND tbl_poa.session_type = 3 and tbl_poa.project_id IN (%s) and tbl_poa.user_id IN (%s) %s", strings.Trim(strings.Replace(fmt.Sprint(projectArray), " ", ",", -1), "[]"), strings.Trim(strings.Replace(fmt.Sprint(gfid), " ", ",", -1), "[]"), filter)
		}
	} else {
		beehives = fmt.Sprintf("SELECT COUNT(tbl_poa.session_type) AS noofspoorthicircle FROM tbl_poa tbl_poa WHERE tbl_poa.type = 2 AND tbl_poa.session_type = 3 and tbl_poa.date BETWEEN '%s' and '%s'", startDate, endDate)
	}

	err = db.QueryRow(beehives).Scan(&noofbeehives)
	if err != nil {
		log.Println("noofbeehives", err)
	}
	return noofbeehives
}
func GflSpoorthinewVillageCount(con *sql.DB, startDate, endDate string, projectArray []int, gflid int, filter string) int {
	gfid, err := getEmployeeIDsBySupervisorID(con, gflid)
	if err != nil {
		log.Println("Error retrieving employee IDs:", err)
		return 0
	}

	for _, proj := range projectArray {
		projs, _ := getAssociatedProjectList(con, proj)
		if len(projs) > 1 {
			projectArray = append(projectArray, projs...)
		}
	}
	// Remove duplicates from projectArray
	projectArray = removeDuplicates(projectArray)

	projectArray = uniqueIntSlice(projectArray)

	var villageQuery, subVillageQuery string

	if len(projectArray) > 0 {
		villageQuery = fmt.Sprintf("select COUNT(DISTINCT location_id) from tbl_poa tp join training_participants t on t.project_id =tp.project_id join project p on p.id=t.project_id where t.nagarikaenrollment = 1 and t.project_id IN (%s) and tp.user_id IN (%s) %s", intArrayToString(projectArray), strings.Trim(strings.Replace(fmt.Sprint(gfid), " ", ",", -1), "[]"), filter)
		subVillageQuery = fmt.Sprintf("SELECT COUNT(DISTINCT sub_village) as 'subVillage' FROM tbl_poa tp join training_participants t on t.project_id =tp.project_id join project p on p.id=t.project_id WHERE t.nagarikaenrollment = 1 and t.project_id IN (%s) and tp.user_id IN (%s) %s", intArrayToString(projectArray), strings.Trim(strings.Replace(fmt.Sprint(gfid), " ", ",", -1), "[]"), filter)

		if startDate != "" && endDate != "" {
			villageQuery += fmt.Sprintf(" AND tp.date BETWEEN '%s' AND '%s'", startDate, endDate)
			subVillageQuery += fmt.Sprintf(" AND tp.date BETWEEN '%s' AND '%s'", startDate, endDate)
		}
	} else {
		villageQuery = fmt.Sprintf("select COUNT(DISTINCT location_id) from tbl_poa tp  INNER JOIN project p ON p.id = tp.project_id join training_participants t on t.project_id =tp.project_id where t.nagarikaenrollment = 1 AND p.startDate >= '%s' AND p.endDate <= '%s' and tp.user_id IN (%s) %s", startDate, endDate, strings.Trim(strings.Replace(fmt.Sprint(gfid), " ", ",", -1), "[]"), filter)
		subVillageQuery = fmt.Sprintf("SELECT COUNT(DISTINCT sub_village) as 'subVillage' FROM tbl_poa tp INNER JOIN project p ON p.id = tp.project_id join training_participants t on t.project_id =tp.project_id WHERE t.nagarikaenrollment = 1 AND p.startDate >= '%s' AND p.endDate <= '%s' and tp.user_id IN (%s) %s", startDate, endDate, strings.Trim(strings.Replace(fmt.Sprint(gfid), " ", ",", -1), "[]"), filter)
	}

	villageResult, err := con.Query(villageQuery)
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

	subVillageResult, err := con.Query(subVillageQuery)
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
