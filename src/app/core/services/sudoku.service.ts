import { Injectable } from '@angular/core';
import { latest_sudoku_game, latest_sudoku_timer } from '../constants/sudoku.constant';
import { Sudoku } from '../models/sudoku';
import { Timer } from '../models/timer';
import { Buffer } from 'buffer';
import { PatchLocalStorage } from '../enums/sudoku-patch-local-storage.enum';

@Injectable({
  providedIn: 'root'
})
export class SudokuService {
  puzzle!: Sudoku;
  timer!: Timer;

  constructor() {
    this.puzzle = new Sudoku();
    this.getFromLocalStorage(PatchLocalStorage.Puzzle);
    this.timer = new Timer();
  }

  public patchCell(row: number, column: number, value: number | undefined): boolean {
    let valid: boolean = this.puzzle.puzzle[row][column].value === value;
    this.puzzle?.patchCell(row, column, value, valid);
    return valid;
  }

  public restartGame(): void {
    this.puzzle?.restartSudoku();
  }

  public setLocalStorage(patchOption: PatchLocalStorage): void {
    let storage_name = patchOption === PatchLocalStorage.Puzzle ? latest_sudoku_game : latest_sudoku_timer;
    let objectToEncode = patchOption === PatchLocalStorage.Puzzle ? this.puzzle.prepareForEncode() : this.timer.prepareForEncode();

    let encoded = Buffer.from(JSON.stringify(objectToEncode)).toString('base64');
    localStorage.setItem(storage_name, encoded);
  }

  public getFromLocalStorage(patchOption: PatchLocalStorage): boolean {
    let storage_name = patchOption === PatchLocalStorage.Puzzle ? latest_sudoku_game : latest_sudoku_timer;
    let storage_item = localStorage.getItem(storage_name);
    if(!storage_item) return false;

    let decoded = Buffer.from(storage_item, 'base64').toString('ascii');
    let decodedObj = JSON.parse(decoded);
    if(patchOption === PatchLocalStorage.Puzzle){ 
      this.puzzle?.patchProps(decodedObj) 
    } else { 
      this.timer?.patchProps(decodedObj);
    }
    return true;
  }
}
