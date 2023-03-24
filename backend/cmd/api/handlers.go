package main

import (
	"fmt"
	"net/http"
)

func Hello(res http.ResponseWriter, req *http.Request) {
	fmt.Fprint(res, "Hello, world!")
}