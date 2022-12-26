import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { interval, map, Observable } from 'rxjs';
import { Timer } from 'src/app/core/models/timer';
import { SudokuService } from 'src/app/core/services/sudoku.service';

@Component({
  selector: 'sudoku-timer',
  templateUrl: './timer.component.html',
  styleUrls: ['./timer.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class TimerComponent implements OnInit {
  public timer$!: Observable<string>;
  
  constructor(private sudokuService: SudokuService) { }

  public ngOnInit(): void {
    const timer: Timer = new Timer(0);
    this.timer$ = interval(1000).pipe(
      map(seconds => {
        timer.calculateTime(seconds)
        return timer.getTimerStringFormat();
      })
    );
  }
}
