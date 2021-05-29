package main

import (
	"fmt"
	"log"
	"net/http"

	socketio "github.com/googollee/go-socket.io"
)

func main() {
	var board string = "[[{\"x\":0,\"y\":0,\"cords\":\"0|0\",\"color\":\"forestgreen\"},{\"x\":1,\"y\":0,\"cords\":\"0|1\",\"color\":\"blue\"},{\"x\":2,\"y\":0,\"cords\":\"0|2\",\"color\":\"orange\"},{\"x\":3,\"y\":0,\"cords\":\"0|3\",\"color\":\"orange\"},{\"x\":4,\"y\":0,\"cords\":\"0|4\",\"color\":\"blue\"},{\"x\":5,\"y\":0,\"cords\":\"0|5\",\"color\":\"red\"},{\"x\":6,\"y\":0,\"cords\":\"0|6\",\"color\":\"red\"},{\"x\":7,\"y\":0,\"cords\":\"0|7\",\"color\":\"orange\"},{\"x\":8,\"y\":0,\"cords\":\"0|8\",\"color\":\"brown\"},{\"x\":9,\"y\":0,\"cords\":\"0|9\",\"color\":\"blue\"},{\"x\":10,\"y\":0,\"cords\":\"0|10\",\"color\":\"red\"},{\"x\":11,\"y\":0,\"cords\":\"0|11\",\"color\":\"blue\"}],[{\"x\":0,\"y\":1,\"cords\":\"1|0\",\"color\":\"brown\"},{\"x\":1,\"y\":1,\"cords\":\"1|1\",\"color\":\"orange\"},{\"x\":2,\"y\":1,\"cords\":\"1|2\",\"color\":\"red\"},{\"x\":3,\"y\":1,\"cords\":\"1|3\",\"color\":\"blue\"},{\"x\":4,\"y\":1,\"cords\":\"1|4\",\"color\":\"blue\"},{\"x\":5,\"y\":1,\"cords\":\"1|5\",\"color\":\"blue\"},{\"x\":6,\"y\":1,\"cords\":\"1|6\",\"color\":\"orange\"},{\"x\":7,\"y\":1,\"cords\":\"1|7\",\"color\":\"brown\"},{\"x\":8,\"y\":1,\"cords\":\"1|8\",\"color\":\"brown\"},{\"x\":9,\"y\":1,\"cords\":\"1|9\",\"color\":\"blue\"},{\"x\":10,\"y\":1,\"cords\":\"1|10\",\"color\":\"red\"},{\"x\":11,\"y\":1,\"cords\":\"1|11\",\"color\":\"red\"}],[{\"x\":0,\"y\":2,\"cords\":\"2|0\",\"color\":\"brown\"},{\"x\":1,\"y\":2,\"cords\":\"2|1\",\"color\":\"forestgreen\"},{\"x\":2,\"y\":2,\"cords\":\"2|2\",\"color\":\"blue\"},{\"x\":3,\"y\":2,\"cords\":\"2|3\",\"color\":\"orange\"},{\"x\":4,\"y\":2,\"cords\":\"2|4\",\"color\":\"forestgreen\"},{\"x\":5,\"y\":2,\"cords\":\"2|5\",\"color\":\"orange\"},{\"x\":6,\"y\":2,\"cords\":\"2|6\",\"color\":\"orange\"},{\"x\":7,\"y\":2,\"cords\":\"2|7\",\"color\":\"blue\"},{\"x\":8,\"y\":2,\"cords\":\"2|8\",\"color\":\"brown\"},{\"x\":9,\"y\":2,\"cords\":\"2|9\",\"color\":\"blue\"},{\"x\":10,\"y\":2,\"cords\":\"2|10\",\"color\":\"blue\"},{\"x\":11,\"y\":2,\"cords\":\"2|11\",\"color\":\"brown\"}],[{\"x\":0,\"y\":3,\"cords\":\"3|0\",\"color\":\"red\"},{\"x\":1,\"y\":3,\"cords\":\"3|1\",\"color\":\"orange\"},{\"x\":2,\"y\":3,\"cords\":\"3|2\",\"color\":\"forestgreen\"},{\"x\":3,\"y\":3,\"cords\":\"3|3\",\"color\":\"red\"},{\"x\":4,\"y\":3,\"cords\":\"3|4\",\"color\":\"blue\"},{\"x\":5,\"y\":3,\"cords\":\"3|5\",\"color\":\"orange\"},{\"x\":6,\"y\":3,\"cords\":\"3|6\",\"color\":\"red\"},{\"x\":7,\"y\":3,\"cords\":\"3|7\",\"color\":\"forestgreen\"},{\"x\":8,\"y\":3,\"cords\":\"3|8\",\"color\":\"forestgreen\"},{\"x\":9,\"y\":3,\"cords\":\"3|9\",\"color\":\"blue\"},{\"x\":10,\"y\":3,\"cords\":\"3|10\",\"color\":\"orange\"},{\"x\":11,\"y\":3,\"cords\":\"3|11\",\"color\":\"blue\"}],[{\"x\":0,\"y\":4,\"cords\":\"4|0\",\"color\":\"red\"},{\"x\":1,\"y\":4,\"cords\":\"4|1\",\"color\":\"blue\"},{\"x\":2,\"y\":4,\"cords\":\"4|2\",\"color\":\"orange\"},{\"x\":3,\"y\":4,\"cords\":\"4|3\",\"color\":\"red\"},{\"x\":4,\"y\":4,\"cords\":\"4|4\",\"color\":\"blue\"},{\"x\":5,\"y\":4,\"cords\":\"4|5\",\"color\":\"orange\"},{\"x\":6,\"y\":4,\"cords\":\"4|6\",\"color\":\"blue\"},{\"x\":7,\"y\":4,\"cords\":\"4|7\",\"color\":\"forestgreen\"},{\"x\":8,\"y\":4,\"cords\":\"4|8\",\"color\":\"red\"},{\"x\":9,\"y\":4,\"cords\":\"4|9\",\"color\":\"orange\"},{\"x\":10,\"y\":4,\"cords\":\"4|10\",\"color\":\"brown\"},{\"x\":11,\"y\":4,\"cords\":\"4|11\",\"color\":\"blue\"}],[{\"x\":0,\"y\":5,\"cords\":\"5|0\",\"color\":\"brown\"},{\"x\":1,\"y\":5,\"cords\":\"5|1\",\"color\":\"blue\"},{\"x\":2,\"y\":5,\"cords\":\"5|2\",\"color\":\"brown\"},{\"x\":3,\"y\":5,\"cords\":\"5|3\",\"color\":\"red\"},{\"x\":4,\"y\":5,\"cords\":\"5|4\",\"color\":\"orange\"},{\"x\":5,\"y\":5,\"cords\":\"5|5\",\"color\":\"orange\"},{\"x\":6,\"y\":5,\"cords\":\"5|6\",\"color\":\"brown\"},{\"x\":7,\"y\":5,\"cords\":\"5|7\",\"color\":\"blue\"},{\"x\":8,\"y\":5,\"cords\":\"5|8\",\"color\":\"red\"},{\"x\":9,\"y\":5,\"cords\":\"5|9\",\"color\":\"brown\"},{\"x\":10,\"y\":5,\"cords\":\"5|10\",\"color\":\"orange\"},{\"x\":11,\"y\":5,\"cords\":\"5|11\",\"color\":\"brown\"}]]"
	server := socketio.NewServer(nil)

	server.OnConnect("/", func(s socketio.Conn) error {
		s.SetContext("")
		s.Join("all")
		fmt.Println("connected:", s.ID())
		if len(board) > 0 {
			server.BroadcastToRoom("/", s.ID(), "sendBoard", board)
		}
		return nil
	})

	server.OnEvent("/", "sendBoard", func(s socketio.Conn, data string) {
		fmt.Println("Recived board from server")
		s.Leave("all")
		server.BroadcastToRoom("/", "all", "sendBoard", data)
		s.Join("all")
		board = data
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
