import { Component, OnInit } from '@angular/core';
import { SudokuService } from 'src/app/core/services/sudoku.service';
import { Buffer } from 'buffer';
import { latest_sudoku_game } from 'src/app/core/constants/sudoku.constant';
import { PatchLocalStorage } from 'src/app/core/enums/sudoku-patch-local-storage.enum';
import { BehaviorSubject } from 'rxjs';
import { Timer } from 'src/app/core/models/timer';

@Component({
  templateUrl: './game.component.html',
  styleUrls: ['./game.component.scss']
})
export class GameComponent implements OnInit {

  constructor(private sudokuService: SudokuService) { }

  public array = [...Array(9).keys()];
  public activeElementRow!: string;
  public activeElementColumn!: string;
  public sudoku_puzzle?: any;

  public ngOnInit(): void {
    this.sudoku_puzzle = this.sudokuService.puzzle.gameplay_puzzle;
    this.sudokuService.timer.startTimer();

    if(this.sudokuService.getFromLocalStorage(PatchLocalStorage.Puzzle)) {
      this.sudoku_puzzle = this.sudokuService?.puzzle?.gameplay_puzzle;
      this.sudokuService.getFromLocalStorage(PatchLocalStorage.Timer);
      return;
    }

    this.sudokuService.setLocalStorage(PatchLocalStorage.Puzzle);
  }

  public onClick($event: any): void {
    const isClickedOnSameElement = this.activeElementRow == $event.target.parentElement?.id[0] && this.activeElementColumn == $event.target.parentElement?.id[1];

    if (isClickedOnSameElement) {
      this.activeElementRow = '';
      this.activeElementColumn = '';
    } else {
      this.activeElementRow = $event.target.parentElement?.id[0];
      this.activeElementColumn = $event.target.parentElement?.id[1];
    }
  }

  public setField(number: number): void {
    // TODO: Change type of attributes to the number
    let row = parseInt(this.activeElementRow);
    let column = parseInt(this.activeElementColumn);

    if (this.sudoku_puzzle[row][column].computed)
      return;

    this.sudokuService.patchCell(row, column, number);
    this.sudokuService.setLocalStorage(PatchLocalStorage.Puzzle);
  }

  public eraseSelectedField(): void {
    if (this.sudoku_puzzle[this.activeElementRow][this.activeElementColumn].computed)
      return;

    this.sudoku_puzzle[this.activeElementRow][this.activeElementColumn].value = null;
    this.sudokuService.setLocalStorage(PatchLocalStorage.Puzzle);
  }

  public restartGame(): void {
    this.sudokuService.restartGame();
    this.sudokuService.setLocalStorage(PatchLocalStorage.Puzzle);
    this.sudokuService.setLocalStorage(PatchLocalStorage.Timer);
    this.sudoku_puzzle = this.sudokuService.puzzle?.gameplay_puzzle;
    this.sudokuService.timer?.resetTime();
    this.activeElementColumn = '';
    this.activeElementRow = '';
  }
}
