package Team_4

import (
	"database/sql"
	"encoding/json"
	"fmt"
	"io/ioutil"
	"log"
	"net/http"
)

func GetLocationName(w http.ResponseWriter, r *http.Request, db *sql.DB) {
	// Set CORS headers
	w.Header().Set("Access-Control-Allow-Headers", "Accept, Content-Type, Content-Length, Accept-Encoding, X-CSRF-Token, Authorization, application/json,Token")
	w.Header().Set("Access-Control-Allow-Origin", "*")
	w.Header().Set("Access-Control-Allow-Methods", "POST, GET, OPTIONS, PUT, DELETE")

	// Check if the request method is POST
	if r.Method != "POST" {
		w.WriteHeader(http.StatusNotFound)
		json.NewEncoder(w).Encode(map[string]interface{}{"code": http.StatusMethodNotAllowed, "message": "Method Not found", "success": false})
		return
	}

	// Read the request body
	data, err := ioutil.ReadAll(r.Body)
	if err != nil {
		// Log the error
		log.Println("Failed to read request body:", err)
		w.WriteHeader(http.StatusBadRequest)
		json.NewEncoder(w).Encode(map[string]interface{}{"code": http.StatusBadRequest, "message": "Failed to read request body", "success": false, "Error": err})
		return
	}

	// Parse the JSON request body
	var request map[string]interface{}
	err = json.Unmarshal(data, &request)
	if err != nil {
		// Log the error
		log.Println("Failed to parse JSON request body:", err)
		w.WriteHeader(http.StatusBadRequest)
		json.NewEncoder(w).Encode(map[string]interface{}{"code": http.StatusBadRequest, "message": "Invalid JSON format", "success": false, "Error": err})
		return
	}

	// Extract latitude and longitude from the request
	latitude, ok := request["latitude"].(string)
	if !ok {
		// Log the error
		log.Println("Latitude is not a string")
		w.WriteHeader(http.StatusBadRequest)
		json.NewEncoder(w).Encode(map[string]interface{}{"code": http.StatusBadRequest, "message": "Latitude must be a string", "success": false})
		return
	}

	longitude, ok := request["longitude"].(string)
	if !ok {
		// Log the error
		log.Println("Longitude is not a string")
		w.WriteHeader(http.StatusBadRequest)
		json.NewEncoder(w).Encode(map[string]interface{}{"code": http.StatusBadRequest, "message": "Longitude must be a string", "success": false})
		return
	}

	// Perform the API request to get location name
	// Construct the URL using Google Maps API key
	googleMapsAPIKey := "AIzaSyCIkZ1MdsQEVuH_seSl3PdSI8fPeuGpOAM"
	url := fmt.Sprintf("https://maps.googleapis.com/maps/api/geocode/json?key=%s&latlng=%s,%s", googleMapsAPIKey, latitude, longitude)
	// Make the HTTP request
	apiResponse, err := http.Get(url)
	if err != nil {
		// Log the error
		log.Println("Failed to make API request:", err)
		w.WriteHeader(http.StatusInternalServerError)
		json.NewEncoder(w).Encode(map[string]interface{}{"code": http.StatusInternalServerError, "message": "Failed to make API request", "success": false, "Error": err})
		return
	}
	defer apiResponse.Body.Close()

	// Check if the request was successful
	if apiResponse.StatusCode != http.StatusOK {
		// Log the error
		log.Printf("API request failed with status code: %d", apiResponse.StatusCode)
		w.WriteHeader(http.StatusInternalServerError)
		json.NewEncoder(w).Encode(map[string]interface{}{"code": http.StatusInternalServerError, "message": "API request failed", "success": false, "StatusCode": apiResponse.StatusCode})
		return
	}

	// Read the response body
	body, err := ioutil.ReadAll(apiResponse.Body)
	if err != nil {
		// Log the error
		log.Println("Failed to read response body:", err)
		w.WriteHeader(http.StatusInternalServerError)
		json.NewEncoder(w).Encode(map[string]interface{}{"code": http.StatusInternalServerError, "message": "Failed to read response body", "success": false, "Error": err})
		return
	}

	// Parse the JSON response body
	var result map[string]interface{}
	err = json.Unmarshal(body, &result)
	if err != nil {
		// Log the error
		log.Println("Failed to parse JSON response body:", err)
		w.WriteHeader(http.StatusInternalServerError)
		json.NewEncoder(w).Encode(map[string]interface{}{"code": http.StatusInternalServerError, "message": "Failed to parse JSON response body", "success": false, "Error": err})
		return
	}

	// Check if the response contains any results
	if len(result["results"].([]interface{})) == 0 {
		// Log the error
		log.Println("No results found in the response")
		w.WriteHeader(http.StatusInternalServerError)
		json.NewEncoder(w).Encode(map[string]interface{}{"code": http.StatusInternalServerError, "message": "No results found in the response", "success": false})
		return
	}

	// Extract location name from the first result
	location := result["results"].([]interface{})[0].(map[string]interface{})["formatted_address"].(string)

	// Write the location name to the response
	w.Header().Set("Content-Type", "application/json")
	w.WriteHeader(http.StatusOK)
	w.Write([]byte(location))
}
