import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
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
  
  constructor(private dialogRef: MatDialogRef<NewGameDialogComponent>, private sudokuService: SudokuService) { }

  public ngOnInit(): void {
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

  public createNewGame(game_level: any): void {
    this.sudokuService.puzzle.generateSudoku(game_level.numberOfRemovedFields);
    this.sudokuService.puzzle.resetActiveFields();
    this.sudokuService.setLocalStorage(PatchLocalStorage.Puzzle);
    this.sudokuService.timer.resetTime();
    this.dialogRef.close();
  }
}
