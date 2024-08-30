package main

import (
	h "buzzstaff-go/handler"

	_ "github.com/go-sql-driver/mysql"
)

func main() {
	h.HandleFunc()
}
