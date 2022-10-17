import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';

@Component({
  selector: 'sudoku-available-now',
  templateUrl: './available-now.component.html',
  styleUrls: ['./available-now.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AvailableNowComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }
}
