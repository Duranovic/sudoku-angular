import { ChangeDetectionStrategy, Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'sudoku-icon',
  templateUrl: './icon.component.html',
  styleUrls: ['./icon.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class IconComponent implements OnInit {
  @Input() name?: string;
  @Input() size?: string;
  @Input() color?: string;
  @Input() stroke?: string;
  @Input() active?: boolean;
  @Input() disableHover?: boolean;
  @Input() rotate?: number;

  public link: string = '';
  
  constructor() { }

  public ngOnInit(): void {
    this.link = `assets/images/${this.name}.svg#${this.name}`
  }
}
