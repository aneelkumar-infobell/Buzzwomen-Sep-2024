package Nagarika

import (
	"database/sql"
	"encoding/json"
	"fmt"
	"log"
	"net/http"
	"strconv"
	"strings"
)

type SProject struct {
	ID                     int    `json:"id"`
	Name                   string `json:"name"`
	Target                 int    `json:"target"`
	Actual                 int    `json:"actual"`
	nagarikaEnroll         int    `json:"nagarikaenroll"`
	NoofnagarikaCircleMeet int    `json:"noofspoortthimeeting"`
	Villages               int    `json:"villages"`
	StartDate              string `json:"start_date"`
	EndDate                string `json:"end_date"`
	SelectType             string `json:"select_type"`
	NoofnagarikaSurvey     int    `json:"noofnagarikasurvey"`
	NonagarikaModule       int    `json:"noofnagarikamodule"`
	NoofnagarikaBeehives   int    `json:"noofnagarikabeehives"`
}

type SResponse struct {
	SummaryTarget               int        `json:"summary_target"`
	SummaryVillages             int        `json:"summary_villages"`
	SummaryActuals              int        `json:"summary_actual"`
	SummarynagarikaEnroll       int        `json:"summary_nagarikaenroll"`
	SummaryNonagarikasurvey     int        `json:"summary_nonagarikasurvey"`
	SummaryNonagarikaCircleMeet int        `json:"summary_nonagarikaciclemeet"`
	SummarynagarikaModule       int        `json:"summary_nagarikamodule"`
	SummaryNoofnagarikaBeehives int        `json:"summary_noofnagarikabeehives"`
	Data                        []SProject `json:"data"`
	Code                        int        `json:"code"`
	Count                       int        `json:"count"`
	Success                     bool       `json:"success"`
	Message                     string     `json:"message"`
}

