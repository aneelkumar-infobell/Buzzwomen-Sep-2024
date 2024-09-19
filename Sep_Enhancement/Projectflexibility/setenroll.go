package Projectflexibility

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

func SetEnrollGelathinew1(w http.ResponseWriter, r *http.Request, db *sql.DB) {

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

	ID, _ := strconv.Atoi(request.ID)
	TbID, _ := strconv.Atoi(request.TbID)
	GelathiID, _ := strconv.Atoi(request.GelathiID)
	ProjectID, _ := strconv.Atoi(request.ProjectID)

	var funderid, ffid int
	var funder1enddate string
	enrolledDate := time.Now().Format("2006-01-02 15:04:05")

	var participantID1, enroll int

	if request.ID != "" && request.TbID != "" && request.GelathiID != "" && request.ProjectID != "" {

		checkIfEnrolledPreviously1 := fmt.Sprintf("SELECT id,enroll FROM training_participants tp WHERE tb_id = %d", TbID)
		checkRes1, err := db.Query(checkIfEnrolledPreviously1)
		if err != nil {
			w.WriteHeader(http.StatusInternalServerError)
			json.NewEncoder(w).Encode(map[string]interface{}{"code": http.StatusBadRequest, "message": "Error while Executing the query", "success": false, "error": err})
			return
		}

		for checkRes1.Next() {

			err := checkRes1.Scan(&participantID1, &enroll)
			if err != nil {
				w.WriteHeader(http.StatusInternalServerError)
				json.NewEncoder(w).Encode(map[string]interface{}{"code": http.StatusBadRequest, "message": "Error while scanning", "success": false, "error": err})
				return
			}

			switch enroll {
			case 0:

				activefunder, err := db.Query("SELECT COALESCE(fend_date,''),funderid FROM multiple_funder  WHERE  projectid = ?", ProjectID)
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
				if participantID1 == ID {
					updateSet := fmt.Sprintf("UPDATE training_participants SET enroll = '1', gelathi_id = %d, enroll_date = '%s', enrolledProject = %d, funderid= %d WHERE tb_id = %d AND id = %d", participantID1, enrolledDate, ProjectID, ffid, TbID, ID)

					_, err = db.Exec(updateSet)

					if err != nil {
						w.WriteHeader(http.StatusInternalServerError)
						json.NewEncoder(w).Encode(map[string]interface{}{"code": http.StatusBadRequest, "message": "Error while Executing the query", "success": false, "error": err})
						return
					}
				}
			case 1:
				if participantID1 == ID {
					updateReset := fmt.Sprintf("UPDATE training_participants SET enroll = '2', enroll_date = '%s' WHERE id = %d", enrolledDate, participantID1)

					fmt.Println("updateReset11111", updateReset)
					_, err = db.Exec(updateReset)
					if err != nil {
						w.WriteHeader(http.StatusInternalServerError)
						json.NewEncoder(w).Encode(map[string]interface{}{"code": http.StatusBadRequest, "message": "Error while executing the query", "success": false, "error": err})
						return
					}
				}
			case 2:
				if participantID1 == ID {
					updateSet := fmt.Sprintf("UPDATE training_participants SET enroll = '1', gelathi_id = %d, enroll_date = '%s', enrolledProject = %d WHERE tb_id = %d AND id = %d", GelathiID, enrolledDate, ProjectID, TbID, ID)
					fmt.Println("updateSet149", updateSet)
					_, err = db.Exec(updateSet)
					fmt.Println(updateSet)
					if err != nil {
						w.WriteHeader(http.StatusInternalServerError)
						json.NewEncoder(w).Encode(map[string]interface{}{"code": http.StatusBadRequest, "message": "Error while Executing the query", "success": false, "error": err})
						return
					}
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
