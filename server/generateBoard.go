package main

import (
	"fmt"
	"math/rand"
	"time"
)

type Box struct {
	X     int    `json:"x"`
	Y     int    `json:"y"`
	Cords string `json:"cords"`
	Color string `json:"color"`
}

var r *rand.Rand = rand.New(rand.NewSource(time.Now().UnixNano()))

func randInt(max int) int {
	output := r.Intn(max)
	return output
}

func randColor() string {
	colors := []string{"red", "forestgreen", "blue", "brown", "orange"}
	return colors[randInt(len(colors))]
}

func generateBoard() [][]Box {
	//board size
	rows := 6
	cols := 9
	var board [][]Box

	//generate board
	for y := 0; y < rows; y++ {
		var row []Box

		for x := 0; x < cols; x++ {
			newBox := Box{
				X:     x,
				Y:     y,
				Cords: fmt.Sprintf("%v|%v", y, x),
				Color: randColor(),
			}
			row = append(row, newBox)
		}

		board = append(board, row)
	}

	return board
}
