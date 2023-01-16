import { ChangeDetectionStrategy, Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
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
  public game_over: boolean = false;

  constructor(private dialogRef: MatDialogRef<NewGameDialogComponent>, @Inject(MAT_DIALOG_DATA) public data: { gameOver: boolean }, private sudokuService: SudokuService) { }

  public ngOnInit(): void {
    this.game_over = this.data.gameOver;
    this.game_levels = [
      {
        buttonText: "Easy",
        numberOfRemovedFields: 16,
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

  get SvgSize(){
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
    this.game_over = false;
    this.dialogRef.disableClose = false;
  }

  public secondChance(): void {
    this.sudokuService.puzzle.mistakes--;
    this.sudokuService.setLocalStorage(PatchLocalStorage.Puzzle);
    this.dialogRef.close();
  }
}
