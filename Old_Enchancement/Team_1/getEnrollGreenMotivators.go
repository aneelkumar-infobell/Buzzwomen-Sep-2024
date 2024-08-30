package Team_1

import (
	"database/sql"
	"encoding/json"
	"fmt"
	"net/http"
	"strconv"
	"strings"

	_ "github.com/go-sql-driver/mysql"
)

type GResponse struct {
	List       []GParticipant `json:"list"`
	Code       int            `json:"code"`
	TotalCount int            `json:"total_count"`
	Success    bool           `json:"success"`
	Message    string         `json:"message"`
}

type GParticipant struct {
	ID          string `json:"id"`
	GelathiName string `json:"gelathiname"`
	VillageName string `json:"villagename"`
	TbID        string `json:"tb_id"`
	Flag        string `json:"flag"`
	EnrollDate  string `json:"enroll_date"`
	EnrolledBy  string `json:"enrolled_by"`
	IsSurvey    bool   `json:"is_survey"`
}

type APIResponse struct {
	Participants []Participant `json:"participants"`
	Code         int           `json:"code"`
	TotalCount   int           `json:"total_count"`
	Success      bool          `json:"success"`
	Message      string        `json:"message"`
}

func GetEnrollGreenMotivators(w http.ResponseWriter, r *http.Request, DB *sql.DB) {
	w.Header().Set("Access-Control-Allow-Headers", "Accept, Content-Type, Content-Length, Accept-Encoding, X-CSRF-Token, Authorization,application/json,Token")
	w.Header().Set("Access-Control-Allow-Origin", "*")
	w.Header().Set("Access-Control-Allow-Methods", "POST, GET, OPTIONS, PUT, DELETE")
	w.Header().Set("Access-Control-Allow-Credentials", "true")

	if r.Method != http.MethodPost {
		w.WriteHeader(405) // Return 405 Method Not Allowed.
		json.NewEncoder(w).Encode(map[string]interface{}{"Message": "method not found", "Status Code": "405 "})
		return
	}

	var request map[string]interface{}
	err := json.NewDecoder(r.Body).Decode(&request)
	if err != nil {
		w.WriteHeader(http.StatusBadRequest)
		json.NewEncoder(w).Encode(map[string]interface{}{"code": http.StatusBadRequest, "Message": "Invalid request payload", "success": false})
		return
	}

	projectID, ok := request["project_id"].(string)
	if !ok {
		w.WriteHeader(http.StatusBadRequest)
		json.NewEncoder(w).Encode(map[string]interface{}{"code": http.StatusBadRequest, "Message": "Invalid project_id", "success": false})
		return
	}

	empID, ok := request["emp_id"].(string)
	if !ok {
		w.WriteHeader(http.StatusBadRequest)
		json.NewEncoder(w).Encode(map[string]interface{}{"code": http.StatusBadRequest, "Message": "Invalid emp_id", "success": false})
		return
	}

	searchParam, ok := request["search"].(string)
	if !ok {
		w.WriteHeader(http.StatusBadRequest)
		json.NewEncoder(w).Encode(map[string]interface{}{"code": http.StatusBadRequest, "Message": "Invalid search", "success": false})
		return
	}

	startDate := ""
	endDate := ""
	GelathiId := ""
	searchFilter := ""

	if dates, ok := request["dates"].(map[string]interface{}); ok {
		startDate, _ = dates["start_date"].(string)
		endDate, _ = dates["end_date"].(string)
	}

	if gelathiID, ok := request["gelathi_id"].(string); ok {
		GelathiId = gelathiID
	}

	pageNum := 1

	if pageNumFloat, ok := request["pageNum"].(float64); ok {
		pageNum = int(pageNumFloat)
	}
	fmt.Println(pageNum)

	var response GResponse
	num, err := strconv.Atoi(projectID)
	if err != nil {
		w.WriteHeader(http.StatusInternalServerError)
		json.NewEncoder(w).Encode(map[string]interface{}{"code": http.StatusInternalServerError, "Message": "Failed to get associated project list", "success": false})
		return
	}

	projArray, err := getAssociatedProjectList(DB, num)
	if err != nil {
		w.WriteHeader(http.StatusInternalServerError)
		json.NewEncoder(w).Encode(map[string]interface{}{"code": http.StatusInternalServerError, "Message": "Failed to get associated project list", "success": false})
		return
	}

	fields := "empRole"
	queryRole := fmt.Sprintf("SELECT %s FROM employee WHERE status = 1 AND id = %s", fields, empID)
	resultRole, err := DB.Query(queryRole)
	if err != nil {
		w.WriteHeader(http.StatusInternalServerError)
		json.NewEncoder(w).Encode(map[string]interface{}{"code": http.StatusInternalServerError, "Message": "Failed to query database1", "success": false})
		fmt.Println(err)
		return

	}
	defer resultRole.Close()

	var roleID int
	if resultRole.Next() {
		err := resultRole.Scan(&roleID)
		if err != nil {
			w.WriteHeader(http.StatusInternalServerError)
			json.NewEncoder(w).Encode(map[string]interface{}{"code": http.StatusInternalServerError, "Message": "Failed to scan database result", "success": false})
			return
		}
	}

	var query string
	projStringSlice := make([]string, len(projArray))
	for i, v := range projArray {
		projStringSlice[i] = strconv.Itoa(v)
	}
	var data []GParticipant
	var count int

	if roleID == 6 {
		fields = "gf_bat.training_batch_id"
		query = fmt.Sprintf("SELECT %s FROM gf_batches gf_bat WHERE gf_bat.project_id IN (%s) AND gf_bat.emp_id = %s", fields, strings.Join(projStringSlice, ","), empID)
		gfBatches, err := DB.Query(query)
		if err != nil {
			w.WriteHeader(http.StatusInternalServerError)
			json.NewEncoder(w).Encode(map[string]interface{}{"code": http.StatusInternalServerError, "Message": "Failed to query database2", "success": false})
			fmt.Println(err)
			return

		}
		defer gfBatches.Close()

		var trainingBatchIDs []string
		for gfBatches.Next() {
			var batchID string
			err := gfBatches.Scan(&batchID)
			if err != nil {
				w.WriteHeader(http.StatusInternalServerError)
				json.NewEncoder(w).Encode(map[string]interface{}{"code": http.StatusInternalServerError, "Message": "Failed to scan database result", "success": false})
				return
			}
			trainingBatchIDs = append(trainingBatchIDs, batchID)
		}

		totalCountQuery := fmt.Sprintf("SELECT COUNT(*) FROM training_participants tr_pat WHERE tr_pat.GreenMotivatorsEnrolledProject IN (%s) AND tr_pat.GreenMotivators='1' AND tr_pat.tb_id IN (%s) %s %s", strings.Join(projStringSlice, ","), strings.Join(trainingBatchIDs, ","), getSearchFilter(startDate, endDate, searchParam, searchFilter, GelathiId), searchFilter)
		err = DB.QueryRow(totalCountQuery).Scan(&response.TotalCount)
		if err != nil {
			w.WriteHeader(http.StatusInternalServerError)
			json.NewEncoder(w).Encode(map[string]interface{}{"code": http.StatusInternalServerError, "Message": "Failed to query database3", "success": false})
			fmt.Println(err)
			return
		}

		fields = "tr_pat.id, tr_pat.firstName AS gelathiname, SUBSTRING_INDEX(IFNULL(tbl_poa.name, ''), '_', 1) AS villagename, tr_pat.tb_id, IF((SELECT id FROM gelathi_circle gelath_cr WHERE gelath_cr.gelathi_id = tr_pat.id LIMIT 1), 1, 0) AS flag, IFNULL(DATE_FORMAT(tr_pat.GreenMotivatorsDate, '%d-%m-%Y'), '') AS enroll_date, '' AS enrolled_by"
		query = fmt.Sprintf("SELECT %s FROM training_participants tr_pat LEFT JOIN tbl_poa ON tr_pat.tb_id = tbl_poa.id WHERE tr_pat.GreenMotivatorsEnrolledProject IN (%s) AND tr_pat.GreenMotivators='1' AND tr_pat.tb_id IN (%s) %s ORDER BY tr_pat.GreenMotivatorsDate DESC", fields, strings.Join(projStringSlice, ","), strings.Join(trainingBatchIDs, ","), getSearchFilter(startDate, endDate, searchParam, searchFilter, GelathiId))
	} else {
		totalRecordsQuery := "SELECT COUNT(*) FROM training_participants tr_pat WHERE GreenMotivatorsEnrolledProject IN (%s) AND GreenMotivators = 1 %s %s"
		totalRecordsQuery = fmt.Sprintf(totalRecordsQuery, strings.Join(projStringSlice, ","), getSearchFilter(startDate, endDate, searchParam, searchFilter, GelathiId), searchFilter)

		err = DB.QueryRow(totalRecordsQuery).Scan(&response.TotalCount)
		if err != nil {
			w.WriteHeader(http.StatusInternalServerError)
			json.NewEncoder(w).Encode(map[string]interface{}{"code": http.StatusInternalServerError, "Message": "Failed to query database4", "success": false})
			fmt.Println(err)
			return

		}

		fieldsEnroll := "tr_pat.id, tr_pat.firstName as gelathiname, SUBSTRING_INDEX(IFNULL(tbl_poa.name, ''), '_', 1) as villagename,tr_pat.tb_id, '' as flag, IFNULL(DATE_FORMAT(tr_pat.GreenMotivatorsDate, '%d-%m-%Y'), '') as enroll_date, CONCAT(IFNULL(emp.first_name, ''),' ',IFNULL(emp.last_name, '')) AS enrolled_by"
		query = fmt.Sprintf("SELECT %s FROM training_participants tr_pat LEFT JOIN tbl_poa ON tr_pat.tb_id = tbl_poa.id LEFT JOIN employee emp ON tr_pat.gelathi_id = emp.id WHERE tr_pat.GreenMotivatorsEnrolledProject IN (%s) AND tr_pat.GreenMotivators='1' %s %s ORDER BY tr_pat.GreenMotivatorsDate DESC", fieldsEnroll, strings.Join(projStringSlice, ","), getSearchFilter(startDate, endDate, searchParam, searchFilter, GelathiId), searchFilter)
	}

	rows, err := DB.Query(query)
	if err != nil {
		w.WriteHeader(http.StatusInternalServerError)
		json.NewEncoder(w).Encode(map[string]interface{}{"code": http.StatusInternalServerError, "Message": "Failed to query database5", "success": false})
		fmt.Println(err)
		return
	}
	defer rows.Close()

	for rows.Next() {
		count++
		var participant GParticipant

		err := rows.Scan(&participant.ID,
			&participant.GelathiName,
			&participant.VillageName,
			&participant.TbID,
			&participant.Flag,
			&participant.EnrollDate,
			&participant.EnrolledBy,
		)

		if err != nil {
			// Handle the database scan error
			w.WriteHeader(http.StatusInternalServerError)
			json.NewEncoder(w).Encode(map[string]interface{}{"code": http.StatusInternalServerError, "Message": "Failed to query database6", "success": false})
			fmt.Println(err)
			return
		}

		anaQuery := fmt.Sprintf("SELECT * FROM GreenBaselineSurvey WHERE partcipantId = %s", participant.ID)
		anaRows, err := DB.Query(anaQuery)
		if err != nil {
			w.WriteHeader(http.StatusInternalServerError)
			json.NewEncoder(w).Encode(map[string]interface{}{"code": http.StatusInternalServerError, "Message": "Failed to query database7", "success": false})
			fmt.Println(err)
			return
		}
		participant.IsSurvey = anaRows.Next()
		anaRows.Close()

		data = append(data, participant)
	}

	response.List = data
	response.Code = 200
	response.Success = true
	response.TotalCount = count
	response.Message = "Successfully"

	if count == 0 {
		response.List = []GParticipant{}
		response.TotalCount = 0
		response.Message = "Successfully"
	}

	jsonResponse, err := json.Marshal(response)
	if err != nil {
		w.WriteHeader(http.StatusInternalServerError)
		json.NewEncoder(w).Encode(map[string]interface{}{"code": http.StatusInternalServerError, "Message": "Failed to marshal JSON response", "success": false})

		return
	}
	// Set the response headers and write the JSON response
	w.Header().Set("Content-Type", "application/json")
	w.WriteHeader(http.StatusOK)
	w.Write(jsonResponse)
}

func getSearchFilter(startDate, endDate, search, searchFilter, GelathiId string) string {
	searchQuery := ""
	if startDate != "" && endDate != "" {
		searchQuery += fmt.Sprintf("AND DATE(tr_pat.GreenMotivatorsDate) >= '%s' AND DATE(tr_pat.GreenMotivatorsDate) <= '%s'", startDate, endDate)
	}
	if search != "" {
		searchQuery += fmt.Sprintf(" AND tr_pat.firstName LIKE '%%%s%%'", search)
	}
	if searchFilter != "" {
		searchQuery += searchFilter
	}
	if GelathiId != "" {
		searchQuery += fmt.Sprintf("AND tr_pat.gelathi_id = '%s'", GelathiId)
	}

	return searchQuery
}

func getAssociatedProjectList(DB *sql.DB, projId int) ([]int, error) {
	projArray := []int{}
	if projId > 0 {
		getProjList := fmt.Sprintf("SELECT associatedProject FROM project_association WHERE projectId IN (%d)", projId)
		projArray = append(projArray, projId)
		rows, err := DB.Query(getProjList)
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
