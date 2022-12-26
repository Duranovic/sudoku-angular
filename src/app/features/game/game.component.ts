import { Component, OnInit } from '@angular/core';
import { SudokuService } from 'src/app/core/services/sudoku.service';

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
    this.sudoku_puzzle = this.sudokuService?.puzzle?.gameplay_puzzle;
    console.table(this.sudoku_puzzle);
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

    if(this.sudoku_puzzle[row][column].computed)
      return;
    
    this.sudokuService.patchCell(row, column, number);
  }

  public eraseSelectedField(): void {
    if(this.sudoku_puzzle[this.activeElementRow][this.activeElementColumn].computed)
      return;

    this.sudoku_puzzle[this.activeElementRow][this.activeElementColumn].value = null;
  }

  public restartGame(): void {
    this.sudokuService.restartGame();
    this.sudoku_puzzle = this.sudokuService.puzzle?.gameplay_puzzle;
    this.activeElementColumn = '';
    this.activeElementRow = '';
  }
}
