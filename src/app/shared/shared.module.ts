import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ButtonComponent } from './components/button/button.component';
import { SpinnerComponent } from './components/spinner/spinner.component';
import { RouterModule } from '@angular/router';
import { TimerComponent } from './components/timer/timer.component';


@NgModule({
  declarations: [    
    ButtonComponent,
    SpinnerComponent,
    TimerComponent
  ],
  imports: [
    CommonModule,
    RouterModule,
  ],
  exports: [
    ButtonComponent,
    SpinnerComponent,
    TimerComponent
  ]
})
export class SharedModule { }
