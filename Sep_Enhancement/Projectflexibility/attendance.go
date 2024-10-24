package Projectflexibility

import (
	"database/sql"
	"encoding/json"
	"fmt"
	"net/http"
)

func AllAttendence(w http.ResponseWriter, r *http.Request, DB *sql.DB) {
	w.Header().Set("Access-Control-Allow-Headers", "Accept, Content-Type, Content-Length, Accept-Encoding, X-CSRF-Token, Authorization, application/json,Token")
	w.Header().Set("Access-Control-Allow-Origin", "*")
	w.Header().Set("Access-Control-Allow-Methods", "POST, GET, OPTIONS, PUT, DELETE")
	if r.Method != http.MethodPost {
		w.WriteHeader(405) // Return 405 Method Not Allowed.
		json.NewEncoder(w).Encode(map[string]interface{}{"Message": "method not found", "Status Code": "405 "})
		return
	}
	type Attendence struct {
		ProjectID    int `json:"projectid"`
		PartcipantId int `json:"PartcipantId"`
		Type         int `json:"Type"`
		Circle_id    int `json:"Circle_id"`
	}
	var p Attendence
	err := json.NewDecoder(r.Body).Decode(&p)
	if err != nil {
		http.Error(w, err.Error(), http.StatusBadRequest)
		return
	}
	//ProjectID, _ := strconv.Atoi(p..ProjectID)
	var funderid, ffid int
	var funder1enddate string
	// =====================getting the active funder id =================================================
	activefunder, err := DB.Query("SELECT COALESCE(fend_date,''),funderid FROM multiple_funder  WHERE  projectid = ?", p.ProjectID)
	if err != nil {
		w.WriteHeader(http.StatusInternalServerError)
		json.NewEncoder(w).Encode(map[string]interface{}{"code": http.StatusBadRequest, "message": "Error while executing the query", "success": false, "error": err})
		return
	}

	for activefunder.Next() {
		err := activefunder.Scan(&funder1enddate, &funderid)
		if err != nil {
			w.WriteHeader(http.StatusInternalServerError)
			json.NewEncoder(w).Encode(map[string]interface{}{"code": http.StatusBadRequest, "message": "Error while scaning error", "success": false, "error": err})
			return
		}

		if funder1enddate == "" {
			ffid = funderid
		}

	}

	//========================================================================================

	// extra for not filling spoorthi form
	str := "select partcipantId from SpoorthiBaselineQuestionnaire"

	rows, err := DB.Query(str)
	if err != nil {

		w.WriteHeader(http.StatusBadRequest)
		json.NewEncoder(w).Encode(map[string]interface{}{"Message": err, "Status Code": "400 Bad Request"})
		return
	}
	defer rows.Close()
	var partcipantId int
	var result []int // creating slice

	for rows.Next() {

		err := rows.Scan(&partcipantId)
		if err != nil {
			fmt.Println("err17878", err)
			w.WriteHeader(http.StatusBadRequest)
			json.NewEncoder(w).Encode(map[string]interface{}{"Message": err, "Status Code": "400 Bad Request"})
			return
		}

		result = append(result, partcipantId)

	}

	found := false
	for _, r := range result {
		if r == p.PartcipantId {
			found = true
			break
		}
	}

	//end

	// ================ grren =========
	str1 := "select COALESCE(partcipantId,0) from GreenBaselineSurvey"

	rows1, err := DB.Query(str1)
	if err != nil {

		w.WriteHeader(http.StatusBadRequest)
		json.NewEncoder(w).Encode(map[string]interface{}{"Message": err, "Status Code": "400 Bad Request"})
		return
	}
	defer rows1.Close()
	var partcipantId1 int
	var result1 []int // creating slice

	for rows1.Next() {

		err := rows1.Scan(&partcipantId1)
		if err != nil {

			w.WriteHeader(http.StatusBadRequest)
			json.NewEncoder(w).Encode(map[string]interface{}{"Message": err.Error(), "Status Code": "400 Bad Request"})
			return
		}

		result1 = append(result1, partcipantId1)

	}

	ss := false
	for _, r := range result1 {
		if r == p.PartcipantId {
			ss = true
			break
		}
	}
	//end

	// vyapar
	// ================ grren =========
	str2 := "select partcipantId from BuzzVyaparProgramBaseline"

	rows2, err := DB.Query(str2)
	if err != nil {

		w.WriteHeader(http.StatusBadRequest)
		json.NewEncoder(w).Encode(map[string]interface{}{"Message": err.Error(), "Status Code": "400 Bad Request"})
		return
	}
	defer rows2.Close()
	var partcipantId2 int
	var result2 []int // creating slice

	for rows2.Next() {

		err := rows2.Scan(&partcipantId2)
		if err != nil {

			w.WriteHeader(http.StatusBadRequest)
			json.NewEncoder(w).Encode(map[string]interface{}{"Message": err.Error(), "Status Code": "400 Bad Request"})
			return
		}

		result2 = append(result2, partcipantId2)

	}

	founder1 := false
	for _, r := range result2 {
		if r == p.PartcipantId {
			founder1 = true
			break
		}
	}
	//end

	// =================================== Nagarika ===============================
	str3 := "select partcipantId from nagarikaprogramquestionnaire"

	rows3, err := DB.Query(str3)
	if err != nil {

		w.WriteHeader(http.StatusBadRequest)
		json.NewEncoder(w).Encode(map[string]interface{}{"Message": err.Error(), "Status Code": "400 Bad Request"})
		return
	}
	defer rows3.Close()
	var partcipantId3 int
	var result3 []int // creating slice

	for rows3.Next() {

		err := rows3.Scan(&partcipantId3)
		if err != nil {

			w.WriteHeader(http.StatusBadRequest)
			json.NewEncoder(w).Encode(map[string]interface{}{"Message": err.Error(), "Status Code": "400 Bad Request"})
			return
		}

		result3 = append(result3, partcipantId3)

	}

	founder2 := false
	for _, r := range result3 {
		if r == p.PartcipantId {
			founder2 = true
			break
		}
	}

	// ================================== spoorthi attendance ==============================
	switch {

	case p.Type == 5:
		if found {
			_, err := DB.Exec("UPDATE SpoorthiBaselineQuestionnaire sp , gelathi_circle gel_circle left join training_participants tr_part ON gel_circle.gelathi_id = tr_part.id SET sp.module1=1,sp.M1f=? where sp.partcipantId=? and gel_circle.circle_id =?;", ffid, p.PartcipantId, p.Circle_id)
			if err != nil {
				w.WriteHeader(http.StatusBadRequest)
			}
			json.NewEncoder(w).Encode(map[string]interface{}{"Message": "Attendance added successfully for Spoorthi Module1"})
		} else {
			json.NewEncoder(w).Encode(map[string]interface{}{"Message": "Fill the spoorthi survey form"})
		}

	case p.Type == 6:

		_, err := DB.Exec("UPDATE SpoorthiBaselineQuestionnaire sp , gelathi_circle gel_circle left join training_participants tr_part ON gel_circle.gelathi_id = tr_part.id SET sp.module2=1,sp.M2f=? where sp.partcipantId=? and gel_circle.circle_id =?;", ffid, p.PartcipantId, p.Circle_id)
		if err != nil {
			json.NewEncoder(w).Encode(map[string]interface{}{"Message": err.Error(), "Status Code": "400 Bad Request"})
		}

		json.NewEncoder(w).Encode(map[string]interface{}{"Message": "Attendance added successfully for Spoorthi Module2"})

	case p.Type == 7:

		_, err := DB.Exec("UPDATE SpoorthiBaselineQuestionnaire sp , gelathi_circle gel_circle left join training_participants tr_part ON gel_circle.gelathi_id = tr_part.id SET sp.module3=1,sp.M3f=? where sp.partcipantId=? and gel_circle.circle_id =?;", ffid, p.PartcipantId, p.Circle_id)
		if err != nil {
			return
		}

		json.NewEncoder(w).Encode(map[string]interface{}{"Message": "Attendance added successfully for Spoorthi Module3"})

	case p.Type == 8:
		_, err := DB.Exec("UPDATE SpoorthiBaselineQuestionnaire sp , gelathi_circle gel_circle left join training_participants tr_part ON gel_circle.gelathi_id = tr_part.id SET sp.module4=1,sp.M4f=? where sp.partcipantId=? and gel_circle.circle_id =?;", ffid, p.PartcipantId, p.Circle_id)
		if err != nil {
			w.WriteHeader(http.StatusBadRequest)
			json.NewEncoder(w).Encode(map[string]interface{}{"Message": err, "Status Code": "400 Bad Request"})
			return
		}

		json.NewEncoder(w).Encode(map[string]interface{}{"Message": "Attendance added successfully for Spoorthi Module4"})

	case p.Type == 9:
		_, err := DB.Exec("UPDATE SpoorthiBaselineQuestionnaire sp , gelathi_circle gel_circle left join training_participants tr_part ON gel_circle.gelathi_id = tr_part.id SET sp.module5=1,sp.M5f=? where sp.partcipantId=? and gel_circle.circle_id =?;", ffid, p.PartcipantId, p.Circle_id)
		if err != nil {
			w.WriteHeader(http.StatusBadRequest)
			json.NewEncoder(w).Encode(map[string]interface{}{"Message": err, "Status Code": "400 Bad Request"})
			return
		}

		json.NewEncoder(w).Encode(map[string]interface{}{"Message": "Attendance added successfully for Spoorthi Module5"})

	// =============================== green attendance ==========================
	case p.Type == 11:
		if ss {
			_, err := DB.Exec("UPDATE GreenBaselineSurvey sp , gelathi_circle gel_circle left join training_participants tr_part ON gel_circle.gelathi_id = tr_part.id SET sp.module1=1,sp.M1f=? where sp.partcipantId=? and gel_circle.circle_id =?;", ffid, p.PartcipantId, p.Circle_id)
			if err != nil {
				w.WriteHeader(http.StatusBadRequest)
				json.NewEncoder(w).Encode(map[string]interface{}{"Message": err, "Status Code": "400 Bad Request"})
				return
			}

			json.NewEncoder(w).Encode(map[string]interface{}{"Message": "Attendance added successfully for Green Module1"})
		} else {
			json.NewEncoder(w).Encode(map[string]interface{}{"Message": "Fill the green form"})
		}
	case p.Type == 12:
		_, err := DB.Exec("UPDATE GreenBaselineSurvey sp , gelathi_circle gel_circle left join training_participants tr_part ON gel_circle.gelathi_id = tr_part.id SET sp.module2=1 ,sp.M2f=? where sp.partcipantId=? and gel_circle.circle_id =?;", ffid, p.PartcipantId, p.Circle_id)
		if err != nil {
			w.WriteHeader(http.StatusBadRequest)
			json.NewEncoder(w).Encode(map[string]interface{}{"Message": err, "Status Code": "400 Bad Request"})
			return
		}

		json.NewEncoder(w).Encode(map[string]interface{}{"Message": "Attendance added successfully for Green Module2"})

	case p.Type == 13:
		_, err := DB.Exec("UPDATE GreenBaselineSurvey sp , gelathi_circle gel_circle left join training_participants tr_part ON gel_circle.gelathi_id = tr_part.id SET sp.module3=1,sp.M3f=? where sp.partcipantId=? and gel_circle.circle_id =?;", ffid, p.PartcipantId, p.Circle_id)

		if err != nil {

			w.WriteHeader(http.StatusBadRequest)
			json.NewEncoder(w).Encode(map[string]interface{}{"Message": err, "Status Code": "400 Bad Request"})
			return
		}

		json.NewEncoder(w).Encode(map[string]interface{}{"Message": "Attendance added successfully for Green Module3"})
	case p.Type == 14:
		_, err := DB.Exec("UPDATE GreenBaselineSurvey sp , gelathi_circle gel_circle left join training_participants tr_part ON gel_circle.gelathi_id = tr_part.id SET sp.module4=1,sp.M4f=? where sp.partcipantId=? and gel_circle.circle_id =?;", ffid, p.PartcipantId, p.Circle_id)

		if err != nil {

			w.WriteHeader(http.StatusBadRequest)
			json.NewEncoder(w).Encode(map[string]interface{}{"Message": err, "Status Code": "400 Bad Request"})
			return
		}

		json.NewEncoder(w).Encode(map[string]interface{}{"Message": "Attendance added successfully for Green Module4"})
	case p.Type == 15:
		_, err := DB.Exec("UPDATE GreenBaselineSurvey sp , gelathi_circle gel_circle left join training_participants tr_part ON gel_circle.gelathi_id = tr_part.id SET sp.module5=1,sp.M5f=? where sp.partcipantId=? and gel_circle.circle_id =?;", ffid, p.PartcipantId, p.Circle_id)

		if err != nil {

			w.WriteHeader(http.StatusBadRequest)
			json.NewEncoder(w).Encode(map[string]interface{}{"Message": err, "Status Code": "400 Bad Request"})
			return
		}
		json.NewEncoder(w).Encode(map[string]interface{}{"Message": "Attendance added successfully for Green Module5"})

	// ================================ Vyapar attendance =============================
	case p.Type == 17:
		if founder1 {
			_, err := DB.Exec("UPDATE BuzzVyaparProgramBaseline sp , gelathi_circle gel_circle left join training_participants tr_part ON gel_circle.gelathi_id = tr_part.id SET sp.module1=1,sp.M1f=? where sp.partcipantId=? and gel_circle.circle_id =?;", ffid, p.PartcipantId, p.Circle_id)
			if err != nil {
				w.WriteHeader(http.StatusBadRequest)
				json.NewEncoder(w).Encode(map[string]interface{}{"Message": err, "Status Code": "400 Bad Request"})
				return
			}

			json.NewEncoder(w).Encode(map[string]interface{}{"Message": "Attendance added successfully for Vyapar Module1"})
		} else {
			json.NewEncoder(w).Encode(map[string]interface{}{"Message": "Fill the vyapar form"})
		}
	case p.Type == 18:
		_, err := DB.Exec("UPDATE BuzzVyaparProgramBaseline sp , gelathi_circle gel_circle left join training_participants tr_part ON gel_circle.gelathi_id = tr_part.id SET sp.module2=1,sp.M2f=? where sp.partcipantId=? and gel_circle.circle_id =?;", ffid, p.PartcipantId, p.Circle_id)
		if err != nil {
			w.WriteHeader(http.StatusBadRequest)
			json.NewEncoder(w).Encode(map[string]interface{}{"Message": err, "Status Code": "400 Bad Request"})
			return
		}

		json.NewEncoder(w).Encode(map[string]interface{}{"Message": "Attendance added successfully for vyapar Module2"})
	case p.Type == 19:
		_, err := DB.Exec("UPDATE BuzzVyaparProgramBaseline sp , gelathi_circle gel_circle left join training_participants tr_part ON gel_circle.gelathi_id = tr_part.id SET sp.module3=1,sp.M3f=? where sp.partcipantId=? and gel_circle.circle_id =?;", ffid, p.PartcipantId, p.Circle_id)
		if err != nil {
			w.WriteHeader(http.StatusBadRequest)
			json.NewEncoder(w).Encode(map[string]interface{}{"Message": err, "Status Code": "400 Bad Request"})
			return
		}

		json.NewEncoder(w).Encode(map[string]interface{}{"Message": "Attendance added successfully for vyapar Module3"})
	case p.Type == 20:
		_, err := DB.Exec("UPDATE BuzzVyaparProgramBaseline sp , gelathi_circle gel_circle left join training_participants tr_part ON gel_circle.gelathi_id = tr_part.id SET sp.module4=1,sp.M4f=? where sp.partcipantId=? and gel_circle.circle_id =?;", ffid, p.PartcipantId, p.Circle_id)

		if err != nil {

			w.WriteHeader(http.StatusBadRequest)
			json.NewEncoder(w).Encode(map[string]interface{}{"Message": err, "Status Code": "400 Bad Request"})
			return
		}

		json.NewEncoder(w).Encode(map[string]interface{}{"Message": "Attendance added successfully for vyapar Module4"})
	case p.Type == 21:
		_, err := DB.Exec("UPDATE BuzzVyaparProgramBaseline sp , gelathi_circle gel_circle left join training_participants tr_part ON gel_circle.gelathi_id = tr_part.id SET sp.module5=1,sp.M5f=? where sp.partcipantId=? and gel_circle.circle_id =?;", ffid, p.PartcipantId, p.Circle_id)

		if err != nil {

			w.WriteHeader(http.StatusBadRequest)
			json.NewEncoder(w).Encode(map[string]interface{}{"Message": err, "Status Code": "400 Bad Request"})
			return
		}

		json.NewEncoder(w).Encode(map[string]interface{}{"Message": "Attendance added successfully for vyapar Module5"})

		//  =============================== nagarika program attendance ==========================================
	case p.Type == 23:

		if founder2 {

			_, err := DB.Exec("UPDATE nagarikaprogramquestionnaire sp , gelathi_circle gel_circle left join training_participants tr_part ON gel_circle.gelathi_id = tr_part.id SET sp.module1=1,sp.M1f=? where sp.partcipantId=? and gel_circle.circle_id =?;", ffid, p.PartcipantId, p.Circle_id)
			if err != nil {

				w.WriteHeader(http.StatusBadRequest)
			}
			json.NewEncoder(w).Encode(map[string]interface{}{"Message": "Attendance added successfully for Nagarika Module1"})
		} else {
			json.NewEncoder(w).Encode(map[string]interface{}{"Message": "Fill the Nagarika survey form"})
		}
	case p.Type == 24:

		_, err := DB.Exec("UPDATE nagarikaprogramquestionnaire sp , gelathi_circle gel_circle left join training_participants tr_part ON gel_circle.gelathi_id = tr_part.id SET sp.module2=1,sp.M2f=? where sp.partcipantId=? and gel_circle.circle_id =?;", ffid, p.PartcipantId, p.Circle_id)
		if err != nil {
			json.NewEncoder(w).Encode(map[string]interface{}{"Message": err, "Status Code": "400 Bad Request"})
		}

		json.NewEncoder(w).Encode(map[string]interface{}{"Message": "Attendance added successfully for Nagarika Module2"})

	case p.Type == 25:

		_, err := DB.Exec("UPDATE nagarikaprogramquestionnaire sp , gelathi_circle gel_circle left join training_participants tr_part ON gel_circle.gelathi_id = tr_part.id SET sp.module3=1,sp.M3f=? where sp.partcipantId=? and gel_circle.circle_id =?;", ffid, p.PartcipantId, p.Circle_id)
		if err != nil {
			return
		}

		json.NewEncoder(w).Encode(map[string]interface{}{"Message": "Attendance added successfully for Nagarika Module3"})

	case p.Type == 26:
		_, err := DB.Exec("UPDATE nagarikaprogramquestionnaire sp , gelathi_circle gel_circle left join training_participants tr_part ON gel_circle.gelathi_id = tr_part.id SET sp.module4=1,sp.M4f=? where sp.partcipantId=? and gel_circle.circle_id =?;", ffid, p.PartcipantId, p.Circle_id)
		if err != nil {
			w.WriteHeader(http.StatusBadRequest)
			json.NewEncoder(w).Encode(map[string]interface{}{"Message": err, "Status Code": "400 Bad Request"})
			return
		}

		json.NewEncoder(w).Encode(map[string]interface{}{"Message": "Attendance added successfully for Nagaraika Module4"})

	case p.Type == 27:

		_, err := DB.Exec("UPDATE nagarikaprogramquestionnaire sp , gelathi_circle gel_circle left join training_participants tr_part ON gel_circle.gelathi_id = tr_part.id SET sp.module5=1,sp.M5f=? where sp.partcipantId=? and gel_circle.circle_id =?;", ffid, p.PartcipantId, p.Circle_id)
		if err != nil {
			w.WriteHeader(http.StatusBadRequest)
			json.NewEncoder(w).Encode(map[string]interface{}{"Message": err, "Status Code": "400 Bad Request"})
			return
		}

		json.NewEncoder(w).Encode(map[string]interface{}{"Message": "Attendance added successfully for Nagarika Module5"})
	case p.Type == 28:

		_, err := DB.Exec("UPDATE nagarikaprogramquestionnaire sp , gelathi_circle gel_circle left join training_participants tr_part ON gel_circle.gelathi_id = tr_part.id SET sp.module6=1,sp.M6f=? where sp.partcipantId=? and gel_circle.circle_id =?;", ffid, p.PartcipantId, p.Circle_id)
		if err != nil {
			w.WriteHeader(http.StatusBadRequest)
			json.NewEncoder(w).Encode(map[string]interface{}{"Message": err, "Status Code": "400 Bad Request"})
			return
		}

		json.NewEncoder(w).Encode(map[string]interface{}{"Message": "Attendance added successfully for Nagarika Module6"})

	default:
		json.NewEncoder(w).Encode(map[string]interface{}{"Message": "Invalid Attendance"})

	}
}
