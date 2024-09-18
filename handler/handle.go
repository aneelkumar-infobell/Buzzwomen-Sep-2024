package handler

import (
	"encoding/json"
	"fmt"
	"log"
	"net/http"
	"time"

	a "buzzstaff-go/New_Enchancement/Attendence"
	d "buzzstaff-go/New_Enchancement/Dashboard"
	gp "buzzstaff-go/New_Enchancement/GP/Dashboard"
	gppf "buzzstaff-go/New_Enchancement/GP/Participant"
	q "buzzstaff-go/New_Enchancement/QualityAssessment"
	sppf "buzzstaff-go/New_Enchancement/SP/Participant"
	sp "buzzstaff-go/New_Enchancement/SP/SPDashboard"
	spf "buzzstaff-go/New_Enchancement/SS/Participant"
	ss "buzzstaff-go/New_Enchancement/SS/SSDashboard"
	vppf "buzzstaff-go/New_Enchancement/VP/Participant"
	vp "buzzstaff-go/New_Enchancement/VP/VPDashboard"
	t1 "buzzstaff-go/Old_Enchancement/Team_1"
	t2 "buzzstaff-go/Old_Enchancement/Team_2"
	t3 "buzzstaff-go/Old_Enchancement/Team_3"
	t4 "buzzstaff-go/Old_Enchancement/Team_4"
	t5 "buzzstaff-go/Old_Enchancement/Team_5"
	sep "buzzstaff-go/Sep_Enhancement/Getviewform"
	np "buzzstaff-go/Sep_Enhancement/NP/NPDashboard"
	npp "buzzstaff-go/Sep_Enhancement/NP/Participant"

	//sp1 "buzzstaff-go/Sep_Enhancement/NagarikaProgram/SpoorthiFile"
	dbs "buzzstaff-go/database"
	c "buzzstaff-go/job"

	"github.com/go-co-op/gocron"
	jwt "github.com/golang-jwt/jwt"
	"github.com/gorilla/mux"
	"github.com/rs/cors"
)

var mySigningKey = []byte("BuzzStaff")

func isAuthorized(endpoint func(http.ResponseWriter, *http.Request)) http.Handler {
	return http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
		if r.Header["Authorization"] != nil {
			token, err := jwt.Parse(r.Header["Authorization"][0], func(token *jwt.Token) (interface{}, error) {
				if _, ok := token.Method.(*jwt.SigningMethodHMAC); !ok {
					return nil, fmt.Errorf("there was an error")
				}
				return mySigningKey, nil
			})
			if err != nil {
				w.WriteHeader(http.StatusBadRequest)
				json.NewEncoder(w).Encode(map[string]interface{}{"Status": "400 Bad Request", "Message": "Invalid Authorization", "Error": err.Error()})
				return
			}

			// if token.Valid {
			// 	endpoint(w, r)
			// }

			if token.Valid {
				claims, ok := token.Claims.(jwt.MapClaims)
				if !ok {
					w.WriteHeader(http.StatusBadRequest)
					json.NewEncoder(w).Encode(map[string]interface{}{"Status": "400 Bad Request", "Message": "Invalid Authorization", "Error": "Invalid claims"})
					return
				}

				// Check if token has expired
				expirationTime := int64(claims["exp"].(float64))
				currentTime := time.Now().Unix()
				if expirationTime < currentTime {
					w.WriteHeader(http.StatusBadRequest)
					json.NewEncoder(w).Encode(map[string]interface{}{"Status": "400 Bad Request", "Message": "Token has expired"})
					return
				}

				endpoint(w, r)
			}
		} else {
			w.WriteHeader(http.StatusBadRequest)
			json.NewEncoder(w).Encode(map[string]interface{}{"Status": "400 Bad Request", "Message": "Not Authorized"})
			return
		}
	})
}

