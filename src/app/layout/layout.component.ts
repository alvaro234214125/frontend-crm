import { Component, inject } from '@angular/core';
import { SidebarComponent } from '../components/sidebar/sidebar.component';
import { RouterOutlet } from '@angular/router';
import { CommonModule } from '@angular/common';
import { AuthService } from '../auth/auth.service';
import { trigger, transition, style, query, animate, group } from '@angular/animations';

@Component({
  selector: 'app-layout',
  standalone: true,
  imports: [CommonModule, SidebarComponent, RouterOutlet],
  templateUrl: './layout.component.html',
  animations: [
    trigger('routeAnimations', [
      transition('* <=> *', [
        style({ position: 'relative' }),
        query(':enter, :leave', [
          style({
            position: 'absolute',
            width: '100%'
          })
        ], { optional: true }),
        group([
          query(':leave', [
            animate('300ms ease', style({ opacity: 0, transform: 'translateY(20px)' }))
          ], { optional: true }),
          query(':enter', [
            style({ opacity: 0, transform: 'translateY(-20px)' }),
            animate('300ms ease', style({ opacity: 1, transform: 'translateY(0)' }))
          ], { optional: true })
        ])
      ])
    ])
  ]
})
export class LayoutComponent {
  auth = inject(AuthService);
  user$ = this.auth.user$;

  collapsed = false;

  handleSidebarCollapse(value: boolean) {
    this.collapsed = value;
  }

  getRouteAnimationData(outlet: RouterOutlet) {
    return outlet && outlet.isActivated ? outlet.activatedRoute : '';
  }
}