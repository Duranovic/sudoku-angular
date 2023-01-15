import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { enterFullScreenConst, exitFullScreenConst } from 'src/app/core/constants/header.constant';
import { Router, NavigationEnd } from '@angular/router';
import { images_folder_path } from 'src/environments/environment';

@Component({
  selector: 'sudoku-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class HeaderComponent implements OnInit {
  public fullScreenIconPath?: string;
  public fullScreen?: any;
  public isGame?: boolean;
  
  constructor(private router:  Router, private ch: ChangeDetectorRef) { }

  public ngOnInit(): void {
    this.router.events.subscribe((event) => (event instanceof NavigationEnd) && this.handleRouteChange());

    if(!document.fullscreenElement) {
      this.fullScreen = enterFullScreenConst;
    } else {
      this.fullScreen = exitFullScreenConst;
    }
  }

  public handleRouteChange(): void {
    this.isGame = this.router.url.includes('game');
    this.ch.detectChanges();
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
