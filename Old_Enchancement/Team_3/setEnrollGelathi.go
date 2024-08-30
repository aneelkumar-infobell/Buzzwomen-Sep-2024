package Team_3

import (
	"database/sql"
	"encoding/json"
	"fmt"
	"net/http"
	"strconv"
	"time"
)

type EnrollRequest struct {
	ID           string `json:"id"`
	TbID         string `json:"tb_id"`
	GelathiID    string `json:"gelathi_id"`
	ProjectID    string `json:"projectId"`
	EnrolledDate string `json:"enrolledDate"`
}

func SetEnrollGelathi(w http.ResponseWriter, r *http.Request, db *sql.DB) {
	w.Header().Set("Access-Control-Allow-Headers", "Accept, Content-Type, Content-Length, Accept-Encoding, X-CSRF-Token, Authorization, application/json")
	w.Header().Set("Access-Control-Allow-Origin", "*")
	w.Header().Set("Access-Control-Allow-Methods", "POST, GET, OPTIONS, PUT, DELETE")
	w.Header().Set("Content-Type", "application/json")
	if r.Method != "POST" {
		w.WriteHeader(http.StatusNotFound)
		json.NewEncoder(w).Encode(map[string]interface{}{"code": http.StatusNotFound, "message": "Method Not found", "success": false})
		return
	}
	var request EnrollRequest

	err := json.NewDecoder(r.Body).Decode(&request)
	if err != nil {
		http.Error(w, err.Error(), http.StatusBadRequest)
		json.NewEncoder(w).Encode(map[string]interface{}{"code": http.StatusBadRequest, "message": "Give correct details in the body", "success": false, "error": err})
		return
	}
	// response := EnrollResponse{}

	if request.ID != "" && request.TbID != "" && request.GelathiID != "" && request.ProjectID != "" {
		ID, _ := strconv.Atoi(request.ID)
		TbID, _ := strconv.Atoi(request.TbID)
		GelathiID, _ := strconv.Atoi(request.GelathiID)
		ProjectID, _ := strconv.Atoi(request.ProjectID)
		enrolledDate := time.Now().Format("2006-01-02 15:04:05")
		if ID > 0 && TbID != 0 {
			fmt.Println("jsdfjb")
			var participantID1 int
			checkIfEnrolledPreviously1 := fmt.Sprintf("SELECT id FROM training_participants tp WHERE enroll = 0 AND tb_id = %d", TbID)
			checkRes1, err := db.Query(checkIfEnrolledPreviously1)
			if err != nil {
				w.WriteHeader(http.StatusInternalServerError)
				json.NewEncoder(w).Encode(map[string]interface{}{"code": http.StatusBadRequest, "message": "Error while Executing the query", "success": false, "error": err})
				return
			}

			if checkRes1.Next() {

				err := checkRes1.Scan(&participantID1)
				if err != nil {
					w.WriteHeader(http.StatusInternalServerError)
					json.NewEncoder(w).Encode(map[string]interface{}{"code": http.StatusBadRequest, "message": "Error while scanning", "success": false, "error": err})
					return
				}
				updateSet := fmt.Sprintf("UPDATE training_participants SET enroll = '1', gelathi_id = %d, enroll_date = '%s', enrolledProject = %d WHERE tb_id = %d AND id = %d", participantID1, enrolledDate, ProjectID, TbID, ID)
				fmt.Println("updateSet", updateSet)
				_, err = db.Exec(updateSet)
				fmt.Println(updateSet)
				if err != nil {
					w.WriteHeader(http.StatusInternalServerError)
					json.NewEncoder(w).Encode(map[string]interface{}{"code": http.StatusBadRequest, "message": "Error while Executing the query", "success": false, "error": err})
					return
				}

			}

			//============================================================= getting enroll=1 =================================================

			checkIfEnrolledPreviously := fmt.Sprintf("SELECT id FROM training_participants tp WHERE enroll = 1 AND tb_id = %d", TbID)
			//fmt.Println("checkIfEnrolledPreviously", checkIfEnrolledPreviously)
			checkRes, err := db.Query(checkIfEnrolledPreviously)
			if err != nil {
				w.WriteHeader(http.StatusInternalServerError)
				json.NewEncoder(w).Encode(map[string]interface{}{"code": http.StatusBadRequest, "message": "Error while Executing the query", "success": false, "error": err})
				return
			}

			fmt.Println(checkIfEnrolledPreviously)
			defer checkRes.Close()
			var participantID int
			if checkRes.Next() {

				err := checkRes.Scan(&participantID)
				if err != nil {
					w.WriteHeader(http.StatusInternalServerError)
					json.NewEncoder(w).Encode(map[string]interface{}{"code": http.StatusBadRequest, "message": "Error while scanning", "success": false, "error": err})
					return
				}

				if participantID > 0 {
					updateReset := fmt.Sprintf("UPDATE training_participants SET enroll = '2', enroll_date = '%s' WHERE id = %d", enrolledDate, participantID)

					fmt.Println("updateReset", updateReset)
					_, err = db.Exec(updateReset)
					if err != nil {
						w.WriteHeader(http.StatusInternalServerError)
						json.NewEncoder(w).Encode(map[string]interface{}{"code": http.StatusBadRequest, "message": "Error while executing the query", "success": false, "error": err})
						return
					}

				}
				updateSet := fmt.Sprintf("UPDATE training_participants SET enroll = '1', gelathi_id = %d, enroll_date = '%s', enrolledProject = %d WHERE tb_id = %d AND id = %d", GelathiID, enrolledDate, ProjectID, TbID, ID)
				fmt.Println("updateSet", updateSet)
				_, err = db.Exec(updateSet)
				fmt.Println(updateSet)
				if err != nil {
					w.WriteHeader(http.StatusInternalServerError)
					json.NewEncoder(w).Encode(map[string]interface{}{"code": http.StatusBadRequest, "message": "Error while Executing the query", "success": false, "error": err})
					return
				}
			}

		}

		w.Header().Set("Content-Type", "application/json")
		// Return JSON response indicating success
		json.NewEncoder(w).Encode(map[string]interface{}{"code": http.StatusOK, "message": "Successfully", "success": true})
		return
	} else {
		w.Header().Set("Content-Type", "application/json")
		// Return JSON response indicating success
		json.NewEncoder(w).Encode(map[string]interface{}{"code": http.StatusBadRequest, "message": "fill all the required fields", "success": false})
		return
	}

}
