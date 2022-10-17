import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FeaturesRoutingModule } from './features-routing.module';
import { LandingComponent } from './landing/landing.component';
import { GameComponent } from './game/game.component';
import { SharedModule } from '../shared/shared.module';
import { AvailableNowComponent } from './landing/available-now/available-now.component';
import { NotifyMeComponent } from './landing/notify-me/notify-me.component';
import { ReactiveFormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    LandingComponent,
    GameComponent,
    AvailableNowComponent,
    NotifyMeComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    SharedModule,
    FeaturesRoutingModule
  ]
})
export class FeaturesModule { }
