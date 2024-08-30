package Team_4

import (
	"database/sql"
	"encoding/json"
	"fmt"
	"log"
	"net/http"
	"time"
)

type BusRequest struct {
	ID                int    `json:"id"`
	BusID             int    `json:"bus_id"`
	Date              string `json:"date"`
	ProjectID         int    `json:"project_id"`
	SufficientDiesel  int    `json:"sufficient_diesel"`
	TyresAirCondition int    `json:"tyres_air_condition"`
	Battery           int    `json:"battery"`
	SwitchBox         int    `json:"switch_box"`
	LedTVRemote       int    `json:"led_tv_remote"`
	Fan               int    `json:"fan"`
	TubeLights        int    `json:"tube_lights"`
	Mic               int    `json:"mic"`
	JockLiver         int    `json:"jock_liver"`
	WheelSpanner      int    `json:"wheel_spanner"`
	CanopyUnfoldRod   int    `json:"canopy_unfold_rod"`
	Speaker           int    `json:"speaker"`
	Chairs            int    `json:"chairs"`
	TentSidewall      int    `json:"tent_sidewall"`
	Tray              int    `json:"tray"`
	VehicleClean      int    `json:"vehicle_clean"`
	FinalSave         string `json:"finalSave"`
	Code              int    `json:"code"`
	Success           bool   `json:"success"`
	Message           string `json:"message"`
}

func AddBusCheckList(w http.ResponseWriter, r *http.Request, DB *sql.DB) {
	if r.Method != "POST" {
		w.WriteHeader(http.StatusNotFound)
		json.NewEncoder(w).Encode(map[string]interface{}{"code": http.StatusNotFound, "message": "Method Not found", "success": false})
		return
	}

	var request BusRequest
	err := json.NewDecoder(r.Body).Decode(&request)
	if err != nil {
		json.NewEncoder(w).Encode(map[string]interface{}{"code": http.StatusBadRequest, "message": "Invalid Request Body", "success": false, "error": err})
		return
	}

	if request.BusID == 0 || request.ProjectID == 0 {
		w.WriteHeader(http.StatusBadRequest)
		json.NewEncoder(w).Encode(map[string]interface{}{"code": http.StatusBadRequest, "message": "Bus ID/ Project ID can't be zero", "success": false})
		return
	}

	// var busID, projId int
	var date int

	checkCount := request.SufficientDiesel + request.TyresAirCondition + request.Battery + request.SwitchBox + request.LedTVRemote + request.Fan + request.TubeLights + request.Mic + request.JockLiver + request.WheelSpanner + request.CanopyUnfoldRod + request.Speaker + request.Chairs + request.TentSidewall + request.Tray + request.VehicleClean

	fmt.Println(checkCount)

	// Check if there is already an entry for the given date and bus ID
	err2 := DB.QueryRow("SELECT COUNT(date_checked) FROM bus_checklist WHERE bus_id=? AND date_checked=?", request.BusID, request.Date).Scan(&date)
	if err2 != nil {
		log.Println(err2)
		json.NewEncoder(w).Encode(map[string]interface{}{"code": http.StatusInternalServerError, "message": "Database error", "success": false})
		return
	}

	if date == 0 {
		// Insert new entry if no existing entry found
		_, err = DB.Exec(`INSERT INTO bus_checklist (
            project_id, bus_id, date_checked, sufficient_diesel, tyres_air_condition, battery, switch_box,
            led_tv_remote, fan, tube_lights, mic, jock_liver, wheel_spanner, canopy_unfold_rod, speaker, chairs, tent_sidewall, tray, vehicle_clean,
            check_count, final_save
        ) VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,1)`,
			request.ProjectID, request.BusID, request.Date, request.SufficientDiesel, request.TyresAirCondition, request.Battery, request.SwitchBox,
			request.LedTVRemote, request.Fan, request.TubeLights, request.Mic, request.JockLiver, request.WheelSpanner, request.CanopyUnfoldRod,
			request.Speaker, request.Chairs, request.TentSidewall, request.Tray, request.VehicleClean, checkCount)
		if err != nil {
			fmt.Println("error", err)
			w.WriteHeader(http.StatusBadRequest)
			log.Println(err)
			json.NewEncoder(w).Encode(map[string]interface{}{"code": http.StatusBadRequest, "message": "Database insert error", "success": false, "error": err})
			return
		}

		json.NewEncoder(w).Encode(map[string]interface{}{"code": http.StatusOK, "message": "Bus CheckList Added Successfully", "success": true})
	} else {
		// If entry exists for the given date and bus ID, retrieve the data
		if request.Date == "" {
			request.Date = time.Now().Format("2006-01-02")
		}

		count := 0
		err = DB.QueryRow("SELECT COUNT(bus_id) FROM bus_checklist WHERE bus_id=?", request.BusID).Scan(&count)
		if err != nil {
			w.WriteHeader(http.StatusBadRequest)
			json.NewEncoder(w).Encode(map[string]interface{}{"code": http.StatusBadRequest, "message": "Failed to execute the query", "success": false})
			return
		}

		// If there are entries for the given bus ID, retrieve the data
		if count != 0 && request.BusID != 0 {
			fields := "bus_list.id, bus_list.sufficient_diesel, bus_list.tyres_air_condition, bus_list.battery, bus_list.switch_box, bus_list.led_tv_remote, bus_list.fan, bus_list.tube_lights, bus_list.mic, bus_list.jock_liver, bus_list.wheel_spanner, bus_list.canopy_unfold_rod, bus_list.speaker, bus_list.chairs, bus_list.tent_sidewall , bus_list.tray, bus_list.vehicle_clean"

			query := fmt.Sprintf("SELECT %s FROM bus_checklist bus_list WHERE bus_list.bus_id = %s AND bus_list.date_checked = '%s'", fields, fmt.Sprint(request.BusID), request.Date)

			rows, err := DB.Query(query)
			if err != nil {
				w.WriteHeader(http.StatusBadRequest)
				json.NewEncoder(w).Encode(map[string]interface{}{"code": http.StatusBadRequest, "message": "Failed to execute the query", "success": false})
				return
			}

			var response BusRequest
			for rows.Next() {
				rows.Scan(&response.ID, &response.SufficientDiesel, &response.TyresAirCondition, &response.Battery, &response.SwitchBox, &response.LedTVRemote, &response.Fan, &response.TubeLights, &response.Mic, &response.JockLiver, &response.WheelSpanner, &response.CanopyUnfoldRod, &response.Speaker, &response.Chairs, &response.TentSidewall, &response.Tray, &response.VehicleClean)
			}

			// Set additional fields from the request
			response.ProjectID = request.ProjectID
			response.Date = request.Date
			response.Code = http.StatusOK
			response.Message = "Data Already Inserted"
			response.Success = true

			json.NewEncoder(w).Encode(response)

		} else {
			// If there are no entries for the given bus ID, return an error response
			jsonData, err := json.Marshal(map[string]interface{}{"message": "invalid bus id", "code": http.StatusBadRequest, "success": false})
			if err != nil {
				w.WriteHeader(http.StatusBadRequest)
				json.NewEncoder(w).Encode(map[string]interface{}{"code": http.StatusBadRequest, "message": "Failed to execute the query", "success": false})
				return
			}
			w.Write(jsonData)
		}
	}
}
