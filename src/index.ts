import {checkNeighbors,resetNeighbors} from './checkNeighbors'
import dropBoxes from './dropBoxes'
import io from 'socket.io-client'
const socket = io() 

type Box = {
    x:number,
    y:number,
    cords:string,
    color:string,
}


// let board = createBoard()
let board:Box[][] = []
let score = 0

const renderBoard = () => {
    //resets container
    document.querySelector('#box-container')!.innerHTML = ''
    board.forEach(() => {
        document.querySelector('#box-container')!.innerHTML += '<div class="row"></div>'
    })
    
    //adds boxes
    const rows = document.querySelectorAll('.row')
    board.forEach((arr,index) => {
        arr.forEach(item => {
            let element = `<div class="box" id="${item.cords}" style="background:${item.color};`

            if(item.color !== 'none'){
                element += 'cursor: pointer;'
            }

            element += '"></div>'
            rows[index].innerHTML += element
        })
    })

    //updates score
    document.querySelector('#score')!.textContent = score.toString()
    if(!localStorage.getItem('best-score')){
        localStorage.setItem('best-score','0')
    }
    document.querySelector('#best-score')!.textContent = localStorage.getItem('best-score')
    
    document.querySelectorAll('.box').forEach(box => {
        box.addEventListener('click',(e:any) => {
            const splitId = e.target?.id.split('|')
            const y = parseInt(splitId[0])
            const x = parseInt(splitId[1])
            const thisBox = board[y][x]

            //stop func if box is deleted
            if(thisBox.color === 'none'){
                return
            }
            
            //checks neighbors
            const patch = checkNeighbors(board,thisBox)
            resetNeighbors()

            //deletes them
            if(patch.length > 1){
                patch.forEach(box => {
                    board[box.y][box.x].color = 'none'
                })
                //updates score
                score += patch.length
                if(parseInt(localStorage.getItem('best-score')!) < score){
                    localStorage.setItem('best-score',score.toString())
                }
            }else{
                return
            }
            board = dropBoxes(patch,board)
            //sends board to server
            socket.emit('sendBoard',JSON.stringify(board))

            console.clear()
            console.log(board)
            renderBoard()
        })
    })
}

//refresh btn code
document.querySelector('#refresh-btn')!.addEventListener('click',() => {
    socket.emit("refreshBoard")
})

//socket event handeler
socket.on('sendBoard',(data:string) => {
    console.log('new board from server')
    board = JSON.parse(data)
    score = 0
    renderBoard()
})

renderBoard()