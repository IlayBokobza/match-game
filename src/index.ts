import {checkNeighbors,resetNeighbors} from './checkNeighbors'
import createBoard from './createBoard'
import dropBoxes from './dropBoxes'

let board = createBoard()

const renderBoard = () => {
    document.getElementsByTagName('body')[0].innerHTML = ''

    board.forEach(() => {
        document.getElementsByTagName('body')[0].innerHTML += '<div class="row"></div>'
    })
    
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
            }
            board = dropBoxes(patch,board)

            renderBoard()
        })
    })
}

renderBoard()