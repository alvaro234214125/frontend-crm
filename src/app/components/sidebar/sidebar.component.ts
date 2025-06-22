import { Component, inject, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterModule } from '@angular/router';
import { FaIconLibrary } from '@fortawesome/angular-fontawesome';
import {
  faUsers, faBoxOpen, faMoneyBill, faHandshake, faCommentDots, faFileInvoice,
  faCashRegister, faTasks, faCog, faBars, faQuestionCircle, faThLarge
} from '@fortawesome/free-solid-svg-icons';
import { ProfileSectionComponent } from '../profile-section/profile-section.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { AuthService } from '../../auth/auth.service';

@Component({
  standalone: true,
  selector: 'app-sidebar',
  imports: [
    CommonModule,
    RouterModule,
    FontAwesomeModule,
    ProfileSectionComponent
  ],
  templateUrl: './sidebar.component.html',
})
export class SidebarComponent {
  @Input() user: any;
  collapsed = false;
  faBars = faBars;
  auth = inject(AuthService);
  router = inject(Router);

  menuItems = [
    { icon: faThLarge, label: 'Dashboard', to: '/' },
    { icon: faUsers, label: 'Clientes', to: '/client' },
    { icon: faHandshake, label: 'Contactos', to: '/contacts' },
    { icon: faCommentDots, label: 'Interacciones', to: '/interactions' },
    { icon: faFileInvoice, label: 'Cotizaciones', to: '/quotations' },
    { icon: faMoneyBill, label: 'Facturas', to: '/invoices' },
    { icon: faCashRegister, label: 'Pagos', to: '/payments' },
    { icon: faBoxOpen, label: 'Productos', to: '/products' },
    { icon: faTasks, label: 'Tareas', to: '/tasks' },
    { icon: faUsers, label: 'Usuarios', to: '/users' },
    { icon: faCog, label: 'Roles', to: '/roles' },
    { icon: faQuestionCircle, label: 'Soporte', to: '/help' },
  ];

  constructor(library: FaIconLibrary) {
    library.addIcons(
      faUsers, faBoxOpen, faMoneyBill, faHandshake, faCommentDots,
      faFileInvoice, faCashRegister, faTasks, faCog, faBars, faQuestionCircle, faThLarge
    );
  }

  toggleSidebar() {
    this.collapsed = !this.collapsed;
  }

  irAlPerfil() {
    this.router.navigate(['/perfil']);
  }

  cerrarSesion() {
    this.auth.logout();
    this.router.navigate(['/login']);
  }

}
