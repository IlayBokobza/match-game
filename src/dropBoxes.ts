type Box = {
    x:number,
    y:number,
    cords:string,
    color:string,
}


const dropBoxes = (deletedBoxes:Box[],board:Box[][]) => {
    if(deletedBoxes.length === 0){
        return board
    }

    let dropedBoxes:Box[] = []
    //sorts boxses by y axis
    deletedBoxes = deletedBoxes.sort((a,b) => {
        if(a.y > b.y){
            return 1
        }
        if(a.y < b.y){
            return -1
        }

        return 0
    })

    deletedBoxes.forEach(box => {
        //check if is at the top
        if(box.y === 0){
            return
        }

        //checks if the box above is none
        if(board[box.y-1][box.x].color === 'none'){
            return
        }

        //changes the color of this box
        board[box.y][box.x].color = board[box.y-1][box.x].color
        //changes the color of the box above
        board[box.y-1][box.x].color = 'none'
        dropedBoxes.push(board[box.y-1][box.x])
    })
    
    board = dropBoxes(dropedBoxes,board)
    return board
}

export default dropBoxes