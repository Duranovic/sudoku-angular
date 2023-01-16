import { Component, OnInit } from '@angular/core';
import { SudokuService } from 'src/app/core/services/sudoku.service';
import { PatchLocalStorage } from 'src/app/core/enums/sudoku-patch-local-storage.enum';
import { MatDialog } from '@angular/material/dialog';
import { NewGameDialogComponent } from '../new-game-dialog/new-game-dialog.component';
import { SoundService } from 'src/app/core/services/sound.service';
import { SoundsEnum } from 'src/app/core/enums/sound.enum';
import { SvgSize } from 'src/app/core/enums/icon.enums';

@Component({
  templateUrl: './game.component.html',
  styleUrls: ['./game.component.scss'],
})
export class GameComponent implements OnInit {

  constructor(public sudokuService: SudokuService, private soundService: SoundService, public dialog: MatDialog) { }

  public array = [...Array(9).keys()];
  public sudoku_puzzle?: any;

  public ngOnInit(): void {
    this.sudokuService.puzzle.gameplay_puzzle.subscribe(x => {
      this.sudoku_puzzle = x;
      this.sudokuService.timer.startTimer();
    })

    if (this.sudokuService.getFromLocalStorage(PatchLocalStorage.Puzzle)) {
      this.sudokuService.getFromLocalStorage(PatchLocalStorage.Timer);
      return;
    }

    this.sudokuService.setLocalStorage(PatchLocalStorage.Puzzle);
  }

  get SvgSize(){
    return SvgSize;
  }

  public onClick($event: any): void {
    const isClickedOnSameElement = this.sudokuService.puzzle.activeElementRow == $event.target.parentElement?.id[0] && this.sudokuService.puzzle.activeElementColumn == $event.target.parentElement?.id[1];
    this.soundService.playSound(SoundsEnum.INTERACT);
    if (isClickedOnSameElement) {
      this.sudokuService.puzzle.resetActiveFields();
    } else {
      this.sudokuService.puzzle.activeElementRow = $event.target.parentElement?.id[0];
      this.sudokuService.puzzle.activeElementColumn = $event.target.parentElement?.id[1];
    }
  }

  public setField(number: number): void {
    let row = this.sudokuService.puzzle.activeElementRow;
    let column = this.sudokuService.puzzle.activeElementColumn;

    if (this.sudoku_puzzle[row][column].computed || this.sudoku_puzzle[row][column].value === number) {
      this.soundService.playSound(SoundsEnum.INTERACT);
      return;
    }

    let isMoveRight = this.sudokuService.patchCell(row, column, number);
    isMoveRight ? this.soundService.playSound(SoundsEnum.RIGHT_MOVE) : this.soundService.playSound(SoundsEnum.WRONG_MOVE);

    this.sudokuService.setLocalStorage(PatchLocalStorage.Puzzle);
    if(this.sudokuService.puzzle.isGameOver()) {
      this.soundService.playSound(SoundsEnum.GAME_OVER);
      this.newGame(true);
    }
  }

  public eraseSelectedField(): void {
    this.soundService.playSound(SoundsEnum.INTERACT);

    if (this.sudoku_puzzle[this.sudokuService.puzzle.activeElementRow][this.sudokuService.puzzle.activeElementColumn].computed)
      return;

    this.sudokuService.puzzle.patchCell(this.sudokuService.puzzle.activeElementRow, this.sudokuService.puzzle.activeElementColumn, undefined, true);
    this.sudokuService.setLocalStorage(PatchLocalStorage.Puzzle);
  }

  public restartGame(): void {
    this.sudokuService.restartGame();
    this.sudokuService.setLocalStorage(PatchLocalStorage.Puzzle);
    this.sudokuService.setLocalStorage(PatchLocalStorage.Timer);
    this.sudokuService.timer?.resetTime();
    this.sudokuService.puzzle.resetActiveFields();
  }

  public undoPlay(): void {
    this.sudokuService.puzzle.undoPlay();
    this.sudokuService.setLocalStorage(PatchLocalStorage.Puzzle);
  }

  public isUndoEnabled(): boolean {
    let isUndoMovesLeft = this.sudokuService.puzzle.undo.available_moves > 0;
    let isUndoStackChanged = this.sudokuService.puzzle.undo.stack.length > 1;
    return isUndoMovesLeft && isUndoStackChanged;
  }


  public newGame(gameOver: boolean = false): void {
    this.dialog.open(NewGameDialogComponent, {
      disableClose: gameOver,
      data: {
        gameOver,
      }
    });
  }
}
