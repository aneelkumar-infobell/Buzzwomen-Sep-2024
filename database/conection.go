package connection

import (
	"database/sql"
	"fmt"
	"log"
	"os"
	"time"
)

func Connect() *sql.DB {
	// dbUrl, err := GetEnvVariable("DB_URL")
	// if err != nil {
	// 	fmt.Println(err)
	// }
	dbUrl := "bdms_staff_admin:sfhakjfhyiqundfgs3765827635@tcp(buzzwomendatabase-new.cixgcssswxvx.ap-south-1.rds.amazonaws.com:3306)/bdms_staff"
	// Define the maximum number of allowed connections
	//dbUrl := "root:root@tcp(localhost:3306)/bdms_staff"

	maxConnections := 100000
	// Create a new MySQL connection pool
	fmt.Println(dbUrl)
	db, err := sql.Open("mysql", dbUrl)
	if err != nil {
		log.Fatal(err)
	}
	// Set the maximum number of open connections

	db.SetMaxOpenConns(maxConnections)
	// Test the database connection

	err = db.Ping()
	if err != nil {
		log.Fatal(err)
	}
	fmt.Println("Connected to MySQL database!")
	// Periodically check the number of connections and restart if it exceeds the maximum
	go func() {
		for {
			stats := db.Stats()

			if stats.OpenConnections >= maxConnections {
				log.Println("Reached maximum connections, restarting...")
				db.Close()
				db, err = sql.Open("mysql", dbUrl)
				if err != nil {
					fmt.Println(err)
					return
				}
				db.SetMaxOpenConns(maxConnections)
				log.Println("Database connection restarted")
			}
			time.Sleep(5 * time.Second) // Adjust the sleep duration as needed
		}
	}()
	log.Println("Database connection established")
	return db
}

func GetEnvVariable(key string) (string, error) {
	value, exists := os.LookupEnv(key)

	if !exists {
		return "", fmt.Errorf("environment variable %s not set", key)
	}
	return value, nil
}
