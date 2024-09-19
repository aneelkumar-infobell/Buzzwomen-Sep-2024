package projectflexibility

import (
	"database/sql"
	"encoding/json"
	"fmt"
	"io/ioutil"
	"log"
	"net/http"
	"time"
)

type AssignFunder struct {
	ID         int    `json:"id"`
	FunderId   int    `json:"funderID"`
	ProjectID  int    `json:"project_id"`
	FStartDate string `json:"fstartDate"`
	FEnd_date  string `json:"fendDate"`
	Flag       int    `json:"flag"`
}

// func AssignNewFunder(w http.ResponseWriter, r *http.Request, db *sql.DB) {
// 	w.Header().Set("Access-Control-Allow-Headers", "Accept, Content-Type, Content-Length, Accept-Encoding, X-CSRF-Token, Authorization,application/json,Token")
// 	w.Header().Set("Access-Control-Allow-Origin", "*")
// 	w.Header().Set("Access-Control-Allow-Methods", "POST, GET, OPTIONS, PUT, DELETE")
// 	w.Header().Set("Access-Control-Allow-Credentials", "true")

// 	data, err := ioutil.ReadAll(r.Body)
// 	if err != nil {
// 		http.Error(w, err.Error(), http.StatusInternalServerError)
// 		return
// 	}

// 	var request AssignFunder
// 	err = json.Unmarshal(data, &request)
// 	if err != nil {
// 		http.Error(w, err.Error(), http.StatusBadRequest)
// 		return
// 	}

// 	//activeFlag := 0
// 	selectQuery := "SELECT id, funderid FROM multiple_funder WHERE projectid = ? and active_flag=0 AND fend_date IS NULL"

// 	// Prepare the SQL query with the parameters
// 	stmt, err := db.Prepare(selectQuery)
// 	if err != nil {
// 		json.NewEncoder(w).Encode(map[string]interface{}{
// 			"code":    http.StatusInternalServerError,
// 			"message": "Failed to prepare select query",
// 			"success": false,
// 		})
// 		return
// 	}
// 	defer stmt.Close()

// 	// Execute the query (use QueryRow since you're expecting one result)
// 	var funderID, Id int
// 	err = stmt.QueryRow(request.ProjectID).Scan(&Id, &funderID)
// 	if err != nil {
// 		json.NewEncoder(w).Encode(map[string]interface{}{
// 			"code":    http.StatusInternalServerError,
// 			"message": "Failed to execute select query",
// 			"success": false,
// 		})
// 		return
// 	}
// 	fmt.Println("id", Id)
// 	fmt.Println("funder id", funderID)
// 	// Inserting into the multiple funder tables
// 	fstartDate := time.Now().Format("2006-01-02")
// 	fendDate := sql.NullString{String: "", Valid: false} // or use NULL
// 	query := "INSERT INTO multiple_funder (projectid, funderid, fstart_date, fend_date, active_flag) values (?,?,?,?,0)"

// 	stmtInsert, err := db.Prepare(query)
// 	if err != nil {
// 		log.Println(err)
// 		w.WriteHeader(http.StatusInternalServerError)
// 		json.NewEncoder(w).Encode(map[string]interface{}{"status": "500 Internal Server Error", "message": err.Error()})
// 		return
// 	}
// 	defer stmtInsert.Close()

// 	// Execute the INSERT query
// 	result1, err := stmtInsert.Exec(request.ProjectID, request.FunderId, fstartDate, fendDate)
// 	if err != nil {
// 		fmt.Println("ff", result1)
// 		log.Println("Error executing insert query:", err)
// 		w.WriteHeader(http.StatusInternalServerError)
// 		json.NewEncoder(w).Encode(map[string]interface{}{
// 			"status":  "500 Internal Server Error",
// 			"message": err.Error(),
// 		})
// 		return
// 	}
// 	// updating the details for the previous funder

// 	updateQuery := "UPDATE multiple_funder SET fend_date=?, flag=1 WHERE id = ? and project_id=? and funderid=?"

// 	// Execute the SQL query with the parameters
// 	stmt, err = db.Prepare(updateQuery)
// 	if err != nil {
// 		json.NewEncoder(w).Encode(map[string]interface{}{"code": http.StatusInternalServerError, "message": "Failed to update training participants data", "success": false})

// 	}

// 	defer stmt.Close()
// 	sqlResult, err := stmt.Exec(fstartDate, Id, request.ProjectID, funderID)
// 	if err != nil {
// 		json.NewEncoder(w).Encode(map[string]interface{}{"code": http.StatusInternalServerError, "message": "Failed to executes a prepared statement", "success": false})
// 	}

// 	rowsAffected, _ := sqlResult.RowsAffected()

// 	if rowsAffected > 0 {
// 		// Update successfully

