import { ChangeDetectionStrategy, Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'sudoku-button-link',
  templateUrl: './button-link.component.html',
  styleUrls: ['./button-link.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ButtonLinkComponent implements OnInit {
  @Input() text!: string;
  @Input() route!: string;

  constructor() { }

  public ngOnInit(): void {
  }
}
