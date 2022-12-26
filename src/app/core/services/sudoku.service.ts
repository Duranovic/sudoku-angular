import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Sudoku } from '../models/sudoku';

@Injectable({
  providedIn: 'root'
})
export class SudokuService {
  timer$?: Observable<number>;
  puzzle?: Sudoku;

  constructor() {
    this.puzzle = new Sudoku();
  }

  public patchCell(row: number, column: number, value: number) {
    this.puzzle?.patchCell(row, column, value);
  }

  public restartGame(): void {
    this.puzzle?.restartSudoku();
  }
}
