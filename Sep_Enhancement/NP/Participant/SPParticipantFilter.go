package spoorthi

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
	SpoorthiEnroll         int    `json:"spoorthienroll"`
	NoofSpoorthiCircleMeet int    `json:"noofspoortthimeeting"`
	Villages               int    `json:"villages"`
	StartDate              string `json:"start_date"`
	EndDate                string `json:"end_date"`
	SelectType             string `json:"select_type"`
	NoofSpoorthiSurvey     int    `json:"noofspoorthisurvey"`
	NoSpoorthiModule       int    `json:"noofspoorthimodule"`
	NoofSpoorthiBeehives   int    `json:"noofspoorthibeehives"`
}

type SResponse struct {
	SummaryTarget               int        `json:"summary_target"`
	SummaryVillages             int        `json:"summary_villages"`
	SummaryActuals              int        `json:"summary_actual"`
	SummarySpoorthiEnroll       int        `json:"summary_spoorthienroll"`
	SummaryNoSpoorthisurvey     int        `json:"summary_nospoorthisurvey"`
	SummaryNoSpoorthiCircleMeet int        `json:"summary_nospoorthiciclemeet"`
	SummarySpoorthiModule       int        `json:"summary_spoorthimodule"`
	SummaryNoofSpoorthiBeehives int        `json:"summary_noofspoorthibeehives"`
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
		summaryNoSpoorthiSurvey := 0
		summarySpoorthiEnroll := 0
		summarySpoorthimodule := 0
		summarySpoorthibeehives := 0
		summaryNoSpoorthiCircleMeet := 0

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

			obj.Actual = getParticipantFilternoSpoorthirenroll(DB, request.StartDate, request.EndDate, projectArray, enroll)
			summaryActuals += obj.Actual

			obj.SpoorthiEnroll = getParticipantFilternoSpoorthirenroll(DB, request.StartDate, request.EndDate, projectArray, enroll)
			summarySpoorthiEnroll += obj.SpoorthiEnroll

			obj.NoofSpoorthiCircleMeet = getParticipantFilternoSpoorthiCirclemeet(DB, request.StartDate, request.EndDate, projectArray, coharts)
			summaryNoSpoorthiCircleMeet += obj.NoofSpoorthiCircleMeet

			obj.NoofSpoorthiSurvey = getParticipantFilternoSpoorthisurvey(DB, request.StartDate, request.EndDate, projectArray, survey)
			summaryNoSpoorthiSurvey += obj.NoofSpoorthiSurvey

			obj.NoSpoorthiModule = getParticipantFilternoSpoorthimodule(DB, request.StartDate, request.EndDate, projectArray, survey)
			summarySpoorthimodule += obj.NoSpoorthiModule

			obj.NoofSpoorthiBeehives = getParticipantFilternoSpoorthiBeehives(DB, request.StartDate, request.EndDate, projectArray, coharts)
			summarySpoorthibeehives += obj.NoofSpoorthiBeehives
			obj.Villages = getParticipantFilterspoorthiGfBatchesNew(DB, request.StartDate, request.EndDate, projectArray, "", gfid)
			summaryVillages += obj.Villages
			response.Data = append(response.Data, obj)
		}

		response.SummaryTarget = summaryTarget
		response.SummaryVillages = summaryVillages
		response.SummaryActuals = summaryActuals
		response.SummaryNoSpoorthisurvey = summaryNoSpoorthiSurvey
		response.SummaryNoSpoorthiCircleMeet = summaryNoSpoorthiCircleMeet
		response.SummarySpoorthiEnroll = summarySpoorthiEnroll
		response.SummarySpoorthiModule = summarySpoorthimodule
		response.SummaryNoofSpoorthiBeehives = summarySpoorthibeehives
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
		summaryNoSpoorthiSurvey := 0
		summarySpoorthiEnroll := 0
		summarySpoorthimodule := 0
		summarySpoorthibeehives := 0
		summaryNoSpoorthiCircleMeet := 0
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
			obj.Actual = getParticipantFilternoSpoorthirenroll(DB, request.StartDate, request.EndDate, projectArray, filter)
			summaryActuals += obj.Actual

			obj.NoofSpoorthiCircleMeet = getParticipantFilternoSpoorthiCirclemeet(DB, request.StartDate, request.EndDate, projectArray, filterC)
			summaryNoSpoorthiCircleMeet += obj.NoofSpoorthiCircleMeet
			empid := strconv.Itoa(request.EmpID)
			obj.Villages = GfSpoorthiVillageCount(DB, request.StartDate, request.EndDate, projectArray, empid)
			summaryVillages += obj.Villages
			obj.NoSpoorthiModule = getParticipantFilternoSpoorthimodule(DB, request.StartDate, request.EndDate, projectArray, filterFn)
			summarySpoorthimodule += obj.NoSpoorthiModule
			obj.SpoorthiEnroll = getParticipantFilternoSpoorthirenroll(DB, request.StartDate, request.EndDate, projectArray, greeneroll)
			summarySpoorthiEnroll += obj.SpoorthiEnroll
			obj.NoofSpoorthiBeehives = getParticipantFilternoSpoorthiBeehives(DB, request.StartDate, request.EndDate, projectArray, filterC)
			summarySpoorthibeehives += obj.NoofSpoorthiBeehives
			obj.NoofSpoorthiSurvey = getParticipantFilternoSpoorthisurvey(DB, request.StartDate, request.EndDate, projectArray, filterFn)
			summaryNoSpoorthiSurvey += obj.NoofSpoorthiSurvey
			response.Data = append(response.Data, obj)
		}
		response.SummaryTarget = summaryTarget
		response.SummaryNoSpoorthisurvey = summaryNoSpoorthiSurvey
		response.SummaryVillages = summaryVillages
		response.SummaryActuals = summaryActuals
		response.SummaryNoSpoorthiCircleMeet = summaryNoSpoorthiCircleMeet
		response.SummarySpoorthiEnroll = summarySpoorthiEnroll
		response.SummarySpoorthiModule = summarySpoorthimodule
		response.SummaryNoofSpoorthiBeehives = summarySpoorthibeehives
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
		summaryNoSpoorthiSurvey := 0
		summarySpoorthiEnroll := 0
		summarySpoorthimodule := 0
		summarySpoorthibeehives := 0
		summaryNoSpoorthiCircleMeet := 0

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

			obj.Actual = GflParticipantFilternoSpoorthirenroll(DB, request.StartDate, request.EndDate, projectArray, request.EmpID, enroll)
			summaryActuals += obj.Actual

			obj.SpoorthiEnroll = GflParticipantFilternoSpoorthirenroll(DB, request.StartDate, request.EndDate, projectArray, request.EmpID, enroll)
			summarySpoorthiEnroll += obj.SpoorthiEnroll

			obj.NoofSpoorthiCircleMeet = GflParticipantFilternoSpoorthiCirclemeet(DB, request.StartDate, request.EndDate, projectArray, request.EmpID, coharts)
			summaryNoSpoorthiCircleMeet += obj.NoofSpoorthiCircleMeet

			obj.NoofSpoorthiSurvey = GflParticipantFilternoSpoorthisurvey(DB, request.StartDate, request.EndDate, projectArray, request.EmpID, survey)
			summaryNoSpoorthiSurvey += obj.NoofSpoorthiSurvey

			obj.NoSpoorthiModule = GflParticipantFilternoSpoorthimodule(DB, request.StartDate, request.EndDate, projectArray, request.EmpID, survey)
			summarySpoorthimodule += obj.NoSpoorthiModule

			obj.NoofSpoorthiBeehives = GflParticipantFilternoSpoorthiBeehives(DB, request.StartDate, request.EndDate, projectArray, request.EmpID, coharts)
			summarySpoorthibeehives += obj.NoofSpoorthiBeehives
			obj.Villages = GflSpoorthinewVillageCount(DB, request.StartDate, request.EndDate, projectArray, request.EmpID, village)
			summaryVillages += obj.Villages
			response.Data = append(response.Data, obj)
		}
		response.SummaryTarget = summaryTarget
		response.SummaryVillages = summaryVillages
		response.SummaryActuals = summaryActuals
		response.SummaryNoSpoorthisurvey = summaryNoSpoorthiSurvey
		response.SummaryNoSpoorthiCircleMeet = summaryNoSpoorthiCircleMeet
		response.SummarySpoorthiEnroll = summarySpoorthiEnroll
		response.SummarySpoorthiModule = summarySpoorthimodule
		response.SummaryNoofSpoorthiBeehives = summarySpoorthibeehives
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
