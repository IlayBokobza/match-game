package main

import (
	"encoding/json"
	"fmt"
	"log"
	"net/http"

	socketio "github.com/googollee/go-socket.io"
)

func errorHandler(err error) {
	if err != nil {
		fmt.Println(err)
	}
}

func main() {
	boardBytes, err := json.Marshal(generateBoard())
	errorHandler(err)

	board := string(boardBytes)
	server := socketio.NewServer(nil)

	server.OnConnect("/", func(s socketio.Conn) error {
		s.SetContext("")
		s.Join("all")
		fmt.Println("connected:", s.ID())
		server.BroadcastToRoom("/", s.ID(), "sendBoard", board)

		return nil
	})

	//when board is sent
	server.OnEvent("/", "sendBoard", func(s socketio.Conn, data string) {
		fmt.Println("Recived board from server")
		s.Leave("all")
		server.BroadcastToRoom("/", "all", "sendBoard", data)
		s.Join("all")
		board = data
	})

	//regenerates  the board
	server.OnEvent("/", "refreshBoard", func(s socketio.Conn) {
		boardBytes, err := json.Marshal(generateBoard())
		errorHandler(err)
		board = string(boardBytes)
		server.BroadcastToNamespace("/", "sendBoard", board)
		fmt.Println("refreshes board")
	})

	server.OnError("/", func(s socketio.Conn, e error) {
		fmt.Println("meet error:", e)
	})

	server.OnDisconnect("/", func(s socketio.Conn, reason string) {
		s.Close()
	})

	go server.Serve()
	defer server.Close()

	http.Handle("/socket.io/", server)
	http.Handle("/", http.FileServer(http.Dir("../public")))
	log.Println("Serving at localhost:8001...")
	log.Fatal(http.ListenAndServe(":8001", nil))
}
