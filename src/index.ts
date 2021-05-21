import {checkNeighbors,resetNeighbors} from './checkNeighbors'
import createBoard from './createBoard'

const board = createBoard()

const renderBoard = () => {
    document.getElementsByTagName('body')[0].innerHTML = ''

    board.forEach(() => {
        document.getElementsByTagName('body')[0].innerHTML += '<div class="row"></div>'
    })
    
    const rows = document.querySelectorAll('.row')
    board.forEach((arr,index) => {
        arr.forEach(item => {
            rows[index].innerHTML += `<div class="box" id="${item.cords}" style="background:${item.color};"></div>`
        })
    })
    
    document.querySelectorAll('.box').forEach(box => {
        box.addEventListener('click',(e:any) => {
            const splitId = e.target?.id.split('|')
            const y = parseInt(splitId[0])
            const x = parseInt(splitId[1])

            const thisBox = board[y][x]
            
            //checks neighbors
            let neighbors = checkNeighbors(board,thisBox)
            resetNeighbors()
            const patch = [thisBox,...neighbors]

            //deletes them
            if(patch.length > 1){
                patch.forEach(box => {
                    board[box.y][box.x].color = 'none'
                })
            }

            renderBoard()
        })
    })
}

renderBoard()