func NPCounts(w http.ResponseWriter, r *http.Request, DB *sql.DB) {
	var request struct {
		RoleID    int    `json:"role_id"`
		EmpID     int    `json:"emp_id"`
		StartDate string `json:"start_date"`
		EndDate   string `json:"end_date"`
		GfId      string `json:"gfid,omitempty"`
		Project   string `json:"project"`
	}

	err := json.NewDecoder(r.Body).Decode(&request)
	if err != nil {
		log.Println("ERROR>>", err)
		w.WriteHeader(http.StatusBadRequest)
		json.NewEncoder(w).Encode(map[string]interface{}{"code": http.StatusBadRequest, "message": "Invalid Request Body", "success": false})
		return
	}

	response := SResponse{
		Data: make([]SProject, 0),
	}
	gfid, _ := strconv.Atoi(request.GfId)

	if request.RoleID == 1 || request.RoleID == 9 || request.RoleID == 3 || request.RoleID == 4 || request.RoleID == 12 || request.RoleID == 11 {
		filter := ""

		survey := ""
		coharts := ""
		enroll := ""

		if request.RoleID == 3 {
			opsIds := getReportingOpsManagers(DB, request.EmpID)
			filter = fmt.Sprintf(" and p.operations_manager in (%s)", strings.Trim(strings.Join(strings.Fields(fmt.Sprint(opsIds)), ","), "[]"))

		} else if request.RoleID == 12 {
			opsIds := getOpsManagers(DB, request.EmpID)
			filter = fmt.Sprintf(" and p.operations_manager in (%s)", strings.Trim(strings.Join(strings.Fields(fmt.Sprint(opsIds)), ","), "[]"))

		} else if request.RoleID == 4 {
			filter = " AND p.operations_manager = " + strconv.Itoa(request.EmpID)

		}

		if gfid > 0 {
			filter += " AND t.gelathi_id = " + request.GfId
			enroll = " AND gelathi_id = " + (request.GfId)
			coharts = " AND tbl_poa.user_id = " + (request.GfId)
			survey = " AND sb.GelathiId = " + (request.GfId)

		}

		projectList := "SELECT DISTINCT COALESCE(tp.project_id, 0) as id, COALESCE(projectName, '') as name, COALESCE(p.startDate, '') as startDate, COALESCE(p.endDate, '') as endDate " +
			"from tbl_poa tp inner join project p on p.id = tp.project_id join training_participants t on t.tb_id=tp.tb_id where t.nagarikaenrollment=1 and tp.session_type in (22,23,24,25,26,27,28) and tp.project_id != ''" + filter

		if request.StartDate != "" && request.EndDate != "" {
			projectList = "SELECT DISTINCT COALESCE(tp.project_id, 0) as id, COALESCE(projectName, '') as name, COALESCE(p.startDate, '') as startDate, COALESCE(p.endDate, '') as endDate " +
				"from tbl_poa tp inner join project p on p.id = tp.project_id join training_participants t on t.tb_id=tp.tb_id where t.nagarikaenrollment=1 and tp.session_type in (22,23,24,25,26,27,28) and ((tp.date BETWEEN '" + request.StartDate + "' AND '" + request.EndDate + "'))" + filter
		}

		fmt.Println(projectList)
		rows, err := DB.Query(projectList)
		if err != nil {
			log.Println("ERROR>>", err)
			w.WriteHeader(http.StatusBadRequest)
			json.NewEncoder(w).Encode(map[string]interface{}{"code": http.StatusBadRequest, "message": "Invalid Request Body", "success": false})
			return
		}
		defer rows.Close()

		summaryTarget := 0
		summaryActuals := 0

		summaryVillages := 0
		summaryNonagarikaSurvey := 0
		summarynagarikaEnroll := 0
		summarynagarikamodule := 0
		summarynagarikabeehives := 0
		summaryNonagarikaCircleMeet := 0

		for rows.Next() {
			var prList struct {
				ID        int    `json:"id"`
				Name      string `json:"name"`
				StartDate string `json:"start_date"`
				EndDate   string `json:"end_date"`
			}
			err := rows.Scan(&prList.ID, &prList.Name, &prList.StartDate, &prList.EndDate)
			if err != nil {
				log.Println("ERROR>>", err)
				w.WriteHeader(http.StatusBadRequest)
				json.NewEncoder(w).Encode(map[string]interface{}{"code": http.StatusBadRequest, "message": "Invalid Request Body", "success": false})
				return
			}

			obj := SProject{
				ID:         prList.ID,
				Name:       prList.Name,
				StartDate:  prList.StartDate,
				EndDate:    prList.EndDate,
				SelectType: "1",
			}
			projectArray := []int{obj.ID}

			obj.Target = getTarget(DB, request.StartDate, request.EndDate, projectArray)
			summaryTarget += obj.Target

			obj.Actual = getParticipantFilternonagarikarenroll(DB, request.StartDate, request.EndDate, projectArray, enroll)
			summaryActuals += obj.Actual

			obj.nagarikaEnroll = getParticipantFilternonagarikarenroll(DB, request.StartDate, request.EndDate, projectArray, enroll)
			summarynagarikaEnroll += obj.nagarikaEnroll

			obj.NoofnagarikaCircleMeet = getParticipantFilternonagarikaCirclemeet(DB, request.StartDate, request.EndDate, projectArray, coharts)
			summaryNonagarikaCircleMeet += obj.NoofnagarikaCircleMeet

			obj.NoofnagarikaSurvey = getParticipantFilternonagarikasurvey(DB, request.StartDate, request.EndDate, projectArray, survey)
			summaryNonagarikaSurvey += obj.NoofnagarikaSurvey

			obj.NonagarikaModule = getParticipantFilternonagarikamodule(DB, request.StartDate, request.EndDate, projectArray, survey)
			summarynagarikamodule += obj.NonagarikaModule

			obj.NoofnagarikaBeehives = getParticipantFilternonagarikaBeehives(DB, request.StartDate, request.EndDate, projectArray, coharts)
			summarynagarikabeehives += obj.NoofnagarikaBeehives
			obj.Villages = getParticipantFilternagarikaGfBatchesNew(DB, request.StartDate, request.EndDate, projectArray, "", gfid)
			summaryVillages += obj.Villages
			response.Data = append(response.Data, obj)
		}

		response.SummaryTarget = summaryTarget
		response.SummaryVillages = summaryVillages
		response.SummaryActuals = summaryActuals
		response.SummaryNonagarikasurvey = summaryNonagarikaSurvey
		response.SummaryNonagarikaCircleMeet = summaryNonagarikaCircleMeet
		response.SummarynagarikaEnroll = summarynagarikaEnroll
		response.SummarynagarikaModule = summarynagarikamodule
		response.SummaryNoofnagarikaBeehives = summarynagarikabeehives
		response.Code = 200
		response.Count = len(response.Data)
		response.Success = true
		response.Message = "Successfully"

		w.Header().Set("Content-Type", "application/json")
		err = json.NewEncoder(w).Encode(response)
		if err != nil {
			log.Println("ERROR>>", err)
			w.WriteHeader(http.StatusBadRequest)
			json.NewEncoder(w).Encode(map[string]interface{}{"code": http.StatusBadRequest, "message": "Invalid Request Body", "success": false})
			return
		}
	} else if request.RoleID == 6 {

		filter := ""
		empid := strconv.Itoa(request.EmpID)

		filter += " AND tp.user_id = " + empid

		projectList := "SELECT DISTINCT COALESCE(tp.project_id, 0) as id, COALESCE(projectName, '') as name, COALESCE(p.startDate, '') as startDate, COALESCE(p.endDate, '') as endDate " +
			"from tbl_poa tp inner join project p on p.id = tp.project_id join training_participants t on t.tb_id=tp.tb_id where t.nagarikaenrollment=1 and tp.session_type in (22,23,24,25,26,27,28) and ((tp.date BETWEEN '" + request.StartDate + "' AND '" + request.EndDate + "'))" + filter

		fmt.Println(projectList)

		tRes, err := DB.Query(projectList)

		if err != nil {
			w.WriteHeader(http.StatusBadRequest)
			json.NewEncoder(w).Encode(map[string]interface{}{"Message": err, "Status Code": "400 Bad Request"})
			return
		}
		summaryTarget := 0
		summaryActuals := 0

		summaryVillages := 0
		summaryNonagarikaSurvey := 0
		summarynagarikaEnroll := 0
		summarynagarikamodule := 0
		summarynagarikabeehives := 0
		summaryNonagarikaCircleMeet := 0
		for tRes.Next() {
			var prList struct {
				ID        int    `json:"id"`
				Name      string `json:"name"`
				StartDate string `json:"start_date"`
				EndDate   string `json:"end_date"`
			}
			err := tRes.Scan(&prList.ID, &prList.Name, &prList.StartDate, &prList.EndDate)
			if err != nil {
				log.Println("ERROR>>", err)
				w.WriteHeader(http.StatusBadRequest)
				json.NewEncoder(w).Encode(map[string]interface{}{"code": http.StatusBadRequest, "message": "Invalid Request Body", "success": false})
				return
			}

			obj := SProject{
				ID:         prList.ID,
				Name:       prList.Name,
				StartDate:  prList.StartDate,
				EndDate:    prList.EndDate,
				SelectType: "1",
			}
			projectArray := []int{obj.ID}
			greeneroll := " and tp.gelathi_id = " + strconv.Itoa(request.EmpID)
			filterFn := " and t.gelathi_id = " + strconv.Itoa(request.EmpID)
			filterC := " and tp.user_id = " + strconv.Itoa(request.EmpID)
			obj.Target = getTrainerTarget(DB, request.EmpID, projectArray)
			summaryTarget += obj.Target
			obj.Actual = getParticipantFilternonagarikarenroll(DB, request.StartDate, request.EndDate, projectArray, filter)
			summaryActuals += obj.Actual

			obj.NoofnagarikaCircleMeet = getParticipantFilternonagarikaCirclemeet(DB, request.StartDate, request.EndDate, projectArray, filterC)
			summaryNonagarikaCircleMeet += obj.NoofnagarikaCircleMeet
			empid := strconv.Itoa(request.EmpID)
			obj.Villages = GfnagarikaVillageCount(DB, request.StartDate, request.EndDate, projectArray, empid)
			summaryVillages += obj.Villages
			obj.NonagarikaModule = getParticipantFilternonagarikamodule(DB, request.StartDate, request.EndDate, projectArray, filterFn)
			summarynagarikamodule += obj.NonagarikaModule
			obj.nagarikaEnroll = getParticipantFilternonagarikarenroll(DB, request.StartDate, request.EndDate, projectArray, greeneroll)
			summarynagarikaEnroll += obj.nagarikaEnroll
			obj.NoofnagarikaBeehives = getParticipantFilternonagarikaBeehives(DB, request.StartDate, request.EndDate, projectArray, filterC)
			summarynagarikabeehives += obj.NoofnagarikaBeehives
			obj.NoofnagarikaSurvey = getParticipantFilternonagarikasurvey(DB, request.StartDate, request.EndDate, projectArray, filterFn)
			summaryNonagarikaSurvey += obj.NoofnagarikaSurvey
			response.Data = append(response.Data, obj)
		}
		response.SummaryTarget = summaryTarget
		response.SummaryNonagarikasurvey = summaryNonagarikaSurvey
		response.SummaryVillages = summaryVillages
		response.SummaryActuals = summaryActuals
		response.SummaryNonagarikaCircleMeet = summaryNonagarikaCircleMeet
		response.SummarynagarikaEnroll = summarynagarikaEnroll
		response.SummarynagarikaModule = summarynagarikamodule
		response.SummaryNoofnagarikaBeehives = summarynagarikabeehives
		response.Code = 200
		response.Count = len(response.Data)
		response.Success = true
		response.Message = "Successfully"
		w.Header().Set("Content-Type", "application/json")
		err = json.NewEncoder(w).Encode(response)
		if err != nil {
			log.Println("ERROR>>", err)
			w.WriteHeader(http.StatusBadRequest)
			json.NewEncoder(w).Encode(map[string]interface{}{"code": http.StatusBadRequest, "message": "Invalid Request Body", "success": false})
			return
		}
	} else if request.RoleID == 13 {
		filter := ""

		survey := ""
		coharts := ""
		village := ""
		enroll := ""

		if gfid > 0 {
			filter += " AND tp.gelathi_id = " + request.GfId
			survey = " AND sb.GelathiId = " + (request.GfId)
			coharts = " AND tbl_poa.user_id = " + (request.GfId)
			village = " and tp.user_id = " + request.GfId
			enroll = " AND gelathi_id = " + request.GfId
		}

		gflid := ""
		gflid += " AND p.gfl_id = " + strconv.Itoa(request.EmpID)

		projectList := "SELECT DISTINCT COALESCE(tp.project_id, 0) as id, COALESCE(projectName, '') as name, COALESCE(p.startDate, '') as startDate, COALESCE(p.endDate, '') as endDate " +
			"from tbl_poa tp inner join project p on p.id = tp.project_id join training_participants t on t.tb_id=tp.tb_id where t.nagarikaenrollment=1 and tp.session_type in (22,23,24,25,26,27,28) and tp.project_id != ''" + gflid

		if request.StartDate != "" && request.EndDate != "" {
			projectList = "SELECT DISTINCT COALESCE(tp.project_id, 0) as id, COALESCE(projectName, '') as name, COALESCE(p.startDate, '') as startDate, COALESCE(p.endDate, '') as endDate " +
				"from tbl_poa tp inner join project p on p.id = tp.project_id join training_participants t on t.tb_id=tp.tb_id where t.enroll=1 and tp.session_type in (22,23,24,25,26,27,28) and ((tp.date BETWEEN '" + request.StartDate + "' AND '" + request.EndDate + "'))" + gflid
		}
		fmt.Println(projectList)

		rows, err := DB.Query(projectList)
		if err != nil {
			log.Println("ERROR>>", err)
			w.WriteHeader(http.StatusBadRequest)
			json.NewEncoder(w).Encode(map[string]interface{}{"code": http.StatusBadRequest, "message": "Invalid Request Body", "success": false})
			return
		}

		summaryTarget := 0
		summaryActuals := 0

		summaryVillages := 0
		summaryNonagarikaSurvey := 0
		summarynagarikaEnroll := 0
		summarynagarikamodule := 0
		summarynagarikabeehives := 0
		summaryNonagarikaCircleMeet := 0

		for rows.Next() {
			var prList struct {
				ID        int    `json:"id"`
				Name      string `json:"name"`
				StartDate string `json:"start_date"`
				EndDate   string `json:"end_date"`
			}

			err := rows.Scan(&prList.ID, &prList.Name, &prList.StartDate, &prList.EndDate)
			if err != nil {
				log.Println("ERROR>>", err)
				w.WriteHeader(http.StatusBadRequest)
				json.NewEncoder(w).Encode(map[string]interface{}{"code": http.StatusBadRequest, "message": "Invalid Request Body", "success": false})
				return
			}

			obj := SProject{
				ID:         prList.ID,
				Name:       prList.Name,
				StartDate:  prList.StartDate,
				EndDate:    prList.EndDate,
				SelectType: "1",
			}
			projectArray := []int{obj.ID}

			obj.Target = getTarget(DB, request.StartDate, request.EndDate, projectArray)
			summaryTarget += obj.Target

			obj.Actual = GflParticipantFilternonagarikarenroll(DB, request.StartDate, request.EndDate, projectArray, request.EmpID, enroll)
			summaryActuals += obj.Actual

			obj.nagarikaEnroll = GflParticipantFilternonagarikarenroll(DB, request.StartDate, request.EndDate, projectArray, request.EmpID, enroll)
			summarynagarikaEnroll += obj.nagarikaEnroll

			obj.NoofnagarikaCircleMeet = GflParticipantFilternonagarikaCirclemeet(DB, request.StartDate, request.EndDate, projectArray, request.EmpID, coharts)
			summaryNonagarikaCircleMeet += obj.NoofnagarikaCircleMeet

			obj.NoofnagarikaSurvey = GflParticipantFilternonagarikasurvey(DB, request.StartDate, request.EndDate, projectArray, request.EmpID, survey)
			summaryNonagarikaSurvey += obj.NoofnagarikaSurvey

			obj.NonagarikaModule = GflParticipantFilternonagarikamodule(DB, request.StartDate, request.EndDate, projectArray, request.EmpID, survey)
			summarynagarikamodule += obj.NonagarikaModule

			obj.NoofnagarikaBeehives = GflParticipantFilternonagarikaBeehives(DB, request.StartDate, request.EndDate, projectArray, request.EmpID, coharts)
			summarynagarikabeehives += obj.NoofnagarikaBeehives
			obj.Villages = GflnagarikanewVillageCount(DB, request.StartDate, request.EndDate, projectArray, request.EmpID, village)
			summaryVillages += obj.Villages
			response.Data = append(response.Data, obj)
		}
		response.SummaryTarget = summaryTarget
		response.SummaryVillages = summaryVillages
		response.SummaryActuals = summaryActuals
		response.SummaryNonagarikasurvey = summaryNonagarikaSurvey
		response.SummaryNonagarikaCircleMeet = summaryNonagarikaCircleMeet
		response.SummarynagarikaEnroll = summarynagarikaEnroll
		response.SummarynagarikaModule = summarynagarikamodule
		response.SummaryNoofnagarikaBeehives = summarynagarikabeehives
		response.Code = 200
		response.Count = len(response.Data)
		response.Success = true
		response.Message = "Successfully"

		w.Header().Set("Content-Type", "application/json")
		err = json.NewEncoder(w).Encode(response)
		if err != nil {
			log.Println("ERROR>>", err)
			w.WriteHeader(http.StatusBadRequest)
			json.NewEncoder(w).Encode(map[string]interface{}{"code": http.StatusBadRequest, "message": "Invalid Request Body", "success": false})
			return
		}
	}

}
