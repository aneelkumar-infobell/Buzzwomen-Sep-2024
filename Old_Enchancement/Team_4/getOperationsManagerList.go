package Team_4

//Done by Sushmitha
import (
	"database/sql"
	"encoding/json"
	"fmt"
	"log"
	"net/http"

	_ "github.com/go-sql-driver/mysql"
)

func GetOperationsManagerList(w http.ResponseWriter, r *http.Request, DB *sql.DB) {
	w.Header().Set("Access-Control-Allow-Headers", "Accept, Content-Type, Content-Length, Accept-Encoding, X-CSRF-Token, Authorization, application/json,Token")
	w.Header().Set("Access-Control-Allow-Origin", "*")
	w.Header().Set("Access-Control-Allow-Methods", "POST, GET, OPTIONS, PUT, DELETE")
	if r.Method != "POST" {
		w.WriteHeader(http.StatusNotFound)
		json.NewEncoder(w).Encode(map[string]interface{}{"code": http.StatusNotFound, "message": "Method Not found", "success": false})
		return
	}

	fields := "id, CONCAT(first_name, ' ', IFNULL(last_name, '')) as first_name"
	query := fmt.Sprintf("SELECT %s FROM employee WHERE status = 1 AND empRole IN (4, 12) ORDER BY id DESC", fields)

	rows, err := DB.Query(query)
	if err != nil {
		log.Println(err)
		w.WriteHeader(http.StatusBadRequest)
		json.NewEncoder(w).Encode(map[string]interface{}{"code": http.StatusBadRequest, "message": "Bad Request", "success": false, "error": err})
		return
	}
	defer rows.Close()

	var employees []Emp
	for rows.Next() {
		var employee Emp
		err := rows.Scan(&employee.ID, &employee.FirstName)
		if err != nil {
			log.Println(err)
			w.WriteHeader(http.StatusBadRequest)
			json.NewEncoder(w).Encode(map[string]interface{}{"code": http.StatusBadRequest, "message": "Bad Request", "success": false, "error": err})
			return
		}
		employees = append(employees, employee)
	}
	json.NewEncoder(w).Encode(map[string]interface{}{"list": employees, "code": http.StatusOK, "message": "Successfully", "success": true})
}
