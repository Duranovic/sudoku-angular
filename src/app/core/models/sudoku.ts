import { BehaviorSubject } from "rxjs";
import { sudokuInitialPuzzle } from "../constants/sudoku.constant";
import { cloneMatrix, shuffle } from "../helpers/sudoku.helper";
import { Undo } from "../interfaces/undo.interface";

export class Sudoku {
    puzzle: any[][];
    challenge_puzzle!: any[][];
    undo!: Undo;
    gameplay_puzzle!: BehaviorSubject<any[][]>;

    constructor() {
        this.puzzle = sudokuInitialPuzzle;
        this.undo = {
            stack: [],
            available_moves: 5,
        }
        this.generateSudoku();
    }

    private generateSudoku() {
        // call the fillPuzzle function to generate the puzzle
        this.fillPuzzle(0, 0);
        this.removeCells(20);
        // Add current state to the undo_stack
        this.undo.stack.push(cloneMatrix(this.challenge_puzzle));
    }

    private fillPuzzle = (row: number, col: number): boolean => {
        // if we've reached the last cell, the puzzle is complete
        if (row === 9) {
            return true;
        }

        // if the current cell is not empty, move on to the next cell
        if (this.puzzle[row][col] !== 0) {
            if (col === 8) {
                return this.fillPuzzle(row + 1, 0);
            } else {
                return this.fillPuzzle(row, col + 1);
            }
        }

        // shuffle the array of possible numbers
        let numbers = shuffle([1, 2, 3, 4, 5, 6, 7, 8, 9]);

        // try filling in the current cell with a number from the shuffled array
        for (let i = 0; i < 9; i++) {
            if (this.isValid(this.puzzle, row, col, numbers[i])) {
                this.puzzle[row][col] = {
                    computed: true,
                    value: numbers[i],
                    valid: true,
                };

                // if the next cell can be filled in, the puzzle is complete
                if (col === 8) {
                    if (this.fillPuzzle(row + 1, 0)) {
                        return true;
                    }
                } else {
                    if (this.fillPuzzle(row, col + 1)) {
                        return true;
                    }
                }

                // if the puzzle cannot be completed with this number, reset the cell and try again
                this.puzzle[row][col] = 0;
            }
        }

        // if no number can be placed in this cell, the puzzle is invalid
        return false;
    }

    private isValid(puzzle: any[][], row: number, col: number, num: number): boolean {
        // check if the number appears in the same row
        for (let i = 0; i < 9; i++) {
            if (puzzle[row][i].value === num) {
                return false;
            }
        }

        // check if the number appears in the same column
        for (let i = 0; i < 9; i++) {
            if (puzzle[i][col].value === num) {
                return false;
            }
        }

        // check if the number appears in the same 3x3 block
        let blockRow = Math.floor(row / 3) * 3;
        let blockCol = Math.floor(col / 3) * 3;
        for (let i = 0; i < 3; i++) {
            for (let j = 0; j < 3; j++) {
                if (puzzle[blockRow + i][blockCol + j].value === num) {
                    return false;
                }
            }
        }

        // the number is valid
        return true;
    }

    private removeCells(numToRemove: number) {
        this.challenge_puzzle = cloneMatrix(this.puzzle);

        let removed: number[][] = [];

        while (removed.length < numToRemove) {
            let row = Math.floor(Math.random() * 9);
            let col = Math.floor(Math.random() * 9);
            let cell = this.challenge_puzzle[row][col];
            if (cell.value !== undefined && !removed.some(c => c[0] === row && c[1] === col)) {
                removed.push([row, col, cell]);
                this.challenge_puzzle[row][col] = {
                    value: undefined,
                    computed: false,
                    valid: true,
                };
            }
        }

        this.gameplay_puzzle = new BehaviorSubject(cloneMatrix(this.challenge_puzzle))
    }

    public patchCell(row: number, column: number, value: number | undefined, valid: boolean): void {
        let current_gameplay = this.gameplay_puzzle.getValue();
        current_gameplay[row][column] = {
            computed: false,
            value,
            valid
        };
        this.gameplay_puzzle.next(current_gameplay);
        this.updateUndoStack();
    }

    public restartSudoku(): void {
        this.gameplay_puzzle.next(cloneMatrix(this.challenge_puzzle));
        this.undo.stack = [cloneMatrix(this.challenge_puzzle)];
    }

    public patchProps(state: any): void {
        this.puzzle = cloneMatrix(state.puzzle);
        this.challenge_puzzle = cloneMatrix(state.challenge_puzzle);
        this.gameplay_puzzle.next(state.gameplay_puzzle);
        this.undo = state.undo;
    }

    public updateUndoStack() {
        if (this.undo.stack.length === 6) {
            this.undo.stack.shift();
        }

        this.undo.stack.push(cloneMatrix(this.gameplay_puzzle.getValue()));
    }

    public undoPlay() {
        let stack_length = this.undo.stack.length;
        if (stack_length === 1)
            return;

        if (stack_length >= 2) {
            this.gameplay_puzzle.next(cloneMatrix(this.undo.stack[stack_length - 2]));
        }

        if (stack_length > 1) {
            this.undo.stack.pop();
            console.log(this.undo.stack);

        }

        this.undo.available_moves--;
    }

    public prepareForEncode(): any {
        return {
            gameplay_puzzle: this.gameplay_puzzle.getValue(),
            challenge_puzzle: this.challenge_puzzle,
            puzzle: this.puzzle,
            undo: this.undo,
        }
    }
}