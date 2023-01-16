import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ButtonComponent } from './components/button/button.component';
import { SpinnerComponent } from './components/spinner/spinner.component';
import { RouterModule } from '@angular/router';
import { TimerComponent } from './components/timer/timer.component';
import { ButtonLinkComponent } from './components/button-link/button-link.component';
import { IconComponent } from './components/icon/icon.component';


@NgModule({
  declarations: [    
    IconComponent,
    ButtonComponent,
    ButtonLinkComponent,
    SpinnerComponent,
    TimerComponent
  ],
  imports: [
    CommonModule,
    RouterModule,
  ],
  exports: [
    ButtonComponent,
    ButtonLinkComponent,
    SpinnerComponent,
    TimerComponent,
    IconComponent,
  ]
})
export class SharedModule { }
