package Team_3

import (
	"database/sql"
	"encoding/json"
	"log"
	"net/http"
	"strings"
	"time"

	_ "github.com/go-sql-driver/mysql"
)

type RequestEditTB struct {
	Day1 string `json:"day1"`
	Day2 string `json:"day2"`
	TBId string `json:"tb_id"`
}

type Response11 struct {
	Code    int    `json:"code"`
	Message string `json:"message"`
	Success bool   `json:"success"`
}

func sendResponse(w http.ResponseWriter, response Response11) {
	jsonData, err := json.Marshal(response)
	if err != nil {
		log.Println("Error:", err)
		http.Error(w, "Internal server error", http.StatusInternalServerError)
		return
	}
	w.WriteHeader(response.Code)
	w.Write(jsonData)
}

func dataDiffValidation(date1, date2 string) int {
	layout := time.RFC3339
	d1, _ := time.Parse(layout, date1)
	d2, _ := time.Parse(layout, date2)
	return int(d2.Sub(d1).Hours() / 24)
}

func UpdateTrainingBatch(w http.ResponseWriter, r *http.Request, DB *sql.DB) {
	w.Header().Set("Access-Control-Allow-Headers", "Accept, Content-Type, Content-Length, Accept-Encoding, X-CSRF-Token, Authorization, application/json, Token")
	w.Header().Set("Access-Control-Allow-Origin", "*")
	w.Header().Set("Access-Control-Allow-Methods", "POST, GET, OPTIONS, PUT, DELETE")

	if r.Method != http.MethodPost {
		w.WriteHeader(405) // Return 405 Method Not Allowed.
		json.NewEncoder(w).Encode(map[string]interface{}{"Message": "method not found", "Status Code": "405"})
		return
	}

	var p RequestEditTB
	err := json.NewDecoder(r.Body).Decode(&p)
	if err != nil {
		log.Println(err)
		w.WriteHeader(http.StatusBadRequest)
		json.NewEncoder(w).Encode(map[string]interface{}{"Status": "400 Bad Request", "Message": err})
		return
	}

	id := p.TBId
	response := Response11{}

	if dataDiffValidation(p.Day1, p.Day2) < 3 {
		response.Code = 409
		response.Message = "To Date is less than 3 days"
		response.Success = false
		sendResponse(w, response)
		return
	}

	tx, err := DB.Begin()
	if err != nil {
		response.Code = 500
		response.Message = "Internal server error"
		response.Success = false
		sendResponse(w, response)
		return
	}

	defer func() {
		if r := recover(); r != nil {
			tx.Rollback()
			log.Println("Recovered in updateTrainingBatch:", r)
		}
	}()

	stmt, err := tx.Prepare("SELECT GROUP_CONCAT(id) as ids, user_id, GROUP_CONCAT(DATE_FORMAT(date, '%Y-%m-%d %H:%i')) as dates, project_id FROM tbl_poa WHERE tb_id = ? AND type = '1' GROUP BY tb_id, user_id")
	if err != nil {
		tx.Rollback()
		response.Code = 500
		response.Message = "Internal server error"
		response.Success = false
		sendResponse(w, response)
		return
	}

	var ids, dbDates, projectID string
	var userID int
	err = stmt.QueryRow(id).Scan(&ids, &userID, &dbDates, &projectID)
	if err != nil {
		tx.Rollback()
		response.Code = 500
		response.Message = "Internal server error"
		response.Success = false
		sendResponse(w, response)
		return
	}

	stmt.Close()

	dates := strings.Split(dbDates, ",")
	existDay1 := dates[0]
	existDay2 := dates[1]

	getProjectEndDateStmt, err := tx.Prepare("SELECT endDate FROM project WHERE id = ?")
	if err != nil {
		tx.Rollback()
		response.Code = 500
		response.Message = "Internal server error"
		response.Success = false
		sendResponse(w, response)
		return
	}

	var projEndDate string
	err = getProjectEndDateStmt.QueryRow(projectID).Scan(&projEndDate)
	if err != nil {
		tx.Rollback()
		response.Code = 500
		response.Message = "Internal server error"
		response.Success = false
		sendResponse(w, response)
		return
	}

	getProjectEndDateStmt.Close()

	projEndDate = projEndDate + " 23:59:59"
	t, _ := time.Parse(time.RFC3339, p.Day2)
	projEndDateParsed, _ := time.Parse("2006-01-02 15:04:05", projEndDate)

	if t.After(projEndDateParsed) {
		response.Code = 409
		response.Message = "Cannot create a training batch beyond the end date of project"
		response.Success = false
		sendResponse(w, response)
		return
	}

	if p.Day1 != "1970-01-01T00:00:00.000Z" && existDay1 != p.Day1 {
		stmt, err = tx.Prepare("SELECT count(id) as count FROM tbl_poa WHERE date = ? AND user_id = ? AND status != '2'")
		if err != nil {
			tx.Rollback()
			response.Code = 500
			response.Message = "Internal server error"
			response.Success = false
			sendResponse(w, response)
			return
		}

		var count int
		err = stmt.QueryRow(p.Day1, userID).Scan(&count)
		if err != nil {
			tx.Rollback()
			response.Code = 500
			response.Message = "Internal server error"
			response.Success = false
			sendResponse(w, response)
			return
		}

		stmt.Close()

		if count > 0 {
			response.Code = 400
			response.Message = "Day1 already exists for date & time"
			response.Success = false
			sendResponse(w, response)
			return
		}
	}

	if p.Day2 != "1970-01-01T00:00:00.000Z" && existDay2 != p.Day2 {
		stmt, err = tx.Prepare("SELECT count(id) as count FROM tbl_poa WHERE date = ? AND user_id = ? AND status != '2'")
		if err != nil {
			tx.Rollback()
			response.Code = 500
			response.Message = "Internal server error"
			response.Success = false
			sendResponse(w, response)
			return
		}

		var count int
		err = stmt.QueryRow(p.Day2, userID).Scan(&count)
		if err != nil {
			tx.Rollback()
			response.Code = 500
			response.Message = "Internal server error"
			response.Success = false
			sendResponse(w, response)
			return
		}

		stmt.Close()

		if count > 0 {
			response.Code = 400
			response.Message = "Day2 already exists for date & time"
			response.Success = false
			sendResponse(w, response)
			return
		}
	}

	idsArr := strings.Split(ids, ",")
	id1 := idsArr[0]
	id2 := idsArr[1]

	updateQuery1 := "UPDATE tbl_poa SET date = ? WHERE id = ?"
	_, err = tx.Exec(updateQuery1, p.Day1, id1)
	if err != nil {
		tx.Rollback()
		response.Code = 500
		response.Message = "Internal server error"
		response.Success = false
		sendResponse(w, response)
		return
	}

	updateQuery2 := "UPDATE tbl_poa SET date = ? WHERE id = ?"
	_, err = tx.Exec(updateQuery2, p.Day2, id2)
	if err != nil {
		tx.Rollback()
		response.Code = 500
		response.Message = "Internal server error"
		response.Success = false
		sendResponse(w, response)
		return
	}

	tx.Commit()

	response.Code = 200
	response.Message = "Training batch updated successfully"
	response.Success = true
	sendResponse(w, response)
}
