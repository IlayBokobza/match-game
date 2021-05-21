type Box = {
    x:number,
    y:number,
    cords:string,
    color:string,
}

let rows = 9
let col = 10

const colors = ['red','green','blue','yellow','brown','pink','purple','orange']
//returns a random color
const randomColor = () => {
    const index = Math.floor(Math.random()*colors.length)
    return colors[index]
}

const createBoard = () => {
    const board:Box[][] = []

    //add rows
    for(let i = 0;i < rows;i++){
        board.push([])
    }
    
    board.forEach((arr,y) => {
        //add cols
        for(let x = 0;x < col;x++){
            arr.push({
                x,
                y,
                cords:`${y}|${x}`,
                color:randomColor()
            })
        }
    })

    return board
}

export default createBoard