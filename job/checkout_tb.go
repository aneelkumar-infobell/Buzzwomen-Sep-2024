package checkout

import (
	"database/sql"
	"fmt"
	"log"
	"time"

	_ "github.com/go-sql-driver/mysql"
)

func CheckoutTb(db *sql.DB) {
	date := time.Now().Format("2006-01-02 15:04:05") // "2006-01-02" is the layout for "YYYY-MM-DD"
	updateDate := date + "23:44:44"
	rows, err := db.Query("SELECT id from tbl_poa tp where `type` =1 and check_in is not null and check_out is null and date(`date`) = CURRENT_DATE()")
	// rows, err := db.Query("SELECT id from tbl_poa tp where `type` =1 and check_in is not null and check_out is null and date(`date`) = '2023-09-23'")
	if err != nil {
		log.Println(err)
		return
	}
	defer rows.Close()
	for rows.Next() {
		var id int
		err := rows.Scan(&id)
		if err != nil {
			fmt.Println(err)
			log.Printf("Failed to build content from sql rows: %v\n", err)
		}
		_, err1 := db.Exec("UPDATE tbl_poa set check_out = ? where id = ?", updateDate, id)
		if err1 != nil {
			log.Println("Failed", err1)
		} else {
			fmt.Println("Updated success")
		}
	}
}
