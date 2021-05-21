/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ([
/* 0 */,
/* 1 */
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "checkNeighbors": () => (/* binding */ checkNeighbors),
/* harmony export */   "resetNeighbors": () => (/* binding */ resetNeighbors)
/* harmony export */ });
let toDelete = [];
let newDeleted = [];
//checks if box is already beening deleted
const checkIfAlreadyDeleted = (box) => {
    const isInDeleted = toDelete.find(item => item === box);
    return !!isInDeleted;
};
const checkNeighbors = (board, box) => {
    var _a, _b;
    //checks neighbors  
    if (board[box.y - 1] && ((_a = board[box.y - 1][box.x]) === null || _a === void 0 ? void 0 : _a.color) === box.color && !checkIfAlreadyDeleted(board[box.y - 1][box.x])) {
        let neighbor = board[box.y - 1][box.x];
        toDelete.push(neighbor);
        newDeleted.push(neighbor);
    }
    if (board[box.y + 1] && ((_b = board[box.y + 1][box.x]) === null || _b === void 0 ? void 0 : _b.color) === box.color && !checkIfAlreadyDeleted(board[box.y + 1][box.x])) {
        let neighbor = board[box.y + 1][box.x];
        toDelete.push(neighbor);
        newDeleted.push(neighbor);
    }
    let neighbor = board[box.y][box.x + 1];
    if (neighbor && neighbor.color === box.color && !checkIfAlreadyDeleted(neighbor)) {
        toDelete.push(neighbor);
        newDeleted.push(neighbor);
    }
    neighbor = board[box.y][box.x - 1];
    if (neighbor && neighbor.color === box.color && !checkIfAlreadyDeleted(neighbor)) {
        toDelete.push(neighbor);
        newDeleted.push(neighbor);
    }
    if (newDeleted.length > 0) {
        const newDeletedCopy = [...newDeleted];
        newDeleted = [];
        newDeletedCopy.forEach(box => {
            checkNeighbors(board, box);
        });
        return toDelete;
    }
    else {
        newDeleted = [];
        return toDelete;
    }
};
const resetNeighbors = () => {
    toDelete = [];
};



/***/ }),
/* 2 */
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
let rows = 9;
let col = 10;
const colors = ['red', 'forestgreen', 'blue', 'brown', 'orange'];
//returns a random color
const randomColor = () => {
    const index = Math.floor(Math.random() * colors.length);
    return colors[index];
};
const createBoard = () => {
    const board = [];
    //add rows
    for (let i = 0; i < rows; i++) {
        board.push([]);
    }
    board.forEach((arr, y) => {
        //add cols
        for (let x = 0; x < col; x++) {
            arr.push({
                x,
                y,
                cords: `${y}|${x}`,
                color: randomColor()
            });
        }
    });
    return board;
};
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (createBoard);


/***/ }),
/* 3 */
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
const dropBoxes = (deletedBoxes, board) => {
    if (deletedBoxes.length === 0) {
        return board;
    }
    let dropedBoxes = [];
    //sorts boxses by y axis
    deletedBoxes = deletedBoxes.sort((a, b) => {
        if (a.y > b.y) {
            return 1;
        }
        if (a.y < b.y) {
            return -1;
        }
        return 0;
    });
    deletedBoxes.forEach(box => {
        //check if is at the top
        if (box.y === 0) {
            return;
        }
        //checks if the box above is none
        if (board[box.y - 1][box.x].color === 'none') {
            return;
        }
        //changes the color of this box
        board[box.y][box.x].color = board[box.y - 1][box.x].color;
        //changes the color of the box above
        board[box.y - 1][box.x].color = 'none';
        dropedBoxes.push(board[box.y - 1][box.x]);
    });
    board = dropBoxes(dropedBoxes, board);
    return board;
};
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (dropBoxes);


/***/ })
/******/ 	]);
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
var __webpack_exports__ = {};
// This entry need to be wrapped in an IIFE because it need to be isolated against other modules in the chunk.
(() => {
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _checkNeighbors__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(1);
/* harmony import */ var _createBoard__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(2);
/* harmony import */ var _dropBoxes__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(3);



let board = (0,_createBoard__WEBPACK_IMPORTED_MODULE_1__.default)();
let score = 0;
const renderBoard = () => {
    //resets container
    document.querySelector('#box-container').innerHTML = '';
    board.forEach(() => {
        document.querySelector('#box-container').innerHTML += '<div class="row"></div>';
    });
    //adds boxes
    const rows = document.querySelectorAll('.row');
    board.forEach((arr, index) => {
        arr.forEach(item => {
            let element = `<div class="box" id="${item.cords}" style="background:${item.color};`;
            if (item.color !== 'none') {
                element += 'cursor: pointer;';
            }
            element += '"></div>';
            rows[index].innerHTML += element;
        });
    });
    //updates score
    document.querySelector('#score').textContent = score.toString();
    if (!localStorage.getItem('best-score')) {
        localStorage.setItem('best-score', '0');
    }
    document.querySelector('#best-score').textContent = localStorage.getItem('best-score');
    document.querySelectorAll('.box').forEach(box => {
        box.addEventListener('click', (e) => {
            var _a;
            const splitId = (_a = e.target) === null || _a === void 0 ? void 0 : _a.id.split('|');
            const y = parseInt(splitId[0]);
            const x = parseInt(splitId[1]);
            const thisBox = board[y][x];
            //stop func if box is deleted
            if (thisBox.color === 'none') {
                return;
            }
            //checks neighbors
            const patch = (0,_checkNeighbors__WEBPACK_IMPORTED_MODULE_0__.checkNeighbors)(board, thisBox);
            (0,_checkNeighbors__WEBPACK_IMPORTED_MODULE_0__.resetNeighbors)();
            //deletes them
            if (patch.length > 1) {
                patch.forEach(box => {
                    board[box.y][box.x].color = 'none';
                });
                //updates score
                score += patch.length;
                if (parseInt(localStorage.getItem('best-score')) < score) {
                    localStorage.setItem('best-score', score.toString());
                }
            }
            else {
                return;
            }
            board = (0,_dropBoxes__WEBPACK_IMPORTED_MODULE_2__.default)(patch, board);
            renderBoard();
        });
    });
};
//refresh btn code
document.querySelector('#refresh-btn').addEventListener('click', () => {
    board = (0,_createBoard__WEBPACK_IMPORTED_MODULE_1__.default)();
    renderBoard();
});
renderBoard();

})();

/******/ })()
;
//# sourceMappingURL=bundle.js.map