func HandleFunc() {

	db := dbs.Connect()

	router := mux.NewRouter()
	apiPrefix := "/appGoTest"
	apiRouter := router.PathPrefix(apiPrefix).Subrouter()

	corsHandler := cors.AllowAll()
	handler := corsHandler.Handler(router)

	s2 := gocron.NewScheduler(time.UTC)
	now2 := time.Now()
	status := time.Date(now2.Year(), now2.Month(), now2.Day(), 0, 0, 1, 0, now2.Location())
	if time.Now().After(status) {
		status = status.Add(24 * time.Hour)

	}
	s2.Every(1).Day().StartAt(status).Do(func() { c.CheckoutTb(db) })

	s2.StartAsync()

	//-------------------Endpoint for adding data to QAF---------------------------------------

	apiRouter.Handle("/addnagarikaprogram", isAuthorized(func(w http.ResponseWriter, r *http.Request) {
		sep.Addnagarikasurvey(w, r, db)
	}))
	//---------------------------Get Gelathi List----------------------------------
	apiRouter.Handle("/getSpoorthiForm", isAuthorized(func(w http.ResponseWriter, r *http.Request) {
		sep.GetBuzzSpoorthiProgramBaseline(w, r, db)
	}))
	apiRouter.HandleFunc("/getGreenBaselineSurvey", func(w http.ResponseWriter, r *http.Request) {
		sep.GetGreenBaselineSurvey(w, r, db)
	})
	apiRouter.HandleFunc("/addVyaparBaselineSurvey", func(w http.ResponseWriter, r *http.Request) {
		sep.AddVyaparsurvey(w, r, db)
	})
	apiRouter.HandleFunc("/getVyaparBaselineSurvey", func(w http.ResponseWriter, r *http.Request) {
		sep.GetVyaparBaselineSurvey(w, r, db)
	})
	apiRouter.HandleFunc("/getSelfShaktiBaselineSurvey", func(w http.ResponseWriter, r *http.Request) {
		sep.GetSelfShaktiBaselineSurvey(w, r, db)
	})
	apiRouter.Handle("/getNagarikaProgramQuestionnaire", isAuthorized(func(w http.ResponseWriter, r *http.Request) {
		sep.GetNagarikaProgramQuestionnaire(w, r, db)
	}))
	apiRouter.HandleFunc("/addGreensurvey", func(w http.ResponseWriter, r *http.Request) {
		sep.AddGreensurvey(w, r, db)
	})

	apiRouter.Handle("/addQualityAssessmentForm", isAuthorized(func(w http.ResponseWriter, r *http.Request) {
		q.AddQualityAssessmentForm(w, r, db)
	}))
	//---------------------List Quality Assessment Form-----------------------------------------
	apiRouter.Handle("/listQualityAssessmentForm", isAuthorized(func(w http.ResponseWriter, r *http.Request) {
		q.ListQualityAssessmentForm(w, r, db)
	}))

	//-------------------Endpoint to get the total dashboard data for QAF-----------------------
	apiRouter.Handle("/getDashboard", isAuthorized(func(w http.ResponseWriter, r *http.Request) {
		q.GetDashboard(w, r, db)
	}))

	//---------------------Endpoint to filter the dashboard data(Date Range) for QAF------------------------
	apiRouter.Handle("/filterDate", isAuthorized(func(w http.ResponseWriter, r *http.Request) {
		q.FilterDate(w, r, db)
	}))

	//-----------------------list all state(general)----------------------------------
	apiRouter.Handle("/allState", isAuthorized(func(w http.ResponseWriter, r *http.Request) {
		q.ListAllState(w, r, db)
	}))

	//-----------------------list all district(general)----------------------------------
	apiRouter.Handle("/allDist", isAuthorized(func(w http.ResponseWriter, r *http.Request) {
		q.ListAllDistrict(w, r, db)
	}))
	//-----------------------list all taluk(general)----------------------------------
	apiRouter.Handle("/listTaluk", isAuthorized(func(w http.ResponseWriter, r *http.Request) {
		q.ListTalukBasedOnDist(w, r, db)
	}))

	//---------------------Get Employee Data for filter for QAF-----------------------------------------
	apiRouter.Handle("/getEmpData", isAuthorized(func(w http.ResponseWriter, r *http.Request) {
		q.GetEmpData(w, r, db)
	}))

	//---------------------Endpoint to filter the dashboard data(Taluk) for QAF-----------------------------------------
	apiRouter.Handle("/filterTaluk", isAuthorized(func(w http.ResponseWriter, r *http.Request) {
		q.FilterTaluk(w, r, db)
	}))

	//---------------------Endpoint to filter the dashboard data(District) for QAF-----------------------------------------
	apiRouter.Handle("/filterDistrict", isAuthorized(func(w http.ResponseWriter, r *http.Request) {
		q.FilterDistrict(w, r, db)
	}))

	//---------------------Endpoint to list the taluks for filter QAF----------------------------------
	apiRouter.Handle("/listTaluk", isAuthorized(func(w http.ResponseWriter, r *http.Request) {
		q.ListTaluk(w, r, db)
	}))

	//---------------------Endpoint to list the districts for filter QAF----------------------------------
	apiRouter.Handle("/listDistrict", isAuthorized(func(w http.ResponseWriter, r *http.Request) {
		q.ListDistrict(w, r, db)
	}))

	//---------------------listing of spoorthi participants based on the Modules1----------------------------------
	apiRouter.Handle("/spoorthiList", isAuthorized(func(w http.ResponseWriter, r *http.Request) {
		a.Spoorthilist(w, r, db)
	}))

	//---------------------buzz vyapar list----------------------------------
	apiRouter.Handle("/buzzList", isAuthorized(func(w http.ResponseWriter, r *http.Request) {
		a.Buzzlist(w, r, db)
	}))

	//---------------------Green survey list----------------------------------
	apiRouter.Handle("/greenList", isAuthorized(func(w http.ResponseWriter, r *http.Request) {
		a.Greenlist(w, r, db)
	}))

	//---------------------attendence of spoorthi----------------------------------
	apiRouter.Handle("/allAttendence", isAuthorized(func(w http.ResponseWriter, r *http.Request) {
		a.AllAttendence(w, r, db)
	}))

	//---------------------Add buzz vyapar----------------------------------
	apiRouter.Handle("/addBuzzVyapar", isAuthorized(func(w http.ResponseWriter, r *http.Request) {
		a.Addbuzzvyapar(w, r, db)
	}))

	//---------------------Get POA----------------------------------
	apiRouter.Handle("/getPoa", isAuthorized(func(w http.ResponseWriter, r *http.Request) {
		q.GetPoa(w, r, db)
	}))

	apiRouter.Handle("/funderVyaparDashboard", isAuthorized(func(w http.ResponseWriter, r *http.Request) {
		d.FunderVyaparD(w, r, db)
	}))

	apiRouter.Handle("/funderGreenDashboard", isAuthorized(func(w http.ResponseWriter, r *http.Request) {
		d.FunderGreenD(w, r, db)
	}))
	apiRouter.Handle("/funderSSDashboard", isAuthorized(func(w http.ResponseWriter, r *http.Request) {
		d.FunderSSD(w, r, db)
	}))
	apiRouter.Handle("/funderGelathiDashboard", isAuthorized(func(w http.ResponseWriter, r *http.Request) {
		d.FunderGelathiD(w, r, db)
	}))

	//-----------------------------------------SS filter-anand-----------------------------
	apiRouter.Handle("/ssfilter", isAuthorized(func(w http.ResponseWriter, r *http.Request) {
		spf.SSCounts(w, r, db)
	}))

	//-----------------------------------------Gelathi filter-anand-----------------------------
	apiRouter.Handle("/gelathifilter", isAuthorized(func(w http.ResponseWriter, r *http.Request) {
		sppf.SPCounts(w, r, db)
	}))
	apiRouter.Handle("/npfilter", isAuthorized(func(w http.ResponseWriter, r *http.Request) {
		npp.NPCounts(w, r, db)
	}))

	//-----------------------------------------Green filter-anand-----------------------------
	apiRouter.Handle("/greenfilter", isAuthorized(func(w http.ResponseWriter, r *http.Request) {
		gppf.GPCounts(w, r, db)
	}))

	//-----------------------------------------Vyapar filter-anand-----------------------------
	apiRouter.Handle("/vyaparfilter", isAuthorized(func(w http.ResponseWriter, r *http.Request) {
		vppf.GetCounts(w, r, db)
	}))
	//-----------------------------------------SS Dashboard-anand-----------------------------
	apiRouter.Handle("/ssDashboard", isAuthorized(func(w http.ResponseWriter, r *http.Request) {
		ss.SelfsakthiDashboard(w, r, db)
	}))
	// -----------------------------------------GP dashboard-----------------------------
	apiRouter.Handle("/greenDashboard", isAuthorized(func(w http.ResponseWriter, r *http.Request) {
		gp.GreenDashboard(w, r, db)
	}))
	//---------------------vyapar dashboard----------------------------------
	apiRouter.Handle("/vyaparDashboard", isAuthorized(func(w http.ResponseWriter, r *http.Request) {
		vp.VyaparDashboard(w, r, db)
	}))

	//---------------------gelathiProgram dashboard----------------------------------
	apiRouter.Handle("/gelathiProgramDashboard", isAuthorized(func(w http.ResponseWriter, r *http.Request) {
		sp.GelathiProgramDashboard1(w, r, db)
	}))

	apiRouter.Handle("/npprogramDashboard", isAuthorized(func(w http.ResponseWriter, r *http.Request) {
		np.NagarikaProgramDashboard(w, r, db)
	}))

	//>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>old codes converted to go>>>>>>>>>>>>>>>>>>>>>>>>>>>>>
	//_______________________________TEAM_1___________________________________

	//---------------------Check Email Exist-----------------------------------------

	apiRouter.Handle("/getEmailExist", isAuthorized(func(w http.ResponseWriter, r *http.Request) {
		t1.GetEmailExist(w, r, db)
	}))

	//---------------------Check Profile Details-----------------------------------------

	apiRouter.Handle("/getProfileData", isAuthorized(func(w http.ResponseWriter, r *http.Request) {
		t1.GetProfileData(w, r, db)
	}))

	//---------------------Check Circle Details-----------------------------------------

	apiRouter.Handle("/getGelathiCircleDataNew", isAuthorized(func(w http.ResponseWriter, r *http.Request) {
		t1.GetGelathiCircleDataNew(w, r, db)
	}))

	//---------------------Add Employee -----------------------------------------
	apiRouter.Handle("/createUser", isAuthorized(func(w http.ResponseWriter, r *http.Request) {
		t1.CreateUser(w, r, db)
	}))
	//---------------------Add Funder -----------------------------------------
	apiRouter.Handle("/createFunder", isAuthorized(func(w http.ResponseWriter, r *http.Request) {
		t1.CreateFunder(w, r, db)
	}))

	//---------------------Add Parnter -----------------------------------------

	apiRouter.Handle("/createPartner", isAuthorized(func(w http.ResponseWriter, r *http.Request) {
		t1.CreatePartner(w, r, db)
	}))

	//---------------------Get Gf sessions -----------------------------------------

	apiRouter.Handle("/getGFSessionData1", isAuthorized(func(w http.ResponseWriter, r *http.Request) {
		t1.GetGFSessionData1(w, r, db)
	}))

	//---------------------Get Green Motivators-----------------------------------------

	apiRouter.Handle("/getEnrollGreenMotivators", isAuthorized(func(w http.ResponseWriter, r *http.Request) {
		t1.GetEnrollGreenMotivators(w, r, db)
	}))

	//---------------------Get PoaTA -----------------------------------------

	apiRouter.Handle("/getPoaTa", isAuthorized(func(w http.ResponseWriter, r *http.Request) {
		t1.GetPoaTa(w, r, db)
	}))

	//---------------------Get Notes  -----------------------------------------

	apiRouter.Handle("/getNotes", isAuthorized(func(w http.ResponseWriter, r *http.Request) {
		t1.GetNotes(w, r, db)
	}))

	//---------------------Get  my TeamQAF -----------------------------------------

	apiRouter.Handle("/getMyTeamQAF", isAuthorized(func(w http.ResponseWriter, r *http.Request) {
		t1.GetMayTeamQAF(w, r, db)
	}))

	//--------------------- Participants Attendance -----------------------------------------

	apiRouter.Handle("/participantsAttendance", isAuthorized(func(w http.ResponseWriter, r *http.Request) {
		t1.ParticipantsAttendance(w, r, db)
	}))

	//_______________________________TEAM_2___________________________________

	//=============================== CHETAN API'S ================================

	apiRouter.Handle("/getBuzzVyaparProgramBaseline", isAuthorized(func(w http.ResponseWriter, r *http.Request) {
		t2.GetBuzzVyaparProgramBaseline(w, r, db)
	}))
	apiRouter.Handle("/getEnrollVyaparEnrollment", isAuthorized(func(w http.ResponseWriter, r *http.Request) {
		t2.GetEnrollVyaparEnrollment(w, r, db)
	}))
	apiRouter.Handle("/taAttachments", isAuthorized(func(w http.ResponseWriter, r *http.Request) {
		t2.TaAttachments(w, r, db)
	}))
	apiRouter.Handle("/updateRescheduleEvent", isAuthorized(func(w http.ResponseWriter, r *http.Request) {
		t2.UpdateRescheduleEvent(w, r, db)
	}))
	apiRouter.Handle("/editParticipant", isAuthorized(func(w http.ResponseWriter, r *http.Request) {
		t2.EditParticipantMehtod(w, r, db)
	}))
	apiRouter.Handle("/editGFSession", isAuthorized(func(w http.ResponseWriter, r *http.Request) {
		t2.EditGFSessionMethod(w, r, db)
	}))
	apiRouter.Handle("/checkInOut", isAuthorized(func(w http.ResponseWriter, r *http.Request) {
		t2.CheckInOut(w, r, db)
	}))
	apiRouter.HandleFunc("/signIn", (func(w http.ResponseWriter, r *http.Request) {
		t2.SignInHandleRequest(w, r, db)
	}))

	//====================== vishal pimple ==============================
	apiRouter.Handle("/getPOA", isAuthorized(func(w http.ResponseWriter, r *http.Request) {
		t2.GetPoa1(w, r, db)
	}))

	apiRouter.Handle("/deleteEmpFromProject", isAuthorized(func(w http.ResponseWriter, r *http.Request) {
		t2.DeleteEmpFromProject(w, r, db)
	}))

	apiRouter.Handle("/getDemoGraphy", isAuthorized(func(w http.ResponseWriter, r *http.Request) {
		t2.GetDemoGraphy(w, r, db)
	}))

	apiRouter.Handle("/createProject", isAuthorized(func(w http.ResponseWriter, r *http.Request) {
		t2.CreateProject(w, r, db)
	}))
	apiRouter.Handle("/getGFAssignedBatch", isAuthorized(func(w http.ResponseWriter, r *http.Request) {
		t2.GetGFAssignedBatch(w, r, db)
	}))

	apiRouter.Handle("/createGFSessions", isAuthorized(func(w http.ResponseWriter, r *http.Request) {
		t2.CreateGFSessions(w, r, db)
	}))

	apiRouter.Handle("/getGFSessionsNew", isAuthorized(func(w http.ResponseWriter, r *http.Request) {
		t2.GetGFSessionsNew(w, r, db)
	}))

	//=================================== ANEEL CODES =========================================
	apiRouter.Handle("/teamMembers", isAuthorized(func(w http.ResponseWriter, r *http.Request) {
		t2.TeamMembers(w, r, db)
	}))
	apiRouter.Handle("/addSurveyData", isAuthorized(func(w http.ResponseWriter, r *http.Request) {
		t2.AddSurveydata(w, r, db)
	}))
	apiRouter.HandleFunc("/addselfshakti", func(w http.ResponseWriter, r *http.Request) {
		sep.AddSelfshaktiday1day2data(w, r, db)
	})
	//-------------------Endpoint for adding data to QAF---------------------------------------
	apiRouter.Handle("/getBuses", isAuthorized(func(w http.ResponseWriter, r *http.Request) {
		t2.GetBuses(w, r, db)
	}))
	///------------------------- delete Buses --------------------------
	apiRouter.Handle("/deleteBus", isAuthorized(func(w http.ResponseWriter, r *http.Request) {
		t2.DeleteBus(w, r, db)
	}))
	apiRouter.Handle("/deleteUser", isAuthorized(func(w http.ResponseWriter, r *http.Request) {
		t2.DeletUser(w, r, db)
	}))

	//--------------------------- getvyapar enrollment --------------------------------
	apiRouter.Handle("/getVyaparEnrollment", isAuthorized(func(w http.ResponseWriter, r *http.Request) {
		t2.GetvyaparEnrollment(w, r, db)
	}))

	//--------------  end pont for get Alter bus ------------------
	apiRouter.Handle("/getAlterBus", isAuthorized(func(w http.ResponseWriter, r *http.Request) {
		t2.GetAlterBus(w, r, db)
	}))

	apiRouter.Handle("/getEmpProjects", isAuthorized(func(w http.ResponseWriter, r *http.Request) {
		t2.GetEmppPojects(w, r, db)
	}))

	//-----------------------getdriverlist--------------------------
	apiRouter.Handle("/getDriverList", isAuthorized(func(w http.ResponseWriter, r *http.Request) {
		t2.DriverList(w, r, db)
	}))

	//-----------------------CreateProgramParticipant--------------------------
	apiRouter.Handle("/createProgramParticipant", isAuthorized(func(w http.ResponseWriter, r *http.Request) {
		t2.CreateProgramParticipant(w, r, db)
	}))

	//_______________________________TEAM_3___________________________________

	//-------------------Endpoint for adding data to QAF---------------------------------------
	apiRouter.Handle("/getPartnerList", isAuthorized(func(w http.ResponseWriter, r *http.Request) {
		t3.GetPartnerList(w, r, db)
	}))

	//-------------------Endpoint for adding data to QAF---------------------------------------
	apiRouter.Handle("/getFunderList", isAuthorized(func(w http.ResponseWriter, r *http.Request) {
		t4.GetFunderList(w, r, db)
	}))

	apiRouter.HandleFunc("/projectFunderList", (func(w http.ResponseWriter, r *http.Request) {
		sep.GetFunderProjectList(w, r, db)
	}))
	//-------------------Endpoint for adding data to QAF---------------------------------------
	apiRouter.Handle("/getBusList", isAuthorized(func(w http.ResponseWriter, r *http.Request) {
		t3.GetBusList(w, r, db)
	}))
	//-------------------Endpoint for adding data to QAF--------------------------------
	apiRouter.Handle("/getTrainingBatchData", isAuthorized(func(w http.ResponseWriter, r *http.Request) {
		t3.GetTrainingBatchData(w, r, db)
	}))
	//-------------------Endpoint for adding data to QAF--------------------------------
	apiRouter.Handle("/editTrainingBatch", isAuthorized(func(w http.ResponseWriter, r *http.Request) {
		t3.UpdateTrainingBatch(w, r, db)
	}))

	//-------------------Endpoint for adding data to QAF--------------------------------
	apiRouter.Handle("/updateReschedule", isAuthorized(func(w http.ResponseWriter, r *http.Request) {
		t3.UpdateReschedule(w, r, db)
	}))
	//-------------------Endpoint for adding data to QAF--------------------------------
	apiRouter.Handle("/getgfl", isAuthorized(func(w http.ResponseWriter, r *http.Request) {
		t3.Getgfl(w, r, db)
	}))
	//-------------------Endpoint for adding data to QAF--------------------------------
	apiRouter.Handle("/getPeopleList", isAuthorized(func(w http.ResponseWriter, r *http.Request) {
		t3.GetPeopleList(w, r, db)
	}))
	//-------------------Endpoint for adding data to QAF--------------------------------
	apiRouter.Handle("/editUser", isAuthorized(func(w http.ResponseWriter, r *http.Request) {
		t3.EditUser(w, r, db)
	}))
	//-------------------Endpoint for adding data to QAF--------------------------------
	apiRouter.Handle("/setEnrollGelathi", isAuthorized(func(w http.ResponseWriter, r *http.Request) {
		t3.SetEnrollGelathi(w, r, db)
	}))

	apiRouter.Handle("/setEnrollnagarikaGelathi", isAuthorized(func(w http.ResponseWriter, r *http.Request) {
		sep.SetEnrollNagarikaGelathi(w, r, db)
	}))

	apiRouter.Handle("/getenrollnagarikagelathi", isAuthorized(func(w http.ResponseWriter, r *http.Request) {
		sep.GetEnrollednagarikaGelathi(w, r, db)
	}))

	apiRouter.Handle("/deleteenrollnagarika", isAuthorized(func(w http.ResponseWriter, r *http.Request) {
		sep.RemoveEnrollNagarikaGelathi(w, r, db)
	}))
	//-------------------Endpoint for adding data to QAF--------------------------------
	apiRouter.Handle("/updatePoaCancel", isAuthorized(func(w http.ResponseWriter, r *http.Request) {
		t3.UpdatePoaCancel(w, r, db)
	}))
	//-------------------Endpoint for adding data to QAF--------------------------------
	apiRouter.Handle("/uploadGFSessionPhotos", isAuthorized(func(w http.ResponseWriter, r *http.Request) {
		t3.UploadGFsessionPhotos(w, r, db)
	}))
	//-------------------Endpoint for adding data to QAF--------------------------------
	apiRouter.Handle("/getCheckInOutStatus", isAuthorized(func(w http.ResponseWriter, r *http.Request) {
		t3.GetCheckInOutStatus(w, r, db)
	}))
	// -------------------Endpoint for adding data to QAF--------------------------------
	apiRouter.Handle("/getPeopleFilters", isAuthorized(func(w http.ResponseWriter, r *http.Request) {
		t3.GetPeopleFilters(w, r, db)
	}))
	// -------------------Endpoint for adding data to QAF--------------------------------
	apiRouter.Handle("/getBusCheckList", isAuthorized(func(w http.ResponseWriter, r *http.Request) {
		t3.GetBusCheckList(w, r, db)
	}))

	// -------------------Endpoint for adding data to QAF--------------------------------
	apiRouter.Handle("/getChangeRole", isAuthorized(func(w http.ResponseWriter, r *http.Request) {
		t3.GetChangeRole(w, r, db)
	}))
	// -------------------Endpoint for adding data to QAF--------------------------------
	apiRouter.Handle("/getProjectData", isAuthorized(func(w http.ResponseWriter, r *http.Request) {
		t3.GetProjectData(w, r, db)
	}))
	// -------------------Endpoint for adding Bus--------------------------------
	apiRouter.Handle("/createBus", isAuthorized(func(w http.ResponseWriter, r *http.Request) {
		t3.CreateBus(w, r, db)
	}))
	// -------------------Endpoint for adding getProjects--------------------------------
	apiRouter.Handle("/getProjects", isAuthorized(func(w http.ResponseWriter, r *http.Request) {
		t3.GetProjects(w, r, db)
	}))
	// -------------------Endpoint for adding getTa--------------------------------
	apiRouter.Handle("/getTa", isAuthorized(func(w http.ResponseWriter, r *http.Request) {
		t3.GetTa(w, r, db)
	}))

	//_______________________________TEAM_4___________________________________

	//-------------------------------Sushmitha---------------------------------
	//---------------------------Get Bus Data----------------------------------
	apiRouter.Handle("/getBusData", isAuthorized(func(w http.ResponseWriter, r *http.Request) {
		t4.GetBusData(w, r, db)
	}))
	//---------------------------Get Assign Targets----------------------------------
	apiRouter.Handle("/getAssignTargets", isAuthorized(func(w http.ResponseWriter, r *http.Request) {
		t4.GetAssignTargets(w, r, db)
	}))
	//---------------------------Get Occupations----------------------------------
	apiRouter.Handle("/getOccupations", isAuthorized(func(w http.ResponseWriter, r *http.Request) {
		t4.GetOccupations(w, r, db)
	}))
	//---------------------------Get All Buzz Team----------------------------------
	apiRouter.Handle("/getAllBuzzTeam", isAuthorized(func(w http.ResponseWriter, r *http.Request) {
		t4.GetAllBuzzTeam(w, r, db)
	}))
	//---------------------------Get OperationsManager List----------------------------------
	apiRouter.Handle("/getOperationsManagerList", isAuthorized(func(w http.ResponseWriter, r *http.Request) {
		t4.GetOperationsManagerList(w, r, db)
	}))
	//---------------------------Get Gelathi List----------------------------------
	apiRouter.Handle("/getGelathiList", isAuthorized(func(w http.ResponseWriter, r *http.Request) {
		t4.GetGelathiList(w, r, db)
	}))
	//---------------------------Get Trainers List----------------------------------
	apiRouter.Handle("/getTrainersList", isAuthorized(func(w http.ResponseWriter, r *http.Request) {
		t4.GetTrainersList(w, r, db)
	}))

	//---------------------------Create Event----------------------------------
	apiRouter.Handle("/createEvent", isAuthorized(func(w http.ResponseWriter, r *http.Request) {
		t4.CreateEvent(w, r, db)
	}))
	//---------------------------Create Notes----------------------------------
	apiRouter.Handle("/createNotes", isAuthorized(func(w http.ResponseWriter, r *http.Request) {
		t4.CreateNotes(w, r, db)
	}))
	//---------------------------Create Circle----------------------------------
	apiRouter.Handle("/createCircle", isAuthorized(func(w http.ResponseWriter, r *http.Request) {
		t4.CreateCircle(w, r, db)
	}))
	//---------------------------Create GF Batch----------------------------------
	apiRouter.Handle("/createGFBatch", isAuthorized(func(w http.ResponseWriter, r *http.Request) {
		t4.CreateGFBatch(w, r, db)
	}))
	//---------------------------roles list----------------------------------
	apiRouter.Handle("/roles_list", isAuthorized(func(w http.ResponseWriter, r *http.Request) {
		t4.Roles_list(w, r, db)
	}))
	//---------------------------Create Trainer Target----------------------------------
	apiRouter.Handle("/createTrainerTarget", isAuthorized(func(w http.ResponseWriter, r *http.Request) {
		t4.CreateTrainerTarget(w, r, db)
	}))
	//---------------------------New/Verify Ta----------------------------------
	apiRouter.Handle("/verifyTa", isAuthorized(func(w http.ResponseWriter, r *http.Request) {
		t4.VerifyTa(w, r, db)
	}))
	//---------------------------Consume Stock----------------------------------
	apiRouter.Handle("/consumeStock", isAuthorized(func(w http.ResponseWriter, r *http.Request) {
		t4.ConsumeStock(w, r, db)
	}))
	//---------------------------Remove Enroll Gelathi----------------------------------
	apiRouter.Handle("/removeEnrollGelathi", isAuthorized(func(w http.ResponseWriter, r *http.Request) {
		t4.RemoveEnrollGelathi(w, r, db)
	}))
	//---------------------------Update Participant Day----------------------------------
	apiRouter.Handle("/updateParticipantDay", isAuthorized(func(w http.ResponseWriter, r *http.Request) {
		t4.UpdateParticipantDay(w, r, db)
	}))
	//---------------------------New/Remove green motivators---------------------------------
	apiRouter.Handle("/removeGreenMotivators", isAuthorized(func(w http.ResponseWriter, r *http.Request) {
		t4.RemoveGreenMotivators(w, r, db)
	}))
	//---------------------------New/Remove vyapar enrollment---------------------------------
	apiRouter.Handle("/removeVyaparEnrollment", isAuthorized(func(w http.ResponseWriter, r *http.Request) {
		t4.RemoveVyaparEnrollment(w, r, db)
	}))
	//---------------------------Upload Event Photos---------------------------------
	apiRouter.Handle("/uploadEventPhotos", isAuthorized(func(w http.ResponseWriter, r *http.Request) {
		t4.UploadEventPhotos(w, r, db)
	}))
	//---------------------------New/ApproveTa---------------------------------
	apiRouter.Handle("/approveTa", isAuthorized(func(w http.ResponseWriter, r *http.Request) {
		t4.ApproveTa(w, r, db)
	}))

	//---------------------------Add Bus CheckList---------------------------------
	apiRouter.Handle("/addBusCheckList", isAuthorized(func(w http.ResponseWriter, r *http.Request) {
		t4.AddBusCheckList(w, r, db)
	}))

	//---------------------------Delet GF Batch--------------------------------
	apiRouter.Handle("/deleteGFBatch", isAuthorized(func(w http.ResponseWriter, r *http.Request) {
		t4.DeleteGFBatch(w, r, db)
	}))

	//---------------------------Dhiraj Lakhane---------------------------------
	//----------------------------Get Location----------------------------------
	apiRouter.Handle("/getLocation", isAuthorized(func(w http.ResponseWriter, r *http.Request) {
		t4.GetLocations(w, r, db)
	}))

	//----------------------------get participant Data----------------------------------
	apiRouter.Handle("/getParticipantData", isAuthorized(func(w http.ResponseWriter, r *http.Request) {
		t4.GetParticipantData(w, r, db)
	}))

	//----------------------------Keerthana------------------------------------
	//----------------------------Get Project List----------------------------------
	apiRouter.Handle("/getProjectList", isAuthorized(func(w http.ResponseWriter, r *http.Request) {
		t4.GetProjectList(w, r, db)
	}))

	//----------------------------Get Location Name----------------------------------
	apiRouter.Handle("/getlocationName", isAuthorized(func(w http.ResponseWriter, r *http.Request) {
		t4.GetLocationName(w, r, db)
	}))

	//----------------------------Get Training Batch----------------------------------
	apiRouter.Handle("/getTrainingBatch", isAuthorized(func(w http.ResponseWriter, r *http.Request) {
		t4.GetTrainingBatch(w, r, db)
	}))

	//----------------------------new/setGreenMotivators----------------------------------
	apiRouter.Handle("/setGreenMotivators", isAuthorized(func(w http.ResponseWriter, r *http.Request) {
		t4.SetGreenMotivator(w, r, db)
	}))

	//----------------------------new/getGreenMotivators----------------------------------
	apiRouter.Handle("/getGreenMotivators", isAuthorized(func(w http.ResponseWriter, r *http.Request) {
		t4.GetGreenMotivator(w, r, db)
	}))

	//------------------------------Prathamesh------------------------------------
	//----------------------------Get Event Detail----------------------------------
	apiRouter.Handle("/getEventDetail", isAuthorized(func(w http.ResponseWriter, r *http.Request) {
		t4.GetEventDetailist(w, r, db)
	}))

	//----------------------------Get Training Batch List---------------------------------
	apiRouter.Handle("/getTrainingBatchList", isAuthorized(func(w http.ResponseWriter, r *http.Request) {
		t4.GetBatchlist(w, r, db)
	}))

	//_______________________________TEAM_5___________________________________

	//---------------------GetCaste----------------------------------
	apiRouter.Handle("/getCaste", isAuthorized(func(w http.ResponseWriter, r *http.Request) {
		t5.GetCaste(w, r, db)
	}))
	//---------------------GetEducation----------------------------------
	apiRouter.Handle("/getEducation", isAuthorized(func(w http.ResponseWriter, r *http.Request) {
		t5.GetEducation(w, r, db)
	}))
	//---------------------GetVillageList----------------------------------
	apiRouter.Handle("/getVillageList", isAuthorized(func(w http.ResponseWriter, r *http.Request) {
		t5.GetVillageList(w, r, db)
	}))
	//---------------------GetEnrollGelathi----------------------------------
	apiRouter.Handle("/getEnrollGelathi", isAuthorized(func(w http.ResponseWriter, r *http.Request) {
		t5.GetEnrollGelathi(w, r, db)
	}))
	//---------------------AddNewTA----------------------------------
	apiRouter.Handle("/addNewTA", isAuthorized(func(w http.ResponseWriter, r *http.Request) {
		t5.AddNewTA(w, r, db)
	}))
	//---------------------DeleteTa----------------------------------
	apiRouter.Handle("/deleteTa", isAuthorized(func(w http.ResponseWriter, r *http.Request) {
		t5.DeleteTa(w, r, db)
	}))
	//---------------------ListTa----------------------------------
	apiRouter.Handle("/listTa", isAuthorized(func(w http.ResponseWriter, r *http.Request) {
		t5.ListTa(w, r, db)
	}))
	//---------------------UpdateTa----------------------------------
	apiRouter.Handle("/updateTa", isAuthorized(func(w http.ResponseWriter, r *http.Request) {
		t5.UpdateTa(w, r, db)
	}))
	//---------------------AddSpoorthiBaselineQuestionnaire----------------------------------
	apiRouter.Handle("/addSpoorthiBaselineQuestionnaire", isAuthorized(func(w http.ResponseWriter, r *http.Request) {
		t5.AddSpoorthiBaselineQuestionnaire(w, r, db)
	}))
	//---------------------AddGreenBaselineSurvey----------------------------------
	apiRouter.Handle("/addGreenBaselineSurvey", isAuthorized(func(w http.ResponseWriter, r *http.Request) {
		t5.AddGreenBaselineSurvey(w, r, db)
	}))
	//---------------------UploadTrainingPhotos----------------------------------
	apiRouter.Handle("/uploadTrainingPhotos", isAuthorized(func(w http.ResponseWriter, r *http.Request) {
		t5.UploadTrainingPhotos(w, r, db)
	}))
	//---------------------GetTotalStocks-------------------------------------------
	apiRouter.Handle("/getTotalstocks", isAuthorized(func(w http.ResponseWriter, r *http.Request) {
		t5.GetTotalStocks(w, r, db)
	}))
	//---------------------GetMyTeam-------------------------------------------
	apiRouter.Handle("/getMyTeam", isAuthorized(func(w http.ResponseWriter, r *http.Request) {
		t5.GetMyTeam(w, r, db)
	}))
	//---------------------CreateParticipant-------------------------------------------
	apiRouter.Handle("/createParticipant", isAuthorized(func(w http.ResponseWriter, r *http.Request) {
		t5.CreateParticipant(w, r, db)
	}))
	//---------------------GetEmailExits-------------------------------------------
	apiRouter.Handle("/getEmailExits", isAuthorized(func(w http.ResponseWriter, r *http.Request) {
		t5.GetEmailExits(w, r, db)
	}))
	//---------------------UpdateEnrolledGelathi-------------------------------------------
	apiRouter.Handle("/updateEnrolledGelathi", isAuthorized(func(w http.ResponseWriter, r *http.Request) {
		t5.UpdateEnrolledGelathi(w, r, db)
	}))
	//---------------------UpdateEventCancel-------------------------------------------
	apiRouter.Handle("/updateEventCancel", isAuthorized(func(w http.ResponseWriter, r *http.Request) {
		t5.UpdateEventCancel(w, r, db)
	}))
	//---------------------GetAllPeople-------------------------------------------
	apiRouter.Handle("/getAllPeople", isAuthorized(func(w http.ResponseWriter, r *http.Request) {
		t5.GetAllPeople(w, r, db)
	}))
	// -------------------Endpoint for getting stock itmes ---------------------------------------
	apiRouter.Handle("/getStockItems", isAuthorized(func(w http.ResponseWriter, r *http.Request) {
		t5.GetStockItems(w, r, db)
	})).Methods("POST")

	// -------------------Endpoint for getting gelathi circle ---------------------------------------
	apiRouter.Handle("/getGelathiCircle", isAuthorized(func(w http.ResponseWriter, r *http.Request) {
		t5.GetGelathiCircle(w, r, db)
	})).Methods("POST")
	// -------------------Endpoint for getting GetGFSessionData ---------------------------------------

	apiRouter.Handle("/getGFSessionData", isAuthorized(func(w http.ResponseWriter, r *http.Request) {
		t5.GetGFSessionData(w, r, db)
	})).Methods("POST")

	// -------------------Endpoint for Editing Bus ---------------------------------------
	apiRouter.Handle("/editBus", isAuthorized(func(w http.ResponseWriter, r *http.Request) {
		t5.EditBus(w, r, db)
	})).Methods("POST")

	// -------------------Endpoint for Set Vyapar Enrollment ---------------------------------------
	apiRouter.Handle("/setVyaparEnrollment", isAuthorized(func(w http.ResponseWriter, r *http.Request) {
		t5.SetVyaparEnrollment(w, r, db)
	})).Methods("POST")

	// -------------------Endpoint for Add Emp to Project ---------------------------------------
	apiRouter.Handle("/addEmpToProject", isAuthorized(func(w http.ResponseWriter, r *http.Request) {
		t5.AddEmpToProject(w, r, db)
	})).Methods("POST")

	// -------------------Endpoint to create training batch ---------------------------------------
	apiRouter.Handle("/createTrainingBatch", isAuthorized(func(w http.ResponseWriter, r *http.Request) {
		t5.CreateTrainingBatch(w, r, db)
	})).Methods("POST")

	// -------------------Endpoint to create GF Sessions New 1---------------------------------------
	apiRouter.Handle("/createGFSessionsNew1", isAuthorized(func(w http.ResponseWriter, r *http.Request) {
		t5.CreateGFSessionNew1(w, r, db)
	})).Methods("POST")

	// handler := cors.Default().Handler(apiRouter)
	log.Println(http.ListenAndServe(":8080", handler))

}
