import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-new-game-dialog',
  templateUrl: './new-game-dialog.component.html',
  styleUrls: ['./new-game-dialog.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class NewGameDialogComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

}
