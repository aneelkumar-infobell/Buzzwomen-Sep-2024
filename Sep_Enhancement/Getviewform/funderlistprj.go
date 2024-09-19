package Getviewform

import (
	"database/sql"
	"encoding/json"
	"io/ioutil"
	"log"
	"net/http"
)

type Funder struct {
	FunderID   string `json:"funderID"`
	FunderName string `json:"funderName"`
}

type Funder1 struct {
	List    []Funder `json:"list"`
	Code    int      `json:"code"`
	Message string   `json:"message"`
	Success bool     `json:"success"`
}

type RequestBody struct {
	ProjectID string `json:"projectID"`
}

func GetFunderProjectList(w http.ResponseWriter, r *http.Request, DB *sql.DB) {
	w.Header().Set("Access-Control-Allow-Headers", "Accept, Content-Type, Content-Length, Accept-Encoding, X-CSRF-Token, Authorization, application/json, Token")
	w.Header().Set("Access-Control-Allow-Origin", "*")
	w.Header().Set("Access-Control-Allow-Methods", "POST, GET, OPTIONS, PUT, DELETE")

	if r.Method != http.MethodPost {
		w.WriteHeader(405) // Return 405 Method Not Allowed.
		json.NewEncoder(w).Encode(map[string]interface{}{"Message": "method not found", "Status Code": "405 "})
		return
	}

	// Parse request body to get projectID
	body, err := ioutil.ReadAll(r.Body)
	if err != nil {
		log.Println("Error reading request body:", err)
		http.Error(w, "Bad Request", http.StatusBadRequest)
		return
	}

	var requestBody RequestBody
	err = json.Unmarshal(body, &requestBody)
	if err != nil {
		log.Println("Error unmarshalling request body:", err)
		http.Error(w, "Bad Request", http.StatusBadRequest)
		return
	}

	projectID := requestBody.ProjectID

	// Query to fetch funders based on projectID
	query := `
		SELECT f.funderID, f.funderName FROM funder f  join multiple_funder mp on mp.funderid=f.funderID 
WHERE f.status = 1 and mp.projectid=? ORDER BY f.funderID DESC, f.funderName
	`

	rows, err := DB.Query(query, projectID)
	if err != nil {
		log.Println("Error executing query:", err)
		http.Error(w, "Internal Server Error", http.StatusInternalServerError)
		return
	}
	defer rows.Close()

	var funderList []Funder

	for rows.Next() {
		var funder Funder
		err := rows.Scan(&funder.FunderID, &funder.FunderName)
		if err != nil {
			log.Println("Error scanning row:", err)
			http.Error(w, "Internal Server Error", http.StatusInternalServerError)
			return
		}

		funderList = append(funderList, funder)
	}

	response := Funder1{
		List:    funderList,
		Code:    200,
		Success: true,
		Message: "successfully",
	}

	jsonResponse, err := json.Marshal(response)
	if err != nil {
		log.Println("Error marshaling JSON:", err)
		http.Error(w, "Internal Server Error", http.StatusInternalServerError)
		return
	}

	w.WriteHeader(http.StatusOK)
	w.Write(jsonResponse)
}