// 		json.NewEncoder(w).Encode(map[string]interface{}{"code": http.StatusOK, "message": "Funder  updated successfully", "success": true})

// 	} else {
// 		// Update did not affect any rows
// 		json.NewEncoder(w).Encode(map[string]interface{}{"code": 404, "message": "New Funder added", "success": false})
// 	}

// }
func AssignNewFunder(w http.ResponseWriter, r *http.Request, db *sql.DB) {
	w.Header().Set("Access-Control-Allow-Headers", "Accept, Content-Type, Content-Length, Accept-Encoding, X-CSRF-Token, Authorization,application/json,Token")
	w.Header().Set("Access-Control-Allow-Origin", "*")
	w.Header().Set("Access-Control-Allow-Methods", "POST, GET, OPTIONS, PUT, DELETE")
	w.Header().Set("Access-Control-Allow-Credentials", "true")

	data, err := ioutil.ReadAll(r.Body)
	if err != nil {
		http.Error(w, err.Error(), http.StatusInternalServerError)
		return
	}

	var request AssignFunder
	err = json.Unmarshal(data, &request)
	if err != nil {
		http.Error(w, err.Error(), http.StatusBadRequest)
		return
	}

	selectQuery := "SELECT id, funderid FROM multiple_funder WHERE projectid = ? and active_flag=0 AND fend_date IS NULL"

	// Prepare the SQL query with the parameters
	stmtSelect, err := db.Prepare(selectQuery)
	if err != nil {
		json.NewEncoder(w).Encode(map[string]interface{}{
			"code":    http.StatusInternalServerError,
			"message": "Failed to prepare select query",
			"success": false,
		})
		return
	}
	defer stmtSelect.Close()

	// Execute the query (use QueryRow since you're expecting one result)
	var funderID, Id int
	err = stmtSelect.QueryRow(request.ProjectID).Scan(&Id, &funderID)
	if err != nil {
		// Handle no rows case explicitly
		if err == sql.ErrNoRows {
			fmt.Println("err2", err)
			json.NewEncoder(w).Encode(map[string]interface{}{
				"code":    404,
				"message": "No previous active funder found",
				"success": false,
			})
		} else {
			json.NewEncoder(w).Encode(map[string]interface{}{
				"code":    http.StatusInternalServerError,
				"message": "Failed to execute select query",
				"success": false,
			})
		}
		return
	}
	fmt.Println("id", Id)
	fmt.Println("funder id", funderID)

	// Inserting into the multiple funder tables
	fstartDate := time.Now().Format("2006-01-02")
	fendDate := sql.NullString{String: "", Valid: false} // or use NULL
	insertQuery := "INSERT INTO multiple_funder (projectid, funderid, fstart_date, fend_date, active_flag) values (?,?,?,?,0)"

	stmtInsert, err := db.Prepare(insertQuery)
	if err != nil {
		log.Println(err)
		w.WriteHeader(http.StatusInternalServerError)
		json.NewEncoder(w).Encode(map[string]interface{}{"status": "500 Internal Server Error", "message": err.Error()})
		return
	}
	defer stmtInsert.Close()

	// Execute the INSERT query
	result1, err := stmtInsert.Exec(request.ProjectID, request.FunderId, fstartDate, fendDate)
	if err != nil {
		log.Println("Error executing insert query:", err)
		w.WriteHeader(http.StatusInternalServerError)
		json.NewEncoder(w).Encode(map[string]interface{}{
			"status":  "500 Internal Server Error",
			"message": err.Error(),
		})
		return
	}
	// updating the details for the previous funder
	updateQuery := "UPDATE multiple_funder SET fend_date=?, active_flag=1 WHERE id = ? and projectid=? and funderid=?"

	stmtUpdate, err := db.Prepare(updateQuery)
	if err != nil {
		fmt.Println("err", err)
		json.NewEncoder(w).Encode(map[string]interface{}{
			"code":    http.StatusInternalServerError,
			"message": "Failed to prepare update query",
			"success": false,
		})
		return
	}
	defer stmtUpdate.Close()

	// Execute the UPDATE query
	sqlResult, err := stmtUpdate.Exec(fstartDate, Id, request.ProjectID, funderID)
	if err != nil {
		fmt.Println("err1", err)
		json.NewEncoder(w).Encode(map[string]interface{}{
			"code":    http.StatusInternalServerError,
			"message": "Failed to prepare update query",
			"success": false,
		})
		return
	}
	fmt.Println("", sqlResult)
	fmt.Println("", result1)
	defer stmtUpdate.Close()
	json.NewEncoder(w).Encode(map[string]interface{}{
		"code":    http.StatusOK,
		"message": "Funder Assigned successfully",
		"success": true,
	})
}
