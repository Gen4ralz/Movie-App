package main

import (
	"encoding/json"
	"fmt"
	"net/http"
)

func (app *application) Home(res http.ResponseWriter, req *http.Request) {
	var payload = struct {
		Status string		`json:"status"`
		Message string		`json:"message"`
		Version string		`json:"version"`
	}{
			Status: "active",
			Message: "Go movies up and running",
			Version: "1.0.0",
	}

	out, err := json.Marshal(payload)
	if err != nil {
		fmt.Println(err)
	}

	res.Header().Set("Content-Type", "application/json")
	res.WriteHeader(http.StatusOK)
	res.Write(out)
}

func (app *application) AllMovies(res http.ResponseWriter, req *http.Request) {

	movies, err := app.DB.AllMovies()
	if err != nil {
		fmt.Println(err)
		return
	}

	out, err := json.Marshal(movies)
	if err != nil {
		fmt.Println(err)
	}

	res.Header().Set("Content-Type", "application/json")
	res.WriteHeader(http.StatusOK)
	res.Write(out)
}