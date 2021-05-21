type Box = {
    x:number,
    y:number,
    cords:string,
    color:string,
}

let toDelete:Box[] = []
let newDeleted:Box[] = []

//checks if box is already beening deleted
const checkIfAlreadyDeleted = (box:Box) => {
    const isInDeleted = toDelete.find(item => item === box)
    return !!isInDeleted
}

const checkNeighbors = (board:Box[][],box:Box) => {
    //checks neighbors  
    if(board[box.y-1] && board[box.y-1][box.x]?.color === box.color && !checkIfAlreadyDeleted(board[box.y-1][box.x])){
        let neighbor = board[box.y-1][box.x]
        toDelete.push(neighbor)
        newDeleted.push(neighbor)
    }
    
    if(board[box.y+1] && board[box.y+1][box.x]?.color === box.color && !checkIfAlreadyDeleted(board[box.y+1][box.x])){
        let neighbor = board[box.y+1][box.x]
        toDelete.push(neighbor)
        newDeleted.push(neighbor)
    }
    
    let neighbor = board[box.y][box.x+1]
    if(neighbor && neighbor.color === box.color && !checkIfAlreadyDeleted(neighbor)){
        toDelete.push(neighbor)
        newDeleted.push(neighbor)
    }
    
    neighbor = board[box.y][box.x-1]
    if(neighbor && neighbor.color === box.color && !checkIfAlreadyDeleted(neighbor)){
        toDelete.push(neighbor)
        newDeleted.push(neighbor)
    }

    if(newDeleted.length > 0){
        const newDeletedCopy = [...newDeleted]
        newDeleted = []
        newDeletedCopy.forEach(box => {
            checkNeighbors(board,box)
        })
        return toDelete
    }else{
        newDeleted = []
        return toDelete
    }
    
}

const resetNeighbors = () => {
    toDelete = []
}

export {checkNeighbors,resetNeighbors}