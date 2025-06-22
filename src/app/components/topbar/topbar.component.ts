import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuthService } from '../../auth/auth.service';

@Component({
  selector: 'app-topbar',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './topbar.component.html',
  styleUrls: ['./topbar.component.scss']
})
export class TopbarComponent {
  private auth = inject(AuthService);
  userName = 'Usuario';

  date = new Date().toLocaleDateString('es-PE', {
    weekday: 'long',
    day: 'numeric',
    month: 'long',
  });

  get greeting(): string {
    const hour = new Date().getHours();
    if (hour < 12) return 'Buenos días';
    if (hour < 18) return 'Buenas tardes';
    return 'Buenas noches';
  }

  openMenu = false;

  toggleMenu() {
    this.openMenu = !this.openMenu;
  }

  ngOnInit() {
    const user = this.auth.getCurrentUser();
    if (user && user.name) {
      this.userName = user.name;
    }
  }
}
