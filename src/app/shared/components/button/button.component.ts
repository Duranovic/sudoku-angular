import { ChangeDetectionStrategy, Component, Input, OnInit, Output, EventEmitter } from '@angular/core';
import { ButtonType } from 'src/app/core/enums/button-type.enum';

@Component({
  selector: 'sudoku-button',
  templateUrl: './button.component.html',
  styleUrls: ['./button.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ButtonComponent implements OnInit {
  @Input() text!: string;
  @Input() type: ButtonType = ButtonType.Button;
  @Output() clicked = new EventEmitter<void>();

  constructor() { }

  public ngOnInit(): void {
  }

  public onClick(): void {
    console.log("INNER LOG!");
    this.clicked.emit();
  }

}
