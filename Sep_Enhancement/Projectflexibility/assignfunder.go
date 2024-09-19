package Projectflexibility

// import (
// 	"database/sql"
// 	"encoding/json"
// 	"io/ioutil"
// 	"net/http"
// )

// type AssignFunder struct {
// 	FunderId    int    `json:"participant_id"`
// 	ProjectID   int    `json:"project_id"`
// 	Start_date  string `json:"firstName"`
// 	End_date    string `json:"age"`
// 	HusbandName string `json:"husbandName"`
// }

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

// 	if request.ProjectID != 0 {
// 		json.NewEncoder(w).Encode(map[string]interface{}{"code": http.StatusBadRequest, "message": "ProjectID is required", "success": false})

// 	}

// 	if request.FunderId != 0 {
// 		json.NewEncoder(w).Encode(map[string]interface{}{"code": http.StatusBadRequest, "message": "FunderID is required", "success": false})

// 	}
// 	selectQuery := "SELECT funderID FROM project WHERE id = ?"

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
// 	var funderID int
// 	err = stmt.QueryRow(request.ProjectID).Scan(&funderID)
// 	if err != nil {
// 		json.NewEncoder(w).Encode(map[string]interface{}{
// 			"code":    http.StatusInternalServerError,
// 			"message": "Failed to execute select query",
// 			"success": false,
// 		})
// 		return
// 	}

// 	updateQuery := "UPDATE project SET funderID=? WHERE id = ?"

// 	// Execute the SQL query with the parameters
// 	stmt, err = db.Prepare(updateQuery)
// 	if err != nil {
// 		json.NewEncoder(w).Encode(map[string]interface{}{"code": http.StatusInternalServerError, "message": "Failed to update training participants data", "success": false})

// 	}

// 	defer stmt.Close()
// 	sqlResult, err = stmt.Exec(request.FunderId, request.ProjectID)
// 	if err != nil {
// 		json.NewEncoder(w).Encode(map[string]interface{}{"code": http.StatusInternalServerError, "message": "Failed to executes a prepared statement", "success": false})
// 	}

// 	updateQuery = "UPDATE funder SET funderstart_date=?, funderend_date=? WHERE id = ?"

// 	// Execute the SQL query with the parameters
// 	stmt, err = db.Prepare(updateQuery)
// 	if err != nil {
// 		json.NewEncoder(w).Encode(map[string]interface{}{"code": http.StatusInternalServerError, "message": "Failed to update training participants data", "success": false})

// 	}

// 	defer stmt.Close()
// 	sqlResult, err = stmt.Exec(request.FunderId, request.ProjectID)
// 	if err != nil {
// 		json.NewEncoder(w).Encode(map[string]interface{}{"code": http.StatusInternalServerError, "message": "Failed to executes a prepared statement", "success": false})
// 	}
// 	rowsAffected, _ := sqlResult.RowsAffected()

// 	if rowsAffected > 0 {
// 		// Update successfully

// 		json.NewEncoder(w).Encode(map[string]interface{}{"code": http.StatusOK, "message": "training participants updated successfully", "success": true})

// 	} else {
// 		// Update did not affect any rows
// 		json.NewEncoder(w).Encode(map[string]interface{}{"code": 404, "message": "training participants updated Unsuccessfully", "success": false})
// 	}

// }
