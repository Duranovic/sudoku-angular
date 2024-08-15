import { animate, style, transition, trigger } from "@angular/animations";

export const fadeAnumation = trigger('routeAnimations', [
    transition('* <=> *', [
      style({ opacity: 0 }),
      animate('300ms ease-in', style({ opacity: 1 }))
    ])
  ])