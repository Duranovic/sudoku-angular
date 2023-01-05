import { Component, OnInit } from '@angular/core';
import { SudokuService } from 'src/app/core/services/sudoku.service';
import { Buffer } from 'buffer';
import { latest_sudoku_game, latest_sudoku_timer } from 'src/app/core/constants/sudoku.constant';
import { PatchLocalStorage } from 'src/app/core/enums/sudoku-patch-local-storage.enum';
import { BehaviorSubject } from 'rxjs';
import { Timer } from 'src/app/core/models/timer';

@Component({
  templateUrl: './game.component.html',
  styleUrls: ['./game.component.scss']
})
export class GameComponent implements OnInit {

  constructor(public sudokuService: SudokuService) { }

  public array = [...Array(9).keys()];
  public activeElementRow!: number;
  public activeElementColumn!: number;
  public sudoku_puzzle?: any;

  public ngOnInit(): void {
    this.sudokuService.puzzle.gameplay_puzzle.subscribe(x => {
      this.sudoku_puzzle = x;
      this.sudokuService.timer.startTimer();
    })

    if (this.sudokuService.getFromLocalStorage(PatchLocalStorage.Puzzle)) {
      this.sudokuService.getFromLocalStorage(PatchLocalStorage.Timer);
      console.log(this.sudokuService.puzzle.undo.stack);
      return;
    }

    this.sudokuService.setLocalStorage(PatchLocalStorage.Puzzle);
  }

  public onClick($event: any): void {
    const isClickedOnSameElement = this.activeElementRow == $event.target.parentElement?.id[0] && this.activeElementColumn == $event.target.parentElement?.id[1];

    if (isClickedOnSameElement) {
      this.activeElementRow = -1;
      this.activeElementColumn = -1;
    } else {
      this.activeElementRow = $event.target.parentElement?.id[0];
      this.activeElementColumn = $event.target.parentElement?.id[1];
    }
  }

  public setField(number: number): void {
    let row = this.activeElementRow;
    let column = this.activeElementColumn;

    if (this.sudoku_puzzle[row][column].computed || this.sudoku_puzzle[row][column].value === number)
      return;

    this.sudokuService.patchCell(row, column, number);
    this.sudokuService.setLocalStorage(PatchLocalStorage.Puzzle);
  }

  public eraseSelectedField(): void {
    if (this.sudoku_puzzle[this.activeElementRow][this.activeElementColumn].computed)
      return;

    this.sudokuService.puzzle.patchCell(this.activeElementRow, this.activeElementColumn, undefined, true);
    this.sudokuService.setLocalStorage(PatchLocalStorage.Puzzle);
  }

  public restartGame(): void {
    this.sudokuService.restartGame();
    this.sudokuService.setLocalStorage(PatchLocalStorage.Puzzle);
    this.sudokuService.setLocalStorage(PatchLocalStorage.Timer);
    this.sudokuService.timer?.resetTime();
    this.activeElementColumn = -1;
    this.activeElementRow = -1;
  }

  public undoPlay(): void {
    this.sudokuService.puzzle.undoPlay();
    this.sudokuService.setLocalStorage(PatchLocalStorage.Puzzle);
  }

  // TODO: Will be removed, its only for DEV purposes
  public clearStorage() {
    localStorage.clear();
    this.sudokuService.restartGame();
    this.sudokuService.timer?.resetTime();
    this.activeElementColumn = -1;
    this.activeElementRow = -1;
  }

  public isUndoEnabled(): boolean {
    let isUndoMovesLeft = this.sudokuService.puzzle.undo.available_moves > 0;
    let isUndoStackChanged = this.sudokuService.puzzle.undo.stack.length > 1;
    return isUndoMovesLeft && isUndoStackChanged;
  }
}
