package main

import (
	"errors"
	"log"
	"net/http"
	"strconv"

	"github.com/golang-jwt/jwt/v5"
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

	_ = app.writeJSON(res, http.StatusOK, payload)
}

func (app *application) AllMovies(res http.ResponseWriter, req *http.Request) {

	movies, err := app.DB.AllMovies()
	if err != nil {
		app.errorJSON(res, err)
		return
	}

	_ = app.writeJSON(res, http.StatusOK, movies)
}

func (app *application) authenticate(res http.ResponseWriter, req *http.Request) {
	// read json payload
	var requestPayload struct {
		Email		string		`json:"email"`
		Password	string		`json:"password"`
	}

	err := app.readJSON(res, req, &requestPayload)
	if err != nil {
		app.errorJSON(res, err, http.StatusBadRequest)
		return
	}

	// validate user against database
	user, err := app.DB.GetUserByEmail(requestPayload.Email)
	if err != nil {
		app.errorJSON(res, errors.New("invalid credentials"), http.StatusBadRequest)
		return
	}

	// check password
	valid, err := user.PasswordMatches(requestPayload.Password)
	if err != nil || !valid {
		app.errorJSON(res, errors.New("invalid credentials"), http.StatusBadRequest)
		return
	}

	// create a jwt user
	u := jwtUser {
		ID: user.ID,
		FirstName: user.FirstName,
		LastName: user.LastName,
	}

	// generate tokens
	tokens, err := app.auth.GenerateTokenPair(&u)
	if err != nil {
		app.errorJSON(res, err)
		return
	}
	
	log.Println(tokens.Token)
	refreshCookie := app.auth.GetRefreshCookie(tokens.RefreshToken)
	http.SetCookie(res, refreshCookie)

	app.writeJSON(res, http.StatusAccepted, tokens)
}

func (app *application) refreshToken(res http.ResponseWriter, req *http.Request) {
	for _, cookie := range req.Cookies() {
		if cookie.Name == app.auth.CookieName {
			claims := &Claims{}
			refreshToken := cookie.Value

			// parse the token to get the claims
			_, err := jwt.ParseWithClaims(refreshToken, claims, func(token *jwt.Token) (interface{}, error) {
				return []byte(app.JWTSecret), nil
			})
			if err != nil {
				app.errorJSON(res, errors.New("unauthorized"), http.StatusUnauthorized)
				return
			}

			// get the user id from the token claims
			userID, err := strconv.Atoi(claims.Subject)
			if err != nil {
				app.errorJSON(res, errors.New("unknown user"), http.StatusUnauthorized)
				return
			}

			user, err := app.DB.GetUserByID(userID)
			if err != nil {
				app.errorJSON(res, errors.New("unknown user"), http.StatusUnauthorized)
				return
			}

			u := jwtUser{
				ID: user.ID,
				FirstName: user.FirstName,
				LastName: user.LastName,
			}

			TokenPairs, err := app.auth.GenerateTokenPair(&u)
			if err != nil {
				app.errorJSON(res, errors.New("unknown generating tokens"), http.StatusUnauthorized)
				return
			}

			http.SetCookie(res, app.auth.GetRefreshCookie(TokenPairs.RefreshToken))

			app.writeJSON(res, http.StatusOK, TokenPairs)
		}
	}
}

func (app *application) logout(res http.ResponseWriter, req *http.Request) {
	http.SetCookie(res, app.auth.GetExpiredRefreshCookie())
	res.WriteHeader(http.StatusAccepted)
}

func (app *application) MovieCatalog(res http.ResponseWriter, req *http.Request) {
	movies, err := app.DB.AllMovies()
	if err != nil {
		app.errorJSON(res, err)
		return
	}

	_ = app.writeJSON(res, http.StatusOK, movies)
}