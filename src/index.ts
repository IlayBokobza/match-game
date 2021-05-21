import {checkNeighbors,resetNeighbors} from './checkNeighbors'
import createBoard from './createBoard'
import dropBoxes from './dropBoxes'

let board = createBoard()
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

            renderBoard()
        })
    })
}

renderBoard()