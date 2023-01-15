import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { enterFullScreenConst, exitFullScreenConst } from 'src/app/core/constants/header.constant';
import { images_folder_path } from 'src/environments/environment';

@Component({
  selector: 'sudoku-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class HeaderComponent implements OnInit {
  public fullScreenIconPath?: string;
  public fullScreen: any;
  
  constructor() { }

  public ngOnInit(): void {
    if(!document.fullscreenElement) {
      this.fullScreen = enterFullScreenConst;
    } else {
      this.fullScreen = exitFullScreenConst;
    }
  }

  public toggleFullScreen(): void{
    if (!document.fullscreenElement) {
      document.documentElement.requestFullscreen();
      this.fullScreen = exitFullScreenConst;
    } else if (document.exitFullscreen) {
      document.exitFullscreen();
      this.fullScreen = enterFullScreenConst;
    }
  }
}
