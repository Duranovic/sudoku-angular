import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { BehaviorSubject, interval, map, Observable, of, tap } from 'rxjs';
import { latest_sudoku_timer } from 'src/app/core/constants/sudoku.constant';
import { PatchLocalStorage } from 'src/app/core/enums/sudoku-patch-local-storage.enum';
import { ITimer } from 'src/app/core/interfaces/timer.interface';
import { Timer } from 'src/app/core/models/timer';
import { SudokuService } from 'src/app/core/services/sudoku.service';

@Component({
  selector: 'sudoku-timer',
  templateUrl: './timer.component.html',
  styleUrls: ['./timer.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class TimerComponent implements OnInit{
  public timer$!: Observable<string>;
  constructor(private sudokuService: SudokuService) { }

  public ngOnInit(): void {
    this.timer$ = this.sudokuService.timer.timer$.pipe(
      tap(() => { 
        this.sudokuService.setLocalStorage(this.sudokuService.timer.prepareForEncode());
      })
    );
  }
}
