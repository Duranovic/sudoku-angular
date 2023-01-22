import { ChangeDetectionStrategy, Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { GameStatus } from 'src/app/core/enums/game-status';
import { SvgSize } from 'src/app/core/enums/icon.enums';
import { PatchLocalStorage } from 'src/app/core/enums/sudoku-patch-local-storage.enum';
import { SudokuService } from 'src/app/core/services/sudoku.service';

@Component({
  selector: 'app-new-game-dialog',
  templateUrl: './new-game-dialog.component.html',
  styleUrls: ['./new-game-dialog.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class NewGameDialogComponent implements OnInit {
  public game_levels!: any[];
  public game_status!: GameStatus;

  constructor(private dialogRef: MatDialogRef<NewGameDialogComponent>, @Inject(MAT_DIALOG_DATA) public data: { gameStatus: GameStatus }, private sudokuService: SudokuService) { }

  public ngOnInit(): void {
    this.game_status = this.data.gameStatus;
    this.game_levels = [
      {
        buttonText: "Easy",
        numberOfRemovedFields: 2,
      },
      {
        buttonText: "Normal",
        numberOfRemovedFields: 25,
      },
      {
        buttonText: "Hard",
        numberOfRemovedFields: 40,
      },
      {
        buttonText: "Expert",
        numberOfRemovedFields: 60,
      },
    ]
  }

  public get GameStatus() {
    return GameStatus;
  }

  public get SvgSize(){
    return SvgSize;
  }

  public createNewGame(numberOfRemovedFields: number): void {
    this.sudokuService.puzzle.generateSudoku(numberOfRemovedFields);
    this.sudokuService.puzzle.resetActiveFields();
    this.sudokuService.setLocalStorage(PatchLocalStorage.Puzzle);
    this.sudokuService.timer.resetTime();
    this.dialogRef.close();
  }

  public newGame() {
    this.game_status = GameStatus.NEW_GAME;
    this.dialogRef.disableClose = false;
  }

  public secondChance(): void {
    this.sudokuService.puzzle.mistakes--;
    this.sudokuService.setLocalStorage(PatchLocalStorage.Puzzle);
    this.dialogRef.close();
  }
}
