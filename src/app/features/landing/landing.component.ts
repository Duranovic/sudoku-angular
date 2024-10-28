import { Component, Inject, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  templateUrl: './landing.component.html',
  styleUrls: ['./landing.component.scss']
})
export class LandingComponent implements OnInit {

  constructor(private router: Router) {}

  ngOnInit(): void {
  }

  public playGame(newGame: boolean): void {
    this.router.navigate(['/game'], {state: {newGame}});
  }

}
